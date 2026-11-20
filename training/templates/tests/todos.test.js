const test = require("node:test");
const assert = require("node:assert");
const {
  SAMPLE_TASKS,
  makeTask,
  sampleTasks,
  addTask,
  toggleTask,
  removeTask,
  clearDone,
  filterTasks,
  countRemaining,
} = require("../todos.js");

// A fixed list with known ids, so tests don't depend on generated ids.
function fixture() {
  return [
    { id: "a", text: "First", done: false },
    { id: "b", text: "Second", done: true },
    { id: "c", text: "Third", done: false },
  ];
}

test("sampleTasks returns the five starter tasks", () => {
  const tasks = sampleTasks();
  assert.strictEqual(tasks.length, 5);
  assert.strictEqual(tasks[0].done, true);
  assert.deepStrictEqual(
    tasks.map((t) => t.text),
    SAMPLE_TASKS.map((t) => t.text)
  );
});

test("sampleTasks gives every task a unique id", () => {
  const ids = sampleTasks().map((t) => t.id);
  assert.strictEqual(new Set(ids).size, ids.length);
});

test("makeTask defaults done to false", () => {
  const task = makeTask("Something");
  assert.strictEqual(task.text, "Something");
  assert.strictEqual(task.done, false);
  assert.strictEqual(typeof task.id, "string");
});

test("addTask appends a trimmed, not-done task", () => {
  const tasks = addTask([], "  Buy milk  ");
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].text, "Buy milk");
  assert.strictEqual(tasks[0].done, false);
});

test("addTask ignores empty and whitespace-only text", () => {
  const tasks = fixture();
  assert.strictEqual(addTask(tasks, ""), tasks);
  assert.strictEqual(addTask(tasks, "   "), tasks);
});

test("toggleTask flips only the matching task", () => {
  const result = toggleTask(fixture(), "a");
  assert.deepStrictEqual(
    result.map((t) => t.done),
    [true, true, false]
  );
});

test("toggleTask with an unknown id changes nothing", () => {
  assert.deepStrictEqual(toggleTask(fixture(), "zzz"), fixture());
});

test("removeTask removes only the matching task", () => {
  const result = removeTask(fixture(), "b");
  assert.deepStrictEqual(
    result.map((t) => t.id),
    ["a", "c"]
  );
});

test("clearDone keeps only unfinished tasks", () => {
  const result = clearDone(fixture());
  assert.deepStrictEqual(
    result.map((t) => t.id),
    ["a", "c"]
  );
});

test("filterTasks handles all, active and done", () => {
  const tasks = fixture();
  assert.deepStrictEqual(filterTasks(tasks, "all").map((t) => t.id), ["a", "b", "c"]);
  assert.deepStrictEqual(filterTasks(tasks, "active").map((t) => t.id), ["a", "c"]);
  assert.deepStrictEqual(filterTasks(tasks, "done").map((t) => t.id), ["b"]);
});

test("filterTasks treats an unknown filter as all", () => {
  const tasks = fixture();
  assert.strictEqual(filterTasks(tasks, "whatever"), tasks);
});

test("countRemaining counts unfinished tasks", () => {
  assert.strictEqual(countRemaining(fixture()), 2);
  assert.strictEqual(countRemaining([]), 0);
});

test("functions never mutate their input", () => {
  const tasks = fixture();
  const before = JSON.parse(JSON.stringify(tasks));

  addTask(tasks, "New");
  toggleTask(tasks, "a");
  removeTask(tasks, "a");
  clearDone(tasks);
  filterTasks(tasks, "done");

  assert.deepStrictEqual(tasks, before);
});
