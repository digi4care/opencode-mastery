# Svelte-Kit_Docs - Routing

**Pages:** 3

---

## Routing

**URL:** llms-txt#routing

**Contents:**

- +page
  - +page.svelte
  - +page.js
  - +page.server.js
- +error
- +layout
  - +layout.svelte
  - +layout.js
  - +layout.server.js
- +server

At the heart of SvelteKit is a _filesystem-based router_. The routes of your app — i.e. the URL paths that users can access — are defined by the directories in your codebase:

- `src/routes` is the root route
- `src/routes/about` creates an `/about` route
- `src/routes/blog/[slug]` creates a route with a _parameter_, `slug`, that can be used to load data dynamically when a user requests a page like `/blog/hello-world`

> [!NOTE] You can change `src/routes` to a different directory by editing the [project config](configuration).

Each route directory contains one or more _route files_, which can be identified by their `+` prefix.

We'll introduce these files in a moment in more detail, but here are a few simple rules to help you remember how SvelteKit's routing works:

- All files can run on the server
- All files run on the client except `+server` files
- `+layout` and `+error` files apply to subdirectories as well as the directory they live in

A `+page.svelte` component defines a page of your app. By default, pages are rendered both on the server ([SSR](glossary#SSR)) for the initial request and in the browser ([CSR](glossary#CSR)) for subsequent navigation.

> [!NOTE] SvelteKit uses `<a>` elements to navigate between routes, rather than a framework-specific `<Link>` component.

Pages can receive data from `load` functions via the `data` prop.

> [!LEGACY]
> `PageProps` was added in 2.16.0. In earlier versions, you had to type the `data` property manually with `PageData` instead, see [$types](#$types).
>
> In Svelte 4, you'd use `export let data` instead.

Often, a page will need to load some data before it can be rendered. For this, we add a `+page.js` module that exports a `load` function:

This function runs alongside `+page.svelte`, which means it runs on the server during server-side rendering and in the browser during client-side navigation. See [`load`](load) for full details of the API.

As well as `load`, `+page.js` can export values that configure the page's behaviour:

- `export const prerender = true` or `false` or `'auto'`
- `export const ssr = true` or `false`
- `export const csr = true` or `false`

You can find more information about these in [page options](page-options).

If your `load` function can only run on the server — for example, if it needs to fetch data from a database or you need to access private [environment variables]($env-static-private) like API keys — then you can rename `+page.js` to `+page.server.js` and change the `PageLoad` type to `PageServerLoad`.

During client-side navigation, SvelteKit will load this data from the server, which means that the returned value must be serializable using [devalue](https://github.com/rich-harris/devalue). See [`load`](load) for full details of the API.

Like `+page.js`, `+page.server.js` can export [page options](page-options) — `prerender`, `ssr` and `csr`.

A `+page.server.js` file can also export _actions_. If `load` lets you read data from the server, `actions` let you write data _to_ the server using the `<form>` element. To learn how to use them, see the [form actions](form-actions) section.

If an error occurs during `load`, SvelteKit will render a default error page. You can customise this error page on a per-route basis by adding an `+error.svelte` file:

> [!LEGACY]
> `$app/state` was added in SvelteKit 2.12. If you're using an earlier version or are using Svelte 4, use `$app/stores` instead.

SvelteKit will 'walk up the tree' looking for the closest error boundary — if the file above didn't exist it would try `src/routes/blog/+error.svelte` and then `src/routes/+error.svelte` before rendering the default error page. If _that_ fails (or if the error was thrown from the `load` function of the root `+layout`, which sits 'above' the root `+error`), SvelteKit will bail out and render a static fallback error page, which you can customise by creating a `src/error.html` file.

If the error occurs inside a `load` function in `+layout(.server).js`, the closest error boundary in the tree is an `+error.svelte` file _above_ that layout (not next to it).

If no route can be found (404), `src/routes/+error.svelte` (or the default error page, if that file does not exist) will be used.

> [!NOTE] `+error.svelte` is _not_ used when an error occurs inside [`handle`](hooks#Server-hooks-handle) or a [+server.js](#server) request handler.

You can read more about error handling [here](errors).

So far, we've treated pages as entirely standalone components — upon navigation, the existing `+page.svelte` component will be destroyed, and a new one will take its place.

But in many apps, there are elements that should be visible on _every_ page, such as top-level navigation or a footer. Instead of repeating them in every `+page.svelte`, we can put them in _layouts_.

To create a layout that applies to every page, make a file called `src/routes/+layout.svelte`. The default layout (the one that SvelteKit uses if you don't bring your own) looks like this...

...but we can add whatever markup, styles and behaviour we want. The only requirement is that the component includes a `@render` tag for the page content. For example, let's add a nav bar:

If we create pages for `/`, `/about` and `/settings`...

...the nav will always be visible, and clicking between the three pages will only result in the `<h1>` being replaced.

Layouts can be _nested_. Suppose we don't just have a single `/settings` page, but instead have nested pages like `/settings/profile` and `/settings/notifications` with a shared submenu (for a real-life example, see [github.com/settings](https://github.com/settings)).

We can create a layout that only applies to pages below `/settings` (while inheriting the root layout with the top-level nav):

> [!LEGACY]
> `LayoutProps` was added in 2.16.0. In earlier versions, you had to [type the properties manually instead](#$types).

You can see how `data` is populated by looking at the `+layout.js` example in the next section just below.

By default, each layout inherits the layout above it. Sometimes that isn't what you want - in this case, [advanced layouts](advanced-routing#Advanced-layouts) can help you.

Just like `+page.svelte` loading data from `+page.js`, your `+layout.svelte` component can get data from a [`load`](load) function in `+layout.js`.

If a `+layout.js` exports [page options](page-options) — `prerender`, `ssr` and `csr` — they will be used as defaults for child pages.

Data returned from a layout's `load` function is also available to all its child pages:

> [!NOTE] Often, layout data is unchanged when navigating between pages. SvelteKit will intelligently rerun [`load`](load) functions when necessary.

### +layout.server.js

To run your layout's `load` function on the server, move it to `+layout.server.js`, and change the `LayoutLoad` type to `LayoutServerLoad`.

Like `+layout.js`, `+layout.server.js` can export [page options](page-options) — `prerender`, `ssr` and `csr`.

As well as pages, you can define routes with a `+server.js` file (sometimes referred to as an 'API route' or an 'endpoint'), which gives you full control over the response. Your `+server.js` file exports functions corresponding to HTTP verbs like `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `OPTIONS`, and `HEAD` that take a [`RequestEvent`](@sveltejs-kit#RequestEvent) argument and return a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

For example we could create an `/api/random-number` route with a `GET` handler:

The first argument to `Response` can be a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), making it possible to stream large amounts of data or create server-sent events (unless deploying to platforms that buffer responses, like AWS Lambda).

You can use the [`error`](@sveltejs-kit#error), [`redirect`](@sveltejs-kit#redirect) and [`json`](@sveltejs-kit#json) methods from `@sveltejs/kit` for convenience (but you don't have to).

If an error is thrown (either `error(...)` or an unexpected error), the response will be a JSON representation of the error or a fallback error page — which can be customised via `src/error.html` — depending on the `Accept` header. The [`+error.svelte`](#error) component will _not_ be rendered in this case. You can read more about error handling [here](errors).

> [!NOTE] When creating an `OPTIONS` handler, note that Vite will inject `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` headers — these will not be present in production unless you add them.

> [!NOTE] `+layout` files have no effect on `+server.js` files. If you want to run some logic before each request, add it to the server [`handle`](hooks#Server-hooks-handle) hook.

By exporting `POST`/`PUT`/`PATCH`/`DELETE`/`OPTIONS`/`HEAD` handlers, `+server.js` files can be used to create a complete API:

> [!NOTE] In general, [form actions](form-actions) are a better way to submit data from the browser to the server.

> [!NOTE] If a `GET` handler is exported, a `HEAD` request will return the `content-length` of the `GET` handler's response body.

### Fallback method handler

Exporting the `fallback` handler will match any unhandled request methods, including methods like `MOVE` which have no dedicated export from `+server.js`.

> [!NOTE] For `HEAD` requests, the `GET` handler takes precedence over the `fallback` handler.

### Content negotiation

`+server.js` files can be placed in the same directory as `+page` files, allowing the same route to be either a page or an API endpoint. To determine which, SvelteKit applies the following rules:

- `PUT`/`PATCH`/`DELETE`/`OPTIONS` requests are always handled by `+server.js` since they do not apply to pages
- `GET`/`POST`/`HEAD` requests are treated as page requests if the `accept` header prioritises `text/html` (in other words, it's a browser page request), else they are handled by `+server.js`.
- Responses to `GET` requests will include a `Vary: Accept` header, so that proxies and browsers cache HTML and JSON responses separately.

Throughout the examples above, we've been importing types from a `$types.d.ts` file. This is a file SvelteKit creates for you in a hidden directory if you're using TypeScript (or JavaScript with JSDoc type annotations) to give you type safety when working with your root files.

For example, annotating `let { data } = $props()` with `PageProps` (or `LayoutProps`, for a `+layout.svelte` file) tells TypeScript that the type of `data` is whatever was returned from `load`:

> [!NOTE]
> The `PageProps` and `LayoutProps` types, added in 2.16.0, are a shortcut for typing the `data` prop as `PageData` or `LayoutData`, as well as other props, such as `form` for pages, or `children` for layouts. In earlier versions, you had to type these properties manually. For example, for a page:
>
> Or, for a layout:

In turn, annotating the `load` function with `PageLoad`, `PageServerLoad`, `LayoutLoad` or `LayoutServerLoad` (for `+page.js`, `+page.server.js`, `+layout.js` and `+layout.server.js` respectively) ensures that `params` and the return value are correctly typed.

If you're using VS Code or any IDE that supports the language server protocol and TypeScript plugins then you can omit these types _entirely_! Svelte's IDE tooling will insert the correct types for you, so you'll get type checking without writing them yourself. It also works with our command line tool `svelte-check`.

You can read more about omitting `$types` in our [blog post](/blog/zero-config-type-safety) about it.

Any other files inside a route directory are ignored by SvelteKit. This means you can colocate components and utility modules with the routes that need them.

If components and modules are needed by multiple routes, it's a good idea to put them in [`$lib`]($lib).

- [Tutorial: Routing](/tutorial/kit/pages)
- [Tutorial: API routes](/tutorial/kit/get-handlers)
- [Docs: Advanced routing](advanced-routing)

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: src/routes/+page.svelte --->
<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
```

Example 2 (svelte):

```svelte
<!--- file: src/routes/about/+page.svelte --->
<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
```

Example 3 (svelte):

```svelte
<!--- file: src/routes/blog/[slug]/+page.svelte --->
<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

Example 4 (js):

```js
/// file: src/routes/blog/[slug]/+page.js
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (params.slug === "hello-world") {
    return {
      title: "Hello world!",
      content: "Welcome to our blog. Lorem ipsum dolor sit amet...",
    };
  }

  error(404, "Not found");
}
```

---

## Advanced routing

**URL:** llms-txt#advanced-routing

**Contents:**

- Rest parameters
  - 404 pages
- Optional parameters
- Matching
- Sorting
- Encoding
- Advanced layouts
  - (group)
  - Breaking out of layouts
  - +page@

If the number of route segments is unknown, you can use rest syntax — for example you might implement GitHub's file viewer like so...

...in which case a request for `/sveltejs/kit/tree/main/documentation/docs/04-advanced-routing.md` would result in the following parameters being available to the page:

> [!NOTE] `src/routes/a/[...rest]/z/+page.svelte` will match `/a/z` (i.e. there's no parameter at all) as well as `/a/b/z` and `/a/b/c/z` and so on. Make sure you check that the value of the rest parameter is valid, for example using a [matcher](#Matching).

Rest parameters also allow you to render custom 404s. Given these routes...

...the `marx-brothers/+error.svelte` file will _not_ be rendered if you visit `/marx-brothers/karl`, because no route was matched. If you want to render the nested error page, you should create a route that matches any `/marx-brothers/*` request, and return a 404 from it:

> [!NOTE] If you don't handle 404 cases, they will appear in [`handleError`](hooks#Shared-hooks-handleError)

## Optional parameters

A route like `[lang]/home` contains a parameter named `lang` which is required. Sometimes it's beneficial to make these parameters optional, so that in this example both `home` and `en/home` point to the same page. You can do that by wrapping the parameter in another bracket pair: `[[lang]]/home`

Note that an optional route parameter cannot follow a rest parameter (`[...rest]/[[optional]]`), since parameters are matched 'greedily' and the optional parameter would always be unused.

A route like `src/routes/fruits/[page]` would match `/fruits/apple`, but it would also match `/fruits/rocketship`. We don't want that. You can ensure that route parameters are well-formed by adding a _matcher_ — which takes the parameter string (`"apple"` or `"rocketship"`) and returns `true` if it is valid — to your [`params`](configuration#files) directory...

...and augmenting your routes:

If the pathname doesn't match, SvelteKit will try to match other routes (using the sort order specified below), before eventually returning a 404.

Each module in the `params` directory corresponds to a matcher, with the exception of `*.test.js` and `*.spec.js` files which may be used to unit test your matchers.

> [!NOTE] Matchers run both on the server and in the browser.

It's possible for multiple routes to match a given path. For example each of these routes would match `/foo-abc`:

SvelteKit needs to know which route is being requested. To do so, it sorts them according to the following rules...

- More specific routes are higher priority (e.g. a route with no parameters is more specific than a route with one dynamic parameter, and so on)
- Parameters with [matchers](#Matching) (`[name=type]`) are higher priority than those without (`[name]`)
- `[[optional]]` and `[...rest]` parameters are ignored unless they are the final part of the route, in which case they are treated with lowest priority. In other words `x/[[y]]/z` is treated equivalently to `x/z` for the purposes of sorting
- Ties are resolved alphabetically

...resulting in this ordering, meaning that `/foo-abc` will invoke `src/routes/foo-abc/+page.svelte`, and `/foo-def` will invoke `src/routes/foo-[c]/+page.svelte` rather than less specific routes:

Some characters can't be used on the filesystem — `/` on Linux and Mac, `\ / : * ? " < > |` on Windows. The `#` and `%` characters have special meaning in URLs, and the `[ ] ( )` characters have special meaning to SvelteKit, so these also can't be used directly as part of your route.

To use these characters in your routes, you can use hexadecimal escape sequences, which have the format `[x+nn]` where `nn` is a hexadecimal character code:

- `\` — `[x+5c]`
- `/` — `[x+2f]`
- `:` — `[x+3a]`
- `*` — `[x+2a]`
- `?` — `[x+3f]`
- `"` — `[x+22]`
- `<` — `[x+3c]`
- `>` — `[x+3e]`
- `|` — `[x+7c]`
- `#` — `[x+23]`
- `%` — `[x+25]`
- `[` — `[x+5b]`
- `]` — `[x+5d]`
- `(` — `[x+28]`
- `)` — `[x+29]`

For example, to create a `/smileys/:-)` route, you would create a `src/routes/smileys/[x+3a]-[x+29]/+page.svelte` file.

You can determine the hexadecimal code for a character with JavaScript:

You can also use Unicode escape sequences. Generally you won't need to as you can use the unencoded character directly, but if — for some reason — you can't have a filename with an emoji in it, for example, then you can use the escaped characters. In other words, these are equivalent:

The format for a Unicode escape sequence is `[u+nnnn]` where `nnnn` is a valid value between `0000` and `10ffff`. (Unlike JavaScript string escaping, there's no need to use surrogate pairs to represent code points above `ffff`.) To learn more about Unicode encodings, consult [Programming with Unicode](https://unicodebook.readthedocs.io/unicode_encodings.html).

> [!NOTE] Since TypeScript [struggles](https://github.com/microsoft/TypeScript/issues/13399) with directories with a leading `.` character, you may find it useful to encode these characters when creating e.g. [`.well-known`](https://en.wikipedia.org/wiki/Well-known_URI) routes: `src/routes/[x+2e]well-known/...`

By default, the _layout hierarchy_ mirrors the _route hierarchy_. In some cases, that might not be what you want.

Perhaps you have some routes that are 'app' routes that should have one layout (e.g. `/dashboard` or `/item`), and others that are 'marketing' routes that should have a different layout (`/about` or `/testimonials`). We can group these routes with a directory whose name is wrapped in parentheses — unlike normal directories, `(app)` and `(marketing)` do not affect the URL pathname of the routes inside them:

You can also put a `+page` directly inside a `(group)`, for example if `/` should be an `(app)` or a `(marketing)` page.

### Breaking out of layouts

The root layout applies to every page of your app — if omitted, it defaults to `{@render children()}`. If you want some pages to have a different layout hierarchy than the rest, then you can put your entire app inside one or more groups _except_ the routes that should not inherit the common layouts.

In the example above, the `/admin` route does not inherit either the `(app)` or `(marketing)` layouts.

Pages can break out of the current layout hierarchy on a route-by-route basis. Suppose we have an `/item/[id]/embed` route inside the `(app)` group from the previous example:

Ordinarily, this would inherit the root layout, the `(app)` layout, the `item` layout and the `[id]` layout. We can reset to one of those layouts by appending `@` followed by the segment name — or, for the root layout, the empty string. In this example, we can choose from the following options:

- `+page@[id].svelte` - inherits from `src/routes/(app)/item/[id]/+layout.svelte`
- `+page@item.svelte` - inherits from `src/routes/(app)/item/+layout.svelte`
- `+page@(app).svelte` - inherits from `src/routes/(app)/+layout.svelte`
- `+page@.svelte` - inherits from `src/routes/+layout.svelte`

Like pages, layouts can _themselves_ break out of their parent layout hierarchy, using the same technique. For example, a `+layout@.svelte` component would reset the hierarchy for all its child routes.

### When to use layout groups

Not all use cases are suited for layout grouping, nor should you feel compelled to use them. It might be that your use case would result in complex `(group)` nesting, or that you don't want to introduce a `(group)` for a single outlier. It's perfectly fine to use other means such as composition (reusable `load` functions or Svelte components) or if-statements to achieve what you want. The following example shows a layout that rewinds to the root layout and reuses components and functions that other layouts can also use:

- [Tutorial: Advanced Routing](/tutorial/kit/optional-params)

**Examples:**

Example 1 (sh):

```sh
/[org]/[repo]/tree/[branch]/[...file]
```

Example 2 (js):

```js
// @noErrors
{
	org: 'sveltejs',
	repo: 'kit',
	branch: 'main',
	file: 'documentation/docs/04-advanced-routing.md'
}
```

Example 3 (tree):

```tree
src/routes/
├ marx-brothers/
│ ├ chico/
│ ├ harpo/
│ ├ groucho/
│ └ +error.svelte
└ +error.svelte
```

Example 4 (tree):

```tree
src/routes/
├ marx-brothers/
+++| ├ [...path]/+++
│ ├ chico/
│ ├ harpo/
│ ├ groucho/
│ └ +error.svelte
└ +error.svelte
```

---

## Shallow routing

**URL:** llms-txt#shallow-routing

**Contents:**

- API
- Loading data for a route
- Caveats

As you navigate around a SvelteKit app, you create _history entries_. Clicking the back and forward buttons traverses through this list of entries, re-running any `load` functions and replacing page components as necessary.

Sometimes, it's useful to create history entries _without_ navigating. For example, you might want to show a modal dialog that the user can dismiss by navigating back. This is particularly valuable on mobile devices, where swipe gestures are often more natural than interacting directly with the UI. In these cases, a modal that is _not_ associated with a history entry can be a source of frustration, as a user may swipe backwards in an attempt to dismiss it and find themselves on the wrong page.

SvelteKit makes this possible with the [`pushState`]($app-navigation#pushState) and [`replaceState`]($app-navigation#replaceState) functions, which allow you to associate state with a history entry without navigating. For example, to implement a history-driven modal:

The modal can be dismissed by navigating back (unsetting `page.state.showModal`) or by interacting with it in a way that causes the `close` callback to run, which will navigate back programmatically.

The first argument to `pushState` is the URL, relative to the current URL. To stay on the current URL, use `''`.

The second argument is the new page state, which can be accessed via the [page object]($app-state#page) as `page.state`. You can make page state type-safe by declaring an [`App.PageState`](types#PageState) interface (usually in `src/app.d.ts`).

To set page state without creating a new history entry, use `replaceState` instead of `pushState`.

> [!LEGACY]
> `page.state` from `$app/state` was added in SvelteKit 2.12. If you're using an earlier version or are using Svelte 4, use `$page.state` from `$app/stores` instead.

## Loading data for a route

When shallow routing, you may want to render another `+page.svelte` inside the current page. For example, clicking on a photo thumbnail could pop up the detail view without navigating to the photo page.

For this to work, you need to load the data that the `+page.svelte` expects. A convenient way to do this is to use [`preloadData`]($app-navigation#preloadData) inside the `click` handler of an `<a>` element. If the element (or a parent) uses [`data-sveltekit-preload-data`](link-options#data-sveltekit-preload-data), the data will have already been requested, and `preloadData` will reuse that request.

During server-side rendering, `page.state` is always an empty object. The same is true for the first page the user lands on — if the user reloads the page (or returns from another document), state will _not_ be applied until they navigate.

Shallow routing is a feature that requires JavaScript to work. Be mindful when using it and try to think of sensible fallback behavior in case JavaScript isn't available.

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: +page.svelte --->
<script>
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import Modal from './Modal.svelte';

	function showModal() {
		pushState('', {
			showModal: true
		});
	}
</script>

{#if page.state.showModal}
	<Modal close={() => history.back()} />
{/if}
```

Example 2 (svelte):

```svelte
<!--- file: src/routes/photos/+page.svelte --->
<script>
	import { preloadData, pushState, goto } from '$app/navigation';
	import { page } from '$app/state';
	import Modal from './Modal.svelte';
	import PhotoPage from './[id]/+page.svelte';

	let { data } = $props();
</script>

{#each data.thumbnails as thumbnail}
	<a
		href="/photos/{thumbnail.id}"
		onclick={async (e) => {
			if (innerWidth < 640        // bail if the screen is too small
				|| e.shiftKey             // or the link is opened in a new window
				|| e.metaKey || e.ctrlKey // or a new tab (mac: metaKey, win/linux: ctrlKey)
				// should also consider clicking with a mouse scroll wheel
			) return;

			// prevent navigation
			e.preventDefault();

			const { href } = e.currentTarget;

			// run `load` functions (or rather, get the result of the `load` functions
			// that are already running because of `data-sveltekit-preload-data`)
			const result = await preloadData(href);

			if (result.type === 'loaded' && result.status === 200) {
				pushState(href, { selected: result.data });
			} else {
				// something bad happened! try navigating
				goto(href);
			}
		}}
	>
		<img alt={thumbnail.alt} src={thumbnail.src} />
	</a>
{/each}

{#if page.state.selected}
	<Modal onclose={() => history.back()}>
		<!-- pass page data to the +page.svelte component,
		     just like SvelteKit would on navigation -->
		<PhotoPage data={page.state.selected} />
	</Modal>
{/if}
```

---
