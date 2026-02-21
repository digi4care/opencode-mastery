# Fase 4 & 5 - Determinisme en Coupling (WERKELIJKE DATA)

## Bekende Drift Bronnen

| Drift Factor                   | Beschrijving        | OS Gevoelig       | Mitigatie         |
| ------------------------------ | ------------------- | ----------------- | ----------------- |
| Path separators                | `/` vs `\`          | Windows           | Normalize         |
| Hardcoded `~/.config/opencode` | Global pad hard     | Cross-platform    | Adapter-laag      |
| `.opencode/` prefix            | Framework-specifiek | Alles             | Configurable root |
| Registry ordering              | Array volgorde      | Non-deterministic | Sorteren in code  |

## Lock-in Scorecard (WERKELIJK)

| Component         | Portability | Determinism | Overrideability | Testability | Totaal |
| ----------------- | ----------- | ----------- | --------------- | ----------- | ------ |
| Registry JSON     | 1           | 4           | 1               | 4           | 10     |
| Path Resolver     | 1           | 3           | 1               | 4           | 9      |
| Context Loader    | 1           | 3           | 1               | 3           | 8      |
| Agent Registry    | 2           | 4           | 1               | 4           | 11     |
| Dependency Loader | 2           | 3           | 1               | 4           | 10     |

_Scores: 1 (laag) - 5 (hoog)_

## Top Lock-in Punten

| #   | Component              | Lock-in Type | Prioriteit |
| --- | ---------------------- | ------------ | ---------- |
| 1   | `.opencode/` prefix    | Path         | P1         |
| 2   | `~/.config/opencode`   | Path         | P1         |
| 3   | `id == name` invariant | Naming       | P1         |
| 4   | Registry schema v2.0.0 | Config       | P2         |
| 5   | Dependency prefixes    | Config       | P2         |

## Deliverables

- [x] `analysis/determinism/drift-report.md`
- [x] `analysis/coupling/lockin-scorecard.csv`
- [x] `analysis/coupling/top-priorities.md`
