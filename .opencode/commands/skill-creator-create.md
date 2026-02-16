---
description: Create a new skill skeleton with dry-run support
agent: general
---

# Skill Creator: Create

Create a new skill skeleton (SKILL.md + references) with dry-run by default.

## Usage

```
/skill-creator-create <request>
/skill-creator-create --confirm
/skill-creator-create --help
```

## Instructions

**FIRST**: If `$ARGUMENTS` contains `--help` or `-h`, show only the Usage section and stop.

1. Interpret `$ARGUMENTS` as the request text.
2. If triggers, workflow, or error handling are missing, call `skill-creator-plan` first and ask for the missing fields.
3. Call `skill-creator-create` with:
   - `request`
   - `triggers`, `workflow`, `errorHandling`, `tests`, `references`
   - `dryRun: true` unless the user passes `--confirm`
4. If `--confirm` is present, set `confirm: true` and `dryRun: false`.
5. Return planned writes and ask for confirmation before any real write.

## Output

- Show planned files (paths + actions).
- Confirm before writing files.
