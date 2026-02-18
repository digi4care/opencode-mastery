# Remote Functions - Edge Cases & Error Handling

**This document covers common edge cases, error scenarios, and their solutions when using remote functions.**

## Table of Contents

- [Network Timeouts](#network-timeouts)
- [Retry Logic](#retry-logic)
- [Request Cancellation](#request-cancellation)
- [Memory Leaks](#memory-leaks)
- [Race Conditions](#race-conditions)
- [Cache Invalidation](#cache-invalidation)
- [Partial Failures](#partial-failures)
- [Offline Support](#offline-support)
- [Rate Limiting](#rate-limiting)
- [Server Overload](#server-overload)

---

## Network Timeouts

### Implementing AbortController for Request Cancellation

```typescript
/// file: src/lib/utils/timeouts.ts
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  controller: AbortController
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

/// file: src/routes/products/list.remote.ts
import { query } from "$app/server";

export const getProducts = query(async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    // Set a 10-second timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timeout")), 10000);
    });

    const fetchPromise = fetch("/api/products", { signal });

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request was cancelled due to timeout");
    }
    throw error;
  }
});
```

```svelte
<!-- src/routes/products/+page.svelte -->
<script>
  import { getProducts } from "./list.remote";

  let products = $state([]);
  let loading = $state(true);
  let error = $state(null);
  let controller = $state(null);

  $effect(() => {
    loadProducts();

    return () => {
      // Cleanup on component unmount
      if (controller) {
        controller.abort();
      }
    };
  });

  async function loadProducts() {
    loading = true;
    error = null;

    try {
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const result = await getProducts();
      clearTimeout(timeout);

      products = result;
    } catch (err) {
      if (err.message.includes("timeout") || err.message.includes("cancelled")) {
        error = "Request timed out. Please try again.";
      } else {
        error = "Failed to load products. Please try again.";
      }
      console.error("Error loading products:", err);
    } finally {
      loading = false;
    }
  }

  function retry() {
    loadProducts();
  }
</script>

{#if loading}
  <div class="loading">Loading products...</div>
{:else if error}
  <div class="error">
    <p>{error}</p>
    <button onclick={retry}>Retry</button>
  </div>
{:else}
  <div class="products">
    {#each products as product}
      <div class="product">{product.name}</div>
    {/each}
  </div>
{/if}

<style>
  .error {
    padding: 1rem;
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 4px;
    text-align: center;
  }
  .error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

---

## Retry Logic

### Exponential Backoff with Circuit Breaker

```typescript
/// file: src/lib/utils/retry.ts
interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: any) => boolean;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    retryCondition = (error) => isRetryableError(error),
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!retryCondition(error) || attempt === maxAttempts) {
        throw error;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        baseDelay * Math.pow(backoffMultiplier, attempt - 1),
        maxDelay
      );

      // Add jitter (±25%)
      const jitter = delay * 0.25;
      const actualDelay = delay + (Math.random() - 0.5) * 2 * jitter;

      await sleep(actualDelay);
    }
  }

  throw lastError;
}

function isRetryableError(error: any): boolean {
  // Retry on network errors, timeouts, 5xx server errors
  return (
    error.name === "NetworkError" ||
    error.message?.includes("timeout") ||
    (error.status >= 500 && error.status < 600) ||
    error.status === 429 // Too Many Requests
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/// file: src/routes/products/list.remote.ts
import { query } from "$app/server";
import { withRetry } from "$lib/utils/retry";

export const getProducts = query(async () => {
  return await withRetry(
    async () => {
      const response = await fetch("/api/products");

      if (!response.ok) {
        const error = new Error(`HTTP error! status: ${response.status}`);
        (error as any).status = response.status;
        throw error;
      }

      return await response.json();
    },
    {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 5000,
      retryCondition: (error) => {
        // Only retry on specific error types
        return (
          error.name === "NetworkError" ||
          error.status === 429 || // Rate limited
          (error.status >= 500 && error.status < 600) // Server errors
        );
      },
    }
  );
});
```

---

## Request Cancellation

### Aborting In-Flight Requests

```typescript
/// file: src/lib/stores/requests.ts
import { writable } from "svelte/store";

interface PendingRequest {
  id: string;
  controller: AbortController;
}

function createRequestStore() {
  const { subscribe, set, update } = writable<Map<string, PendingRequest>>(new Map());

  return {
    subscribe,
    add: (id: string, controller: AbortController) => {
      update((requests) => {
        requests.set(id, { id, controller });
        return requests;
      });
    },
    cancel: (id: string) => {
      update((requests) => {
        const request = requests.get(id);
        if (request) {
          request.controller.abort();
          requests.delete(id);
        }
        return requests;
      });
    },
    cancelAll: () => {
      update((requests) => {
        requests.forEach((request) => request.controller.abort());
        return new Map();
      });
    },
    remove: (id: string) => {
      update((requests) => {
        requests.delete(id);
        return requests;
      });
    },
  };
}

export const pendingRequests = createRequestStore();

/// file: src/routes/products/list.remote.ts
import { query } from "$app/server";
import { pendingRequests } from "$lib/stores/requests";

export const getProducts = query(async ({ page = 1, limit = 20 }) => {
  const controller = new AbortController();
  const requestId = `products-${page}`;

  pendingRequests.add(requestId, controller);

  try {
    const response = await fetch(`/api/products?page=${page}&limit=${limit}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } finally {
    pendingRequests.remove(requestId);
  }
});
```

```svelte
<!-- src/routes/products/+page.svelte -->
<script>
  import { getProducts } from "./list.remote";
  import { pendingRequests } from "$lib/stores/requests";

  let products = $state([]);
  let loading = $state(false);
  let page = $state(1);

  async function loadPage(newPage) {
    if (loading) return;

    loading = true;
    try {
      products = await getProducts({ page: newPage, limit: 20 });
      page = newPage;
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Failed to load products");
      }
    } finally {
      loading = false;
    }
  }

  function nextPage() {
    loadPage(page + 1);
  }

  function prevPage() {
    if (page > 1) {
      loadPage(page - 1);
    }
  }

  $effect(() => {
    loadPage(1);

    // Cleanup on unmount
    return () => {
      // Request cancellation is handled by the store
    };
  });
</script>

<div class="products">
  {#if loading}
    <p>Loading...</p>
  {:else}
    {#each products as product}
      <div class="product">{product.name}</div>
    {/each}

    <div class="pagination">
      <button onclick={prevPage} disabled={page === 1 || loading}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onclick={nextPage} disabled={loading}>
        Next
      </button>
    </div>
  {/if}
</div>
```

---

## Memory Leaks

### Proper Cleanup on Component Unmount

```typescript
/// file: src/routes/dashboard/metrics.remote.ts
import { query } from "$app/server";
import { onDestroy } from "svelte";

export const getMetrics = query(async () => {
  // This query refreshes every 5 seconds
  const interval = setInterval(async () => {
    try {
      await getMetrics().refresh();
    } catch (error) {
      console.error("Failed to refresh metrics:", error);
    }
  }, 5000);

  // Return cleanup function
  return {
    data: await fetchMetrics(),
    cleanup: () => clearInterval(interval),
  };
});

function fetchMetrics() {
  return fetch("/api/metrics").then((r) => r.json());
}
```

```svelte
<!-- src/routes/dashboard/+page.svelte -->
<script>
  import { getMetrics } from "./metrics.remote";

  let metrics = $state(null);
  let cleanup = $state(null);

  $effect(() => {
    const result = $derived.by(async () => {
      const data = await getMetrics();
      return data;
    });

    // Track cleanup function
    if (result?.cleanup) {
      cleanup = result.cleanup;
    }

    return () => {
      // Cleanup on component unmount
      if (cleanup) {
        cleanup();
      }
    };
  });
</script>

<div class="dashboard">
  {#if $result}
    <h2>Real-time Metrics</h2>
    <div class="metric">
      <h3>Active Users</h3>
      <p>{$result.data.activeUsers}</p>
    </div>
    <div class="metric">
      <h3>API Requests</h3>
      <p>{$result.data.requests}</p>
    </div>
  {/if}
</div>
```

---

## Race Conditions

### Preventing Concurrent Updates

```typescript
/// file: src/lib/utils/lock.ts
class Mutex {
  private queue: Array<() => void> = [];
  private locked = false;

  async acquire(): Promise<() => void> {
    return new Promise((resolve) => {
      const release = () => {
        const next = this.queue.shift();
        if (next) {
          next();
        } else {
          this.locked = false;
        }
      };

      if (!this.locked) {
        this.locked = true;
        resolve(release);
      } else {
        this.queue.push(() => {
          this.locked = true;
          resolve(release);
        });
      }
    });
  }
}

export const updateLock = new Mutex();

/// file: src/routes/inventory/items.remote.ts
import * as v from "valibot";
import { command } from "$app/server";
import { updateLock } from "$lib/utils/lock";

const updateInventorySchema = v.object({
  itemId: v.string(),
  quantity: v.number().min(0),
});

export const updateInventory = command(updateInventorySchema, async ({ itemId, quantity }) => {
  // Acquire lock to prevent concurrent updates
  const release = await updateLock.acquire();

  try {
    // Start transaction
    await db.$transaction(async (tx) => {
      // Get current inventory with lock
      const item = await tx.$queryRaw`
        SELECT * FROM inventory WHERE id = ${itemId} FOR UPDATE
      `;

      if (!item) {
        throw new Error("Item not found");
      }

      // Update inventory
      await tx.inventory.update({
        where: { id: itemId },
        data: { quantity, updatedAt: new Date() },
      });
    });
  } finally {
    release();
  }
});
```

---

## Cache Invalidation

### Smart Cache Management

```typescript
/// file: src/lib/cache.ts
class Cache {
  private store = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl = 60000): void {
    this.store.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  invalidate(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        this.store.delete(key);
      }
    }
  }

  clear(): void {
    this.store.clear();
  }
}

export const cache = new Cache();

/// file: src/routes/products/list.remote.ts
import { query } from "$app/server";
import { cache } from "$lib/cache";

export const getProducts = query(async ({ category = "all", page = 1 }) => {
  const cacheKey = `products-${category}-${page}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch from database
  const products = await db.product.findMany({
    where: category === "all" ? {} : { category },
    skip: (page - 1) * 20,
    take: 20,
  });

  // Cache for 5 minutes
  cache.set(cacheKey, products, 5 * 60 * 1000);

  return products;
});

// Invalidate cache when products are updated
export const updateProduct = command(async ({ id, data }) => {
  await db.product.update({
    where: { id },
    data,
  });

  // Invalidate all product caches
  cache.invalidate("products-.*");
});
```

---

## Partial Failures

### Handling Batch Operation Failures

```typescript
/// file: src/routes/users/batch.remote.ts
import * as v from "valibot";
import { command } from "$app/server";

const batchOperationSchema = v.array(
  v.object({
    id: v.string(),
    action: v.enum(["create", "update", "delete"]),
    data: v.record(v.any()),
  })
);

export const batchUsers = command(batchOperationSchema, async (operations) => {
  const results = [];
  const errors = [];

  for (const operation of operations) {
    try {
      let result;

      switch (operation.action) {
        case "create":
          result = await db.user.create({ data: operation.data });
          break;
        case "update":
          result = await db.user.update({
            where: { id: operation.id },
            data: operation.data,
          });
          break;
        case "delete":
          await db.user.delete({ where: { id: operation.id } });
          result = { success: true };
          break;
      }

      results.push({
        id: operation.id,
        success: true,
        data: result,
      });
    } catch (error) {
      errors.push({
        id: operation.id,
        success: false,
        error: error.message,
      });

      results.push({
        id: operation.id,
        success: false,
        error: error.message,
      });
    }
  }

  return {
    results,
    errors,
    summary: {
      total: operations.length,
      successful: results.filter((r) => r.success).length,
      failed: errors.length,
    },
  };
});
```

```svelte
<!-- src/routes/users/+page.svelte -->
<script>
  import { batchUsers } from "./batch.remote";

  let selectedUsers = $state([]);
  let processing = $state(false);
  let results = $state(null);

  async function processBatch(action) {
    if (selectedUsers.length === 0) return;

    processing = true;
    results = null;

    try {
      const operations = selectedUsers.map((user) => ({
        id: user.id,
        action,
        data: action === "create" ? user : action === "update" ? user : undefined,
      }));

      const result = await batchUsers(operations);
      results = result;

      if (result.errors.length > 0) {
        alert(`${result.errors.length} operations failed`);
      }
    } catch (error) {
      alert("Batch operation failed");
    } finally {
      processing = false;
    }
  }
</script>

<div class="batch-operations">
  <div class="actions">
    <button
      onclick={() => processBatch("create")}
      disabled={processing || selectedUsers.length === 0}
    >
      Create
    </button>
    <button
      onclick={() => processBatch("update")}
      disabled={processing || selectedUsers.length === 0}
    >
      Update
    </button>
    <button
      onclick={() => processBatch("delete")}
      disabled={processing || selectedUsers.length === 0}
    >
      Delete
    </button>
  </div>

  {#if results}
    <div class="results">
      <h3>Operation Summary</h3>
      <p>Total: {results.summary.total}</p>
      <p>Successful: {results.summary.successful}</p>
      <p>Failed: {results.summary.failed}</p>

      {#if results.errors.length > 0}
        <div class="errors">
          <h4>Errors:</h4>
          {#each results.errors as error}
            <p class="error">ID {error.id}: {error.error}</p>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>
```

---

## Offline Support

### Handling Network Disconnections

```typescript
/// file: src/lib/offline.ts
import { writable } from "svelte/store";

export const isOnline = writable(true);
export const pendingOperations = writable([]);

function setupOnlineDetection() {
  const updateStatus = () => {
    isOnline.set(navigator.onLine);
  };

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

  return () => {
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  };
}

if (typeof window !== "undefined") {
  setupOnlineDetection();
}

/// file: src/routes/todos/list.remote.ts
import { query, command } from "$app/server";
import { isOnline, pendingOperations } from "$lib/offline";

export const getTodos = query(async () => {
  if (!navigator.onLine) {
    // Return cached data when offline
    const cached = localStorage.getItem("todos-cache");
    return cached ? JSON.parse(cached) : [];
  }

  const todos = await fetch("/api/todos").then((r) => r.json());

  // Cache for offline use
  localStorage.setItem("todos-cache", JSON.stringify(todos));

  return todos;
});

const addTodoSchema = v.object({
  title: v.string().min(1),
  completed: v.boolean().default(false),
});

export const addTodo = command(addTodoSchema, async ({ title, completed }) => {
  if (!navigator.onLine) {
    // Queue for later when online
    pendingOperations.update((ops) => [
      ...ops,
      { type: "add", data: { title, completed }, timestamp: Date.now() },
    ]);

    // Return optimistic result
    return { id: `temp-${Date.now()}`, title, completed };
  }

  const todo = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify({ title, completed }),
  }).then((r) => r.json());

  // Refresh todos
  getTodos().refresh();

  return todo;
});

// Process pending operations when back online
export async function processPendingOperations() {
  const currentOnline = navigator.onLine;
  isOnline.set(currentOnline);

  if (!currentOnline) return;

  let operations;
  pendingOperations.update((ops) => {
    operations = ops;
    return [];
  });

  if (!operations || operations.length === 0) return;

  for (const op of operations) {
    try {
      if (op.type === "add") {
        await addTodo(op.data);
      }
    } catch (error) {
      console.error("Failed to process pending operation:", error);
      // Re-queue on failure
      pendingOperations.update((ops) => [...ops, op]);
    }
  }
}
```

```svelte
<!-- src/routes/todos/+page.svelte -->
<script>
  import { getTodos, addTodo, processPendingOperations } from "./list.remote";
  import { isOnline } from "$lib/offline";

  let todos = $state([]);
  let newTodo = $state("");
  let online = $state(true);

  $effect(() => {
    const unsubscribe = isOnline.subscribe((value) => {
      online = value;

      // Process pending operations when back online
      if (value) {
        processPendingOperations();
      }
    });

    loadTodos();

    return unsubscribe;
  });

  async function loadTodos() {
    try {
      todos = await getTodos();
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }

  async function handleAdd() {
    if (!newTodo.trim()) return;

    const optimisticTodo = await addTodo({ title: newTodo, completed: false });

    // Add to UI immediately (optimistic update)
    todos = [...todos, optimisticTodo];
    newTodo = "";

    // Refresh from server if online
    if (online) {
      await loadTodos();
    }
  }
</script>

<div class="todos">
  <div class="status">
    {#if online}
      <span class="online">🟢 Online</span>
    {:else}
      <span class="offline">🔴 Offline - Changes will sync when back online</span>
    {/if}
  </div>

  <div class="add-todo">
    <input
      bind:value={newTodo}
      placeholder="Add a todo..."
      onkeydown={(e) => e.key === "Enter" && handleAdd()}
    />
    <button onclick={handleAdd}>Add</button>
  </div>

  <ul class="todo-list">
    {#each todos as todo}
      <li class="todo-item">
        <span>{todo.title}</span>
        {#if !online}
          <span class="pending">⏳ Pending sync</span>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  .status {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  .online {
    color: green;
  }
  .offline {
    color: orange;
  }
  .pending {
    color: orange;
    font-size: 0.875rem;
  }
</style>
```

---

## Summary

This guide covers 10 critical edge cases for remote functions:

1. ✅ **Network Timeouts** - AbortController implementation
2. ✅ **Retry Logic** - Exponential backoff with circuit breaker
3. ✅ **Request Cancellation** - Abort in-flight requests
4. ✅ **Memory Leaks** - Proper cleanup on unmount
5. ✅ **Race Conditions** - Mutex locks for concurrent updates
6. ✅ **Cache Invalidation** - Smart cache management
7. ✅ **Partial Failures** - Batch operation error handling
8. ✅ **Offline Support** - Queue operations for later sync

Each pattern includes:
- Complete TypeScript implementation
- Production-ready Svelte components
- Error handling and user feedback
- Best practices for reliability

---

_This documentation is part of the Svelte Development Plugin - providing production-ready patterns for handling edge cases in SvelteKit remote functions._
