---
description: Analyze sessions and generate prompt improvement suggestions using ACE framework with clean subagent context
agent: general
---

# ACE Reflect - Session Analysis Orchestrator

Analyzes sessions and generates prompt improvement suggestions using the ACE (Agentic Context Engineering) framework.

**IMPORTANT**: This command acts as an ORCHESTRATOR. It starts a subagent with clean context to do the actual analysis. This ensures the analysis is not affected by current context window usage.

## Usage

```
/ace-reflect                      Analyze current session (text only)
/ace-reflect --help               Show this help
/ace-reflect --verbose            Include detailed analysis
/ace-reflect --technical          Include technical data (IDs, timestamps)
/ace-reflect --full               Include everything (verbose + technical)
/ace-reflect session:id           Analyze specific session by ID
/ace-reflect last:N               Analyze last N sessions
/ace-reflect all                  Full analysis of all sessions (limited to last 10)
```

### Analysis Modes

| Mode          | Flag          | What's Included                                     |
| ------------- | ------------- | --------------------------------------------------- |
| **Default**   | (none)        | Text content only - patterns, decisions, outcomes   |
| **Verbose**   | `--verbose`   | Extended findings, more suggestions                 |
| **Technical** | `--technical` | Session IDs, timestamps, message counts, tool usage |
| **Full**      | `--full`      | Everything (verbose + technical)                    |

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

**Option A: om-session plugin tools (preferred)**

If `session-list` and `session-read` tools are available:

1. Use `session-list` tool to get recent sessions
2. Use `session-read` tool to get messages from target session(s)
3. Prepare a summary of the session data for the subagent

**Option B: CLI fallback (if plugins unavailable)**

If om-session tools are not registered, use OpenCode CLI:

```bash
# List recent sessions (use -n, not --limit)
opencode session list -n 10 --format json

# NOTE: opencode session read does NOT exist
# Session data is stored in SQLite database at:
# ~/.local/share/opencode/opencode.db
```

If you cannot read session data, analyze the current conversation context directly instead of spawning a subagent.

### Step 2: Analyze Session Data

**Check flags in `$ARGUMENTS`:**

- `--verbose` → Extended analysis, more findings
- `--technical` → Include IDs, timestamps, metadata
- `--full` → All of the above

**Option A: Subagent (if task tool available)**

Use the task tool to start an ACE Analyzer subagent with clean context:

```
task(
  subagent_type: "general",
  description: "ACE Session Analysis",
  prompt: "You are an ACE analyzer. Analyze this session data.

  MODE: [default/verbose/technical/full]

  For DEFAULT mode:
  - Focus on TEXT CONTENT only (what was discussed, decided, achieved)
  - Identify PATTERNS, not individual mistakes
  - Extract key decisions and outcomes

  For VERBOSE mode (includes default +):
  - More detailed findings
  - Additional suggestions
  - Deeper pattern analysis

  For TECHNICAL mode (includes default +):
  - Session IDs, timestamps
  - Message counts
  - Tool usage statistics
  - File paths referenced

  For FULL mode:
  - Everything from all modes

  Session data: [summary]"
)
```

**Option B: Direct analysis (no subagent available)**

If the task tool is not available, analyze the current conversation context directly:

1. **Default**: Review TEXT content - what was discussed, decided, achieved
2. Identify patterns, not individual mistakes
3. Generate suggestions based on content analysis
4. Only include technical data if `--technical` or `--full` flag present

### Step 3: Generate and Return Report

**IMPORTANT**: This command MUST return a formal report to the main agent. The report is the PRIMARY OUTPUT.

After analysis completes, return the report in this EXACT structure:

```markdown
# 📊 ACE Reflection Report

[IF --technical OR --full:]

> **Generated**: [timestamp]
> **Session**: [session-id]
> **Scope**: [current/session:id/last:N]
> **Mode**: [default/verbose/technical/full]

---

## Summary

[1-2 sentences describing what was discussed, decided, achieved - TEXT FOCUS]

## Scores

| Criterium    | Score    | Notes |
| ------------ | -------- | ----- |
| Completeness | X/5      | ...   |
| Accuracy     | X/5      | ...   |
| Efficiency   | X/5      | ...   |
| Clarity      | X/5      | ...   |
| Relevance    | X/5      | ...   |
| **TOTAL**    | **X/25** |       |

## Findings (Patterns)

[DEFAULT mode: 2-3 key patterns from content]
[VERBOSE/FULL mode: 5+ patterns with deeper analysis]

1. [Finding 1 - Focus on what was discussed/decided]
2. [Finding 2]

[IF --technical OR --full:]

## Technical Data

- **Session ID**: [id]
- **Duration**: [time]
- **Messages**: [count]
- **Tools used**: [list]
- **Files modified**: [list]

## Suggestions

[DEFAULT mode: Top 2-3 actionable suggestions]
[VERBOSE mode: All suggestions with reasoning]

1. **Target**: [file path]
   **Change**: [specific suggestion]
   **Reason**: [why this helps]

## Decision

- [x] No changes needed (score ≥ 20)
- [ ] Suggestions for review (score 15-19)
- [ ] Changes recommended (score < 15)

---

_End of ACE Reflection Report_
```

**MODE SUMMARY:**

- **Default**: Summary + Scores + 2-3 Findings + 2-3 Suggestions + Decision
- **--verbose**: Default + more findings/suggestions + deeper analysis
- **--technical**: Default + Technical Data section (IDs, timestamps, counts)
- **--full**: Everything

**DO NOT** summarize or paraphrase the report. Return the FULL report to the main agent.

## Scope Options

Use `$ARGUMENTS` to specify scope:

- No args: Analyze current/most recent session
- `session:id`: Analyze specific session
- `last:N`: Analyze last N sessions
- `all`: Full analysis (limited to 10 most recent)

## Report Storage (Optional)

Save report to file for future reference:

```bash
# Save to .tmp/ace-reports/
mkdir -p .tmp/ace-reports
# Report saved as: .tmp/ace-reports/YYYY-MM-DD_HH-MM_session-id.md
```

## Main Agent Instructions

When you receive the ACE Reflection Report:

1. **Present the full report** - Do not summarize or truncate
2. **Ask user** - "Wil je de suggesties implementeren?"
3. **If yes** - Apply the suggested changes
4. **If no** - Continue with other tasks

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
