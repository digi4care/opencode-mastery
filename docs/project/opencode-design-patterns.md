# OpenCode Design Patterns

Dit document beschrijft de Design Patterns voor het bouwen van OpenCode plugins en tools.
Gebaseerd op het oh-my-opencode project - de manier waarop zij plugins bouwen, niet hun specifieke implementatie.

---

## Belangrijkste Uitgangspunten

### 1. TypeScript Eerst

Nieuwe plugins en tools worden in **TypeScript** geschreven, niet in Python.

| Taak            | Taal       | Reden                                     |
| --------------- | ---------- | ----------------------------------------- |
| Plugins         | TypeScript | Directe integratie met OpenCode runtime   |
| Tools           | TypeScript | AI kan ze direct aanroepen                |
| Scripts/Helpers | Python     | Alleen voor CLI utilities buiten OpenCode |

### 2. Twee Soorten Componenten

OpenCode kent twee hoofdcomponenten:

| Component | Wie roept aan?          | Voorbeeld                                |
| --------- | ----------------------- | ---------------------------------------- |
| **Tool**  | AI (model roept aan)    | `grep`, `glob`, `read`                   |
| **Hook**  | OpenCode (event-driven) | `session.created`, `tool.execute.before` |

---

## Tools Pattern

Tools zijn **AI-callable functies** - de AI kan ze direct aanroepen tijdens het uitvoeren van taken.

### Structuur

```
src/
├── skill/
│   └── mijn-plugin/
│       └── src/
│           ├── index.ts           # Plugin entry (exporteert tools + hooks)
│           └── tools/
│               └── mijn-tool.ts  # Tool definitie
```

### Tool Maken (Factory Pattern)

```typescript
// tools/mijn-tool.ts
import { createTool, ToolExecContext } from "@opencode-ai/plugin";

export const mijnTool = createTool({
  name: "mijn_tool",
  description: "Beschrijving wat deze tool doet",

  parameters: {
    type: "object",
    properties: {
      input: { type: "string", description: "Input parameter" },
    },
    required: ["input"],
  },

  execute: async (input: { input: string }, context: ToolExecContext) => {
    // Tool logica hier
    return { result: "iets nuttigs" };
  },
});
```

### Tool Gebruiken

De AI kan deze tool aanroepen met:

```
Tool: mijn_tool
Input: { "input": "waarde" }
```

### Meerdere Tools (Array)

```typescript
import { createTool, Tool } from "@opencode-ai/plugin"

const toolA = createTool({ name: "tool_a", ... })
const toolB = createTool({ name: "tool_b", ... })

export const mijnTools: Tool[] = [toolA, toolB]
```

---

## Hooks Pattern

Hooks zijn **event-driven** - ze reageren op gebeurtenissen in OpenCode.

### Beschikbare Hooks

| Hook Event            | Trigger              | Use Case                        |
| --------------------- | -------------------- | ------------------------------- |
| `session.created`     | Nieuwe sessie start  | Memory bootstrap, context laden |
| `session.deleted`     | Sessie eindigt       | Session snapshot, opschonen     |
| `session.compacting`  | Context window vol   | Pre-compaction flush            |
| `tool.execute.before` | Voor tool uitvoering | Input validatie, logging        |
| `tool.execute.after`  | Na tool uitvoering   | Resultaat verwerken             |
| `prompt.build`        | Prompt wordt gebouwd | Context injecteren              |
| `message.created`     | Nieuw bericht        | Intent detectie                 |

### Hook Maken

```typescript
// hooks/mijn-hook.ts
import { Hook, HookInput } from "@opencode-ai/plugin";

export const mijnHook: Hook = {
  event: "session.created",

  execute: async (input: HookInput) => {
    // Hook logica hier
    // Input bevat: session, project, context, etc.

    return {
      // Eventueel output toevoegen
      modified: true,
    };
  },
};
```

### Hooks Combineren (Plugin)

Een plugin combineert meerdere tools en hooks:

