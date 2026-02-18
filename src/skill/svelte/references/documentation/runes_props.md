# Svelte_Docs - Runes Props

**Pages:** 2

---

## $props

**URL:** llms-txt#$props

**Contents:**

- Fallback values
- Renaming props
- Rest props
- Updating props
- Type safety
- `$props.id()`

The inputs to a component are referred to as _props_, which is short for _properties_. You pass props to components just like you pass attributes to elements:

On the other side, inside `MyComponent.svelte`, we can receive props with the `$props` rune...

...though more commonly, you'll [_destructure_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) your props:

Destructuring allows us to declare fallback values, which are used if the parent component does not set a given prop (or the value is `undefined`):

> [!NOTE] Fallback values are not turned into reactive state proxies (see [Updating props](#Updating-props) for more info)

We can also use the destructuring assignment to rename props, which is necessary if they're invalid identifiers, or a JavaScript keyword like `super`:

Finally, we can use a _rest property_ to get, well, the rest of the props:

References to a prop inside a component update when the prop itself updates — when `count` changes in `App.svelte`, it will also change inside `Child.svelte`. But the child component is able to temporarily override the prop value, which can be useful for unsaved ephemeral state ([demo](/playground/untitled#H4sIAAAAAAAAE6WQ0WrDMAxFf0WIQR0Wmu3VTQJln7HsIfVcZubIxlbGRvC_DzuBraN92qPula50tODZWB1RPi_IX16jLALWSOOUq6P3-_ihLWftNEZ9TVeOWBNHlNhGFYznfqCBzeRdYHh6M_YVzsFNsNs3pdpGd4eBcqPVDMrNxNDBXeSRtXioDgO1zU8ataeZ2RE4Utao924RFXQ9iHXwvoPHKpW1xY4g_Bg0cSVhKS0p560Za95612ZC02ONrD8ZJYdZp_rGQ37ff_mSP86Np2TWZaNNmdcH56P4P67K66_SXoK9pG-5dF5Z9QEAAA==)):

While you can temporarily _reassign_ props, you should not _mutate_ props unless they are [bindable]($bindable).

If the prop is a regular object, the mutation will have no effect ([demo](/playground/untitled#H4sIAAAAAAAAE3WQwU7DMBBEf2W1QmorQgJXk0RC3PkBwiExG9WQrC17U4Es_ztKUkQp9OjxzM7bjcjtSKjwyfKNp1aLORA4b13ADHszUED1HFE-3eyaBcy-Mw_O5eFAg8xa1wb6T9eWhVgCKiyD9sZJ3XAjZnTWCzzuzfAKvbcjbPJieR2jm_uGy-InweXqtd0baaliBG0nFgW3kBIUNWYo9CGoxE-UsgvIpw2_oc9-LmAPJBCPDJCggqvlVtvdH9puErEMlvVg9HsVtzuoaojzkKKAfRuALVDfk5ZZW0fmy05wXcFdwyktlUs-KIinljTXrRVnm7-kL9dYLVbUAQAA)):

If the prop is a reactive state proxy, however, then mutations _will_ have an effect but you will see an [`ownership_invalid_mutation`](runtime-warnings#Client-warnings-ownership_invalid_mutation) warning, because the component is mutating state that does not 'belong' to it ([demo](/playground/untitled#H4sIAAAAAAAAE3WR0U7DMAxFf8VESBuiauG1WycheOEbKA9p67FA6kSNszJV-XeUZhMw2GN8r-1znUmQ7FGU4pn2UqsOes-SlSGRia3S6ET5Mgk-2OiJBZGdOh6szd0eNcdaIx3-V28NMRI7UYq1awdleVNTzaq3ZmB43CndwXYwPSzyYn4dWxermqJRI4Np3rFlqODasWRcTtAaT1zCHYSbVU3r4nsyrdPMKTUFKDYiE4yfLEoePIbsQpqfy3_nOVMuJIqg0wk1RFg7GOuWfwEbz2wIDLVatR_VtLyBagNTHFIUMCqtoZXeIfAOU1JoUJsR2IC3nWTMjt7GM4yKdyBhlAMpesvhydCC0y_i0ZagHByMh26WzUhXUUxKnpbcVnBfUwhznJnNlac7JkuIURL-2VVfwxflyrWcSQIAAA==)):

The fallback value of a prop not declared with `$bindable` is left untouched — it is not turned into a reactive state proxy — meaning mutations will not cause updates ([demo](/playground/untitled#H4sIAAAAAAAAE3WQwU7DMBBEf2VkIbUVoYFraCIh7vwA4eC4G9Wta1vxpgJZ_nfkBEQp9OjxzOzTRGHlkUQlXpy9G0gq1idCL43ppDrAD84HUYheGwqieo2CP3y2Z0EU3-En79fhRIaz1slA_-nKWSbLQVRiE9SgPTetbVkfvRsYzztttugHd8RiXU6vr-jisbWb8idhN7O3bEQhmN5ZVDyMlIorcOddv_Eufq4AGmJEuG5PilEjQrnRcoV7JCTUuJlGWq7-YHYjs7NwVhmtDnVcrlA3iLmzLLGTAdaB-j736h68Oxv-JM1I0AFjoG1OzPfX023c1nhobUoT39QeKsRzS8owM8DFTG_pE6dcVl70AQAA))

In summary: don't mutate props. Either use callback props to communicate changes, or — if parent and child should share the same object — use the [`$bindable`]($bindable) rune.

You can add type safety to your components by annotating your props, as you would with any other variable declaration. In TypeScript that might look like this...

...while in JSDoc you can do this:

You can, of course, separate the type declaration from the annotation:

> [!NOTE] Interfaces for native DOM elements are provided in the `svelte/elements` module (see [Typing wrapper components](typescript#Typing-wrapper-components))

Adding types is recommended, as it ensures that people using your component can easily discover which props they should provide.

This rune, added in version 5.20.0, generates an ID that is unique to the current component instance. When hydrating a server-rendered component, the value will be consistent between server and client.

This is useful for linking elements via attributes like `for` and `aria-labelledby`.

**Examples:**

Example 1 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import MyComponent from './MyComponent.svelte';
</script>

<MyComponent adjective="cool" />
```

Example 2 (svelte):

```svelte
<!--- file: MyComponent.svelte --->
<script>
	let props = $props();
</script>

<p>this component is {props.adjective}</p>
```

Example 3 (svelte):

```svelte
<!--- file: MyComponent.svelte --->
<script>
	let +++{ adjective }+++ = $props();
</script>

<p>this component is {+++adjective+++}</p>
```

Example 4 (js):

```js
let { adjective = "happy" } = $props();
```

---

## $$props and $$restProps

**URL:** llms-txt#$$props-and-$$restprops

In runes mode, getting an object containing all the props that were passed in is easy, using the [`$props`]($props) rune.

In legacy mode, we use `$$props` and `$$restProps`:

- `$$props` contains all the props that were passed in, including ones that are not individually declared with the `export` keyword
- `$$restProps` contains all the props that were passed in _except_ the ones that were individually declared

For example, a `<Button>` component might need to pass along all its props to its own `<button>` element, except the `variant` prop:

In Svelte 3/4 using `$$props` and `$$restProps` creates a modest performance penalty, so they should only be used when needed.

**Examples:**

Example 1 (svelte):

```svelte
<script>
	export let variant;
</script>

<button {...$$restProps} class="variant-{variant} {$$props.class ?? ''}">
	click me
</button>

<style>
	.variant-danger {
		background: red;
	}
</style>
```

---
