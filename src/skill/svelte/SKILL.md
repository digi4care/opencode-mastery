---
name: svelte
description: Complete Svelte and SvelteKit knowledge base combining official documentation and GitHub repositories (core + kit). Use when building Svelte/SvelteKit apps, understanding compiler/runtime internals, or debugging framework issues.
---

# Svelte & SvelteKit Comprehensive Skill v2.0

> Complete knowledge base combining official Svelte/SvelteKit documentation with deep code analysis. Covers component development, reactivity (runes), routing, SSR, and framework internals.

## 📋 Quick Summary

| Topic | Description |
|-------|-------------|
| **Runes** | `$state()`, `$derived()`, `$effect()`, `$props()` (Svelte 5) |
| **Components** | Props, slots, snippets, lifecycle |
| **State** | Context API, stores, `$state` objects |
| **Boundaries** | Error/async handling with `<svelte:boundary>` |
| **Special Elements** | `<svelte:window>`, `<svelte:element>`, `<svelte:boundary>` |
| **Custom Elements** | Compile to web components |
| **SvelteKit** | File-based routing, load functions, form actions |

**536 undocumented APIs** - See `references/conflicts.md` for details.

## 📑 Table of Contents

1. [When to Use This Skill](#💡-when-to-use-this-skill)
2. [Quick Reference](#🚀-quick-reference)
3. [Reference Documentation](#📚-reference-documentation)
4. [Working with This Skill](#🧭-working-with-this-skill)
5. [Key Concepts](#🔑-key-concepts)
6. [Sources Summary](#📦-sources-summary)
7. [Related Skills](#🔗-related-skills)

---

## 💡 When to Use This Skill

Use this skill when you need to:

**Component Development:**

- Create Svelte 5 components using runes (`$state`, `$derived`, `$effect`)
- Build reactive UIs with minimal boilerplate
- Handle component lifecycle and state management
- Create reusable snippets and context APIs

**SvelteKit Applications:**

- Set up routing and page components
- Implement server-side rendering (SSR) and static site generation (SSG)
- Create API endpoints and handle form actions
- Manage navigation, preloading, and data loading

**Advanced Features:**

- Build custom elements (web components) from Svelte components
- Use special elements (`<svelte:window>`, `<svelte:head>`, `<svelte:boundary>`)
- Handle error boundaries and async boundaries
- Debug reactivity issues or framework behavior

**Framework Internals:**

- Understand how the Svelte compiler works
- Debug undocumented APIs found in source code
- Resolve conflicts between documentation and implementation
- Work with internal utilities and helper functions

## 🚀 Quick Reference

### Basic Component with Runes (Svelte 5)

```svelte
<script>
	// Reactive state using $state rune
	let count = $state(0);

	// Derived values using $derived rune
	let doubled = $derived(count * 2);

	// Effects using $effect rune
	$effect(() => {
		console.log(`Count is now ${count}`);
	});
</script>

<button onclick={() => count += 1}>
	Count: {count} (doubled: {doubled})
</button>
```

**Use when:** Creating reactive components with Svelte 5's new runes API.

---

### Context API for Parent-Child Communication

```svelte
<!-- Parent.svelte -->
<script>
	import { setContext } from 'svelte';

	let counter = $state({ count: 0 });
	setContext('counter', counter);
</script>

<button onclick={() => counter.count += 1}>
	increment
</button>

<Child />
```

```svelte
<!-- Child.svelte -->
<script>
	import { getContext } from 'svelte';

	const counter = getContext('counter');
</script>

<p>Count: {counter.count}</p>
```

**Use when:** Passing reactive state down to nested components without prop drilling.

---

### Type-Safe Context with createContext

```javascript
import { createContext } from 'svelte';

const [getTheme, setTheme] = createContext<'light' | 'dark'>();

// In parent component
setTheme('dark');

// In child component
const theme = getTheme(); // Throws if not set by parent
```

**Use when:** You need type-safe context with guaranteed parent initialization.

---

### Error Boundaries with `<svelte:boundary>`

```svelte
<svelte:boundary>
	<FlakyComponent />

	{#snippet failed(error, reset)}
		<div class="error">
			<p>Something went wrong: {error.message}</p>
			<button onclick={reset}>Try again</button>
		</div>
	{/snippet}
</svelte:boundary>
```

**Use when:** You need to gracefully handle errors in component trees and provide retry functionality.

---

### Async Boundaries with Pending State

```svelte
<svelte:boundary>
	<p>{await fetchData()}</p>

	{#snippet pending()}
		<p>Loading...</p>
	{/snippet}

	{#snippet failed(error, reset)}
		<button onclick={reset}>Retry</button>
	{/snippet}
</svelte:boundary>
```

**Use when:** Displaying loading states for async operations with error handling.

---

### Special Window Bindings

```svelte
<script>
	let y = $state(0);
	let innerWidth = $state(0);

	function handleKeydown(event) {
		console.log(`Key pressed: ${event.key}`);
	}
</script>

<svelte:window
	onkeydown={handleKeydown}
	bind:scrollY={y}
	bind:innerWidth
/>

<p>Scroll position: {y}px</p>
<p>Window width: {innerWidth}px</p>
```

**Use when:** You need to listen to window events or bind to window properties.

---

### Dynamic Elements with `<svelte:element>`

```svelte
<script>
	let tag = $state('p');
	let content = $state('Hello');
</script>

<select bind:value={tag}>
	<option value="p">Paragraph</option>
	<option value="h1">Heading</option>
	<option value="code">Code</option>
</select>

<svelte:element this={tag}>
	{content}
</svelte:element>
```

**Use when:** The element type is determined at runtime (e.g., from a CMS).

---

### Custom Elements (Web Components)

```svelte
<svelte:options customElement="my-widget" />

<script>
	let { name = 'world', count = 0 } = $props();
</script>

<h1>Hello {name}!</h1>
<button onclick={() => count++}>
	Clicked {count} times
</button>
```

```javascript
// Usage in vanilla HTML/JS
import MyWidget from "./MyWidget.svelte";
customElements.define("my-widget", MyWidget.element);
```

```html
<!-- Use in HTML -->
<my-widget name="Claude" count="5"></my-widget>
```

**Use when:** You need to package Svelte components for use in non-Svelte applications.

---

### Advanced Custom Element Configuration

```svelte
<svelte:options
	customElement={{
		tag: 'my-counter',
		shadow: 'open',
		props: {
			count: { reflect: true, type: 'Number' },
			disabled: { reflect: true, type: 'Boolean' },
			label: { attribute: 'data-label' }
		},
		extend: (customElementConstructor) => {
			// Enhance the custom element class
			return class extends customElementConstructor {
				connectedCallback() {
					super.connectedCallback();
					console.log('Custom element mounted');
				}
			};
		}
	}}
/>

<script>
	let { count = 0, disabled = false, label = 'Count' } = $props();
</script>
```

**Use when:** You need fine-grained control over custom element behavior and HTML attributes.

---

### SvelteKit Form Actions

```javascript
// +page.server.js
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");

    // Validation
    if (!email) {
      return { success: false, message: "Email required" };
    }

    // Process...
    return { success: true };
  },
};
```

```svelte
<!-- +page.svelte -->
<script>
	let { form } = $props();
</script>

<form method="POST">
	<input name="email" type="email" />
	<button>Submit</button>
</form>

{#if form?.success}
	<p>Success!</p>
{/if}
```

**Use when:** Handling form submissions with progressive enhancement in SvelteKit.

---

## 📚 Reference Documentation

This skill includes comprehensive documentation organized by source:

### Documentation Sources (200 pages)

Official Svelte documentation from svelte.dev/docs:

- **API Reference** (`documentation/api_reference.md`): Core Svelte API including special elements (`<svelte:boundary>`, `<svelte:window>`, `<svelte:element>`, etc.), component APIs, and lifecycle functions
- **Context** (`documentation/context.md`): Using `setContext`/`getContext` for component communication, type-safe context with `createContext`, and replacing global state
- **Custom Elements** (`documentation/custom_elements.md`): Compiling Svelte components to web components, lifecycle, configuration options, and limitations

### GitHub: sveltejs/svelte (Deep Code Analysis)

Internal implementation details and 150 analyzed issues:

- Runtime internals and compiler implementation
- Undocumented utility functions and internal APIs
- Known issues and workarounds from GitHub discussions
- Advanced patterns found in source code

### GitHub: sveltejs/kit (Deep Code Analysis)

SvelteKit framework internals and 150 analyzed issues:

- Routing system implementation
- Server-side rendering mechanics
- Build process and adapters
- Internal utilities for navigation, data loading, and error handling

### ⚠️ Conflict Information

**536 conflicts detected** - APIs exist in code but not in documentation:

See `references/conflicts.md` for the full list. Most conflicts are:

- Internal/private APIs (prefixed with `_`)
- Build-time utilities not meant for end users
- Framework internals for adapter authors
- Undocumented helper functions

**When to consult conflicts:**

- You encounter an undocumented function in error messages
- You're debugging framework behavior
- You're writing a SvelteKit adapter
- You need access to low-level APIs

---

## 🧭 Working with This Skill

### For Beginners

Start with the **API Reference** (`documentation/api_reference.md`) to learn:

1. Basic component syntax and special elements
2. The `<svelte:window>` and `<svelte:head>` elements for HTML integration
3. Error boundaries with `<svelte:boundary>`
4. Simple context usage for state sharing

**Common beginner patterns:**

- Use `$state()` for reactive variables
- Use `$derived()` for computed values
- Use `<svelte:window>` for global event listeners
- Use `setContext`/`getContext` to avoid prop drilling

### For Intermediate Users

Explore the **Context** and **Custom Elements** documentation:

1. Type-safe context with `createContext()`
2. Advanced custom element configuration
3. Form handling patterns in SvelteKit
4. Error handling strategies with boundaries

**Common intermediate patterns:**

- Build reusable context providers
- Create web components for framework interop
- Use boundaries to isolate errors
- Configure custom elements with reflection

### For Advanced Users

Dive into the **GitHub code analysis** to understand:

1. How the compiler transforms components
2. Internal routing and navigation mechanics
3. SSR hydration process
4. Undocumented APIs for edge cases

**When to use conflicts.md:**

- You see errors mentioning internal functions
- You need to understand framework behavior
- You're extending SvelteKit (adapters, plugins)
- You're debugging production issues

**Navigation strategy:**

1. Start with official docs for standard use cases
2. Check conflicts when encountering undocumented APIs
3. Review GitHub issues for known bugs and workarounds
4. Examine code examples in source for advanced patterns

---

## 🔑 Key Concepts

### Runes (Svelte 5)

New reactive primitives that replace the old `$:` syntax:

- **`$state()`**: Create reactive variables
- **`$derived()`**: Create computed values
- **`$effect()`**: Run side effects when dependencies change
- **`$props()`**: Declare component props

### Boundaries

Error and async boundaries introduced in Svelte 5.3.0:

- **Error boundaries**: Catch rendering errors with `failed` snippet
- **Async boundaries**: Show `pending` state during async operations
- **Reset function**: Allow users to retry failed operations

### Context

Dependency injection for Svelte components:

- **`setContext(key, value)`**: Set context in parent
- **`getContext(key)`**: Read context in child
- **`createContext()`**: Type-safe alternative (Svelte 5.40.0+)
- **Scope**: Context is request-scoped, safe for SSR

### Custom Elements

Compile Svelte to native web components:

- **Shadow DOM**: Encapsulated styles (or `shadow: "none"`)
- **Prop reflection**: Sync props with HTML attributes
- **Lifecycle hooks**: `connectedCallback`, `disconnectedCallback`
- **`extend` option**: Customize the element class

### Special Elements

Built-in elements with special behavior:

- **`<svelte:window>`**: Listen to window events and bind properties
- **`<svelte:document>`**: Listen to document events
- **`<svelte:body>`**: Listen to body events
- **`<svelte:head>`**: Insert elements into `<head>`
- **`<svelte:element>`**: Dynamic element type
- **`<svelte:boundary>`**: Error and async boundaries
- **`<svelte:options>`**: Component configuration

### SvelteKit Concepts

- **File-based routing**: `+page.svelte`, `+layout.svelte`
- **Server-side rendering**: Default mode, opt-out with `export const ssr = false`
- **Form actions**: Progressive enhancement with `+page.server.js`
- **Load functions**: Fetch data with `+page.js` or `+page.server.js`

---

## 📦 Sources Summary

This skill combines knowledge from multiple sources to give you complete coverage:

- ✅ **Documentation**: https://svelte.dev/docs/svelte (200 pages)
  - Official API reference
  - Best practices and patterns
  - Migration guides

- ✅ **GitHub Repository**: sveltejs/svelte (deep analysis)
  - Core compiler and runtime code
  - 150 analyzed issues
  - Internal implementation details

- ✅ **GitHub Repository**: sveltejs/kit (deep analysis)
  - SvelteKit framework code
  - 150 analyzed issues
  - Routing and SSR internals

**Quality note:** 536 undocumented APIs detected. Most are internal utilities. See `references/conflicts.md` for details.

## 🔗 Related Skills

→ \skill:svelte-kit - Voor full-stack SvelteKit patronen, routing, en SSR

---

_Generated by Skill Seeker's unified multi-source scraper_
