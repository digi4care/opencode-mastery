# Prompt Manager - Volledige Analyse & Refactoring Plan

**Project:** `/media/digi4care/ExtDrive/projects/sveltekit/prompt-management/`  
**Datum:** 2025-02-13  
**Doel:** OpenCode SDK integratie voor prompt testing & management

---

## 1. Huidige Status

### 1.1 Tech Stack

| Component       | Technology                    |
| --------------- | ----------------------------- |
| Framework       | SvelteKit + Svelte 5 (runes)  |
| Database        | Drizzle ORM + libsql (SQLite) |
| AI Integration  | @opencode-ai/sdk v1.1.53      |
| Auth            | Better Auth                   |
| Editor          | Monaco Editor                 |
| Testing         | Vitest + Playwright           |
| Package Manager | Bun                           |

### 1.2 Bestaande Features

| Feature             | Status      | Locatie                    |
| ------------------- | ----------- | -------------------------- |
| Prompts CRUD        | ✅ Volledig | `src/routes/api/prompts/`  |
| Versiebeheer        | ✅ Volledig | `promptVersions` table     |
| LLM Judge           | ✅ Volledig | `judge.service.ts`         |
| Improvement Loops   | ✅ Volledig | `improvement.service.ts`   |
| Model Selection     | ✅ Volledig | `model-picker.svelte`      |
| Provider Catalog    | ✅ Volledig | `opencode.service.ts`      |
| Admin Settings      | ✅ Volledig | `/admin/ai-settings`       |
| Performance Metrics | ✅ Volledig | `performanceMetrics` table |
| Genealogy Tree      | ✅ Volledig | `promptRelationships`      |

### 1.3 Database Schema

```
prompts
├── id, title, content, description
├── status (draft/active/archived)
├── modelOverride, temperature
├── tags[], metadata{}
└── versions[] → promptVersions

promptVersions
├── promptId, version (semver)
├── content, changeDescription
└── parentVersionId

judgeEvaluations
├── promptVersionId
├── clarity, completeness, specificity (0-100)
├── overallScore, gaps[], recommendations[]
└── modelUsed, rawResponse

improvementLoops
├── promptId, version
├── instruction, presetId
├── variants[] → improvementVariants
└── status, progress

adminSettings
├── key, value, type, category
└── Policies, presets, config

improvePresets
├── name, description
├── instructionTemplate
└── defaultModel, defaultTemperature
```

---

## 2. OpenCode Integratie (Huidig)

### 2.1 SDK Client

```ts
// src/lib/server/opencode/client.ts
export async function getOpencodeClient() {
  return createOpencodeClient({
    baseUrl: process.env.OPENCODE_BASE_URL || "http://localhost:3000",
  });
}
```

### 2.2 Service Methods

```ts
// opencode.service.ts
-executeAgentWithSession(prompt, model, options) -
  getProviderCatalog() -
  checkOpencodeHealth() -
  parseModelString("anthropic/claude-3-5-sonnet");
```

### 2.3 Error Handling

```ts
-OpenCodeConnectionError -
  OpenCodeAuthenticationError -
  OpenCodeRateLimitError -
  OpenCodeModelNotFoundError -
  OpenCodeExecutionError;
```

---

## 3. Wat Ontbreekt (Gap Analysis)

### 3.1 🔴 Kritiek - Nodig voor Proof of Concept

| Feature              | Beschrijving                 | Impact |
| -------------------- | ---------------------------- | ------ |
| **Direct Execution** | Prompt direct testen via SDK | Hoog   |
| **Preview Field**    | Live evaluatie van template  | Hoog   |
| **Test Results UI**  | Response tonen + metrics     | Hoog   |

### 3.2 🟡 Belangrijk - UX Verbetering

| Feature                 | Beschrijving                 | Impact |
| ----------------------- | ---------------------------- | ------ |
| **Snippets System**     | Herbruikbare {{placeholder}} | Medium |
| **JavaScript Snippets** | {{js:expression}} support    | Medium |
| **Streaming Responses** | Real-time output             | Medium |

### 3.3 🟢 Nice to Have - Toekomstige Features

| Feature           | Beschrijving              | Impact |
| ----------------- | ------------------------- | ------ |
| **LLM Council**   | Multi-agent discussie     | Laag   |
| **Batch Testing** | Meerdere prompts tegelijk | Laag   |
| **A/B Testing**   | Variant vergelijking      | Laag   |

---

## 4. Proof of Concept: Direct Execution

### 4.1 Doel

Gebruiker kan een prompt selecteren, parameters invullen, en direct uitvoeren via OpenCode SDK. Resultaat wordt getoond in UI.

### 4.2 Architectuur

