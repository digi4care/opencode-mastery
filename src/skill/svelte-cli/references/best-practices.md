# Svelte CLI Best Practices

## Project Setup

### 1. Use TypeScript

```bash
sv create my-app --types ts
```

### 2. Use pnpm

```bash
sv create my-app --package-manager pnpm
```

### 3. Add essential tools early

```bash
sv add eslint
sv add mdsvex  # If using markdown
```

## Development Workflow

### 1. Type check before commit

```bash
sv check
```

### 2. Sync types after dependency changes

```bash
sv sync
```

### 3. Use dev server for development

```bash
sv dev
```

## Package Management

### Adding dependencies

```bash
# Production dependencies
pnpm add lucia

# Dev dependencies
pnpm add -D eslint
```

### Removing dependencies

```bash
pnpm remove unneeded-package
```

## Build & Deploy

### 1. Always build before deploy

```bash
sv build
sv preview  # Test locally
```

### 2. Use appropriate adapter

```bash
# Vercel
sv add @sveltejs/adapter-vercel

# Node.js
sv add @sveltejs/adapter-node

# Static
sv add @sveltejs/adapter-static
```

## Performance Tips

1. **Lazy load components** - Use `export const load = async`
2. **Optimize images** - Use `@sveltejs/enhanced-img`
3. **Minimize client-side JS** - Use server-only modules
4. **Preload data** - Use `data-sveltekit-preload-data`

## Security

1. **Never expose secrets** - Use `.env` files
2. **Validate input** - Use Zod or superforms
3. **Use CSRF tokens** - SvelteKit provides built-in

## References

- https://svelte.dev/docs/kit
- https://kit.svelte.dev/docs/best-practices
