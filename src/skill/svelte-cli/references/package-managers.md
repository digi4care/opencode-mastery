# Package Managers with SvelteKit

## Supported Managers

SvelteKit works with pnpm, npm, and yarn.

## pnpm (Recommended)

```bash
# Install pnpm
npm install -g pnpm

# Create project with pnpm
sv create my-app --package-manager pnpm

# Install dependencies
pnpm install

# Add package
pnpm add lucia

# Dev dependency
pnpm add -D eslint

# Remove package
pnpm remove lucia
```

## npm

```bash
# Create project with npm
sv create my-app --package-manager npm

# Install dependencies
npm install

# Add package
npm install lucia

# Dev dependency
npm install -D eslint
```

## yarn

```bash
# Create project with yarn
sv create my-app --package-manager yarn

# Install dependencies
yarn install

# Add package
yarn add lucia

# Dev dependency
yarn add -D eslint
```

## Switching Package Managers

1. Remove existing lock file and node_modules:

```bash
rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml
```

2. Install with new manager:

```bash
pnpm install  # or npm install or yarn
```

## Best Practices

- **Use pnpm** - Faster, efficient, strict peer deps
- **Don't mix managers** - Stick to one per project
- **Commit lock files** - Ensures reproducible builds

## Common Issues

| Issue                        | Solution                             |
| ---------------------------- | ------------------------------------ |
| Peer dependency warnings     | Use pnpm with strict peer deps       |
| Duplicate packages           | pnpm handles this automatically      |
| Missing packages after clone | Run install command for your manager |

## References

- https://pnpm.io/
- https://docs.npmjs.com/
- https://yarnpkg.com/
