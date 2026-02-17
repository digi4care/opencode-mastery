# API Reference

Complete API documentation for the OpenCode Memory System.

## ProjectMemoryManager

Manages per-project `.memory.md` file lifecycle with thread-safe operations.

### Constructor

```python
def __init__(self, project_root: Path) -> None:
    """
    Initialize ProjectMemoryManager.

    Args:
        project_root: Path to the project root directory
    """
```

### Methods

#### `load_config() -> MemoryConfig`

Load memory configuration from `.memory.md` file.

```python
config = manager.load_config()
print(config.compaction_count)  # 80
print(config.enabled)          # True
```

#### `save(config: MemoryConfig) -> None`

Save configuration to memory file.

```python
config = MemoryConfig(
    version="1.0",
    enabled=True,
    compaction_count=100,
    compaction_time=24,
    compaction_event=True,
)
manager.save(config)
```

#### `write_semantic(content: str, category: str) -> None`

Write semantic memory entry.

```python
manager.write_semantic(
    content="Use Python 3.10+ features",
    category="config"
)
```

#### `write_episodic(content: str, date: str | None = None) -> None`

Write episodic memory entry.

```python
manager.write_episodic(
    content="Fixed authentication bug",
    date="2026-02-17"
)
```

#### `create_snapshot(messages: list[dict[str, Any]]) -> None`

Create snapshot of conversation messages.

```python
messages = [
    {"role": "user", "content": "Fix the bug"},
    {"role": "assistant", "content": "Done!"},
]
manager.create_snapshot(messages)
```

#### `query(query_text: str) -> list[MemoryEntry]`

Query memory entries matching search text.

```python
results = manager.query("authentication")
for entry in results:
    print(entry.content)
```

#### `updateEntry(entry_id: str, content: str) -> bool`

Update existing memory entry.

```python
success = manager.updateEntry("entry-123", "New content")
```

#### `get_bootstrap_context() -> str`

Get bootstrap context from memory file.

```python
context = manager.get_bootstrap_context()
```

#### `consolidate() -> None`

Trigger memory consolidation.

```python
manager.consolidate()
```

---

## MemoryConfig

Immutable configuration for memory management.

```python
@dataclass(frozen=True)
class MemoryConfig:
    version: str = "1.0"
    enabled: bool = True
    compaction_count: int = 80
    compaction_time: int = 15
    compaction_event: bool = True
    semantic_enabled: bool = True
    semantic_scope: str = "project"
    episodic_enabled: bool = True
    episodic_retention: str = "30d"
```

---

## MemoryEntry

Immutable memory entry.

```python
@dataclass(frozen=True)
class MemoryEntry:
    content: str
    category: str
    timestamp: str
    entry_type: str  # 'semantic' or 'episodic'
```

---

## GlobalMemoryManager

Manages global memory at `~/.ai_docs/opencode/memory/`.

### Constructor

```python
def __init__(self, memory_base: Path | None = None) -> None:
    """
    Initialize GlobalMemoryManager.

    Args:
        memory_base: Optional custom memory base path.
                     Defaults to ~/.ai_docs/opencode/memory/
    """
```

### Session Management

#### `add_exchange(question: str, answer: str, topics: list[str] | None = None, session_id: str | None = None) -> None`

Add exchange to session memory.

```python
manager.add_exchange(
    question="How do I use config?",
    answer="Config is loaded from .memory.md",
    topics=["config", "settings"]
)
```

#### `get_session_history(session_id: str | None = None) -> list[dict[str, Any]]`

Get history for session.

```python
history = manager.get_session_history("2026-02-17")
for exchange in history:
    print(exchange["question"])
```

#### `get_all_sessions() -> list[str]`

List all session IDs.

```python
sessions = manager.get_all_sessions()
```

### Topic Management

#### `get_topic_memory(topic: str) -> list[dict[str, Any]]`

Get memory for specific topic.

```python
memory = manager.get_topic_memory("config")
```

#### `get_all_topics() -> list[str]`

List all topics.

```python
topics = manager.get_all_topics()
```

#### `get_master_topics() -> list[str]`

Get topics from master index.

```python
topics = manager.get_master_topics()
```

### Search & Context

#### `find_relevant_context(keywords: list[str]) -> list[dict[str, Any]]`

Find relevant context based on keywords.

