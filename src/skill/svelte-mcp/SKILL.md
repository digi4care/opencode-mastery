---
name: svelte-mcp
description: Use when working with the Svelte MCP server for AI-assisted Svelte development. Provides documentation access, code analysis via svelte-autofixer, and playground link generation.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://svelte.dev/docs/mcp
---

# Svelte MCP Server

AI-assisted Svelte development through Model Context Protocol.

## When to Use

- Building Svelte/SvelteKit applications
- Getting documentation help
- Code analysis and fixing
- Generating playground links
- Working with MCP-enabled editors

## Quick Reference

### Available Tools

The MCP server provides tools for:

- Document lookups
- Code analysis
- Playground generation

### Configuration

```json
{
  "mcpServers": {
    "svelte": {
      "command": "npx",
      "args": ["-y", "@sveltejs/mcp-server"]
    }
  }
}
```

## References

- references/installation.md - Setup and configuration
- references/tools.md - Available MCP tools
- references/playground.md - Playground integration
- references/troubleshooting.md - Common issues

## Related Skills

- svelte (core framework)
- svelte-kit (full-stack)
- svelte-cli (project tooling)
