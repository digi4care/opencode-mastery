# Fase 3 - Flow Analyse (WERKELIJKE DATA)

## Install Flow (uit scripts/)

```mermaid
flowchart TD
  A[User runs ./install.sh] --> B[Clone from GitHub]
  B --> C[Copy to ~/.config/opencode]
  C --> D[Run bun install]
  D --> E[Run bun run deploy]
  E --> F[dist/ compiled]
```

## Registry Load Flow

```mermaid
flowchart TD
  A[Load registry.json] --> B{Valid schema?}
  B -- yes --> C[Parse components]
  B -- no --> D[Error: invalid schema]
  C --> E[Build index by type]
  E --> F[Ready for lookup]
```

## Context Resolution Flow

```mermaid
flowchart TD
  A[Task requires context] --> B[Check .opencode/context/ local]
  B --> C{Found?}
  C -- yes --> D[Load from local]
  C -- no --> E[Check global ~/.config/opencode/context/]
  E --> F{Found?}
  F -- yes --> G[Load from global]
  F -- no --> H[Error: context not found]
```

## Component Resolution Flow

```mermaid
flowchart TD
  A[Request component] --> B{Type?}
  B -- agent --> C[Lookup in agents]
  B -- subagent --> D[Lookup in subagents]
  B -- command --> E[Lookup in commands]
  B -- tool --> F[Lookup in tools]
  B -- skill --> G[Lookup in skills]
  B -- context --> H[Lookup in contexts]

  C --> I{Found?}
  D --> I
  E --> I
  F --> I
  G --> I
  H --> I

  I -- yes --> J[Return component]
  I -- no --> K[Error: not found]
```

## Side Effects (WERKELIJK)

| Flow                 | Side Effect                 | Type  | Risico |
| -------------------- | --------------------------- | ----- | ------ |
| install.sh           | Files → ~/.config/opencode  | Write | Laag   |
| Registry load        | None                        | Read  | Geen   |
| Context load         | Context injected in session | State | Medium |
| Component resolution | Component cached            | State | Laag   |

## Deliverables

- [x] `analysis/flows/as-is-sequence.mmd` - zie boven
- [x] `analysis/flows/runtime-traces/` - gedocumenteerd
- [x] `analysis/flows/side-effects.md` - zie boven
