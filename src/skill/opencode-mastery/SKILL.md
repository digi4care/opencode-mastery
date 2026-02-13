---
name: opencode-mastery
description: Complete OpenCode knowledge base with lazy-loaded docs (official + custom references) and GitHub research
license: MIT
compatibility: opencode
metadata:
  author: user
  version: 1.4.0
  refresh: weekly
  paths:
    docs: ~/.ai_docs/opencode/docs
    memory: ~/.ai_docs/opencode/memory
    scripts: ~/.ai_docs/opencode/scripts
    references: src/skill/opencode-mastery/references
---

# OpenCode Mastery Skill

I am your complete OpenCode knowledge assistant. I help you master everything about OpenCode - from basic usage to advanced plugin development.

## Quick Navigation

Ask me about any OpenCode topic:

- **Installation & Setup** - CLI, TUI, Web, providers, configuration
- **Skills Development** - Creating, configuring, sharing skills
- **Custom Agents** - Primary agents, subagents, permissions
- **Commands** - Slash commands, custom commands, arguments
- **Plugins** - Plugin architecture, SDK, development patterns (including local plugins deep-dive)
- **Tools** - Writing custom tools (Zod schemas, ToolResult shape, safety patterns)
- **Configuration** - Complete opencode.json reference
- **Integration** - MCP, LSP, custom tools, formatters
- **Troubleshooting** - Common issues and solutions
- **Custom References** - Deep-dive content for advanced topics (see `load custom docs` action)
- **ACE** - Agentic Context Engineering for self-improving prompts (see ACE section below)

## How I Work

### 1. First Question

When you ask me something:

- I parse your question for keywords
- I search **both** documentation sources:
  - **Official docs** (~/.ai_docs/opencode/docs/) via memory/index.json
  - **Custom references** (references/) via references/registry.json
- I load only the relevant documentation sections (lazy loading)
- I combine content from both sources
- I provide an accurate answer with source citations

### 2. Follow-up Questions

- I use session memory to maintain context
- I recall what we've discussed before
- I build topic-specific knowledge over time
- Never repeat myself - I remember our conversation

### 3. Beyond Local Docs

When you ask something not in cached docs:

- I automatically search GitHub for latest information
- I cache results in ~/.ai_docs/opencode/cache/github/
- I cite the source (repo, file, line, commit)
- Never guess - always verify with actual code/docs

### 4. Always Accurate

- I cite all sources (docs files, GitHub links, specific commits)
- If I can't find it, I say so - no guessing
- I distinguish between cached docs and live research
- I track confidence in my answers

## Available Actions

### `refresh docs`

Download the latest documentation from GitHub:

**First time setup (install dependencies):**

```bash
uv sync
```

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/download-docs.py --verbose
```

**Project installation:**

```bash
npm run download-docs -- --verbose
# or
uv run src/skill/opencode-mastery/scripts/download-docs.py --verbose
```

This refreshes:

- All core documentation (skills, agents, commands, config)
- Integration docs (MCP, LSP)
- Development docs (plugins, SDK)
- Troubleshooting guides
- Usage guides (TUI, CLI, Web, IDE)

### `rebuild index`

Rebuild the fuzzy search index:

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

**Project installation:**

```bash
npm run build-index -- --rebuild
# or
uv run src/skill/opencode-mastery/scripts/index_builder.py --rebuild
```

This optimizes:

- Keyword extraction from all docs
- Section-based indexing
- Configuration key mapping

### `show session history`

Review what we've discussed in this session:

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/memory-manager.py --history
```

**Project installation:**

```bash
.ai_docs/opencode/scripts/memory-manager.py --history
```

### `search topic memory`

Find all discussions about a specific topic:

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/memory-manager.py --topic <topic-name>
```

**Project installation:**

```bash
.ai_docs/opencode/scripts/memory-manager.py --topic <topic-name>
```

### `search memory keywords`

Find relevant context across all topics:

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/memory-manager.py --search <keyword1> <keyword2>
```

