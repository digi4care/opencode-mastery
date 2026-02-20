# Gap Decision Gate Policy

When `/gsd-analyze-flow` returns gaps, automation must pause.

## Required Input to Human

Show:

- flow name and confidence
- gaps grouped by severity and type
- top 3 affected behaviors

## Allowed Decisions

Choose exactly one:

1. `generate-fix-plan`
2. `stop`
3. `force-test`

## Enforcement

- no implicit default to `force-test`
- no test execution before decision is recorded
- store choice in `.tmp/gsd-runs/<run-id>/gate-decision.json`
