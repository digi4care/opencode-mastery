# AGENTS.md - Svelte CLI Skill

This file provides guidance to AI agents when working with the Svelte CLI skill.

## Overview

**Svelte command line interface (sv) toolkit** - Project scaffolding, add-ons, and development workflows.

## Skill Invocation

```text
\skill:svelte-cli
```

Use this skill when you need knowledge about Svelte CLI commands and workflows.

## Key Topics

### Project Creation

- **Interactive setup** - Guided project creation
- **Templates** - Skeleton, demo, library
- **Options** - TypeScript, ESLint, Prettier

### CLI Commands

- **Create** - Initialize projects
- **Build** - Production builds
- **Dev** - Development server
- **Check** - Type checking

### Configuration

- **svelte.config.js** - Svelte configuration
- **vite.config.js** - Vite bundler setup
- **package.json** - Scripts and dependencies

## Common Use Cases

### Create New Project

```text
\skill:svelte-cli How do I create a new Svelte project?
\skill:svelte-cli What templates are available?
\skill:svelte-cli How do I add TypeScript?
```

### Development Workflow

```text
\skill:svelte-cli How do I start the dev server?
\skill:svelte-cli How do I build for production?
\skill:svelte-cli How do I run tests?
```

### Configuration

```text
\skill:svelte-cli How do I configure Svelte?
\skill:svelte-cli How do I add ESLint?
\skill:svelte-cli How do I set up Prettier?
```

### Troubleshooting

```text
\skill:svelte-cli Command not found
\skill:svelte-cli Build errors
\skill:svelte-cli Template issues
```

## Quick Reference

### Create Project

```bash
# Interactive
npm create svelte@latest my-app

# With template
npm create svelte@latest my-app --template skeleton

# With TypeScript
npm create svelte@latest my-app --types ts

# With extras
npm create svelte@latest my-app --template skeleton --types ts --eslint --prettier
```

### Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
npm run check    # Type checking
npm run lint     # Run ESLint
npm run format   # Format code
```

### Templates

- **skeleton** - Minimal setup
- **demo** - Basic example app
- **library** - Component library
- **component** - Single component

## Project Structure

```
my-app/
├── src/
│   ├── lib/          # Components
│   ├── routes/       # Pages
│   ├── app.html      # HTML template
│   └── +page.svelte  # Home page
├── static/           # Static assets
├── package.json
├── svelte.config.js  # Svelte config
├── vite.config.js    # Vite config
└── tsconfig.json     # TypeScript config
```

## When to Use

**Use this skill when user asks about:**

- Creating new Svelte projects
- CLI command usage
- Project templates
- Development workflows
- Build configuration
- Troubleshooting CLI issues

**Invoke with:**

```text
\skill:svelte-cli How do I create a project?
\skill:svelte-cli What commands are available?
\skill:svelte-cli How do I configure my project?
```

## Configuration Files

### svelte.config.js

```js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
};
```

### vite.config.js

```js
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
});
```

## Migration Guide

### Svelte 3 to 4

```bash
npm install svelte@latest @sveltejs/kit@latest
npx svelte-migrate@latest svelte-4
```

## Related Skills

- **svelte** - Core framework
- **svelte-kit** - Full-stack framework
- **svelte-mcp** - AI-assisted development

## Additional Resources

- **SKILL.md** - Complete CLI reference
- **references/** - Official documentation
- **Kit Docs**: https://kit.svelte.dev/docs

---

_For Svelte framework help: Use `\skill:svelte`_
