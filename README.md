# Routined

Routined is a Socratic, AI-guided DSA (data structures & algorithms) interview-prep platform. Instead of handing over a solution to memorize, it walks a learner through the same problem three times, each time asking for more independent thinking — closer to how an actual technical interview rewards *reasoning*, not recall.

## The learning model

Every one of the 313 problems in the curriculum runs through three phases:

1. **Dissect** — the learner works through hand-authored, multiple-choice "clue" cards that force a close read of the problem statement (constraints, edge cases, what's actually being asked) before any solving starts. Wrong answers get targeted feedback, not just "incorrect."
2. **Struggle & Optimize** — an AI tutor (Claude, via the Anthropic API) engages the learner in an open-ended Socratic conversation. The tutor is explicitly instructed never to name the optimal strategy or state the key insight outright — it only asks questions. A learner can commit to a strategy and get pressure-tested on it, or use a free-form Explore/Identify/Approach tutor with no required order.
3. **Attack** — the learner writes and runs real code against the problem's test cases, entirely in the browser (no server round-trip), before optionally revealing a fully worked solution with complexity analysis.

An optional **Learn mode** setting locks Struggle & Optimize and Attack until Dissect is completed for a given problem, for learners who want the curriculum enforced rather than freely navigable.

## Tech stack

**Frontend** — Vue 3 (Composition API, `<script setup>`), Vite, TypeScript, Tailwind CSS v4, Pinia, Vue Router.

**Backend** — Flask, SQLAlchemy, PostgreSQL, session-cookie auth.

**External services** — Auth0 (identity), Anthropic Claude API (the Socratic tutor + insight grading), Resend (transactional email).

**In-browser execution** — Pyodide (WASM CPython) running in a dedicated Web Worker, so learner code executes and is graded against test cases without ever leaving the browser.

## Notable features

- **A tutor that's structurally prevented from giving away the answer.** The Socratic chat's system prompts hard-code rules like "never name the optimal strategy" and "ask exactly one question per response," rather than relying on prompting alone to keep things honest.
- **LLM-graded free-text reasoning checks with a fairness backstop.** Learners write a plain-English "insight" explaining why a solution works; an LLM grades it against a per-problem rubric, but automatically passes the learner after two failed attempts so the AI can't permanently lock anyone out.
- **In-browser Python execution with tiered timeouts.** A Web Worker running Pyodide gives a generous cold-start window for the ~10MB WASM download, then a tight execution timeout once warm — with automatic worker recovery if user code hangs.
- **313 hand-authored problems as typed content, not prose.** Each problem is a single TypeScript module bundling its description, test cases, Dissect clue cards, viability-tagged strategy options (optimal / viable-but-suboptimal / trap / inapplicable), and a worked solution — a structured content model, not a wiki page.
- **40 custom algorithm-visualization frame generators** covering binary search, sliding window, Union-Find, topological sort, backtracking, and more, driven by a single reusable frame-player and 8 renderer types (array, graph, grid, tree, linked list, stack, interval, union-find).
- **A dependency-ordered curriculum map.** Ten topic clusters are laid out as a prerequisite-ordered graph, paired with fuzzy search across every concept in the curriculum.
- **A progression gate that doesn't require separate content.** "Learn mode" reuses the exact same phase-completion data the free-roam mode already tracks — turning it on just changes what's clickable, not what exists.
- **Hybrid authentication.** Auth0 handles social login, but the app keeps its own httpOnly session cookie rather than storing any token client-side — Auth0's password grant is exchanged server-side only.

## Documentation

- [`docs/SETUP.md`](docs/SETUP.md) — running the project locally
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how the codebase is organized and how the pieces fit together
- [`docs/API.md`](docs/API.md) — backend REST API reference
