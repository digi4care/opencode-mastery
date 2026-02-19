# OpenCode Config System

> **Single Source of Truth** voor alle features, plugins, en tools configuratie.

## Overzicht

Het config systeem gebruikt `opencode.config.yaml` in de project root als centrale configuratie. Alle plugins en tools lezen hun instellingen uit dit bestand.

## Config File Locatie

```
project-root/
├── opencode.config.yaml    # Centrale configuratie
├── .memory.md              # Project geheugen (gebruikt config)
├── src/
│   ├── skill/
│   └── plugin/
│       └── opencode-mastery/
│           └── lib/
│               └── config.ts   # Config library
```

## Config Structuur

```yaml
# opencode.config.yaml
version: "1.0"

# Feature toggles - schakel features aan/uit
features:
  memory: true # Project geheugen
  docs: true # Documentatie zoekfunctie
  autoUpdate: false # Automatische doc updates
  context7: true # Context7 live docs

# Plugin configuraties
plugins:
  opencode-mastery:
    enabled: true
    memory:
      lazyLoading: true
      compaction:
        count_based: 80
        event_based: true
        time_based: 15
    docs:
      cache_ttl_days: 7
      sources:
        - github: anomalyco/opencode
        - context7: /anomalyco/opencode

  # Toekomstige plugins (voorbeelden)
  tdd-enforcer:
    enabled: true
    strict: false
    blockWithoutTest: true

  debug-assistant:
    enabled: true
    autoStart: true
    maxHypotheses: 3
```

## Hoe De Config Werkt

### 1. Config Lezen

De `lib/config.ts` library biedt helper functies:

```typescript
import {
  loadConfig,
  getFeature,
  getPluginConfig,
  isFeatureEnabled,
} from "./lib/config";

// Laad volledige config
const config = loadConfig();

// Check of feature enabled is
if (isFeatureEnabled("memory")) {
  // Memory functionaliteit uitvoeren
}

// Haal specifieke plugin config
const memoryConfig = getPluginConfig("memory", "memory");
// Retourneert: { lazyLoading: true, compaction: {...} }

// Haal enkele feature toggle
const docsEnabled = getFeature("docs"); // true/false
```

### 2. Config in Tools

Elke tool moet de config respecteren:

```typescript
// Voorbeeld: memory-remember.ts
export const memoryRemember = tool(
  z.object({ content: z.string() }),
  async (args) => {
    // CHECK CONFIG EERST!
    if (!isFeatureEnabled("memory")) {
      return {
        success: false,
        data: { error: "Memory is disabled in opencode.config.yaml" },
      };
    }

    // Ga door met normale functionaliteit
    const result = remember(args.content);
    return { success: true, data: result };
  },
);
```

### 3. Default Waarden

Als `opencode.config.yaml` niet bestaat of een waarde mist, worden defaults gebruikt:

```typescript
const DEFAULTS = {
  version: "1.0",
  features: {
    memory: true,
    docs: true,
    autoUpdate: false,
    context7: true,
  },
  plugins: {
    "opencode-mastery": {
      enabled: true,
      memory: {
        lazyLoading: true,
        compaction: {
          count_based: 80,
          event_based: true,
          time_based: 15,
        },
      },
    },
  },
};
```

## Nieuwe Feature Toevoegen

### Stap 1: Update Config Schema

Voeg de nieuwe feature toe aan `opencode.config.yaml`:

```yaml
features:
  nieuweFeature: false # Default uit

plugins:
  nieuwe-plugin:
    enabled: false
    setting1: "waarde"
    setting2: 42
```

### Stap 2: Update Config Library

Voeg defaults en types toe aan `lib/config.ts`:

```typescript
interface Config {
  features: {
    memory: boolean;
    docs: boolean;
    nieuweFeature: boolean; // NIEUW
  };
  plugins: {
    "opencode-mastery": PluginConfig;
    "nieuwe-plugin": NieuwePluginConfig; // NIEUW
  };
}

interface NieuwePluginConfig {
  enabled: boolean;
  setting1: string;
  setting2: number;
}

// Voeg default toe
const DEFAULTS: Config = {
  features: {
    nieuweFeature: false,
  },
  plugins: {
    "nieuwe-plugin": {
      enabled: false,
      setting1: "default",
      setting2: 42,
    },
  },
};
```

### Stap 3: Gebruik in Plugin/Tool

```typescript
// In je nieuwe tool
import { isFeatureEnabled, getPluginConfig } from "../lib/config";

export const nieuweTool = tool(
  z.object({ input: z.string() }),
  async (args) => {
    // Check of feature enabled is
    if (!isFeatureEnabled("nieuweFeature")) {
      return { success: false, data: { error: "Feature disabled" } };
    }

    // Haal plugin specifieke config
    const pluginConfig = getPluginConfig("nieuwe-plugin");
    if (!pluginConfig.enabled) {
      return { success: false, data: { error: "Plugin disabled" } };
    }

    // Gebruik config waarden
    const result = doSomething(args.input, pluginConfig.setting1);
    return { success: true, data: result };
  },
);
```

## Config Voorbeelden

### Voorbeeld 1: Memory Uitschakelen

```yaml
features:
  memory: false
```

AI zegt dan: _"Memory is disabled in opencode.config.yaml. Wil je het aanzetten?"_

### Voorbeeld 2: Strikte TDD

```yaml
plugins:
  tdd-enforcer:
    enabled: true
    strict: true
    blockWithoutTest: true
```

AI blokkeert dan ALLE code zonder test, geen uitzonderingen.

### Voorbeeld 3: Alleen Lokale Docs

```yaml
features:
  context7: false

plugins:
  opencode-mastery:
    docs:
      sources:
        - local: ~/.ai_docs/opencode/docs
```

AI gebruikt alleen lokale docs, geen Context7 API.

## Belangrijke Regels

1. **Config is Authoriteit** - Altijd config checken voordat functionaliteit uitgevoerd wordt
2. **Graceful Degradation** - Als config ontbreekt, gebruik defaults
3. **User Feedback** - Vertel de gebruiker als een feature disabled is
4. **Documentatie** - Nieuwe features MOETEN in deze doc worden toegevoegd

## Checklist Nieuwe Plugin/Feature

- [ ] Feature toegevoegd aan `opencode.config.yaml`
- [ ] Defaults toegevoegd aan `lib/config.ts`
- [ ] Type definities toegevoegd
- [ ] Tool leest config via `isFeatureEnabled()` of `getPluginConfig()`
- [ ] Graceful handling als feature disabled is
- [ ] Deze documentatie geüpdatet

## Config API Reference

| Functie                         | Beschrijving          | Retourneert       |
| ------------------------------- | --------------------- | ----------------- |
| `loadConfig()`                  | Laad volledige config | `Config` object   |
| `isFeatureEnabled(name)`        | Check feature toggle  | `boolean`         |
| `getFeature(name)`              | Haal feature waarde   | `any`             |
| `getPluginConfig(plugin, key?)` | Haal plugin config    | `object` of `any` |
| `getConfigValue(path)`          | Haal waarde via pad   | `any`             |

## Zie Ook

- `opencode.config.yaml` - De eigenlijke configuratie
- `src/plugin/opencode-mastery/lib/config.ts` - Config library implementatie
- `.memory.md` - Project geheugen (gebruikt config)
