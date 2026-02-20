---
description: Render final report for a gsd auto validation run
agent: general
---

# /gsd-auto-validate-report

Show final report output for a completed or stopped validation run.

## Usage

`/gsd-auto-validate-report <run-id> [--technical]`

## Process

1. Load `.tmp/gsd-runs/<run-id>/FINAL-VALIDATION.json`
2. Render concise summary for normal mode
3. If `--technical` is set, add tool warnings, timings, and safety skips

## Output

- Human-readable summary (status, key failures, top fixes)
- Paths to raw artifacts
- Optional technical section with timings and tool traces

## Artifact Paths

- `.tmp/gsd-runs/<run-id>/FINAL-VALIDATION.md`
- `.tmp/gsd-runs/<run-id>/FINAL-VALIDATION.json`

Arguments: `$ARGUMENTS`
