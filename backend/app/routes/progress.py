import json
from flask import Blueprint, request, session, jsonify
from sqlalchemy import text
from app.extensions import db

progress_bp = Blueprint('progress', __name__, url_prefix='/api/problems')

PHASES = ("dissect", "struggle", "attack")


def _current_user():
    return session.get("user")


def _load_all_phases(user_sub, problem_id):
    if not user_sub:
        return {}
    with db.engine.connect() as conn:
        rows = conn.execute(text("""
            SELECT phase, state, completed, completed_at, updated_at FROM phase_attempts
            WHERE user_sub = :sub AND problem_id = :problem_id
        """), {"sub": user_sub, "problem_id": problem_id}).mappings().all()
    return {r["phase"]: r for r in rows}


def _persist_attempt(user_sub, problem_id, phase, *, state_patch=None, completed=None):
    """Upsert a phase_attempts row; shallow-merges state_patch into `state`,
    optionally flips completed/completed_at."""
    if not user_sub:
        return
    with db.engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO phase_attempts (user_sub, problem_id, phase, created_at, updated_at)
            VALUES (:sub, :problem_id, :phase, NOW(), NOW())
            ON CONFLICT (user_sub, problem_id, phase) DO NOTHING
        """), {"sub": user_sub, "problem_id": problem_id, "phase": phase})

        set_clauses = ["updated_at = NOW()"]
        params = {"sub": user_sub, "problem_id": problem_id, "phase": phase}
        if state_patch is not None:
            set_clauses.append("state = state || CAST(:patch AS jsonb)")
            params["patch"] = json.dumps(state_patch)
        if completed is not None:
            set_clauses.append("completed = :completed")
            params["completed"] = completed
            if completed:
                set_clauses.append("completed_at = NOW()")
        conn.execute(text(
            f"UPDATE phase_attempts SET {', '.join(set_clauses)} "
            "WHERE user_sub = :sub AND problem_id = :problem_id AND phase = :phase"
        ), params)
        conn.commit()


def _mark_phase_complete(user_sub, problem_id, phase):
    _persist_attempt(user_sub, problem_id, phase, completed=True)
    if not user_sub:
        return
    with db.engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO learn_progress (user_sub, problem_id, phase_completed, completed_at)
            VALUES (:sub, :problem_id, :phase, NOW())
            ON CONFLICT (user_sub, problem_id, phase_completed) DO NOTHING
        """), {"sub": user_sub, "problem_id": problem_id, "phase": phase})
        conn.commit()


def _reset_all_progress(user_sub, problem_id):
    if not user_sub:
        return
    with db.engine.connect() as conn:
        conn.execute(text("DELETE FROM phase_attempts WHERE user_sub = :sub AND problem_id = :problem_id"),
                     {"sub": user_sub, "problem_id": problem_id})
        conn.execute(text("DELETE FROM learn_progress WHERE user_sub = :sub AND problem_id = :problem_id"),
                     {"sub": user_sub, "problem_id": problem_id})
        conn.commit()


# ── /progress ────────────────────────────────────────────────────────────────

@progress_bp.route("/<problem_id>/progress", methods=["GET"])
def get_progress(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    rows = _load_all_phases(user["sub"], problem_id)

    def _shape(phase):
        r = rows.get(phase)
        if not r:
            return {"state": {}, "completed": False, "completedAt": None, "updatedAt": None}
        return {
            "state": r["state"] or {},
            "completed": bool(r["completed"]),
            "completedAt": r["completed_at"].isoformat() if r["completed_at"] else None,
            "updatedAt": r["updated_at"].isoformat() if r["updated_at"] else None,
        }

    return jsonify({phase: _shape(phase) for phase in PHASES})


# ── /dissect/progress ────────────────────────────────────────────────────────

@progress_bp.route("/<problem_id>/dissect/progress", methods=["POST"])
def save_dissect_progress(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    clues = data.get("clues")
    if not isinstance(clues, list):
        return jsonify({"error": "clues array is required"}), 400

    _persist_attempt(user["sub"], problem_id, "dissect", state_patch={"clues": clues})
    if data.get("completed"):
        _mark_phase_complete(user["sub"], problem_id, "dissect")

    return jsonify({"ok": True})


# ── /attack/progress ─────────────────────────────────────────────────────────

@progress_bp.route("/<problem_id>/attack/progress", methods=["POST"])
def save_attack_progress(problem_id):
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    patch = {k: data[k] for k in ("code", "lastRun") if k in data}
    if not patch:
        return jsonify({"error": "code or lastRun is required"}), 400

    _persist_attempt(user["sub"], problem_id, "attack", state_patch=patch)
    if data.get("completed"):
        _mark_phase_complete(user["sub"], problem_id, "attack")

    return jsonify({"ok": True})
