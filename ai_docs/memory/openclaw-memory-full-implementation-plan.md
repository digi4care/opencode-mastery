# OpenClaw Memory: Full Implementation Plan

**Status:** Final
**Created:** 2026-02-18
**Source:** OpenClaw repo (letterlijk) + opencode-memory verbeteringen

---

## Doel

**Letterlijk OpenClaw memory systeem**, maar dan:

1. In OpenCode plugin/skill structuur
2. Met jouw unieke verbeteringen geïntegreerd
3. Conform project conventies (Bun, pytest, etc.)

---

## Jouw Verbeteringen Boven OpenClaw

Deze features behouden omdat ze OpenClaw **verbeteren**:

| Feature                    | Waarom Het Waarde Toevoegt                                      |
| -------------------------- | --------------------------------------------------------------- |
| **LLM Intent Detection**   | OpenClaw heeft dit niet. Proactieve memory suggestions via LLM. |
| **Multi-language Support** | en/nl/de/fr/es intent detection. OpenClaw is EN-only.           |
| **Snapshot System**        | Session recovery. OpenClaw heeft geen snapshots.                |

---

## Architecture Overview

```
src/skill/opencode-memory/
├── SKILL.md                           # Skill definition
├── src/
│   ├── index.ts                       # Plugin export (OpenCode pattern)
│   │
│   │  # === OPENCLAW CORE (letterlijk) ===
│   │
│   ├── memory/                        # OpenClaw memory module
│   │   ├── types.ts                   # Interfaces (exact uit OpenClaw)
│   │   ├── schema.ts                  # SQLite schema (exact)
│   │   ├── manager.ts                 # MemoryIndexManager (exact)
│   │   ├── manager-search.ts          # Search implementation (exact)
│   │   ├── hybrid.ts                  # BM25 + fusion (exact)
│   │   ├── internal.ts                # Chunking, hashing, cosine (exact)
│   │   ├── mmr.ts                     # MMR re-ranking (exact)
│   │   ├── temporal.ts                # Temporal decay (exact)
│   │   └── sqlite-vec.ts              # Vector extension loader (exact)
│   │
│   ├── embeddings/                    # Embedding providers (exact uit OpenClaw)
│   │   ├── index.ts                   # Factory + auto-select
│   │   ├── types.ts                   # Provider interface
│   │   ├── local.ts                   # node-llama-cpp (optional)
│   │   ├── openai.ts                  # text-embedding-3-small
│   │   ├── gemini.ts                  # gemini-embedding-001
│   │   └── voyage.ts                  # voyage-4-large
│   │
│   ├── sync/                          # File sync & watching (exact)
│   │   ├── watcher.ts                 # File watcher
│   │   ├── indexer.ts                 # Incremental indexing
│   │   └── session-listener.ts        # Session delta tracking
│   │
│   │  # === OPENCLAW TOOLS (exact) ===
│   │
│   ├── tools/
│   │   ├── memory-search.ts           # memory_search tool (exact)
│   │   └── memory-get.ts              # memory_get tool (exact)
│   │
│   │  # === JOUW VERBETERINGEN ===
│   │
│   ├── enhancements/
│   │   ├── intent-detector.ts         # LLM-powered intent detection
│   │   ├── snapshot-manager.ts        # Session snapshots
│   │   └── i18n.ts                    # Multi-language support
│   │
│   │  # === OPENCODE HOOKS ===
│   │
│   └── hooks/
│       ├── bootstrap.ts               # session.created → load memory
│       ├── search.ts                  # tool.execute.before → intent detect
│       └── snapshot.ts                # session.deleted → save snapshot
│
├── tests/
│   ├── memory/                        # Tests voor OpenClaw core
│   │   ├── test_chunking.py
│   │   ├── test_embeddings.py
│   │   ├── test_hybrid.py
│   │   └── test_mmr.py
│   └── enhancements/                  # Tests voor jouw verbeteringen
│       ├── test_intent.py
│       └── test_snapshot.py
│
└── scripts/
    ├── migrate.py                     # Migrate existing .memory.md
    └── benchmark.py                   # Performance tests
```

---

## OpenClaw Core (Exacte Implementatie)

### 1. Types (`memory/types.ts`)

