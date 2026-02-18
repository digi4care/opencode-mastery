# Vite

**Source**: https://www.shadcn-svelte.com/docs/installation/vite

## Table of Contents

- [Add TailwindCSS](#add-tailwindcss)
- [Edit tsconfig.json file](#edit-tsconfig.json-file)
- [Edit tsconfig.app.json file](#edit-tsconfig.app.json-file)
- [Update vite.config.ts](#update-vite.config.ts)
- [Run the CLI](#run-the-cli)
- [Configure components.json](#configure-components.json)
- [That's it](#that's-it)

## Content

How to setup shadcn-svelte in a Vite project.

Use the Svelte CLI to add Tailwind CSS to your project.

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited. Add the baseUrl and paths properties to the compilerOptions section of the tsconfig.json and tsconfig.app.json files:

Add the following code to the tsconfig.app.json file to resolve paths, for your IDE:

Add the following code to the vite.config.ts so your app can resolve paths without error:

You will be asked a few questions to configure components.json:

You can now start adding components to your project.

The command above will add the Button component to your project. You can then import it like this:

## Code Examples

### Example 1

```unknown
pnpm dlx sv add tailwindcss
```

### Example 2

```unknown
pnpm dlx sv add tailwindcss
```

### Example 3

```unknown
npx sv add tailwindcss
```

### Example 4

```unknown
npx sv add tailwindcss
```

### Example 5

```unknown
npx sv add tailwindcss
```

### Example 6

```unknown
npx sv add tailwindcss
```

### Example 7

```unknown
bun x sv add tailwindcss
```

### Example 8

```unknown
bun x sv add tailwindcss
```

### Example 9

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Example 10

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Example 11

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Example 12

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

### Example 13

```sql
import path from "path";

export default defineConfig({
  // ... other options
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
```

### Example 14

```sql
import path from "path";

export default defineConfig({
  // ... other options
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
```

### Example 15

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 16

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 17

```python
npx shadcn-svelte@latest init
```

### Example 18

```python
npx shadcn-svelte@latest init
```

### Example 19

```python
npx shadcn-svelte@latest init
```

### Example 20

```python
npx shadcn-svelte@latest init
```

### Example 21

```python
bun x shadcn-svelte@latest init
```

### Example 22

```python
bun x shadcn-svelte@latest init
```

### Example 23

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 24

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 25

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 26

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 27

```python
npx shadcn-svelte@latest add button
```

### Example 28

```python
npx shadcn-svelte@latest add button
```

### Example 29

```python
npx shadcn-svelte@latest add button
```

### Example 30

```python
npx shadcn-svelte@latest add button
```

### Example 31

```python
bun x shadcn-svelte@latest add button
```

### Example 32

```python
bun x shadcn-svelte@latest add button
```

### Example 33

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

### Example 34

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

## Sections

### Add TailwindCSS

### Edit tsconfig.json file

### Edit tsconfig.app.json file

### Update vite.config.ts

### Run the CLI

### Configure components.json

### That's it
