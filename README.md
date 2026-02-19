# OpenCode Mastery

Complete OpenCode knowledge base with lazy-loaded documentation, fuzzy search, and intelligent memory.

## Quick Install

**One-liner (recommended):**

```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/install.sh | bash -s -- --yes
```

**Or clone manually:**

```bash
git clone https://github.com/digi4care/opencode-mastery.git
cd opencode-mastery
./install.sh
```

## Project Structure

```
opencode-mastery/
├── src/
│   ├── agents/          # Custom agent definitions (markdown)
│   ├── commands/        # Slash commands
│   ├── features/        # Feature modules (debugging, flow, memory, repo, session, tdd)
│   ├── lib/             # Shared config library
│   ├── plugin/          # TypeScript plugins
│   └── skill/           # Skills with SKILL.md, references/, AGENTS.md
├── docs/                # Documentation
├── install.sh           # Install script
└── uninstall.sh         # Uninstall script
```

### Skills (18)

| Category     | Skills                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- |
| **OpenCode** | `opencode-mastery`, `meta-agent`, `skill-creator`, `opencode-memory`                               |
| **Frontend** | `tailwind`, `shadcn-svelte`, `svelte`, `svelte-cli`, `svelte-kit`, `svelte-mcp`, `frontend-design` |
| **Backend**  | `postgresql`, `database-architect`                                                                 |
| **Testing**  | `test-driven-development`, `playwright-cli`                                                        |
| **Analysis** | `flow-analysis`, `systematic-debugging`, `repo-analysis`                                           |

### Plugins (9)

| Plugin                    | Purpose                    |
| ------------------------- | -------------------------- |
| `opencode-mastery`        | Core docs & memory tools   |
| `opencode-mastery-plugin` | Custom agent registration  |
| `opencode-memory`         | Persistent memory system   |
| `tdd-enforcer`            | TDD cycle validation       |
| `debug-assistant`         | Debug session tools        |
| `flow-analyzer`           | Flow completeness analysis |
| `om-session`              | Session management         |
| `repo-analyzer`           | Repository analysis        |
| `skill-creator`           | Skill generation           |

### Commands (8)

| Command             | Agent             | Purpose                   |
| ------------------- | ----------------- | ------------------------- |
| `/flow-analyzer`    | flow-analyzer     | Generic flow analysis     |
| `/gsd-analyze-flow` | gsd-flow-analyzer | GSD phase flow analysis   |
| `/skill-creator-*`  | skill-creator     | Skill management (4 cmds) |
| `/ace-reflect`      | general           | Session analysis          |
| `/memory`           | -                 | Memory commands           |

### Agents (3)

| Agent               | Purpose                          |
| ------------------- | -------------------------------- |
| `flow-analyzer`     | Framework-agnostic flow analysis |
| `gsd-flow-analyzer` | GSD phase flow analysis          |
| `ace-analyzer`      | Session analysis                 |

### Features (6)

| Feature     | Purpose                  |
| ----------- | ------------------------ |
| `debugging` | Debug session tools      |
| `flow`      | Flow analyzer tools      |
| `memory`    | Persistent memory system |
| `repo`      | Repository analysis      |
| `session`   | Session management       |
| `tdd`       | TDD cycle validation     |

## Features

- **Lazy-loaded docs** - Only loads relevant sections
- **Fuzzy search** - Fast keyword-based lookups
- **Session memory** - Remembers conversation context
- **GitHub fallback** - Searches when docs insufficient
- **Source citations** - Always references sources
- **Custom agents** - Flow analyzer, GSD agents via opencode-mastery.json
- **Plugin system** - Extensible with TypeScript tools

## Commands

```bash
# Download latest docs
uv run ~/.ai_docs/opencode/scripts/download-docs.py --verbose

# Rebuild search index
uv run ~/.ai_docs/opencode/scripts/index_builder.py --rebuild

# Memory commands
uv run ~/.ai_docs/opencode/scripts/memory_cli.py status
uv run ~/.ai_docs/opencode/scripts/memory_cli.py compact
uv run ~/.ai_docs/opencode/scripts/memory_cli.py remember <text>
```

## Uninstall

```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/uninstall.sh | bash -s -- --silent
```

Or manually:

```bash
~/.ai_docs/opencode/uninstall.sh
```

## Documentation

| Topic         | Location                                                         |
| ------------- | ---------------------------------------------------------------- |
| Conventions   | [docs/project/conventions.md](docs/project/conventions.md)       |
| Anti-patterns | [docs/project/anti-patterns.md](docs/project/anti-patterns.md)   |
| Docs Guide    | [docs/project/DOCS-GUIDE.md](docs/project/DOCS-GUIDE.md)         |
| Plugins       | [docs/opencode/plugins.md](docs/opencode/plugins.md)             |
| Agents        | [docs/opencode/AGENTS.md](docs/opencode/AGENTS.md)               |
| Tools         | [docs/opencode/tools.md](docs/opencode/tools.md)                 |
| Skill Creator | [docs/opencode/skill-creator.md](docs/opencode/skill-creator.md) |
| ACE Framework | [docs/ace/framework.md](docs/ace/framework.md)                   |
| Config System | [docs/project/config-system.md](docs/project/config-system.md)   |

## Links

- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [License](LICENSE.md)
- [GitHub](https://github.com/digi4care/opencode-mastery)
