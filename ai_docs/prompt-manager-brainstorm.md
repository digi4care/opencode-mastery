# Prompt Manager - Brainstorming Document

**Datum:** 2026-02-13  
**Project:** SvelteKit + OpenCode SDK Integration  
**Doel:** Comprehensive prompt management met testing, judging, en council features

---

## 1. Core Requirements Analyse

### 1.1 Prompt Management (CRUD)

```
┌─────────────────────────────────────────────────────────────┐
│  PROMPT                                                      │
├─────────────────────────────────────────────────────────────┤
│  id: uuid                                                    │
│  name: string                                                │
│  description: text                                           │
│  raw_content: text          ← Template met {{snippets}}     │
│  preview_content: text       ← Rendered preview             │
│  category_id: uuid                                          │
│  tags: string[]                                              │
│  version: int                                                │
│  created_at / updated_at                                     │
│  settings: JSON ← Model overrides, judge config, etc.      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Snippet System

**Probleem:** Snippets moeten testable zijn → elke snippet heeft een **test value** nodig

```
┌─────────────────────────────────────────────────────────────┐
│  SNIPPET                                                     │
├─────────────────────────────────────────────────────────────┤
│  id: uuid                                                    │
│  name: string                ← {{name}}                     │
│  description: text                                           │
│  default_value: text         ← Fallback als geen waarde     │
│  test_value: text            ← Voor preview/testing          │
│  type: enum                  ← text | select | multiselect  │
│  options: JSON               ← Voor select types             │
│  validation_regex: string    ← Optioneel validatie patroon   │
│  required: boolean                                           │
└─────────────────────────────────────────────────────────────┘
```

**Snippet Types:**
| Type | Use Case | Example |
|------|----------|---------|
| `text` | Free input | `{{user_input}}` |
| `select` | Single choice | `{{tone}}` (formal/casual/technical) |
| `multiselect` | Multiple choices | `{{features}}` (fast/cheap/accurate) |
| `javascript` | Dynamic computation | `{{calculate_length}}` |

### 1.3 Dual Textarea Pattern (n8n style)

```
┌─────────────────────────────────────────────────────────────┐
│  PROMPT EDITOR                                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  │  ┌─────────────────────────────┐│
│  │  RAW TEMPLATE       │  │  │  PREVIEW (Read-only)        ││
│  │                     │  │  │                             ││
│  │  Write a {{tone}}   │  ↔ │  Write a professional       ││
│  │  email about        │  │  │ email about the new        ││
│  │  {{topic}} for      │  │  │ product launch for the     ││
│  │  {{audience}}       │  │  │ marketing team             ││
│  │                     │  │  │                             ││
│  │  [{{javascript}}]   │  │  │  [Today: 2026-02-13]       ││
│  │                     │  │  │                             ││
│  └─────────────────────┘  │  └─────────────────────────────┘│
│                           │                                 │
│  Snippets Panel ↓         │  Test Values Used:              │
│  ┌─────────────────┐      │  tone: professional             │
│  │ + Add Snippet   │      │  topic: product launch          │
│  │ {{tone}}        │      │  audience: marketing team       │
│  │ {{topic}}       │      │  date: {{new Date()}}           │
│  └─────────────────┘      │                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Testing & Evaluation System

### 2.1 Prompt Testing (via OpenCode SDK)

```
┌─────────────────────────────────────────────────────────────┐
│  TEST EXECUTION                                              │
├─────────────────────────────────────────────────────────────┤
│  1. Select Prompt                                            │
│  2. Configure Test Values (override snippet test_values)    │
│  3. Select Model(s) to test with                            │
│  4. Execute → Get AI Response                               │
│  5. Compare against expected output / criteria              │
│  6. Store test result for regression                        │
└─────────────────────────────────────────────────────────────┘
```

**Test Result Schema:**

