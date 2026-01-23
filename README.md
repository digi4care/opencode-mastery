# OpenCode Mastery + Meta-Agent Skills

Complete OpenCode knowledge base with lazy-loaded documentation, fuzzy search, and intelligent memory. Includes meta-agent for generating OpenCode components.

## Quick Install

Clone and run the installer:
```bash
git clone https://github.com/digi4care/opencode-mastery.git ~/.ai_docs/opencode
cd ~/.ai_docs/opencode
./install.sh
```

This installs globally at `~/.config/opencode/skill/` - available in all projects.

## Uninstall

To remove skills while keeping your documentation, memory, and cache:

```bash
~/.ai_docs/opencode/uninstall.sh
```

**Or download and run (non-interactive, no confirmation):**
```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/uninstall.sh | bash -s -- --silent
```

The uninstall script:
- Removes only skill files (`SKILL.md`, `*.py` scripts)
- Keeps your downloaded documentation (`docs/`)
- Keeps your memory and cache (`memory/`, `cache/`)
- Offers to remove empty directories automatically
- Shows commands to completely remove all data if desired

## Features

**OpenCode Mastery:**
- ✅ **Lazy-loaded documentation** - Only loads relevant sections from cached docs
- ✅ **Fuzzy search** - Keyword-based search across all documentation
- ✅ **Session memory** - Remembers conversation context
- ✅ **Topic tracking** - Cross-session topic memory
- ✅ **GitHub integration** - Automatic GitHub search when docs insufficient
- ✅ **Source citations** - Always cites sources (docs, GitHub links, commits)
- ✅ **Confidence scoring** - Rates answer confidence, verifies when uncertain

**Meta-Agent:**
- ✅ **Command generator** - Create `/name` commands for explicit actions
- ✅ **Skill generator** - Create knowledge skills with semantic matching
- ✅ **Agent generator** - Create specialized workers for delegation
- ✅ **Documentation integration** - Uses OpenCode Mastery for accurate specs
- ✅ **Template system** - Production-ready templates for all component types

## What It Does

### OpenCode Mastery
This skill helps you master OpenCode by:
1. **Caching docs locally** - Downloads latest OpenCode documentation from GitHub
2. **Building search index** - Creates fuzzy search index for fast lookups
3. **Remembering conversations** - Tracks Q&A across sessions
4. **Automating research** - Searches GitHub when cached docs don't suffice
5. **Citing sources** - Always references where information comes from

### Meta-Agent
This skill helps you create OpenCode components by:
1. **Analyzing requirements** - Determines if you need command, skill, or agent
2. **Consulting documentation** - Uses OpenCode Mastery for accurate specs
3. **Generating templates** - Creates production-ready component files
4. **Writing to correct locations** - Saves to proper directory structure
5. **Following best practices** - Ensures correct frontmatter and syntax

## Usage

### 1. Download Documentation

```bash
python ~/.ai_docs/opencode/scripts/download-docs.py --verbose
```

This downloads all OpenCode documentation to your docs directory.

### 2. Build Search Index

```bash
python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

This creates the fuzzy search index in your memory directory.

### 3. Use the Skills

#### OpenCode Mastery

The skill is automatically loaded when you ask questions about OpenCode.

Simply start OpenCode and ask:
```
How do I create a skill?
What permissions can I set on agents?
How do I configure MCP servers?
How do I develop a plugin?
```

The agent will automatically load the OpenCode Mastery skill and answer your questions with references to documentation.

#### Meta-Agent

Use the meta-agent to generate OpenCode components:

**Create a command:**
```
Create a command to run tests
Create a command to deploy to production
Create a command to format all Python files
```

**Create a skill:**
```
Create a skill for React development
Create a skill for database design
Create a skill for Kubernetes troubleshooting
```

**Create an agent:**
```
Create an agent for code review
Create an agent for security audit
Create an agent for test automation
```

The meta-agent will use OpenCode Mastery to verify documentation and generate correct component files.

## Directory Structure

**Repository:**
```
brainstorm-opencode-doc-skill/
├── src/
│   ├── scripts/
│   │   ├── download-docs.py           # Download docs from GitHub
│   │   ├── index-builder.py            # Build/search index
│   │   └── memory-manager.py          # Memory management
│   └── skill/
│       ├── opencode-mastery/
│       │   └── SKILL.md              # OpenCode Mastery skill
│       └── META_AGENT.md             # Meta-Agent skill
├── README.md
├── install.sh
└── uninstall.sh
```

**After installation (global):**
```
~/.ai_docs/opencode/
├── docs/                    # Downloaded documentation
├── memory/                  # Index, topics, sessions
├── cache/                   # GitHub search results cache
└── scripts/                 # Python scripts

~/.config/opencode/skill/
├── opencode-mastery/
│   └── SKILL.md                 # OpenCode Mastery skill
└── meta-agent/
    └── SKILL.md                 # Meta-Agent skill
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

Skills are installed globally and available in all projects:

```
~/.config/opencode/skill/opencode-mastery/SKILL.md
~/.config/opencode/skill/meta-agent/SKILL.md
```

OpenCode automatically detects and loads these skills when relevant.

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

```bash
ls -la ~/.config/opencode/skill/opencode-mastery/SKILL.md
head -10 ~/.config/opencode/skill/opencode-mastery/SKILL.md

ls -la ~/.config/opencode/skill/meta-agent/SKILL.md
head -10 ~/.config/opencode/skill/meta-agent/SKILL.md
```

Verify frontmatter is valid.

### Index not built

Run index builder:
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

### Complete Removal

To remove ALL data including documentation, memory, and cache:
```bash
rm -rf ~/.ai_docs/opencode ~/.config/opencode/skill/opencode-mastery ~/.config/opencode/skill/meta-agent
```

## Contributing

To add new documentation topics to download:
1. Edit `src/scripts/download-docs.py` in the repository
2. Add filename to `DOCS_MAPPING` dict
3. Reinstall: `~/.ai_docs/opencode/install.sh`
4. Run `python ~/.ai_docs/opencode/scripts/download-docs.py --force`
5. Run `python ~/.ai_docs/opencode/scripts/index-builder.py --rebuild`

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
