# Precondition Checks

Use this checklist to validate access and state assumptions per flow step.

## Access model

- Is anonymous access allowed where intended?
- Is authenticated access required where intended?
- Are role/permission checks aligned with the plan?

## State model

- Does step require a token, session, or prior state?
- Is that state produced by a previous step?
- Is invalid or expired state handled explicitly?

## Transition integrity

- Are both success and failure transitions present?
- Does each transition provide required data for the next step?
- Is user feedback present when transitions fail?

## Defensive checks

- Validate server-side, not only client-side.
- Fail closed for privileged actions.
- Emit explainable errors for expected failure states.
