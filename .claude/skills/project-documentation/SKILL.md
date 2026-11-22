---
name: project-documentation
description: Keep the holiday entitlement system's documentation current - README, architecture decision records (ADRs), and documented calculation rules. Use when a change adds a feature, alters a rule, or makes a design decision.
---

# Project documentation

## When to use
After any change that a new contributor or HR user would need to know about.

## What to maintain
- `README.md`: what the system does, how to set it up, run it and run the tests.
- `docs/adr/NNN-title.md`: one ADR per significant design decision (context, decision, consequences). Number them in sequence and never rewrite an accepted one; supersede it with a new ADR.
- `docs/rules.md`: every entitlement and booking rule in plain English, with the statutory source or the company policy it comes from.

## Style
- Plain UK English and short sections.
- Worked examples for every calculation rule.
- Update docs in the same change as the code, not afterwards.
