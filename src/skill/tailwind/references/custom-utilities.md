# Custom Utilities (@utility)

Creating custom utilities in Tailwind CSS v4.

## Basic Custom Utility

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

## Custom Utility with Variants

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

## Responsive Custom Utility

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

## With Custom Properties

```css
@utility glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```
