# Framework-Agnostic Context Redesign

## Overzicht

Dit project doorlicht en moderniseert het contextsysteem van OpenAgentsControl naar een framework-agnostisch model.

## Kernproblemen

- Global installatie creeert global-state gedrag
- Context output is niet deterministisch over machines
- Contextpaden zijn gekoppeld aan frameworkspecifieke agentlogica
- Vendor lock-in beperkt hergebruik

## Projectstructuur

```
docs/plans/framework-agnostic-context-redesign/
├── fase-00-scope-baselines/    # Scope, baselines, meetprotocol
├── fase-01-inventory/          # Componenten en systeemkaart
├── fase-02-contracts/          # Contract extractie
├── fase-03-flow/               # Flow analyse (statisch + dynamisch)
├── fase-04-determinism/        # Determinisme-audit
├── fase-05-coupling/           # Coupling en lock-in scorecard
├── fase-06-contract-v1/       # Context Contract v1
├── fase-07-adapters/           # Adapterarchitectuur
├── fase-08-migration/          # Migratieplan en compatibiliteit
└── fase-09-governance/         # Governance en CI gates
```

## Werkstromen

- **WS-A**: Analyse en bewijs (Fase 1-5)
- **WS-B**: Architectuur en ontwerp (Fase 6-7)
- **WS-C**: Migratie en adoptie (Fase 8-9)

## Bronnen

- `https://github.com/digi4care/OpenAgentsControl`
- `AGENTS.md`
- `docs/opencode/AGENTS.md`
- `docs/project/config-system.md`
