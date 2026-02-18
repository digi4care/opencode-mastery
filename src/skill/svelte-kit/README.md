# SvelteKit Skill

**Comprehensive SvelteKit framework knowledge** combining official documentation with real-world implementation patterns.

## Overview

This skill provides expert-level knowledge of:

- **Full-stack web applications** - Frontend and backend
- **File-based routing** - Automatic route generation
- **Server-side rendering** - SSR and hydration
- **Load functions** - Data fetching patterns
- **Server endpoints** - API routes
- **Adapters** - Deployment targets

## When to Use This Skill

Use this skill when you need to:

- **Build full-stack apps** - Frontend and backend
- **Implement routing** - File-based system
- **Handle data** - Load functions and endpoints
- **Set up SSR** - Server-side rendering
- **Create APIs** - Server routes
- **Deploy applications** - Adapter configuration
- **Optimize performance** - Caching and streaming

## Architecture

### Project Structure

```
src/
├── routes/
│   ├── +page.svelte        # Page
│   ├── +layout.svelte      # Layout
│   ├── +layout.ts          # Layout load
│   ├── +page.ts            # Page load
│   └── api/
│       └── +server.ts      # API endpoint
├── lib/
│   ├── components/         # Components
│   └── server/             # Server utilities
├── app.html                # HTML template
└── hooks.server.ts         # Server hooks
```

## Key Features

### Routing

- **File-based** - Automatic route creation
- **Nested routes** - Hierarchical structure
- **Dynamic routes** - [param] segments
- **Catch-all routes** - [...slug] segments

### Data Loading

- **Load functions** - Fetch data for pages
- **Error handling** - Load errors and fallbacks
- **Streaming** - Progressive data loading
- **Caching** - Cache control

### Server Endpoints

- **GET/POST/PUT/DELETE** - HTTP methods
- **Request handling** - Body parsing
- **Response types** - JSON, HTML, files
- **WebSockets** - Real-time communication

### SSR & Hydration

- **Server-side rendering** - Initial HTML generation
- **Client hydration** - Reactivity on client
- **Streaming SSR** - Progressive rendering
- **Selective hydration** - Interactive islands

## Quick Start

### Create SvelteKit App

```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

### Create Page

```svelte
<!-- src/routes/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.title}</h1>
```

### Add Load Function

```typescript
// src/routes/+page.ts
export async function load({ fetch }) {
  const response = await fetch("/api/data");
  const data = await response.json();

  return { data };
}
```

### Create API Endpoint

```typescript
// src/routes/api/data/+server.ts
import { json } from "@sveltejs/kit";

export async function GET() {
  return json({ message: "Hello from API!" });
}

export async function POST({ request }) {
  const body = await request.json();
  return json({ received: body });
}
```

## Advanced Patterns

### Layouts

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  export let data;
</script>

<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<slot />
```

```typescript
// src/routes/+layout.ts
export function load({ data }) {
  return {
    user: data.user,
  };
}
```

### Error Handling

```svelte
<!-- src/routes/+error.svelte -->
<script>
  export let error;
  export let status;
</script>

<h1>{status}</h1>
<p>{error.message}</p>
```

### Nested Routes

```
routes/
├── +layout.svelte
├── admin/
│   ├── +page.svelte
│   └── users/
│       ├── +page.svelte
│       └── [id]/
│           └── +page.svelte
```

### Dynamic Routes

```typescript
// src/routes/blog/[slug]/+page.ts
export async function load({ params }) {
  const post = await getPost(params.slug);
  return { post };
}
```

## Data Fetching

### Load Function

```typescript
export async function load({ fetch, params }) {
  const [postsRes, userRes] = await Promise.all([fetch("/api/posts"), fetch("/api/user")]);

  return {
    posts: await postsRes.json(),
    user: await userRes.json(),
  };
}
```

### Error Boundaries

```typescript
export async function load({ fetch }) {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error("Failed to fetch");
    return { data: await response.json() };
  } catch (error) {
    return { error: error.message };
  }
}
```

### Streaming

```typescript
export async function load({ fetch }) {
  const stream = new ReadableStream({
    start(controller) {
      // Stream data
    },
  });

  return new Response(stream);
}
```

## Server Endpoints

### REST API

```typescript
// src/routes/api/posts/+server.ts
import { json } from "@sveltejs/kit";
import { posts } from "$lib/data";

export async function GET() {
  return json(posts);
}

export async function POST({ request }) {
  const body = await request.json();
  const newPost = await createPost(body);
  return json(newPost, { status: 201 });
}
```

### File Upload

```typescript
export async function POST({ request }) {
  const data = await request.formData();
  const file = data.get("file");

  // Process file
  return json({ success: true });
}
```

### WebSockets

```typescript
// src/routes/api/ws/+server.ts
export function GET({ request, webSocket }) {
  const ws = webSocket.accept();

  ws.on("message", message => {
    // Handle message
  });

  return new Response(null, { status: 101, webSocket });
}
```

## Deployment

### Adapters

#### Node.js

```js
// svelte.config.js
import adapter from "@sveltejs/adapter-node";

export default {
  kit: {
    adapter: adapter(),
  },
};
```

#### Vercel

```js
import adapter from "@sveltejs/adapter-vercel";

export default {
  kit: {
    adapter: adapter(),
  },
};
```

#### Netlify

```js
import adapter from "@sveltejs/adapter-netlify";

export default {
  kit: {
    adapter: adapter(),
  },
};
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

### Handle Errors

```typescript
export function handleError({ error, event }) {
  console.error(error);
  return {
    message: "Something went wrong",
  };
}
```

## Best Practices

### Performance

- Use `load` functions for data fetching
- Implement proper caching headers
- Lazy load routes
- Optimize images

### Security

- Validate inputs
- Use CSRF protection
- Implement authentication
- Sanitize outputs

### SEO

- Use SSR for dynamic content
- Set meta tags properly
- Generate sitemaps
- Use structured data

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from "vitest";
import { load } from "./+page";

describe("Page load", () => {
  it("returns data", async () => {
    const result = await load({ fetch: mockFetch });
    expect(result).toHaveProperty("data");
  });
});
```

## Additional Resources

- **Official Docs**: https://kit.svelte.dev/docs
- **GitHub**: https://github.com/sveltejs/kit
- **SKILL.md** - Complete framework guide
- **references/** - Implementation patterns

---

**For comprehensive documentation, see [SKILL.md](SKILL.md)**
