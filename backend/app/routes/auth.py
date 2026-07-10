from os import environ as env
from flask import request, Blueprint, session, jsonify, current_app
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from app.extensions import db
from services.email_service import send_welcome_email
import httpx

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

DOMAIN = env.get("AUTH0_DOMAIN")
CLIENT_ID = env.get("AUTH0_CLIENT_ID")
CLIENT_SECRET = env.get("AUTH0_CLIENT_SECRET")
CONNECTION = "Username-Password-Authentication"


def _token_for_password(email: str, password: str) -> dict:
    resp = httpx.post(f"https://{DOMAIN}/oauth/token", json={
        "grant_type": "http://auth0.com/oauth/grant-type/password-realm",
        "realm": CONNECTION,
        "username": email,
        "password": password,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": "openid profile email",
    })
    resp.raise_for_status()
    return resp.json()


def _userinfo(access_token: str) -> dict:
    resp = httpx.get(f"https://{DOMAIN}/userinfo",
                     headers={"Authorization": f"Bearer {access_token}"})
    resp.raise_for_status()
    return resp.json()


def _upsert_user(user: dict):
    with db.engine.connect() as conn:
        exists = conn.execute(
            text("SELECT 1 FROM users WHERE auth0_id = :sub"),
            {"sub": user["sub"]},
        ).fetchone()
        if not exists:
            username = user.get("name") or user.get("nickname") or user["email"].split("@")[0]
            try:
                conn.execute(
                    text("INSERT INTO users (auth0_id, email, username) VALUES (:sub, :email, :username)"),
                    {"sub": user["sub"], "email": user["email"], "username": username},
                )
                conn.commit()
            except IntegrityError:
                # Rare race: two signups landed on the same username between the
                # pre-check and this insert. Don't 500 — the Auth0 account (and
                # session) are still valid; the local row just stays unwritten.
                conn.rollback()
                return

            try:
                send_welcome_email(username, user["email"])
            except Exception:
                current_app.logger.exception("[welcome-email] failed to send to %s", user["email"])


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""

    try:
        tokens = _token_for_password(email, password)
    except httpx.HTTPStatusError as e:
        body = e.response.json()
        return jsonify({"error": body.get("error_description", "Invalid credentials")}), 401

    raw = _userinfo(tokens["access_token"])
    user = {k: raw.get(k) for k in ("sub", "email", "name", "nickname", "picture")}
    _upsert_user(user)
    session["user"] = user
    return jsonify(user)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(force=True)
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    password = data.get("password") or ""

    with db.engine.connect() as conn:
        if email and conn.execute(
            text("SELECT 1 FROM users WHERE LOWER(email) = LOWER(:email)"),
            {"email": email},
        ).fetchone():
            return jsonify({"error": "An account with this email already exists"}), 400
        if name and conn.execute(
            text("SELECT 1 FROM users WHERE LOWER(username) = LOWER(:name)"),
            {"name": name},
        ).fetchone():
            return jsonify({"error": "Username is already taken"}), 400

    resp = httpx.post(f"https://{DOMAIN}/dbconnections/signup", json={
        "client_id": CLIENT_ID,
        "email": email,
        "password": password,
        "connection": CONNECTION,
        "name": name,
    })

    if not resp.is_success:
        body = resp.json()
        return jsonify({"error": body.get("description") or body.get("message", "Signup failed")}), 400

    try:
        tokens = _token_for_password(email, password)
    except httpx.HTTPStatusError:
        return jsonify({"error": "Account created but login failed — please log in manually."}), 500

    raw = _userinfo(tokens["access_token"])
    user = {k: raw.get(k) for k in ("sub", "email", "name", "nickname", "picture")}
    if not user.get("name"):
        user["name"] = name
    _upsert_user(user)
    session["user"] = user
    return jsonify(user)


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(force=True)
    email = (data.get("email") or "").strip()
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        httpx.post(f"https://{DOMAIN}/dbconnections/change_password", json={
            "client_id": CLIENT_ID,
            "email": email,
            "connection": CONNECTION,
        })
    except httpx.HTTPError:
        pass

    # Always respond success regardless of whether the email is registered —
    # matches Auth0's own behavior for this endpoint, to avoid leaking
    # account existence.
    return jsonify({"ok": True})


@auth_bp.route("/social", methods=["POST"])
def social_login():
    data = request.get_json(force=True)
    access_token = data.get("access_token")
    mode = data.get("mode")  # 'login' or 'signup'
    if not access_token:
        return jsonify({"error": "Missing access token"}), 400

    try:
        raw = _userinfo(access_token)
    except httpx.HTTPStatusError:
        return jsonify({"error": "Invalid or expired token"}), 401

    email = raw.get("email") or ""

    # Google and email/password are separate Auth0 identities (different
    # auth0_id) even for the same person, so email — not auth0_id — is the
    # thing that actually identifies "an existing account" here.
    with db.engine.connect() as conn:
        existing = conn.execute(
            text("SELECT auth0_id, email, username FROM users WHERE LOWER(email) = LOWER(:email)"),
            {"email": email},
        ).mappings().fetchone()

    if mode == "signup":
        if existing:
            return jsonify({"error": "An account with this email already exists"}), 400
        user = {k: raw.get(k) for k in ("sub", "email", "name", "nickname", "picture")}
        _upsert_user(user)
        session["user"] = user
        return jsonify(user)

    # Login: never create an account here — only sign in if one already exists.
    if not existing:
        return jsonify({"error": "No account found for this email. Please sign up first."}), 404
    user = {"sub": existing["auth0_id"], "email": existing["email"], "name": existing["username"]}
    session["user"] = user
    return jsonify(user)


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@auth_bp.route("/me")
def me():
    user = session.get("user")
    if not user:
        return jsonify({}), 401

    with db.engine.connect() as conn:
        exists = conn.execute(
            text("SELECT 1 FROM users WHERE auth0_id = :sub"),
            {"sub": user["sub"]},
        ).fetchone()

    if not exists:
        # Row was deleted (or never landed — see _upsert_user's race guard)
        # since this session was issued. Don't keep honoring a cookie for an
        # account that no longer exists.
        session.clear()
        return jsonify({}), 401

    return jsonify(user)