```python
context = manager.find_relevant_context(["python", "config"])
```

#### `get_cross_project_context(keywords: list[str]) -> list[dict[str, Any]]`

Get context across all projects.

```python
context = manager.get_cross_project_context(["authentication"])
```

### Project Management

#### `sync_from_project(project_root: Path) -> dict[str, Any]`

Import memory from project.

```python
result = manager.sync_from_project(Path("/my/project"))
print(result["imported"])  # Number of entries imported
```

#### `export_project_memory(project_root: Path, topic: str, category: str = "imported") -> bool`

Export global memory to project.

```python
success = manager.export_project_memory(
    project_root=Path("/my/project"),
    topic="config"
)
```

#### `get_projects() -> list[Path]`

List tracked projects.

```python
projects = manager.get_projects()
```

### Utility

#### `clear_session(session_id: str | None = None) -> bool`

Clear session memory.

```python
manager.clear_session("2026-02-17")
```

#### `get_stats() -> dict[str, Any]`

Get memory statistics.

```python
stats = manager.get_stats()
# {
#   "sessions": 10,
#   "topics": 5,
#   "projects": 3,
#   "total_exchanges": 50,
#   "memory_base": "/path/to/memory"
# }
```

---

## CompactionEngine

Engine for memory compaction with pluggable strategies.

### Constructor

```python
def __init__(self, project_root: Path) -> None:
    """
    Initialize CompactionEngine.

    Args:
        project_root: Path to project root
    """
```

### Methods

#### `register_strategy(strategy: CompactionStrategy) -> None`

Register a compaction strategy.

```python
engine.register_strategy(CountBasedStrategy(threshold=100))
engine.register_strategy(TimeBasedStrategy(hours_threshold=24))
```

#### `should_compact() -> bool`

Check if any strategy triggers compaction.

```python
if engine.should_compact():
    print("Compaction needed")
```

#### `get_trigger_reason() -> str | None`

Get reason for compaction trigger.

```python
reason = engine.get_trigger_reason()
```

#### `compact() -> CompactionStats`

Execute compaction.

```python
stats = await engine.compact()
print(stats.entries_before)   # 80
print(stats.entries_after)    # 64
print(stats.tokens_saved)     # 800
```

#### `get_stats() -> CompactionStats`

Get last compaction statistics.

```python
stats = engine.get_stats()
```

---

## CompactionStrategy

Abstract base class for compaction strategies.

### CountBasedStrategy

```python
strategy = CountBasedStrategy(threshold=80)
if strategy.should_compact({"entry_count": 80}):
    print("Trigger compaction")
```

### TimeBasedStrategy

```python
strategy = TimeBasedStrategy(hours_threshold=15)
if strategy.should_compact({"last_compaction": "2026-02-16T10:00:00"}):
    print("Trigger compaction")
```

### EventBasedStrategy

```python
strategy = EventBasedStrategy(event_types=["session_end", "error"])
if strategy.should_compact({"last_event": "session_end"}):
    print("Trigger compaction")
```

---

## CompactionStats

Statistics from compaction operation.

```python
@dataclass
class CompactionStats:
    entries_before: int = 0
    entries_after: int = 0
    tokens_saved: int = 0
    time_taken: float = 0.0
```

---

## BootstrapMechanism

Mechanism 1: Loads memory context at session start.

### Constructor

```python
def __init__(
    self,
    project_root: Path | None = None,
    global_memory_path: Path | None = None,
    config: BootstrapConfig | None = None,
) -> None:
```

### BootstrapConfig

```python
@dataclass(frozen=True)
class BootstrapConfig:
    load_global: bool = True
    load_project: bool = True
    load_recent_days: int = 7
    max_context_lines: int = 200
```

### Usage

```python
bootstrap = BootstrapMechanism(
    project_root=Path("/my/project"),
    config=BootstrapConfig(load_global=True, load_project=True)
)

result = await bootstrap.execute(context)
# {
#   "bootstrap_loaded": True,
#   "project_context_length": 1500,
#   "global_context_length": 800,
#   "episodic_context_length": 200,
# }
```

---

## CompactionMechanism

Mechanism 2: Auto-compact on context warning.

### Constructor

```python
def __init__(
    self,
    project_root: Path | None = None,
    config: CompactionConfig | None = None,
) -> None:
```

### CompactionConfig

