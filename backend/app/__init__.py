from flask import Flask
from config import Config
from .extensions import db
from .routes.auth import auth_bp
from .routes.struggle import struggle_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(struggle_bp)

    return app