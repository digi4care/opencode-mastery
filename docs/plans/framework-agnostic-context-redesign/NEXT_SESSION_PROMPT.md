# Vervolg-prompt: Framework-Agnostic Context Redesign

## Waar we zijn gebleven

We hebben een **volledig analyseplan** gemaakt voor het framework-agnostisch maken van het OpenAgentsControl contextsysteem.

De **analyse is deels uitgevoerd**:

- ✅ Repository gekloneerd (`/media/digi4care/ExtDrive/projects/ai/OpenAgentsControl`)
- ✅ Inventory opgezet met 8 agents, 18 subagents, 19 commands, 2 tools, 1 plugin, 4 skills
- ✅ Contracts geëxtraheerd (id==name, .opencode/ prefix, registry schema)
- ✅ Flows gedocumenteerd (install, registry load, context resolution)
- ✅ Lock-in punten geprioriteerd (P1: .opencode/ prefix, ~/.config/opencode)

## Wat al gedocumenteerd staat

In `docs/plans/framework-agnostic-context-redesign/`:

| Fase     | Status         | Bestand                            |
| -------- | -------------- | ---------------------------------- |
| Fase 0   | Template       | fase-00-scope-baselines/README.md  |
| Fase 1   | **Uitgevoerd** | fase-01-inventory/INVENTORY.md     |
| Fase 2   | **Uitgevoerd** | fase-02-contracts/CONTRACTS.md     |
| Fase 3   | **Uitgevoerd** | fase-03-flow/FLOW.md               |
| Fase 4-5 | **Uitgevoerd** | fase-04-determinism/DETERMINISM.md |
| Fase 6   | Ontwerp        | fase-06-contract-v1/README.md      |
| Fase 7   | Ontwerp        | fase-07-adapters/README.md         |
| Fase 8   | Ontwerp        | fase-08-migration/README.md        |
| Fase 9   | Ontwerp        | fase-09-governance/README.md       |

## Top Lock-in Punten (uit analyse)

1. **`.opencode/` prefix** - Hardcoded in ALLE paden (100+ bestanden)
2. **`~/.config/opencode`** - Global installatie hardcoded in install.sh
3. **`id == name` invariant** - Vereist in elke agent/subagent
4. **Registry schema v2.0.0** - Vaste structuur
5. **Dependency prefixes** - `subagent:`, `context:`, etc.

## Vervolgstappen

### Direct te doen:

1. **Fase 6 voltooien**: Context Contract v1 daadwerkelijk definiëren met JSON schema
2. **Fase 7 voltooien**: Adapter API implementeren (OpenAgentsControl → OpenCode)
3. **Fase 8 voltooien**: Migratieplan concretiseren

### Brainstormvragen:

1. Welke van de 5 lock-in punten pakken we EERST aan?
2. Hoe maken we `.opencode/` configureerbaar zonder breaking changes?
3. Welke adapter moet als eerste werken?

## Context om te laden

In de nieuwe chat, laad eerst:

- `/media/digi4care/ExtDrive/projects/ai/opencode-mastery/docs/plans/framework-agnostic-context-redesign/README.md`
- `/media/digi4care/ExtDrive/projects/ai/opencode-mastery/docs/plans/framework-agnostic-context-redesign/fase-01-inventory/INVENTORY.md`
- `/media/digi4care/ExtDrive/projects/ai/opencode-mastery/docs/plans/framework-agnostic-context-redesign/fase-02-contracts/CONTRACTS.md`

---

## Startprompt voor volgende chat

Kopieer deze prompt om verder te gaan:

---

**Context:** We werken aan het framework-agnostisch maken van het OpenAgentsControl contextsysteem. Analyse is deels gedaan - zie `docs/plans/framework-agnostic-context-redesign/`.

**Laad eerst:**

- `docs/plans/framework-agnostic-context-redesign/README.md`
- `docs/plans/framework-agnostic-context-redesign/fase-01-inventory/INVENTORY.md`
- `docs/plans/framework-agnostic-context-redesign/fase-02-contracts/CONTRACTS.md`

**Taak:**

1. Pak de top lock-in punten: `.opencode/` prefix, `~/.config/opencode`, `id==name` invariant
2. Ontwerp het `Context Contract v1` met concrete JSON schema
3. Ontwerp adapter API voor OpenAgentsControl → OpenCode mapping
4. Bepaal migratiestrategie (hoe behouden we backward compat?)

**Constraints:**

- Max 3 sub-taken per keer
- Altijd eerst context laden
- Nooit zomaar refactoren zonder plan
