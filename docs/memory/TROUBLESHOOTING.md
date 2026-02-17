# Troubleshooting Guide

Common issues and solutions for the OpenCode Memory System.

## Installation Issues

### Module Not Found

**Symptom:** `ModuleNotFoundError: No module named 'memory'`

**Solution:**

```bash
# Add memory module to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:/path/to/opencode-mastery/src/skill/opencode-mastery/scripts"

# Or install the package
cd /path/to/opencode-mastery
uv pip install -e .
```

### Import Errors in Tests

**Symptom:** LSP shows "Import could not be resolved"

**Solution:** This is a pre-existing issue in test files. Run tests with:

```bash
cd src/skill/opencode-mastery/scripts/memory
python -m pytest tests/ -v
```

---

## File & Storage Issues

### .memory.md Not Created

**Symptom:** Memory file not created in project root

**Solution:**

```python
from pathlib import Path
from memory.project_memory_manager import ProjectMemoryManager

manager = ProjectMemoryManager(project_root=Path("/my/project"))

# Force file creation
manager._ensure_file_exists()

# Or load config (creates file if missing)
config = manager.load_config()
```

### File Lock Errors

**Symptom:** `OSError: [Errno 11] Resource temporarily unavailable`

**Cause:** Multiple processes accessing memory file

**Solution:**

```python
# Check for stale lock files
import os
lock_file = Path("/my/project/.memory/.lock")

if lock_file.exists():
    # Check if process is still running
    # Remove if stale (use with caution!)
    lock_file.unlink()

# Or use timeout for lock acquisition
import fcntl

def acquire_lock_with_timeout(lock_fd, timeout=5):
    start = time.time()
    while True:
        try:
            fcntl.flock(lock_fd.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
            return True
        except BlockingIOError:
            if time.time() - start > timeout:
                raise
            time.sleep(0.1)
```

### Permission Denied

**Symptom:** `PermissionError: [Errno 13] Permission denied`

**Solution:**

```bash
# Fix permissions
chmod 644 .memory.md
chmod 755 .memory
chmod 755 ~/.ai_docs/opencode/memory
```

---

## Memory Operation Issues

### Memory Entries Not Saved

**Symptom:** `write_semantic()` completes but entry not in file

**Solution:**

```python
# Check if file was properly locked
manager._acquire_lock()
try:
    content = manager.memory_file.read_text()
    print("Last entry:", content[-200:])
finally:
    manager._release_lock()

# Check config is enabled
config = manager.load_config()
print(f"Enabled: {config.enabled}")  # Should be True
```

### Query Returns Empty

**Symptom:** `query()` returns empty list

**Solution:**

```python
# Verify file exists and has content
memory_file = Path("/my/project/.memory.md")
if memory_file.exists():
    print(memory_file.read_text()[-500:])

# Check entry format
# Must match: - **[category]** content  \n  _timestamp_
```

### Configuration Not Applied

**Symptom:** Changed `.memory.md` config but not taking effect

**Solution:**

```python
# Reload config
config = manager.load_config()
print(f"Compaction count: {config.compaction_count}")

# Verify frontmatter is valid YAML
import yaml
content = manager.memory_file.read_text()
frontmatter, _ = FrontmatterParser.parse(content)
print(yaml.dump(frontmatter))
```

---

## Compaction Issues

### Compaction Never Triggers

**Symptom:** Entries keep accumulating

**Solution:**

```python
from memory.compaction_engine import (
    CompactionEngine,
    CountBasedStrategy,
    TimeBasedStrategy,
)

engine = CompactionEngine(project_root=Path("/my/project"))

# Add strategies
engine.register_strategy(CountBasedStrategy(threshold=80))
engine.register_strategy(TimeBasedStrategy(hours_threshold=1))

# Manually check
print(f"Should compact: {engine.should_compact()}")
print(f"Reason: {engine.get_trigger_reason()}")
```

### Compaction Too Aggressive

**Symptom:** Entries removed too quickly

**Solution:**

```yaml
# In .memory.md
memory:
  compaction:
    count_based: 200 # Increase threshold
    time_based: 48 # Increase hours
```

### Critical Entries Lost

**Symptom:** Entries marked as critical were removed

**Solution:**

```python
# Ensure preserve_critical is enabled
from memory.mechanisms.compaction_mechanism import (
    CompactionMechanism,
    CompactionConfig,
)

config = CompactionConfig(
    preserve_critical=True,
    max_entries_to_preserve=20,
)

mechanism = CompactionMechanism(config=config)

# Mark entries as critical in .memory.md:
# - **[critical]🔴** Important info...
# or
# - **[category]** [CRITICAL] Important info...
```

---

## Global Memory Issues

### Session History Empty

**Symptom:** `get_session_history()` returns []

**Solution:**

```python
# Check sessions directory
from pathlib import Path

sessions_dir = Path.home() / ".ai_docs" / "opencode" / "memory" / "sessions"
print(f"Exists: {sessions_dir.exists()}")

if sessions_dir.exists():
    files = list(sessions_dir.glob("*.json"))
    print(f"Session files: {files}")

# Create a session if none exists
manager = GlobalMemoryManager()
manager.add_exchange("test question", "test answer")
```

### Topics Not Indexed

**Symptom:** `get_all_topics()` returns unexpected results

**Solution:**

