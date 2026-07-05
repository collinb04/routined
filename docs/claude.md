# Routined

DSA learning platform teaching pattern recognition, not solution memorization. Users work each problem through four sequential phases: **Dissect** (clue decoder — multiple-choice questions about problem signals) → **Brute Force** (Socratic chat) → **Optimize** (Socratic chat) → **Attack** (code editor, Python via Pyodide in-browser).

## Stack

- **Frontend:** Vue 3, Composition API, Pinia, Tailwind. Code execution via Pyodide (Python only).
- **Backend:** Flask (application factory pattern), SQLAlchemy Core with **raw SQL — no ORM models**. Auth0 via direct HTTP calls (no SDK).
- **Database:** PostgreSQL 16 in Docker (container `routined_db`, port 5432). Four tables only: `users`, `learn_progress`, `problem_sessions`, `phase_attempts`. User/session data only — **problem content is never stored in the DB.**
- **Problem content:** static TypeScript files, one object per problem, organized in eight clusters (Linear, Linked, Lookup, Sorted Search, Recursive, Graph, Ordered, Optimization).
- **AI:** Claude API for Socratic chat phases; Anthropic Batch API for pre-generated feedback.

## Commands

<!-- TODO: verify these match your actual scripts -->
- Frontend dev: `npm run dev`
- Typecheck: `npx nuxt typecheck` (run after any change to problem files or types)
- Backend dev: `python run.py` (from backend dir, venv active)
- DB: `docker compose up -d`

## Conventions

- Raw SQL via SQLAlchemy Core `text()` — do not introduce ORM models, migrations frameworks, or new tables without being asked.
- Composition API with `<script setup>` for all Vue components.
- Do not add new dependencies without asking first.
- Problem content files are hand-reviewed teaching material: never reformat, rewrite, or "improve" existing content beyond the task given. Move content verbatim when restructuring.

## Content authoring

- **Dissect clue authoring: follow `docs/dissect-authoring.md`.** Read that spec and the target problem file only — nothing else. Edit the file directly; do not print the content in chat; reply with a one-line summary.
- When locating a problem in a large file, grep for its `id` and read only the surrounding ~200 lines. Never read an entire multi-thousand-line content file.

## Token discipline

- Do not echo file contents back in responses after editing — summarize in one line.
- Prefer targeted reads (grep + offset/limit) over whole-file reads for anything over ~500 lines.
- For multi-problem batch tasks, work one problem per turn.