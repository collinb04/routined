from flask import Blueprint, request, session, jsonify
from sqlalchemy import text
from app.extensions import db

learn_bp = Blueprint('learn', __name__, url_prefix='/api/learn')


def _current_user():
    return session.get("user")


@learn_bp.route("/completed", methods=["GET"])
def get_completed_sections():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    with db.engine.connect() as conn:
        rows = conn.execute(text("""
            SELECT section_id FROM learn_section_completions WHERE user_sub = :sub
        """), {"sub": user["sub"]}).mappings().all()

    return jsonify({"sectionIds": [r["section_id"] for r in rows]})


@learn_bp.route("/completed/toggle", methods=["POST"])
def toggle_completed_section():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    section_id = data.get("sectionId")
    completed = bool(data.get("completed"))
    if not section_id:
        return jsonify({"error": "sectionId is required"}), 400

    with db.engine.connect() as conn:
        if completed:
            conn.execute(text("""
                INSERT INTO learn_section_completions (user_sub, section_id, completed_at)
                VALUES (:sub, :section_id, NOW())
                ON CONFLICT (user_sub, section_id) DO NOTHING
            """), {"sub": user["sub"], "section_id": section_id})
        else:
            conn.execute(text("""
                DELETE FROM learn_section_completions WHERE user_sub = :sub AND section_id = :section_id
            """), {"sub": user["sub"], "section_id": section_id})
        conn.commit()

    return jsonify({"ok": True})
