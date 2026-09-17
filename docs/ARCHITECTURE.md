# Architecture

## System overview

```
Vue 3 SPA (Vite)  <---- /api, /auth ---->  Flask API  <---->  PostgreSQL
      |                                        |
      |                                        +---> Auth0 (identity)
      +---> Pyodide (WASM CPython, runs        +---> Anthropic Claude API (tutor + insight grading)
            in a Web Worker, in-browser)        +---> Resend (transactional email)
```

The frontend is a single Vue SPA. The Flask backend is a thin session/persistence layer plus the Anthropic-backed tutor endpoints — it does not run or grade user code (that happens entirely client-side via Pyodide).

## Directory structure

**`frontend/src/`**

| Path | Purpose |
|---|---|
| `views/` | Route-level pages (`Home.vue`, `Product.vue` = `/problems`, `Blog.vue` = the Learn section, `SessionView.vue` = `/session/:id`, auth pages, `Settings.vue`, `Profile.vue`) |
| `components/` | `NavBar.vue`, `ProblemSpace.vue`, `PhasedLearningPanel.vue`, and the tutor chat components — see "The phased learning flow" below |
| `components/visualizers/` | `generators/` (40 pure frame-generator functions, one per algorithm/pattern) + `renderers/` (8 Vue components, one per data-structure shape) + `shared/` (playback controls, narration panel) |
| `components/sandbox/` | The in-browser code editor, test runner, and solution reveal UI used in the Learn section |
| `components/learn-map/` | `ClusterMap.vue` (SVG dependency graph of the 10 topic clusters) and `TopicSearch.vue` (fuzzy search) |
| `stores/` | Pinia stores — see "Frontend state" below |
| `composables/` | `usePyodide.ts` (in-browser Python execution), `useFramePlayer.ts` (generic step-through animation player) |
| `data/problems/` | 313 hand-authored problem modules, one per problem — see "Problem content model" below |
| `data/clusters.ts`, `data/strategies.ts` | Static curriculum metadata (topic clusters, complexity-class types) |
| `router/index.ts` | Route table + `requiresAuth` navigation guard |

**`backend/app/`**

| Path | Purpose |
|---|---|
| `routes/auth.py` | Login/signup/social login/logout, backed by Auth0, with a local `users` table mirror |
| `routes/struggle.py` | The Anthropic-backed Socratic tutor (commit/chat, ungated general-purpose tutor chat, insight grading) |
| `routes/progress.py` | Shared phase-progress persistence (`GET /progress`, Dissect/Attack save endpoints) — also exports helpers `struggle.py` calls into |
| `routes/checklist.py` | The manual "done" checkboxes on the `/problems` curriculum page — deliberately separate from phase progress |
| `routes/learn.py` | "Mark as completed" toggles for Learn-section pages |
| `routes/learn_mode.py` | The global Learn-mode preference toggle |
| `routes/feedback.py`, `routes/contact.py` | Bug reports and the marketing contact form (both just log + email, no ticketing system) |
| `services/email_service.py` | Resend wrappers used by the routes above |
| `extensions.py` | The shared `SQLAlchemy` instance |

Full endpoint list: [`API.md`](API.md).

## The phased learning flow

Each problem moves through three phases, rendered as tabs by `PhasedLearningPanel.vue`:

