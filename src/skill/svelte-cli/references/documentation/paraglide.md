# Svelte-Cli_Docs - Paraglide

**Pages:** 1

---

## paraglide

**URL:** llms-txt#paraglide

**Contents:**

- Usage
- What you get
- Options
  - languageTags
  - demo

[Paraglide from Inlang](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) is a compiler-based i18n library that emits tree-shakable message functions with small bundle sizes, no async waterfalls, full type-safety, and more.

- Inlang project settings
- paraglide Vite plugin
- SvelteKit `reroute` and `handle` hooks
- `text-direction` and `lang` attributes in `app.html`
- updated `.gitignore`
- an optional demo page showing how to use paraglide

The languages you'd like to support specified as IETF BCP 47 language tags.

Whether to generate an optional demo page showing how to use paraglide.

**Examples:**

Example 1 (sh):

```sh
npx sv add paraglide
```

Example 2 (sh):

```sh
npx sv add paraglide="languageTags:en,es"
```

Example 3 (sh):

```sh
npx sv add paraglide="demo:yes"
```

---
