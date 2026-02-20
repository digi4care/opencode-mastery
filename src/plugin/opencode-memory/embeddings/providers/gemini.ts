/**
 * Gemini Embedding Provider
 * 
 * Implements embedding generation using Google's text-embedding-004 model.
 * Dimensions: 768
 * API: REST API (lighter weight than SDK for embedding-only use)
 */
import { BaseEmbeddingProvider } from './base';
import type { EmbeddingResult, ProviderName } from '../types';
import { getFeatureConfig } from '../../../../lib/config';

// Model dimensions mapping
const MODEL_DIMS: Record<string, number> = {
  'text-embedding-004': 768,
  'gemini-embedding-001': 3072,
  'text-embedding-001': 768, // Alias
};

interface GeminiBatchResponse {
  embeddings?: Array<{ values: number[] }>;
  error?: { code: number; message: string };
}

export class GeminiProvider extends BaseEmbeddingProvider {
  readonly name: ProviderName = 'gemini';
  readonly model: string;
  private apiKey: string | null = null;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(model?: string) {
    super();
    const config = getFeatureConfig('memory');
    this.model = model ?? config.embeddings.model ?? 'text-embedding-004';
    
    // API key: config takes precedence, fallback to env
    this.apiKey = process.env.GEMINI_API_KEY ?? null;
  }

  getDimensions(): number {
    return MODEL_DIMS[this.model] ?? 768;
  }

  async embed(texts: string[]): Promise<EmbeddingResult[]> {
    if (!this.apiKey) {
      throw new Error('Gemini API key missing');
    }

    // Gemini batch embed endpoint
    const url = `${this.baseUrl}/models/${this.model}:batchEmbedContents?key=${this.apiKey}`;

    const requests = texts.map((text) => ({
      model: `models/${this.model}`,
      content: { parts: [{ text }] },
    }));

    const config = getFeatureConfig('memory');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.embeddings.timeout ?? 30000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data: GeminiBatchResponse = await response.json();

      if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message}`);
      }

      if (!data.embeddings) {
        throw new Error('Gemini API returned no embeddings');
      }

      return data.embeddings.map((item, index) => ({
        embedding: item.values,
        index,
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
