/**
 * Hybrid Score Fusion
 * 
 * Combines keyword (FTS5/BM25) and vector (cosine similarity) scores
 * using configurable weighted fusion (default: 70% vector, 30% keyword).
 */

import { getFeatureConfig } from "../../../../lib/config";
import type { SearchResult, ResultMap } from "./types";

/**
 * Calculate hybrid score from keyword and vector scores
 * Uses weighted combination: vectorWeight * vector + textWeight * keyword
 */
export function calculateHybridScore(
  keywordScore: number | undefined,
  vectorScore: number | undefined,
  vectorWeight: number = 0.7,
  textWeight: number = 0.3
): number {
  // If only one score is available, use it
  if (keywordScore === undefined && vectorScore !== undefined) {
    return vectorScore;
  }
  if (vectorScore === undefined && keywordScore !== undefined) {
    return keywordScore;
  }

  // If both available, use weighted fusion
  if (keywordScore !== undefined && vectorScore !== undefined) {
    return vectorWeight * vectorScore + textWeight * keywordScore;
  }

  // No scores available
  return 0;
}

/**
 * Fuse keyword and vector results by chunk ID
 * Deduplicates and calculates combined hybrid scores
 */
export function fuseResults(
  keywordResults: SearchResult[],
  vectorResults: SearchResult[]
): SearchResult[] {
  const config = getFeatureConfig("memory");
  const vectorWeight = config.search.hybrid?.vectorWeight ?? 0.7;
  const textWeight = config.search.hybrid?.textWeight ?? 0.3;

  // Build result map keyed by chunk ID
  const resultMap: ResultMap = {};

  // Add keyword results
  for (const result of keywordResults) {
    resultMap[result.id] = {
      keyword_score: result.keyword_score,
      combined_score: 0,
      result,
    };
  }

  // Add/merge vector results
  for (const result of vectorResults) {
    if (resultMap[result.id]) {
      // Merge with existing keyword result
      resultMap[result.id].vector_score = result.vector_score;
    } else {
      // New result from vector search only
      resultMap[result.id] = {
        vector_score: result.vector_score,
        combined_score: 0,
        result,
      };
    }
  }

  // Calculate hybrid scores
  for (const id of Object.keys(resultMap)) {
    const entry = resultMap[parseInt(id)];
    entry.combined_score = calculateHybridScore(
      entry.keyword_score,
      entry.vector_score,
      vectorWeight,
      textWeight
    );
    entry.result.score = entry.combined_score;
    entry.result.keyword_score = entry.keyword_score;
    entry.result.vector_score = entry.vector_score;
  }

  // Sort by combined score and return
  return Object.values(resultMap)
    .sort((a, b) => b.combined_score - a.combined_score)
    .map(entry => entry.result);
}
