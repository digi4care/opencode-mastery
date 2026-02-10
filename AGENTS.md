# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-23
**Commit:** HEAD
**Branch:** main

## OVERVIEW

OpenCode documentation skill with lazy-loaded docs, fuzzy search, GitHub research, and session memory.

## STRUCTURE

```
./
├── src/
│   └── skill/         # OpenCode skills
│       └── opencode-mastery/
│           ├── SKILL.md
│           ├── references/    # Custom reference docs (deep-dive content)
│           │   ├── registry.json    # Index of custom refs with keywords
│           │   └── *.mdx            # Custom documentation files
│           └── scripts/      # Python utilities (download-docs, index-builder, load-docs, memory-manager)
├── install.sh / uninstall.sh  # Install skill globally
└── package.json      # npm scripts for docs/management
```

## WHERE TO LOOK

| Task                   | Location                                               | Notes                          |
| ---------------------- | ------------------------------------------------------ | ------------------------------ |
| Documentation download | `src/skill/opencode-mastery/scripts/download-docs.py`  | GitHub API, 7-day cache        |
| Custom references      | `src/skill/opencode-mastery/references/`               | Custom deep-dive docs          |
| Search docs            | `src/skill/opencode-mastery/scripts/load-docs.py`      | Lazy loader, combines sources  |
| Build search index     | `src/skill/opencode-mastery/scripts/index-builder.py`  | Indexes official + custom refs |
| Session memory         | `src/skill/opencode-mastery/scripts/memory-manager.py` | Topic tracking, cross-session  |
| Skill definitions      | `src/skill/*/SKILL.md`                                 | Frontmatter + Markdown         |

## CONVENTIONS

**Package manager:** Bun for npm scripts, uv for Python scripts

**Scripts (Python):**

- Type hints required (`|` syntax for unions)
- `Path.home() / ".ai_docs" / "opencode"` for paths
- Global install: `~/.ai_docs/opencode/`, Project: `.ai_docs/opencode/`
- Cache duration: 7 days (TTL)

**GitHub CLI:**

- Required for downloading OpenCode documentation
- Must be authenticated: `gh auth login`
- Used via subprocess calls in download-docs.py

**SKILL.md format:**

- YAML frontmatter: name, description, license, compatibility, metadata
- `refresh: weekly` for documentation updates
- Paths in metadata for docs/memory/scripts locations

**Install flow:**

- `install.sh` → copies to `~/.config/opencode/skill/` (global)
- `bun run install` → project-local setup
- `bun run download-docs` → fetch docs from GitHub
- `bun run build-index` → build fuzzy search index

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** use `skills/` (plural) - ONLY `skill/` (singular) works on this system
- **NEVER** hardcode install paths - use `Path.home()` for global, relative for project
- **NEVER** skip cache validation - always check 7-day TTL before GitHub fetch
- **NEVER** modify SKILL.md without updating metadata (version/refresh)
- **NEVER** add new scripts without updating `package.json` scripts section

## CRITICAL DIRECTORY NAMING (SYSTEM-SPECIFIC)

**SKILL DIRECTORY IS `skill/` (SINGULAR) ON THIS SYSTEM**

**Note:** Official OpenCode documentation and code uses `skills/` (plural), but on THIS SPECIFIC SYSTEM, only `skill/` (singular) works.

**This appears to be a system-specific configuration issue, not a general OpenCode rule.**

**Paths:**

- Global: `~/.config/opencode/skill/` (NOT `skills/`)
- Project: `.opencode/skill/`

**For this project only:** Always use `skill/`, never `skills/`.

**If you see ANY reference to `skills/` in code, CHANGE IT TO `skill/` IMMEDIATELY.**

**To debug this in the future:**

- Check OpenCode version: `opencode --version`
- Check config: `cat ~/.config/opencode/opencode.json`
- Compare with official OpenCode repo for directory conventions

## COMMANDS

```bash
# Install globally
./install.sh

# Download latest official docs (uses GitHub CLI)
bun run download-docs -- --verbose

# Load custom references (lazy loader)
bun run load-docs -- --query "<topic>" --verbose

# Rebuild search index (official + custom)
bun run build-index -- --rebuild

# View session history
uv run src/skill/opencode-mastery/scripts/memory_manager.py --history

# Search topic memory
uv run src/skill/opencode-mastery/scripts/memory_manager.py --topic <topic-name>
```

## NOTES

- **Two install modes**: Global (`~/.config/opencode/skill/`) and Project (`.opencode/skill/`)
- **Two documentation sources**:
  - **Official docs** (~/.ai_docs/opencode/docs/) - Downloaded from OpenCode GitHub
  - **Custom references** (src/skill/opencode-mastery/references/) - Deep-dive content written by you
- **Lazy loading**: `load-docs.py` combines both sources based on keywords, returns ranked results
- **Registry system**: `references/registry.json` indexes all custom references with keywords
- **Docs location**: `~/.ai_docs/opencode/docs/` (global) or `.ai_docs/opencode/docs/` (project)
- **Memory structure**: `memory/` has `index.json` (fuzzy), `master_index.json` (topics), `sessions/`, `topics/`
- **GitHub API**: Uses `gh` CLI for repo searches with caching
- **opencode-mastery skill**: Lazy-loads docs (official + custom), tracks sessions, falls back to GitHub research
- **meta-agent skill**: Generates OpenCode components (commands, skills, agents) using opencode-mastery for accuracy
