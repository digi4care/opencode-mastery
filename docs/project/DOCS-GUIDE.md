# Documentation Guide

How to update documentation for AI agents.

## Multi-Dimensional Analysis

### 1. Structure Analysis

| Dimension     | Question            | Action                               |
| ------------- | ------------------- | ------------------------------------ |
| **Scope**     | What files/topic?   | Use glob/grep to find relevant files |
| **Depth**     | Overview or detail? | Match detail level to use case       |
| **Audience**  | AI or human?        | AI needs explicit triggers/patterns  |
| **Freshness** | Static or dynamic?  | Dynamic needs code/config links      |

### 2. Content Analysis

| Element           | Purpose        | AI Signal                 |
| ----------------- | -------------- | ------------------------- |
| **Triggers**      | When to use    | `When:`, `Triggers:`      |
| **Anti-patterns** | What to avoid  | `Never:`, `Avoid:`        |
| **Examples**      | Concrete usage | Code blocks with comments |
| **References**    | External links | URLs to specs/docs        |

### 3. Pattern Analysis

```
Good AI Doc Structure:
1. One-liner summary
2. When to use (triggers)
3. How it works (process)
4. Examples (annotated)
5. Anti-patterns (what NOT to do)
6. References
```

## How-to: Update for AI

### Step 1: Identify the Gap

```
Question: What does the AI not know?
- Missing file?
- Wrong naming convention?
- Missing triggers?
- Outdated patterns?
```

### Step 2: Choose the Right Place

| Update Type | Location                    |
| ----------- | --------------------------- |
| New skill   | `src/skill/<name>/SKILL.md` |
| New plugin  | `src/plugin/<name>/`        |
| New agent   | `opencode-mastery.json`     |
| New command | `src/commands/<name>.md`    |
| Patterns    | `docs/opencode/`            |
| Config      | `src/lib/config/`           |

### Step 3: Write for AI

```markdown
# SKILL.md Template

## Triggers

- "keyword trigger"
- "another trigger"

## When NOT to use

- "when NOT to use this"

## Process

1. Step one
2. Step two

## Anti-patterns

- Never do X
- Avoid Y because Z
```

### Step 4: Test

Ask AI to use the documented feature. If it doesn't work, check:

1. Triggers are explicit
2. Process steps are linear
3. Examples are annotated
4. Anti-patterns are specific

## Documentation Checklist

- [ ] Clear one-liner
- [ ] Explicit triggers (when AI should use it)
- [ ] Explicit anti-triggers (when NOT to use)
- [ ] Process steps (numbered)
- [ ] Examples with annotations
- [ ] Anti-patterns (specific)
- [ ] References to related docs

## Quick Reference

| Doc Type | File            | Key Sections                      |
| -------- | --------------- | --------------------------------- |
| Skill    | `SKILL.md`      | Triggers, Workflow, Anti-patterns |
| Plugin   | `index.ts`      | Tools, Hooks, Config              |
| Command  | `.md`           | Usage, Process                    |
| Agent    | `.md` (or JSON) | Instructions, Tools               |
| Config   | `schema.ts`     | Zod schema                        |
