# Remote Functions - Integration Patterns

**This document shows how to integrate remote functions with other SvelteKit features and external tools.**

## Table of Contents

- [With Svelte Stores](#with-svelte-stores)
- [With Load Functions](#with-load-functions)
- [With Server Hooks](#with-server-hooks)
- [With WebSockets](#with-websockets)
- [With External APIs](#with-external-apis)
- [With Database Transactions](#with-database-transactions)
- [With Background Jobs](#with-background-jobs)
- [With Monitoring (Sentry)](#with-monitoring-sentry)

---

## With Svelte Stores

### Integrating Remote Functions with Reactive Stores

```typescript
/// file: src/lib/stores/user.ts
import { writable, derived } from "svelte/store";

export const currentUser = writable(null);

export const isAuthenticated = derived(
  currentUser,
  ($user) => !!$user
);

export const userRole = derived(currentUser, ($user) => $user?.role || null);

/// file: src/routes/profile/user.remote.ts
import { query } from "$app/server";

export const getCurrentUser = query(async () => {
  const user = await fetch("/api/me").then((r) => r.json());
  return user;
});

export const updateProfile = command(async (data) => {
  const result = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  }).then((r) => r.json());

  // Refresh user query
  getCurrentUser().refresh();

  return result;
});
```

```svelte
<!-- src/routes/profile/+page.svelte -->
<script>
  import { getCurrentUser, updateProfile } from "./user.remote";
  import { currentUser } from "$lib/stores/user";

  let user = $state(null);
  let editing = $state(false);
  let formData = $state({});

  // Sync remote function result with store
  $effect(() => {
    const result = $derived.by(async () => {
      const userData = await getCurrentUser();
      currentUser.set(userData);
      return userData;
    });

    user = result;
    formData = { ...result };
  });

  async function handleUpdate() {
    try {
      await updateProfile(formData);
      editing = false;
    } catch (error) {
      alert("Failed to update profile");
    }
  }
</script>

{#if $user}
  <div class="profile">
    {#if !editing}
      <div class="view-mode">
        <h1>{$user.name}</h1>
        <p>{$user.email}</p>
        <p>Role: {$user.role}</p>
        <button onclick={() => editing = true}>Edit Profile</button>
      </div>
    {:else}
      <div class="edit-mode">
        <input
          bind:value={formData.name}
          placeholder="Name"
        />
        <input
          bind:value={formData.email}
          placeholder="Email"
          type="email"
        />
        <button onclick={handleUpdate}>Save</button>
        <button onclick={() => { editing = false; formData = { ...$user }; }}>
          Cancel
        </button>
      </div>
    {/if}
  </div>
{:else}
  <p>Loading...</p>
{/if}
```

---

## With Load Functions

### Combining Remote Functions with Traditional Load

```typescript
/// file: src/routes/blog/[slug]/+page.ts
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  // Use traditional load for critical data
  const articleResponse = await fetch(`/api/articles/${params.slug}`);

  if (!articleResponse.ok) {
    return {
      status: 404,
      error: new Error("Article not found"),
    };
  }

  const article = await articleResponse.json();

  return {
    article,
    // Remote function will be used for comments
    slug: params.slug,
  };
};

/// file: src/routes/blog/[slug]/comments.remote.ts
import { query } from "$app/server";

export const getComments = query(async ({ slug }) => {
  const comments = await fetch(`/api/articles/${slug}/comments`).then((r) => r.json());
  return comments;
});
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  export let data;

  import { getComments } from "./comments.remote";

  let comments = $state([]);

  // Use remote function for non-critical data
  $effect(() => {
    const loadComments = async () => {
      comments = await getComments({ slug: data.slug });
    };
    loadComments();
  });
</script>

<article>
  <h1>{data.article.title}</h1>
  <div>{@html data.article.content}</div>
</article>

<section class="comments">
  <h2>Comments ({comments.length})</h2>
  {#each comments as comment}
    <div class="comment">
      <strong>{comment.author}</strong>
      <p>{comment.content}</p>
    </div>
  {/each}
</section>
```

---

## With Server Hooks

### Authentication and Authorization in Hooks

```typescript
/// file: src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session");

  if (sessionId) {
    const session = await getSession(sessionId);
    if (session && session.expiresAt > new Date()) {
      event.locals.user = {
        id: session.userId,
        email: session.email,
        role: session.role,
      };
    }
  }

  const response = await resolve(event);
  return response;
};

/// file: src/routes/admin/users.remote.ts
import { query, command } from "$app/server";
import { redirect, error } from "@sveltejs/kit";

export const getUsers = query(async () => {
  // Check authentication
  if (!event.locals.user) {
    throw redirect(302, "/login");
  }

  // Check authorization
  if (event.locals.user.role !== "admin") {
    throw error(403, "Forbidden");
  }

  const users = await db.user.findMany();
  return users;
});

export const deleteUser = command(async ({ userId }) => {
  // Check authentication
  if (!event.locals.user) {
    throw redirect(302, "/login");
  }

  // Check authorization
  if (event.locals.user.role !== "admin") {
    throw error(403, "Forbidden");
  }

  // Prevent self-deletion
  if (event.locals.user.id === userId) {
    throw error(400, "Cannot delete your own account");
  }

  await db.user.delete({ where: { id: userId } });

  // Refresh users query
  getUsers().refresh();
});
```

---

## With WebSockets

### Real-time Updates with WebSocket Integration

```typescript
/// file: src/lib/server/websocket.ts
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

export function broadcast(channel: string, data: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1 && client.channel === channel) {
      client.send(JSON.stringify(data));
    });
  });
}

wss.on("connection", (ws) => {
  ws.channel = "default";

  ws.on("message", (message) => {
    try {
      const { channel } = JSON.parse(message.toString());
      ws.channel = channel;
    } catch (error) {
      console.error("Invalid WebSocket message:", error);
    }
  });
});

/// file: src/routes/chat/messages.remote.ts
import { query, command } from "$app/server";
import { broadcast } from "$lib/server/websocket";

export const getMessages = query(async ({ roomId }) => {
  const messages = await db.message.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  return messages;
});

export const sendMessage = command(async ({ roomId, content }) => {
  const event = getRequestEvent();
  const userId = event.locals.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  const message = await db.message.create({
    data: {
      roomId,
      content,
      authorId: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // Broadcast to WebSocket clients
  broadcast(`chat:${roomId}`, {
    type: "new_message",
    message,
  });

  // Refresh messages
  getMessages({ roomId }).refresh();

  return message;
});
```

```svelte
<!-- src/routes/chat/[roomId]/+page.svelte -->
<script>
  import { getMessages, sendMessage } from "./messages.remote";

  let { roomId } = $props();

  let messages = $state([]);
  let newMessage = $state("");
  let ws = $state(null);

  $effect(() => {
    loadMessages();
    setupWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  });

  async function loadMessages() {
    messages = await getMessages({ roomId });
  }

  function setupWebSocket() {
    if (typeof window === "undefined") return;

    ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify({ channel: `chat:${roomId}` }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "new_message") {
        messages = [...messages, data.message];
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  async function handleSend() {
    if (!newMessage.trim()) return;

    try {
      await sendMessage({ roomId, content: newMessage });
      newMessage = "";
    } catch (error) {
      alert("Failed to send message");
    }
  }
</script>

<div class="chat">
  <div class="messages">
    {#each messages as message}
      <div class="message">
        <img src={message.author.avatar} alt={message.author.name} />
        <div>
          <strong>{message.author.name}</strong>
          <p>{message.content}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="input">
    <input
      bind:value={newMessage}
      placeholder="Type a message..."
      onkeydown={(e) => e.key === "Enter" && handleSend()}
    />
    <button onclick={handleSend}>Send</button>
  </div>
</div>
```

---

## With External APIs

### Fetching Data from Third-Party Services

```typescript
/// file: src/routes/weather/data.remote.ts
import { query } from "$app/server";

export const getWeather = query(async ({ city }) => {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Weather API key not configured");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
});

export const getForecast = query(async ({ city, days = 5 }) => {
  const apiKey = process.env.WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=${days * 8}`
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  const data = await response.json();

  return data.list.map((item: any) => ({
    date: new Date(item.dt * 1000),
    temperature: item.main.temp,
    description: item.weather[0].description,
  }));
});
```

```svelte
<!-- src/routes/weather/+page.svelte -->
<script>
  import { getWeather, getForecast } from "./data.remote";

  let city = $state("London");
  let weather = $state(null);
  let forecast = $state(null);
  let loading = $state(false);

  async function loadWeather() {
    loading = true;
    try {
      weather = await getWeather({ city });
      forecast = await getForecast({ city, days: 5 });
    } catch (error) {
      alert("Failed to load weather data");
    } finally {
      loading = false;
    }
  }

  $effect(() => {
    loadWeather();
  });
</script>

<div class="weather">
  <div class="search">
    <input
      bind:value={city}
      placeholder="Enter city..."
    />
    <button onclick={loadWeather} disabled={loading}>
      {loading ? "Loading..." : "Get Weather"}
    </button>
  </div>

  {#if weather}
    <div class="current">
      <h2>{weather.city}</h2>
      <p class="temp">{weather.temperature}°C</p>
      <p>{weather.description}</p>
    </div>
  {/if}

  {#if forecast}
    <div class="forecast">
      <h3>5-Day Forecast</h3>
      {#each forecast as day}
        <div class="forecast-day">
          <span>{day.date.toLocaleDateString()}</span>
          <span>{day.temperature}°C</span>
          <span>{day.description}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
```

---

## With Database Transactions

### Atomic Operations with Rollback

```typescript
/// file: src/routes/orders/create.remote.ts
import * as v from "valibot";
import { command } from "$app/server";
import { getRequestEvent } from "@sveltejs/kit";

const orderSchema = v.object({
  items: v.array(
    v.object({
      productId: v.string(),
      quantity: v.number().min(1),
    })
  ),
  shippingAddress: v.object({
    street: v.string(),
    city: v.string(),
    zip: v.string(),
    country: v.string(),
  }),
});

export const createOrder = command(orderSchema, async ({ items, shippingAddress }) => {
  const event = getRequestEvent();
  const userId = event.locals.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Use database transaction for atomicity
  const order = await db.$transaction(async (tx) => {
    // Create order
    const newOrder = await tx.order.create({
      data: {
        userId,
        status: "pending",
        total: 0, // Will update after calculating
      },
    });

    let total = 0;

    // Add order items and check inventory
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      await tx.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        },
      });

      // Update stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: product.stock - item.quantity,
        },
      });

      total += product.price * item.quantity;
    }

    // Create shipping address
    await tx.shippingAddress.create({
      data: {
        orderId: newOrder.id,
        ...shippingAddress,
      },
    });

    // Update order total
    await tx.order.update({
      where: { id: newOrder.id },
      data: { total },
    });

    return newOrder;
  });

  // Refresh any relevant queries
  // getOrders().refresh();

  return {
    id: order.id,
    status: order.status,
    total: order.total,
  };
});
```

---

## With Background Jobs

### Queue Integration for Long-Running Tasks

```typescript
/// file: src/lib/queue.ts
import Bull from "bull";

export const emailQueue = new Bull("email", process.env.REDIS_URL);

export const imageQueue = new Bull("image processing", process.env.REDIS_URL);

/// file: src/routes/users/export.remote.ts
import * as v from "valibot";
import { command } from "$app/server";
import { emailQueue } from "$lib/queue";

const exportSchema = v.object({
  format: v.enum(["csv", "xlsx", "pdf"]),
});

export const exportUsers = command(exportSchema, async ({ format }) => {
  const event = getRequestEvent();
  const userId = event.locals.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Create export job
  const job = await emailQueue.add(
    "export-users",
    {
      userId,
      format,
      requestedAt: new Date(),
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    }
  );

  return {
    jobId: job.id,
    status: "queued",
    message: "Export job created. You will receive an email when ready.",
  };
});

/// file: src/routes/users/import.remote.ts
import * as v from "valibot";
import { command } from "$app/server";
import { emailQueue } from "$lib/queue";

const importSchema = v.object({
  fileId: v.string(),
});

export const importUsers = command(importSchema, async ({ fileId }) => {
  const event = getRequestEvent();
  const userId = event.locals.user?.id;

  if (!userId) {
    throw new Error("Not authenticated");
  }

  // Process file asynchronously
  const job = await emailQueue.add(
    "import-users",
    {
      userId,
      fileId,
      requestedAt: new Date(),
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
    }
  );

  return {
    jobId: job.id,
    status: "queued",
    message: "Import job started. You will receive an email when complete.",
  };
});
```

```svelte
<!-- src/routes/users/+page.svelte -->
<script>
  import { exportUsers, importUsers } from "./export.remote";

  let exporting = $state(false);
  let importing = $state(false);
  let exportStatus = $state(null);
  let importStatus = $state(null);

  async function handleExport(format) {
    exporting = true;
    exportStatus = null;

    try {
      const result = await exportUsers({ format });
      exportStatus = result.message;
    } catch (error) {
      alert("Export failed");
    } finally {
      exporting = false;
    }
  }

  async function handleImport(file) {
    if (!file) return;

    importing = true;
    importStatus = null;

    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { fileId } = await uploadResponse.json();

      // Start import job
      const result = await importUsers({ fileId });
      importStatus = result.message;
    } catch (error) {
      alert("Import failed");
    } finally {
      importing = false;
    }
  }
</script>

<div class="users-actions">
  <h2>Export Users</h2>
  <button onclick={() => handleExport("csv")} disabled={exporting}>
    Export CSV
  </button>
  <button onclick={() => handleExport("xlsx")} disabled={exporting}>
    Export Excel
  </button>
  {#if exportStatus}
    <p>{exportStatus}</p>
  {/if}

  <h2>Import Users</h2>
  <input
    type="file"
    accept=".csv,.xlsx"
    onchange={(e) => handleImport(e.target.files[0])}
    disabled={importing}
  />
  {#if importing}
    <p>Importing...</p>
  {/if}
  {#if importStatus}
    <p>{importStatus}</p>
  {/if}
</div>
```

---

## With Monitoring (Sentry)

### Error Tracking and Performance Monitoring

```typescript
/// file: src/lib/monitoring.ts
import * as Sentry from "@sentry/sveltekit";

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
  });
}

export function captureRemoteFunctionError(error: any, context: any) {
  Sentry.withScope((scope) => {
    scope.setTag("remote_function", context.name);
    scope.setContext("remote_function", context);
    scope.captureException(error);
  });
}

export function trackRemoteFunctionPerformance(name: string, fn: () => Promise<any>) {
  return Sentry.startTransaction({ name, op: "remote_function" }, async (transaction) => {
    try {
      const result = await fn();
      transaction.setStatus("ok");
      return result;
    } catch (error) {
      transaction.setStatus("internal_error");
      throw error;
    } finally {
      transaction.finish();
    }
  });
}

/// file: src/routes/products/list.remote.ts
import { query } from "$app/server";
import { captureRemoteFunctionError, trackRemoteFunctionPerformance } from "$lib/monitoring";

export const getProducts = query(async ({ page = 1, limit = 20 }) => {
  return await trackRemoteFunctionPerformance("getProducts", async () => {
    try {
      const products = await db.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      return products;
    } catch (error) {
      captureRemoteFunctionError(error, {
        name: "getProducts",
        page,
        limit,
      });
      throw error;
    }
  });
});

export const searchProducts = query(async ({ query: searchQuery }) => {
  return await trackRemoteFunctionPerformance("searchProducts", async () => {
    try {
      const products = await db.product.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
        take: 50,
      });

      return products;
    } catch (error) {
      captureRemoteFunctionError(error, {
        name: "searchProducts",
        query: searchQuery,
      });
      throw error;
    }
  });
});
```

---

## Summary

This guide covers 8 integration patterns:

1. ✅ **Svelte Stores** - Reactive synchronization with writable/derived stores
2. ✅ **Load Functions** - Combining traditional and remote function approaches
3. ✅ **Server Hooks** - Authentication and authorization patterns
4. ✅ **WebSockets** - Real-time updates and broadcasting
5. ✅ **External APIs** - Third-party service integration
6. ✅ **Database Transactions** - Atomic operations with rollback
7. ✅ **Background Jobs** - Queue integration for long-running tasks
8. ✅ **Monitoring** - Error tracking with Sentry

Each pattern includes:
- Complete implementation examples
- TypeScript interfaces and types
- Production-ready Svelte components
- Error handling and monitoring

---

_This documentation is part of the Svelte Development Plugin - providing production-ready integration patterns for SvelteKit remote functions._
