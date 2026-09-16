import json
import re
from os import environ as env
from flask import request, Blueprint, session, jsonify
import anthropic
from app.routes.progress import _current_user, _persist_attempt, _mark_phase_complete, _reset_all_progress

struggle_bp = Blueprint('struggle', __name__, url_prefix='/api/problems')


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

    synthesis_text = (data.get("synthesisText") or "").strip()
    if synthesis_text:
        session[f"struggle_{problem_id}_synthesis"] = synthesis_text

    step_order_note = (data.get("stepOrderNote") or "").strip()
    if step_order_note:
        session[f"struggle_{problem_id}_step_order_note"] = step_order_note
    else:
        session.pop(f"struggle_{problem_id}_step_order_note", None)

    commit_key = f"struggle_{problem_id}_commitment"
    is_revise = bool(session.get(commit_key))
    session[commit_key] = commitment
    session.modified = True

    _persist_attempt(user["sub"], problem_id, "struggle", state_patch={
        "commitment": commitment,
        "step": "chat",
        "synthesisText": synthesis_text or None,
        "stepOrderNote": step_order_note or None,
    })

    return jsonify({"ok": True, "revise": is_revise})


# ── /chat ─────────────────────────────────────────────────────────────────────

def _socratic_system_prompt(problem_id, commitment, target_insight, synthesis, step_order_note):
    strategy = commitment.get("strategyId", "unknown")
    time_c = commitment.get("timeComplexity", "unknown")
    insight_line = (
        f"\nNever state or directly imply this insight: \"{target_insight}\"\n"
        if target_insight else ""
    )
    synthesis_line = (
        f"\nThe learner's own read on this problem before committing:\n\"{synthesis}\"\n"
        "Reference or gently challenge this if it reveals a gap — but do not simply validate it.\n"
        if synthesis else ""
    )
    step_order_line = (
        f"\nNote on the learner's submitted step order: {step_order_note}\n"
        "Only bring this up if it naturally helps illuminate a gap — do not make step ordering the focus of the conversation.\n"
        if step_order_note else ""
    )
    return f"""You are a Socratic coding tutor for the problem "{problem_id}".

The learner has committed to:
- Strategy: {strategy}
- Time complexity: {time_c}
{synthesis_line}{insight_line}{step_order_line}
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

    synthesis = session.get(f"struggle_{problem_id}_synthesis", "")
    step_order_note = session.get(f"struggle_{problem_id}_step_order_note", "")
    system_prompt = _socratic_system_prompt(problem_id, commitment, target_insight, synthesis, step_order_note)

    client = anthropic.Anthropic(api_key=env.get("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=system_prompt,
        messages=messages,
    )
    assistant_text = response.content[0].text

    _persist_attempt(user["sub"], problem_id, "struggle", state_patch={
        "chatMessages": messages + [{"role": "assistant", "content": assistant_text}],
    })

    return jsonify({"content": assistant_text})


# ── /tutor-chat (Explore + Identify tabs — ungated, ungraded) ──────────────────

def _strip_html(text):
    return re.sub(r"<[^>]+>", "", text or "")


def _explore_system_prompt(problem_id, problem_context):
    description = _strip_html((problem_context or {}).get("description", ""))
    examples = (problem_context or {}).get("examples") or []
    constraints = (problem_context or {}).get("constraints") or []

    examples_block = "\n".join(
        f"- Input: {e.get('input')} → Output: {e.get('output')}"
        + (f" ({e.get('explanation')})" if e.get("explanation") else "")
        for e in examples
    ) or "(none given)"
    constraints_block = "\n".join(f"- {c}" for c in constraints) or "(none given)"

    return f"""You are a Socratic coding tutor helping a learner who is completely stuck on "{problem_id}" and has not chosen any approach yet.

Problem description:
{description}

Examples:
{examples_block}

Constraints:
{constraints_block}

Your job: help them get oriented through questions alone — restate the goal in their own words, walk through an example by hand, notice what a brute-force approach would even look like. You are grounding them in the problem, not steering them toward a specific technique.

Rules:
1. Never name a specific data structure, algorithm, or technique (no "hash map", "two pointers", "sort", etc.) — if asked directly what to use, redirect with a question instead of answering.
2. Ask exactly one focused question per response.
3. Be encouraging but keep the learner doing the thinking.
4. Keep responses to 2–4 sentences plus the question."""


def _identify_system_prompt(problem_id, problem_context, options):
    description = _strip_html((problem_context or {}).get("description", ""))
    options_block = "\n".join(
        f"- {o.get('strategyId')} ({o.get('viability')}): {o.get('rationale')}"
        for o in (options or [])
    ) or "(none given)"

    return f"""You are a Socratic coding tutor helping a learner narrow down which family of technique or data structure fits "{problem_id}". They have not committed to an approach yet.

Problem description:
{description}