```python
# Rebuild master index
manager = GlobalMemoryManager()

# Get all sessions and topics
sessions = manager.get_all_sessions()
print(f"Sessions: {sessions}")

# Force topic update
for session in sessions:
    history = manager.get_session_history(session)
    for exchange in history:
        for topic in exchange.get("topics", []):
            manager._add_to_topic(topic, exchange, session)
```

### Cross-Project Sync Fails

**Symptom:** `sync_from_project()` returns errors

**Solution:**

```python
# Check project has .memory.md
project = Path("/my/project")
memory_file = project / ".memory.md"

if not memory_file.exists():
    print("Create .memory.md first!")
    # Create default
    from memory.global_manager import GlobalMemoryManager
    gm = GlobalMemoryManager()
    gm._create_default_memory_file(memory_file)

# Check file format
content = memory_file.read_text()
print(f"Content length: {len(content)}")
print(f"Has frontmatter: {content.startswith('---')}")
```

---

## Plugin & Hook Issues

### Hooks Not Firing

**Symptom:** Registered hooks never execute

**Solution:**

```python
# List registered hooks
adapter = MemoryPluginAdapter()
print(adapter.list_registered_hooks())

# Trigger manually to test
import asyncio

async def test_hook():
    context = PluginContext(
        session_id="test",
        project_root=Path("/my/project"),
        user_id="test",
        timestamp="2026-02-17T10:00:00",
    )

    results = await adapter.trigger(HookEvent.ON_SESSION_START, context)
    for r in results:
        print(f"Success: {r.success}, Message: {r.message}")

asyncio.run(test_hook())
```

### Hook Execution Order

**Symptom:** Hooks running in wrong order

**Solution:**

```python
# Set priority (lower = runs first)
class MyHook(MemoryPluginHook):
    @property
    def priority(self) -> int:
        return 10  # Runs after priority 0-9

    def get_priority(self) -> int:
        return self.priority
```

---

## Performance Issues

### Slow Query Performance

**Symptom:** `query()` takes > 1 second

**Solution:**

```python
# Limit search scope
# Instead of searching entire file
content = manager.memory_file.read_text()  # Full content

# Use indexed search
from memory.global_manager import GlobalMemoryManager
gm = GlobalMemoryManager()

# Search specific topic
results = gm.find_relevant_context(["keyword"])
# Much faster than full query
```

### Memory File Too Large

**Symptom:** `.memory.md` file is > 1MB

**Solution:**

```python
# Run compaction
engine = CompactionEngine(project_root=Path("/my/project"))
engine.register_strategy(CountBasedStrategy(threshold=50))

import asyncio
stats = asyncio.run(engine.compact())
print(f"Entries reduced: {stats.entries_before} -> {stats.entries_after}")
```

### Too Many Snapshot Files

**Symptom:** `.memory/snapshots/` has thousands of files

**Solution:**

```python
import os
from pathlib import Path

snapshots = Path("/my/project/.memory/snapshots")

# List and remove old snapshots
files = sorted(snapshots.glob("snapshot_*.md"), key=os.path.getmtime)

# Keep only last 10
for f in files[:-10]:
    f.unlink()
    print(f"Removed: {f}")
```

---

## Debugging Tips

### Enable Debug Logging

```python
import logging

# Enable all memory logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(name)s - %(levelname)s - %(message)s'
)

# Or just memory module
logging.getLogger('memory').setLevel(logging.DEBUG)
```

### Inspect Memory State

```python
# Full state inspection
from memory.global_manager import GlobalMemoryManager

gm = GlobalMemoryManager()

print("=== Global Memory Stats ===")
stats = gm.get_stats()
for k, v in stats.items():
    print(f"{k}: {v}")

print("\n=== Sessions ===")
for session in gm.get_all_sessions()[:5]:
    print(f"  {session}")

print("\n=== Topics ===")
for topic in gm.get_all_topics()[:10]:
    print(f"  {topic}")
```

### Validate .memory.md Format

```python
from memory.project_memory_manager import FrontmatterParser

content = Path("/my/project/.memory.md").read_text()
frontmatter, body = FrontmatterParser.parse(content)

print("=== Frontmatter ===")
print(yaml.dump(frontmatter))

print("=== Body Sections ===")
import re
sections = re.findall(r'^##\s+(\w+)', body, re.MULTILINE)
for s in sections:
    print(f"  - {s}")
```

---

## Getting Help

### Collect Debug Info

```python
def collect_debug_info(project_root: Path) -> dict:
    """Collect debug information for troubleshooting."""

    info = {
        "project": str(project_root),
        "memory_file_exists": (project_root / ".memory.md").exists(),
        "memory_dir_exists": (project_root / ".memory").exists(),
    }

    # File contents
    mem_file = project_root / ".memory.md"
    if mem_file.exists():
        info["file_size"] = mem_file.stat().st_size
        info["line_count"] = len(mem_file.read_text().splitlines())

    # Lock file
    lock_file = project_root / ".memory" / ".lock"
    info["lock_exists"] = lock_file.exists()

    return info
```

### Run Diagnostics

```bash
# Check Python path
python -c "import memory; print(memory.__file__)"

# Run memory tests
cd src/skill/opencode-mastery/scripts/memory
python -m pytest tests/ -v --tb=short

# Check file permissions
ls -la .memory/
ls -la ~/.ai_docs/opencode/memory/
```
