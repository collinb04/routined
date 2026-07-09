-- Run after 002_generalize_phase_attempts.sql.
-- Tracks the manual "done" checkboxes on the /problems curriculum checklist
-- (Product.vue) — a separate concept from phase_attempts/learn_progress,
-- since these are arbitrary (topic, problem) pairs the user self-reports as
-- done, not phases of the structured Dissect/Struggle/Attack flow.

CREATE TABLE IF NOT EXISTS problem_checklist (
    id          SERIAL PRIMARY KEY,
    user_sub    VARCHAR(255) NOT NULL,
    topic_id    VARCHAR(255) NOT NULL,
    problem_id  INT NOT NULL,
    done        BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at  TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_sub, topic_id, problem_id)
);
