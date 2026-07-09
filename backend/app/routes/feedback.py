from flask import request, Blueprint, jsonify, current_app

feedback_bp = Blueprint('feedback', __name__, url_prefix='/api/problems')


# ── /bug-report ──────────────────────────────────────────────────────────────
# No ticketing system yet — reports just land in the server log for now.

@feedback_bp.route("/<problem_id>/bug-report", methods=["POST"])
def report_bug(problem_id):
    data = request.get_json(force=True)
    description = (data.get("description") or "").strip()
    phase = (data.get("phase") or "").strip()

    if not description:
        return jsonify({"error": "description is required"}), 400

    current_app.logger.warning(f"[bug-report] problem={problem_id} phase={phase!r}: {description}")

    return jsonify({"ok": True})
