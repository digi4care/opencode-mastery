# Architecture

**Analysis Date:** 2026-02-18

## Pattern Overview

**Overall:** OpenCode Skill/Plugin System with Layered Architecture

**Key Characteristics:**

- Skill-based instruction pattern (Markdown files guide AI behavior)
- Plugin architecture with tools and hooks (TypeScript)
- Progressive disclosure through references (.mdx files)
- Script helpers for complex operations (Python)
- Global installation with project-local overrides

## Layers

### Skills Layer

- Purpose: Define AI behavior through declarative instructions
- Location: `src/skill/*/SKILL.md`
- Contains: YAML frontmatter + markdown instructions
- Depends on: References, Scripts, Tools
- Used by: OpenCode runtime (reads SKILL.md to guide AI)

**Key Skills:**
| Skill | Location | Purpose |
|-------|----------|---------|
| opencode-mastery | `src/skill/opencode-mastery/` | OpenCode documentation Q&A |
| meta-agent | `src/skill/meta-agent/` | Generate commands, skills, agents |
| skill-creator | `src/skill/skill-creator/` | Create, audit, optimize skills |
| opencode-memory | `src/skill/opencode-memory/` | Persistent memory system |

### Plugins Layer

- Purpose: Provide callable tools and event hooks
- Location: `src/plugin/`, `src/skill/opencode-memory/src/`
- Contains: TypeScript modules with Zod-validated tools
- Depends on: @opencode-ai/plugin SDK
- Used by: OpenCode runtime (invokes tools, triggers hooks)

**Plugin Pattern (oh-my-opencode):**

```typescript
export function createPlugin(input: PluginInput): Plugin {
  return {
    name: "plugin-name",
    tools: { toolName: createTool() },
    hooks: {
      "session.created": createHook(),
      "experimental.session.compacting": createHook(),
    },
  };
}
```

### Scripts Layer

- Purpose: Execute complex operations beyond instruction scope
- Location: `src/skill/*/scripts/`, `~/.ai_docs/opencode/scripts/` (installed)
- Contains: Python scripts with CLI interfaces
- Depends on: rapidfuzz, pyyaml
- Used by: Skills invoke via bash commands

**Key Scripts:**
| Script | Location | Purpose |
|--------|----------|---------|
| load_docs.py | `scripts/` | Fuzzy search in docs |
| download-docs.py | `scripts/` | Fetch OpenCode docs from GitHub |
| index_builder.py | `scripts/` | Build search index |
| memory_cli.py | `scripts/` | Memory operations CLI |
| ace-reflector.py | `scripts/` | ACE session reflection |

### References Layer

- Purpose: Progressive disclosure of detailed documentation
- Location: `src/skill/*/references/*.mdx`
- Contains: Deep-dive documentation loaded on demand
- Depends on: registry.json for indexing
- Used by: Skills link to references for extended context

### Commands Layer

- Purpose: User-facing slash commands
- Location: `src/commands/*.md`
- Contains: Command definitions with instructions
- Depends on: Underlying skills/tools
- Used by: User invokes via `/command-name`

## Data Flow

### Documentation Query Flow:

1. User asks OpenCode question
2. `opencode-mastery` skill activates (keyword matching)
3. Skill invokes `load_docs.py` via bash
4. Script searches official docs + custom references
5. Results returned with relevance scores
6. AI synthesizes answer with citations

### Skill Creation Flow:

1. User requests new skill
2. `meta-agent` determines component type
3. Routes to `skill-creator` for SKILL.md work
4. `skill-creator-plan` generates structure
5. `skill-creator-create` writes files (dry-run first)
6. `skill-creator-audit` validates quality
7. User confirms, files written

### Memory Lifecycle Flow:

1. Session starts → `session.created` hook fires
2. `memory-bootstrap` loads `.memory.md`
3. During session → `memory-intent` detects remember requests
4. Context fills → `memory-compaction` flushes to daily log
5. Session ends → `memory-snapshot` saves state

**State Management:**

- `.memory.md` - Project semantic memory (facts, preferences)
- `.memory/daily/` - Episodic memory (session logs)
- `.memory/snapshots/` - Session snapshots
- `~/.ai_docs/opencode/memory/` - Global memory store

## Key Abstractions

### SKILL.md File:

- Purpose: Single source of truth for skill behavior
- Examples: `src/skill/opencode-mastery/SKILL.md`, `src/skill/meta-agent/SKILL.md`
- Pattern: YAML frontmatter + markdown sections

**Required Sections:**

```yaml
---
name: skill-name
description: When to use / when not to use
---
# Skill Name
## When to Use Me
## Workflow
## Error Handling
## Quick Tests
## References
```

### Tool (Plugin):

- Purpose: Callable function exposed to AI
- Examples: `src/plugin/skill-creator.ts`, `src/skill/opencode-memory/src/tools/memory-tool.ts`
- Pattern: Zod schema + async executor

```typescript
const myTool = tool({
  description: "Tool description",
  args: z.object({ input: z.string() }),
  async execute(args, context) {
    return { success: true, data: result };
  },
});
```

### Hook (Plugin):

- Purpose: Event-driven callback
- Examples: `src/skill/opencode-memory/src/hooks/memory-*.ts`
- Pattern: Trigger name + async executor

```typescript
{
  name: "hook-name",
  trigger: "session.created",
  execute: async (input) => { return { success: true, context: "..." } }
}
```

### Reference Document:

- Purpose: Extended documentation loaded on demand
- Examples: `src/skill/opencode-mastery/references/*.mdx`
- Pattern: MDX files indexed by `registry.json`

## Entry Points

### Installation Entry:

- Location: `install.sh`
- Triggers: `./install.sh` or `bun run install`
- Responsibilities:
  - Download from GitHub
  - Copy skills to `~/.config/opencode/skill/`
  - Copy scripts to `~/.ai_docs/opencode/scripts/`
  - Copy commands to `~/.config/opencode/commands/`
  - Copy plugin to `~/.config/opencode/plugin/`
  - Download OpenCode docs
  - Build search index

### Skill Activation Entry:

- Location: `src/skill/*/SKILL.md`
- Triggers: Keyword matching in user query
- Responsibilities:
  - Declare purpose via description
  - Define workflow steps
  - Specify error handling
  - Link to references

### Plugin Entry:

- Location: `src/plugin/skill-creator.ts`, `src/skill/opencode-memory/src/index.ts`
- Triggers: OpenCode runtime loads plugins on startup
- Responsibilities:
  - Export plugin factory function
  - Register tools
  - Register hooks

## Error Handling

**Strategy:** Layered with escalation

**Patterns:**

- **Skills**: Declare error handling in SKILL.md, route to correct lane
- **Tools**: Return `{ success: false, error: "message" }` JSON
- **Scripts**: Exit codes + stderr, catch exceptions
- **Hooks**: Return `{ success: false, message: "..." }`

**Cross-Skill Routing:**

```
skill-creator → meta-agent (component choice questions)
skill-creator → opencode-mastery (docs-only Q&A)
meta-agent → skill-creator (skill lifecycle tasks)
```

## Cross-Cutting Concerns

**Logging:** Console output via print/echo, no structured logging

**Validation:**

- Zod schemas in TypeScript tools
- Argparse in Python scripts
- Path validation (no absolute paths, must be within project)

**Authentication:** None required (local-only system)

**Quality Gates:**

- `skill-creator-audit` validates SKILL.md quality
- `enforceQualityGate` option blocks regression
- Quality score based on structure completeness

---

_Architecture analysis: 2026-02-18_
