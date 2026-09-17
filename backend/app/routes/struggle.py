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


# ── /tutor-chat (general free-use tutor — ungated, ungraded) ───────────────────

def _strip_html(text):
    return re.sub(r"<[^>]+>", "", text or "")


def _tutor_system_prompt(problem_id, problem_context, options, target_insight, code, run_error):
    description = _strip_html((problem_context or {}).get("description", ""))
    examples = (problem_context or {}).get("examples") or []
    constraints = (problem_context or {}).get("constraints") or []

    examples_block = "\n".join(
        f"- Input: {e.get('input')} → Output: {e.get('output')}"
        + (f" ({e.get('explanation')})" if e.get("explanation") else "")
        for e in examples
    ) or "(none given)"
    constraints_block = "\n".join(f"- {c}" for c in constraints) or "(none given)"
    options_block = "\n".join(
        f"- {o.get('strategyId')} ({o.get('viability')}): {o.get('rationale')}"
        for o in (options or [])
    ) or "(none given)"
    insight_line = (
        f"\nNever state or directly imply this insight: \"{target_insight}\"\n"
        if target_insight else ""
    )
    code_block = f"```\n{code}\n```" if (code or "").strip() else "(learner has not written any code yet)"
    run_error_line = (
        f"\nMost recent run error/output:\n\"{run_error}\"\n" if (run_error or "").strip() else ""
    )

    return f"""You are a Socratic coding tutor helping a learner work through "{problem_id}" — from first getting oriented, through picking an approach, to pressure-testing it. This is one continuous conversation with no fixed stages; infer where the learner is from the transcript so far and respond to that.

Problem description:
{description}

Examples:
{examples_block}

Constraints:
{constraints_block}

Candidate approaches (private reference — NEVER reveal this list, never name one, never rank them or use superlatives like "best"/"better"/"optimal" about any of them):
{options_block}
{insight_line}
The learner's current code (only look at this if they explicitly ask for help with their code, mention it's not working, or describe an error — otherwise ignore it and do not comment on it unprompted):
{code_block}
{run_error_line}
Default mode — Socratic, ask don't tell:
1. Never name a specific data structure, algorithm, or technique, and never name or rank which candidate approach is optimal — redirect with a question instead of answering directly.
2. Never state the key insight above — guide toward it with questions.
3. Ask exactly one focused question per response.
4. Be encouraging but keep the learner doing the thinking. Keep responses to 2–4 sentences plus the question.

Progressive relaxation — once the learner has described a concrete approach of their own (in their own words, even loosely — not just asked what to use), you may pressure-test THAT approach directly: surface its complexity, edge cases, or weaknesses through questions, and compare it against constraints they haven't considered. You may still never name a better approach or state the target insight outright — keep guiding them to it.

Debugging exception — if the learner explicitly asks for debugging help, pastes/references an error, or says their code isn't working, you may be more direct for that turn, but do not fully solve it for them: look at their code and the run error above and narrow down WHERE the bug likely is (name the specific line, variable, or piece of logic that looks off) and WHAT KIND of mistake it looks like (e.g. an off-by-one, a wrong comparison, mutating while iterating) — but do not rewrite their code, do not give a step-by-step fix, and do not paste corrected code. End with a question that points them at what to check or try next, so they make the actual fix themselves. Return to the Socratic default once the immediate bug is resolved and the conversation moves back to strategy."""


@struggle_bp.route("/<problem_id>/struggle/tutor-chat", methods=["POST"])
def tutor_chat(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    # Intentionally ungated: a free-use tutor with no forced order and no
    # "must commit first" check — that hard rule belongs only to /chat above,
    # which is now dead code left in place rather than wired into the UI.
    data = request.get_json(force=True)
    messages = data.get("messages") or []
    if not messages:
        return jsonify({"error": "messages array is required"}), 400

    problem_context = data.get("problemContext") or {}
    options = data.get("options") or []
    target_insight = (data.get("targetInsight") or "").strip()
    code = data.get("code")
    run_error = data.get("runError")

    system_prompt = _tutor_system_prompt(problem_id, problem_context, options, target_insight, code, run_error)

    client = anthropic.Anthropic(api_key=env.get("ANTHROPIC_API_KEY"))
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=system_prompt,
        messages=messages,
    )
    assistant_text = response.content[0].text

    _persist_attempt(user["sub"], problem_id, "struggle", state_patch={
        "messages": messages + [{"role": "assistant", "content": assistant_text}],
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
