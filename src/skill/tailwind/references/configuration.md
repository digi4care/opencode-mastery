# Tailwind v4 Configuration

Complete guide to Tailwind CSS v4's CSS-first configuration.

## CSS-First Setup

```css
/* main.css or app.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-secondary: #64748b;

  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;

  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  /* Border Radius */
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;

  /* Animations */
  --animate-spin: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

/* Custom utilities */
@utility text-balance {
  text-wrap: balance;
}

@utility container-query {
  container-type: inline-size;
  container-name: cq;
}
```

## Vite Integration

```js
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    // Other plugins AFTER tailwindcss
  ],
});
```

## SvelteKit

```js
// +layout.svelte (SvelteKit)
import "../app.css";
```

## Next.js App Router

```js
// globals.css (Next.js App Router)
@import "tailwindcss";
```

## Content Detection

v4 automatically detects content in common locations:

```css
@import "tailwindcss";

/* Optional: explicit content paths */
@source "./src/**/*.{html,js,svelte,ts,jsx,tsx}";
```

## Migration from v3

1. Replace `@tailwind` with `@import "tailwindcss"`
2. Convert `tailwind.config.js` to CSS `@theme`
3. Remove PostCSS config (not needed with Vite)
4. Update imports (individual files no longer needed)
