/**
 * Semantic chunker for markdown content.
 * 
 * Features:
 * - Chunks at ~400 tokens with 80 token overlap
 * - Respects semantic boundaries (headers, paragraphs, code blocks)
 * - Code blocks always kept intact (quality > limit)
 * - Sentence-based overlap for context continuity
 * - Accurate line number tracking for citations
 * - Tiny chunks (<50 tokens) merged with adjacent content
 */
import { extractBoundaries, type SemanticBoundary } from "./parser";
import { countTokens, getSemanticOverlap } from "./tokenizer";
import { hashContent } from "./hasher";
import { getFeatureConfig } from "../../../lib/config";

/**
 * A chunk of memory content with line tracking.
 */
export interface Chunk {
  /** Chunk text content */
  text: string;
  /** Starting line number (1-indexed) */
  startLine: number;
  /** Ending line number (1-indexed) */
  endLine: number;
  /** SHA-256 hash of text content */
  hash: string;
  /** Token count */
  tokenCount: number;
  /** Source file path */
  path: string;
  /** Source type (memory, session, etc.) */
  source: string;
}

/**
 * Chunking configuration from config system.
 */
interface ChunkingConfig {
  maxTokens: number;
  overlapTokens: number;
  minChunkTokens: number;
}

/**
 * Get chunking config from shared config system.
 */
function getChunkingConfig(): ChunkingConfig {
  const config = getFeatureConfig("memory");
  return {
    maxTokens: config.chunking?.tokens ?? 400,
    overlapTokens: config.chunking?.overlap ?? 80,
    minChunkTokens: 50,
  };
}

/**
 * Chunk markdown content into semantic segments.
 * 
 * @param content - Raw markdown content
 * @param path - Source file path
 * @param source - Source type identifier
 * @returns Array of chunks with line tracking
 */
export function chunkMarkdown(
  content: string,
  path: string,
  source: string = "memory"
): Chunk[] {
  const config = getChunkingConfig();
  const boundaries = extractBoundaries(content);

  if (boundaries.length === 0) {
    // No semantic boundaries, create single chunk if content exists
    if (content.trim()) {
      return [createChunk(content.trim(), 1, countNewlines(content) + 1, path, source)];
    }
    return [];
  }

  const chunks: Chunk[] = [];
  let currentParts: string[] = [];
  let currentTokens = 0;
  let currentStartLine = 1;
  let currentEndLine = 1;

  for (const boundary of boundaries) {
    const boundaryTokens = countTokens(boundary.text);

    // Code blocks: always keep intact (per CONTEXT.md - quality > limit)
    if (boundary.type === "code") {
      // Flush current chunk first
      if (currentParts.length > 0) {
        chunks.push(
          finalizeChunk(currentParts, currentStartLine, currentEndLine, path, source, config)
        );
        currentParts = [];
        currentTokens = 0;
      }

      // Add code block as its own chunk (even if large)
      chunks.push(
        createChunk(
          boundary.text,
          boundary.startLine,
          boundary.endLine,
          path,
          source
        )
      );
      currentStartLine = boundary.endLine + 1;
      continue;
    }

    // Check if adding this boundary would exceed limit
    if (currentTokens + boundaryTokens > config.maxTokens && currentParts.length > 0) {
      // Flush current chunk
      chunks.push(
        finalizeChunk(currentParts, currentStartLine, currentEndLine, path, source, config)
      );

      // Add overlap from current chunk
      const overlapText = getSemanticOverlap(
        currentParts.join("\n\n"),
        config.overlapTokens
      );
      if (overlapText) {
        currentParts = [overlapText];
        currentTokens = countTokens(overlapText);
        // Note: overlap affects start line calculation - it's carried content
      } else {
        currentParts = [];
        currentTokens = 0;
      }
      currentStartLine = boundary.startLine;
    }

    // Add boundary to current chunk
    currentParts.push(boundary.text);
    currentTokens += boundaryTokens;
    currentEndLine = boundary.endLine;
  }

  // Final chunk
  if (currentParts.length > 0) {
    const finalChunk = finalizeChunk(
      currentParts,
      currentStartLine,
      currentEndLine,
      path,
      source,
      config
    );

    // Merge tiny chunks with previous (per CONTEXT.md - Claude's discretion)
    if (finalChunk.tokenCount < config.minChunkTokens && chunks.length > 0) {
      const lastChunk = chunks[chunks.length - 1];
      lastChunk.text += "\n\n" + finalChunk.text;
      lastChunk.endLine = finalChunk.endLine;
      lastChunk.tokenCount = countTokens(lastChunk.text);
      lastChunk.hash = hashContent(lastChunk.text);
    } else {
      chunks.push(finalChunk);
    }
  }

  return chunks;
}

/**
 * Create a chunk from text with line tracking.
 */
function createChunk(
  text: string,
  startLine: number,
  endLine: number,
  path: string,
  source: string
): Chunk {
  return {
    text,
    startLine,
    endLine,
    hash: hashContent(text),
    tokenCount: countTokens(text),
    path,
    source,
  };
}

/**
 * Finalize a chunk from accumulated parts.
 */
function finalizeChunk(
  parts: string[],
  startLine: number,
  endLine: number,
  path: string,
  source: string,
  config: ChunkingConfig
): Chunk {
  const text = parts.join("\n\n");
  return createChunk(text, startLine, endLine, path, source);
}

/**
 * Count newlines in content (for line tracking).
 */
function countNewlines(content: string): number {
  let count = 0;
  for (const char of content) {
    if (char === "\n") count++;
  }
  return count;
}

/**
 * Re-chunk content after edit (for incremental updates).
 * Returns only chunks that have changed (by hash comparison).
 */
export function getChangedChunks(
  content: string,
  path: string,
  source: string,
  existingHashes: Set<string>
): Chunk[] {
  const allChunks = chunkMarkdown(content, path, source);
  return allChunks.filter((chunk) => !existingHashes.has(chunk.hash));
}
