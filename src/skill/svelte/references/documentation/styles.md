# Svelte_Docs - Styles

**Pages:** 2

---

## Scoped styles

**URL:** llms-txt#scoped-styles

**Contents:**

- Specificity
- Scoped keyframes

Svelte components can include a `<style>` element containing CSS that belongs to the component. This CSS is _scoped_ by default, meaning that styles will not apply to any elements on the page outside the component in question.

This works by adding a class to affected elements, which is based on a hash of the component styles (e.g. `svelte-123xyz`).

Each scoped selector receives a [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) increase of 0-1-0, as a result of the scoping class (e.g. `.svelte-123xyz`) being added to the selector. This means that (for example) a `p` selector defined in a component will take precedence over a `p` selector defined in a global stylesheet, even if the global stylesheet is loaded later.

In some cases, the scoping class must be added to a selector multiple times, but after the first occurrence it is added with `:where(.svelte-xyz123)` in order to not increase specificity further.

If a component defines `@keyframes`, the name is scoped to the component using the same hashing approach. Any `animation` rules in the component will be similarly adjusted:

**Examples:**

Example 1 (svelte):

```svelte
<style>
	p {
		/* this will only affect <p> elements in this component */
		color: burlywood;
	}
</style>
```

Example 2 (svelte):

```svelte
<style>
	.bouncy {
		animation: bounce 10s;
	}

	/* these keyframes are only accessible inside this component */
	@keyframes bounce {
		/* ... */
	}
</style>
```

---

## Global styles

**URL:** llms-txt#global-styles

**Contents:**

- :global(...)
- :global

To apply styles to a single selector globally, use the `:global(...)` modifier:

If you want to make @keyframes that are accessible globally, you need to prepend your keyframe names with `-global-`.

The `-global-` part will be removed when compiled, and the keyframe will then be referenced using just `my-animation-name` elsewhere in your code.

To apply styles to a group of selectors globally, create a `:global {...}` block:

> [!NOTE] The second example above could also be written as an equivalent `.a :global .b .c .d` selector, where everything after the `:global` is unscoped, though the nested form is preferred.

**Examples:**

Example 1 (svelte):

```svelte
<style>
	:global(body) {
		/* applies to <body> */
		margin: 0;
	}

	div :global(strong) {
		/* applies to all <strong> elements, in any component,
		   that are inside <div> elements belonging
		   to this component */
		color: goldenrod;
	}

	p:global(.big.red) {
		/* applies to all <p> elements belonging to this component
		   with `class="big red"`, even if it is applied
		   programmatically (for example by a library) */
	}
</style>
```

Example 2 (svelte):

```svelte
<style>
	@keyframes -global-my-animation-name {
		/* code goes here */
	}
</style>
```

Example 3 (svelte):

```svelte
<style>
	:global {
		/* applies to every <div> in your application */
		div { ... }

		/* applies to every <p> in your application */
		p { ... }
	}

	.a :global {
		/* applies to every `.b .c .d` element, in any component,
		   that is inside an `.a` element in this component */
		.b .c .d {...}
	}
</style>
```

---
