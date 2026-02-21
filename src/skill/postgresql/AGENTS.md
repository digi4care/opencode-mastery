# AGENTS.md - PostgreSQL

**Skill:** PostgreSQL schema design and optimization

## Overview

Expert skill for PostgreSQL database design covering data types, indexing, partitioning, and performance patterns. Use when designing or optimizing PostgreSQL schemas.

## When to Use

- Designing new PostgreSQL schemas
- Choosing correct data types
- Planning indexing strategy
- Partitioning large tables
- Query optimization patterns
- JSONB design decisions

## Anti-Patterns

```sql
-- NEVER use these types:
timestamp          -- → use timestamptz
char(n)/varchar(n) -- → use text
money type         -- → use numeric
serial             -- → use generated always as identity

-- NEVER forget:
-- FK indexes (PostgreSQL does NOT auto-index FKs)
-- Vacuum after heavy updates/deletes
-- Partition key in PK for partitioned tables
```

## Quick Reference

| Task          | Pattern                                   |
| ------------- | ----------------------------------------- |
| **PK**        | `BIGINT GENERATED ALWAYS AS IDENTITY`     |
| **Timestamp** | `TIMESTAMPTZ NOT NULL DEFAULT now()`      |
| **Money**     | `NUMERIC(10,2) NOT NULL CHECK (val > 0)`  |
| **String**    | `TEXT NOT NULL`                           |
| **JSONB**     | `JSONB NOT NULL DEFAULT '{}'` + GIN index |

## Related Skills

- **database-architect** - DB selection and architecture
- **repo-analysis** - Repository analysis for existing DB patterns

## Resources

- **SKILL.md** → Complete PostgreSQL reference
- **Official Docs** → https://www.postgresql.org/docs/current/
