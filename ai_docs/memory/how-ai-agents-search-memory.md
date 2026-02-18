# How AI Agents Search Their Memory

> Bron: YouTube transcript over memory search in AI agents, met focus op OpenClaw/Claude Code implementatie.

## Overzicht

AI agenten moeten memories niet alleen kunnen opslaan, maar ook effectief kunnen doorzoeken. Dit document behandelt de vier pijlers van memory search:

1. **Keyword search** vs **Semantic search**
2. **Hybrid approach** - waarom dit het beste antwoord is
3. **Reranking** - nuanced relevance judgment
4. **Real-world example** - OpenClaw implementatie

---

## 1. Keyword Search

### Basis: Literal Word Matching

Keyword search zoekt naar exacte woordmatches. Tools zoals `grep` en databases met full-text search (bijv. SQLite FTS5) gebruiken dit.

**Voordeel:** Makkelijk te implementeren, snel.

**Nadeel:** Mist semantische relaties.

### BM25 Algorithm

Een stap verder dan basis grep. BM25 rangschikt resultaten op relevantie op basis van:

- Hoe vaak een term voorkomt (term frequency)
- Hoe uniek de term is across alle content (inverse document frequency)

BM25 is wat full-text search in databases als SQLite's FTS5 extension aandrijft.

> **Interessant:** Claude Code team begon met een vector database, maar vond dat grep/BM25 search beter presteerde en makkelijker te onderhouden was.

---

## 2. Semantic Search

Semantic search zoekt op **betekenis en intentie**, niet alleen letterlijke woorden.

### Embeddings

Tekst wordt omgezet naar een **embedding** - een lijst van nummers die de betekenis representeert.

**Voorbeeld:**

- "How do I speed up my app?" → vector met 1000+ waarden
- "Tips for improving application performance" → **vergelijkbare** vector
- "Best restaurants near me" → **verschillende** vector (onge relateerd)

### Embedding Providers

- **OpenAI** - text-embedding-3-small (populair)
- **Google Gemini** - Gemini embedding-001
- **Voyage AI** - Voyage for large
- **Local** via Ollama

### Vector Databases

Om embeddings op te slaan en te doorzoeken:

| Type                 | Voorbeeld  |
| -------------------- | ---------- |
| Dedicated            | Pinecone   |
| PostgreSQL extension | PG Vector  |
| SQLite extension     | SQLite-vec |

OpenClaw gebruikt SQLite + SQLite-vec.

### Search Flow

1. **Query embedding** - gebruikersvraag wordt embedding
2. **Vector search** - zoek across database naar similar embeddings
3. **Nearest neighbor** - mathematische afstand tussen vectors

**Analogie:** Als coordinaten op een kaart. Jouw query is waar je bent. Content embeddings zijn andere punten. Hoe dichterbij, hoe relevanter.

**Schaalbaarheid:** Bij kleine datasets werkt exact search. Op schaal gebruik je **Approximate Nearest Neighbor (ANN)** - trade-off tussen accuracy en speed, maar in de praktijk verwaarloosbaar.

### Nadelen Semantic Search

- Slecht voor **exacte string searches** (bijv. error codes zoals "connection refused")
- Kan geen **specifieke identifiers** vinden (bijv. functienaam `useState`)
- Mist **literal text matches**

---

## 3. Hybrid Approach (Fusion)

Het antwoord: **combineer keyword en semantic search**.

Run beide parallel, dan gebruik **fusion** om resultaten te combineren.

### Weighted Score Fusion

Combineert scores met gewichten.

**OpenClaw gebruikt:**

```
final_score = 0.7 × vector_score + 0.3 × keyword_score
```

**Voordeel:** Meer controle, preserveert sterkte van individuele matches.

### Reciprocal Rank Fusion (RRF)

Kijkt naar **positie** in beide ranked lists, niet naar raw scores.

**Voorbeeld:**

- Resultaat rank #2 in semantic search
- Resultaat rank #3 in keyword search
- Combined score gebaseerd op beide posities

**Voordeel:** Simpeler.

**Nadeel:** Behandelt near-perfect match hetzelfde als decent match (alleen positie telt).

### Keuze

| Weighted Fusion          | RRF            |
| ------------------------ | -------------- |
| Meer controle            | Simpeler       |
| Preserves match strength | Alleen positie |
| OpenClaw gebruikt dit    | Minder nuance  |

---

## 4. Reranking

Na fusion heb je een ranked list, maar deze is gebaseerd op **pure math** (vector distances + keyword scores). Het mist nuance over wat de gebruiker echt zoekt.

### Wat is Reranking?

Reranking neemt de top resultaten en laat een model beoordelen welke het meest relevant is voor de originele query.

**Model opties:**

- LLM
- Gespecialiseerde reranking models (bijv. Cohere)

### Trade-offs

