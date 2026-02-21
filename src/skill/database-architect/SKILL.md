---
name: database-architect
description: Database technology selection and architecture - choose between SQL vs NoSQL, PostgreSQL vs MySQL vs MongoDB, scaling strategies, migration planning. Use for database DECISIONS. For PostgreSQL implementation use postgresql skill.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "1.0.0"
---

# Database Architect

## When to Use

- Choosing the right database for a new project
- Designing schema architecture
- Planning database migrations
- Scaling strategy decisions
- Data modeling questions
- Caching architecture design

## Core Philosophy

> Design the data layer right from the start to avoid costly rework. Choose the right technology, model data correctly, and plan for scale from day one.

## Database Selection Guide

### Quick Decision Matrix

| Scenario                | Recommended   | Why                                 |
| ----------------------- | ------------- | ----------------------------------- |
| **General web app**     | PostgreSQL    | Mature, feature-rich, JSONB support |
| **Read-heavy, simple**  | MySQL         | Fast reads, wide adoption           |
| **Embedded/local**      | SQLite        | Zero-config, serverless             |
| **Real-time analytics** | TimescaleDB   | Time-series optimization            |
| **Document store**      | MongoDB       | Flexible schema, JSON-native        |
| **Key-value cache**     | Redis         | In-memory speed                     |
| **Full-text search**    | Elasticsearch | Advanced search features            |
| **Graph relationships** | Neo4j         | Native graph queries                |

### Decision Criteria

```
1. Data structure → Relational vs Document vs Graph vs Key-Value
2. Scale expectations → Read-heavy vs Write-heavy vs Balanced
3. Consistency needs → Strong (ACID) vs Eventual (BASE)
4. Query patterns → Simple CRUD vs Complex joins vs Analytics
5. Team expertise → Familiar vs Learning curve acceptable
6. Operational budget → Managed vs Self-hosted
```

### By Use Case

| Use Case            | Primary            | Alternative               |
| ------------------- | ------------------ | ------------------------- |
| SaaS multi-tenant   | PostgreSQL         | MySQL                     |
| E-commerce          | PostgreSQL         | MySQL                     |
| IoT sensor data     | TimescaleDB        | PostgreSQL + partitioning |
| Social network      | PostgreSQL + Redis | Neo4j                     |
| Content management  | PostgreSQL         | MongoDB                   |
| Real-time dashboard | PostgreSQL + Redis | ClickHouse                |
| Mobile app backend  | PostgreSQL         | SQLite (local)            |
| Microservices       | Per-service choice | PostgreSQL for most       |

## Schema Design Principles

### Normalization Levels

| Level           | Eliminates              | Trade-off                   |
| --------------- | ----------------------- | --------------------------- |
| **1NF**         | Repeating groups        | Baseline                    |
| **2NF**         | Partial dependencies    | Still some redundancy       |
| **3NF**         | Transitive dependencies | Good default for OLTP       |
| **Denormalize** | N/A                     | Faster reads, slower writes |

### When to Denormalize

```sql
-- ONLY denormalize when:
-- 1. Measured performance problem with JOINs
-- 2. Read-to-write ratio is very high (>100:1)
-- 3. Data is relatively static

-- Example: Pre-computed aggregate
ALTER TABLE products
  ADD COLUMN order_count INT GENERATED ALWAYS AS (
    (SELECT COUNT(*) FROM orders WHERE product_id = products.id)
  ) STORED;  -- PostgreSQL only, otherwise use trigger/view
```

### Common Patterns

| Pattern               | Use Case                               |
| --------------------- | -------------------------------------- |
| **Adjacency List**    | Hierarchical data (parent_id)          |
| **Closure Table**     | Deep hierarchies with ancestry queries |
| **Materialized Path** | File systems, categories               |
| **Junction Table**    | Many-to-many relationships             |
| **Soft Delete**       | Audit requirements                     |
| **Event Sourcing**    | Audit trail, replay capability         |

## Indexing Strategy

### Index Types

| Type       | Best For                 |
| ---------- | ------------------------ |
| **B-tree** | Equality, range, sorting |
| **Hash**   | Equality only (rare)     |
| **GIN**    | JSONB, arrays, full-text |
| **GiST**   | Ranges, geometry         |
| **BRIN**   | Large time-series        |

### Index Decision Tree

