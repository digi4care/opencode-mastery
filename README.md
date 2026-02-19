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

## What's Included

### Skills (17)

| Category     | Skills                                                                                             |
| ------------ | -------------------------------------------------------------------------------------------------- |
| **OpenCode** | `opencode-mastery`, `meta-agent`, `skill-creator`, `opencode-memory`                               |
| **Frontend** | `tailwind`, `shadcn-svelte`, `svelte`, `svelte-cli`, `svelte-kit`, `svelte-mcp`, `frontend-design` |
| **Backend**  | `postgresql`, `database-architect`                                                                 |
| **Analysis** | `flow-analysis`, `systematic-debugging`, `test-driven-development`                                 |
| **Tools**    | `playwright-cli`, `repo-analysis`                                                                  |

### Plugins (4)

| Plugin             | Purpose                    |
| ------------------ | -------------------------- |
| `opencode-mastery` | Docs & memory tools        |
| `tdd-enforcer`     | TDD cycle validation       |
| `debug-assistant`  | Debug session tools        |
| `flow-analyzer`    | Flow completeness analysis |

### Commands

| Command             | Agent             | Purpose                 |
| ------------------- | ----------------- | ----------------------- |
| `/flow-analyzer`    | flow-analyzer     | Generic flow analysis   |
| `/gsd-analyze-flow` | gsd-flow-analyzer | GSD phase flow analysis |
| `/skill-creator-*`  | skill-creator     | Skill management        |
| `/ace-reflect`      | ace-analyzer      | Session analysis        |
| `/memory`           | -                 | Memory commands         |

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
