from flask import Flask
from config import Config
from .extensions import db
from .routes.auth import auth_bp
from .routes.struggle import struggle_bp
from .routes.feedback import feedback_bp
from .routes.progress import progress_bp
from .routes.checklist import checklist_bp
from .routes.learn import learn_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    app.register_blueprint(auth_bp)
    app.register_blueprint(struggle_bp)
    app.register_blueprint(feedback_bp)
    app.register_blueprint(progress_bp)
    app.register_blueprint(checklist_bp)
    app.register_blueprint(learn_bp)

    return app