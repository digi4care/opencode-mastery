# Technology Stack

**Analysis Date:** 2026-02-18

## Languages

**Primary:**

- Python 3.10+ - Core scripts for documentation loading, fuzzy search, memory management, index building
- TypeScript 5.x - Plugin implementation, tool definitions, hook handlers

**Secondary:**

- Shell (Bash) - Installation/uninstall scripts, CLI wrappers
- MDX - Reference documentation files

## Runtime

**Environment:**

- Python 3.10+ (specified in `pyproject.toml`)
- Node.js/Bun runtime for TypeScript plugins

**Package Manager:**

- uv (Python) - Lockfile: `uv.lock` (present)
- Bun (JavaScript/TypeScript) - Lockfile: `.opencode/bun.lock` (present)

## Frameworks

**Core:**

- @opencode-ai/plugin 1.2.6 - OpenCode SDK for tools, hooks, and plugins
- Zod - Schema validation for tool inputs

**Testing:**

- pytest 7.0+ - Test runner
- pytest-asyncio 0.21+ - Async test support
- pytest-cov 4.0+ - Coverage reporting

**Build/Dev:**

- Bun - TypeScript compilation and bundling
- uv - Python dependency management

## Key Dependencies

**Critical:**

- rapidfuzz 3.0+ - Fuzzy string matching for doc search (`src/skill/opencode-mastery/scripts/load_docs.py`)
- pyyaml 6.0.3 - YAML parsing for frontmatter and config
- python-frontmatter 1.1+ - YAML frontmatter extraction from markdown

**Infrastructure:**

- @opencode-ai/plugin - Plugin API with `tool()`, hooks, and type definitions
- zod - Runtime schema validation for TypeScript tools

## Configuration

**Environment:**

- No `.env` files required - configuration embedded in SKILL.md frontmatter
- Paths resolved via `Path.home()` for global, relative paths for project-local

**Build:**

- `pyproject.toml` - Python dependencies and project metadata
- `package.json` - npm scripts and project info (no JS dependencies at root)
- `.opencode/package.json` - Plugin dependencies (@opencode-ai/plugin)
- `.opencode/opencode.json` - OpenCode permission configuration

**Key Config Files:**

- `src/skill/*/SKILL.md` - Skill definitions with YAML frontmatter
- `src/skill/*/references/registry.json` - Custom reference registry
- `.memory.md` - Project memory configuration

## Platform Requirements

**Development:**

- Python 3.10+
- Bun (for TypeScript plugin development)
- uv (Python package manager)

**Production:**

- Installs globally to `~/.config/opencode/skill/` and `~/.ai_docs/opencode/`
- File system access for doc caching at `~/.ai_docs/opencode/docs/`
- Memory storage at `~/.ai_docs/opencode/memory/`

---

_Stack analysis: 2026-02-18_
