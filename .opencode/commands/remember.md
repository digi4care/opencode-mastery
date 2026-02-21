---
description: Store information in project memory for future sessions
agent: build
---

# /remember

Store text into project memory from `$ARGUMENTS`.

## Input Parsing

1. Parse content from `$ARGUMENTS`.
2. Parse optional flags:
   - `--category <type>` where type is `preference|pattern|correction|context|decision` (default: `context`)
   - `--priority <level>` where level is `high|medium|low` (default: `medium`)
3. If no content is provided, return a short usage hint.

## Primary Flow

1. Call `memory_remember` with:
   - `content`: parsed text
   - `category`: parsed/default category
   - `priority`: parsed/default priority
2. Show confirmation:
   - `✓ Remembered: "<first 50 chars...>" [category, priority]`

## Fallback Flow

If `memory_remember` is unavailable, append directly to `MEMORY.md` using:

```
## YYYY-MM-DD

**[CATEGORY]** (priority: PRIORITY)
Content text here
```

Then confirm with the same brief message format.

## Arguments

- Full input: `$ARGUMENTS`
