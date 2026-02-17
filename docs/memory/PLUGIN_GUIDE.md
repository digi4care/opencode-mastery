# Plugin Development Guide

Create custom plugins to extend the OpenCode Memory System.

## Overview

The memory system uses a hook-based plugin architecture:

```
Event → Plugin Adapter → Hooks → Execute → Result
```

## Plugin Types

### 1. Mechanism Hook

Implement memory lifecycle behavior:

```python
from memory.plugin_adapter import (
    MemoryPluginHook,
    PluginContext,
    PluginResult,
    HookEvent,
)
from pathlib import Path

class MyMechanism(MemoryPluginHook):
    """Custom mechanism that runs on session start."""

    @property
    def name(self) -> str:
        return "my_custom_mechanism"

    @property
    def trigger_event(self) -> str:
        return HookEvent.ON_SESSION_START

    async def _execute_impl(self, context: PluginContext) -> dict:
        # Your logic here
        return {
            "custom_data": "value",
            "session_id": context.session_id,
        }
```

### 2. Function-Based Hook

Quick hooks without class overhead:

```python
from memory.plugin_adapter import (
    FunctionBasedHook,
    PluginContext,
    PluginResult,
    HookEvent,
)

async def my_hook(context: PluginContext) -> dict:
    print(f"Session {context.session_id} started")
    return {"logged": True}

hook = FunctionBasedHook(
    name="logging_hook",
    trigger_event=HookEvent.ON_SESSION_START,
    func=my_hook,
)
```

### 3. Custom Compaction Strategy

Extend compaction behavior:

```python
from memory.compaction_engine import (
    CompactionStrategy,
    CompactionEngine,
)

class TokenBasedStrategy(CompactionStrategy):
    """Compact based on token count."""

    def __init__(self, token_threshold: int = 100000):
        self.token_threshold = token_threshold

    def should_compact(self, context: dict) -> bool:
        token_count = context.get("token_count", 0)
        return token_count >= self.token_threshold

    def get_trigger_reason(self) -> str:
        return f"Token threshold ({self.token_threshold}) exceeded"

# Register with engine
engine = CompactionEngine(project_root=Path("/my/project"))
engine.register_strategy(TokenBasedStrategy(token_threshold=50000))
```

---

## Complete Plugin Example

### Project Structure

```
my-memory-plugin/
├── plugin.py              # Main plugin code
└── config.json            # Optional configuration
```

### plugin.py

```python
"""
Custom Memory Plugin for OpenCode.

Features:
- Logs all session events
- Tracks memory usage
- Custom compaction trigger
"""

import logging
from pathlib import Path
from typing import Any

from memory.plugin_adapter import (
    MemoryPluginHook,
    PluginContext,
    PluginResult,
    HookEvent,
    MemoryPluginAdapter,
)
from memory.compaction_engine import (
    CompactionStrategy,
    CompactionEngine,
    CompactionStats,
)

logger = logging.getLogger(__name__)


# ==================== Hook: Session Logger ====================

class SessionLoggerHook(MemoryPluginHook):
    """Logs session events to memory file."""

    def __init__(self, log_file: Path | None = None):
        self.log_file = log_file or Path("memory_events.log")

    @property
    def name(self) -> str:
        return "session_logger"

    @property
    def trigger_event(self) -> str:
        return HookEvent.ON_SESSION_START

    async def _execute_impl(self, context: PluginContext) -> dict:
        log_entry = (
            f"[{context.timestamp}] Session: {context.session_id}, "
            f"Project: {context.project_root}\n"
        )

        self.log_file.parent.mkdir(parents=True, exist_ok=True)
        self.log_file.append_text(log_entry)

        logger.info(f"Logged session: {context.session_id}")
        return {"logged": True}


# ==================== Hook: Memory Tracker ====================

class MemoryTrackerHook(MemoryPluginHook):
    """Tracks memory usage statistics."""

    @property
    def name(self) -> str:
        return "memory_tracker"

    @property
    def trigger_event(self) -> str:
        return HookEvent.ON_CONTEXT_WARNING

    async def _execute_impl(self, context: PluginContext) -> dict:
        # Track context size when warning fires
        context_size = context.metadata.get("context_size", 0)
        limit = context.metadata.get("limit", 100000)
        percentage = context.metadata.get("percentage", 0)

        logger.info(
            f"Context warning: {context_size}/{limit} ({percentage:.1f}%)"
        )

        return {
            "tracked": True,
            "context_size": context_size,
            "percentage": percentage,
        }


# ==================== Strategy: Smart Compaction ====================

class SmartCompactionStrategy(CompactionStrategy):
    """Compaction based on activity level."""

    def __init__(self, inactivity_hours: int = 24):
        self.inactivity_hours = inactivity_hours

    def should_compact(self, context: dict) -> bool:
        # Check multiple conditions
        entry_count = context.get("entry_count", 0)

        # Always compact if > 100 entries
        if entry_count > 100:
            return True

        # Check last activity
        last_activity = context.get("last_activity")
        if last_activity:
            from datetime import datetime, timedelta
            try:
                last_time = datetime.fromisoformat(last_activity)
                hours_idle = (datetime.now() - last_time).total_seconds() / 3600
                return hours_idle >= self.inactivity_hours
            except ValueError:
                pass

        return False

    def get_trigger_reason(self) -> str:
        return f"Smart compaction: high entry count or inactivity"


# ==================== Plugin Factory ====================

def create_plugin(config: dict[str, Any] | None = None) -> list[MemoryPluginHook]:
    """
    Create plugin hooks.

    Args:
        config: Optional configuration dict

    Returns:
        List of hooks to register
    """
    config = config or {}

    return [
        SessionLoggerHook(log_file=Path(config.get("log_file", "memory_events.log"))),
        MemoryTrackerHook(),
    ]


def register_plugin(adapter: MemoryPluginAdapter, config: dict[str, Any] | None = None) -> None:
    """
    Register plugin with adapter.

    Args:
        adapter: MemoryPluginAdapter instance
        config: Optional configuration
    """
    hooks = create_plugin(config)

    for hook in hooks:
        adapter.register_hook(hook)

    # Also register custom strategy if using compaction
    project_root = adapter.project_root
    if project_root:
        engine = CompactionEngine(project_root)
        engine.register_strategy(SmartCompactionStrategy(inactivity_hours=48))
        adapter.set_compaction_engine(engine)


# ==================== Main ====================

if __name__ == "__main__":
    # Example usage
    adapter = MemoryPluginAdapter(project_root=Path("/my/project"))

    register_plugin(adapter, {"log_file": "/tmp/memory_events.log"})

    print("Registered hooks:")
    for event, hooks in adapter.list_registered_hooks().items():
        print(f"  {event}: {hooks}")
```

