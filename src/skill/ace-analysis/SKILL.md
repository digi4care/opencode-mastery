# ACE Analysis Skill

Analyzes AI agent sessions using ACE (Agentic Context Engineering) framework.

## Purpose

Evaluate session quality and generate improvement suggestions for prompts, skills, and commands.

## Triggers

- `/ace-reflect` command
- Session analysis requests
- Prompt optimization tasks

## Workflow

### 1. Collect Session Data

**Preferred:** `om-session` plugin tools

```
session-list → get recent sessions
session-read → get messages from session
```

**Fallback:** OpenCode CLI

```bash
opencode session list -n 10 --format json
```

**Last resort:** Direct context analysis (current conversation)

### 2. Determine Analysis Mode

| Mode      | Flag          | Scope                               |
| --------- | ------------- | ----------------------------------- |
| Default   | (none)        | Text analysis, 2-3 findings         |
| Verbose   | `--verbose`   | Deeper analysis, more findings      |
| Technical | `--technical` | Include IDs, timestamps, tool stats |
| Full      | `--full`      | Complete analysis with all metadata |

### 3. Analyze Session Content

Focus on **patterns**, not individual mistakes:

- Response quality (clarity, accuracy, completeness)
- Tool usage efficiency (redundant calls, missing tools)
- Context management (pruning, distillation)
- Workflow adherence (approval gates, context loading)

### 4. Score Session

Use scoring rubric from `references/scoring-rubric.md`:

| Criterium    | Weight | Focus                                |
| ------------ | ------ | ------------------------------------ |
| Completeness | 5      | All requested tasks completed        |
| Accuracy     | 5      | Correct solutions, no hallucinations |
| Efficiency   | 5      | Minimal iterations, good tool usage  |
| Clarity      | 5      | Clear communication, good structure  |
| Relevance    | 5      | On-topic, no unnecessary tangents    |

**Max Score:** 25

### 5. Generate Report

Use template from `references/report-template.md`:

- Summary (1-2 sentences)
- Scores table
- Findings (patterns, not individual mistakes)
- Suggestions (specific, actionable)
- Decision (no changes / review / changes recommended)

### 6. Return to Orchestrator

Return formal report for presentation to user.

## References

- `references/report-template.md` - Report structure
- `references/scoring-rubric.md` - Detailed scoring criteria

## Error Handling

| Situation            | Action                           |
| -------------------- | -------------------------------- |
| No session data      | Analyze current context directly |
| Plugin unavailable   | Use CLI fallback                 |
| Subagent spawn fails | Analyze in current context       |

## Configuration

```yaml
features:
  ace:
    enabled: true
    max_subagent_depth: 2
    auto_apply_suggestions: false
```
