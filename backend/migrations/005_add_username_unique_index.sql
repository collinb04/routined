-- Run after 004_create_learn_section_completions.sql.
-- Enforces case-insensitive username uniqueness now that signup actually
-- persists the user-chosen username (previously it silently stored Auth0's
-- nickname/email-prefix instead — see auth.py _upsert_user).

CREATE UNIQUE INDEX IF NOT EXISTS users_username_lower_idx ON users (LOWER(username));
