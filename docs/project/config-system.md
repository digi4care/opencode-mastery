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

### Model Resolution

Resolve which model to use for custom agents or features.

#### ⚠️ OpenCode Automatic Fallback

**OpenCode handles model resolution automatically for custom agents:**

> If you don't specify a model, **primary agents** use the model globally configured, while **subagents** will use the model of the primary agent that invoked them.

This means:

- Agent without `model` → Uses OpenCode's active model
- Agent with `model` → Uses specified model

#### Full Pipeline (5 Levels)

For plugin code that needs complete model resolution control:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    MODEL RESOLUTION PIPELINE                        │
├─────────────────────────────────────────────────────────────────────┤
│  1️⃣ CLI Flag         --model or -m                    [HIGHEST]    │
│  2️⃣ Frontmatter      model: in .md file                            │
│  3️⃣ User Override    agent.model in JSON config                    │
│  4️⃣ Inherited        Parent agent model (subagents)                │
│  5️⃣ System Default   OpenCode's active model          [LOWEST]     │
└─────────────────────────────────────────────────────────────────────┘
```

#### When to Use `resolveModel()`

The `resolveModel()` function is useful when:

1. **Plugin TypeScript code** needs explicit model resolution
2. **Complex logic** requires knowing the model source (user override vs system default)
3. **Future-proofing** for more advanced resolution strategies

#### API Reference

##### Simple Resolution (2 levels)

```typescript
import { resolveModel } from "@lib/config";

const model = resolveModel({
  userModel: agentConfig.model, // Optional override
  systemDefault: context.model, // OpenCode's active model
});
```

##### Full Pipeline (5 levels)

```typescript
import {
  resolveModelPipeline,
  resolveModelWithSource,
  buildOptions,
  withCliModel,
  withFrontmatterModel,
} from "@lib/config";

// Full pipeline with all levels
const result = resolveModelPipeline({
  cliModel: process.env.OPENCODE_MODEL, // 1️⃣ CLI flag
  frontmatterModel: parsedFrontmatter.model, // 2️⃣ From .md file
  userModel: agentConfig.model, // 3️⃣ JSON config
  inheritedModel: parentAgent.model, // 4️⃣ From parent
  systemDefault: context.model, // 5️⃣ Global default
});

console.log(`Using ${result.model} (source: ${result.source})`);
// "Using anthropic/claude-sonnet-4 (source: frontmatter)"
```

##### Helper Functions

```typescript
// Build options with optional values (skips undefined)
const options = buildOptions({
  userModel: config.model,
  systemDefault: context.model,
});

// Add CLI model to existing options
const optionsWithCli = withCliModel(options, cliValue);

// Add frontmatter model to existing options
const optionsWithFrontmatter = withFrontmatterModel(options, fmValue);
```

##### Types

```typescript
import type {
  ModelResolutionOptions,
  ModelResolutionResult,
  ModelSource,
} from "@lib/config";

type ModelSource =
  | "cli" // --model flag
  | "frontmatter" // model: in .md file
  | "user-override" // agent.model in JSON
  | "inherited" // Parent agent
  | "system-default"; // OpenCode global
```

#### Frontmatter Parsing

Extract model from markdown files:

```typescript
import { parseFrontmatter, extractModel } from "@lib/config";

// Parse full frontmatter
const frontmatter = parseFrontmatter(markdownContent);
// { model: "anthropic/claude-sonnet-4", description: "...", ... }

// Extract model only (faster)
const model = extractModel(markdownContent);
// "anthropic/claude-sonnet-4" or null
```

#### Use Case - Custom Agents in Plugin Code

```typescript
// In plugin index.ts
import { resolveModel, resolveModelWithSource } from "../../lib/config";

export const Plugin = async (context: PluginContext) => {
  const agents = loadAgentConfigs();

  return {
    agent: agents.map((agent) => ({
      name: agent.name,
      model: resolveModel({
        userModel: agent.model, // From opencode-mastery.json
        systemDefault: context.model, // OpenCode's active model
      }),
      // ... other config
    })),
  };
};
```

#### Use Case - Full Pipeline with Frontmatter

```typescript
import { resolveModelPipeline, parseFrontmatter } from "@lib/config";
import fs from "fs";

// Load agent from markdown file
const agentMd = fs.readFileSync("agents/code-reviewer.md", "utf-8");
const frontmatter = parseFrontmatter(agentMd);

// Resolve model with full pipeline
const result = resolveModelPipeline({
  frontmatterModel: frontmatter.model, // From .md file
  userModel: jsonConfig.agents["code-reviewer"]?.model,
  systemDefault: context.model,
});

if (result) {
  console.log(`Model: ${result.model} via ${result.source}`);
}
```

#### Config Example

```json
{
  "agents": {
    "flow-analyzer": {}, // → OpenCode uses global model automatically
    "gsd-flow-analyzer": {}, // → OpenCode uses global model automatically
    "ace-reflect": {
      "model": "zai-coding-plan/glm-5" // → Uses this specific model
    }
  }
}
```

| Agent               | `model` in Config         | Result                      | Note                        |
| ------------------- | ------------------------- | --------------------------- | --------------------------- |
| `flow-analyzer`     | (not set)                 | → Global model              | OpenCode automatic fallback |
| `gsd-flow-analyzer` | (not set)                 | → Global model              | OpenCode automatic fallback |
| `ace-reflect`       | `"zai-coding-plan/glm-5"` | → `"zai-coding-plan/glm-5"` | Explicit override           |

#### Priority Matrix

| Source         | Priority | Example                             | Use Case                   |
| -------------- | -------- | ----------------------------------- | -------------------------- |
| CLI flag       | 1️⃣       | `--model anthropic/claude-sonnet-4` | Temporary override         |
| Frontmatter    | 2️⃣       | `model: openai/gpt-4` in agent.md   | Per-agent default          |
| JSON config    | 3️⃣       | `{ "agent": { "model": "..." } }`   | Config-based override      |
| Inherited      | 4️⃣       | Subagent inherits from primary      | Subagent model consistency |
| System default | 5️⃣       | OpenCode's active model             | Fallback                   |

> **Note:** You don't need to use `resolveModel()` in your config file. OpenCode handles this automatically. The function is for plugin TypeScript code.

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
