# AGENTS.md - Project Index

**Project:** opencode-mastery  
**Versie:** 1.4.0  
**Laatste update:** 2026-02-17

## Overzicht

OpenCode documentation skill met lazy-loaded docs, fuzzy search, GitHub research, en session memory. Inclusief ACE (Agentic Context Engineering) framework.

## Build/Test Commands

```bash
# Installatie
./install.sh                           # Globaal installeren
uv sync                                # Python dependencies

# Testing (pytest)
bun run test                           # Run alle tests
uv run pytest                          # Run alle tests (direct)
uv run pytest path/to/test_file.py     # Specifieke test file
uv run pytest test_file.py::TestClass  # Specifieke test class
uv run pytest test_file.py::TestClass::test_method  # Enkele test
uv run pytest -k "keyword"             # Tests matching keyword
uv run pytest -v                       # Verbose output
uv run pytest --tb=short               # Korte traceback

# Documentatie
bun run download-docs                  # Docs van GitHub halen
bun run load-docs -- --query "topic"   # Docs zoeken
bun run build-index                    # Search index rebuild
```

## Package Managers

| Taal                  | Tool    | Opmerking                |
| --------------------- | ------- | ------------------------ |
| JavaScript/TypeScript | **Bun** | NOOIT pnpm/npm gebruiken |
| Python                | **uv**  |                          |

```bash
bun install          # JS dependencies
bun run <script>     # Run npm script
uv sync              # Python dependencies
uv run <script.py>   # Run Python script
```

## Code Style

### Python

```python
#!/usr/bin/env python3
"""Module docstring - beschrijft het doel van de module."""

from __future__ import annotations
from pathlib import Path
from typing import Any

# Type hints met union syntax (Python 3.10+)
def load_docs(query: str, verbose: bool = False) -> dict[str, Any] | None:
    """Korte beschrijving van de functie.

    Args:
        query: De zoekopdracht
        verbose: Toon extra output

    Returns:
        Dict met resultaten of None bij fout
    """
    if not query:
        return None
    return {"result": query}


# Paden via pathlib (NOOIT hardcoded!)
GLOBAL_DOCS = Path.home() / ".ai_docs" / "opencode" / "docs"
PROJECT_DOCS = Path(".") / "ai_docs" / "opencode" / "docs"

# Cache TTL: 7 dagen
CACHE_TTL_DAYS = 7
```

### TypeScript

```typescript
/**
 * Tool description - what it does and when to use it.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const myTool = tool(
  z.object({
    input: z.string().min(1).describe("Description of input"),
    option: z.boolean().default(false).describe("Description of option"),
  }),
  async (args) => {
    return {
      success: true,
      data: { result: args.input },
      metadata: { length: args.input.length },
    };
  },
).describe("Brief tool description");
```

### Imports Volgorde

```python
# 1. Standard library
import json
import sys
from pathlib import Path
from typing import Any, NoReturn

# 2. Third-party
import pytest
from rapidfuzz import fuzz

# 3. Local modules
from mymodule import myfunction
```

## Testing Conventies

### Test Structuur (AAA Pattern)

```python
class TestMyFeature:
    """Tests for MyFeature."""

    @pytest.fixture
    def sample_data(self):
        """Fixture providing test data."""
        return {"key": "value"}

    def test_positive_case(self, sample_data):
        # Arrange
        expected = "value"

        # Act
        result = sample_data["key"]

        # Assert
        assert result == expected

    def test_negative_case(self):
        # Test error handling
        with pytest.raises(ValueError):
            raise ValueError("expected error")

    def test_with_mock(self):
        # Mock external dependencies
        with patch.object(Path, "exists", return_value=True):
            result = my_function()
        assert result is not None
```

### Test Locatie

- Test files: `src/skill/*/scripts/test-*.py`
- Naming: `test_<feature>.py`
- Classes: `Test<Feature>`
- Methods: `test_<scenario>`

## Anti-Patterns (NOOIT doen)

| Anti-Pattern                 | Correct Pattern              |
| ---------------------------- | ---------------------------- |
| `skills/` (plural directory) | `skill/` (singular)          |
| Hardcoded paths              | `Path.home()` / relative     |
| Skip cache TTL check         | 7-day TTL validation         |
| pnpm/npm gebruiken           | Alleen Bun                   |
| Unvalidated tool inputs      | Zod schema + path validation |
| Raw shell commands           | Sanitize alle inputs         |
| Scripts niet in package.json | Add to scripts section       |

## CRITICAL Rules

### Directory Naming

> **ALWAYS use `skill/` (singular), NEVER `skills/` (plural)**

Dit is systeem-specifiek. Foutieve directory naam = skill wordt niet geladen.

### Error Handling

```bash
# Shell scripts
#!/bin/bash
set -euo pipefail
trap 'echo "Error on line $LINENO"' ERR
```

```python
# Python scripts
try:
    result = risky_operation()
except SpecificError as e:
    print(f"Error: {e}")
    sys.exit(1)
```

## Quick Links

| Wat                    | Waar                                                           |
| ---------------------- | -------------------------------------------------------------- |
| **Project Conventies** | [docs/project/conventions.md](docs/project/conventions.md)     |
| **Anti-Patterns**      | [docs/project/anti-patterns.md](docs/project/anti-patterns.md) |
| **Plugins Guide**      | [docs/opencode/plugins.md](docs/opencode/plugins.md)           |
| **Tools Guide**        | [docs/opencode/tools.md](docs/opencode/tools.md)               |
| **ACE Framework**      | [docs/ace/framework.md](docs/ace/framework.md)                 |

## Structuur

```
opencode-mastery/
├── src/skill/                 # Skills (NIET skillsS!)
│   ├── meta-agent/            # Genereert commands/skills/plugins
│   ├── opencode-mastery/      # Hoofd skill
│   ├── opencode-memory/       # Memory skill
│   └── skill-creator/         # Skill maker
└── .opencode/                 # OpenCode config
    ├── commands/              # Custom commands
    └── plugin/                # Local plugins
```

## Custom Commands

| Command        | Doel                                              |
| -------------- | ------------------------------------------------- |
| `/ace-reflect` | Analyseer sessies en genereer verbeter suggesties |
| `/memory`      | Memory management (status, on, off, compact)      |
| `/remember`    | Onthoud informatie voor toekomstige sessies       |

## Memory CLI

```bash
uv run ~/.ai_docs/opencode/scripts/memory_cli.py status
uv run ~/.ai_docs/opencode/scripts/memory_cli.py compact
uv run ~/.ai_docs/opencode/scripts/memory_cli.py remember <text>
```
