# OpenCode Memory Ecosystem

## What This Is

Volledige implementatie van OpenClaw's memory systeem, geconverteerd naar native OpenCode SDK patterns (Plugins, Tools, Hooks, Commands, Skills). De LLM onthoudt ALTIJD wat je gedaan hebt via semantic search met SQLite + embeddings + hybrid fusion.

**Kernprincipe:** Letterlijk OpenClaw, maar dan in OpenCode native patterns.

## Core Value

> **LLM onthoudt alles - semantic search over MEMORY.md met SQLite embeddings index**

Elke nieuwe sessie kan de LLM terugvinden wat eerder besproken is, beslissingen die genomen zijn, preferences die je hebt.

## Requirements

### Validated

(Bestaande opencode-memory skill - wordt geïntegreerd)

- ✓ .memory.md als mens-leesbaar bronbestand
- ✓ .memory/daily/ voor dagelijkse logs
- ✓ .memory/snapshots/ voor session recovery
- ✓ Session hooks (created, deleted, compacting)
- ✓ /memory, /remember commands

### Active

**Fase 1: Core Storage**

- [ ] SQLite schema (exact OpenClaw: meta, files, chunks, embedding_cache, chunks_fts)
- [ ] MemoryManager class (port van /tmp/openclaw/src/memory/manager.ts)
- [ ] Line-aware chunking (400 tokens, 80 overlap)
- [ ] File sync (detect changes, incremental updates)

**Fase 2: Search**

- [ ] FTS5 keyword search met BM25 scoring
- [ ] sqlite-vec vector search
- [ ] Hybrid fusion (0.7 vector + 0.3 keyword weight)
- [ ] MMR reranking optioneel

**Fase 3: Embeddings**

- [ ] Provider interface (embedQuery, embedBatch)
- [ ] OpenAI provider (text-embedding-3-small)
- [ ] Gemini provider (gemini-embedding-001)
- [ ] Local provider (node-llama-cpp)
- [ ] Voyage provider
- [ ] Auto-selection (local → openai → gemini → voyage)

**Fase 4: Plugin & Tools**

- [ ] memory_search tool (hybrid search met citations)
- [ ] memory_get tool (safe snippet read)
- [ ] memory_sync tool (force reindex)
- [ ] memory_status tool (health check)

**Fase 5: Hooks**

- [ ] session.created (bootstrap memory)
- [ ] session.deleted (save snapshot)
- [ ] file.edited (auto-reindex memory files)
- [ ] experimental.session.compacting (extract to daily log)
- [ ] tool.execute.before (intent detection)

**Fase 6: Commands & Skills**

- [ ] /memory command (status, on, off, sync, compact)
- [ ] /remember command (quick add)
- [ ] /recall command (quick search)
- [ ] /forget command (remove entry)
- [ ] Memory skill (usage patterns, best practices)

**Fase 7: Unieke Toevoegingen**

- [ ] LLM intent detection (auto-suggest /remember of /recall)
- [ ] Enhanced snapshot system (bestaande uitbreiden)
- [ ] Multi-language support (en, nl, de, fr, es)

**Fase 8: Documentatie**

- [ ] docs/MEMORY_USAGE.md (complete gebruikersdocumentatie)
  - Installatie en setup
  - Config opties
  - Embedding providers kiezen
  - Commands gebruiken
  - Troubleshooting
  - Best practices

### Out of Scope

- Real-time sync tussen machines (toekomstig)
- Memory sharing tussen projects (privacy concerns)
- Web UI voor memory management (niet nodig)

## Context

**Bestaande codebase:**

- opencode-mastery skill met documentatie lookup
- opencode-memory skill met basic memory (.memory.md)
- Plugin systeem met TypeScript tools
- Skill-creator voor nieuwe skills

**OpenClaw broncode:**

- `/tmp/openclaw/src/memory/` - volledige implementatie
  - manager.ts (21KB) - MemoryIndexManager
  - manager-sync-ops.ts (38KB) - Sync operations
  - manager-embedding-ops.ts (26KB) - Embedding operations
  - hybrid.ts (4KB) - Fusion scoring
  - mmr.ts (6KB) - MMR reranking
  - embeddings-\*.ts - Alle providers
  - memory-schema.ts - SQLite schema
  - sqlite-vec.ts - Vector extension

**Waarom dit project:**

- Bestaande opencode-memory is basic (plain text)
- OpenClaw heeft bewezen hybrid search
- Semantic search is game-changer voor context
- "Uitbreiden" aanpak = backward compatible

## Constraints

- **Tech Stack:** TypeScript, better-sqlite3, sqlite-vec, Zod
- **Backward Compatible:** .memory.md blijft werken
- **Bron:** Port exact van /tmp/openclaw/src/memory/
- **OpenCode Native:** Plugin tools/hooks, commands, skills

## Key Decisions

