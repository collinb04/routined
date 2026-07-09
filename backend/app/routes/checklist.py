from flask import Blueprint, request, session, jsonify
from sqlalchemy import text
from app.extensions import db

checklist_bp = Blueprint('checklist', __name__, url_prefix='/api/checklist')


def _current_user():
    return session.get("user")


@checklist_bp.route("", methods=["GET"])
def get_checklist():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    with db.engine.connect() as conn:
        rows = conn.execute(text("""
            SELECT topic_id, problem_id FROM problem_checklist
            WHERE user_sub = :sub AND done = TRUE
        """), {"sub": user["sub"]}).mappings().all()

    result = {}
    for r in rows:
        result.setdefault(r["topic_id"], {})[str(r["problem_id"])] = True
    return jsonify(result)


@checklist_bp.route("/toggle", methods=["POST"])
def toggle_checklist():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    topic_id = data.get("topicId")
    problem_id = data.get("problemId")
    done = bool(data.get("done"))
    if not topic_id or problem_id is None:
        return jsonify({"error": "topicId and problemId are required"}), 400

    with db.engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO problem_checklist (user_sub, topic_id, problem_id, done, updated_at)
            VALUES (:sub, :topic_id, :problem_id, :done, NOW())
            ON CONFLICT (user_sub, topic_id, problem_id)
            DO UPDATE SET done = :done, updated_at = NOW()
        """), {"sub": user["sub"], "topic_id": topic_id, "problem_id": problem_id, "done": done})
        conn.commit()

    return jsonify({"ok": True})
