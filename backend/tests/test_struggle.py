"""
Backend tests for the struggle routes.

Run with:
  cd backend && DATABASE_URL=postgresql://dummy FLASK_SECRET_KEY=x pytest tests/test_struggle.py -v

These tests mock the DB and Anthropic client so no live services are needed.
"""
import json
import pytest
from unittest.mock import patch, MagicMock
from app import create_app


# ── Fixtures ──────────────────────────────────────────────────────────────────

@pytest.fixture
def app():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SECRET_KEY'] = 'test-secret'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dummy'
    return app


@pytest.fixture
def client(app):
    return app.test_client()


def _login(client):
    """Seed the session with a fake logged-in user via the session interface."""
    with client.session_transaction() as sess:
        sess['user'] = {'sub': 'auth0|test123', 'email': 'test@example.com'}


COMMITMENT = {
    'strategyId': 'hash_map',
    'timeComplexity': 'O(n)',
    'spaceComplexity': 'O(n)',
    'planSteps': ['Initialize map', 'Iterate', 'Check complement', 'Return'],
}

RUBRIC = [
    'Mentions hash map enables O(1) lookup',
    'Explains why nested loops are eliminated',
]


# ── Auth guard ────────────────────────────────────────────────────────────────

def test_commit_requires_auth(client):
    res = client.post('/api/problems/two-sum/struggle/commit', json=COMMITMENT)
    assert res.status_code == 401


def test_chat_requires_auth(client):
    res = client.post('/api/problems/two-sum/struggle/chat',
                      json={'messages': [{'role': 'user', 'content': 'hi'}]})
    assert res.status_code == 401


def test_evaluate_requires_auth(client):
    res = client.post('/api/problems/two-sum/struggle/evaluate-insight',
                      json={'insight': 'x' * 50, 'insightRubric': RUBRIC})
    assert res.status_code == 401


# ── Commitment-before-chat guard ──────────────────────────────────────────────

def test_chat_requires_prior_commit(client):
    _login(client)
    res = client.post(
        '/api/problems/two-sum/struggle/chat',
        json={'messages': [{'role': 'user', 'content': 'hello'}], 'targetInsight': ''},
    )
    assert res.status_code == 400
    assert b'commit' in res.data.lower()


def test_evaluate_requires_prior_commit(client):
    _login(client)
    res = client.post(
        '/api/problems/two-sum/struggle/evaluate-insight',
        json={'insight': 'A' * 50, 'insightRubric': RUBRIC},
    )
    assert res.status_code == 400
    assert b'commit' in res.data.lower()


# ── Commit endpoint ───────────────────────────────────────────────────────────

def test_commit_stores_in_session(client):
    _login(client)
    with patch('app.routes.struggle._persist_attempt'):
        res = client.post('/api/problems/two-sum/struggle/commit', json=COMMITMENT)
    assert res.status_code == 200
    data = res.get_json()
    assert data['ok'] is True
    assert data['revise'] is False  # first commit

    # second commit should set revise=True
    with patch('app.routes.struggle._persist_attempt'):
        res2 = client.post('/api/problems/two-sum/struggle/commit', json=COMMITMENT)
    assert res2.get_json()['revise'] is True


def test_commit_validates_required_fields(client):
    _login(client)
    incomplete = {'strategyId': 'hash_map'}  # missing fields
    res = client.post('/api/problems/two-sum/struggle/commit', json=incomplete)
    assert res.status_code == 400


# ── Chat endpoint ─────────────────────────────────────────────────────────────

def test_chat_calls_anthropic_after_commit(client):
    _login(client)
    with patch('app.routes.struggle._persist_attempt'):
        client.post('/api/problems/two-sum/struggle/commit', json=COMMITMENT)

    mock_response = MagicMock()
    mock_response.content = [MagicMock(text='What data structure gives O(1) lookup?')]

    with patch('anthropic.Anthropic') as MockClient, \
         patch('app.routes.struggle._persist_attempt'):
        MockClient.return_value.messages.create.return_value = mock_response
        res = client.post(
            '/api/problems/two-sum/struggle/chat',
            json={
                'messages': [{'role': 'user', 'content': 'I want to try hash_map'}],
                'targetInsight': 'Complement lookup in O(1)',
            },
        )

    assert res.status_code == 200
    data = res.get_json()
    assert 'content' in data
    assert data['content'] == 'What data structure gives O(1) lookup?'


