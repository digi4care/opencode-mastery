# Svelte 5

**Source**: https://www.shadcn-svelte.com/docs/migration/svelte-5

## Table of Contents

- [Svelte 4 to Svelte 5](#svelte-4-to-svelte-5)
- [Prerequisites](#prerequisites)
- [Update Configs](#update-configs)
  - [Update components.json](#update-components.json)
  - [Update tailwind.config.js](#update-tailwind.config.js)
  - [Update utils.ts](#update-utils.ts)
- [Upgrade Components](#upgrade-components)
  - [Alias Dependencies (optional)](#alias-dependencies-optional)
  - [Update Dependencies](#update-dependencies)
  - [Start Migrating Components](#start-migrating-components)
- [Remove Unused Dependencies](#remove-unused-dependencies)
  - [cmdk-sv](#cmdk-sv)
  - [svelte-headless-table](#svelte-headless-table)
  - [svelte-radix](#svelte-radix)
  - [lucide-svelte](#lucide-svelte)
- [Next Steps](#next-steps)

## Content

How to migrate from Svelte 4 and Tailwind 3 to Svelte 5.

Note: With Svelte 5 comes significant changes to this project, along with the headless UI library used bits-ui. This guide is specifically focused on migrating the shadcn-svelte portions and does not cover the migration of bits-ui. See Bits UI's migration guide for more information.

This first guide will take your project from Svelte 4 with Tailwind 3 to Svelte 5 and Tailwind 3.

Once you've completed this guide and you're comfortable everything is working, you can move on to the next guide to migrate to Tailwind 4.

The components.json, utils, and the global CSS file have changed for Svelte 5.

Add the registry to the root object, and add hooks, ui, and lib keys under aliases.

Add tailwindcss-animate.

Add the tailwindcss-animate plugin, sidebar colors, and animations config.

Note: You may not want to do this step until after you've updated your components, as some components may rely on the now removed flyAndScale function.

utils.ts now only exports the cn function and a few utility types.

If you plan to slowly migrate components, it's recommended to alias the old versions of the major dependencies, like bits-ui, in your package.json file so that you can use both versions of the library in your project while you migrate.

You'll then want to replace all the imports used in your project to bits-ui-old.

You can do the same for any of the other dependencies that you're using in your project.

The following dependencies have been updated to support Svelte 5:

You can update your dependencies by running the following command:

Now you're ready to begin updating your components to their new versions. The CLI doesn't actually update your components, it simply replaces them with the new versions, so be sure to commit your changes before running the CLI.

Now you can run the add command to start migrating your components.

Review the diff to see what was updated and make any necessary adjustments. Rinse and repeat for each component you want to migrate.

Once you've updated all your components, you can remove the old dependencies from your package.json file.

cmdk-sv has been replaced with Bits UI's Command component.

svelte-headless-table has been replaced with @tanstack/table-core.

svelte-radix has been replaced with @lucide/svelte.

lucide-svelte has been replaced with @lucide/svelte.

Once you've completed this guide and you're comfortable everything is working as expected, you can move on to the Tailwind 4 Guide.

## Code Examples

### Example 1

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils",
+   "ui": "$lib/components/ui",
+   "hooks": "$lib/hooks",
+   "lib": "$lib"
  },
  "typescript": true,
+ "registry": "https://shadcn-svelte.com/registry"
}
```

### Example 2

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils",
+   "ui": "$lib/components/ui",
+   "hooks": "$lib/hooks",
+   "lib": "$lib"
  },
  "typescript": true,
+ "registry": "https://shadcn-svelte.com/registry"
}
```

### Example 3

```unknown
pnpm i tailwindcss-animate
```

### Example 4

```unknown
pnpm i tailwindcss-animate
```

### Example 5

```unknown
npm i tailwindcss-animate
```

### Example 6

```unknown
npm i tailwindcss-animate
```

### Example 7

```unknown
yarn install tailwindcss-animate
```

### Example 8

```unknown
yarn install tailwindcss-animate
```

### Example 9

```unknown
bun install tailwindcss-animate
```

### Example 10

```unknown
bun install tailwindcss-animate
```

### Example 11

```typescript
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      // unchanged ...
    },
    extend: {
      colors: {
        // unchanged ...
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        // unchanged ...
      },
      fontFamily: {
        // unchanged ...
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--bits-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--bits-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

### Example 12

```typescript
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      // unchanged ...
    },
    extend: {
      colors: {
        // unchanged ...
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        // unchanged ...
      },
      fontFamily: {
        // unchanged ...
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--bits-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--bits-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
```

### Example 13

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
```

### Example 14

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & {
  ref?: U | null;
};
```

### Example 15

```json
{
  "devDependencies": {
-	"bits-ui": "^0.22.0",
+   "bits-ui-old": "npm:bits-ui@0.22.0",
  }
}
```

### Example 16

```json
{
  "devDependencies": {
-	"bits-ui": "^0.22.0",
+   "bits-ui-old": "npm:bits-ui@0.22.0",
  }
}
```

### Example 17

```jsx
<script lang="ts">
-  import { Dialog as DialogPrimitive } from "bits-ui";
+  import { Dialog as DialogPrimitive } from "bits-ui-old";
</script>
```

### Example 18

```jsx
<script lang="ts">
-  import { Dialog as DialogPrimitive } from "bits-ui";
+  import { Dialog as DialogPrimitive } from "bits-ui-old";
</script>
```

### Example 19

```python
pnpm i bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 20

```python
pnpm i bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 21

```python
npm i bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 22

```python
npm i bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 23

```python
yarn install bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 24

```python
yarn install bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 25

```python
bun install bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 26

```python
bun install bits-ui@latest svelte-sonner@latest @lucide/svelte@latest paneforge@next vaul-svelte@next mode-watcher@latest -D
```

### Example 27

```unknown
git add .
git commit -m 'before migration'
```

### Example 28

```unknown
git add .
git commit -m 'before migration'
```

### Example 29

```python
pnpm dlx shadcn-svelte@latest add dialog --overwrite
```

### Example 30

```python
pnpm dlx shadcn-svelte@latest add dialog --overwrite
```

### Example 31

```python
npx shadcn-svelte@latest add dialog --overwrite
```

### Example 32

```python
npx shadcn-svelte@latest add dialog --overwrite
```

### Example 33

```python
npx shadcn-svelte@latest add dialog --overwrite
```

### Example 34

```python
npx shadcn-svelte@latest add dialog --overwrite
```

### Example 35

```python
bun x shadcn-svelte@latest add dialog --overwrite
```

### Example 36

```python
bun x shadcn-svelte@latest add dialog --overwrite
```

### Example 37

```unknown
pnpm remove cmdk-sv
```

### Example 38

```unknown
pnpm remove cmdk-sv
```

### Example 39

```unknown
npm uninstall cmdk-sv
```

### Example 40

```unknown
npm uninstall cmdk-sv
```

### Example 41

```unknown
yarn remove cmdk-sv
```

### Example 42

```unknown
yarn remove cmdk-sv
```

### Example 43

```unknown
bun remove cmdk-sv
```

### Example 44

```unknown
bun remove cmdk-sv
```

### Example 45

```unknown
pnpm remove svelte-headless-table
```

### Example 46

```unknown
pnpm remove svelte-headless-table
```

### Example 47

```unknown
npm uninstall svelte-headless-table
```

### Example 48

```unknown
npm uninstall svelte-headless-table
```

### Example 49

```unknown
yarn remove svelte-headless-table
```

### Example 50

```unknown
yarn remove svelte-headless-table
```

### Example 51

```unknown
bun remove svelte-headless-table
```

### Example 52

```unknown
bun remove svelte-headless-table
```

### Example 53

```unknown
pnpm remove svelte-radix
```

### Example 54

```unknown
pnpm remove svelte-radix
```

### Example 55

```unknown
npm uninstall svelte-radix
```

### Example 56

```unknown
npm uninstall svelte-radix
```

### Example 57

```unknown
yarn remove svelte-radix
```

### Example 58

```unknown
yarn remove svelte-radix
```

### Example 59

```unknown
bun remove svelte-radix
```

### Example 60

```unknown
bun remove svelte-radix
```

### Example 61

```unknown
pnpm remove lucide-svelte
```

### Example 62

```unknown
pnpm remove lucide-svelte
```

### Example 63

```unknown
npm uninstall lucide-svelte
```

### Example 64

```unknown
npm uninstall lucide-svelte
```

### Example 65

```unknown
yarn remove lucide-svelte
```

### Example 66

```unknown
yarn remove lucide-svelte
```

### Example 67

```unknown
bun remove lucide-svelte
```

### Example 68

```unknown
bun remove lucide-svelte
```

## Sections

## Svelte 4 to Svelte 5

## Prerequisites

## Update Configs

### Update components.json

### Update tailwind.config.js

### Update utils.ts

## Upgrade Components

### Alias Dependencies (optional)

### Update Dependencies

### Start Migrating Components

## Remove Unused Dependencies

### cmdk-sv

### svelte-headless-table

### svelte-radix

### lucide-svelte

## Next Steps
