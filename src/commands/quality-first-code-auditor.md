---
description: Deep scan repository for quality gaps with focus on skills, cross-component collaboration, and direct fixes
agent: general
---

# /quality-first-code-auditor

Execute a comprehensive quality audit on the repository with focus on skills, cross-component collaboration, and immediate fixes.

## Usage

```
/quality-first-code-auditor                           Full src/ scan
/quality-first-code-auditor --scope skills            Skills only
/quality-first-code-auditor --scope src/plugin        Plugin directory only
/quality-first-code-auditor --fix                     Auto-fix critical issues
/quality-first-code-auditor --help                    Show usage
```

## Scope

Scans for quality gaps in:

| Directory      | Focus                                   |
| -------------- | --------------------------------------- |
| `src/agents`   | Agent metadata, frontmatter consistency |
| `src/commands` | Command routing, header/naming parity   |
| `src/features` | Feature contracts, import integrity     |
| `src/lib`      | Schema/default parity, config drift     |
| `src/plugin`   | Tool-ID registration vs usage           |
| `src/skill`    | SKILL.md quality per best practices     |

Additional scans:

1. Skill quality per SKILL.md best-practice signals
2. Cross-skill collaboration and trigger conflicts
3. Cross-area collaboration (agents/commands/plugins/features/lib)

## Process

**Phase 1: Preparation**

1. Create TODO per skill (one item per skill)
2. Create separate TODO for cross-skill collaboration analysis

**Phase 2: Deep Scan Pass #1**
Scan for:

- Frontmatter/metadata consistency
- Reference integrity (broken/stale links)
- Command/tool route contracts
- Schema/default/config drift
- Trigger collisions and ownership overlaps

**Phase 3: Report Findings**
Classify by severity:

- **Critical**: Blocks functionality, broken contracts
- **Warning**: Inconsistencies, potential issues
- **Suggestion**: Improvements, best practices

Include exact file paths with line numbers where possible.

**Phase 4: Fix Loop**

1. Fix all Critical issues
2. Run deep scan pass #2
3. If Criticals remain: fix and rescan
4. Stop when "ZERO CRITICAL" achieved

**Phase 5: Collaboration Scan**
Run separate analysis for:

- Skills-scope collaboration
- Full src-scope collaboration

## Output Format

### A) Executive Summary

- Overall quality score (0-100)
- Cross-area collaboration score (0-100)
- Critical/Warning/Suggestion counts

### B) Per-Skill Table

| Skill      | Status         | Critical | Warning | Top Gaps   |
| ---------- | -------------- | -------- | ------- | ---------- |
| skill-name | PASS/WARN/FAIL | N        | N       | gap1, gap2 |

### C) Cross-Collaboration Matrix

| Domain/Trigger | Conflicting Components   | Risk         | Evidence  |
| -------------- | ------------------------ | ------------ | --------- |
| trigger-name   | component-a, component-b | High/Med/Low | file:line |

### D) Top 15 Fixes

Prioritized by impact with rationale.

### E) Quick Wins

Issues fixable in <30 minutes.

### F) Long-term Recommendations

Quality/process/architecture improvements.

### G) Final Status

- Skills: "ZERO CRITICAL" or remaining blockers
- Full src: "CLEAN" or remaining blockers

## Example Output

```
## Executive Summary

- Full src quality health: 61/100
- Cross-area collaboration score: 56/100
- Critical: 4 | Warning: 8 | Suggestion: 12

## Critical Issues

1. [flow-analyzer] Tool-ID mismatch (snake_case vs kebab-case)
   - src/plugin/flow-analyzer/index.ts:13
   - src/plugin/flow-analyzer/index.ts:48

2. [repo] Broken import/feature coupling
   - src/features/repo/index.ts:7

3. [config] Schema/default drift in session config
   - src/lib/config/schema.ts:126
   - src/lib/config/defaults.ts:124

4. [commands] Dead command chain
   - src/commands/gsd-auto-validate.md:10

## Quick Wins

1. Fix tool-ID naming consistency (15 min)
2. Update broken imports (10 min)
3. Align schema with defaults (20 min)
```

## Flags

| Flag             | Effect                                      |
| ---------------- | ------------------------------------------- |
| `--scope <path>` | Limit scan to specific directory            |
| `--fix`          | Auto-fix critical issues after confirmation |
| `--dry-run`      | Report only, no fixes                       |
| `--verbose`      | Include all suggestions, not just top 15    |
| `--help`         | Show usage                                  |

## Principles

- **No vague claims**: Only verifiable findings
- **No cosmetic changes**: Focus on contract/route issues first
- **Quality over speed**: Accurate findings over fast results
- **Evidence required**: Every finding backed by file:line reference

## References

- [Skill Best Practices](../skill/opencode-mastery/examples/skills/BEST_PRACTICES.md)
- [Agent Frontmatter](../docs/opencode/AGENTS.md)
- [Plugin Tools Guide](../docs/opencode/tools.md)
