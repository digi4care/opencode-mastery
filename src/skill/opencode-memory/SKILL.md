---
name: opencode-memory
description: Persistent memory system with .memory.md, compaction, and cross-project sync
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

## Auto-Activation

**When `.memory.md` exists in project root → I activate automatically!**

```
project/
├── .memory.md    → Memory plugin activates
└── src/
```

If a `.memory.md` file exists in your project root, I will:

1. Automatically load on session start
2. Enable all memory features
3. Show "Memory: Enabled" in status

## What I Do

I provide persistent memory capabilities for OpenCode sessions. I help remember context across sessions, manage memory compaction, and enable cross-project knowledge sharing.

## How I Work

### 1. Project Memory (.memory.md)

When you work in a project with a `.memory.md` file in the root:

**On Session Start:**

```
1. Detect .memory.md in project root
2. Load configuration from frontmatter
3. Load bootstrap context (semantic memory)
4. Load recent episodic memory from .memory/daily/
5. Inject into session context
```

**During Session:**

```
1. Monitor context usage (count-based trigger at 80%)
2. Handle "remember this" requests (user_request mechanism)
3. Log important context to daily logs
```

**On Session End:**

```
1. Create snapshot (last 15 messages)
2. Update .memory.md recent context section
3. Save to .memory/snapshots/
```

### 2. Memory Configuration

Your `.memory.md` should have this structure:

```markdown
---
memory:
  version: "1.0"
  enabled: true

  compaction:
    count_based: 80 # Trigger at 80% context
    time_based: 15 # Minutes inactivity
    event_based: true # Task completion

  types:
    semantic:
      enabled: true
      scope: project
    episodic:
      enabled: true
      retention: 30d
---

# Project Context

## Stack

- Your tech stack here

## Conventions

- Your coding conventions
```

### 3. Available Commands

When you invoke memory commands, use these:

```markdown
/memory status # Show memory usage and config
/memory on # Enable memory for this project
/memory off # Disable memory for this project
/memory compact # Force compaction now
/remember <text> # Remember this for future sessions
/what do you know about <topic> # Query memory
```

### 4. Memory Plugin Location

The memory system is located at:

```
src/skill/opencode-memory/src/
```

Key modules:

- `index.ts` - Main plugin entry (oh-my-opencode pattern)
- `tools/memory-tool.ts` - AI callable memory tools
- `hooks/memory-bootstrap.ts` - Session start → load .memory.md
- `hooks/memory-compaction.ts` - Context 80% → flush to daily log
- `hooks/memory-snapshot.ts` - Session end → save snapshot
- `hooks/memory-intent.ts` - LLM-powered intent detection (multi-language)

## How to Use Me

### Starting a New Project with Memory

1. Create `.memory.md` in project root (use template)
2. Start OpenCode session
3. Memory loads automatically

### Remembering Things

When you learn important information:

```
User: "Remember that we use PostgreSQL for this project"
→ Add to semantic memory in .memory.md
→ Available in next session
```

### Querying Memory

```
User: "What database do we use in this project?"
→ Search semantic memory
→ Return relevant context
```

### Forcing Compaction

```
User: "The context is getting full, compact now"
→ Trigger manual compaction
→ Preserve critical entries
→ Generate daily log entry
```

## Integration Points

### Session Lifecycle Hooks

The memory system integrates at these points (oh-my-opencode pattern):

| Hook Event                        | Action                 | TypeScript File            |
| --------------------------------- | ---------------------- | -------------------------- |
| `session.created`                 | Bootstrap loading      | hooks/memory-bootstrap.ts  |
| `experimental.session.compacting` | Pre-compaction flush   | hooks/memory-compaction.ts |
| `session.deleted`                 | Snapshot creation      | hooks/memory-snapshot.ts   |
| `tool.execute.before`             | Intent detection (LLM) | hooks/memory-intent.ts     |

### File Locations

```
Project Root/
├── .memory.md              # Your memory config & context
└── .memory/                # Auto-generated (gitignored)
    ├── daily/              # Daily logs
    ├── snapshots/          # Session snapshots
    └── compacted/          # Compacted archives

~/.ai_docs/opencode/memory/ # Global memory
├── sessions/               # Session history
├── topics/                # Topic memory
└── index.json             # Master index
```

## Configuration Options

In your `.memory.md` frontmatter:

| Option                     | Type    | Default | Description                |
| -------------------------- | ------- | ------- | -------------------------- |
| `enabled`                  | boolean | true    | Enable/disable memory      |
| `compaction.count_based`   | int     | 80      | % context before compact   |
| `compaction.time_based`    | int     | 15      | Minutes inactivity         |
| `compaction.event_based`   | boolean | true    | Trigger on task complete   |
| `types.semantic.enabled`   | boolean | true    | Remember facts/preferences |
| `types.episodic.enabled`   | boolean | true    | Remember sessions          |
| `types.episodic.retention` | string  | 30d     | How long to keep           |

## Troubleshooting

### Memory Not Loading

1. Check `.memory.md` exists in project root
2. Verify frontmatter is valid YAML
3. Check `enabled: true` in config

### Compaction Not Triggering

1. Check compaction config in .memory.md
2. Verify count_based threshold (default 80%)
3. Check logs for errors

### Remember Not Working

1. Use exact phrases: "remember this", "onthoud dit"
2. Check write permissions on .memory.md
3. Verify semantic section exists

---

**Difficulty**: ⭐⭐ (Intermediate)
**Complexity**: Medium (scripts + integration)
**Use Case**: Persistent context across sessions, project memory, cross-project knowledge
