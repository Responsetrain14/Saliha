# ADR-002: Claude Code project setup

- **Status:** Accepted
- **Date:** 2026-11-18

## Context

Attendees use Claude Code on this repo during the training session. Without project guidance, each new
session has to rediscover how the app is built and tested. It would also ask permission for routine
commands, and nothing would stop it from reading `.env`.

## Decision

The repo includes two Claude Code configuration files, both committed:

- **`CLAUDE.md`** at the repo root gives every session the commands (`npm test`, `npm start`), the split
  between `todos.js` and `app.js`, and the constraints from ADR-001 (no dependencies, no build step, no ES modules).
- **`.claude/settings.json`** sets project permission rules:
  - **allow** running the tests, the dev server and read-only git commands without a prompt;
  - **deny** reading or editing `.env`, through both the file tools and common shell commands.

## Consequences

- New sessions start with the project context and run tests without permission prompts.
- Attempts to read `.env` are blocked. Attendees can check this by asking Claude to show the file.
- Permission rules are loaded when a session starts, so after changing `.claude/settings.json`, start a new session.
- Personal overrides belong in `.claude/settings.local.json`, which should not be committed.
- `CLAUDE.md` must be updated when commands or architecture change, or it will mislead future sessions.
