# ESLint with Svelte

## Installation

```bash
sv add eslint
```

## Configuration

After adding, ESLint is pre-configured. Custom rules go in `.eslintrc.cjs`:

```javascript
module.exports = {
  extends: [
    "./.svelte-kit/tsconfig.json",
    "eslint:recommended",
    "plugin:svelte/recommended",
    "plugin:svelte/typescript",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
    extraFileExtensions: [".svelte"],
  },
  rules: {
    "svelte/no-at-html-tags": "error",
    "no-console": "warn",
  },
};
```

## Running

```bash
# Check files
npm run lint

# Fix auto-fixable issues
npm run
```

## With lint -- --fix TypeScript

ESLint automatically picks up TypeScript configuration. For custom TypeScript rules:

```javascript
// .eslintrc.cjs
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
  },
};
```

## Common Issues

| Issue             | Solution                        |
| ----------------- | ------------------------------- |
| Parsing errors    | Install `svelte-eslint-parser`  |
| TypeScript errors | Ensure `tsconfig.json` is valid |
| False positives   | Adjust rules in `.eslintrc.cjs` |

## References

- https://github.com/sveltejs/eslint-plugin-svelte
- https://typescript-eslint.io/
