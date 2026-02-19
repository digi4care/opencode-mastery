# Project Conventions

This document contains all project-specific conventions for opencode-mastery.

## Package Managers

| Language              | Tool                   | Reason                    |
| --------------------- | ---------------------- | ------------------------- |
| JavaScript/TypeScript | **Bun** (not pnpm/npm) | Faster, native TypeScript |
| Python                | **uv**                 | Modern package manager    |

```bash
# JavaScript/TypeScript
bun install
bun run <script>

# Python
uv sync
uv run <script.py>
```

## Directory Structure

```
opencode-mastery/
├── docs/                    # Structured documentation
│   ├── project/             # Project-specific
│   ├── opencode/            # OpenCode guides
│   └── ace/                 # ACE framework
├── scripts/                 # Cross-platform scripts
│   ├── deploy.ts            # Installatie (Windows/Mac/Linux)
│   └── undeploy.ts          # Verwijderen
├── src/
│   └── skill/               # OpenCode skills
│       ├── opencode-mastery/
│       │   ├── SKILL.md
│       │   ├── references/  # Custom .mdx docs
│       │   ├── scripts/     # Python utilities
│       │   └── examples/    # Examples
│       └── meta-agent/
│           └── SKILL.md
├── .opencode/
│   ├── commands/            # Custom commands
│   └── skill/               # Project skills (symlink)
├── ai_docs/                 # AI documentation cache
└── package.json             # npm scripts
```

## Python Scripts Conventions

```python
# Type hints required (| syntax for unions)
def load_docs(query: str, verbose: bool = False) -> dict[str, Any]:
    ...

# Paths via Path.home() for global, relative for project
from pathlib import Path
GLOBAL_DOCS = Path.home() / ".ai_docs" / "opencode" / "docs"
PROJECT_DOCS = Path(".ai_docs") / "opencode" / "docs"

# Cache duration: 7 days (TTL)
CACHE_TTL_DAYS = 7
```

## GitHub CLI

- **Required** for downloading OpenCode documentation
- **Authentication required**: `gh auth login`
- Used via subprocess calls in `download-docs.py`

## SKILL.md Format

```yaml
---
name: skill-name
description: Keyword-rich description for semantic matching
license: MIT
compatibility: opencode
metadata:
  author: username
  version: x.y.z
  refresh: weekly|daily|never
  paths:
    docs: ~/.ai_docs/opencode/docs
    memory: ~/.ai_docs/opencode/memory
    scripts: ~/.ai_docs/opencode/scripts
---
```

## Install Flow

| Step | Command                 | Result                                                         |
| ---- | ----------------------- | -------------------------------------------------------------- |
| 1    | `bun run deploy`        | Installs deps, copies to `~/.config/opencode/`, builds plugins |
| 2    | `uv sync`               | Installs Python dependencies                                   |
| 3    | `bun run download-docs` | Fetches docs from GitHub                                       |
| 4    | `bun run build-index`   | Builds fuzzy search index                                      |

**Cross-platform:** Works on Windows, macOS, and Linux (TypeScript scripts via Bun).

## npm Scripts

```bash
bun run deploy           # Install skills + plugins (cross-platform)
bun run undeploy         # Remove installed files
bun run download-docs    # Download docs from GitHub
bun run load-docs        # Lazy doc loader
bun run build-index      # Build fuzzy search index
bun run test             # Run tests
```

## Documentation Locations

| Type          | Global                                                  | Project                                  |
| ------------- | ------------------------------------------------------- | ---------------------------------------- |
| Official docs | `~/.ai_docs/opencode/docs/`                             | `.ai_docs/opencode/docs/`                |
| Custom refs   | `~/.config/opencode/skill/opencode-mastery/references/` | `src/skill/opencode-mastery/references/` |
| Memory        | `~/.ai_docs/opencode/memory/`                           | `.ai_docs/opencode/memory/`              |
| Scripts       | `~/.ai_docs/opencode/scripts/`                          | `src/skill/opencode-mastery/scripts/`    |
