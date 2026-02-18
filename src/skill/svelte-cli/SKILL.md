---
name: svelte-cli
description: Use when creating or managing Svelte/SvelteKit projects with the sv CLI - covers project scaffolding, add-ons (ESLint, Drizzle, MCP, mdsvex), dev/build workflows, and type checking.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://svelte.dev/docs/cli
---

# Svelte CLI (sv)

Command-line interface for Svelte/SvelteKit project management.

## When to Use

- Creating new Svelte/SvelteKit projects
- Adding packages (ESLint, Drizzle, MCP, mdsvex)
- Running dev server, build, or type check
- Managing package manager settings

## Quick Reference

```bash
# Create project
sv create my-app
sv create my-app --template minimal --types ts

# Add packages
sv add eslint
sv add drizzle
sv add mdsvex
sv add mcp
sv add lucia

# Development
sv dev           # Start dev server
sv build         # Production build
sv preview       # Preview build
sv check         # Type check
```

## Common Commands

| Command      | Description             |
| ------------ | ----------------------- |
| `sv create`  | Scaffold new project    |
| `sv add`     | Add packages to project |
| `sv remove`  | Remove packages         |
| `sv sync`    | Sync types              |
| `sv migrate` | Run migrations          |

## Configuration

Project configured via `svelte.config.js` and package.json.

## References

- references/drizzle.md - Database setup
- references/eslint.md - Linting configuration
- references/lucia.md - Auth integration
- references/mcp.md - Model Context Protocol
- references/mdsvex.md - Markdown integration
- references/package-managers.md - pnpm/npm/yarn
- references/troubleshooting.md - Common issues
- references/best-practices.md - Project setup tips
