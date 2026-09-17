# API reference

All endpoints are served by the Flask backend. In local dev, the frontend reaches them through Vite's proxy (`/auth` and `/api` → `http://localhost:5000`), so relative paths work from the browser as-is.

**Auth model**: session-cookie based, not token based. `POST /auth/login`, `/auth/signup`, or `/auth/social` set an httpOnly Flask session cookie; every other endpoint below marked "session" reads `session['user']` and returns `401 {"error": "Unauthorized"}` if it's missing. Requests that need the cookie must be made with `credentials: 'include'`.

---

## Auth — `/auth`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/auth/login` | — | `{ email, password }` | Exchanges credentials for an Auth0 token (Resource-Owner-Password grant), upserts the local `users` row, sets the session. Returns the user object or `401`. |
| POST | `/auth/signup` | — | `{ name, email, password }` | Pre-checks email/username uniqueness locally, creates the Auth0 account, logs in, sends a welcome email. Returns the user object or `400`. |
| POST | `/auth/forgot-password` | — | `{ email }` | Triggers Auth0's password-reset email. Always returns `{"ok": true}`, even for unknown emails (avoids account enumeration). |
| POST | `/auth/social` | — | `{ access_token, mode: "login" \| "signup" }` | Verifies the token via Auth0's `/userinfo`. `signup` creates an account if none exists for that email; `login` only succeeds if one already does (`404` otherwise). |
| POST | `/auth/logout` | — | — | Clears the session. |
| GET | `/auth/me` | session | — | Returns the current session user; `401`s (and clears the session) if the underlying `users` row was deleted. |

User object shape: `{ sub, email, name, nickname, picture }`.

---

## Problems — phase progress — `/api/problems`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/api/problems/:id/progress` | session | — | Returns `{ dissect, struggle, attack }`, each `{ state, completed, completedAt, updatedAt }`. |
| POST | `/api/problems/:id/dissect/progress` | session | `{ clues: [...], completed?: bool }` | Saves the clue-decoder array state; marks Dissect complete if `completed` is truthy. |
| POST | `/api/problems/:id/attack/progress` | session | `{ code?, lastRun?, completed?: bool }` | Saves editor code / last test run; marks Attack complete if `completed` is truthy. At least one of `code`/`lastRun` is required. |

---

## Problems — Struggle & Optimize (AI tutor) — `/api/problems`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/api/problems/:id/struggle/commit` | session | `{ strategyId, timeComplexity, spaceComplexity, planSteps: [...≥2], synthesisText?, stepOrderNote? }` | Records a strategy commitment. Returns `{ ok, revise }` — `revise` is `true` if this replaces an earlier commitment. |
| POST | `/api/problems/:id/struggle/chat` | session | `{ messages: [...], targetInsight? }` | The **graded** Socratic chat — requires a prior `/commit` (`400` otherwise). Calls Claude with a system prompt that forbids naming the strategy or stating the insight. Returns `{ content }`. Currently superseded in the UI by `/tutor-chat` below (see `ARCHITECTURE.md`). |
| POST | `/api/problems/:id/struggle/tutor-chat` | session | `{ messages: [...], problemContext?, options?, targetInsight?, code?, runError? }` | The **ungated**, general-purpose tutor chat — no prior commit required, no fixed stage. `code`/`runError` (the learner's current Attack-tab editor contents / last run error) are optional and only referenced by the model when the learner explicitly asks for debugging help. Returns `{ content }`. |
| POST | `/api/problems/:id/struggle/evaluate-insight` | session | `{ insight, insightRubric: [...] }` | Requires a prior `/commit`. Grades the learner's free-text insight against the rubric via an LLM call. Auto-passes (`{"pass": true, "forced": true}`) after 2 prior failures. Otherwise returns `{ pass, feedback?, attemptsRemaining? }`. |
| POST | `/api/problems/:id/struggle/reset` | session | — | Clears in-session struggle state and deletes all `phase_attempts`/`learn_progress` rows for that problem. |

---

## Problems — feedback — `/api/problems`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/api/problems/:id/bug-report` | — | `{ description, phase? }` | Logs a warning server-side and emails the report. No ticketing system. |

---

## Checklist — `/api/checklist`

The manual "done" checkboxes on the `/problems` curriculum page — independent of phase progress above.

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/api/checklist` | session | — | Returns `{ [topicId]: { [problemId]: true } }` for every checked box. |
| POST | `/api/checklist/toggle` | session | `{ topicId, problemId, done }` | Upserts the checked state for one `(topicId, problemId)` pair. |

---

## Learn section — `/api/learn`

"Mark as completed" toggles for pages/subsections in the Learn section.

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/api/learn/completed` | session | — | Returns `{ sectionIds: [...] }`. |
| POST | `/api/learn/completed/toggle` | session | `{ sectionId, completed }` | Inserts or deletes the completion row. |

---

## Learn mode — `/api/learn-mode`

The global per-user progression-gate preference.

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| GET | `/api/learn-mode` | session | — | Returns `{ learnMode: boolean }` (`false` if unset). |
| PATCH | `/api/learn-mode` | session | `{ learnMode: boolean }` | Upserts the preference. |

---

## Contact — `/api`

| Method | Path | Auth | Body | Notes |
|---|---|---|---|---|
| POST | `/api/contact` | — | `{ name, email, message }` | Public marketing contact form. Validates email format server-side and emails the message. |

---

## Error shape

Error responses are `{ "error": "<message>" }` with a non-2xx status — `400` for validation failures, `401` for missing/invalid auth, `404` for a social login with no matching account, `502` if outbound email sending fails.
