# SvelteKit

**Source**: https://www.shadcn-svelte.com/docs/installation/sveltekit

## Table of Contents

- [Create project](#create-project)
- [Setup path aliases](#setup-path-aliases)
- [Run the CLI](#run-the-cli)
- [Configure components.json](#configure-components.json)
- [That's it](#that's-it)

## Content

How to setup shadcn-svelte in a SvelteKit project.

Use the SvelteKit CLI to create a new project with TailwindCSS

If you are not using the default alias $lib, you'll need to update your svelte.config.js file to include those aliases.

You will be asked a few questions to configure components.json:

You can now start adding components to your project.

The command above will add the Button component to your project. You can then import it like this:

## Code Examples

### Example 1

```unknown
pnpm dlx sv create my-app --add tailwindcss
```

### Example 2

```unknown
pnpm dlx sv create my-app --add tailwindcss
```

### Example 3

```unknown
npx sv create my-app --add tailwindcss
```

### Example 4

```unknown
npx sv create my-app --add tailwindcss
```

### Example 5

```unknown
npx sv create my-app --add tailwindcss
```

### Example 6

```unknown
npx sv create my-app --add tailwindcss
```

### Example 7

```unknown
bun x sv create my-app --add tailwindcss
```

### Example 8

```unknown
bun x sv create my-app --add tailwindcss
```

### Example 9

```javascript
const config = {
  // ... other config
  kit: {
    // ... other config
    alias: {
      "@/*": "./path/to/lib/*",
    },
  },
};
```

### Example 10

```javascript
const config = {
  // ... other config
  kit: {
    // ... other config
    alias: {
      "@/*": "./path/to/lib/*",
    },
  },
};
```

### Example 11

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 12

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 13

```python
npx shadcn-svelte@latest init
```

### Example 14

```python
npx shadcn-svelte@latest init
```

### Example 15

```python
npx shadcn-svelte@latest init
```

### Example 16

```python
npx shadcn-svelte@latest init
```

### Example 17

```python
bun x shadcn-svelte@latest init
```

### Example 18

```python
bun x shadcn-svelte@latest init
```

### Example 19

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 20

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 21

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 22

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 23

```python
npx shadcn-svelte@latest add button
```

### Example 24

```python
npx shadcn-svelte@latest add button
```

### Example 25

```python
npx shadcn-svelte@latest add button
```

### Example 26

```python
npx shadcn-svelte@latest add button
```

### Example 27

```python
bun x shadcn-svelte@latest add button
```

### Example 28

```python
bun x shadcn-svelte@latest add button
```

### Example 29

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

### Example 30

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Click me</Button>
```

## Sections

### Create project

### Setup path aliases

### Run the CLI

### Configure components.json

### That's it
