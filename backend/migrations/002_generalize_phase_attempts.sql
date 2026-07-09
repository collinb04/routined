-- Run after 001_create_tables.sql.
-- Generalizes phase_attempts from Struggle-only columns to a per-phase JSONB
-- blob so Dissect and Attack can persist through the same table. Safe to
-- re-run.

ALTER TABLE phase_attempts
    ADD COLUMN IF NOT EXISTS state        JSONB NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS completed    BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP;

ALTER TABLE phase_attempts
    DROP COLUMN IF EXISTS commitment1,
    DROP COLUMN IF EXISTS commitment2,
    DROP COLUMN IF EXISTS chat_turns,
    DROP COLUMN IF EXISTS insight_text,
    DROP COLUMN IF EXISTS insight_passed,
    DROP COLUMN IF EXISTS insight_attempts;
