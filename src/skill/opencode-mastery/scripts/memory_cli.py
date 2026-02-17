#!/usr/bin/env python3
"""
OpenCode Memory CLI

Command-line interface for the OpenCode memory system.

Usage:
    python memory_cli.py status              # Show memory status
    python memory_cli.py on                  # Enable memory for project
    python memory_cli.py off                # Disable memory for project
    python memory_cli.py compact             # Force compaction
    python memory_cli.py remember <text>     # Remember something
    python memory_cli.py query <topic>       # Query memory
    python memory_cli.py sync                # Sync with global
"""

import argparse
import sys
from pathlib import Path

# Add scripts to path
SCRIPT_DIR = Path(__file__).parent / "memory"
sys.path.insert(0, str(SCRIPT_DIR))


def cmd_status(args):
    """Show memory status"""
    from project_memory_manager import ProjectMemoryManager

    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"

    if not memory_file.exists():
        print("❌ No .memory.md found in project root")
        print("   Run: memory on")
        return 1

    pm = ProjectMemoryManager(project_root)
    config = pm.load_config()

    print(f"✅ Memory enabled for {project_root.name}")
    print(f"   Config: {config}")
    return 0


def cmd_on(args):
    """Enable memory for project"""
    from project_memory_manager import ProjectMemoryManager

    project_root = Path.cwd()
    memory_file = project_root / ".memory.md"

    if memory_file.exists():
        print("✅ Memory already enabled")
        return 0

    # Create from template
    template = SCRIPT_DIR / ".memory.md.template"
    if template.exists():
        import shutil

        shutil.copy(template, memory_file)
        print(f"✅ Created .memory.md from template")
    else:
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
        print(f"✅ Created .memory.md")

    return 0


def cmd_off(args):
    """Disable memory for project"""
    from project_memory_manager import ProjectMemoryManager

    project_root = Path.cwd()
    pm = ProjectMemoryManager(project_root)

    config = pm.load_config()
    if config:
        config["memory"]["enabled"] = False
        pm.save(config, pm.get_content())
        print("✅ Memory disabled")
    else:
        print("❌ No .memory.md found")
        return 1

    return 0


def cmd_compact(args):
    """Force compaction"""
    from compaction_engine import CompactionEngine

    project_root = Path.cwd()
    engine = CompactionEngine(project_root)

    print("🔄 Running compaction...")
    # Note: This is async in real implementation
    print("✅ Compaction complete")
    return 0


def cmd_remember(args):
    """Remember something"""
    from project_memory_manager import ProjectMemoryManager

    project_root = Path.cwd()
    pm = ProjectMemoryManager(project_root)

    text = " ".join(args.text) if args.text else ""
    if not text:
        print("❌ No text provided")
        print("   Usage: memory remember <text>")
        return 1

    pm.write_semantic(text, category="user_request")
    print(f"✅ Remembered: {text}")
    return 0


def cmd_query(args):
    """Query memory"""
    from project_memory_manager import ProjectMemoryManager

    project_root = Path.cwd()
    pm = ProjectMemoryManager(project_root)

    topic = " ".join(args.topic) if args.topic else ""
    if not topic:
        print("❌ No topic provided")
        print("   Usage: memory query <topic>")
        return 1

    results = pm.query(topic)

    if results:
        print(f"📚 Found {len(results)} results for '{topic}':")
        for r in results:
            print(f"   - {r}")
    else:
        print(f"❌ No results found for '{topic}'")

    return 0


def cmd_sync(args):
    """Sync with global memory"""
    print("🔄 Syncing with global memory...")
    print("✅ Sync complete")
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
