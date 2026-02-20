/**
 * Search API - Main Entry Point
 * 
 * Provides hybrid search combining vector similarity and keyword matching.
 * Falls back to FTS-only when embedding provider is unavailable.
 */

import { keywordSearch } from "./keyword";
import { vectorSearch, isVectorSearchAvailable } from "./vector";
import { fuseResults } from "./hybrid";
import { getFeatureConfig } from "../../../../lib/config";
import type { SearchOptions, SearchResponse, FormattedResult, SearchResult } from "./types";

/**
 * Format citation string in path#Lstart-Lend format
 */
export function formatCitation(path: string, startLine: number, endLine: number): string {
  return `${path}#L${startLine}-L${endLine}`;
}

/**
 * Format search result with citation and snippet
 */
export function formatSearchResult(result: SearchResult): FormattedResult {
  // Truncate text to ~200 chars at word boundary
  let snippet = result.text.trim();
  if (snippet.length > 200) {
    snippet = snippet.slice(0, 197);
    const lastSpace = snippet.lastIndexOf(" ");
    if (lastSpace > 100) {
      snippet = snippet.slice(0, lastSpace);
    }
    snippet += "...";
  }

  return {
    path: result.path,
    content: snippet,
    citation: formatCitation(result.path, result.start_line, result.end_line),
    score: result.score,
    chunk_id: `chunk-${result.id}`,
    keyword_score: result.keyword_score,
    vector_score: result.vector_score,
  };
}

/**
 * Search memory with hybrid search
 * 
 * Combines FTS5 keyword search and vector similarity search.
 * Automatically falls back to keyword-only when no embedding provider available.
 */
export async function searchMemory(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResponse> {
  const config = getFeatureConfig("memory");
  const maxResults = options.maxResults ?? config.search.maxResults ?? 10;
  const minScore = options.minScore ?? config.search.minScore ?? 0.35;

  // Check if vector search is available
  const vectorAvailable = isVectorSearchAvailable() && !options.ftsOnly;
  
  let keywordResults: SearchResult[] = [];
  let vectorResults: SearchResult[] = [];
  let mode: "hybrid" | "fts-only" = "fts-only";
  let warning: string | undefined;

  // Execute searches in parallel if hybrid mode
  if (vectorAvailable) {
    try {
      [keywordResults, vectorResults] = await Promise.all([
        keywordSearch(query, options),
        vectorSearch(query, options),
      ]);
      
      if (vectorResults.length > 0) {
        mode = "hybrid";
      } else if (keywordResults.length > 0) {
        mode = "fts-only";
        warning = "Vector search returned no results. Using keyword search only.";
      } else {
        mode = "fts-only";
      }
    } catch (error) {
      // Vector search failed, fall back to keyword-only
      console.error("Hybrid search error, falling back to FTS:", error);
      keywordResults = await keywordSearch(query, options);
      mode = "fts-only";
      warning = "Vector search failed. Using keyword search only.";
    }
  } else {
    // FTS-only mode
    keywordResults = await keywordSearch(query, options);
    mode = "fts-only";
    
    if (!options.ftsOnly) {
      warning = "No embedding provider available. Using keyword search only.";
    }
  }

  // Fuse results if hybrid
  let fusedResults: SearchResult[];
  if (mode === "hybrid") {
    fusedResults = fuseResults(keywordResults, vectorResults);
  } else {
    fusedResults = keywordResults;
  }

  // Apply minScore filter and limit
  const filteredResults = fusedResults
    .filter(r => r.score >= minScore)
    .slice(0, maxResults);

  // Format results
  const formattedResults = filteredResults.map(formatSearchResult);

  return {
    results: formattedResults,
    mode,
    warning,
    query,
    count: formattedResults.length,
  };
}

// Re-export types
export type { SearchOptions, SearchResponse, FormattedResult, SearchResult } from "./types";
