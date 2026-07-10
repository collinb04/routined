import html

import resend
from flask import current_app


def _send(to: str, subject: str, html_body: str, reply_to: str | None = None) -> None:
    resend.api_key = current_app.config['RESEND_API_KEY']

    payload = {
        "from": current_app.config['CONTACT_EMAIL_FROM'],
        "to": to,
        "subject": subject,
        "html": html_body,
    }
    if reply_to:
        payload["reply_to"] = reply_to

    resend.Emails.send(payload)


def send_contact_email(name: str, email: str, message: str) -> None:
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message).replace("\n", "<br>")

    _send(
        to=current_app.config['CONTACT_EMAIL_TO'],
        subject=f"New contact form message from {name}",
        html_body=(
            f"<p><strong>Name:</strong> {safe_name}</p>"
            f"<p><strong>Email:</strong> {safe_email}</p>"
            f"<p><strong>Message:</strong></p>"
            f"<p>{safe_message}</p>"
        ),
        reply_to=email,
    )


def send_bug_report_email(problem_id: str, phase: str, description: str) -> None:
    safe_problem_id = html.escape(problem_id)
    safe_phase = html.escape(phase) or "unknown"
    safe_description = html.escape(description).replace("\n", "<br>")

    _send(
        to=current_app.config['CONTACT_EMAIL_TO'],
        subject=f"Bug report: {problem_id}",
        html_body=(
            f"<p><strong>Problem:</strong> {safe_problem_id}</p>"
            f"<p><strong>Phase:</strong> {safe_phase}</p>"
            f"<p><strong>Description:</strong></p>"
            f"<p>{safe_description}</p>"
        ),
    )


def send_welcome_email(name: str, email: str) -> None:
    safe_name = html.escape(name or "there")

    _send(
        to=email,
        subject="Welcome to Routined",
        html_body=(
            f"<p>Hi {safe_name},</p>"
            f"<p>Welcome to Routined — glad to have you here. Jump back in anytime to keep "
            f"building your problem-solving reps.</p>"
        ),
    )
