import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-change-in-production')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Without this, session.permanent=True cookies default to a 31-day
    # lifetime anyway, but setting it explicitly keeps cookie lifetime and
    # any future "remember me" logic in one place.
    PERMANENT_SESSION_LIFETIME = timedelta(days=30)

    # Both cookie flags derive from APP_BASE_URL being https:// (i.e. deployed,
    # not local dev). Secure requires https or browsers silently drop the
    # cookie. SameSite=None is needed because prod serves the frontend from a
    # separate origin (its own Cloud Run service) — cross-site fetches only
    # carry the cookie when SameSite=None, which in turn requires Secure.
    # Local dev stays Lax/non-secure: http, and same-origin via the Vite proxy.
    _IS_DEPLOYED = os.getenv('APP_BASE_URL', '').startswith('https://')
    SESSION_COOKIE_SECURE = _IS_DEPLOYED
    SESSION_COOKIE_SAMESITE = 'None' if _IS_DEPLOYED else 'Lax'
    SESSION_COOKIE_HTTPONLY = True

    # Firebase Hosting's CDN strips every request cookie except one named
    # exactly "__session" before proxying to a Cloud Run/Functions rewrite
    # target (by design, to keep its cache key stable) — Flask's default
    # cookie name ("session") gets silently dropped on every request that
    # goes through the rewrite. https://firebase.google.com/docs/hosting/manage-cache
    SESSION_COOKIE_NAME = '__session'

    # Frontend origin(s) allowed to call this API with credentials (cookies).
    # Comma-separated. Empty in local dev — the Vite proxy makes frontend and
    # backend same-origin there, so no CORS headers are needed.
    CORS_ORIGINS = [o.strip() for o in os.getenv('CORS_ORIGINS', '').split(',') if o.strip()]

    RESEND_API_KEY = os.getenv('RESEND_API_KEY')
    CONTACT_EMAIL_FROM = os.getenv('CONTACT_EMAIL_FROM', 'onboarding@resend.dev')
    CONTACT_EMAIL_TO = os.getenv('CONTACT_EMAIL_TO', 'routinedlearning@gmail.com')