# Ultra Volledige Multidimensionale Architectuur

## OpenClaw Memory → OpenCode SDK

**Versie:** 1.0.0  
**Laatste update:** 2025-02-18  
**Status:** Master Plan

---

## Executive Summary

Dit document beschrijft de volledige implementatie van OpenClaw's memory systeem, maar dan volledig geconverteerd naar OpenCode SDK patterns (Plugins, Tools, Hooks, Commands, Skills, Agents).

### Kernprincipe

> **Letterlijk OpenClaw, maar dan in OpenCode native patterns**

---

## 1. Multidimensionale Mapping

### 1.1 OpenClaw → OpenCode SDK Mapping

| OpenClaw Component       | OpenCode Equivalent | Type                             |
| ------------------------ | ------------------- | -------------------------------- |
| `memory-tool.ts` (tools) | Plugin Tools        | `tool()` met Zod                 |
| `manager.ts` (indexing)  | Plugin Hooks        | `session.created`, `file.edited` |
| Embedding providers      | Plugin Module       | Internal TypeScript              |
| Hybrid search            | Plugin Tool         | `memory_search` tool             |
| Config schema            | Plugin Config       | `config()` modifier              |
| Session memory           | Plugin State        | `session.*` hooks                |
| File watching            | Plugin Hook         | `file.edited`                    |
| CLI commands             | Commands            | `.opencode/commands/`            |

### 1.2 Architectuur Overzicht

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
│  │              YOUR UNIQUE ADDITIONS                       │   │
│  │                                                          │   │
│  │  • LLM Intent Detection (🧠 NEW!)                       │   │
│  │  • Snapshot System (📸 NEW!)                            │   │
│  │  • Multi-language Support (🌍 NEW!)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. OpenCode SDK Componenten

### 2.1 Core Plugin (`src/plugin/memory/index.ts`)

