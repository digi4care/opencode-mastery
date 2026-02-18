# Codebase Structure

**Analysis Date:** 2026-02-18

## Directory Layout

```
opencode-mastery/
├── src/                          # Source code
│   ├── skill/                    # Skills (singular, never skills/)
│   │   ├── opencode-mastery/     # Main OpenCode docs skill
│   │   ├── meta-agent/           # Component generation skill
│   │   ├── skill-creator/        # Skill lifecycle skill
│   │   └── opencode-memory/      # Memory plugin skill
│   ├── commands/                 # Slash command definitions
│   └── plugin/                   # TypeScript plugins
├── docs/                         # Project documentation
│   ├── project/                  # Project conventions
│   ├── opencode/                 # OpenCode-specific docs
│   ├── ace/                      # ACE framework docs
│   └── memory/                   # Memory system docs
├── ai_docs/                      # Downloaded/generated docs
│   ├── skills-papers/            # Skill development papers
│   └── memory/                   # Memory data
├── .opencode/                    # Local OpenCode config
│   └── plugin/                   # Local plugin build
├── .memory/                      # Project memory (gitignored)
├── .planning/                    # Planning documents
├── install.sh                    # Global installation script
├── uninstall.sh                  # Removal script
├── package.json                  # npm scripts
├── pyproject.toml                # Python dependencies
└── AGENTS.md                     # Project index for AI
```

## Directory Purposes

### `src/skill/`

- Purpose: Contains all OpenCode skill definitions
- Contains: SKILL.md files, references/, examples/, scripts/, src/
- Key files: `*/SKILL.md` (skill entry point)

**Critical Rule:** Always use `skill/` (singular), NEVER `skills/` (plural). OpenCode expects this exact naming.

### `src/skill/opencode-mastery/`

- Purpose: Main OpenCode documentation skill
- Contains:
  - `SKILL.md` - Skill definition
  - `references/*.mdx` - Deep-dive documentation
  - `scripts/*.py` - Helper scripts (docs loading, indexing)
  - `examples/` - Example skills, tools, plugins

**Key Scripts:**
| File | Purpose |
|------|---------|
| `load_docs.py` | Fuzzy search documentation |
| `download-docs.py` | Fetch docs from GitHub |
| `index_builder.py` | Build search index |
| `memory_cli.py` | Memory operations |
| `ace-reflector.py` | ACE session analysis |

### `src/skill/meta-agent/`

- Purpose: Generate OpenCode components
- Contains:
  - `SKILL.md` - Skill definition
  - `references/*.mdx` - Decision trees, templates

**Key References:**
| File | Purpose |
|------|---------|
| `decision-tree.mdx` | Command vs skill vs plugin vs agent |
| `component-templates.mdx` | Boilerplate for each type |
| `paths-and-installation.mdx` | Where files go |

### `src/skill/skill-creator/`

- Purpose: Create, audit, optimize SKILL.md files
- Contains:
  - `SKILL.md` - Skill definition
  - `references/*.mdx` - Rubrics, playbooks, templates

### `src/skill/opencode-memory/`

- Purpose: Persistent memory plugin
- Contains:
  - `SKILL.md` - Skill definition (documents the system)
  - `src/index.ts` - Plugin entry point
  - `src/tools/memory-tool.ts` - Memory tool
  - `src/hooks/*.ts` - Lifecycle hooks

### `src/commands/`

- Purpose: User-facing slash commands
- Contains: `.md` files with command instructions
- Key files:
  - `memory.md` - `/memory` command
  - `ace-reflect.md` - `/ace-reflect` command
  - `skill-creator-*.md` - Skill creation commands

### `src/plugin/`

- Purpose: TypeScript plugin implementations
- Contains: `.ts` files compiled to `.opencode/plugin/dist/`
- Key files:
  - `skill-creator.ts` - Tools for skill creation (plan, audit, create, optimize)

### `docs/`

- Purpose: Human-readable documentation
- Contains:
  - `project/` - Conventions, anti-patterns
  - `opencode/` - Plugin/tool guides
  - `ace/` - ACE framework
  - `memory/` - Memory system docs

### `ai_docs/`

- Purpose: Generated/downloaded content (not source code)
- Contains:
  - `skills-papers/` - Research papers on skill development
  - `memory/` - Memory storage
- Generated: Yes (partially)
- Committed: Partially (papers are committed)

### `.opencode/`

- Purpose: OpenCode local configuration
- Contains:
  - `plugin/` - Compiled plugin output
- Generated: Yes (build process)
- Committed: No (in .gitignore)

### `.memory/`

- Purpose: Project-specific memory storage
- Contains:
  - `daily/` - Daily session logs
  - `snapshots/` - Session snapshots
- Generated: Yes (runtime)
- Committed: No (in .gitignore)

## Key File Locations

