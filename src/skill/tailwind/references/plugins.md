# Custom Plugins (@plugin)

Using and creating plugins in Tailwind CSS v4.

## Using Official Plugins

```css
@import "tailwindcss";

@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
@plugin "@tailwindcss/container-queries";
@plugin "@tailwindcss/aspect-ratio";
@plugin "@tailwindcss/line-clamp";
```

## Creating a Custom Plugin

```css
@import "tailwindcss";

@plugin "my-custom-plugin";
```

```js
// my-custom-plugin.js
module.exports = ({ addUtilities, addComponents, theme }) => {
  // Add utilities
  addUtilities({
    ".custom-util": {
      display: "flex",
      gap: theme("spacing.4"),
    },
  });

  // Add components
  addComponents({
    ".custom-card": {
      padding: theme("spacing.4"),
      borderRadius: theme("borderRadius.lg"),
      boxShadow: theme("boxShadow.md"),
    },
  });
};
```

## Popular Plugins

| Plugin                         | Description       |
| ------------------------------ | ----------------- |
| @tailwindcss/forms             | Form styling      |
| @tailwindcss/typography        | Prose styling     |
| @tailwindcss/container-queries | Container queries |
| @tailwindcss/aspect-ratio      | Aspect ratio      |
| @tailwindcss/line-clamp        | Line clamping     |
