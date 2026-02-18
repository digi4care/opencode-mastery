# Svelte-Kit_Docs - Form Actions

**Pages:** 1

---

## Form actions

**URL:** llms-txt#form-actions

**Contents:**

- Default actions
- Named actions
- Anatomy of an action
  - Validation errors
  - Redirects
- Loading data
- Progressive enhancement
  - use:enhance
  - Customising use:enhance
  - Custom event listener

A `+page.server.js` file can export _actions_, which allow you to `POST` data to the server using the `<form>` element.

When using `<form>`, client-side JavaScript is optional, but you can easily _progressively enhance_ your form interactions with JavaScript to provide the best user experience.

In the simplest case, a page declares a `default` action:

To invoke this action from the `/login` page, just add a `<form>` — no JavaScript needed:

If someone were to click the button, the browser would send the form data via `POST` request to the server, running the default action.

> [!NOTE] Actions always use `POST` requests, since `GET` requests should never have side-effects.

We can also invoke the action from other pages (for example if there's a login widget in the nav in the root layout) by adding the `action` attribute, pointing to the page:

Instead of one `default` action, a page can have as many named actions as it needs:

To invoke a named action, add a query parameter with the name prefixed by a `/` character:

As well as the `action` attribute, we can use the `formaction` attribute on a button to `POST` the same form data to a different action than the parent `<form>`:

> [!NOTE] We can't have default actions next to named actions, because if you POST to a named action without a redirect, the query parameter is persisted in the URL, which means the next default POST would go through the named action from before.

## Anatomy of an action

Each action receives a `RequestEvent` object, allowing you to read the data with `request.formData()`. After processing the request (for example, logging the user in by setting a cookie), the action can respond with data that will be available through the `form` property on the corresponding page and through `page.form` app-wide until the next update.

> [!LEGACY]
> `PageProps` was added in 2.16.0. In earlier versions, you had to type the `data` and `form` properties individually:
>
> In Svelte 4, you'd use `export let data` and `export let form` instead to declare properties.

### Validation errors

If the request couldn't be processed because of invalid data, you can return validation errors — along with the previously submitted form values — back to the user so that they can try again. The `fail` function lets you return an HTTP status code (typically 400 or 422, in the case of validation errors) along with the data. The status code is available through `page.status` and the data through `form`:

> [!NOTE] Note that as a precaution, we only return the email back to the page — not the password.

The returned data must be serializable as JSON. Beyond that, the structure is entirely up to you. For example, if you had multiple forms on the page, you could distinguish which `<form>` the returned `form` data referred to with an `id` property or similar.

Redirects (and errors) work exactly the same as in [`load`](load#Redirects):

After an action runs, the page will be re-rendered (unless a redirect or an unexpected error occurs), with the action's return value available to the page as the `form` prop. This means that your page's `load` functions will run after the action completes.

Note that `handle` runs before the action is invoked, and does not rerun before the `load` functions. This means that if, for example, you use `handle` to populate `event.locals` based on a cookie, you must update `event.locals` when you set or delete the cookie in an action:

## Progressive enhancement

In the preceding sections we built a `/login` action that [works without client-side JavaScript](https://kryogenix.org/code/browser/everyonehasjs.html) — not a `fetch` in sight. That's great, but when JavaScript _is_ available we can progressively enhance our form interactions to provide a better user experience.

The easiest way to progressively enhance a form is to add the `use:enhance` action:

> [!NOTE] `use:enhance` can only be used with forms that have `method="POST"` and point to actions defined in a `+page.server.js` file. It will not work with `method="GET"`, which is the default for forms without a specified method. Attempting to use `use:enhance` on forms without `method="POST"` or posting to a `+server.js` endpoint will result in an error.

> [!NOTE] Yes, it's a little confusing that the `enhance` action and `<form action>` are both called 'action'. These docs are action-packed. Sorry.

Without an argument, `use:enhance` will emulate the browser-native behaviour, just without the full-page reloads. It will:

- update the `form` property, `page.form` and `page.status` on a successful or invalid response, but only if the action is on the same page you're submitting from. For example, if your form looks like `<form action="/somewhere/else" ..>`, the `form` prop and the `page.form` state will _not_ be updated. This is because in the native form submission case you would be redirected to the page the action is on. If you want to have them updated either way, use [`applyAction`](#Progressive-enhancement-Customising-use:enhance)
- reset the `<form>` element
- invalidate all data using `invalidateAll` on a successful response
- call `goto` on a redirect response
- render the nearest `+error` boundary if an error occurs
- [reset focus](accessibility#Focus-management) to the appropriate element

### Customising use:enhance

To customise the behaviour, you can provide a `SubmitFunction` that runs immediately before the form is submitted, and (optionally) returns a callback that runs with the `ActionResult`.

You can use these functions to show and hide loading UI, and so on.

If you return a callback, you override the default post-submission behavior. To get it back, call `update`, which accepts `invalidateAll` and `reset` parameters, or use `applyAction` on the result:

The behaviour of `applyAction(result)` depends on `result.type`:

- `success`, `failure` — sets `page.status` to `result.status` and updates `form` and `page.form` to `result.data` (regardless of where you are submitting from, in contrast to `update` from `enhance`)
- `redirect` — calls `goto(result.location, { invalidateAll: true })`
- `error` — renders the nearest `+error` boundary with `result.error`

In all cases, [focus will be reset](accessibility#Focus-management).

### Custom event listener

We can also implement progressive enhancement ourselves, without `use:enhance`, with a normal event listener on the `<form>`:

Note that you need to `deserialize` the response before processing it further using the corresponding method from `$app/forms`. `JSON.parse()` isn't enough because form actions - like `load` functions - also support returning `Date` or `BigInt` objects.

If you have a `+server.js` alongside your `+page.server.js`, `fetch` requests will be routed there by default. To `POST` to an action in `+page.server.js` instead, use the custom `x-sveltekit-action` header:

Form actions are the preferred way to send data to the server, since they can be progressively enhanced, but you can also use [`+server.js`](routing#server) files to expose (for example) a JSON API. Here's how such an interaction could look like:

As we've seen, to invoke a form action you must use `method="POST"`.

Some forms don't need to `POST` data to the server — search inputs, for example. For these you can use `method="GET"` (or, equivalently, no `method` at all), and SvelteKit will treat them like `<a>` elements, using the client-side router instead of a full page navigation:

Submitting this form will navigate to `/search?q=...` and invoke your load function but will not invoke an action. As with `<a>` elements, you can set the [`data-sveltekit-reload`](link-options#data-sveltekit-reload), [`data-sveltekit-replacestate`](link-options#data-sveltekit-replacestate), [`data-sveltekit-keepfocus`](link-options#data-sveltekit-keepfocus) and [`data-sveltekit-noscroll`](link-options#data-sveltekit-noscroll) attributes on the `<form>` to control the router's behaviour.

- [Tutorial: Forms](/tutorial/kit/the-form-element)

**Examples:**

Example 1 (js):

```js
/// file: src/routes/login/+page.server.js
/** @satisfies {import('./$types').Actions} */
export const actions = {
  default: async event => {
    // TODO log the user in
  },
};
```

Example 2 (svelte):

```svelte
<!--- file: src/routes/login/+page.svelte --->
<form method="POST">
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
</form>
```

Example 3 (html):

```html
/// file: src/routes/+layout.svelte
<form method="POST" action="/login">
  <!-- content -->
</form>
```

Example 4 (js):

```js
/// file: src/routes/login/+page.server.js
/** @satisfies {import('./$types').Actions} */
export const actions = {
---	default: async (event) => {---
+++	login: async (event) => {+++
		// TODO log the user in
	},
+++	register: async (event) => {
		// TODO register the user
	}+++
};
```

---
