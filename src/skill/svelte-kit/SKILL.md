---
name: svelte-kit
description: Use when building full-stack SvelteKit applications. Covers file-based routing, load functions, server endpoints, form actions, hooks, adapters, SSR/SSG, and deployment patterns.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://kit.svelte.dev/docs
---

# SvelteKit Expert

Comprehensive SvelteKit framework knowledge combining official documentation with real-world implementation patterns.

## When to Use

- Building full-stack SvelteKit applications
- Creating routes, pages, layouts
- Setting up data loading with load functions
- Form actions and progressive enhancement
- Server hooks and middleware
- Deployment with adapters (Cloudflare, Vercel, Netlify, Node)
- SSR/SSG and prerendering

## Quick Reference

### File-Based Routing

```
src/routes/
├── +page.svelte        # Page component
├── +page.js            # Universal load function
├── +page.server.js     # Server-side load function
├── +layout.svelte     # Layout component
├── +layout.js         # Layout load function
├── +server.js         # API endpoint
└── api/
    └── +server.js     # API route
```

### Form Actions

```javascript
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    return { success: true };
  },
};
```

### Hooks (hooks.server.js)

```javascript
export const handle = async ({ event, resolve }) => {
  // Authentication, logging, etc.
  return resolve(event);
};
```

## References

- references/routing.md - File-based routing deep dive
- references/data-loading.md - Load functions
- references/form-actions.md - Form handling
- references/hooks.md - Server hooks
- references/adapters.md - Deployment adapters
- references/ssr-ssg.md - Rendering modes
- references/platform-context.md - Platform-specific APIs
- references/troubleshooting.md - Common issues

## Best Practices

- Use server load functions (+page.server.js) for sensitive operations
- Implement form actions for progressive enhancement
- Use hooks for authentication and middleware
- Choose appropriate adapter for deployment target

## Related Skills

- svelte (core Svelte knowledge)
- svelte-cli (project scaffolding)
- tailwind (styling)
