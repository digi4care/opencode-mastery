# Framework Integration

Tailwind CSS v4 integration with different frameworks.

## SvelteKit

```bash
npm install -D @tailwindcss/vite
```

```js
// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

```css
/* src/app.css */
@import "tailwindcss";
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css";
</script>

<slot />
```

## Next.js (App Router)

```bash
npm install -D @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

```css
/* app/globals.css */
@import "tailwindcss";
```

## React + Vite

```bash
npm install -D @tailwindcss/vite
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

```css
/* src/index.css */
@import "tailwindcss";
```

## Vue + Vite

```bash
npm install -D @tailwindcss/vite
```

```js
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
```
