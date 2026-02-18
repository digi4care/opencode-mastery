# Astro

**Source**: https://www.shadcn-svelte.com/docs/installation/astro

## Table of Contents

- [Create project](#create-project)
- [Configure your Astro project](#configure-your-astro-project)
- [Add Svelte to your project](#add-svelte-to-your-project)
- [Add TailwindCSS to your project](#add-tailwindcss-to-your-project)
- [Import the global CSS file](#import-the-global-css-file)
- [Setup path aliases](#setup-path-aliases)
- [Run the CLI](#run-the-cli)
- [Configure components.json](#configure-components.json)
- [That's it](#that's-it)

## Content

How to setup shadcn-svelte in an Astro project.

Start by creating a new Astro project:

You will be asked a few questions to configure your project:

Install Svelte using the Astro CLI:

Answer Yes to all the question prompted by the CLI when installing Svelte.

Add Tailwind CSS using the Astro CLI:

Answer Yes to all the question prompted by the CLI when installing TailwindCSS.

Import the global.css file in the src/pages/index.astro file:

Add the following code to the tsconfig.json file to resolve paths:

If needed, adapt the path aliases to your specific needs (learn more about it).

Run the shadcn-svelte init command to setup your project:

You will be asked a few questions to configure components.json:

You can now start adding components to your project.

The command above will add the Button component to your project. You can then import it like this:

Remember to use the client directives inside .astro files when dealing with interactive components (learn more about it).

## Code Examples

### Example 1

```python
pnpm create astro@latest
```

### Example 2

```python
pnpm create astro@latest
```

### Example 3

```python
npm create astro@latest
```

### Example 4

```python
npm create astro@latest
```

### Example 5

```python
yarn create astro@latest
```

### Example 6

```python
yarn create astro@latest
```

### Example 7

```python
bun create astro@latest
```

### Example 8

```python
bun create astro@latest
```

### Example 9

```sql
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Initialize a new git repository? (optional)
Yes/No
```

### Example 10

```sql
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Initialize a new git repository? (optional)
Yes/No
```

### Example 11

```unknown
pnpm dlx astro add svelte
```

### Example 12

```unknown
pnpm dlx astro add svelte
```

### Example 13

```unknown
npx astro add svelte
```

### Example 14

```unknown
npx astro add svelte
```

### Example 15

```unknown
npx astro add svelte
```

### Example 16

```unknown
npx astro add svelte
```

### Example 17

```unknown
bun x astro add svelte
```

### Example 18

```unknown
bun x astro add svelte
```

### Example 19

```unknown
pnpm dlx astro add tailwind
```

### Example 20

```unknown
pnpm dlx astro add tailwind
```

### Example 21

```unknown
npx astro add tailwind
```

### Example 22

```unknown
npx astro add tailwind
```

### Example 23

```unknown
npx astro add tailwind
```

### Example 24

```unknown
npx astro add tailwind
```

### Example 25

```unknown
bun x astro add tailwind
```

### Example 26

```unknown
bun x astro add tailwind
```

### Example 27

```yaml
---
import "../styles/global.css";
---
```

### Example 28

```yaml
---
import "../styles/global.css";
---
```

### Example 29

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
    // ...
  }
}
```

### Example 30

```json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
    // ...
  }
}
```

### Example 31

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 32

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 33

```python
npx shadcn-svelte@latest init
```

### Example 34

```python
npx shadcn-svelte@latest init
```

### Example 35

```python
npx shadcn-svelte@latest init
```

### Example 36

```python
npx shadcn-svelte@latest init
```

### Example 37

```python
bun x shadcn-svelte@latest init
```

### Example 38

```python
bun x shadcn-svelte@latest init
```

### Example 39

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/styles/global.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 40

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/styles/global.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 41

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 42

```python
pnpm dlx shadcn-svelte@latest add button
```

### Example 43

```python
npx shadcn-svelte@latest add button
```

### Example 44

```python
npx shadcn-svelte@latest add button
```

### Example 45

```python
npx shadcn-svelte@latest add button
```

### Example 46

```python
npx shadcn-svelte@latest add button
```

### Example 47

```python
bun x shadcn-svelte@latest add button
```

### Example 48

```python
bun x shadcn-svelte@latest add button
```

### Example 49

```html
---
import { Button } from "$lib/components/ui/button/index.js";
---

<html lang="en">
  <head>
    <title>Astro</title>
  </head>
  <body>
    <button>Hello World</button>
  </body>
</html>
```

### Example 50

```html
---
import { Button } from "$lib/components/ui/button/index.js";
---

<html lang="en">
  <head>
    <title>Astro</title>
  </head>
  <body>
    <button>Hello World</button>
  </body>
</html>
```

## Sections

### Create project

### Configure your Astro project

### Add Svelte to your project

### Add TailwindCSS to your project

### Import the global CSS file

### Setup path aliases

### Run the CLI

### Configure components.json

### That's it
