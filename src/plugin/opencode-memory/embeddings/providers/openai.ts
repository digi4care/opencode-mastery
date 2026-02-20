/**
 * OpenAI Embedding Provider
 * 
 * Implements embedding generation using OpenAI's text-embedding-3-small model.
 * Dimensions: 1536
 * API: Official openai npm SDK
 */
import OpenAI from 'openai';
import { BaseEmbeddingProvider } from './base';
import type { EmbeddingResult, ProviderName } from '../types';
import { getFeatureConfig } from '../../../../lib/config';

// Model dimensions mapping
const MODEL_DIMS: Record<string, number> = {
  'text-embedding-3-small': 1536,
  'text-embedding-3-large': 3072,
  'text-embedding-ada-002': 1536, // Legacy
};

export class OpenAIProvider extends BaseEmbeddingProvider {
  readonly name: ProviderName = 'openai';
  readonly model: string;
  private client: OpenAI | null = null;
  private apiKey: string | null = null;

  constructor(model?: string) {
    super();
    const config = getFeatureConfig('memory');
    this.model = model ?? config.embeddings.model ?? 'text-embedding-3-small';
    
    // API key: config takes precedence, fallback to env
    // Note: Config-based API keys would need to be added to schema
    // For now, use environment variable
    this.apiKey = process.env.OPENAI_API_KEY ?? null;
    
    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
        timeout: config.embeddings.timeout ?? 30000,
        maxRetries: 2,
      });
    }
  }

  getDimensions(): number {
    return MODEL_DIMS[this.model] ?? 1536;
  }

  async embed(texts: string[]): Promise<EmbeddingResult[]> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized - API key missing');
    }

    const response = await this.client.embeddings.create({
      model: this.model,
      input: texts,
    });

    return response.data.map((item) => ({
      embedding: item.embedding,
      index: item.index,
    }));
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && !!this.client;
  }
}
