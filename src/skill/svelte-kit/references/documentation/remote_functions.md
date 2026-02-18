# Svelte-Kit_Docs - Remote Functions

**Pages:** 4

---

## Remote functions

## Additional Documentation

For comprehensive guides and examples, see:

- **[Real-World Examples](remote-functions-real-world.md)** - Production-ready patterns for common use cases (authentication, e-commerce, file uploads, etc.)
- **[Edge Cases & Error Handling](remote-functions-edge-cases.md)** - Network timeouts, retry logic, request cancellation, memory leaks, etc.
- **[Integration Patterns](remote-functions-integrations.md)** - With Svelte stores, hooks, WebSockets, external APIs, etc.

**URL:** llms-txt#remote-functions

**Contents:**

- Overview
- query
  - Query arguments
  - Refreshing queries
- query.batch
- form
  - Fields
  - Programmatic validation
  - Validation
  - Getting/setting inputs

<blockquote class="since note">
	<p>Available since 2.27</p>
</blockquote>

Remote functions are a tool for type-safe communication between client and server. They can be _called_ anywhere in your app, but always _run_ on the server, meaning they can safely access [server-only modules](server-only-modules) containing things like environment variables and database clients.

Combined with Svelte's experimental support for [`await`](/docs/svelte/await-expressions), it allows you to load and manipulate data directly inside your components.

This feature is currently experimental, meaning it is likely to contain bugs and is subject to change without notice. You must opt in by adding the `kit.experimental.remoteFunctions` option in your `svelte.config.js` and optionally, the `compilerOptions.experimental.async` option to use `await` in components:

Remote functions are exported from a `.remote.js` or `.remote.ts` file, and come in four flavours: `query`, `form`, `command` and `prerender`. On the client, the exported functions are transformed to `fetch` wrappers that invoke their counterparts on the server via a generated HTTP endpoint. Remote files can be placed anywhere in your `src` directory (except inside the `src/lib/server` directory), and third party libraries can provide them, too.