```
┌─────────────────────────────────────────────────────────────┐
│  TEST_RESULT                                                 │
├─────────────────────────────────────────────────────────────┤
│  id: uuid                                                    │
│  prompt_id: uuid                                            │
│  prompt_version: int                                        │
│  model_config: JSON         ← Which model, provider, params │
│  input_values: JSON         ← Snippet values used           │
│  rendered_prompt: text      ← Final prompt sent to LLM      │
│  actual_output: text        ← LLM response                  │
│  expected_output: text      ← Optional expected output      │
│  execution_time_ms: int                                     │
│  tokens_used: JSON          ← {input, output, total}        │
│  created_at: timestamp                                      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 LLM Judge System

**Doel:** Automatisch beoordelen van prompt kwaliteit

```
┌─────────────────────────────────────────────────────────────┐
│  JUDGE_CONFIG                                                │
├─────────────────────────────────────────────────────────────┤
│  id: uuid                                                    │
│  name: string               ← "Code Quality Judge"          │
│  model_id: uuid             ← Which LLM acts as judge       │
│  rubric: JSON               ← Scoring criteria              │
│  scale: {min: 1, max: 10}                                  │
│  pass_threshold: int        ← Minimum score to pass         │
└─────────────────────────────────────────────────────────────┘
```

**Rubriek Voorbeeld:**

```json
{
  "criteria": [
    {
      "name": "clarity",
      "weight": 0.25,
      "description": "Is the prompt clear and unambiguous?",
      "scale": "1-10"
    },
    {
      "name": "specificity",
      "weight": 0.25,
      "description": "Does it provide enough context and constraints?",
      "scale": "1-10"
    },
    {
      "name": "actionability",
      "weight": 0.2,
      "description": "Can the LLM take concrete action from this?",
      "scale": "1-10"
    },
    {
      "name": "completeness",
      "weight": 0.15,
      "description": "Are all necessary instructions included?",
      "scale": "1-10"
    },
    {
      "name": "safety",
      "weight": 0.15,
      "description": "Does it avoid harmful/biased outputs?",
      "scale": "1-10"
    }
  ]
}
```

**Judge Flow:**

```
Prompt → Render → Execute → Get Output
                              ↓
                    Judge LLM evaluates:
                    1. Input prompt quality
                    2. Output quality
                    3. Adherence to constraints
                    4. Safety/bias check
                              ↓
                    Score per criterion + Overall score
                              ↓
                    PASS / FAIL / NEEDS REVIEW
```

### 2.3 LLM Council (inspired by Puzld.ai)

**Drie modes:**

| Mode          | Flow                               | Use Case             |
| ------------- | ---------------------------------- | -------------------- |
| **Correct**   | Producer → Reviewer → Fix          | Quality assurance    |
| **Debate**    | Agents argue in rounds + Moderator | Explore alternatives |
| **Consensus** | Propose → Vote → Synthesize        | Group decision       |

**Council Config:**

```
┌─────────────────────────────────────────────────────────────┐
│  COUNCIL_CONFIG                                              │
├─────────────────────────────────────────────────────────────┤
│  mode: enum (correct | debate | consensus)                  │
│  agents: AgentConfig[]                                      │
│  rounds: int               ← For debate mode                │
│  moderator_model: uuid     ← Optional moderator             │
│  synthesizer_model: uuid   ← For consensus mode             │
│  stop_conditions: JSON     ← When to end                    │
└─────────────────────────────────────────────────────────────┘
```

**Correct Mode Flow:**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   PRODUCER   │ ──→ │   REVIEWER   │ ──→ │     FIX      │
│  (Generate)  │     │  (Critique)  │     │  (Improve)   │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ↓ feedback
                     (Loop if needed)
```

**Debate Mode Flow:**

```
Round 1:
  Agent A: "I think X because..."
  Agent B: "I disagree because..."

Round 2:
  Agent A: "That's valid, but consider..."
  Agent B: "Fair point, however..."

Moderator: "The key points are..."
```

