---
name: project-builder
description: Add or change a feature in the training to-do app end to end, from task logic in todos.js through tests and UI in app.js to a check in the browser. Use when the user asks to build, add, or change app behaviour, such as a new task field, filter, or button.
---

# Project builder

Build features in this repo in the order below. The app is plain HTML/CSS/JS with no build step
(ADR-001), so don't add dependencies, bundlers, or `import`/`export`.

## 1. Logic in `todos.js`

- Write the behaviour as a pure function that takes `tasks` and returns a new array. Never mutate the input.
- If tasks get a new field, set its default in `makeTask()`, and make every function cope with tasks that
  don't have it yet (older tasks loaded from localStorage).
- Add every new function to the `module.exports` block at the bottom of the file.

## 2. Tests in `tests/todos.test.js`

- Add `node:test` cases for the new function: the normal case, an empty or blank input, and a check that
  the input array was not mutated.
- Run `npm test` and make sure it passes before touching the UI.

## 3. UI in `app.js`, `index.html`, `style.css`

- Route every state change through `update(next)`. Don't assign `tasks` or call `save()` directly.
- Build elements with `document.createElement` and `textContent`, never `innerHTML` with user text.
- Keep `todos.js` loaded before `app.js` in `index.html`.

## 4. Check it in the browser

- Start the `todo-app` preview (`.claude/launch.json`, port 8000) and exercise the feature.
- Reload the page to confirm the change survives localStorage, then click "Reset sample tasks" to check
  the starter data still works.

## 5. Record decisions

If the change goes against ADR-001 or makes a new architectural choice, add
`docs/adr/ADR-00N-<slug>.md` in the same format as ADR-001.
