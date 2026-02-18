# Svelte-Kit_Docs - Kit Api

**Pages:** 4

---

## @sveltejs/kit

**URL:** llms-txt#@sveltejs/kit

**Contents:**

- Server
- VERSION
- error
- fail
- invalid
- isActionFailure
- isHttpError
- isRedirect
- isValidationError
- json

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

Throws an error with a HTTP status code and an optional message.
When called during request handling, this will cause SvelteKit to
return an error response without invoking `handleError`.
Make sure you're not catching the thrown error, which would prevent SvelteKit from handling it.

<div class="ts-block">

<div class="ts-block">

Create an `ActionFailure` object. Call when form submission fails.

<div class="ts-block">

<div class="ts-block">

<blockquote class="since note">

Available since 2.47.3

Use this to throw a validation error to imperatively fail form validation.
Can be used in combination with `issue` passed to form actions to create field-specific issues.

<div class="ts-block">

Checks whether this is an action failure thrown by `fail`.

<div class="ts-block">

Checks whether this is an error thrown by `error`.

<div class="ts-block">

Checks whether this is a redirect thrown by `redirect`.

<div class="ts-block">

<blockquote class="since note">

Available since 2.47.3

Checks whether this is an validation error thrown by `invalid`.

<div class="ts-block">

Create a JSON `Response` object from the supplied data.

<div class="ts-block">

<blockquote class="since note">

Available since 2.18.0

Strips possible SvelteKit-internal suffixes and trailing slashes from the URL pathname.
Returns the normalized URL as well as a method for adding the potential suffix back
based on a new pathname (possibly including search) or URL.

<div class="ts-block">

Redirect a request. When called during request handling, SvelteKit will return a redirect response.
Make sure you're not catching the thrown redirect, which would prevent SvelteKit from handling it.

Most common status codes:

- `303 See Other`: redirect as a GET request (often used after a form POST request)
- `307 Temporary Redirect`: redirect will keep the request method
- `308 Permanent Redirect`: redirect will keep the request method, SEO will be transferred to the new page

[See all redirect status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages)

<div class="ts-block">

Create a `Response` object from the supplied body.

<div class="ts-block">

Shape of a form action method that is part of `export const actions = {...}` in `+page.server.js`.
See [form actions](/docs/kit/form-actions) for more information.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

When calling a form action via fetch, the response will be one of these shapes.

<div class="ts-block">

Shape of the `export const actions = {...}` object in `+page.server.js`.
See [form actions](/docs/kit/form-actions) for more information.

<div class="ts-block">

[Adapters](/docs/kit/adapters) are responsible for taking the production build and turning it into something that can be deployed to a platform of your choosing.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The name of the adapter, using for logging. Will typically correspond to the package name.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `builder` An object provided by SvelteKit that contains methods for adapting the app

This function is called after SvelteKit has built your app.

<div class="ts-block-property">

<div class="ts-block-property-details">

Checks called during dev and build to determine whether specific features will work in production with this adapter.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `details.config` The merged route config

Test support for `read` from `$app/server`.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v2.31.0

Test support for `instrumentation.server.js`. To pass, the adapter must support running `instrumentation.server.js` prior to the application code.

<div class="ts-block-property">

<div class="ts-block-property-details">

Creates an `Emulator`, which allows the adapter to influence the environment
during dev, build and prerendering.

