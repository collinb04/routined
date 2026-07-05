import json
from os import environ as env
from flask import request, Blueprint, session, jsonify
from sqlalchemy import text
from app.extensions import db
import anthropic

struggle_bp = Blueprint('struggle', __name__, url_prefix='/api/problems')


def _current_user():
    return session.get("user")


def _persist_attempt(user_sub, problem_id, *, jsonb=None, plain=None):
    """Upsert a phase_attempts row, setting JSONB and/or plain column values."""
    if not user_sub:
        return
    jsonb = jsonb or {}
    plain = plain or {}
    parts = []
    params = {"sub": user_sub, "problem_id": problem_id}
    for k, v in jsonb.items():
        parts.append(f"{k} = :{k}::jsonb")
        params[k] = json.dumps(v)
    for k, v in plain.items():
        parts.append(f"{k} = :{k}")
        params[k] = v
    if not parts:
        return
    set_clause = ", ".join(parts + ["updated_at = NOW()"])
    with db.engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO phase_attempts (user_sub, problem_id, phase, created_at, updated_at)
            VALUES (:sub, :problem_id, 'struggle', NOW(), NOW())
            ON CONFLICT (user_sub, problem_id, phase) DO NOTHING
        """), {"sub": user_sub, "problem_id": problem_id})
        conn.execute(text(f"""
            UPDATE phase_attempts SET {set_clause}
            WHERE user_sub = :sub AND problem_id = :problem_id AND phase = 'struggle'
        """), params)
        conn.commit()


# ── /commit ──────────────────────────────────────────────────────────────────

@struggle_bp.route("/<problem_id>/struggle/commit", methods=["POST"])
def commit(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    strategy_id = (data.get("strategyId") or "").strip()
    time_complexity = (data.get("timeComplexity") or "").strip()
    space_complexity = (data.get("spaceComplexity") or "").strip()
    plan_steps = data.get("planSteps")

    if not all([strategy_id, time_complexity, space_complexity, plan_steps]):
        return jsonify({"error": "strategyId, timeComplexity, spaceComplexity, planSteps are required"}), 400
    if not isinstance(plan_steps, list) or len(plan_steps) < 2:
        return jsonify({"error": "planSteps must be a list with at least 2 items"}), 400

    commitment = {
        "strategyId": strategy_id,
        "timeComplexity": time_complexity,
        "spaceComplexity": space_complexity,
        "planSteps": plan_steps,
    }

    commit_key = f"struggle_{problem_id}_commitment"
    is_revise = bool(session.get(commit_key))
    session[commit_key] = commitment
    session.modified = True

    db_field = "commitment2" if is_revise else "commitment1"
    _persist_attempt(user.get("sub"), problem_id, jsonb={db_field: commitment})

    return jsonify({"ok": True, "revise": is_revise})


# ── /chat ─────────────────────────────────────────────────────────────────────

def _socratic_system_prompt(problem_id, commitment, target_insight):
    strategy = commitment.get("strategyId", "unknown")
    time_c = commitment.get("timeComplexity", "unknown")
    insight_line = (
        f"\nNever state or directly imply this insight: \"{target_insight}\"\n"
        if target_insight else ""
    )
    return f"""You are a Socratic coding tutor for the problem "{problem_id}".

The learner has committed to:
- Strategy: {strategy}
- Time complexity: {time_c}
{insight_line}
Your job: ask probing questions that help the learner discover weaknesses or improvements WITHOUT naming a better strategy or stating the key insight.

