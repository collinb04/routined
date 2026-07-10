import re

from flask import request, Blueprint, jsonify, current_app

from services.email_service import send_contact_email

contact_bp = Blueprint('contact', __name__, url_prefix='/api')

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


@contact_bp.route("/contact", methods=["POST"])
def submit_contact_form():
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify({"error": "name, email, and message are required"}), 400
    if not EMAIL_RE.match(email):
        return jsonify({"error": "a valid email is required"}), 400

    try:
        send_contact_email(name, email, message)
    except Exception:
        current_app.logger.exception("[contact] failed to send contact email")
        return jsonify({"error": "failed to send message"}), 502

    return jsonify({"ok": True})