```
┌─────────────────────────────────────────────────────────────┐
│  UI Layer                                                    │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Prompt Editor   │  │ Test Panel      │                  │
│  │ (Monaco)        │  │ - Model picker  │                  │
│  │                 │  │ - Run button    │                  │
│  │ {{CONTEXT}}     │  │ - Results view  │                  │
│  └────────┬────────┘  └────────┬────────┘                  │
│           │                    │                            │
│           ▼                    ▼                            │
│  ┌─────────────────────────────────────┐                   │
│  │ Preview Panel (live evaluation)     │                   │
│  └─────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  API Layer                                                   │
│                                                              │
│  POST /api/prompts/[id]/execute                             │
│  { model, temperature, variables: { CONTEXT: "..." } }      │
│                                                              │
│  Response: { success, result, metrics, duration }           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Service Layer                                               │
│                                                              │
│  execution.service.ts                                        │
│  - executePrompt(prompt, variables, options)                │
│  - streamPrompt(prompt, variables, options)                 │
│  - buildPromptFromTemplate(content, variables)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  OpenCode SDK                                                │
│                                                              │
│  client.session.create()                                     │
│  client.session.prompt()                                     │
│  client.session.messages()                                   │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 UI Wireframe

````
┌──────────────────────────────────────────────────────────────────┐
│  Prompt Manager                              [Save] [Test ▼]     │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─ Editor ─────────────────┐  ┌─ Test Panel ─────────────────┐  │
│  │                          │  │                               │  │
│  │ Write a {{TASK}} that    │  │ Model: [Claude 3.5 ▼]        │  │
│  │ handles {{CONTEXT}}.     │  │ Temp:  [0.7        ]         │  │
│  │                          │  │                               │  │
│  │ Requirements:            │  │ Variables:                    │  │
│  │ - {{REQUIREMENTS}}       │  │ ┌─────────────────────────┐  │  │
│  │                          │  │ │ CONTEXT: "user auth"    │  │  │
│  │ Output: {{OUTPUT_FORMAT}}│  │ │ TASK: "function"        │  │  │
│  │                          │  │ │ REQUIREMENTS: "secure"  │  │  │
│  └──────────────────────────┘  │ │ OUTPUT_FORMAT: "TS"     │  │  │
│                                │ └─────────────────────────┘  │  │
│  ┌─ Preview ────────────────┐  │                               │  │
│  │                          │  │ [▶ Run Test]                  │  │
│  │ Write a function that    │  │                               │  │
│  │ handles user auth.       │  └───────────────────────────────┘  │
│  │                          │                                     │
│  │ Requirements:            │  ┌─ Results ─────────────────────┐ │
│  │ - secure                 │  │                               │ │
│  │                          │  │ ✅ Completed in 2.3s           │ │
│  │ Output: TS               │  │                               │ │
│  │                          │  │ ```typescript                 │ │
│  └──────────────────────────┘  │ function authenticate(...)    │ │
│                                │ ```                           │ │
│                                │                               │ │
│                                │ Tokens: 234 | Cost: $0.002   │ │
│                                └───────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
````

---

## 5. Implementatie Plan (Kleine Stappen)

### Fase 1: Foundation (Week 1)

#### Step 1.1: Execution Service

**Doel:** Basis service voor prompt execution

```ts
// src/lib/server/services/execution.service.ts
export async function executePrompt(
  promptContent: string,
  options: { model: string; temperature?: number },
): Promise<ExecutionResult>;

export function buildPromptFromTemplate(
  template: string,
  variables: Record<string, string>,
): string;
```

**Bestanden:**

- `src/lib/server/services/execution.service.ts` (nieuw)
- Unit tests

#### Step 1.2: Execution API Endpoint

**Doel:** REST API voor prompt execution

```
POST /api/prompts/[id]/execute
```

**Bestanden:**

- `src/routes/api/prompts/[id]/execute/+server.ts` (nieuw)

#### Step 1.3: Basic Test UI

**Doel:** Simpel formulier om prompt te testen

**Bestanden:**

- `src/lib/components/testing/test-runner.svelte` (nieuw)
- Integreer in prompt detail pagina

---

### Fase 2: Preview System (Week 2)

#### Step 2.1: Snippet Detection

**Doel:** Detecteer {{PLACEHOLDER}} patterns

```ts
// src/lib/server/services/snippet.service.ts
export function extractSnippets(content: string): Snippet[];
export function replaceSnippets(
  content: string,
  values: Record<string, string>,
): string;
```

#### Step 2.2: Preview Component

**Doel:** Live preview van geëvalueerde prompt

**Bestanden:**

- `src/lib/components/prompts/prompt-preview.svelte` (nieuw)

#### Step 2.3: Variable Input UI

**Doel:** Formulier voor snippet waarden

**Bestanden:**

- `src/lib/components/prompts/variable-input.svelte` (nieuw)

---

### Fase 3: Enhanced Testing (Week 3)

#### Step 3.1: Streaming Responses

**Doel:** Real-time output via SSE

```ts
// Streaming endpoint
GET / api / prompts / [id] / stream;
```

#### Step 3.2: Results Display

**Doel:** Mooie weergave van AI responses

**Bestanden:**

- `src/lib/components/testing/test-results.svelte` (nieuw)
- Markdown rendering
- Syntax highlighting

#### Step 3.3: Metrics Tracking

**Doel:** Execution metrics opslaan

**Bestanden:**

- DB migration: `executionLogs` table
- Update `execution.service.ts`

---

### Fase 4: Snippets Management (Week 4)

#### Step 4.1: Snippets CRUD

**Doel:** Beheer herbruikbare snippets

**Bestanden:**

- DB schema: `snippets` table
- `src/routes/api/snippets/` (nieuw)
- `src/lib/components/snippets/` (nieuw)

#### Step 4.2: Snippet Library

**Doel:** Browse en insert snippets

#### Step 4.3: JavaScript Snippets

**Doel:** `{{js:expression}}` support

---

### Fase 5: LLM Council (Week 5-6)

#### Step 5.1: Council Schema

**Doel:** DB schema voor council sessions

```sql
councilSessions
├── id, promptId, mode (correct/debate/consensus)
├── config { roles, models, rounds }
└── status, result

