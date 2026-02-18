# Svelte CLI Troubleshooting

## Common Issues

### sv: command not found

**Solution:**

```bash
# Install globally
npm install -g sv

# Or use npx
npx sv --version
```

### Module not found errors

**Solution:**

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### TypeScript errors

**Solution:**

```bash
# Sync types
sv sync

# Or manually
npx svelte-kit sync
```

### Adapter not found

**Solution:**

```bash
# Install adapter
sv add @sveltejs/adapter-auto
sv add @sveltejs/adapter-node
sv add @sveltejs/adapter-vercel
```

### Port already in use

**Solution:**

```bash
# Kill process on port
lsof -ti:5173 | xargs kill -9

# Or use different port
sv dev --port 5174
```

### SSL certificate errors

**Solution:**

```bash
# Set NODE_TLS_REJECT_UNAUTHORIZED
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Build failures

**Solution:**

```bash
# Check for TypeScript errors
sv check

# Clean build
rm -rf .svelte-kit
sv dev
```

## Error Messages

| Error              | Cause              | Solution                   |
| ------------------ | ------------------ | -------------------------- |
| Cannot find module | Missing dependency | Run install                |
| Type error         | TS config issue    | Run sv sync                |
| Adapter error      | Wrong adapter      | Add correct adapter        |
| Port in use        | Already running    | Kill process or use --port |
