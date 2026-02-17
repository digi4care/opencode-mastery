---
name: opencode-mastery
description: Answer OpenCode questions about skills, agents, commands, plugins, tools, config, MCP/LSP, and troubleshooting. Use when users ask for OpenCode docs, setup, examples, or best practices. Do not trigger for general programming questions.
license: MIT
compatibility: opencode
metadata:
  author: user
  version: 1.4.1
  refresh: weekly
  paths:
    docs: ~/.ai_docs/opencode/docs
    memory: ~/.ai_docs/opencode/memory
    scripts: ~/.ai_docs/opencode/scripts
    references: src/skill/opencode-mastery/references
    skill_references: src/skill/opencode-memory
---

# OpenCode Mastery Skill

I answer OpenCode questions with verified sources from official docs, custom references, and GitHub research when needed.

## When to Use Me

Use me when:

- users ask OpenCode documentation or setup questions
- users ask for OpenCode concepts, examples, or best practices
- users need reference-backed answers about skills, plugins, tools, config, MCP, or LSP

Do not use me for:

- general programming questions unrelated to OpenCode
- framework-agnostic code help
- requests to create/optimize SKILL.md files (route to `skill-creator`)

## How I Work

- Extract keywords from your question.
- Search official docs and custom references.
- Lazy-load only the relevant sections.
- Use session memory for follow-ups.
- If not found, search GitHub and cite sources.
- If the user asks for skill lifecycle changes, route to `skill-creator`.

## Actions

Refresh docs (project):

```
uv sync
bun run download-docs
```

Refresh docs (global):

```
~/.ai_docs/opencode/scripts/download-docs.py --verbose
```

Rebuild index (project):

```
bun run build-index -- --rebuild
```

Rebuild index (global):

```
~/.ai_docs/opencode/scripts/index-builder.py --rebuild
```

Load custom docs:

```
bun run load-docs -- --query "keyword"
```

Session history:

```
.ai_docs/opencode/scripts/memory-manager.py --history
```

Search topic memory:

```
.ai_docs/opencode/scripts/memory-manager.py --topic <topic>
```

Search memory keywords:

```
.ai_docs/opencode/scripts/memory-manager.py --search <keyword1> <keyword2>
```

List custom references:

```
bun run load-docs -- --list
```

## Error Handling

- If docs are missing, say so and offer a refresh or GitHub search.
- If confidence is low, ask for confirmation before proceeding.
- If request is not docs/Q&A lane, reroute to the correct skill.

## Quick Tests

Should trigger:

- How do I create a skill in OpenCode?
- Show me the difference between skills and plugins.
- How do I configure MCP in OpenCode?

Should not trigger:

- How do I fix a Python import error?
- Explain React hooks.

Functional:

- Find the config option for custom LSP servers.
- "Create and optimize a new SKILL.md" -> route to `skill-creator`.

## References

- `src/skill/opencode-mastery/references/architecture-two-source.mdx`
- `src/skill/opencode-mastery/references/directory-structure.mdx`
- `src/skill/opencode-mastery/references/workflow-examples.mdx`
- `src/skill/opencode-mastery/references/memory-policy.mdx`
- `src/skill/opencode-mastery/references/plugins-deep-dive.mdx`
- `src/skill/opencode-mastery/references/tools-deep-dive.mdx`
- `src/skill/opencode-mastery/references/local-plugins.mdx`
- `src/skill/opencode-mastery/references/opencode-design-patterns.mdx`
- `src/skill/opencode-mastery/references/ace-framework.mdx`
- `src/skill/opencode-mastery/references/ace-rubric.mdx`
- `src/skill/opencode-mastery/references/ace-patterns.mdx`
- `src/skill/skill-creator/SKILL.md`

## Workflow

1. Identify question scope
2. If request is skill create/audit/optimize, hand off to `skill-creator`
3. Load relevant docs
4. Answer with sources
5. Offer next steps
