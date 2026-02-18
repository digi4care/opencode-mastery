# OpenClaw Memory Implementation Plan

**Status:** Draft  
**Created:** 2026-02-18  
**Source:** OpenClaw repo analysis + existing opencode-memory skill

---

## Gap Analysis: Huidig vs. OpenClaw

| Component      | Huidige             | OpenClaw                                 | Gap             |
| -------------- | ------------------- | ---------------------------------------- | --------------- |
| **Storage**    | Markdown files      | SQLite + sqlite-vec                      | 🔴 groot        |
| **Search**     | Keyword (line scan) | Hybrid (vector + FTS5/BM25)              | 🔴 groot        |
| **Chunking**   | Geen                | 400 tokens, 80 overlap, line-aware       | 🔴 groot        |
| **Embeddings** | Geen                | Local/OpenAI/Gemini/Voyage (auto-select) | 🔴 groot        |
| **Fusion**     | Geen                | Weighted (0.7 vector + 0.3 text)         | 🔴 groot        |
| **Indexering** | Geen                | Incremental sync + file watcher          | 🟡 medium       |
| **Reranking**  | Geen                | MMR (diversity) + temporal decay         | 🟢 nice-to-have |
| **Tools**      | Single tool         | memory_search + memory_get               | 🟡 medium       |

---

## Gefaseerd Implementatieplan

### Fase 1: Foundation (Core Storage & Schema) ⏱️ 2-3 dagen

**Doel**: SQLite foundation klaar voor vector search

```
src/skill/opencode-memory/
├── src/
│   ├── storage/
│   │   ├── schema.ts          # SQLite schema (files, chunks, cache)
│   │   ├── manager.ts         # Database connection & lifecycle
│   │   └── migrations.ts      # Schema versioning
│   ├── chunking/
│   │   └── markdown.ts        # Line-aware chunking (400/80)
│   └── index.ts
```

**Deliverables**:

1. SQLite database met schema:
   - `files` (path, source, hash, mtime)
   - `chunks` (id, path, start_line, end_line, text, hash)
   - `embedding_cache` (provider, model, hash, embedding)
2. Line-aware chunking (400 tokens, 80 overlap)
3. Incremental file sync (hash-based, alleen gewijzigde files)

**Test criteria**:

```bash
# Na fase 1:
uv run scripts/test_phase1.py
# - Database created
# - Chunks created with correct line numbers
# - Sync only updates changed files
```

---

### Fase 2: FTS5 Keyword Search ⏱️ 1-2 dagen

**Doel**: Snelle keyword search met BM25 ranking

```sql
-- storage/schema.ts - add FTS table
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
  text, id UNINDEXED, path UNINDEXED, start_line UNINDEXED
)
```

**Deliverables**:

1. FTS5 virtual table voor full-text search
2. BM25 ranking → score conversion (`1 / (1 + rank)`)
3. Query expansion (tokenization, quoting)
4. Source filtering (memory vs sessions)

**Test criteria**:

```bash
uv run scripts/test_phase2.py
# - FTS search works
# - BM25 scores in [0,1]
# - Source filtering works
```

---

### Fase 3: Embeddings & Vector Search ⏱️ 3-4 dagen

**Doel**: Semantic search met auto-provider selectie

```
src/skill/opencode-memory/
├── src/
│   ├── embeddings/
│   │   ├── provider.ts        # Interface & auto-select
│   │   ├── local.ts           # node-llama-cpp (optional)
│   │   ├── openai.ts          # text-embedding-3-small
│   │   └── gemini.ts          # gemini-embedding-001
│   └── storage/
│       └── sqlite-vec.ts      # Vector extension loader
```

**Deliverables**:

1. Embedding provider interface
2. Auto-selection: `local → openai → gemini`
3. Batch embedding met caching
4. sqlite-vec extension loading
5. Vector search via `vec_distance_cosine()`
6. Fallback naar in-memory cosine similarity

**Config schema**:

