# Local setup

## Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- PostgreSQL 16 (a `docker-compose.yml` is provided in `backend/` if you'd rather not install Postgres directly)
- An [Auth0](https://auth0.com) tenant (free tier is fine)
- An [Anthropic](https://console.anthropic.com) API key
- A [Resend](https://resend.com) API key (optional locally — email sending fails silently if unset)

## 1. Database

From `backend/`, start Postgres via Docker (credentials are defined in `docker-compose.yml`):

```bash
cd backend
docker compose up -d
```

Or point `DATABASE_URL` at any Postgres 16 instance you already have.

Run the migrations, in order — there's no migration runner (no Alembic/Flask-Migrate), just plain SQL files applied manually:

```bash
for f in migrations/00*.sql; do psql "$DATABASE_URL" -f "$f"; done
```

## 2. Auth0 tenant setup

The app uses Auth0 as the identity provider but keeps its own session cookie rather than a client-side token (see [`ARCHITECTURE.md`](ARCHITECTURE.md)). In your Auth0 dashboard:

1. Create a **Regular Web Application**.
2. Under **Connections**, enable the **Username-Password-Authentication** database connection (this exact name is hard-coded in `backend/app/routes/auth.py`).
3. Under the application's **Settings**, add `http://localhost:5173/login/callback` to **Allowed Callback URLs**, and `http://localhost:5173` to **Allowed Web Origins** / **Allowed Logout URLs**.
4. Under the application's **APIs / Grant Types**, ensure the password grant is enabled (Auth0 calls this "Password" under Advanced settings) — the backend exchanges email/password for a token server-side via this grant.
5. Note the tenant's **Domain**, and the application's **Client ID** and **Client Secret**.

## 3. Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in DATABASE_URL, AUTH0_*, ANTHROPIC_API_KEY, etc.
python run.py
```

Runs on `http://localhost:5000`.

## 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # fill in VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID
npm run dev
```

Runs on `http://localhost:5173` (Vite's dev server proxies `/auth` and `/api` to `http://localhost:5000` — see `frontend/vite.config.ts` — so both must be running for the app to work).

## Troubleshooting

- **`/auth/me` always 401s / you get logged out immediately after login.** Usually `FLASK_SECRET_KEY` changed between requests (e.g. the backend restarted with a different value, invalidating existing session cookies) — clear cookies and log in again.
- **Login/signup returns an Auth0 error about the connection or grant type.** Double check the `Username-Password-Authentication` connection and password grant are both enabled on the Auth0 application (step 2 above) — the backend calls Auth0's token and `/dbconnections/signup` endpoints directly, so these aren't optional.
- **Migrations fail with "relation already exists."** All migration files are written with `IF NOT EXISTS` / `ON CONFLICT` guards specifically so they're safe to re-run — if you hit a real conflict, check you ran them in numeric order.
