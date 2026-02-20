/**
 * Search Types
 * 
 * Type definitions for hybrid search system combining FTS5 keyword search
 * and vector similarity search.
 */

import type { SourceFilter } from "../../sync";

/**
 * Raw search result from database
 */
export interface SearchResult {
  id: number;
  path: string;
  source: SourceFilter;
  start_line: number;
  end_line: number;
  text: string;
  score: number;  // Normalized 0-1
  keyword_score?: number;
  vector_score?: number;
}

/**
 * Search options for controlling search behavior
 */
export interface SearchOptions {
  /** Maximum results to return (default: 10) */
  maxResults?: number;
  /** Minimum score threshold 0-1 (default: 0.35) */
  minScore?: number;
  /** Filter by source type */
  source?: SourceFilter;
  /** Skip vector search, use FTS only */
  ftsOnly?: boolean;
}

/**
 * Search response with results and metadata
 */
export interface SearchResponse {
  results: SearchResult[];
  mode: "hybrid" | "fts-only" | "vector-only";
  warning?: string;
  query: string;
  count: number;
}

/**
 * Formatted result with citation and snippet
 */
export interface FormattedResult {
  path: string;
  content: string;  // 200 char snippet
  citation: string;  // "MEMORY.md#L45-L52"
  score: number;  // 0-1 hybrid combined
  chunk_id: string;
  keyword_score?: number;
  vector_score?: number;
}

/**
 * Internal result map for fusion
 */
export interface ResultMap {
  [chunkId: number]: {
    keyword_score?: number;
    vector_score?: number;
    combined_score: number;
    result: SearchResult;
  };
}
