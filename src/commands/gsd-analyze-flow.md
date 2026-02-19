---
description: Analyze a GSD phase for flow completeness and implementation gaps
agent: gsd-flow-analyzer
---

# /gsd-analyze-flow

Analyze one GSD phase using flow-analyzer tools with GSD-specific context loading.

## Usage

`/gsd-analyze-flow <phase-name>`

Examples:

- `/gsd-analyze-flow 03-authentication`
- `/gsd-analyze-flow 04-2fa-session-management`

## Process

1. Load phase plan and summary artifacts.
2. Extract intended user/system flows from plan text.
3. Trace implementation in source files.
4. Detect gaps (`MISSING_BRANCH`, `WRONG_PRECONDITION`, plus available extended types).
5. Produce confidence score and prioritized fix hints.

## Output

- Human report: flow coverage, gaps, impact, remediation steps.
- Machine report (if requested): structured gap list for verifier consumption.

Recommended artifacts:

- `.planning/phases/<phase-name>/FLOW-ANALYSIS.md`
- `.planning/phases/<phase-name>/FLOW-ANALYSIS.json`

Arguments: `$ARGUMENTS`
