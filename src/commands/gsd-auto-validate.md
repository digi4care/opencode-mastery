---
description: Automated phase validation with HITL gap gate
agent: general
---

# /gsd-auto-validate

Run end-to-end validation for one phase by combining:

- `/gsd-verify-work`
- `/gsd-analyze-flow`
- HITL decision gate on detected gaps
- runtime test orchestration via gsd validation tools

## Usage

`/gsd-auto-validate <phase> [--quick|--full] [--force-test] [--technical]`

## Flags

- `--quick`: smoke-level runtime checks
- `--full`: complete runtime checks with full evidence (default)
- `--force-test`: allow runtime tests after gaps only when user explicitly confirms
- `--technical`: include tool-level details in the final response

## Process

1. Run `/gsd-verify-work <phase>` and persist output as run evidence
2. Run `/gsd-analyze-flow <phase>` and inspect detected gaps
3. Open HITL gate when gaps exist and request one explicit decision
4. Create run workspace via `gsd-run-create`
5. Start required servers via `gsd-server-start` and wait using `gsd-server-wait-ready`
6. Execute browser validation via `gsd-playwright-execute`
7. Aggregate logs via `gsd-logs-collect`
8. Stop only run-owned servers via `gsd-server-stop-owned`
9. Emit final artifacts via `gsd-run-finalize`

## Gap Decision Gate

If gaps are found, request exactly one choice:

- `generate-fix-plan`
- `stop`
- `force-test`

Default behavior is never `force-test`.

When user selects `generate-fix-plan`, hand control to `/gsd-plan-phase --gaps` and mark run as blocked.

## Runtime Safety

- Never terminate processes not registered as run-owned
- Never skip teardown; always call `gsd-server-stop-owned` in finalization path
- Never hide missing artifacts; include warnings in final report

## Output

- Run id
- Validation status (`passed|failed|blocked`)
- Artifact directory under `.tmp/gsd-runs/<run-id>/`
- Final report files:
  - `.tmp/gsd-runs/<run-id>/FINAL-VALIDATION.md`
  - `.tmp/gsd-runs/<run-id>/FINAL-VALIDATION.json`

If `--technical` is provided, include:

- tool execution order
- per-step duration
- warnings from safety checks

Arguments: `$ARGUMENTS`
