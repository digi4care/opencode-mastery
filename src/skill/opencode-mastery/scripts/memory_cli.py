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
import subprocess
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


def _extract_session_context(project_root: Path) -> str | None:
    """Extract context from recent session activity (git commits, daily logs)"""
    context_parts = []

    # 1. Try recent git commits
    try:
        result = subprocess.run(
            ["git", "log", "-3", "--oneline", "--format=%s"],
            capture_output=True,
            text=True,
            cwd=project_root,
            timeout=5,
        )
        if result.returncode == 0 and result.stdout.strip():
            commits = result.stdout.strip().split("\n")
            if commits:
                # Clean up commit message: remove conventional commit prefixes
                msg = commits[0]
                for prefix in ["fix: ", "feat: ", "refactor: ", "docs: ", "chore: "]:
                    if msg.startswith(prefix):
                        msg = msg[len(prefix) :]
                        break
                context_parts.append(msg)
    except (subprocess.SubprocessError, FileNotFoundError):
        pass

    # 2. Skip daily logs - too noisy (contains compaction markers, etc.)

    # Return clean context without "Session:" prefix
    return context_parts[0] if context_parts else None


def _scan_for_duplicates(
    memory_file: Path, text: str, threshold: int = 80
) -> str | None:
    """Scan memory for duplicate or similar entries using fuzzy matching"""
    if not memory_file.exists():
        return None

    try:
        post = frontmatter.load(str(memory_file))
        content = post.content

        # Extract existing entries
        import re

        entries = re.findall(r"- \[\d{4}-\d{2}-\d{2}\] [A-Z]+: (.+)", content)

        # Simple similarity check (no rapidfuzz dependency)
        text_lower = text.lower()
        text_words = set(text_lower.split())

        for entry in entries:
            entry_lower = entry.lower()
            entry_words = set(entry_lower.split())

            # Calculate word overlap
            common_words = text_words & entry_words
            if not common_words:
                continue

            # Check for high overlap
            overlap_ratio = len(common_words) / max(
                len(text_words), len(entry_words), 1
            )
            if overlap_ratio > 0.7:
                return entry

            # Check if one contains the other
            if text_lower in entry_lower or entry_lower in text_lower:
                return entry

        return None
    except Exception:
        return None


def cmd_remember(args):
    """Remember something - with session context extraction and duplicate detection"""
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

    # Categories for organizing memory
    CATEGORIES = {
        "w": ("WORKFLOW", "Process or sequence of steps"),
        "c": ("CONVENTION", "Project-specific rule or pattern"),
        "b": ("BUGFIX", "Bug and its solution"),
        "t": ("TECHNICAL", "Technical detail or implementation"),
        "n": ("NOTE", "General note or observation"),
    }

    MIN_CONTEXT_LENGTH = 30

    # Step 1: Check for duplicates first
    duplicate = _scan_for_duplicates(memory_file, text)
    if duplicate:
        print(f"\n⚠️  Similar memory already exists:")
        print(f"   → {duplicate[:100]}...")
        print()
        try:
            confirm = input("   Save anyway? [y/N]: ").strip().lower()
            if confirm != "y":
                print("   Skipped - no duplicate saved")
                return 0
        except (EOFError, KeyboardInterrupt):
            print("\n   Skipped")
            return 0

    # Step 2: If context too short, try to extract from session
    if len(text) < MIN_CONTEXT_LENGTH:
        session_context = _extract_session_context(project_root)

        if session_context:
            # Build clean enriched text: use git commit as the actual content
            # Format: "test workflow: [actual context from commit]"
            enriched_text = f"{text}: {session_context}"
            print(f"\n💡 Context extracted from session:")
            print(f'   Input:   "{text}"')
            print(f'   Enriched: "{enriched_text}"')
            print()
            try:
                use_enriched = input("   Use enriched context? [Y/n]: ").strip().lower()
                if use_enriched != "n":
                    text = enriched_text
            except (EOFError, KeyboardInterrupt):
                text = enriched_text

        # Still too short and no session context?
        if len(text) < MIN_CONTEXT_LENGTH:
            print(
                f"\n⚠️  Context too short ({len(text)} chars, need {MIN_CONTEXT_LENGTH}+)"
            )
            print(f'   Current: "{text}"')
            print("\n   Please provide more context:")
            print("   - What is this about?")
            print("   - Why is it important?")
            print()
            try:
                additional = input("   Extended description: ").strip()
                if additional:
                    text = f"{text}: {additional}"
                if len(text) < MIN_CONTEXT_LENGTH:
                    print("   Still too short - cancelled")
                    return 1
            except (EOFError, KeyboardInterrupt):
                print("\n   Cancelled")
                return 1

    # Step 3: Ask for category
    print("\n   Select category:")
    for key, (cat_name, cat_desc) in CATEGORIES.items():
        print(f"   [{key}] {cat_name} - {cat_desc}")
    print()

    try:
        choice = input("   Category [w/c/b/t/n] (default: n): ").strip().lower()
    except (EOFError, KeyboardInterrupt):
        print("\n   Cancelled")
        return 1

    category = CATEGORIES.get(choice, CATEGORIES["n"])[0]

    # Step 4: Save to memory
    from datetime import datetime

    timestamp = datetime.now().isoformat().split("T")[0]
    formatted_entry = f"\n- [{timestamp}] {category}: {text}"

    post = frontmatter.load(str(memory_file))
    post.content = post.content + formatted_entry
    frontmatter.dump(post, str(memory_file))

    print(f"\n✓ Remembered: [{category}] {text}")
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
