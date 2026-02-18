# Shadcn-Svelte_Docs - Installation

**Pages:** 5

---

## Installation

**URL:** https://www.shadcn-svelte.com/docs/installation

**Contents:**

- Installation
- Guides
- Imports
- VSCode extension
- JetBrains IDEs extension

How to install dependencies and structure your app.

Unlike the original shadcn/ui for React, where the full components can exist in a single file, components in this port are split into multiple files. This is because Svelte doesn't support defining multiple components in a single file, so utilizing the CLI to add components will be the optimal approach.

The CLI will create a folder for each component, which will sometimes just contain a single Svelte file, and in other times, multiple files. Within each folder, there will be an index.ts file that exports the component(s), so you can import them from a single file.

For example, the Accordion component is split into four .svelte files:

They can then be imported from the accordion/index.ts file like so:

Regardless of the import approach you take, the components will be tree-shaken by Rollup, so you don't have to worry about unused components being bundled into your app.

Install the shadcn-svelte VSCode extension by @selemondev in Visual Studio Code to easily add Shadcn Svelte components to your project.

This extension offers a range of features:

Install the shadcn/ui Components Manager JetBrains extension by @WarningImHack3r in any JetBrains IDE (IntelliJ IDEA, WebStorm...) to easily manage shadcn components within your project.

This extension offers a range of features, including:

**Examples:**

Example 1 (sql):

```sql
import * as Accordion from '$lib/components/ui/accordion"
// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "$lib/components/ui/accordion"
```

Example 2 (sql):

```sql
import * as Accordion from '$lib/components/ui/accordion"
// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "$lib/components/ui/accordion"
```

---

## SvelteKit

**URL:** https://www.shadcn-svelte.com/docs/installation/sveltekit

**Contents:**

- SvelteKit
  - Create project
  - Setup path aliases
  - Run the CLI
  - Configure components.json
  - That's it

How to setup shadcn-svelte in a SvelteKit project.

Use the SvelteKit CLI to create a new project with TailwindCSS

If you are not using the default alias $lib, you'll need to update your svelte.config.js file to include those aliases.

You will be asked a few questions to configure components.json:

You can now start adding components to your project.

The command above will add the Button component to your project. You can then import it like this:

**Examples:**

Example 1 (unknown):

```unknown
pnpm dlx sv create my-app --add tailwindcss
```

Example 2 (unknown):

```unknown
pnpm dlx sv create my-app --add tailwindcss
```

Example 3 (unknown):

```unknown
npx sv create my-app --add tailwindcss
```

Example 4 (unknown):

```unknown
npx sv create my-app --add tailwindcss
```

---

## Vite

**URL:** https://www.shadcn-svelte.com/docs/installation/vite

**Contents:**

- Vite
  - Add TailwindCSS
  - Edit tsconfig.json file
  - Edit tsconfig.app.json file
  - Update vite.config.ts
  - Run the CLI
  - Configure components.json
  - That's it

How to setup shadcn-svelte in a Vite project.

Use the Svelte CLI to add Tailwind CSS to your project.

The current version of Vite splits TypeScript configuration into three files, two of which need to be edited. Add the baseUrl and paths properties to the compilerOptions section of the tsconfig.json and tsconfig.app.json files:

Add the following code to the tsconfig.app.json file to resolve paths, for your IDE:

Add the following code to the vite.config.ts so your app can resolve paths without error:

You will be asked a few questions to configure components.json:

You can now start adding components to your project.

The command above will add the Button component to your project. You can then import it like this:

**Examples:**

Example 1 (unknown):

```unknown
pnpm dlx sv add tailwindcss
```

Example 2 (unknown):

```unknown
pnpm dlx sv add tailwindcss
```

Example 3 (unknown):

```unknown
npx sv add tailwindcss
```

Example 4 (unknown):

```unknown
npx sv add tailwindcss
```

---

## Astro

**URL:** https://www.shadcn-svelte.com/docs/installation/astro

**Contents:**

- Astro
  - Create project
  - Configure your Astro project
  - Add Svelte to your project
  - Add TailwindCSS to your project
  - Import the global CSS file
  - Setup path aliases
  - Run the CLI
  - Configure components.json
  - That's it

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

**Examples:**

Example 1 (python):

```python
pnpm create astro@latest
```

Example 2 (python):

```python
pnpm create astro@latest
```

Example 3 (python):

```python
npm create astro@latest
```

Example 4 (python):

```python
npm create astro@latest
```

---

## Manual Installation

**URL:** https://www.shadcn-svelte.com/docs/installation/manual

**Contents:**

- Manual Installation
  - Add Tailwind
  - Add dependencies
  - Add icon library
  - Configure path aliases
  - Configure styles
  - Configure utils
  - Import styles to your app
  - That's it

How to setup shadcn-svelte manually.

Use the sv CLI to add Tailwind CSS to your project.

Add the following dependencies to your project:

Install @lucide/svelte:

If you are using SvelteKit and are not using the default alias $lib, you'll need to update your svelte.config.js file to include those aliases.

If you are not using SvelteKit, then you'll need to update your path aliases in your tsconfig.json and vite.config.ts.

Add the following to your global CSS file. You can learn more about using CSS variables for theming in the theming section.

Feel free to add or modify as needed to suit your project.

You'll want to create a cn helper to make it easier to conditionally add and merge Tailwind CSS classes.

Create src/routes/+layout.svelte and import the styles:

You can now start adding components to your project.

**Examples:**

Example 1 (unknown):

```unknown
pnpm dlx sv add tailwindcss
```

Example 2 (unknown):

```unknown
pnpm dlx sv add tailwindcss
```

Example 3 (unknown):

```unknown
npx sv add tailwindcss
```

Example 4 (unknown):

```unknown
npx sv add tailwindcss
```

---
