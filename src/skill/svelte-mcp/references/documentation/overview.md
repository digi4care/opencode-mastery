# Svelte-Mcp_Docs - Overview

**Pages:** 3

---

## Overview

**URL:** https://svelte.dev/docs/mcp

**Contents:**

- Introduction
- Setup
- Capabilities
- Overview
  - On this page
- Setup
- Usage

The Svelte MCP (Model Context Protocol) server can help your LLM or agent of choice write better Svelte code. It works by providing documentation relevant to the task at hand, and statically analysing generated code so that it can suggest fixes and best practices.

The setup varies based on the version of the MCP you prefer — remote or local — and your chosen MCP client (e.g. Claude Code, Codex CLI or GitHub Copilot):

To get the most out of the MCP server we recommend including the following prompt in your AGENTS.md (or CLAUDE.md, if using Claude Code. Or GEMINI.md, if using GEMINI). This will tell the LLM which tools are available and when it’s appropriate to use them.

This is already setup for you when using npx sv add mcp

If your MCP client supports it, we also recommend using the svelte-task prompt to instruct the LLM on the best way to use the MCP server.

Edit this page on GitHub llms.txt

**Examples:**

Example 1 (markdown):

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

---

## Overview

**URL:** https://svelte.dev/docs/mcp/overview

**Contents:**

- Introduction
- Setup
- Capabilities
- Overview
  - On this page
- Setup
- Usage

The Svelte MCP (Model Context Protocol) server can help your LLM or agent of choice write better Svelte code. It works by providing documentation relevant to the task at hand, and statically analysing generated code so that it can suggest fixes and best practices.

The setup varies based on the version of the MCP you prefer — remote or local — and your chosen MCP client (e.g. Claude Code, Codex CLI or GitHub Copilot):

To get the most out of the MCP server we recommend including the following prompt in your AGENTS.md (or CLAUDE.md, if using Claude Code. Or GEMINI.md, if using GEMINI). This will tell the LLM which tools are available and when it’s appropriate to use them.

This is already setup for you when using npx sv add mcp

If your MCP client supports it, we also recommend using the svelte-task prompt to instruct the LLM on the best way to use the MCP server.

Edit this page on GitHub llms.txt

**Examples:**

Example 1 (markdown):

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

---

##

**URL:** https://svelte.dev/docs/mcp/overview/llms.txt

---