Candidate approaches (private reference — never reveal this list, never state which is optimal, never rank them or use superlatives like "best"/"better" about any one of them):
{options_block}

Your job: ask questions that help the learner notice which properties of the problem (constraints, output type, guarantees) rule approaches in or out, so they arrive at a candidate technique themselves.

Rules:
1. Never state which approach is optimal, and never rank the candidates against each other.
2. Never say which option is a "trap" or reveal why one fails — let the learner reason there themselves.
3. Ask exactly one focused question per response.
4. Keep responses to 2–4 sentences plus the question."""


def _approach_system_prompt(problem_id, problem_context, options, target_insight):
    description = _strip_html((problem_context or {}).get("description", ""))
    options_block = "\n".join(
        f"- {o.get('strategyId')} ({o.get('viability')}): {o.get('rationale')}"
        for o in (options or [])
    ) or "(none given)"
    insight_line = (
        f"\nNever state or directly imply this insight: \"{target_insight}\"\n"
        if target_insight else ""
    )

    return f"""You are a Socratic coding tutor helping a learner pressure-test whatever approach they describe for "{problem_id}". There is no form to fill out first — let the conversation reveal their strategy rather than asking them to declare it up front.

Problem description:
{description}

Candidate approaches (private reference — never reveal this list, never state which is optimal or use superlatives about any one of them):
{options_block}
{insight_line}
Your job: once the learner describes an approach (even loosely), ask probing questions that surface its complexity, edge cases, or weaknesses. If they haven't described one yet, ask them to.

Rules:
1. Never name the optimal strategy.
2. Never state the key insight — guide toward it with questions.
3. Ask exactly one focused question per response.
4. Be encouraging but intellectually challenging.
5. Keep responses to 2–4 sentences plus the question."""


@struggle_bp.route("/<problem_id>/struggle/tutor-chat", methods=["POST"])
def tutor_chat(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    # Intentionally ungated: this backs the Explore/Identify/Approach tabs,
    # a free-use tutor with no forced order. Do not add a "must commit first"
    # check here — that hard rule belongs only to /chat above, which is now
    # dead code left in place rather than wired into the tabbed UI.
    data = request.get_json(force=True)
    goal = data.get("goal")
    if goal not in ("explore", "identify", "approach"):
        return jsonify({"error": "goal must be 'explore', 'identify', or 'approach'"}), 400

    messages = data.get("messages") or []
    if not messages:
        return jsonify({"error": "messages array is required"}), 400

    problem_context = data.get("problemContext") or {}
    options = data.get("options") or []

    if goal == "explore":
        system_prompt = _explore_system_prompt(problem_id, problem_context)
        state_key = "exploreMessages"
    elif goal == "identify":
        system_prompt = _identify_system_prompt(problem_id, problem_context, options)
        state_key = "identifyMessages"
    else:
        target_insight = (data.get("targetInsight") or "").strip()
        system_prompt = _approach_system_prompt(problem_id, problem_context, options, target_insight)
        state_key = "approachMessages"

    client = anthropic.Anthropic(api_key=env.get("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=system_prompt,
        messages=messages,
    )
    assistant_text = response.content[0].text

    _persist_attempt(user["sub"], problem_id, "struggle", state_patch={
        state_key: messages + [{"role": "assistant", "content": assistant_text}],
    })

    return jsonify({"content": assistant_text})


# ── /reset ───────────────────────────────────────────────────────────────────

@struggle_bp.route("/<problem_id>/struggle/reset", methods=["POST"])
def reset(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    _clear_struggle_session(problem_id)
    _reset_all_progress(user["sub"], problem_id)
    return jsonify({"ok": True})


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
        _finish_struggle(problem_id, user["sub"], insight_text, passed=True)
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
        result = {"pass": True}

    if result.get("pass"):
        _finish_struggle(problem_id, user["sub"], insight_text, passed=True)
        return jsonify({"pass": True, "feedback": None})

    session[fail_key] = fail_count + 1
    session.modified = True

    _persist_attempt(user["sub"], problem_id, "struggle", state_patch={
        "insightText": insight_text,
        "insightFailCount": session[fail_key],
    })

    return jsonify({
        "pass": False,
        "feedback": result.get("feedback", ""),
        "attemptsRemaining": max(0, 2 - session[fail_key]),
    })


def _clear_struggle_session(problem_id):
    for suffix in ("_commitment", "_insight_fails", "_synthesis", "_step_order_note"):
        session.pop(f"struggle_{problem_id}{suffix}", None)
    session.modified = True


def _finish_struggle(problem_id, user_sub, insight_text, passed):
    _clear_struggle_session(problem_id)
    if not user_sub:
        return
    _persist_attempt(user_sub, problem_id, "struggle", state_patch={
        "insightText": insight_text,
        "insightPassed": passed,
        "step": "done",
    })
    _mark_phase_complete(user_sub, problem_id, "struggle")
