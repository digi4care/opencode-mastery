# OpenCode Mastery Skill

Complete OpenCode knowledge base with lazy-loaded documentation, fuzzy search, and intelligent memory.

## Quick Install

### Option 1: Interactive Installer (Recommended)

Clone and run the interactive installer:
```bash
git clone https://github.com/digi4care/opencode-mastery.git ~/.ai_docs/opencode
cd ~/.ai_docs/opencode
./install.sh
```

The installer will ask:
- **Global installation** (default): Available in all projects at `~/.opencode/skills/`
- **Project installation**: Available only in current project at `.opencode/skills/`

### Option 2: One-line Global Install

```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/install.sh | bash
```

This installs globally in `~/.opencode/skills/`.

## Uninstall

To remove OpenCode Mastery skill while keeping your documentation, memory, and cache:

**From the repository:**
```bash
cd ~/.ai_docs/opencode
./uninstall.sh
```

**Or download and run (interactive):**
```bash
curl -O https://raw.githubusercontent.com/digi4care/opencode-mastery/main/uninstall.sh
chmod +x uninstall.sh
./uninstall.sh
```

**Or download and run (non-interactive):**
```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/uninstall.sh | bash -s -- --yes
```

The uninstall script:
- Removes only skill files (`SKILL.md`, `*.py` scripts)
- Keeps your downloaded documentation (`docs/`)
- Keeps your memory and cache (`memory/`, `cache/`)
- Offers to remove empty directories automatically
- Shows commands to completely remove all data if desired

## Features

- ✅ **Lazy-loaded documentation** - Only loads relevant sections from cached docs
- ✅ **Fuzzy search** - Keyword-based search across all documentation
- ✅ **Session memory** - Remembers conversation context
- ✅ **Topic tracking** - Cross-session topic memory
- ✅ **GitHub integration** - Automatic GitHub search when docs insufficient
- ✅ **Source citations** - Always cites sources (docs, GitHub links, commits)
- ✅ **Confidence scoring** - Rates answer confidence, verifies when uncertain

## What It Does

This skill helps you master OpenCode by:
1. **Caching docs locally** - Downloads latest OpenCode documentation from GitHub
2. **Building search index** - Creates fuzzy search index for fast lookups
3. **Remembering conversations** - Tracks Q&A across sessions
4. **Automating research** - Searches GitHub when cached docs don't suffice
5. **Citing sources** - Always references where information comes from

## Usage

### 1. Download Documentation

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/download-docs.py --verbose
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/download-docs.py --verbose
```

This downloads all OpenCode documentation to your docs directory.

### 2. Build Search Index

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/index-builder.py --rebuild
```

This creates the fuzzy search index in your memory directory.

### 3. Use the Skill

Start OpenCode and invoke the skill:
```
/skill opencode-mastery
```

Ask questions like:
- "How do I create a skill?"
- "What permissions can I set on agents?"
- "How do I configure MCP servers?"
- "How do I develop a plugin?"

## Directory Structure

**Global installation:**
```
~/.ai_docs/opencode/
├── src/
│   ├── scripts/
│   │   ├── download-docs.py           # Download docs from GitHub
│   │   ├── index-builder.py            # Build/search index
│   │   └── memory-manager.py          # Memory management
│   └── skill/
│       └── SKILL.md                   # Skill definition
├── docs/                    # Downloaded documentation (16 files)
├── memory/                  # Index, topics, sessions
├── cache/                   # GitHub search results cache
└── install.sh              # Installation script

~/.opencode/skills/opencode-mastery/
└── SKILL.md                 # Skill file (copied here)
```

**Project installation:**
```
your-project/
├── .ai_docs/
│   └── opencode/
│       ├── scripts/
│       ├── docs/
│       ├── memory/
│       └── cache/
└── .opencode/
    └── skills/
        └── opencode-mastery/
            └── SKILL.md
```

## Scripts

### download-docs.py

Download latest OpenCode documentation from GitHub.

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/download-docs.py [--force] [--verbose]
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/download-docs.py [--force] [--verbose]
```

Options:
- `--force`: Force download even if cache is recent
- `--verbose`: Show detailed progress

Cache policy: Refreshes after 7 days.

### index-builder.py

Build or search the fuzzy search index.

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/index-builder.py [--rebuild] [--search QUERY]
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/index-builder.py [--rebuild] [--search QUERY]
```

Options:
- `--rebuild`: Force rebuild index
- `--search QUERY`: Search for a specific topic

### memory-manager.py

