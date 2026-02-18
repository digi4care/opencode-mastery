# Container Queries

Tailwind CSS v4 container queries for component-responsive layouts.

## Basic Usage

```jsx
<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-2">
    <div class="p-4 bg-white rounded shadow">Adapts to container width</div>
  </div>
</div>
```

## Container Query Classes

| Class            | Description             |
| ---------------- | ----------------------- |
| `@<breakpoint>:` | Apply at breakpoint     |
| `@min-<width>`   | Minimum container width |
| `@max-<width>`   | Maximum container width |

## Breakpoint Mapping

| Container | Media Query |
| --------- | ----------- |
| `@sm`     | 640px       |
| `@md`     | 768px       |
| `@lg`     | 1024px      |
| `@xl`     | 1280px      |
| `@2xl`    | 1536px      |

## Complete Example

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

## Custom Container Name

```jsx
<div class="@container/sidebar">
  <div class="@sidebar/md:flex">Responsive to sidebar width</div>
</div>
```

## Enabling Container Queries

```css
@import "tailwindcss";
@plugin "@tailwindcss/container-queries";
```
