# MDSvex - Markdown for Svelte

## Installation

```bash
sv add mdsvex
```

## Configuration

In `svelte.config.js`:

```javascript
import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-auto";

const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    mdsvex({
      extensions: [".md"],
      layout: {
        _: "./src/lib/components/MarkdownLayout.svelte",
      },
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
```

## Creating Pages

1. Create a markdown file in `src/routes/blog/hello-world/+page.md`:

```markdown
---
title: Hello World
date: "2024-01-01"
---

<script>
  let count = 0;
</script>

# {title}

This is a blog post.

<button on:click={() => count++}>
Clicked {count} times
</button>
```

## Frontmatter

| Property | Type    | Description      |
| -------- | ------- | ---------------- |
| title    | string  | Page title       |
| date     | string  | Publication date |
| author   | string  | Author name      |
| tags     | array   | Related tags     |
| draft    | boolean | Draft flag       |

## Layouts

Create a layout component in `src/lib/components/MarkdownLayout.svelte`:

```svelte
<script>
  export let title = '';
  export let date = '';
</script>

<article>
  <header>
    <h1>{title}</h1>
    <time>{date}</time>
  </header>
  <slot />
</article>
```

## Syntax Highlighting

Shiki is built-in:

```markdown
\`\`\`javascript
const hello = 'world';
\`\`\`
```

## References

- https://mdsvex.png/
- https://svelte.dev/docs/svelte