| Decision                 | Rationale                                       | Outcome   |
| ------------------------ | ----------------------------------------------- | --------- |
| Uitbreiden ipv vervangen | Backward compatible, bestaande .memory.md users | — Pending |
| SQLite + sqlite-vec      | OpenClaw gebruikt dit, bewezen performance      | — Pending |
| Hybrid search (0.7/0.3)  | Semantic belangrijker dan keyword               | — Pending |
| Auto-select embeddings   | Local → API, graceful degradation               | — Pending |
| Line-aware chunking      | Accurate citations mogelijk                     | — Pending |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    OPENCODE MEMORY ECOSYSTEM                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  PLUGINS    │    │  COMMANDS   │    │   SKILLS    │         │
│  │             │    │             │    │             │         │
│  │ • memory    │    │ • /memory   │    │ • usage     │         │
│  │ • search    │    │ • /remember │    │ • patterns  │         │
│  │ • sync      │    │ • /recall   │    │ • best      │         │
│  │ • intent    │    │ • /forget   │    │   practices │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│         │                  │                  │                 │
│         └──────────────────┼──────────────────┘                 │
│                            │                                    │
│                            ▼                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    CORE MEMORY PLUGIN                    │   │
│  │                                                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │  │   TOOLS    │  │   HOOKS    │  │   CONFIG   │         │   │
│  │  │            │  │            │  │            │         │   │
│  │  │ search     │  │ session.*  │  │ embedding  │         │   │
│  │  │ get        │  │ file.*     │  │ search     │         │   │
│  │  │ sync       │  │ tool.*     │  │ storage    │         │   │
│  │  │ status     │  │            │  │            │         │   │
│  │  └────────────┘  └────────────┘  └────────────┘         │   │
│  │                          │                               │   │
│  │                          ▼                               │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │              STORAGE LAYER                       │    │   │
│  │  │                                                  │    │   │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │    │   │
│  │  │  │ SQLite   │  │ sqlite-  │  │  FTS5    │      │    │   │
│  │  │  │ (core)   │  │ vec      │  │ (BM25)   │      │    │   │
│  │  │  └──────────┘  └──────────┘  └──────────┘      │    │   │
│  │  │                                                  │    │   │
│  │  │  Tables: meta, files, chunks, embedding_cache,  │    │   │
│  │  │          chunks_fts (virtual)                   │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              UNIQUE ADDITIONS                            │   │
│  │                                                          │   │
│  │  • LLM Intent Detection (🧠 NEW!)                       │   │
│  │  • Snapshot System (📸 ENHANCED)                        │   │
│  │  • Multi-language Support (🌍 NEW!)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
src/plugin/memory/
├── index.ts                    # Main plugin export
├── storage/
│   ├── schema.ts               # SQLite schema (from OpenClaw)
│   ├── manager.ts              # MemoryIndexManager (from OpenClaw)
│   ├── sqlite-vec.ts           # Vector extension (from OpenClaw)
│   ├── snapshots.ts            # Snapshot system (enhanced)
│   └── migrations.ts           # Schema migrations
├── search/
│   ├── hybrid.ts               # Fusion scoring (from OpenClaw)
│   ├── keyword.ts              # FTS5/BM25 (from OpenClaw)
│   ├── vector.ts               # Cosine similarity (from OpenClaw)
│   ├── mmr.ts                  # MMR reranking (from OpenClaw)
│   └── temporal.ts             # Temporal decay (from OpenClaw)
├── embeddings/
│   ├── provider.ts             # Interface & factory (from OpenClaw)
│   ├── local.ts                # node-llama-cpp (from OpenClaw)
│   ├── openai.ts               # OpenAI (from OpenClaw)
│   ├── gemini.ts               # Gemini (from OpenClaw)
│   └── voyage.ts               # Voyage (from OpenClaw)
├── chunking/
│   └── markdown.ts             # Line-aware chunking (from OpenClaw)
├── hooks/
│   ├── intent.ts               # LLM intent detection (NEW)
│   ├── bootstrap.ts            # Session bootstrap
│   ├── compaction.ts           # Context compaction
│   └── sync.ts                 # File watching
├── tools/
│   ├── memory-search.ts        # memory_search tool
│   ├── memory-get.ts           # memory_get tool
│   ├── memory-sync.ts          # memory_sync tool
│   └── memory-status.ts        # memory_status tool
└── types.ts                    # TypeScript types (from OpenClaw)

.opencode/
├── commands/
│   ├── memory.md               # /memory command
│   ├── remember.md             # /remember command
│   ├── recall.md               # /recall command
│   └── forget.md               # /forget command
└── skills/
    └── memory/
        └── SKILL.md            # Memory usage skill

docs/
└── MEMORY_USAGE.md             # Complete user documentation

tests/
├── test_schema.py
├── test_chunking.py
├── test_embeddings.py
├── test_hybrid.py
├── test_intent.py
└── test_integration.py
```

## Dependencies

```json
{
  "dependencies": {
    "@opencode-ai/plugin": "^1.0.0",
    "better-sqlite3": "^11.0.0",
    "sqlite-vec": "^0.1.0",
    "zod": "^3.0.0",
    "openai": "^4.0.0",
    "@google/generative-ai": "^0.21.0"
  },
  "optionalDependencies": {
    "node-llama-cpp": "^3.0.0"
  }
}
```

## References

| Bron                     | Locatie                                                  |
| ------------------------ | -------------------------------------------------------- |
| OpenClaw Memory Module   | `/tmp/openclaw/src/memory/`                              |
| OpenClaw Memory Tools    | `/tmp/openclaw/src/agents/tools/memory-tool.ts`          |
| Architecture Doc         | `ai_docs/memory/openclaw-opencode-ultra-architecture.md` |
| OpenCode Plugin SDK      | `docs/opencode/plugins.md`                               |
| Existing opencode-memory | `src/skill/opencode-memory/`                             |

---

_Last updated: 2025-02-18 after initialization_
