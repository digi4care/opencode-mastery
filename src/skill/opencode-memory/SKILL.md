---
name: opencode-memory
description: Persistent memory system with .memory.md, compaction, and cross-project sync
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "1.0.0"
triggers:
  - "memory"
  - ".memory.md"
  - "onthouden"
  - "remember"
  - "persistent memory"
  - "context onthouden"
  - "wat weet je"
  - "remember this"
  - "tell me about"
---

# OpenCode Memory System

Persistent memory keeps useful project context available across sessions via the memory plugin, tools, hooks, and slash commands.

## Quick Commands

```text
/memory status                       Show memory health and indexing status
/memory sync [--force] [--verbose]   Index MEMORY.md and related sources
/memory compact                      Reduce memory size while preserving key context
/remember "text" [flags]            Store new memory with category/priority metadata
/recall "query" [flags]             Search memory with citations and relevance scores
/forget "query" [--force]           Remove a memory entry (confirmation by default)
```

See full command behavior and examples in `docs/MEMORY_USAGE.md`.

## Usage Patterns

### Starting a New Project

1. Run `/memory status` to confirm memory is enabled and healthy.
2. Add baseline context with `/remember "Project uses Bun + strict TypeScript" --category context`.
3. Continue saving decisions as they happen (architecture, standards, gotchas).

### Finding Past Decisions

Use targeted recall queries:

- `/recall "decision about auth provider"`
- `/recall "why vectorWeight 0.7" --source memory --min-score 0.3`

The expected result format is citation + score + preview, for example:

`MEMORY.md#L45-L52 (0.87): "Use verb routing for /memory commands to keep UX consistent..."`

### Cleaning Up and Maintenance

1. Run `/memory sync` after substantial MEMORY.md edits.
2. Run `/memory compact` when memory grows noisy or repetitive.
3. Use `/memory sync --force` if search quality drops after major edits.

## Best Practices

### Writing Effective Memories

- Be specific about what changed and why it matters.
- Include enough context to be reusable later.
- Prefer one clear memory per idea.

Good:

`Use memory_search as shared entry point for /recall and /forget to keep filters consistent.`

Too vague:

`Search was updated.`

### Use Categories Consistently

- `decision` for architecture choices and tradeoffs.
- `pattern` for repeatable implementation approaches.
- `correction` for fixes and lessons learned.
- `preference` for team/user style constraints.
- `context` for project facts and constraints.

### When to Use Priority

- `high`: security, production stability, irreversible decisions.
- `medium`: most implementation notes.
- `low`: temporary reminders and lightweight context.

### Organization Tips

- Use consistent wording for recurring topics to improve recall matches.
- Periodically compact to keep retrieval relevant.
- Prefer concise technical language over conversational phrasing.

## Integration Tips

- Memory commands are thin wrappers around plugin tools (`memory_status`, `memory_sync`, `memory_search`, `memory_remember`).
- Hooks automatically bootstrap and persist useful context at session boundaries.
- Configuration is shared through `opencode.config.yaml` and `src/lib/config/`, so memory behavior stays aligned with project-wide settings.
- Use this skill as quick guidance; use `docs/MEMORY_USAGE.md` for complete installation, configuration, troubleshooting, and workflow coverage.

---

**Difficulty**: ⭐⭐ (Intermediate)
**Complexity**: Medium (scripts + integration)
**Use Case**: Persistent context across sessions, project memory, cross-project knowledge
