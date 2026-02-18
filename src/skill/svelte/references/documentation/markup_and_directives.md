# Svelte_Docs - Markup And Directives

**Pages:** 19

---

## Basic markup

**URL:** llms-txt#basic-markup

**Contents:**

- Tags
- Element attributes
- Component props
- Spread attributes
- Events
  - Event delegation
- Text expressions
- Comments

Markup inside a Svelte component can be thought of as HTML++.

A lowercase tag, like `<div>`, denotes a regular HTML element. A capitalised tag or a tag that uses dot notation, such as `<Widget>` or `<my.stuff>`, indicates a _component_.

## Element attributes

By default, attributes work exactly like their HTML counterparts.

As in HTML, values may be unquoted.

<!-- prettier-ignore -->
Attribute values can contain JavaScript expressions.

Or they can _be_ JavaScript expressions.

Boolean attributes are included on the element if their value is [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) and excluded if it's [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).

All other attributes are included unless their value is [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` or `undefined`).

> [!NOTE] Quoting a singular expression does not affect how the value is parsed, but in Svelte 6 it will cause the value to be coerced to a string:
>
> <!-- prettier-ignore -->

When the attribute name and value match (`name={name}`), they can be replaced with `{name}`.

By convention, values passed to components are referred to as _properties_ or _props_ rather than _attributes_, which are a feature of the DOM.

As with elements, `name={name}` can be replaced with the `{name}` shorthand.

_Spread attributes_ allow many attributes or properties to be passed to an element or component at once.

An element or component can have multiple spread attributes, interspersed with regular ones. Order matters — if `things.a` exists it will take precedence over `a="b"`, while `c="d"` would take precedence over `things.c`:

Listening to DOM events is possible by adding attributes to the element that start with `on`. For example, to listen to the `click` event, add the `onclick` attribute to a button:

Event attributes are case sensitive. `onclick` listens to the `click` event, `onClick` listens to the `Click` event, which is different. This ensures you can listen to custom events that have uppercase characters in them.

Because events are just attributes, the same rules as for attributes apply:

- you can use the shorthand form: `<button {onclick}>click me</button>`
- you can spread them: `<button {...thisSpreadContainsEventAttributes}>click me</button>`

Timing-wise, event attributes always fire after events from bindings (e.g. `oninput` always fires after an update to `bind:value`). Under the hood, some event handlers are attached directly with `addEventListener`, while others are _delegated_.

When using `ontouchstart` and `ontouchmove` event attributes, the handlers are [passive](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners) for better performance. This greatly improves responsiveness by allowing the browser to scroll the document immediately, rather than waiting to see if the event handler calls `event.preventDefault()`.

In the very rare cases that you need to prevent these event defaults, you should use [`on`](svelte-events#on) instead (for example inside an action).

To reduce memory footprint and increase performance, Svelte uses a technique called event delegation. This means that for certain events — see the list below — a single event listener at the application root takes responsibility for running any handlers on the event's path.

There are a few gotchas to be aware of:

- when you manually dispatch an event with a delegated listener, make sure to set the `{ bubbles: true }` option or it won't reach the application root
- when using `addEventListener` directly, avoid calling `stopPropagation` or the event won't reach the application root and handlers won't be invoked. Similarly, handlers added manually inside the application root will run _before_ handlers added declaratively deeper in the DOM (with e.g. `onclick={...}`), in both capturing and bubbling phases. For these reasons it's better to use the `on` function imported from `svelte/events` rather than `addEventListener`, as it will ensure that order is preserved and `stopPropagation` is handled correctly.

The following event handlers are delegated:

- `beforeinput`
- `click`
- `change`
- `dblclick`
- `contextmenu`
- `focusin`
- `focusout`
- `input`
- `keydown`
- `keyup`
- `mousedown`
- `mousemove`
- `mouseout`
- `mouseover`
- `mouseup`
- `pointerdown`
- `pointermove`
- `pointerout`
- `pointerover`
- `pointerup`
- `touchend`
- `touchmove`
- `touchstart`

A JavaScript expression can be included as text by surrounding it with curly braces.

Expressions that are `null` or `undefined` will be omitted; all others are [coerced to strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion).

Curly braces can be included in a Svelte template by using their [HTML entity](https://developer.mozilla.org/docs/Glossary/Entity) strings: `&lbrace;`, `&lcub;`, or `&#123;` for `{` and `&rbrace;`, `&rcub;`, or `&#125;` for `}`.

If you're using a regular expression (`RegExp`) [literal notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor), you'll need to wrap it in parentheses.

<!-- prettier-ignore -->
The expression will be stringified and escaped to prevent code injections. If you want to render HTML, use the `{@html}` tag instead.

> [!NOTE] Make sure that you either escape the passed string or only populate it with values that are under your control in order to prevent [XSS attacks](https://owasp.org/www-community/attacks/xss/)

You can use HTML comments inside components.

Comments beginning with `svelte-ignore` disable warnings for the next block of markup. Usually, these are accessibility warnings; make sure that you're disabling them for a good reason.

You can add a special comment starting with `@component` that will show up when hovering over the component name in other files.

html

  <Main name="Arethra">
  `

**Examples:**

Example 1 (svelte):

```svelte
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget />
</div>
```

Example 2 (svelte):

```svelte
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

Example 3 (svelte):

```svelte
<input type=checkbox />
```

Example 4 (svelte):

```svelte
<a href="page/{p}">page {p}</a>
```

---

## {#if ...}

**URL:** llms-txt#{#if-...}

Content that is conditionally rendered can be wrapped in an if block.

Additional conditions can be added with `{:else if expression}`, optionally ending in an `{:else}` clause.

(Blocks don't have to wrap elements, they can also wrap text within elements.)

**Examples:**

Example 1 (svelte):

```svelte
<!--- copy: false  --->
{#if expression}...{/if}
```

Example 2 (svelte):

```svelte
<!--- copy: false  --->
{#if expression}...{:else if expression}...{/if}
```

Example 3 (svelte):

```svelte
<!--- copy: false  --->
{#if expression}...{:else}...{/if}
```

Example 4 (svelte):

```svelte
{#if answer === 42}
	<p>what was the question?</p>
{/if}
```

---

## {#each ...}

**URL:** llms-txt#{#each-...}

**Contents:**

- Keyed each blocks
- Each blocks without an item
- Else blocks

Iterating over values can be done with an each block. The values in question can be arrays, array-like objects (i.e. anything with a `length` property), or iterables like `Map` and `Set`— in other words, anything that can be used with `Array.from`.

If the value is `null` or `undefined`, it is treated the same as an empty array (which will cause [else blocks](#Else-blocks) to be rendered, where applicable).

An each block can also specify an _index_, equivalent to the second argument in an `array.map(...)` callback:

If a _key_ expression is provided — which must uniquely identify each list item — Svelte will use it to intelligently update the list when data changes by inserting, moving and deleting items, rather than adding or removing items at the end and updating the state in the middle.

The key can be any object, but strings and numbers are recommended since they allow identity to persist when the objects themselves change.

You can freely use destructuring and rest patterns in each blocks.

## Each blocks without an item

In case you just want to render something `n` times, you can omit the `as` part ([demo](/playground/untitled#H4sIAAAAAAAAE3WR0W7CMAxFf8XKNAk0WsSeUEaRpn3Guoc0MbQiJFHiMlDVf18SOrZJ48259_jaVgZmxBEZZ28thgCNFV6xBdt1GgPj7wOji0t2EqI-wa_OleGEmpLWiID_6dIaQkMxhm1UdwKpRQhVzWSaVORJNdvWpqbhAYVsYQCNZk8thzWMC_DCHMZk3wPSThNQ088I3mghD9UwSwHwlLE5PMIzVFUFq3G7WUZ2OyUvU3JOuZU332wCXTRmtPy1NgzXZtUFp8WFw9536uWqpbIgPEaDsJBW90cTOHh0KGi2XsBq5-cT6-3nPauxXqHnsHJnCFZ3CvJVkyuCQ0mFF9TZyCQ162WGvteLKfG197Y3iv_pz_fmS68Hxt8iPBPj5HscP8YvCNX7uhYCAAA=)):

An each block can also have an `{:else}` clause, which is rendered if the list is empty.

**Examples:**

Example 1 (svelte):

```svelte
<!--- copy: false  --->
{#each expression as name}...{/each}
```

Example 2 (svelte):

```svelte
<!--- copy: false  --->
{#each expression as name, index}...{/each}
```

Example 3 (svelte):

```svelte
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

Example 4 (svelte):

```svelte
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

## {#key ...}

**URL:** llms-txt#{#key-...}

Key blocks destroy and recreate their contents when the value of an expression changes. When used around components, this will cause them to be reinstantiated and reinitialised:

It's also useful if you want a transition to play whenever a value changes:

**Examples:**

Example 1 (svelte):

```svelte
<!--- copy: false  --->
{#key expression}...{/key}
```

Example 2 (svelte):

```svelte
{#key value}
	<Component />
{/key}
```

Example 3 (svelte):

```svelte
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

---

## {#await ...}

**URL:** llms-txt#{#await-...}

Await blocks allow you to branch on the three possible states of a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) — pending, fulfilled or rejected.

> [!NOTE] During server-side rendering, only the pending branch will be rendered.
>
> If the provided expression is not a `Promise`, only the `:then` branch will be rendered, including during server-side rendering.

The `catch` block can be omitted if you don't need to render anything when the promise rejects (or no error is possible).

If you don't care about the pending state, you can also omit the initial block.

Similarly, if you only want to show the error state, you can omit the `then` block.

> [!NOTE] You can use `#await` with [`import(...)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) to render components lazily:

**Examples:**

Example 1 (svelte):

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{:catch name}...{/await}
```

Example 2 (svelte):

```svelte
<!--- copy: false  --->
{#await expression}...{:then name}...{/await}
```

Example 3 (svelte):

```svelte
<!--- copy: false  --->
{#await expression then name}...{/await}
```

Example 4 (svelte):

```svelte
<!--- copy: false  --->
{#await expression catch name}...{/await}
```

---

## {#snippet ...}

**URL:** llms-txt#{#snippet-...}

**Contents:**

- Snippet scope
- Passing snippets to components
  - Explicit props
  - Implicit props
  - Implicit `children` snippet
  - Optional snippet props
- Typing snippets
- Exporting snippets
- Programmatic snippets
- Snippets and slots

Snippets, and [render tags](@render), are a way to create reusable chunks of markup inside your components. Instead of writing duplicative code like [this](/playground/untitled#H4sIAAAAAAAAE5VUYW-kIBD9K8Tmsm2yXXRzvQ-s3eR-R-0HqqOQKhAZb9sz_vdDkV1t000vRmHewMx7w2AflbIGG7GnPlK8gYhFv42JthG-m9Gwf6BGcLbVXZuPSGrzVho8ZirDGpDIhldgySN5GpEMez9kaNuckY1ANJZRamRuu2ZnhEZt6a84pvs43mzD4pMsUDDi8DMkQFYCGdkvsJwblFq5uCik9bmJ4JZwUkv1eoknWigX2eGNN6aGXa6bjV8ybP-X7sM36T58SVcrIIV2xVIaA41xeD5kKqWXuqpUJEefOqVuOkL9DfBchGrzWfu0vb-RpTd3o-zBR045Ga3HfuE5BmJpKauuhbPtENlUF2sqR9jqpsPSxWsMrlngyj3VJiyYjJXb1-lMa7IWC-iSk2M5Zzh-SJjShe-siq5kpZRPs55BbSGU5YPyte4vVV_VfFXxVb10dSLf17pS2lM5HnpPxw4Zpv6x-F57p0jI3OKlVnhv5V9wPQrNYQQ9D_f6aGHlC89fq1Z3qmDkJCTCweOGF4VUFSPJvD_DhreVdA0eu8ehJJ5x91dBaBkpWm3ureCFPt3uzRv56d4kdp-2euG38XZ6dsnd3ZmPG9yRBCrzRUvi-MccOdwz3qE-fOZ7AwAhlrtTUx3c76vRhSwlFBHDtoPhefgHX3dM0PkEAAA=)...

...you can write [this](/playground/untitled#H4sIAAAAAAAAE5VUYW-bMBD9KxbRlERKY4jWfSA02n5H6QcXDmwVbMs-lnaI_z6D7TTt1moTAnPvzvfenQ_GpBEd2CS_HxPJekjy5IfWyS7BFz0b9id0CM62ajDVjBS2MkLjqZQldoBE9KwFS-7I_YyUOPqlRGuqnKw5orY5pVpUduj3mitUln5LU3pI0_UuBp9FjTwnDr9AHETLMSeHK6xiGoWSLi9yYT034cwSRjohn17zcQPNFTs8s153sK9Uv_Yh0-5_5d7-o9zbD-UqCaRWrllSYZQxLw_HUhb0ta-y4NnJUxfUvc7QuLJSaO0a3oh2MLBZat8u-wsPnXzKQvTtVVF34xK5d69ThFmHEQ4SpzeVRediTG8rjD5vBSeN3E5JyHh6R1DQK9-iml5kjzQUN_lSgVU8DhYLx7wwjSvRkMDvTjiwF4zM1kXZ7DlF1eN3A7IG85e-zRrYEjjm0FkI4Cc7Ripm0pHOChexhcWXzreeZyRMU6Mk3ljxC9w4QH-cQZ_b3T5pjHxk1VNr1CDrnJy5QDh6XLO6FrLNSRb2l9gz0wo3S6m7HErSgLsPGMHkpDZK31jOanXeHPQz-eruLHUP0z6yTbpbrn223V70uMXNSpQSZjpL0y8hcxxpNqA6_ql3BQAxlxvfpQ_uT9GrWjQC6iRHM8D0MP0GQsIi92QEAAA=):

Like function declarations, snippets can have an arbitrary number of parameters, which can have default values, and you can destructure each parameter. You cannot use rest parameters, however.

Snippets can be declared anywhere inside your component. They can reference values declared outside themselves, for example in the `<script>` tag or in `{#each ...}` blocks ([demo](/playground/untitled#H4sIAAAAAAAAE12P0QrCMAxFfyWrwhSEvc8p-h1OcG5RC10bmkyQ0n-3HQPBx3vCPUmCemiDrOpLULYbUdXqTKR2Sj6UA7_RCKbMbvJ9Jg33XpMcW9uKQYEAIzJ3T4QD3LSUDE-PnYA4YET4uOkGMc3W5B3xZrtvbVP9HDas2GqiZHqhMW6Tr9jGbG_oOCMImcUCwrIpFk1FqRyqpRpn0cmjHdAvnrIzuscyq_4nd3dPPD01ukE_NA6qFj9hvMYvGjJADw8BAAA=))...

...and they are 'visible' to everything in the same lexical scope (i.e. siblings, and children of those siblings):

Snippets can reference themselves and each other ([demo](/playground/untitled#H4sIAAAAAAAAE2WPTQqDMBCFrxLiRqH1Zysi7TlqF1YnENBJSGJLCYGeo5tesUeosfYH3c2bee_jjaWMd6BpfrAU6x5oTvdS0g01V-mFPkNnYNRaDKrxGxto5FKCIaeu1kYwFkauwsoUWtZYPh_3W5FMY4U2mb3egL9kIwY0rbhgiO-sDTgjSEqSTvIDs-jiOP7i_MHuFGAL6p9BtiSbOTl0GtzCuihqE87cqtyam6WRGz_vRcsZh5bmRg3gju4Fptq_kzQBAAA=)):

## Passing snippets to components

Within the template, snippets are values just like any other. As such, they can be passed to components as props ([demo](/playground/untitled#H4sIAAAAAAAAE3VS247aMBD9lZGpBGwDASRegonaPvQL2qdlH5zYEKvBNvbQLbL875VzAcKyj3PmzJnLGU8UOwqSkd8KJdaCk4TsZS0cyV49wYuJuQiQpGd-N2bu_ooaI1YwJ57hpVYoFDqSEepKKw3mO7VDeTTaIvxiRS1gb_URxvO0ibrS8WanIrHUyiHs7Vmigy28RmyHHmKvDMbMmFq4cQInvGSwTsBYWYoMVhCSB2rBFFPsyl0uruTlR3JZCWvlTXl1Yy_mawiR_rbZKZrellJ-5JQ0RiBUgnFhJ9OGR7HKmwVoilXeIye8DOJGfYCgRlZ3iE876TBsZPX7hPdteO75PC4QaIo8vwNPePmANQ2fMeEFHrLD7rR1jTNkW986E8C3KwfwVr8HSHOSEBT_kGRozyIkn_zQveXDL3rIfPJHtUDwzShJd_Qk3gQCbOGLsdq4yfTRJopRuin3I7nv6kL7ARRjmLdBDG3uv1mhuLA3V2mKtqNEf_oCn8p9aN-WYqH5peP4kWBl1UwJzAEPT9U7K--0fRrrWnPTXpCm1_EVdXjpNmlA8G1hPPyM1fKgMqjFHjctXGjLhZ05w0qpDhksGrybuNEHtJnCalZWsuaTlfq6nPaaBSv_HKw-K57BjzOiVj9ZKQYKzQjZodYFqydYTRN4gPhVzTDO2xnma3HsVWjaLjT8nbfwHy7Q5f2dBAAA)):

Think about it like passing content instead of data to a component. The concept is similar to slots in web components.

As an authoring convenience, snippets declared directly _inside_ a component implicitly become props _on_ the component ([demo](/playground/untitled#H4sIAAAAAAAAE3VSTa_aMBD8Kyu_SkAbCA-JSzBR20N_QXt6vIMTO8SqsY29tI2s_PcqTiB8vaPHs7MzuxuIZgdBMvJLo0QlOElIJZXwJHsLBBvb_XUASc7Mb9Yu_B-hsMMK5sUzvDQahUZPMkJ96aTFfKd3KA_WOISfrFACKmcOMFmk8TWUTjY73RFLoz1C5U4SPWzhrcN2GKDrlcGEWauEnyRwxCaDdQLWyVJksII2uaMWTDPNLtzX5YX8-kgua-GcHJVXI3u5WEPb0d83O03TMZSmfRzOkG1Db7mNacOL19JagVALxoWbztq-H8U6j0SaYp2P2BGbOyQ2v8PQIFMXLKRDk177pq0zf6d8bMrzwBdd0pamyPMb-IjNEzS2f86Gz_Dwf-2F9nvNSUJQ_EOSoTuJNvngqK5v4Pas7n4-OCwlEEJcQTIMO-nSQwtb-GSdsX46e9gbRoP9yGQ11I0rEuycunu6PHx1QnPhxm3SFN15MOlYEFJZtf0dUywMbwZOeBGsrKNLYB54-1R9WNqVdki7usim6VmQphf7mnpshiQRhNAXdoOfMyX3OgMlKtz0cGEcF27uLSul3mewjPjgOOoDukxjPS9rqfh0pb-8zs6aBSt_7505aZ7B9xOi0T9YKW4UooVsr0zB1BTrWQJ3EL-oWcZ572GxFoezCk37QLe3897-B2i2U62uBAAA)):

### Implicit `children` snippet

Any content inside the component tags that is _not_ a snippet declaration implicitly becomes part of the `children` snippet ([demo](/playground/untitled#H4sIAAAAAAAAE3WOQQrCMBBFrzIMggql3ddY1Du4si5sOmIwnYRkFKX07lKqglqX8_7_w2uRDw1hjlsWI5ZqTPBoLEXMdy3K3fdZDzB5Ndfep_FKVnpWHSKNce1YiCVijirqYLwUJQOYxrsgsLmIOIZjcA1M02w4n-PpomSVvTclqyEutDX6DA2pZ7_ABIVugrmEC3XJH92P55_G39GodCmWBFrQJ2PrQAwdLGHig_NxNv9xrQa1dhWIawrv1Wzeqawa8953D-8QOmaEAQAA)):

> [!NOTE] Note that you cannot have a prop called `children` if you also have content inside the component — for this reason, you should avoid having props with that name

### Optional snippet props

You can declare snippet props as being optional. You can either use optional chaining to not render anything if the snippet isn't set...

...or use an `#if` block to render fallback content:

Snippets implement the `Snippet` interface imported from `'svelte'`:

With this change, red squigglies will appear if you try and use the component without providing a `data` prop and a `row` snippet. Notice that the type argument provided to `Snippet` is a tuple, since snippets can have multiple parameters.

We can tighten things up further by declaring a generic, so that `data` and `row` refer to the same type:

## Exporting snippets

Snippets declared at the top level of a `.svelte` file can be exported from a `<script module>` for use in other components, provided they don't reference any declarations in a non-module `<script>` (whether directly or indirectly, via other snippets) ([demo](/playground/untitled#H4sIAAAAAAAAE3WPwY7CMAxEf8UyB1hRgdhjl13Bga8gHFJipEqtGyUGFUX5dxJUtEB3b9bYM_MckHVLWOKut50TMuC5tpbEY4GnuiGP5T6gXG0-ykLSB8vW2oW_UCNZq7Snv_Rjx0Kc4kpc-6OrrfwoVlK3uQ4CaGMgwsl1LUwXy0f54J9-KV4vf20cNo7YkMu22aqAz4-oOLUI9YKluDPF4h_at-hX5PFyzA1tZ84N3fGpf8YfUU6GvDumLqDKmEqCjjCHUEX4hqDTWCU5PJ6Or38c4g1cPu9tnAEAAA==)):

> [!NOTE]
> This requires Svelte 5.5.0 or newer

## Programmatic snippets

Snippets can be created programmatically with the [`createRawSnippet`](svelte#createRawSnippet) API. This is intended for advanced use cases.

## Snippets and slots

In Svelte 4, content can be passed to components using [slots](legacy-slots). Snippets are more powerful and flexible, and so slots have been deprecated in Svelte 5.

**Examples:**

Example 1 (svelte):

```svelte
<!--- copy: false  --->
{#snippet name()}...{/snippet}
```

Example 2 (svelte):

```svelte
<!--- copy: false  --->
{#snippet name(param1, param2, paramN)}...{/snippet}
```

Example 3 (svelte):

```svelte
{#each images as image}
	{#if image.href}
		<a href={image.href}>
			<figure>
				<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
				<figcaption>{image.caption}</figcaption>
			</figure>
		</a>
	{:else}
		<figure>
			<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
			<figcaption>{image.caption}</figcaption>
		</figure>
	{/if}
{/each}
```

Example 4 (svelte):

```svelte
{#snippet figure(image)}
	<figure>
		<img src={image.src} alt={image.caption} width={image.width} height={image.height} />
		<figcaption>{image.caption}</figcaption>
	</figure>
{/snippet}

{#each images as image}
	{#if image.href}
		<a href={image.href}>
			{@render figure(image)}
		</a>
	{:else}
		{@render figure(image)}
	{/if}
{/each}
```

---

## {@render ...}

**URL:** llms-txt#{@render-...}

**Contents:**

- Optional snippets

To render a [snippet](snippet), use a `{@render ...}` tag.

The expression can be an identifier like `sum`, or an arbitrary JavaScript expression:

If the snippet is potentially undefined — for example, because it's an incoming prop — then you can use optional chaining to only render it when it _is_ defined:

Alternatively, use an [`{#if ...}`](if) block with an `:else` clause to render fallback content:

**Examples:**

Example 1 (svelte):

```svelte
{#snippet sum(a, b)}
	<p>{a} + {b} = {a + b}</p>
{/snippet}

{@render sum(1, 2)}
{@render sum(3, 4)}
{@render sum(5, 6)}
```

Example 2 (svelte):

```svelte
{@render (cool ? coolSnippet : lameSnippet)()}
```

Example 3 (svelte):

```svelte
{@render children?.()}
```

Example 4 (svelte):

```svelte
{#if children}
	{@render children()}
{:else}
	<p>fallback content</p>
{/if}
```

---

## {@html ...}

**URL:** llms-txt#{@html-...}

**Contents:**

- Styling

To inject raw HTML into your component, use the `{@html ...}` tag:

> [!NOTE] Make sure that you either escape the passed string or only populate it with values that are under your control in order to prevent [XSS attacks](https://owasp.org/www-community/attacks/xss/). Never render unsanitized content.

The expression should be valid standalone HTML — this will not work, because `</div>` is not valid HTML:

It also will not compile Svelte code.

Content rendered this way is 'invisible' to Svelte and as such will not receive [scoped styles](scoped-styles). In other words, this will not work, and the `a` and `img` styles will be regarded as unused:

<!-- prettier-ignore -->
Instead, use the `:global` modifier to target everything inside the `<article>`:

<!-- prettier-ignore -->
**Examples:**

Example 1 (svelte):

```svelte
<article>
	{@html content}
</article>
```

Example 2 (svelte):

```svelte
{@html '<div>'}content{@html '</div>'}
```

Example 3 (svelte):

```svelte
<article>
	{@html content}
</article>

<style>
	article {
		a { color: hotpink }
		img { width: 100% }
	}
</style>
```

Example 4 (svelte):

```svelte
<style>
	article +++:global+++ {
		a { color: hotpink }
		img { width: 100% }
	}
</style>
```

---

## {@attach ...}

**URL:** llms-txt#{@attach-...}

**Contents:**

- Attachment factories
- Inline attachments
- Passing attachments to components
- Controlling when attachments re-run
- Creating attachments programmatically
- Converting actions to attachments

Attachments are functions that run in an [effect]($effect) when an element is mounted to the DOM or when [state]($state) read inside the function updates.

Optionally, they can return a function that is called before the attachment re-runs, or after the element is later removed from the DOM.

> [!NOTE]
> Attachments are available in Svelte 5.29 and newer.

An element can have any number of attachments.

## Attachment factories

A useful pattern is for a function, such as `tooltip` in this example, to _return_ an attachment ([demo](/playground/untitled#H4sIAAAAAAAAE3VT0XLaMBD8lavbDiaNCUlbHhTItG_5h5AH2T5ArdBppDOEMv73SkbGJGnH47F9t3un3TsfMyO3mInsh2SW1Sa7zlZKo8_E0zHjg42pGAjxBPxp7cTvUHOMldLjv-IVGUbDoUw295VTlh-WZslqa8kxsLL2ACtHWxh175NffnQfAAGikSGxYQGfPEvGfPSIWtOH0TiBVo2pWJEBJtKhQp4YYzjG9JIdcuMM5IZqHMPioY8vOSA997zQoevf4a7heO7cdp34olRiTGr07OhwH1IdoO2A7dLMbwahZq6MbRhKZWqxk7rBxTGVbuHmhCgb5qDgmIx_J6XtHHukHTrYYqx_YpzYng8aO4RYayql7hU-1ZJl0akqHBE_D9KLolwL-Dibzc7iSln9XjtqTF1UpMkJ2EmXR-BgQErsN4pxIJKr0RVO1qrxAqaTO4fbc9bKulZm3cfDY3aZDgvFGErWjmzhN7KmfX5rXyDeX8Pt1mU-hXjdBOrtuB97vK4GPUtmJ41XcRMEGDLD8do0nJ73zhUhSlyRw0t3vPqD8cjfLs-axiFgNBrkUd9Ulp50c-GLxlXAVlJX-ffpZyiSn7H0eLCUySZQcQdXlxj4El0Yv_FZvIKElqqGTruVLhzu7VRKCh22_5toOyxsWqLwwzK-cCbYNdg-hy-p9D7sbiZWUnts_wLUOF3CJgQAAA==)):

Since the `tooltip(content)` expression runs inside an [effect]($effect), the attachment will be destroyed and recreated whenever `content` changes. The same thing would happen for any state read _inside_ the attachment function when it first runs. (If this isn't what you want, see [Controlling when attachments re-run](#Controlling-when-attachments-re-run).)

## Inline attachments

Attachments can also be created inline ([demo](/playground/untitled#H4sIAAAAAAAAE71Wf3OaWBT9KoyTTnW3MS-I3dYmnWXVtnRAazRJzbozRSQEApiRhwKO333vuY8m225m_9yZGOT9OPfcc84D943UTfxGr_G7K6Xr3TVeNW7D2M8avT_3DVk-YAoDNF4vNB8e2tnWjyXGlm7mPzfurVPpp5JgGmeZtwkf5PtFupCxLzVvHa832rl2lElX-s2Xm2DZFNqp_hs-rZetd4v07ORpT3qmQHu7MF2td0BZp8k6z_xkvfXP902_pZ2_1_aYWEiqm0kN8I4r79qbdZ6umnq3q_2iNf22F4dE6qt2oimwdpim_uY6XMm7Fuo-IQT_iTD_CeGTHwZ38ieIJUFQRxirR1Xf39Dw0X5z0I72Af4tD61vvPNwWKQnqmfPTbduhsEd2J3vO_oBd3dc6fF2X7umNdWGf0vBRhSS6qoV7cCXfTXWfKmvWG61_si_vfU92Wz-E4RhsLhNIYinsox9QKGVd8-tuACCeKXRX12P-T_eKf7fhTq0Hvt-f3ailtSeoxJHRo1-58NoPe1UiBc1hkL8Yeh45y_vQ3mcuNl9T8s3cXPRWLnS7YWJG_gn2Tb4tUjid8jua-PVl08j_ab8I14mH8Llx0s5Tz5Err4ql52r_GYg0mVy1bEGZuD0ze64b5TWYFiM-16wSuJ4JT5vfVpDcztrcG_YkRU4s6HxufzDWF4XuVeJ1P10IbzBemt3Vp1V2e04ZXfrJd7Wicyd039brRIv_RIVu_nXi7X1cfL2sy66ztToUp1TO7qJ7NlwZ0f30pld5qNSVE5o6PbMojFHjgZB7oSicPpGteyLclQap7SvY0dXtM_LR1NT2JFHey3aaxa0VxCeYJ7RMHemoiCcgPZV9pR7o7kgcOjeGliYk9hjDZx8FAq6enwlTPSZj_vYPw9Il64dXdIY8ZmapzwfEd8-1ZyaxWhqkIZOibXUd-6Upqi1pD4uMicCV1GA_7zi73UN8BaF4sC8peJtMjfmjbHZBFwq5ov50qRaE0l96NZggnW4KqypYRAW-uhSz9ADvklwJF2J-5W0Z5fQPBhDX92R6I_0IFxRgDftge4l4dP-gH1hjD7uqU6fsOEZ9UNrCdPB-nys6uXgY6O3ZMd9sy5T9PghqrWHdjo4jB51CgLiKJaDYYA-7WgYONf1FbjkI-mE3EAfUY_rijfuJ_CVPaR50oe9JF7Q0pI8Dw3osxxYHdYPGbp2CnwHF8KvwJv2wEv0Z3ilQI6U9uwbZxbYJXvEmjjQjjCHkvNLvNg3yhzXQd1olamsT4IRrZmX0MUDpwL7R8zzHj7pSh9hPHFSHjLezKqAST51uC5zmtQ87skDUaneLokT5RbXkPWSYz53Abgjc8_o4KFGUZ-Hgv2Z1l5OTYM9D-HfUD0L-EwxH5wRnIG61gS-khfgY1bq7IAP_DA4l5xRuh9xlm8yGjutc8t-wHtkhWv3hc7aqGwiK5KzgvM5xRkZYn193uEln-su55j1GaIv7oM4iPrsVHiG0Dx7TR9-1lBfqFdwfvSd5LNL5xyZVp5NoHFZ57FkfiF6vKs4k5zvIfrX5xX6MXmt0gM5MTu8DjnhukrHHzTRd3jm0dma0_f_x5cxP9f4jBdqHvmbq2fUjzqcKh2Cp-yWj9ntcHanXmBXxhu7Q--eyjhfNFpaV7zgz4nWEUb7zUOhpevjjf_gu_KZ99pxFlZ-T3sttkmYqrco_26q35v0Ewzv5EZPbnL_8BfduWGMnyyN3q0bZ_7hb_7KG_L4CQAA)):

> [!NOTE]
> The nested effect runs whenever `color` changes, while the outer effect (where `canvas.getContext(...)` is called) only runs once, since it doesn't read any reactive state.

## Passing attachments to components

When used on a component, `{@attach ...}` will create a prop whose key is a [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). If the component then [spreads](/tutorial/svelte/spread-props) props onto an element, the element will receive those attachments.

This allows you to create _wrapper components_ that augment elements ([demo](/playground/untitled#H4sIAAAAAAAAE3VUS3ObMBD-KxvajnFqsJM2PhA7TXrKob31FjITAbKtRkiMtDhJPfz3LiAMdpxhGJvdb1_fPnaeYjn3Iu-WIbJ04028lZDcetHDzsO3olbVApI74F1RhHbLJdayhFl-Sp5qhVwhufEWNjWiwJtYxSjyQhsEFEXxBiujcxg1_8O_dnQ9APwsEbVyiHDafjrvDZCgkiO4MLCEzxYZcn90z6XUZ6OxA61KlaIgV6i1pFC-sxjDrlbHaDiWRoGvdMbHsLzp5DES0mJnRxGaRBvcBHb7yFUTCQeunEWYcYtGv12TqgFUDbCK1WLaM6IWQhUlQiJUFm2ZLPly51xXMG0Rjoyd69C7UqqG2nu95QZyXvtvLVpri2-SN4hoLXXCZFfhQ8aQBU1VgdEaH_vSgyBZR_BpPp_vi0tY-rw2ulRZkGqpTQRbZvwa2BPgFC8bgbw31CbjJjAsE6WNYBZeGp7vtQXLMqHWnZx-5kM1TR5ycpkZXQR2wzL94l8Ur1C_3-g168SfQf1MyfRi3LW9fs77emJEw5QV9SREoLTq06tcczq7d6xEUcJX2vAhO1b843XK34e5unZEMBr15ekuKEusluWAF8lXhE2ZTP2r2RcIHJ-163FPKerCgYJLOB9i4GvNwviI5-gAQiFFBk3tBTOU3HFXEk0R8o86WvUD64aINhv5K3oRmpJXkw8uxMG6Hh6JY9X7OwGSqfUy9tDG3sHNoEi0d_d_fv9qndxRU0VClFqo3KVo3U655Hnt1PXB3Qra2Y2QGdEwgTAMCxopsoxOe6SD0gD8movDhT0LAnhqlE8gVCpLWnRoV7OJCkFAwEXitrYL1W7p7pbiE_P7XH6E_rihODm5s52XtiH9Ekaw0VgI9exadWL1uoEYjPtg2672k5szsxbKyWB2fdT0w5Y_0hcT8oXOlRetmLS8-g-6TLXXQgYAAA==)):

## Controlling when attachments re-run

Attachments, unlike [actions](use), are fully reactive: `{@attach foo(bar)}` will re-run on changes to `foo` _or_ `bar` (or any state read inside `foo`):

In the rare case that this is a problem (for example, if `foo` does expensive and unavoidable setup work) consider passing the data inside a function and reading it in a child effect:

## Creating attachments programmatically

To add attachments to an object that will be spread onto a component or element, use [`createAttachmentKey`](svelte-attachments#createAttachmentKey).

## Converting actions to attachments

If you're using a library that only provides actions, you can convert them to attachments with [`fromAction`](svelte-attachments#fromAction), allowing you to (for example) use them with components.

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/attachments').Attachment} */
	function myAttachment(element) {
		console.log(element.nodeName); // 'DIV'

		return () => {
			console.log('cleaning up');
		};
	}
</script>

<div {@attach myAttachment}>...</div>
```

Example 2 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import tippy from 'tippy.js';

	let content = $state('Hello!');

	/**
	 * @param {string} content
	 * @returns {import('svelte/attachments').Attachment}
	 */
	function tooltip(content) {
		return (element) => {
			const tooltip = tippy(element, { content });
			return tooltip.destroy;
		};
	}
</script>

<input bind:value={content} />

<button {@attach tooltip(content)}>
	Hover me
</button>
```

Example 3 (svelte):

```svelte
<!--- file: App.svelte --->
<canvas
	width={32}
	height={32}
	{@attach (canvas) => {
		const context = canvas.getContext('2d');

		$effect(() => {
			context.fillStyle = color;
			context.fillRect(0, 0, canvas.width, canvas.height);
		});
	}}
></canvas>
```

Example 4 (svelte):

```svelte
<!--- file: Button.svelte --->
<script>
	/** @type {import('svelte/elements').HTMLButtonAttributes} */
	let { children, ...props } = $props();
</script>

<!-- `props` includes attachments -->
<button {...props}>
	{@render children?.()}
</button>
```

---

## {@const ...}

**URL:** llms-txt#{@const-...}

The `{@const ...}` tag defines a local constant.

`{@const}` is only allowed as an immediate child of a block — `{#if ...}`, `{#each ...}`, `{#snippet ...}` and so on — a `<Component />` or a `<svelte:boundary>`.

**Examples:**

Example 1 (svelte):

```svelte
{#each boxes as box}
	{@const area = box.width * box.height}
	{box.width} * {box.height} = {area}
{/each}
```

---

## {@debug ...}

**URL:** llms-txt#{@debug-...}

The `{@debug ...}` tag offers an alternative to `console.log(...)`. It logs the values of specific variables whenever they change, and pauses code execution if you have devtools open.

`{@debug ...}` accepts a comma-separated list of variable names (not arbitrary expressions).

The `{@debug}` tag without any arguments will insert a `debugger` statement that gets triggered when _any_ state changes, as opposed to the specified variables.

**Examples:**

Example 1 (svelte):

```svelte
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

Example 2 (svelte):

```svelte
<!-- Compiles -->
{@debug user}
{@debug user1, user2, user3}

<!-- WON'T compile -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

---

## bind:

**URL:** llms-txt#bind:

**Contents:**

- Function bindings
- `<input bind:value>`
- `<input bind:checked>`
- `<input bind:indeterminate>`
- `<input bind:group>`
- `<input bind:files>`
- `<select bind:value>`
- `<audio>`
- `<video>`
- `<img>`

Data ordinarily flows down, from parent to child. The `bind:` directive allows data to flow the other way, from child to parent.

The general syntax is `bind:property={expression}`, where `expression` is an [_lvalue_](https://press.rebus.community/programmingfundamentals/chapter/lvalue-and-rvalue/) (i.e. a variable or an object property). When the expression is an identifier with the same name as the property, we can omit the expression — in other words these are equivalent:

<!-- prettier-ignore -->
Svelte creates an event listener that updates the bound value. If an element already has a listener for the same event, that listener will be fired before the bound value is updated.

Most bindings are _two-way_, meaning that changes to the value will affect the element and vice versa. A few bindings are _readonly_, meaning that changing their value will have no effect on the element.

You can also use `bind:property={get, set}`, where `get` and `set` are functions, allowing you to perform validation and transformation:

In the case of readonly bindings like [dimension bindings](#Dimensions), the `get` value should be `null`:

> [!NOTE]
> Function bindings are available in Svelte 5.9.0 and newer.

## `<input bind:value>`

A `bind:value` directive on an `<input>` element binds the input's `value` property:

<!-- prettier-ignore -->
In the case of a numeric input (`type="number"` or `type="range"`), the value will be coerced to a number ([demo](/playground/untitled#H4sIAAAAAAAAE6WPwYoCMQxAfyWEPeyiOOqx2w74Hds9pBql0IllmhGXYf5dKqwiyILsLXnwwsuI-5i4oPkaUX8yo7kCnKNQV7dNzoty4qSVBSr8jG-Poixa0KAt2z5mbb14TaxA4OCtKCm_rz4-f2m403WltrlrYhMFTtcLNkoeFGqZ8yhDF7j3CCHKzpwoDexGmqCL4jwuPUJHZ-dxVcfmyYGe5MAv-La5pbxYFf5Z9Zf_UJXb-sEMquFgJJhBmGyTW5yj8lnRaD_w9D1dAKSSj7zqAQAA)):

If the input is empty or invalid (in the case of `type="number"`), the value is `undefined`.

Since 5.6.0, if an `<input>` has a `defaultValue` and is part of a form, it will revert to that value instead of the empty string when the form is reset. Note that for the initial render the value of the binding takes precedence unless it is `null` or `undefined`.

> [!NOTE]
> Use reset buttons sparingly, and ensure that users won't accidentally click them while trying to submit the form.

## `<input bind:checked>`

Checkbox inputs can be bound with `bind:checked`:

Since 5.6.0, if an `<input>` has a `defaultChecked` attribute and is part of a form, it will revert to that value instead of `false` when the form is reset. Note that for the initial render the value of the binding takes precedence unless it is `null` or `undefined`.

> [!NOTE] Use `bind:group` for radio inputs instead of `bind:checked`.

## `<input bind:indeterminate>`

Checkboxes can be in an [indeterminate](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/indeterminate) state, independently of whether they are checked or unchecked:

## `<input bind:group>`

Inputs that work together can use `bind:group` ([demo](/playground/untitled#H4sIAAAAAAAAE62T32_TMBDH_5XDQkpbrct7SCMGEvCEECDxsO7BSW6L2c227EvbKOv_jp0f6jYhQKJv5_P3PvdL1wstH1Bk4hMSGdgbRzUssFaM9VJciFtF6EV23QvubNRFR_BPUVfWXvodEkdfKT3-zl8Zzag5YETuK6csF1u9ZUIGNo4VkYQNvPYsGRfJF5JKJ8s3QRJE6WoFb2Nq6K-ck13u2Sl9Vxxhlc6QUBIFnz9Brm9ifJ6esun81XoNd860FmtwslYGlLYte5AO4aHlVhJ1gIeKWq92COt1iMtJlkhFPkgh1rHZiiF6K6BUus4G5KafGznCTlIbVUMfQZUWMJh5OrL-C_qjMYSwb1DyiH7iOEuCb1ZpWTUjfHqcwC_GWDVY3ZfmME_SGttSmD9IHaYatvWHIc6xLyqad3mq6KuqcCwnWn9p8p-p71BqP2IH81zc9w2in-od7XORP7ayCpd5YCeXI_-p59mObPF9WmwGpx3nqS2Gzw8TO3zOaS5_GqUXyQUkS3h8hOSz0ZhMESHGc0c4Hm3MAn00t1wrb0l2GZRkqvt4sXwczm6Qh8vnUJzI2LV4vAkvqWgfehTZrSSPx19WiVfFfAQAAA==)):

> [!NOTE] `bind:group` only works if the inputs are in the same Svelte component.

## `<input bind:files>`

On `<input>` elements with `type="file"`, you can use `bind:files` to get the [`FileList` of selected files](https://developer.mozilla.org/en-US/docs/Web/API/FileList). When you want to update the files programmatically, you always need to use a `FileList` object. Currently `FileList` objects cannot be constructed directly, so you need to create a new [`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer) object and get `files` from there.

`FileList` objects also cannot be modified, so if you want to e.g. delete a single file from the list, you need to create a new `DataTransfer` object and add the files you want to keep.

> [!NOTE] `DataTransfer` may not be available in server-side JS runtimes. Leaving the state that is bound to `files` uninitialized prevents potential errors if components are server-side rendered.

## `<select bind:value>`

A `<select>` value binding corresponds to the `value` property on the selected `<option>`, which can be any value (not just strings, as is normally the case in the DOM).

A `<select multiple>` element behaves similarly to a checkbox group. The bound variable is an array with an entry corresponding to the `value` property of each selected `<option>`.

When the value of an `<option>` matches its text content, the attribute can be omitted.

You can give the `<select>` a default value by adding a `selected` attribute to the`<option>` (or options, in the case of `<select multiple>`) that should be initially selected. If the `<select>` is part of a form, it will revert to that selection when the form is reset. Note that for the initial render the value of the binding takes precedence if it's not `undefined`.

`<audio>` elements have their own set of bindings — five two-way ones...

- [`currentTime`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime)
- [`playbackRate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playbackRate)
- [`paused`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused)
- [`volume`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume)
- [`muted`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted)

...and six readonly ones:

- [`duration`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration)
- [`buffered`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered)
- [`seekable`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable)
- [`seeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event)
- [`ended`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended)
- [`readyState`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState)
- [`played`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/played)

`<video>` elements have all the same bindings as [`<audio>`](#audio) elements, plus readonly [`videoWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/videoWidth) and [`videoHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/videoHeight) bindings.

`<img>` elements have two readonly bindings:

- [`naturalWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalWidth)
- [`naturalHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/naturalHeight)

## `<details bind:open>`

`<details>` elements support binding to the `open` property.

## `window` and `document`

To bind to properties of `window` and `document`, see [`<svelte:window>`](svelte-window) and [`<svelte:document>`](svelte-document).

## Contenteditable bindings

Elements with the `contenteditable` attribute support the following bindings:

- [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText)
- [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

> [!NOTE] There are [subtle differences between `innerText` and `textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext).

<!-- for some reason puts the comment and html on same line -->
<!-- prettier-ignore -->
All visible elements have the following readonly bindings, measured with a `ResizeObserver`:

- [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
- [`clientHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
- [`offsetWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- [`offsetHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)
- [`contentRect`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)
- [`contentBoxSize`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize)
- [`borderBoxSize`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/borderBoxSize)
- [`devicePixelContentBoxSize`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/devicePixelContentBoxSize)

> [!NOTE] `display: inline` elements do not have a width or height (except for elements with 'intrinsic' dimensions, like `<img>` and `<canvas>`), and cannot be observed with a `ResizeObserver`. You will need to change the `display` style of these elements to something else, such as `inline-block`. Note that CSS transformations do not trigger `ResizeObserver` callbacks.

To get a reference to a DOM node, use `bind:this`. The value will be `undefined` until the component is mounted — in other words, you should read it inside an effect or an event handler, but not during component initialisation:

Components also support `bind:this`, allowing you to interact with component instances programmatically.

> [!NOTE] In case of using [the function bindings](#Function-bindings), the getter is required to ensure that the correct value is nullified on component or element destruction.

## bind:_property_ for components

You can bind to component props using the same syntax as for elements.

While Svelte props are reactive without binding, that reactivity only flows downward into the component by default. Using `bind:property` allows changes to the property from within the component to flow back up out of the component.

To mark a property as bindable, use the [`$bindable`]($bindable) rune:

Declaring a property as bindable means it _can_ be used using `bind:`, not that it _must_ be used using `bind:`.

Bindable properties can have a fallback value:

This fallback value _only_ applies when the property is _not_ bound. When the property is bound and a fallback value is present, the parent is expected to provide a value other than `undefined`, else a runtime error is thrown. This prevents hard-to-reason-about situations where it's unclear which value should apply.

**Examples:**

Example 1 (svelte):

```svelte
<input bind:value={value} />
<input bind:value />
```

Example 2 (svelte):

```svelte
<input bind:value={
	() => value,
	(v) => value = v.toLowerCase()}
/>
```

Example 3 (svelte):

```svelte
<div
	bind:clientWidth={null, redraw}
	bind:clientHeight={null, redraw}
>...</div>
```

Example 4 (svelte):

```svelte
<script>
	let message = $state('hello');
</script>

<input bind:value={message} />
<p>{message}</p>
```

---

## use:

**URL:** llms-txt#use:

**Contents:**

- Typing

> [!NOTE]
> In Svelte 5.29 and newer, consider using [attachments](@attach) instead, as they are more flexible and composable.

Actions are functions that are called when an element is mounted. They are added with the `use:` directive, and will typically use an `$effect` so that they can reset any state when the element is unmounted:

An action can be called with an argument:

The action is only called once (but not during server-side rendering) — it will _not_ run again if the argument changes.

> [!LEGACY]
> Prior to the `$effect` rune, actions could return an object with `update` and `destroy` methods, where `update` would be called with the latest value of the argument if it changed. Using effects is preferred.

The `Action` interface receives three optional type arguments — a node type (which can be `Element`, if the action applies to everything), a parameter, and any custom event handlers created by the action:

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action} */
	function myaction(node) {
		// the node has been mounted in the DOM

		$effect(() => {
			// setup goes here

			return () => {
				// teardown goes here
			};
		});
	}
</script>

<div use:myaction>...</div>
```

Example 2 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action} */
	function myaction(node, +++data+++) {
		// ...
	}
</script>

<div use:myaction={+++data+++}>...</div>
```

Example 3 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	/**
	 * @type {import('svelte/action').Action<
	 * 	HTMLDivElement,
	 * 	undefined,
	 * 	{
	 * 		onswiperight: (e: CustomEvent) => void;
	 * 		onswipeleft: (e: CustomEvent) => void;
	 * 		// ...
	 * 	}
	 * >}
	 */
	function gestures(node) {
		$effect(() => {
			// ...
			node.dispatchEvent(new CustomEvent('swipeleft'));

			// ...
			node.dispatchEvent(new CustomEvent('swiperight'));
		});
	}
</script>

<div
	use:gestures
	onswipeleft={next}
	onswiperight={prev}
>...</div>
```

---

## transition:

**URL:** llms-txt#transition:

**Contents:**

- Local vs global
- Built-in transitions
- Transition parameters
- Custom transition functions
- Transition events

A _transition_ is triggered by an element entering or leaving the DOM as a result of a state change.

When a block (such as an `{#if ...}` block) is transitioning out, all elements inside it, including those that do not have their own transitions, are kept in the DOM until every transition in the block has been completed.

The `transition:` directive indicates a _bidirectional_ transition, which means it can be smoothly reversed while the transition is in progress.

Transitions are local by default. Local transitions only play when the block they belong to is created or destroyed, _not_ when parent blocks are created or destroyed.

## Built-in transitions

A selection of built-in transitions can be imported from the [`svelte/transition`](svelte-transition) module.

## Transition parameters

Transitions can have parameters.

(The double `{{curlies}}` aren't a special syntax; this is an object literal inside an expression tag.)

## Custom transition functions

Transitions can use custom functions. If the returned object has a `css` function, Svelte will generate keyframes for a [web animation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

The `t` argument passed to `css` is a value between `0` and `1` after the `easing` function has been applied. _In_ transitions run from `0` to `1`, _out_ transitions run from `1` to `0` — in other words, `1` is the element's natural state, as though no transition had been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly _before_ the transition begins, with different `t` and `u` arguments.

A custom transition function can also return a `tick` function, which is called _during_ the transition with the same `t` and `u` arguments.

> [!NOTE] If it's possible to use `css` instead of `tick`, do so — web animations can run off the main thread, preventing jank on slower devices.

If a transition returns a function instead of a transition object, the function will be called in the next microtask. This allows multiple transitions to coordinate, making [crossfade effects](/tutorial/deferred-transitions) possible.

Transition functions also receive a third argument, `options`, which contains information about the transition.

Available values in the `options` object are:

- `direction` - one of `in`, `out`, or `both` depending on the type of transition

An element with transitions will dispatch the following events in addition to any standard DOM events:

- `introstart`
- `introend`
- `outrostart`
- `outroend`

**Examples:**

Example 1 (svelte):

```svelte
<script>
	+++import { fade } from 'svelte/transition';+++

	let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>toggle</button>

{#if visible}
	<div +++transition:fade+++>fades in and out</div>
{/if}
```

Example 2 (svelte):

```svelte
{#if x}
	{#if y}
		<p transition:fade>fades in and out only when y changes</p>

		<p transition:fade|global>fades in and out when x or y change</p>
	{/if}
{/if}
```

Example 3 (svelte):

```svelte
{#if visible}
	<div transition:fade={{ duration: 2000 }}>fades in and out over two seconds</div>
{/if}
```

Example 4 (js):

```js
/// copy: false
// @noErrors
transition = (node: HTMLElement, params: any, options: { direction: 'in' | 'out' | 'both' }) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

---

## in: and out:

**URL:** llms-txt#in:-and-out:

The `in:` and `out:` directives are identical to [`transition:`](transition), except that the resulting transitions are not bidirectional — an `in` transition will continue to 'play' alongside the `out` transition, rather than reversing, if the block is outroed while the transition is in progress. If an out transition is aborted, transitions will restart from scratch.

**Examples:**

Example 1 (svelte):

```svelte
<script>
  import { fade, fly } from 'svelte/transition';

  let visible = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={visible}>
  visible
</label>

{#if visible}
	<div in:fly={{ y: 200 }} out:fade>flies in, fades out</div>
{/if}
```

---

## animate:

**URL:** llms-txt#animate:

**Contents:**

- Animation Parameters
- Custom animation functions

An animation is triggered when the contents of a [keyed each block](each#Keyed-each-blocks) are re-ordered. Animations do not run when an element is added or removed, only when the index of an existing data item within the each block changes. Animate directives must be on an element that is an _immediate_ child of a keyed each block.

Animations can be used with Svelte's [built-in animation functions](svelte-animate) or [custom animation functions](#Custom-animation-functions).

## Animation Parameters

As with actions and transitions, animations can have parameters.

(The double `{{curlies}}` aren't a special syntax; this is an object literal inside an expression tag.)

## Custom animation functions

Animations can use custom functions that provide the `node`, an `animation` object and any `parameters` as arguments. The `animation` parameter is an object containing `from` and `to` properties each containing a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect#Properties) describing the geometry of the element in its `start` and `end` positions. The `from` property is the DOMRect of the element in its starting position, and the `to` property is the DOMRect of the element in its final position after the list has been reordered and the DOM updated.

If the returned object has a `css` method, Svelte will create a [web animation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) that plays on the element.

The `t` argument passed to `css` is a value that goes from `0` and `1` after the `easing` function has been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly _before_ the animation begins, with different `t` and `u` arguments.

A custom animation function can also return a `tick` function, which is called _during_ the animation with the same `t` and `u` arguments.

> [!NOTE] If it's possible to use `css` instead of `tick`, do so — web animations can run off the main thread, preventing jank on slower devices.

**Examples:**

Example 1 (svelte):

```svelte
<!-- When `list` is reordered the animation will run -->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

Example 2 (svelte):

```svelte
{#each list as item, index (item)}
	<li animate:flip={{ delay: 500 }}>{item}</li>
{/each}
```

Example 3 (js):

```js
/// copy: false
// @noErrors
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

Example 4 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import { cubicOut } from 'svelte/easing';

	/**
	 * @param {HTMLElement} node
	 * @param {{ from: DOMRect; to: DOMRect }} states
	 * @param {any} params
	 */
	function whizz(node, { from, to }, params) {
		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) => `transform: translate(${u * dx}px, ${u * dy}px) rotate(${t * 360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

---

## style:

**URL:** llms-txt#style:

The `style:` directive provides a shorthand for setting multiple styles on an element.

The value can contain arbitrary expressions:

The shorthand form is allowed:

Multiple styles can be set on a single element:

To mark a style as important, use the `|important` modifier:

When `style:` directives are combined with `style` attributes, the directives will take precedence,
even over `!important` properties:

**Examples:**

Example 1 (svelte):

```svelte
<!-- These are equivalent -->
<div style:color="red">...</div>
<div style="color: red;">...</div>
```

Example 2 (svelte):

```svelte
<div style:color={myColor}>...</div>
```

Example 3 (svelte):

```svelte
<div style:color>...</div>
```

Example 4 (svelte):

```svelte
<div style:color style:width="12rem" style:background-color={darkMode ? 'black' : 'white'}>...</div>
```

---

## class

**URL:** llms-txt#class

**Contents:**

- Attributes
  - Objects and arrays
- The `class:` directive

There are two ways to set classes on elements: the `class` attribute, and the `class:` directive.

Primitive values are treated like any other attribute:

> [!NOTE]
> For historical reasons, falsy values (like `false` and `NaN`) are stringified (`class="false"`), though `class={undefined}` (or `null`) cause the attribute to be omitted altogether. In a future version of Svelte, all falsy values will cause `class` to be omitted.

### Objects and arrays

Since Svelte 5.16, `class` can be an object or array, and is converted to a string using [clsx](https://github.com/lukeed/clsx).

If the value is an object, the truthy keys are added:

If the value is an array, the truthy values are combined:

Note that whether we're using the array or object form, we can set multiple classes simultaneously with a single condition, which is particularly useful if you're using things like Tailwind.

Arrays can contain arrays and objects, and clsx will flatten them. This is useful for combining local classes with props, for example:

The user of this component has the same flexibility to use a mixture of objects, arrays and strings:

Since Svelte 5.19, Svelte also exposes the `ClassValue` type, which is the type of value that the `class` attribute on elements accept. This is useful if you want to use a type-safe class name in component props:

## The `class:` directive

Prior to Svelte 5.16, the `class:` directive was the most convenient way to set classes on elements conditionally.

As with other directives, we can use a shorthand when the name of the class coincides with the value:

> [!NOTE] Unless you're using an older version of Svelte, consider avoiding `class:`, since the attribute is more powerful and composable.

**Examples:**

Example 1 (svelte):

```svelte
<div class={large ? 'large' : 'small'}>...</div>
```

Example 2 (svelte):

```svelte
<script>
	let { cool } = $props();
</script>

<!-- results in `class="cool"` if `cool` is truthy,
     `class="lame"` otherwise -->
<div class={{ cool, lame: !cool }}>...</div>
```

Example 3 (svelte):

```svelte
<!-- if `faded` and `large` are both truthy, results in
     `class="saturate-0 opacity-50 scale-200"` -->
<div class={[faded && 'saturate-0 opacity-50', large && 'scale-200']}>...</div>
```

Example 4 (svelte):

```svelte
<!--- file: Button.svelte --->
<script>
	let props = $props();
</script>

<button {...props} class={['cool-button', props.class]}>
	{@render props.children?.()}
</button>
```

---

## svelte/attachments

**URL:** llms-txt#svelte/attachments

**Contents:**

- createAttachmentKey
- fromAction
- Attachment

## createAttachmentKey

<blockquote class="since note">

Creates an object key that will be recognised as an attachment when the object is spread onto an element,
as a programmatic alternative to using `{@attach ...}`. This can be useful for library authors, though
is generally not needed when building an app.

<div class="ts-block">

Converts an [action](/docs/svelte/use) into an [attachment](/docs/svelte/@attach) keeping the same behavior.
It's useful if you want to start using attachments on components but you have actions provided by a library.

Note that the second argument, if provided, must be a function that _returns_ the argument to the
action function, not the argument itself.

<div class="ts-block">

<div class="ts-block">

An [attachment](/docs/svelte/@attach) is a function that runs when an element is mounted
to the DOM, and optionally returns a function that is called when the element is later removed.

It can be attached to an element with an `{@attach ...}` tag, or by spreading an object containing
a property created with [`createAttachmentKey`](/docs/svelte/svelte-attachments#createAttachmentKey).

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

**Examples:**

Example 1 (js):

```js
// @noErrors
import { createAttachmentKey, fromAction } from "svelte/attachments";
```

Example 2 (svelte):

```svelte
<script>
	import { createAttachmentKey } from 'svelte/attachments';

	const props = {
		class: 'cool',
		onclick: () => alert('clicked'),
		[createAttachmentKey()]: (node) => {
			node.textContent = 'attached!';
		}
	};
</script>

<button {...props}>click me</button>
```

Example 3 (dts):

```dts
function createAttachmentKey(): symbol;
```

Example 4 (svelte):

```svelte
<!-- with an action -->
<div use:foo={bar}>...</div>

<!-- with an attachment -->
<div {@attach fromAction(foo, () => bar)}>...</div>
```

---