**Consensus Mode Flow:**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   PROPOSE    │ ──→ │    VOTE      │ ──→ │  SYNTHESIZE  │
│  (Options)   │     │  (Rankings)  │     │  (Merge)     │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 3. Model Configuration System

### 3.1 Global Settings

```
┌─────────────────────────────────────────────────────────────┐
│  GLOBAL_SETTINGS                                             │
├─────────────────────────────────────────────────────────────┤
│  providers: ProviderConfig[]  ← Via OpenCode SDK            │
│  default_models: {                                          │
│    "execution": "claude-3-5-sonnet",                        │
│    "judge": "claude-3-5-sonnet",                            │
│    "council_producer": "claude-3-5-sonnet",                 │
│    "council_reviewer": "gemini-2.0-flash",                  │
│    "council_moderator": "gpt-4o",                           │
│    "council_synthesizer": "claude-3-5-sonnet"               │
│  }                                                           │
│  fallback_models: {...}      ← If primary fails             │
│  rate_limits: {...}          ← Per provider                 │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Per-Prompt Overrides

```
┌─────────────────────────────────────────────────────────────┐
│  PROMPT.settings                                             │
├─────────────────────────────────────────────────────────────┤
│  {                                                           │
│    "execution_model": "claude-3-5-sonnet",    // override   │
│    "judge_config_id": "uuid-of-rubric",       // which judge│
│    "council_mode": "debate",                   // enable    │
│    "council_agents": ["model-1", "model-2"],  // override   │
│    "temperature": 0.7,                        // param      │
│    "max_tokens": 4096                         // param      │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### 3.3 Provider Configuration (via OpenCode SDK)

```typescript
// From OpenCode SDK - discover available providers
const providers = await client.provider.list()

// Example structure:
[
  { id: "anthropic", name: "Anthropic", models: [...] },
  { id: "openai", name: "OpenAI", models: [...] },
  { id: "google", name: "Google", models: [...] },
  { id: "ollama", name: "Ollama", models: [...] },
  { id: "opencode-zen", name: "OpenCode Zen", models: [...] },
  { id: "openrouter", name: "OpenRouter", models: [...] }
]
```

---

## 4. JavaScript Snippets (n8n style)

### 4.1 Supported Expressions

```javascript
// Simple expressions
{
  {
    new Date().toISOString();
  }
}
{
  {
    Math.random() > 0.5 ? "A" : "B";
  }
}
{
  {
    ["a", "b", "c"].join(", ");
  }
}

// Context variables (provided by system)
{
  {
    $user.name;
  }
}
{
  {
    $project.title;
  }
}
{
  {
    $env.API_KEY;
  }
}

// Functions
{
  {
    formatDate(new Date(), "YYYY-MM-DD");
  }
}
{
  {
    calculateDiff(start, end);
  }
}
```

### 4.2 Sandbox Execution

```typescript
// Safe JavaScript execution
interface JSContext {
  $user: User;
  $project: Project;
  $env: Record<string, string>;
  $snippets: Record<string, string>;
  // Utility functions
  formatDate: (date: Date, format: string) => string;
  truncate: (text: string, length: number) => string;
  randomChoice: <T>(items: T[]) => T;
}
```

---

## 5. Architecture Overview

### 5.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SVELTEKIT WEBAPP                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   Prompts   │  │   Snippets  │  │   Tests     │  │   Council   │   │
│  │   CRUD      │  │   Manager   │  │   Runner    │  │   Manager   │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│         │                │                │                │           │
│  ┌──────┴────────────────┴────────────────┴────────────────┴──────┐   │
│  │                      CORE SERVICES                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │   │
│  │  │   Renderer  │  │   Evaluator │  │    Judge    │            │   │
│  │  │  (Templates)│  │    (JS)     │  │   (LLM)     │            │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘            │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                │                                        │
├────────────────────────────────┼────────────────────────────────────────┤
│                       @opencode-ai/sdk                                 │
│                                │                                        │
│                    ┌───────────┴───────────┐                           │
│                    │   OpenCode Server     │                           │
│                    │   (opencode serve)    │                           │
│                    └───────────────────────┘                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Data Flow

```
User edits prompt with snippets
           ↓
Template rendered with test values
           ↓
Preview shows final prompt
           ↓
User clicks "Test"
           ↓
┌─────────────────────────────────────┐
│  TEST ORCHESTRATOR                  │
│  1. Create session via SDK          │
│  2. Send prompt to model            │
│  3. Collect response                │
│  4. Optional: Judge evaluates       │
│  5. Optional: Council reviews       │
│  6. Store results                   │
└─────────────────────────────────────┘
           ↓
Results displayed to user
           ↓
User iterates on prompt
```

---

## 6. Feature Priority Matrix

| Feature                   | Complexity | Value  | Priority |
| ------------------------- | ---------- | ------ | -------- |
| Prompt CRUD + Snippets    | Medium     | High   | **P0**   |
| Dual Textarea + Preview   | Low        | High   | **P0**   |
| OpenCode SDK Integration  | Medium     | High   | **P0**   |
| Test Execution            | Medium     | High   | **P1**   |
| Test History              | Low        | Medium | **P1**   |
| JavaScript Snippets       | Medium     | Medium | **P1**   |
| LLM Judge (basic)         | High       | High   | **P2**   |
| Judge Rubrics             | Medium     | High   | **P2**   |
| Council - Correct mode    | High       | Medium | **P3**   |
| Council - Debate mode     | High       | Low    | **P3**   |
| Council - Consensus mode  | High       | Low    | **P3**   |
| Model per-function config | Medium     | High   | **P1**   |
| Per-prompt model override | Low        | Medium | **P2**   |

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)

