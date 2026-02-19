# Flow Analyzer v2 - OpenCode Pattern Implementation

## 1) Doel en scope

Deze implementatie vervangt het monolithische voorstel door een gelaagd OpenCode design pattern:

- Een **framework-agnostische core** voor flow-analyse
- **Framework-specifieke adapters** (eerst GSD)
- Duidelijke scheiding tussen **plugin/tools**, **agents**, **commands** en **skills**

Doel: flow-completeness betrouwbaar analyseren voor GSD en later hergebruiken voor andere frameworks zonder core rewrite.

---

## 2) Design principes

### 2.1 Agnostic core, specific adapters

- De analyse-engine kent geen GSD-terminologie
- Framework-kennis zit in adapterlaag (ingang, mapping, rapportage)
- Nieuwe frameworks voegen adapters toe, geen duplicatie van core logic

### 2.2 OpenCode-native componentverdeling

- **Plugin + tools**: type-safe, AI-callable analysefuncties
- **Agent**: orchestratie van analyseflow
- **Command**: user entrypoint en UX
- **Skill**: pattern-kennis en beslisregels

### 2.3 Verifieerbaar en testbaar

- Elke tool heeft een strikt input/output contract
- Analyse produceert machine-readable artifacts naast markdown rapport
- Golden fixtures voor regressie op gap-detectie

### 2.4 Incremental adoptie

- Start met GSD adapter
- Voeg daarna generieke command en extra adapters toe
- Geen brekende wijzigingen in bestaande GSD workflow in fase 1

---

## 3) Component architectuur

### 3.1 Overzicht

```text
User Command Layer
  /flow-analyzer (generic)
  /gsd-analyze-flow (GSD adapter command)

Orchestration Layer
  flow-analyzer (base agent)
  gsd-flow-analyzer (adapter agent)

Core Capability Layer (Plugin Tools)
  extract_flows
  build_flow_graph
  trace_implementation
  detect_flow_gaps
  score_flow_confidence

Knowledge Layer (Skill)
  flow-analysis SKILL.md
  references/flow-patterns.md
  references/gap-taxonomy.md
```

### 3.2 Verdeling van verantwoordelijkheden

- **Plugin tools**: pure analyse-capabilities
- **Base agent**: tool-chain orchestration en output-normalisatie
- **Adapter agent**: framework-context laden en mapping
- **Commands**: parameters, defaults, output locatie, UX
- **Skill**: heuristieken, checklists, interpretatieregels

### 3.3 Component keuze-matrix

| Component   | Gebruik voor                                                          | Niet gebruiken voor                      |
| ----------- | --------------------------------------------------------------------- | ---------------------------------------- |
| Plugin tool | Deterministische analyse, schema-validatie, herbruikbare capabilities | UX copy, framework-specifieke narratief  |
| Agent       | Multi-step redenering en orchestratie                                 | Lage-level parsing als standalone script |
| Command     | Slash entrypoint en run-parameters                                    | Business logic dupliceren                |
| Skill       | Patronen, beslisregels, interpretatie                                 | Runtime side effects of code execution   |

---

## 4) Core plugin ontwerp (framework-agnostisch)

### 4.1 Plugin locatie

```text
src/plugin/flow-analyzer/
  src/
    index.ts
    types.ts
    tools/
      extract-flows.ts
      build-flow-graph.ts
      trace-implementation.ts
      detect-flow-gaps.ts
      score-flow-confidence.ts
```

### 4.2 Canonical types

```ts
export type GapType =
  | "MISSING_BRANCH"
  | "WRONG_PRECONDITION"
  | "DEAD_END"
  | "MISSING_DATA_FLOW"
  | "UNREACHABLE_CODE";

export interface FlowNode {
  id: string;
  kind: "route" | "api" | "state" | "action" | "condition";
  label: string;
  sourceRef?: { path: string; line?: number };
}

export interface FlowEdge {
  from: string;
  to: string;
  condition?: string;
  dataRequired?: string[];
}

export interface FlowDefinition {
  id: string;
  name: string;
  entryPoints: string[];
  exits: string[];
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export interface FlowGap {
  id: string;
  type: GapType;
  flowId: string;
  location?: { path: string; line?: number };
  expected: string;
  actual: string;
  impact: string;
  fixHint: string;
  severity: "critical" | "high" | "medium" | "low";
}
```

### 4.3 Tool contracts

### `extract_flows`

- **Input**: plan/docs content, optional hints
- **Output**: `FlowDefinition[]`
- **Doel**: intended flows uit tekst structureren

### `build_flow_graph`

- **Input**: `FlowDefinition`
- **Output**: graph metadata (components, branches, terminals)
- **Doel**: detecteer structurele flow-eigenschappen vooraf

### `trace_implementation`

- **Input**: flow + file targets + search roots
- **Output**: implementation trace per node/edge
- **Doel**: link intended steps aan concrete codepaden

### `detect_flow_gaps`

- **Input**: flow + trace + enabled gap types
- **Output**: `FlowGap[]`
- **Doel**: gap-detectie met explainable evidence

### `score_flow_confidence`

- **Input**: flow + trace + gaps
- **Output**: score en onzekerheden
- **Doel**: objectieve eindscore voor rapportage/prioritering

---

## 5) Skill ontwerp (framework-agnostische kennis)

### 5.1 Skill locatie

```text
src/skill/flow-analysis/
  SKILL.md
  references/
    flow-patterns.md
    gap-taxonomy.md
    precondition-checks.md
```

### 5.2 Skill inhoud

- Trigger guidance: wanneer flow-analyse draaien
- Gap-interpretatie: hoe false positives verminderen
- Pattern library: token flow, multi-step flow, OAuth, conditional redirect
- Prioritering: welke gaps blocker zijn voor release

