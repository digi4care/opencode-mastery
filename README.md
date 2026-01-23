# OpenCode Mastery Skill

Complete OpenCode knowledge base with lazy-loaded documentation, fuzzy search, and intelligent memory.

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/install.sh | bash
```

Or clone and install manually:
```bash
git clone https://github.com/digi4care/opencode-mastery.git ~/.ai_docs/opencode
cd ~/.ai_docs/opencode
./install.sh
```

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

```bash
python ~/.ai_docs/opencode/src/scripts/download-docs.py --verbose
```

This downloads all OpenCode documentation from GitHub to `~/.ai_docs/opencode/docs/`.

### 2. Build Search Index

```bash
python ~/.ai_docs/opencode/src/scripts/index-builder.py --rebuild
```

This creates the fuzzy search index in `~/.ai_docs/opencode/memory/index.json`.

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
```

## Scripts

### download-docs.py

Download latest OpenCode documentation from GitHub.

```bash
python ~/.ai_docs/opencode/src/scripts/download-docs.py [--force] [--verbose]
```

Options:
- `--force`: Force download even if cache is recent
- `--verbose`: Show detailed progress

Cache policy: Refreshes after 7 days.

### index-builder.py

Build or search the fuzzy search index.

```bash
python ~/.ai_docs/opencode/src/scripts/index-builder.py [--rebuild] [--search QUERY]
```

Options:
- `--rebuild`: Force rebuild index
- `--search QUERY`: Search for a specific topic

### memory-manager.py

Manage session and topic memory.

```bash
python ~/.ai_docs/opencode/src/scripts/memory-manager.py --add "QUESTION" "ANSWER" "TOPICS"
python ~/.ai_docs/opencode/src/scripts/memory-manager.py --history
python ~/.ai_docs/opencode/src/scripts/memory-manager.py --topic TOPIC
python ~/.ai_docs/opencode/src/scripts/memory-manager.py --search KEYWORDS...
```

Commands:
- `--add`: Add an exchange to memory
- `--history`: Show current session history
- `--topic`: Show all exchanges for a topic
- `--search`: Find relevant context across topics

## Skill Location

The skill is installed at:
```
~/.opencode/skills/opencode-mastery/SKILL.md
```

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

```bash
python ~/.ai_docs/opencode/src/scripts/download-docs.py --force
```

Then rebuild the index:

```bash
python ~/.ai_docs/opencode/src/scripts/index-builder.py --rebuild
```

## Troubleshooting

### Skill not showing up in OpenCode

Check that the SKILL.md file exists:
```bash
ls -la ~/.opencode/skills/opencode-mastery/SKILL.md
```

Verify frontmatter is valid:
```bash
head -10 ~/.opencode/skills/opencode-mastery/SKILL.md
```

### Index not built

Run the index builder:
```bash
python ~/.ai_docs/opencode/src/scripts/index-builder.py --rebuild
```

### Docs not downloading

Check internet connection and GitHub accessibility:
```bash
curl -I https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/web/src/content/docs/skills.mdx
```

### Memory not tracking

Check memory directory permissions:
```bash
ls -la ~/.ai_docs/opencode/memory/
```

## Contributing

To add new documentation topics to download:
1. Edit `~/.ai_docs/opencode/src/scripts/download-docs.py`
2. Add filename to `DOCS_MAPPING` dict
3. Run `download-docs.py --force`
4. Run `index-builder.py --rebuild`

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
- [OpenCode Documentation](https://opencode.ai/docs)
- [OpenCode GitHub](https://github.com/anomalyco/opencode)