- [ ] Prompt CRUD (schema, routes, UI)
- [ ] Snippet CRUD with test values
- [ ] Dual textarea editor
- [ ] Template rendering (basic {{name}} syntax)
- [ ] OpenCode SDK client setup

### Phase 2: Testing (Week 3-4)

- [ ] Test execution via SDK
- [ ] Test history storage
- [ ] Model selection UI
- [ ] Global model settings
- [ ] Basic JS snippets (sandboxed)

### Phase 3: Evaluation (Week 5-6)

- [ ] Judge schema and CRUD
- [ ] Judge execution flow
- [ ] Rubric builder UI
- [ ] Pass/fail thresholds
- [ ] Judge results display

### Phase 4: Council (Week 7-8)

- [ ] Council config schema
- [ ] Correct mode implementation
- [ ] Debate mode implementation
- [ ] Consensus mode implementation
- [ ] Council visualization UI

### Phase 5: Polish (Week 9-10)

- [ ] Per-prompt model overrides
- [ ] Fallback models
- [ ] Rate limiting
- [ ] Export/import prompts
- [ ] Version history

---

## 8. Open Questions

1. **Snippet JS Security:** Hoe veilig sandboxen? Node.js vm module? Of beperkte DSL?

2. **Judge Reliability:** Hoe voorkomen we judge bias? Meerdere judges averagen?

3. **Council Cost:** LLM council is duur (multiple calls). Rate limiting? Caching?

4. **Model Discovery:** Hoe vaak providers/models refreshen? Live via SDK of cached?

5. **Test Regression:** Hoe vergelijken we outputs? Exact match? Semantic similarity? LLM compare?

6. **Snippet Dependencies:** Kunnen snippets van andere snippets afhangen? (`{{greeting}}` uses `{{tone}}`)

---

## 9. Next Steps

1. **Besluit nemen over JS snippets:** Volledige JS of beperkte DSL?
2. **Schema finalized:** Database schema voor alle entities
3. **SDK integration pattern:** Hoe session management?
4. **UI wireframes:** Dual textarea, test panel, council visualization
5. **MVP scope bepalen:** Wat in Phase 1?

---

_Document gemaakt op basis van brainstorming sessie - 2026-02-13_