```typescript
// EXACT UIT OPENCLAW
export interface MemorySearchResult {
  path: string;
  startLine: number;
  endLine: number;
  score: number;
  snippet: string;
  source: "memory" | "sessions";
  citation?: string;
}

export interface MemoryProviderStatus {
  backend: "builtin" | "qmd";
  provider: string;
  model?: string;
  files?: number;
  chunks?: number;
  dirty?: boolean;
  vector?: {
    enabled: boolean;
    available: boolean;
    dims?: number;
    loadError?: string;
  };
  fts?: {
    enabled: boolean;
    available: boolean;
    error?: string;
  };
  cache?: {
    enabled: boolean;
    entries: number;
    maxEntries: number;
  };
  batch?: {
    enabled: boolean;
    failures: number;
    limit: number;
    wait: number;
    concurrency: number;
  };
}

export interface MemorySearchOptions {
  maxResults?: number;
  minScore?: number;
  sourceFilter?: "memory" | "sessions";
  providerModel?: string;
  hybrid?: {
    enabled?: boolean;
    vectorWeight?: number;
    textWeight?: number;
    candidateMultiplier?: number;
  };
  mmr?: {
    enabled?: boolean;
    lambda?: number;
  };
  temporalDecay?: {
    enabled?: boolean;
    halfLifeDays?: number;
  };
}
```

### 2. SQLite Schema (`memory/schema.ts`)

```sql
-- EXACT UIT OPENCLAW

-- Meta table for version/config
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Files table
CREATE TABLE IF NOT EXISTS files (
  path TEXT PRIMARY KEY,
  source TEXT NOT NULL,  -- 'memory' | 'sessions'
  hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,
  size INTEGER NOT NULL
);

-- Chunks table
CREATE TABLE IF NOT EXISTS chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  path TEXT NOT NULL,
  source TEXT NOT NULL,
  start_line INTEGER NOT NULL,
  end_line INTEGER NOT NULL,
  hash TEXT NOT NULL,
  model TEXT,
  text TEXT NOT NULL,
  embedding BLOB,  -- sqlite-vec format
  updated_at INTEGER DEFAULT (strftime('%s','now'))
);

-- Embedding cache (deduplication)
CREATE TABLE IF NOT EXISTS embedding_cache (
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  provider_key TEXT NOT NULL,  -- hash of text
  hash TEXT NOT NULL,
  embedding BLOB NOT NULL,
  dims INTEGER NOT NULL,
  PRIMARY KEY (provider, model, provider_key, hash)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chunks_path ON chunks(path);
CREATE INDEX IF NOT EXISTS idx_chunks_source ON chunks(source);

-- FTS5 virtual table
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
  text,
  id UNINDEXED,
  path UNINDEXED,
  source UNINDEXED,
  model UNINDEXED,
  start_line UNINDEXED,
  end_line UNINDEXED
);

-- Vector table (sqlite-vec)
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_vec USING vec0(
  id INTEGER PRIMARY KEY,
  embedding FLOAT[?]  -- dims determined at runtime
);
```

### 3. Key Constants (Exact)

```typescript
// Chunking
export const DEFAULT_CHUNK_TOKENS = 400;
export const DEFAULT_CHUNK_OVERLAP = 80;

// Search
export const DEFAULT_MIN_SCORE = 0.35;
export const DEFAULT_MAX_RESULTS = 10;
export const DEFAULT_HYBRID_CANDIDATE_MULTIPLIER = 4;

// Fusion (typical values)
export const DEFAULT_VECTOR_WEIGHT = 0.7;
export const DEFAULT_TEXT_WEIGHT = 0.3;

// MMR
export const DEFAULT_MMR_ENABLED = false;
export const DEFAULT_MMR_LAMBDA = 0.7; // 0=max diversity, 1=max relevance

// Temporal Decay
export const DEFAULT_TEMPORAL_ENABLED = false;
export const DEFAULT_TEMPORAL_HALF_LIFE_DAYS = 30;

// Sync
export const DEFAULT_WATCH_DEBOUNCE_MS = 1500;
export const BATCH_FAILURE_LIMIT = 2;

// Snippet
export const SNIPPET_MAX_CHARS = 700;
```

### 4. Hybrid Search (`memory/hybrid.ts`)

