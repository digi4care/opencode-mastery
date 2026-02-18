# Svelte-Cli_Docs - Sveltekit Adapter

**Pages:** 1

---

## sveltekit-adapter

**URL:** llms-txt#sveltekit-adapter

**Contents:**

- Usage
- What you get
- Options
  - adapter
  - cloudflare target

[SvelteKit adapters](/docs/kit/adapters) allow you to deploy your site to numerous platforms. This add-on allows you to configure officially provided SvelteKit adapters, but a number of [community-provided adapters](https://www.sveltesociety.dev/packages?category=sveltekit-adapters) are also available.

- the chosen SvelteKit adapter installed and configured in your `svelte.config.js`

Which SvelteKit adapter to use:

- `auto` — [`@sveltejs/adapter-auto`](/docs/kit/adapter-auto) automatically chooses the proper adapter to use, but is less configurable
- `node` — [`@sveltejs/adapter-node`](/docs/kit/adapter-node) generates a standalone Node server
- `static` — [`@sveltejs/adapter-static`](/docs/kit/adapter-static) allows you to use SvelteKit as a static site generator (SSG)
- `vercel` — [`@sveltejs/adapter-vercel`](/docs/kit/adapter-vercel) allows you to deploy to Vercel
- `cloudflare` — [`@sveltejs/adapter-cloudflare`](/docs/kit/adapter-cloudflare) allows you to deploy to Cloudflare
- `netlify` — [`@sveltejs/adapter-netlify`](/docs/kit/adapter-netlify) allows you to deploy to Netlify

### cloudflare target

Whether to deploy to Cloudflare Workers or Pages. Only available for `cloudflare` adapter.

**Examples:**

Example 1 (sh):

```sh
npx sv add sveltekit-adapter
```

Example 2 (sh):

```sh
npx sv add sveltekit-adapter="adapter:node"
```

Example 3 (sh):

```sh
npx sv add sveltekit-adapter="adapter:cloudflare+cfTarget:workers"
```

---