```typescript
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import type { PluginContext } from "@opencode-ai/plugin";
import { MemoryManager } from "./storage/manager.js";
import { createEmbeddingProvider } from "./embeddings/provider.js";

export default async function memoryPlugin(ctx: PluginContext) {
  const manager = new MemoryManager(ctx.project.root);

  return {
    // ========== TOOLS ==========
    tool: [
      // memory_search - Hybrid search
      tool({
        description:
          "Mandatory recall: semantically search MEMORY.md + memory/*.md before answering questions about prior work, decisions, dates, people, preferences, or todos",
        args: z.object({
          query: z.string().min(1).describe("Search query"),
          maxResults: z.number().default(10).describe("Max results"),
          minScore: z
            .number()
            .default(0.35)
            .describe("Minimum score threshold"),
          source: z
            .enum(["memory", "sessions", "all"])
            .default("all")
            .describe("Search scope"),
        }),
        execute: async (args, ctx) => {
          const results = await manager.search(args.query, {
            maxResults: args.maxResults,
            minScore: args.minScore,
            sourceFilter: args.source,
          });
          return {
            success: true,
            data: {
              results,
              provider: manager.status().provider,
              model: manager.status().model,
              mode: manager.status().vector?.enabled ? "hybrid" : "fts-only",
            },
          };
        },
      }),

      // memory_get - Safe snippet read
      tool({
        description:
          "Safe snippet read from MEMORY.md or memory/*.md with optional from/lines; use after memory_search",
        args: z.object({
          path: z.string().min(1).describe("File path relative to project"),
          from: z.number().optional().describe("Start line (1-indexed)"),
          lines: z.number().optional().describe("Number of lines"),
        }),
        execute: async (args, ctx) => {
          const result = await manager.readFile({
            relPath: args.path,
            from: args.from,
            lines: args.lines,
          });
          return { success: true, data: result };
        },
      }),

      // memory_sync - Force reindex
      tool({
        description:
          "Force memory reindex; use when MEMORY.md was manually edited",
        args: z.object({
          force: z.boolean().default(false).describe("Force full reindex"),
        }),
        execute: async (args, ctx) => {
          await manager.sync({ force: args.force });
          return {
            success: true,
            data: { status: manager.status() },
          };
        },
      }),

      // memory_status - Check memory health
      tool({
        description:
          "Check memory system status: provider, vector availability, chunk count",
        args: z.object({}),
        execute: async (args, ctx) => {
          return {
            success: true,
            data: manager.status(),
          };
        },
      }),
    ],

    // ========== HOOKS ==========
    "session.created": async () => {
      // Bootstrap: load memory into session context
      await manager.sync();
    },

    "session.deleted": async (event) => {
      // Snapshot: save session for recovery
      await manager.saveSnapshot(event.sessionId, event.messages);
    },

    "file.edited": async (event) => {
      // Auto-reindex when memory files change
      if (event.path.includes("MEMORY.md") || event.path.includes("memory/")) {
        await manager.sync({ files: [event.path] });
      }
    },

    "tool.execute.before": async (event) => {
      // YOUR UNIQUE ADDITION: LLM Intent Detection
      if (event.tool === "write" || event.tool === "edit") {
        const intent = await manager.detectIntent(event.args);
        if (intent === "memory-update") {
          ctx.client.tui.showToast({
            message: "💡 Tip: Use /remember to save this to memory",
            type: "info",
          });
        }
      }
    },

    "experimental.session.compacting": async (event) => {
      // Extract key info before compaction
      await manager.extractToDailyLog(event.context);
    },

    // ========== CONFIG ==========
    config: (cfg) => ({
      ...cfg,
      memory: {
        enabled: true,
        embeddings: {
          provider: "auto", // auto | local | openai | gemini | voyage
          model: null, // null = default for provider
          batchSize: 100,
        },
        search: {
          hybrid: {
            enabled: true,
            vectorWeight: 0.7,
            textWeight: 0.3,
            candidateMultiplier: 4,
          },
          minScore: 0.35,
          maxResults: 10,
        },
        chunking: {
          tokens: 400,
          overlap: 80,
        },
        storage: {
          vector: { enabled: true },
          cache: { enabled: true, maxEntries: 10000 },
        },
        citations: "auto", // on | off | auto
      },
    }),
  };
}
```

### 2.2 Commands (`.opencode/commands/`)

#### `/memory` - Memory Management

```markdown
# /memory - Memory Management

Manage persistent memory for OpenCode sessions.

## Usage
```

/memory Show memory status
/memory on Enable memory for this project
/memory off Disable memory for this project
/memory compact Force memory compaction now
/memory status Show detailed memory status
/memory sync Force reindex memory files

````

## Implementation

```bash
# Delegate to memory CLI
uv run ~/.ai_docs/opencode/scripts/memory_cli.py $ARGUMENTS
````

````

#### `/remember` - Quick Memory Add

```markdown
# /remember - Remember Information

Save information to memory for future sessions.

## Usage

````

/remember <text> Save this to memory
/remember --session Save as session-specific
/remember --topic <topic> Save under specific topic

```

## Implementation

Uses `memory_sync` tool to add entry to MEMORY.md.
```

#### `/recall` - Quick Search

```markdown
# /recall - Quick Memory Search

Quickly search memory without full context.

## Usage
```

/recall <query> Search memory
/recall --recent Show recent entries
/recall --decisions Show past decisions

```

## Implementation

Uses `memory_search` tool with appropriate filters.
```

### 2.3 Skill (`src/skill/memory/`)

```markdown
# Memory Skill

## When to Use

Activate this skill when:

- Working with MEMORY.md files
- Implementing memory-related features
- Debugging memory search issues
- Setting up embedding providers

## Core Concepts

### Hybrid Search

Memory uses **hybrid search** combining:

1. **Vector Search** (semantic similarity)
   - Uses embeddings from OpenAI/Gemini/local
   - Score: `1 - cosine_distance`

2. **Keyword Search** (exact matching)
   - Uses SQLite FTS5 with BM25 ranking
   - Score: `1 / (1 + rank)`

3. **Fusion**
```