The `query` function allows you to read dynamic data from the server (for _static_ data, consider using [`prerender`](#prerender) instead):

> [!NOTE] Throughout this page, you'll see imports from fictional modules like `$lib/server/database` and `$lib/server/auth`. These are purely for illustrative purposes — you can use whatever database client and auth setup you like.
>
> The `db.sql` function above is a [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) that escapes any interpolated values.

The query returned from `getPosts` works as a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to `posts`:

Until the promise resolves — and if it errors — the nearest [`<svelte:boundary>`](../svelte/svelte-boundary) will be invoked.

While using `await` is recommended, as an alternative the query also has `loading`, `error` and `current` properties:

> [!NOTE] For the rest of this document, we'll use the `await` form.

Query functions can accept an argument, such as the `slug` of an individual post:

Since `getPost` exposes an HTTP endpoint, it's important to validate this argument to be sure that it's the correct type. For this, we can use any [Standard Schema](https://standardschema.dev/) validation library such as [Zod](https://zod.dev/) or [Valibot](https://valibot.dev/):

Both the argument and the return value are serialized with [devalue](https://github.com/sveltejs/devalue), which handles types like `Date` and `Map` (and custom types defined in your [transport hook](hooks#Universal-hooks-transport)) in addition to JSON.

### Refreshing queries

Any query can be re-fetched via its `refresh` method, which retrieves the latest value from the server:

> [!NOTE] Queries are cached while they're on the page, meaning `getPosts() === getPosts()`. This means you don't need a reference like `const posts = getPosts()` in order to update the query.

`query.batch` works like `query` except that it batches requests that happen within the same macrotask. This solves the so-called n+1 problem: rather than each query resulting in a separate database call (for example), simultaneous queries are grouped together.

On the server, the callback receives an array of the arguments the function was called with. It must return a function of the form `(input: Input, index: number) => Output`. SvelteKit will then call this with each of the input arguments to resolve the individual calls with their results.

The `form` function makes it easy to write data to the server. It takes a callback that receives `data` constructed from the submitted [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData)...

...and returns an object that can be spread onto a `<form>` element. The callback is called whenever the form is submitted.

The form object contains `method` and `action` properties that allow it to work without JavaScript (i.e. it submits data and reloads the page). It also has an [attachment](/docs/svelte/@attach) that progressively enhances the form when JavaScript is available, submitting data _without_ reloading the entire page.

As with `query`, if the callback uses the submitted `data`, it should be [validated](#query-Query-arguments) by passing a [Standard Schema](https://standardschema.dev) as the first argument to `form`.

A form is composed of a set of _fields_, which are defined by the schema. In the case of `createPost`, we have two fields, `title` and `content`, which are both strings. To get the attributes for a field, call its `.as(...)` method, specifying which [input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#input_types) to use:

These attributes allow SvelteKit to set the correct input type, set a `name` that is used to construct the `data` passed to the handler, populate the `value` of the form (for example following a failed submission, to save the user having to re-enter everything), and set the [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-invalid) state.

> [!NOTE] The generated `name` attribute uses JS object notation (e.g. `nested.array[0].value`). String keys that require quotes such as `object['nested-array'][0].value` are not supported. Under the hood, boolean checkbox and number field names are prefixed with `b:` and `n:`, respectively, to signal SvelteKit to coerce the values from strings prior to validation.

Fields can be nested in objects and arrays, and their values can be strings, numbers, booleans or `File` objects. For example, if your schema looked like this...

...your form could look like this:

Because our form contains a `file` input, we've added an `enctype="multipart/form-data"` attribute. The values for `info.height` and `info.likesDogs` are coerced to a number and a boolean respectively.

> [!NOTE] If a `checkbox` input is unchecked, the value is not included in the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object that SvelteKit constructs the data from. As such, we have to make the value optional in our schema. In Valibot that means using `v.optional(v.boolean(), false)` instead of just `v.boolean()`, whereas in Zod it would mean using `z.coerce.boolean<boolean>()`.

In the case of `radio` and `checkbox` inputs that all belong to the same field, the `value` must be specified as a second argument to `.as(...)`:

Alternatively, you could use `select` and `select multiple`:

> [!NOTE] As with unchecked `checkbox` inputs, if no selections are made then the data will be `undefined`. For this reason, the `languages` field uses `v.optional(v.array(...), [])` rather than just `v.array(...)`.

### Programmatic validation

In addition to declarative schema validation, you can programmatically mark fields as invalid inside the form handler using the `invalid` function. This is useful for cases where you can't know if something is valid until you try to perform some action. Just like `redirect` or `error`, `invalid` throws. It expects a list of strings (for issues relating to the form as a whole) or standard-schema-compliant issues (for those relating to a specific field). Use the `issue` parameter for type-safe creation of such issues:

The `invalid` function works as both a function and a proxy:

- Call `invalid(issue1, issue2, ...issueN)` to throw a validation error
- If an issue is a `string`, it applies to the form as a whole (and will show up in `fields.allIssues()`)
- Use `invalid.fieldName(message)` to create an issue for a specific field. Like `fields` this is type-safe and you can use regular property access syntax to create issues for deeply nested objects (e.g. `invalid.profile.email('Email already exists')` or `invalid.items[0].qty('Insufficient stock')`)

If the submitted data doesn't pass the schema, the callback will not run. Instead, each invalid field's `issues()` method will return an array of `{ message: string }` objects, and the `aria-invalid` attribute (returned from `as(...)`) will be set to `true`:

You don't need to wait until the form is submitted to validate the data — you can call `validate()` programmatically, for example in an `oninput` callback (which will validate the data on every keystroke) or an `onchange` callback:

By default, issues will be ignored if they belong to form controls that haven't yet been interacted with. To validate _all_ inputs, call `validate({ includeUntouched: true })`.

For client-side validation, you can specify a _preflight_ schema which will populate `issues()` and prevent data being sent to the server if the data doesn't validate:

> [!NOTE] The preflight schema can be the same object as your server-side schema, if appropriate, though it won't be able to do server-side checks like 'this value already exists in the database'. Note that you cannot export a schema from a `.remote.ts` or `.remote.js` file, so the schema must either be exported from a shared module, or from a `<script module>` block in the component containing the `<form>`.

To get a list of _all_ issues, rather than just those belonging to a single field, you can use the `fields.allIssues()` method:

### Getting/setting inputs

Each field has a `value()` method that reflects its current value. As the user interacts with the form, it is automatically updated:

Alternatively, `createPost.fields.value()` would return a `{ title, content }` object.

You can update a field (or a collection of fields) via the `set(...)` method:

### Handling sensitive data

In the case of a non-progressively-enhanced form submission (i.e. where JavaScript is unavailable, for whatever reason) `value()` is also populated if the submitted data is invalid, so that the user does not need to fill the entire form out from scratch.

You can prevent sensitive data (such as passwords and credit card numbers) from being sent back to the user by using a name with a leading underscore:

In this example, if the data does not validate, only the first `<input>` will be populated when the page reloads.

### Single-flight mutations

By default, all queries used on the page (along with any `load` functions) are automatically refreshed following a successful form submission. This ensures that everything is up-to-date, but it's also inefficient: many queries will be unchanged, and it requires a second trip to the server to get the updated data.

Instead, we can specify which queries should be refreshed in response to a particular form submission. This is called a _single-flight mutation_, and there are two ways to achieve it. The first is to refresh the query on the server, inside the form handler:

The second is to drive the single-flight mutation from the client, which we'll see in the section on [`enhance`](#form-enhance).

### Returns and redirects

The example above uses [`redirect(...)`](@sveltejs-kit#redirect), which sends the user to the newly created page. Alternatively, the callback could return data, in which case it would be available as `createPost.result`:

This value is _ephemeral_ — it will vanish if you resubmit, navigate away, or reload the page.

> [!NOTE] The `result` value need not indicate success — it can also contain validation errors, along with any data that should repopulate the form on page reload.

If an error occurs during submission, the nearest `+error.svelte` page will be rendered.

We can customize what happens when the form is submitted with the `enhance` method:

> When using `enhance`, the `<form>` is not automatically reset — you must call `form.reset()` if you want to clear the inputs.

The callback receives the `form` element, the `data` it contains, and a `submit` function.

To enable client-driven [single-flight mutations](#form-Single-flight-mutations), use `submit().updates(...)`. For example, if the `getPosts()` query was used on this page, we could refresh it like so:

We can also _override_ the current data while the submission is ongoing:

The override will be applied immediately, and released when the submission completes (or fails).

### Multiple instances of a form

Some forms may be repeated as part of a list. In this case you can create separate instances of a form function via `for(id)` to achieve isolation.

By default, submitting a form will send a request to the URL indicated by the `<form>` element's [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#attributes_for_form_submission) attribute, which in the case of a remote function is a property on the form object generated by SvelteKit.

It's possible for a `<button>` inside the `<form>` to send the request to a _different_ URL, using the [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#formaction) attribute. For example, you might have a single form that allows you to log in or register depending on which button was clicked.

This attribute exists on the `buttonProps` property of a form object:

Like the form object itself, `buttonProps` has an `enhance` method for customizing submission behaviour.

The `command` function, like `form`, allows you to write data to the server. Unlike `form`, it's not specific to an element and can be called from anywhere.

> [!NOTE] Prefer `form` where possible, since it gracefully degrades if JavaScript is disabled or fails to load.

As with `query` and `form`, if the function accepts an argument, it should be [validated](#query-Query-arguments) by passing a [Standard Schema](https://standardschema.dev) as the first argument to `command`.

Now simply call `addLike`, from (for example) an event handler:

> [!NOTE] Commands cannot be called during render.

To update `getLikes(item.id)`, or any other query, we need to tell SvelteKit _which_ queries need to be refreshed (unlike `form`, which by default invalidates everything, to approximate the behaviour of a native form submission).

We either do that inside the command itself...

...or when we call it:

As before, we can use `withOverride` for optimistic updates:

The `prerender` function is similar to `query`, except that it will be invoked at build time to prerender the result. Use this for data that changes at most once per redeployment.

You can use `prerender` functions on pages that are otherwise dynamic, allowing for partial prerendering of your data. This results in very fast navigation, since prerendered data can live on a CDN along with your other static assets.

In the browser, prerendered data is saved using the [`Cache`](https://developer.mozilla.org/en-US/docs/Web/API/Cache) API. This cache survives page reloads, and will be cleared when the user first visits a new deployment of your app.

> [!NOTE] When the entire page has `export const prerender = true`, you cannot use queries, as they are dynamic.

### Prerender arguments

As with queries, prerender functions can accept an argument, which should be [validated](#query-Query-arguments) with a [Standard Schema](https://standardschema.dev/):

Any calls to `getPost(...)` found by SvelteKit's crawler while [prerendering pages](page-options#prerender) will be saved automatically, but you can also specify which values it should be called with using the `inputs` option:

By default, prerender functions are excluded from your server bundle, which means that you cannot call them with any arguments that were _not_ prerendered. You can set `dynamic: true` to change this behaviour:

## Handling validation errors

As long as _you're_ not passing invalid data to your remote functions, there are only two reasons why the argument passed to a `command`, `query` or `prerender` function would fail validation:

- the function signature changed between deployments, and some users are currently on an older version of your app
- someone is trying to attack your site by poking your exposed endpoints with bad data

In the second case, we don't want to give the attacker any help, so SvelteKit will generate a generic [400 Bad Request](https://http.dog/400) response. You can control the message by implementing the [`handleValidationError`](hooks#Server-hooks-handleValidationError) server hook, which, like [`handleError`](hooks#Shared-hooks-handleError), must return an [`App.Error`](errors#Type-safety) (which defaults to `{ message: string }`):

If you know what you're doing and want to opt out of validation, you can pass the string `'unchecked'` in place of a schema:

## Using `getRequestEvent`

Inside `query`, `form` and `command` you can use [`getRequestEvent`]($app-server#getRequestEvent) to get the current [`RequestEvent`](@sveltejs-kit#RequestEvent) object. This makes it easy to build abstractions for interacting with cookies, for example:

Note that some properties of `RequestEvent` are different inside remote functions:

- you cannot set headers (other than writing cookies, and then only inside `form` and `command` functions)
- `route`, `params` and `url` relate to the page the remote function was called from, _not_ the URL of the endpoint SvelteKit creates for the remote function. Queries are not re-run when the user navigates (unless the argument to the query changes as a result of navigation), and so you should be mindful of how you use these values. In particular, never use them to determine whether or not a user is authorized to access certain data.

Inside `query`, `form` and `prerender` functions it is possible to use the [`redirect(...)`](@sveltejs-kit#redirect) function. It is _not_ possible inside `command` functions, as you should avoid redirecting here. (If you absolutely have to, you can return a `{ redirect: location }` object and deal with it in the client.)

**Examples:**

Example 1 (js):

```js
/// file: svelte.config.js
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		experimental: {
			+++remoteFunctions: true+++
		}
	},
	compilerOptions: {
		experimental: {
			+++async: true+++
		}
	}
};

export default config;
```

Example 2 (js):

```js
/// file: src/routes/blog/data.remote.js
// @filename: ambient.d.ts
declare module '$lib/server/database' {
	export function sql(strings: TemplateStringsArray, ...values: any[]): Promise<any[]>;
}
// @filename: index.js
// ---cut---
import { query } from '$app/server';
import * as db from '$lib/server/database';

export const getPosts = query(async () => {
	const posts = await db.sql`
		SELECT title, slug
		FROM post
		ORDER BY published_at
		DESC
	`;

	return posts;
});
```

Example 3 (svelte):

```svelte
<!--- file: src/routes/blog/+page.svelte --->
<script>
	import { getPosts } from './data.remote';
</script>

<h1>Recent posts</h1>

<ul>
	{#each await getPosts() as { title, slug }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
```

Example 4 (svelte):

```svelte
<!--- file: src/routes/blog/+page.svelte --->
<script>
	import { getPosts } from './data.remote';

	const query = getPosts();
</script>

<h1>Recent posts</h1>

{#if query.error}
	<p>oops!</p>
{:else if query.loading}
	<p>loading...</p>
{:else}
	<ul>
		{#each query.current as { title, slug }}
			<li><a href="/blog/{slug}">{title}</a></li>
		{/each}
	</ul>
{/if}
```

---
