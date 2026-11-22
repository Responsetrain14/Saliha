---
name: automated-testing
description: Write and run automated tests for the holiday entitlement system - unit tests for calculations, workflow tests for bookings, and fixed-date fixtures. Use whenever adding or changing behaviour, or when tests fail.
---

# Automated testing

## When to use
Every behaviour change. A change is done when its tests pass.

## Approach
- Unit tests for every calculation function, including edge cases: leap years, leave years that cross a bank holiday, starters and leavers mid-year, half days, the 28-day cap.
- Workflow tests for every booking state transition, allowed and disallowed.
- Use worked examples from GOV.UK as expected values where they exist, and note the source in the test.
- Inject the clock and the bank-holiday list. Tests never depend on today's date or the network.
- Name tests by behaviour, e.g. `part_time_three_days_gets_16_8_days`.

## Before finishing
- Run the full test suite and report the result honestly, including any failures.
- Don't skip, weaken or delete a failing test to make the suite pass.
