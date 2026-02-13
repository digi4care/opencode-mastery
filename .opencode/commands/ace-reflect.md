---
description: Analyze sessions and generate prompt improvement suggestions
agent: general
---

# ACE Reflect - Session Analysis

Analyze sessions and generate prompt improvement suggestions using the ACE (Agentic Context Engineering) framework.

## Usage

```
/ace-reflect              Analyze current session
/ace-reflect --help       Show this help
/ace-reflect skill:naam   Focus on specific skill
/ace-reflect agent:naam   Focus on specific agent
/ace-reflect command:naam Focus on specific command
/ace-reflect all          Full analysis of all sessions
```

## What it does

1. Loads ACE framework context (rubric, patterns)
2. Analyzes session(s) for friction points and successes
3. Scores on 5 dimensions (1-5 each)
4. Generates concrete prompt improvement suggestions

## Instructions

**FIRST**: Check if `$ARGUMENTS` contains `--help` or `-h`.

- If YES: Show ONLY the Usage section above and STOP. Do not run analysis.
- If NO: Continue with analysis below.

1. Load ACE context:
   - Read references/ace-framework.mdx from opencode-mastery skill
   - Read references/ace-rubric.mdx for evaluation criteria
   - Read references/ace-patterns.mdx for patterns

2. Analyze the current or recent session(s):
   - What went well?
   - What friction points occurred?
   - Were there corrections, retries, or misunderstandings?

3. Apply the rubric:
   - Completeness (1-5)
   - Accuracy (1-5)
   - Efficiency (1-5)
   - Clarity (1-5)
   - Relevance (1-5)

4. Generate suggestions:
   - For each identified issue, propose a concrete prompt improvement
   - Format as: "In [target file], change/add: [specific suggestion]"
   - Include the reasoning: "Because: [why this helps]"

## Scope Options

Use `$ARGUMENTS` to specify scope:

- No args: Analyze current session
- `skill:naam`: Focus on specific skill
- `agent:naam`: Focus on specific agent
- `command:naam`: Focus on specific command
- `all`: Full analysis

## Output Format

```markdown
## ACE Reflection Report

### Session Summary

[Brief summary of what was attempted]

### Scores

| Criterium    | Score     | Notes |
| ------------ | --------- | ----- |
| Completeness | X/5       | ...   |
| Accuracy     | X/5       | ...   |
| Efficiency   | X/5       | ...   |
| Clarity      | X/5       | ...   |
| Relevance    | X/5       | ...   |
| **Total**    | **XX/25** |       |

### Findings

1. [Finding 1]
2. [Finding 2]

### Suggestions

1. **Target**: [file location]
   **Change**: [specific suggestion]
   **Reason**: [why this helps]

2. ...

### Decision

- [ ] No changes needed (score ≥ 20)
- [ ] Suggestions for review (score 15-19)
- [ ] Changes recommended (score < 15)
```

---

**Scope**: $ARGUMENTS