final_score = 0.7 _ vector_score + 0.3 _ keyword_score

```

### Chunking

- **400 tokens** per chunk (configurable)
- **80 tokens** overlap (configurable)
- Line-aware for accurate citations

### Embedding Providers

Priority order (auto-select):
1. `local` - node-llama-cpp (free, offline)
2. `openai` - text-embedding-3-small
3. `gemini` - gemini-embedding-001
4. `voyage` - voyage-4-large

## Best Practices

1. **Always use `memory_search` first** before answering about past work
2. **Use citations** - `path#Lstart-Lend` format
3. **Keep MEMORY.md structured** with clear sections
4. **Run `/memory sync`** after manual edits

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Vector search unavailable | Check embedding provider config |
| Poor results | Adjust minScore or weights |
| Slow search | Reduce candidateMultiplier |
| Missing chunks | Run `/memory sync` |
```

---

## 3. Storage Layer (Letterlijk OpenClaw)

### 3.1 SQLite Schema (`storage/schema.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
export const SCHEMA_VERSION = 1;

export const CREATE_TABLES = `
  -- Meta table for schema version
  CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  -- Files table
  CREATE TABLE IF NOT EXISTS files (
    path TEXT PRIMARY KEY,
    source TEXT NOT NULL DEFAULT 'memory',
    hash TEXT NOT NULL,
    mtime INTEGER NOT NULL,
    size INTEGER NOT NULL
  );

  -- Chunks table
  CREATE TABLE IF NOT EXISTS chunks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'memory',
    start_line INTEGER NOT NULL,
    end_line INTEGER NOT NULL,
    hash TEXT NOT NULL,
    model TEXT,
    text TEXT NOT NULL,
    embedding BLOB,
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (path) REFERENCES files(path) ON DELETE CASCADE
  );

  -- Embedding cache
  CREATE TABLE IF NOT EXISTS embedding_cache (
    provider TEXT NOT NULL,
    model TEXT NOT NULL,
    provider_key TEXT NOT NULL,
    hash TEXT NOT NULL,
    embedding BLOB NOT NULL,
    dims INTEGER NOT NULL,
    PRIMARY KEY (provider, model, provider_key, hash)
  );

  -- FTS5 virtual table for keyword search
  CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
    text,
    id UNINDEXED,
    path UNINDEXED,
    source UNINDEXED,
    model UNINDEXED,
    start_line UNINDEXED,
    end_line UNINDEXED,
    content='chunks',
    content_rowid='id'
  );

  -- Indexes
  CREATE INDEX IF NOT EXISTS idx_chunks_path ON chunks(path);
  CREATE INDEX IF NOT EXISTS idx_chunks_source ON chunks(source);
`;

// Triggers to keep FTS in sync
export const CREATE_TRIGGERS = `
  CREATE TRIGGER IF NOT EXISTS chunks_ai AFTER INSERT ON chunks BEGIN
    INSERT INTO chunks_fts(rowid, text, id, path, source, model, start_line, end_line)
    VALUES (new.id, new.text, new.id, new.path, new.source, new.model, new.start_line, new.end_line);
  END;

  CREATE TRIGGER IF NOT EXISTS chunks_ad AFTER DELETE ON chunks BEGIN
    INSERT INTO chunks_fts(chunks_fts, rowid, text, id, path, source, model, start_line, end_line)
    VALUES ('delete', old.id, old.text, old.id, old.path, old.source, old.model, old.start_line, old.end_line);
  END;

  CREATE TRIGGER IF NOT EXISTS chunks_au AFTER UPDATE ON chunks BEGIN
    INSERT INTO chunks_fts(chunks_fts, rowid, text, id, path, source, model, start_line, end_line)
    VALUES ('delete', old.id, old.text, old.id, old.path, old.source, old.model, old.start_line, old.end_line);
    INSERT INTO chunks_fts(rowid, text, id, path, source, model, start_line, end_line)
    VALUES (new.id, new.text, new.id, new.path, new.source, new.model, new.start_line, new.end_line);
  END;
`;
```

### 3.2 Vector Search (`storage/sqlite-vec.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
import Database from "better-sqlite3";
import * as path from "path";
import * as fs from "fs";

