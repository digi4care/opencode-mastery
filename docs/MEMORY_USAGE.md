# Memory System Usage Guide

This guide explains how to install, operate, configure, and troubleshoot the OpenCode memory workflow.

If you want a shorter overview, see `src/skill/opencode-memory/SKILL.md`.

## Installation

### Prerequisites

- OpenCode installed and running.
- A project repository where you can store `MEMORY.md` and `.memory/` artifacts.
- Optional API key for cloud embeddings:
  - `OPENAI_API_KEY`
  - `GEMINI_API_KEY`
  - `VOYAGE_API_KEY`

### Is memory enabled by default?

Yes. In this repo, memory defaults are defined in `opencode.config.yaml` under `features.memory`.

Key defaults:

- `features.memory.enabled: true`
- `features.memory.embeddings.provider: auto`
- `features.memory.search.hybrid.enabled: true`

### Quick verification

Run:

```text
/memory status
```

Expected output pattern:

```text
Memory Status
-------------
Enabled: yes
Memory file: found
Index status: healthy
Chunks indexed: <number>
Embeddings: <provider or unavailable>
```

If memory is disabled, use:

```text
/memory enable
```

## Quick Start

Use these three commands first, in this order.

```text
# 1. Store your first memory
/remember "This project uses TypeScript with strict mode enabled"

# 2. Search your memory
/recall "TypeScript"

# 3. Check system health
/memory status
```

Expected outcomes:

```text
/remember -> [OK] Memory stored with category=context, priority=medium
/recall   -> One or more citation lines with score and preview
/status   -> Current health, indexing, and provider details
```

Jump to details:

