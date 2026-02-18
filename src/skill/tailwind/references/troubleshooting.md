# Troubleshooting

Common Tailwind CSS issues and solutions.

## Classes Not Generated

```css
/* Check content paths */
@source "./src/**/*.{html,js,jsx,ts,tsx}";
```

## Custom Colors Not Working

```css
@theme {
  --color-brand: #3b82f6;
}

<div class="bg-brand">Now works!</div>
```

## Dark Mode Not Switching

```css
/* Ensure dark mode is configured */
@variant dark (&:where(.dark, .dark *));
```

## Container Queries Not Working

```css
/* Enable container queries */
@plugin "@tailwindcss/container-queries";

<div class="@container">
  <div class="@md:text-lg">Now responsive to container</div>
</div>
```

## Vite Plugin Order

Make sure `@tailwindcss/vite` comes BEFORE framework plugins:

```js
// vite.config.js - CORRECT
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],  // tailwindcss first!
});

// vite.config.js - WRONG
export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],  // framework first - will fail
});
```

## Migration Issues

### From v3 to v4

1. Replace `@tailwind css/components/utilities` with `@import "tailwindcss"`
2. Move `tailwind.config.js` content to `@theme { }` in CSS
3. Remove PostCSS config (use Vite plugin instead)
4. Update `@apply` usage (still supported but prefers `@utility`)
