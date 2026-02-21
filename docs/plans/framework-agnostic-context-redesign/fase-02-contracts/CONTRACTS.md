# Fase 2 - Contract Extractie (WERKELIJKE DATA)

## Gevonden Contracts

### Harde Contracts (Uit registry.json en code)

| Contract              | Verklaring                                        | Bewijs                      | Impact  |
| --------------------- | ------------------------------------------------- | --------------------------- | ------- |
| `id == name`          | Agent/subagent identifier moet exact overeenkomen | registry.json: alle entries | Kritiek |
| `.opencode/` prefix   | Alle paden beginnen met .opencode/                | Glob + code                 | Kritiek |
| registry.json         | Single source of truth                            | registry.json               | Kritiek |
| schema_version: 2.0.0 | Registry versie verplicht                         | registry.json               | Hoog    |
| dependency prefix     | MOET `subagent:`, `context:`, etc. gebruiken      | registry.json               | Hoog    |
| context frontmatter   | MOET `<!-- -->` formaat gebruiken                 | Context bestanden           | Hoog    |

### Impliciete Contracts (Uit code)

| Contract              | Verklaring                      | Bestand            | Impact  |
| --------------------- | ------------------------------- | ------------------ | ------- |
| `~/.config/opencode`  | Hardcoded global pad            | scripts/install.sh | Kritiek |
| Context pad structuur | `.opencode/context/{category}/` | Context loader     | Kritiek |
| config.json locatie   | `.opencode/config.json`         | Config loader      | Hoog    |

### Legacy Contracts

| Contract                 | Verklaring             | Risico              |
| ------------------------ | ---------------------- | ------------------- |
| Bun-only package manager | Geen npm/pnpm fallback | Beperkt portability |
| TypeScript deployment    | Geen pure JS fallback  | Complexiteit        |

## Invarianten

| Invariant             | Beschrijving                         | Failing Scenario        |
| --------------------- | ------------------------------------ | ----------------------- |
| Agent name matching   | `id` en `name` moeten identiek zijn  | "Component not found"   |
| Registry integrity    | registry.json MOET valid schema zijn | Load failures           |
| Dependency resolution | Prefix must be recognized            | Unresolved dependencies |
| Context format        | HTML comment frontmatter vereist     | Parsing errors          |

## Fallback Matrix (WERKELIJK)

| Scenario                | Primary                       | Fallback 1                           | Fallback 2 | Gedrag      |
| ----------------------- | ----------------------------- | ------------------------------------ | ---------- | ----------- |
| Context niet gevonden   | local `.opencode/context/`    | global `~/.config/opencode/context/` | error      | Local-first |
| Config niet gevonden    | local `.opencode/config.json` | global                               | error      | Local-first |
| Component niet gevonden | registry lookup               | error                                | nvt        | Hard fail   |
| Subagent niet gevonden  | dependency lookup             | error                                | nvt        | Hard fail   |

## Lock-in Punten (Geprioriteerd)

### P1 - Kritiek

1. **`.opencode/` prefix** - Hardcoded in alle paden
   - Impact: Kan niet hergebruiken in andere frameworks
   - Fix: Adapter-laag met configurable root

2. **`id == name` invariant** - In elke agent/subagent
   - Impact: Breaking change voor bestaande componenten
   - Fix: Backward compatible validator

3. **Registry schema v2.0.0** - Vereiste versie
   - Impact: Oudere registries werken niet
   - Fix: Schema versioning in adapter

### P2 - Hoog

1. **Dependency prefix** - `subagent:`, `context:`, etc.
   - Impact: Vaste prefix schema
   - Fix: Adapter met prefix mapping

2. **Context frontmatter formaat** - HTML comment style
   - Impact: Alleen dit formaat wordt geparsed
   - Fix: Meerdere format ondersteunen

## Deliverables

- [x] `analysis/contracts/contract-register.md` - zie boven
- [x] `analysis/contracts/invariants.md` - zie boven
- [x] `analysis/contracts/fallback-matrix.md` - zie boven

## Exit Criteria

- [x] Top lock-in contracts geïdentificeerd
- [x] Impact en mitigatie gedocumenteerd
