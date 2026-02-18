# Coding Conventions

**Analysis Date:** 2026-02-18

## Naming Patterns

**Files:**

- Python: `snake_case.py` (e.g., `load_docs.py`, `index_builder.py`, `memory_cli.py`)
- TypeScript: `kebab-case.ts` (e.g., `skill-creator.ts`, `memory-tool.ts`)
- Test files: `test-*.py` (e.g., `test-load-docs.py`, `test_tool_examples.py`)

**Functions:**

- Python: `snake_case` with descriptive verbs (e.g., `load_official_index`, `fuzzy_search_custom`, `combine_and_rank_results`)
- TypeScript: `camelCase` (e.g., `buildSkillMarkdown`, `collectQualityMetrics`, `ensureWithinRoot`)

**Variables:**

- Python: `snake_case` (e.g., `query_lower`, `best_score`, `combined_results`)
- TypeScript: `camelCase` (e.g., `skillDir`, `dryRun`, `qualityGate`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `CACHE_DAYS`, `DEFAULT_THRESHOLD`, `SCRIPT_DIR`)

**Types:**

- Python: Type hints use union syntax (Python 3.10+): `dict | None`, `list[dict]`, `str | None`
- TypeScript: Interfaces with PascalCase (e.g., `MemoryConfig`, `MemoryEntry`, `QualityMetrics`)

## Code Style

**Formatting:**

- No explicit formatter config detected (relies on editor defaults)
- Indentation: 2 spaces for Python (observable in files)
- Line length: Reasonable (~100 chars), no strict enforcement

**Linting:**

- Python: No explicit linter config (pyproject.toml has no tool config)
- Recommended: ruff or flake8 for future

## Import Organization

**Python Order:**

```python
# 1. Standard library
from __future__ import annotations
import argparse
import json
import sys
from pathlib import Path
from typing import NoReturn

# 2. Third-party
import pytest
from rapidfuzz import fuzz, process
import frontmatter

# 3. Local modules (with path manipulation if needed)
SCRIPT_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPT_DIR))
```

**TypeScript Order:**

```typescript
// 1. Node built-ins
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// 2. Third-party
import { z } from "zod";
import { tool } from "@opencode-ai/plugin";

// 3. Local imports (relative)
import { normalizeTextTool } from "./tools/normalize-text";
```

**Path Aliases:**

- Not used; all imports are relative paths

## Error Handling

**Python Patterns:**

```python
# Specific exception handling with user-friendly messages
try:
    result = risky_operation()
except json.JSONDecodeError as e:
    print(f"❌ Error parsing registry: {e}")
    return None
except KeyboardInterrupt:
    print("\n\n⚠️  Search interrupted")
    sys.exit(130)
except Exception as e:
    print(f"\n❌ Error: {e}")
    sys.exit(1)

# Early returns for validation
def load_official_index() -> dict | None:
    if OFFICIAL_INDEX_FILE.exists():
        return json.loads(OFFICIAL_INDEX_FILE.read_text())
    return None
```

**TypeScript Patterns:**

```typescript
// Try-catch with result objects
try {
  const parsed = createSchema.parse(args);
  // ... process
  return JSON.stringify({ success: true, data: result }, null, 2);
} catch (error) {
  return JSON.stringify(
    { success: false, error: (error as Error).message },
    null,
    2,
  );
}

// Null returns for missing data
async function loadMemoryFile(
  projectRoot: string,
): Promise<{ config: MemoryConfig | null; content: string }> {
  try {
    const content = await readFile(memoryPath, "utf-8");
    return { config: parseFrontmatter(content), content };
  } catch {
    return { config: null, content: "" };
  }
}
```

## Logging

**Framework:** Console output with emoji indicators

**Patterns:**

