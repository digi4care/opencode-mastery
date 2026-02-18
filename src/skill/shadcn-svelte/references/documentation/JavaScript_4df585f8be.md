# JavaScript

**Source**: https://www.shadcn-svelte.com/docs/javascript

## Table of Contents

## Content

How to use shadcn-svelte with JavaScript.

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However, we provide a JavaScript version of the components as well. The JavaScript version is only available via the CLI.

To opt-out of TypeScript, you can use the typescript flag in your components.json file.

To configure import aliases, create a jsconfig.json file:

## Code Examples

### Example 1

```json
{
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://shadcn-svelte.com/registry"
}
```

### Example 2

```json
{
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://shadcn-svelte.com/registry"
}
```

### Example 3

```json
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Example 4

```json
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

## Sections
