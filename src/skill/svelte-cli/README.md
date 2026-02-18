# Svelte CLI Skill

**Svelte command line interface (sv) toolkit** for creating and maintaining Svelte applications.

## Overview

Comprehensive guide to the Svelte CLI covering:

- **Project scaffolding** - Create new Svelte apps
- **Add-ons** - Add libraries and dependencies
- **Dev/build workflows** - Development and production
- **CLI commands** - Complete command reference

## When to Use This Skill

Use this skill when you need to:

- **Create new Svelte projects** - Initialize applications
- **Add libraries** - Install dependencies
- **Manage builds** - Development and production
- **Understand CLI commands** - Reference and usage
- **Configure project** - Setup and customization
- **Workflow automation** - Script and automation

## Quick Start

### Create New Project

```bash
# Interactive project creation
npm create svelte@latest my-app

# With template
npm create svelte@latest my-app --template skeleton

# With TypeScript
npm create svelte@latest my-app --types ts
```

### Available Templates

- **Skeleton** - Minimal setup
- **Demo** - Basic example app
- **Library** - Component library
- **Component** - Single component

## Common Commands

### Project Creation

```bash
# Create app
npm create svelte@latest my-app

# Choose template
npm create svelte@latest my-app --template skeleton

# With TypeScript
npm create svelte@latest my-app --types ts

# With ESLint
npm create svelte@latest my-app --eslint

# With Prettier
npm create svelte@latest my-app --prettier
```

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
my-app/
├── src/
│   ├── lib/
│   ├── routes/
│   ├── app.html
│   └── +page.svelte
├── static/
├── package.json
├── svelte.config.js
├── vite.config.js
└── tsconfig.json
```

## Configuration

### Svelte Config

```js
// svelte.config.js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
};
```

### Vite Config

```js
// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
});
```

## Add-ons

### Add Dependencies

```bash
# Add library
npm install library-name

# Add dev dependency
npm install -D library-name

# Add SvelteKit package
npm install @sveltejs/kit
```

### Common Add-ons

- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - E2E testing
- **Vitest** - Unit testing
- **Tailwind CSS** - Styling

## Project Types

### Svelte App

```bash
npm create svelte@latest my-app
# Select "SvelteKit demo app"
```

### Component Library

```bash
npm create svelte@latest my-lib
# Select "Svelte component library"
```

### Static Site

```bash
npm create svelte@latest my-site
# Select "SvelteKit static site"
```

## Build System

### Development Build

```bash
npm run dev
# Starts Vite dev server
# Hot module replacement enabled
```

### Production Build

```bash
npm run build
# Creates optimized bundle
# Static files in build/
```

### Preview

```bash
npm run preview
# Serves production build locally
# Tests production output
```

## Workflow Automation

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

## Migration

### From Svelte 3

```bash
# Update Svelte
npm install svelte@latest

# Update SvelteKit
npm install @sveltejs/kit@latest

# Run migration
npx svelte-migrate@latest svelte-4
```

## Troubleshooting

### Command Not Found

```bash
# Reinstall CLI
npm uninstall -g @sveltejs/kit
npm install -g @sveltejs/kit
```

### Build Errors

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Type checking
npm run check
```

### Template Issues

```bash
# Use latest template
npm create svelte@latest my-app --template skeleton
```

## Best Practices

### Project Setup

- Use TypeScript for type safety
- Configure ESLint and Prettier
- Set up testing early
- Use conventional commits

### Development

- Use dev server for development
- Test production build locally
- Keep dependencies updated
- Follow Svelte best practices

### Build Optimization

- Enable tree shaking
- Minimize bundle size
- Lazy load routes
- Optimize images

## Additional Resources

- **Official CLI Docs**: https://kit.svelte.dev/docs
- **GitHub Repository**: https://github.com/sveltejs/cli-kit
- **SKILL.md** - Complete CLI guide
- **references/** - Additional documentation

---

**For comprehensive documentation, see [SKILL.md](SKILL.md)**