**Project installation:**

```bash
.ai_docs/opencode/scripts/memory-manager.py --search <keyword1> <keyword2>
```

### `load custom docs`

Load documentation from custom references (deep-dive content):

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/load-docs.py --query "keyword"
```

**Project installation:**

```bash
npm run load-docs -- --query "keyword"
# or
uv run src/skill/opencode-mastery/scripts/load_docs.py --query "keyword"
```

This searches:

- **Custom references** - Deep-dive content in references/
- **Official docs** - Cached documentation from GitHub

Use `--verbose` to see which sources were loaded.

### `list custom references`

Show all available custom references:

**Global installation:**

```bash
~/.ai_docs/opencode/scripts/load-docs.py --list
```

**Project installation:**

```bash
npm run load-docs -- --list
# or
uv run src/skill/opencode-mastery/scripts/load_docs.py --list
```

This displays:

- Title and description of each custom reference
- Keywords for matching
- File path
- Last updated timestamp

## Directory Structure

**Global installation:**

```
~/.ai_docs/opencode/
├── docs/                          # Downloaded documentation
│   ├── skills.mdx                 # Skills documentation
│   ├── agents.mdx                 # Agents documentation
│   ├── commands.mdx               # Commands documentation
│   ├── plugins.mdx                # Plugin development
│   ├── sdk.mdx                    # SDK reference
│   ├── config.mdx                 # Complete config reference
│   └── troubleshooting.mdx        # Troubleshooting guide
├── memory/
│   ├── index.json                 # Master fuzzy search index
│   ├── master_index.json          # Topics index
│   ├── topics/                    # Topic-specific memory
│   │   ├── skills.json
│   │   ├── agents.json
│   │   └── ...
│   └── sessions/                  # Session history
│       ├── 2026-01-23.json
│       └── 2026-01-22.json
├── cache/
│   └── github/                    # GitHub search results cache
└── scripts/
    ├── download-docs.py           # Download docs from GitHub
    ├── index-builder.py            # Build search index
    └── memory-manager.py          # Memory management
```

**Project installation:**

```
your-project/
├── .ai_docs/
│   └── opencode/
│       ├── docs/                  # Downloaded documentation
│       ├── memory/                # Index, topics, sessions
│       ├── cache/
│       │   └── github/           # GitHub search cache
│       └── scripts/              # Python scripts
│           ├── download-docs.py
│           ├── index-builder.py
│           └── memory-manager.py
└── .opencode/
    └── skill/
        └── opencode-mastery/
            ├── SKILL.md
            ├── references/        # Custom deep-dive documentation
            │   ├── registry.json  # Index of custom references
            │   ├── local-plugins.mdx
            │   └── ...
            └── scripts/
                └── load-docs.py   # Lazy loader script
```

## Custom References

This skill combines **two documentation sources** to provide comprehensive coverage:

### Source 1: Official OpenCode Documentation

- **Location:** `~/.ai_docs/opencode/docs/`
- **Content:** Downloaded from the official OpenCode GitHub repository
- **Format:** `.mdx` files (skills.mdx, agents.mdx, commands.mdx, plugins.mdx, etc.)
- **Refresh:** Updated weekly via `refresh docs` action
- **Purpose:** Core OpenCode features and official documentation

### Source 2: Custom References (Deep-Dive Content)

- **Location:** `src/skill/opencode-mastery/references/`
- **Content:** Custom-written documentation with in-depth analysis
- **Format:** `.mdx` files with indexed keywords
- **Registry:** `references/registry.json` indexes all custom references
- **Purpose:** Advanced topics, practical patterns, detailed examples

### How the Two-Source System Works

When you ask a question:

```
User question: "How do I create a local plugin?"
    ↓
Extract keywords: ["plugin", "local", "plugins/"]
    ↓
Search in both sources:
    ├─→ Official docs: plugins.mdx sections via memory/index.json
    └─→ Custom refs: local-plugins.mdx via references/registry.json
    ↓
