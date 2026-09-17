from flask import Blueprint, request, session, jsonify
from sqlalchemy import text
from app.extensions import db

learn_mode_bp = Blueprint('learn_mode', __name__, url_prefix='/api/learn-mode')


def _current_user():
    return session.get("user")


@learn_mode_bp.route("", methods=["GET"])
def get_learn_mode():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    with db.engine.connect() as conn:
        row = conn.execute(text("""
            SELECT learn_mode FROM user_settings WHERE user_sub = :sub
        """), {"sub": user["sub"]}).mappings().first()

    return jsonify({"learnMode": bool(row["learn_mode"]) if row else False})


@learn_mode_bp.route("", methods=["PATCH"])
def update_learn_mode():
    user = _current_user()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(force=True)
    learn_mode = bool(data.get("learnMode"))

    with db.engine.connect() as conn:
        conn.execute(text("""
            INSERT INTO user_settings (user_sub, learn_mode, updated_at)
            VALUES (:sub, :learn_mode, NOW())
            ON CONFLICT (user_sub)
            DO UPDATE SET learn_mode = :learn_mode, updated_at = NOW()
        """), {"sub": user["sub"], "learn_mode": learn_mode})
        conn.commit()

    return jsonify({"ok": True})
