---
tags: [skill-creator]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

write an ADR for how we store due dates: they're optional YYYY-MM-DD strings on the task (not Date objects or timestamps), because tasks go through JSON.stringify into localStorage and old saved tasks without a due date still have to load