Combine results → Provide comprehensive answer
```

### Custom References Registry Structure

The `references/registry.json` file indexes all custom references:

```json
{
  "version": "1.0.0",
  "last_updated": "2026-02-10T12:00:00Z",
  "references": [
    {
      "file": "local-plugins.mdx",
      "title": "Lokale Plugins",
      "description": "Deep-dive guide for local plugin development in OpenCode",
      "keywords": ["plugin", "local", "plugins/", "development", "ts", "js"],
      "last_updated": "2026-02-10T12:30:00Z"
    }
  ]
}
```

**Registry Fields:**

- `file`: Filename (path relative to references/)
- `title`: Display title
- `description`: What this reference covers
- `keywords`: Array of search terms for matching
- `last_updated`: ISO 8601 timestamp

### Adding a New Custom Reference

1. **Create the .mdx file** in `references/`:

```bash
# Example: references/custom-topic.mdx
# Custom Topic

Detailed content about this topic...

## Subsection

More content...
```

2. **Update registry.json** with the new reference:

```json
{
  "file": "custom-topic.mdx",
  "title": "Custom Topic",
  "description": "Description of what this covers",
  "keywords": ["keyword1", "keyword2", "topic"],
  "last_updated": "2026-02-10T12:00:00Z"
}
```

3. **Rebuild the index** to include the new reference:

```bash
.ai_docs/opencode/scripts/index-builder.py --rebuild
```

### Benefits of Two-Source System

- **Comprehensive Coverage**: Official docs + custom deep-dive content
- **Lazy Loading**: Only relevant content is loaded based on keywords
- **Keyword Matching**: Both sources use fuzzy keyword matching (rapidfuzz)
- **Separation of Concerns**: Official docs stay untouched; custom content is project-specific
- **Scalable**: Easy to add new custom references without modifying official docs

### Example: Local Plugins

**Official docs** (`plugins.mdx`):

- Basic plugin architecture
- Core concepts and terminology
- Official patterns

**Custom references** (`local-plugins.mdx`):

- Detailed multi-file plugin patterns
- Import-pattern vs flat-pattern comparison
- Step-by-step troubleshooting guide
- Complete code examples with helper files

Combined answer gives you both official patterns AND practical experience.

## Examples

**Location:** `src/skill/opencode-mastery/examples/`

This directory contains **progressive skill examples** that demonstrate different levels of complexity, from minimal POC to full workflow orchestration. Each tier builds upon the previous one, providing a structured learning path.

### Overview of Tiers

| Tier  | Example                | Complexity | Files                             | What it Shows                                          |
| ----- | ---------------------- | ---------- | --------------------------------- | ------------------------------------------------------ |
| **1** | `skills/minimal/`      | ⭐         | 1 (SKILL.md)                      | Basic skill structure, frontmatter, instructions = POC |
| **2** | `skills/intermediate/` | ⭐⭐       | 2 (SKILL.md + helper.sh)          | Helper scripts, multi-step workflows, timing           |
| **3** | `skills/advanced/`     | ⭐⭐⭐     | 7 (SKILL.md + config + 5 scripts) | Config-driven, router pattern, state management        |

### Learning Path

```
Tier 1 (Minimal) → Tier 2 (Intermediate) → Tier 3 (Advanced)
    ⭐                    ⭐⭐                    ⭐⭐⭐
