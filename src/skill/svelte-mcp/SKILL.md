---
name: svelte-mcp
description: Svelte MCP server - AI-assisted Svelte development with documentation access, svelte-autofixer analysis, and playground links. Use specifically for MCP server features. For Svelte code use svelte skill. For SvelteKit use svelte-kit skill.
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

- references/documentation/local_setup.md - Setup and local configuration
- references/documentation/remote_setup.md - Remote setup
- references/documentation/tools.md - Available MCP tools
- references/documentation/resources.md - Resource usage and integration
- references/documentation/prompts.md - Prompt templates and patterns

## Related Skills

- svelte (core framework)
- svelte-kit (full-stack)
- svelte-cli (project tooling)
