# Svelte-Kit_Docs - Web Standards

**Pages:** 1

---

## Web standards

**URL:** llms-txt#web-standards

**Contents:**

- Fetch APIs
  - Request
  - Response
  - Headers
- FormData
- Stream APIs
- URL APIs
  - URLSearchParams
- Web Crypto

Throughout this documentation, you'll see references to the standard [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) that SvelteKit builds on top of. Rather than reinventing the wheel, we _use the platform_, which means your existing web development skills are applicable to SvelteKit. Conversely, time spent learning SvelteKit will help you be a better web developer elsewhere.

These APIs are available in all modern browsers and in many non-browser environments like Cloudflare Workers, Deno, and Vercel Functions. During development, and in [adapters](adapters) for Node-based environments (including AWS Lambda), they're made available via polyfills where necessary (for now, that is — Node is rapidly adding support for more web standards).

In particular, you'll get comfortable with the following:

SvelteKit uses [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for getting data from the network. It's available in [hooks](hooks) and [server routes](routing#server) as well as in the browser.

> [!NOTE] A special version of `fetch` is available in [`load`](load) functions, [server hooks](hooks#Server-hooks) and [API routes](routing#server) for invoking endpoints directly during server-side rendering, without making an HTTP call, while preserving credentials. (To make credentialled fetches in server-side code outside `load`, you must explicitly pass `cookie` and/or `authorization` headers.) It also allows you to make relative requests, whereas server-side `fetch` normally requires a fully qualified URL.

Besides `fetch` itself, the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) includes the following interfaces:

An instance of [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) is accessible in [hooks](hooks) and [server routes](routing#server) as `event.request`. It contains useful methods like `request.json()` and `request.formData()` for getting data that was posted to an endpoint.

An instance of [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) is returned from `await fetch(...)` and handlers in `+server.js` files. Fundamentally, a SvelteKit app is a machine for turning a `Request` into a `Response`.

The [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) interface allows you to read incoming `request.headers` and set outgoing `response.headers`. For example, you can get the `request.headers` as shown below, and use the [`json` convenience function](@sveltejs-kit#json) to send modified `response.headers`:

When dealing with HTML native form submissions you'll be working with [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) objects.

Most of the time, your endpoints will return complete data, as in the `userAgent` example above. Sometimes, you may need to return a response that's too large to fit in memory in one go, or is delivered in chunks, and for this the platform provides [streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) — [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream), [WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) and [TransformStream](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

URLs are represented by the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) interface, which includes useful properties like `origin` and `pathname` (and, in the browser, `hash`). This interface shows up in various places — `event.url` in [hooks](hooks) and [server routes](routing#server), [`page.url`]($app-state) in [pages](routing#page), `from` and `to` in [`beforeNavigate` and `afterNavigate`]($app-navigation) and so on.

Wherever you encounter a URL, you can access query parameters via `url.searchParams`, which is an instance of [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams):

The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) is made available via the `crypto` global. It's used internally for [Content Security Policy](configuration#csp) headers, but you can also use it for things like generating UUIDs:

**Examples:**

Example 1 (js):

```js
// @errors: 2461
/// file: src/routes/what-is-my-user-agent/+server.js
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export function GET({ request }) {
  // log all headers
  console.log(...request.headers);

  // create a JSON Response using a header we received
  return json(
    {
      // retrieve a specific header
      userAgent: request.headers.get("user-agent"),
    },
    {
      // set a header on the response
      headers: { "x-custom-header": "potato" },
    }
  );
}
```

Example 2 (js):

```js
// @errors: 2461
/// file: src/routes/hello/+server.js
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
  const body = await event.request.formData();

  // log all fields
  console.log([...body]);

  return json({
    // get a specific field's value
    name: body.get("name") ?? "world",
  });
}
```

Example 3 (js):

```js
// @filename: ambient.d.ts
declare global {
	const url: URL;
}

export {};

// @filename: index.js
// ---cut---
const foo = url.searchParams.get('foo');
```

Example 4 (js):

```js
const uuid = crypto.randomUUID();
```

---
