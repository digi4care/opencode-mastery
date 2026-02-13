#!/usr/bin/env python3
"""
ACE Reflector - Analyze OpenCode sessions and generate prompt improvement suggestions.

Part of the ACE (Agentic Context Engineering) framework for self-improving prompts.

Usage:
    uv run ace-reflector.py [options]
    python ace-reflector.py --scope all
    python ace-reflector.py --scope skill:opencode-mastery
    python ace-reflector.py --scope agent:CoderAgent --sessions 5
    python ace-reflector.py --output suggestions.md
"""

import argparse
import json
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any


# Paths
OPENCODE_STORAGE = Path.home() / ".local" / "share" / "opencode"
GLOBAL_SKILLS_DIR = Path.home() / ".config" / "opencode" / "skill"
PROJECT_SKILLS_DIR = Path.cwd() / ".opencode" / "skills"


def find_project_slug() -> str | None:
    """Find the current project's slug in OpenCode storage."""
    # Try to match current directory to project storage
    cwd = Path.cwd()
    for project_dir in OPENCODE_STORAGE.glob("project/*"):
        if project_dir.is_dir():
            return project_dir.name
    return None


def get_session_files(project_slug: str | None = None, limit: int = 10) -> list[Path]:
    """Get recent session files from OpenCode storage."""
    if project_slug:
        storage_path = OPENCODE_STORAGE / "project" / project_slug / "storage"
    else:
        storage_path = OPENCODE_STORAGE / "global" / "storage"

    if not storage_path.exists():
        return []

    # Find all JSON files, sorted by modification time (newest first)
    session_files = sorted(
        storage_path.glob("*.json"), key=lambda p: p.stat().st_mtime, reverse=True
    )

    return session_files[:limit]


def read_session_file(filepath: Path) -> dict[str, Any] | None:
    """Read and parse a session file."""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError) as e:
        print(f"Warning: Could not read {filepath}: {e}", file=sys.stderr)
        return None


def extract_conversations(session_data: dict[str, Any]) -> list[dict[str, str]]:
    """Extract conversations from session data."""
    conversations = []

    # OpenCode stores messages in various structures
    # Try to extract the conversation turns
    if "messages" in session_data:
        for msg in session_data.get("messages", []):
            role = msg.get("role", "unknown")
            content = msg.get("content", "")
            if isinstance(content, list):
                # Handle list of content blocks
                content = " ".join(
                    block.get("text", "")
                    for block in content
                    if isinstance(block, dict) and block.get("type") == "text"
                )
            conversations.append({"role": role, "content": str(content)})

    return conversations


def analyze_problems(conversations: list[dict[str, str]]) -> list[dict[str, str]]:
    """Identify problems and friction points in conversations."""
    problems = []

    # Problem indicators (regex patterns to look for)
    problem_patterns = [
        # User corrections
        {
            "pattern": "nee",
            "type": "correction",
            "description": "User correction detected",
        },
        {
            "pattern": "niet",
            "type": "correction",
            "description": "User correction detected",
        },
        {
            "pattern": "fout",
            "type": "correction",
            "description": "User indicated error",
        },
        {
            "pattern": "wrong",
            "type": "correction",
            "description": "User indicated error",
        },
        {"pattern": "error", "type": "error", "description": "Error mentioned"},
        {"pattern": "failed", "type": "error", "description": "Failure mentioned"},
        {"pattern": "nog eens", "type": "retry", "description": "Retry requested"},
        {"pattern": "opnieuw", "type": "retry", "description": "Retry requested"},
        {"pattern": "try again", "type": "retry", "description": "Retry requested"},
        # Frustration indicators
        {"pattern": "??", "type": "confusion", "description": "Possible confusion"},
        {
            "pattern": "!!!",
            "type": "frustration",
            "description": "Possible frustration",
        },
        {"pattern": "wat bedoel", "type": "unclear", "description": "Unclear response"},
        {
            "pattern": "snap niet",
            "type": "unclear",
            "description": "User didn't understand",
        },
    ]

    for i, msg in enumerate(conversations):
        if msg["role"] == "user":
            content_lower = msg["content"].lower()
            for pattern in problem_patterns:
                if pattern["pattern"] in content_lower:
                    problems.append(
                        {
                            "index": i,
                            "type": pattern["type"],
                            "description": pattern["description"],
                            "context": msg["content"][:200] + "..."
                            if len(msg["content"]) > 200
                            else msg["content"],
                        }
                    )

    return problems


def analyze_improvements(
    conversations: list[dict[str, str]], problems: list[dict[str, str]]
) -> list[dict[str, str]]:
    """Identify potential improvements based on conversation patterns."""
    improvements = []

    # Check for verbose responses
    assistant_msgs = [m for m in conversations if m["role"] == "assistant"]
    for msg in assistant_msgs:
        if len(msg["content"]) > 2000:
            improvements.append(
                {
                    "type": "verbosity",
                    "description": "Response may be too verbose (>2000 chars)",
                    "suggestion": "Consider more concise responses for similar queries",
                }
            )
            break  # Only report once

    # Check for repeated clarifications
    clarification_count = sum(
        1 for p in problems if p["type"] in ("unclear", "confusion")
    )
    if clarification_count > 2:
        improvements.append(
            {
                "type": "clarity",
                "description": f"Multiple clarification requests ({clarification_count})",
                "suggestion": "Add clearer initial explanations or examples",
            }
        )

    # Check for corrections
    correction_count = sum(
        1 for p in problems if p["type"] in ("correction", "error", "retry")
    )
    if correction_count > 1:
        improvements.append(
            {
                "type": "accuracy",
                "description": f"Multiple corrections needed ({correction_count})",
                "suggestion": "Review prompt for accuracy-related instructions",
            }
        )

    return improvements


