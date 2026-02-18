# Svelte-Kit_Docs - Server Only Modules

**Pages:** 1

---

## Server-only modules

**URL:** llms-txt#server-only-modules

**Contents:**

- Private environment variables
- Server-only utilities
- Your modules
- How it works
- Further reading

Like a good friend, SvelteKit keeps your secrets. When writing your backend and frontend in the same repository, it can be easy to accidentally import sensitive data into your front-end code (environment variables containing API keys, for example). SvelteKit provides a way to prevent this entirely: server-only modules.

## Private environment variables

The [`$env/static/private`]($env-static-private) and [`$env/dynamic/private`]($env-dynamic-private) modules can only be imported into modules that only run on the server, such as [`hooks.server.js`](hooks#Server-hooks) or [`+page.server.js`](routing#page-page.server.js).

## Server-only utilities

The [`$app/server`]($app-server) module, which contains a [`read`]($app-server#read) function for reading assets from the filesystem, can likewise only be imported by code that runs on the server.

You can make your own modules server-only in two ways:

- adding `.server` to the filename, e.g. `secrets.server.js`
- placing them in `$lib/server`, e.g. `$lib/server/secrets.js`

Any time you have public-facing code that imports server-only code (whether directly or indirectly)...

...SvelteKit will error:

Even though the public-facing code — `src/routes/+page.svelte` — only uses the `add` export and not the secret `atlantisCoordinates` export, the secret code could end up in JavaScript that the browser downloads, and so the import chain is considered unsafe.

This feature also works with dynamic imports, even interpolated ones like ``await import(`./${foo}.js`)``.

> [!NOTE] Unit testing frameworks like Vitest do not distinguish between server-only and public-facing code. For this reason, illegal import detection is disabled when running tests, as determined by `process.env.TEST === 'true'`.

- [Tutorial: Environment variables](/tutorial/kit/env-static-private)

**Examples:**

Example 1 (js):

```js
// @errors: 7005
/// file: $lib/server/secrets.js
export const atlantisCoordinates = [
  /* redacted */
];
```

Example 2 (js):

```js
// @errors: 2307 7006 7005
/// file: src/routes/utils.js
export { atlantisCoordinates } from "$lib/server/secrets.js";

export const add = (a, b) => a + b;
```

Example 3 (html):

```html
/// file: src/routes/+page.svelte
<script>
  import { add } from "./utils.js";
</script>
```

Example 4 (unknown):

```unknown
Cannot import $lib/server/secrets.ts into code that runs in the browser, as this could leak sensitive information.

 src/routes/+page.svelte imports
  src/routes/utils.js imports
   $lib/server/secrets.ts

If you're only using the import as a type, change it to `import type`.
```

---