const VEC_VERSION = "0.1.0";

export interface VecStatus {
  enabled: boolean;
  available: boolean;
  extensionPath?: string;
  loadError?: string;
  dims?: number;
}

export async function loadSqliteVecExtension(
  db: Database.Database,
  extensionPath?: string,
): Promise<VecStatus> {
  const status: VecStatus = {
    enabled: false,
    available: false,
  };

  try {
    // Try to load sqlite-vec extension
    const vecPath = extensionPath || findSqliteVecExtension();
    if (vecPath && fs.existsSync(vecPath)) {
      db.loadExtension(vecPath);
      status.enabled = true;
      status.available = true;
      status.extensionPath = vecPath;

      // Create vector table
      db.exec(`
        CREATE VIRTUAL TABLE IF NOT EXISTS chunks_vec USING vec0(
          embedding float[1536]  -- Adjust based on embedding dims
        )
      `);
    }
  } catch (err) {
    status.loadError = err instanceof Error ? err.message : String(err);
  }

  return status;
}

function findSqliteVecExtension(): string | null {
  // Search common locations for sqlite-vec extension
  const searchPaths = [
    path.join(process.env.HOME || "", ".local", "lib", "sqlite-vec"),
    "/usr/local/lib/sqlite-vec",
    "/usr/lib/sqlite-vec",
  ];

  for (const p of searchPaths) {
    for (const ext of [".so", ".dylib", ".dll"]) {
      const fullPath = p + ext;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }
  return null;
}
```

### 3.3 Hybrid Search (`search/hybrid.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
export function buildFtsQuery(raw: string): string {
  // Tokenize and quote for FTS5
  const tokens = raw.match(/[\p{L}\p{N}_]+/gu) || [];
  return tokens.map((t) => `"${t}"`).join(" AND ");
}

export function bm25RankToScore(rank: number): number {
  // Convert BM25 rank to 0-1 score
  return 1 / (1 + Math.max(0, rank));
}

export interface HybridOptions {
  vectorResults: SearchResult[];
  keywordResults: SearchResult[];
  vectorWeight: number; // Default: 0.7
  textWeight: number; // Default: 0.3
  mmr?: { enabled: boolean; lambda: number };
  temporalDecay?: { enabled: boolean; halfLifeDays: number };
}

export function mergeHybridResults(opts: HybridOptions): SearchResult[] {
  const { vectorResults, keywordResults, vectorWeight, textWeight } = opts;

  // Merge by ID
  const merged = new Map<string, SearchResult>();

  // Add vector results
  for (const r of vectorResults) {
    const id = `${r.path}:${r.startLine}`;
    merged.set(id, {
      ...r,
      score: r.score * vectorWeight,
    });
  }

  // Merge keyword results
  for (const r of keywordResults) {
    const id = `${r.path}:${r.startLine}`;
    const existing = merged.get(id);
    if (existing) {
      existing.score += r.score * textWeight;
    } else {
      merged.set(id, {
        ...r,
        score: r.score * textWeight,
      });
    }
  }

  // Sort by score
  let results = Array.from(merged.values()).sort((a, b) => b.score - a.score);

  // Apply temporal decay if enabled
  if (opts.temporalDecay?.enabled) {
    results = applyTemporalDecay(results, opts.temporalDecay.halfLifeDays);
  }

  // Apply MMR if enabled
  if (opts.mmr?.enabled) {
    results = mmrRerank(results, opts.mmr.lambda);
  }

  return results;
}
```

### 3.4 Chunking (`chunking/markdown.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
export interface Chunk {
  startLine: number;
  endLine: number;
  text: string;
  hash: string;
}

export const DEFAULT_CHUNK_TOKENS = 400;
export const DEFAULT_CHUNK_OVERLAP = 80;

export function chunkMarkdown(
  content: string,
  options: { tokens?: number; overlap?: number } = {},
): Chunk[] {
  const maxChars = (options.tokens || DEFAULT_CHUNK_TOKENS) * 4;
  const overlapChars = (options.overlap || DEFAULT_CHUNK_OVERLAP) * 4;

  const lines = content.split("\n");
  const chunks: Chunk[] = [];

  let currentChunk: string[] = [];
  let currentChars = 0;
  let startLine = 1;
  let lineNum = 1;

  for (const line of lines) {
    const lineSize = Buffer.byteLength(line, "utf-8") + 1; // +1 for newline

    if (currentChars + lineSize > maxChars && currentChunk.length > 0) {
      // Flush current chunk
      const text = currentChunk.join("\n");
      chunks.push({
        startLine,
        endLine: lineNum - 1,
        text,
        hash: hashText(text),
      });

      // Carry overlap
      const overlapLines = getOverlapLines(currentChunk, overlapChars);
      currentChunk = overlapLines;
      currentChars = overlapLines.reduce((s, l) => s + l.length + 1, 0);
      startLine = lineNum - overlapLines.length;
    }

    currentChunk.push(line);
    currentChars += lineSize;
    lineNum++;
  }

  // Flush remaining
  if (currentChunk.length > 0) {
    const text = currentChunk.join("\n");
    chunks.push({
      startLine,
      endLine: lineNum - 1,
      text,
      hash: hashText(text),
    });
  }

  return chunks;
}

function getOverlapLines(lines: string[], maxChars: number): string[] {
  const result: string[] = [];
  let chars = 0;

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    chars += line.length + 1;
    if (chars > maxChars) break;
    result.unshift(line);
  }

  return result;
}