```typescript
// EXACT UIT OPENCLAW

/**
 * Tokenize query for FTS5
 */
export function buildFtsQuery(raw: string): string {
  const tokens = raw.match(/[\p{L}\p{N}_]+/gu) || [];
  return tokens.map((t) => `"${t}"`).join(" AND ");
}

/**
 * Convert BM25 rank to [0,1] score
 */
export function bm25RankToScore(rank: number): number {
  return 1 / (1 + Math.max(0, rank));
}

/**
 * Merge vector + keyword results with weighted fusion
 */
export function mergeHybridResults(options: {
  vector: MemorySearchResult[];
  keyword: MemorySearchResult[];
  vectorWeight: number;
  textWeight: number;
  mmr?: { enabled: boolean; lambda: number };
  temporalDecay?: { enabled: boolean; halfLifeDays: number };
}): MemorySearchResult[] {
  const { vector, keyword, vectorWeight, textWeight } = options;

  // Merge by unique key (path:startLine-endLine)
  const merged = new Map<string, MemorySearchResult>();

  // Add vector results
  for (const r of vector) {
    const key = `${r.path}:${r.startLine}-${r.endLine}`;
    merged.set(key, { ...r, score: r.score * vectorWeight });
  }

  // Merge keyword results
  for (const r of keyword) {
    const key = `${r.path}:${r.startLine}-${r.endLine}`;
    const existing = merged.get(key);
    if (existing) {
      existing.score += r.score * textWeight;
    } else {
      merged.set(key, { ...r, score: r.score * textWeight });
    }
  }

  // Apply temporal decay if enabled
  if (options.temporalDecay?.enabled) {
    applyTemporalDecay(merged, options.temporalDecay.halfLifeDays);
  }

  // Apply MMR if enabled
  let results = Array.from(merged.values());
  if (options.mmr?.enabled) {
    results = mmrRerank(results, options.mmr.lambda);
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
```

### 5. Chunking (`memory/internal.ts`)

```typescript
// EXACT UIT OPENCLAW

export interface MemoryChunk {
  startLine: number;
  endLine: number;
  text: string;
  hash: string;
}

/**
 * Line-aware markdown chunking
 */
export function chunkMarkdown(
  content: string,
  options: { tokens: number; overlap: number },
): MemoryChunk[] {
  const { tokens, overlap } = options;
  const maxChars = tokens * 4; // ~4 chars per token
  const overlapChars = overlap * 4;

  const lines = content.split("\n");
  const chunks: MemoryChunk[] = [];

  let currentChunk: string[] = [];
  let currentChars = 0;
  let startLine = 1;
  let lineNum = 1;

  for (const line of lines) {
    const lineSize = line.length + 1; // +1 for newline

    if (currentChars + lineSize > maxChars && currentChunk.length > 0) {
      // Flush current chunk
      chunks.push({
        startLine,
        endLine: lineNum - 1,
        text: currentChunk.join("\n"),
        hash: hashText(currentChunk.join("\n")),
      });

      // Carry overlap
      const overlapLines = getOverlapLines(currentChunk, overlapChars);
      currentChunk = overlapLines;
      currentChars = overlapLines.reduce((sum, l) => sum + l.length + 1, 0);
      startLine = lineNum - overlapLines.length;
    }

    currentChunk.push(line);
    currentChars += lineSize;
    lineNum++;
  }

  // Final chunk
  if (currentChunk.length > 0) {
    chunks.push({
      startLine,
      endLine: lineNum - 1,
      text: currentChunk.join("\n"),
      hash: hashText(currentChunk.join("\n")),
    });
  }

  return chunks;
}

export function hashText(text: string): string {
  // SHA-256 hex
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(text).digest("hex");
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
```

### 6. Embedding Providers (`embeddings/`)

```typescript
// EXACT UIT OPENCLAW

export interface EmbeddingProvider {
  id: string;
  model: string;
  maxInputTokens?: number;
  embedQuery(text: string): Promise<number[]>;
  embedBatch(texts: string[]): Promise<number[][]>;
}

// Auto-selection order: local → openai → gemini → voyage
export async function createEmbeddingProvider(
  config: EmbeddingConfig,
): Promise<EmbeddingProvider | null> {
  // Try local first
  if (config.local?.modelPath) {
    try {
      return await createLocalProvider(config.local);
    } catch {}
  }

  // Try OpenAI
  if (process.env.OPENAI_API_KEY) {
    return createOpenAIProvider(config.openai);
  }

  // Try Gemini
  if (process.env.GEMINI_API_KEY) {
    return createGeminiProvider(config.gemini);
  }

  // Try Voyage
  if (process.env.VOYAGE_API_KEY) {
    return createVoyageProvider(config.voyage);
  }

  // No provider available - FTS-only mode
  return null;
}
```

---

## Tools (Exact uit OpenClaw)

### memory_search Tool

