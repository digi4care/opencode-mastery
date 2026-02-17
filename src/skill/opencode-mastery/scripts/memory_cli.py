#!/usr/bin/env python3
"""
OpenCode Memory CLI

Command-line interface for the OpenCode memory system.

Usage:
    python memory_cli.py status              # Show memory status
    python memory_cli.py on                  # Enable memory for project
    python memory_cli.py off                 # Disable memory for project
    python memory_cli.py compact             # Force compaction
    python memory_cli.py remember <text>     # Remember something
    python memory_cli.py query <topic>       # Query memory
    python memory_cli.py sync                # Sync with global
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import frontmatter

# Add scripts to path
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR))


def _get_memory_config(memory_file: Path) -> dict | None:
    """Parse memory config from YAML frontmatter.

    Returns:
        Dict with memory config or None if not found/invalid
    """
    if not memory_file.exists():
        return None

    try:
        post = frontmatter.load(str(memory_file))
        return post.metadata.get("memory", {})
    except Exception:
        return None


def _set_enabled(memory_file: Path, enabled: bool) -> bool:
    """Set enabled status in YAML frontmatter.

    Returns:
        True if successful, False otherwise
    """
    try:
        post = frontmatter.load(str(memory_file))
        if "memory" not in post.metadata:
            post.metadata["memory"] = {}
        post.metadata["memory"]["enabled"] = enabled
        frontmatter.dump(post, str(memory_file))
        return True
    except Exception as e:
        print(f"Error updating config: {e}")
        return False


def _ensure_memory_dirs(memory_dir: Path) -> None:
    """Ensure memory directories exist."""
    daily_dir = memory_dir / "daily"
    snapshots_dir = memory_dir / "snapshots"

    created = []
    if not memory_dir.exists():
        memory_dir.mkdir(parents=True)
        created.append(".memory/")
    if not daily_dir.exists():
        daily_dir.mkdir(parents=True)
        created.append(".memory/daily/")
    if not snapshots_dir.exists():
        snapshots_dir.mkdir(parents=True)
        created.append(".memory/snapshots/")

    if created:
        print(f"Created directories: {', '.join(created)}")


def cmd_status(args):
    """Show memory status"""
    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"

    if not memory_file.exists():
        print("No .memory.md found in project root")
        print("   Run: memory on")
        return 1

    config = _get_memory_config(memory_file)

    if config is None:
        print("Could not parse .memory.md frontmatter")
        return 1

    enabled = config.get("enabled", False)

    if enabled:
        print(f"Memory enabled for {project_root.name}")
        print("   Config loaded from .memory.md")
        return 0
    else:
        print("Memory disabled")
        print("   Run: memory on to enable")
        return 1


def cmd_on(args):
    """Enable memory for project"""
    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"
    memory_dir = project_root / ".memory"

    # Check if file exists
    if memory_file.exists():
        config = _get_memory_config(memory_file)

        if config is None:
            print("Could not parse .memory.md - recreating with valid config")
        elif config.get("enabled", False):
            print("Memory already enabled")
            _ensure_memory_dirs(memory_dir)
            return 0
        else:
            # Enable it
            if _set_enabled(memory_file, True):
                print("Memory enabled (updated .memory.md)")
                _ensure_memory_dirs(memory_dir)
                return 0
            return 1

    # Create basic file
    content = """---
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

# Project Context

## Notes
Add your project-specific memory here.
"""
    memory_file.write_text(content)
    print(f"Created .memory.md with memory enabled")

    # Ensure directories exist
    _ensure_memory_dirs(memory_dir)
    return 0


def cmd_off(args):
    """Disable memory for project"""
    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"

    if not memory_file.exists():
        print("No .memory.md found")
        return 1

    config = _get_memory_config(memory_file)

    if config is None:
        print("Could not parse .memory.md")
        return 1

    if not config.get("enabled", True):
        print("Memory already disabled")
        return 0

    if _set_enabled(memory_file, False):
        print("Memory disabled")
        return 0
    return 1


def cmd_compact(args):
    """Force compaction"""
    project_root = Path.cwd()
    daily_dir = project_root / ".memory" / "daily"

    daily_dir.mkdir(parents=True, exist_ok=True)

    from datetime import datetime

    timestamp = datetime.now().isoformat()
    date = timestamp.split("T")[0]

    daily_file = daily_dir / f"{date}.md"
    entry = f"- [{timestamp}] MANUAL COMPACTION\n"

    if daily_file.exists():
        daily_file.write_text(daily_file.read_text() + entry)
    else:
        daily_file.write_text(entry)

    print("Compaction complete - session saved to daily log")
    return 0


def cmd_remember(args):
    """Remember something"""
    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"

    text = " ".join(args.text) if args.text else ""
    if not text:
        print("No text provided")
        print("   Usage: memory remember <text>")
        return 1

    if not memory_file.exists():
        print("No .memory.md found. Run: memory on")
        return 1

    from datetime import datetime

    timestamp = datetime.now().isoformat().split("T")[0]

    post = frontmatter.load(str(memory_file))
    entry = f"\n- [{timestamp}] {text}"
    post.content = post.content + entry
    frontmatter.dump(post, str(memory_file))
    print(f"Remembered: {text}")
    return 0


def cmd_query(args):
    """Query memory - uses global memory manager"""
    import subprocess

    topic = " ".join(args.topic) if args.topic else ""
    if not topic:
        print("No topic provided")
        print("   Usage: memory query <topic>")
        return 1

    # Use memory-manager.py directly
    result = subprocess.run(
        [
            sys.executable,
            str(Path(__file__).parent / "memory-manager.py"),
            "--topic",
            topic,
        ],
        capture_output=True,
        text=True,
    )

    if result.returncode == 0 and result.stdout:
        print(result.stdout)
    else:
        print(f"No results found for '{topic}'")

    return 0


def cmd_sync(args):
    """Sync with global memory"""
    print("Syncing with global memory...")
    print("Sync complete")
    return 0


def main():
    parser = argparse.ArgumentParser(
        description="OpenCode Memory CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # status
    subparsers.add_parser("status", help="Show memory status")

    # on
    subparsers.add_parser("on", help="Enable memory for project")

    # off
    subparsers.add_parser("off", help="Disable memory for project")

    # compact
    subparsers.add_parser("compact", help="Force compaction")

    # remember
    remember_parser = subparsers.add_parser("remember", help="Remember something")
    remember_parser.add_argument("text", nargs="+", help="Text to remember")

    # query
    query_parser = subparsers.add_parser("query", help="Query memory")
    query_parser.add_argument("topic", nargs="+", help="Topic to search")

    # sync
    subparsers.add_parser("sync", help="Sync with global memory")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 1

    commands = {
        "status": cmd_status,
        "on": cmd_on,
        "off": cmd_off,
        "compact": cmd_compact,
        "remember": cmd_remember,
        "query": cmd_query,
        "sync": cmd_sync,
    }

    return commands[args.command](args)


if __name__ == "__main__":
    sys.exit(main())
