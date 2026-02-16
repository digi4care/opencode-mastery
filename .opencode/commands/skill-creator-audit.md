---
description: Audit a SKILL.md for best-practice signals
agent: general
---

# Skill Creator: Audit

Audit a SKILL.md for the best-practice sections and basic quality signals.

## Usage

```
/skill-creator-audit <path-to-SKILL.md>
/skill-creator-audit --help
```

## Instructions

**FIRST**: If `$ARGUMENTS` contains `--help` or `-h`, show only the Usage section and stop.

1. Treat `$ARGUMENTS` as the path to a `SKILL.md` file.
2. Read the file content.
3. Call the tool `skill-creator-audit` with `skillContent` set to the file content.
4. Return the audit output and highlight missing sections.

## Output

- Show the audit JSON.
- Summarize any missing sections and word-count warnings.