```yaml
memory:
  embeddings:
    provider: auto # auto | local | openai | gemini
    model: null # null = default for provider
    batchSize: 100
  cache:
    enabled: true
    maxEntries: 10000
```

**Test criteria**:

```bash
uv run scripts/test_phase3.py
# - Provider auto-select works
# - Embeddings cached
# - Vector search returns semantic matches
```

---

### Fase 4: Hybrid Fusion ⏱️ 1-2 dagen

**Doel**: Beste van beide werelden

```typescript
// search/fusion.ts
function mergeHybridResults({
  vector,
  keyword,
  vectorWeight = 0.7,
  textWeight = 0.3,
}): SearchResult[] {
  // Merge by chunk ID
  // Score = vectorWeight * vScore + textWeight * kScore
}
```

**Deliverables**:

1. Hybrid search pipeline (parallel vector + keyword)
2. Weighted fusion scoring
3. Configurable weights (0.7/0.3 default)
4. Candidate multiplier (4x) + min score threshold (0.35)

**Test criteria**:

```bash
uv run scripts/test_phase4.py
# - Hybrid scores blend vector + keyword
# - Candidate multiplier works
# - Min score threshold filters
```

---

### Fase 5: Tools & CLI Update ⏱️ 1-2 dagen

**Doel**: Agent-ready memory tools

```typescript
// tools/memory-search.ts
export const memorySearchTool = tool(
  z.object({
    query: z.string().min(1),
    maxResults: z.number().default(10),
    minScore: z.number().default(0.35),
  }),
  async ({ query, maxResults, minScore }) => {
    // Hybrid search
    // Return { results, provider, model, mode: 'hybrid'|'fts-only' }
  },
).describe("Mandatory recall: semantically search memory");

// tools/memory-get.ts
export const memoryGetTool = tool(
  z.object({
    path: z.string(),
    from: z.number().optional(),
    lines: z.number().optional(),
  }),
  async ({ path, from, lines }) => {
    // Safe snippet read with citations
  },
).describe("Read specific memory snippet after search");
```

**Deliverables**:

1. `memory_search` tool (hybrid search)
2. `memory_get` tool (safe snippet read)
3. Citation format: `path#Lstart-Lend`
4. Updated CLI commands
5. FTS-only fallback mode

---

### Fase 6: Nice-to-Have (MMR, Temporal) ⏱️ 1 dag

**Doel**: Advanced re-ranking

```
src/skill/opencode-memory/
├── src/
│   └── reranking/
│       ├── mmr.ts             # Maximal Marginal Relevance
│       └── temporal.ts        # Recency decay
```

**Deliverables**:

1. MMR re-ranking (λ=0.7, diversity)
2. Temporal decay (optional)
3. Config flags

---

## Bestandsstructuur (Final)

```
src/skill/opencode-memory/
├── SKILL.md
├── src/
│   ├── index.ts               # Exports
│   ├── storage/
│   │   ├── schema.ts          # SQLite schema
│   │   ├── manager.ts         # DB lifecycle
│   │   ├── sqlite-vec.ts      # Vector extension
│   │   └── migrations.ts      # Schema versioning
│   ├── chunking/
│   │   └── markdown.ts        # Line-aware chunking
│   ├── embeddings/
│   │   ├── provider.ts        # Interface & factory
│   │   ├── local.ts           # Ollama/node-llama-cpp
│   │   ├── openai.ts          # OpenAI
│   │   └── gemini.ts          # Gemini
│   ├── search/
│   │   ├── hybrid.ts          # Fusion scoring
│   │   ├── keyword.ts         # FTS5/BM25
│   │   └── vector.ts          # Cosine similarity
│   ├── reranking/
│   │   ├── mmr.ts             # Diversity
│   │   └── temporal.ts        # Recency
│   ├── sync/
│   │   ├── watcher.ts         # File watcher
│   │   └── indexer.ts         # Incremental sync
│   └── tools/
│       ├── memory-search.ts   # Agent tool
│       └── memory-get.ts      # Agent tool
├── tests/
│   ├── test_chunking.py
│   ├── test_embeddings.py
│   ├── test_hybrid.py
│   └── test_integration.py
└── scripts/
    ├── migrate.py             # One-time migration
    └── benchmark.py           # Performance tests
```

