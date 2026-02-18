# Svelte-Kit_Docs - Other

**Pages:** 23

---

## <SYSTEM>This is the developer documentation for SvelteKit.</SYSTEM>

**URL:** llms-txt#<system>this-is-the-developer-documentation-for-sveltekit.</system>

---

## Zero-config deployments

**URL:** llms-txt#zero-config-deployments

**Contents:**

- Environment-specific configuration
- Adding community adapters

When you create a new SvelteKit project with `npx sv create`, it installs [`adapter-auto`](https://github.com/sveltejs/kit/tree/main/packages/adapter-auto) by default. This adapter automatically installs and uses the correct adapter for supported environments when you deploy:

- [`@sveltejs/adapter-cloudflare`](adapter-cloudflare) for [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [`@sveltejs/adapter-netlify`](adapter-netlify) for [Netlify](https://netlify.com/)
- [`@sveltejs/adapter-vercel`](adapter-vercel) for [Vercel](https://vercel.com/)
- [`svelte-adapter-azure-swa`](https://github.com/geoffrich/svelte-adapter-azure-swa) for [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [`svelte-kit-sst`](https://github.com/sst/v2/tree/master/packages/svelte-kit-sst) for [AWS via SST](https://sst.dev/docs/start/aws/svelte)
- [`@sveltejs/adapter-node`](adapter-node) for [Google Cloud Run](https://cloud.google.com/run)

It's recommended to install the appropriate adapter to your `devDependencies` once you've settled on a target environment, since this will add the adapter to your lockfile and slightly improve install times on CI.

## Environment-specific configuration

To add configuration options, such as `{ edge: true }` in [`adapter-vercel`](adapter-vercel) and [`adapter-netlify`](adapter-netlify), you must install the underlying adapter — `adapter-auto` does not take any options.

## Adding community adapters

You can add zero-config support for additional adapters by editing [adapters.js](https://github.com/sveltejs/kit/blob/main/packages/adapter-auto/adapters.js) and opening a pull request.

---

## or e.g. for local previewing and testing

**URL:** llms-txt#or-e.g.-for-local-previewing-and-testing

**Contents:**

- `ADDRESS_HEADER` and `XFF_DEPTH`
- `BODY_SIZE_LIMIT`
- `SHUTDOWN_TIMEOUT`
- `IDLE_TIMEOUT`
- Options
  - out
  - precompress
  - envPrefix
- Graceful shutdown
- Socket activation

ORIGIN=http://localhost:3000 node build
sh
PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node build
sh
ADDRESS_HEADER=True-Client-IP node build

<client address>, <proxy 1 address>, <proxy 2 address>

<spoofed address>, <client address>, <proxy 1 address>, <proxy 2 address>
js
// @errors: 2307
/// file: svelte.config.js
import adapter from '@sveltejs/adapter-node';

/\*_ @type {import('@sveltejs/kit').Config} _/
const config = {
kit: {
adapter: adapter({
// default options are shown
out: 'build',
precompress: true,
envPrefix: ''
})
}
};

export default config;
js
envPrefix: 'MY*CUSTOM*';
sh
MY_CUSTOM_HOST=127.0.0.1 \
MY_CUSTOM_PORT=4000 \
MY_CUSTOM_ORIGIN=https://my.site \
node build
js
// @errors: 2304
process.on('sveltekit:shutdown', async (reason) => {
await jobs.stop();
await db.close();
});
ini
/// file: /etc/systemd/system/myapp.service
[Service]
Environment=NODE_ENV=production IDLE_TIMEOUT=60
ExecStart=/usr/bin/node /usr/bin/myapp/build
ini
/// file: /etc/systemd/system/myapp.socket
[Socket]
ListenStream=3000

[Install]
WantedBy=sockets.target
js
// @errors: 2307 7006
/// file: my-server.js
import { handler } from './build/handler.js';
import express from 'express';

const app = express();

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
res.end('ok');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
console.log('listening on port 3000');
});

````

**Examples:**

Example 1 (unknown):
```unknown
With this, a request for the `/stuff` pathname will correctly resolve to `https://my.site/stuff`. Alternatively, you can specify headers that tell SvelteKit about the request protocol and host, from which it can construct the origin URL:
````

Example 2 (unknown):

```unknown
> [!NOTE] [`x-forwarded-proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto) and [`x-forwarded-host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host) are de facto standard headers that forward the original protocol and host if you're using a reverse proxy (think load balancers and CDNs). You should only set these variables if your server is behind a trusted reverse proxy; otherwise, it'd be possible for clients to spoof these headers.
>
> If you're hosting your proxy on a non-standard port and your reverse proxy supports `x-forwarded-port`, you can also set `PORT_HEADER=x-forwarded-port`.

If `adapter-node` can't correctly determine the URL of your deployment, you may experience this error when using [form actions](form-actions):

> [!NOTE] Cross-site POST form submissions are forbidden

### `ADDRESS_HEADER` and `XFF_DEPTH`

The [`RequestEvent`](@sveltejs-kit#RequestEvent) object passed to hooks and endpoints includes an `event.getClientAddress()` function that returns the client's IP address. By default this is the connecting `remoteAddress`. If your server is behind one or more proxies (such as a load balancer), this value will contain the innermost proxy's IP address rather than the client's, so we need to specify an `ADDRESS_HEADER` to read the address from:
```

Example 3 (unknown):

```unknown
> [!NOTE] Headers can easily be spoofed. As with `PROTOCOL_HEADER` and `HOST_HEADER`, you should [know what you're doing](https://adam-p.ca/blog/2022/03/x-forwarded-for/) before setting these.

If the `ADDRESS_HEADER` is `X-Forwarded-For`, the header value will contain a comma-separated list of IP addresses. The `XFF_DEPTH` environment variable should specify how many trusted proxies sit in front of your server. E.g. if there are three trusted proxies, proxy 3 will forward the addresses of the original connection and the first two proxies:
```

Example 4 (unknown):

```unknown
Some guides will tell you to read the left-most address, but this leaves you [vulnerable to spoofing](https://adam-p.ca/blog/2022/03/x-forwarded-for/):
```

---

## Icons

**URL:** llms-txt#icons

**Contents:**

- CSS
- Svelte

A great way to use icons is to define them purely via CSS. Iconify offers support for [many popular icon sets](https://icon-sets.iconify.design/) that [can be included via CSS](https://iconify.design/docs/usage/css/). This method can also be used with popular CSS frameworks by leveraging the Iconify [Tailwind CSS plugin](https://iconify.design/docs/usage/css/tailwind/) or [UnoCSS plugin](https://iconify.design/docs/usage/css/unocss/). As opposed to libraries based on Svelte components, it doesn't require each icon to be imported into your `.svelte` file.

There are many [icon libraries for Svelte](/packages#icons). When choosing an icon library, it is recommended to avoid those that provide a `.svelte` file per icon, as these libraries can have thousands of `.svelte` files which really slow down [Vite's dependency optimization](https://vite.dev/guide/dep-pre-bundling.html). This can become especially pathological if the icons are imported both via an umbrella import and subpath import [as described in the `vite-plugin-svelte` FAQ](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#what-is-going-on-with-vite-and-pre-bundling-dependencies).

---

## Frequently asked questions

**URL:** llms-txt#frequently-asked-questions

**Contents:**

- Other resources
- What can I make with SvelteKit?
- How do I include details from package.json in my application?
- How do I fix the error I'm getting trying to include a package?
- How do I use the view transitions API?
- How do I set up a database?
- How do I use a client-side library accessing `document` or `window`?
- How do I use a different backend API server?
- How do I use middleware?
- How do I use Yarn?

Please see [the Svelte FAQ](../svelte/faq) and [`vite-plugin-svelte` FAQ](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md) as well for the answers to questions deriving from those libraries.

## What can I make with SvelteKit?

See [the documentation regarding project types](project-types) for more details.

## How do I include details from package.json in my application?

If you'd like to include your application's version number or other information from `package.json` in your application, you can load JSON like so:

## How do I fix the error I'm getting trying to include a package?

Most issues related to including a library are due to incorrect packaging. You can check if a library's packaging is compatible with Node.js by entering it into [the publint website](https://publint.dev/).

Here are a few things to keep in mind when checking if a library is packaged correctly:

- `exports` takes precedence over the other entry point fields such as `main` and `module`. Adding an `exports` field may not be backwards-compatible as it prevents deep imports.
- ESM files should end with `.mjs` unless `"type": "module"` is set in which any case CommonJS files should end with `.cjs`.
- `main` should be defined if `exports` is not. It should be either a CommonJS or ESM file and adhere to the previous bullet. If a `module` field is defined, it should refer to an ESM file.
- Svelte components should be distributed as uncompiled `.svelte` files with any JS in the package written as ESM only. Custom script and style languages, like TypeScript and SCSS, should be preprocessed as vanilla JS and CSS respectively. We recommend using [`svelte-package`](./packaging) for packaging Svelte libraries, which will do this for you.

Libraries work best in the browser with Vite when they distribute an ESM version, especially if they are dependencies of a Svelte component library. You may wish to suggest to library authors that they provide an ESM version. However, CommonJS (CJS) dependencies should work as well since, by default, [`vite-plugin-svelte` will ask Vite to pre-bundle them](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md#what-is-going-on-with-vite-and-pre-bundling-dependencies) using `esbuild` to convert them to ESM.

If you are still encountering issues we recommend searching both [the Vite issue tracker](https://github.com/vitejs/vite/issues) and the issue tracker of the library in question. Sometimes issues can be worked around by fiddling with the [`optimizeDeps`](https://vitejs.dev/config/#dep-optimization-options) or [`ssr`](https://vitejs.dev/config/#ssr-options) config values though we recommend this as only a short-term workaround in favor of fixing the library in question.

## How do I use the view transitions API?

While SvelteKit does not have any specific integration with [view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/), you can call `document.startViewTransition` in [`onNavigate`]($app-navigation#onNavigate) to trigger a view transition on every client-side navigation.

For more, see ["Unlocking view transitions"](/blog/view-transitions) on the Svelte blog.

## How do I set up a database?

Put the code to query your database in a [server route](./routing#server) - don't query the database in .svelte files. You can create a `db.js` or similar that sets up a connection immediately and makes the client accessible throughout the app as a singleton. You can execute any one-time setup code in `hooks.server.js` and import your database helpers into any endpoint that needs them.

You can use [the Svelte CLI](/docs/cli/overview) to automatically set up database integrations.

## How do I use a client-side library accessing `document` or `window`?

If you need access to the `document` or `window` variables or otherwise need code to run only on the client-side you can wrap it in a `browser` check:

You can also run code in `onMount` if you'd like to run it after the component has been first rendered to the DOM:

If the library you'd like to use is side-effect free you can also statically import it and it will be tree-shaken out in the server-side build where `onMount` will be automatically replaced with a no-op:

Finally, you may also consider using an `{#await}` block:

## How do I use a different backend API server?

You can use [`event.fetch`](./load#Making-fetch-requests) to request data from an external API server, but be aware that you would need to deal with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which will result in complications such as generally requiring requests to be preflighted resulting in higher latency. Requests to a separate subdomain may also increase latency due to an additional DNS lookup, TLS setup, etc. If you wish to use this method, you may find [`handleFetch`](./hooks#Server-hooks-handleFetch) helpful.

Another approach is to set up a proxy to bypass CORS headaches. In production, you would rewrite a path like `/api` to the API server; for local development, use Vite's [`server.proxy`](https://vitejs.dev/config/server-options.html#server-proxy) option.

How to setup rewrites in production will depend on your deployment platform. If rewrites aren't an option, you could alternatively add an [API route](./routing#server):

(Note that you may also need to proxy `POST`/`PATCH` etc requests, and forward `request.headers`, depending on your needs.)

## How do I use middleware?

`adapter-node` builds a middleware that you can use with your own server for production mode. In dev, you can add middleware to Vite by using a Vite plugin. For example:

See [Vite's `configureServer` docs](https://vitejs.dev/guide/api-plugin.html#configureserver) for more details including how to control ordering.

## How do I use Yarn?

### Does it work with Yarn 2?

Sort of. The Plug'n'Play feature, aka 'pnp', is broken (it deviates from the Node module resolution algorithm, and [doesn't yet work with native JavaScript modules](https://github.com/yarnpkg/berry/issues/638) which SvelteKit — along with an [increasing number of packages](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77) — uses). You can use `nodeLinker: 'node-modules'` in your [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) file to disable pnp, but it's probably easier to just use npm or [pnpm](https://pnpm.io/), which is similarly fast and efficient but without the compatibility headaches.

### How do I use with Yarn 3?

Currently ESM Support within the latest Yarn (version 3) is considered [experimental](https://github.com/yarnpkg/berry/pull/2161).

The below seems to work although your results may vary. First create a new application:

And enable Yarn Berry:

One of the more interesting features of Yarn Berry is the ability to have a single global cache for packages, instead of having multiple copies for each project on the disk. However, setting `enableGlobalCache` to true causes building to fail, so it is recommended to add the following to the `.yarnrc.yml` file:

This will cause packages to be downloaded into a local node_modules directory but avoids the above problem and is your best bet for using version 3 of Yarn at this point in time.

**Examples:**

Example 1 (ts):

```ts
// @errors: 2732
/// file: svelte.config.js
import pkg from "./package.json" with { type: "json" };
```

Example 2 (js):

```js
// @errors: 2339 2810
import { onNavigate } from "$app/navigation";

onNavigate(navigation => {
  if (!document.startViewTransition) return;

  return new Promise(resolve => {
    document.startViewTransition(async () => {
      resolve();
      await navigation.complete;
    });
  });
});
```

Example 3 (js):

```js
/// <reference types="@sveltejs/kit" />
// ---cut---
import { browser } from "$app/environment";

if (browser) {
  // client-only code here
}
```

Example 4 (js):

```js
// @filename: ambient.d.ts
// @lib: ES2015
declare module 'some-browser-only-library';

// @filename: index.js
// ---cut---
import { onMount } from 'svelte';

onMount(async () => {
	const { method } = await import('some-browser-only-library');
	method('hello world');
});
```

---

## Additional resources

**URL:** llms-txt#additional-resources

**Contents:**

- FAQs
- Examples
- Support

Please see the [SvelteKit FAQ](faq) for solutions to common issues and helpful tips and tricks.

The [Svelte FAQ](../svelte/faq) and [`vite-plugin-svelte` FAQ](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/faq.md) may also be helpful for questions deriving from those libraries.

We've written and published a few different SvelteKit sites as examples:

- [`sveltejs/realworld`](https://github.com/sveltejs/realworld) contains an example blog site
- [A HackerNews clone](https://github.com/sveltejs/sites/tree/master/sites/hn.svelte.dev)
- [`svelte.dev`](https://github.com/sveltejs/svelte.dev)

SvelteKit users have also published plenty of examples on GitHub, under the [#sveltekit](https://github.com/topics/sveltekit) and [#sveltekit-template](https://github.com/topics/sveltekit-template) topics, as well as on [the Svelte Society site](https://sveltesociety.dev/recipe/sveltekit-templates-and-examples-e789ed397e7f38fc). Note that these have not been vetted by the maintainers and may not be up to date.

You can ask for help on [Discord](/chat) and [StackOverflow](https://stackoverflow.com/questions/tagged/sveltekit). Please first search for information related to your issue in the FAQ, Google or another search engine, issue tracker, and Discord chat history in order to be respectful of others' time. There are many more people asking questions than answering them, so this will help in allowing the community to grow in a scalable fashion.

---

## $app/environment

**URL:** llms-txt#$app/environment

**Contents:**

- browser
- building
- dev
- version

`true` if the app is running in the browser.

<div class="ts-block">

SvelteKit analyses your app during the `build` step by running it. During this process, `building` is `true`. This also applies during prerendering.

<div class="ts-block">

Whether the dev server is running. This is not guaranteed to correspond to `NODE_ENV` or `MODE`.

<div class="ts-block">

The value of `config.kit.version.name`.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { browser, building, dev, version } from "$app/environment";
```

Example 2 (dts):

```dts
const browser: boolean;
```

Example 3 (dts):

```dts
const building: boolean;
```

Example 4 (dts):

```dts
const dev: boolean;
```

---

## $app/forms

**URL:** llms-txt#$app/forms

**Contents:**

- applyAction
- deserialize
- enhance

This action updates the `form` property of the current page with the given data and updates `page.status`.
In case of an error, it redirects to the nearest error page.

<div class="ts-block">

Use this function to deserialize the response from a form submission.
Usage:

<div class="ts-block">

This action enhances a `<form>` element that otherwise would work without JavaScript.

The `submit` function is called upon submission with the given FormData and the `action` that should be triggered.
If `cancel` is called, the form will not be submitted.
You can use the abort `controller` to cancel the submission in case another one starts.
If a function is returned, that function is called with the response from the server.
If nothing is returned, the fallback will be used.

If this function or its return value isn't set, it

- falls back to updating the `form` prop with the returned data if the action is on the same page as the form
- updates `page.status`
- resets the `<form>` element and invalidates all data in case of successful submission with no redirect response
- redirects in case of a redirect response
- redirects to the nearest error page in case of an unexpected error

If you provide a custom function with a callback and want to use the default behavior, invoke `update` in your callback.
It accepts an options object

- `reset: false` if you don't want the `<form>` values to be reset after a successful submission
- `invalidateAll: false` if you don't want the action to call `invalidateAll` after submission

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { applyAction, deserialize, enhance } from "$app/forms";
```

Example 2 (dts):

```dts
function applyAction<
	Success extends Record<string, unknown> | undefined,
	Failure extends Record<string, unknown> | undefined
>(
	result: import('@sveltejs/kit').ActionResult<
		Success,
		Failure
	>
): Promise<void>;
```

Example 3 (js):

```js
// @errors: 7031
import { deserialize } from "$app/forms";

async function handleSubmit(event) {
  const response = await fetch("/form?/action", {
    method: "POST",
    body: new FormData(event.target),
  });

  const result = deserialize(await response.text());
  // ...
}
```

Example 4 (dts):

```dts
function deserialize<
	Success extends Record<string, unknown> | undefined,
	Failure extends Record<string, unknown> | undefined
>(
	result: string
): import('@sveltejs/kit').ActionResult<Success, Failure>;
```

---

## $app/navigation

**URL:** llms-txt#$app/navigation

**Contents:**

- afterNavigate
- beforeNavigate
- disableScrollHandling
- goto
- invalidate
- invalidateAll
- onNavigate
- preloadCode
- preloadData
- pushState

A lifecycle function that runs the supplied `callback` when the current component mounts, and also whenever we navigate to a URL.

`afterNavigate` must be called during a component initialization. It remains active as long as the component is mounted.

<div class="ts-block">

A navigation interceptor that triggers before we navigate to a URL, whether by clicking a link, calling `goto(...)`, or using the browser back/forward controls.

Calling `cancel()` will prevent the navigation from completing. If `navigation.type === 'leave'` — meaning the user is navigating away from the app (or closing the tab) — calling `cancel` will trigger the native browser unload confirmation dialog. In this case, the navigation may or may not be cancelled depending on the user's response.

When a navigation isn't to a SvelteKit-owned route (and therefore controlled by SvelteKit's client-side router), `navigation.to.route.id` will be `null`.

If the navigation will (if not cancelled) cause the document to unload — in other words `'leave'` navigations and `'link'` navigations where `navigation.to.route === null` — `navigation.willUnload` is `true`.

`beforeNavigate` must be called during a component initialization. It remains active as long as the component is mounted.

<div class="ts-block">

## disableScrollHandling

If called when the page is being updated following a navigation (in `onMount` or `afterNavigate` or an action, for example), this disables SvelteKit's built-in scroll handling.
This is generally discouraged, since it breaks user expectations.

<div class="ts-block">

Allows you to navigate programmatically to a given route, with options such as keeping the current element focused.
Returns a Promise that resolves when SvelteKit navigates (or fails to navigate, in which case the promise rejects) to the specified `url`.

For external URLs, use `window.location = url` instead of calling `goto(url)`.

<div class="ts-block">

Causes any `load` functions belonging to the currently active page to re-run if they depend on the `url` in question, via `fetch` or `depends`. Returns a `Promise` that resolves when the page is subsequently updated.

If the argument is given as a `string` or `URL`, it must resolve to the same URL that was passed to `fetch` or `depends` (including query parameters).
To create a custom identifier, use a string beginning with `[a-z]+:` (e.g. `custom:state`) — this is a valid URL.

The `function` argument can be used define a custom predicate. It receives the full `URL` and causes `load` to rerun if `true` is returned.
This can be useful if you want to invalidate based on a pattern instead of a exact match.

<div class="ts-block">

Causes all `load` and `query` functions belonging to the currently active page to re-run. Returns a `Promise` that resolves when the page is subsequently updated.

<div class="ts-block">

A lifecycle function that runs the supplied `callback` immediately before we navigate to a new URL except during full-page navigations.

If you return a `Promise`, SvelteKit will wait for it to resolve before completing the navigation. This allows you to — for example — use `document.startViewTransition`. Avoid promises that are slow to resolve, since navigation will appear stalled to the user.

If a function (or a `Promise` that resolves to a function) is returned from the callback, it will be called once the DOM has updated.

`onNavigate` must be called during a component initialization. It remains active as long as the component is mounted.

<div class="ts-block">

Programmatically imports the code for routes that haven't yet been fetched.
Typically, you might call this to speed up subsequent navigation.

You can specify routes by any matching pathname such as `/about` (to match `src/routes/about/+page.svelte`) or `/blog/*` (to match `src/routes/blog/[slug]/+page.svelte`).

Unlike `preloadData`, this won't call `load` functions.
Returns a Promise that resolves when the modules have been imported.

<div class="ts-block">

Programmatically preloads the given page, which means

1.  ensuring that the code for the page is loaded, and
2.  calling the page's load function with the appropriate options.

This is the same behaviour that SvelteKit triggers when the user taps or mouses over an `<a>` element with `data-sveltekit-preload-data`.
If the next navigation is to `href`, the values returned from load will be used, making navigation instantaneous.
Returns a Promise that resolves with the result of running the new route's `load` functions once the preload is complete.

<div class="ts-block">

Programmatically create a new history entry with the given `page.state`. To use the current URL, you can pass `''` as the first argument. Used for [shallow routing](/docs/kit/shallow-routing).

<div class="ts-block">

Causes all currently active remote functions to refresh, and all `load` functions belonging to the currently active page to re-run (unless disabled via the option argument).
Returns a `Promise` that resolves when the page is subsequently updated.

<div class="ts-block">

Programmatically replace the current history entry with the given `page.state`. To use the current URL, you can pass `''` as the first argument. Used for [shallow routing](/docs/kit/shallow-routing).

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  afterNavigate,
  beforeNavigate,
  disableScrollHandling,
  goto,
  invalidate,
  invalidateAll,
  onNavigate,
  preloadCode,
  preloadData,
  pushState,
  refreshAll,
  replaceState,
} from "$app/navigation";
```

Example 2 (dts):

```dts
function afterNavigate(
	callback: (
		navigation: import('@sveltejs/kit').AfterNavigate
	) => void
): void;
```

Example 3 (dts):

```dts
function beforeNavigate(
	callback: (
		navigation: import('@sveltejs/kit').BeforeNavigate
	) => void
): void;
```

Example 4 (dts):

```dts
function disableScrollHandling(): void;
```

---

## $app/paths

**URL:** llms-txt#$app/paths

**Contents:**

- asset
- assets
- base
- resolve
- resolveRoute

<blockquote class="since note">

Resolve the URL of an asset in your `static` directory, by prefixing it with [`config.kit.paths.assets`](/docs/kit/configuration#paths) if configured, or otherwise by prefixing it with the base path.

During server rendering, the base path is relative and depends on the page currently being rendered.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`asset(...)`](/docs/kit/$app-paths#asset) instead

An absolute path that matches [`config.kit.paths.assets`](/docs/kit/configuration#paths).

> [!NOTE] If a value for `config.kit.paths.assets` is specified, it will be replaced with `'/_svelte_kit_assets'` during `vite dev` or `vite preview`, since the assets don't yet live at their eventual URL.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`resolve(...)`](/docs/kit/$app-paths#resolve) instead

A string that matches [`config.kit.paths.base`](/docs/kit/configuration#paths).

Example usage: `<a href="{base}/your-page">Link</a>`

<div class="ts-block">

<blockquote class="since note">

Resolve a pathname by prefixing it with the base path, if any, or resolve a route ID by populating dynamic segments with parameters.

During server rendering, the base path is relative and depends on the page currently being rendered.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`resolve(...)`](/docs/kit/$app-paths#resolve) instead

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { asset, assets, base, resolve, resolveRoute } from "$app/paths";
```

Example 2 (svelte):

```svelte
<script>
	import { asset } from '$app/paths';
</script>

<img alt="a potato" src={asset('/potato.jpg')} />
```

Example 3 (dts):

```dts
function asset(file: Asset): string;
```

Example 4 (dts):

```dts
let assets:
	| ''
	| `https://${string}`
	| `http://${string}`
	| '/_svelte_kit_assets';
```

---

## $app/server

**URL:** llms-txt#$app/server

**Contents:**

- command
- form
- getRequestEvent
- prerender
- query
- read
- query

<blockquote class="since note">

Creates a remote command. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](/docs/kit/remote-functions#command) for full documentation.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<blockquote class="since note">

Creates a form object that can be spread onto a `<form>` element.

See [Remote functions](/docs/kit/remote-functions#form) for full documentation.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<blockquote class="since note">

Available since 2.20.0

Returns the current `RequestEvent`. Can be used inside server hooks, server `load` functions, actions, and endpoints (and functions called by them).

In environments without [`AsyncLocalStorage`](https://nodejs.org/api/async_context.html#class-asynclocalstorage), this must be called synchronously (i.e. not after an `await`).

<div class="ts-block">

<blockquote class="since note">

Creates a remote prerender function. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](/docs/kit/remote-functions#prerender) for full documentation.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<blockquote class="since note">

Creates a remote query. When called from the browser, the function will be invoked on the server via a `fetch` call.

See [Remote functions](/docs/kit/remote-functions#query) for full documentation.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<blockquote class="since note">

Available since 2.4.0

Read the contents of an imported asset from the filesystem

<div class="ts-block">

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { command, form, getRequestEvent, prerender, query, read } from "$app/server";
```

Example 2 (dts):

```dts
function command<Output>(
	fn: () => Output
): RemoteCommand<void, Output>;
```

Example 3 (dts):

```dts
function command<Input, Output>(
	validate: 'unchecked',
	fn: (arg: Input) => Output
): RemoteCommand<Input, Output>;
```

Example 4 (dts):

```dts
function command<Schema extends StandardSchemaV1, Output>(
	validate: Schema,
	fn: (arg: StandardSchemaV1.InferOutput<Schema>) => Output
): RemoteCommand<
	StandardSchemaV1.InferInput<Schema>,
	Output
>;
```

---

## $app/state

**URL:** llms-txt#$app/state

**Contents:**

- navigating
- page
- updated

SvelteKit makes three read-only state objects available via the `$app/state` module — `page`, `navigating` and `updated`.

> [!NOTE]
> This module was added in 2.12. If you're using an earlier version of SvelteKit, use [`$app/stores`]($app-stores) instead.

A read-only object representing an in-progress navigation, with `from`, `to`, `type` and (if `type === 'popstate'`) `delta` properties.
Values are `null` when no navigation is occurring, or during server rendering.

<div class="ts-block">

A read-only reactive object with information about the current page, serving several use cases:

- retrieving the combined `data` of all pages/layouts anywhere in your component tree (also see [loading data](/docs/kit/load))
- retrieving the current value of the `form` prop anywhere in your component tree (also see [form actions](/docs/kit/form-actions))
- retrieving the page state that was set through `goto`, `pushState` or `replaceState` (also see [goto](/docs/kit/$app-navigation#goto) and [shallow routing](/docs/kit/shallow-routing))
- retrieving metadata such as the URL you're on, the current route and its parameters, and whether or not there was an error

Changes to `page` are available exclusively with runes. (The legacy reactivity syntax will not reflect any changes)

On the server, values can only be read during rendering (in other words _not_ in e.g. `load` functions). In the browser, the values can be read at any time.

<div class="ts-block">

A read-only reactive value that's initially `false`. If [`version.pollInterval`](/docs/kit/configuration#version) is a non-zero value, SvelteKit will poll for new versions of the app and update `current` to `true` when it detects one. `updated.check()` will force an immediate check, regardless of polling.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { navigating, page, updated } from "$app/state";
```

Example 2 (dts):

```dts
const navigating:
	| import('@sveltejs/kit').Navigation
	| {
			from: null;
			to: null;
			type: null;
			willUnload: null;
			delta: null;
			complete: null;
	  };
```

Example 3 (svelte):

```svelte
<!--- file: +layout.svelte --->
<script>
	import { page } from '$app/state';
</script>

<p>Currently at {page.url.pathname}</p>

{#if page.error}
	<span class="red">Problem detected</span>
{:else}
	<span class="small">All systems operational</span>
{/if}
```

Example 4 (svelte):

```svelte
<!--- file: +page.svelte --->
<script>
	import { page } from '$app/state';
	const id = $derived(page.params.id); // This will correctly update id for usage on this page
	$: badId = page.params.id; // Do not use; will never update after initial load
</script>
```

---

## $app/stores

**URL:** llms-txt#$app/stores

**Contents:**

- getStores
- navigating
- page
- updated

This module contains store-based equivalents of the exports from [`$app/state`]($app-state). If you're using SvelteKit 2.12 or later, use that module instead.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use `navigating` from `$app/state` instead (requires Svelte 5, [see docs for more info](/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store.
When navigating starts, its value is a `Navigation` object with `from`, `to`, `type` and (if `type === 'popstate'`) `delta` properties.
When navigating finishes, its value reverts to `null`.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store whose value contains page data.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use `updated` from `$app/state` instead (requires Svelte 5, [see docs for more info](/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

A readable store whose initial value is `false`. If [`version.pollInterval`](/docs/kit/configuration#version) is a non-zero value, SvelteKit will poll for new versions of the app and update the store value to `true` when it detects one. `updated.check()` will force an immediate check, regardless of polling.

On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { getStores, navigating, page, updated } from "$app/stores";
```

Example 2 (dts):

```dts
function getStores(): {
	page: typeof page;

	navigating: typeof navigating;

	updated: typeof updated;
};
```

Example 3 (dts):

```dts
const navigating: import('svelte/store').Readable<
	import('@sveltejs/kit').Navigation | null
>;
```

Example 4 (dts):

```dts
const page: import('svelte/store').Readable<
	import('@sveltejs/kit').Page
>;
```

---

## $app/types

**URL:** llms-txt#$app/types

**Contents:**

- Asset
- RouteId
- Pathname
- ResolvedPathname
- RouteParams
- LayoutParams

This module contains generated types for the routes in your app.

<blockquote class="since note">
	<p>Available since 2.26</p>
</blockquote>

A union of all the filenames of assets contained in your `static` directory, plus a `string` wildcard for asset paths generated from `import` declarations.

<div class="ts-block">

A union of all the route IDs in your app. Used for `page.route.id` and `event.route.id`.

<div class="ts-block">

A union of all valid pathnames in your app.

<div class="ts-block">

Similar to `Pathname`, but possibly prefixed with a [base path](configuration#paths). Used for `page.url.pathname`.

<div class="ts-block">

A utility for getting the parameters associated with a given route.

<div class="ts-block">

A utility for getting the parameters associated with a given layout, which is similar to `RouteParams` but also includes optional parameters for any child route.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import type { RouteId, RouteParams, LayoutParams } from '$app/types';
```

Example 2 (dts):

```dts
type Asset = '/favicon.png' | '/robots.txt' | (string & {});
```

Example 3 (dts):

```dts
type RouteId = '/' | '/my-route' | '/my-other-route/[param]';
```

Example 4 (dts):

```dts
type Pathname = '/' | '/my-route' | `/my-other-route/${string}` & {};
```

---

## $env/dynamic/private

**URL:** llms-txt#$env/dynamic/private

This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](/docs/kit/configuration#env) (if configured).

This module cannot be imported into client-side code.

> [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.

**Examples:**

Example 1 (ts):

```ts
import { env } from "$env/dynamic/private";
console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
```

---

## $env/dynamic/public

**URL:** llms-txt#$env/dynamic/public

Similar to [`$env/dynamic/private`](/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.

Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.

**Examples:**

Example 1 (ts):

```ts
import { env } from "$env/dynamic/public";
console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
```

---

## $env/static/private

**URL:** llms-txt#$env/static/private

Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](/docs/kit/configuration#env) (if configured).

_Unlike_ [`$env/dynamic/private`](/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.

Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:

You can override `.env` values from the command line like so:

**Examples:**

Example 1 (ts):

```ts
import { API_KEY } from "$env/static/private";
```

Example 2 (unknown):

```unknown
MY_FEATURE_FLAG=""
```

Example 3 (sh):

```sh
MY_FEATURE_FLAG="enabled" npm run dev
```

---

## $env/static/public

**URL:** llms-txt#$env/static/public

Similar to [`$env/static/private`](/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.

Values are replaced statically at build time.

**Examples:**

Example 1 (ts):

```ts
import { PUBLIC_BASE_URL } from "$env/static/public";
```

---

## $lib

**URL:** llms-txt#$lib

SvelteKit automatically makes files under `src/lib` available using the `$lib` import alias. You can change which directory this alias points to in your [config file](configuration#files).

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: src/lib/Component.svelte --->
A reusable component
```

Example 2 (svelte):

```svelte
<!--- file: src/routes/+page.svelte --->
<script>
    import Component from '$lib/Component.svelte';
</script>

<Component />
```

---

## $service-worker

**URL:** llms-txt#$service-worker

**Contents:**

- base
- build
- files
- prerendered
- version

This module is only available to [service workers](/docs/kit/service-workers).

The `base` path of the deployment. Typically this is equivalent to `config.kit.paths.base`, but it is calculated from `location.pathname` meaning that it will continue to work correctly if the site is deployed to a subdirectory.
Note that there is a `base` but no `assets`, since service workers cannot be used if `config.kit.paths.assets` is specified.

<div class="ts-block">

An array of URL strings representing the files generated by Vite, suitable for caching with `cache.addAll(build)`.
During development, this is an empty array.

<div class="ts-block">

An array of URL strings representing the files in your static directory, or whatever directory is specified by `config.kit.files.assets`. You can customize which files are included from `static` directory using [`config.kit.serviceWorker.files`](/docs/kit/configuration#serviceWorker)

<div class="ts-block">

An array of pathnames corresponding to prerendered pages and endpoints.
During development, this is an empty array.

<div class="ts-block">

See [`config.kit.version`](/docs/kit/configuration#version). It's useful for generating unique cache names inside your service worker, so that a later deployment of your app can invalidate old caches.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { base, build, files, prerendered, version } from "$service-worker";
```

Example 2 (dts):

```dts
const base: string;
```

Example 3 (dts):

```dts
const build: string[];
```

Example 4 (dts):

```dts
const files: string[];
```

---

## Configuration

**URL:** llms-txt#configuration

**Contents:**

- Config
- KitConfig
- adapter
- alias
- appDir
- csp
- csrf
- embedded
- env
- experimental

Your project's configuration lives in a `svelte.config.js` file at the root of your project. As well as SvelteKit, this config object is used by other tooling that integrates with Svelte such as editor extensions.

An extension of [`vite-plugin-svelte`'s options](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#svelte-options).

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property">

<div class="ts-block-property-details">

Any additional options required by tooling that integrates with Svelte.

The `kit` property configures SvelteKit, and can have the following properties:

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `undefined`

Your [adapter](/docs/kit/adapters) is run when executing `vite build`. It determines how the output is converted for different platforms.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `{}`

An object containing zero or more aliases used to replace values in `import` statements. These aliases are automatically passed to Vite and TypeScript.

> [!NOTE] The built-in `$lib` alias is controlled by `config.kit.files.lib` as it is used for packaging.

> [!NOTE] You will need to run `npm run dev` to have SvelteKit automatically generate the required alias configuration in `jsconfig.json` or `tsconfig.json`.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"_app"`

The directory where SvelteKit keeps its stuff, including static assets (such as JS and CSS) and internally-used routes.

If `paths.assets` is specified, there will be two app directories — `${paths.assets}/${appDir}` and `${paths.base}/${appDir}`.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) configuration. CSP helps to protect your users against cross-site scripting (XSS) attacks, by limiting the places resources can be loaded from. For example, a configuration like this...

...would prevent scripts loading from external sites. SvelteKit will augment the specified directives with nonces or hashes (depending on `mode`) for any inline styles and scripts it generates.

To add a nonce for scripts and links manually included in `src/app.html`, you may use the placeholder `%sveltekit.nonce%` (for example `<script nonce="%sveltekit.nonce%">`).

When pages are prerendered, the CSP header is added via a `<meta http-equiv>` tag (note that in this case, `frame-ancestors`, `report-uri` and `sandbox` directives will be ignored).

> [!NOTE] When `mode` is `'auto'`, SvelteKit will use nonces for dynamically rendered pages and hashes for prerendered pages. Using nonces with prerendered pages is insecure and therefore forbidden.

> [!NOTE] Note that most [Svelte transitions](/tutorial/svelte/transition) work by creating an inline `<style>` element. If you use these in your app, you must either leave the `style-src` directive unspecified or add `unsafe-inline`.

If this level of configuration is insufficient and you have more dynamic requirements, you can use the [`handle` hook](/docs/kit/hooks#Server-hooks-handle) to roll your own CSP.

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

Whether to use hashes or nonces to restrict `<script>` and `<style>` elements. `'auto'` will use hashes for prerendered pages, and nonces for dynamically rendered pages.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

Directives that will be added to `Content-Security-Policy` headers.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

Directives that will be added to `Content-Security-Policy-Report-Only` headers.

<div class="ts-block-property-bullets">

Protection against [cross-site request forgery (CSRF)](https://owasp.org/www-community/attacks/csrf) attacks.

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `true`
- <span class="tag deprecated">deprecated</span> Use `trustedOrigins: ['*']` instead

Whether to check the incoming `origin` header for `POST`, `PUT`, `PATCH`, or `DELETE` form submissions and verify that it matches the server's origin.

To allow people to make `POST`, `PUT`, `PATCH`, or `DELETE` requests with a `Content-Type` of `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain` to your app from other origins, you will need to disable this option. Be careful!

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `[]`

An array of origins that are allowed to make cross-origin form submissions to your app.

Each origin should be a complete origin including protocol (e.g., `https://payment-gateway.com`).
This is useful for allowing trusted third-party services like payment gateways or authentication providers to submit forms to your app.

If the array contains `'*'`, all origins will be trusted. This is generally not recommended!

> [!NOTE] Only add origins you completely trust, as this bypasses CSRF protection for those origins.

CSRF checks only apply in production, not in local development.

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

Whether or not the app is embedded inside a larger app. If `true`, SvelteKit will add its event listeners related to navigation etc on the parent of `%sveltekit.body%` instead of `window`, and will pass `params` from the server rather than inferring them from `location.pathname`.
Note that it is generally not supported to embed multiple SvelteKit apps on the same page and use client-side SvelteKit features within them (things such as pushing to the history state assume a single instance).

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

Environment variable configuration

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"."`

The directory to search for `.env` files.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"PUBLIC_"`

A prefix that signals that an environment variable is safe to expose to client-side code. See [`$env/static/public`](/docs/kit/$env-static-public) and [`$env/dynamic/public`](/docs/kit/$env-dynamic-public). Note that Vite's [`envPrefix`](https://vitejs.dev/config/shared-options.html#envprefix) must be set separately if you are using Vite's environment variable handling - though use of that feature should generally be unnecessary.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `""`
- <span class="tag since">available since</span> v1.21.0

A prefix that signals that an environment variable is unsafe to expose to client-side code. Environment variables matching neither the public nor the private prefix will be discarded completely. See [`$env/static/private`](/docs/kit/$env-static-private) and [`$env/dynamic/private`](/docs/kit/$env-dynamic-private).

<div class="ts-block-property-bullets">

Experimental features. Here be dragons. These are not subject to semantic versioning, so breaking changes or removal can happen in any release.

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `{ server: false, serverFile: false }`
- <span class="tag since">available since</span> v2.31.0

Options for enabling server-side [OpenTelemetry](https://opentelemetry.io/) tracing for SvelteKit operations including the [`handle` hook](/docs/kit/hooks#Server-hooks-handle), [`load` functions](/docs/kit/load), [form actions](/docs/kit/form-actions), and [remote functions](/docs/kit/remote-functions).

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`
- <span class="tag since">available since</span> v2.31.0

Enables server-side [OpenTelemetry](https://opentelemetry.io/) span emission for SvelteKit operations including the [`handle` hook](/docs/kit/hooks#Server-hooks-handle), [`load` functions](/docs/kit/load), [form actions](/docs/kit/form-actions), and [remote functions](/docs/kit/remote-functions).

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v2.31.0

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`
- <span class="tag since">available since</span> v2.31.0

Enables `instrumentation.server.js` for tracing and observability instrumentation.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

Whether to enable the experimental remote functions feature. This feature is not yet stable and may be changed or removed at any time.

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>

Where to find various files within your project.

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src"`
- <span class="tag since">available since</span> v2.28

the location of your source code

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"static"`

a place to put static files that should have stable URLs and undergo no processing, such as `favicon.ico` or `manifest.json`

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/hooks.client"`

The location of your client [hooks](/docs/kit/hooks).

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/hooks.server"`

The location of your server [hooks](/docs/kit/hooks).

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/hooks"`
- <span class="tag since">available since</span> v2.3.0

The location of your universal [hooks](/docs/kit/hooks).

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/lib"`

your app's internal library, accessible throughout the codebase as `$lib`

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/params"`

a directory containing [parameter matchers](/docs/kit/advanced-routing#Matching)

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/routes"`

the files that define the structure of your app (see [Routing](/docs/kit/routing))

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/service-worker"`

the location of your service worker's entry point (see [Service workers](/docs/kit/service-workers))

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/app.html"`

the location of the template for HTML responses

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>
- <span class="tag">default</span> `"src/error.html"`

the location of the template for fallback error responses

## inlineStyleThreshold

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `0`

Inline CSS inside a `<style>` block at the head of the HTML. This option is a number that specifies the maximum length of a CSS file in UTF-16 code units, as specified by the [String.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) property, to be inlined. All CSS files needed for the page that are smaller than this value are merged and inlined in a `<style>` block.

> [!NOTE] This results in fewer initial requests and can improve your [First Contentful Paint](https://web.dev/first-contentful-paint) score. However, it generates larger HTML output and reduces the effectiveness of browser caches. Use it advisedly.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `[".js", ".ts"]`

An array of file extensions that SvelteKit will treat as modules. Files with extensions that match neither `config.extensions` nor `config.kit.moduleExtensions` will be ignored by the router.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `".svelte-kit"`

The directory that SvelteKit writes files to during `dev` and `build`. You should exclude this directory from version control.

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

Options related to the build output format

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"modulepreload"`
- <span class="tag since">available since</span> v1.8.4

SvelteKit will preload the JavaScript modules needed for the initial page to avoid import 'waterfalls', resulting in faster application startup. There
are three strategies with different trade-offs:

- `modulepreload` - uses `<link rel="modulepreload">`. This delivers the best results in Chromium-based browsers, in Firefox 115+, and Safari 17+. It is ignored in older browsers.
- `preload-js` - uses `<link rel="preload">`. Prevents waterfalls in Chromium and Safari, but Chromium will parse each module twice (once as a script, once as a module). Causes modules to be requested twice in Firefox. This is a good setting if you want to maximise performance for users on iOS devices at the cost of a very slight degradation for Chromium users.
- `preload-mjs` - uses `<link rel="preload">` but with the `.mjs` extension which prevents double-parsing in Chromium. Some static webservers will fail to serve .mjs files with a `Content-Type: application/javascript` header, which will cause your application to break. If that doesn't apply to you, this is the option that will deliver the best performance for the largest number of users, until `modulepreload` is more widely supported.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `'split'`
- <span class="tag since">available since</span> v2.13.0

The bundle strategy option affects how your app's JavaScript and CSS files are loaded.

- If `'split'`, splits the app up into multiple .js/.css files so that they are loaded lazily as the user navigates around the app. This is the default, and is recommended for most scenarios.
- If `'single'`, creates just one .js bundle and one .css file containing code for the entire app.
- If `'inline'`, inlines all JavaScript and CSS of the entire app into the HTML. The result is usable without a server (i.e. you can just open the file in your browser).

When using `'split'`, you can also adjust the bundling behaviour by setting [`output.experimentalMinChunkSize`](https://rollupjs.org/configuration-options/#output-experimentalminchunksize) and [`output.manualChunks`](https://rollupjs.org/configuration-options/#output-manualchunks) inside your Vite config's [`build.rollupOptions`](https://vite.dev/config/build-options.html#build-rollupoptions).

If you want to inline your assets, you'll need to set Vite's [`build.assetsInlineLimit`](https://vite.dev/config/build-options.html#build-assetsinlinelimit) option to an appropriate size then import your assets through Vite.

<div class="ts-block-property-bullets">

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `""`

An absolute path that your app's files are served from. This is useful if your files are served from a storage bucket of some kind.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `""`

A root-relative path that must start, but not end with `/` (e.g. `/base-path`), unless it is the empty string. This specifies where your app is served from and allows the app to live on a non-root path. Note that you need to prepend all your root-relative links with the base value or they will point to the root of your domain, not your `base` (this is how the browser works). You can use [`base` from `$app/paths`](/docs/kit/$app-paths#base) for that: `<a href="{base}/your-page">Link</a>`. If you find yourself writing this often, it may make sense to extract this into a reusable component.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `true`
- <span class="tag since">available since</span> v1.9.0

Whether to use relative asset paths.

If `true`, `base` and `assets` imported from `$app/paths` will be replaced with relative asset paths during server-side rendering, resulting in more portable HTML.
If `false`, `%sveltekit.assets%` and references to build artifacts will always be root-relative paths, unless `paths.assets` is an external URL

[Single-page app](/docs/kit/single-page-apps) fallback pages will always use absolute paths, regardless of this setting.

If your app uses a `<base>` element, you should set this to `false`, otherwise asset URLs will incorrectly be resolved against the `<base>` URL rather than the current page.

In 1.0, `undefined` was a valid value, which was set by default. In that case, if `paths.assets` was not external, SvelteKit would replace `%sveltekit.assets%` with a relative path and use relative paths to reference build artifacts, but `base` and `assets` imported from `$app/paths` would be as specified in your config.

<div class="ts-block-property-bullets">

See [Prerendering](/docs/kit/page-options#prerender).

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `1`

How many pages can be prerendered simultaneously. JS is single-threaded, but in cases where prerendering performance is network-bound (for example loading content from a remote CMS) this can speed things up by processing other tasks while waiting on the network response.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `true`

Whether SvelteKit should find pages to prerender by following links from `entries`.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `["*"]`

An array of pages to prerender, or start crawling from (if `crawl: true`). The `*` string includes all routes containing no required `[parameters]` with optional parameters included as being empty (since SvelteKit doesn't know what value any parameters should have).

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"fail"`
- <span class="tag since">available since</span> v1.15.7

How to respond to HTTP errors encountered while prerendering the app.

- `'fail'` — fail the build
- `'ignore'` - silently ignore the failure and continue
- `'warn'` — continue, but print a warning
- `(details) => void` — a custom error handler that takes a `details` object with `status`, `path`, `referrer`, `referenceType` and `message` properties. If you `throw` from this function, the build will fail

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"fail"`
- <span class="tag since">available since</span> v1.15.7

How to respond when hash links from one prerendered page to another don't correspond to an `id` on the destination page.

- `'fail'` — fail the build
- `'ignore'` - silently ignore the failure and continue
- `'warn'` — continue, but print a warning
- `(details) => void` — a custom error handler that takes a `details` object with `path`, `id`, `referrers` and `message` properties. If you `throw` from this function, the build will fail

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"fail"`
- <span class="tag since">available since</span> v1.16.0

How to respond when an entry generated by the `entries` export doesn't match the route it was generated from.

- `'fail'` — fail the build
- `'ignore'` - silently ignore the failure and continue
- `'warn'` — continue, but print a warning
- `(details) => void` — a custom error handler that takes a `details` object with `generatedFromId`, `entry`, `matchedId` and `message` properties. If you `throw` from this function, the build will fail

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"fail"`
- <span class="tag since">available since</span> v2.16.0

How to respond when a route is marked as prerenderable but has not been prerendered.

- `'fail'` — fail the build
- `'ignore'` - silently ignore the failure and continue
- `'warn'` — continue, but print a warning
- `(details) => void` — a custom error handler that takes a `details` object with a `routes` property which contains all routes that haven't been prerendered. If you `throw` from this function, the build will fail

The default behavior is to fail the build. This may be undesirable when you know that some of your routes may never be reached under certain
circumstances such as a CMS not returning data for a specific area, resulting in certain routes never being reached.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"http://sveltekit-prerender"`

The value of `url.origin` during prerendering; useful if it is included in rendered content.

<div class="ts-block-property-bullets">

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"pathname"`
- <span class="tag since">available since</span> v2.14.0

What type of client-side router to use.

- `'pathname'` is the default and means the current URL pathname determines the route
- `'hash'` means the route is determined by `location.hash`. In this case, SSR and prerendering are disabled. This is only recommended if `pathname` is not an option, for example because you don't control the webserver where your app is deployed.
  It comes with some caveats: you can't use server-side rendering (or indeed any server logic), and you have to make sure that the links in your app all start with #/, or they won't work. Beyond that, everything works exactly like a normal SvelteKit app.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `"client"`
- <span class="tag since">available since</span> v2.17.0

How to determine which route to load when navigating to a new page.

By default, SvelteKit will serve a route manifest to the browser.
When navigating, this manifest is used (along with the `reroute` hook, if it exists) to determine which components to load and which `load` functions to run.
Because everything happens on the client, this decision can be made immediately. The drawback is that the manifest needs to be
loaded and parsed before the first navigation can happen, which may have an impact if your app contains many routes.

Alternatively, SvelteKit can determine the route on the server. This means that for every navigation to a path that has not yet been visited, the server will be asked to determine the route.
This has several advantages:

- The client does not need to load the routing manifest upfront, which can lead to faster initial page loads
- The list of routes is hidden from public view
- The server has an opportunity to intercept each navigation (for example through a middleware), enabling (for example) A/B testing opaque to SvelteKit

The drawback is that for unvisited paths, resolution will take slightly longer (though this is mitigated by [preloading](/docs/kit/link-options#data-sveltekit-preload-data)).

> [!NOTE] When using server-side route resolution and prerendering, the resolution is prerendered along with the route itself.

<div class="ts-block-property-bullets">

<div class="ts-block-property-children">

<div class="ts-block-property-bullets">

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `(config) => config`
- <span class="tag since">available since</span> v1.3.0

A function that allows you to edit the generated `tsconfig.json`. You can mutate the config (recommended) or return a new one.
This is useful for extending a shared `tsconfig.json` in a monorepo root, for example.

Note that any paths configured here should be relative to the generated config file, which is written to `.svelte-kit/tsconfig.json`.

<div class="ts-block-property-bullets">

Client-side navigation can be buggy if you deploy a new version of your app while people are using it. If the code for the new page is already loaded, it may have stale content; if it isn't, the app's route manifest may point to a JavaScript file that no longer exists.
SvelteKit helps you solve this problem through version management.
If SvelteKit encounters an error while loading the page and detects that a new version has been deployed (using the `name` specified here, which defaults to a timestamp of the build) it will fall back to traditional full-page navigation.
Not all navigations will result in an error though, for example if the JavaScript for the next page is already loaded. If you still want to force a full-page navigation in these cases, use techniques such as setting the `pollInterval` and then using `beforeNavigate`:

If you set `pollInterval` to a non-zero value, SvelteKit will poll for new versions in the background and set the value of [`updated.current`](/docs/kit/$app-state#updated) `true` when it detects one.

<div class="ts-block-property-children">

<div class="ts-block-property">

<div class="ts-block-property-details">

The current app version string. If specified, this must be deterministic (e.g. a commit ref rather than `Math.random()` or `Date.now().toString()`), otherwise defaults to a timestamp of the build.

For example, to use the current commit hash, you could do use `git rev-parse HEAD`:

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `0`

The interval in milliseconds to poll for version changes. If this is `0`, no polling occurs.

**Examples:**

Example 1 (js):

```js
/// file: svelte.config.js
// @filename: ambient.d.ts
declare module '@sveltejs/adapter-auto' {
	const plugin: () => import('@sveltejs/kit').Adapter;
	export default plugin;
}

// @filename: index.js
// ---cut---
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
```

Example 2 (dts):

```dts
interface Config extends SvelteConfig {/*…*/}
```

Example 3 (dts):

```dts
kit?: KitConfig;
```

Example 4 (dts):

```dts
[key: string]: any;
```

---

## Command Line Interface

**URL:** llms-txt#command-line-interface

**Contents:**

- svelte-kit sync

SvelteKit projects use [Vite](https://vitejs.dev), meaning you'll mostly use its CLI (albeit via `npm run dev/build/preview` scripts):

- `vite dev` — start a development server
- `vite build` — build a production version of your app
- `vite preview` — run the production version locally

However SvelteKit includes its own CLI for initialising your project:

`svelte-kit sync` creates the `tsconfig.json` and all generated types (which you can import as `./$types` inside routing files) for your project. When you create a new project, it is listed as the `prepare` script and will be run automatically as part of the npm lifecycle, so you should not ordinarily have to run this command.

---

## Types

**URL:** llms-txt#types

**Contents:**

- Generated types
  - Default tsconfig.json
- $lib
  - $lib/server
- app.d.ts
- Error
- Locals
- PageData
- PageState
- Platform

The `RequestHandler` and `Load` types both accept a `Params` argument allowing you to type the `params` object. For example this endpoint expects `foo`, `bar` and `baz` params:

Needless to say, this is cumbersome to write out, and less portable (if you were to rename the `[foo]` directory to `[qux]`, the type would no longer reflect reality).

To solve this problem, SvelteKit generates `.d.ts` files for each of your endpoints and pages:

These files can be imported into your endpoints and pages as siblings, thanks to the [`rootDirs`](https://www.typescriptlang.org/tsconfig#rootDirs) option in your TypeScript configuration:

The return types of the load functions are then available through the `$types` module as `PageData` and `LayoutData` respectively, while the union of the return values of all `Actions` is available as `ActionData`.

Starting with version 2.16.0, two additional helper types are provided: `PageProps` defines `data: PageData`, as well as `form: ActionData`, when there are actions defined, while `LayoutProps` defines `data: LayoutData`, as well as `children: Snippet`.

> [!LEGACY]
> Before 2.16.0:
>
> Using Svelte 4:

> [!NOTE] For this to work, your own `tsconfig.json` or `jsconfig.json` should extend from the generated `.svelte-kit/tsconfig.json` (where `.svelte-kit` is your [`outDir`](configuration#outDir)):
>
> `{ "extends": "./.svelte-kit/tsconfig.json" }`

### Default tsconfig.json

The generated `.svelte-kit/tsconfig.json` file contains a mixture of options. Some are generated programmatically based on your project configuration, and should generally not be overridden without good reason:

Others are required for SvelteKit to work properly, and should also be left untouched unless you know what you're doing:

Use the [`typescript.config` setting](configuration#typescript) in `svelte.config.js` to extend or modify the generated `tsconfig.json`.

This is a simple alias to `src/lib`, or whatever directory is specified as [`config.kit.files.lib`](configuration#files). It allows you to access common components and utility modules without `../../../../` nonsense.

A subdirectory of `$lib`. SvelteKit will prevent you from importing any modules in `$lib/server` into client-side code. See [server-only modules](server-only-modules).

The `app.d.ts` file is home to the ambient types of your apps, i.e. types that are available without explicitly importing them.

Always part of this file is the `App` namespace. This namespace contains several types that influence the shape of certain SvelteKit features you interact with.

Defines the common shape of expected and unexpected errors. Expected errors are thrown using the `error` function. Unexpected errors are handled by the `handleError` hooks which should return this shape.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

The interface that defines `event.locals`, which can be accessed in server [hooks](/docs/kit/hooks) (`handle`, and `handleError`), server-only `load` functions, and `+server.js` files.

<div class="ts-block">

Defines the common shape of the [page.data state](/docs/kit/$app-state#page) and [$page.data store](/docs/kit/$app-stores#page) - that is, the data that is shared between all pages.
The `Load` and `ServerLoad` functions in `./$types` will be narrowed accordingly.
Use optional properties for data that is only present on specific pages. Do not add an index signature (`[key: string]: any`).

<div class="ts-block">

The shape of the `page.state` object, which can be manipulated using the [`pushState`](/docs/kit/$app-navigation#pushState) and [`replaceState`](/docs/kit/$app-navigation#replaceState) functions from `$app/navigation`.

<div class="ts-block">

If your adapter provides [platform-specific context](/docs/kit/adapters#Platform-specific-context) via `event.platform`, you can specify it here.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
/// file: src/routes/[foo]/[bar]/[baz]/+server.js
// @errors: 2355 2322 1360
/** @type {import('@sveltejs/kit').RequestHandler<{
    foo: string;
    bar: string;
    baz: string
  }>} */
export async function GET({ params }) {
  // ...
}
```

Example 2 (ts):

```ts
/// file: .svelte-kit/types/src/routes/[foo]/[bar]/[baz]/$types.d.ts
/// link: true
import type * as Kit from "@sveltejs/kit";

type RouteParams = {
  foo: string;
  bar: string;
  baz: string;
};

export type RequestHandler = Kit.RequestHandler<RouteParams>;
export type PageLoad = Kit.Load<RouteParams>;
```

Example 3 (js):

```js
/// file: src/routes/[foo]/[bar]/[baz]/+server.js
// @filename: $types.d.ts
import type * as Kit from '@sveltejs/kit';

type RouteParams = {
	foo: string;
	bar: string;
	baz: string;
}

export type RequestHandler = Kit.RequestHandler<RouteParams>;

// @filename: index.js
// @errors: 2355 2322
// ---cut---
/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	// ...
}
```

Example 4 (js):

```js
/// file: src/routes/[foo]/[bar]/[baz]/+page.js
// @filename: $types.d.ts
import type * as Kit from '@sveltejs/kit';

type RouteParams = {
	foo: string;
	bar: string;
	baz: string;
}

export type PageLoad = Kit.Load<RouteParams>;

// @filename: index.js
// @errors: 2355
// ---cut---
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	// ...
}
```

---
