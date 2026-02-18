# AGENTS.md - SvelteKit Skill

This file provides guidance to AI agents when working with the SvelteKit skill.

## Overview

**Comprehensive SvelteKit framework knowledge** - Full-stack web applications with SSR, routing, load functions, and server endpoints.

## Skill Invocation

```text
\skill:svelte-kit
```

Use this skill when you need knowledge about SvelteKit framework.

## Key Topics

### Routing

- **File-based routing** - Automatic route generation
- **Nested routes** - Hierarchical structure
- **Dynamic routes** - [param] segments
- **Catch-all routes** - [...slug] segments

### Data Loading

- **Load functions** - Fetch data for pages
- **Layout load** - Shared data
- **Error handling** - Load errors
- **Streaming** - Progressive loading

### Server Endpoints

- **REST API** - GET/POST/PUT/DELETE
- **Request handling** - Body parsing
- **Response types** - JSON, HTML, files
- **WebSockets** - Real-time

### SSR & Hydration

- **Server-side rendering** - Initial HTML
- **Client hydration** - Reactivity
- **Streaming SSR** - Progressive
- **Selective hydration** - Islands

## Common Use Cases

### Getting Started

```text
\skill:svelte-kit How do I create a SvelteKit app?
\skill:svelte-kit What's the project structure?
\skill:svelte-kit How do routes work?
```

### Data Fetching

```text
\skill:svelte-kit How do I fetch data for a page?
\skill:svelte-kit How do load functions work?
\skill:svelte-kit How do I handle errors?
```

### API Development

```text
\skill:svelte-kit How do I create an API endpoint?
\skill:svelte-kit How do I handle POST requests?
\skill:svelte-kit How do I implement WebSockets?
```

### SSR & Deployment

```text
\skill:svelte-kit How does SSR work?
\skill:svelte-kit How do I deploy my app?
\skill:svelte-kit What adapters are available?
```

### Advanced Patterns

```text
\skill:svelte-kit How do I use layouts?
\skill:svelte-kit How do I implement authentication?
\skill:svelte-kit How do I optimize performance?
```

## Quick Reference

### Project Structure

```
src/
├── routes/
│   ├── +page.svelte      # Page
│   ├── +layout.svelte    # Layout
│   ├── +page.ts          # Page load
│   └── api/
│       └── +server.ts    # Endpoint
├── lib/
└── app.html
```

### Basic Page

```svelte
<!-- src/routes/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.title}</h1>
```

### Load Function

```typescript
// src/routes/+page.ts
export async function load({ fetch }) {
  const response = await fetch("/api/data");
  return { data: await response.json() };
}
```

### API Endpoint

```typescript
// src/routes/api/data/+server.ts
import { json } from "@sveltejs/kit";

export async function GET() {
  return json({ message: "Hello!" });
}

export async function POST({ request }) {
  const body = await request.json();
  return json({ received: body });
}
```

## Routing Patterns

### Dynamic Routes

```typescript
// src/routes/blog/[slug]/+page.ts
export async function load({ params }) {
  return { slug: params.slug };
}
```

### Nested Routes

```
routes/
├── +layout.svelte
├── admin/
│   └── users/
│       └── +page.svelte
```

### Catch-all

```typescript
// src/routes/[...slug]/+page.ts
export async function load({ params }) {
  return { segments: params.slug.split("/") };
}
```

## Deployment Adapters

### Node.js

```js
// svelte.config.js
import adapter from "@sveltejs/adapter-node";
```

### Vercel

```js
import adapter from "@sveltejs/adapter-vercel";
```

### Netlify

```js
import adapter from "@sveltejs/adapter-netlify";
```

### Static

```js
import adapter from "@sveltejs/adapter-static";
```

## When to Use

**Use this skill when user asks about:**

- SvelteKit fundamentals
- Routing and data loading
- Server endpoints and APIs
- SSR implementation
- Deployment strategies
- Framework architecture
- Performance optimization

**Invoke with:**

```text
\skill:svelte-kit How do I create a route?
\skill:svelte-kit How do I fetch data?
\skill:svelte-kit How do I deploy my app?
```

## Hooks

### Server Hooks

```typescript
// src/hooks.server.ts
export async function handle({ event, resolve }) {
  // Modify event
  const response = await resolve(event);
  return response;
}
```

### Error Handling

```typescript
export function handleError({ error, event }) {
  return { message: "Error occurred" };
}
```

## Best Practices

### Data Loading

- Use `load` for server-side data
- Implement proper error handling
- Cache data appropriately
- Use streaming for large datasets

### Performance

- Lazy load routes
- Optimize images
- Use proper caching
- Minimize bundle size

### Security

- Validate inputs
- Use CSRF protection
- Implement authentication
- Sanitize outputs

## Related Skills

- **svelte** - Core framework
- **svelte-cli** - Project scaffolding
- **svelte-mcp** - AI-assisted development

## Additional Resources

- **SKILL.md** - Complete framework guide
- **references/** - Official docs
- **Kit.svelte.dev**: https://kit.svelte.dev/docs

---

_For core Svelte help: Use `\skill:svelte`_
