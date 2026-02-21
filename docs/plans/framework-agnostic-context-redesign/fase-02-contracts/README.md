# Fase 2 - Contract Extractie (Expliciet en Impliciet)

## Doel

Alle harde en verborgen aannames expliciet maken.

## Kernvragen

- Welke paden en bestanden zijn hard vereist?
- Welke invarianten veroorzaken lookup failures of lock-in?

## Gevonden Contracts

### Harde Contracts (Documented)

| Contract                 | Verklaring                                        | Bron                          | Impact  |
| ------------------------ | ------------------------------------------------- | ----------------------------- | ------- |
| `id == name`             | Agent identifier moet exact overeenkomen met naam | docs/opencode/AGENTS.md       | Kritiek |
| config schema            | Alle features moeten via `opencode.config.yaml`   | AGENTS.md                     | Hoog    |
| 5-level model resolution | CLI > Frontmatter > User > Inherited > System     | docs/project/config-system.md | Hoog    |
| skill directory naming   | Moet `skill/` (singular) zijn, niet `skills/`     | AGENTS.md                     | Medium  |

### Impliciete Contracts (In Code)

| Contract               | Verklaring                        | Bestand     | Impact  |
| ---------------------- | --------------------------------- | ----------- | ------- |
| `~/.config/opencode`   | Hardcoded global pad              | install.sh  | Kritiek |
| `.opencode/context/`   | Framework-specifiek contextpad    | agent logic | Kritiek |
| `opencode.config.yaml` | Config filename vereist           | loader.ts   | Hoog    |
| Plugin entrypoint      | Moet `src/plugin/{name}/index.ts` | deploy.ts   | Medium  |

### Legacy/Accidental Contracts

| Contract                 | Verklaring                  | Risico              |
| ------------------------ | --------------------------- | ------------------- |
| bun-only package manager | Geen pnpm/npm ondersteuning | Beperkt portability |
| TypeScript deployment    | Geen pure JS fallback       | Complexiteit        |

## Contract Record Template

```markdown
## {contract_id}

- **Statement**: {wat het contract zegt}
- **Source**: documented | implicit-in-code | legacy
- **Severity**: critical | high | medium | low
- **Evidence Files**: {lijst van bestanden}
- **Breakage If Violated**: {wat er misgaat}
- **Proposed Normalization**: {fix voorstel}
```

## Invarianten

| Invariant                | Beschrijving                                     | Failing Scenario           |
| ------------------------ | ------------------------------------------------ | -------------------------- |
| Agent name matching      | `id` en `name` moeten identiek zijn              | "Agent not found" errors   |
| Config schema versioning | Schema wijzigingen moeten backward compat zijn   | Config load failures       |
| Path normalization       | OS-specifieke paden moeten genormaliseerd worden | Bestand niet gevonden      |
| Order independence       | Output mag niet afhangen van execution order     | Non-reproduceerbare builds |

## Fallback Matrix

| Scenario              | Primary           | Fallback 1         | Fallback 2 | Fallback 3 |
| --------------------- | ----------------- | ------------------ | ---------- | ---------- |
| Config niet gevonden  | error             | defaults hardcoded | nvt        | nvt        |
| Agent niet gevonden   | registered lookup | frontmatter        | error      | nvt        |
| Context niet gevonden | local path        | global path        | error      | nvt        |
| Skill niet gevinden   | skill/ dir        | error              | nvt        | nvt        |

## Deliverables

- [ ] `analysis/contracts/contract-register.md`
- [ ] `analysis/contracts/invariants.md`
- [ ] `analysis/contracts/fallback-matrix.md`

## Exit Criteria

- [ ] Elk kritisch runtimegedrag heeft een expliciet contractrecord
- [ ] Top 20 lock-in contracts zijn geprioriteerd
