---
name: svelte-cli
description: Use when creating or managing Svelte/SvelteKit projects with the sv CLI - covers project scaffolding, add-ons (ESLint, Drizzle, MCP, mdsvex), dev/build workflows, and type checking
---

# Svelte CLI v2.0

The Svelte command line interface (`sv`) is a toolkit for creating and maintaining Svelte applications. This skill combines official documentation and GitHub repository analysis to provide comprehensive guidance on project scaffolding, add-ons, and development workflows.

## 📋 Quick Summary

| Command/Feature | Description |
|-----------------|-------------|
| **`sv create`** | Scaffold new SvelteKit projects |
| **`sv add`** | Install and configure add-ons (eslint, drizzle, lucia, mcp, mdsvex) |
| **`sv check`** | Type checking from command line |
| **Add-ons** | Pre-configured integrations with options |
| **Package Managers** | npm, pnpm, bun, deno, yarn |
| **MCP Setup** | `npx sv add mcp` for IDE integration |

## 📑 Table of Contents

1. [When to Use This Skill](#💡-when-to-use-this-skill)
2. [Quick Reference](#🚀-quick-reference)
3. [Reference Documentation](#📖-reference-documentation)
4. [Working with This Skill](#🎯-working-with-this-skill)
5. [Key Concepts](#🔑-key-concepts)
6. [Best Practices](#🎓-best-practices)
7. [Related Resources](#📚-related-resources)

---

## 💡 When to Use This Skill

Use this skill when you need to:

- **Create new Svelte/SvelteKit projects** - scaffolding, templates, project setup
- **Add integrations** - ESLint, Prettier, Drizzle ORM, Lucia auth, mdsvex, Tailwind CSS, etc.
- **Configure tooling** - TypeScript, testing frameworks, database drivers, Docker
- **Set up MCP servers** - Svelte MCP integration with Claude Code, Cursor, VSCode
- **Troubleshoot CLI issues** - command conflicts, package manager problems
- **Run type checking** - using `sv check` for validation
- **Work with add-ons** - understanding available options and configuration

## 🚀 Quick Reference

### Creating a New Svelte Project

The most common workflow to create a new SvelteKit app:

```sh
npx sv create myapp
cd myapp
npm install
npm run dev
```

### Adding ESLint to Your Project

Install ESLint with Svelte plugin and proper configuration:

```sh
npx sv add eslint
```

**What you get:**

- `eslint-plugin-svelte` installed
- `eslint.config.js` file
- VSCode settings updated
- TypeScript and Prettier integration (if used)

### Setting Up Drizzle ORM

Add Drizzle ORM with PostgreSQL and Docker:

```sh
# Interactive mode
npx sv add drizzle

# With options - PostgreSQL with postgres.js client
npx sv add drizzle="database:postgresql+client:postgres.js"

# Include Docker Compose configuration
npx sv add drizzle="database:postgresql+client:postgres.js+docker:yes"
```

**Database options:**

- `postgresql` - Most popular open source database
- `mysql` - Another popular open source database
- `sqlite` - File-based database (no server required)

### Adding Authentication with Lucia

Set up auth following Lucia best practices:

```sh
# Basic auth setup
npx sv add lucia

# Include demo registration/login pages
npx sv add lucia="demo:yes"
```

**What you get:**

- SvelteKit + Drizzle auth setup
- `.env` file for credentials
- Compatible with Drizzle add-on
- Optional demo pages

### Setting Up Svelte MCP Server

Configure MCP server for your IDE:

```sh
# Interactive setup
npx sv add mcp

# Cursor and VSCode with local setup
npx sv add mcp="ide:cursor,vscode"

# Specify local setup explicitly
npx sv add mcp="setup:local"
```

### Handling Chrome DevTools JSON Request

Prevent DevTools warning in your dev server:

```js
/// file: src/hooks.server.js
import { dev } from "$app/environment";

export function handle({ event, resolve }) {
  if (dev && event.url.pathname === "/.well-known/appspecific/com.chrome.devtools.json") {
    return new Response(undefined, { status: 404 });
  }

  return resolve(event);
}
```

### Adding Markdown Support with mdsvex

Enable markdown in Svelte components:

```sh
npx sv add mdsvex
```

**What you get:**

- mdsvex installed and configured in `svelte.config.js`
- Ability to use Svelte components in markdown
- Markdown support in `.svelte` files

### 🔧 In-Depth Add-On Configuration Examples

#### Drizzle + Lucia + MCP (Full Stack Setup)

```sh
# Create project with TypeScript first
npx sv create myapp --template minimal --types ts

# Add Drizzle with PostgreSQL and Docker
cd myapp
npx sv add drizzle="database:postgresql+client:postgres.js+docker:yes"

# Add Lucia Auth (requires Drizzle)
npx sv add lucia="demo:yes"

# Add MCP for AI-assisted development
npx sv add mcp="ide:vscode,claude"
```

**Resulting file structure:**
```
myapp/
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── db/          # Drizzle schema and migrations
│   │   │   └── auth/        # Lucia auth setup
│   │   └── components/
├── drizzle.config.ts
├── .env                     # DATABASE_URL, AUTH_SECRET
├── docker-compose.yml       # PostgreSQL
└── .claude/
    └── CLAUDE.md           # MCP tools configured
```

#### Custom ESLint Configuration

```sh
# Add ESLint with custom config
npx sv add eslint

# Then customize eslint.config.js:
export default [
  ...pluginSvelte.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "prefer-const": "error"
    }
  }
];
```

#### Multiple Add-Ons Chain

```sh
# Full-featured SvelteKit project
npx sv create myapp --template demo --types ts

# Add all essentials at once (run separately)
cd myapp
npx sv add eslint          # Linting
npx sv add prettier        # Formatting
npx sv add drizzle="database:sqlite"  # SQLite for dev
npx sv add lucia="demo:yes"  # Auth
npx sv add mcp             # AI tools
npx sv add mdsvex          # Markdown
```

**Tip:** Install Drizzle before Lucia - they're designed to integrate together.

### Running Different Package Managers

How to run `sv` with various package managers:

```sh
# npm
npx sv create

# pnpm
pnpx sv create
# or
pnpm dlx sv create

# Bun
bunx sv create

# Deno
deno run npm:sv create

# Yarn
yarn dlx sv create
```

## 📖 Reference Documentation

This skill includes comprehensive documentation organized by source:

### Documentation Sources (`references/documentation/`)

- **`overview.md`** - CLI basics, usage patterns, and acknowledgements
- **`faq.md`** - Common issues: running `sv`, command conflicts with `runit` and PowerShell
- **`drizzle.md`** - Drizzle ORM setup with database options (PostgreSQL, MySQL, SQLite)
- **`eslint.md`** - ESLint configuration with `eslint-plugin-svelte`
- **`lucia.md`** - Lucia auth integration with optional demo pages
- **`mcp.md`** - Svelte MCP server setup for various IDEs
- **`mdsvex.md`** - Markdown preprocessor configuration
- **`devtools_json.md`** - Handling Chrome DevTools project settings
- **`llms.md`** - LLM-focused documentation (abridged, compressed, complete versions)
- **`llms-full.md`** - Complete Svelte and SvelteKit documentation
- **`llms-small.md`** - Compressed documentation for quick reference

### GitHub Sources (`references/github/`)

- Repository analysis with code patterns
- Issue tracking and known problems
- Release history and recent changes

## 🎯 Working with This Skill

### For Beginners

**Start here:**

1. Review `overview.md` to understand CLI basics
2. Use `sv create` to scaffold your first project
3. Check `faq.md` if you encounter issues running commands
4. Add integrations one at a time with `sv add <addon>`

**Common first steps:**

```sh
# Create project
npx sv create myapp

# Add essential tooling
cd myapp
npx sv add eslint
npx sv add prettier
```

### For Intermediate Users

**Key workflows:**

- Configure databases with Drizzle using specific options
- Set up authentication flows with Lucia
- Integrate MCP servers for enhanced IDE support
- Handle Chrome DevTools configuration in production apps

**Explore add-ons:**

- Check available options with `npx sv add <addon>` (interactive)
- Use inline configuration: `sv add addon="key:value"`

### For Advanced Users

**Deep dives:**

- Study `llms-full.md` for complete Svelte 5 API reference
- Review GitHub sources for implementation patterns
- Understand compiler options for experimental features
- Configure custom tooling chains with multiple add-ons

**Pro tips:**

- Chain add-ons: install Drizzle first, then Lucia (they integrate)
- Use Docker options for consistent dev environments
- Check `.env` files after add-on installation
- Review generated config files for customization opportunities

## 🔑 Key Concepts

### The `sv` Command

The Svelte CLI provides a unified interface for project management:

- **`sv create`** - Scaffold new projects with templates
- **`sv add`** - Install and configure add-ons/integrations
- **`sv check`** - Run type checking from command line

### Add-On System

Add-ons are pre-configured integrations that:

- Install necessary packages
- Generate config files
- Update project settings (e.g., VSCode settings)
- Provide demo code (optional)

### Configuration Options

Most add-ons support inline options:

```sh
npx sv add addon="option1:value1+option2:value2"
```

Options are always listed in the interactive mode if you run `npx sv add addon` without parameters.

### Package Manager Compatibility

The CLI works with all major package managers (npm, pnpm, Bun, Deno, Yarn). Use the appropriate command prefix for your tool.

### Known Issues & Workarounds

**Command name collisions:**

- `sv` conflicts with `runit` on some Linux systems
- `sv` conflicts with PowerShell's `Set-Variable` alias
- Solutions: use full `npx sv` or configure package manager preferences

**Local vs registry execution:**

- Some package managers prefer local tools over registry
- If `npx sv` does nothing, check for local `sv` installation
- See FAQ documentation for detailed troubleshooting

## 📚 Related Resources

- **Svelte Documentation**: [svelte.dev/docs/svelte](https://svelte.dev/docs/svelte/llms.txt)
- **SvelteKit Documentation**: [svelte.dev/docs/kit](https://svelte.dev/docs/kit/llms.txt)
- **Svelte MCP Documentation**: [svelte.dev/docs/mcp](https://svelte.dev/docs/mcp/llms.txt)
- **GitHub Repository**: sveltejs/cli

## 🎓 Best Practices

1. **Always use `npx sv`** instead of globally installing to get latest versions
2. **Run add-ons after project creation** - don't try to configure before scaffolding
3. **Check `.env` files** after database/auth setup for required credentials
4. **Use Docker options** for databases in team environments
5. **Review generated configs** before committing - understand what changed
6. **Install Drizzle before Lucia** if you need both (they're designed to integrate)

---

_Generated by Skill Seeker's unified multi-source scraper_