```

Start with **Tier 1** to understand basics, then progress to **Tier 2** for script integration, and finally **Tier 3** for full workflow orchestration.

### Quick Start

**For beginners** (new to OpenCode):

```bash
cd src/skill/opencode-mastery/examples/skills/minimal
cat SKILL.md
```

**For intermediate users**:

```bash
cd src/skill/opencode-mastery/examples/skills/intermediate
cat SKILL.md
./helper.sh
```

**For advanced users**:

```bash
cd src/skill/opencode-mastery/examples/skills/advanced
cat SKILL.md
./router.sh --dry-run  # Preview without execution
./router.sh           # Run complete workflow
```

### What You'll Learn

**Tier 1 - Minimal Example:**

- ✅ Basic skill structure (single file)
- ✅ Frontmatter metadata (`name`, `description`)
- ✅ Skills are **INSTRUCTIONS**, not code
- ✅ Simple instruction format

**Tier 2 - Intermediate Example:**

- ✅ Helper script integration
- ✅ Multi-step workflows (init → process → validate → output → finalize)
- ✅ Console output with timing
- ✅ Agent executes scripts via bash tool

**Tier 3 - Advanced Example:**

- ✅ Config-driven behavior (3 modes: development, testing, production)
- ✅ Router script with arg parsing (`--phase`, `--dry-run`)
- ✅ Four-phase orchestration (init → validate → execute → finalize)
- ✅ State management with JSON
- ✅ Output file generation with timestamps
- ✅ Summary report generation
- ✅ Dry-run mode for testing

### For More Details

See the complete examples documentation:

- **[examples/skills/README.md](../src/skill/opencode-mastery/examples/skills/README.md)** - Full guide with tier comparison tables, learning paths, and usage examples
- **[examples/skills/WORKFLOW_PATTERNS.md](../src/skill/opencode-mastery/examples/skills/WORKFLOW_PATTERNS.md)** - Sequential, conditional, and parallel workflow patterns
- **[examples/skills/BEST_PRACTICES.md](../src/skill/opencode-mastery/examples/skills/BEST_PRACTICES.md)** - Best practices for skill development

---

## Workflow Examples

### Example 1: Creating a Skill

```
You: How do I create a skill for OpenCode?

Me: [Searches index for "skill", "create", "SKILL.md"]
     [Loads skills.mdx sections about frontmatter and placement]
     [Answers with step-by-step guide]
     [Adds to topic memory: "skills"]

You: What permissions can I set on a skill?

Me: [Recalls we discussed "skills"]
     [Searches skills.mdx for "permissions"]
     [Answers with permission patterns]
```

### Example 2: GitHub Research

```
You: How do I add a custom LSP server?

Me: [Searches index - no match or low confidence]
     [Searches GitHub for "LSP", "custom", "server"]
     [Finds config example in opencode repo]
     [Cites source: opencode/config.json line 45-60]
     [Caches result]
     [Answers with config example]
