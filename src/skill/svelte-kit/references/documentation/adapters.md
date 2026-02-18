# Svelte-Kit_Docs - Adapters

**Pages:** 2

---

## Adapters

**URL:** llms-txt#adapters

**Contents:**

- Using adapters
- Platform-specific context

Before you can deploy your SvelteKit app, you need to _adapt_ it for your deployment target. Adapters are small plugins that take the built app as input and generate output for deployment.

Official adapters exist for a variety of platforms — these are documented on the following pages:

- [`@sveltejs/adapter-cloudflare`](adapter-cloudflare) for Cloudflare Workers and Cloudflare Pages
- [`@sveltejs/adapter-netlify`](adapter-netlify) for Netlify
- [`@sveltejs/adapter-node`](adapter-node) for Node servers
- [`@sveltejs/adapter-static`](adapter-static) for static site generation (SSG)
- [`@sveltejs/adapter-vercel`](adapter-vercel) for Vercel

Additional [community-provided adapters](/packages#sveltekit-adapters) exist for other platforms.

Your adapter is specified in `svelte.config.js`:

## Platform-specific context

Some adapters may have access to additional information about the request. For example, Cloudflare Workers can access an `env` object containing KV namespaces etc. This can be passed to the `RequestEvent` used in [hooks](hooks) and [server routes](routing#server) as the `platform` property — consult each adapter's documentation to learn more.

**Examples:**

Example 1 (js):

```js
/// file: svelte.config.js
// @filename: ambient.d.ts
declare module 'svelte-adapter-foo' {
	const adapter: (opts: any) => import('@sveltejs/kit').Adapter;
	export default adapter;
}

// @filename: index.js
// ---cut---
import adapter from 'svelte-adapter-foo';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// adapter options go here
		})
	}
};

export default config;
```

---

## Writing adapters

**URL:** llms-txt#writing-adapters

If an adapter for your preferred environment doesn't yet exist, you can build your own. We recommend [looking at the source for an adapter](https://github.com/sveltejs/kit/tree/main/packages) to a platform similar to yours and copying it as a starting point.

Adapter packages implement the following API, which creates an `Adapter`:

Of these, `name` and `adapt` are required. `emulate` and `supports` are optional.

Within the `adapt` method, there are a number of things that an adapter should do:

- Clear out the build directory
- Write SvelteKit output with `builder.writeClient`, `builder.writeServer`, and `builder.writePrerendered`
- Output code that:
  - Imports `Server` from `${builder.getServerDirectory()}/index.js`
  - Instantiates the app with a manifest generated with `builder.generateManifest({ relativePath })`
  - Listens for requests from the platform, converts them to a standard [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) if necessary, calls the `server.respond(request, { getClientAddress })` function to generate a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) and responds with it
  - expose any platform-specific information to SvelteKit via the `platform` option passed to `server.respond`
  - Globally shims `fetch` to work on the target platform, if necessary. SvelteKit provides a `@sveltejs/kit/node/polyfills` helper for platforms that can use `undici`
- Bundle the output to avoid needing to install dependencies on the target platform, if necessary
- Put the user's static files and the generated JS/CSS in the correct location for the target platform

Where possible, we recommend putting the adapter output under the `build/` directory with any intermediate output placed under `.svelte-kit/[adapter-name]`.

**Examples:**

Example 1 (js):

```js
// @errors: 2322
// @filename: ambient.d.ts
type AdapterSpecificOptions = any;

// @filename: index.js
// ---cut---
/** @param {AdapterSpecificOptions} options */
export default function (options) {
	/** @type {import('@sveltejs/kit').Adapter} */
	const adapter = {
		name: 'adapter-package-name',
		async adapt(builder) {
			// adapter implementation
		},
		async emulate() {
			return {
				async platform({ config, prerender }) {
					// the returned object becomes `event.platform` during dev, build and
					// preview. Its shape is that of `App.Platform`
				}
			}
		},
		supports: {
			read: ({ config, route }) => {
				// Return `true` if the route with the given `config` can use `read`
				// from `$app/server` in production, return `false` if it can't.
				// Or throw a descriptive error describing how to configure the deployment
			},
			tracing: () => {
				// Return `true` if this adapter supports loading `tracing.server.js`.
				// Return `false if it can't, or throw a descriptive error.
			}
		}
	};

	return adapter;
}
```

---
