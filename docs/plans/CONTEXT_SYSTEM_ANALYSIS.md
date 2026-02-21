# Context System Analyse - OAC naar OpenCode-Mastery

## Bronnen

- `/media/digi4care/ExtDrive/projects/ai/opencode-mastery/docs/plans/framework-agnostic-context-redesign/`
- Registry.json uit OpenAgentsControl (v2.0.0)

---

## Componenten

### Agents (8)

| ID               | Name             | Type  | Category    |
| ---------------- | ---------------- | ----- | ----------- |
| system-builder   | System Builder   | agent | meta        |
| technical-writer | Technical Writer | agent | specialized |
| copywriter       | Copywriter       | agent | specialized |
| data-analyst     | Data Analyst     | agent | specialized |
| eval-runner      | Eval Runner      | agent | meta        |
| repo-manager     | Repo Manager     | agent | specialized |
| opencoder        | O coder          | agent | specialized |
| openagent        | OpenAgent        | agent | core        |

### Subagents (18)

| ID                  | Name                | Type     | Category    |
| ------------------- | ------------------- | -------- | ----------- |
| task-manager        | Task Manager        | subagent | utility     |
| image-specialist    | Image Specialist    | subagent | specialized |
| reviewer            | Reviewer            | subagent | testing     |
| tester              | Tester              | subagent | testing     |
| documentation       | Documentation       | subagent | specialized |
| coder-agent         | Coder Agent         | subagent | development |
| build-agent         | Build Agent         | subagent | development |
| frontend-specialist | Frontend Specialist | subagent | development |
| devops-specialist   | DevOps Specialist   | subagent | devops      |
| domain-analyzer     | Domain Analyzer     | subagent | analysis    |
| agent-generator     | Agent Generator     | subagent | meta        |
| context-organizer   | Context Organizer   | subagent | meta        |
| workflow-designer   | Workflow Designer   | subagent | meta        |
| command-creator     | Command Creator     | subagent | meta        |
| contextscout        | Context Scout       | subagent | discovery   |
| externalscout       | External Scout      | subagent | discovery   |
| context-retriever   | Context Retriever   | subagent | discovery   |
| context-manager     | Context Manager     | subagent | meta        |

### Commands (19)

| ID                   | Plugin          | Doel                         |
| -------------------- | --------------- | ---------------------------- |
| test                 | builtin         | Tests draaien                |
| commit               | builtin         | Git commit maken             |
| context              | builtin         | Context management           |
| add-context          | builtin         | Context toevoegen            |
| clean                | builtin         | Opschonen                    |
| optimize             | builtin         | Optimaliseren                |
| prompt-enhancer      | builtin         | Prompts verbeteren           |
| worktrees            | builtin         | Git worktrees                |
| build-context-system | builtin         | Context systeem bouwen       |
| validate-repo        | builtin         | Repo valideren               |
| test-new-command     | builtin         | Nieuwe command testen        |
| commit-openagents    | builtin         | OpenAgents commit            |
| prompt-optimizer     | builtin         | Prompt optimalisatie         |
| create-tests         | builtin         | Tests genereren              |
| create-agent         | builtin         | Agent genereren              |
| check-context-deps   | builtin         | Context dependencies checken |
| analyze-patterns     | builtin         | Pattern analyse              |
| notify               | notify          | Notificaties                 |
| (skill commands)     | task-management | Taakmanagement               |

### Context-gerelateerde Subagents (4)

| Agent            | Verantwoordelijkheid                       |
| ---------------- | ------------------------------------------ |
| ContextScout     | Discovery + ranking                        |
| ContextManager   | Lifecycle (Active/Deprecated/Archived)     |
| ContextRetriever | Search & retrieval                         |
| ContextOrganizer | File generation (harvest/extract/organize) |

### Skills (4)

| ID                 | Doel                             |
| ------------------ | -------------------------------- |
| task-management    | Taakmanagement en CLI            |
| smart-router-skill | Slim routeren van taken          |
| context7           | Context7 documentatie integratie |
| context-manager    | Context management               |

---

## Context Commands (3)

| Command               | Doel                                                               | Stages     |
| --------------------- | ------------------------------------------------------------------ | ---------- |
| /context              | Beheer: harvest, extract, organize, update, error, create, migrate | 7 commands |
| /add-context          | Project patterns wizard                                            | 6 stages   |
| /build-context-system | Systeem bouwen                                                     | 8 stages   |

### /context Operations

- harvest - Extract knowledge from summaries → permanent context
- extract - Extract from docs/code/URLs
- organize - Restructure flat files → function-based
- update - Update existing context
- error - Error handling patterns
- create - Create new context
- migrate - Migrate context between formats

### /add-context Wizard (6 stages)

Stage 1: Tech Stack Detection
Stage 2: API & Data Flow
Stage 3: Component Architecture
Stage 4: Naming Conventions
Stage 5: Code Standards
Stage 6: Security & Compliance

Output: `technical-domain.md` in `.opencode/context/project-intelligence/`

---

## Storage Layers

