# Astro

**Source**: https://www.shadcn-svelte.com/docs/dark-mode/astro

## Table of Contents

- [Usage](#usage)
  - [Create an inline theme script](#create-an-inline-theme-script)
  - [Install mode-watcher](#install-mode-watcher)
  - [Add the ModeWatcher component](#add-the-modewatcher-component)
  - [Create a mode toggle](#create-a-mode-toggle)
    - [Light switch](#light-switch)
    - [Dropdown menu](#dropdown-menu)
  - [Add mode toggle to page](#add-mode-toggle-to-page)

## Content

Adding dark mode to your Astro site.

Just like in regular Svelte, we use the class strategy from Tailwind CSS to support dark mode toggling. See the Tailwind CSS documentation for more information.

How you add the dark class to the html element is up to you. In this guide, we'll take a look at enabling dark mode toggling with mode-watcher.

This script will, in part, keep and track the dark mode value in localStorage and prevent FUOC.

Import the ModeWatcher component and use it in your page with the client:load directive:

Create a mode toggle on your site to toggle between light and dark mode:

Add the mode toggle to the page (also with the client:load directive):

## Code Examples

### Example 1

```html
---
import "../styles/global.css";
---

<script is:inline>
  const isBrowser = typeof localStorage !== 'undefined';
  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

### Example 2

```html
---
import "../styles/global.css";
---

<script is:inline>
  const isBrowser = typeof localStorage !== 'undefined';
  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

### Example 3

```python
pnpm i mode-watcher@0.5.1
```

### Example 4

```python
pnpm i mode-watcher@0.5.1
```

### Example 5

```python
npm i mode-watcher@0.5.1
```

### Example 6

```python
npm i mode-watcher@0.5.1
```

### Example 7

```python
yarn install mode-watcher@0.5.1
```

### Example 8

```python
yarn install mode-watcher@0.5.1
```

### Example 9

```python
bun install mode-watcher@0.5.1
```

### Example 10

```python
bun install mode-watcher@0.5.1
```

### Example 11

```html
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
---

<!-- inline-script -->
<html lang="en">
  <body>
    <h1>Astro</h1>
    <ModeWatcher client:load />
  </body>
</html>
```

### Example 12

```html
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
---

<!-- inline-script -->
<html lang="en">
  <body>
    <h1>Astro</h1>
    <ModeWatcher client:load />
  </body>
</html>
```

### Example 13

```jsx
<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button onclick={toggleMode} variant="outline" size="icon">
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
```

### Example 14

```jsx
<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button onclick={toggleMode} variant="outline" size="icon">
  <SunIcon
    class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
  />
  <MoonIcon
    class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
  />
  <span class="sr-only">Toggle theme</span>
</Button>
```

### Example 15

```jsx
<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  import { resetMode, setMode } from "mode-watcher";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({ variant: "outline", size: "icon" })}
  >
    <SunIcon
      class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
    />
    <MoonIcon
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 16

```jsx
<script lang="ts">
  import SunIcon from "@lucide/svelte/icons/sun";
  import MoonIcon from "@lucide/svelte/icons/moon";

  import { resetMode, setMode } from "mode-watcher";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({ variant: "outline", size: "icon" })}
  >
    <SunIcon
      class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
    />
    <MoonIcon
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item onclick={() => setMode("light")}>Light</DropdownMenu.Item
    >
    <DropdownMenu.Item onclick={() => setMode("dark")}>Dark</DropdownMenu.Item>
    <DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 17

```html
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
import ModeToggle from "$lib/components/mode-toggle.svelte";
---

<!-- inline-script -->
<html lang="en">
  <body>
    <h1>Astro</h1>
    <ModeWatcher client:load />
    <ModeToggle client:load />
  </body>
</html>
```

### Example 18

```html
---
import "../styles/global.css";
import { ModeWatcher } from "mode-watcher";
import ModeToggle from "$lib/components/mode-toggle.svelte";
---

<!-- inline-script -->
<html lang="en">
  <body>
    <h1>Astro</h1>
    <ModeWatcher client:load />
    <ModeToggle client:load />
  </body>
</html>
```

## Sections

## Usage

### Create an inline theme script

### Install mode-watcher

### Add the ModeWatcher component

### Create a mode toggle

#### Light switch

#### Dropdown menu

### Add mode toggle to page
