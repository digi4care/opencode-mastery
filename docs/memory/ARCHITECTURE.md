# Architecture

High-level architecture of the OpenCode Memory System.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     OpenCode Session                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│  │   Bootstrap  │    │  Compaction  │    │   Snapshot   │    │
│  │  Mechanism   │    │  Mechanism   │    │  Mechanism   │    │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘    │
│         │                   │                   │             │
│         └───────────────────┼───────────────────┘             │
│                             │                                   │
│                    ┌────────▼────────┐                          │
│                    │  Plugin Adapter │                          │
│                    │  (Hook System)  │                          │
│                    └────────┬────────┘                          │
│                             │                                   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    Project    │    │    Global     │    │  Cross-      │
│    Memory     │    │    Memory     │    │  Project     │
│  (.memory.md) │    │   ( ~/.ai_)   │    │    Sync      │
└───────────────┘    └───────────────┘    └───────────────┘
```

## Layers

### Layer 1: User-Facing Mechanisms

| Mechanism        | Event                | Purpose                        |
| ---------------- | -------------------- | ------------------------------ |
| **Bootstrap**    | `on_session_start`   | Load memory at session start   |
| **Compaction**   | `on_context_warning` | Auto-compact when context full |
| **Snapshot**     | `on_session_end`     | Save session summaries         |
| **User Request** | `on_user_request`    | Handle "remember"/"query"      |

### Layer 2: Plugin System

The `MemoryPluginAdapter` provides a hook-based system:

```
User Action → Event → Plugin Adapter → Hooks → Managers
```

**Supported Events:**

- `on_session_start`
- `on_context_warning`
- `on_session_end`
- `on_user_request`

### Layer 3: Memory Managers

| Manager                  | Scope       | Storage                       |
| ------------------------ | ----------- | ----------------------------- |
| **ProjectMemoryManager** | Per-project | `./.memory.md`                |
| **GlobalMemoryManager**  | Global      | `~/.ai_docs/opencode/memory/` |

### Layer 4: Storage

```
Project/
├── .memory.md              # Main memory file (YAML frontmatter + MD)
├── .memory/
│   ├── .lock              # File locking
│   ├── snapshots/         # Session snapshots
│   └── daily/             # Daily logs

~/.ai_docs/opencode/memory/
├── sessions/              # Session JSON files
│   └── 2026-02-17.json   # Daily session
├── topics/               # Topic-indexed
│   └── config.json       # Topic memory
├── projects.json         # Tracked projects
└── master_index.json     # Global topic index
```

---

## Data Flow

### Session Start (Bootstrap)

```
1. User starts session
2. Plugin Adapter triggers on_session_start
3. Bootstrap Mechanism executes:
   a. Load project .memory.md
   b. Load global memory (last N days)
   c. Load episodic (daily logs)
4. Combine into bootstrap context
5. Inject into session prompt
```

### Memory Write

```
1. User/agent calls write_semantic() or write_episodic()
2. ProjectMemoryManager:
   a. Acquire file lock (fcntl)
   b. Read current content
   c. Parse frontmatter
   d. Append new entry to section
   e. Write back with frontmatter
   f. Release lock
```

### Context Warning (Compaction)

```
1. Context size reaches 80% threshold
2. Plugin Adapter triggers on_context_warning
3. Compaction Mechanism:
   a. Check threshold (configurable)
   b. Execute CompactionEngine
   c. Preserve critical entries (marked 🔴)
   d. Notify user
```

### Session End (Snapshot)

```
1. User runs /new or /reset
2. Plugin Adapter triggers on_session_end
3. Snapshot Mechanism:
   a. Capture last N messages
   b. Extract summary, decisions, outcomes
   c. Save to .memory/snapshots/
   d. Update .memory.md recent context
```

### User Request

```
1. User says "remember this" or "what do you know"
2. Plugin Adapter triggers on_user_request
3. UserRequest Mechanism:
   a. Detect intent (remember/query)
   b. Extract keywords
   c. For remember: save to project + global
   d. For query: search project, global, episodic
   e. Return formatted response
```

---

## File Format

### .memory.md Structure

```markdown
---
memory:
  version: "1.0"
  enabled: true
  compaction:
    count_based: 80
    time_based: 15
    event_based: true
  types:
    semantic:
      enabled: true
      scope: project
    episodic:
      enabled: true
      retention: 30d
last_updated: "2026-02-17T10:30:00"
---

# Project Memory

## Bootstrap Context

Persistent context that loads at session start...

## Semantic Memory

- **[config]** Use Python 3.10+ features _2026-02-17T10:00:00_
- **[api]** REST API endpoint at /api/v1 _2026-02-16T15:30:00_

## Episodic Memory

- **[session]** Fixed authentication bug _2026-02-17T09:00:00_
- **[session]** Implemented rate limiting _2026-02-16T14:00:00_

## Session Snapshots

### Snapshot 2026-02-17T10:30:00

**Summary:** Session with 15 messages...

### Decisions

- Use async/await for API calls

### Outcomes

- Completed user authentication

## Recent Context

- **2026-02-17T10:30:00** config: Use Python 3.10+ features...
```

---

## Compaction Strategies

### Count-Based

```
Trigger: entry_count >= threshold (default: 80)
Use case: Prevent unlimited growth
```

### Time-Based

```
Trigger: hours_since_last_compaction >= threshold (default: 15h)
Use case: Periodic cleanup
```

### Event-Based

```
Trigger: specific events (session_end, error, project_close)
Use case: Cleanup after significant events
```

---

## Thread Safety

Uses file locking (`fcntl`) for concurrent access:

```python
def _acquire_lock(self) -> None:
    lock_path = self.memory_dir / ".lock"
    self._lock_fd = open(lock_path, "w")
    fcntl.flock(self._lock_fd.fileno(), fcntl.LOCK_EX)

def _release_lock(self) -> None:
    fcntl.flock(self._lock_fd.fileno(), fcntl.LOCK_UN)
    self._lock_fd.close()
```

---

## Cross-Project Sync

```
Project A ──┐
            │
Project B ──┼──► Global Memory ◄──► CrossProjectSync
            │
Project C ──┘
```

**Sync Process:**

1. Detect conflicts (same topic, different content)
2. Resolve using strategy (newest_wins by default)
3. Merge related entries (similarity threshold: 0.7)
4. Write to both global and project storage

---

## Extension Points

### Custom Mechanisms

Implement `MemoryPluginHook` protocol:

```python
class MyMechanism(MemoryPluginHook):
    @property
    def name(self) -> str:
        return "my_mechanism"

    @property
    def trigger_event(self) -> str:
        return HookEvent.ON_SESSION_START

    async def _execute_impl(self, context: PluginContext) -> dict:
        # Your logic here
        return {"result": "success"}
```

### Custom Compaction Strategy

Extend `CompactionStrategy`:

```python
class MyStrategy(CompactionStrategy):
    def __init__(self, param: int):
        self.param = param

    def should_compact(self, context: dict) -> bool:
        return context.get("custom_metric", 0) > self.param

    def get_trigger_reason(self) -> str:
        return f"Custom metric exceeded {self.param}"
```

---

## Configuration Hierarchy

```
1. Default values (in code)
2. .memory.md frontmatter (project)
3. Global config (~/.ai_docs/opencode/memory/config.json)
4. Environment variables (override)
```
