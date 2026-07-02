from os import environ as env
from flask import request, Blueprint, session, jsonify
from sqlalchemy import text
from app.extensions import db
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
            conn.execute(
                text("INSERT INTO users (auth0_id, email, username) VALUES (:sub, :email, :username)"),
                {"sub": user["sub"], "email": user["email"],
                 "username": user.get("nickname") or user["email"].split("@")[0]},
            )
            conn.commit()


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


@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@auth_bp.route("/me")
def me():
    user = session.get("user")
    if not user:
        return jsonify({}), 401
    return jsonify(user)
