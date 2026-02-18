# Svelte-Cli_Docs - Tailwindcss

**Pages:** 1

---

## tailwindcss

**URL:** llms-txt#tailwindcss

**Contents:**

- Usage
- What you get
- Options
  - plugins

[Tailwind CSS](https://tailwindcss.com/) allows you to rapidly build modern websites without ever leaving your HTML.

- Tailwind setup following the [Tailwind for SvelteKit guide](https://tailwindcss.com/docs/installation/framework-guides/sveltekit)
- Tailwind Vite plugin
- updated `layout.css` and `+layout.svelte` (for SvelteKit) or `app.css` and `App.svelte` (for non-SvelteKit Vite apps)
- integration with `prettier` if using that package

- `typography` — [`@tailwindcss/typography`](https://github.com/tailwindlabs/tailwindcss-typography)
- `forms` — [`@tailwindcss/forms`](https://github.com/tailwindlabs/tailwindcss-forms)

**Examples:**

Example 1 (sh):

```sh
npx sv add tailwindcss
```

Example 2 (sh):

```sh
npx sv add tailwindcss="plugins:typography"
```

---
