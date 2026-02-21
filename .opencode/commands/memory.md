---
description: Manage project memory (status, sync, compact, enable, disable)
agent: build
---

# /memory

Use verb-based subcommands from `$1` and extra flags from `$ARGUMENTS`.

## Subcommands

- `status`
  - Call `memory_status`.
  - If `--json` is present in `$ARGUMENTS`, return raw tool output only.
  - Otherwise render this table style with status icons:

    ```
    ┌─────────────┬──────────────┐
    │ Property    │ Value        │
    ├─────────────┼──────────────┤
    │ Enabled     │ ✓ Yes        │
    │ Exists      │ ✓ Yes        │
    │ Size        │ 12 KB        │
    │ Entries     │ 23           │
    │ Compaction  │ ✗ Not needed │
    └─────────────┴──────────────┘
    ```

- `sync`
  - Call `memory_sync`.
  - Default output: `✓ Synced X files, Y chunks`.
  - If `--verbose` is present, include full details from the tool response.

- `compact`
  - Attempt `memory_compact`.
  - If available, show brief success/failure confirmation.
  - If unavailable, respond: `Memory compaction is not yet implemented in this environment.`

- `enable`
  - Enable memory via config update.
  - Confirm with: `✓ Memory enabled for this project`.

- `disable`
  - Disable memory via config update.
  - Confirm with: `✓ Memory disabled for this project`.

## Routing Rules

1. Parse `$1` as the verb.
2. Treat unknown or missing verbs as help requests.
3. Keep errors friendly and actionable, matching memory tool style.
4. Suggest valid verbs when input is invalid: `status`, `sync`, `compact`, `enable`, `disable`.

## Arguments

- Verb: `$1`
- Extra flags/options: `$ARGUMENTS`