The argument passed to [`afterNavigate`](/docs/kit/$app-navigation#afterNavigate) callbacks.

<div class="ts-block">

<div class="ts-block">

The argument passed to [`beforeNavigate`](/docs/kit/$app-navigation#beforeNavigate) callbacks.

<div class="ts-block">

This object is passed to the `adapt` function of adapters.
It contains various methods and properties that are useful for adapting the app.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Print messages to the console. `log.info` and `log.minor` are silent unless Vite's `logLevel` is `info`.

<div class="ts-block-property">

<div class="ts-block-property-details">

Remove `dir` and all its contents.

<div class="ts-block-property">

<div class="ts-block-property-details">

Create `dir` and any required parent directories.

<div class="ts-block-property">

<div class="ts-block-property-details">

The fully resolved Svelte config.

<div class="ts-block-property">

<div class="ts-block-property-details">

Information about prerendered pages and assets, if any.

<div class="ts-block-property">

<div class="ts-block-property-details">

An array of all routes (including prerendered)

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `fn` A function that groups a set of routes into an entry point
- <span class="tag deprecated">deprecated</span> Use `builder.routes` instead

Create separate functions that map to one or more routes of your app.

<div class="ts-block-property">

<div class="ts-block-property-details">

Find all the assets imported by server files belonging to `routes`

<div class="ts-block-property">

<div class="ts-block-property-details">

Generate a fallback page for a static webserver to use when no route is matched. Useful for single-page apps.

<div class="ts-block-property">

<div class="ts-block-property-details">

Generate a module exposing build-time environment variables as `$env/dynamic/public`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `opts` a relative path to the base directory of the app and optionally in which format (esm or cjs) the manifest should be generated

Generate a server-side manifest to initialise the SvelteKit [server](/docs/kit/@sveltejs-kit#Server) with.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` path to the file, relative to the build directory

Resolve a path to the `name` directory inside `outDir`, e.g. `/path/to/.svelte-kit/my-adapter`.

<div class="ts-block-property">

<div class="ts-block-property-details">

Get the fully resolved path to the directory containing client-side assets, including the contents of your `static` directory.

<div class="ts-block-property">

<div class="ts-block-property-details">

Get the fully resolved path to the directory containing server-side code.

<div class="ts-block-property">

<div class="ts-block-property-details">

Get the application path including any configured `base` path, e.g. `my-base-path/_app`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `dest` the destination folder
- <span class="tag">returns</span> an array of files written to `dest`

Write client assets to `dest`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `dest` the destination folder
- <span class="tag">returns</span> an array of files written to `dest`

Write prerendered files to `dest`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `dest` the destination folder
- <span class="tag">returns</span> an array of files written to `dest`

Write server-side code to `dest`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `from` the source file or directory
- `to` the destination file or directory
- `opts.filter` a function to determine whether a file or directory should be copied
- `opts.replace` a map of strings to replace
- <span class="tag">returns</span> an array of files that were copied

Copy a file or directory.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">returns</span> true if the server instrumentation file exists, false otherwise
- <span class="tag since">available since</span> v2.31.0

Check if the server instrumentation file exists.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `options` an object containing the following properties:
- `options.entrypoint` the path to the entrypoint to trace.
- `options.instrumentation` the path to the instrumentation file.
- `options.start` the name of the start file. This is what `entrypoint` will be renamed to.
- `options.module` configuration for the resulting entrypoint module.
- `options.module.generateText` a function that receives the relative paths to the instrumentation and start files, and generates the text of the module to be traced. If not provided, the default implementation will be used, which uses top-level await.
- <span class="tag since">available since</span> v2.31.0

Instrument `entrypoint` with `instrumentation`.

Renames `entrypoint` to `start` and creates a new module at
`entrypoint` which imports `instrumentation` and then dynamically imports `start`. This allows
the module hooks necessary for instrumentation libraries to be loaded prior to any application code.

Caveats:

- "Live exports" will not work. If your adapter uses live exports, your users will need to manually import the server instrumentation on startup.
- If `tla` is `false`, OTEL auto-instrumentation may not work properly. Use it if your environment supports it.
- Use `hasServerInstrumentationFile` to check if the user has a server instrumentation file; if they don't, you shouldn't do this.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `directory` The directory containing the files to be compressed

Compress files in `directory` with gzip and brotli, where appropriate. Generates `.gz` and `.br` files alongside the originals.

<blockquote class="since note">

Available since 2.10.0

The [`init`](/docs/kit/hooks#Shared-hooks-init) will be invoked once the app starts in the browser

<div class="ts-block">

See the [configuration reference](/docs/kit/configuration) for details.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` the name of the cookie
- `opts` the options, passed directly to `cookie.parse`. See documentation [here](https://github.com/jshttp/cookie#cookieparsestr-options)

Gets a cookie that was previously set with `cookies.set`, or from the request headers.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `opts` the options, passed directly to `cookie.parse`. See documentation [here](https://github.com/jshttp/cookie#cookieparsestr-options)

Gets all cookies that were previously set with `cookies.set`, or from the request headers.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` the name of the cookie
- `value` the cookie value
- `opts` the options, passed directly to `cookie.serialize`. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Sets a cookie. This will add a `set-cookie` header to the response, but also make the cookie available via `cookies.get` or `cookies.getAll` during the current request.

The `httpOnly` and `secure` options are `true` by default (except on http://localhost, where `secure` is `false`), and must be explicitly disabled if you want cookies to be readable by client-side JavaScript and/or transmitted over HTTP. The `sameSite` option defaults to `lax`.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` the name of the cookie
- `opts` the options, passed directly to `cookie.serialize`. The `path` must match the path of the cookie you want to delete. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Deletes a cookie by setting its value to an empty string and setting the expiry date in the past.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` the name of the cookie
- `value` the cookie value
- `opts` the options, passed directly to `cookie.serialize`. See documentation [here](https://github.com/jshttp/cookie#cookieserializename-value-options)

Serialize a cookie name-value pair into a `Set-Cookie` header string, but don't apply it to the response.

The `httpOnly` and `secure` options are `true` by default (except on http://localhost, where `secure` is `false`), and must be explicitly disabled if you want cookies to be readable by client-side JavaScript and/or transmitted over HTTP. The `sameSite` option defaults to `lax`.

You must specify a `path` for the cookie. In most cases you should explicitly set `path: '/'` to make the cookie available throughout your app. You can use relative paths, or set `path: ''` to make the cookie only available on the current path and its children

A collection of functions that influence the environment during dev, build and prerendering

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

A function that is called with the current route `config` and `prerender` option
and returns an `App.Platform` object

The [`handle`](/docs/kit/hooks#Server-hooks-handle) hook runs every time the SvelteKit server receives a [request](/docs/kit/web-standards#Fetch-APIs-Request) and
determines the [response](/docs/kit/web-standards#Fetch-APIs-Response).
It receives an `event` object representing the request and a function called `resolve`, which renders the route and generates a `Response`.
This allows you to modify response headers or bodies, or bypass SvelteKit entirely (for implementing routes programmatically, for example).

<div class="ts-block">

The client-side [`handleError`](/docs/kit/hooks#Shared-hooks-handleError) hook runs when an unexpected error is thrown while navigating.

If an unexpected error is thrown during loading or the following render, this function will be called with the error and the event.
Make sure that this function _never_ throws an error.

<div class="ts-block">

The [`handleFetch`](/docs/kit/hooks#Server-hooks-handleFetch) hook allows you to modify (or replace) the result of an [`event.fetch`](/docs/kit/load#Making-fetch-requests) call that runs on the server (or during prerendering) inside an endpoint, `load`, `action`, `handle`, `handleError` or `reroute`.

<div class="ts-block">

The server-side [`handleError`](/docs/kit/hooks#Shared-hooks-handleError) hook runs when an unexpected error is thrown while responding to a request.

If an unexpected error is thrown during loading or rendering, this function will be called with the error and the event.
Make sure that this function _never_ throws an error.

<div class="ts-block">

## HandleValidationError

The [`handleValidationError`](/docs/kit/hooks#Server-hooks-handleValidationError) hook runs when the argument to a remote function fails validation.

It will be called with the validation issues and the event, and must return an object shape that matches `App.Error`.

<div class="ts-block">

The object returned by the [`error`](/docs/kit/@sveltejs-kit#error) function.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses), in the range 400-599.

<div class="ts-block-property">

<div class="ts-block-property-details">

The content of the error.

A function and proxy object used to imperatively create validation errors in form handlers.

Access properties to create field-specific issues: `issue.fieldName('message')`.
The type structure mirrors the input data structure for type-safe field access.
Call `invalid(issue.foo(...), issue.nested.bar(...))` to throw a validation error.

<div class="ts-block">

See the [configuration reference](/docs/kit/configuration) for details.

<div class="ts-block">

The generic form of `PageLoad` and `LayoutLoad`. You should import those from `./$types` (see [generated types](/docs/kit/types#Generated-types))
rather than using `Load` directly.

<div class="ts-block">

The generic form of `PageLoadEvent` and `LayoutLoadEvent`. You should import those from `./$types` (see [generated types](/docs/kit/types#Generated-types))
rather than using `LoadEvent` directly.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

`fetch` is equivalent to the [native `fetch` web API](https://developer.mozilla.org/en-US/docs/Web/API/fetch), with a few additional features:

- It can be used to make credentialed requests on the server, as it inherits the `cookie` and `authorization` headers for the page request.
- It can make relative requests on the server (ordinarily, `fetch` requires a URL with an origin when used in a server context).
- Internal requests (e.g. for `+server.js` routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
- During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the `text` and `json` methods of the `Response` object. Note that headers will _not_ be serialized, unless explicitly included via [`filterSerializedResponseHeaders`](/docs/kit/hooks#Server-hooks-handle)
- During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies [here](/docs/kit/load#Cookies)

<div class="ts-block-property">

<div class="ts-block-property-details">

Contains the data returned by the route's server `load` function (in `+layout.server.js` or `+page.server.js`), if any.

<div class="ts-block-property">

<div class="ts-block-property-details">

If you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:

Setting the same header multiple times (even in separate `load` functions) is an error — you can only set a given header once.

You cannot add a `set-cookie` header with `setHeaders` — use the [`cookies`](/docs/kit/@sveltejs-kit#Cookies) API in a server-only `load` function instead.

`setHeaders` has no effect when a `load` function runs in the browser.

<div class="ts-block-property">

<div class="ts-block-property-details">

`await parent()` returns data from parent `+layout.js` `load` functions.
Implicitly, a missing `+layout.js` is treated as a `({ data }) => data` function, meaning that it will return and forward data from parent `+layout.server.js` files.

Be careful not to introduce accidental waterfalls when using `await parent()`. If for example you only want to merge parent data into the returned output, call it _after_ fetching your other data.

<div class="ts-block-property">

<div class="ts-block-property-details">

This function declares that the `load` function has a _dependency_ on one or more URLs or custom identifiers, which can subsequently be used with [`invalidate()`](/docs/kit/$app-navigation#invalidate) to cause `load` to rerun.

Most of the time you won't need this, as `fetch` calls `depends` on your behalf — it's only necessary if you're using a custom API client that bypasses `fetch`.

URLs can be absolute or relative to the page being loaded, and must be [encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding).

Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the [URI specification](https://www.rfc-editor.org/rfc/rfc3986.html).

The following example shows how to use `depends` to register a dependency on a custom identifier, which is `invalidate`d after a button click, making the `load` function rerun.

<div class="ts-block-property">

<div class="ts-block-property-details">

Use this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v2.31.0

Access to spans for tracing. If tracing is not enabled or the function is being run in the browser, these spans will do nothing.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

Whether tracing is enabled.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The root span for the request. This span is named `sveltekit.handle.root`.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The span associated with the current `load` function.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Where navigation was triggered from

<div class="ts-block-property">

<div class="ts-block-property-details">

Where navigation is going to/has gone to

<div class="ts-block-property">

<div class="ts-block-property-details">

Whether or not the navigation will result in the page being unloaded (i.e. not a client-side navigation)

<div class="ts-block-property">

<div class="ts-block-property-details">

A promise that resolves once the navigation is complete, and rejects if the navigation
fails or is aborted. In the case of a `willUnload` navigation, the promise will never resolve

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The type of navigation:

- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

In case of a history back/forward navigation, the number of steps to go back/forward

<div class="ts-block-property">

<div class="ts-block-property-details">

Dispatched `Event` object when navigation occured by `popstate` or `link`.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The parameters of the current page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object

<div class="ts-block-property">

<div class="ts-block-property-details">

Info about the current route

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

<div class="ts-block-property">

<div class="ts-block-property-details">

The URL of the current page

## NavigationExternal

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The type of navigation:

- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

In case of a history back/forward navigation, the number of steps to go back/forward

## NavigationFormSubmit

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The type of navigation:

- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

The `SubmitEvent` that caused the navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

In case of a history back/forward navigation, the number of steps to go back/forward

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The type of navigation:

- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

The `PointerEvent` that caused the navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

In case of a history back/forward navigation, the number of steps to go back/forward

## NavigationPopState

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The type of navigation:

- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block-property">

<div class="ts-block-property-details">

In case of a history back/forward navigation, the number of steps to go back/forward

<div class="ts-block-property">

<div class="ts-block-property-details">

The `PopStateEvent` that caused the navigation

Information about the target of a specific navigation.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Parameters of the target page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object.
Is `null` if the target is not part of the SvelteKit app (could not be resolved to a route).

<div class="ts-block-property">

<div class="ts-block-property-details">

Info about the target route

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

<div class="ts-block-property">

<div class="ts-block-property-details">

The URL that is navigated to

- `enter`: The app has hydrated/started
- `form`: The user submitted a `<form method="GET">`
- `leave`: The app is being left either because the tab is being closed or a navigation to a different document is occurring
- `link`: Navigation was triggered by a link click
- `goto`: Navigation was triggered by a `goto(...)` call or a redirect
- `popstate`: Navigation was triggered by back/forward navigation

<div class="ts-block">

<div class="ts-block">

The argument passed to [`onNavigate`](/docs/kit/$app-navigation#onNavigate) callbacks.

<div class="ts-block">

The shape of the [`page`](/docs/kit/$app-state#page) reactive object and the [`$page`](/docs/kit/$app-stores) store.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The URL of the current page.

<div class="ts-block-property">

<div class="ts-block-property-details">

The parameters of the current page - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object.

<div class="ts-block-property">

<div class="ts-block-property-details">

Info about the current route.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

<div class="ts-block-property">

<div class="ts-block-property-details">

HTTP status code of the current page.

<div class="ts-block-property">

<div class="ts-block-property-details">

The error object of the current page, if any. Filled from the `handleError` hooks.

<div class="ts-block-property">

<div class="ts-block-property-details">

The merged result of all data from all `load` functions on the current page. You can type a common denominator through `App.PageData`.

<div class="ts-block-property">

<div class="ts-block-property-details">

The page state, which can be manipulated using the [`pushState`](/docs/kit/$app-navigation#pushState) and [`replaceState`](/docs/kit/$app-navigation#replaceState) functions from `$app/navigation`.

<div class="ts-block-property">

<div class="ts-block-property-details">

Filled only after a form submission. See [form actions](/docs/kit/form-actions) for more info.

The shape of a param matcher. See [matching](/docs/kit/advanced-routing#Matching) for more info.

<div class="ts-block">

<div class="ts-block">

The object returned by the [`redirect`](/docs/kit/@sveltejs-kit#redirect) function.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages), in the range 300-308.

<div class="ts-block-property">

<div class="ts-block-property-details">

The location to redirect to.

The return value of a remote `command` function. See [Remote functions](/docs/kit/remote-functions#command) for full documentation.

<div class="ts-block">

The return value of a remote `form` function. See [Remote functions](/docs/kit/remote-functions#form) for full documentation.

<div class="ts-block">

svelte
_ {#each todos as todo}
_ {@const todoForm = updateTodo.for(todo.id)}
_ <form {...todoForm}>
_ {#if todoForm.result?.invalid}<p>Invalid data</p>{/if}
_ ...
_ </form>
_ {/each}
_

Form field accessor type that provides name(), value(), and issues() methods

<div class="ts-block">

svelte
_ <input {...myForm.fields.myString.as('text')} />
_ <input {...myForm.fields.myNumber.as('number')} />
_ <input {...myForm.fields.myBoolean.as('checkbox')} />
_

## RemoteFormFieldType

<div class="ts-block">

## RemoteFormFieldValue

<div class="ts-block">

Recursive type to build form fields structure with proxy access

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## RemotePrerenderFunction

The return value of a remote `prerender` function. See [Remote functions](/docs/kit/remote-functions#prerender) for full documentation.

<div class="ts-block">

<div class="ts-block">

svelte
_ <script>
_ import { getTodos, addTodo } from './todos.remote.js';
_ const todos = getTodos();
_ </script> \*
_ <form {...addTodo.enhance(async ({ data, submit }) => {
_ await submit().updates(
_ todos.withOverride((todos) => [...todos, { text: data.get('text') }])
_ );
_ })}>
_ <input type="text" name="text" />
_ <button type="submit">Add Todo</button>
_ </form> \*

## RemoteQueryFunction

The return value of a remote `query` function. See [Remote functions](/docs/kit/remote-functions#query) for full documentation.

<div class="ts-block">

## RemoteQueryOverride

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Get or set cookies related to the current request

<div class="ts-block-property">

<div class="ts-block-property-details">

`fetch` is equivalent to the [native `fetch` web API](https://developer.mozilla.org/en-US/docs/Web/API/fetch), with a few additional features:

- It can be used to make credentialed requests on the server, as it inherits the `cookie` and `authorization` headers for the page request.
- It can make relative requests on the server (ordinarily, `fetch` requires a URL with an origin when used in a server context).
- Internal requests (e.g. for `+server.js` routes) go directly to the handler function when running on the server, without the overhead of an HTTP call.
- During server-side rendering, the response will be captured and inlined into the rendered HTML by hooking into the `text` and `json` methods of the `Response` object. Note that headers will _not_ be serialized, unless explicitly included via [`filterSerializedResponseHeaders`](/docs/kit/hooks#Server-hooks-handle)
- During hydration, the response will be read from the HTML, guaranteeing consistency and preventing an additional network request.

You can learn more about making credentialed requests with cookies [here](/docs/kit/load#Cookies).

<div class="ts-block-property">

<div class="ts-block-property-details">

The client's IP address, set by the adapter.

<div class="ts-block-property">

<div class="ts-block-property-details">

Contains custom data that was added to the request within the [`server handle hook`](/docs/kit/hooks#Server-hooks-handle).

<div class="ts-block-property">

<div class="ts-block-property-details">

The parameters of the current route - e.g. for a route like `/blog/[slug]`, a `{ slug: string }` object.

<div class="ts-block-property">

<div class="ts-block-property-details">

Additional data made available through the adapter.

<div class="ts-block-property">

<div class="ts-block-property-details">

The original request object.

<div class="ts-block-property">

<div class="ts-block-property-details">

Info about the current route.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

The ID of the current route - e.g. for `src/routes/blog/[slug]`, it would be `/blog/[slug]`. It is `null` when no route is matched.

<div class="ts-block-property">

<div class="ts-block-property-details">

If you need to set headers for the response, you can do so using the this method. This is useful if you want the page to be cached, for example:

Setting the same header multiple times (even in separate `load` functions) is an error — you can only set a given header once.

You cannot add a `set-cookie` header with `setHeaders` — use the [`cookies`](/docs/kit/@sveltejs-kit#Cookies) API instead.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property">

<div class="ts-block-property-details">

`true` if the request comes from the client asking for `+page/layout.server.js` data. The `url` property will be stripped of the internal information
related to the data request in this case. Use this property instead if the distinction is important to you.

<div class="ts-block-property">

<div class="ts-block-property-details">

`true` for `+server.js` calls coming from SvelteKit without the overhead of actually making an HTTP request. This happens when you make same-origin `fetch` requests on the server.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v2.31.0

Access to spans for tracing. If tracing is not enabled, these spans will do nothing.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

Whether tracing is enabled.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The root span for the request. This span is named `sveltekit.handle.root`.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The span associated with the current `handle` hook, `load` function, or form action.

<div class="ts-block-property">

<div class="ts-block-property-details">

`true` if the request comes from the client via a remote function. The `url` property will be stripped of the internal information
related to the data request in this case. Use this property instead if the distinction is important to you.

A `(event: RequestEvent) => Response` function exported from a `+server.js` file that corresponds to an HTTP verb (`GET`, `PUT`, `PATCH`, etc) and handles requests with that method.

It receives `Params` as the first generic argument, which you can skip by using [generated types](/docs/kit/types#Generated-types) instead.

<div class="ts-block">

<blockquote class="since note">

Available since 2.3.0

The [`reroute`](/docs/kit/hooks#Universal-hooks-reroute) hook allows you to modify the URL before it is used to determine which route to render.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `input` the html chunk and the info if this is the last chunk

Applies custom transforms to HTML. If `done` is true, it's the final chunk. Chunks are not guaranteed to be well-formed HTML
(they could include an element's opening tag but not its closing tag, for example)
but they will always be split at sensible boundaries such as `%sveltekit.head%` or layout/page components.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `name` header name
- `value` header value

Determines which headers should be included in serialized responses when a `load` function loads a resource with `fetch`.
By default, none will be included.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `input` the type of the file and its path

Determines what should be added to the `<head>` tag to preload it.
By default, `js` and `css` files will be preloaded.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

Static files from `kit.config.files.assets` and the service worker (if any).

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

hashed filename -> import to that file

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

A `[file]: size` map of all assets imported by server code.

<blockquote class="since note">

Available since 2.10.0

The [`init`](/docs/kit/hooks#Shared-hooks-init) will be invoked before the server responds to its first request

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

A map of environment variables.

<div class="ts-block-property">

<div class="ts-block-property-details">

A function that turns an asset filename into a `ReadableStream`. Required for the `read` export from `$app/server` to work.

The generic form of `PageServerLoad` and `LayoutServerLoad`. You should import those from `./$types` (see [generated types](/docs/kit/types#Generated-types))
rather than using `ServerLoad` directly.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

`await parent()` returns data from parent `+layout.server.js` `load` functions.

Be careful not to introduce accidental waterfalls when using `await parent()`. If for example you only want to merge parent data into the returned output, call it _after_ fetching your other data.

<div class="ts-block-property">

<div class="ts-block-property-details">

This function declares that the `load` function has a _dependency_ on one or more URLs or custom identifiers, which can subsequently be used with [`invalidate()`](/docs/kit/$app-navigation#invalidate) to cause `load` to rerun.

Most of the time you won't need this, as `fetch` calls `depends` on your behalf — it's only necessary if you're using a custom API client that bypasses `fetch`.

URLs can be absolute or relative to the page being loaded, and must be [encoded](https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding).

Custom identifiers have to be prefixed with one or more lowercase letters followed by a colon to conform to the [URI specification](https://www.rfc-editor.org/rfc/rfc3986.html).

The following example shows how to use `depends` to register a dependency on a custom identifier, which is `invalidate`d after a button click, making the `load` function rerun.

<div class="ts-block-property">

<div class="ts-block-property-details">

Use this function to opt out of dependency tracking for everything that is synchronously called within the callback. Example:

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v2.31.0

Access to spans for tracing. If tracing is not enabled, these spans will do nothing.

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

Whether tracing is enabled.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The root span for the request. This span is named `sveltekit.handle.root`.

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

The span associated with the current server `load` function.

The type of `export const snapshot` exported from a page or layout component.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

<blockquote class="since note">

Available since 2.11.0

The [`transport`](/docs/kit/hooks#Universal-hooks-transport) hook allows you to transport custom types across the server/client boundary.

Each transporter has a pair of `encode` and `decode` functions. On the server, `encode` determines whether a value is an instance of the custom type and, if so, returns a non-falsy encoding of the value which can be an object or an array (or `false` otherwise).

In the browser, `decode` turns the encoding back into an instance of the custom type.

<div class="ts-block">

A member of the [`transport`](/docs/kit/hooks#Universal-hooks-transport) hook.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

A validation error thrown by `invalid`.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The validation issues

The following are referenced by the public types documented above, but cannot be imported directly:

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

A string that uniquely identifies an HTTP service (e.g. serverless function) and is used for deduplication.
For example, `/foo/a-[b]` and `/foo/[c]` are different routes, but would both
be represented in a Netlify \_redirects file as `/foo/:param`, so they share an ID

<div class="ts-block-property">

<div class="ts-block-property-details">

A function that compares the candidate route with the current route to determine
if it should be grouped with the current route.

Use cases:

- Fallback pages: `/foo/[c]` is a fallback for `/foo/a-[b]`, and `/[...catchall]` is a fallback for all routes
- Grouping routes that share a common `config`: `/foo` should be deployed to the edge, `/bar` and `/baz` should be deployed to a serverless function

<div class="ts-block-property">

<div class="ts-block-property-details">

A function that is invoked once the entry has been created. This is where you
should write the function to the filesystem and generate redirect manifests.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span>

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

## PrerenderEntryGeneratorMismatchHandler

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## PrerenderEntryGeneratorMismatchHandlerValue

<div class="ts-block">

## PrerenderHttpErrorHandler

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## PrerenderHttpErrorHandlerValue

<div class="ts-block">

<div class="ts-block">

## PrerenderMissingIdHandler

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## PrerenderMissingIdHandlerValue

<div class="ts-block">

<div class="ts-block">

## PrerenderUnseenRoutesHandler

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## PrerenderUnseenRoutesHandlerValue

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

A map of `path` to `{ file }` objects, where a path like `/foo` corresponds to `foo.html` and a path like `/bar/` corresponds to `bar/index.html`.

<div class="ts-block-property">

<div class="ts-block-property-details">

A map of `path` to `{ type }` objects.

<div class="ts-block-property">

<div class="ts-block-property-details">

A map of redirects encountered during prerendering.

<div class="ts-block-property">

<div class="ts-block-property-details">

An array of prerendered paths (without trailing slashes, regardless of the trailingSlash config)

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  Server,
  VERSION,
  error,
  fail,
  invalid,
  isActionFailure,
  isHttpError,
  isRedirect,
  isValidationError,
  json,
  normalizeUrl,
  redirect,
  text,
} from "@sveltejs/kit";
```

Example 2 (dts):

```dts
class Server {/*…*/}
```

Example 3 (dts):

```dts
constructor(manifest: SSRManifest);
```

Example 4 (dts):

```dts
init(options: ServerInitOptions): Promise<void>;
```

---

## @sveltejs/kit/node/polyfills

**URL:** llms-txt#@sveltejs/kit/node/polyfills

**Contents:**

- installPolyfills

Make various web APIs available as globals:

- `crypto`
- `File`

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { installPolyfills } from "@sveltejs/kit/node/polyfills";
```

Example 2 (dts):

```dts
function installPolyfills(): void;
```

---

## @sveltejs/kit/node

**URL:** llms-txt#@sveltejs/kit/node

**Contents:**

- createReadableStream
- getRequest
- setResponse

## createReadableStream

<blockquote class="since note">

Available since 2.4.0

Converts a file on disk to a readable stream

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { createReadableStream, getRequest, setResponse } from "@sveltejs/kit/node";
```

Example 2 (dts):

```dts
function createReadableStream(file: string): ReadableStream;
```

Example 3 (dts):

```dts
function getRequest({
	request,
	base,
	bodySizeLimit
}: {
	request: import('http').IncomingMessage;
	base: string;
	bodySizeLimit?: number;
}): Promise<Request>;
```

Example 4 (dts):

```dts
function setResponse(
	res: import('http').ServerResponse,
	response: Response
): Promise<void>;
```

---

## @sveltejs/kit/vite

**URL:** llms-txt#@sveltejs/kit/vite

**Contents:**

- sveltekit

Returns the SvelteKit Vite plugins.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { sveltekit } from "@sveltejs/kit/vite";
```

Example 2 (dts):

```dts
function sveltekit(): Promise<import('vite').Plugin[]>;
```

---
