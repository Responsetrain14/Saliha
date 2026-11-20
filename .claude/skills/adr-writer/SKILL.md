---
name: adr-writer
description: Write a new architecture decision record (ADR) in docs/adr/ in this repo's format. Use when asked to record, document or write up an architectural or tooling decision, or when a change reverses or replaces an earlier ADR.
argument-hint: "[decision to record]"
---

# Write an ADR

ADRs live in `docs/adr/` as `ADR-NNN-short-title.md`. Read the existing ones first (at least `ADR-001-plain-js-no-build.md`) to match their tone and length, and to check whether the decision is already recorded or conflicts with an earlier one.

## 1. Gather the decision

The decision to record is: $ARGUMENTS

If that's empty or vague, ask the user for:
- what was decided;
- why: the problem or constraint that forced a choice;
- the main alternative that was rejected, if any.

Use only facts from the user, the code or earlier ADRs. Don't invent reasons, dates, or people.

## 2. Number and name it

- Use the next number after the highest existing `ADR-NNN`, zero-padded to three digits.
- Slug: a few lowercase, hyphenated words naming the decision (e.g. `plain-js-no-build`, `claude-code-setup`).
- File: `docs/adr/ADR-NNN-slug.md`.

## 3. Write it in this format

```markdown
# ADR-NNN: <Decision as a short title>

- **Status:** Accepted
- **Date:** <today, YYYY-MM-DD>

## Context

<The situation and constraints that made a decision necessary. Plain prose, a short paragraph or two.>

## Decision

<What was decided, stated directly. Bullets for the concrete rules or parts.>

## Consequences

- <What becomes easier, harder, required or forbidden as a result. Include the downsides.>
```

- Status is `Proposed` if the user hasn't agreed yet, otherwise `Accepted`.
- Keep it short: ADR-001 is about 25 lines. Lines wrap at about 110 characters, as in the existing ADRs.
- Name files and commands in backticks.

## 4. Superseding an earlier ADR

Don't edit an accepted ADR's decision. If the new one replaces it:
- set the old ADR's Status to `Superseded by ADR-NNN`;
- in the new ADR's Context, say which ADR it replaces and why.

## 5. Follow-through

- If the decision changes commands, architecture or constraints described in `CLAUDE.md`, update `CLAUDE.md` in the same change.
- Show the user the file path and a one-line summary of the decision.
