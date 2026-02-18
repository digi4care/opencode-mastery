---
name: svelte-mcp
description: Use this skill when working with the Svelte MCP (Model Context Protocol) server for AI-assisted Svelte/SvelteKit development. It provides documentation access, code analysis via svelte-autofixer, and playground link generation.
---

# Svelte MCP Server v2.0

The Svelte MCP (Model Context Protocol) server helps LLMs and AI agents write better Svelte code. It provides real-time documentation access, static code analysis with svelte-autofixer, and playground link generation.

## 📋 Quick Summary

| Tool | Purpose |
|------|---------|
| **list-sections** | Discover available documentation sections |
| **get-documentation** | Fetch full documentation content |
| **svelte-autofixer** | Analyze code and return issues/suggestions |
| **playground-link** | Generate Svelte Playground links |

**Setup:** `claude mcp add -t stdio -s user svelte -- npx -y @sveltejs/mcp`

## 📑 Table of Contents

1. [Sources](#📚-sources)
2. [When to Use This Skill](#💡-when-to-use-this-skill)
3. [Quick Reference](#🚀-quick-reference)
4. [Reference Documentation](#📖-reference-documentation)
5. [Working with This Skill](#🎯-working-with-this-skill)
6. [Key Concepts](#🔑-key-concepts)
7. [Known Issues](#🐛-known-issues--limitations)
8. [Best Practices](#🎓-best-practices)

---

## 📚 Sources

This skill combines knowledge from multiple sources:

- ✅ **Documentation**: https://svelte.dev/docs/mcp
  - Pages: 200
  - Official Svelte MCP documentation with setup guides, tools, prompts, and resources
- ✅ **GitHub Repository**: sveltejs/mcp
  - Code Analysis: deep
  - Issues: 150
  - Implementation details, recent issues, and release history

## 💡 When to Use This Skill

**Use this skill when you need to:**

1. **Set up the Svelte MCP server** in Claude Code, Claude Desktop, Codex CLI, Gemini CLI, or OpenCode
2. **Integrate MCP tools** into AI agent workflows (list-sections, get-documentation, svelte-autofixer, playground-link)
3. **Configure AI agents** to use Svelte MCP tools effectively (AGENTS.md, CLAUDE.md, GEMINI.md)
4. **Analyze Svelte code** for best practices and Svelte 5 patterns (runes, $state, $effect, etc.)
5. **Generate playground links** for quick Svelte code testing
6. **Access Svelte/SvelteKit documentation** programmatically via MCP resources
7. **Troubleshoot MCP setup issues** or understand known limitations
8. **Stay updated** on recent MCP features and releases (e.g., tools as JS API, autofixer improvements)

**Specific triggers:**

- Setting up MCP integration for Svelte projects
- Writing AI prompts that use Svelte MCP tools
- Analyzing Svelte 5 code for migration or best practices
- Creating reproducible Svelte examples with playground links
- Building custom AI agents that work with Svelte

## 🚀 Quick Reference

### 1. Local MCP Setup (Claude Code)

Add the Svelte MCP server using npx:

```bash
claude mcp add -t stdio -s [scope] svelte -- npx -y @sveltejs/mcp
```

**Scope**: Must be `user`, `project`, or `local`

### 2. Remote MCP Setup (Claude Code)

Add the remote Svelte MCP server:

```bash
claude mcp add -t http -s [scope] svelte https://mcp.svelte.dev/mcp
```

### 3. Claude Desktop Configuration

Edit `claude_desktop_config.json` (Settings > Developer > Edit Config):

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

### 4. Codex CLI Configuration

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.svelte]
command = "npx"
args = ["-y", "@sveltejs/mcp"]
```

For remote server:

```toml
experimental_use_rmcp_client = true
[mcp_servers.svelte]
url = "https://mcp.svelte.dev/mcp"
```

### 5. Recommended Agent Prompt (AGENTS.md)

Include this in your AGENTS.md, CLAUDE.md, or GEMINI.md to instruct the AI on how to use MCP tools:

```markdown
You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
```

### 6. Using npx sv add mcp

The easiest way to set up MCP in a SvelteKit project:

```bash
npx sv add mcp
```

This automatically configures AGENTS.md/CLAUDE.md/GEMINI.md for you.

### 7. MCP Tools Workflow Example

```markdown
**Step 1**: Call `list-sections` to discover available docs
**Step 2**: Analyze use_cases field to find relevant sections
**Step 3**: Call `get-documentation` with relevant section paths
**Step 4**: Write Svelte code using retrieved documentation
**Step 5**: Call `svelte-autofixer` to validate code (iterate until clean)
**Step 6**: Ask user if they want a `playground-link` (only if not in project files)
```

### 8. MCP Resource for Specific Docs

Include specific Svelte docs directly as a resource (URI pattern):

```
svelte://slug-of-the-docs.md
```

Example: `svelte://kit-routing.md` returns the llms.txt version of the routing documentation.

### 9. Dev Setup for MCP Development

If contributing to or extending the MCP server:

```bash
pnpm i
cp apps/mcp-remote/.env.example apps/mcp-remote/.env
pnpm dev
```

Set `VOYAGE_API_KEY` for embeddings support.

### 10. MCP Inspector for Local Testing

```bash
pnpm run inspect
# Visit http://localhost:6274/
# Transport type: Streamable HTTP
# URL: http://localhost:5173/mcp
```

## 📖 Reference Documentation

### Documentation Files

- **[overview.md](references/documentation/overview.md)** - Introduction to Svelte MCP, what it does, and how it helps LLMs write better Svelte code
- **[local_setup.md](references/documentation/local_setup.md)** - Setup instructions for local (stdio) MCP server via npm package (Claude Code, Claude Desktop, Codex CLI, Gemini CLI, OpenCode)
- **[remote_setup.md](references/documentation/remote_setup.md)** - Setup instructions for remote MCP server at https://mcp.svelte.dev/mcp
- **[tools.md](references/documentation/tools.md)** - Detailed description of all 4 MCP tools: list-sections, get-documentation, svelte-autofixer, playground-link
- **[prompts.md](references/documentation/prompts.md)** - Available prompts (svelte-task) for instructing LLMs on best practices
- **[resources.md](references/documentation/resources.md)** - doc-section resource for including specific documentation pages in sessions

### GitHub Files

- **[README.md](references/github/README.md)** - Repository README with dev setup instructions (pnpm i, .env setup, pnpm dev)
- **[issues.md](references/github/issues.md)** - 24 recent GitHub issues including feature requests (autofixer enhancements, local version, registries) and bugs (NodeJS 25.1.0 compatibility, timeout errors)
- **[releases.md](references/github/releases.md)** - Release history from v0.1.7 to v0.1.16 (latest: tools exposed as JS API + CLI, prompt improvements, autofixer async parameter)

## 🎯 Working with This Skill

### For Beginners

**Start here:**

1. Read **overview.md** to understand what Svelte MCP does
2. Follow **local_setup.md** or **remote_setup.md** based on your preference (local is recommended for most users)
3. Copy the agent prompt from overview.md to your AGENTS.md/CLAUDE.md file
4. Test with a simple Svelte component to verify the MCP tools work

**Common first tasks:**

- Setting up MCP in Claude Code (`claude mcp add -t stdio -s user svelte -- npx -y @sveltejs/mcp`)
- Understanding the 4 MCP tools (list-sections, get-documentation, svelte-autofixer, playground-link)
- Configuring AI agents to use MCP tools effectively

### For Intermediate Users

**Focus on:**

1. **tools.md** - Deep dive into each MCP tool's capabilities
2. **prompts.md** - Learn about the svelte-task prompt for optimal LLM instructions
3. **resources.md** - Use doc-section resources to include specific docs in sessions
4. **issues.md** - Check for known issues and workarounds (timeout errors, NodeJS compatibility)

**Common tasks:**

- Creating custom agent prompts that leverage all 4 MCP tools
- Using svelte-autofixer in an iterative loop until code is clean
- Generating playground links for code examples and debugging
- Including specific Svelte docs as resources (svelte://slug.md)

### For Advanced Users

**Explore:**

1. **README.md** - Dev setup for contributing to or extending the MCP server
2. **releases.md** - Latest features (v0.1.16: tools as JS API + CLI, v0.1.14: prompt token optimization)
3. **issues.md** - Feature requests (autofixer improvements, Sveltest integration, file path support)
4. MCP Inspector and Database Inspector for local development

**Advanced use cases:**

- Building custom tools that use the JS API exposed in v0.1.16
- Contributing autofixer rules for Svelte 5 patterns
- Creating fully local/corporate-friendly MCP setups (Issue #82)
- Integrating MCP with testing frameworks like Sveltest (Issue #103)

## 🔑 Key Concepts

### Model Context Protocol (MCP)

MCP is a standard for connecting LLMs to external tools and data sources. The Svelte MCP server implements this protocol to provide:

- **Tools**: Functions the LLM can call (list-sections, get-documentation, svelte-autofixer, playground-link)
- **Resources**: Static content the user can include (doc-section URIs)
- **Prompts**: Reusable instructions for LLMs (svelte-task)

### Local vs Remote MCP

**Local (stdio)**:

- Runs via `npx -y @sveltejs/mcp` on your machine
- Better for offline/corporate environments
- Requires Node.js installed
- Recommended for most users

**Remote (HTTP)**:

- Hosted at https://mcp.svelte.dev/mcp
- No local installation needed
- Requires internet connection
- Note: SSE channel shuts down immediately on Vercel (no `server.log` or `list-changed` notifications)

### Svelte-Autofixer

Static analysis tool that checks Svelte code for:

- Svelte 5 best practices (runes, $state, $effect)
- Common mistakes (accessing stateful variables with `$`, JS variables in CSS)
- Deprecated patterns ($app/store → $app/state)
- Snippets declared in script tags

**Usage pattern**: Call iteratively until no issues/suggestions remain.

### Playground Link

Generates ephemeral Svelte Playground links with code embedded in the URL:

- Code is NOT stored server-side (only in URL)
- URLs can be very large for complex code
- Only use for code NOT written to project files
- Useful for quick testing and sharing examples

### svelte-task Prompt

Pre-written prompt that instructs LLMs on:

- Which documentation sections are available
- When to invoke each tool
- How to interpret tool results
- Best practices for using the MCP server

Recommended for all Svelte MCP users.

## 🐛 Known Issues & Limitations

### Current Issues (from GitHub)

1. **Timeout Errors (Issue #87)**: MCP crashes a few seconds after startup with TimeoutError
   - Related to Vercel's SSE channel shutdown
   - Workaround: Use local MCP server instead of remote

2. **NodeJS 25.1.0 Compatibility (Issue #109)**: `npx -y @sveltejs/mcp` fails on NodeJS 25.1.0
   - Status: Closed (fixed in recent releases)

3. **AGENTS.md Redundancy (Issue #46)**: In Cursor, AGENTS.md duplicates context
   - Status: Closed
   - Use MCP client's native prompt system when available

### Feature Requests

- **Corporate-Friendly Local Version (Issue #82)**: Fully local MCP without remote dependencies
- **Sveltest Integration (Issue #103)**: Add Sveltest testing framework support
- **Autofixer File Path (Issue #115)**: Include file path in autofixer output
- **Multiple Registries (Issue #42)**: Publish to various MCP registries

## 📦 Recent Updates

### v0.1.16 (2025-12-21)

- **NEW**: Tools exposed as JS API + CLI
- Use MCP tools programmatically outside of MCP clients

### v0.1.14 (2025-12-17)

- Improved prompt to reduce token usage
- Better efficiency for documentation retrieval

### v0.1.11 (2025-10-25)

- Added `async` parameter to svelte-autofixer
- Support for `$state.eager`

### v0.1.9 (2025-10-22)

- `mcp-ui` resource returned from playground-link
- Suggestion against JS variables in CSS

## 🎓 Best Practices

1. **Always call list-sections first** when starting a Svelte task to discover relevant docs
2. **Use svelte-autofixer iteratively** - keep calling until no issues remain
3. **Only generate playground links** when user confirms (never for project files)
4. **Include the agent prompt** in AGENTS.md/CLAUDE.md for optimal LLM behavior
5. **Use local MCP for reliability** - remote version has timeout issues on Vercel
6. **Check recent issues** before troubleshooting - common problems may have known workarounds
7. **Keep the package updated** - `npx -y` always fetches latest version

## 🔗 Useful Links

- **Official Documentation**: https://svelte.dev/docs/mcp
- **GitHub Repository**: https://github.com/sveltejs/mcp
- **Remote MCP Server**: https://mcp.svelte.dev/mcp
- **MCP Registry**: (in progress - Issue #42)
- **Svelte Playground**: https://svelte.dev/playground (for playground-link outputs)

---

_Generated by Skill Seeker's unified multi-source scraper_
_Enhanced with practical examples and comprehensive guidance_