```

## Topics I Track

I automatically categorize our discussions into topics:

- **skills** - Creating, configuring, sharing skills
- **agents** - Primary agents, subagents, permissions
- **commands** - Slash commands, custom commands
- **plugins** - Plugin development, SDK
- **config** - Configuration, opencode.json
- **mcp** - MCP servers, integration
- **lsp** - LSP servers, configuration
- **troubleshooting** - Issues, solutions
- **providers** - Model providers, setup
- **custom-refs** - Custom references, deep-dive documentation
- **ace** - Agentic Context Engineering, self-improving prompts

When you ask something, I:

1. Check if we've discussed this topic before
2. Retrieve relevant context from memory
3. Combine with fresh docs/GitHub search
4. Provide comprehensive answer

## Memory Policy

- **Session Memory**: Tracks questions, answers, topics per session
- **Topic Memory**: Cross-session references for each topic
- **Master Index**: All topics discussed across all sessions
- **Automatic Cleanup**: Sessions older than 30 days are archived

## Confidence Scoring

I rate my answer confidence:

- **High (≥ 80%)**: From cached docs, verified with sources
- **Medium (60-79%)**: From GitHub search, verified with code
- **Low (< 60%)**: Needs verification - I'll ask you

When confidence is low:

- "I found this in GitHub but want to verify with you"
- "This pattern exists in the repo but I'm not 100% sure it's current"
- "Can you confirm this works in your setup?"

## Never Guessing

If I cannot find information:

- "I couldn't find documentation on this. Let me search GitHub..."
- "This doesn't appear to be documented. Would you like me to..."
- "I don't have enough information. Can you provide..."

I always:

- Cite my sources (doc file, GitHub URL, commit hash)
- Indicate confidence level
- Offer to research further when uncertain
- Remember what I've found for future reference

## Getting Started

First time using me?

**Global installation:**

1. Run: `~/.ai_docs/opencode/scripts/download-docs.py`
2. Run: `~/.ai_docs/opencode/scripts/index-builder.py`

**Project installation:**

1. Install dependencies: `uv sync`
2. Run: `npm run download-docs`
3. Run: `npm run build-index -- --rebuild`

4. Ask me anything about OpenCode!

I'll learn from our conversation and become more helpful over time.

---

## 🔌 Plugins

OpenCode also supports **plugins**, which are TypeScript/JavaScript modules that extend OpenCode's capabilities beyond what skills can provide.

### What's the Difference?

| Aspect         | Skills              | Plugins                             |
| -------------- | ------------------- | ----------------------------------- |
| **Format**     | Markdown (.md)      | TypeScript (.ts) / JavaScript (.js) |
| **Complexity** | Low                 | Medium-High                         |
| **Execution**  | Via bash tool       | Direct execution                    |
| **Tools**      | Via scripts         | Custom tools with Zod schemas       |
| **Agents**     | Via config          | Custom agents with scoped tools     |
| **Hooks**      | None                | 25+ event hooks                     |
| **SDK Access** | Limited             | Full API (session, TUI, shell)      |
| **Best For**   | Simple instructions | Advanced features                   |

### Plugin Examples

See `examples/plugins/` directory for complete plugin examples:

- **[examples/plugins/README.md](./examples/plugins/README.md)** - Complete plugin guide
- **[examples/plugins/minimal/](./examples/plugins/minimal/)** - Tier 1: Event logging
- **[examples/plugins/intermediate/](./examples/plugins/intermediate/)** - Tier 2: Custom tools + agents
- **[examples/plugins/advanced/](./examples/plugins/advanced/)** - Tier 3: Full capabilities

If you want a tool-focused learning path (schema -> handler -> stable results), see:

- **[examples/tools/README.md](./examples/tools/README.md)** - Tool examples and documentation

### Plugin Documentation

See consolidated documentation:

- **[docs/opencode/plugins.md](../../docs/opencode/plugins.md)** - Complete plugin guide (overview, architecture, SDK, events, best practices)

### When to Use Plugins vs Skills

**Use Skills when**:

- You need simple, human-readable instructions
- You want quick prototyping
- You don't need event interception
- Your use case is straightforward

**Use Plugins when**:

- You need type-safe custom tools
- You want to intercept tool executions
- You need custom agents with scoped tools
- You require event-driven behavior
- You want to extend OpenCode's UI or session management

### Quick Links

**Skills Examples**:

- [skills/minimal/](./examples/skills/minimal/) - Basic skill structure
- [skills/intermediate/](./examples/skills/intermediate/) - Helper script integration
- [skills/advanced/](./examples/skills/advanced/) - Config-driven workflows

**Plugins Examples**:

- [plugins/minimal/](./examples/plugins/minimal/) - Tier 1 example
- [plugins/intermediate/](./examples/plugins/intermediate/) - Tier 2 example
- [plugins/advanced/](./examples/plugins/advanced/) - Tier 3 example

**Tools Examples**:

- [tools/minimal/](./examples/tools/minimal/) - Single tool example
- [tools/intermediate/](./examples/tools/intermediate/) - Multiple tools
- [tools/advanced/](./examples/tools/advanced/) - Multi-tool with utils

See [docs/opencode/tools.md](../../docs/opencode/tools.md) for complete tools guide.

### Summary

You now have **three complete learning paths**:

1. **Skills** (Markdown-based) → From simple instructions to advanced workflows
2. **Plugins** (TypeScript/JavaScript) → From event hooks to full SDK access
3. **Tools** (Zod-validated functions) → From a single tool to a structured toolset

Choose based on your use case, complexity, and requirements!

---

## 🔄 ACE - Agentic Context Engineering

ACE (Agentic Context Engineering) is een framework waarbij AI-systemen hun eigen context kunnen verbeteren. In plaats van één perfecte prompt te schrijven, bouw je een **evoluerend playbook** dat continu wordt aangescherpt op basis van echte execution-feedback.

### Wat kan ACE?

| Functie               | Beschrijving                                                        |
| --------------------- | ------------------------------------------------------------------- |
| **Sessie analyse**    | Analyseert huidige of vorige sessies                                |
| **Probleem detectie** | Identificeert frictiepunten en verbeterkansen                       |
| **Prompt suggesties** | Genereert concrete voorstellen voor skill/agent/command verbetering |
| **Evidence-based**    | Elk voorstel onderbouwd met specifieke interacties                  |

### Hoe te gebruiken

```
/ace-reflect                          → Analyseer alles
/ace-reflect skill:opencode-mastery   → Focus op specifieke skill
/ace-reflect agent:CoderAgent         → Focus op specifieke agent
/ace-reflect command:meta-agent       → Focus op specifiek command
/ace-reflect --sessions 5             → Analyseer laatste 5 sessies
```

### Workflow

```
1. Invoke /ace-reflect
2. Sessie(s) worden geanalyseerd
3. Problemen/verbeterpunten geïdentificeerd
4. Concrete suggesties gegenereerd
5. Diff + rationale getoond
6. Jij beslist: Approve / Reject / Edit
```

### ACE Documentatie

De volgende custom references zijn beschikbaar:

| Document            | Beschrijving                                                           |
| ------------------- | ---------------------------------------------------------------------- |
| `ace-framework.mdx` | Hoofddocument - architectuur, strategie, tactics                       |
| `ace-rubric.mdx`    | Evaluatie criteria - completeness, accuracy, efficiency, tone, clarity |
| `ace-patterns.mdx`  | Success patterns, anti-patterns, implementation patterns               |

Laad ACE documentatie:

```bash
# Project installation
npm run load-docs -- --query "ace"