```typescript
export const memorySearchTool = tool(
  z.object({
    query: z.string().min(1).describe("The search query"),
    maxResults: z
      .number()
      .min(1)
      .max(100)
      .default(10)
      .describe("Maximum number of results"),
    minScore: z
      .number()
      .min(0)
      .max(1)
      .default(0.35)
      .describe("Minimum relevance score (0-1)"),
  }),
  async ({ query, maxResults, minScore }) => {
    const manager = getMemoryManager();
    const results = await manager.search(query, { maxResults, minScore });

    return {
      results: results.map((r) => ({
        path: r.path,
        lines: `${r.startLine}-${r.endLine}`,
        score: r.score.toFixed(3),
        snippet: r.snippet,
        citation: r.citation || `${r.path}#L${r.startLine}`,
      })),
      provider: manager.status().provider,
      model: manager.status().model,
      mode: manager.status().vector?.available ? "hybrid" : "fts-only",
    };
  },
).describe(`
Mandatory recall step: semantically search MEMORY.md + memory/*.md.

BEFORE answering anything about prior work, decisions, dates, people, 
preferences, or todos: run this tool first.

Returns relevant snippets with line numbers and relevance scores.
`);
```

### memory_get Tool

```typescript
export const memoryGetTool = tool(
  z.object({
    path: z.string().describe("File path from memory_search result"),
    from: z.number().optional().describe("Start line (from search result)"),
    lines: z
      .number()
      .optional()
      .default(50)
      .describe("Number of lines to read"),
  }),
  async ({ path, from, lines }) => {
    const manager = getMemoryManager();
    const text = await manager.readFile({ path, from, lines });

    return {
      path,
      text,
      citation: from ? `${path}#L${from}-L${from + lines - 1}` : path,
    };
  },
).describe(`
Safe snippet read. Use after memory_search to get full context.

Returns the exact text at the specified location with citation.
`);
```

---

## Jouw Verbeteringen

### 1. LLM Intent Detection (`enhancements/intent-detector.ts`)

```typescript
/**
 * JIJ HEBT DIT - OPENCLAW NIET
 *
 * Uses LLM to detect memory intent from user message.
 * Multi-language support: en, nl, de, fr, es
 */

export interface MemoryIntent {
  intent: "remember" | "query" | "forget" | null;
  entities: string[];
  confidence: number;
  language: string;
}

export async function detectMemoryIntent(
  message: string,
  languages: string[] = ["en", "nl", "de", "fr", "es"],
): Promise<MemoryIntent> {
  const prompt = `Analyze this message for memory intent.
Return JSON: {intent, entities[], confidence, language}

Intent options:
- "remember": User wants to save information
- "query": User is asking about stored information  
- "forget": User wants to delete information
- null: No memory action needed

Languages: ${languages.join(", ")}

Message: "${message}"`;

  // Call LLM
  const response = await callLLM(prompt);
  return JSON.parse(response);
}

// Hook integration
export async function onToolExecute(event: ToolExecuteEvent) {
  if (event.tool === "chat") {
    const intent = await detectMemoryIntent(event.input.message);

    if (intent.intent === "remember" && intent.confidence > 0.7) {
      return {
        suggestion: "memory_write",
        entities: intent.entities,
        message: `Should I remember this about: ${intent.entities.join(", ")}?`,
      };
    }

    if (intent.intent === "query" && intent.confidence > 0.7) {
      return {
        suggestion: "memory_search",
        query: intent.entities.join(" "),
      };
    }
  }
}
```

### 2. Snapshot System (`enhancements/snapshot-manager.ts`)

```typescript
/**
 * JIJ HEBT DIT - OPENCLAW NIET
 *
 * Saves session snapshots for recovery.
 */

export interface SessionSnapshot {
  id: string;
  timestamp: string;
  messages: Array<{
    role: string;
    content: string; // truncated to 500 chars
  }>;
  summary?: string;
}

export async function saveSnapshot(
  sessionId: string,
  messages: Message[],
  maxMessages: number = 15,
): Promise<string> {
  const snapshot: SessionSnapshot = {
    id: sessionId,
    timestamp: new Date().toISOString(),
    messages: messages.slice(-maxMessages).map((m) => ({
      role: m.role,
      content: m.content.slice(0, 500),
    })),
  };

  const path = `.memory/snapshots/${snapshot.timestamp}-${sessionId}.json`;
  await writeFile(path, JSON.stringify(snapshot, null, 2));

  // Update .memory.md with reference
  await appendToMemory(`
## Session Snapshot
- [${snapshot.timestamp}](.memory/snapshots/${snapshot.timestamp}-${sessionId}.json)
`);

  return path;
}
```

---

## OpenCode Plugin Config

```typescript
// src/index.ts

import { definePlugin } from "@opencode-ai/plugin";
import { memorySearchTool } from "./tools/memory-search";
import { memoryGetTool } from "./tools/memory-get";
import { onSessionCreated } from "./hooks/bootstrap";
import { onToolExecute } from "./hooks/search";
import { onSessionDeleted } from "./hooks/snapshot";

