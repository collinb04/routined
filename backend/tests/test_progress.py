"""
Backend tests for the progress routes.

Run with:
  cd backend && DATABASE_URL=postgresql://dummy FLASK_SECRET_KEY=x pytest tests/test_progress.py -v
"""
import pytest
from unittest.mock import patch
from app import create_app


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
    with client.session_transaction() as sess:
        sess['user'] = {'sub': 'auth0|test123', 'email': 'test@example.com'}


# ── Auth guards ───────────────────────────────────────────────────────────────

def test_get_progress_requires_auth(client):
    res = client.get('/api/problems/two-sum/progress')
    assert res.status_code == 401


def test_dissect_progress_requires_auth(client):
    res = client.post('/api/problems/two-sum/dissect/progress', json={'clues': []})
    assert res.status_code == 401


def test_attack_progress_requires_auth(client):
    res = client.post('/api/problems/two-sum/attack/progress', json={'code': 'x'})
    assert res.status_code == 401


# ── GET /progress shape ───────────────────────────────────────────────────────

def test_get_progress_returns_defaults_when_no_rows(client):
    _login(client)
    with patch('app.routes.progress._load_all_phases', return_value={}):
        res = client.get('/api/problems/two-sum/progress')
    assert res.status_code == 200
    data = res.get_json()
    for phase in ('dissect', 'struggle', 'attack'):
        assert data[phase] == {'state': {}, 'completed': False, 'completedAt': None, 'updatedAt': None}


# ── Validation ────────────────────────────────────────────────────────────────

def test_dissect_progress_validates_clues(client):
    _login(client)
    res = client.post('/api/problems/two-sum/dissect/progress', json={})
    assert res.status_code == 400


def test_attack_progress_validates_payload(client):
    _login(client)
    res = client.post('/api/problems/two-sum/attack/progress', json={})
    assert res.status_code == 400


def test_dissect_progress_persists_and_completes(client):
    _login(client)
    with patch('app.routes.progress._persist_attempt') as mock_persist, \
         patch('app.routes.progress._mark_phase_complete') as mock_complete:
        res = client.post('/api/problems/two-sum/dissect/progress',
                           json={'clues': [{'id': 'c1', 'status': 'solved'}], 'completed': True})
    assert res.status_code == 200
    mock_persist.assert_called_once()
    mock_complete.assert_called_once()
