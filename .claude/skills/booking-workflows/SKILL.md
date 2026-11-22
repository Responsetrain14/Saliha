---
name: booking-workflows
description: Design and implement holiday booking flows - requesting, approving, rejecting, cancelling and amending leave. Use when working on request states, approvals, notifications or balance checks at booking time.
---

# Booking workflows

## When to use
Changes to how employees request leave and how managers act on those requests.

## Request lifecycle
`draft -> pending -> approved | rejected`, and `approved -> cancelled`.
Each transition records who made it, when, and an optional reason.

## Rules
- Check the balance when a request is submitted and again when it is approved. The balance may have changed in between.
- Approved and pending leave both count against the available balance. Only approved leave counts as taken.
- Exclude non-working days and bank holidays (where the employee doesn't work them) from the days deducted.
- Overlapping requests from the same employee are rejected.
- Cancelling approved leave returns the days to the balance.
- Model transitions as a single state machine; don't scatter status checks across the code.

## Checklist
- [ ] Every allowed transition is tested and every disallowed one is rejected
- [ ] Balance checks cover half days and part-time patterns
- [ ] Audit trail written for every transition
