# Fase 4 - Determinisme-Audit (Multi-Machine)

## Doel

Vaststellen waarom outputstructuur per machine afwijkt.

## Kernvragen

- Welke factoren veroorzaken drift?
- Welke drift is functioneel schadelijk?

## Bekende Drift Bronnen

| Drift Factor          | Beschrijving                | OS Gevoelig       | Mitigatie                 |
| --------------------- | --------------------------- | ----------------- | ------------------------- |
| Path separators       | `/` vs `\`                  | Windows           | Normalize met path.sep    |
| Environment variables | `$HOME`, `USERPROFILE`      | Cross-platform    | Altijd absolute paden     |
| File ordering         | `ls`, `glob` volgorde       | Non-deterministic | Altijd sorteren in code   |
| Timestamps            | Creation/modification times | Alles             | Expliciet resetten        |
| Line endings          | CRLF vs LF                  | Windows           | force LF in git           |
| UUID generation       | Random IDs                  | Non-deterministic | Seed of deterministic IDs |

## Test Protocol

### Stap 1: Identieke Input Voorbereiden

```
1. Clone repo op beide machines
2. Reset naar specifieke commit
3. Verwijder cached data
4. Draai exact hetzelfde scenario
```

### Stap 2: Vergelijk Output

```bash
# Tree comparison
find . -type f | sort > machineA-tree.txt
find . -type f | sort > machineB-tree.txt
diff machineA-tree.txt machineB-tree.txt

# Hash comparison
sha256sum * > machineA-hashes.txt
sha256sum * > machineB-hashes.txt
diff machineA-hashes.txt machineB-hashes.txt
```

### Stap 3: Analyseer Verschillen

| Diff Type           | Categorie | Acceptabel?       |
| ------------------- | --------- | ----------------- |
| Timestamp only      | Metadata  | Ja                |
| Path separator      | Structure | Nee               |
| Missing files       | Structure | Nee               |
| Content differences | Content   | Nee               |
| Order differences   | Structure | Ja (na sortering) |

## Root Cause Matrix

| Root Cause                     | Category    | Impact | Fix Priority |
| ------------------------------ | ----------- | ------ | ------------ |
| Hardcoded `~/.config/opencode` | Path        | Hoog   | P1           |
| OS-specific path.join()        | Path        | Hoog   | P1           |
| Unsorted glob results          | Order       | Medium | P2           |
| Random UUID generation         | Determinism | Hoog   | P1           |
| Missing default handling       | Config      | Hoog   | P1           |
| Platform-specific shell        | Environment | Medium | P2           |

## Deliverables

- [ ] `analysis/determinism/drift-report.md`
- [ ] `analysis/determinism/hash-compare.csv`
- [ ] `analysis/determinism/root-cause-matrix.md`

## Exit Criteria

- [ ] Elke drift heeft owner, fixrichting en impactscore
- [ ] Minimaal 80% van drift is reproduceerbaar verklaard