```python
@dataclass
class CompactionConfig:
    threshold_percent: float = 80.0
    preserve_critical: bool = True
    notify_user: bool = True
    max_entries_to_preserve: int = 10
```

---

## SnapshotMechanism

Mechanism 3: Capture session state on session end.

### Constructor

```python
def __init__(
    self,
    project_root: Path | None = None,
    snapshots_folder: Path | None = None,
    max_messages: int = 15,
) -> None:
```

### Usage

```python
snapshot = SnapshotMechanism(
    project_root=Path("/my/project"),
    max_messages=15
)

result = await snapshot.execute(context)
# {
#   "success": True,
#   "message": "Snapshot created successfully",
#   "data": {
#     "snapshot_created": True,
#     "snapshot_path": "/path/to/snapshot.md",
#     "message_count": 15,
#     "decisions_count": 3,
#     "outcomes_count": 2,
#   }
# }
```

---

## UserRequestMechanism

Mechanism 4: Handle "remember" and "query" requests.

### Constructor

```python
def __init__(
    self,
    project_root: Path | None = None,
    global_memory_path: Path | None = None,
    max_results: int = 5,
) -> None:
```

### Usage

```python
mechanism = UserRequestMechanism(
    project_root=Path("/my/project"),
    max_results=5
)

# Handle "remember this" request
result = await mechanism.execute(context)
# {
#   "success": True,
#   "message": "Content saved to memory",
#   "data": {
#     "processed": True,
#     "intent": "remember",
#     "saved_to_project": True,
#   }
# }
```

### Supported Commands

| Intent   | Examples                                           |
| -------- | -------------------------------------------------- |
| Remember | "remember this", "onthoud dit", "don't forget"     |
| Query    | "what do you know", "tell me about", "weet je nog" |

---

## MemoryPluginAdapter

Hook-based plugin system for memory lifecycle.

### Constructor

```python
def __init__(self, project_root: Path | None = None) -> None:
```

### Methods

#### `register_hook(hook: MemoryPluginHook | FunctionBasedHook) -> None`

Register a plugin hook.

```python
adapter.register_hook(my_hook)
```

#### `trigger(event: str, context: PluginContext | None = None) -> list[PluginResult]`

Trigger all hooks for event.

```python
results = await adapter.trigger(
    HookEvent.ON_SESSION_START,
    context
)
```

#### `trigger_session_start(session_id: str, user_id: str = "default") -> list[PluginResult]`

Trigger session start hooks.

```python
results = await adapter.trigger_session_start("2026-02-17")
```

#### `trigger_context_warning(...)`, `trigger_session_end(...)`, `trigger_user_request(...)`

Similar interface for other events.

---

## Hook Events

| Event                | Description               |
| -------------------- | ------------------------- |
| `on_session_start`   | New session begins        |
| `on_context_warning` | Context size > 80%        |
| `on_session_end`     | Session completes         |
| `on_user_request`    | User makes memory request |

---

## CrossProjectSync

Sync memory across multiple projects.

### Constructor

```python
def __init__(
    self,
    global_manager: GlobalMemoryManager | None = None,
    projects: list[Path] | None = None,
    config: SyncConfig | None = None,
) -> None:
```

### SyncConfig

```python
@dataclass
class SyncConfig:
    sync_interval_minutes: int = 60
    auto_sync: bool = False
    conflict_resolution: str = "newest_wins"
    merge_related: bool = True
    related_threshold: float = 0.7
    sync_dir: str = ".memory_sync"
```

### Methods

#### `add_project(project_path: Path) -> None`

Add project to sync list.

```python
sync.add_project(Path("/my/project"))
```

#### `sync(project_path: Path | None = None) -> SyncResult`

Sync memory between global and projects.

```python
result = sync.sync()
print(result.synced)           # Number of entries synced
print(result.conflicts)        # Conflicts detected
print(result.conflicts_resolved)
```

---

## PluginContext

Context passed to plugin hooks.

```python
@dataclass
class PluginContext:
    session_id: str
    project_root: Path | None
    user_id: str
    timestamp: str
    metadata: dict[str, Any] = field(default_factory=dict)
```

---

## PluginResult

Result from plugin hook execution.

```python
@dataclass
class PluginResult:
    success: bool
    message: str
    data: dict[str, Any] | None = None
    error: str | None = None
```
