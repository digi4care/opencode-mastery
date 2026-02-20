# gsd-validation

Automated post-phase validation workflow for GSD phases.

## Purpose

Run a deterministic verification pipeline after implementation:

1. verify work
2. analyze flow gaps
3. apply HITL decision gate when gaps exist
4. execute runtime test stack (servers, browser, logs)
5. emit final report artifacts

## Triggers

Use this skill when the request includes:

- validating a finished phase end-to-end
- combining `/gsd-verify-work` and `/gsd-analyze-flow`
- automated browser + server log validation
- safe teardown requirements in shared/swarm environments

## Workflow

1. Parse phase id and execution mode (`quick|full`)
2. Run `/gsd-verify-work <phase>`
3. Run `/gsd-analyze-flow <phase>`
4. If gaps exist, enforce HITL gate using `references/gate-policy.md`
5. If approved for tests, execute runtime tools in this order:
   - `gsd-run-create`
   - `gsd-server-start`
   - `gsd-server-wait-ready`
   - `gsd-playwright-execute`
   - `gsd-logs-collect`
   - `gsd-server-stop-owned`
   - `gsd-run-finalize`
6. Render final report from `references/report-template.md`

## Runtime Tool Contract Expectations

- `gsd-run-create`: creates run workspace and returns `runId`
- `gsd-server-start`: starts tracked process and records ownership metadata
- `gsd-server-wait-ready`: verifies readiness with probe evidence
- `gsd-playwright-execute`: runs browser tests and stores artifacts
- `gsd-logs-collect`: produces structured issues with severity
- `gsd-server-stop-owned`: terminates only validated run-owned processes
- `gsd-run-finalize`: emits `FINAL-VALIDATION.md` and `FINAL-VALIDATION.json`

## Failure Handling

1. On verify or flow-analysis failure: finalize run as `failed`
2. On gap gate stop or fix-plan path: finalize run as `blocked`
3. On runtime tool failure: continue teardown, then finalize run as `failed`
4. On teardown safety skip: include warnings in final report, never force kill unknown processes

## Modes

| Mode  | Behavior                                             |
| ----- | ---------------------------------------------------- |
| quick | smoke-level test depth, minimal artifacts            |
| full  | complete flow checks, visual evidence, extended logs |

## Safety Rules

- never kill processes not proven as run-owned
- never bypass gap gate without explicit user decision
- always preserve run artifacts even on partial failure

## References

- `references/gate-policy.md`
- `references/report-template.md`
