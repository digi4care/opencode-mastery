# Svelte-Cli_Docs - Drizzle

**Pages:** 1

---

## drizzle

**URL:** llms-txt#drizzle

**Contents:**

- Usage
- What you get
- Options
  - database
  - client
  - docker

[Drizzle ORM](https://orm.drizzle.team/) is a TypeScript ORM offering both relational and SQL-like query APIs, and which is serverless-ready by design.

- a setup that keeps your database access in SvelteKit's server files
- an `.env` file to store your credentials
- compatibility with the Lucia auth add-on
- an optional Docker configuration to help with running a local database

Which database variant to use:

- `postgresql` — the most popular open source database
- `mysql` — another popular open source database
- `sqlite` — file-based database not requiring a database server

The SQL client to use, depends on `database`:

- For `postgresql`: `postgres.js`, `neon`,
- For `mysql`: `mysql2`, `planetscale`
- For `sqlite`: `better-sqlite3`, `libsql`, `turso`

Drizzle is compatible with well over a dozen database drivers. We just offer a few of the most common ones here for simplicity, but if you'd like to use another one you can choose one as a placeholder and swap it out for another after setup by choosing from [Drizzle's full list of compatible drivers](https://orm.drizzle.team/docs/connect-overview#next-steps).

Whether to add Docker Compose configuration. Only available for [`database`](#Options-database) `postgresql` or `mysql`

**Examples:**

Example 1 (sh):

```sh
npx sv add drizzle
```

Example 2 (sh):

```sh
npx sv add drizzle="database:postgresql"
```

Example 3 (sh):

```sh
npx sv add drizzle="database:postgresql+client:postgres.js"
```

Example 4 (sh):

```sh
npx sv add drizzle="database:postgresql+client:postgres.js+docker:yes"
```

---
