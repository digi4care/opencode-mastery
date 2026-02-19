---
description: Alias for /flow-analyze using the flow-analyzer agent
agent: flow-analyzer
---

# /flow-analyzer

Alias command for `/flow-analyze`.

## Usage

`/flow-analyzer <flow description or path context>`

Examples:

- `/flow-analyzer Password reset: Request -> email link -> token validate -> reset -> login redirect`
- `/flow-analyzer Analyze checkout flow from docs/checkout.md against src/`

## Process

1. Parse `$ARGUMENTS` into one or more intended flows.
2. Build graph structure for each flow.
3. Trace implementation evidence (files, routes, handlers, state transitions).
4. Detect gaps and classify severity.
5. Score confidence and provide prioritized fix hints.

## Output

Return:

- Flows analyzed
- Gaps grouped by type and severity
- Confidence score per flow
- Top 3 recommended fixes

Arguments: `$ARGUMENTS`