| Voordeel                   | Nadeel        |
| -------------------------- | ------------- |
| Nuanced relevance judgment | Extra cost    |
| Better results             | Extra latency |

### Waarom niet direct LLM voor search?

- **Speed** - LLM is traag voor scanning duizenden embeddings
- **Context window limits** - kan niet alles in één keer verwerken

**De oplossing:** Eerst snelle search (keyword + vector), dan langzamere maar nauwkeurigere reranking op een kleinere set.

---

## 5. OpenClaw Implementation

### Memory Backends

OpenClaw ondersteunt twee systemen:

1. **Default:** SQLite + vector embeddings (dit document)
2. **Optional:** Qdrant (managed by Qdrant library)

### Embedding Provider Config

Vier opties:

1. Local model via **Ollama**
2. **OpenAI** - text-embedding-3-small
3. **Google Gemini** - Gemini embedding-001
4. **Voyage AI** - Voyage for large

**Auto mode:** Checkt local model eerst, dan remote providers in volgorde: OpenAI → Gemini → Voyage. Gebruikt welke API key geconfigureerd is. Geen keys = memory search disabled.

### Database Schema

Single SQLite database met key tables:

| Table             | Doel                                                    |
| ----------------- | ------------------------------------------------------- |
| `files`           | Trackt memory files (path, content hash, last modified) |
| `chunks`          | De embeddings + text + line ranges                      |
| `chunks_fts`      | FTS5 full-text search (BM25 keyword ranking)            |
| `chunks_vec`      | SQLite-vec table (embeddings as float32 arrays)         |
| `embedding_cache` | Cache embeddings by text hash (cost optimization)       |

### Chunking Strategy

OpenClaw embed niet hele files, maar splitst markdown in:

- **~400 tokens** per chunk
- **80 token overlap** tussen chunks
- Elk chunk heeft: text, embedding vector, line range

**Line range** = belangrijk voor citations (agent kan exact zeggen waar memory vandaan komt).

### Search Implementation

**Flow:**

1. Query text → embedding (zelfde provider als indexing)
2. **Parallel searches:**
   - **Keyword:** Tokenize query → FTS5 table → BM25 ranking → convert to 0-1 score: `1 / (1 + rank)`
   - **Vector:** Query embedding → SQLite-vec distance cosine → similarity: `1 - distance`
3. **Candidate multiplier:** Bijv. 6 results requested → 24 candidates per search (4x multiplier)
4. **Weighted fusion:** `0.7 × vector_score + 0.3 × keyword_score`
5. **Filter:** Minimum threshold 0.35, cap op requested count

### Tools for Agents

| Tool            | Doel                                |
| --------------- | ----------------------------------- |
| `memory_search` | Search memory for relevant snippets |
| `memory_get`    | Fetch specific file sections        |

**memory_search:**

- Input: query, max_results (optional), min_score threshold (optional)
- Output: array of snippets (file path, line numbers, score, text preview up to 700 chars)
- System prompt: "mandatory recall step" - search before answering about prior work, decisions, preferences, etc.

**memory_get:**

- Input: file path, start line (optional), line count (optional)
- Doel: Fetch alleen wat je nodig hebt, niet hele file

**Two-step pattern (search → get):**

- Search geeft genoeg context om te beslissen wat relevant is
- Get haalt alleen de specifieke content op
- Houdt context window lean en efficient

### Incremental Sync System

**Triggers:**

- File watcher op memory.md en memory directory
- Debounce ~1.5 seconds
- Mark index as dirty → trigger sync

**Sync Flow:**

1. List alle memory files
2. Compare content hash vs `files` table
3. Skip files met matching hash (unchanged)
4. Alleen changed files → rechunk + re-embed
5. Hash check chunks tegen `embedding_cache`
6. Cache hit = reuse embedding, skip API call
7. Concurrency limit om API niet te overwelden

**Full Reindex Triggers:**

- Embedding provider/model change
- Chunk size config change
- Safe rebuild: new index in temp DB → atomic swap

**Session Transcripts:**

- Delta tracking (bytes + messages since last sync)
- Threshold crossed → sync alleen die session files

---

## Key Takeaways

1. **Keyword search** is makkelijk en goed voor exact matches (error codes, function names)
2. **Semantic search** vindt betekenis maar mist literal matches
3. **Hybrid (fusion)** combineert het beste van beide
4. **Reranking** voegt nuance toe na math-based ranking
5. **OpenClaw** gebruikt: SQLite + SQLite-vec, 70/30 weighted fusion, 400-token chunks, incremental sync

---

## Relevante Configuraties

```
# OpenClaw fusion weights
vector_weight = 0.7
keyword_weight = 0.3
min_score_threshold = 0.35
candidate_multiplier = 4x

# Chunking
chunk_size = ~400 tokens
chunk_overlap = 80 tokens

# Debounce
file_watcher_debounce = ~1.5s
```
