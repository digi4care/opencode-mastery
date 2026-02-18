# Database Selection Guide

## Quick Decision Matrix

| Use Case                | Recommended       | Why                      |
| ----------------------- | ----------------- | ------------------------ |
| **Web apps, SaaS**      | PostgreSQL        | Robust, features, JSONB  |
| **Mobile/desktop apps** | SQLite            | Zero config, embedded    |
| **Enterprise legacy**   | MySQL             | Wide hosting support     |
| **Real-time analytics** | TimescaleDB       | Time-series optimization |
| **Document store**      | MongoDB           | Flexible schema          |
| **Full-text search**    | Elasticsearch     | Search-optimized         |
| **Graph relationships** | Neo4j             | Native graph queries     |
| **Caching layer**       | Redis             | In-memory speed          |
| **Serverless/edge**     | PlanetScale/Turso | Distributed, serverless  |

## Detailed Comparison

### PostgreSQL

```
✅ Best for: Complex queries, JSONB, extensions, ACID
✅ Scale: Vertical + horizontal (partitioning, replication)
✅ Cloud: RDS, Aurora, Cloud SQL, Supabase, Neon
⚠️ Consider: Requires dedicated server (or managed service)
```

**Use when:**

- Complex data relationships
- Need ACID compliance
- JSON + relational data mixed
- Need extensions (PostGIS, pgvector)
- Long-term project stability

### SQLite

```
✅ Best for: Embedded, zero-config, development
✅ Scale: Single machine (millions of rows possible)
✅ Cloud: Turso, libSQL (distributed SQLite)
⚠️ Consider: No concurrent writes, no network access
```

**Use when:**

- Mobile/desktop applications
- Development/testing
- Low traffic websites (< 100K visits/day)
- Embedded systems
- Prototyping (start simple)

### MySQL

```
✅ Best for: Web apps, wide hosting support
✅ Scale: Read replicas, sharding
✅ Cloud: RDS, Cloud SQL, PlanetScale
⚠️ Consider: Fewer advanced features than PostgreSQL
```

**Use when:**

- Traditional web applications
- Need widest hosting compatibility
- Team has MySQL experience
- Legacy system integration

## Decision Framework

### 1. Data Volume

| Records   | Recommendation                   |
| --------- | -------------------------------- |
| < 1M      | SQLite sufficient                |
| 1M - 100M | Any (PostgreSQL preferred)       |
| 100M - 1B | PostgreSQL + partitioning        |
| > 1B      | Distributed (CockroachDB, Citus) |

### 2. Read/Write Pattern

| Pattern       | Best Choice                     |
| ------------- | ------------------------------- |
| Read-heavy    | PostgreSQL + read replicas      |
| Write-heavy   | PostgreSQL + partitioning       |
| Mixed         | PostgreSQL                      |
| Burst traffic | PostgreSQL + connection pooling |

### 3. Data Types

| Data Type      | Best Choice                              |
| -------------- | ---------------------------------------- |
| Relational     | PostgreSQL, MySQL, SQLite                |
| JSON documents | PostgreSQL (JSONB), MongoDB              |
| Time-series    | TimescaleDB (PostgreSQL extension)       |
| Geospatial     | PostgreSQL + PostGIS                     |
| Graph          | Neo4j, or PostgreSQL with recursive CTEs |
| Full-text      | Elasticsearch, or PostgreSQL GIN indexes |

### 4. Deployment Context

| Context         | Best Choice                         |
| --------------- | ----------------------------------- |
| Serverless/Edge | Turso (SQLite), PlanetScale (MySQL) |
| Container/K8s   | PostgreSQL, MySQL                   |
| Single server   | SQLite (if fits), PostgreSQL        |
| Managed service | RDS, Cloud SQL, Supabase, Neon      |

## Anti-Patterns

| Anti-Pattern                | Problem               | Solution                |
| --------------------------- | --------------------- | ----------------------- |
| MySQL for everything        | Missing features      | Evaluate PostgreSQL     |
| SQLite for high concurrency | Write locking         | Use PostgreSQL          |
| MongoDB for relational data | No joins, consistency | Use PostgreSQL          |
| Over-engineering day 1      | Premature complexity  | Start with SQLite       |
| Ignoring backups            | Data loss risk        | Plan backups from start |

## Migration Path

```
SQLite → PostgreSQL: Simple, good first migration
MySQL → PostgreSQL: More complex, use pgLoader
PostgreSQL → Distributed: Citus, CockroachDB
```

## Related Skills

- **postgresql** - PostgreSQL implementation details
- **sqlite** - SQLite implementation (to be added)
- **mysql** - MySQL implementation (to be added)
