# Best Practices

Tailwind CSS performance and organization best practices.

## Performance

1. **Use content detection** - v4 auto-detects content
2. **Configure content paths** explicitly only when needed
3. **Use JIT mode** - default in v4
4. **Avoid excessive nesting** - impacts performance

## Organization

1. **Keep utilities composable** - don't over-extract
2. **Use @apply for components** - not for everything
3. **Document custom patterns** - for team clarity
4. **Consistent spacing scale** - use design tokens

## v4 Migration Checklist

1. Replace `@tailwind` with `@import "tailwindcss"`
2. Convert `tailwind.config.js` to CSS `@theme`
3. Remove PostCSS config (not needed with Vite)
4. Update imports (individual files no longer needed)

## Arbitrary Values

```jsx
<div
  class="bg-[#1da1f2] w-[137px] h-[calc(100vh-80px)]
         grid-cols-[200px_minmax(900px,_1fr)_100px]"
>
  Custom values with brackets
</div>
```

## Responsive Design

```jsx
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text sizing
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  Responsive grid columns
</div>
```
