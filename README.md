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

| Skill                | Description                                            |
| -------------------- | ------------------------------------------------------ |
| **opencode-mastery** | Complete OpenCode knowledge with fuzzy search & memory |
| **meta-agent**       | Generate commands, skills, and agents                  |

## Features

- **Lazy-loaded docs** - Only loads relevant sections
- **Fuzzy search** - Fast keyword-based lookups
- **Session memory** - Remembers conversation context
- **GitHub fallback** - Searches when docs insufficient
- **Source citations** - Always references sources

## Commands

```bash
# Download latest docs
uv run ~/.ai_docs/opencode/scripts/download-docs.py --verbose

# Rebuild search index
uv run ~/.ai_docs/opencode/scripts/index_builder.py --rebuild

# View session history
uv run ~/.ai_docs/opencode/scripts/memory-manager.py --history
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
| Plugins       | [docs/opencode/plugins.md](docs/opencode/plugins.md)             |
| Skill Creator | [docs/opencode/skill-creator.md](docs/opencode/skill-creator.md) |
| Tools         | [docs/opencode/tools.md](docs/opencode/tools.md)                 |
| ACE Framework | [docs/ace/framework.md](docs/ace/framework.md)                   |

## Links

- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [License](LICENSE.md)
- [GitHub](https://github.com/digi4care/opencode-mastery)
