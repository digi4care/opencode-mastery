/**
 * Voyage Embedding Provider
 * 
 * Implements embedding generation using Voyage AI's embedding models.
 * Dimensions: 1024 (voyage-3), 512 (voyage-3-lite)
 * API: REST API (Voyage SDK exists but REST is lighter)
 */
import { BaseEmbeddingProvider } from './base';
import type { EmbeddingResult, ProviderName } from '../types';
import { getFeatureConfig } from '../../../../lib/config';

// Model dimensions mapping
const MODEL_DIMS: Record<string, number> = {
  'voyage-3': 1024,
  'voyage-3-lite': 512,
  'voyage-3-large': 1024,
  'voyage-4-large': 1024,
  'voyage-code-3': 1024,
};

interface VoyageEmbeddingResponse {
  data: Array<{ embedding: number[]; index: number }>;
  usage?: { total_tokens: number };
}

interface VoyageErrorResponse {
  error?: { message: string; type: string };
}

export class VoyageProvider extends BaseEmbeddingProvider {
  readonly name: ProviderName = 'voyage';
  readonly model: string;
  private apiKey: string | null = null;
  private baseUrl = 'https://api.voyageai.com/v1';

  constructor(model?: string) {
    super();
    const config = getFeatureConfig('memory');
    this.model = model ?? config.embeddings.model ?? 'voyage-3';
    
    // API key: config takes precedence, fallback to env
    this.apiKey = process.env.VOYAGE_API_KEY ?? null;
  }

  getDimensions(): number {
    return MODEL_DIMS[this.model] ?? 1024;
  }

  async embed(texts: string[]): Promise<EmbeddingResult[]> {
    if (!this.apiKey) {
      throw new Error('Voyage API key missing');
    }

    const config = getFeatureConfig('memory');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.embeddings.timeout ?? 30000);

    try {
      const response = await fetch(`${this.baseUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          input: texts,
          model: this.model,
          input_type: 'document',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData: VoyageErrorResponse = await response.json();
        throw new Error(
          `Voyage API error: ${response.status} - ${errorData.error?.message ?? 'Unknown error'}`
        );
      }

      const data: VoyageEmbeddingResponse = await response.json();

      return data.data.map((item) => ({
        embedding: item.embedding,
        index: item.index,
      }));
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }
}
