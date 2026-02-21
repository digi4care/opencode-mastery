# Fase 0 - Scope, Baselines en Meetprotocol

## Doel

Een eenduidig startpunt maken zodat alle volgende analyses vergelijkbaar zijn.

## Kernvragen

- Welke systemen en componenten vallen exact binnen de analyse?
- Welke omgevingsvariabelen mogen variëren en welke niet?

## Scope

### In Scope

- `AGENTS.md` en `docs/opencode/AGENTS.md` als start component discovery
- Shared config stack (`opencode.config.yaml` en `src/lib/config/*`)
- Agent registraties, tool/hook patterns, install/deploy scripts
- Context generation flow
- Local vs global context resolutiegedrag

### Out of Scope

- Directe grote refactor in productiecode
- Breaking API-wijzigingen zonder compatibiliteitslaag

## Baseline Omgevingen

| #   | OS      | Shell      | Versie       | Installatie      |
| --- | ------- | ---------- | ------------ | ---------------- |
| 1   | Linux   | bash       | Ubuntu 22.04 | Global + Local   |
| 2   | macOS   | zsh        | Sonoma 14.x  | Global           |
| 3   | Windows | powershell | WSL2 Ubuntu  | Global (via WSL) |

## Meetprotocol

### Scenario Inputs (vast)

1. **Scenario A**: Fresh install, geen project-context
2. **Scenario B**: Project-local context aanwezig
3. **Scenario C**: Mixed mode (local + global)

### Compare Methode

1. **Tree diff**: `find . -type f | sort | diff`
2. **Hash diff**: `sha256sum *` per directory
3. **Manifest metadata**: vergelijk timestamps en versies

### Bewijsopslag

- `analysis/baseline/runs/{run_id}/`
  - `scenario.json`
  - `tree.txt`
  - `hashes.txt`
  - `manifest.json`
  - `notes.txt`

## Deliverables

- [ ] `analysis/baseline/scope.md`
- [ ] `analysis/baseline/environments.md`
- [ ] `analysis/baseline/measurement-protocol.md`

## Exit Criteria

- [ ] Iedereen gebruikt dezelfde scenario-inputset
- [ ] Variabelen die output beïnvloeden zijn gedocumenteerd
