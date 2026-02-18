---
name: svelte-kit
description: Use when building full-stack SvelteKit applications - covers file-based routing, load functions, server endpoints, form actions, hooks, adapters, SSR/SSG, and deployment patterns
---

# SvelteKit Expert Skill v2.0

> **Comprehensive SvelteKit framework knowledge combining official documentation with real-world implementation patterns from the GitHub repository.**

## 📋 Quick Summary

| Topic | Description |
|-------|-------------|
| **Routing** | File-based: `+page.svelte`, `+layout.svelte`, `+server.js` |
| **Data Loading** | Load functions (`+page.js`, `+page.server.js`) |
| **Form Actions** | Progressive enhancement with `+page.server.js` |
| **Hooks** | `handle`, `handleError`, `handleFetch` in `hooks.server.js` |
| **Adapters** | Cloudflare, Vercel, Netlify, Node.js, Static |
| **SSR/SSG** | Server-side rendering, static generation, prerender |
| **Platform Context** | Cloudflare KV/DO, Vercel, custom types |

**536 undocumented APIs** - See `references/conflicts.md` and `references/api/merged_api.md`.

## 📑 Table of Contents

1. [When to Use This Skill](#💡-when-to-use-this-skill)
2. [Quick Reference](#🚀-quick-reference)
3. [Reference Documentation](#📖-reference-documentation)
4. [Working with This Skill](#🎯-working-with-this-skill)
5. [Key Concepts](#🔑-key-concepts)
6. [Navigation Tips](#🔍-navigation-tips)
7. [Common Patterns](#📦-common-patterns)
8. [Related Skills](#🔗-related-skills)

---

## 💡 When to Use This Skill

This skill combines knowledge from multiple authoritative sources:

- ✅ **Official Documentation**: https://svelte.dev/docs/kit (200 pages)
- ✅ **GitHub Repository**: sveltejs/kit (deep code analysis, 150 issues analyzed)

**⚠️ Important Note**: This skill contains **536 undocumented APIs** found in the codebase. Many are internal/private APIs (prefixed with `_`). See `references/conflicts.md` and `references/api/merged_api.md` for details.

---

## 💡 When to Use This Skill

Use this skill when you need to:

- **Build or debug SvelteKit applications** - routing, page layouts, server endpoints
- **Implement advanced SvelteKit patterns** - load functions, form actions, hooks, adapters
- **Configure deployment** - Cloudflare, Vercel, Netlify, Node.js adapters
- **Optimize SSR/SSG** - prerendering, server-side rendering, static site generation
- **Handle authentication** - session management, cookies, server-side auth
- **Debug SvelteKit-specific issues** - understanding internal behavior, accessing platform APIs
- **Set up accessibility features** - route announcements, focus management
- **Work with SvelteKit's file-based routing** - understanding +page.svelte, +layout.svelte, +server.js patterns

**Specific Triggers:**

- Questions about `+page.svelte`, `+layout.svelte`, `+server.js` file naming conventions
- Issues with `load()` functions, `$app/*` modules, `$env/*` variables
- Deployment configuration for specific platforms (Cloudflare Workers, Vercel, etc.)
- Form handling with progressive enhancement (`use:enhance`)
- Server hooks (`handle`, `handleError`, `handleFetch`)
- Client-side navigation (`goto`, `beforeNavigate`, `afterNavigate`)

---

## 🚀 Quick Reference

### 1. Basic Page with Page Title (Accessibility)

Every page should have a unique title for screen readers and SEO.

```svelte
<!-- src/routes/+page.svelte -->
<svelte:head>
	<title>Todo List</title>
</svelte:head>

<h1>Welcome to my app!</h1>
```

**When to use:** Every page in your SvelteKit app for accessibility and SEO.

---

### 2. Load Function with Server Data

Server-side data loading with type safety.

```javascript
// src/routes/+page.server.js
export async function load() {
  // Runs only on the server
  const data = await fetchFromDatabase();
  return {
    items: data,
  };
}
```

**When to use:** Fetching data that requires server-only access (database, APIs with secrets).

---

### 3. Focus Management After Navigation

Customize focus behavior after client-side navigation.

```javascript
import { afterNavigate } from "$app/navigation";

afterNavigate(() => {
  /** @type {HTMLElement | null} */
  const to_focus = document.querySelector(".focus-me");
  to_focus?.focus();
});
```

**When to use:** Custom focus requirements for accessibility (e.g., focusing a search input after navigation).

---

### 4. SvelteKit Adapter Configuration

Configure your app for different deployment targets.

```javascript
// svelte.config.js
import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      config: "wrangler.jsonc",
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },
    }),
  },
};

export default config;
```

**When to use:** Deploying to Cloudflare, Vercel, Netlify, or Node.js servers.

---

### 5. Platform-Specific Context (Cloudflare)

Access platform-specific bindings like KV, Durable Objects.

```javascript
// src/routes/api/+server.js
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, platform }) {
  // Access Cloudflare Workers bindings
  const value = await platform.env.MY_KV_NAMESPACE.get("key");

  // Access Durable Objects
  const id = platform.env.MY_DO_NAMESPACE.idFromName("user-123");

  return new Response(value);
}
```

**When to use:** Accessing Cloudflare KV, Durable Objects, D1 databases, or other platform bindings.

---

### 6. TypeScript Platform Types

Define platform-specific types for your app.

```typescript
// src/app.d.ts
import { KVNamespace, DurableObjectNamespace } from "@cloudflare/workers-types";

declare global {
  namespace App {
    interface Platform {
      env: {
        YOUR_KV_NAMESPACE: KVNamespace;
        YOUR_DURABLE_OBJECT_NAMESPACE: DurableObjectNamespace;
      };
    }
  }
}

export {};
```

**When to use:** Adding TypeScript support for Cloudflare Workers, custom platform types.

---

### 7. Server Hook with Internationalization

Set the HTML lang attribute dynamically.

```javascript
// src/hooks.server.js
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const lang = event.request.headers.get("accept-language")?.split(",")[0] || "en";

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace("%lang%", lang),
  });
}
```

```html
<!-- src/app.html -->
<html lang="%lang%"></html>
```

**When to use:** Multi-language sites requiring dynamic HTML lang attribute for accessibility.

---

### 8. Building with Environment Checks

Prevent code execution during build time.

```javascript
// src/routes/+page.server.js
import { building } from "$app/environment";
import { setupMyDatabase } from "$lib/server/database";

if (!building) {
  setupMyDatabase();
}

export function load() {
  // Load function code
}
```

**When to use:** Preventing database connections or side effects during `vite build`.

---

### 9. Cloudflare Wrangler Configuration

Configure Cloudflare Workers with Static Assets.

```jsonc
// wrangler.jsonc
{
  "name": "my-sveltekit-app",
  "main": ".svelte-kit/cloudflare/_worker.js",
  "compatibility_date": "2025-01-01",
  "assets": {
    "binding": "ASSETS",
    "directory": ".svelte-kit/cloudflare",
  },
}
```

**When to use:** Deploying SvelteKit to Cloudflare Workers with Static Assets.

---

### 10. VS Code Launch Configuration (Debugging)

Set up breakpoint debugging in VS Code.

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "command": "npm run dev",
      "name": "Run development server",
      "request": "launch",
      "type": "node-terminal"
    }
  ]
}
```

**When to use:** Debugging SvelteKit apps with breakpoints in VS Code.

---

## 📖 Reference Documentation

The skill includes comprehensive reference documentation organized by source:

### Documentation References (`references/documentation/`)

Official SvelteKit documentation covering:

- **`accessibility.md`** - Route announcements, focus management, lang attribute, WCAG compliance
- **`adapters.md`** - Adapter usage, platform-specific context, writing custom adapters
- **`auth.md`** - Sessions vs tokens, integration points, Lucia auth examples
- **`breakpoint_debugging.md`** - VS Code, Chrome DevTools, debugging setup
- **`building_your_app.md`** - Build process, preview mode, production builds
- **`cloudflare.md`** - Cloudflare Workers/Pages deployment, Wrangler config, bindings

### GitHub References (`references/github/`)

Real-world implementation patterns from the SvelteKit repository.

### API References (`references/api/`)

- **`merged_api.md`** - Complete API reference showing both documented and undocumented APIs with conflict warnings

### Conflicts (`references/conflicts.md`)

Detailed report of 536 APIs found in code but not in documentation:

- 🟡 **528 Medium severity** - Review recommended (undocumented public APIs)
- 🟢 **8 Low severity** - Informational (internal APIs with `_` prefix)

**Important:** Most conflicts are internal/private APIs not meant for public use. Refer to official docs for public APIs.

---

## 🎯 Working with This Skill

### For Beginners

**Start here:**

1. Read `references/documentation/building_your_app.md` - Understand the build process
2. Review `references/documentation/adapters.md` - Learn about deployment adapters
3. Check Quick Reference examples 1-3 for basic patterns

**Key files to understand:**

- `+page.svelte` - Page components
- `+layout.svelte` - Shared layouts
- `+page.server.js` - Server-side load functions
- `+server.js` - API endpoints

### For Intermediate Users

**Focus on:**

1. `references/documentation/auth.md` - Authentication patterns
2. `references/documentation/cloudflare.md` - Platform-specific deployment
3. Quick Reference examples 4-7 for advanced patterns

**Master these concepts:**

- Load functions (universal vs server-only)
- Form actions with progressive enhancement
- Server hooks (`handle`, `handleError`)
- Client-side navigation hooks

### For Advanced Users

**Deep dive into:**

1. `references/api/merged_api.md` - Internal APIs and implementation details
2. `references/conflicts.md` - Understand undocumented APIs (use with caution)
3. `references/documentation/adapters.md` - Write custom adapters
4. Quick Reference examples 8-10 for edge cases

**Expert topics:**

- Custom adapter development
- Platform-specific optimizations
- Build-time vs runtime behavior
- Advanced SSR/SSG patterns

---

## 🔑 Key Concepts

### File-Based Routing

SvelteKit uses a file-based routing system:

- `+page.svelte` - Defines a page component
- `+page.js` / `+page.server.js` - Load functions for data fetching
- `+layout.svelte` - Shared layouts for nested routes
- `+server.js` - API endpoints (GET, POST, etc.)
- `+error.svelte` - Custom error pages

### Load Functions

Two types of load functions:

1. **Universal load** (`+page.js`) - Runs on both server and client
2. **Server load** (`+page.server.js`) - Runs only on server (access to secrets, database)

### Adapters

Adapters transform your SvelteKit app for specific deployment targets:

- `@sveltejs/adapter-cloudflare` - Cloudflare Workers/Pages
- `@sveltejs/adapter-vercel` - Vercel
- `@sveltejs/adapter-netlify` - Netlify
- `@sveltejs/adapter-node` - Node.js servers
- `@sveltejs/adapter-static` - Static site generation

### Platform Context

The `platform` property in `RequestEvent` provides access to platform-specific features:

- **Cloudflare**: `env` (KV, DO, D1), `ctx`, `cf`, `caches`
- **Vercel**: Request context
- **Custom**: Define your own `App.Platform` interface

### Hooks

Server hooks (`src/hooks.server.js`):

- `handle` - Intercept requests, modify responses
- `handleFetch` - Modify fetch requests during SSR
- `handleError` - Custom error handling

Client hooks (`src/hooks.client.js`):

- `handleError` - Client-side error handling

### SSR, CSR, and Prerendering

- **SSR** (Server-Side Rendering) - Generate HTML on the server for each request
- **CSR** (Client-Side Rendering) - Render in the browser (SPA mode)
- **Prerendering** - Generate static HTML at build time

Control with `+page.js` exports:

```javascript
export const ssr = true; // Enable SSR
export const csr = true; // Enable CSR
export const prerender = true; // Prerender at build time
```

---

## 🔍 Navigation Tips

### Finding What You Need

**For deployment issues:**

- Check `references/documentation/adapters.md`
- Platform-specific: `references/documentation/cloudflare.md`

**For authentication:**

- Read `references/documentation/auth.md`

**For accessibility:**

- Review `references/documentation/accessibility.md`

**For API details:**

- Search `references/api/merged_api.md` for specific function names
- ⚠️ Be cautious with undocumented APIs marked with conflicts

**For debugging:**

- Setup guide: `references/documentation/breakpoint_debugging.md`

### Understanding Conflicts

536 conflicts exist between docs and code. Most are:

- Internal APIs (prefixed with `_`) - Not for public use
- Build-time utilities - Used internally by SvelteKit
- Adapter-specific internals - Implementation details

**Safe to use:** Only APIs documented in official docs unless you understand the risks.

---

## 📦 Common Patterns

### Pattern: Server-Only API Route

```javascript
// src/routes/api/data/+server.js
import { json } from "@sveltejs/kit";
import { SECRET_KEY } from "$env/static/private";

export async function GET({ url }) {
  const data = await fetchWithSecret(SECRET_KEY);
  return json(data);
}
```

### Pattern: Form Action with Progressive Enhancement

```javascript
// src/routes/+page.server.js
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");

    // Process form
    return { success: true };
  },
};
```

```svelte
<!-- src/routes/+page.svelte -->
<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<input name="email" type="email" />
	<button>Submit</button>
</form>
```

### Pattern: Typed Platform Context

```typescript
// src/app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: { id: string; name: string } | null;
    }

    interface Platform {
      env: {
        DB: D1Database;
        KV: KVNamespace;
      };
    }
  }
}
```

## 🔗 Related Skills

→ \skill:shadcn-svelte - Voor UI component bibliotheek integratie in SvelteKit apps
→ \skill:svelte - Voor core Svelte component development

---

_This skill was generated by Skill Seeker's unified multi-source scraper, combining official documentation with real-world code patterns for comprehensive SvelteKit expertise._