Manage session and topic memory.

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/memory-manager.py --add "QUESTION" "ANSWER" "TOPICS"
python ~/.ai_docs/opencode/scripts/memory-manager.py --history
python ~/.ai_docs/opencode/scripts/memory-manager.py --topic TOPIC
python ~/.ai_docs/opencode/scripts/memory-manager.py --search KEYWORDS...
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/memory-manager.py --add "QUESTION" "ANSWER" "TOPICS"
python .ai_docs/opencode/scripts/memory-manager.py --history
python .ai_docs/opencode/scripts/memory-manager.py --topic TOPIC
python .ai_docs/opencode/scripts/memory-manager.py --search KEYWORDS...
```

Commands:
- `--add`: Add an exchange to memory
- `--history`: Show current session history
- `--topic`: Show all exchanges for a topic
- `--search`: Find relevant context across topics

## Skill Location

**Global installation:**
```
~/.opencode/skills/opencode-mastery/SKILL.md
```

**Project installation:**
```
.your-project/.opencode/skills/opencode-mastery/SKILL.md
```

Use the same `/skill opencode-mastery` command in both cases - OpenCode automatically detects and loads skills from the correct location.

## How It Works

### Answer Flow

1. **Parse Question**: Extract keywords from your question
2. **Search Index**: Find relevant docs using fuzzy search
3. **Load Sections**: Lazy-load only relevant content
4. **Check Confidence**: Rate answer confidence (80%+ = high)
5. **Cite Sources**: Reference docs files or GitHub commits
6. **Store Memory**: Remember for future conversations

### When Confidence is Low (< 70%)

1. **GitHub Search**: Search OpenCode repo for latest info
2. **Cache Results**: Store in `~/.ai_docs/opencode/cache/github/`
3. **Cite Source**: Provide repo URL, file, commit hash
4. **Update Index**: Add to search index for future

### Memory System

- **Session Memory**: Tracks Q&A per session date
- **Topic Memory**: Cross-session references per topic
- **Master Index**: All topics discussed
- **Auto-cleanup**: Archives sessions older than 30 days

## Topics Tracked

- skills - Creating, configuring, sharing skills
- agents - Primary agents, subagents, permissions
- commands - Slash commands, custom commands
- plugins - Plugin development, SDK
- config - Configuration, opencode.json
- mcp - MCP servers, integration
- lsp - LSP servers, configuration
- troubleshooting - Issues, solutions
- providers - Model providers, setup

## Refreshing Docs

Docs are cached for 7 days by default. To force refresh:

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/download-docs.py --force
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/download-docs.py --force
python .ai_docs/opencode/scripts/index-builder.py --rebuild
```

## Troubleshooting

### Skill not showing up in OpenCode

**For global installation:**
```bash
ls -la ~/.opencode/skills/opencode-mastery/SKILL.md
head -10 ~/.opencode/skills/opencode-mastery/SKILL.md
```

**For project installation:**
```bash
ls -la .opencode/skills/opencode-mastery/SKILL.md
head -10 .opencode/skills/opencode-mastery/SKILL.md
```

Verify frontmatter is valid in both cases.

### Index not built

Run index builder:

**Global installation:**
```bash
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

**Project installation:**
```bash
python .ai_docs/opencode/scripts/index-builder.py --rebuild
```

### Docs not downloading

Check internet connection and GitHub accessibility:
```bash
curl -I https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/web/src/content/docs/skills.mdx
```

### Memory not tracking

Check memory directory permissions:

**Global installation:**
```bash
ls -la ~/.ai_docs/opencode/memory/
```

**Project installation:**
```bash
ls -la .ai_docs/opencode/memory/
```

### Complete Removal

To remove ALL data including documentation, memory, and cache:

**Global installation:**
```bash
rm -rf ~/.ai_docs/opencode ~/.opencode/skills/opencode-mastery
```

**Project installation:**
```bash
rm -rf .ai_docs/opencode .opencode/skills/opencode-mastery
```

## Contributing

To add new documentation topics to download:
1. Edit `download-docs.py` in the repository
2. Add filename to `DOCS_MAPPING` dict
3. Reinstall or update your installation
4. Run `download-docs.py --force`
5. Run `index-builder.py --rebuild`

## License

MIT License - see [LICENSE.md](https://github.com/digi4care/opencode-mastery/blob/main/LICENSE.md) for details.

## Changelog

See [CHANGELOG.md](https://github.com/digi4care/opencode-mastery/blob/main/CHANGELOG.md) for version history and changes.

## Contributing

Contributions welcome! See [CONTRIBUTING.md](https://github.com/digi4care/opencode-mastery/blob/main/CONTRIBUTING.md) for guidelines.

## Links

- [GitHub Repository](https://github.com/digi4care/opencode-mastery)
- [Issues](https://github.com/digi4care/opencode-mastery/issues)
- [Pull Requests](https://github.com/digi4care/opencode-mastery/pulls)
- [Security](https://github.com/digi4care/opencode-mastery/security)
- [Security Policy](https://github.com/digi4care/opencode-mastery/blob/main/SECURITY.md)
- [OpenCode Documentation](https://opencode.ai/docs)
- [OpenCode GitHub](https://github.com/anomalyco/opencode)
