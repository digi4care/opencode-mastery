/**
 * Local Embedding Provider
 * 
 * Implements embedding generation using node-llama-cpp for offline embeddings.
 * Dimensions: Varies by model (must be detected at runtime)
 * Requires: GGUF model file path configured in opencode.config.yaml
 */
import { existsSync } from 'fs';
import { BaseEmbeddingProvider } from './base';
import type { EmbeddingResult, ProviderName } from '../types';
import { getFeatureConfig } from '../../../../lib/config';

// Dynamic import for node-llama-cpp (optional dependency)
let llamaModule: typeof import('node-llama-cpp') | null = null;

async function getLlamaModule() {
  if (!llamaModule) {
    try {
      llamaModule = await import('node-llama-cpp');
    } catch {
      return null;
    }
  }
  return llamaModule;
}

export class LocalProvider extends BaseEmbeddingProvider {
  readonly name: ProviderName = 'local';
  readonly model: string;
  private modelPath: string | null = null;
  private context: Awaited<ReturnType<typeof createEmbeddingContext>> | null = null;
  private dimensions: number | null = null;

  constructor(modelPath?: string) {
    super();
    const config = getFeatureConfig('memory');
    
    // Model path: constructor param > config > null
    this.modelPath = modelPath ?? config.embeddings.local?.modelPath ?? null;
    this.model = this.modelPath ? this.modelPath.split('/').pop() ?? 'unknown' : 'unknown';
  }

  getDimensions(): number {
    if (this.dimensions) return this.dimensions;
    throw new Error('Dimensions not available until model is loaded. Call isAvailable() first.');
  }

  private async initContext(): Promise<void> {
    if (this.context) return;
    if (!this.modelPath) {
      throw new Error('Local model path not configured');
    }

    const llama = await getLlamaModule();
    if (!llama) {
      throw new Error('node-llama-cpp not installed. Run: bun add node-llama-cpp');
    }

    try {
      const model = await llama.getLlama().then(l => l.loadModel({ modelPath: this.modelPath! }));
      this.context = await model.createEmbeddingContext();
      
      // Detect dimensions by embedding a test string
      const testEmbedding = await this.context.getEmbeddingFor('test');
      this.dimensions = testEmbedding.vector.length;
    } catch (error) {
      throw new Error(`Failed to load local model: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async embed(texts: string[]): Promise<EmbeddingResult[]> {
    await this.initContext();
    
    if (!this.context) {
      throw new Error('Failed to initialize embedding context');
    }

    const results: EmbeddingResult[] = [];

    // node-llama-cpp processes embeddings one at a time
    for (let i = 0; i < texts.length; i++) {
      const embedding = await this.context.getEmbeddingFor(texts[i]);
      results.push({
        embedding: embedding.vector,
        index: i,
      });
    }

    return results;
  }

  async isAvailable(): Promise<boolean> {
    // Check if model path is configured and file exists
    if (!this.modelPath) return false;
    if (!existsSync(this.modelPath)) return false;
    
    // Check if node-llama-cpp is installed
    const llama = await getLlamaModule();
    if (!llama) return false;

    // Try to load the model to verify it works
    try {
      await this.initContext();
      return true;
    } catch {
      return false;
    }
  }
}

// Helper type for embedding context
async function createEmbeddingContext() {
  const llama = await getLlamaModule();
  if (!llama) throw new Error('node-llama-cpp not available');
  const model = await llama.getLlama().then(l => l.loadModel({ modelPath: '' }));
  return model.createEmbeddingContext();
}
