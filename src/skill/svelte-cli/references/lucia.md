# Lucia Auth with SvelteKit

## Installation

```bash
sv add lucia
```

## Setup

1. Configure in `src/lib/server/auth.ts`:

```typescript
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
});
```

2. Add to `src/app.d.ts`:

```typescript
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
```

## Usage

### Sign up

```typescript
const user = await db.user.create({
  data: { email, passwordHash },
});

const session = await lucia.createSession(user.id, {});
const sessionCookie = lucia.createSessionCookie(session.id);
```

### Sign in

```typescript
const user = await db.user.findUnique({ where: { email } });
const validPassword = await verify(user.password, password);

const session = await lucia.createSession(user.id, {});
```

### Protect routes

```typescript
// src/hooks.server.ts
export const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }
  event.locals.user = user;
  event.locals.session = session;
  return resolve(event);
};
```

## References

- https://lucia-auth.com/
- https://kit.svelte.dev/docs/hooks
