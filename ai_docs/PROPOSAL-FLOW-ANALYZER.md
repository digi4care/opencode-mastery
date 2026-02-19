# Flow Analyzer v2 - Proposal (Quality First)

## Status

- **Owner:** OpenCode team
- **Scope:** Architecture proposal
- **Primary target:** GSD
- **Secondary target:** Reuse for other frameworks
- **Decision:** Quality over speed and feature count

---

## 1) Waarom deze update

De vorige proposal loste het juiste probleem op, maar had een te smalle vorm:

- Te veel logica in 1 GSD-specifieke agent
- Te weinig scheiding tussen capability en orchestratie
- Beperkte herbruikbaarheid buiten GSD

Deze v2 proposal maakt de Flow Analyzer:

- **Agnostisch in de core**
- **Framework-specifiek aan de rand**
- **Volledig volgens OpenCode design patterns**

---

## 2) Probleemdefinitie

Huidige verificatie focust vooral op structurele aanwezigheid:

- Bestaat bestand/route/endpoint?
- Zijn exports/imports correct?
- Zijn links tussen artefacts aanwezig?

Maar flow-correctheid blijft onderbelicht:

- Ontbrekende conditionele branch
- Foute precondition
- Data niet doorgegeven naar volgende stap
- Flows die eindigen zonder afronding

Resultaat: features kunnen als "compleet" lijken, terwijl de user flow in praktijk breekt.

---

## 3) Doel

Introduceer een analyzer die intended flow versus implementatie vergelijkt en duidelijke gaps rapporteert.

Kernuitkomst:

- Minder false completion
- Snellere root-cause bij flow bugs
- Herbruikbare analysecapability voor meerdere frameworks

---

## 4) Scope en non-goals

## In scope

- Framework-agnostische flow analysis core
- GSD adapter als eerste concrete implementatie
- Heldere gap-taxonomie
- Markdown + JSON rapportage
- Integratiepad naar GSD verifier/planner workflow

## Out of scope (fase 1)

- Auto-remediation/autofix
- Volledige CI policy enforcement
- Framework-specifieke adapters anders dan GSD

---

## 5) Architectuurbesluit

## Besluit

Gebruik een gelaagde architectuur:

1. **Plugin tools (core capability)**
2. **Agents (orchestratie)**
3. **Commands (entrypoints)**
4. **Skill + references (kennislaag)**

## Waarom dit beter is

- Tooling wordt testbaar en type-safe
- Agent blijft dun en stuurt alleen workflow
- Commands blijven framework-vriendelijk voor gebruikers
- Kennis en heuristieken blijven los van runtime code

---

## 6) Componentmodel

### 6.1 Plugin (agnostische core)

**Doel:** deterministische en herbruikbare analyse-tools.

Voorgestelde tools:

- `extract_flows`
- `build_flow_graph`
- `trace_implementation`
- `detect_flow_gaps`
- `score_flow_confidence`

### 6.2 Base agent

**Naam:** `flow-analyzer`

Verantwoordelijk voor:

- Tool-chain orchestration
- Normalisatie van input/output
- Rapportgeneratie in standaard formaat

### 6.3 GSD adapter agent

**Naam:** `gsd-flow-analyzer`

Verantwoordelijk voor:

- Laden van GSD phase-context
- Mapping van GSD artefacts naar core input
- Schrijven van GSD-conventie outputs

### 6.4 Commands

- **Generic:** `/flow-analyze`
- **GSD:** `/gsd-analyze-flow`

### 6.5 Skill

**Naam:** `flow-analysis`

Bevat:

- Pattern library
- Gap taxonomy
- Preconditions checklist
- Richtlijnen tegen false positives

---

## 7) Gap-taxonomie (v2)

Minimale set:

- `MISSING_BRANCH`
- `WRONG_PRECONDITION`

Uitbreidingsset:

- `DEAD_END`
- `MISSING_DATA_FLOW`
- `UNREACHABLE_CODE`

Elk gap-resultaat bevat minimaal:

- Locatie (path + line indien beschikbaar)
- Expected
- Actual
- Impact
- Fix hint
- Severity

---

## 8) Kwaliteitsstrategie (kwaliteit boven kwantiteit)

## Kwaliteitsregels

1. Eerst kleine verticale slice, daarna uitbreiden
2. Eerst betrouwbaarheid op 2 gap-types, daarna breadth
3. Elke fase heeft expliciete done-criteria
4. Geen feature-uitbreiding zolang false positives te hoog zijn

## Vertical slice definitie

"Done" betekent:

- GSD command werkt end-to-end
- Minimaal 2 gap types met aantoonbare detectie
- Rapport output is consistent (md + json)
- Testfixtures dekken broken en gezonde flow

---

## 9) Integratie met GSD workflow

## `gsd-plan-checker`

- Optional pre-check op flow-risico in planningsfase

## `gsd-verifier`

- `--flow` mode consumeert analyzer output
- Verifier blijft owner van "goal achieved" verdict
- Flow Analyzer levert gespecialiseerd bewijs, geen verdict-overname

---

## 10) Files (conceptueel)

Core in repo:

- `src/plugin/flow-analyzer/src/index.ts`
- `src/plugin/flow-analyzer/src/types.ts`
- `src/plugin/flow-analyzer/src/tools/*.ts`
- `src/skill/flow-analysis/SKILL.md`
- `src/skill/flow-analysis/references/*.md`

Agent/command definitions:

- `src/agent/flow-analyzer.md`
- `src/agent/gsd-flow-analyzer.md`
- `src/command/flow-analyze.md`
- `src/command/gsd-analyze-flow.md`

---

## 11) Acceptance criteria

## Must

- Agnostische plugin-core operationeel
- GSD adapter operationeel op dezelfde core
- Detectie van `MISSING_BRANCH` en `WRONG_PRECONDITION`
- Output in markdown en json

## Should

- Detectie van `DEAD_END` en `MISSING_DATA_FLOW`
- Integratiepad naar `gsd-verifier --flow`
- Pattern references beschikbaar en bruikbaar

## Nice

- Mermaid flow graph output
- CI gate voor kritieke flow gaps
- Suggestie-output voor gap closure planning

---

## 12) Risico's en mitigatie

- **False positives:** confidence score + evidence-first output
- **Scope creep:** fase-gates en non-goals expliciet bewaken
- **Framework drift:** adapterlaag isoleren, core agnostisch houden
- **Performance:** adapter hints voor target file selectie

---

## 13) Besluit

Deze v2 proposal kiest bewust voor kwaliteit:

- Eerst een kleine, betrouwbare kern
- Dan gecontroleerde uitbreiding
- Met een structuur die GSD direct helpt en tegelijk framework-agnostisch opschaalt

De gedetailleerde architectuur staat in `ai_docs/IMPLEMENTATION-FLOW-ANALYZER.md`.