```
Is it equality lookups only? → B-tree (default)
Is it a JSONB column? → GIN
Is it a range query? → B-tree or GiST
Is it full-text search? → GIN on tsvector
Is it >100M rows with time ordering? → BRIN
Is it a composite query? → Composite B-tree (order matters!)
```

### Common Mistakes

```sql
-- ❌ Too many indexes (slows writes)
-- ❌ Indexing low-cardinality columns (status with 2 values)
-- ❌ Not indexing foreign keys (PostgreSQL!)
-- ❌ Wrong column order in composite index
-- ❌ Not using partial indexes for hot subsets
```

## Scalability Patterns

### Vertical vs Horizontal

| Approach          | When          | Pros          | Cons                     |
| ----------------- | ------------- | ------------- | ------------------------ |
| **Vertical**      | <10x growth   | Simple        | Hardware limits          |
| **Read Replicas** | Read-heavy    | Proven        | Replication lag          |
| **Partitioning**  | Large tables  | Query pruning | Complexity               |
| **Sharding**      | Massive scale | Linear growth | Cross-shard queries hard |

### Partitioning Strategies

| Type      | Best For          | Key Selection         |
| --------- | ----------------- | --------------------- |
| **RANGE** | Time-series       | Created_at, timestamp |
| **LIST**  | Discrete values   | Region, category      |
| **HASH**  | Even distribution | User_id, order_id     |

## Caching Architecture

### Multi-Tier Strategy

```
┌─────────────────┐
│  L1: App Cache  │  ← In-process, fastest
├─────────────────┤
│  L2: Redis      │  ← Distributed, shared
├─────────────────┤
│  L3: DB Buffer  │  ← PostgreSQL shared_buffers
└─────────────────┘
```

### Cache Invalidation

| Strategy          | Use Case                   |
| ----------------- | -------------------------- |
| **TTL**           | Default for most data      |
| **Event-driven**  | Critical consistency       |
| **Write-through** | Never stale, slower writes |
| **Write-behind**  | High write throughput      |

## Migration Strategy

### Zero-Downtime Approach

```
1. Create new schema alongside old
2. Dual-write to both schemas
3. Backfill historical data
4. Verify data integrity
5. Switch reads to new schema
6. Stop writes to old schema
7. Remove old schema
```

### Migration Tools

| Tool               | Language   | Best For           |
| ------------------ | ---------- | ------------------ |
| **Flyway**         | Java       | Enterprise         |
| **Liquibase**      | Java       | Complex migrations |
| **Prisma Migrate** | TypeScript | Type safety        |
| **Alembic**        | Python     | SQLAlchemy         |
| **Drizzle Kit**    | TypeScript | Drizzle ORM        |

## Security Checklist

- [ ] Encrypted connections (TLS)
- [ ] At-rest encryption
- [ ] RBAC (Role-Based Access Control)
- [ ] Row-Level Security (PostgreSQL)
- [ ] SQL injection prevention (parameterized queries)
- [ ] Audit logging
- [ ] Regular backups with tested restores
- [ ] Data retention policies (GDPR)

## Response Approach

When asked for database architecture advice:

1. **Understand requirements** - Domain, scale, consistency needs
2. **Recommend technology** - With clear rationale and trade-offs
3. **Design schema** - Tables, relationships, constraints
4. **Plan indexing** - Based on query patterns
5. **Design caching** - Multi-tier strategy
6. **Plan scalability** - Growth projections
7. **Refer to skill** - Point to postgresql (or project-specific implementation docs) for implementation

## Example Interactions

| Request                   | Response                            |
| ------------------------- | ----------------------------------- |
| "DB for e-commerce"       | PostgreSQL + SKILL → `postgresql`   |
| "Mobile app with offline" | SQLite (local) + PostgreSQL (cloud) |
| "IoT 1M events/sec"       | TimescaleDB + Kafka                 |
| "Social network feeds"    | PostgreSQL + Redis cache            |
| "Audit trail required"    | PostgreSQL with event sourcing      |

## Related Skills

| Skill          | Use When                          |
| -------------- | --------------------------------- |
| **postgresql** | PostgreSQL implementation details |

## Resources

- **references/database-selection.md** → Detailed comparison matrix
- **CAP Theorem** → Consistency vs Availability trade-offs
- **ACID vs BASE** → Transaction model decisions
