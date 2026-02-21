---
description: Search project memory for relevant information
agent: build
---

Use `$ARGUMENTS` as the search input for `/recall`.

1. Parse the query text from `$ARGUMENTS`.
2. Parse optional flags from `$ARGUMENTS`:
   - `--max <n>`: maximum results (default `10`)
   - `--min-score <0-1>`: minimum relevance threshold (default `0.35`)
   - `--source <memory|sessions|all>`: source filter (default `all`)
3. Call the `memory_search` tool with:
   - `query`
   - `maxResults`
   - `minScore`
   - `source`

Format each result as:

`<citation> (<score>): "<preview>"`

Rules:

- Citation must use `path#Lstart-Lend` format from the result citation.
- Score must be shown with exactly 2 decimals.
- Preview must be truncated to 80 characters and append `...` when truncated.

Example output:

`MEMORY.md#L45-L52 (0.87): "User prefers dark mode in all interfaces, especially..."`
`MEMORY.md#L78-L85 (0.72): "Dark mode implementation uses CSS variables..."`

If no results are found, return a friendly message and include tips:

- Try broader terms
- Lower `--min-score`
- Increase `--max`
- Use `--source all` to search everywhere
