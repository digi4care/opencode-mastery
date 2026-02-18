# Svelte-Mcp_Docs - Remote Setup

**Pages:** 2

---

## Remote setup

**URL:** https://svelte.dev/docs/mcp/remote-setup

**Contents:**

- Introduction
- Setup
- Capabilities
- Remote setup
  - On this page
- Claude Code
- Claude Desktop
- Codex CLI
- Gemini CLI
- OpenCode

The remote version of the MCP server is available at https://mcp.svelte.dev/mcp.

Here’s how to set it up in some common MCP clients:

To include the remote MCP version in Claude Code, simply run the following command:

You can choose your preferred scope (it must be user, project or local) and name.

Add the following to your config.toml (which defaults to ~/.codex/config.toml, but refer to the configuration documentation for more advanced setups):

To use the remote MCP server with Gemini CLI, simply run the following command:

The [scope] must be user or project.

and follow the instructions, selecting ‘Remote’ under the ‘Select MCP server type’ prompt:

It will open a file with your MCP servers where you can add the following configuration:

If we didn’t include the MCP client you are using, refer to their documentation for remote servers and use https://mcp.svelte.dev/mcp as the URL.

Edit this page on GitHub llms.txt

**Examples:**

Example 1 (unknown):

```unknown
claude mcp add -t http -s [scope] svelte https://mcp.svelte.dev/mcp
```

Example 2 (json):

```json
experimental_use_rmcp_client = true
[mcp_servers.svelte]
url = "https://mcp.svelte.dev/mcp"
```

Example 3 (unknown):

```unknown
gemini mcp add -t http -s [scope] svelte https://mcp.svelte.dev/mcp
```

Example 4 (unknown):

```unknown
opencode mcp add
```

---

##

**URL:** https://svelte.dev/docs/mcp/remote-setup/llms.txt

---
