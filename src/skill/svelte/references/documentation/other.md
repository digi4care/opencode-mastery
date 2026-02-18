# Svelte_Docs - Other

**Pages:** 17

---

## What are runes?

**URL:** llms-txt#what-are-runes?

> [!NOTE] **rune** /ruːn/ _noun_
>
> A letter or mark used as a mystical or magic symbol.

Runes are symbols that you use in `.svelte` and `.svelte.js`/`.svelte.ts` files to control the Svelte compiler. If you think of Svelte as a language, runes are part of the syntax — they are _keywords_.

Runes have a `$` prefix and look like functions:

They differ from normal JavaScript functions in important ways, however:

- You don't need to import them — they are part of the language
- They're not values — you can't assign them to a variable or pass them as arguments to a function
- Just like JavaScript keywords, they are only valid in certain positions (the compiler will help you if you put them in the wrong place)

> [!LEGACY]
> Runes didn't exist prior to Svelte 5.

**Examples:**

Example 1 (js):

```js
let message = $state("hello");
```

---

## $host

**URL:** llms-txt#$host

When compiling a component as a [custom element](custom-elements), the `$host` rune provides access to the host element, allowing you to (for example) dispatch custom events ([demo](/playground/untitled#H4sIAAAAAAAAE41Ry2rDMBD8FSECtqkTt1fHFpSSL-ix7sFRNkTEXglrnTYY_3uRlDgxTaEHIfYxs7szA9-rBizPPwZOZwM89wmecqxbF70as7InaMjltrWFR3mpkQDJ8pwXVnbKkKiwItUa3RGLVtk7gTHQXRDR2lXda4CY1D0SK9nCUk0QPyfrCovsRoNFe17aQOAwGncgO2gBqRzihJXiQrEs2csYOhQ-7HgKHaLIbpRhhBG-I2eD_8ciM4KnnOCbeE5dD2P6h0Dz0-Yi_arNhPLJXBtSGi2TvSXdbpqwdsXvjuYsC1veabvvUTog2ylrapKH2G2XsMFLS4uDthQnq2t1cwKkGOGLvYU5PvaQxLsxOkPmsm97Io1Mo2yUPF6VnOZFkw1RMoopKLKAE_9gmGxyDFMwMcwN-Bx_ABXQWmOtAgAA)):

<!-- prettier-ignore -->
<!-- prettier-ignore -->
**Examples:**

Example 1 (svelte):

```svelte
/// file: Stepper.svelte
<svelte:options customElement="my-stepper" />

<script>
	function dispatch(type) {
		+++$host()+++.dispatchEvent(new CustomEvent(type));
	}
</script>

<button onclick={() => dispatch('decrement')}>decrement</button>
<button onclick={() => dispatch('increment')}>increment</button>
```

Example 2 (svelte):

```svelte
/// file: App.svelte
<script>
	import './Stepper.svelte';

	let count = $state(0);
</script>

<my-stepper
	ondecrement={() => count -= 1}
	onincrement={() => count += 1}
></my-stepper>

<p>count: {count}</p>
```

---

## await

**URL:** llms-txt#await

**Contents:**

- Synchronized updates
- Concurrency
- Indicating loading states
- Error handling
- Server-side rendering
- Forking
- Caveats
- Breaking changes

As of Svelte 5.36, you can use the `await` keyword inside your components in three places where it was previously unavailable:

- at the top level of your component's `<script>`
- inside `$derived(...)` declarations
- inside your markup

This feature is currently experimental, and you must opt in by adding the `experimental.async` option wherever you [configure](/docs/kit/configuration) Svelte, usually `svelte.config.js`:

The experimental flag will be removed in Svelte 6.

## Synchronized updates

When an `await` expression depends on a particular piece of state, changes to that state will not be reflected in the UI until the asynchronous work has completed, so that the UI is not left in an inconsistent state. In other words, in an example like [this](/playground/untitled#H4sIAAAAAAAAE42QsWrDQBBEf2VZUkhYRE4gjSwJ0qVMkS6XYk9awcFpJe5Wdoy4fw-ycdykSPt2dpiZFYVGxgrf2PsJTlPwPWTcO-U-xwIH5zli9bminudNtwEsbl-v8_wYj-x1Y5Yi_8W7SZRFI1ZYxy64WVsjRj0rEDTwEJWUs6f8cKP2Tp8vVIxSPEsHwyKdukmA-j6jAmwO63Y1SidyCsIneA_T6CJn2ZBD00Jk_XAjT4tmQwEv-32eH6AsgYK6wXWOPPTs6Xy1CaxLECDYgb3kSUbq8p5aaifzorCt0RiUZbQcDIJ10ldH8gs3K6X2Xzqbro5zu1KCHaw2QQPrtclvwVSXc2sEC1T-Vqw0LJy-ClRy_uSkx2ogHzn9ADZ1CubKAQAA)...

...if you increment `a`, the contents of the `<p>` will _not_ immediately update to read this —

— instead, the text will update to `2 + 2 = 4` when `add(a, b)` resolves.

Updates can overlap — a fast update will be reflected in the UI while an earlier slow update is still ongoing.

Svelte will do as much asynchronous work as it can in parallel. For example if you have two `await` expressions in your markup...

...both functions will run at the same time, as they are independent expressions, even though they are _visually_ sequential.

This does not apply to sequential `await` expressions inside your `<script>` or inside async functions — these run like any other asynchronous JavaScript. An exception is that independent `$derived` expressions will update independently, even though they will run sequentially when they are first created:

> [!NOTE] If you write code like this, expect Svelte to give you an [`await_waterfall`](runtime-warnings#Client-warnings-await_waterfall) warning

## Indicating loading states

To render placeholder UI, you can wrap content in a `<svelte:boundary>` with a [`pending`](svelte-boundary#Properties-pending) snippet. This will be shown when the boundary is first created, but not for subsequent updates, which are globally coordinated.

After the contents of a boundary have resolved for the first time and have replaced the `pending` snippet, you can detect subsequent async work with [`$effect.pending()`]($effect#$effect.pending). This is what you would use to display a "we're asynchronously validating your input" spinner next to a form field, for example.

You can also use [`settled()`](svelte#settled) to get a promise that resolves when the current update is complete:

Errors in `await` expressions will bubble to the nearest [error boundary](svelte-boundary).

## Server-side rendering

Svelte supports asynchronous server-side rendering (SSR) with the `render(...)` API. To use it, simply await the return value:

> [!NOTE] If you're using a framework like SvelteKit, this is done on your behalf.

If a `<svelte:boundary>` with a `pending` snippet is encountered during SSR, that snippet will be rendered while the rest of the content is ignored. All `await` expressions encountered outside boundaries with `pending` snippets will resolve and render their contents prior to `await render(...)` returning.

> [!NOTE] In the future, we plan to add a streaming implementation that renders the content in the background.

The [`fork(...)`](svelte#fork) API, added in 5.42, makes it possible to run `await` expressions that you _expect_ to happen in the near future. This is mainly intended for frameworks like SvelteKit to implement preloading when (for example) users signal an intent to navigate.

As an experimental feature, the details of how `await` is handled (and related APIs like `$effect.pending()`) are subject to breaking changes outside of a semver major release, though we intend to keep such changes to a bare minimum.

Effects run in a slightly different order when the `experimental.async` option is `true`. Specifically, _block_ effects like `{#if ...}` and `{#each ...}` now run before an `$effect.pre` or `beforeUpdate` in the same component, which means that in [very rare situations](/playground/untitled?#H4sIAAAAAAAAE22R3VLDIBCFX2WLvUhnTHsf0zre-Q7WmfwtFV2BgU1rJ5N3F0jaOuoVcPbw7VkYhK4_URTiGYkMnIyjDjLsFGO3EvdCKkIvipdB8NlGXxSCPt96snbtj0gctab2-J_eGs2oOWBE6VunLO_2es-EDKZ5x5ZhC0vPNWM2gHXGouNzAex6hHH1cPHil_Lsb95YT9VQX6KUAbS2DrNsBdsdDFHe8_XSYjH1SrhELTe3MLpsemajweiWVPuxHSbKNd-8eQTdE0EBf4OOaSg2hwNhhE_ABB_ulJzjj9FULvIcqgm5vnAqUB7wWFMfhuugQWkcAr8hVD-mq8D12kOep24J_IszToOXdveGDsuNnZwbJUNlXsKnhJdhUcTo42s41YpOSneikDV5HL8BktM6yRcCAAA=) it is possible to update a block that should no longer exist, but only if you update state inside an effect, [which you should avoid]($effect#When-not-to-use-$effect).

**Examples:**

Example 1 (js):

```js
/// file: svelte.config.js
export default {
  compilerOptions: {
    experimental: {
      async: true,
    },
  },
};
```

Example 2 (svelte):

```svelte
<script>
	let a = $state(1);
	let b = $state(2);

	async function add(a, b) {
		await new Promise((f) => setTimeout(f, 500)); // artificial delay
		return a + b;
	}
</script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<p>{a} + {b} = {await add(a, b)}</p>
```

Example 3 (html):

```html
<p>2 + 2 = 3</p>
```

Example 4 (svelte):

```svelte
<p>{await one()}</p>
<p>{await two()}</p>
```

---

## Custom properties

**URL:** llms-txt#custom-properties

You can pass CSS custom properties — both static and dynamic — to components:

The above code essentially desugars to this:

For an SVG element, it would use `<g>` instead:

Inside the component, we can read these custom properties (and provide fallback values) using [`var(...)`](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties):

You don't _have_ to specify the values directly on the component; as long as the custom properties are defined on a parent element, the component can use them. It's common to define custom properties on the `:root` element in a global stylesheet so that they apply to your entire application.

> [!NOTE] While the extra element will not affect layout, it _will_ affect any CSS selectors that (for example) use the `>` combinator to target an element directly inside the component's container.

**Examples:**

Example 1 (svelte):

```svelte
<Slider
	bind:value
	min={0}
	max={100}
	--track-color="black"
	--thumb-color="rgb({r} {g} {b})"
/>
```

Example 2 (svelte):

```svelte
<svelte-css-wrapper style="display: contents; --track-color: black; --thumb-color: rgb({r} {g} {b})">
	<Slider
		bind:value
		min={0}
		max={100}
	/>
</svelte-css-wrapper>
```

Example 3 (svelte):

```svelte
<g style="--track-color: black; --thumb-color: rgb({r} {g} {b})">
	<Slider
		bind:value
		min={0}
		max={100}
	/>
</g>
```

Example 4 (svelte):

```svelte
<style>
	.track {
		background: var(--track-color, #aaa);
	}

	.thumb {
		background: var(--thumb-color, blue);
	}
</style>
```

---

## Nested `<style>` elements

**URL:** llms-txt#nested-`<style>`-elements

There can only be one top-level `<style>` tag per component.

However, it is possible to have a `<style>` tag nested inside other elements or logic blocks.

In that case, the `<style>` tag will be inserted as-is into the DOM; no scoping or processing will be done on the `<style>` tag.

**Examples:**

Example 1 (svelte):

```svelte
<div>
	<style>
		/* this style tag will be inserted as-is */
		div {
			/* this will apply to all `<div>` elements in the DOM */
			color: red;
		}
	</style>
</div>
```

---

## Imperative component API

**URL:** llms-txt#imperative-component-api

**Contents:**

- Creating a component
- `$set`
- `$on`
- `$destroy`
- Component props
- Server-side component API

In Svelte 3 and 4, the API for interacting with a component is different than in Svelte 5. Note that this page does _not_ apply to legacy mode components in a Svelte 5 application.

## Creating a component

A client-side component — that is, a component compiled with `generate: 'dom'` (or the `generate` option left unspecified) is a JavaScript class.

The following initialisation options can be provided:

| option    | default     | description                                                                                          |
| --------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `target`  | **none**    | An `HTMLElement` or `ShadowRoot` to render to. This option is required                               |
| `anchor`  | `null`      | A child of `target` to render the component immediately before                                       |
| `props`   | `{}`        | An object of properties to supply to the component                                                   |
| `context` | `new Map()` | A `Map` of root-level context key-value pairs to supply to the component                             |
| `hydrate` | `false`     | See below                                                                                            |
| `intro`   | `false`     | If `true`, will play transitions on initial render, rather than waiting for subsequent state changes |

Existing children of `target` are left where they are.

The `hydrate` option instructs Svelte to upgrade existing DOM (usually from server-side rendering) rather than creating new elements. It will only work if the component was compiled with the [`hydratable: true` option](/docs/svelte-compiler#compile). Hydration of `<head>` elements only works properly if the server-side rendering code was also compiled with `hydratable: true`, which adds a marker to each element in the `<head>` so that the component knows which elements it's responsible for removing during hydration.

Whereas children of `target` are normally left alone, `hydrate: true` will cause any children to be removed. For that reason, the `anchor` option cannot be used alongside `hydrate: true`.

The existing DOM doesn't need to match the component — Svelte will 'repair' the DOM as it goes.

> [!NOTE]
> In Svelte 5+, use [`mount`](svelte#mount) instead

Programmatically sets props on an instance. `component.$set({ x: 1 })` is equivalent to `x = 1` inside the component's `<script>` block.

Calling this method schedules an update for the next microtask — the DOM is _not_ updated synchronously.

> [!NOTE]
> In Svelte 5+, use `$state` instead to create a component props and update that

Causes the `callback` function to be called whenever the component dispatches an `event`.

A function is returned that will remove the event listener when called.

> [!NOTE]
> In Svelte 5+, pass callback props instead

Removes a component from the DOM and triggers any `onDestroy` handlers.

> [!NOTE]
> In Svelte 5+, use [`unmount`](svelte#unmount) instead

If a component is compiled with `accessors: true`, each instance will have getters and setters corresponding to each of the component's props. Setting a value will cause a _synchronous_ update, rather than the default async update caused by `component.$set(...)`.

By default, `accessors` is `false`, unless you're compiling as a custom element.

> [!NOTE]
> In Svelte 5+, this concept is obsolete. If you want to make properties accessible from the outside, `export` them

## Server-side component API

Unlike client-side components, server-side components don't have a lifespan after you render them — their whole job is to create some HTML and CSS. For that reason, the API is somewhat different.

A server-side component exposes a `render` method that can be called with optional props. It returns an object with `head`, `html`, and `css` properties, where `head` contains the contents of any `<svelte:head>` elements encountered.

You can import a Svelte component directly into Node using `svelte/register`.

The `.render()` method accepts the following parameters:

| parameter | default | description                                        |
| --------- | ------- | -------------------------------------------------- |
| `props`   | `{}`    | An object of properties to supply to the component |
| `options` | `{}`    | An object of options                               |

The `options` object takes in the following options:

| option    | default     | description                                                              |
| --------- | ----------- | ------------------------------------------------------------------------ |
| `context` | `new Map()` | A `Map` of root-level context key-value pairs to supply to the component |

> [!NOTE]
> In Svelte 5+, use [`render`](svelte-server#render) instead

**Examples:**

Example 1 (ts):

```ts
// @noErrors
const component = new Component(options);
```

Example 2 (ts):

```ts
// @noErrors
import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    // assuming App.svelte contains something like
    // `export let answer`:
    answer: 42,
  },
});
```

Example 3 (ts):

```ts
/// file: index.js
// @noErrors
import App from "./App.svelte";

const app = new App({
  target: document.querySelector("#server-rendered-html"),
  hydrate: true,
});
```

Example 4 (ts):

```ts
// @noErrors
component.$set(props);
```

---

## Hydratable data

**URL:** llms-txt#hydratable-data

**Contents:**

- Serialization
- CSP

In Svelte, when you want to render asynchronous content data on the server, you can simply `await` it. This is great! However, it comes with a pitfall: when hydrating that content on the client, Svelte has to redo the asynchronous work, which blocks hydration for however long it takes:

That's silly, though. If we've already done the hard work of getting the data on the server, we don't want to get it again during hydration on the client. `hydratable` is a low-level API built to solve this problem. You probably won't need this very often — it will be used behind the scenes by whatever datafetching library you use. For example, it powers [remote functions in SvelteKit](/docs/kit/remote-functions).

To fix the example above:

This API can also be used to provide access to random or time-based values that are stable between server rendering and hydration. For example, to get a random number that doesn't update on hydration:

If you're a library author, be sure to prefix the keys of your `hydratable` values with the name of your library so that your keys don't conflict with other libraries.

All data returned from a `hydratable` function must be serializable. But this doesn't mean you're limited to JSON — Svelte uses [`devalue`](https://npmjs.com/package/devalue), which can serialize all sorts of things including `Map`, `Set`, `URL`, and `BigInt`. Check the documentation page for a full list. In addition to these, thanks to some Svelte magic, you can also fearlessly use promises:

`hydratable` adds an inline `<script>` block to the `head` returned from `render`. If you're using [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) (CSP), this script will likely fail to run. You can provide a `nonce` to `render`:

This will add the `nonce` to the script block, on the assumption that you will later add the same nonce to the CSP header of the document that contains it:

It's essential that a `nonce` — which, British slang definition aside, means 'number used once' — is only used when dynamically server rendering an individual response.

If instead you are generating static HTML ahead of time, you must use hashes instead:

`hashes.script` will be an array of strings like `["sha256-abcd123"]`. As with `nonce`, the hashes should be used in your CSP header:

We recommend using `nonce` over hash if you can, as `hash` will interfere with streaming SSR in the future.

**Examples:**

Example 1 (svelte):

```svelte
<script>
  import { getUser } from 'my-database-library';

  // This will get the user on the server, render the user's name into the h1,
  // and then, during hydration on the client, it will get the user _again_,
  // blocking hydration until it's done.
  const user = await getUser();
</script>

<h1>{user.name}</h1>
```

Example 2 (svelte):

```svelte
<script>
  import { hydratable } from 'svelte';
  import { getUser } from 'my-database-library';

  // During server rendering, this will serialize and stash the result of `getUser`, associating
  // it with the provided key and baking it into the `head` content. During hydration, it will
  // look for the serialized version, returning it instead of running `getUser`. After hydration
  // is done, if it's called again, it'll simply invoke `getUser`.
  const user = await hydratable('user', () => getUser());
</script>

<h1>{user.name}</h1>
```

Example 3 (ts):

```ts
import { hydratable } from "svelte";
const rand = hydratable("random", () => Math.random());
```

Example 4 (svelte):

```svelte
<script>
  import { hydratable } from 'svelte';
  const promises = hydratable('random', () => {
    return {
      one: Promise.resolve(1),
      two: Promise.resolve(2)
    }
  });
</script>

{await promises.one}
{await promises.two}
```

---

## Compiler errors

**URL:** llms-txt#compiler-errors

**Contents:**

- animation_duplicate
- animation_invalid_placement
- animation_missing_key
- attribute_contenteditable_dynamic
- attribute_contenteditable_missing
- attribute_duplicate
- attribute_empty_shorthand
- attribute_invalid_event_handler
- attribute_invalid_multiple
- attribute_invalid_name

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### animation_duplicate

### animation_invalid_placement

### animation_missing_key

### attribute_contenteditable_dynamic

### attribute_contenteditable_missing

### attribute_duplicate

### attribute_empty_shorthand

### attribute_invalid_event_handler

### attribute_invalid_multiple

### attribute_invalid_name

### attribute_invalid_sequence_expression

### attribute_invalid_type

### attribute_unquoted_sequence

### bind_group_invalid_expression

### bind_group_invalid_snippet_parameter

### bind_invalid_expression

### bind_invalid_name

### bind_invalid_parens

### bind_invalid_target

### bind_invalid_value

### bindable_invalid_location

### block_duplicate_clause

### block_invalid_continuation_placement

### block_invalid_elseif

### block_invalid_placement

### block_unexpected_character

### block_unexpected_close

### component_invalid_directive

### const_tag_invalid_expression

### const_tag_invalid_placement

### const_tag_invalid_reference

The following is an error:

Here, `foo` is not available inside `failed`. The top level code inside `<svelte:boundary>` becomes part of the implicit `children` snippet, in other words the above code is equivalent to this:

The same applies to components:

### constant_assignment

### css_empty_declaration

### css_expected_identifier

### css_global_block_invalid_combinator

### css_global_block_invalid_declaration

### css_global_block_invalid_list

The following CSS is invalid:

This is mixing a `:global` block, which means "everything in here is unscoped", with a scoped selector (`x` in this case). As a result it's not possible to transform the inner selector (`y` in this case) into something that satisfies both requirements. You therefore have to split this up into two selectors:

### css_global_block_invalid_modifier

### css_global_block_invalid_modifier_start

### css_global_block_invalid_placement

### css_global_invalid_placement

### css_global_invalid_selector

### css_global_invalid_selector_list

### css_nesting_selector_invalid_placement

### css_selector_invalid

### css_type_selector_invalid_placement

### debug_tag_invalid_arguments

### declaration_duplicate

### declaration_duplicate_module_import

### derived_invalid_export

### directive_invalid_value

### directive_missing_name

### dollar_binding_invalid

### dollar_prefix_invalid

### duplicate_class_field

### each_item_invalid_assignment

In legacy mode, it was possible to reassign or bind to the each block argument itself:

This turned out to be buggy and unpredictable, particularly when working with derived values (such as `array.map(...)`), and as such is forbidden in runes mode. You can achieve the same outcome by using the index instead:

### each_key_without_as

### effect_invalid_placement

### element_invalid_closing_tag

### element_invalid_closing_tag_autoclosed

### event_handler_invalid_component_modifier

### event_handler_invalid_modifier

### event_handler_invalid_modifier_combination

### expected_attribute_value

### expected_block_type

### expected_identifier

### expected_whitespace

### experimental_async

### global_reference_invalid

### host_invalid_placement

### illegal_await_expression

### illegal_element_attribute

### import_svelte_internal_forbidden

### inspect_trace_generator

### inspect_trace_invalid_placement

### invalid_arguments_usage

### legacy_await_invalid

### legacy_export_invalid

### legacy_props_invalid

### legacy_reactive_statement_invalid

### legacy_rest_props_invalid

### let_directive_invalid_placement

### mixed_event_handler_syntaxes

### module_illegal_default_export

### node_invalid_placement

HTML restricts where certain elements can appear. In case of a violation the browser will 'repair' the HTML in a way that breaks Svelte's assumptions about the structure of your components. Some examples:

- `<p>hello <div>world</div></p>` will result in `<p>hello </p><div>world</div><p></p>` (the `<div>` autoclosed the `<p>` because `<p>` cannot contain block-level elements)
- `<option><div>option a</div></option>` will result in `<option>option a</option>` (the `<div>` is removed)
- `<table><tr><td>cell</td></tr></table>` will result in `<table><tbody><tr><td>cell</td></tr></tbody></table>` (a `<tbody>` is auto-inserted)

### options_invalid_value

### options_unrecognised

### props_id_invalid_placement

### props_illegal_name

### props_invalid_identifier

### props_invalid_pattern

### props_invalid_placement

### reactive_declaration_cycle

### render_tag_invalid_call_expression

### render_tag_invalid_expression

### render_tag_invalid_spread_argument

### rune_invalid_arguments

### rune_invalid_arguments_length

### rune_invalid_computed_property

### rune_invalid_name

### rune_invalid_spread

### rune_invalid_usage

### rune_missing_parentheses

### runes_mode_invalid_import

### script_invalid_attribute_value

### script_invalid_context

### script_reserved_attribute

### slot_attribute_duplicate

### slot_attribute_invalid

### slot_attribute_invalid_placement

### slot_default_duplicate

### slot_element_invalid_attribute

### slot_element_invalid_name

### slot_element_invalid_name_default

### slot_snippet_conflict

### snippet_invalid_export

It's possible to export a snippet from a `<script module>` block, but only if it doesn't reference anything defined inside a non-module-level `<script>`. For example you can't do this...

...because `greeting` references `message`, which is defined in the second `<script>`.

### snippet_invalid_rest_parameter

### snippet_parameter_assignment

### snippet_shadowing_prop

### state_field_duplicate

An assignment to a class field that uses a `$state` or `$derived` rune is considered a _state field declaration_. The declaration can happen in the class body...

...or inside the constructor...

...but it can only happen once.

### state_field_invalid_assignment

### state_invalid_export

### state_invalid_placement

### store_invalid_scoped_subscription

### store_invalid_subscription

### store_invalid_subscription_module

Using a `$` prefix to refer to the value of a store is only possible inside `.svelte` files, where Svelte can automatically create subscriptions when a component is mounted and unsubscribe when the component is unmounted. Consider migrating to runes instead.

### style_directive_invalid_modifier

### svelte_body_illegal_attribute

### svelte_boundary_invalid_attribute

### svelte_boundary_invalid_attribute_value

### svelte_component_invalid_this

### svelte_component_missing_this

### svelte_element_missing_this

### svelte_fragment_invalid_attribute

### svelte_fragment_invalid_placement

### svelte_head_illegal_attribute

### svelte_meta_duplicate

### svelte_meta_invalid_content

### svelte_meta_invalid_placement

### svelte_meta_invalid_tag

### svelte_options_deprecated_tag

### svelte_options_invalid_attribute

### svelte_options_invalid_attribute_value

### svelte_options_invalid_customelement

### svelte_options_invalid_customelement_props

### svelte_options_invalid_customelement_shadow

### svelte_options_invalid_tagname

See https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name for more information on valid tag names

### svelte_options_reserved_tagname

See https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name for more information on valid tag names

### svelte_options_unknown_attribute

### svelte_self_invalid_placement

### tag_invalid_placement

### textarea_invalid_content

### title_illegal_attribute

### title_invalid_content

### transition_conflict

### transition_duplicate

### typescript_invalid_feature

### unexpected_reserved_word

### unterminated_string_constant

### void_element_invalid_content

**Examples:**

Example 1 (unknown):

```unknown
An element can only have one 'animate' directive
```

Example 2 (unknown):

```unknown
An element that uses the `animate:` directive must be the only child of a keyed `{#each ...}` block
```

Example 3 (unknown):

```unknown
An element that uses the `animate:` directive must be the only child of a keyed `{#each ...}` block. Did you forget to add a key to your each block?
```

Example 4 (unknown):

```unknown
'contenteditable' attribute cannot be dynamic if element uses two-way binding
```

---

## Compiler warnings

**URL:** llms-txt#compiler-warnings

**Contents:**

- a11y_accesskey
- a11y_aria_activedescendant_has_tabindex
- a11y_aria_attributes
- a11y_autocomplete_valid
- a11y_autofocus
- a11y_click_events_have_key_events
- a11y_consider_explicit_label
- a11y_distracting_elements
- a11y_figcaption_index
- a11y_figcaption_parent

Svelte warns you at compile time if it catches potential mistakes, such as writing inaccessible markup.

Some warnings may be incorrect in your concrete use case. You can disable such false positives by placing a `<!-- svelte-ignore <code> -->` comment above the line that causes the warning. Example:

You can list multiple rules in a single comment (separated by commas), and add an explanatory note (in parentheses) alongside them:

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

Enforce no `accesskey` on element. Access keys are HTML attributes that allow web developers to assign keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by screen reader and keyboard-only users create accessibility complications. To avoid complications, access keys should not be used.

<!-- prettier-ignore -->
### a11y_aria_activedescendant_has_tabindex

An element with `aria-activedescendant` must be tabbable, so it must either have an inherent `tabindex` or declare `tabindex` as an attribute.

### a11y_aria_attributes

Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `aria-*` props.

### a11y_autocomplete_valid

Enforce that `autofocus` is not used on elements. Autofocusing elements can cause usability issues for sighted and non-sighted users alike.

### a11y_click_events_have_key_events

Enforce that visible, non-interactive elements with an `onclick` event are accompanied by a keyboard event handler.

Users should first consider whether an interactive element might be more appropriate such as a `<button type="button">` element for actions or `<a>` element for navigations. These elements are more semantically meaningful and will have built-in key handling. E.g. `Space` and `Enter` will trigger a `<button>` and `Enter` will trigger an `<a>` element.

If a non-interactive element is required then `onclick` should be accompanied by an `onkeyup` or `onkeydown` handler that enables the user to perform equivalent actions via the keyboard. In order for the user to be able to trigger a key press, the element will also need to be focusable by adding a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex). While an `onkeypress` handler will also silence this warning, it should be noted that the `keypress` event is deprecated.

Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

### a11y_consider_explicit_label

### a11y_distracting_elements

Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility issues with visually impaired users. Such elements are most likely deprecated, and should be avoided.

The following elements are visually distracting: `<marquee>` and `<blink>`.

### a11y_figcaption_index

### a11y_figcaption_parent

Enforce that certain DOM elements have the correct structure.

Certain DOM elements are useful for screen reader navigation and should not be hidden.

<!-- prettier-ignore -->
### a11y_img_redundant_alt

Enforce img alt attribute does not contain the word image, picture, or photo. Screen readers already announce `img` elements as an image. There is no need to use words such as _image_, _photo_, and/or _picture_.

### a11y_incorrect_aria_attribute_type

Enforce that only the correct type of value is used for aria attributes. For example, `aria-hidden`
should only receive a boolean.

### a11y_incorrect_aria_attribute_type_boolean

### a11y_incorrect_aria_attribute_type_id

### a11y_incorrect_aria_attribute_type_idlist

### a11y_incorrect_aria_attribute_type_integer

### a11y_incorrect_aria_attribute_type_token

### a11y_incorrect_aria_attribute_type_tokenlist

### a11y_incorrect_aria_attribute_type_tristate

### a11y_interactive_supports_focus

Enforce that elements with an interactive role and interactive handlers (mouse or key press) must be focusable or tabbable.

### a11y_invalid_attribute

Enforce that attributes important for accessibility have a valid value. For example, `href` should not be empty, `'#'`, or `javascript:`.

### a11y_label_has_associated_control

Enforce that a label tag has a text label and an associated control.

There are two supported ways to associate a label with a control:

- Wrapping a control in a label tag.
- Adding `for` to a label and assigning it the ID of an input on the page.

### a11y_media_has_caption

Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only is this important for accessibility, but can also be useful for all users in the case that the media is unavailable (similar to `alt` text on an image when an image is unable to load).

The captions should contain all important and relevant information to understand the corresponding media. This may mean that the captions are not a 1:1 mapping of the dialogue in the media content. However, captions are not necessary for video components with the `muted` attribute.

### a11y_misplaced_role

Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are not visible, for example `meta`, `html`, `script`, `style`. This rule enforces that these DOM elements do not contain the `role` props.

### a11y_misplaced_scope

The scope attribute should only be used on `<th>` elements.

<!-- prettier-ignore -->
### a11y_missing_attribute

Enforce that attributes required for accessibility are present on an element. This includes the following checks:

- `<a>` should have an href (unless it's a [fragment-defining tag](https://github.com/sveltejs/svelte/issues/4697))
- `<area>` should have alt, aria-label, or aria-labelledby
- `<html>` should have lang
- `<iframe>` should have title
- `<img>` should have alt
- `<object>` should have title, aria-label, or aria-labelledby
- `<input type="image">` should have alt, aria-label, or aria-labelledby

### a11y_missing_content

Enforce that heading elements (`h1`, `h2`, etc.) and anchors have content and that the content is accessible to screen readers

### a11y_mouse_events_have_key_events

Enforce that `onmouseover` and `onmouseout` are accompanied by `onfocus` and `onblur`, respectively. This helps to ensure that any functionality triggered by these mouse events is also accessible to keyboard users.

### a11y_no_abstract_role

### a11y_no_interactive_element_to_noninteractive_role

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) roles should not be used to convert an interactive element to a non-interactive element. Non-interactive ARIA roles include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

### a11y_no_noninteractive_element_interactions

A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<p>`, `<img>`, `<li>`, `<ul>` and `<ol>`. Non-interactive [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

### a11y_no_noninteractive_element_to_interactive_role

[WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) roles should not be used to convert a non-interactive element to an interactive element. Interactive ARIA roles include `button`, `link`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `searchbox`, `switch` and `textbox`.

### a11y_no_noninteractive_tabindex

Tab key navigation should be limited to elements on the page that can be interacted with.

<!-- prettier-ignore -->
### a11y_no_redundant_roles

Some HTML elements have default ARIA roles. Giving these elements an ARIA role that is already set by the browser [has no effect](https://www.w3.org/TR/using-aria/#aria-does-nothing) and is redundant.

### a11y_no_static_element_interactions

Elements like `<div>` with interactive handlers like `click` must have an ARIA role.

<!-- prettier-ignore -->
### a11y_positive_tabindex

Avoid positive `tabindex` property values. This will move elements out of the expected tab order, creating a confusing experience for keyboard users.

<!-- prettier-ignore -->
### a11y_role_has_required_aria_props

Elements with ARIA roles must have all required attributes for that role.

### a11y_role_supports_aria_props

Elements with explicit or implicit roles defined contain only `aria-*` properties supported by that role.

### a11y_role_supports_aria_props_implicit

Elements with explicit or implicit roles defined contain only `aria-*` properties supported by that role.

### a11y_unknown_aria_attribute

Enforce that only known ARIA attributes are used. This is based on the [WAI-ARIA States and Properties spec](https://www.w3.org/WAI/PF/aria-1.1/states_and_properties).

### a11y_unknown_role

Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) site.

<!-- prettier-ignore -->
### attribute_avoid_is

### attribute_global_event_reference

### attribute_illegal_colon

### attribute_invalid_property_name

### bidirectional_control_characters

Bidirectional control characters can alter the direction in which text appears to be in. For example, via control characters, you can make `defabc` look like `abcdef`. As a result, if you were to unknowingly copy and paste some code that has these control characters, they may alter the behavior of your code in ways you did not intend. See [trojansource.codes](https://trojansource.codes/) for more information.

### bind_invalid_each_rest

### component_name_lowercase

### css_unused_selector

Svelte traverses both the template and the `<style>` tag to find out which of the CSS selectors are not used within the template, so it can remove them.

In some situations a selector may target an element that is not 'visible' to the compiler, for example because it is part of an `{@html ...}` tag or you're overriding styles in a child component. In these cases, use [`:global`](/docs/svelte/global-styles) to preserve the selector as-is:

### custom_element_props_identifier

### element_implicitly_closed

In HTML, some elements are implicitly closed by another element. For example, you cannot nest a `<p>` inside another `<p>`:

Similarly, a parent element's closing tag will implicitly close all child elements, even if the `</` was a typo and you meant to create a _new_ element. To avoid ambiguity, it's always a good idea to have an explicit closing tag.

### element_invalid_self_closing_tag

In HTML, there's [no such thing as a self-closing tag](https://jakearchibald.com/2023/against-self-closing-tags-in-html/). While this _looks_ like a self-contained element with some text next to it...

...a spec-compliant HTML parser (such as a browser) will in fact parse it like this, with the text _inside_ the icon:

Some templating languages (including Svelte) will 'fix' HTML by turning `<span />` into `<span></span>`. Others adhere to the spec. Both result in ambiguity and confusion when copy-pasting code between different contexts, so Svelte prompts you to resolve the ambiguity directly by having an explicit closing tag.

To automate this, run the dedicated migration:

In a future version of Svelte, self-closing tags may be upgraded from a warning to an error.

### event_directive_deprecated

See [the migration guide](v5-migration-guide#Event-changes) for more info.

### export_let_unused

### legacy_component_creation

See the [migration guide](v5-migration-guide#Components-are-no-longer-classes) for more info.

### node_invalid_placement_ssr

HTML restricts where certain elements can appear. In case of a violation the browser will 'repair' the HTML in a way that breaks Svelte's assumptions about the structure of your components. Some examples:

- `<p>hello <div>world</div></p>` will result in `<p>hello </p><div>world</div><p></p>` (the `<div>` autoclosed the `<p>` because `<p>` cannot contain block-level elements)
- `<option><div>option a</div></option>` will result in `<option>option a</option>` (the `<div>` is removed)
- `<table><tr><td>cell</td></tr></table>` will result in `<table><tbody><tr><td>cell</td></tr></tbody></table>` (a `<tbody>` is auto-inserted)

This code will work when the component is rendered on the client (which is why this is a warning rather than an error), but if you use server rendering it will cause hydration to fail.

### non_reactive_update

This warning is thrown when the compiler detects the following:

- a variable was declared without `$state` or `$state.raw`
- the variable is reassigned
- the variable is read in a reactive context

In this case, changing the value will not correctly trigger updates. Example:

To fix this, wrap your variable declaration with `$state`.

### options_deprecated_accessors

### options_deprecated_immutable

### options_missing_custom_element

### options_removed_enable_sourcemap

### options_removed_hydratable

### options_removed_loop_guard_timeout

### options_renamed_ssr_dom

### perf_avoid_inline_class

### perf_avoid_nested_class

### reactive_declaration_invalid_placement

### reactive_declaration_module_script_dependency

### script_context_deprecated

### script_unknown_attribute

### slot_element_deprecated

See [the migration guide](v5-migration-guide#Snippets-instead-of-slots) for more info.

### state_referenced_locally

This warning is thrown when the compiler detects the following:

- A reactive variable is declared
- ...and later reassigned...
- ...and referenced in the same scope

This 'breaks the link' to the original state declaration. For example, if you pass the state to a function, the function loses access to the state once it is reassigned:

To fix this, reference the variable such that it is lazily evaluated. For the above example, this can be achieved by wrapping `count` in a function:

For more info, see [Passing state into functions]($state#Passing-state-into-functions).

### store_rune_conflict

### svelte_component_deprecated

In previous versions of Svelte, the component constructor was fixed when the component was rendered. In other words, if you wanted `<X>` to re-render when `X` changed, you would either have to use `<svelte:component this={X}>` or put the component inside a `{#key X}...{/key}` block.

In Svelte 5 this is no longer true — if `X` changes, `<X>` re-renders.

In some cases `<object.property>` syntax can be used as a replacement; a lowercased variable with property access is recognized as a component in Svelte 5.

For complex component resolution logic, an intermediary, capitalized variable may be necessary. E.g. in places where `@const` can be used:

<!-- prettier-ignore -->
A derived value may be used in other contexts:

<!-- prettier-ignore -->
### svelte_element_invalid_this

### svelte_self_deprecated

See [the note in the docs](legacy-svelte-self) for more info.

**Examples:**

Example 1 (svelte):

```svelte
<!-- svelte-ignore a11y_autofocus -->
<input autofocus />
```

Example 2 (svelte):

```svelte
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div onclick>...</div>
```

Example 3 (unknown):

```unknown
Avoid using accesskey
```

Example 4 (svelte):

```svelte
<!-- A11y: Avoid using accesskey -->
<div accesskey="z"></div>
```

---

## Runtime errors

**URL:** llms-txt#runtime-errors

**Contents:**

- Client errors
  - async_derived_orphan
  - bind_invalid_checkbox_value
  - bind_invalid_export
  - bind_not_bindable
  - component_api_changed
  - component_api_invalid_new
  - derived_references_self
  - each_key_duplicate
  - effect_in_teardown

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### async_derived_orphan

In Svelte there are two types of reaction — [`$derived`](/docs/svelte/$derived) and [`$effect`](/docs/svelte/$effect). Deriveds can be created anywhere, because they run _lazily_ and can be [garbage collected](https://developer.mozilla.org/en-US/docs/Glossary/Garbage_collection) if nothing references them. Effects, by contrast, keep running eagerly whenever their dependencies change, until they are destroyed.

Because of this, effects can only be created inside other effects (or [effect roots](/docs/svelte/$effect#$effect.root), such as the one that is created when you first mount a component) so that Svelte knows when to destroy them.

Some sleight of hand occurs when a derived contains an `await` expression: Since waiting until we read `{await getPromise()}` to call `getPromise` would be too late, we use an effect to instead call it proactively, notifying Svelte when the value is available. But since we're using an effect, we can only create asynchronous deriveds inside another effect.

### bind_invalid_checkbox_value

### bind_invalid_export

### bind_not_bindable

### component_api_changed

See the [migration guide](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

### component_api_invalid_new

See the [migration guide](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

### derived_references_self

### each_key_duplicate

### effect_in_teardown

### effect_in_unowned_derived

### effect_pending_outside_reaction

### effect_update_depth_exceeded

If an effect updates some state that it also depends on, it will re-run, potentially in a loop:

(Svelte intervenes before this can crash your browser tab.)

The same applies to array mutations, since these both read and write to the array:

Note that it's fine for an effect to re-run itself as long as it 'settles':

Often when encountering this issue, the value in question shouldn't be state (for example, if you are pushing to a `logs` array in an effect, make `logs` a normal array rather than `$state([])`). In the rare cases where you really _do_ need to write to state in an effect — [which you should avoid]($effect#When-not-to-use-$effect) — you can read the state with [untrack](svelte#untrack) to avoid adding it as a dependency.

### flush_sync_in_effect

The `flushSync()` function can be used to flush any pending effects synchronously. It cannot be used if effects are currently being flushed — in other words, you can call it after a state change but _not_ inside an effect.

This restriction only applies when using the `experimental.async` option, which will be active by default in Svelte 6.

### get_abort_signal_outside_reaction

### hydratable_missing_but_required

This can happen if you render a hydratable on the client that was not rendered on the server, and means that it was forced to fall back to running its function blockingly during hydration. This is bad for performance, as it blocks hydration until the asynchronous work completes.

### lifecycle_legacy_only

### props_invalid_value

### props_rest_readonly

### rune_outside_svelte

### set_context_after_init

This restriction only applies when using the `experimental.async` option, which will be active by default in Svelte 6.

### state_descriptors_fixed

### state_prototype_fixed

### state_unsafe_mutation

This error occurs when state is updated while evaluating a `$derived`. You might encounter it while trying to 'derive' two pieces of state in one go:

This is forbidden because it introduces instability: if `<p>{count} is even: {even}</p>` is updated before `odd` is recalculated, `even` will be stale. In most cases the solution is to make everything derived:

If side-effects are unavoidable, use [`$effect`]($effect) instead.

### svelte_boundary_reset_onerror

If a [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary) has an `onerror` function, it must not call the provided `reset` function synchronously since the boundary is still in a broken state. Typically, `reset()` is called later, once the error has been resolved.

If it's possible to resolve the error inside the `onerror` callback, you must at least wait for the boundary to settle before calling `reset()`, for example using [`tick`](https://svelte.dev/docs/svelte/lifecycle-hooks#tick):

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### async_local_storage_unavailable

Some platforms require configuration flags to enable this API. Consult your platform's documentation.

You (or the framework you're using) called [`render(...)`](svelte-server#render) with a component containing an `await` expression. Either `await` the result of `render` or wrap the `await` (or the component containing it) in a [`<svelte:boundary>`](svelte-boundary) with a `pending` snippet.

### hydratable_clobbering

This error occurs when using `hydratable` multiple times with the same key. To avoid this, you can:

- Ensure all invocations with the same key result in the same value
- Update the keys to make both instances unique

### hydratable_serialization_failed

### lifecycle_function_unavailable

Certain methods such as `mount` cannot be invoked while running in a server context. Avoid calling them eagerly, i.e. not during render.

### server_context_required

Certain functions such as `hydratable` cannot be invoked outside of a `render(...)` call, such as at the top level of a module.

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### experimental_async_required

### invalid_default_snippet

This error would be thrown in a setup like this:

Here, `List.svelte` is using `{@render children(item)` which means it expects `Parent.svelte` to use snippets. Instead, `Parent.svelte` uses the deprecated `let:` directive. This combination of APIs is incompatible, hence the error.

### invalid_snippet_arguments

### lifecycle_outside_component

Certain lifecycle methods can only be used during component initialisation. To fix this, make sure you're invoking the method inside the _top level of the instance script_ of your component.

The [`createContext()`](svelte#createContext) utility returns a `[get, set]` pair of functions. `get` will throw an error if `set` was not used to set the context in a parent component.

### snippet_without_render_tag

A component throwing this error will look something like this (`children` is not being rendered):

...or like this (a parent component is passing a snippet where a non-snippet value is expected):

### store_invalid_shape

### svelte_element_invalid_this_value

**Examples:**

Example 1 (unknown):

```unknown
Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
```

Example 2 (unknown):

```unknown
Using `bind:value` together with a checkbox input is not allowed. Use `bind:checked` instead
```

Example 3 (unknown):

```unknown
Component %component% has an export named `%key%` that a consumer component is trying to access using `bind:%key%`, which is disallowed. Instead, use `bind:this` (e.g. `<%name% bind:this={component} />`) and then access the property on the bound component instance (e.g. `component.%key%`)
```

Example 4 (unknown):

```unknown
A component is attempting to bind to a non-bindable property `%key%` belonging to %component% (i.e. `<%name% bind:%key%={...}>`). To mark a property as bindable: `let { %key% = $bindable() } = $props()`
```

---

## Runtime warnings

**URL:** llms-txt#runtime-warnings

**Contents:**

- Client warnings
  - assignment_value_stale
  - await_reactivity_loss
  - await_waterfall
  - binding_property_non_reactive
  - console_log_state
  - event_handler_invalid
  - hydratable_missing_but_expected
  - hydration_attribute_changed
  - hydration_html_changed

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### assignment_value_stale

Given a case like this...

...the array being pushed to when the button is first clicked is the `[]` on the right-hand side of the assignment, but the resulting value of `object.array` is an empty state proxy. As a result, the pushed value will be discarded.

You can fix this by separating it into two statements:

### await_reactivity_loss

Svelte's signal-based reactivity works by tracking which bits of state are read when a template or `$derived(...)` expression executes. If an expression contains an `await`, Svelte transforms it such that any state _after_ the `await` is also tracked — in other words, in a case like this...

...both `a` and `b` are tracked, even though `b` is only read once `a` has resolved, after the initial execution.

This does _not_ apply to an `await` that is not 'visible' inside the expression. In a case like this...

...`total` will depend on `a` (which is read immediately) but not `b` (which is not). The solution is to pass the values into the function:

In a case like this...

...the second `$derived` will not be created until the first one has resolved. Since `await two()` does not depend on the value of `a`, this delay, often described as a 'waterfall', is unnecessary.

(Note that if the values of `await one()` and `await two()` subsequently change, they can do so concurrently — the waterfall only occurs when the deriveds are first created.)

You can solve this by creating the promises first and _then_ awaiting them:

### binding_property_non_reactive

### console_log_state

When logging a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), browser devtools will log the proxy itself rather than the value it represents. In the case of Svelte, the 'target' of a `$state` proxy might not resemble its current value, which can be confusing.

The easiest way to log a value as it changes over time is to use the [`$inspect`](/docs/svelte/$inspect) rune. Alternatively, to log things on a one-off basis (for example, inside an event handler) you can use [`$state.snapshot`](/docs/svelte/$state#$state.snapshot) to take a snapshot of the current value.

### event_handler_invalid

### hydratable_missing_but_expected

This can happen if you render a hydratable on the client that was not rendered on the server, and means that it was forced to fall back to running its function blockingly during hydration. This is bad for performance, as it blocks hydration until the asynchronous work completes.

### hydration_attribute_changed

Certain attributes like `src` on an `<img>` element will not be repaired during hydration, i.e. the server value will be kept. That's because updating these attributes can cause the image to be refetched (or in the case of an `<iframe>`, for the frame to be reloaded), even if they resolve to the same resource.

To fix this, either silence the warning with a [`svelte-ignore`](basic-markup#Comments) comment, or ensure that the value stays the same between server and client. If you really need the value to change on hydration, you can force an update like this:

### hydration_html_changed

If the `{@html ...}` value changes between the server and the client, it will not be repaired during hydration, i.e. the server value will be kept. That's because change detection during hydration is expensive and usually unnecessary.

To fix this, either silence the warning with a [`svelte-ignore`](basic-markup#Comments) comment, or ensure that the value stays the same between server and client. If you really need the value to change on hydration, you can force an update like this:

### hydration_mismatch

This warning is thrown when Svelte encounters an error while hydrating the HTML from the server. During hydration, Svelte walks the DOM, expecting a certain structure. If that structure is different (for example because the HTML was repaired by the DOM because of invalid HTML), then Svelte will run into issues, resulting in this warning.

During development, this error is often preceded by a `console.error` detailing the offending HTML, which needs fixing.

### invalid_raw_snippet_render

### legacy_recursive_reactive_block

### lifecycle_double_unmount

### ownership_invalid_binding

Consider three components `GrandParent`, `Parent` and `Child`. If you do `<GrandParent bind:value>`, inside `GrandParent` pass on the variable via `<Parent {value} />` (note the missing `bind:`) and then do `<Child bind:value>` inside `Parent`, this warning is thrown.

To fix it, `bind:` to the value instead of just passing a property (i.e. in this example do `<Parent bind:value />`).

### ownership_invalid_mutation

Consider the following code:

`Child` is mutating `person` which is owned by `App` without being explicitly "allowed" to do so. This is strongly discouraged since it can create code that is hard to reason about at scale ("who mutated this value?"), hence the warning.

To fix it, either create callback props to communicate changes, or mark `person` as [`$bindable`]($bindable).

### select_multiple_invalid_value

When using `<select multiple value={...}>`, Svelte will mark all selected `<option>` elements as selected by iterating over the array passed to `value`. If `value` is not an array, Svelte will emit this warning and keep the selected options as they are.

To silence the warning, ensure that `value`:

- is an array for an explicit selection
- is `null` or `undefined` to keep the selection as is

### state_proxy_equality_mismatch

`$state(...)` creates a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) of the value it is passed. The proxy and the value have different identities, meaning equality checks will always return `false`:

To resolve this, ensure you're comparing values where both values were created with `$state(...)`, or neither were. Note that `$state.raw(...)` will _not_ create a state proxy.

### state_proxy_unmount

`unmount` was called with a state proxy:

Avoid using `$state` here. If `component` _does_ need to be reactive for some reason, use `$state.raw` instead.

### svelte_boundary_reset_noop

When an error occurs while rendering the contents of a [`<svelte:boundary>`](https://svelte.dev/docs/svelte/svelte-boundary), the `onerror` handler is called with the error plus a `reset` function that attempts to re-render the contents.

This `reset` function should only be called once. After that, it has no effect — in a case like this, where a reference to `reset` is stored outside the boundary, clicking the button while `<Contents />` is rendered will _not_ cause the contents to be rendered again.

### transition_slide_display

The [slide](/docs/svelte/svelte-transition#slide) transition works by animating the `height` of the element, which requires a `display` style like `block`, `flex` or `grid`. It does not work for:

- `display: inline` (which is the default for elements like `<span>`), and its variants like `inline-block`, `inline-flex` and `inline-grid`
- `display: table` and `table-[name]`, which are the defaults for elements like `<table>` and `<tr>`
- `display: contents`

<!-- This file is generated by scripts/process-messages/index.js. Do not edit! -->

### dynamic_void_element_content

Elements such as `<input>` cannot have content, any children passed to these elements will be ignored.

### state_snapshot_uncloneable

`$state.snapshot` tries to clone the given value in order to return a reference that no longer changes. Certain objects may not be cloneable, in which case the original value is returned. In the following example, `property` is cloned, but `window` is not, because DOM elements are uncloneable:

**Examples:**

Example 1 (unknown):

```unknown
Assignment to `%property%` property (%location%) will evaluate to the right-hand side, not the value of `%property%` following the assignment. This may result in unexpected behaviour.
```

Example 2 (svelte):

```svelte
<script>
	let object = $state({ array: null });

	function add() {
		(object.array ??= []).push(object.array.length);
	}
</script>

<button onclick={add}>add</button>
<p>items: {JSON.stringify(object.items)}</p>
```

Example 3 (js):

```js
let object = { array: [0] };
// ---cut---
function add() {
  object.array ??= [];
  object.array.push(object.array.length);
}
```

Example 4 (unknown):

```unknown
Detected reactivity loss when reading `%name%`. This happens when state is read in an async function after an earlier `await`
```

---

## Reactive let/var declarations

**URL:** llms-txt#reactive-let/var-declarations

In runes mode, reactive state is explicitly declared with the [`$state` rune]($state).

In legacy mode, variables declared at the top level of a component are automatically considered _reactive_. Reassigning or mutating these variables (`count += 1` or `object.x = y`) will cause the UI to update.

Because Svelte's legacy mode reactivity is based on _assignments_, using array methods like `.push()` and `.splice()` won't automatically trigger updates. A subsequent assignment is required to 'tell' the compiler to update the UI:

**Examples:**

Example 1 (svelte):

```svelte
<script>
	let count = 0;
</script>

<button on:click={() => count += 1}>
	clicks: {count}
</button>
```

Example 2 (svelte):

```svelte
<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
		// this method call does not trigger an update
		numbers.push(numbers.length + 1);

		// this assignment will update anything
		// that depends on `numbers`
		numbers = numbers;
	}
</script>
```

---

## Reactive $: statements

**URL:** llms-txt#reactive-$:-statements

**Contents:**

- Understanding dependencies
- Browser-only code

In runes mode, reactions to state updates are handled with the [`$derived`]($derived) and [`$effect`]($effect) runes.

In legacy mode, any top-level statement (i.e. not inside a block or a function) can be made reactive by prefixing it with a `$:` [label](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label). These statements run after other code in the `<script>` and before the component markup is rendered, then whenever the values that they depend on change.

Statements are ordered _topologically_ by their dependencies and their assignments: since the `console.log` statement depends on `sum`, `sum` is calculated first even though it appears later in the source.

Multiple statements can be combined by putting them in a block:

The left-hand side of a reactive assignments can be an identifier, or it can be a destructuring assignment:

## Understanding dependencies

The dependencies of a `$:` statement are determined at compile time — they are whichever variables are referenced (but not assigned to) inside the statement.

In other words, a statement like this will _not_ re-run when `count` changes, because the compiler cannot 'see' the dependency:

Similarly, topological ordering will fail if dependencies are referenced indirectly: `z` will never update, because `y` is not considered 'dirty' when the update occurs. Moving `$: z = y` below `$: setY(x)` will fix it:

Reactive statements run during server-side rendering as well as in the browser. This means that any code that should only run in the browser must be wrapped in an `if` block:

**Examples:**

Example 1 (svelte):

```svelte
<script>
	let a = 1;
	let b = 2;

	// this is a 'reactive statement', and it will re-run
	// when `a`, `b` or `sum` change
	$: console.log(`${a} + ${b} = ${sum}`);

	// this is a 'reactive assignment' — `sum` will be
	// recalculated when `a` or `b` change. It is
	// not necessary to declare `sum` separately
	$: sum = a + b;
</script>
```

Example 2 (js):

```js
// @noErrors
$: {
  // recalculate `total` when `items` changes
  total = 0;

  for (const item of items) {
    total += item.value;
  }
}
```

Example 3 (js):

```js
// @noErrors
$: ({ larry, moe, curly } = stooges);
```

Example 4 (js):

```js
// @noErrors
let count = 0;
let double = () => count * 2;

$: doubled = double();
```

---

## export let

**URL:** llms-txt#export-let

**Contents:**

- Component exports
- Renaming props

In runes mode, [component props](basic-markup#Component-props) are declared with the [`$props`]($props) rune, allowing parent components to pass in data.

In legacy mode, props are marked with the `export` keyword, and can have a default value:

The default value is used if it would otherwise be `undefined` when the component is created.

> [!NOTE] Unlike in runes mode, if the parent component changes a prop from a defined value to `undefined`, it does not revert to the initial value.

Props without default values are considered _required_, and Svelte will print a warning during development if no value is provided, which you can squelch by specifying `undefined` as the default value:

An exported `const`, `class` or `function` declaration is _not_ considered a prop — instead, it becomes part of the component's API:

The `export` keyword can appear separately from the declaration. This is useful for renaming props, for example in the case of a reserved word:

**Examples:**

Example 1 (svelte):

```svelte
<script>
	export let foo;
	export let bar = 'default value';

	// Values that are passed in as props
	// are immediately available
	console.log({ foo });
</script>
```

Example 2 (js):

```js
export let foo +++= undefined;+++
```

Example 3 (svelte):

```svelte
<!--- file: Greeter.svelte--->
<script>
	export function greet(name) {
		alert(`hello ${name}!`);
	}
</script>
```

Example 4 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import Greeter from './Greeter.svelte';

	let greeter;
</script>

<Greeter bind:this={greeter} />

<button on:click={() => greeter.greet('world')}>
	greet
</button>
```

---

## on:

**URL:** llms-txt#on:

**Contents:**

- Component events

In runes mode, event handlers are just like any other attribute or prop.

In legacy mode, we use the `on:` directive:

Handlers can be declared inline with no performance penalty:

Add _modifiers_ to element event handlers with the `|` character.

The following modifiers are available:

- `preventDefault` — calls `event.preventDefault()` before running the handler
- `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element
- `stopImmediatePropagation` — calls `event.stopImmediatePropagation()`, preventing other listeners of the same event from being fired.
- `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
- `nonpassive` — explicitly set `passive: false`
- `capture` — fires the handler during the _capture_ phase instead of the _bubbling_ phase
- `once` — remove the handler after the first time it runs
- `self` — only trigger handler if `event.target` is the element itself
- `trusted` — only trigger handler if `event.isTrusted` is `true`. I.e. if the event is triggered by a user action.

Modifiers can be chained together, e.g. `on:click|once|capture={...}`.

If the `on:` directive is used without a value, the component will _forward_ the event, meaning that a consumer of the component can listen for it.

It's possible to have multiple event listeners for the same event:

Components can dispatch events by creating a _dispatcher_ when they are initialised:

`dispatch` creates a [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). If a second argument is provided, it becomes the `detail` property of the event object.

A consumer of this component can listen for the dispatched events:

Component events do not bubble — a parent component can only listen for events on its immediate children.

Other than `once`, modifiers are not valid on component event handlers.

> [!NOTE]
> If you're planning an eventual migration to Svelte 5, use callback props instead. This will make upgrading easier as `createEventDispatcher` is deprecated:

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	let count = 0;

	/** @param {MouseEvent} event */
	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	count: {count}
</button>
```

Example 2 (svelte):

```svelte
<button on:click={() => (count += 1)}>
	count: {count}
</button>
```

Example 3 (svelte):

```svelte
<form on:submit|preventDefault={handleSubmit}>
	<!-- the `submit` event's default is prevented,
	     so the page won't reload -->
</form>
```

Example 4 (svelte):

```svelte
<button on:click>
	The component itself will emit the click event
</button>
```

---

## `<slot>`

**URL:** llms-txt#`<slot>`

**Contents:**

- Named slots
- Fallback content
- Passing data to slotted content

In Svelte 5, content can be passed to components in the form of [snippets](snippet) and rendered using [render tags](@render).

In legacy mode, content inside component tags is considered _slotted content_, which can be rendered by the component using a `<slot>` element:

> [!NOTE] If you want to render a regular `<slot>` element, you can use `<svelte:element this={'slot'} />`.

A component can have _named_ slots in addition to the default slot. On the parent side, add a `slot="..."` attribute to an element, component or [`<svelte:fragment>`](legacy-svelte-fragment) directly inside the component tags.

On the child side, add a corresponding `<slot name="...">` element:

If no slotted content is provided, a component can define fallback content by putting it inside the `<slot>` element:

## Passing data to slotted content

Slots can be rendered zero or more times and can pass values _back_ to the parent using props. The parent exposes the values to the slot template using the `let:` directive.

The usual shorthand rules apply — `let:item` is equivalent to `let:item={item}`, and `<slot {item}>` is equivalent to `<slot item={item}>`.

Named slots can also expose values. The `let:` directive goes on the element with the `slot` attribute.

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import Modal from './Modal.svelte';
</script>

<Modal>This is some slotted content</Modal>
```

Example 2 (svelte):

```svelte
<!--- file: Modal.svelte --->
<div class="modal">
	<slot></slot>
</div>
```

Example 3 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import Modal from './Modal.svelte';

	let open = true;
</script>

{#if open}
	<Modal>
		This is some slotted content

		+++<div slot="buttons">+++
			<button on:click={() => open = false}>
				close
			</button>
		+++</div>+++
	</Modal>
{/if}
```

Example 4 (svelte):

```svelte
<!--- file: Modal.svelte --->
<div class="modal">
	<slot></slot>
	<hr>
	+++<slot name="buttons"></slot>+++
</div>
```

---

## $$slots

**URL:** llms-txt#$$slots

In runes mode, we know which [snippets](snippet) were provided to a component, as they're just normal props.

In legacy mode, the way to know if content was provided for a given slot is with the `$$slots` object, whose keys are the names of the slots passed into the component by the parent.

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: Card.svelte --->
<div>
	<slot name="title" />
	{#if $$slots.description}
		<!-- This <hr> and slot will render only if `slot="description"` is provided. -->
		<hr />
		<slot name="description" />
	{/if}
</div>
```

Example 2 (svelte):

```svelte
<!--- file: App.svelte --->
<Card>
	<h1 slot="title">Blog Post Title</h1>
	<!-- No slot named "description" was provided so the optional slot will not be rendered. -->
</Card>
```

---
