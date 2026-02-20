/**
 * Embedding Types and Interfaces
 * 
 * Common interfaces for all embedding providers.
 */

export type ProviderName = 'openai' | 'gemini' | 'voyage' | 'local';

export interface EmbeddingResult {
  /** The embedding vector */
  embedding: number[];
  /** Original index in the input array */
  index: number;
}

export interface EmbeddingProvider {
  /** Provider name identifier */
  readonly name: ProviderName;
  /** Model identifier */
  readonly model: string;
  /** Get the dimension count for this provider's model */
  getDimensions(): number;
  /** Embed an array of texts, returns results with original indices */
  embed(texts: string[]): Promise<EmbeddingResult[]>;
  /** Check if provider is available (API key exists, model path valid, etc.) */
  isAvailable(): Promise<boolean>;
}

export interface EmbeddingBatchResult {
  /** Map of input text to embedding (null if failed) */
  results: Map<string, number[] | null>;
  /** Number of successful embeddings */
  successCount: number;
  /** Number of failed embeddings */
  failureCount: number;
  /** Whether system is in FTS-only mode (all failed) */
  ftsOnly: boolean;
}

export interface ProviderConfig {
  apiKey?: string;
  model?: string;
  modelPath?: string; // For local provider
  timeout?: number;
}
