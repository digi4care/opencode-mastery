# Pagination

**Source**: https://www.shadcn-svelte.com/docs/components/pagination

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Pagination with page navigation, next and previous links.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
</script>

<Pagination.Root count={30} page={2}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
</script>

<Pagination.Root count={30} page={2}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add pagination
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add pagination
```

### Example 5

```python
npx shadcn-svelte@latest add pagination
```

### Example 6

```python
npx shadcn-svelte@latest add pagination
```

### Example 7

```python
npx shadcn-svelte@latest add pagination
```

### Example 8

```python
npx shadcn-svelte@latest add pagination
```

### Example 9

```python
bun x shadcn-svelte@latest add pagination
```

### Example 10

```python
bun x shadcn-svelte@latest add pagination
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
import Root from "./pagination.svelte";
import Content from "./pagination-content.svelte";
import Item from "./pagination-item.svelte";
import Link from "./pagination-link.svelte";
import PrevButton from "./pagination-prev-button.svelte";
import NextButton from "./pagination-next-button.svelte";
import Ellipsis from "./pagination-ellipsis.svelte";
import Previous from "./pagination-previous.svelte";
import Next from "./pagination-next.svelte";

export {
  Root,
  Content,
  Item,
  Link,
  PrevButton, //old
  NextButton, //old
  Ellipsis,
  Previous,
  Next,
  //
  Root as Pagination,
  Content as PaginationContent,
  Item as PaginationItem,
  Link as PaginationLink,
  PrevButton as PaginationPrevButton, //old
  NextButton as PaginationNextButton, //old
  Ellipsis as PaginationEllipsis,
  Previous as PaginationPrevious,
  Next as PaginationNext,
};
```

### Example 20

```sql
import Root from "./pagination.svelte";
import Content from "./pagination-content.svelte";
import Item from "./pagination-item.svelte";
import Link from "./pagination-link.svelte";
import PrevButton from "./pagination-prev-button.svelte";
import NextButton from "./pagination-next-button.svelte";
import Ellipsis from "./pagination-ellipsis.svelte";
import Previous from "./pagination-previous.svelte";
import Next from "./pagination-next.svelte";

export {
  Root,
  Content,
  Item,
  Link,
  PrevButton, //old
  NextButton, //old
  Ellipsis,
  Previous,
  Next,
  //
  Root as Pagination,
  Content as PaginationContent,
  Item as PaginationItem,
  Link as PaginationLink,
  PrevButton as PaginationPrevButton, //old
  NextButton as PaginationNextButton, //old
  Ellipsis as PaginationEllipsis,
  Previous as PaginationPrevious,
  Next as PaginationNext,
};
```

### Example 21

```jsx
<script lang="ts">import * as Pagination from "$lib/components/ui/pagination/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Pagination from "$lib/components/ui/pagination/index.js";</script>
```

### Example 23

```json
<Pagination.Root count={100} perPage={10}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

### Example 24

```json
<Pagination.Root count={100} perPage={10}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

## Sections

## Installation

## Usage
