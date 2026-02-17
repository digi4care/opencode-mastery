# Prompt Manager - Complete Software Design

**Project:** `/media/digi4care/ExtDrive/projects/sveltekit/prompt-management/`  
**Datum:** 2025-02-13  
**Versie:** 1.0

---

## Inhoudsopgave

1. [Executive Summary](#1-executive-summary)
2. [Huidige Architectuur](#2-huidige-architectuur)
3. [Nieuwe Architectuur](#3-nieuwe-architectuur)
4. [Database Design](#4-database-design)
5. [Service Layer](#5-service-layer)
6. [API Design](#6-api-design)
7. [Frontend Components](#7-frontend-components)
8. [Settings Page Design](#8-settings-page-design)
9. [Data Flow Diagrams](#9-data-flow-diagrams)
10. [Implementatie Roadmap](#10-implementatie-roadmap)

---

## 1. Executive Summary

### 1.1 Doelstelling

Een **Prompt Manager** applicatie die:

- Prompts beheert (CRUD + versiebeheer)
- Dynamische snippets ondersteunt
- Direct testing via OpenCode SDK mogelijk maakt
- LLM Judge beoordelingen uitvoert
- LLM Council (multi-agent) discussies faciliteert

### 1.2 Kern Features

| Feature                | Prioriteit      | Status         |
| ---------------------- | --------------- | -------------- |
| Settings Management    | 🔴 Kritiek      | Refactor nodig |
| Prompt Execution (PoC) | 🔴 Kritiek      | Nieuw          |
| Snippets System        | 🟡 Belangrijk   | Nieuw          |
| LLM Council            | 🟢 Nice to have | Nieuw          |

### 1.3 Technologie Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | SvelteKit + Svelte 5 (runes)  |
| Database        | Drizzle ORM + libsql (SQLite) |
| AI Integration  | @opencode-ai/sdk v1.1.53      |
| UI Components   | shadcn-svelte                 |
| Editor          | Monaco Editor                 |
| Auth            | Better Auth                   |
| Testing         | Vitest + Playwright           |
| Package Manager | Bun                           |

---

## 2. Huidige Architectuur

### 2.1 Directory Structuur

```
src/
├── lib/
│   ├── components/
│   │   ├── admin/ai-settings/      # Settings UI
│   │   ├── prompts/                 # Prompt editor
│   │   ├── improvement/             # Improvement loops
│   │   └── ui/                      # shadcn components
│   └── server/
│       ├── db/
│       │   ├── schema.ts           # Drizzle schema
│       │   └── client.ts           # DB client
│       ├── services/
│       │   ├── admin-settings.service.ts
│       │   ├── judge.service.ts
│       │   ├── improvement.service.ts
│       │   └── opencode.service.ts
│       ├── opencode/
│       │   └── client.ts           # SDK wrapper
│       └── auth/
└── routes/
    ├── api/
    │   ├── admin/                   # Settings APIs
    │   ├── prompts/                 # Prompt CRUD
    │   ├── judge/                   # Judge evaluation
    │   └── opencode/                # Provider catalog
    └── admin/ai-settings/           # Settings page
```

### 2.2 Bestaande Settings

**DB: adminSettings (key-value)**

```
Category: models
├── judge_model
├── improvement_model
├── default_model
├── opencode_allowed_models (JSON array)
├── opencode_improve_default_model
└── opencode_judge_default_model

Category: temperature
├── judge_temperature
├── improvement_temperature
├── opencode_improve_temperature
└── opencode_judge_temperature

Category: providers
├── provider_priority
└── llm_providers

Category: reasoning
├── store_thinking
├── show_thinking
└── max_thinking_length

Category: display
├── date_format
└── purposes
```

**DB: improvePresets**

```sql
improvePresets
├── id (serial)
├── name (text)
├── description (text)
├── instruction (text)           -- Template with {content}
├── model (text, nullable)       -- Override
├── temperature (real, nullable) -- Override
├── allowedModels (text, nullable) -- JSON array
├── isDefault (integer)
├── createdAt, updatedAt
└── createdBy (text)
```

### 2.3 Huidige Settings UI

```
┌────────────────────────────────────────────────────────────┐
│  AI Settings                                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─ Connection Status ───────────────────────────────┐    │
│  │ Status: Connected ✓                               │    │
│  │ Base URL: http://localhost:3000                   │    │
│  └────────────────────────────────────────────────────┘    │
│                                                            │
│  ┌─ Model Catalog (read-only) ───────────────────────┐    │
│  │ ▼ anthropic (5 models)                            │    │
│  │ ▼ openrouter (20 models)                          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                            │
│  ┌─ AI Policy ───────────────────────────────────────┐    │
│  │ Allowed Models: [checkbox list]                   │    │
│  │ Improve Model: [dropdown]                         │    │
│  │ Improve Temp:  [0.5]                              │    │
│  │ Judge Model:   [dropdown]                         │    │
│  │ Judge Temp:    [0.3]                              │    │
│  │                              [Save Changes]        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                            │
│  ┌─ Improve Presets ──────────────────────────────────┐    │
│  │ • Content Polish (Default)                         │    │
│  │ • Code Refactor                                   │    │
│  │                              [New Preset]          │    │
│  └────────────────────────────────────────────────────┘    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 2.4 Gaps in Huidige Architectuur

| Gap                    | Probleem                           | Oplossing                |
| ---------------------- | ---------------------------------- | ------------------------ |
| Geen Executor settings | Testing heeft geen defaults        | Nieuwe settings sectie   |
| Geen Council settings  | Council roles niet configureerbaar | Nieuwe sectie + DB tabel |
| Geen Snippet defaults  | Snippets hebben geen defaults      | Nieuwe tabel + settings  |
| Flat model selection   | Geen per-functie model groups      | Restructure settings     |
| Geen streaming config  | Streaming niet instelbaar          | Server settings sectie   |

---

## 3. Nieuwe Architectuur

### 3.1 High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │   Settings   │  │    Prompt    │  │   Testing    │  │  Council   │  │
│  │     Page     │  │    Editor    │  │    Panel     │  │   View     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘  │
│         │                 │                 │                 │         │
│         └─────────────────┴─────────────────┴─────────────────┘         │
│                                    │                                     │
│                           ┌────────▼────────┐                           │
│                           │  API Client     │                           │
│                           │  ($lib/api)     │                           │
│                           └────────┬────────┘                           │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │
                                     │ HTTP REST / SSE
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                              BACKEND                                     │
├────────────────────────────────────┼────────────────────────────────────┤
│                                    │                                     │
│  ┌─────────────────────────────────▼─────────────────────────────────┐  │
│  │                        API ROUTES                                  │  │
│  │  /api/admin/settings/*     - Settings CRUD                        │  │
│  │  /api/admin/council/*      - Council config                       │  │
│  │  /api/prompts/*            - Prompts CRUD                         │  │
│  │  /api/prompts/[id]/execute - Execute prompt                       │  │
│  │  /api/snippets/*           - Snippets CRUD                        │  │
│  │  /api/opencode/*           - SDK proxy                            │  │
│  └─────────────────────────────────┬─────────────────────────────────┘  │
│                                    │                                     │
│  ┌─────────────────────────────────▼─────────────────────────────────┐  │
│  │                      SERVICE LAYER                                 │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │  │
│  │  │  Settings   │ │  Execution  │ │  Snippet    │ │  Council    │  │  │
│  │  │  Service    │ │  Service    │ │  Service    │ │  Service    │  │  │
│  │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └──────┬──────┘  │  │
│  │         │               │               │               │          │  │
│  │         └───────────────┴───────────────┴───────────────┘          │  │
│  │                                 │                                   │  │
│  │                    ┌────────────▼────────────┐                     │  │
│  │                    │   OpenCode SDK Client   │                     │  │
│  │                    │   (@opencode-ai/sdk)    │                     │  │
│  │                    └────────────┬────────────┘                     │  │
│  └─────────────────────────────────┼──────────────────────────────────┘  │
│                                    │                                     │
│  ┌─────────────────────────────────▼─────────────────────────────────┐  │
│  │                        DATABASE                                    │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │  │
│  │  │ Settings │ │ Snippets │ │ Council  │ │ Prompts  │              │  │
│  │  │ (kv)     │ │          │ │ Sessions │ │          │              │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     │ HTTP REST
                                     │
┌────────────────────────────────────┼────────────────────────────────────┐
│                         OPENCODE SERVER                                  │
├────────────────────────────────────┼────────────────────────────────────┤
│                           opencode serve                                 │
│                              port: 3000                                  │
└──────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Feature Modules

```
Modules:
├── Settings Module
│   ├── Connection config
│   ├── Model catalog
│   ├── Function defaults (Executor, Judge, Council, Improve)
│   └── Global policies
│
├── Prompts Module
│   ├── CRUD operations
│   ├── Version control
│   ├── Snippet integration
│   └── Template preview
│
├── Execution Module
│   ├── Single execution
│   ├── Streaming responses
│   ├── Result display
│   └── Metrics tracking
│
├── Judge Module (bestaat)
│   ├── Rubric evaluation
│   └── Score tracking
│
├── Council Module (nieuw)
│   ├── Correct mode
│   ├── Debate mode
│   └── Consensus mode
│
└── Snippets Module (nieuw)
    ├── Variable definitions
    ├── Default values
    └── JavaScript evaluation
```

---

## 4. Database Design

### 4.1 Nieuw Schema Overzicht

```typescript
// Bestaande tabellen (ongewijzigd)
-prompts -
  promptVersions -
  judgeEvaluations -
  improvementLoops -
  improvementVariants -
  promptRelationships -
  performanceMetrics -
  session(better - auth) -
  user(better - auth) -
  // Bestaand, uit te breiden
  adminSettings - // Key-value store
  improvePresets - // Instruction templates
  // NIEUW
  snippets - // Herbruikbare placeholders
  snippetValues - // Per-prompt snippet waarden
  councilSessions - // Council runs
  councilSteps - // Individual agent contributions
  executionLogs; // Prompt execution history
```

### 4.2 Nieuwe Tabellen

#### 4.2.1 snippets

```typescript
export const snippets = sqliteTable("snippets", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Identificatie
  name: text("name").notNull().unique(), // e.g., "CONTEXT"
  description: text("description"),
  type: text("type").notNull().default("text"), // text | javascript | date | select

  // Content
  defaultValue: text("default_value"), // Standaard waarde
  options: text("options"), // JSON array voor type=select
  template: text("template"), // Template string

  // Metadata
  category: text("category"), // Groepering
  order: integer("order").default(0), // Sortering

  // Timestamps
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  createdBy: text("created_by"),
});
```

#### 4.2.2 snippetValues

```typescript
export const snippetValues = sqliteTable(
  "snippet_values",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    // References
    promptId: integer("prompt_id").references(() => prompts.id),
    snippetId: integer("snippet_id").references(() => snippets.id),

    // Value
    value: text("value").notNull(),

    // Metadata
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date(),
    ),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
      () => new Date(),
    ),

    // Unique constraint: één waarde per prompt-snippet combo
  },
  (table) => ({
    promptSnippetUnique: uniqueIndex("prompt_snippet_unique").on(
      table.promptId,
      table.snippetId,
    ),
  }),
);
```

#### 4.2.3 councilSessions

```typescript
export const councilSessions = sqliteTable("council_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  // Reference
  promptId: integer("prompt_id").references(() => prompts.id),
  promptVersionId: integer("prompt_version_id").references(
    () => promptVersions.id,
  ),

  // Configuration
  mode: text("mode").notNull(), // 'correct' | 'debate' | 'consensus'
  config: text("config").notNull(), // JSON: roles, models, rounds

  // Status
  status: text("status").notNull().default("pending"), // pending | running | completed | failed

  // Result
  result: text("result"), // JSON: final output
  consensus: text("consensus"), // For consensus mode

  // Metrics
  totalTokens: integer("total_tokens").default(0),
  totalDuration: integer("total_duration"), // milliseconds

  // Timestamps
  startedAt: integer("started_at", { mode: "timestamp" }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  createdBy: text("created_by"),
});
```

#### 4.2.4 councilSteps

```typescript
export const councilSteps = sqliteTable(
  "council_steps",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    // Reference
    sessionId: integer("session_id")
      .references(() => councilSessions.id)
      .notNull(),

    // Step info
    step: integer("step").notNull(), // Step number
    role: text("role").notNull(), // producer | reviewer | fix | round-N | moderator | proposal | vote | synthesis

    // Model
    model: text("model").notNull(), // provider/model format

    // Content
    input: text("input"), // Input prompt
    output: text("output"), // Agent response

    // Metrics
    tokens: integer("tokens").default(0),
    duration: integer("duration"), // milliseconds

    // Status
    status: text("status").notNull().default("pending"), // pending | running | completed | failed
    error: text("error"),

    // Timestamp
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date(),
    ),
  },
  (table) => ({
    sessionStepIdx: index("council_steps_session_idx").on(
      table.sessionId,
      table.step,
    ),
  }),
);
```

#### 4.2.5 executionLogs

```typescript
export const executionLogs = sqliteTable(
  "execution_logs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    // Reference
    promptId: integer("prompt_id").references(() => prompts.id),
    promptVersionId: integer("prompt_version_id").references(
      () => promptVersions.id,
    ),

    // Configuration
    model: text("model").notNull(),
    temperature: real("temperature"),
    resolvedPrompt: text("resolved_prompt"), // After snippet replacement

    // Result
    response: text("response"), // AI response
    success: integer("success", { mode: "boolean" }).notNull(),
    error: text("error"),

    // Metrics
    inputTokens: integer("input_tokens").default(0),
    outputTokens: integer("output_tokens").default(0),
    duration: integer("duration"), // milliseconds

    // Metadata
    executionType: text("execution_type").default("manual"), // manual | judge | council | improve

    // Timestamp
    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
      () => new Date(),
    ),
  },
  (table) => ({
    promptIdx: index("execution_logs_prompt_idx").on(table.promptId),
    createdAtIdx: index("execution_logs_created_idx").on(table.createdAt),
  }),
);
```

### 4.3 Uitgebreide adminSettings

```typescript
// NIEUWE SETTINGS KEYS

// Category: executor
"executor_default_model"; // Default model voor testing
"executor_default_temperature"; // Default temperature
"executor_streaming_enabled"; // SSE streaming toggle
"executor_max_tokens"; // Max output tokens

// Category: council
"council_correct_producer"; // Default producer model
"council_correct_reviewer"; // Default reviewer model
"council_correct_fix"; // Default fix model
"council_debate_agents"; // JSON array of models
"council_debate_rounds"; // Number of rounds
"council_debate_moderator"; // Moderator model (optional)
"council_consensus_agents"; // JSON array of models
"council_consensus_synthesizer"; // Synthesizer model

// Category: snippets
"snippet_auto_evaluate"; // Auto-evaluate JS snippets
"snippet_cache_ttl"; // Cache TTL for JS results

// Category: server
"opencode_base_url"; // SDK server URL
"opencode_request_timeout"; // Request timeout ms
"opencode_retry_attempts"; // Retry attempts
"opencode_retry_delay"; // Retry delay ms
```

---

## 5. Service Layer

### 5.1 Service Architectuur

```
src/lib/server/services/
├── admin-settings.service.ts    ✅ Bestaat - UIT TE BREIDEN
├── opencode.service.ts          ✅ Bestaat - UIT TE BREIDEN
├── judge.service.ts             ✅ Bestaat
├── improvement.service.ts       ✅ Bestaat
│
├── execution.service.ts         🆕 NIEUW
├── snippet.service.ts           🆕 NIEUW
├── council.service.ts           🆕 NIEUW
└── settings-validator.service.ts 🆕 NIEUW
```

### 5.2 execution.service.ts

```typescript
// src/lib/server/services/execution.service.ts

import { getOpencodeClient } from "../opencode/client";
import { getOpenCodePolicy, isModelAllowed } from "./admin-settings.service";
import { db } from "../db/client";
import { executionLogs } from "../db/schema";
import type { ExecutionLog, NewExecutionLog } from "../db/schema";

export interface ExecutionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  streaming?: boolean;
  executionType?: "manual" | "judge" | "council" | "improve";
}

export interface ExecutionResult {
  success: boolean;
  response?: string;
  error?: string;
  inputTokens: number;
  outputTokens: number;
  duration: number;
  logId: number;
}

/**
 * Execute a prompt with the given options
 */
export async function executePrompt(
  promptContent: string,
  options: ExecutionOptions = {},
): Promise<ExecutionResult> {
  const startTime = Date.now();

  // Get policy and determine model
  const policy = await getOpenCodePolicy();
  const model = options.model || policy.improveDefaultModel;

  // Validate model
  if (!isModelAllowed(model, policy)) {
    throw new Error(`Model ${model} is not allowed by policy`);
  }

  // Get SDK client
  const client = await getOpencodeClient();

  try {
    // Create session
    const session = await client.session.create({
      body: { title: `Execution at ${new Date().toISOString()}` },
    });

    // Execute prompt
    const response = await client.session.prompt({
      path: { id: session.data.id },
      body: {
        model: parseModel(model),
        parts: [{ type: "text", text: promptContent }],
        temperature: options.temperature ?? policy.improveTemperature,
      },
    });

    // Get messages for token counts
    const messages = await client.session.messages({
      path: { id: session.data.id },
    });

    const duration = Date.now() - startTime;
    const result: ExecutionResult = {
      success: true,
      response: response.data.parts?.[0]?.text || "",
      inputTokens: messages.data.inputTokens || 0,
      outputTokens: messages.data.outputTokens || 0,
      duration,
      logId: 0,
    };

    // Log execution
    const log = await logExecution({
      promptId: null,
      promptVersionId: null,
      model,
      temperature: options.temperature ?? policy.improveTemperature,
      resolvedPrompt: promptContent,
      response: result.response,
      success: true,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      duration,
      executionType: options.executionType || "manual",
    });

    result.logId = log.id;
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    // Log failed execution
    const log = await logExecution({
      promptId: null,
      model,
      resolvedPrompt: promptContent,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      duration,
      executionType: options.executionType || "manual",
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      inputTokens: 0,
      outputTokens: 0,
      duration,
      logId: log.id,
    };
  }
}

/**
 * Execute with streaming (SSE)
 */
export async function* executePromptStream(
  promptContent: string,
  options: ExecutionOptions = {},
): AsyncGenerator<StreamEvent> {
  const startTime = Date.now();

  const policy = await getOpenCodePolicy();
  const model = options.model || policy.improveDefaultModel;

  if (!isModelAllowed(model, policy)) {
    yield { type: "error", error: `Model ${model} is not allowed` };
    return;
  }

  const client = await getOpencodeClient();

  try {
    // Subscribe to events
    const events = await client.event.subscribe();

    // Create session
    const session = await client.session.create({
      body: { title: `Stream at ${new Date().toISOString()}` },
    });

    yield { type: "session_created", sessionId: session.data.id };

    // Start prompt
    const promptPromise = client.session.prompt({
      path: { id: session.data.id },
      body: {
        model: parseModel(model),
        parts: [{ type: "text", text: promptContent }],
        temperature: options.temperature,
      },
    });

    // Stream events
    for await (const event of events.stream) {
      if (event.properties?.sessionID !== session.data.id) continue;

      switch (event.type) {
        case "message.updated":
          yield { type: "chunk", content: event.properties.content };
          break;
        case "session.idle":
          yield { type: "complete" };
          break;
        case "session.error":
          yield { type: "error", error: event.properties.error };
          break;
      }
    }
  } catch (error) {
    yield {
      type: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Helper functions
function parseModel(modelId: string): { providerID: string; modelID: string } {
  const [providerID, ...modelParts] = modelId.split("/");
  return { providerID, modelID: modelParts.join("/") };
}

async function logExecution(data: NewExecutionLog): Promise<ExecutionLog> {
  const [log] = await db.insert(executionLogs).values(data).returning();
  return log;
}

// Types
export type StreamEvent =
  | { type: "session_created"; sessionId: string }
  | { type: "chunk"; content: string }
  | { type: "complete" }
  | { type: "error"; error: string };
```

### 5.3 snippet.service.ts

```typescript
// src/lib/server/services/snippet.service.ts

import { db } from "../db/client";
import { snippets, snippetValues, prompts } from "../db/schema";
import { eq, and } from "drizzle-orm";
import type {
  Snippet,
  SnippetValue,
  NewSnippet,
  NewSnippetValue,
} from "../db/schema";

const SNIPPET_PATTERN = /\{\{(\w+)(?::([^}]+))?\}\}/g;

export interface ResolvedSnippet {
  name: string;
  type: "text" | "javascript" | "date" | "select";
  defaultValue?: string;
  options?: string[];
}

/**
 * Extract snippets from template content
 */
export function extractSnippets(content: string): ResolvedSnippet[] {
  const found = new Map<string, ResolvedSnippet>();

  let match;
  while ((match = SNIPPET_PATTERN.exec(content)) !== null) {
    const name = match[1];
    const modifier = match[2];

    if (!found.has(name)) {
      found.set(name, {
        name,
        type: modifier?.startsWith("js:")
          ? "javascript"
          : modifier?.startsWith("date:")
            ? "date"
            : "text",
        defaultValue: modifier || undefined,
      });
    }
  }

  return Array.from(found.values());
}

/**
 * Replace snippets with values
 */
export function replaceSnippets(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(SNIPPET_PATTERN, (match, name, modifier) => {
    const value = values[name];

    if (value === undefined) {
      // Use default or keep placeholder
      return modifier || match;
    }

    // Handle JavaScript evaluation
    if (modifier?.startsWith("js:")) {
      return evaluateJavaScript(value);
    }

    // Handle date formatting
    if (modifier?.startsWith("date:")) {
      return formatDate(value, modifier.slice(5));
    }

    return value;
  });
}

/**
 * Get all snippets
 */
export async function getAllSnippets(): Promise<Snippet[]> {
  return db.select().from(snippets).orderBy(snippets.order);
}

/**
 * Get snippet by name
 */
export async function getSnippetByName(name: string): Promise<Snippet | null> {
  const [snippet] = await db
    .select()
    .from(snippets)
    .where(eq(snippets.name, name))
    .limit(1);
  return snippet || null;
}

/**
 * Create or update snippet
 */
export async function upsertSnippet(data: NewSnippet): Promise<Snippet> {
  const existing = await getSnippetByName(data.name);

  if (existing) {
    const [updated] = await db
      .update(snippets)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(snippets.id, existing.id))
      .returning();
    return updated;
  }

  const [created] = await db.insert(snippets).values(data).returning();
  return created;
}

/**
 * Get snippet values for a prompt
 */
export async function getPromptSnippetValues(
  promptId: number,
): Promise<Record<string, string>> {
  const values = await db
    .select()
    .from(snippetValues)
    .where(eq(snippetValues.promptId, promptId));

  return values.reduce(
    (acc, v) => {
      acc[v.snippetName] = v.value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Set snippet value for a prompt
 */
export async function setPromptSnippetValue(
  promptId: number,
  snippetName: string,
  value: string,
): Promise<SnippetValue> {
  // Get snippet ID
  const snippet = await getSnippetByName(snippetName);
  if (!snippet) {
    throw new Error(`Snippet "${snippetName}" not found`);
  }

  // Upsert value
  const existing = await db
    .select()
    .from(snippetValues)
    .where(
      and(
        eq(snippetValues.promptId, promptId),
        eq(snippetValues.snippetId, snippet.id),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    const [updated] = await db
      .update(snippetValues)
      .set({ value, updatedAt: new Date() })
      .where(eq(snippetValues.id, existing[0].id))
      .returning();
    return updated;
  }

  const [created] = await db
    .insert(snippetValues)
    .values({ promptId, snippetId: snippet.id, value })
    .returning();
  return created;
}

/**
 * Build final prompt with snippet values
 */
export async function buildPrompt(
  templateContent: string,
  promptId: number,
  overrides?: Record<string, string>,
): Promise<string> {
  // Get saved values
  const savedValues = await getPromptSnippetValues(promptId);

  // Merge with overrides
  const values = { ...savedValues, ...overrides };

  // Get defaults for missing snippets
  const snippets = extractSnippets(templateContent);
  for (const snippet of snippets) {
    if (!values[snippet.name] && snippet.defaultValue) {
      values[snippet.name] = snippet.defaultValue;
    }
  }

  return replaceSnippets(templateContent, values);
}

// Private helpers
function evaluateJavaScript(code: string): string {
  try {
    // Safe evaluation context
    const sandbox = {
      Date,
      Math,
      JSON,
      Object,
      Array,
      String,
      Number,
      Boolean,
    };

    // Create function and evaluate
    const fn = new Function(...Object.keys(sandbox), `return ${code}`);
    return String(fn(...Object.values(sandbox)));
  } catch (error) {
    return `[JS Error: ${error instanceof Error ? error.message : "Unknown"}]`;
  }
}

function formatDate(value: string, format: string): string {
  const date = new Date(value);
  // Simple date formatting
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
```

### 5.4 council.service.ts

```typescript
// src/lib/server/services/council.service.ts

import { getOpencodeClient } from "../opencode/client";
import { getOpenCodePolicy, getSetting } from "./admin-settings.service";
import { db } from "../db/client";
import { councilSessions, councilSteps } from "../db/schema";
import type {
  CouncilSession,
  CouncilStep,
  NewCouncilSession,
  NewCouncilStep,
} from "../db/schema";

// Types
export type CouncilMode = "correct" | "debate" | "consensus";

export interface CouncilConfig {
  mode: CouncilMode;
  models: {
    producer?: string;
    reviewer?: string;
    fix?: string;
    agents?: string[];
    moderator?: string;
    synthesizer?: string;
  };
  rounds?: number;
}

export interface CouncilResult {
  sessionId: number;
  mode: CouncilMode;
  status: "completed" | "failed";
  steps: CouncilStep[];
  result?: string;
  consensus?: string;
  totalTokens: number;
  duration: number;
}

/**
 * Run Correct mode: Producer → Reviewer → Fix
 */
export async function runCorrection(
  prompt: string,
  config: CouncilConfig,
): Promise<CouncilResult> {
  const startTime = Date.now();

  // Get defaults
  const producerModel =
    config.models.producer ||
    (await getSetting("council_correct_producer")) ||
    "anthropic/claude-3-5-sonnet-20241022";
  const reviewerModel =
    config.models.reviewer ||
    (await getSetting("council_correct_reviewer")) ||
    "anthropic/claude-3-5-sonnet-20241022";
  const fixModel =
    config.models.fix ||
    (await getSetting("council_correct_fix")) ||
    producerModel;

  // Create session
  const session = await createCouncilSession({
    promptId: null,
    mode: "correct",
    config: JSON.stringify(config),
    status: "running",
  });

  try {
    // Step 1: Producer
    const producerOutput = await executeStep(
      session.id,
      1,
      "producer",
      producerModel,
      prompt,
    );

    // Step 2: Reviewer
    const reviewPrompt = `Review the following output and identify any issues:\n\n${producerOutput.output}`;
    const reviewOutput = await executeStep(
      session.id,
      2,
      "reviewer",
      reviewerModel,
      reviewPrompt,
    );

    // Step 3: Fix (if issues found)
    let finalOutput = producerOutput.output;
    if (
      reviewOutput.output.toLowerCase().includes("issue") ||
      reviewOutput.output.toLowerCase().includes("error")
    ) {
      const fixPrompt = `Fix the following based on the review:\n\nOriginal:\n${producerOutput.output}\n\nReview:\n${reviewOutput.output}`;
      const fixOutput = await executeStep(
        session.id,
        3,
        "fix",
        fixModel,
        fixPrompt,
      );
      finalOutput = fixOutput.output;
    }

    // Calculate totals
    const steps = await getSessionSteps(session.id);
    const totalTokens = steps.reduce((sum, s) => sum + (s.tokens || 0), 0);
    const duration = Date.now() - startTime;

    // Update session
    await updateCouncilSession(session.id, {
      status: "completed",
      result: finalOutput,
      totalTokens,
      totalDuration: duration,
      completedAt: new Date(),
    });

    return {
      sessionId: session.id,
      mode: "correct",
      status: "completed",
      steps,
      result: finalOutput,
      totalTokens,
      duration,
    };
  } catch (error) {
    await updateCouncilSession(session.id, {
      status: "failed",
      completedAt: new Date(),
    });

    throw error;
  }
}

/**
 * Run Debate mode: Rounds + Moderator
 */
export async function runDebate(
  prompt: string,
  config: CouncilConfig,
): Promise<CouncilResult> {
  const startTime = Date.now();

  const agents =
    config.models.agents ||
    JSON.parse((await getSetting("council_debate_agents")) || "[]");
  const rounds =
    config.rounds ||
    parseInt((await getSetting("council_debate_rounds")) || "2");
  const moderator =
    config.models.moderator || (await getSetting("council_debate_moderator"));

  if (agents.length < 2) {
    throw new Error("Debate requires at least 2 agents");
  }

  // Create session
  const session = await createCouncilSession({
    promptId: null,
    mode: "debate",
    config: JSON.stringify(config),
    status: "running",
  });

  try {
    const outputs: string[] = [];
    let stepNum = 0;

    for (let round = 0; round < rounds; round++) {
      for (let i = 0; i < agents.length; i++) {
        stepNum++;
        const role = `round-${round}`;

        const debatePrompt =
          round === 0
            ? prompt
            : `Round ${round + 1}. Previous arguments:\n${outputs.join("\n\n")}\n\nYour counter-argument:`;

        const output = await executeStep(
          session.id,
          stepNum,
          role,
          agents[i],
          debatePrompt,
        );

        outputs.push(`**Agent ${i + 1} (${agents[i]}):**\n${output.output}`);
      }
    }

    // Moderator synthesis
    if (moderator) {
      stepNum++;
      const modPrompt = `Synthesize these arguments and provide a conclusion:\n\n${outputs.join("\n\n")}`;
      await executeStep(session.id, stepNum, "moderator", moderator, modPrompt);
    }

    // Calculate totals
    const steps = await getSessionSteps(session.id);
    const totalTokens = steps.reduce((sum, s) => sum + (s.tokens || 0), 0);
    const duration = Date.now() - startTime;

    await updateCouncilSession(session.id, {
      status: "completed",
      result: outputs.join("\n\n---\n\n"),
      totalTokens,
      totalDuration: duration,
      completedAt: new Date(),
    });

    return {
      sessionId: session.id,
      mode: "debate",
      status: "completed",
      steps,
      result: outputs.join("\n\n---\n\n"),
      totalTokens,
      duration,
    };
  } catch (error) {
    await updateCouncilSession(session.id, {
      status: "failed",
      completedAt: new Date(),
    });
    throw error;
  }
}

/**
 * Run Consensus mode: Propose → Vote → Synthesize
 */
export async function runConsensus(
  prompt: string,
  config: CouncilConfig,
): Promise<CouncilResult> {
  const startTime = Date.now();

  const agents =
    config.models.agents ||
    JSON.parse((await getSetting("council_consensus_agents")) || "[]");
  const synthesizer =
    config.models.synthesizer ||
    (await getSetting("council_consensus_synthesizer")) ||
    agents[0];

  if (agents.length < 2) {
    throw new Error("Consensus requires at least 2 agents");
  }

  // Create session
  const session = await createCouncilSession({
    promptId: null,
    mode: "consensus",
    config: JSON.stringify(config),
    status: "running",
  });

  try {
    const proposals: string[] = [];

    // Step 1: Proposals
    for (let i = 0; i < agents.length; i++) {
      const output = await executeStep(
        session.id,
        i + 1,
        "proposal",
        agents[i],
        prompt,
      );
      proposals.push(output.output);
    }

    // Step 2: Votes
    const votes: string[] = [];
    for (let i = 0; i < agents.length; i++) {
      const votePrompt = `Here are proposals for: "${prompt}"\n\n${proposals.map((p, j) => `Proposal ${j + 1}:\n${p}`).join("\n\n")}\n\nWhich proposal do you prefer and why?`;

      const output = await executeStep(
        session.id,
        agents.length + i + 1,
        "vote",
        agents[i],
        votePrompt,
      );
      votes.push(output.output);
    }

    // Step 3: Synthesis
    const synthPrompt = `Based on these proposals and votes, create a final consensus:\n\nProposals:\n${proposals.join("\n\n")}\n\nVotes:\n${votes.join("\n\n")}`;
    const synthOutput = await executeStep(
      session.id,
      agents.length * 2 + 1,
      "synthesis",
      synthesizer,
      synthPrompt,
    );

    // Calculate totals
    const steps = await getSessionSteps(session.id);
    const totalTokens = steps.reduce((sum, s) => sum + (s.tokens || 0), 0);
    const duration = Date.now() - startTime;

    await updateCouncilSession(session.id, {
      status: "completed",
      result: synthOutput.output,
      consensus: synthOutput.output,
      totalTokens,
      totalDuration: duration,
      completedAt: new Date(),
    });

    return {
      sessionId: session.id,
      mode: "consensus",
      status: "completed",
      steps,
      result: synthOutput.output,
      consensus: synthOutput.output,
      totalTokens,
      duration,
    };
  } catch (error) {
    await updateCouncilSession(session.id, {
      status: "failed",
      completedAt: new Date(),
    });
    throw error;
  }
}

// Helper functions
async function createCouncilSession(
  data: NewCouncilSession,
): Promise<CouncilSession> {
  const [session] = await db.insert(councilSessions).values(data).returning();
  return session;
}

async function updateCouncilSession(
  id: number,
  data: Partial<CouncilSession>,
): Promise<void> {
  await db.update(councilSessions).set(data).where(eq(councilSessions.id, id));
}

async function getSessionSteps(sessionId: number): Promise<CouncilStep[]> {
  return db
    .select()
    .from(councilSteps)
    .where(eq(councilSteps.sessionId, sessionId))
    .orderBy(councilSteps.step);
}

async function executeStep(
  sessionId: number,
  step: number,
  role: string,
  model: string,
  input: string,
): Promise<CouncilStep> {
  const startTime = Date.now();

  const client = await getOpencodeClient();

  // Create session and execute
  const session = await client.session.create({
    body: { title: `Council step ${step}` },
  });

  const response = await client.session.prompt({
    path: { id: session.data.id },
    body: {
      model: parseModel(model),
      parts: [{ type: "text", text: input }],
    },
  });

  const output = response.data.parts?.[0]?.text || "";
  const duration = Date.now() - startTime;

  // Save step
  const [savedStep] = await db
    .insert(councilSteps)
    .values({
      sessionId,
      step,
      role,
      model,
      input,
      output,
      tokens: response.data.usage?.totalTokens || 0,
      duration,
      status: "completed",
    })
    .returning();

  return savedStep;
}

function parseModel(modelId: string): { providerID: string; modelID: string } {
  const [providerID, ...modelParts] = modelId.split("/");
  return { providerID, modelID: modelParts.join("/") };
}

import { eq } from "drizzle-orm";
```

---

## 6. API Design

### 6.1 API Endpoints Overview

```
/api/admin/
├── settings                     GET    - Get all settings
├── settings/[key]               GET    - Get single setting
├── settings/[key]               PUT    - Update setting
├── settings/reset               POST   - Reset to defaults
│
├── health                       GET    - Health check
├── improve-presets              GET    - List presets
├── improve-presets              POST   - Create preset
├── improve-presets/[id]         PUT    - Update preset
├── improve-presets/[id]         DELETE - Delete preset
│
└── council-config               GET    - Get council settings
    council-config               PUT    - Update council settings

/api/prompts/
├──                              GET    - List prompts
├──                              POST   - Create prompt
├── [id]                         GET    - Get prompt
├── [id]                         PUT    - Update prompt
├── [id]                         DELETE - Delete prompt
├── [id]/versions                GET    - List versions
├── [id]/versions                POST   - Create version
├── [id]/execute                 POST   - Execute prompt 🆕
├── [id]/stream                  GET    - Stream execution 🆕
└── [id]/snippet-values          GET    - Get snippet values 🆕
    [id]/snippet-values          PUT    - Set snippet values 🆕

/api/snippets/                   🆕 NIEUW
├──                              GET    - List snippets
├──                              POST   - Create snippet
├── [id]                         GET    - Get snippet
├── [id]                         PUT    - Update snippet
└── [id]                         DELETE - Delete snippet

/api/council/                    🆕 NIEUW
├── correct                      POST   - Run correct mode
├── debate                       POST   - Run debate mode
├── consensus                    POST   - Run consensus mode
├── sessions/[id]                GET    - Get session
└── sessions/[id]/steps          GET    - Get steps

/api/opencode/
├── providers                    GET    - Get catalog
├── health                       GET    - Health check
└── models                       GET    - List all models
```

### 6.2 Nieuwe API Endpoints

#### 6.2.1 POST /api/prompts/[id]/execute

```typescript
// Request
{
	"model": "anthropic/claude-3-5-sonnet-20241022",  // Optional override
	"temperature": 0.7,                                // Optional override
	"variables": {                                     // Snippet values
		"CONTEXT": "user authentication",
		"TASK": "write function"
	}
}

// Response
{
	"success": true,
	"data": {
		"logId": 123,
		"response": "Here's the function...",
		"inputTokens": 150,
		"outputTokens": 234,
		"duration": 2340
	}
}
```

#### 6.2.2 GET /api/prompts/[id]/stream (SSE)

```
event: session_created
data: {"sessionId": "abc123"}

event: chunk
data: {"content": "Here's"}

event: chunk
data: {"content": " the"}

event: chunk
data: {"content": " function..."}

event: complete
data: {}
```

#### 6.2.3 POST /api/council/correct

```typescript
// Request
{
	"prompt": "Write a function that...",
	"models": {
		"producer": "anthropic/claude-3-5-sonnet-20241022",
		"reviewer": "openai/gpt-4o",
		"fix": "anthropic/claude-3-5-sonnet-20241022"
	}
}

// Response
{
	"success": true,
	"data": {
		"sessionId": 45,
		"mode": "correct",
		"status": "completed",
		"result": "The fixed function...",
		"steps": [...],
		"totalTokens": 1234,
		"duration": 15000
	}
}
```

---

## 7. Frontend Components

### 7.1 Component Structure

```
src/lib/components/
├── admin/
│   ├── ai-settings/
│   │   ├── connection-status.svelte     ✅ Bestaat
│   │   ├── catalog-view.svelte          ✅ Bestaat
│   │   ├── policy-editor.svelte         ✅ Bestaat → REFACTOR
│   │   ├── improve-presets.svelte       ✅ Bestaat
│   │   ├── function-defaults.svelte     🆕 NIEUW
│   │   ├── council-config.svelte        🆕 NIEUW
│   │   ├── server-config.svelte         🆕 NIEUW
│   │   └── collapsible.svelte           ✅ Bestaat
│   └── admin-layout.svelte
│
├── prompts/
│   ├── prompt-editor.svelte             ✅ Bestaat → EXTEND
│   ├── prompt-preview.svelte            🆕 NIEUW
│   ├── variable-input.svelte            🆕 NIEUW
│   └── snippet-manager.svelte           🆕 NIEUW
│
├── testing/
│   ├── test-runner.svelte               🆕 NIEUW
│   ├── test-results.svelte              🆕 NIEUW
│   └── execution-history.svelte         🆕 NIEUW
│
├── council/
│   ├── council-viewer.svelte            🆕 NIEUW
│   ├── council-step.svelte              🆕 NIEUW
│   ├── council-config-form.svelte       🆕 NIEUW
│   └── council-comparison.svelte        🆕 NIEUW
│
├── snippets/
│   ├── snippet-list.svelte              🆕 NIEUW
│   ├── snippet-form.svelte              🆕 NIEUW
│   └── snippet-picker.svelte            🆕 NIEUW
│
└── ui/                                  ✅ shadcn-svelte
```

### 7.2 Nieuwe Componenten

#### 7.2.1 function-defaults.svelte

Settings voor elke functie (Executor, Judge, Council, Improve).

```svelte
<script lang="ts">
	interface Props {
		functionType: 'executor' | 'judge' | 'council' | 'improve';
		models: ModelInfo[];
		settings: Record<string, string>;
		onSave: (settings: Record<string, string>) => void;
	}

	let { functionType, models, settings, onSave }: Props = $props();

	let defaultModel = $state(settings[`${functionType}_default_model`] || '');
	let temperature = $state(settings[`${functionType}_temperature`] || '0.5');
	let maxTokens = $state(settings[`${functionType}_max_tokens`] || '4096');
</script>

<Card>
	<CardHeader>
		<CardTitle>{functionType.charAt(0).toUpperCase() + functionType.slice(1)} Defaults</CardTitle>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			<div>
				<label>Default Model</label>
				<select bind:value={defaultModel}>
					<option value="">Select model...</option>
					{#each models as model}
						<option value={model.id}>{model.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label>Temperature</label>
				<Input type="number" min="0" max="2" step="0.1" bind:value={temperature} />
			</div>

			<div>
				<label>Max Tokens</label>
				<Input type="number" min="1" bind:value={maxTokens} />
			</div>
		</div>

		<Button onclick={() => onSave({ defaultModel, temperature, maxTokens })}>
			Save
		</Button>
	</CardContent>
</Card>
```

#### 7.2.2 test-runner.svelte

```svelte
<script lang="ts">
	interface Props {
		promptId: number;
		promptContent: string;
		variables: Record<string, string>;
	}

	let { promptId, promptContent, variables }: Props = $props();

	let selectedModel = $state('');
	let temperature = $state(0.7);
	let isRunning = $state(false);
	let result = $state<ExecutionResult | null>(null);

	async function runTest() {
		isRunning = true;
		try {
			const response = await fetch(`/api/prompts/${promptId}/execute`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					model: selectedModel,
					temperature,
					variables
				})
			});

			const data = await response.json();
			result = data.data;
		} finally {
			isRunning = false;
		}
	}
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<select bind:value={selectedModel}>
			<option value="">Select model...</option>
			{#each models as model}
				<option value={model.id}>{model.name}</option>
			{/each}
		</select>

		<Input type="number" min="0" max="2" step="0.1" bind:value={temperature} />

		<Button onclick={runTest} disabled={isRunning || !selectedModel}>
			{isRunning ? 'Running...' : 'Run Test'}
		</Button>
	</div>

	{#if result}
		<TestResults {result} />
	{/if}
</div>
```

---

## 8. Settings Page Design

### 8.1 Nieuwe Settings Page Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ⚙️ AI Settings                                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─ Tabs ────────────────────────────────────────────────────────────────┐   │
│  │ [Connection] [Models] [Functions] [Council] [Presets] [Advanced]     │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ═════════════════════════════════════════════════════════════════════════   │
│                                                                               │
│  TAB: Connection                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │  Connection Status                                                   │     │
│  │  ┌─────────────────────────────────────────────────────────────┐   │     │
│  │  │ Status: ● Connected                                          │   │     │
│  │  │ Base URL: http://localhost:3000                              │   │     │
│  │  │ Version: 1.1.53                                              │   │     │
│  │  │ Last Check: 2 minutes ago                  [Refresh]         │   │     │
│  │  └─────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  Server Configuration                                                │     │
│  │  ┌─────────────────────────────────────────────────────────────┐   │     │
│  │  │ OpenCode URL:      [http://localhost:3000              ]    │   │     │
│  │  │ Request Timeout:   [30000                          ] ms      │   │     │
│  │  │ Retry Attempts:    [3                               ]         │   │     │
│  │  │ Retry Delay:       [1000                            ] ms      │   │     │
│  │  │                                               [Save Config]    │   │     │
│  │  └─────────────────────────────────────────────────────────────┘   │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  TAB: Models                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │  ┌─ Global Policy ──────────────────────────────────────────────┐   │     │
│  │  │ ☑ Allow all models from catalog                              │   │     │
│  │  │ OR                                                           │   │     │
│  │  │ ☐ Restrict to allowed list:                                  │   │     │
│  │  │   [checkbox list of models...]                               │   │     │
│  │  │                                          [Save Policy]        │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Model Catalog ───────────────────────────────────────────────┐   │     │
│  │  │ 5 providers • 45 active models                [Refresh]        │   │     │
│  │  │                                                                  │   │     │
│  │  │ ▼ anthropic (8 models)                                           │   │     │
│  │  │   • Claude 3.5 Sonnet    anthropic/claude-3-5-sonnet  200k ctx │   │     │
│  │  │   • Claude 3 Opus        anthropic/claude-3-opus      200k ctx │   │     │
│  │  │                                                                  │   │     │
│  │  │ ▶ openrouter (25 models)                                         │   │     │
│  │  │ ▶ ollama (5 models)                                              │   │     │
│  │  │ ▶ openai (5 models)                                              │   │     │
│  │  │ ▶ gemini (2 models)                                              │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  TAB: Functions                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │  Configure defaults for each function                               │     │
│  │                                                                      │     │
│  │  ┌─ Executor ───────────────────────────────────────────────────┐   │     │
│  │  │ Default Model:  [Claude 3.5 Sonnet                    ▼]     │   │     │
│  │  │ Temperature:    [0.7                                   ]     │   │     │
│  │  │ Max Tokens:     [4096                                  ]     │   │     │
│  │  │ ☑ Enable streaming                                          │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Judge ───────────────────────────────────────────────────────┐   │     │
│  │  │ Default Model:  [Claude 3.5 Sonnet                    ▼]     │   │     │
│  │  │ Temperature:    [0.3                                   ]     │   │     │
│  │  │ Rubric:         [clarity, completeness, specificity   ]     │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Improve ─────────────────────────────────────────────────────┐   │     │
│  │  │ Default Model:  [Claude 3.5 Sonnet                    ▼]     │   │     │
│  │  │ Temperature:    [0.5                                   ]     │   │     │
│  │  │ Default Preset: [Content Polish                        ▼]     │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Council ─────────────────────────────────────────────────────┐   │     │
│  │  │ See "Council" tab for detailed configuration                 │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │                                          [Save All Functions]        │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  TAB: Council                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                                                                      │     │
│  │  ┌─ Correct Mode ────────────────────────────────────────────────┐   │     │
│  │  │ Producer:  [Claude 3.5 Sonnet                            ▼]   │   │     │
│  │  │ Reviewer: [GPT-4o                                        ▼]   │   │     │
│  │  │ Fix:      [Claude 3.5 Sonnet                            ▼]   │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Debate Mode ─────────────────────────────────────────────────┐   │     │
│  │  │ Agents (min 2):                                                │   │     │
│  │  │   ☑ Claude 3.5 Sonnet                                         │   │     │
│  │  │   ☑ GPT-4o                                                     │   │     │
│  │  │   ☑ Gemini 1.5 Pro                                            │   │     │
│  │  │   [ + Add Agent ]                                              │   │     │
│  │  │ Rounds:      [2                                        ]       │   │     │
│  │  │ Moderator:   [None                                    ▼]       │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Consensus Mode ──────────────────────────────────────────────┐   │     │
│  │  │ Agents (min 2):                                                │   │     │
│  │  │   ☑ Claude 3.5 Sonnet                                         │   │     │
│  │  │   ☑ GPT-4o                                                     │   │     │
│  │  │   [ + Add Agent ]                                              │   │     │
│  │  │ Synthesizer: [Claude 3.5 Sonnet                          ▼]   │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │                                           [Save Council Config]      │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  TAB: Presets (bestaand - Improve Presets)                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │  [Bestaande Improve Presets component]                              │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
│  ─────────────────────────────────────────────────────────────────────────   │
│                                                                               │
│  TAB: Advanced                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │  ┌─ Snippets ─────────────────────────────────────────────────────┐   │     │
│  │  │ ☑ Auto-evaluate JavaScript snippets                           │   │     │
│  │  │ Cache TTL: [3600                                      ] sec   │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Reasoning ───────────────────────────────────────────────────┐   │     │
│  │  │ ☑ Store thinking                                              │   │     │
│  │  │ ☑ Show thinking                                               │   │     │
│  │  │ Max thinking length: [10000                             ]      │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │  ┌─ Display ─────────────────────────────────────────────────────┐   │     │
│  │  │ Date format: [M j, Y                                   ]      │   │     │
│  │  │ Purposes:    [development,writing,analysis,...         ]      │   │     │
│  │  └───────────────────────────────────────────────────────────────┘   │     │
│  │                                                                      │     │
│  │                                           [Save Advanced Settings]   │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Settings State Management

```typescript
// src/lib/stores/settings.svelte.ts

interface SettingsState {
  // Connection
  connection: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
    retryDelay: number;
  };

  // Models
  models: {
    allowedModels: string[];
    catalog: CatalogResponse | null;
  };

  // Functions
  functions: {
    executor: FunctionConfig;
    judge: FunctionConfig;
    improve: FunctionConfig;
  };

  // Council
  council: {
    correct: CorrectConfig;
    debate: DebateConfig;
    consensus: ConsensusConfig;
  };

  // Status
  isLoading: boolean;
  lastFetched: Date | null;
}

interface FunctionConfig {
  defaultModel: string;
  temperature: number;
  maxTokens?: number;
  streaming?: boolean;
}

// Svelte 5 runes-based store
class SettingsStore {
  state = $state<SettingsState>({
    connection: {
      baseUrl: "http://localhost:3000",
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
    },
    models: { allowedModels: [], catalog: null },
    functions: {
      executor: {
        defaultModel: "",
        temperature: 0.7,
        maxTokens: 4096,
        streaming: true,
      },
      judge: { defaultModel: "", temperature: 0.3 },
      improve: { defaultModel: "", temperature: 0.5 },
    },
    council: {
      correct: { producer: "", reviewer: "", fix: "" },
      debate: { agents: [], rounds: 2, moderator: "" },
      consensus: { agents: [], synthesizer: "" },
    },
    isLoading: false,
    lastFetched: null,
  });

  async fetchAll() {
    this.state.isLoading = true;
    try {
      const [settings, catalog] = await Promise.all([
        fetch("/api/admin/settings").then((r) => r.json()),
        fetch("/api/opencode/providers").then((r) => r.json()),
      ]);

      this.state.models.catalog = catalog;
      this.parseSettings(settings.data);
      this.state.lastFetched = new Date();
    } finally {
      this.state.isLoading = false;
    }
  }

  async saveFunctionConfig(functionType: string, config: FunctionConfig) {
    await fetch(`/api/admin/settings/function/${functionType}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
  }

  private parseSettings(data: SettingsByCategory) {
    // Parse flat settings into structured state
    // ...
  }
}

export const settingsStore = new SettingsStore();
```

---

## 9. Data Flow Diagrams

### 9.1 Settings Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Settings  │     │    API      │     │  Database   │
│     Page    │     │   Layer     │     │  (SQLite)   │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │ 1. Load settings  │                   │
       │──────────────────>│                   │
       │                   │ 2. Query settings │
       │                   │──────────────────>│
       │                   │                   │
       │                   │ 3. Return grouped │
       │                   │<──────────────────│
       │                   │                   │
       │ 4. Settings data  │                   │
       │<──────────────────│                   │
       │                   │                   │
       │ 5. User edits     │                   │
       │                   │                   │
       │ 6. Save settings  │                   │
       │──────────────────>│                   │
       │                   │ 7. Validate       │
       │                   │                   │
       │                   │ 8. Update DB      │
       │                   │──────────────────>│
       │                   │                   │
       │                   │ 9. Confirm        │
       │                   │<──────────────────│
       │                   │                   │
       │ 10. Success       │                   │
       │<──────────────────│                   │
       │                   │                   │
```

### 9.2 Prompt Execution Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Prompt    │     │   API       │     │  Service    │     │  OpenCode   │
│   Editor    │     │   Layer     │     │  Layer      │     │  Server     │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │ 1. Execute prompt │                   │                   │
       │  {promptId, vars} │                   │                   │
       │──────────────────>│                   │                   │
       │                   │                   │                   │
       │                   │ 2. Get prompt     │                   │
       │                   │──────────────────>│                   │
       │                   │                   │                   │
       │                   │ 3. Build prompt   │                   │
       │                   │   (snippets)      │                   │
       │                   │                   │                   │
       │                   │ 4. Get settings   │                   │
       │                   │<──────────────────│                   │
       │                   │                   │                   │
       │                   │ 5. ExecutePrompt()│                   │
       │                   │──────────────────>│                   │
       │                   │                   │                   │
       │                   │                   │ 6. Create session │
       │                   │                   │──────────────────>│
       │                   │                   │                   │
       │                   │                   │ 7. Send prompt    │
       │                   │                   │──────────────────>│
       │                   │                   │                   │
       │                   │                   │ 8. Stream response│
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │ 9. Yield events   │                   │
       │                   │<──────────────────│                   │
       │                   │                   │                   │
       │ 10. SSE stream    │                   │                   │
       │<──────────────────│                   │                   │
       │                   │                   │                   │
       │                   │                   │ 11. Log execution │
       │                   │                   │──────────────────>│ (DB)
       │                   │                   │                   │
```

### 9.3 Council Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Council   │     │   API       │     │  Council    │     │  OpenCode   │
│   Config    │     │   Layer     │     │  Service    │     │  Server     │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │ 1. Run Council    │                   │                   │
       │  {mode, config}   │                   │                   │
       │──────────────────>│                   │                   │
       │                   │                   │                   │
       │                   │ 2. Validate       │                   │
       │                   │                   │                   │
       │                   │ 3. runCorrect/    │                   │
       │                   │    Debate/        │                   │
       │                   │    Consensus()    │                   │
       │                   │──────────────────>│                   │
       │                   │                   │                   │
       │                   │                   │ 4. Create session │
       │                   │                   │──────────────────>│ (DB)
       │                   │                   │                   │
       │                   │                   │ 5. Step 1:        │
       │                   │                   │    Producer       │
       │                   │                   │──────────────────>│
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │                   │ 6. Step 2:        │
       │                   │                   │    Reviewer       │
       │                   │                   │──────────────────>│
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │                   │ 7. Step 3:        │
       │                   │                   │    Fix            │
       │                   │                   │──────────────────>│
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │                   │ 8. Save steps     │
       │                   │                   │──────────────────>│ (DB)
       │                   │                   │                   │
       │                   │ 9. Return result  │                   │
       │                   │<──────────────────│                   │
       │                   │                   │                   │
       │ 10. Display result│                   │                   │
       │<──────────────────│                   │                   │
       │                   │                   │                   │
```

---

## 10. Implementatie Roadmap

### 10.1 Fase 1: Settings Refactor (Week 1-2)

**Doel:** Complete settings pagina met tabs

#### Sprint 1.1: Database & Services

- [ ] Add nieuwe settings keys aan adminSettings defaults
- [ ] Maak migration voor nieuwe tabellen (snippets, councilSessions, etc.)
- [ ] Extend admin-settings.service.ts met nieuwe getters
- [ ] Maak settings-validator.service.ts

#### Sprint 1.2: API Endpoints

- [ ] GET/PUT /api/admin/settings/function/[type]
- [ ] GET/PUT /api/admin/council-config
- [ ] GET /api/admin/health (bestaat - extend)
- [ ] GET /api/opencode/models (aggregate catalog)

#### Sprint 1.3: UI Components

- [ ] Refactor settings page naar tabs layout
- [ ] function-defaults.svelte
- [ ] council-config.svelte
- [ ] server-config.svelte
- [ ] settings store (Svelte 5 runes)

**Deliverable:** Werkende settings pagina met alle functies configureerbaar

### 10.2 Fase 2: Prompt Execution PoC (Week 3)

**Doel:** Eenvoudigste end-to-end integratie met OpenCode SDK

#### Sprint 2.1: Execution Service

- [ ] execution.service.ts - executePrompt()
- [ ] Unit tests voor execution service
- [ ] Error handling & logging

#### Sprint 2.2: API Endpoint

- [ ] POST /api/prompts/[id]/execute
- [ ] Request/response types
- [ ] Validation

#### Sprint 2.3: Basic UI

- [ ] test-runner.svelte (simple)
- [ ] test-results.svelte
- [ ] Integrate in prompt detail page

**Deliverable:** Prompt kan worden uitgevoerd, resultaat wordt getoond

### 10.3 Fase 3: Snippets & Preview (Week 4)

**Doel:** Template system met live preview

#### Sprint 3.1: Snippet Service

- [ ] snippet.service.ts
- [ ] extractSnippets(), replaceSnippets()
- [ ] JavaScript evaluation (safe)

#### Sprint 3.2: Snippet Management

- [ ] DB: snippets table
- [ ] CRUD API: /api/snippets/\*
- [ ] snippet-list.svelte
- [ ] snippet-form.svelte

#### Sprint 3.3: Preview System

- [ ] prompt-preview.svelte
- [ ] variable-input.svelte
- [ ] Real-time evaluation

**Deliverable:** Snippets kunnen worden beheerd, preview toont eindresultaat

### 10.4 Fase 4: Streaming & Enhancements (Week 5)

**Doel:** Real-time responses

#### Sprint 4.1: Streaming Implementation

- [ ] execution.service.ts - executePromptStream()
- [ ] GET /api/prompts/[id]/stream (SSE)
- [ ] test-runner.svelte - streaming support

#### Sprint 4.2: History & Metrics

- [ ] executionLogs table integration
- [ ] execution-history.svelte
- [ ] Metrics dashboard

**Deliverable:** Streaming responses, execution history

### 10.5 Fase 5: LLM Council (Week 6-7)

**Doel:** Multi-agent discussies

#### Sprint 5.1: Council Service

- [ ] council.service.ts
- [ ] runCorrection(), runDebate(), runConsensus()
- [ ] Unit tests

#### Sprint 5.2: Council API

- [ ] POST /api/council/correct
- [ ] POST /api/council/debate
- [ ] POST /api/council/consensus
- [ ] GET /api/council/sessions/[id]

#### Sprint 5.3: Council UI

- [ ] council-viewer.svelte
- [ ] council-step.svelte
- [ ] council-config-form.svelte

**Deliverable:** Alle 3 council modes werken

### 10.6 Prioriteiten Matrix

| Feature             | Impact | Effort | Priority |
| ------------------- | ------ | ------ | -------- |
| Settings Refactor   | Hoog   | Medium | 🔴 P1    |
| Prompt Execution    | Hoog   | Laag   | 🔴 P1    |
| Snippets System     | Medium | Medium | 🟡 P2    |
| Streaming           | Medium | Medium | 🟡 P2    |
| LLM Council         | Medium | Hoog   | 🟢 P3    |
| JavaScript Snippets | Laag   | Medium | ⚪ P4    |

---

## 11. Appendix

### 11.1 Type Definitions

```typescript
// src/lib/types/index.ts

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  status: "active" | "inactive";
  limit: {
    context: number;
    output: number;
  };
}

export interface ExecutionResult {
  success: boolean;
  response?: string;
  error?: string;
  inputTokens: number;
  outputTokens: number;
  duration: number;
  logId: number;
}

export interface CouncilStep {
  id: number;
  sessionId: number;
  step: number;
  role: string;
  model: string;
  input: string;
  output: string;
  tokens: number;
  duration: number;
  status: "pending" | "running" | "completed" | "failed";
  error?: string;
}

export interface Snippet {
  id: number;
  name: string;
  description?: string;
  type: "text" | "javascript" | "date" | "select";
  defaultValue?: string;
  options?: string[];
  category?: string;
  order: number;
}
```

### 11.2 Environment Variables

```bash
# .env
OPENCODE_BASE_URL=http://localhost:3000
OPENCODE_REQUEST_TIMEOUT=30000
OPENCODE_RETRY_ATTEMPTS=3
OPENCODE_RETRY_DELAY=1000
```

### 11.3 Database Migration Commands

```bash
# Generate migration
bun run db:generate

# Push to database
bun run db:push

# Studio
bun run db:studio
```

---

**Einde Document**