councilSteps
├── sessionId, step, role
├── model, content
└── duration, tokens
```

#### Step 5.2: Council Service

**Doel:** Orchestrate multi-agent discussions

```ts
// src/lib/server/services/council.service.ts
export async function runCorrection(
  prompt: string,
  config: { producer; reviewer; fixModel },
): Promise<CorrectionResult>;

export async function runDebate(
  prompt: string,
  config: { agents; rounds; moderator? },
): Promise<DebateResult>;

export async function runConsensus(
  prompt: string,
  config: { agents; synthesizer },
): Promise<ConsensusResult>;
```

#### Step 5.3: Council UI

**Doel:** Collaboration view (zoals Puzld.ai)

---

## 6. Technische Beslissingen

### 6.1 Streaming vs Polling

**Keuze:** Server-Sent Events (SSE)

```ts
// Voordeel: Native browser support, automatic reconnect
const events = client.event.subscribe();
for await (const event of events.stream) {
  // Handle event
}
```

### 6.2 Snippet Syntax

**Keuze:** Mustache-style met extensies

```
{{VARIABLE}}           - Simple replacement
{{js:expression}}      - JavaScript evaluation
{{snippet:name}}       - Insert saved snippet
{{date:format}}        - Date formatting
```

### 6.3 Model Configuration

**Keuze:** 3-level override system

```
1. Global defaults (admin settings)
   └── 2. Prompt override (prompt.modelOverride)
       └── 3. Execution override (runtime selection)
```

---

## 7. Open Vragen voor Brainstorming

### 7.1 UX Vragen

1. **Preview plaatsing**
   - Optie A: Naast editor (split view)
   - Optie B: Onder editor (stacked)
   - Optie C: Tab switching

2. **Variable input**
   - Optie A: Inline popover in editor
   - Optie B: Side panel
   - Optie C: Modal dialog

3. **Results weergave**
   - Optie A: In side panel
   - Optie B: Modal overlay
   - Optie C: Dedicated results page

### 7.2 Technische Vragen

1. **Streaming implementatie**
   - SSE via +server.ts streaming?
   - WebSocket voor bidirectioneel?

2. **Snippet storage**
   - In prompt content inline?
   - Aparte snippets table met references?

3. **Council modes**
   - Alle 3 modes tegelijk bouwen?
   - Eerst alleen 'correct' mode?

### 7.3 Prioriteit Vragen

1. **Wat is belangrijkst voor PoC?**
   - Snippets + Preview?
   - Direct execution + results?
   - Beide tegelijk?

2. **LLM Council timing?**
   - Direct na basis features?
   - Later als premium feature?

3. **JavaScript snippets?**
   - Nu al belangrijk?
   - Kan wachten?

---

## 8. Next Actions

### Direct Starten (PoC)

1. **execution.service.ts** - Basis SDK wrapper
2. **execute API endpoint** - POST handler
3. **test-runner.svelte** - Simpel UI component
4. **prompt-preview.svelte** - Template evaluatie

### Na PoC

5. **snippets system** - DB + UI
6. **streaming** - SSE implementatie
7. **metrics** - Execution tracking
8. **council** - Multi-agent

---

## 9. Risico's & Mitigatie

| Risico                           | Impact | Mitigatie                              |
| -------------------------------- | ------ | -------------------------------------- |
| OpenCode server niet beschikbaar | Hoog   | Health checks, fallback mock           |
| Streaming complexity             | Medium | Begin met polling, upgrade later       |
| Snippet parsing edge cases       | Medium | Extensive testing, good error messages |
| Council orchestration complexity | Laag   | Begin met 1 mode (correct)             |

---

## 10. Success Criteria (PoC)

- [ ] Prompt kan worden uitgevoerd via UI
- [ ] Resultaat wordt getoond (non-streaming first)
- [ ] Basic {{VARIABLE}} replacement werkt
- [ ] Model kan worden geselecteerd
- [ ] Execution metrics worden gelogd
- [ ] Error handling is robuust

---

**Volgende stap:** Brainstorming sessie om beslissingen te nemen en prioriteiten te bepalen.
