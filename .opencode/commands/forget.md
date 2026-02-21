---
description: Remove entry from project memory
agent: build
---

Use `$ARGUMENTS` as input for `/forget`.

Parse from `$ARGUMENTS`:

- Search query (required)
- Optional `--force` flag

Follow this workflow exactly.

## Step 1 - Search for candidates

Call the `memory_search` tool with the parsed query to find matching entries.

## Step 2 - Display candidates

Show a numbered list in this format:

Found 3 matches:

1. MEMORY.md#L45-L52 (0.87): "User prefers dark mode in all interfaces..."
2. MEMORY.md#L78-L85 (0.72): "Dark mode implementation uses CSS variables..."
3. .memory/daily/2024-01-15.md#L12-L18 (0.65): "Switched to dark theme..."

Which entry should be deleted? (1-3, or 'cancel')

## Step 3 - Confirmation behavior

- If `--force` is present: skip interactive confirmation and delete the best match (highest score).
- Without `--force`: ask the user to confirm by selecting an index number.
- If the user replies `cancel`: abort safely with a friendly confirmation that nothing was deleted.

## Step 4 - Execute deletion

Delete only the selected memory entry from its file while preserving surrounding content.
Never delete an entire file.

## Step 5 - Final confirmation

Respond with a short success message:

`✓ Removed entry from MEMORY.md#L45-L52`

Safety rules:

- Always require confirmation unless `--force` is explicitly provided.
- Handle no matches gracefully with guidance to refine the query.
- If deletion cannot be completed, report the reason and do not perform partial destructive changes.
