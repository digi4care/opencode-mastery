# OpenCode Config System

> **Single Source of Truth** voor alle features, plugins, en tools configuratie.

## Overzicht

Het config systeem gebruikt `opencode.config.yaml` in de project root als centrale configuratie. **ALLE** plugins en tools lezen hun instellingen uit dit bestand via de gedeelde library `src/lib/config`.

## ⚠️ KRITIEK: Gedeelde Standaard

**ALLE plugins MOETEN de gedeelde config library gebruiken:**

```typescript
// ✅ CORRECT - Gebruik gedeelde library
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";

// ❌ FOUT - Eigen config implementatie
import { loadMyOwnConfig } from "./my-config";
```

Dit zorgt voor:
- Consistentie tussen alle plugins
- Geen verschillen of bugs door configuratie
- Eén plek om alles aan/uit te zetten

## Structuur

```
project-root/
├── opencode.config.yaml       # CENTRALE configuratie
├── src/
│   ├── lib/
│   │   └── config/            # GEDEELDE config library
│   │       ├── index.ts       # Exports
│   │       ├── loader.ts      # YAML loader
│   │       ├── schema.ts      # Zod schema's
│   │       └── defaults.ts    # Default waarden
│   │
│   └── plugin/
│       ├── opencode-mastery/  # Gebruikt src/lib/config
│       ├── tdd-enforcer/      # Gebruikt src/lib/config
│       └── debug-assistant/   # Gebruikt src/lib/config
```

## Config Schema

```yaml
# opencode.config.yaml
version: "1.0"

project:
  name: my-project
  description: Project description
  version: "1.0.0"

features:
  # Memory - Persistent project memory
  memory:
    enabled: true
    lazyLoading: true
    compaction:
      enabled: true
      max_size_kb: 50
      keep_entries: 10

  # Docs - OpenCode documentation access
  docs:
    enabled: true
    context7: true           # Live docs via Context7
    local_fallback: true     # Fallback to local cache
    cache_ttl_days: 7
    auto_download: false

  # TDD - Test-Driven Development enforcement
  tdd:
    enabled: true
    enforce_on_write: true
    block_without_test: true
    verify_red_phase: true
    check_git_order: false

  # Debugging - Systematic debugging assistant
  debugging:
    enabled: true
    auto_start_on_error: true
    max_fix_attempts: 3
    track_phases: true
    require_test_before_fix: true

  # Playwright - Browser automation
  playwright:
    enabled: true
    headless: false
    screenshots: true
    video: false
    trace: false
    default_timeout: 30000
```

## API Reference

### Basis Functies

```typescript
import {
  loadConfig,
  getFeatures,
  isFeatureEnabled,
  getFeatureConfig,
  clearConfigCache,
  reloadConfig,
} from "../../lib/config";

// Laad volledige config
const config = loadConfig();

// Haal alle features
const features = getFeatures();

// Check of feature enabled is
if (isFeatureEnabled("tdd")) {
  // TDD is enabled
}

// Haal specifieke feature config
const tddConfig = getFeatureConfig("tdd");
if (tddConfig.block_without_test) {
  // Block writes without tests
}
```

### Types

```typescript
import type {
  OpenCodeConfig,
  FeaturesConfig,
  MemoryConfig,
  DocsConfig,
  TDDConfig,
  DebugConfig,
  PlaywrightConfig,
} from "../../lib/config";
```

## Implementatie in Plugins

### Stap 1: Importeer van Gedeelde Library

```typescript
// src/plugin/my-plugin/index.ts
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";
```

### Stap 2: Check Config bij Plugin Load

```typescript
export const Plugin = async (context: PluginContext) => {
  // Check if feature is enabled
  if (!isFeatureEnabled("myFeature")) {
    console.log("My feature is disabled in config");
    return { tool: [] };
  }

  const config = getFeatureConfig("myFeature");
  
  return {
    tool: [myTool],
    // Use config values...
  };
};
```

### Stap 3: Check Config in Tools

```typescript
export const myTool = tool(
  z.object({ input: z.string() }),
  async (args) => {
    // Check config first
    if (!isFeatureEnabled("myFeature")) {
      return {
        success: false,
        data: { error: "Feature disabled in opencode.config.yaml" },
      };
    }

    const config = getFeatureConfig("myFeature");
    // Use config values...
  }
);
```

## Nieuwe Feature Toevoegen

### Stap 1: Update Schema

```typescript
// src/lib/config/schema.ts
export const MyNewFeatureConfigSchema = z.object({
  enabled: z.boolean().default(true),
  option1: z.string().default("value"),
  option2: z.number().default(42),
});

// Voeg toe aan FeaturesConfigSchema
export const FeaturesConfigSchema = z.object({
  // ... bestaande features
  myNewFeature: MyNewFeatureConfigSchema.default({}),
});
```

### Stap 2: Update Defaults

```typescript
// src/lib/config/defaults.ts
export const DEFAULT_CONFIG: OpenCodeConfig = {
  features: {
    // ... bestaande features
    myNewFeature: {
      enabled: true,
      option1: "value",
      option2: 42,
    },
  },
};
```

### Stap 3: Update Config File

```yaml
# opencode.config.yaml
features:
  myNewFeature:
    enabled: true
    option1: "value"
    option2: 42
```

### Stap 4: Gebruik in Plugin

```typescript
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";

// Type safe!
const config = getFeatureConfig("myNewFeature");
```

## Config Wijzigen

De AI kan de config wijzigen wanneer:

1. **Gebruiker vraagt om feature aan/uit te zetten**
   - "Zet memory uit" → AI edit `opencode.config.yaml`
   - AI herlaadt config via `reloadConfig()`

2. **Nieuwe feature toegevoegd wordt**
   - AI voegt feature toe aan config
   - AI update schema en defaults

3. **Plugin instelling aangepast wordt**
   - Gebruiker: "Maak TDD minder strikt"
   - AI: `tdd.block_without_test: false`

## Voorbeelden

### Voorbeeld 1: Feature Uitschakelen

```yaml
features:
  tdd:
    enabled: false
```

AI: _"TDD enforcement is disabled. I won't block writes without tests."_

### Voorbeeld 2: Strikte TDD

```yaml
features:
  tdd:
    enabled: true
    block_without_test: true
    verify_red_phase: true
    check_git_order: true
```

AI blokkeert ALLE code zonder test en verifieert git geschiedenis.

### Voorbeeld 3: Offline Mode

```yaml
features:
  docs:
    context7: false        # Geen live docs
    local_fallback: true   # Alleen lokale cache
```

AI gebruikt alleen lokale documentatie.

## Checklist Nieuwe Plugin

- [ ] Schema toegevoegd aan `src/lib/config/schema.ts`
- [ ] Defaults toegevoegd aan `src/lib/config/defaults.ts`
- [ ] Type geëxporteerd in `src/lib/config/index.ts`
- [ ] Plugin importeert van `../../lib/config`
- [ ] Plugin checkt `isFeatureEnabled()` bij load
- [ ] Tools checken config voor uitvoering
- [ ] Config file geüpdatet met nieuwe feature
- [ ] Deze documentatie geüpdatet

## Fouten Voorkomen

| Fout | Gevolg | Oplossing |
|------|--------|-----------|
| Eigen config implementatie | Inconsistenties | Gebruik altijd `src/lib/config` |
| Harde defaults in code | Config wordt genegeerd | Lees altijd uit config |
| Geen type safety | Runtime errors | Gebruik Zod schema's |
| Cache niet cleared | Oude waarden | Gebruik `reloadConfig()` na wijziging |
