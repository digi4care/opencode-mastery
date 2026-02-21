# Plugin Tool SDK Contracts

## 1. Plugin Boundary

Proposed plugin module:

`src/plugin/gsd-validation-runtime/`

Responsibilities:

- expose deterministic runtime tools for orchestration
- enforce safety constraints on process lifecycle actions
- return stable machine-readable `ToolResult`

Non-responsibilities:

- policy decisions (HITL rules, severity interpretation)
- command-level UX wording

## 2. Tool Result Contract

All tools return:

```ts
type ToolResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    durationMs?: number;
    runId?: string;
    warnings?: string[];
  };
};
```

## 3. Tool Specifications

### 3.1 `gsd_run_create`

Purpose: initialize run workspace and metadata.

Input:

- `phase: string`
- `mode: "quick" | "full"`
- `projectRoot: string`

Output data:

- `runId: string`
- `runDir: string`
- `createdAt: string`

Rules:

- idempotent when called with same external `requestedRunId`
- create `.tmp/gsd-runs/<runId>/run.json`

### 3.2 `gsd_server_start`

Purpose: start one server process and register ownership.

Input:

- `runId: string`
- `name: string`
- `command: string`
- `cwd: string`
- `env?: Record<string,string>`
- `port?: number`
- `readiness?: { type: "http" | "tcp" | "log"; target: string; timeoutMs: number }`

Output data:

- `pid: number`
- `pgid?: number`
- `logPath: string`
- `ownershipHash: string`

Rules:

- append process record to `processes.json`
- stream stdout/stderr to run log file

### 3.3 `gsd_server_wait_ready`

Purpose: validate server readiness.

Input:

- `runId: string`
- `name: string`
- `timeoutMs: number`

Output data:

- `ready: boolean`
- `checkedAt: string`
- `probeEvidence: string[]`

Rules:

- supports `http`, `tcp`, and `log` readiness modes
- returns `success=false` on timeout

### 3.4 `gsd_playwright_execute`

Purpose: run browser flow tests with observability artifacts.

Input:

- `runId: string`
- `phase: string`
- `baseUrl: string`
- `scenarioSource: string` (path to generated flow/scenario file)
- `visual: boolean`
- `trace: boolean`

Output data:

- `summary: { passed: number; failed: number; skipped: number }`
- `artifactDir: string`
- `consolePath: string`
- `networkPath: string`

Rules:

- store traces/videos/screenshots under run artifact directory
- capture browser console and network failures as structured json

### 3.5 `gsd_logs_collect`

Purpose: aggregate runtime logs and extract high-signal issues.

Input:

- `runId: string`
- `sources: string[]` (server names and artifact paths)
- `patterns?: string[]` (default error patterns)

Output data:

- `issues: Array<{source:string; severity:string; message:string; evidence:string}>`
- `logIndexPath: string`

### 3.6 `gsd_server_stop_owned`

Purpose: stop only run-owned processes.

Input:

- `runId: string`
- `graceMs?: number`

Output data:

- `stopped: number[]`
- `skipped: Array<{pid:number; reason:string}>`

Safety rules:

- verify ownership hash and cwd/cmd match before signal
- escalate `SIGTERM` -> `SIGKILL` only for validated owned processes
- never stop unowned or unverifiable processes

### 3.7 `gsd_run_finalize`

Purpose: compile final run outputs.

Input:

- `runId: string`
- `status: "passed" | "failed" | "blocked"`
- `summary: string`

Output data:

- `finalMarkdownPath: string`
- `finalJsonPath: string`

Rules:

- emits final report files even on partial failure

## 4. Error Taxonomy

- `CONFIG_ERROR`: invalid or missing configuration
- `STARTUP_ERROR`: server failed to launch
- `READINESS_TIMEOUT`: server not ready before timeout
- `TEST_FAILURE`: Playwright scenario assertion failures
- `OBSERVABILITY_ERROR`: log/trace artifact creation failed
- `OWNERSHIP_VALIDATION_ERROR`: stop action rejected for safety
- `INTERNAL_ERROR`: unexpected runtime exception

## 5. Security and Safety Checklist

- Validate all paths remain under project root or run directory
- Redact secrets from logs and report output
- Require explicit force flags for potentially destructive behavior
- Keep each tool deterministic and bounded with timeouts
