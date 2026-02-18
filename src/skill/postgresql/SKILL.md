---
name: postgresql
description: PostgreSQL implementation - schema design, data types, indexing, partitioning, JSONB, performance optimization, extensions (pgvector, postgis). Use for PostgreSQL CODE. For database selection decisions use database-architect skill.
license: MIT
compatibility: OpenCode
---

# PostgreSQL Table Design

## When to Use

- Designing PostgreSQL schemas from scratch
- Choosing correct data types for columns
- Planning indexing strategy
- Partitioning large tables (>100M rows)
- Query optimization patterns
- JSONB design decisions

## Core Rules

| Rule                | Details                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| **Primary Key**     | `BIGINT GENERATED ALWAYS AS IDENTITY` (or `UUID` for distributed)      |
| **Normalize First** | Start with 3NF, denormalize only for proven ROI                        |
| **NOT NULL**        | Add everywhere semantically required + DEFAULTs                        |
| **FK Indexes**      | PostgreSQL does NOT auto-index FK columns - add them manually          |
| **Types**           | `TIMESTAMPTZ`, `NUMERIC` (money), `TEXT`, `BIGINT`, `DOUBLE PRECISION` |

## PostgreSQL Gotchas

```sql
-- Identifiers: unquoted → lowercased (use snake_case)
-- UNIQUE allows multiple NULLs (PG15+: NULLS NOT DISTINCT)
-- Sequences have gaps - normal behavior, don't "fix"
-- MVCC: updates/deletes leave dead tuples → vacuum needed
-- No clustered PK by default (unlike MySQL InnoDB)
```

## Data Types

### ✅ Preferred Types

| Use Case       | Type                                  | Notes                                               |
| -------------- | ------------------------------------- | --------------------------------------------------- |
| **IDs**        | `BIGINT GENERATED ALWAYS AS IDENTITY` | Use `UUID` for distributed/merged systems           |
| **Strings**    | `TEXT`                                | Never `VARCHAR(n)` - use `CHECK (LENGTH(col) <= n)` |
| **Money**      | `NUMERIC(p,s)`                        | Never float for money                               |
| **Timestamps** | `TIMESTAMPTZ`                         | Never `TIMESTAMP` (without timezone)                |
| **Booleans**   | `BOOLEAN NOT NULL`                    | Unless tri-state needed                             |
| **JSON**       | `JSONB`                               | With GIN index                                      |
| **Arrays**     | `TEXT[]`, `INTEGER[]`                 | Index with GIN for `@>`, `&&`                       |
| **Full-text**  | `TSVECTOR`                            | With GIN index, always specify language             |

### ❌ Never Use

```sql
-- ANTI-PATTERNS:
timestamp          -- → use timestamptz
char(n)/varchar(n) -- → use text
money type         -- → use numeric
timetz             -- → use timestamptz
serial             -- → use generated always as identity
```

## Constraints

```sql
-- PK: implicit UNIQUE + NOT NULL, creates B-tree index
-- FK: always specify ON DELETE/UPDATE action
ALTER TABLE orders
  ADD CONSTRAINT fk_user
  FOREIGN KEY (user_id) REFERENCES users(user_id)
  ON DELETE CASCADE;

-- UNIQUE: allows multiple NULLs (PG15+: NULLS NOT DISTINCT)
-- CHECK: NULL values pass - combine with NOT NULL
price NUMERIC NOT NULL CHECK (price > 0)

-- EXCLUDE: prevent overlapping values
EXCLUDE USING gist (room_id WITH =, booking_period WITH &&)
```

## Indexing Strategy