export default definePlugin({
  id: "opencode-memory",
  name: "Memory",
  version: "2.0.0",

  tools: [memorySearchTool, memoryGetTool],

  hooks: {
    "session.created": onSessionCreated,
    "tool.execute.before": onToolExecute,
    "session.deleted": onSessionDeleted,
  },

  config: {
    memory: {
      // OpenClaw config
      search: {
        hybrid: {
          enabled: true,
          vectorWeight: 0.7,
          textWeight: 0.3,
          candidateMultiplier: 4,
        },
        minScore: 0.35,
        maxResults: 10,
        mmr: {
          enabled: false,
          lambda: 0.7,
        },
        temporalDecay: {
          enabled: false,
          halfLifeDays: 30,
        },
      },
      embeddings: {
        provider: "auto",
        model: null,
        batchSize: 100,
      },
      chunking: {
        tokens: 400,
        overlap: 80,
      },
      cache: {
        enabled: true,
        maxEntries: 10000,
      },
      // Jouw verbeteringen
      intentDetection: {
        enabled: true,
        languages: ["en", "nl", "de", "fr", "es"],
        confidenceThreshold: 0.7,
      },
      snapshots: {
        enabled: true,
        maxMessages: 15,
      },
    },
  },
});
```

---

## Implementatie Fasen

### Fase 1: OpenClaw Core ⏱️ 3-4 dagen

**Letterlijk kopiëren uit OpenClaw:**

1. `memory/types.ts`
2. `memory/schema.ts`
3. `memory/internal.ts` (chunking, hashing, cosine)
4. `memory/hybrid.ts` (BM25, fusion)
5. `memory/manager.ts` (MemoryIndexManager)
6. `memory/manager-search.ts` (search implementations)
7. `memory/sqlite-vec.ts` (extension loader)
8. `embeddings/` (alle providers)

**Aanpassingen:**

- Import paths naar OpenCode structuur
- Config via plugin config (niet global)

### Fase 2: Tools & Sync ⏱️ 2 dagen

**Letterlijk kopiëren:**

1. `tools/memory-search.ts`
2. `tools/memory-get.ts`
3. `sync/watcher.ts`
4. `sync/indexer.ts`
5. `sync/session-listener.ts`

### Fase 3: Jouw Verbeteringen ⏱️ 1-2 dagen

**Bestaande code migreren:**

1. `enhancements/intent-detector.ts` (uit jouw memory-intent.ts)
2. `enhancements/snapshot-manager.ts` (uit jouw memory-snapshot.ts)
3. `enhancements/i18n.ts` (multi-language)

### Fase 4: OpenCode Hooks ⏱️ 1 dag

**OpenCode plugin hooks:**

1. `hooks/bootstrap.ts` - Load memory on session start
2. `hooks/search.ts` - Intent detection on messages
3. `hooks/snapshot.ts` - Save snapshot on session end

### Fase 5: Testing ⏱️ 1-2 dagen

**Tests:**

1. `tests/memory/test_chunking.py`
2. `tests/memory/test_embeddings.py`
3. `tests/memory/test_hybrid.py`
4. `tests/memory/test_mmr.py`
5. `tests/enhancements/test_intent.py`

---

## Dependencies

```json
{
  "dependencies": {
    "better-sqlite3": "^11.0.0"
  },
  "optionalDependencies": {
    "sqlite-vec": "^0.1.0",
    "node-llama-cpp": "^3.0.0"
  }
}
```

---

## Migration Guide

### Van Huidige opencode-memory naar Nieuw

1. **Backup bestaande .memory.md**
2. **Run migration script:**
   ```bash
   uv run scripts/migrate.py --dry-run  # Preview
   uv run scripts/migrate.py            # Execute
   ```
3. **Migration doet:**
   - Parse bestaande .memory.md
   - Chunk content (400 tokens)
   - Index in SQLite
   - Create embeddings (if provider available)
   - Preserve original .memory.md (readable backup)

---

## Checklist

- [ ] Fase 1: OpenClaw core files gekopieerd
- [ ] Fase 2: Tools & sync geïmplementeerd
- [ ] Fase 3: Intent detection gemigreerd
- [ ] Fase 3: Snapshot system gemigreerd
- [ ] Fase 4: OpenCode hooks geïmplementeerd
- [ ] Fase 5: Tests geschreven
- [ ] Migration script klaar
- [ ] Documentatie bijgewerkt

---

## Notes

- Alle OpenClaw code is letterlijk gekopieerd waar mogelijk
- Alleen import paths en config structuur aangepast voor OpenCode
- Jouw verbeteringen (intent detection, snapshots) zijn behouden
- Multi-language support behouden (en/nl/de/fr/es)