---

## Dependencies

```json
{
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "sqlite-vec": "^0.1.0"
  },
  "optionalDependencies": {
    "node-llama-cpp": "^3.0.0"
  }
}
```

```toml
# pyproject.toml
[project]
dependencies = [
    "sqlite-vec>=0.1.0",
]
```

---

## Risico's & Mitigaties

| Risico                                  | Impact    | Mitigatie                                |
| --------------------------------------- | --------- | ---------------------------------------- |
| sqlite-vec niet beschikbaar op platform | 🔴 hoog   | Fallback naar FTS-only mode              |
| Embedding API costs                     | 🟡 medium | Local provider first, caching            |
| Migratie van bestaande .memory.md       | 🟡 medium | Eenmalige sync, data blijft leesbaar     |
| Performance bij grote memory            | 🟡 medium | Chunking, indexing, candidate multiplier |

---

## OpenClaw Reference Implementation

### Key Files (from /tmp/openclaw/src/memory/)

| File                | Purpose                                                         |
| ------------------- | --------------------------------------------------------------- |
| `types.ts`          | Interfaces: MemorySearchResult, MemoryProviderStatus            |
| `memory-schema.ts`  | SQLite schema: meta, files, chunks, embedding_cache, chunks_fts |
| `hybrid.ts`         | BM25 scoring, fusion merge, query tokenization                  |
| `manager.ts`        | Main MemoryIndexManager class                                   |
| `embeddings.ts`     | Provider interface, auto-selection logic                        |
| `manager-search.ts` | Vector + keyword search implementation                          |
| `internal.ts`       | Chunking, cosine similarity, hashing                            |
| `mmr.ts`            | Maximal Marginal Relevance re-ranking                           |

### Key Constants

```typescript
// Chunking
DEFAULT_CHUNK_TOKENS = 400;
DEFAULT_CHUNK_OVERLAP = 80;

// Search
DEFAULT_MIN_SCORE = 0.35;
DEFAULT_HYBRID_CANDIDATE_MULTIPLIER = 4;

// Fusion (typical)
vectorWeight = 0.7;
textWeight = 0.3;

// MMR
DEFAULT_MMR_LAMBDA = 0.7; // 0=max diversity, 1=max relevance

// Sync
DEFAULT_WATCH_DEBOUNCE_MS = 1500;
```

### SQLite Schema (simplified)

```sql
-- Files table
CREATE TABLE files (
  path TEXT PRIMARY KEY,
  source TEXT NOT NULL,  -- 'memory' | 'sessions'
  hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,
  size INTEGER NOT NULL
);

-- Chunks table
CREATE TABLE chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  source TEXT NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  hash TEXT NOT NULL,
  model TEXT,
  text TEXT NOT NULL,
  embedding BLOB,  -- via sqlite-vec
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

-- Embedding cache
CREATE TABLE embedding_cache (
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  provider_key TEXT NOT NULL,
  hash TEXT NOT NULL,
  embedding BLOB NOT NULL,
  dims INTEGER NOT NULL,
  PRIMARY KEY (provider, model, provider_key, hash)
);

-- FTS5 virtual table
CREATE VIRTUAL TABLE chunks_fts USING fts5(
  text,
  id UNINDEXED,
  path UNINDEXED,
  source UNINDEXED,
  model UNINDEXED,
  start_line UNINDEXED,
  end_line UNINDEXED
);
```

---

## Next Steps

1. **Fase 1 beginnen** (storage & schema)
2. **Prototype maken** (minimal viable hybrid search)
3. **Tech spike** (sqlite-vec testen op systeem)

---

## Notes

- Dit plan is gebaseerd op de OpenClaw repo (geanalyseerd op 2026-02-18)
- De transcript "How AI Agents Search Their Memory" is 100% accuraat gebleken
- Alle code voorbeelden zijn geverifieerd in de OpenClaw codebase
