---
description: Analyze sessions and generate prompt improvement suggestions using ACE framework with clean subagent context
agent: general
---

# ACE Reflect - Session Analysis Orchestrator

Analyzes sessions and generates prompt improvement suggestions using the ACE (Agentic Context Engineering) framework.

**IMPORTANT**: This command acts as an ORCHESTRATOR. It starts a subagent with clean context to do the actual analysis. This ensures the analysis is not affected by current context window usage.

## Usage

```
/ace-reflect              Analyze current session
/ace-reflect --help       Show this help
/ace-reflect session:id   Analyze specific session by ID
/ace-reflect last:N       Analyze last N sessions
/ace-reflect all          Full analysis of all sessions (limited to last 10)
```

## How It Works

1. **Orchestrator** (this command) - Collects session data via om-session tools
2. **ACE Analyzer Subagent** - Gets clean context, performs analysis
3. **Results** - Returned to orchestrator, presented to user

This architecture ensures the ACE analyzer has maximum context available for analysis.

## Instructions

**FIRST**: Check if `$ARGUMENTS` contains `--help` or `-h`.

- If YES: Show ONLY the Usage section above and STOP.
- If NO: Continue with analysis below.

### Step 1: Collect Session Data

Use the om-session tools to get session data:

```
1. Use sessionList tool to get recent sessions
2. Use sessionRead tool to get messages from target session(s)
3. Prepare a summary of the session data for the subagent
```

### Step 2: Start ACE Analyzer Subagent

Use the Task tool to start the ACE Analyzer subagent with clean context:

```javascript
task(
  subagent_type: "ace-analyzer",
  description: "ACE Session Analysis",
  prompt: `
## Session Data
[Paste session summary from Step 1 - the messages, tool calls, and outcomes]

## Context
- Session ID: [if available]
- Duration: [if available]
- Tools used: [list from session data]

Analyze this session and return the ACE Reflection Report.
`
)
```

**Note**: The `ace-analyzer` agent is defined in `~/.config/opencode/agents/ace-analyzer.md` and contains the full ACE framework instructions.

### Step 3: Present Results

After the subagent returns, present the results to the user in a clear format.

## Scope Options

Use `$ARGUMENTS` to specify scope:

- No args: Analyze current/most recent session
- `session:id`: Analyze specific session
- `last:N`: Analyze last N sessions
- `all`: Full analysis (limited to 10 most recent)

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

1. [Finding 1 - Pattern, not individual mistake]
2. [Finding 2]

### Suggestions

1. **Target**: [skill/command file]
   **Change**: [specific suggestion]
   **Reason**: [why this helps]

### Decision

- [ ] No changes needed (score ≥ 20)
- [ ] Suggestions for review (score 15-19)
- [ ] Changes recommended (score < 15)
```

## Configuration

Session analysis behavior can be configured in `opencode.config.yaml`:

```yaml
features:
  session:
    enabled: true
    ace:
      max_subagent_depth: 2
      auto_apply_suggestions: false
```

---

**Scope**: $ARGUMENTS
