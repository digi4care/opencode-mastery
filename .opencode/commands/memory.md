---
description: Memory management commands for OpenCode
agent: general
---

# Memory Commands

Manage persistent memory for OpenCode sessions.

## Usage

```
/memory                    Show memory status
/memory on                 Enable memory for this project
/memory off                Disable memory for this project
/memory compact            Force memory compaction now
/memory status             Show detailed memory status
/remember <text>           Remember this for future sessions
/what do you know about <topic>  Query memory
/memory sync               Sync memory with global storage
```

## What I Do

I provide commands to manage the OpenCode memory system.

### /memory

Shows current memory status including:

- Whether memory is enabled
- Project .memory.md location
- Context usage percentage
- Last compaction time

### /memory on

1. Check if `.memory.md` exists in project root
2. If NOT: Create from template
3. Update config to enable memory
4. Load memory into session context

### /memory off

1. Update `.memory.md` config to disable
2. Clear session memory context
3. Continue session without memory

### /memory compact

1. Trigger immediate compaction
2. Extract key information from current session
3. Save to daily log
4. Update semantic memory
5. Report compaction results

### /remember <text>

1. Parse the text to remember
2. Determine if it's semantic (fact) or episodic (event)
3. Add to appropriate memory:
   - Semantic → `.memory.md` semantic section
   - Episodic → `.memory/daily/` log
4. Confirm what was remembered

### /what do you know about <topic>

1. Extract topic from query
2. Search in:
   - Project .memory.md (semantic)
   - Global memory (topics)
   - Daily logs (episodic)
3. Format and return relevant context

### /memory sync

1. Sync project memory with global storage
2. Resolve any conflicts (newest wins)
3. Report sync results

## Instructions

**FIRST**: Parse the command and arguments.

1. **For `/memory` (no args)**: Show status
2. **For `/memory on`**: Enable memory
3. **For `/memory off`**: Disable memory
4. **For `/memory compact`**: Force compaction
5. **For `/memory status`**: Detailed status
6. **For `/remember <text>`**: Extract text and store
7. **For `/what do you know about <topic>`**: Extract topic and search
8. **For `/memory sync`**: Trigger sync

**Execute using the memory CLI script:**

```bash
cd /media/digi4care/ExtDrive/projects/ai/opencode-mastery
uv run ~/.ai_docs/opencode/scripts/memory_cli.py <command>
```

Example:

- `uv run ~/.ai_docs/opencode/scripts/memory_cli.py status`
- `uv run ~/.ai_docs/opencode/scripts/memory_cli.py compact`
- `uv run ~/.ai_docs/opencode/scripts/memory_cli.py remember mijn tekst`

## Memory System Location

**Scripts**: `~/.ai_docs/opencode/scripts/`

**Project memory**:

- `.memory.md` - Config & semantic memory (in project root)
- `.memory/daily/` - Daily logs
- `.memory/snapshots/` - Session snapshots

**Global memory**:

- `~/.ai_docs/opencode/memory/` - Global storage

---

**Arguments**: $ARGUMENTS