- `/memory` details: [Commands Reference](#commands-reference)
- `/remember` details: [Commands Reference](#commands-reference)
- `/recall` details: [Commands Reference](#commands-reference)
- `/forget` details: [Commands Reference](#commands-reference)

Command templates used by this project:

- `.opencode/commands/memory.md`
- `.opencode/commands/remember.md`
- `.opencode/commands/recall.md`
- `.opencode/commands/forget.md`

## Commands Reference

### /memory

Syntax:

```text
/memory <action> [options]
```

Actions:

- `status`
- `sync`
- `compact`
- `enable`
- `disable`

Flags:

- `--json` for machine-readable output (primarily with `status`)
- `--force` for forced sync behavior
- `--verbose` for detailed sync info

Examples with expected output:

```text
/memory status
-> Memory Status
-> Enabled: yes
-> Chunks indexed: 247
```

```text
/memory status --json
-> {"success":true,"data":{"enabled":true,"chunks":247,...}}
```

```text
/memory sync
-> [OK] Synced 3 files, 47 chunks
```

```text
/memory sync --force --verbose
-> [OK] Full reindex completed
-> Files processed: 3
-> Chunks written: 47
-> Cache updates: 47
```

```text
/memory compact
-> [OK] Memory compaction complete
```

```text
/memory disable
-> [OK] Memory disabled for this project
```

```text
/memory enable
-> [OK] Memory enabled for this project
```

### /remember

Syntax:

```text
/remember <content> [--category <type>] [--priority <level>]
```

Categories:

- `preference`
- `pattern`
- `correction`
- `context`
- `decision`

Priorities:

- `high`
- `medium`
- `low`

Examples with expected output:

```text
/remember "Use Bun for package management" --category decision --priority high
-> [OK] Remembered: "Use Bun for package management" [decision, high]
```

```text
/remember "Use semantic search before asking repeated setup questions"
-> [OK] Remembered: "Use semantic search before asking repeated setup questions" [context, medium]
```

```text
/remember
-> Usage: /remember <content> [--category <type>] [--priority <level>]
```

### /recall

Syntax:

```text
/recall <query> [--max <n>] [--min-score <0-1>] [--source <type>]
```

Source types:

- `memory`
- `sessions`
- `all`

Output format:

```text
<citation> (<score>): "<preview up to 80 chars>"
```

Examples with expected output:

```text
/recall "auth provider"
-> MEMORY.md#L45-L52 (0.87): "Use provider lock per session to keep embedding dimensions consistent..."
-> MEMORY.md#L83-L90 (0.71): "OpenAI fallback after local provider when local is unavailable..."
```

```text
/recall "chunking" --max 5 --min-score 0.40 --source memory
-> 5 results from MEMORY.md with relevance >= 0.40
```

```text
/recall "something very narrow" --min-score 0.95
-> No strong matches found. Try broader terms or lower --min-score.
```

Search tips:

- Use specific technical nouns first (module names, flags, decisions).
- Lower `--min-score` if results are too sparse.
- Use `--source all` when unsure where the memory was saved.

### /forget

Syntax:

```text
/forget <query> [--force]
```

Confirmation flow:

1. Command searches matching candidates.
2. Command presents numbered results with citation, score, preview.
3. You confirm selection, unless `--force` is provided.

Safety behavior:

- Without `--force`, no deletion occurs until confirmed.
- With `--force`, the highest scoring match is removed.
- Entire files are never deleted by this command.

Examples with expected output:

```text
/forget "deprecated Redis note"
-> Found 2 matches:
-> 1. MEMORY.md#L120-L124 (0.82): "Deprecated Redis setup from early prototype..."
-> 2. MEMORY.md#L188-L191 (0.63): "Old Redis benchmark notes..."
-> Which entry should be deleted? (1-2, or 'cancel')
```

```text
/forget "deprecated Redis note" --force
-> [OK] Removed entry from MEMORY.md#L120-L124
```

```text
/forget "nonexistent item"
-> No matches found. Try broader keywords or lower score constraints.
```

## Configuration

Memory configuration lives in `opencode.config.yaml`.

Primary section:

```yaml
features:
  memory:
    enabled: true
    embeddings:
      provider: auto
      model: null
      batchSize: 100
    search:
      hybrid:
        enabled: true
        vectorWeight: 0.7
        textWeight: 0.3
      minScore: 0.35
      maxResults: 10
    storage:
      vector:
        enabled: true
      cache:
        enabled: true
        maxEntries: 10000
```

Important keys:

- `embeddings.provider`: `auto | local | openai | gemini | voyage`
- `embeddings.model`: explicit model override or `null`
- `search.hybrid.enabled`: combine vector + keyword search
- `search.hybrid.vectorWeight`: semantic ranking weight
- `search.hybrid.textWeight`: keyword ranking weight
- `storage.vector.enabled`: toggles vector index usage
- `storage.cache.enabled`: toggles embedding/result cache

### Example: OpenAI cloud setup

```yaml
features:
  memory:
    embeddings:
      provider: openai
      model: text-embedding-3-small
      batchSize: 100
```

Environment variable:

```text
OPENAI_API_KEY=sk-...
```

### Example: Local offline setup

```yaml
features:
  memory:
    embeddings:
      provider: local
      model: null
      batchSize: 64
```

No cloud API key required.

### Example: Auto mode (recommended default)

```yaml
features:
  memory:
    embeddings:
      provider: auto
      model: null
      priority: [local, openai, gemini, voyage]
```

Auto mode picks the first available provider in priority order.

## Providers

### OpenAI

- Typical model: `text-embedding-3-small`
- Requires: `OPENAI_API_KEY`
- Best when you want high quality cloud embeddings with minimal setup.

### Gemini

- Typical model: `text-embedding-004`
- Requires: `GEMINI_API_KEY`
- Useful if your stack already uses Google AI services.

### Voyage

- Typical model: `voyage-3`
- Requires: `VOYAGE_API_KEY`
- Strong option for high-quality multilingual semantic retrieval.

### Local

- Uses local sentence-transformers compatible runtime.
- Requires no cloud API key.
- Best for offline work, private environments, and zero external API dependencies.

### Auto

- Resolution order: local -> openai -> gemini -> voyage.
- Best default for resilient behavior across environments.

When to choose which:

- Prefer `local` for privacy/offline constraints.
- Prefer `openai` for predictable cloud quality.
- Prefer `gemini` or `voyage` for provider alignment with your stack.
- Prefer `auto` for safest general-purpose default.

## Troubleshooting

### Diagnostic Decision Tree

```text
Memory not saving?
|- Check: /memory status (is enabled?)
|- Check: MEMORY.md exists in project root?
`- Check: file permissions for MEMORY.md and .memory/

Search returning nothing?
|- Check: /memory status (embeddings available?)
|- Try: /memory sync --force (rebuild index)
`- Try: /recall "different keywords" --min-score 0.25

Embeddings failing?
|- Check: API key in environment
|- Try: set provider to local
`- Check: network connectivity and provider quota

Database errors?
|- Check: available disk space
|- Check: write permissions in project directory
`- Recovery: remove .memory/memory.db, run /memory sync
```

### Common Issues

1. "No memory files found"
   - Cause: `MEMORY.md` not created yet.
   - Fix: create `MEMORY.md` in project root, then run `/memory sync`.

2. "Database temporarily locked"
   - Cause: concurrent write/read operation.
   - Fix: wait briefly and retry `/memory sync`.

3. "Embeddings unavailable"
   - Cause: provider not configured or API key missing.
   - Fix: set API key or switch to `embeddings.provider: local`.

4. "Recall returns weak results"
   - Cause: memory entries are too generic.
   - Fix: rewrite important entries with concrete terms and context.

5. "Unexpectedly low result count"
   - Cause: threshold too high.
   - Fix: lower `--min-score` and increase `--max`.

6. "Status says memory disabled"
   - Cause: config changed or disabled previously.
   - Fix: run `/memory enable` and verify config in `opencode.config.yaml`.

7. "Sync succeeds but recall still stale"
   - Cause: cached vectors from older content or major edits.
   - Fix: run `/memory sync --force`.

8. "Permission denied while syncing"
   - Cause: filesystem permission restrictions.
   - Fix: ensure write access to project folder and `.memory/`.

## Best Practices

### Writing Effective Memories

- Be specific and contextual.
- Include technical details that improve future retrieval.
- Keep each entry focused on one key fact/decision.

Good example:

```text
Use memory_search as shared backend for /recall and /forget to keep scoring and source filtering consistent.
```

Weak example:

```text
Search improved.
```

### Organization

- Use categories intentionally:
  - `decision` for architecture and tradeoffs
  - `pattern` for repeatable implementation style
  - `correction` for bugs and fixes
  - `preference` for user/team constraints
  - `context` for project facts
- Use priorities sparingly:
  - `high` for critical, long-lived constraints
  - `medium` for normal engineering context
  - `low` for temporary reminders
- Compact when entries become repetitive or stale.

### Workflow Examples

Solo developer workflow:

1. Start day with `/memory status`.
2. Save important decisions using `/remember`.
3. Retrieve prior context with `/recall` before major edits.
4. End week with `/memory compact`.

Team project workflow:

1. Record team decisions as `decision` memories.
2. Record coding conventions as `pattern` memories.
3. During onboarding, use `/recall` for architecture and standards.
4. Remove obsolete notes with `/forget` after agreement.

Learning and documentation workflow:

1. Save findings from experiments with `/remember --category context`.
2. Tag stable techniques as `pattern`.
3. Convert important recurring entries into docs after validation.

---

For implementation-level command behavior, inspect:

- `.opencode/commands/memory.md`
- `.opencode/commands/remember.md`
- `.opencode/commands/recall.md`
- `.opencode/commands/forget.md`

For runtime configuration schema, inspect:

- `src/lib/config/schema.ts`
- `opencode.config.yaml`
