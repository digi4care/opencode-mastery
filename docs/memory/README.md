# OpenCode Memory System

Persistent memory system for OpenCode with per-project `.memory.md` files, global memory, and intelligent compaction.

## Features

| Feature                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| **Project Memory**     | Per-project `.memory.md` with YAML frontmatter       |
| **Global Memory**      | Cross-session memory at `~/.ai_docs/opencode/memory` |
| **Compaction**         | Count-based, time-based, and event-based triggers    |
| **4 Mechanisms**       | Bootstrap, Compaction, Snapshot, User Request        |
| **Cross-Project Sync** | Sync memory across multiple projects                 |
| **Plugin System**      | Hook-based extensibility                             |

## Quick Start

### Step 1: Create Project Memory File

Create `.memory.md` in your project root:

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
---

# Project Memory

## Bootstrap Context

Your persistent context here...

## Semantic Memory

- **[category]** Your memory entries here...

## Episodic Memory

Session history entries...
```

### Step 2: Configure Triggers

| Trigger Type  | Default    | Description             |
| ------------- | ---------- | ----------------------- |
| `count_based` | 80 entries | Compact after N entries |
| `time_based`  | 15 hours   | Compact after N hours   |
| `event_based` | true       | Compact on session end  |

### Step 3: Use Memory Features

```python
from memory.project_memory_manager import ProjectMemoryManager

# Initialize
manager = ProjectMemoryManager(project_root="/path/to/project")

# Add semantic memory
manager.write_semantic("Important info about this project", "config")

# Add episodic memory
manager.write_episodic("Fixed bug in authentication", "2026-02-17")

# Query memory
results = manager.query("authentication")
```

## Memory Types

### Semantic Memory

Long-term knowledge that persists across sessions:

- Project configuration
- Important decisions
- Code patterns specific to the project

### Episodic Memory

Session-based records of activity:

- Daily work logs
- Session summaries
- Task completions

## File Structure

```
project/
├── .memory.md              # Main memory file
├── .memory/
│   ├── .lock              # File lock for thread safety
│   ├── snapshots/         # Session snapshots
│   └── daily/            # Daily logs

~/.ai_docs/opencode/memory/
├── sessions/             # Session history (JSON)
├── topics/              # Topic-indexed memory
└── master_index.json    # Global topic index
```

## CLI Usage

```bash
# Add exchange to memory
python -m memory.global_manager --add "Question" "Answer" "topic"

# View session history
python -m memory.global_manager --history

# Get topic memory
python -m memory.global_manager --topic mytopic

# Search memory
python -m memory.global_manager --search keyword1 keyword2

# List projects
python -m memory.global_manager --projects

# Sync from project
python -m memory.global_manager --sync /path/to/project

# Export to project
python -m memory.global_manager --export /path/to/project topic

# Show stats
python -m memory.global_manager --stats
```

## Configuration Reference

```yaml
memory:
  version: "1.0" # Schema version
  enabled: true # Enable/disable memory
  compaction:
    count_based: 80 # Entries before compaction
    time_based: 15 # Hours between compaction
    event_based: true # Compact on events
  types:
    semantic:
      enabled: true
      scope: project # project | global
    episodic:
      enabled: true
      retention: 30d # Retention period
```

## API Overview

| Class                  | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `ProjectMemoryManager` | Per-project `.memory.md` operations           |
| `GlobalMemoryManager`  | Global memory at `~/.ai_docs/opencode/memory` |
| `CompactionEngine`     | Memory compaction with pluggable strategies   |
| `BootstrapMechanism`   | Load memory at session start                  |
| `CompactionMechanism`  | Auto-compact on context warning               |
| `SnapshotMechanism`    | Save session snapshots                        |
| `UserRequestMechanism` | Handle "remember" / "query" requests          |
| `CrossProjectSync`     | Sync memory across projects                   |
| `MemoryPluginAdapter`  | Hook-based plugin system                      |

## Next Steps

- **API Reference**: See `docs/memory/API.md`
- **Architecture**: See `docs/memory/ARCHITECTURE.md`
- **Plugins**: See `docs/memory/PLUGIN_GUIDE.md`
- **Troubleshooting**: See `docs/memory/TROUBLESHOOTING.md`
