# Fase 3 - Flow Analyse (Statisch + Dynamisch)

## Doel

Begrijpen hoe gedrag echt ontstaat in runtime, inclusief side effects.

## Kernvragen

- Waar ontstaat global state?
- Waar worden local overrides genegeerd?

## Statische Flow Analyse

### Install Flow

```mermaid
flowchart TD
  A[User runs ./install.sh] --> B[Clone/download from GitHub]
  B --> C[Copy files to ~/.config/opencode]
  C --> D[Run bun install]
  D --> E[Run bun run deploy]
  E --> F[Plugins compiled to dist/]
```

### Config Load Flow

```mermaid
flowchart TD
  A[Plugin/Skill requests config] --> B{opencode.config.yaml exists?}
  B -- yes --> C[Parse YAML]
  C --> D[Validate against schema]
  D --> E[Merge with defaults]
  E --> F[Return config object]
  B -- no --> G[Use hardcoded defaults]
  G --> F
```

### Context Generation Flow

```mermaid
flowchart TD
  A[Task requires context] --> B{Context type determined}
  B --> C[Build required paths list]
  C --> D[Check local .opencode/context/]
  D --> E{Found?}
  E -- yes --> F[Load from local]
  E -- no --> G[Check global ~/.config/opencode/context/]
  G --> H{Found?}
  H -- yes --> I[Load from global]
  H -- no --> J[Error: context not found]
  F --> K[Inject into session]
  I --> K
  J --> L[Fail with actionable message]
```

### Agent Resolution Flow

```mermaid
flowchart TD
  A[Request agent by name] --> B{CLI --model flag?}
  B -- yes --> C[Use CLI model]
  B -- no --> D{Frontmatter model in .md?}
  D -- yes --> E[Use frontmatter model]
  D -- no --> F{User config agent.model?}
  F -- yes --> G[Use user model]
  F -- no --> H{Inherited from parent?}
  H -- yes --> I[Use inherited model]
  H -- no --> J[Use system default]
```

## Dynamische Trace Runs

### Scenario A: Fresh Install (Geen Project Context)

```
Input:
- Clean ~/.config/opencode
- No .opencode/ in project

Expected:
- Global context used
- All paths resolve to ~/.config/opencode/*
```

### Scenario B: Project-Local Context Aanwezig

```
Input:
- Global ~/.config/opencode present
- Project has .opencode/context/

Expected:
- Project-local context takes precedence
- Global fallback only if local missing
```

### Scenario C: Mixed Mode

```
Input:
- Both local and global context present
- Some files in both locations

Expected:
- Local files override global
- Merged manifest of both
```

## Side Effects

| Flow               | Side Effect                         | Type  | Risico |
| ------------------ | ----------------------------------- | ----- | ------ |
| install.sh         | Files written to ~/.config/opencode | Write | Laag   |
| bun run deploy     | dist/ files compiled                | Write | Laag   |
| Config load        | None (read-only)                    | Read  | Geen   |
| Context generation | Context injected into session       | State | Medium |
| Agent resolution   | None (read-only)                    | Read  | Geen   |

## Deliverables

- [ ] `analysis/flows/as-is-sequence.mmd`
- [ ] `analysis/flows/runtime-traces/*.json`
- [ ] `analysis/flows/side-effects.md`

## Exit Criteria

- [ ] Voor elk scenario is er een gevalideerde sequence
- [ ] Global/local precedence is bewijsbaar vastgelegd
