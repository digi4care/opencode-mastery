# Flow Analyzer v2 - Implementation Backlog

## Scope

Dit backlog-document vertaalt de v2 proposal naar uitvoerbare, kwaliteitsgerichte stappen.

Principes:

- Kwaliteit boven snelheid
- Vertical slices boven brede maar ondiepe oplevering
- Elke fase heeft harde quality gates

---

## 0) Definition of Done (globaal)

Een fase is alleen done als:

- [ ] Gevraagde artefacts bestaan
- [ ] Testen voor die fase groen zijn
- [ ] Geen open critical issues binnen fase-scope
- [ ] Documentatie bijgewerkt is
- [ ] Output reproduceerbaar is met dezelfde input

---

## 1) Faseplan

## Fase A - Contracts and fixtures (baseline)

**Doel:** strakke data-contracten en testdata vastleggen voordat runtime logic groeit.

### Taken

- [ ] Definieer canonical types (`FlowDefinition`, `FlowGap`, trace/result types)
- [ ] Definieer gap severity en confidence model
- [ ] Maak fixtures:
  - [ ] Broken flow: missing branch
  - [ ] Broken flow: wrong precondition
  - [ ] Healthy flow: no critical gaps
- [ ] Leg expected outputs vast (golden JSON)

### Files

- [ ] `src/plugin/flow-analyzer/src/types.ts`
- [ ] `src/plugin/flow-analyzer/test/fixtures/*.md`
- [ ] `src/plugin/flow-analyzer/test/fixtures/*.json`

### Quality gate

- [ ] Contract review akkoord
- [ ] Fixtures dekken minimaal 2 must-gap types

---

## Fase B - Core plugin tools (must slice)

**Doel:** minimale betrouwbare analysekern met 2 gap types.

### Taken

- [ ] `extract_flows` implementeren
- [ ] `build_flow_graph` implementeren
- [ ] `trace_implementation` implementeren (eerste versie)
- [ ] `detect_flow_gaps` implementeren voor:
  - [ ] `MISSING_BRANCH`
  - [ ] `WRONG_PRECONDITION`
- [ ] `score_flow_confidence` basisversie implementeren
- [ ] ToolResult schema's en error handling uniform maken

### Files

- [ ] `src/plugin/flow-analyzer/src/index.ts`
- [ ] `src/plugin/flow-analyzer/src/tools/extract-flows.ts`
- [ ] `src/plugin/flow-analyzer/src/tools/build-flow-graph.ts`
- [ ] `src/plugin/flow-analyzer/src/tools/trace-implementation.ts`
- [ ] `src/plugin/flow-analyzer/src/tools/detect-flow-gaps.ts`
- [ ] `src/plugin/flow-analyzer/src/tools/score-flow-confidence.ts`

### Tests

- [ ] Unit tests voor alle tools
- [ ] Negatieve tests voor invalid input schema
- [ ] Deterministische output check op fixtures

### Quality gate

- [ ] Alle tool tests groen
- [ ] Minimaal 90% pass op expected fixture assertions
- [ ] Geen critical false positive op healthy fixture

---

## Fase C - Base agent and generic command

**Doel:** generieke end-to-end flow zonder framework-specifieke aannames.

### Taken

- [ ] `flow-analyzer` agent maken
- [ ] `/flow-analyze` command maken
- [ ] Input normalisatie (docs/spec tekst + code-root)
- [ ] Markdown + JSON output format stabiliseren

### Files

- [ ] `src/agent/flow-analyzer.md`
- [ ] `src/command/flow-analyze.md`

### Tests

- [ ] Smoke test command -> agent -> toolchain
- [ ] Snapshot test voor report formatting

### Quality gate

- [ ] End-to-end run zonder framework adapter werkt
- [ ] Rapport bevat flows, gaps, severity en confidence

---

## Fase D - GSD adapter (vertical slice complete)

**Doel:** GSD-specifieke waarde leveren op core analysekern.

### Taken

