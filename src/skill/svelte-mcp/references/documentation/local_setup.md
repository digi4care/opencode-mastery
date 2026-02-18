# Svelte-Mcp_Docs - Local Setup

**Pages:** 2

---

## Local setup

**URL:** https://svelte.dev/docs/mcp/local-setup

**Contents:**

- Introduction
- Setup
- Capabilities
- Local setup
  - On this page
- Claude Code
- Claude Desktop
- Codex CLI
- Gemini CLI
- OpenCode

The local (or stdio) version of the MCP server is available via the @sveltejs/mcp npm package. You can either install it globally and then reference it in your configuration or run it with npx:

Here’s how to set it up in some common MCP clients:

To include the local MCP version in Claude Code, simply run the following command:

The [scope] must be user, project or local.

In the Settings > Developer section, click on Edit Config. It will open the folder with a claude_desktop_config.json file in it. Edit the file to include the following configuration:

Add the following to your config.toml (which defaults to ~/.codex/config.toml, but refer to the configuration documentation for more advanced setups):

To include the local MCP version in Gemini CLI, simply run the following command:

The [scope] must be user, project or local.

and follow the instructions, selecting ‘Local’ under the ‘Select MCP server type’ prompt:

It will open a file with your MCP servers where you can add the following configuration:

Install the Svelte MCP Server extension.

It will open a popup with MCP server config where you can add the following configuration:

If we didn’t include the MCP client you are using, refer to their documentation for stdio servers and use npx as the command and -y @sveltejs/mcp as the arguments.

Edit this page on GitHub llms.txt

**Examples:**

Example 1 (python):

```python
npx -y @sveltejs/mcp
```

Example 2 (python):

```python
claude mcp add -t stdio -s [scope] svelte -- npx -y @sveltejs/mcp
```

Example 3 (json):

```json
{
  "mcpServers": {
    "svelte": {
      "command": "npx",
      "args": ["-y", "@sveltejs/mcp"]
    }
  }
}
```

Example 4 (json):

```json
[mcp_servers.svelte]
command = "npx"
args = ["-y", "@sveltejs/mcp"]
```

---

##

**URL:** https://svelte.dev/docs/mcp/local-setup/llms.txt

---
