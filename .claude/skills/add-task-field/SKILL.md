---
name: add-task-field
description: Add a new field to to-do tasks (e.g. a due date, priority or tag) end to end - task model in todos.js, rendering and input in app.js/index.html, and tests. Use when asked to add, store or show a new property on tasks.
---

# Add a field to tasks

A task is `{ id, text, done }`. A new field has to be threaded through every layer, or it gets dropped silently.
Keep within ADR-001: no npm packages, no build step, no `import`/`export`.

Ask the user for the field name, its type, a default value, and whether it is required, if the request doesn't say.

## 1. Task model — `todos.js`

- Add the field to `makeTask` with its default, e.g. `makeTask(text, done = false, dueDate = null)`.
- Update every function that builds a task so it passes the field through: `addTask` (new tasks) and `sampleTasks` (`SAMPLE_TASKS` entries may leave it out and fall back to the default).
- Functions that copy tasks with `{ ...t }` (`toggleTask`) keep the field automatically; check that any new function does too.
- Keep everything pure: return new arrays, never mutate inputs, no DOM access.
- If you add a helper (e.g. `isOverdue(task, today)`), add it to the `module.exports` block at the bottom or the tests can't import it.

## 2. Saved data

Tasks already in `localStorage` (key `training-todos`) don't have the field. Code reading it must cope with `undefined` (treat it as the default) rather than resetting storage.

## 3. UI — `index.html` and `app.js`

- If the user sets the field, add an input to `#new-task-form` in `index.html` and read it in the form's submit handler in `app.js`.
- Show the field in `render()` with `document.createElement` + `textContent`. Never put task data in `innerHTML`.
- Add any styles to `style.css`.

## 4. Tests — `tests/todos.test.js`

Using `node:test` / `node:assert`, cover at least:
- `makeTask`/`addTask` set the field (and its default when omitted);
- `toggleTask` keeps the field;
- any new helper, including edge cases.

Keep the existing tests passing: `sampleTasks` must still return exactly five tasks with the first one done.

## 5. Verify

1. `npm test` passes.
2. Start the `todo-app` preview (`.claude/launch.json`, port 8000), add a task with the field, reload, and check it was saved and is still shown. There are no DOM tests, so this check in the browser is required.
3. If the change alters the task shape described in `CLAUDE.md`, update `CLAUDE.md` too.
