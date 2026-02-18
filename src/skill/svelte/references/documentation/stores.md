# Svelte_Docs - Stores

**Pages:** 1

---

## Stores

**URL:** llms-txt#stores

**Contents:**

- When to use stores
- svelte/store
  - `writable`
  - `readable`
  - `derived`
  - `readonly`
  - `get`
- Store contract

<!-- - how to use
- how to write
- TODO should the details for the store methods belong to the reference section? -->

A _store_ is an object that allows reactive access to a value via a simple _store contract_. The [`svelte/store` module](../svelte-store) contains minimal store implementations which fulfil this contract.

Any time you have a reference to a store, you can access its value inside a component by prefixing it with the `$` character. This causes Svelte to declare the prefixed variable, subscribe to the store at component initialisation and unsubscribe when appropriate.

Assignments to `$`-prefixed variables require that the variable be a writable store, and will result in a call to the store's `.set` method.

Note that the store must be declared at the top level of the component — not inside an `if` block or a function, for example.

Local variables (that do not represent store values) must _not_ have a `$` prefix.

## When to use stores

Prior to Svelte 5, stores were the go-to solution for creating cross-component reactive states or extracting logic. With runes, these use cases have greatly diminished.

- when extracting logic, it's better to take advantage of runes' universal reactivity: You can use runes outside the top level of components and even place them into JavaScript or TypeScript files (using a `.svelte.js` or `.svelte.ts` file ending)
- when creating shared state, you can create a `$state` object containing the values you need and then manipulate said state

Stores are still a good solution when you have complex asynchronous data streams or it's important to have more manual control over updating values or listening to changes. If you're familiar with RxJs and want to reuse that knowledge, the `$` also comes in handy for you.

The `svelte/store` module contains a minimal store implementation which fulfil the store contract. It provides methods for creating stores that you can update from the outside, stores you can only update from the inside, and for combining and deriving stores.

Function that creates a store which has values that can be set from 'outside' components. It gets created as an object with additional `set` and `update` methods.

`set` is a method that takes one argument which is the value to be set. The store value gets set to the value of the argument if the store value is not already equal to it.

`update` is a method that takes one argument which is a callback. The callback takes the existing store value as its argument and returns the new value to be set to the store.

If a function is passed as the second argument, it will be called when the number of subscribers goes from zero to one (but not from one to two, etc). That function will be passed a `set` function which changes the value of the store, and an `update` function which works like the `update` method on the store, taking a callback to calculate the store's new value from its old value. It must return a `stop` function that is called when the subscriber count goes from one to zero.

Note that the value of a `writable` is lost when it is destroyed, for example when the page is refreshed. However, you can write your own logic to sync the value to for example the `localStorage`.

Creates a store whose value cannot be set from 'outside', the first argument is the store's initial value, and the second argument to `readable` is the same as the second argument to `writable`.

Derives a store from one or more other stores. The callback runs initially when the first subscriber subscribes and then whenever the store dependencies change.

In the simplest version, `derived` takes a single store, and the callback returns a derived value.

The callback can set a value asynchronously by accepting a second argument, `set`, and an optional third argument, `update`, calling either or both of them when appropriate.

In this case, you can also pass a third argument to `derived` — the initial value of the derived store before `set` or `update` is first called. If no initial value is specified, the store's initial value will be `undefined`.

If you return a function from the callback, it will be called when a) the callback runs again, or b) the last subscriber unsubscribes.

In both cases, an array of arguments can be passed as the first argument instead of a single store.

This simple helper function makes a store readonly. You can still subscribe to the changes from the original one using this new readable store.

Generally, you should read the value of a store by subscribing to it and using the value as it changes over time. Occasionally, you may need to retrieve the value of a store to which you're not subscribed. `get` allows you to do so.

> [!NOTE] This works by creating a subscription, reading the value, then unsubscribing. It's therefore not recommended in hot code paths.

You can create your own stores without relying on [`svelte/store`](../svelte-store), by implementing the _store contract_:

1. A store must contain a `.subscribe` method, which must accept as its argument a subscription function. This subscription function must be immediately and synchronously called with the store's current value upon calling `.subscribe`. All of a store's active subscription functions must later be synchronously called whenever the store's value changes.
2. The `.subscribe` method must return an unsubscribe function. Calling an unsubscribe function must stop its subscription, and its corresponding subscription function must not be called again by the store.
3. A store may _optionally_ contain a `.set` method, which must accept as its argument a new value for the store, and which synchronously calls all of the store's active subscription functions. Such a store is called a _writable store_.

For interoperability with RxJS Observables, the `.subscribe` method is also allowed to return an object with an `.unsubscribe` method, rather than return the unsubscription function directly. Note however that unless `.subscribe` synchronously calls the subscription (which is not required by the Observable spec), Svelte will see the value of the store as `undefined` until it does.

**Examples:**

Example 1 (svelte):

```svelte
<script>
	import { writable } from 'svelte/store';

	const count = writable(0);
	console.log($count); // logs 0

	count.set(1);
	console.log($count); // logs 1

	$count = 2;
	console.log($count); // logs 2
</script>
```

Example 2 (ts):

```ts
/// file: state.svelte.js
export const userState = $state({
  name: "name",
  /* ... */
});
```

Example 3 (svelte):

```svelte
<!--- file: App.svelte --->
<script>
	import { userState } from './state.svelte.js';
</script>

<p>User name: {userState.name}</p>
<button onclick={() => {
	userState.name = 'new name';
}}>
	change name
</button>
```

Example 4 (js):

```js
/// file: store.js
import { writable } from "svelte/store";

const count = writable(0);

count.subscribe(value => {
  console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update(n => n + 1); // logs '2'
```

---
