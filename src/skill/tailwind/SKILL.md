---
name: tailwind
description: Use when styling with Tailwind CSS v4 - covers CSS-first configuration (@theme, @utility, @plugin), grid layouts, container queries, custom utilities, and framework integration (SvelteKit, Next.js, Vite, React)
---

# Tailwind CSS v4

Comprehensive Tailwind CSS skill covering v4's CSS-first configuration, utilities, grid layouts, container queries, and framework integration.

## 📋 Quick Summary

| Feature | Syntax | Description |
|---------|--------|-------------|
| **v4 Import** | `@import "tailwindcss"` | Replaces `@tailwind` directives |
| **Theme** | `@theme { --color-*: ... }` | CSS variables for customization |
| **Custom Utilities** | `@utility name { ... }` | Define utilities in CSS |
| **Plugins** | `@plugin "@tailwindcss/forms"` | Load plugins in CSS |
| **Container Queries** | `@container`, `@md:`, `@lg:` | Responsive to parent container |
| **Content Detection** | `@source "./src"` | Optional explicit paths |
| **Vite Plugin** | `@tailwindcss/vite` | Must come before framework plugin |

## 📑 Table of Contents

1. [Quick Summary](#📋-quick-summary)
2. [Sources](#📚-sources)
3. [When to Use This Skill](#💡-when-to-use-this-skill)
4. [Quick Reference](#🚀-quick-reference)
5. [Tailwind v4 Configuration](#🔧-tailwind-v4-configuration)
6. [Grid Layouts](#📐-grid-layouts)
7. [Container Queries](#📦-container-queries)
8. [Custom Utilities](#🎨-custom-utilities-utility)
9. [Custom Plugins](#🔌-custom-plugins-plugin)
10. [Variants](#🔀-variants)
11. [Best Practices](#🎯-best-practices)
12. [Common Patterns](#📱-common-patterns)
13. [Framework Integration](#🔧-framework-integration)
14. [Troubleshooting](#🚨-troubleshooting)
15. [Reference Documentation](#📚-reference-documentation)

---

## 📚 Sources

- **Documentation**: [tailwindcss.com/docs](https://tailwindcss.com/docs) (v4 focused)
- **GitHub Repository**: [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- **Migration Guide**: [tailwindcss.com/docs/upgrade-guide](https://tailwindcss.com/docs/upgrade-guide)

---

## 💡 When to Use This Skill

Use this skill when you need:

- **CSS-first configuration** - `@import "tailwindcss"`, `@theme`, `@utility`
- **Utility-first styling** - All utility classes for layout, spacing, colors
- **Grid layouts** - `grid-cols-*`, `grid-rows-*`, `col-*`, `row-*`
- **Container queries** - `@container`, `@min-*`, `@max-*`
- **Custom utilities** - `@utility` directive in v4
- **Custom plugins** - `@plugin` directive
- **Framework integration** - React, Vue, Svelte, Next.js, Vite
- **Migration from v3** - Converting config.js to CSS

---

## 🚀 Quick Reference

### 1. Flexbox Layout

```jsx
<div class="flex flex-col sm:flex-row items-center gap-4 p-6">
  <img class="size-12 shrink-0" src="/logo.svg" alt="Logo" />
  <div>
    <h3 class="text-xl font-bold">Title</h3>
    <p class="text-gray-500">Description</p>
  </div>
</div>
```

### 2. Grid Layout

```jsx
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="col-span-2 lg:col-span-1 bg-blue-50 p-4 rounded-lg">
    Wide item (2 cols mobile, 1 col desktop)
  </div>
  <div class="row-span-2 bg-green-50 p-4 rounded-lg">
    Tall item (spans 2 rows)
  </div>
  <div class="bg-white p-4 rounded-lg shadow">Item</div>
  <div class="bg-white p-4 rounded-lg shadow">Item</div>
  <div class="bg-white p-4 rounded-lg shadow">Item</div>
</div>
```

### 3. Tailwind v4 Import

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
  --spacing-128: 32rem;
}
```

### 4. Custom Utilities (@utility)

```css
@utility container-query {
  @apply relative;
}

@utility text-balance {
  text-wrap: balance;
}
```

### 5. Custom Plugin (@plugin)

```css
@import "tailwindcss";

@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/container-queries";
```

### 6. Container Queries

```jsx
<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-2 gap-4">
    <div class="p-4 bg-white rounded shadow">
      Adapts to container size
    </div>
  </div>
</div>
```

### 7. Dark Mode

```jsx
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">
  Content adapts to dark mode
</div>
```

### 8. Interactive States

```jsx
<button class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800
             focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed">
  Button
</button>
```

### 9. Arbitrary Values

```jsx
<div class="bg-[#1da1f2] w-[137px] h-[calc(100vh-80px)]
           grid-cols-[200px_minmax(900px,_1fr)_100px]">
  Custom values with brackets
</div>
```

### 10. Responsive Design

```jsx
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text sizing
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  Responsive grid columns
</div>
```

---

## 🔧 Tailwind v4 Configuration

### CSS-First Setup

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
    to { transform: rotate(360deg); }
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

### Vite Integration

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

```js
// +layout.svelte (SvelteKit)
import "../app.css";
```

```js
// globals.css (Next.js App Router)
@import "tailwindcss";
```

### Content Detection

v4 automatically detects content in common locations:

```css
@import "tailwindcss";

/* Optional: explicit content paths */
@source "./src/**/*.{html,js,svelte,ts,jsx,tsx}";
```

---

## 📐 Grid Layouts

### Basic Grid

```jsx
<div class="grid grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div class="grid grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Grid with Spans

```jsx
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-1">1 column</div>
  <div class="col-span-2">2 columns (wide)</div>
  <div class="col-span-1">1 column</div>

  <div class="col-span-4 full-width">4 columns (full)</div>
</div>
```

### Grid with Rows

```jsx
<div class="grid grid-cols-3 grid-rows-2 gap-4">
  <div class="col-span-2 row-span-2">Spans 2 rows</div>
  <div>Row 1, Col 3</div>
  <div>Row 2, Col 3</div>
</div>
```

### Responsive Grid

```jsx
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>Adapts to screen size</div>
  <!-- More items -->
</div>
```

### Grid Auto Flow

```jsx
/* Dense packing */
<div class="grid grid-cols-3 grid-flow-dense gap-4">
  <div class="col-span-2 row-span-2">Large</div>
  <div class="col-span-1">Small</div>
  <div class="col-span-1">Small</div>
</div>

/* Auto columns */
<div class="grid auto-cols-min gap-4">
  <div>Auto sized</div>
</div>
```

### Grid Gap

```jsx
<div class="grid grid-cols-2 gap-2">     /* gap-2 (0.5rem) */
<div class="grid grid-cols-2 gap-4">     /* gap-4 (1rem) */
<div class="grid grid-cols-2 gap-6">     /* gap-6 (1.5rem) */
<div class="grid grid-cols-2 gap-x-8 gap-y-4"> /* Different row/col gap */
```

---

## 📦 Container Queries

### Basic Usage

```jsx
<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-2">
    <div class="p-4 bg-white rounded shadow">
      Adapts to container width
    </div>
  </div>
</div>
```

### Container Query Classes

| Class | Description |
|-------|-------------|
| `@<breakpoint>:` | Apply at breakpoint |
| `@min-<width>` | Minimum container width |
| `@max-<width>` | Maximum container width |

### Breakpoint Mapping

| Container | Media Query |
|-----------|-------------|
| `@sm` | 640px |
| `@md` | 768px |
| `@lg` | 1024px |
| `@xl` | 1280px |
| `@2xl` | 1536px |

### Complete Example

```jsx
<div class="@container p-4">
  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
    <!-- Card adapts to parent container, not viewport -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="font-bold @lg:text-lg">Title</h3>
      <p class="text-gray-600 @lg:text-sm">Description</p>
    </div>
  </div>
</div>
```

### Custom Container Name

```jsx
<div class="@container/sidebar">
  <div class="@sidebar/md:flex">
    Responsive to sidebar width
  </div>
</div>
```

---

## 🎨 Custom Utilities (@utility)

### Basic Custom Utility

```css
@utility text-balance {
  text-wrap: balance;
}

@utility truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Custom Utility with Variants

```css
@utility btn {
  @apply px-4 py-2 rounded font-medium transition-colors;

  &:hover {
    @apply bg-blue-600;
  }

  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
```

### Responsive Custom Utility

```css
@utility section-pad {
  padding: 1rem;

  @sm {
    padding: 1.5rem;
  }

  @lg {
    padding: 2rem;
  }
}
```

---

## 🔌 Custom Plugins (@plugin)

### Using Official Plugins

```css
@import "tailwindcss";

@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/container-queries";
@plugin "@tailwindcss/aspect-ratio";
@plugin "@tailwindcss/line-clamp";
```

### Creating a Custom Plugin

```css
@import "tailwindcss";

@plugin "my-custom-plugin";
```

```js
// my-custom-plugin.js
module.exports = ({ addUtilities, addComponents, theme }) => {
  // Add utilities
  addUtilities({
    '.custom-util': {
      display: 'flex',
      gap: theme('spacing.4'),
    },
  });

  // Add components
  addComponents({
    '.custom-card': {
      padding: theme('spacing.4'),
      borderRadius: theme('borderRadius.lg'),
      boxShadow: theme('boxShadow.md'),
    },
  });
};
```

---

## 🔀 Variants

### State Variants

| Variant | Description |
|---------|-------------|
| `hover:` | Mouse hover |
| `focus:` | Keyboard focus |
| `active:` | Mouse/active press |
| `disabled:` | Disabled state |
| `first:` | First child |
| `last:` | Last child |
| `odd:` | Odd children |
| `even:` | Even children |
| `empty:` | Empty elements |

### Responsive Variants

| Variant | Min Width |
|---------|-----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

### Dark Mode

```jsx
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

### Parent/Peer Variants

```jsx
<!-- group variant -->
<div class="group">
  <button class="group-hover:bg-blue-600">Hover me</button>
  <p class="group-hover:text-blue-600">Shows on hover</p>
</div>

<!-- peer variant -->
<label>
  <input type="checkbox" class="peer sr-only" />
  <span class="peer-checked:bg-blue-500">Checkbox</span>
</label>
```

---

## 🎯 Best Practices

### Performance

1. **Use content detection** - v4 auto-detects content
2. **Configure content paths** explicitly only when needed
3. **Use JIT mode** - default in v4
4. **Avoid excessive nesting** - impacts performance

### Organization

1. **Keep utilities composable** - don't over-extract
2. **Use @apply for components** - not for everything
3. **Document custom patterns** - for team clarity
4. **Consistent spacing scale** - use design tokens

### v4 Migration

1. **Replace `@tailwind` with `@import "tailwindcss"`**
2. **Convert `tailwind.config.js` to CSS `@theme`**
3. **Remove PostCSS config** - not needed with Vite
4. **Update imports** - individual files no longer needed

---

## 📱 Common Patterns

### Card Component

```jsx
<div class="bg-white rounded-xl shadow-lg p-6">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600 mb-4">Card description</p>
  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
    Action
  </button>
</div>
```

### Navigation

```jsx
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <div class="flex items-center gap-4">
    <span class="text-xl font-bold">Logo</span>
    <div class="hidden md:flex gap-6">
      <a href="#" class="text-gray-600 hover:text-blue-600">Home</a>
      <a href="#" class="text-gray-600 hover:text-blue-600">About</a>
    </div>
  </div>
  <button class="md:hidden">
    <!-- Mobile menu button -->
  </button>
</nav>
```

### Responsive Form

```jsx
<form class="space-y-4 max-w-md mx-auto p-6">
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input
      type="email"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Password</label>
    <input
      type="password"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
    Sign In
  </button>
</form>
```

---

## 🔧 Framework Integration

### SvelteKit

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

### Next.js (App Router)

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

### React + Vite

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

---

## 🚨 Troubleshooting

### Classes Not Generated

```css
/* Check content paths */
@source "./src/**/*.{html,js,jsx,ts,tsx}";
```

### Custom Colors Not Working

```css
@theme {
  --color-brand: #3b82f6;
}

<div class="bg-brand">Now works!</div>
```

### Dark Mode Not Switching

```css
/* Ensure dark mode is configured */
@variant dark (&:where(.dark, .dark *));
```

### Container Queries Not Working

```css
/* Enable container queries */
@plugin "@tailwindcss/container-queries";

<div class="@container">
  <div class="@md:text-lg">Now responsive to container</div>
</div>
```

---

## 📚 Reference Documentation

See `references/` for additional documentation:

- **conflicts.md** - 235 undocumented internal APIs
- **backgrounds.md** - Background utilities
- **base_styles.md** - Preflight and base customization
- **borders.md** - Border and outline utilities
- **core_concepts.md** - Fundamental concepts

---

_Last updated: 2026-01-03 for Tailwind CSS v4_
