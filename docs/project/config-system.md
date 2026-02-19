# OpenCode Config System

> **Single Source of Truth** for all features, plugins, and tools configuration.

## Overview

The config system uses `opencode.config.yaml` in the project root as the central configuration. **ALL** plugins and tools read their settings from this file via the shared library `src/lib/config`.

## ⚠️ CRITICAL: Shared Standard

**ALL plugins MUST use the shared config library:**

```typescript
// ✅ CORRECT - Use shared library
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";

// ❌ WRONG - Own config implementation
import { loadMyOwnConfig } from "./my-config";
```

This ensures:

- Consistency across all plugins
- No differences or bugs from configuration
- One place to turn everything on/off

## Structure

```
project-root/
├── opencode.config.yaml       # CENTRAL configuration
├── src/
│   ├── lib/
│   │   └── config/            # SHARED config library
│   │       ├── index.ts       # Exports
│   │       ├── loader.ts      # YAML loader
│   │       ├── schema.ts      # Zod schemas
│   │       └── defaults.ts    # Default values
│   │
│   └── plugin/
│       ├── opencode-mastery/  # Uses src/lib/config
│       ├── tdd-enforcer/      # Uses src/lib/config
│       └── debug-assistant/   # Uses src/lib/config
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
    context7: true # Live docs via Context7
    local_fallback: true # Fallback to local cache
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

### Basic Functions

```typescript
import {
  loadConfig,
  getFeatures,
  isFeatureEnabled,
  getFeatureConfig,
  clearConfigCache,
  reloadConfig,
} from "../../lib/config";

// Load full config
const config = loadConfig();

// Get all features
const features = getFeatures();

// Check if feature is enabled
if (isFeatureEnabled("tdd")) {
  // TDD is enabled
}

// Get specific feature config
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

## Implementation in Plugins

### Step 1: Import from Shared Library

```typescript
// src/plugin/my-plugin/index.ts
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";
```

### Step 2: Check Config on Plugin Load

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

### Step 3: Check Config in Tools

```typescript
export const myTool = tool(z.object({ input: z.string() }), async (args) => {
  // Check config first
  if (!isFeatureEnabled("myFeature")) {
    return {
      success: false,
      data: { error: "Feature disabled in opencode.config.yaml" },
    };
  }

  const config = getFeatureConfig("myFeature");
  // Use config values...
});
```

## Adding a New Feature

### Step 1: Update Schema

```typescript
// src/lib/config/schema.ts
export const MyNewFeatureConfigSchema = z.object({
  enabled: z.boolean().default(true),
  option1: z.string().default("value"),
  option2: z.number().default(42),
});

// Add to FeaturesConfigSchema
export const FeaturesConfigSchema = z.object({
  // ... existing features
  myNewFeature: MyNewFeatureConfigSchema.default({}),
});
```

### Step 2: Update Defaults

```typescript
// src/lib/config/defaults.ts
export const DEFAULT_CONFIG: OpenCodeConfig = {
  features: {
    // ... existing features
    myNewFeature: {
      enabled: true,
      option1: "value",
      option2: 42,
    },
  },
};
```

### Step 3: Update Config File

```yaml
# opencode.config.yaml
features:
  myNewFeature:
    enabled: true
    option1: "value"
    option2: 42
```

### Step 4: Use in Plugin

```typescript
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";

// Type safe!
const config = getFeatureConfig("myNewFeature");
```

## Modifying Config

The AI can modify the config when:

1. **User asks to enable/disable a feature**
   - "Turn off memory" → AI edits `opencode.config.yaml`
   - AI reloads config via `reloadConfig()`

2. **New feature is added**
   - AI adds feature to config
   - AI updates schema and defaults

3. **Plugin settings are adjusted**
   - User: "Make TDD less strict"
   - AI: `tdd.block_without_test: false`

## Examples

### Example 1: Disable Feature

```yaml
features:
  tdd:
    enabled: false
```

AI: \_"TDD enforcement is disabled. I won't block writes without tests."

### Example 2: Strict TDD

```yaml
features:
  tdd:
    enabled: true
    block_without_test: true
    verify_red_phase: true
    check_git_order: true
```

AI blocks ALL code without tests and verifies git history.

### Example 3: Offline Mode

```yaml
features:
  docs:
    context7: false # No live docs
    local_fallback: true # Only local cache
```

AI uses only local documentation.

## New Plugin Checklist

- [ ] Schema added to `src/lib/config/schema.ts`
- [ ] Defaults added to `src/lib/config/defaults.ts`
- [ ] Type exported in `src/lib/config/index.ts`
- [ ] Plugin imports from `../../lib/config`
- [ ] Plugin checks `isFeatureEnabled()` on load
- [ ] Tools check config before execution
- [ ] Config file updated with new feature
- [ ] This documentation updated

## Preventing Errors

| Error                      | Consequence       | Solution                           |
| -------------------------- | ----------------- | ---------------------------------- |
| Own config implementation  | Inconsistencies   | Always use `src/lib/config`        |
| Hardcoded defaults in code | Config is ignored | Always read from config            |
| No type safety             | Runtime errors    | Use Zod schemas                    |
| Cache not cleared          | Old values        | Use `reloadConfig()` after changes |
