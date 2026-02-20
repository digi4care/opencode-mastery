# GSD Validation Workflow - Developer Guide

This guide explains how to extend, debug, and improve the GSD validation workflow.

## Overview

The GSD validation workflow provides automated phase validation with:

- **Verify work** - Run `/gsd-verify-work`
- **Flow analysis** - Run `/gsd-analyze-flow`
- **HITL gap gate** - Pause when gaps are found
- **Runtime validation** - Server + Playwright + logs
- **Safe teardown** - Only kill owned processes

## Architecture

```
/gsd-auto-validate
  → gsd-validation skill (workflow orchestration)
  → gsd-validation-runtime plugin (tools)
```

## Adding a New Tool

### 1. Define the Tool Contract

Add tool definition in `src/plugin/gsd-validation-runtime/tools/<tool-name>.ts`:

```typescript
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const myTool = tool(
  z.object({
    runId: z.string(),
    // ... other inputs
  }),
  async (args) => {
    // Implementation
    return {
      success: true,
      data: {
        /* result */
      },
      metadata: { durationMs: Date.now() - start },
    };
  },
).describe("Tool description");
```

### 2. Register in Plugin Index

Add to `src/plugin/gsd-validation-runtime/index.ts`:

```typescript
import { myTool } from "./tools/<tool-name>";

export default async function plugin() {
  return {
    tool: [
      ["my-tool", myTool],
      // ...
    ],
  };
}
```

### 3. Wire in Install/Deploy

Add plugin name to:

- `scripts/deploy.ts` - PLUGINS array
- `install.sh` - PLUGINS array
- `uninstall.sh` - PLUGINS array

## Common Issues and Solutions

### Tool fails with "Run not found"

The tool requires an active run. Ensure the workflow calls `gsd-run-create` first.

### Server won't start

Check:

- Command exists and is valid
- Working directory is correct
- Port is available

### Process won't stop

This is **intentional** - the tool validates ownership before killing. Check:

- Process is tracked in `processes.json`
- Ownership hash matches
- CWD/cmd still valid

### Playwright tests fail

- Check `baseUrl` is correct
- Ensure servers are ready (call `gsd-server-wait-ready`)
- Review artifacts in `.tmp/gsd-runs/<run-id>/playwright/`

## Debugging Tips

### Enable verbose logging

Most tools return metadata with warnings. Check the `metadata.warnings` field.

### Inspect run state

```bash
cat .tmp/gsd-runs/<run-id>/run.json
cat .tmp/gsd-runs/<run-id>/processes.json
```

### Check server logs

```bash
cat .tmp/gsd-runs/<run-id>/servers/<name>.log
```

### Manual tool invocation

Tools can be called directly via the OpenCode tool interface:

```
gsd-run-create phase=my-phase mode=full
gsd-server-start runId=xxx name=api command="npm run dev" cwd=.
gsd-server-wait-ready runId=xxx name=api
```

## Phases Implementation Status

| Phase | Status      | Description                                              |
| ----- | ----------- | -------------------------------------------------------- |
| A     | ✅ Complete | Scaffolding, commands, skill, plugin structure           |
| B     | ✅ Complete | Run lifecycle, process ownership, server start/wait/stop |
| C     | ✅ Complete | Playwright execution, log collection                     |
| D     | ✅ Complete | Orchestration, HITL gates                                |
| E     | 🔄 To do    | Hardening, retries, metrics                              |

### What Each Phase Needs

**Phase E - Hardening:**

- Add retry policies for flaky operations
- Add timeout tuning configuration
- Add failure injection tests
- Add operational runbook

## Configuration

Edit `opencode.config.yaml`:

```yaml
features:
  gsdValidation:
    enabled: true
    default_mode: full # quick | full
    require_gap_gate: true # enforce human gate
    readiness_timeout_ms: 30000 # server readiness timeout
```

## Related Documentation

- [ARCHITECTURE.md](../plans/gsd-ultimate-validation-workflow/ARCHITECTURE.md)
- [TOOL-SDK-CONTRACTS.md](../plans/gsd-ultimate-validation-workflow/TOOL-SDK-CONTRACTS.md)
- [IMPLEMENTATION-ROADMAP.md](../plans/gsd-ultimate-validation-workflow/IMPLEMENTATION-ROADMAP.md)
