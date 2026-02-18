# Svelte-Cli_Docs - Sv Create

**Pages:** 1

---

## sv create

**URL:** llms-txt#sv-create

**Contents:**

- Usage
- Options
  - `--from-playground <url>`
  - `--template <name>`
  - `--types <option>`
  - `--no-types`
  - `--add [add-ons...]`
  - `--no-add-ons`
  - `--install <package-manager>`
  - `--no-install`

`sv create` sets up a new SvelteKit project, with options to [setup additional functionality](sv-add#Official-add-ons).

### `--from-playground <url>`

Create a SvelteKit project from a [playground](/playground) URL. This downloads all playground files, detects external dependencies, and sets up a complete SvelteKit project structure with everything ready to go.

### `--template <name>`

Which project template to use:

- `minimal` — barebones scaffolding for your new app
- `demo` — showcase app with a word guessing game that works without JavaScript
- `library` — template for a Svelte library, set up with `svelte-package`

### `--types <option>`

Whether and how to add typechecking to the project:

- `ts` — default to `.ts` files and use `lang="ts"` for `.svelte` components
- `jsdoc` — use [JSDoc syntax](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for types

Prevent typechecking from being added. Not recommended!

### `--add [add-ons...]`

Add add-ons to the project in the `create` command. Following the same format as [sv add](sv-add#Usage).

Run the command without the interactive add-ons prompt

### `--install <package-manager>`

Installs dependencies with a specified package manager:

- `npm`
- `pnpm`
- `yarn`
- `bun`
- `deno`

Prevents installing dependencies.

Skip checking whether the target directory is empty.

<!-- ## Programmatic interface

**Examples:**

Example 1 (sh):
```sh
npx sv create [options] [path]
```

Example 2 (sh):
```sh
npx sv create --from-playground="https://svelte.dev/playground/hello-world"
```

Example 3 (sh):
```sh
npx sv create --add eslint prettier [path]
```

Example 4 (js):
```js
// TODO: this gives type checking errors in the docs site when not commented out. Need to release sv, install it in the site, and uncomment this.
// import { create } from 'sv';

// // todo: check if this is right
// create(cwd, {
// 	// add your options here
// 	// todo: list available option
// });
```

---