1. **Dissect** — multiple-choice "clue" cards (`ClueCard[]`, authored inline on each problem). `PhasedLearningPanel.vue` owns the per-clue state machine (locked → active → solved, with wrong-answer tracking), and posts progress to `POST /api/problems/:id/dissect/progress`.
2. **Struggle & Optimize** — two parallel UIs share this tab:
   - A graded **commit → chat → insight** flow (`stores/struggle.ts`, `struggle.py`'s `/commit`, `/chat`, `/evaluate-insight`), where the learner commits to a strategy/complexity/plan before chatting.
   - An **ungated**, single general-purpose tutor chat (`stores/struggleTutor.ts`, `StruggleTutorHub.vue` + `StruggleTutorChat.vue`, `struggle.py`'s `/tutor-chat`) with no required order or commitment — this is the one actually surfaced in the tab UI today. One continuous conversation and one system prompt; the model infers conversation stage from the transcript (still-exploring vs. has-named-an-approach) rather than the UI enforcing separate modes. It also has access to the learner's current Attack-tab code and last run error, referenced only when debugging help is explicitly requested.

   Struggle never contributes a "done" state and never gates Attack (see the comment in `PhasedLearningPanel.vue`) — only Dissect and Attack have real completion.
3. **Attack** — the learner writes code in an in-browser editor (CodeMirror) and runs it via `usePyodide().runTests` against the problem's `testCases`, then can reveal `solutionCode`/`solutionExplanation`. Progress posts to `POST /api/problems/:id/attack/progress`.

All three phases persist through one shared table (`phase_attempts`, keyed by `user_sub` + `problem_id` + `phase`, storing a JSONB `state` blob) — this was a deliberate refactor (see `migrations/002`) from an earlier Struggle-only schema, specifically so all three phases could share the same persistence path.

**Learn mode**: a single per-user boolean (`user_settings.learn_mode`, toggled in `Product.vue`'s sidebar, gated in `PhasedLearningPanel.vue`'s `isLocked()`). When on, the Struggle & Optimize and Attack tabs are locked until Dissect is marked complete for that problem. It adds no new content or state beyond the completion data every problem already tracks — it just changes what's clickable.

`ProblemSpace.vue` is the container that hosts `PhasedLearningPanel.vue` alongside the problem description/solution panel; it's mounted both by `SessionView.vue` (the real `/session/:id` route) and by `Home.vue` (an embedded, unauthenticated demo instance, which is what triggers `struggleTutor.ts`'s canned-reply `demoMode` instead of calling the real Anthropic-backed endpoint).

## Data model

| Table | Purpose |
|---|---|
| `users` | Local mirror of Auth0 identities (`auth0_id`, `email`, `username`) |
| `phase_attempts` | One row per `(user, problem, phase)` — JSONB `state` + `completed`/`completed_at` |
| `learn_progress` | Append-only log of completed phases, one row per `(user, problem, phase)` |
| `problem_checklist` | Manual "done" checkboxes on the `/problems` curriculum page — unrelated to phase completion |
| `learn_section_completions` | "Mark as completed" toggles for Learn-section pages/subsections |
| `user_settings` | Global per-user preferences (currently just `learn_mode`) |

## Frontend state (`src/stores/`)

- **`auth.ts`** — wraps the backend's session-cookie auth (`/auth/me`, `/auth/login`, `/auth/signup`, `/auth/social`, `/auth/logout`); maps raw backend error strings to stable `auth/*` codes for the UI.
- **`struggle.ts`** — the graded commit → chat → insight flow's state, synced against `struggle.py`'s endpoints.
- **`struggleTutor.ts`** — the ungated Explore/Identify/Approach tutor's three independent message threads, plus the `demoMode` canned-reply path used on the homepage.
- **`learnMode.ts`** — loads/persists the Learn-mode boolean via `GET`/`PATCH /api/learn-mode`, with optimistic UI update and rollback on failure.
- **`session.ts`** — **legacy.** Drives a separate 4-step "lens" chat flow for `SessionView.vue` via `src/api/tutor.ts`, which calls the Anthropic API directly from the browser with no backend involved. This predates `struggle.py` and is not part of the current Dissect/Struggle/Attack flow — treat it as superseded rather than as a second tutor to maintain.

## Problem content model

`data/problems/` has one `.ts` file per problem (313 total, across 10 topic-cluster subdirectories), each exporting a `Problem` object (shape defined in `data/problems/index.ts`) that inlines everything needed for all three phases:

- `description` / `examples` / `constraints` — HTML strings
- `starterCode` / `functionName` / `testCases` / `runnerSetup` — for Pyodide execution
- `clues?: ClueCard[]` — the Dissect phase's questions, each option carrying its own feedback and an optional `highlight` back into the problem text
- `struggle?: StruggleContent` — candidate `StrategyOption[]` tagged `optimal` / `viable_suboptimal` / `trap` / `inapplicable`, plus a `targetInsight` and grading rubric the tutor is instructed never to reveal
- `solutionCode` / `solutionComplexity` / `solutionCaveat` / `solutionExplanation` — the Attack-phase reveal

`index.ts` imports all 313 modules and re-exports them as a flat `PROBLEMS: Problem[]` array. For the detailed authoring rules behind each field, see the existing docs in this folder: `problem-schema.md`, `dissect-authoring.md`, `struggle-authoring.md`, `solution-authoring.md`.

## Visualizer system

`components/visualizers/generators/*.ts` are pure functions that turn "here's an algorithm running on this input" into a `Frame[]` (defined in `composables/types.ts`). `useFramePlayer.ts` is a generic play/pause/step/speed controller over any `Frame[]`. `renderers/*.vue` (array, graph, grid, tree, linked list, stack, interval, union-find) render one frame's state for its data-structure shape. `PatternVisualizer.vue` wires a generator + renderer + the frame player together for a given concept.

## In-browser code execution

`composables/usePyodide.ts` owns a singleton Web Worker (`frontend/public/pyodide.worker.js`) that loads Pyodide (WASM CPython) and runs learner code against a problem's `testCases` — no backend round-trip. Cold start (first WASM download, ~10MB) gets a 45s timeout; once warm, execution gets an 8s timeout, and the worker is force-killed and recreated if it hangs, to recover from infinite loops without a page reload.

## Legacy / dead code

Worth knowing about before you go looking for how something is wired in, or before extending it:

- **`components/StrugglePanel.vue`** — unused (not imported anywhere). An earlier, monolithic Struggle UI, since split into `StruggleTutorHub.vue`/`StruggleTutorChat.vue` plus the commit/chat logic in `PhasedLearningPanel.vue`.
- **`stores/session.ts` + `src/api/tutor.ts` + `SessionView.vue`'s 4-lens flow** — superseded by `struggle.py`/`struggle.ts`, but `SessionView.vue` is still routed and still mounts `ProblemSpace.vue`, so it isn't fully retired.
- **`data/clues.ts`** — an empty, unused placeholder; clues actually live inline on each `Problem` object, not here.
- **`firebase` npm dependency** — unused (no imports anywhere in `frontend/src`); a leftover from before the app settled on Auth0.
- **Empty directories**: `frontend/src/auth/`, `frontend/src/views/later use/`, `frontend/api/`.