```
Permanent        → .opencode/context/ (structured)
Session (temp)   → .tmp/sessions/{id}/context.md (ephemeral)
External         → .tmp/external-context/ (cached docs)
```

### Permanent Context Structuur

```
.opencode/context/
├── core/context-system/     # Standards, guides, operations
├── project-intelligence/   # Project patterns
├── development/            # Software dev
├── ui/                     # Visual design
├── navigation.md           # Root index
```

### Function-Based Organization

Elke context folder volgt:

- concepts/
- examples/
- guides/
- lookup/
- errors/

---

## Design Patterns (6)

1. **Navigation-Driven** - Altijd navigation.md lezen eerst
2. **MVI** - Files <200 regels, scanbaar in 30s
3. **Function-Based** - concepts/examples/guides/lookup/errors
4. **Lazy Loading** - Standards lezen voor elke operatie
5. **Lifecycle** - Active → Deprecated → Archived
6. **Frontmatter** - Priority, version, category

---

## Lock-in Punten (Geprioriteerd)

### P1 - Kritiek

| Lock-in                | Probleem                                | Impact                                     |
| ---------------------- | --------------------------------------- | ------------------------------------------ |
| `.opencode/` prefix    | Hardcoded in alle paden                 | Kan niet hergebruiken in andere frameworks |
| `id == name` invariant | Elke agent/subagent moet id=name hebben | Breaking change voor bestaande componenten |
| `~/.config/opencode/`  | Hardcoded global pad                    | Niet portable                              |
| registry.json          | Single source of truth vereist          | Geen flexibele component registratie       |

### P2 - Hoog

| Lock-in                     | Probleem                                              |
| --------------------------- | ----------------------------------------------------- |
| Dependency prefix           | MOET `subagent:`, `context:`, etc. gebruiken          |
| Context frontmatter formaat | Alleen HTML comment style (`<!-- -->`) wordt geparsed |

---

## Contracten

### Naming Contract (Kritiek)

```typescript
// Elke agent/subagent MOET hebben:
{
  "id": "task-manager",
  "name": "task-manager"  // MOET gelijk zijn aan id
}
```

### Dependency Contract

```typescript
// Dependencies moeten prefix gebruiken:
"dependencies": {
  "subagent:task-manager": "optional",
  "context:code-quality": "required"
}
```

### Registry Contract

```json
{
  "schema_version": "2.0.0",
  "version": "2.0.0",
  "generated": "timestamp"
}
```

### Context Path Contract

Alle context files moeten:

- Beginnen met `<!--` (HTML comment style)
- Frontmatter formaat: `key: value`
- Einde met `-->`

---

## Fallback Matrix

| Scenario                | Primary                       | Fallback 1                           | Fallback 2 |
| ----------------------- | ----------------------------- | ------------------------------------ | ---------- |
| Context niet gevonden   | local `.opencode/context/`    | global `~/.config/opencode/context/` | error      |
| Config niet gevonden    | local `.opencode/config.json` | global                               | error      |
| Component niet gevonden | registry lookup               | error                                | nvt        |
| Subagent niet gevonden  | dependency lookup             | error                                | nvt        |

---

## Hardcoded Paths

| Path                         | Type        | Locatie            |
| ---------------------------- | ----------- | ------------------ |
| `.opencode/`                 | Root prefix | Alle componenten   |
| `.opencode/context/core/`    | Context     | Context loader     |
| `.opencode/context/project/` | Context     | Context loader     |
| `.opencode/context/domain/`  | Context     | Context loader     |
| `.opencode/tool/`            | Tools       | Tool loader        |
| `.opencode/config.json`      | Config      | Config loader      |
| `registry.json`              | Registry    | Component registry |
| `~/.config/opencode/`        | Global home | scripts/install.sh |

---

## Relatie met Andere Componenten

### om-session (gescheiden)

| Component     | Doel                      | Relatie                   |
| ------------- | ------------------------- | ------------------------- |
| om-session    | Session management plugin | Helper voor ace-reflector |
| Memory module | Persistent memory         | Wordt apart gemaakt       |
| OAC Context   | Workflow context          | Te migreren               |

**om-session is een helper voor ace-reflector - gescheiden van context workflow.**

---

## Adaptie voor Framework-Agnostic

### Te Abstracteren

| Component      | Huidig                  | Doel            |
| -------------- | ----------------------- | --------------- |
| Root directory | `.opencode/`            | Configureerbaar |
| Home path      | `~/.config/opencode/`   | Environment var |
| Context dirs   | vast                    | Configurable    |
| Prefix         | `subagent:`, `context:` | Adapter layer   |

### Niet Te Veranderen (Backward Compatible)

| Contract      | Reden                                  |
| ------------- | -------------------------------------- |
| `id == name`  | Breaking change - legacy support nodig |
| Frontmatter   | Wel meerdere formats ondersteunen      |
| registry.json | Maar met versioning support            |

---

## Volgende Stappen

1. Ontwerp Context Contract v1 (JSON schema)
2. Ontwerp Adapter API (OAC → OpenCode mapping)
3. Bepaal migratiestrategie (backward compat)
4. Implementeer als skill in opencode-mastery