export function hashText(text: string): string {
  const crypto = require("crypto");
  return crypto.createHash("sha256").update(text).digest("hex");
}
```

---

## 4. Embedding Providers (Letterlijk OpenClaw)

### 4.1 Provider Interface (`embeddings/provider.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
export interface EmbeddingProvider {
  id: string;
  model: string;
  maxInputTokens?: number;
  embedQuery(text: string): Promise<number[]>;
  embedBatch(texts: string[]): Promise<number[][]>;
}

export interface ProviderConfig {
  type: "local" | "openai" | "gemini" | "voyage";
  model?: string;
  apiKey?: string;
  modelPath?: string; // For local
}

export async function createEmbeddingProvider(
  config: ProviderConfig,
): Promise<EmbeddingProvider | null> {
  switch (config.type) {
    case "local":
      return createLocalProvider(config);
    case "openai":
      return createOpenAIProvider(config);
    case "gemini":
      return createGeminiProvider(config);
    case "voyage":
      return createVoyageProvider(config);
    default:
      return null;
  }
}

// Auto-select provider
export async function autoSelectProvider(): Promise<EmbeddingProvider | null> {
  // Priority: local → openai → gemini → voyage

  // Try local first
  const local = await tryLocalProvider();
  if (local) return local;

  // Try OpenAI
  if (process.env.OPENAI_API_KEY) {
    return createOpenAIProvider({ type: "openai" });
  }

  // Try Gemini
  if (process.env.GEMINI_API_KEY) {
    return createGeminiProvider({ type: "gemini" });
  }

  // Try Voyage
  if (process.env.VOYAGE_API_KEY) {
    return createVoyageProvider({ type: "voyage" });
  }

  return null; // FTS-only mode
}
```

### 4.2 OpenAI Provider (`embeddings/openai.ts`)

```typescript
// EXACT COPY FROM OPENCLAW
import OpenAI from "openai";
import type { EmbeddingProvider } from "./provider.js";

