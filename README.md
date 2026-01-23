# OpenCode Mastery Skill

Complete OpenCode knowledge base with lazy-loaded documentation, fuzzy search, and intelligent memory.

## Features

- ✅ **Lazy-loaded documentation** - Only loads relevant sections from cached docs
- ✅ **Fuzzy search** - Keyword-based search across all documentation
- ✅ **Session memory** - Remembers conversation context
- ✅ **Topic tracking** - Cross-session topic memory
- ✅ **GitHub integration** - Automatic GitHub search when docs insufficient
- ✅ **Source citations** - Always cites sources (docs, GitHub links, commits)
- ✅ **Confidence scoring** - Rates answer confidence, verifies when uncertain

## Quick Start

### 1. Download Documentation

```bash
python ~/.ai_docs/opencode/scripts/download-docs.py --verbose
```

This downloads all OpenCode documentation from GitHub to `~/.ai_docs/opencode/docs/`.

### 2. Build Search Index

```bash
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
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
├── docs/                          # Downloaded documentation
│   ├── skills.mdx
│   ├── agents.mdx
│   ├── commands.mdx
│   ├── config.mdx
│   └── ... (16 total files)
├── memory/
│   ├── index.json                 # Master fuzzy search index
│   ├── master_index.json          # Topics index
│   ├── topics/                    # Topic-specific memory
│   └── sessions/                  # Session history
├── cache/
│   └── github/                    # GitHub search results cache
└── scripts/
    ├── download-docs.py           # Download docs from GitHub
    ├── index-builder.py            # Build/search index
    └── memory-manager.py          # Memory management
```

## Scripts

### download-docs.py

Download latest OpenCode documentation from GitHub.

```bash
python ~/.ai_docs/opencode/scripts/download-docs.py [--force] [--verbose]
```

Options:
- `--force`: Force download even if cache is recent
- `--verbose`: Show detailed progress

Cache policy: Refreshes after 7 days.

### index-builder.py

Build or search the fuzzy search index.

```bash
python ~/.ai_docs/opencode/scripts/index-builder.py [--rebuild] [--search QUERY]
```

Options:
- `--rebuild`: Force rebuild index
- `--search QUERY`: Search for a specific topic

### memory-manager.py

Manage session and topic memory.

```bash
python ~/.ai_docs/opencode/scripts/memory-manager.py --add "QUESTION" "ANSWER" "TOPICS"
python ~/.ai_docs/opencode/scripts/memory-manager.py --history
python ~/.ai_docs/opencode/scripts/memory-manager.py --topic TOPIC
python ~/.ai_docs/opencode/scripts/memory-manager.py --search KEYWORDS...
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
python ~/.ai_docs/opencode/scripts/download-docs.py --force
```

Then rebuild the index:

```bash
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
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
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
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
1. Edit `~/.ai_docs/opencode/scripts/download-docs.py`
2. Add filename to `DOCS_MAPPING` dict
3. Run `download-docs.py --force`
4. Run `index-builder.py --rebuild`

## License

MIT
