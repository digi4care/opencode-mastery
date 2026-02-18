# Mobile UX

Design patterns optimized for touch and mobile devices.

## Touch Targets

**Minimum size: 44x44px (Apple), 48x48px (Android)**

```html
<!-- Bad: Too small -->
<button class="p-1">
  <Icon class="w-4 h-4" />
</button>

<!-- Good: Meets minimum -->
<button class="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center">
  <Icon class="w-5 h-5" />
</button>
```

## Minimum Spacing

**8px gap between touch targets**

```html
<!-- Bad: Too close -->
<div class="flex gap-1">
  <button>Action 1</button>
  <button>Action 2</button>
</div>

<!-- Good: Adequate spacing -->
<div class="flex gap-2">
  <button class="min-h-[44px]">Action 1</button>
  <button class="min-h-[44px]">Action 2</button>
</div>
```

## Thumb Zone

Place primary actions within easy thumb reach:

```
┌─────────────────┐
│    Easy         │  ← Top: Hard to reach
│  ┌───────────┐  │
│  │   Easy    │  │  ← Center: Moderate
│  │ ┌───────┐ │  │
│  │ │ Easy  │ │  │  ← Bottom: Easy (thumb zone)
│  └─┴───────┴─┘  │
└─────────────────┘
```

### Bottom Navigation

```html
<nav class="fixed bottom-0 left-0 right-0 bg-background border-t">
  <div class="flex justify-around py-2">
    <button class="flex flex-col items-center p-2 min-h-[44px]">
      <HomeIcon />
      <span class="text-xs mt-1">Home</span>
    </button>
    <!-- More nav items -->
  </div>
</nav>
```

### Bottom Sheet Actions

```html
<!-- Primary action at bottom -->
<div class="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
  <button class="w-full min-h-[44px]">Continue</button>
</div>
```

## Viewport Height

**Never use `100vh` on mobile** - URL bar causes issues:

```css
/* Bad: Content hidden behind URL bar */
.container {
  height: 100vh;
}

/* Good: Dynamic viewport height */
.container {
  height: 100dvh; /* Modern browsers */
  height: -webkit-fill-available; /* Safari fallback */
}
```

## Responsive Breakpoints

Test at these widths:

| Device        | Width  | Use Case          |
| ------------- | ------ | ----------------- |
| Small mobile  | 320px  | iPhone SE         |
| Mobile        | 375px  | iPhone 14         |
| Large mobile  | 428px  | iPhone 14 Pro Max |
| Tablet        | 768px  | iPad              |
| Desktop       | 1024px | Small laptop      |
| Large desktop | 1440px | Standard monitor  |

## Mobile-First CSS

```html
<!-- Base styles for mobile, enhance up -->
<div
  class="
  /* Mobile default */
  flex flex-col gap-4 p-4
  /* Tablet+ */
  md:flex-row md:gap-6 md:p-6
  /* Desktop */
  lg:gap-8 lg:p-8
"
></div>
```

## Font Size

**Minimum 16px for body text** - Prevents iOS zoom on focus:

```css
/* Bad: iOS will zoom on focus */
input {
  font-size: 14px;
}

/* Good: No zoom */
input {
  font-size: 16px;
}
```

## Viewport Meta Tag

```html
<!-- Required for responsive design -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Gestures

| Gesture         | Use Case                |
| --------------- | ----------------------- |
| Tap             | Select, activate        |
| Long press      | Context menu, selection |
| Swipe           | Navigate, dismiss       |
| Pinch           | Zoom                    |
| Pull to refresh | Refresh content         |

### Swipe Indicator

```html
<div class="relative overflow-hidden">
  <div class="transition-transform" style="transform: translateX({swipeX}px)">
    {content}
  </div>
  {#if Math.abs(swipeX) > 50}
  <div class="absolute inset-y-0 right-0 flex items-center bg-red-500 px-4">
    <TrashIcon class="text-white" />
  </div>
  {/if}
</div>
```
