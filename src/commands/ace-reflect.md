# /ace-reflect

Analyze sessions and generate improvement suggestions using ACE framework.

## Usage

```
/ace-reflect                    Default: text analysis, 2-3 findings
/ace-reflect --verbose          Deeper analysis, more findings
/ace-reflect --technical        Include IDs, timestamps, tool stats
/ace-reflect --full             Complete analysis with all metadata
/ace-reflect session:<id>       Analyze specific session
/ace-reflect last:N             Analyze last N sessions
```

## Workflow

1. **Load Skill:** Read `~/.config/opencode/skill/ace-analysis/SKILL.md`
2. **Collect Data:** Use `om-session` tools or CLI fallback
3. **Spawn Subagent:** Delegate to ACE analyzer with clean context
4. **Return Report:** Present formal report to user

## Flags

| Flag          | Effect                                      |
| ------------- | ------------------------------------------- |
| `--verbose`   | More findings, deeper analysis              |
| `--technical` | Include session IDs, timestamps, tool usage |
| `--full`      | Complete analysis with all metadata         |

## Output

Returns formal `ACE Reflection Report` with:

- Session summary
- Scores (Completeness, Accuracy, Efficiency, Clarity, Relevance)
- Findings (patterns, not individual mistakes)
- Suggestions (specific, actionable)
- Decision (no changes / review / changes recommended)

## References

- `~/.config/opencode/skill/ace-analysis/SKILL.md` - Analysis workflow
- `~/.config/opencode/skill/ace-analysis/references/report-template.md` - Report structure
- `~/.config/opencode/skill/ace-analysis/references/scoring-rubric.md` - Scoring criteria