const DEFAULT_MODEL = "text-embedding-3-small";
const MAX_BATCH_SIZE = 100;

export function createOpenAIProvider(config: {
  model?: string;
  apiKey?: string;
}): EmbeddingProvider {
  const client = new OpenAI({
    apiKey: config.apiKey || process.env.OPENAI_API_KEY,
  });

  const model = config.model || DEFAULT_MODEL;

  return {
    id: "openai",
    model,
    maxInputTokens: 8191,

    async embedQuery(text: string): Promise<number[]> {
      const response = await client.embeddings.create({
        model,
        input: text,
      });
      return response.data[0].embedding;
    },

    async embedBatch(texts: string[]): Promise<number[][]> {
      const results: number[][] = [];

      for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
        const batch = texts.slice(i, i + MAX_BATCH_SIZE);
        const response = await client.embeddings.create({
          model,
          input: batch,
        });
        results.push(...response.data.map((d) => d.embedding));
      }

      return results;
    },
  };
}
```

---

## 5. Jouw Unieke Toevoegingen

### 5.1 LLM Intent Detection (`hooks/intent.ts`)

```typescript
// JOUW UNIEKE WAARDE - OpenClaw heeft dit niet!
import type { PluginContext } from "@opencode-ai/plugin";

interface IntentResult {
  intent: "remember" | "query" | "forget" | null;
  entities: string[];
  confidence: number;
  language: string;
}

const LANGUAGES = ["en", "nl", "de", "fr", "es"] as const;

export async function detectMemoryIntent(
  ctx: PluginContext,
  text: string,
): Promise<IntentResult> {
  // Use LLM to detect intent
  const response = await ctx.client.session.prompt({
    system: `You are a memory intent detector. Analyze the text and determine if the user wants to:
- remember something (remember)
- query memory (query)  
- forget something (forget)
- or nothing related to memory (null)

Respond with JSON: { "intent": "remember|query|forget|null", "entities": [], "confidence": 0.0-1.0, "language": "en|nl|de|fr|es" }`,
    user: text,
  });

  try {
    return JSON.parse(response);
  } catch {
    return { intent: null, entities: [], confidence: 0, language: "en" };
  }
}

// Hook integration
export function registerIntentHook(ctx: PluginContext) {
  return {
    "tool.execute.before": async (event: any) => {
      // Only check on write/edit operations
      if (event.tool !== "write" && event.tool !== "edit") return;

      const text = event.args?.content || event.args?.newString || "";
      const intent = await detectMemoryIntent(ctx, text);

      if (intent.intent === "remember" && intent.confidence > 0.7) {
        ctx.client.tui.showToast({
          message: `💡 Tip: Use /remember to save "${intent.entities.join(", ")}" to memory`,
          type: "info",
        });
      }

      if (intent.intent === "query" && intent.confidence > 0.7) {
        ctx.client.tui.showToast({
          message: `💡 Tip: Use /recall "${intent.entities.join(" ")}" to search memory`,
          type: "info",
        });
      }
    },
  };
}
```

### 5.2 Snapshot System (`storage/snapshots.ts`)

```typescript
// JOUW UNIEKE WAARDE - Session recovery
import * as fs from "fs";
import * as path from "path";

interface Snapshot {
  sessionId: string;
  timestamp: number;
  messages: Array<{
    role: string;
    content: string;
    truncated: boolean;
  }>;
}

const MAX_MESSAGES = 15;
const MAX_CONTENT_LENGTH = 500;

