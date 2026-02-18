# Common Patterns

Frequently used Tailwind CSS component patterns.

## Card Component

```jsx
<div class="bg-white rounded-xl shadow-lg p-6">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600 mb-4">Card description</p>
  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
    Action
  </button>
</div>
```

## Navigation

```jsx
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <div class="flex items-center gap-4">
    <span class="text-xl font-bold">Logo</span>
    <div class="hidden md:flex gap-6">
      <a href="#" class="text-gray-600 hover:text-blue-600">Home</a>
      <a href="#" class="text-gray-600 hover:text-blue-600">About</a>
    </div>
  </div>
  <button class="md:hidden">
    <!-- Mobile menu button -->
  </button>
</nav>
```

## Responsive Form

```jsx
<form class="space-y-4 max-w-md mx-auto p-6">
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input
      type="email"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Password</label>
    <input
      type="password"
      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
    Sign In
  </button>
</form>
```

## Flexbox Layout

```jsx
<div class="flex flex-col sm:flex-row items-center gap-4 p-6">
  <img class="size-12 shrink-0" src="/logo.svg" alt="Logo" />
  <div>
    <h3 class="text-xl font-bold">Title</h3>
    <p class="text-gray-500">Description</p>
  </div>
</div>
```

## Interactive Button

```jsx
<button
  class="bg-blue-500 hover:bg-blue-700 active:bg-blue-800
         focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
         disabled:opacity-50 disabled:cursor-not-allowed"
>
  Button
</button>
```
