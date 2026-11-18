# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A small to-do app in plain HTML/CSS/JS, used for a hands-on Claude Code training session. It has no framework, bundler or runtime dependencies, by design (`docs/adr/ADR-001-plain-js-no-build.md`): attendees must be able to clone and run it on any OS with no toolchain install. Don't add npm packages, a build step, or `import`/`export` syntax.

## Commands

Requires Node 16.17+ and Python 3. `npm install` installs nothing; it only satisfies the lockfile.

```bash
npm test                                            # node --test tests/
node --test tests/todos.test.js                     # one test file
node --test --test-name-pattern="addTask" tests/    # tests matching a name (Node 18.11+)
npm start                                           # python -m http.server 8000 -> http://localhost:8000
```

`.claude/launch.json` defines the same server as `todo-app` (port 8000) for the preview browser. No linter or formatter is configured.

## Architecture

The split between two script files is what makes the app testable:

- **`todos.js`** — task logic as pure functions with no DOM access. Every function returns a new array and never mutates its input. It is loaded in the browser via a plain `<script>` tag (so its functions become globals) and exported to Node through a guarded `if (typeof module !== "undefined") module.exports = {...}`. Any new function must also be added to that export block or the tests can't reach it.
- **`app.js`** — browser UI. Module-level state (`tasks`, `filter`); every change goes through `update(next)`, which swaps in the new array returned by a `todos.js` function and calls `render()`. `render()` rebuilds the whole list and then persists to `localStorage` under `training-todos`. `load()` falls back to `sampleTasks()` when storage is empty or invalid. User-entered text is rendered with `textContent`; `innerHTML` is used only for the fixed "Nothing here." message — keep it that way to avoid HTML injection.
- `index.html` must load `todos.js` before `app.js`, since `app.js` relies on its globals.

A task is `{ id, text, done }`, with `id` a random base-36 string from `makeTask`. Adding a field (e.g. the "due date" exercise) means updating `makeTask`, the `todos.js` functions that build tasks, and the rendering in `app.js`.

Tests use Node's built-in `node:test` / `node:assert` and cover only `todos.js`. There are no DOM tests, so UI changes must be checked in the browser.

## Training setup notes

- `SAMPLE_TASKS` in `todos.js` doubles as the list of lab exercises. `tests/todos.test.js` asserts there are exactly five sample tasks and the first is done — update that test if you change the list.
- `.env` (copied from `.env.example`) contains only a fake key and exists so attendees can verify Claude is blocked from reading it. Nothing in the app uses it; don't read or modify it.
- Permission rules in `.claude/settings.json` are read only at session start; changes need a new session.
- The README refers to `training/templates/` (finished lab files attendees copy to the repo root if they fall behind, including a template `CLAUDE.md`). That directory is not tracked in this repo; it currently exists only in the untracked nested `claude-training/` copy. If templates are added, make lab changes in the root files and keep `training/templates/CLAUDE.md` in sync with this file.
- `docs/adr/` holds architecture decision records named `ADR-NNN-title.md` with Status/Date, Context, Decision and Consequences sections. Record new architectural decisions there in the same format.
