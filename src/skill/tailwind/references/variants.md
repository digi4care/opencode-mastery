# Variants

All available variants in Tailwind CSS.

## State Variants

| Variant     | Description        |
| ----------- | ------------------ |
| `hover:`    | Mouse hover        |
| `focus:`    | Keyboard focus     |
| `active:`   | Mouse/active press |
| `disabled:` | Disabled state     |
| `first:`    | First child        |
| `last:`     | Last child         |
| `odd:`      | Odd children       |
| `even:`     | Even children      |
| `empty:`    | Empty elements     |

## Responsive Variants

| Variant | Min Width |
| ------- | --------- |
| `sm:`   | 640px     |
| `md:`   | 768px     |
| `lg:`   | 1024px    |
| `xl:`   | 1280px    |
| `2xl:`  | 1536px    |

## Dark Mode

```jsx
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

## Parent/Peer Variants

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

## Interactive States

```jsx
<button
  class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
         disabled:opacity-50 disabled:cursor-not-allowed"
>
  Button
</button>
```
