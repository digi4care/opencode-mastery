# Svelte_Docs - Api Reference

**Pages:** 25

---

## <SYSTEM>This is the developer documentation for Svelte.</SYSTEM>

**URL:** llms-txt#<system>this-is-the-developer-documentation-for-svelte.</system>

---

## .svelte.js and .svelte.ts files

**URL:** llms-txt#.svelte.js-and-.svelte.ts-files

Besides `.svelte` files, Svelte also operates on `.svelte.js` and `.svelte.ts` files.

These behave like any other `.js` or `.ts` module, except that you can use runes. This is useful for creating reusable reactive logic, or sharing reactive state across your app (though note that you [cannot export reassigned state]($state#Passing-state-across-modules)).

> [!LEGACY]
> This is a concept that didn't exist prior to Svelte 5

---

## `<svelte:boundary>`

**URL:** llms-txt#`<svelte:boundary>`

**Contents:**

- Properties
  - `pending`
  - `failed`
  - `onerror`

> [!NOTE]
> This feature was added in 5.3.0

Boundaries allow you to 'wall off' parts of your app, so that you can:

- provide UI that should be shown when [`await`](await-expressions) expressions are first resolving
- handle errors that occur during rendering or while running effects, and provide UI that should be rendered when an error happens

If a boundary handles an error (with a `failed` snippet or `onerror` handler, or both) its existing content will be removed.

> [!NOTE] Errors occurring outside the rendering process (for example, in event handlers or after a `setTimeout` or async work) are _not_ caught by error boundaries.

For the boundary to do anything, one or more of the following must be provided.

This snippet will be shown when the boundary is first created, and will remain visible until all the [`await`](await-expressions) expressions inside the boundary have resolved ([demo](/playground/untitled#H4sIAAAAAAAAE21QQW6DQAz8ytY9BKQVpFdKkPqDHnorPWzAaSwt3tWugUaIv1eE0KpKD5as8YxnNBOw6RAKKOOAVrA4up5bEy6VGknOyiO3xJ8qMnmPAhpOZDFC8T6BXPyiXADQ258X77P1FWg4moj_4Y1jQZZ49W0CealqruXUcyPkWLVozQXbZDC2R606spYiNo7bqA7qab_fp2paFLUElD6wYhzVa3AdRUySgNHZAVN1qDZaLRHljTp0vSTJ9XJjrSbpX5f0eZXN6zLXXOa_QfmurIVU-moyoyH5ib87o7XuYZfOZe6vnGWmx1uZW7lJOq9upa-sMwuUZdkmmfIbfQ1xZwwaBL8ECgk9zh8axJAdiVsoTsZGnL8Bg4tX_OMBAAA=)):

The `pending` snippet will _not_ be shown for subsequent async updates — for these, you can use [`$effect.pending()`]($effect#$effect.pending).

> [!NOTE] In the [playground](/playground), your app is rendered inside a boundary with an empty pending snippet, so that you can use `await` without having to create one.

If a `failed` snippet is provided, it will be rendered when an error is thrown inside the boundary, with the `error` and a `reset` function that recreates the contents ([demo](/playground/hello-world#H4sIAAAAAAAAE3VRy26DMBD8lS2tFCIh6JkAUlWp39Cq9EBg06CAbdlLArL87zWGKk8ORnhmd3ZnrD1WtOjFXqKO2BDGW96xqpBD5gXerm5QefG39mgQY9EIWHxueRMinLosti0UPsJLzggZKTeilLWgLGc51a3gkuCjKQ7DO7cXZotgJ3kLqzC6hmex1SZnSXTWYHcrj8LJjWTk0PHoZ8VqIdCOKayPykcpuQxAokJaG1dGybYj4gw4K5u6PKTasSbjXKgnIDlA8VvUdo-pzonraBY2bsH7HAl78mKSHZpgIcuHjq9jXSpZSLixRlveKYQUXhQVhL6GPobXAAb7BbNeyvNUs4qfRg3OnELLj5hqH9eQZqCnoBwR9lYcQxuVXeBzc8kMF8yXY4yNJ5oGiUzP_aaf_waTRGJib5_Ad3P_vbCuaYxzeNpbU0eUMPAOKh7Yw1YErgtoXyuYlPLzc10_xo_5A91zkQL_AgAA)):

> [!NOTE]
> As with [snippets passed to components](snippet#Passing-snippets-to-components), the `failed` snippet can be passed explicitly as a property...
>
> ...or implicitly by declaring it directly inside the boundary, as in the example above.

If an `onerror` function is provided, it will be called with the same two `error` and `reset` arguments. This is useful for tracking the error with an error reporting service...

...or using `error` and `reset` outside the boundary itself:

If an error occurs inside the `onerror` function (or if you rethrow the error), it will be handled by a parent boundary if such exists.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:boundary onerror={handler}>...</svelte:boundary>
```

Example 2 (svelte):

```svelte
<svelte:boundary>
	<p>{await delayed('hello!')}</p>

	{#snippet pending()}
		<p>loading...</p>
	{/snippet}
</svelte:boundary>
```

Example 3 (svelte):

```svelte
<svelte:boundary>
	<FlakyComponent />

	{#snippet failed(error, reset)}
		<button onclick={reset}>oops! try again</button>
	{/snippet}
</svelte:boundary>
```

Example 4 (svelte):

```svelte
> <svelte:boundary {failed}>...</svelte:boundary>
>
```

---

## `<svelte:window>`

**URL:** llms-txt#`<svelte:window>`

The `<svelte:window>` element allows you to add event listeners to the `window` object without worrying about removing them when the component is destroyed, or checking for the existence of `window` when server-side rendering.

This element may only appear at the top level of your component — it cannot be inside a block or element.

You can also bind to the following properties:

- `innerWidth`
- `innerHeight`
- `outerWidth`
- `outerHeight`
- `scrollX`
- `scrollY`
- `online` — an alias for `window.navigator.onLine`
- `devicePixelRatio`

All except `scrollX` and `scrollY` are readonly.

> [!NOTE] Note that the page will not be scrolled to the initial value to avoid accessibility issues. Only subsequent changes to the bound variable of `scrollX` and `scrollY` will cause scrolling. If you have a legitimate reason to scroll when the component is rendered, call `scrollTo()` in an `$effect`.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:window onevent={handler} />
```

Example 2 (svelte):

```svelte
<svelte:window bind:prop={value} />
```

Example 3 (svelte):

```svelte
<script>
	function handleKeydown(event) {
		alert(`pressed the ${event.key} key`);
	}
</script>

<svelte:window onkeydown={handleKeydown} />
```

Example 4 (svelte):

```svelte
<svelte:window bind:scrollY={y} />
```

---

## `<svelte:document>`

**URL:** llms-txt#`<svelte:document>`

Similarly to `<svelte:window>`, this element allows you to add listeners to events on `document`, such as `visibilitychange`, which don't fire on `window`. It also lets you use [actions](use) on `document`.

As with `<svelte:window>`, this element may only appear the top level of your component and must never be inside a block or element.

You can also bind to the following properties:

- `activeElement`
- `fullscreenElement`
- `pointerLockElement`
- `visibilityState`

**Examples:**

Example 1 (svelte):

```svelte
<svelte:document onevent={handler} />
```

Example 2 (svelte):

```svelte
<svelte:document bind:prop={value} />
```

Example 3 (svelte):

```svelte
<svelte:document onvisibilitychange={handleVisibilityChange} use:someAction />
```

---

## `<svelte:body>`

**URL:** llms-txt#`<svelte:body>`

Similarly to `<svelte:window>`, this element allows you to add listeners to events on `document.body`, such as `mouseenter` and `mouseleave`, which don't fire on `window`. It also lets you use [actions](use) on the `<body>` element.

As with `<svelte:window>` and `<svelte:document>`, this element may only appear at the top level of your component and must never be inside a block or element.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:body onevent={handler} />
```

Example 2 (svelte):

```svelte
<svelte:body onmouseenter={handleMouseenter} onmouseleave={handleMouseleave} use:someAction />
```

---

## `<svelte:head>`

**URL:** llms-txt#`<svelte:head>`

This element makes it possible to insert elements into `document.head`. During server-side rendering, `head` content is exposed separately to the main `body` content.

As with `<svelte:window>`, `<svelte:document>` and `<svelte:body>`, this element may only appear at the top level of your component and must never be inside a block or element.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:head>...</svelte:head>
```

Example 2 (svelte):

```svelte
<svelte:head>
	<title>Hello world!</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>
```

---

## `<svelte:element>`

**URL:** llms-txt#`<svelte:element>`

The `<svelte:element>` element lets you render an element that is unknown at author time, for example because it comes from a CMS. Any properties and event listeners present will be applied to the element.

The only supported binding is `bind:this`, since Svelte's built-in bindings do not work with generic elements.

If `this` has a nullish value, the element and its children will not be rendered.

If `this` is the name of a [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) (e.g., `br`) and `<svelte:element>` has child elements, a runtime error will be thrown in development mode:

Svelte tries its best to infer the correct namespace from the element's surroundings, but it's not always possible. You can make it explicit with an `xmlns` attribute:

`this` needs to be a valid DOM element tag, things like `#text` or `svelte:head` will not work.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:element this={expression} />
```

Example 2 (svelte):

```svelte
<script>
	let tag = $state('hr');
</script>

<svelte:element this={tag}>
	This text cannot appear inside an hr element
</svelte:element>
```

Example 3 (svelte):

```svelte
<svelte:element this={tag} xmlns="http://www.w3.org/2000/svg" />
```

---

## `<svelte:options>`

**URL:** llms-txt#`<svelte:options>`

The `<svelte:options>` element provides a place to specify per-component compiler options, which are detailed in the [compiler section](svelte-compiler#compile). The possible options are:

- `runes={true}` — forces a component into _runes mode_ (see the [Legacy APIs](legacy-overview) section)
- `runes={false}` — forces a component into _legacy mode_
- `namespace="..."` — the namespace where this component will be used, can be "html" (the default), "svg" or "mathml"
- `customElement={...}` — the [options](custom-elements#Component-options) to use when compiling this component as a custom element. If a string is passed, it is used as the `tag` option
- `css="injected"` — the component will inject its styles inline: During server-side rendering, it's injected as a `<style>` tag in the `head`, during client side rendering, it's loaded via JavaScript

> [!LEGACY] Deprecated options
> Svelte 4 also included the following options. They are deprecated in Svelte 5 and non-functional in runes mode.
>
> - `immutable={true}` — you never use mutable data, so the compiler can do simple referential equality checks to determine if values have changed
> - `immutable={false}` — the default. Svelte will be more conservative about whether or not mutable objects have changed
> - `accessors={true}` — adds getters and setters for the component's props
> - `accessors={false}` — the default

**Examples:**

Example 1 (svelte):

```svelte
<svelte:options option={value} />
```

Example 2 (svelte):

```svelte
<svelte:options customElement="my-custom-element" />
```

---

## svelte

**URL:** llms-txt#svelte

**Contents:**

- SvelteComponent
- SvelteComponentTyped
- afterUpdate
- beforeUpdate
- createContext
- createEventDispatcher
- createRawSnippet
- flushSync
- fork
- getAbortSignal

This was the base class for Svelte components in Svelte 4. Svelte 5+ components
are completely different under the hood. For typing, use `Component` instead.
To instantiate components, use `mount` instead.
See [migration guide](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The custom element version of the component. Only present if compiled with the `customElement` compiler option

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> This constructor only exists when using the `asClassComponent` compatibility helper, which
  is a stop-gap solution. Migrate towards using `mount` instead. See
  [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more info.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> This method only exists when using one of the legacy compatibility helpers, which
  is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
  for more info.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> This method only exists when using one of the legacy compatibility helpers, which
  is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
  for more info.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> This method only exists when using one of the legacy compatibility helpers, which
  is a stop-gap solution. See [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
  for more info.

## SvelteComponentTyped

<blockquote class="tag deprecated note">

Use `Component` instead. See [migration guide](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes) for more information.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`$effect`](/docs/svelte/$effect) instead

Schedules a callback to run immediately after the component has been updated.

The first time the callback runs will be after the initial `onMount`.

In runes mode use `$effect` instead.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`$effect.pre`](/docs/svelte/$effect#$effect.pre) instead

Schedules a callback to run immediately before the component is updated after any state change.

The first time the callback runs will be before the initial `onMount`.

In runes mode use `$effect.pre` instead.

<div class="ts-block">

<blockquote class="since note">

Available since 5.40.0

Returns a `[get, set]` pair of functions for working with context in a type-safe way.

`get` will throw an error if no parent component called `set`.

<div class="ts-block">

## createEventDispatcher

<blockquote class="tag deprecated note">

Use callback props and/or the `$host()` rune instead — see [migration guide](/docs/svelte/v5-migration-guide#Event-changes-Component-events)

Creates an event dispatcher that can be used to dispatch [component events](/docs/svelte/legacy-on#Component-events).
Event dispatchers are functions that can take two arguments: `name` and `detail`.

Component events created with `createEventDispatcher` create a
[CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
property and can contain any type of data.

The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:

<div class="ts-block">

Create a snippet programmatically

<div class="ts-block">

Synchronously flush any pending updates.
Returns void if no callback is provided, otherwise returns the result of calling the callback.

<div class="ts-block">

<blockquote class="since note">

Creates a 'fork', in which state changes are evaluated but not applied to the DOM.
This is useful for speculatively loading data (for example) when you suspect that
the user is about to take some action.

Frameworks like SvelteKit can use this to preload data when the user touches or
hovers over a link, making any subsequent navigation feel instantaneous.

The `fn` parameter is a synchronous function that modifies some state. The
state changes will be reverted after the fork is initialised, then reapplied
if and when the fork is eventually committed.

When it becomes clear that a fork will _not_ be committed (e.g. because the
user navigated elsewhere), it must be discarded to avoid leaking memory.

<div class="ts-block">

Returns an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that aborts when the current [derived](/docs/svelte/$derived) or [effect](/docs/svelte/$effect) re-runs or is destroyed.

Must be called while a derived or effect is running.

<div class="ts-block">

Retrieves the whole context map that belongs to the closest parent component.
Must be called during component initialisation. Useful, for example, if you
programmatically create a component and want to pass the existing context to it.

<div class="ts-block">

Retrieves the context that belongs to the closest parent component with the specified `key`.
Must be called during component initialisation.

[`createContext`](/docs/svelte/svelte#createContext) is a type-safe alternative.

<div class="ts-block">

Checks whether a given `key` has been set in the context of a parent component.
Must be called during component initialisation.

<div class="ts-block">

<div class="ts-block">

Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component

<div class="ts-block">

Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
Transitions will play during the initial render unless the `intro` option is set to `false`.

<div class="ts-block">

Schedules a callback to run immediately before the component is unmounted.

Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
only one that runs inside a server-side component.

<div class="ts-block">

`onMount`, like [`$effect`](/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
Unlike `$effect`, the provided function only runs once.

It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
it will be called when the component is unmounted.

`onMount` functions do not run during [server-side rendering](/docs/svelte/svelte-server#render).

<div class="ts-block">

Associates an arbitrary `context` object with the current component and the specified `key`
and returns that object. The context is then available to children of the component
(including slotted content) with `getContext`.

Like lifecycle functions, this must be called during component initialisation.

[`createContext`](/docs/svelte/svelte#createContext) is a type-safe alternative.

<div class="ts-block">

<blockquote class="since note">

Returns a promise that resolves once any state changes, and asynchronous work resulting from them,
have resolved and the DOM has been updated

<div class="ts-block">

Returns a promise that resolves once any pending state changes have been applied.

<div class="ts-block">

Unmounts a component that was previously mounted using `mount` or `hydrate`.

Since 5.13.0, if `options.outro` is `true`, [transitions](/docs/svelte/transition) will play before the component is removed from the DOM.

Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).

<div class="ts-block">

When used inside a [`$derived`](/docs/svelte/$derived) or [`$effect`](/docs/svelte/$effect),
any state read inside `fn` will not be treated as a dependency.

<div class="ts-block">

Can be used to create strongly typed Svelte components.

You have component library on npm called `component-library`, from which
you export a component called `MyComponent`. For Svelte+TypeScript users,
you want to provide typings. Therefore you create a `index.d.ts`:

Typing this makes it possible for IDEs like VS Code with the Svelte extension
to provide intellisense and to use the component like this in a Svelte file
with TypeScript:

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `internal` An internal object used by Svelte. Do not use or modify.
- `props` The props passed to the component.

<div class="ts-block-property">

<div class="ts-block-property-details">

The custom element version of the component. Only present if compiled with the `customElement` compiler option

## ComponentConstructorOptions

<blockquote class="tag deprecated note">

In Svelte 4, components are classes. In Svelte 5, they are functions.
Use `mount` instead to instantiate components.
See [migration guide](/docs/svelte/v5-migration-guide#Components-are-no-longer-classes)
for more info.

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
</div></div>

<blockquote class="tag deprecated note">

The new `Component` type does not have a dedicated Events type. Use `ComponentProps` instead.

<div class="ts-block">

## ComponentInternals

Internal implementation details that vary between environments

<div class="ts-block">

Convenience type to get the props the given component expects.

Example: Ensure a variable contains the props expected by `MyComponent`:

> [!NOTE] In Svelte 4, you would do `ComponentProps<MyComponent>` because `MyComponent` was a class.

Example: A generic function that accepts some component and infers the type of its props:

<div class="ts-block">

<blockquote class="tag deprecated note">

This type is obsolete when working with the new `Component` type.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<blockquote class="since note">

Represents work that is happening off-screen, such as data being preloaded
in anticipation of the user navigating

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Commit the fork. The promise will resolve once the state change has been applied

<div class="ts-block-property">

<div class="ts-block-property-details">

Defines the options accepted by the `mount()` function.

<div class="ts-block">

The type of a `#snippet` block. You can use it to (for example) express that your component expects a snippet of a certain type:

You can only call a snippet through the `{@render ...}` tag.

See the [snippet documentation](/docs/svelte/snippet) for more info.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  SvelteComponent,
  SvelteComponentTyped,
  afterUpdate,
  beforeUpdate,
  createContext,
  createEventDispatcher,
  createRawSnippet,
  flushSync,
  fork,
  getAbortSignal,
  getAllContexts,
  getContext,
  hasContext,
  hydratable,
  hydrate,
  mount,
  onDestroy,
  onMount,
  setContext,
  settled,
  tick,
  unmount,
  untrack,
} from "svelte";
```

Example 2 (dts):

```dts
class SvelteComponent<
	Props extends Record<string, any> = Record<string, any>,
	Events extends Record<string, any> = any,
	Slots extends Record<string, any> = any
> {/*…*/}
```

Example 3 (dts):

```dts
static element?: typeof HTMLElement;
```

Example 4 (dts):

```dts
[prop: string]: any;
```

---

## svelte/action

**URL:** llms-txt#svelte/action

**Contents:**

- Action
- ActionReturn

This module provides types for [actions](use), which have been superseded by [attachments](@attach).

Actions are functions that are called when an element is created.
You can use this interface to type such actions.
The following example defines an action that only works on `<div>` elements
and optionally accepts a parameter which it has a default value for:

`Action<HTMLDivElement>` and `Action<HTMLDivElement, undefined>` both signal that the action accepts no parameters.

You can return an object with methods `update` and `destroy` from the function and type which additional attributes and events it has.
See interface `ActionReturn` for more details.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

Actions can return an object containing the two properties defined in this interface. Both are optional.

- update: An action can have a parameter. This method will be called whenever that parameter changes,
  immediately after Svelte has applied updates to the markup. `ActionReturn` and `ActionReturn<undefined>` both
  mean that the action accepts no parameters.
- destroy: Method that is called after the element is unmounted

Additionally, you can specify which additional attributes and events the action enables on the applied element.
This applies to TypeScript typings only and has no effect at runtime.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

**Examples:**

Example 1 (ts):

```ts
export const myAction: Action<HTMLDivElement, { someProperty: boolean } | undefined> = (
  node,
  param = { someProperty: true }
) => {
  // ...
};
```

Example 2 (dts):

```dts
interface Action<
	Element = HTMLElement,
	Parameter = undefined,
	Attributes extends Record<string, any> = Record<
		never,
		any
	>
> {/*…*/}
```

Example 3 (dts):

```dts
<Node extends Element>(
	...args: undefined extends Parameter
		? [node: Node, parameter?: Parameter]
		: [node: Node, parameter: Parameter]
): void | ActionReturn<Parameter, Attributes>;
```

Example 4 (ts):

```ts
interface Attributes {
	newprop?: string;
	'on:event': (e: CustomEvent<boolean>) => void;
}

export function myAction(node: HTMLElement, parameter: Parameter): ActionReturn<Parameter, Attributes> {
	// ...
	return {
		update: (updatedParameter) => {...},
		destroy: () => {...}
	};
}
```

---

## svelte/animate

**URL:** llms-txt#svelte/animate

**Contents:**

- flip
- AnimationConfig
- FlipParams

The flip function calculates the start and end position of an element and animates between them, translating the x and y values.
`flip` stands for [First, Last, Invert, Play](https://aerotwist.com/blog/flip-your-animations/).

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

**Examples:**

Example 1 (js):

```js
// @noErrors
import { flip } from "svelte/animate";
```

Example 2 (dts):

```dts
function flip(
	node: Element,
	{
		from,
		to
	}: {
		from: DOMRect;
		to: DOMRect;
	},
	params?: FlipParams
): AnimationConfig;
```

Example 3 (dts):

```dts
interface AnimationConfig {/*…*/}
```

Example 4 (dts):

```dts
delay?: number;
```

---

## svelte/compiler

**URL:** llms-txt#svelte/compiler

**Contents:**

- VERSION
- compile
- compileModule
- migrate
- parse
- preprocess
- print
- walk
- AST
- CompileError

The current version, as set in package.json.

<div class="ts-block">

`compile` converts your `.svelte` source code into a JavaScript module that exports a component

<div class="ts-block">

`compileModule` takes your JavaScript source code containing runes, and turns it into a JavaScript module.

<div class="ts-block">

Does a best-effort migration of Svelte code towards using runes, event attributes and render tags.
May throw an error if the code is too complex to migrate automatically.

<div class="ts-block">

The parse function parses a component, returning only its abstract syntax tree.

The `modern` option (`false` by default in Svelte 5) makes the parser return a modern AST instead of the legacy AST.
`modern` will become `true` by default in Svelte 6, and the option will be removed in Svelte 7.

<div class="ts-block">

<div class="ts-block">

The preprocess function provides convenient hooks for arbitrarily transforming component source code.
For example, it can be used to convert a `<style lang="sass">` block into vanilla CSS.

<div class="ts-block">

`print` converts a Svelte AST node back into Svelte source code.
It is primarily intended for tools that parse and transform components using the compiler’s modern AST representation.

`print(ast)` requires an AST node produced by parse with modern: true, or any sub-node within that modern AST.
The result contains the generated source and a corresponding source map.
The output is valid Svelte, but formatting details such as whitespace or quoting may differ from the original.

<div class="ts-block">

<blockquote class="tag deprecated note">

Replace this with `import { walk } from 'estree-walker'`

<div class="ts-block">

<div class="ts-block">

ts
_ (ceClass: new () => HTMLElement) => new () => HTMLElement
_

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Sets the name of the resulting JavaScript class (though the compiler will rename it if it would otherwise conflict with other variables in scope).
If unspecified, will be inferred from `filename`

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, tells the compiler to generate a custom element constructor instead of a regular Svelte component.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`
- <span class="tag deprecated">deprecated</span> This will have no effect in runes mode

If `true`, getters and setters will be created for the component's props. If `false`, they will only be created for readonly exported values (i.e. those declared with `const`, `class` and `function`). If compiling with `customElement: true` this option defaults to `true`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `'html'`

The namespace of the element; e.g., `"html"`, `"svg"`, `"mathml"`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`
- <span class="tag deprecated">deprecated</span> This will have no effect in runes mode

If `true`, tells the compiler that you promise not to mutate any objects.
This allows it to be less conservative about checking whether values have changed.

<div class="ts-block-property">

<div class="ts-block-property-details">

- `'injected'`: styles will be included in the `head` when using `render(...)`, and injected into the document (if not already present) when the component mounts. For components compiled as custom elements, styles are injected to the shadow root.
- `'external'`: the CSS will only be returned in the `css` field of the compilation result. Most Svelte bundler plugins will set this to `'external'` and use the CSS that is statically generated for better performance, as it will result in smaller JavaScript bundles and the output can be served as cacheable `.css` files.
  This is always `'injected'` when compiling with `customElement` mode.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `undefined`

A function that takes a `{ hash, css, name, filename }` argument and returns the string that is used as a classname for scoped CSS.
It defaults to returning `svelte-${hash(filename ?? css)}`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, your HTML comments will be preserved in the output. By default, they are stripped out.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, whitespace inside and between elements is kept as you typed it, rather than removed or collapsed to a single space where possible.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `'html'`
- <span class="tag since">available since</span> v5.33

Which strategy to use when cloning DOM fragments:

- `html` populates a `<template>` with `innerHTML` and clones it. This is faster, but cannot be used if your app's [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) includes [`require-trusted-types-for 'script'`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for)
- `tree` creates the fragment one element at a time and _then_ clones it. This is slower, but works everywhere

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `undefined`

Set to `true` to force the compiler into runes mode, even if there are no indications of runes usage.
Set to `false` to force the compiler into ignoring runes, even if there are indications of runes usage.
Set to `undefined` (the default) to infer runes mode from the component code.
Is always `true` for JS/TS modules compiled with Svelte.
Will be `true` by default in Svelte 6.
Note that setting this to `true` in your `svelte.config.js` will force runes mode for your entire project, including components in `node_modules`,
which is likely not what you want. If you're using Vite, consider using [dynamicCompileOptions](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#dynamiccompileoptions) instead.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `true`

If `true`, exposes the Svelte major version in the browser by adding it to a `Set` stored in the global `window.__svelte.v`.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> Use these only as a temporary solution before migrating your code

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `5`

Applies a transformation so that the default export of Svelte files can still be instantiated the same way as in Svelte 4 —
as a class when compiling for the browser (as though using `createClassComponent(MyComponent, {...})` from `svelte/legacy`)
or as an object with a `.render(...)` method when compiling for the server

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `null`

An initial sourcemap that will be merged into the final output sourcemap.
This is usually the preprocessor sourcemap.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `null`

Used for your JavaScript sourcemap.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `null`

Used for your CSS sourcemap.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, compiles components with hot reloading support.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, returns the modern version of the AST.
Will become `true` by default in Svelte 6, and the option will be removed in Svelte 7.

The return value of `compile` from `svelte/compiler`

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

The compiled JavaScript

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

</div>
</div>
<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property">

<div class="ts-block-property-details">

An array of warning objects that were generated during compilation. Each warning has several properties:

- `code` is a string identifying the category of warning
- `message` describes the issue in human-readable terms
- `start` and `end`, if the warning relates to a specific location, are objects with `line`, `column` and `character` properties

<div class="ts-block-property">

<div class="ts-block-property-details">

Metadata about the compiled component

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

Whether the file was compiled in runes mode, either because of an explicit option or inferred from usage.
For `compileModule`, this is always `true`

<div class="ts-block-property">

<div class="ts-block-property-details">

## MarkupPreprocessor

A markup preprocessor that takes a string of code and returns a processed version.

<div class="ts-block">

## ModuleCompileOptions

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `false`

If `true`, causes extra code to be added that will perform runtime checks and provide debugging information during development.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `'client'`

If `"client"`, Svelte emits code designed to run in the browser.
If `"server"`, Svelte emits code suitable for server-side rendering.
If `false`, nothing is generated. Useful for tooling that is only interested in warnings.

<div class="ts-block-property">

<div class="ts-block-property-details">

Used for debugging hints and sourcemaps. Your bundler plugin will set it automatically.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag">default</span> `process.cwd() on node-like environments, undefined elsewhere`

Used for ensuring filenames don't leak filesystem information. Your bundler plugin will set it automatically.

<div class="ts-block-property">

<div class="ts-block-property-details">

A function that gets a `Warning` as an argument and returns a boolean.
Use this to filter out warnings. Return `true` to keep the warning, `false` to discard it.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v5.36

<div class="ts-block-property-children"><div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag since">available since</span> v5.36

Allow `await` keyword in deriveds, template expressions, and the top level of components

A script/style preprocessor that takes a string of code and returns a processed version.

<div class="ts-block">

A preprocessor group is a set of preprocessors that are applied to a Svelte file.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Name of the preprocessor. Will be a required option in the next major version

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

The result of a preprocessor run. If the preprocessor does not return a result, it is assumed that the code is unchanged.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property">

<div class="ts-block-property-details">

A source map mapping back to the original code

<div class="ts-block-property">

<div class="ts-block-property-details">

A list of additional files to watch for changes

<div class="ts-block-property">

<div class="ts-block-property-details">

Only for script/style preprocessors: The updated attributes to set on the tag. If undefined, attributes stay unchanged.

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  VERSION,
  compile,
  compileModule,
  migrate,
  parse,
  preprocess,
  print,
  walk,
} from "svelte/compiler";
```

Example 2 (dts):

```dts
const VERSION: string;
```

Example 3 (dts):

```dts
function compile(
	source: string,
	options: CompileOptions
): CompileResult;
```

Example 4 (dts):

```dts
function compileModule(
	source: string,
	options: ModuleCompileOptions
): CompileResult;
```

---

## svelte/easing

**URL:** llms-txt#svelte/easing

**Contents:**

- backIn
- backInOut
- backOut
- bounceIn
- bounceInOut
- bounceOut
- circIn
- circInOut
- circOut
- cubicIn

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  backIn,
  backInOut,
  backOut,
  bounceIn,
  bounceInOut,
  bounceOut,
  circIn,
  circInOut,
  circOut,
  cubicIn,
  cubicInOut,
  cubicOut,
  elasticIn,
  elasticInOut,
  elasticOut,
  expoIn,
  expoInOut,
  expoOut,
  linear,
  quadIn,
  quadInOut,
  quadOut,
  quartIn,
  quartInOut,
  quartOut,
  quintIn,
  quintInOut,
  quintOut,
  sineIn,
  sineInOut,
  sineOut,
} from "svelte/easing";
```

Example 2 (dts):

```dts
function backIn(t: number): number;
```

Example 3 (dts):

```dts
function backInOut(t: number): number;
```

Example 4 (dts):

```dts
function backOut(t: number): number;
```

---

## svelte/events

**URL:** llms-txt#svelte/events

**Contents:**

- on

Attaches an event handler to the window and returns a function that removes the handler. Using this
rather than `addEventListener` will preserve the correct order relative to handlers added declaratively
(with attributes like `onclick`), which use event delegation for performance reasons

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { on } from "svelte/events";
```

Example 2 (dts):

```dts
function on<Type extends keyof WindowEventMap>(
	window: Window,
	type: Type,
	handler: (
		this: Window,
		event: WindowEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

Example 3 (dts):

```dts
function on<Type extends keyof DocumentEventMap>(
	document: Document,
	type: Type,
	handler: (
		this: Document,
		event: DocumentEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

Example 4 (dts):

```dts
function on<
	Element extends HTMLElement,
	Type extends keyof HTMLElementEventMap
>(
	element: Element,
	type: Type,
	handler: (
		this: Element,
		event: HTMLElementEventMap[Type]
	) => any,
	options?: AddEventListenerOptions | undefined
): () => void;
```

---

## svelte/legacy

**URL:** llms-txt#svelte/legacy

**Contents:**

- asClassComponent
- createBubbler
- createClassComponent
- handlers
- nonpassive
- once
- passive
- preventDefault
- run
- self

This module provides various functions for use during the migration, since some features can't be replaced one to one with new features. All imports are marked as deprecated and should be migrated away from over time.

<blockquote class="tag deprecated note">

Use this only as a temporary solution to migrate your imperative component code to Svelte 5.

Takes the component function and returns a Svelte 4 compatible component constructor.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use this only as a temporary solution to migrate your automatically delegated events in Svelte 5.

Function to create a `bubble` function that mimic the behavior of `on:click` without handler available in svelte 4.

<div class="ts-block">

## createClassComponent

<blockquote class="tag deprecated note">

Use this only as a temporary solution to migrate your imperative component code to Svelte 5.

Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.

<div class="ts-block">

Function to mimic the multiple listeners available in svelte 4

<div class="ts-block">

Substitute for the `nonpassive` event modifier, implemented as an action

<div class="ts-block">

Substitute for the `once` event modifier

<div class="ts-block">

Substitute for the `passive` event modifier, implemented as an action

<div class="ts-block">

Substitute for the `preventDefault` event modifier

<div class="ts-block">

<blockquote class="tag deprecated note">

Use this only as a temporary solution to migrate your component code to Svelte 5.

Runs the given function once immediately on the server, and works like `$effect.pre` on the client.

<div class="ts-block">

Substitute for the `self` event modifier

<div class="ts-block">

## stopImmediatePropagation

Substitute for the `stopImmediatePropagation` event modifier

<div class="ts-block">

Substitute for the `stopPropagation` event modifier

<div class="ts-block">

Substitute for the `trusted` event modifier

<div class="ts-block">

## LegacyComponentType

Support using the component as both a class and function during the transition period

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  asClassComponent,
  createBubbler,
  createClassComponent,
  handlers,
  nonpassive,
  once,
  passive,
  preventDefault,
  run,
  self,
  stopImmediatePropagation,
  stopPropagation,
  trusted,
} from "svelte/legacy";
```

Example 2 (dts):

```dts
function asClassComponent<
	Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Events extends Record<string, any>,
	Slots extends Record<string, any>
>(
	component:
		| SvelteComponent<Props, Events, Slots>
		| Component<Props>
): ComponentType<
	SvelteComponent<Props, Events, Slots> & Exports
>;
```

Example 3 (dts):

```dts
function createBubbler(): (
	type: string
) => (event: Event) => boolean;
```

Example 4 (dts):

```dts
function createClassComponent<
	Props extends Record<string, any>,
	Exports extends Record<string, any>,
	Events extends Record<string, any>,
	Slots extends Record<string, any>
>(
	options: ComponentConstructorOptions<Props> & {
		component:
			| ComponentType<SvelteComponent<Props, Events, Slots>>
			| Component<Props>;
	}
): SvelteComponent<Props, Events, Slots> & Exports;
```

---

## svelte/motion

**URL:** llms-txt#svelte/motion

**Contents:**

- Spring
- Tween
- prefersReducedMotion
- spring
- tweened
- Spring
- Tweened

<blockquote class="since note">

Available since 5.8.0

A wrapper for a value that behaves in a spring-like fashion. Changes to `spring.target` will cause `spring.current` to
move towards it over time, taking account of the `spring.stiffness` and `spring.damping` parameters.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

Create a spring whose value is bound to the return value of `fn`. This must be called
inside an effect root (for example, during component initialisation).

<div class="ts-block-property">

<div class="ts-block-property-details">

Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.

If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.

If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
the specified number of milliseconds. This is useful for things like 'fling' gestures.

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

The end value of the spring.
This property only exists on the `Spring` class, not the legacy `spring` store.

<div class="ts-block-property">

<div class="ts-block-property-details">

The current value of the spring.
This property only exists on the `Spring` class, not the legacy `spring` store.

<blockquote class="since note">

Available since 5.8.0

A wrapper for a value that tweens smoothly to its target value. Changes to `tween.target` will cause `tween.current` to
move towards it over time, taking account of the `delay`, `duration` and `easing` options.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

Create a tween whose value is bound to the return value of `fn`. This must be called
inside an effect root (for example, during component initialisation).

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

Sets `tween.target` to `value` and returns a `Promise` that resolves if and when `tween.current` catches up to it.

If `options` are provided, they will override the tween's defaults.

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## prefersReducedMotion

<blockquote class="since note">

Available since 5.7.0

A [media query](/docs/svelte/svelte-reactivity#MediaQuery) that matches if the user [prefers reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`Spring`](/docs/svelte/svelte-motion#Spring) instead

The spring function in Svelte creates a store whose value is animated, with a motion that simulates the behavior of a spring. This means when the value changes, instead of transitioning at a steady rate, it "bounces" like a spring would, depending on the physics parameters provided. This adds a level of realism to the transitions and can enhance the user experience.

<div class="ts-block">

<blockquote class="tag deprecated note">

Use [`Tween`](/docs/svelte/svelte-motion#Tween) instead

A tweened store in Svelte is a special type of store that provides smooth transitions between state values over time.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> Only exists on the legacy `spring` store, not the `Spring` class

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- <span class="tag deprecated">deprecated</span> Only exists on the legacy `spring` store, not the `Spring` class

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
</div></div>

**Examples:**

Example 1 (js):

```js
// @noErrors
import { Spring, Tween, prefersReducedMotion, spring, tweened } from "svelte/motion";
```

Example 2 (svelte):

```svelte
<script>
	import { Spring } from 'svelte/motion';

	const spring = new Spring(0);
</script>

<input type="range" bind:value={spring.target} />
<input type="range" bind:value={spring.current} disabled />
```

Example 3 (dts):

```dts
class Spring<T> {/*…*/}
```

Example 4 (dts):

```dts
constructor(value: T, options?: SpringOpts);
```

---

## svelte/reactivity/window

**URL:** llms-txt#svelte/reactivity/window

**Contents:**

- devicePixelRatio
- innerHeight
- innerWidth
- online
- outerHeight
- outerWidth
- screenLeft
- screenTop
- scrollX
- scrollY

This module exports reactive versions of various `window` values, each of which has a reactive `current` property that you can reference in reactive contexts (templates, [deriveds]($derived) and [effects]($effect)) without using [`<svelte:window>`](svelte-window) bindings or manually creating your own event listeners.

<blockquote class="since note">

Available since 5.11.0

`devicePixelRatio.current` is a reactive view of `window.devicePixelRatio`. On the server it is `undefined`.
Note that behaviour differs between browsers — on Chrome it will respond to the current zoom level,
on Firefox and Safari it won't.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`innerHeight.current` is a reactive view of `window.innerHeight`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`innerWidth.current` is a reactive view of `window.innerWidth`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`online.current` is a reactive view of `navigator.onLine`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`outerHeight.current` is a reactive view of `window.outerHeight`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`outerWidth.current` is a reactive view of `window.outerWidth`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`screenLeft.current` is a reactive view of `window.screenLeft`. It is updated inside a `requestAnimationFrame` callback. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`screenTop.current` is a reactive view of `window.screenTop`. It is updated inside a `requestAnimationFrame` callback. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`scrollX.current` is a reactive view of `window.scrollX`. On the server it is `undefined`.

<div class="ts-block">

<blockquote class="since note">

Available since 5.11.0

`scrollY.current` is a reactive view of `window.scrollY`. On the server it is `undefined`.

<div class="ts-block">

**Examples:**

Example 1 (svelte):

```svelte
<script>
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
</script>

<p>{innerWidth.current}x{innerHeight.current}</p>
```

Example 2 (js):

```js
// @noErrors
import {
  devicePixelRatio,
  innerHeight,
  innerWidth,
  online,
  outerHeight,
  outerWidth,
  screenLeft,
  screenTop,
  scrollX,
  scrollY,
} from "svelte/reactivity/window";
```

Example 3 (dts):

```dts
const devicePixelRatio: {
	get current(): number | undefined;
};
```

Example 4 (dts):

```dts
const innerHeight: ReactiveValue<number | undefined>;
```

---

## svelte/reactivity

**URL:** llms-txt#svelte/reactivity

**Contents:**

- MediaQuery
- SvelteDate
- SvelteMap
- SvelteSet
- SvelteURL
- SvelteURLSearchParams
- createSubscriber

Svelte provides reactive versions of various built-ins like [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) and [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) that can be used just like their native counterparts, as well as a handful of additional utilities for handling reactivity.

<blockquote class="since note">

Available since 5.7.0

Creates a media query and provides a `current` property that reflects whether or not it matches.

Use it carefully — during server-side rendering, there is no way to know what the correct value should be, potentially causing content to change upon hydration.
If you can use the media query in CSS to achieve the same effect, do that.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `query` A media query string
- `fallback` Fallback value for the server

A reactive version of the built-in [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.
Reading the date (whether with methods like `date.getTime()` or `date.toString()`, or via things like [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat))
in an [effect](/docs/svelte/$effect) or [derived](/docs/svelte/$derived)
will cause it to be re-evaluated when the value of the date changes.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

A reactive version of the built-in [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.
Reading contents of the map (by iterating, or by reading `map.size` or calling `map.get(...)` or `map.has(...)` as in the [tic-tac-toe example](/playground/0b0ff4aa49c9443f9b47fe5203c78293) below) in an [effect](/docs/svelte/$effect) or [derived](/docs/svelte/$derived)
will cause it to be re-evaluated as necessary when the map is updated.

Note that values in a reactive map are _not_ made [deeply reactive](/docs/svelte/$state#Deep-state).

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

A reactive version of the built-in [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object.
Reading contents of the set (by iterating, or by reading `set.size` or calling `set.has(...)` as in the [example](/playground/53438b51194b4882bcc18cddf9f96f15) below) in an [effect](/docs/svelte/$effect) or [derived](/docs/svelte/$derived)
will cause it to be re-evaluated as necessary when the set is updated.

Note that values in a reactive set are _not_ made [deeply reactive](/docs/svelte/$state#Deep-state).

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

A reactive version of the built-in [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.
Reading properties of the URL (such as `url.href` or `url.pathname`) in an [effect](/docs/svelte/$effect) or [derived](/docs/svelte/$derived)
will cause it to be re-evaluated as necessary when the URL changes.

The `searchParams` property is an instance of [SvelteURLSearchParams](/docs/svelte/svelte-reactivity#SvelteURLSearchParams).

[Example](/playground/5a694758901b448c83dc40dc31c71f2a):

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

## SvelteURLSearchParams

A reactive version of the built-in [`URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) object.
Reading its contents (by iterating, or by calling `params.get(...)` or `params.getAll(...)` as in the [example](/playground/b3926c86c5384bab9f2cf993bc08c1c8) below) in an [effect](/docs/svelte/$effect) or [derived](/docs/svelte/$derived)
will cause it to be re-evaluated as necessary when the params are updated.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

<blockquote class="since note">

Available since 5.7.0

Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.

If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.

If `start` returns a cleanup function, it will be called when the effect is destroyed.

If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
are active, and the returned teardown function will only be called when all effects are destroyed.

It's best understood with an example. Here's an implementation of [`MediaQuery`](/docs/svelte/svelte-reactivity#MediaQuery):

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import {
  MediaQuery,
  SvelteDate,
  SvelteMap,
  SvelteSet,
  SvelteURL,
  SvelteURLSearchParams,
  createSubscriber,
} from "svelte/reactivity";
```

Example 2 (svelte):

```svelte
<script>
	import { MediaQuery } from 'svelte/reactivity';

	const large = new MediaQuery('min-width: 800px');
</script>

<h1>{large.current ? 'large screen' : 'small screen'}</h1>
```

Example 3 (dts):

```dts
class MediaQuery extends ReactiveValue<boolean> {/*…*/}
```

Example 4 (dts):

```dts
constructor(query: string, fallback?: boolean | undefined);
```

---

## svelte/server

**URL:** llms-txt#svelte/server

**Contents:**

- render

Only available on the server and when compiling with the `server` option.
Takes a component and returns an object with `body` and `head` properties on it, which you can use to populate the HTML when server-rendering your app.

<div class="ts-block">

**Examples:**

Example 1 (js):

```js
// @noErrors
import { render } from "svelte/server";
```

Example 2 (dts):

```dts
function render<
	Comp extends SvelteComponent<any> | Component<any>,
	Props extends ComponentProps<Comp> = ComponentProps<Comp>
>(
	...args: {} extends Props
		? [
				component: Comp extends SvelteComponent<any>
					? ComponentType<Comp>
					: Comp,
				options?: {
					props?: Omit<Props, '$$slots' | '$$events'>;
					context?: Map<any, any>;
					idPrefix?: string;
					csp?: Csp;
				}
			]
		: [
				component: Comp extends SvelteComponent<any>
					? ComponentType<Comp>
					: Comp,
				options: {
					props: Omit<Props, '$$slots' | '$$events'>;
					context?: Map<any, any>;
					idPrefix?: string;
					csp?: Csp;
				}
			]
): RenderOutput;
```

---

## svelte/store

**URL:** llms-txt#svelte/store

**Contents:**

- derived
- fromStore
- get
- readable
- readonly
- toStore
- writable
- Readable
- StartStopNotifier
- Subscriber

Derived value store by synchronizing one or more readable stores and
applying an aggregation function over its input values.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

Get the current value from a store by subscribing and immediately unsubscribing.

<div class="ts-block">

Creates a `Readable` store that allows reading by subscription.

<div class="ts-block">

Takes a store and returns a new one derived from the old one that is readable.

<div class="ts-block">

<div class="ts-block">

<div class="ts-block">

Create a `Writable` store that allows both updating and reading by subscription.

<div class="ts-block">

Readable interface for subscribing.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

- `run` subscription callback
- `invalidate` cleanup callback

Subscribe on value changes.

Start and stop notification callbacks.
This function is called when the first subscriber subscribes.

<div class="ts-block">

Callback to inform of a value updates.

<div class="ts-block">

Unsubscribes from value updates.

<div class="ts-block">

Callback to update a value.

<div class="ts-block">

Writable interface for both updating and subscribing.

<div class="ts-block">

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

Set value and inform subscribers.

<div class="ts-block-property">

<div class="ts-block-property-details">

<div class="ts-block-property-bullets">

Update value using callback and inform subscribers.

**Examples:**

Example 1 (js):

```js
// @noErrors
import { derived, fromStore, get, readable, readonly, toStore, writable } from "svelte/store";
```

Example 2 (dts):

```dts
function derived<S extends Stores, T>(
	stores: S,
	fn: (
		values: StoresValues<S>,
		set: (value: T) => void,
		update: (fn: Updater<T>) => void
	) => Unsubscriber | void,
	initial_value?: T | undefined
): Readable<T>;
```

Example 3 (dts):

```dts
function derived<S extends Stores, T>(
	stores: S,
	fn: (values: StoresValues<S>) => T,
	initial_value?: T | undefined
): Readable<T>;
```

Example 4 (dts):

```dts
function fromStore<V>(store: Writable<V>): {
	current: V;
};
```

---

## svelte/transition

**URL:** llms-txt#svelte/transition

**Contents:**

- blur
- crossfade
- draw
- fade
- fly
- scale
- slide
- BlurParams
- CrossfadeParams
- DrawParams

Animates a `blur` filter alongside an element's opacity.

<div class="ts-block">

The `crossfade` function creates a pair of [transitions](/docs/svelte/transition) called `send` and `receive`. When an element is 'sent', it looks for a corresponding element being 'received', and generates a transition that transforms the element to its counterpart's position and fades it out. When an element is 'received', the reverse happens. If there is no counterpart, the `fallback` transition is used.

<div class="ts-block">

Animates the stroke of an SVG element, like a snake in a tube. `in` transitions begin with the path invisible and draw the path to the screen over time. `out` transitions start in a visible state and gradually erase the path. `draw` only works with elements that have a `getTotalLength` method, like `<path>` and `<polyline>`.

<div class="ts-block">

Animates the opacity of an element from 0 to the current opacity for `in` transitions and from the current opacity to 0 for `out` transitions.

<div class="ts-block">

Animates the x and y positions and the opacity of an element. `in` transitions animate from the provided values, passed as parameters to the element's default values. `out` transitions animate from the element's default values to the provided values.

<div class="ts-block">

Animates the opacity and scale of an element. `in` transitions animate from the provided values, passed as parameters, to an element's current (default) values. `out` transitions animate from an element's default values to the provided values.

<div class="ts-block">

Slides an element in and out.

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
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div>

<div class="ts-block-property">

<div class="ts-block-property-details"></div>
</div></div>

**Examples:**

Example 1 (js):

```js
// @noErrors
import { blur, crossfade, draw, fade, fly, scale, slide } from "svelte/transition";
```

Example 2 (dts):

```dts
function blur(
	node: Element,
	{
		delay,
		duration,
		easing,
		amount,
		opacity
	}?: BlurParams | undefined
): TransitionConfig;
```

Example 3 (dts):

```dts
function crossfade({
	fallback,
	...defaults
}: CrossfadeParams & {
	fallback?: (
		node: Element,
		params: CrossfadeParams,
		intro: boolean
	) => TransitionConfig;
}): [
	(
		node: any,
		params: CrossfadeParams & {
			key: any;
		}
	) => () => TransitionConfig,
	(
		node: any,
		params: CrossfadeParams & {
			key: any;
		}
	) => () => TransitionConfig
];
```

Example 4 (dts):

```dts
function draw(
	node: SVGElement & {
		getTotalLength(): number;
	},
	{
		delay,
		speed,
		duration,
		easing
	}?: DrawParams | undefined
): TransitionConfig;
```

---

## `<svelte:fragment>`

**URL:** llms-txt#`<svelte:fragment>`

The `<svelte:fragment>` element allows you to place content in a [named slot](legacy-slots) without wrapping it in a container DOM element. This keeps the flow layout of your document intact.

> [!NOTE]
> In Svelte 5+, this concept is obsolete, as snippets don't create a wrapping element

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: Widget.svelte --->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer" />
</div>
```

Example 2 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import Widget from './Widget.svelte';
</script>

<Widget>
	<h1 slot="header">Hello</h1>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```

---

## `<svelte:component>`

**URL:** llms-txt#`<svelte:component>`

In runes mode, `<MyComponent>` will re-render if the value of `MyComponent` changes. See the [Svelte 5 migration guide](/docs/svelte/v5-migration-guide#svelte:component-is-no-longer-necessary) for an example.

In legacy mode, it won't — we must use `<svelte:component>`, which destroys and recreates the component instance when the value of its `this` expression changes:

If `this` is falsy, no component is rendered.

**Examples:**

Example 1 (svelte):

```svelte
<svelte:component this={MyComponent} />
```

---

## `<svelte:self>`

**URL:** llms-txt#`<svelte:self>`

The `<svelte:self>` element allows a component to include itself, recursively.

It cannot appear at the top level of your markup; it must be inside an if or each block or passed to a component's slot to prevent an infinite loop.

> [!NOTE]
> This concept is obsolete, as components can import themselves:

**Examples:**

Example 1 (svelte):

```svelte
<script>
	export let count;
</script>

{#if count > 0}
	<p>counting down... {count}</p>
	<svelte:self count={count - 1} />
{:else}
	<p>lift-off!</p>
{/if}
```

Example 2 (svelte):

```svelte
> <!--- file: App.svelte --->
> <script>
> 	import Self from './App.svelte'
> 	export let count;
> </script>
>
> {#if count > 0}
> 	<p>counting down... {count}</p>
> 	<Self count={count - 1} />
> {:else}
> 	<p>lift-off!</p>
> {/if}
>
```

---
