/**
 * FTS5/BM25 Keyword Search
 * 
 * Implements keyword search using SQLite FTS5 with BM25 ranking.
 * Scores are normalized to 0-1 range using Min-Max normalization.
 */

import { getDatabase } from "../../storage/database";
import type { SearchResult, SearchOptions, SourceFilter } from "./types";
import { getFeatureConfig } from "../../../../lib/config";

/**
 * Execute FTS5/BM25 keyword search
 * 
 * BM25 returns negative scores (lower = more relevant).
 * We invert the sign and apply Min-Max normalization to 0-1 range.
 */
export async function keywordSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const config = getFeatureConfig("memory");
  const maxResults = options.maxResults ?? config.search.maxResults ?? 10;
  const minScore = options.minScore ?? config.search.minScore ?? 0.35;
  const source = options.source ?? "all";

  const db = getDatabase();

  // Build source filter clause
  let sourceClause = "";
  if (source !== "all") {
    sourceClause = `AND source = '${source}'`;
  }

  // FTS5 MATCH query with bm25() for relevance scoring
  // bm25() returns negative values, so we negate for sorting
  const sql = `
    SELECT 
      id,
      path,
      source,
      start_line,
      end_line,
      text,
      -bm25(chunks_fts) as raw_score
    FROM chunks_fts
    WHERE chunks_fts MATCH ? ${sourceClause}
    ORDER BY raw_score DESC
    LIMIT ?
  `;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all(query, maxResults * 2) as Array<{
      id: number;
      path: string;
      source: SourceFilter;
      start_line: number;
      end_line: number;
      text: string;
      raw_score: number;
    }>;

    if (rows.length === 0) {
      return [];
    }

    // Extract raw scores for Min-Max normalization
    const rawScores = rows.map(r => r.raw_score);
    const minRaw = Math.min(...rawScores);
    const maxRaw = Math.max(...rawScores);

    // Normalize and filter
    const results: SearchResult[] = rows
      .map(row => {
        // Min-Max normalization: (score - min) / (max - min)
        // Edge case: all same scores -> return 0.5
        let normalizedScore = 0.5;
        if (maxRaw !== minRaw) {
          normalizedScore = (row.raw_score - minRaw) / (maxRaw - minRaw);
        }

        return {
          id: row.id,
          path: row.path,
          source: row.source,
          start_line: row.start_line,
          end_line: row.end_line,
          text: row.text,
          score: normalizedScore,
          keyword_score: normalizedScore,
        };
      })
      .filter(r => r.score >= minScore)
      .slice(0, maxResults);

    return results;
  } catch (error) {
    // FTS5 MATCH errors can occur with special characters
    console.error("Keyword search error:", error);
    return [];
  }
}
