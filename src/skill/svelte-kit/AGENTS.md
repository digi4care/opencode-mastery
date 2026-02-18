# AGENTS.md - SvelteKit Skill

**Skill:** SvelteKit - Full-stack web framework met SSR, routing, en server endpoints

## Overview

File-based routing, load functions, server endpoints, SSR, en deployment adapters.

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte      # Page component
│   ├── +page.ts          # Load function
│   ├── +layout.svelte    # Layout
│   └── api/
│       └── +server.ts    # API endpoint
├── lib/                  # Shared code
└── app.html              # HTML template
```

## Key Patterns

### Load Function

```typescript
// +page.ts
export async function load({ fetch, params }) {
  const res = await fetch(`/api/${params.slug}`);
  return { data: await res.json() };
}
```

### API Endpoint

```typescript
// +server.ts
import { json } from "@sveltejs/kit";

export async function GET() {
  return json({ message: "Hello" });
}
```

### Page Component

```svelte
<script>
  let { data } = $props();
</script>

<h1>{data.title}</h1>
```

## Anti-Patterns

| Niet doen                         | Wel doen                  |
| --------------------------------- | ------------------------- |
| Client-side fetch in +page.svelte | Gebruik `load` function   |
| `export let data` in Svelte 5     | `let { data } = $props()` |
| Hardcoded API URLs                | Relative paths gebruiken  |

## Deployment Adapters

- `@sveltejs/adapter-node` - Node.js
- `@sveltejs/adapter-vercel` - Vercel
- `@sveltejs/adapter-netlify` - Netlify
- `@sveltejs/adapter-static` - Static sites

## When to Use

- SvelteKit routing en data loading
- Server endpoints en APIs
- SSR configuratie
- Deployment setup

## Related Skills

- **svelte** - Core framework
- **svelte-cli** - Project scaffolding

## Resources

- **SKILL.md** → Complete framework guide
- **Official Docs**: https://kit.svelte.dev/docs
