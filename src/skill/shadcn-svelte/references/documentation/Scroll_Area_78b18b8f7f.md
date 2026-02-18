# Scroll Area

**Source**: https://www.shadcn-svelte.com/docs/components/scroll-area

## Table of Contents

    - [Tags](#tags)

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Horizontal Scrolling](#horizontal-scrolling)

## Content

Augments native scroll functionality for custom, cross-browser styling.

Copy and paste the following code into your project.

Set the orientation prop to "horizontal" to enable horizontal scrolling.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
</script>

<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
    {#each tags as tag (tag)}
      <div class="text-sm">
        {tag}
      </div>
      <Separator class="my-2" />
    {/each}
  </div>
</ScrollArea>
```

### Example 2

```jsx
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
</script>

<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
    {#each tags as tag (tag)}
      <div class="text-sm">
        {tag}
      </div>
      <Separator class="my-2" />
    {/each}
  </div>
</ScrollArea>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add scroll-area
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add scroll-area
```

### Example 5

```python
npx shadcn-svelte@latest add scroll-area
```

### Example 6

```python
npx shadcn-svelte@latest add scroll-area
```

### Example 7

```python
npx shadcn-svelte@latest add scroll-area
```

### Example 8

```python
npx shadcn-svelte@latest add scroll-area
```

### Example 9

```python
bun x shadcn-svelte@latest add scroll-area
```

### Example 10

```python
bun x shadcn-svelte@latest add scroll-area
```

### Example 11

```unknown
pnpm i bits-ui -D
```

### Example 12

```unknown
pnpm i bits-ui -D
```

### Example 13

```unknown
npm i bits-ui -D
```

### Example 14

```unknown
npm i bits-ui -D
```

### Example 15

```unknown
yarn install bits-ui -D
```

### Example 16

```unknown
yarn install bits-ui -D
```

### Example 17

```unknown
bun install bits-ui -D
```

### Example 18

```unknown
bun install bits-ui -D
```

### Example 19

```sql
import Scrollbar from "./scroll-area-scrollbar.svelte";
import Root from "./scroll-area.svelte";

export {
  Root,
  Scrollbar,
  //,
  Root as ScrollArea,
  Scrollbar as ScrollAreaScrollbar,
};
```

### Example 20

```sql
import Scrollbar from "./scroll-area-scrollbar.svelte";
import Root from "./scroll-area.svelte";

export {
  Root,
  Scrollbar,
  //,
  Root as ScrollArea,
  Scrollbar as ScrollAreaScrollbar,
};
```

### Example 21

```jsx
<script lang="ts">import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {ScrollArea} from "$lib/components/ui/scroll-area/index.js";</script>
```

### Example 23

```jsx
<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
  place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but
  he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that
  the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started
  laughing, they couldn't stop.
</ScrollArea>
```

### Example 24

```jsx
<ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
  Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
  place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but
  he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that
  the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started
  laughing, they couldn't stop.
</ScrollArea>
```

### Example 25

```typescript
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  type Artwork = {
    artist: string;
    art: string;
  };

  const works: Artwork[] = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
    }
  ];
</script>

<ScrollArea
  class="w-96 rounded-md border whitespace-nowrap"
  orientation="horizontal"
>
  <div class="flex w-max space-x-4 p-4">
    {#each works as artwork (artwork.artist)}
      <figure class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            src={artwork.art}
            alt="Photo by {artwork.artist}"
            class="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
        <figcaption class="text-muted-foreground pt-2 text-xs">
          Photo by
          <span class="text-foreground font-semibold">
            {artwork.artist}
          </span>
        </figcaption>
      </figure>
    {/each}
  </div>
</ScrollArea>
```

### Example 26

```typescript
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  type Artwork = {
    artist: string;
    art: string;
  };

  const works: Artwork[] = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
    }
  ];
</script>

<ScrollArea
  class="w-96 rounded-md border whitespace-nowrap"
  orientation="horizontal"
>
  <div class="flex w-max space-x-4 p-4">
    {#each works as artwork (artwork.artist)}
      <figure class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            src={artwork.art}
            alt="Photo by {artwork.artist}"
            class="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
        <figcaption class="text-muted-foreground pt-2 text-xs">
          Photo by
          <span class="text-foreground font-semibold">
            {artwork.artist}
          </span>
        </figcaption>
      </figure>
    {/each}
  </div>
</ScrollArea>
```

## Sections

#### Tags

## Installation

## Usage

## Examples

### Horizontal Scrolling