```python
# Success indicators
print(f"✅ Success: {success_count} files")
print(f"✓ Remembered: [{category}] {text}")

# Warning indicators
print(f"⚠️  Registry file not found: {registry_path}")
print(f"⚠️  Search interrupted")

# Error indicators
print(f"❌ Error: {e}")
print(f"❌ No results found for: '{query}'")

# Info indicators
print(f"🔍 Building search index from: {docs_path}")
print(f"📥 Downloading OpenCode docs to: {docs_path}")
print(f"📍 Saved to: {INDEX_FILE}")
```

## Comments

**When to Comment:**

- Module-level docstrings explaining purpose and usage
- Function docstrings for public APIs
- Inline comments for non-obvious logic

**Docstrings (Python):**

```python
#!/usr/bin/env python3
"""
Lazy loader for OpenCode documentation.
Searches both official docs and custom references using keyword matching.

Usage:
    python load-docs.py --query "keyword" [--verbose]
"""

def load_official_index() -> dict | None:
    """Load the official docs search index from disk."""
    ...

def _get_memory_config(memory_file: Path) -> dict | None:
    """Parse memory config from YAML frontmatter.

    Returns:
        Dict with memory config or None if not found/invalid
    """
    ...
```

**JSDoc (TypeScript):**

```typescript
/**
 * Memory Tool - AI callable memory operations
 *
 * Provides tools for reading, writing, and searching memory
 */

/**
 * Load .memory.md from project root
 */
async function loadMemoryFile(projectRoot: string): Promise<{ config: MemoryConfig | null; content: string }> {
    ...
}
```

## Function Design

**Size:** Functions typically 5-30 lines; complex functions broken into helpers

**Parameters:**

- Use typed parameters with defaults where sensible
- Prefer keyword arguments / options objects for many parameters

```python
def fuzzy_search_official(
    query: str,
    index: dict | None,
    threshold: int = DEFAULT_THRESHOLD
) -> list[dict]:
    ...

def build_index(
    docs_path: Path,
    index_path: Path,
    rebuild: bool = False,
    include_custom: bool = True,
    verbose: bool = False,
):
    ...
```

**Return Values:**

- Python: Use union types for nullable returns (`dict | None`, `str | None`)
- TypeScript: Use consistent result shapes (`{ success: boolean, data?: T, error?: string }`)

```python
# Consistent return patterns
def load_official_index() -> dict | None: ...
def load_custom_registry() -> dict | None: ...
def fuzzy_search_official(...) -> list[dict]: ...
```

## Module Design

**Exports:**

- Python: No explicit `__all__`, export by definition
- TypeScript: Named exports preferred

**Barrel Files:**

- TypeScript uses barrel exports for toolsets:

```typescript
// src/skill/opencode-mastery/examples/tools/advanced/index.ts
export { normalizeTextTool, parseJsonTool, textStatsTool, timestampTool };
export const toolset = [
  normalizeTextTool,
  textStatsTool,
  parseJsonTool,
  timestampTool,
];
```

## CLI Design

**Pattern:**

```python
def main():
    parser = argparse.ArgumentParser(description="...")
    parser.add_argument("--verbose", "-v", action="store_true", help="...")
    args = parser.parse_args()

    # Process arguments
    ...

    return 0  # Success
    # or sys.exit(1) for errors

if __name__ == "__main__":
    sys.exit(main())
```

**Exit Codes:**

- `0`: Success
- `1`: Error (with message)
- `130`: Keyboard interrupt (Ctrl+C)

## Path Handling

**Always use pathlib:**

```python
# Home directory paths
OFFICIAL_DOCS_PATH = Path.home() / ".ai_docs" / "opencode" / "docs"
MEMORY_PATH = Path.home() / ".ai_docs" / "opencode" / "memory"

# Script-relative paths
SCRIPT_DIR = Path(__file__).parent
SKILL_DIR = SCRIPT_DIR.parent
REFERENCES_DIR = SKILL_DIR / "references"

# NEVER use hardcoded absolute paths or os.path.join
```

---

_Convention analysis: 2026-02-18_
