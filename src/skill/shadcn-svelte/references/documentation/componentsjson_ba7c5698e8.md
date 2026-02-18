# components.json

**Source**: https://www.shadcn-svelte.com/docs/components-json

## Table of Contents

- [$schema](#$schema)
- [tailwind](#tailwind)
  - [tailwind.css](#tailwind.css)
  - [tailwind.baseColor](#tailwind.basecolor)
- [aliases](#aliases)
  - [aliases.lib](#aliases.lib)
  - [aliases.utils](#aliases.utils)
  - [aliases.components](#aliases.components)
  - [aliases.ui](#aliases.ui)
  - [aliases.hooks](#aliases.hooks)
- [Typescript](#typescript)
- [Registry](#registry)

## Content

Configuration for your project.

The components.json file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

Note: The components.json file is optional and only required if you're using the CLI to add components to your project. If you're using the copy and paste method, you don't need this file.

You can create a components.json file in your project by running the following command:

See the CLI section for more information.

You can see the JSON Schema for components.json here.

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the installation section for how to set up Tailwind CSS.

Path to the CSS file that imports Tailwind CSS into your project.

This is used to generate the default color palette for your components. This cannot be changed after initialization.

The CLI uses these values and the alias config from your svelte.config.js file to place generated components in the correct location.

Path aliases have to be set up in your svelte.config.js file.

Import alias for your library, which is typically where you store your components, utils, hooks, etc.

Import alias for your utility functions.

Import alias for your components.

Import alias for your UI components.

Import alias for your hooks, which in Svelte 5 are reactive functions/classes whose files typically end in .svelte.ts or .svelte.js.

Typescript can be enabled or disabled.

You can also specify a path to your own custom Typescript config file if it has a different name from tsconfig.json or jsconfig.json, or if it is located in a different directory:

The registry URL tells the CLI where to fetch the shadcn-svelte components/registry from. You can pin this to a specific preview release or your own fork of the registry.

## Code Examples

### Example 1

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 2

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 3

```python
npx shadcn-svelte@latest init
```

### Example 4

```python
npx shadcn-svelte@latest init
```

### Example 5

```python
npx shadcn-svelte@latest init
```

### Example 6

```python
npx shadcn-svelte@latest init
```

### Example 7

```python
bun x shadcn-svelte@latest init
```

### Example 8

```python
bun x shadcn-svelte@latest init
```

### Example 9

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json"
}
```

### Example 10

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json"
}
```

### Example 11

```json
{
  "tailwind": {
    "css": "src/app.{p,post}css"
  }
}
```

### Example 12

```json
{
  "tailwind": {
    "css": "src/app.{p,post}css"
  }
}
```

### Example 13

```json
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

### Example 14

```json
{
  "tailwind": {
    "baseColor": "gray" | "neutral" | "slate" | "stone" | "zinc"
  }
}
```

### Example 15

```json
{
  "aliases": {
    "lib": "$lib"
  }
}
```

### Example 16

```json
{
  "aliases": {
    "lib": "$lib"
  }
}
```

### Example 17

```json
{
  "aliases": {
    "utils": "$lib/utils"
  }
}
```

### Example 18

```json
{
  "aliases": {
    "utils": "$lib/utils"
  }
}
```

### Example 19

```json
{
  "aliases": {
    "components": "$lib/components"
  }
}
```

### Example 20

```json
{
  "aliases": {
    "components": "$lib/components"
  }
}
```

### Example 21

```json
{
  "aliases": {
    "ui": "$lib/components/ui"
  }
}
```

### Example 22

```json
{
  "aliases": {
    "ui": "$lib/components/ui"
  }
}
```

### Example 23

```json
{
  "aliases": {
    "hooks": "$lib/hooks"
  }
}
```

### Example 24

```json
{
  "aliases": {
    "hooks": "$lib/hooks"
  }
}
```

### Example 25

```json
{
  "typescript": true | false
}
```

### Example 26

```json
{
  "typescript": true | false
}
```

### Example 27

```json
{
  "typescript": {
    "config": "path/to/tsconfig.custom.json"
  }
}
```

### Example 28

```json
{
  "typescript": {
    "config": "path/to/tsconfig.custom.json"
  }
}
```

### Example 29

```json
{
  "registry": "https://shadcn-svelte.com/registry"
}
```

### Example 30

```json
{
  "registry": "https://shadcn-svelte.com/registry"
}
```

## Sections

## $schema

## tailwind

### tailwind.css

### tailwind.baseColor

## aliases

### aliases.lib

### aliases.utils

### aliases.components

### aliases.ui

### aliases.hooks

## Typescript

## Registry
