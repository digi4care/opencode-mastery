---
description: Show status and progress for a gsd auto validation run
agent: general
---

# /gsd-auto-validate-status

Inspect an existing automated validation run.

## Usage

`/gsd-auto-validate-status <run-id>`

## Process

1. Load `.tmp/gsd-runs/<run-id>/run.json`
2. Read known artifacts if present (`verify.json`, `flow-analysis.json`, `log-index.json`)
3. Infer current stage from available files and status
4. Return stage summary and unresolved warnings

## Output

- Current run state
- Last completed stage
- Remaining stages
- Failures or warnings
- Artifact paths

## Stage Inference Order

1. `INIT`
2. `VERIFY`
3. `FLOW_ANALYZE`
4. `GAP_GATE`
5. `RUNTIME_TESTS`
6. `TEARDOWN`
7. `FINAL_REPORT`

## Notes

- Reads run state from `.tmp/gsd-runs/<run-id>/`
- Does not modify run state

Arguments: `$ARGUMENTS`