Rules:
1. Never name the optimal strategy.
2. Never state the key insight — guide toward it with questions.
3. Ask exactly one focused question per response.
4. Be encouraging but intellectually challenging.
5. Keep responses to 2–4 sentences plus the question."""


@struggle_bp.route("/<problem_id>/struggle/chat", methods=["POST"])
def chat(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    commit_key = f"struggle_{problem_id}_commitment"
    commitment = session.get(commit_key)
    if not commitment:
        return jsonify({"error": "Must commit a strategy before chatting"}), 400

    data = request.get_json(force=True)
    messages = data.get("messages") or []
    target_insight = (data.get("targetInsight") or "").strip()

    if not messages:
        return jsonify({"error": "messages array is required"}), 400

    system_prompt = _socratic_system_prompt(problem_id, commitment, target_insight)

    client = anthropic.Anthropic(api_key=env.get("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=system_prompt,
        messages=messages,
    )
    assistant_text = response.content[0].text

    _persist_attempt(
        user.get("sub"), problem_id,
        jsonb={"chat_turns": messages + [{"role": "assistant", "content": assistant_text}]},
    )

    return jsonify({"content": assistant_text})


# ── /evaluate-insight ─────────────────────────────────────────────────────────

@struggle_bp.route("/<problem_id>/struggle/evaluate-insight", methods=["POST"])
def evaluate_insight(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    commit_key = f"struggle_{problem_id}_commitment"
    if not session.get(commit_key):
        return jsonify({"error": "Must commit a strategy before evaluating insight"}), 400

    data = request.get_json(force=True)
    insight_text = (data.get("insight") or "").strip()
    insight_rubric = data.get("insightRubric") or []

    if not insight_text:
        return jsonify({"error": "insight is required"}), 400
    if not isinstance(insight_rubric, list) or not insight_rubric:
        return jsonify({"error": "insightRubric array is required"}), 400

    fail_key = f"struggle_{problem_id}_insight_fails"
    fail_count = session.get(fail_key, 0)

    if fail_count >= 2:
        _finish_struggle(problem_id, user.get("sub"), insight_text, passed=True)
        return jsonify({"pass": True, "forced": True})

    client = anthropic.Anthropic(api_key=env.get("ANTHROPIC_API_KEY"))
    rubric_str = "\n".join(f"- {r}" for r in insight_rubric)

    eval_prompt = f"""Evaluate whether the student's insight paragraph meets ALL rubric criteria for the problem "{problem_id}".

Rubric (ALL must be met to pass):
{rubric_str}

Student's insight:
"{insight_text}"

Respond ONLY with valid JSON — no markdown fences, no explanation:
{{"pass": true}} or {{"pass": false, "feedback": "one sentence identifying the weakest unmet criterion"}}"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=256,
        messages=[{"role": "user", "content": eval_prompt}],
    )

    raw = response.content[0].text.strip()
    try:
        result = json.loads(raw)
    except (json.JSONDecodeError, ValueError):
        result = {"pass": True}  # malformed response — be generous

    if result.get("pass"):
        _finish_struggle(problem_id, user.get("sub"), insight_text, passed=True)
        return jsonify({"pass": True, "feedback": None})

    session[fail_key] = fail_count + 1
    session.modified = True
    _persist_attempt(user.get("sub"), problem_id, plain={"insight_attempts": session[fail_key]})

    return jsonify({
        "pass": False,
        "feedback": result.get("feedback", ""),
        "attemptsRemaining": max(0, 2 - session[fail_key]),
    })


def _finish_struggle(problem_id, user_sub, insight_text, passed):
    for suffix in ("_commitment", "_insight_fails"):
        session.pop(f"struggle_{problem_id}{suffix}", None)
    session.modified = True

    if not user_sub:
        return
    with db.engine.connect() as conn:
        conn.execute(text("""
            UPDATE phase_attempts
            SET insight_text = :insight, insight_passed = :passed, updated_at = NOW()
            WHERE user_sub = :sub AND problem_id = :problem_id AND phase = 'struggle'
        """), {
            "sub": user_sub,
            "problem_id": problem_id,
            "insight": insight_text,
            "passed": passed,
        })
        conn.execute(text("""
            INSERT INTO learn_progress (user_sub, problem_id, phase_completed, completed_at)
            VALUES (:sub, :problem_id, 'struggle', NOW())
            ON CONFLICT (user_sub, problem_id, phase_completed) DO NOTHING
        """), {"sub": user_sub, "problem_id": problem_id})
        conn.commit()
