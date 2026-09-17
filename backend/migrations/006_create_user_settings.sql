-- Run after 005_add_username_unique_index.sql.
-- Global per-user preferences (e.g. Learn mode), distinct from the
-- per-problem phase_attempts/learn_progress and problem_checklist tables.

CREATE TABLE IF NOT EXISTS user_settings (
    user_sub    VARCHAR(255) PRIMARY KEY,
    learn_mode  BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at  TIMESTAMP DEFAULT NOW()
);