### Entry Points:

| File                   | Purpose             |
| ---------------------- | ------------------- |
| `install.sh`           | Global installation |
| `src/skill/*/SKILL.md` | Skill activation    |

### Configuration:

| File             | Purpose               |
| ---------------- | --------------------- |
| `package.json`   | npm scripts, metadata |
| `pyproject.toml` | Python dependencies   |
| `.memory.md`     | Project memory config |
| `AGENTS.md`      | AI agent instructions |

### Core Logic:

| File                                              | Purpose              |
| ------------------------------------------------- | -------------------- |
| `src/plugin/skill-creator.ts`                     | Skill creation tools |
| `src/skill/opencode-memory/src/index.ts`          | Memory plugin        |
| `src/skill/opencode-mastery/scripts/load_docs.py` | Doc search           |

### Testing:

| File                                           | Purpose       |
| ---------------------------------------------- | ------------- |
| `src/skill/opencode-mastery/scripts/test-*.py` | Test scripts  |
| `.coverage`                                    | Coverage data |

## Naming Conventions

### Files:

- **SKILL.md**: Required skill definition file (exact name)
- **kebab-case.mdx**: Reference documents (e.g., `decision-tree.mdx`)
- **kebab-case.py**: Python scripts (e.g., `load_docs.py`)
- **kebab-case.ts**: TypeScript files (e.g., `memory-tool.ts`)
- **kebab-case.md**: Commands and docs (e.g., `memory.md`)

### Directories:

- **kebab-case**: All directories use kebab-case (e.g., `opencode-mastery`, `meta-agent`)
- **skill/**: CRITICAL - Always singular, never `skills/`

### Skill Structure:

```
skill-name/
├── SKILL.md           # Required: Skill definition
├── references/        # Optional: Deep-dive docs
│   ├── *.mdx
│   └── registry.json
├── scripts/           # Optional: Helper scripts
│   └── *.py
├── src/               # Optional: Plugin code
│   ├── index.ts
│   ├── tools/
│   └── hooks/
└── examples/          # Optional: Usage examples
```

## Where to Add New Code

### New Skill:

- Primary code: `src/skill/<skill-name>/SKILL.md`
- References: `src/skill/<skill-name>/references/*.mdx`
- Scripts: `src/skill/<skill-name>/scripts/*.py`
- Plugin: `src/skill/<skill-name>/src/*.ts`

### New Command:

- Definition: `src/commands/<command-name>.md`

### New Tool (Plugin):

- Implementation: `src/plugin/<tool-name>.ts` or `src/skill/<skill>/src/tools/<tool-name>.ts`
- Export from: Plugin index file

### New Hook:

- Implementation: `src/skill/<skill>/src/hooks/<hook-name>.ts`
- Register in: Plugin index file

### New Reference Document:

- Content: `src/skill/<skill>/references/<topic>.mdx`
- Registry: Add entry to `src/skill/<skill>/references/registry.json`

### New Documentation:

- Project docs: `docs/project/`
- OpenCode guides: `docs/opencode/`

## Special Directories

### `~/.ai_docs/opencode/` (Installed Location):

- Purpose: Global scripts and downloaded docs
- Generated: Yes (by install.sh)
- Committed: No (user's machine only)
- Contains:
  - `scripts/` - Python scripts
  - `docs/` - Downloaded OpenCode docs
  - `memory/` - Global memory store
  - `cache/` - GitHub API cache

### `~/.config/opencode/` (Installed Location):

- Purpose: OpenCode configuration
- Generated: Yes (by install.sh)
- Contains:
  - `skill/` - Installed skills
  - `commands/` - Installed commands
  - `plugin/` - Installed plugins

### `.tmp/`:

- Purpose: Temporary generated content
- Generated: Yes (runtime)
- Committed: No
- Contains: Preview skills, intermediate files

### `.memory/`:

- Purpose: Project memory storage
- Generated: Yes (runtime)
- Committed: No
- Contains: `daily/`, `snapshots/`, `compacted/`

## Installation Paths

After running `./install.sh`:

| Source                        | Destination                                  |
| ----------------------------- | -------------------------------------------- |
| `src/skill/opencode-mastery/` | `~/.config/opencode/skill/opencode-mastery/` |
| `src/skill/meta-agent/`       | `~/.config/opencode/skill/meta-agent/`       |
| `src/skill/skill-creator/`    | `~/.config/opencode/skill/skill-creator/`    |
| `src/skill/opencode-memory/`  | `~/.config/opencode/skill/opencode-memory/`  |
| `src/skill/*/scripts/*.py`    | `~/.ai_docs/opencode/scripts/`               |
| `src/commands/`               | `~/.config/opencode/commands/`               |
| `src/plugin/`                 | `~/.config/opencode/plugin/`                 |

---

_Structure analysis: 2026-02-18_
