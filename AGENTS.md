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
│   ├── scripts/       # Python utilities (download-docs, index-builder, memory-manager)
│   └── skill/         # OpenCode skills (opencode-mastery, meta-agent)
├── install.sh / uninstall.sh  # Install skill globally
└── package.json      # npm scripts for docs/management
```

## WHERE TO LOOK

| Task                   | Location                        | Notes                         |
| ---------------------- | ------------------------------- | ----------------------------- |
| Documentation download | `src/scripts/download-docs.py`  | GitHub API, 7-day cache       |
| Search index           | `src/scripts/index-builder.py`  | Fuzzy search via rapidfuzz    |
| Session memory         | `src/scripts/memory-manager.py` | Topic tracking, cross-session |
| Skill definitions      | `src/skill/*/SKILL.md`          | Frontmatter + Markdown        |

## CONVENTIONS

**Scripts (Python):**

- Type hints required (`|` syntax for unions)
- `Path.home() / ".ai_docs" / "opencode"` for paths
- Global install: `~/.ai_docs/opencode/`, Project: `.ai_docs/opencode/`
- Cache duration: 7 days (TTL)

**SKILL.md format:**

- YAML frontmatter: name, description, license, compatibility, metadata
- `refresh: weekly` for documentation updates
- Paths in metadata for docs/memory/scripts locations

**Install flow:**

- `install.sh` → copies to `~/.config/opencode/skill/` (global)
- `npm run install` → project-local setup
- `npm run download-docs` → fetch docs from GitHub
- `npm run build-index` → build fuzzy search index

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

# Download latest docs
~/.ai_docs/opencode/scripts/download-docs.py --verbose

# Rebuild search index
~/.ai_docs/opencode/scripts/index-builder.py --rebuild

# View session history
~/.ai_docs/opencode/scripts/memory-manager.py --history

# Search topic memory
~/.ai_docs/opencode/scripts/memory-manager.py --topic <topic-name>
```

## NOTES

- **Two install modes**: Global (`~/.config/opencode/skill/`) and Project (`.opencode/skill/`)
- **Docs location**: `~/.ai_docs/opencode/docs/` (global) or `.ai_docs/opencode/docs/` (project)
- **Memory structure**: `memory/` has `index.json` (fuzzy), `master_index.json` (topics), `sessions/`, `topics/`
- **GitHub API**: Uses `gh` CLI for repo searches with caching
- **opencode-mastery skill**: Lazy-loads docs based on keywords, tracks sessions, falls back to GitHub research
- **meta-agent skill**: Generates OpenCode components (commands, skills, agents) using opencode-mastery for accuracy
