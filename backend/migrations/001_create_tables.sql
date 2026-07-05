-- Run once against the routined_db database.
-- Safe to re-run: all statements use IF NOT EXISTS / ON CONFLICT.

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    auth0_id    VARCHAR(255) UNIQUE NOT NULL,
    email       VARCHAR(255) NOT NULL,
    username    VARCHAR(255),
    created_at  TIMESTAMP DEFAULT NOW()
);

-- One row per (user, problem, phase). Tracks the full arc of a struggle attempt.
CREATE TABLE IF NOT EXISTS phase_attempts (
    id               SERIAL PRIMARY KEY,
    user_sub         VARCHAR(255) NOT NULL,  -- auth0 sub
    problem_id       VARCHAR(255) NOT NULL,
    phase            VARCHAR(50)  NOT NULL,  -- 'dissect' | 'struggle' | 'attack'
    commitment1      JSONB,                  -- initial commit: {strategyId, timeComplexity, spaceComplexity, planSteps}
    commitment2      JSONB,                  -- revise commit (same shape)
    chat_turns       JSONB DEFAULT '[]',     -- array of {role, content}
    insight_text     TEXT,
    insight_passed   BOOLEAN,
    insight_attempts INT  DEFAULT 0,
    created_at       TIMESTAMP DEFAULT NOW(),
    updated_at       TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_sub, problem_id, phase)
);

-- One row per completed phase, used for progress tracking.
CREATE TABLE IF NOT EXISTS learn_progress (
    id               SERIAL PRIMARY KEY,
    user_sub         VARCHAR(255) NOT NULL,
    problem_id       VARCHAR(255) NOT NULL,
    phase_completed  VARCHAR(50)  NOT NULL,
    completed_at     TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_sub, problem_id, phase_completed)
);
