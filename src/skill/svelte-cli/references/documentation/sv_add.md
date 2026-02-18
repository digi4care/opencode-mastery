# Svelte-Cli_Docs - Sv Add

**Pages:** 1

---

## sv add

**URL:** llms-txt#sv-add

**Contents:**

- Usage
- Options
  - `-C`, `--cwd`
  - `--no-git-check`
  - `--install <package-manager>`
  - `--no-install`
- Official add-ons

`sv add` updates an existing project with new functionality.

You can select multiple space-separated add-ons from [the list below](#Official-add-ons), or you can use the interactive prompt.

Path to the root of your Svelte(Kit) project.

Even if some files are dirty, no prompt will be shown

### `--install <package-manager>`

Installs dependencies with a specified package manager:

- `npm`
- `pnpm`
- `yarn`
- `bun`
- `deno`

Prevents installing dependencies

<!-- TODO: it'd be nice for this to live on the "add-ons" page, but we first need svelte.dev to support making pages from headings -->

- [`devtools-json`](devtools-json)
- [`drizzle`](drizzle)
- [`eslint`](eslint)
- [`lucia`](lucia)
- [`mcp`](mcp)
- [`mdsvex`](mdsvex)
- [`paraglide`](paraglide)
- [`playwright`](playwright)
- [`prettier`](prettier)
- [`storybook`](storybook)
- [`sveltekit-adapter`](sveltekit-adapter)
- [`tailwindcss`](tailwind)
- [`vitest`](vitest)

**Examples:**

Example 1 (sh):

```sh
npx sv add
```

Example 2 (sh):

```sh
npx sv add [add-ons]
```

---