- [ ] `gsd-flow-analyzer` adapter agent maken
- [ ] `/gsd-analyze-flow` command maken
- [ ] GSD context loader toevoegen:
  - [ ] `.planning/phases/{phase}/*-PLAN.md`
  - [ ] `.planning/phases/{phase}/*-SUMMARY.md`
  - [ ] `.planning/ROADMAP.md`
- [ ] Output naar phase artifacts:
  - [ ] `FLOW-ANALYSIS.md`
  - [ ] `FLOW-ANALYSIS.json`

### Files

- [ ] `src/agent/gsd-flow-analyzer.md`
- [ ] `src/command/gsd-analyze-flow.md`

### Tests

- [ ] Broken GSD phase fixture detecteert 2 must-gap types
- [ ] Healthy GSD fixture heeft geen critical gaps

### Quality gate

- [ ] GSD command end-to-end stabiel
- [ ] Output bruikbaar voor verifier-consumptie

---

## Fase E - Skill and references

**Doel:** analysekennis centraliseren en consistent toepasbaar maken.

### Taken

- [ ] `flow-analysis` skill opzetten
- [ ] References schrijven:
  - [ ] `flow-patterns.md`
  - [ ] `gap-taxonomy.md`
  - [ ] `precondition-checks.md`
- [ ] False-positive reduction guidelines toevoegen

### Files

- [ ] `src/skill/flow-analysis/SKILL.md`
- [ ] `src/skill/flow-analysis/references/flow-patterns.md`
- [ ] `src/skill/flow-analysis/references/gap-taxonomy.md`
- [ ] `src/skill/flow-analysis/references/precondition-checks.md`

### Quality gate

- [ ] Skill geeft concrete beslisregels, geen vage guidance
- [ ] References matchen plugin gap-types 1-op-1

---

## Fase F - GSD integration points

**Doel:** analyzer-output structureel in bestaande GSD flow plaatsen.

### Taken

- [ ] `gsd-plan-checker` update met pre-check route
- [ ] `gsd-verifier` update met `--flow` consumptiepad
- [ ] Vastleggen wanneer flow-analyse mandatory is

### Files

- [ ] `src/agent/gsd-plan-checker.md`
- [ ] `src/agent/gsd-verifier.md`

### Quality gate

- [ ] Geen duplicatie van flow detectielogica in verifier
- [ ] Verifier consumeert artifacts, analyzer blijft specialist

---

## Fase G - Hardening and rollout

**Doel:** betrouwbaarheid en onderhoudbaarheid borgen voor bredere adoptie.

### Taken

- [ ] Uitbreiden met `DEAD_END` en `MISSING_DATA_FLOW`
- [ ] Performance tuning op grotere phases
- [ ] Error messaging en fix hints verbeteren
- [ ] Documentatie afronden en changelog toevoegen

### Quality gate

- [ ] Geen regressie op must-gap types
- [ ] Runtime blijft binnen afgesproken grenzen

---

## 2) Dependency map

- Fase A is prerequisite voor B
- Fase B is prerequisite voor C en D
- Fase C en D zijn prerequisite voor F
- Fase E kan parallel met D na basiscontracten
- Fase G start pas na stabiele D + F

---

## 3) Prioriteit en volgorde (kwaliteitspad)

Aanbevolen volgorde:

1. Fase A
2. Fase B
3. Fase D
4. Fase C
5. Fase E
6. Fase F
7. Fase G

Waarom: eerst betrouwbare kern + GSD waarde, daarna verbreden.

---

## 4) Stop criteria

Stop uitbreiding direct wanneer:

- False positive rate op healthy fixtures stijgt
- Output niet meer explainable is
- Tests flaky worden op core gap-types

Bij stop:

- Eerst stabiliseren
- Dan pas nieuwe gap types of frameworks toevoegen

---

## 5) Release checkpoint (v1.0 analyzer)

V1.0 is release-klaar als:

- [ ] Fase A-B-D-F complete zijn
- [ ] `MISSING_BRANCH` en `WRONG_PRECONDITION` aantoonbaar stabiel zijn
- [ ] GSD verifier integratie gebruikt analyzer artifacts correct
- [ ] Basisdocumentatie voor gebruikers en maintainers beschikbaar is