export function saveSnapshot(
  projectRoot: string,
  sessionId: string,
  messages: any[],
): void {
  const snapshotDir = path.join(projectRoot, ".memory", "snapshots");
  fs.mkdirSync(snapshotDir, { recursive: true });

  const snapshot: Snapshot = {
    sessionId,
    timestamp: Date.now(),
    messages: messages.slice(-MAX_MESSAGES).map((m) => ({
      role: m.role,
      content: m.content?.slice(0, MAX_CONTENT_LENGTH) || "",
      truncated: (m.content?.length || 0) > MAX_CONTENT_LENGTH,
    })),
  };

  const filename = `${Date.now()}-${sessionId.slice(0, 8)}.json`;
  fs.writeFileSync(
    path.join(snapshotDir, filename),
    JSON.stringify(snapshot, null, 2),
  );
}

export function loadRecentSnapshots(
  projectRoot: string,
  limit: number = 5,
): Snapshot[] {
  const snapshotDir = path.join(projectRoot, ".memory", "snapshots");
  if (!fs.existsSync(snapshotDir)) return [];

  const files = fs
    .readdirSync(snapshotDir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse()
    .slice(0, limit);

  return files.map((f) => {
    const content = fs.readFileSync(path.join(snapshotDir, f), "utf-8");
    return JSON.parse(content);
  });
}
```

---

## 6. Bestandsstructuur (Final)

```
src/plugin/memory/
├── index.ts                    # Main plugin export
├── storage/
│   ├── schema.ts               # SQLite schema (exact OpenClaw)
│   ├── manager.ts              # MemoryIndexManager (exact OpenClaw)
│   ├── sqlite-vec.ts           # Vector extension (exact OpenClaw)
│   ├── snapshots.ts            # Snapshot system (JOUW TOEVOEGING)
│   └── migrations.ts           # Schema migrations
├── search/
│   ├── hybrid.ts               # Fusion scoring (exact OpenClaw)
│   ├── keyword.ts              # FTS5/BM25 (exact OpenClaw)
│   ├── vector.ts               # Cosine similarity (exact OpenClaw)
│   ├── mmr.ts                  # MMR reranking (exact OpenClaw)
│   └── temporal.ts             # Temporal decay (exact OpenClaw)
├── embeddings/
│   ├── provider.ts             # Interface & factory (exact OpenClaw)
│   ├── local.ts                # node-llama-cpp (exact OpenClaw)
│   ├── openai.ts               # OpenAI (exact OpenClaw)
│   ├── gemini.ts               # Gemini (exact OpenClaw)
│   └── voyage.ts               # Voyage (exact OpenClaw)
├── chunking/
│   └── markdown.ts             # Line-aware chunking (exact OpenClaw)
├── hooks/
│   ├── intent.ts               # LLM intent detection (JOUW TOEVOEGING)
│   ├── bootstrap.ts            # Session bootstrap
│   ├── compaction.ts           # Context compaction
│   └── sync.ts                 # File watching
├── tools/
│   ├── memory-search.ts        # memory_search tool
│   ├── memory-get.ts           # memory_get tool
│   ├── memory-sync.ts          # memory_sync tool
│   └── memory-status.ts        # memory_status tool
└── types.ts                    # TypeScript types (exact OpenClaw)

.opencode/
├── commands/
│   ├── memory.md               # /memory command
│   ├── remember.md             # /remember command
│   ├── recall.md               # /recall command
│   └── forget.md               # /forget command
└── skills/
    └── memory/
        └── SKILL.md            # Memory usage skill

tests/
├── test_schema.py
├── test_chunking.py
├── test_embeddings.py
├── test_hybrid.py
├── test_intent.py
└── test_integration.py
```

---

## 7. Implementatie Fases

### Fase 1: Core Storage (2-3 dagen)

- [ ] SQLite schema (exact OpenClaw)
- [ ] Manager class (exact OpenClaw)
- [ ] Chunking (exact OpenClaw)
- [ ] File sync

### Fase 2: Search (2-3 dagen)

- [ ] FTS5 keyword search (exact OpenClaw)
- [ ] BM25 scoring (exact OpenClaw)
- [ ] Vector search via sqlite-vec (exact OpenClaw)
- [ ] Hybrid fusion (exact OpenClaw)

### Fase 3: Embeddings (2-3 dagen)

- [ ] Provider interface (exact OpenClaw)
- [ ] OpenAI provider (exact OpenClaw)
- [ ] Gemini provider (exact OpenClaw)
- [ ] Local provider (exact OpenClaw)
- [ ] Auto-selection

### Fase 4: Plugin & Tools (2-3 dagen)

- [ ] Plugin export
- [ ] memory_search tool
- [ ] memory_get tool
- [ ] memory_sync tool
- [ ] memory_status tool

### Fase 5: Hooks (1-2 dagen)

- [ ] session.created (bootstrap)
- [ ] session.deleted (snapshot)
- [ ] file.edited (auto-sync)
- [ ] experimental.session.compacting

### Fase 6: Commands & Skills (1 dag)

- [ ] /memory command
- [ ] /remember command
- [ ] /recall command
- [ ] Memory skill

### Fase 7: Jouw Toevoegingen (2 dagen)

- [ ] LLM intent detection
- [ ] Snapshot system
- [ ] Multi-language support

---

## 8. Dependencies

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

---

## 9. Config Schema

```yaml
# .opencode/config.yaml
memory:
  enabled: true

  embeddings:
    provider: auto # auto | local | openai | gemini | voyage
    model: null # null = default
    batchSize: 100

  search:
    hybrid:
      enabled: true
      vectorWeight: 0.7
      textWeight: 0.3
      candidateMultiplier: 4
    minScore: 0.35
    maxResults: 10

  chunking:
    tokens: 400
    overlap: 80

  storage:
    vector:
      enabled: true
      extensionPath: null # auto-detect
    cache:
      enabled: true
      maxEntries: 10000

  citations: auto # on | off | auto

  # JOUW TOEVOEGINGEN
  intent:
    enabled: true
    languages: [en, nl, de, fr, es]
    confidenceThreshold: 0.7

  snapshots:
    enabled: true
    maxMessages: 15
    maxContentLength: 500
```

---

## 10. Test Criteria

### Fase 1 Tests

```bash
# Database created with correct schema
uv run pytest tests/test_schema.py -v

# Chunking works with line numbers
uv run pytest tests/test_chunking.py -v

# Sync updates only changed files
uv run pytest tests/test_sync.py -v
```

### Fase 2 Tests

```bash
# FTS5 search returns results
uv run pytest tests/test_keyword.py -v

# BM25 scores in [0, 1]
uv run pytest tests/test_bm25.py -v

# Hybrid fusion merges correctly
uv run pytest tests/test_hybrid.py -v
```

### Fase 3 Tests

```bash
# Provider auto-selection works
uv run pytest tests/test_provider_auto.py -v

# Embeddings cached
uv run pytest tests/test_embedding_cache.py -v

# Vector search returns semantic matches
uv run pytest tests/test_vector.py -v
```

### Fase 4-7 Tests

```bash
# All tools work
uv run pytest tests/test_tools.py -v

# Hooks fire correctly
uv run pytest tests/test_hooks.py -v

# Intent detection works
uv run pytest tests/test_intent.py -v
```

---

## 11. Referenties

| Bron                   | Link                                            |
| ---------------------- | ----------------------------------------------- |
| OpenClaw Memory Module | `/tmp/openclaw/src/memory/`                     |
| OpenClaw Memory Tools  | `/tmp/openclaw/src/agents/tools/memory-tool.ts` |
| OpenCode Plugin SDK    | `docs/opencode/plugins.md`                      |
| OpenCode Tools Guide   | `docs/opencode/tools.md`                        |
| sqlite-vec Docs        | https://github.com/asg017/sqlite-vec            |
| better-sqlite3 Docs    | https://github.com/WiseLibs/better-sqlite3      |

---

**Status:** Klaar voor implementatie  
**Volgende stap:** Begin met Fase 1 (Core Storage)