---

## Hook Events Reference

| Event                | Context Metadata                      | Use Case                |
| -------------------- | ------------------------------------- | ----------------------- |
| `on_session_start`   | `session_id`, `project_root`          | Load memory, initialize |
| `on_context_warning` | `context_size`, `limit`, `percentage` | Trigger compaction      |
| `on_session_end`     | `session_id`, `messages`              | Save snapshot           |
| `on_user_request`    | `request`, `user_id`                  | Handle remember/query   |

---

## Best Practices

### 1. Error Handling

Always use try/except in hook implementations:

```python
async def _execute_impl(self, context: PluginContext) -> dict:
    try:
        # Risky operation
        result = await risky_operation()
        return {"success": True, "data": result}
    except Exception as e:
        logger.error(f"Hook failed: {e}")
        return {"success": False, "error": str(e)}
```

### 2. Early Returns

Skip processing when not relevant:

```python
async def _execute_impl(self, context: PluginContext) -> dict:
    # Skip if no project
    if not context.project_root:
        return {"skipped": True, "reason": "no_project"}

    # Continue with logic...
```

### 3. Logging

Use structured logging:

```python
logger.info(f"MyHook: Action completed for {context.session_id}")
logger.debug(f"Details: {context.metadata}")
```

### 4. Configuration

Make hooks configurable:

```python
class MyHook(MemoryPluginHook):
    def __init__(self, option: str = "default"):
        self.option = option
```

### 5. Testing

Test hooks independently:

```python
import pytest

@pytest.fixture
def mock_context():
    return PluginContext(
        session_id="test-session",
        project_root=Path("/tmp/test"),
        user_id="test",
        timestamp="2026-02-17T10:00:00",
    )

@pytest.mark.asyncio
async def test_my_hook(mock_context):
    hook = MyHook(option="test")
    result = await hook.execute(mock_context)

    assert result.success is True
    assert "data" in result.data
```

---

## Registering Plugins

### Via Code

```python
from memory.plugin_adapter import MemoryPluginAdapter

adapter = MemoryPluginAdapter(project_root=Path("/my/project"))

# Import and register your plugin
from my_plugin import register_plugin

register_plugin(adapter, {"option": "value"})

# Or manual
adapter.register_hook(MyHook())
```

### Via Configuration

Some deployment methods support JSON config:

```json
{
  "memory": {
    "plugins": [
      {
        "module": "my_plugin",
        "config": {
          "option": "value"
        }
      }
    ]
  }
}
```

---

## Debugging Hooks

### List Registered Hooks

```python
hooks = adapter.list_registered_hooks()
for event, hook_names in hooks.items():
    print(f"{event}: {hook_names}")
```

### Trigger Manually

```python
# Trigger specific event
results = await adapter.trigger(
    HookEvent.ON_SESSION_START,
    PluginContext(
        session_id="manual-test",
        project_root=Path("/my/project"),
        user_id="debug",
        timestamp="2026-02-17T10:00:00",
    )
)

for result in results:
    print(f"Hook: {result.message}")
    print(f"Success: {result.success}")
```

### Enable Debug Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)

# Now hooks will log at DEBUG level
```

---

## Examples

See `src/skill/opencode-mastery/scripts/memory/mechanisms/` for built-in examples:

- `bootstrap.py` - Bootstrap mechanism
- `compaction_mechanism.py` - Compaction on warning
- `snapshot.py` - Session snapshots
- `user_request.py` - Remember/query handling
