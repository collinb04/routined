-- Run after 003_create_problem_checklist.sql.
-- Tracks "Mark as completed" toggles in the Learn section (Blog.vue) —
-- intro/guide/complexity pages plus per-subsection ids. Flat set of
-- completed ids per user, same shape as problem_checklist but without the
-- topic grouping since these ids are already globally unique strings.

CREATE TABLE IF NOT EXISTS learn_section_completions (
    id           SERIAL PRIMARY KEY,
    user_sub     VARCHAR(255) NOT NULL,
    section_id   VARCHAR(255) NOT NULL,
    completed_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_sub, section_id)
);
