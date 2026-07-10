from flask import request, Blueprint, jsonify, current_app

from services.email_service import send_bug_report_email

feedback_bp = Blueprint('feedback', __name__, url_prefix='/api/problems')


# ── /bug-report ──────────────────────────────────────────────────────────────
# No ticketing system yet — reports land in the server log and get emailed.

@feedback_bp.route("/<problem_id>/bug-report", methods=["POST"])
def report_bug(problem_id):
    data = request.get_json(force=True)
    description = (data.get("description") or "").strip()
    phase = (data.get("phase") or "").strip()

    if not description:
        return jsonify({"error": "description is required"}), 400

    current_app.logger.warning(f"[bug-report] problem={problem_id} phase={phase!r}: {description}")

    try:
        send_bug_report_email(problem_id, phase, description)
    except Exception:
        current_app.logger.exception("[bug-report] failed to send notification email")

    return jsonify({"ok": True})
