import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-change-in-production')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # SESSION_COOKIE_SECURE only turns on once APP_BASE_URL is an https://
    # origin, so local http:// dev keeps working — browsers silently refuse
    # to store Secure cookies over plain HTTP, which would break login here.
    SESSION_COOKIE_SECURE = os.getenv('APP_BASE_URL', '').startswith('https://')
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

    RESEND_API_KEY = os.getenv('RESEND_API_KEY')
    CONTACT_EMAIL_FROM = os.getenv('CONTACT_EMAIL_FROM', 'onboarding@resend.dev')
    CONTACT_EMAIL_TO = os.getenv('CONTACT_EMAIL_TO', 'routinedlearning@gmail.com')