```typescript
// index.ts
import { Plugin } from "@opencode-ai/plugin";
import { toolA, toolB } from "./tools";
import { hookA } from "./hooks/hook-a";
import { hookB } from "./hooks/hook-b";

export const mijnPlugin: Plugin = async (ctx) => {
  return {
    // Tools
    tool: [toolA, toolB],

    // Hooks
    "session.created": hookA,
    "tool.execute.before": hookB,
  };
};

export default mijnPlugin;
```

---

## Plugin Entry (index.ts)

Elke plugin heeft een `index.ts` die de plugin exported:

```typescript
import type { Plugin, PluginInput } from "@opencode-ai/plugin";
import { createTool, Hook } from "@opencode-ai/plugin";

// Tools
import { readTool } from "./tools/read";
import { writeTool } from "./tools/write";

// Hooks
import { bootstrapHook } from "./hooks/bootstrap";
import { compactionHook } from "./hooks/compaction";

export function createMijnPlugin(input: PluginInput): Plugin {
  return {
    // Tools als array
    tool: [readTool, writeTool],

    // Hooks als object met event als key
    "session.created": bootstrapHook,
    "experimental.session.compacting": compactionHook,
  };
}

export default createMijnPlugin;
```

---

## Typische Plugin Structuur

```
mijn-plugin/
├── SKILL.md                    # Skill definitie
└── src/
    ├── index.ts                 # Main entry (createPlugin)
    ├── types.ts                 # TypeScript types
    ├── tools/
    │   ├── index.ts             # Exporteert alle tools
    │   ├── read-tool.ts
    │   ├── write-tool.ts
    │   └── search-tool.ts
    └── hooks/
        ├── index.ts             # Exporteert alle hooks
        ├── bootstrap.ts         # session.created
        ├── compaction.ts        # session.compacting
        └── snapshot.ts          # session.deleted
```

---

## Belangrijke Regels

### ✅ Wel Doen

1. **TypeScript gebruiken** voor alle nieuwe code
2. **Factory functions** (`createTool()`, `createHook()`) gebruiken
3. **Types definiëren** voor duidelijke interfaces
4. **Events documenteren** in SKILL.md
5. **Error handling** in elke tool/hook

### ❌ Niet Doen

1. **Geen Python scripts** voor AI-logica (gebruik TypeScript)
2. **Geen losse functies** - altijd in een plugin structuur
3. **Geen hardcoded paths** - gebruik `context.projectRoot`
4. **Geen blocking calls** - gebruik async/await

---

## Voorbeeld: Memory Plugin

Zie `src/skill/opencode-memory/` voor een volledig voorbeeld:

```
opencode-memory/
├── SKILL.md
└── src/
    ├── index.ts              # Plugin entry
    ├── tools/
    │   └── memory-tool.ts   # AI callable tools
    └── hooks/
        ├── memory-bootstrap.ts    # Session start
        ├── memory-compaction.ts   # Context 80%
        ├── memory-snapshot.ts     # Session end
        └── memory-intent.ts       # Intent detectie
```

---

## TL;DR Cheat Sheet

```typescript
// 1. Tool maken
import { createTool } from "@opencode-ai/plugin"

export const mijnTool = createTool({
  name: "mijn_tool",
  description: "Wat het doet",
  parameters: { ... },
  execute: async (input, context) => { ... }
})

// 2. Hook maken
export const mijnHook = {
  event: "session.created",
  execute: async (input) => { ... }
}

// 3. Plugin combineren
export const mijnPlugin = {
  tool: [mijnTool],
  "session.created": mijnHook
}
```

---

## Meer Informatie

### Voor Diepgaande Research

| Onderwerp           | Referentie                                                                    |
| ------------------- | ----------------------------------------------------------------------------- |
| **Plugin Patterns** | `github.com/code-yeongyu/oh-my-opencode` - hoe plugins en tools worden gebouwd |
| **OpenCode Core**   | `github.com/opencode-ai/opencode` - officiële OpenCode repository             |

### Documentatie

- OpenCode Plugin API: `@opencode-ai/plugin` package
- Voorbeelden: `src/skill/opencode-memory/`
