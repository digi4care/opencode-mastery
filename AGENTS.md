# AGENTS.md - Project Index

**Project:** opencode-mastery  
**Versie:** 2.0.0  
**Laatste update:** 2026-02-19

## Overzicht

OpenCode skills en plugins met gedeelde configuratie. Bevat 16 skills, 3 TypeScript plugins, en een unified config system.

## ⚠️ KRITIEK: Config System

**ALLE plugins en tools gebruiken de gedeelde config:**

```
opencode.config.yaml         # Single source of truth
     ↓
src/lib/config/              # Shared config library
     ↓
Alle plugins                 # Gebruiken zelfde config
```

**Lees eerst:** [docs/project/config-system.md](docs/project/config-system.md)

Dit is de BELANGRIJKSTE documentatie voor deze repo. Hierin staat:

- Hoe de config werkt
- Hoe plugins de config gebruiken
- Hoe nieuwe features toe te voegen

## Structuur

```
opencode-mastery/
├── opencode.config.yaml       # ⚙️ CENTRALE CONFIG
├── src/
│   ├── lib/
│   │   └── config/            # Shared config library (ALLE plugins gebruiken dit)
│   │       ├── schema.ts      # Zod schemas
│   │       ├── loader.ts      # YAML loader
│   │       ├── defaults.ts    # Default waarden
│   │       ├── types.ts       # Model resolution types
│   │       ├── frontmatter-parser.ts  # YAML frontmatter parser
│   │       └── model-resolver.ts      # 5-level model resolution
│   │
│   ├── skill/                 # 16 Skills
│   │   ├── opencode-mastery/
│   │   ├── test-driven-development/
│   │   ├── systematic-debugging/
│   │   ├── playwright-cli/
│   │   ├── frontend-design/
│   │   ├── tailwind/
│   │   ├── shadcn-svelte/
│   │   ├── svelte*/
│   │   ├── database-architect/
│   │   └── postgresql/
│   │
│   └── plugin/                # 3 TypeScript Plugins
│       ├── opencode-mastery/  # Docs + Memory tools
│       ├── tdd-enforcer/      # TDD enforcement
│       └── debug-assistant/   # Debugging tools
│
└── docs/
    └── project/
        └── config-system.md   # 🔥 LEES DIT EERST
```

## Nieuwe Feature Toevoegen

### Stap 1: Update Config Schema

```typescript
// src/lib/config/schema.ts
export const MyFeatureConfigSchema = z.object({
  enabled: z.boolean().default(true),
  // ... opties
});

// Voeg toe aan FeaturesConfigSchema
```

### Stap 2: Update Defaults

```typescript
// src/lib/config/defaults.ts
myFeature: {
  enabled: true,
  // ...
}
```

### Stap 3: Update Config File

```yaml
# opencode.config.yaml
features:
  myFeature:
    enabled: true
```

### Stap 4: Gebruik in Plugin

```typescript
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";

if (!isFeatureEnabled("myFeature")) {
  return { tool: [] };
}

const config = getFeatureConfig("myFeature");
```

### Stap 5: Model Resolution (optioneel)

5-level pipeline voor model selectie:

| #   | Prioriteit     | Bron                      |
| --- | -------------- | ------------------------- |
| 1️⃣  | CLI flag       | `--model` of `-m`         |
| 2️⃣  | Frontmatter    | `model:` in .md file      |
| 3️⃣  | User override  | JSON config `agent.model` |
| 4️⃣  | Inherited      | Van parent agent          |
| 5️⃣  | System default | OpenCode's actieve model  |

```typescript
import { resolveModel, resolveModelWithSource } from "../../lib/config";

// Simpel - alleen model string
const model = resolveModel({
  userModel: agentConfig.model, // Uit JSON config (optioneel)
  systemDefault: context.model, // OpenCode's actieve model
});

// Volledig - met source tracking
const result = resolveModelWithSource({
  frontmatterModel: "anthropic/claude-sonnet-4", // Uit .md file
  userModel: agentConfig.model, // Uit JSON config
  systemDefault: context.model, // OpenCode global
});
// result.model = "anthropic/claude-sonnet-4"
// result.source = "frontmatter"
```

**Zie:** [docs/project/config-system.md](docs/project/config-system.md) voor volledige guide.

## Build/Test Commands

```bash
# Installatie
./install.sh -y                # Alles installeren
./uninstall.sh --silent        # Alles verwijderen

# TypeScript
bun install                    # Dependencies
bun run build                  # Build

# Python (indien nodig)
uv sync                        # Python dependencies
```

## Package Managers

| Taal                  | Tool    |
| --------------------- | ------- |
| JavaScript/TypeScript | **Bun** |
| Python                | **uv**  |

## Quick Links

| Wat                    | Waar                                                           |
| ---------------------- | -------------------------------------------------------------- |
| **🔥 CONFIG SYSTEM**   | [docs/project/config-system.md](docs/project/config-system.md) |
| **Project Conventies** | [docs/project/conventions.md](docs/project/conventions.md)     |
| **Plugins Guide**      | [docs/opencode/plugins.md](docs/opencode/plugins.md)           |
| **Tools Guide**        | [docs/opencode/tools.md](docs/opencode/tools.md)               |

## Anti-Patterns (NOOIT doen)

| Anti-Pattern                  | Correct Pattern          |
| ----------------------------- | ------------------------ |
| Eigen config in plugin        | Gebruik `src/lib/config` |
| `skills/` (plural directory)  | `skill/` (singular)      |
| Python scripts voor AI logica | TypeScript tools         |
| Harde defaults in code        | Lees uit config          |
| pnpm/npm gebruiken            | Alleen Bun               |

## Installatie

Na installatie bevindt zich in `~/.config/opencode/`:

- `skill/` - 16 skills
- `plugin/` - 3 TypeScript plugins
- `lib/config/` - Shared config library
- `opencode.config.yaml` - Default config

## Skills (16)

| Skill                   | Doel                     |
| ----------------------- | ------------------------ |
| opencode-mastery        | OpenCode documentatie    |
| test-driven-development | TDD enforcement          |
| systematic-debugging    | Methodisch debuggen      |
| playwright-cli          | Browser automatisering   |
| frontend-design         | UI/UX voor developers    |
| tailwind                | CSS styling              |
| shadcn-svelte           | UI components            |
| svelte\*                | Svelte ecosysteem        |
| database-architect      | Database selectie        |
| postgresql              | PostgreSQL implementatie |

## Plugins (3)

| Plugin           | Tools                                     |
| ---------------- | ----------------------------------------- |
| opencode-mastery | search-docs, download-docs, memory-\*     |
| tdd-enforcer     | validate-tdd-cycle, check-test-exists     |
| debug-assistant  | wait-for, find-flaky-tests, debug-session |
