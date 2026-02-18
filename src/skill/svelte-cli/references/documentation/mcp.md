# Svelte-Cli_Docs - Mcp

**Pages:** 1

---

## mcp

**URL:** llms-txt#mcp

**Contents:**

- Usage
- What you get
- Options
  - ide
  - setup

[Svelte MCP](/docs/mcp/overview) can help your LLM write better Svelte code.

- An MCP configuration for [local](https://svelte.dev/docs/mcp/local-setup) or [remote](https://svelte.dev/docs/mcp/remote-setup) setup
- A [README for agents](https://agents.md/) to help you use the MCP server effectively

The IDE you want to use like `'claude-code'`, `'cursor'`, `'gemini'`, `'opencode'`, `'vscode'`, `'other'`.

The setup you want to use.

**Examples:**

Example 1 (sh):

```sh
npx sv add mcp
```

Example 2 (sh):

```sh
npx sv add mcp="ide:cursor,vscode"
```

Example 3 (sh):

```sh
npx sv add mcp="setup:local"
```

---