De skill bevat geen runtime code; alleen besliscontext en best practices.

---

## 6) Agent ontwerp

### 6.1 Base agent: `flow-analyzer`

**Doel:** generieke orchestratie bovenop plugin tools.

Proces:

1. Input normaliseren
2. Flows extraheren
3. Flow graph bouwen
4. Implementatie tracen
5. Gaps detecteren
6. Confidence scoren
7. Rapport genereren (markdown + json)

### 6.2 Adapter agent: `gsd-flow-analyzer`

**Doel:** GSD context mappen naar core analyzer input.

GSD-specifieke brondata:

- `.planning/phases/{phase}/*-PLAN.md`
- `.planning/phases/{phase}/*-SUMMARY.md`
- `.planning/ROADMAP.md`
- `.planning/REQUIREMENTS.md` (indien relevant)

GSD-specifieke output:

- `.planning/phases/{phase}/FLOW-ANALYSIS.md`
- `.planning/phases/{phase}/FLOW-ANALYSIS.json`

---

## 7) Command ontwerp

### 7.1 Generic command: `/flow-analyze`

Voor framework-onafhankelijke analyse.

Voorbeeld:

```text
/flow-analyzer --input ./specs/auth-flow.md --code-root ./src
```

### 7.2 GSD command: `/gsd-analyze-flow`

GSD wrapper bovenop dezelfde core tools.

Voorbeeld:

```text
/gsd-analyze-flow 03-authentication
```

Aanbevolen flags:

- `--strict` (meer false positive tolerantie omlaag)
- `--types MISSING_BRANCH,WRONG_PRECONDITION`
- `--json` (extra machine output)
- `--save` (default true voor phase artifact)

---

## 8) Integratie met bestaande GSD agents

### 8.1 `gsd-plan-checker`

- Voeg optionele stap toe: flow pre-check op planfase
- Resultaat: risico-indicatie voor ontbrekende branches/preconditions

### 8.2 `gsd-verifier`

- Voeg `--flow` pad toe dat `gsd-flow-analyzer` aanroept
- Verifier behoudt goal-backward rol; flow-analyzer levert gespecialiseerd bewijs

Integratieprincipe:

- Geen duplicatie van flow-detectielogica in verifier
- Verifier consumeert analyzer output als input artifact

---

## 9) Multi-framework uitbreidingsmodel

### 9.1 Adapter contract

Elke framework adapter levert:

1. Context loader (waar zitten plans/specs)
2. Flow extraction hints (framework-taal, keywords)
3. Reporting formatter (output conventions)
4. Optional pattern pack overrides

### 9.2 Voorbeeld adapters

- `gsd`
- `generic-web`
- `workflow-engine-x` (later)

Nieuwe adapter bouwen zonder core te wijzigen:

1. Nieuwe adapter agent + command
2. Mapping naar `FlowDefinition`
3. Hergebruik bestaande plugin tools

---

## 10) Implementatie roadmap

### Fase 0 - Contracten en fixtures

- Finaliseer types en gap-taxonomie
- Maak test fixtures met broken en correct flows

### Fase 1 - Core plugin tools

- Bouw `extract_flows`, `build_flow_graph`, `detect_flow_gaps`
- Unit tests per tool

### Fase 2 - Agents + commands

- Base `flow-analyzer` agent
- Generic `/flow-analyze`
- GSD adapter agent + `/gsd-analyze-flow`

### Fase 3 - GSD integratie

- Koppel aan `gsd-plan-checker` en `gsd-verifier --flow`
- Produceer phase artifacts in `.planning/phases/...`

### Fase 4 - Hardening

- Tuning van false positives
- Performance checks op grotere phases
- Documentatie afronden

---

## 11) Teststrategie

### 11.1 Unit tests (plugin)

- Parser robuustheid voor flow extraction
- Gap type detectie per type met fixtures
- Confidence scoring deterministisch

### 11.2 Integration tests (agent + command)

- `gsd-analyze-flow` op broken phase fixture
- Verwachte gaps in markdown en json output

### 11.3 Regression suite

- Golden snapshots voor rapportoutput
- Minimaal 1 complete flow zonder gaps
- Minimaal 1 scenario per gap type

---

## 12) Acceptance criteria (v2)

### Must

- Framework-agnostische core plugin tools actief
- `flow-analyzer` base agent werkt met generic input
- `gsd-flow-analyzer` adapter gebruikt dezelfde core tools
- Detectie van minimaal:
  - `MISSING_BRANCH`
  - `WRONG_PRECONDITION`
- Output bevat markdown + json

### Should

- Detectie van:
  - `DEAD_END`
  - `MISSING_DATA_FLOW`
- Integratiepad naar `gsd-verifier --flow`
- Pattern references beschikbaar in skill

### Nice

- Mermaid flow graph
- Auto-fix plan suggesties
- CI gate op kritieke flow gaps

---

## 13) Risico's en mitigatie

- **False positives**: beperk met confidence score en duidelijke evidence
- **Framework drift**: houd framework-kennis in adapters, niet in core
- **Over-complexity**: gefaseerde levering, eerst 2 gap types, dan uitbreiden
- **Performance**: target file sets beperken via adapter hints

---

## 14) Besluit

Deze v2 aanpak volgt het OpenCode design pattern volledig:

- Core capabilities in **plugin/tools**
- Orchestratie in **agents**
- UX entrypoints in **commands**
- Domeinkennis in **skills**

Daarmee krijg je een Flow Analyzer die direct bruikbaar is voor GSD, maar structureel klaar staat voor andere frameworks zonder herbouw van de kern.