| Type           | Use Case                                         |
| -------------- | ------------------------------------------------ |
| **B-tree**     | Default for `=`, `<`, `>`, `BETWEEN`, `ORDER BY` |
| **Composite**  | Order matters - leftmost prefix for equality     |
| **Covering**   | `INCLUDE (col1, col2)` for index-only scans      |
| **Partial**    | Hot subsets: `WHERE status = 'active'`           |
| **Expression** | `LOWER(email)` for case-insensitive              |
| **GIN**        | JSONB, arrays, full-text (`@>`, `?`, `@@`)       |
| **GiST**       | Ranges, geometry, exclusion constraints          |
| **BRIN**       | Large time-series, minimal storage               |

```sql
-- Covering index example
CREATE INDEX ON orders (user_id) INCLUDE (total, status);

-- Partial index for hot subset
CREATE INDEX ON orders (created_at) WHERE status = 'active';

-- JSONB GIN index
CREATE INDEX ON profiles USING GIN (attrs);
-- Or containment-only (smaller):
CREATE INDEX ON profiles USING GIN (attrs jsonb_path_ops);
```

## Partitioning (>100M rows)

| Type      | Use Case                                          |
| --------- | ------------------------------------------------- |
| **RANGE** | Time-series (`PARTITION BY RANGE (created_at)`)   |
| **LIST**  | Discrete values (`PARTITION BY LIST (region)`)    |
| **HASH**  | Even distribution (`PARTITION BY HASH (user_id)`) |

```sql
CREATE TABLE logs (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  data JSONB
) PARTITION BY RANGE (created_at);

CREATE TABLE logs_2024_01 PARTITION OF logs
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

**Limitations:**

- No global UNIQUE constraints - include partition key in PK
- FKs from partitioned tables not supported

## Special Patterns

### Update-Heavy Tables

```sql
-- Separate hot/cold columns into different tables
-- Use fillfactor=90 for HOT updates
ALTER TABLE orders SET (fillfactor = 90);
-- Avoid updating indexed columns
```

### Insert-Heavy Workloads

```sql
-- Minimize indexes
-- Use COPY or multi-row INSERT
INSERT INTO logs (data) VALUES
  ('{"a":1}'), ('{"a":2}'), ('{"a":3}');
-- Consider UNLOGGED tables for staging
-- Defer index creation for bulk loads
```

### Upsert (ON CONFLICT)

```sql
INSERT INTO users (email, name)
VALUES ('user@example.com', 'John')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name;
-- Requires exact matching UNIQUE index
```

## JSONB Best Practices

```sql
-- Default GIN index (supports @>, ?, ?|, ?&)
CREATE INDEX ON profiles USING GIN (attrs);

-- Path ops (smaller, only @>)
CREATE INDEX ON profiles USING GIN (attrs jsonb_path_ops);

-- Extract field for B-tree index
ALTER TABLE profiles
  ADD COLUMN theme TEXT
  GENERATED ALWAYS AS (attrs->>'theme') STORED;
CREATE INDEX ON profiles (theme);
```

## Essential Extensions

| Extension     | Purpose                                |
| ------------- | -------------------------------------- |
| `pgcrypto`    | Password hashing (`crypt()`)           |
| `pg_trgm`     | Fuzzy text search (`LIKE '%pattern%'`) |
| `timescaledb` | Time-series automation                 |
| `postgis`     | Geospatial features                    |
| `pgvector`    | Vector similarity (embeddings)         |
| `pgaudit`     | Audit logging                          |

## Example Schema

```sql
CREATE TABLE users (
  user_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ON users (LOWER(email));
CREATE INDEX ON users (created_at);

CREATE TABLE orders (
  order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING','PAID','CANCELED')),
  total NUMERIC(10,2) NOT NULL CHECK (total > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON orders (user_id);
CREATE INDEX ON orders (created_at);
```

## Related Skills

- **database-architect** - DB selection and architecture design
- **drizzle** - TypeScript ORM for PostgreSQL
- **prisma** - Type-safe database client

## Resources

- [PostgreSQL Official Docs](https://www.postgresql.org/docs/current/)
- [PostgreSQL Wiki](https://wiki.postgresql.org/)
- [TimescaleDB](https://docs.timescale.com/)
