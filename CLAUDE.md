# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A small to-do app in plain HTML/CSS/JS used for a one-hour Claude Code training session. There is no
framework, bundler, or runtime dependency, and that is deliberate (see `docs/adr/ADR-001-plain-js-no-build.md`).
Don't add a build step, npm dependencies, or ES modules without a new ADR.

## Commands

Requires Node 16.17+ and Python 3.

- `npm test` runs every test in `tests/` with Node's built-in runner (`node --test tests/`).
- `node --test tests/todos.test.js` runs a single test file.
- `node --test --test-name-pattern="addTask" tests/` runs tests whose names match (needs Node 18.11+).
- `npm start` serves the app at http://localhost:8000 (`python -m http.server 8000`). The same server is
  set up in `.claude/launch.json` as `todo-app`.

There is no linter or formatter configured.

## Architecture

- `todos.js` holds all task logic as **pure functions** that return new arrays and never mutate their input.
  It can't use `import`/`export`. In the browser its functions are globals from a plain `<script>` tag; in Node
  they come from the `if (typeof module !== "undefined") module.exports = {...}` block at the bottom.
  **When you add a function, add it to that export block too**, or tests can't `require` it.
- `app.js` holds the browser UI only. It keeps module-level `tasks` and `filter` state. Every change goes
  through `update(next)` → `render()`, and `render()` rebuilds the whole list and **saves to localStorage**
  (key `training-todos`). `load()` falls back to `sampleTasks()` when storage is empty or invalid.
- `index.html` loads `todos.js` before `app.js`. The order matters because `app.js` uses its globals.
- A task is `{ id, text, done }`. `id` comes from `makeTask()` (a timestamp plus a random base-36 string).
  Tasks already saved in a browser keep their old shape, so a new field must tolerate being missing
  when `load()` reads older data.

Only `todos.js` has tests. There is no DOM test coverage, so check UI changes by hand in the browser.

## Training setup notes

- `.env` (copied from `.env.example`) holds a fake key. Nothing reads it; it is there to check that Claude
  is blocked from reading it. Don't read or print `.env`.
- The README mentions `training/templates/` (finished copies of lab files), but that folder is not in this
  checkout.