# Global installation
~/.ai_docs/opencode/scripts/load-docs.py --query "ace"
```

### Kernprincipes

1. **Grow-and-Refine** - Nieuwe inzichten toevoegen, oude herstructureren (geen brute overschrijvingen)
2. **Evidence-Based** - Elk voorstel moet ondersteund worden door specifieke interacties
3. **Human Approval** - Altijd goedkeuring vereist, geen auto-updates
4. **Version Control** - Alle versies bewaard met rollback capability

### Evaluatie Criteria

| Criterium    | Gewicht | Trigger         |
| ------------ | ------- | --------------- |
| Completeness | 20%     | < 3 = suggestie |
| Accuracy     | 25%     | < 3 = verplicht |
| Efficiency   | 20%     | < 2 = suggestie |
| Tone         | 15%     | < 2 = suggestie |
| Clarity      | 20%     | < 3 = suggestie |

**Totaal < 3.0** → Verplicht voorstel
**Totaal 3.0-4.0** → Optioneel voorstel
**Totaal > 4.0** → Alleen loggen

### Voorbeeld Output

````markdown
## ACE Reflection Report

**Analyzed**: 3 sessions, 47 interactions
**Scope**: skill:opencode-mastery
**Date**: 2025-02-13

### Findings

#### Issue: Overly verbose responses

**Evidence**:

- Session 2 msg 7: user says "te langdradig"
- Session 3 msg 2: user asks for "korte samenvatting"

**Score**: Efficiency 2/5

#### Suggested Change

```diff
- Provide comprehensive explanations for all topics
+ Provide concise explanations with optional deep-dive links
```
````

**Rationale**: Users indicated preference for brevity while maintaining accuracy.

### Actions

- [ ] Review suggested change
- [ ] Approve / Reject / Edit

```

### Meer informatie

Zie de ACE custom references voor volledige documentatie:

- **Architectuur & Workflow** → `ace-framework.mdx`
- **Evaluatie Criteria** → `ace-rubric.mdx`
- **Patterns & Anti-Patterns** → `ace-patterns.mdx`
```
