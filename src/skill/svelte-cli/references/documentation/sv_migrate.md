# Svelte-Cli_Docs - Sv Migrate

**Pages:** 1

---

## sv migrate

**URL:** llms-txt#sv-migrate

**Contents:**

- Usage
- Migrations
  - `app-state`
  - `svelte-5`
  - `self-closing-tags`
  - `svelte-4`
  - `sveltekit-2`
  - `package`
  - `routes`

`sv migrate` migrates Svelte(Kit) codebases. It delegates to the [`svelte-migrate`](https://www.npmjs.com/package/svelte-migrate) package.

Some migrations may annotate your codebase with tasks for completion that you can find by searching for `@migration`.

You can also specify a migration directly via the CLI:

Migrates `$app/stores` usage to `$app/state` in `.svelte` files. See the [migration guide](/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated) for more details.

Upgrades a Svelte 4 app to use Svelte 5, and updates individual components to use [runes](../svelte/what-are-runes) and other Svelte 5 syntax ([see migration guide](../svelte/v5-migration-guide)).

### `self-closing-tags`

Replaces all the self-closing non-void elements in your `.svelte` files. See the [pull request](https://github.com/sveltejs/kit/pull/12128) for more details.

Upgrades a Svelte 3 app to use Svelte 4 ([see migration guide](../svelte/v4-migration-guide)).

Upgrades a SvelteKit 1 app to SvelteKit 2 ([see migration guide](../kit/migrating-to-sveltekit-2)).

Upgrades a library using `@sveltejs/package` version 1 to version 2. See the [pull request](https://github.com/sveltejs/kit/pull/8922) for more details.

Upgrades a pre-release SvelteKit app to use the filesystem routing conventions in SvelteKit 1. See the [pull request](https://github.com/sveltejs/kit/discussions/5774) for more details.

**Examples:**

Example 1 (sh):

```sh
npx sv migrate
```

Example 2 (sh):

```sh
npx sv migrate [migration]
```

---
