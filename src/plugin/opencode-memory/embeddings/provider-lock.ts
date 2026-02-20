/**
 * Provider Lock Mechanism
 * 
 * Locks embedding provider at startup for entire session.
 * This ensures dimension consistency - different providers have different dimensions.
 * 
 * Priority order: configurable, default: Local → OpenAI → Gemini → Voyage
 */
import type { EmbeddingProvider, ProviderName } from './types';
import { OpenAIProvider } from './providers/openai';
import { GeminiProvider } from './providers/gemini';
import { VoyageProvider } from './providers/voyage';
import { LocalProvider } from './providers/local';
import { getFeatureConfig } from '../../../lib/config';

export interface ProviderStatus {
  name: ProviderName | null;
  model: string | null;
  dimensions: number | null;
  available: boolean;
  checkedAt: number;
}

// Session-scoped locked provider
let lockedProvider: EmbeddingProvider | null = null;
let lockStatus: ProviderStatus = {
  name: null,
  model: null,
  dimensions: null,
  available: false,
  checkedAt: 0,
};

/**
 * Create a provider instance by name.
 */
function createProvider(name: ProviderName, config: ReturnType<typeof getFeatureConfig>): EmbeddingProvider | null {
  switch (name) {
    case 'openai':
      return new OpenAIProvider(config.embeddings.model ?? undefined);
    case 'gemini':
      return new GeminiProvider(config.embeddings.model ?? undefined);
    case 'voyage':
      return new VoyageProvider(config.embeddings.model ?? undefined);
    case 'local':
      return new LocalProvider(config.embeddings.local?.modelPath ?? undefined);
    default:
      return null;
  }
}

/**
 * Lock provider at startup.
 * Checks providers in priority order, uses first available.
 * 
 * Per user decision: Provider locked for entire session to ensure dimension consistency.
 */
export async function lockProvider(): Promise<EmbeddingProvider | null> {
  if (lockedProvider) return lockedProvider;

  const config = getFeatureConfig('memory');
  const priority: ProviderName[] = config.embeddings.priority ?? ['local', 'openai', 'gemini', 'voyage'];

  for (const providerName of priority) {
    try {
      const provider = createProvider(providerName, config);
      if (!provider) continue;

      const available = await provider.isAvailable();
      if (available) {
        lockedProvider = provider;
        lockStatus = {
          name: providerName,
          model: provider.model,
          dimensions: provider.getDimensions(),
          available: true,
          checkedAt: Date.now(),
        };
        console.log(`[embeddings] Locked provider: ${providerName} (${provider.model}, ${provider.getDimensions()} dims)`);
        return provider;
      }
    } catch (error) {
      // Provider check failed, continue to next
      console.warn(`[embeddings] Provider ${providerName} check failed:`, error);
    }
  }

  // No provider available - FTS-only mode
  lockStatus = {
    name: null,
    model: null,
    dimensions: null,
    available: false,
    checkedAt: Date.now(),
  };
  console.warn('[embeddings] No embedding provider available, using FTS-only mode');
  return null;
}

/**
 * Get the locked provider (must call lockProvider first).
 */
export function getLockedProvider(): EmbeddingProvider | null {
  return lockedProvider;
}

/**
 * Get current provider status.
 */
export function getProviderStatus(): ProviderStatus {
  return { ...lockStatus };
}

/**
 * Check if we're in FTS-only mode (no embedding provider).
 */
export function isFTSOnly(): boolean {
  return lockedProvider === null;
}

/**
 * Reset provider lock (for testing only).
 */
export function resetProviderLock(): void {
  lockedProvider = null;
  lockStatus = {
    name: null,
    model: null,
    dimensions: null,
    available: false,
    checkedAt: 0,
  };
}