def generate_suggestion(
    scope: str, problems: list[dict[str, str]], improvements: list[dict[str, str]]
) -> str:
    """Generate a markdown suggestion document."""
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    md = f"""# ACE Reflection Report

**Generated:** {now}
**Scope:** {scope}

---

## Summary

| Metric | Count |
|--------|-------|
| Problems Detected | {len(problems)} |
| Improvement Opportunities | {len(improvements)} |

---

## Problems Detected

"""

    if problems:
        for i, p in enumerate(problems, 1):
            md += f"""### {i}. {p["type"].title()}: {p["description"]}

**Context:**
> {p["context"]}

"""
    else:
        md += "*No significant problems detected.*\n\n"

    md += """---

## Improvement Opportunities

"""

    if improvements:
        for i, imp in enumerate(improvements, 1):
            md += f"""### {i}. {imp["type"].title()}

**Observation:** {imp["description"]}

**Suggestion:** {imp["suggestion"]}

"""
    else:
        md += "*No improvement opportunities identified.*\n\n"

    md += """---

## Recommended Actions

"""

    # Generate specific recommendations based on findings
    recommendations = []

    if any(p["type"] == "correction" for p in problems):
        recommendations.append("- [ ] Review prompt for clarity and accuracy")

    if any(p["type"] == "unclear" for p in problems):
        recommendations.append("- [ ] Add examples to clarify expected outputs")

    if any(imp["type"] == "verbosity" for imp in improvements):
        recommendations.append("- [ ] Add instruction for concise responses")

    if any(imp["type"] == "accuracy" for imp in improvements):
        recommendations.append("- [ ] Strengthen accuracy/verification instructions")

    if not recommendations:
        recommendations.append("- [ ] No immediate actions required")

    md += "\n".join(recommendations)

    md += """

---

## Next Steps

1. Review the suggestions above
2. Decide which changes to implement
3. Update the relevant prompt file(s)
4. Run another reflection after more sessions

*This report was generated by ACE (Agentic Context Engineering).*
"""

    return md


def find_target_prompt(scope: str) -> Path | None:
    """Find the target prompt file based on scope."""
    if scope == "all":
        return None  # No specific target

    if ":" in scope:
        scope_type, scope_name = scope.split(":", 1)
    else:
        scope_type = "skill"
        scope_name = scope

    if scope_type == "skill":
        # Check project first, then global
        project_path = PROJECT_SKILLS_DIR / scope_name / "SKILL.md"
        if project_path.exists():
            return project_path

        global_path = GLOBAL_SKILLS_DIR / scope_name / "SKILL.md"
        if global_path.exists():
            return global_path

    return None


def main():
    parser = argparse.ArgumentParser(
        description="ACE Reflector - Analyze sessions and generate prompt improvement suggestions",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --scope all                    Analyze all sessions
  %(prog)s --scope skill:opencode-mastery Focus on specific skill
  %(prog)s --sessions 5                   Analyze last 5 sessions
  %(prog)s --output suggestions.md        Save to file
        """,
    )

    parser.add_argument(
        "--scope",
        default="all",
        help="Analysis scope: all, skill:name, agent:name (default: all)",
    )

    parser.add_argument(
        "--sessions",
        type=int,
        default=10,
        help="Number of recent sessions to analyze (default: 10)",
    )

    parser.add_argument("--output", "-o", help="Output file path (default: stdout)")

    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Enable verbose output"
    )

    args = parser.parse_args()

    # Find project and sessions
    project_slug = find_project_slug()
    if args.verbose:
        print(f"Project slug: {project_slug or 'not found'}", file=sys.stderr)

    session_files = get_session_files(project_slug, args.sessions)

    if not session_files:
        print("No session files found.", file=sys.stderr)
        if args.output:
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(
                    "# ACE Reflection Report\n\nNo sessions available for analysis.\n"
                )
        return 0

    if args.verbose:
        print(f"Found {len(session_files)} session files", file=sys.stderr)

    # Analyze all sessions
    all_problems = []
    all_improvements = []
    all_conversations = []

    for filepath in session_files:
        if args.verbose:
            print(f"Analyzing: {filepath.name}", file=sys.stderr)

        session_data = read_session_file(filepath)
        if not session_data:
            continue

        conversations = extract_conversations(session_data)
        all_conversations.extend(conversations)

        problems = analyze_problems(conversations)
        all_problems.extend(problems)

        improvements = analyze_improvements(conversations, problems)
        all_improvements.extend(improvements)

    # Deduplicate improvements
    seen_improvements = set()
    unique_improvements = []
    for imp in all_improvements:
        key = imp["type"]
        if key not in seen_improvements:
            seen_improvements.add(key)
            unique_improvements.append(imp)

    # Generate report
    report = generate_suggestion(args.scope, all_problems, unique_improvements)

    # Output
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"Report saved to: {args.output}", file=sys.stderr)
    else:
        print(report)

    # Show target prompt if applicable
    if args.scope != "all":
        target = find_target_prompt(args.scope)
        if target:
            print(f"\nTarget prompt file: {target}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    sys.exit(main())
