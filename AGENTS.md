# AGENTS.md - Project Index

**Project:** opencode-mastery  
**Versie:** 1.4.0  
**Laatste update:** 2026-02-13

## Overzicht

OpenCode documentation skill met lazy-loaded docs, fuzzy search, GitHub research, en session memory. Inclusief ACE (Agentic Context Engineering) framework voor self-improving prompts.

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
├── docs/                      # 📚 Gestructureerde documentatie
│   ├── project/               # Project-specifiek
│   │   ├── conventions.md     # Conventies & regels
│   │   └── anti-patterns.md   # Te vermijden patronen
│   ├── opencode/              # OpenCode guides
│   │   ├── plugins.md         # Plugin development
│   │   └── tools.md           # Custom tools
│   └── ace/                   # ACE framework
│       └── framework.md       # Agentic Context Engineering
│
├── src/skill/                 # 🎯 OpenCode skills
│   ├── opencode-mastery/      # Hoofd skill
│   │   ├── SKILL.md           # Skill definitie
│   │   ├── references/        # Custom .mdx docs
│   │   ├── scripts/           # Python utilities
│   │   └── examples/          # Voorbeelden (skills, plugins, tools)
│   └── meta-agent/            # Component generator
│       └── SKILL.md
│
├── .opencode/                 # ⚙️ OpenCode config
│   └── commands/              # Custom commands
│       └── ace-reflect.md     # ACE reflection command
│
├── ai_docs/                   # 📖 AI documentatie cache
│
├── install.sh                 # 🔧 Global install
├── uninstall.sh               # 🔧 Global uninstall
├── package.json               # 📦 npm scripts
└── pyproject.toml             # 🐍 Python config
```

## Commands

```bash
# Installatie
./install.sh                    # Globaal installeren
./uninstall.sh                  # Globaal verwijderen
uv sync                         # Python dependencies

# Documentatie
bun run download-docs           # Docs van GitHub halen
bun run load-docs -- --query "topic"   # Docs zoeken
bun run build-index             # Search index rebuild

# Testing
bun run test                    # Run tests
```

## Skills in dit Project

| Skill                | Doel                                        |
| -------------------- | ------------------------------------------- |
| **opencode-mastery** | Complete OpenCode kennisassistent           |
| **meta-agent**       | Genereert commands, skills, agents, plugins |

## Custom Commands

| Command        | Doel                                              |
| -------------- | ------------------------------------------------- |
| `/ace-reflect` | Analyseer sessies en genereer verbeter suggesties |

## Package Managers

| Taal                  | Tool                    |
| --------------------- | ----------------------- |
| JavaScript/TypeScript | **Bun** (niet pnpm/npm) |
| Python                | **uv**                  |

## Belangrijke Bestanden

| File              | Doel                        |
| ----------------- | --------------------------- |
| `AGENTS.md`       | Dit bestand - project index |
| `README.md`       | Project introductie         |
| `CHANGELOG.md`    | Versie geschiedenis         |
| `CONTRIBUTING.md` | Bijdrage richtlijnen        |
| `SECURITY.md`     | Security policy             |
| `LICENSE.md`      | MIT licentie                |

## CRITICAL: Directory Naming

> **ALWAYS use `skill/` (singular), NEVER `skills/` (plural)**

Dit is systeem-specifiek. Zie [anti-patterns.md](docs/project/anti-patterns.md) voor details.

## Documentatie Lazy Loading

AGENTS.md is minimalistisch. Gedetailleerde documentatie wordt lazy-loaded vanuit `docs/`:

- **Conventies** → `docs/project/conventions.md`
- **Plugins** → `docs/opencode/plugins.md`
- **Tools** → `docs/opencode/tools.md`
- **ACE** → `docs/ace/framework.md`

Dit houdt AGENTS.md klein en context-efficiënt.
