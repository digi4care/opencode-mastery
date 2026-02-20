/**
 * Base Embedding Provider
 * 
 * Abstract base class with shared utilities for all providers.
 */
import type { EmbeddingProvider, ProviderName } from '../types';

export abstract class BaseEmbeddingProvider implements EmbeddingProvider {
  abstract readonly name: ProviderName;
  abstract readonly model: string;
  abstract getDimensions(): number;
  abstract embed(texts: string[]): Promise<import('../types').EmbeddingResult[]>;
  abstract isAvailable(): Promise<boolean>;

  /**
   * Split array into chunks of specified size.
   * Used for batching large embedding requests.
   */
  protected chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  /**
   * Sleep for specified milliseconds.
   * Used for retry backoff.
   */
  protected sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
