# Svelte MCP (Model Context Protocol)

## Installation

```bash
sv add mcp
```

## Configuration

MCP server runs in the background and provides AI assistance.

```bash
# Start MCP server
npx sv mcp serve

# Or add to package.json scripts
"mcp": "sv mcp serve"
```

## Usage

The MCP server provides:

- **Type checking** - Real-time TypeScript errors
- **Code completion** - AI-powered suggestions
- **Refactoring** - Automated code improvements
- **Documentation** - Inline help and examples

## Setup with Claude Code

1. Install the Svelte MCP server:

```bash
npm install -g @sveltejs/mcp-server
```

2. Configure in your Claude Code settings:

```json
{
  "mcpServers": {
    "svelte": {
      "command": "npx",
      "args": ["@sveltejs/mcp-server"]
    }
  }
}
```

## Commands

```bash
# Start the server
sv mcp serve

# Check status
sv mcp status

# Stop the server
sv mcp stop
```

## Troubleshooting

| Issue               | Solution                                          |
| ------------------- | ------------------------------------------------- |
| Server not starting | Check Node.js version (18+)                       |
| Connection refused  | Ensure no port conflicts (default: 3001)          |
| Not responding      | Restart server with `sv mcp stop && sv mcp serve` |

## References

- https://svelte.dev/docs/mcp
- https://modelcontextprotocol.io/
