---
name: holiday-calculations
description: Calculate holiday entitlement, accrual, pro-rating and remaining balances for employees. Use when writing or changing any code that computes leave amounts (full-time, part-time, irregular hours, part-year, starters and leavers).
---

# Holiday calculations

## When to use
Any change to code that produces a number of days or hours of leave: annual entitlement, pro-rata for starters/leavers, accrual, balances, carry-over, or pay-in-lieu on termination.

## Principles
- Keep calculation logic in pure functions with no I/O, so it can be unit-tested exhaustively.
- Store and compute in hours (or a fixed fraction of a day) internally; convert to days only for display.
- Make rounding explicit and in one place. Never round an employee below their statutory minimum.
- Every calculation takes the leave year and the employee's working pattern as inputs. No hidden "today".
- Statutory rules come from the `uk-holiday-rules` skill; company policy on top of statutory goes in configuration, not code.

## Checklist
- [ ] Full-time, part-time, irregular-hours and part-year cases covered
- [ ] Starter and leaver pro-rating covered
- [ ] Rounding rule documented and tested
- [ ] Result never falls below the statutory minimum
- [ ] Tests added (see `automated-testing`)