# ── Evaluate-insight: two-failure forced pass ─────────────────────────────────

def _setup_chat_session(client):
    """Helper: commit then check that chat gate is open."""
    with patch('app.routes.struggle._persist_attempt'):
        client.post('/api/problems/two-sum/struggle/commit', json=COMMITMENT)


def _make_eval_response(passed: bool, feedback: str = ''):
    mock_response = MagicMock()
    payload = {'pass': passed}
    if not passed:
        payload['feedback'] = feedback
    mock_response.content = [MagicMock(text=json.dumps(payload))]
    return mock_response


def test_evaluate_insight_pass(client):
    _login(client)
    _setup_chat_session(client)

    with patch('anthropic.Anthropic') as MockClient, \
         patch('app.routes.struggle._persist_attempt'), \
         patch('app.routes.struggle._finish_struggle') as mock_finish:
        MockClient.return_value.messages.create.return_value = _make_eval_response(True)
        res = client.post(
            '/api/problems/two-sum/struggle/evaluate-insight',
            json={'insight': 'A' * 60, 'insightRubric': RUBRIC},
        )

    assert res.status_code == 200
    data = res.get_json()
    assert data['pass'] is True
    assert data['feedback'] is None
    mock_finish.assert_called_once()


def test_evaluate_insight_fail_with_feedback(client):
    _login(client)
    _setup_chat_session(client)

    with patch('anthropic.Anthropic') as MockClient, \
         patch('app.routes.struggle._persist_attempt'):
        MockClient.return_value.messages.create.return_value = _make_eval_response(
            False, 'Does not mention O(1) lookup'
        )
        res = client.post(
            '/api/problems/two-sum/struggle/evaluate-insight',
            json={'insight': 'A' * 60, 'insightRubric': RUBRIC},
        )

    assert res.status_code == 200
    data = res.get_json()
    assert data['pass'] is False
    assert 'O(1)' in data['feedback']
    assert data['attemptsRemaining'] == 1


def test_evaluate_insight_forced_pass_after_two_failures(client):
    """After 2 failures the third attempt must pass regardless of the model response."""
    _login(client)
    _setup_chat_session(client)

    fail_resp = _make_eval_response(False, 'Still missing something')

    with patch('anthropic.Anthropic') as MockClient, \
         patch('app.routes.struggle._persist_attempt'), \
         patch('app.routes.struggle._finish_struggle') as mock_finish:
        MockClient.return_value.messages.create.return_value = fail_resp

        # Fail 1
        res1 = client.post(
            '/api/problems/two-sum/struggle/evaluate-insight',
            json={'insight': 'A' * 60, 'insightRubric': RUBRIC},
        )
        assert res1.get_json()['pass'] is False
        assert res1.get_json()['attemptsRemaining'] == 1

        # Fail 2
        res2 = client.post(
            '/api/problems/two-sum/struggle/evaluate-insight',
            json={'insight': 'B' * 60, 'insightRubric': RUBRIC},
        )
        assert res2.get_json()['pass'] is False
        assert res2.get_json()['attemptsRemaining'] == 0

        # Attempt 3 — forced pass (model never called)
        res3 = client.post(
            '/api/problems/two-sum/struggle/evaluate-insight',
            json={'insight': 'C' * 60, 'insightRubric': RUBRIC},
        )

    data3 = res3.get_json()
    assert data3['pass'] is True
    assert data3.get('forced') is True
    mock_finish.assert_called_once()
    # Verify Anthropic was only called for the first two attempts
    assert MockClient.return_value.messages.create.call_count == 2
