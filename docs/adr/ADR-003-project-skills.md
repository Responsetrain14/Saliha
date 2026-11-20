# ADR-003: Project skills for recurring Claude Code tasks

- **Status:** Accepted
- **Date:** 2026-11-20

## Context

ADR-002 gives every Claude Code session the project context and permission rules, but some tasks in this
repo are multi-step and easy to get partly wrong. Adding a field to tasks (the due-date lab) has to touch
`makeTask`, the functions that build tasks, the `module.exports` block, old `localStorage` data, rendering
in `app.js` and the tests; if any step is missed, the field is dropped silently. Writing an ADR has to follow
the numbering and Status/Date, Context, Decision, Consequences format of ADR-001 and ADR-002.

## Decision

Repeatable procedures are committed as Claude Code project skills in `.claude/skills/<name>/SKILL.md`:

- **`add-task-field`** threads a new task field through `todos.js`, `index.html`, `app.js`, `style.css` and
  `tests/todos.test.js` within the ADR-001 constraints, then checks it with `npm test` and in the browser.
- **`adr-writer`** (`/adr-writer`) writes the next `docs/adr/ADR-NNN-slug.md` in the existing format, handles
  superseding an earlier ADR, and updates `CLAUDE.md` when the decision changes it.

## Consequences

- Every session and attendee gets the same checklists, and can run them by name or have Claude pick them up.
- Skills name specific files, functions and commands, so they must be updated when those change, as with
  `CLAUDE.md`, or they will lead sessions to wrong steps.
- Skills are instructions, not enforcement: Claude may still skip a step, so changes still need review,
  `npm test`, and a check in the browser.
