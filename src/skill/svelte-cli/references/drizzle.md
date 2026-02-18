# Drizzle ORM with SvelteKit

## Installation

```bash
sv add drizzle
```

## Configuration

1. Create `drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/server/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

2. Set up schema in `src/lib/server/schema.ts`:

```typescript
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});
```

## Common Commands

```bash
# Generate migrations
npx drizzle-kit generate:pg

# Push to database
npx drizzle-kit push:pg

# Studio (visual editor)
npx drizzle-kit studio
```

## With SvelteKit

Create a db client in `src/lib/server/db.ts`:

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import pool from "pg";
import * as schema from "./schema";

const pool = new pool.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
```

## References

- https://orm.drizzle.team/
- https://kit.svelte.dev/docs/routing#server
