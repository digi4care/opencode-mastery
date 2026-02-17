---
description: Draft a skill plan without writing files
agent: general
---

# Skill Creator: Plan

Draft a structured skill plan from a request. No files are written.

## Usage

```
/skill-creator-plan <request>
/skill-creator-plan --help
```

## Instructions

**FIRST**: If `$ARGUMENTS` contains `--help` or `-h`, show only the Usage section and stop.

1. Interpret `$ARGUMENTS` as the request text. If missing, ask the user for a one-line request.
2. Extract any obvious triggers, workflow steps, or error handling from the request.
3. Call the plugin tool `skill-creator-plan` (not the slash command) with the request and any extracted fields.
4. Present the plan output and list any missing fields that need user input.

## Output

- Return the plan JSON.
- Clearly list missing fields that must be supplied before creation.
