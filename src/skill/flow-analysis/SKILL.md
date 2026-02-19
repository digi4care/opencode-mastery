---
name: flow-analysis
description: Analyze feature flows for completeness, preconditions, and branch coverage using reusable flow-analyzer tools.
license: See LICENSE in repository root
compatibility: OpenCode plugin + command workflows
metadata:
  author: opencode-mastery
  version: 0.1.0
  category: analysis
---

# Flow Analysis Skill

## When to use

Use this skill when you need to validate that multi-step behavior actually works end-to-end, not just that files exist.

Typical triggers:

- "analyze this flow"
- "check flow completeness"
- "find branch/precondition gaps"
- "why does this user flow break?"

## Workflow

1. Identify intended flow from plan/spec text.
2. Convert to structured nodes and edges.
3. Trace each step to implementation evidence.
4. Detect flow gaps with expected vs actual behavior.
5. Score confidence and prioritize critical gaps first.

## Output requirements

- Always include: location, expected, actual, impact, fix hint.
- Prioritize `WRONG_PRECONDITION` and `DEAD_END` as critical.
- Return concise remediation steps for top gaps.

## Guardrails

- Do not treat structural presence as proof of flow correctness.
- Do not infer branch coverage without explicit evidence.
- Mark uncertain findings as low confidence.

## References

- `references/flow-patterns.md`
- `references/gap-taxonomy.md`
- `references/precondition-checks.md`
