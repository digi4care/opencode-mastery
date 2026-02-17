/**
 * Memory Intent Hook (LLM-Powered)
 * 
 * Detects "remember" intent using LLM
 * Triggered by: tool.execute.before
 * 
 * This is the key hook that uses AI to detect memory intent
 * instead of simple keyword matching
 */

import type { Hook, HookExecuteInput, PluginClient } from "@opencode-ai/plugin"

export interface IntentConfig {
  enabled: boolean
  languages: string[]
  confidenceThreshold: number
}

/**
 * Detect memory intent using LLM
 * 
 * This is where we use AI to understand if the user wants
 * to remember something, rather than simple keyword matching
 */
async function detectMemoryIntent(
  message: string,
  client: PluginClient,
  config: IntentConfig
): Promise<{
  intent: "remember" | "query" | "forget" | null
  entities: string[]
  confidence: number
  language: string
} | null> {
  if (!config.enabled) return null
  
  // Build prompt for LLM
  const prompt = `Analyze this user message and detect memory-related intent.

Message: "${message}"

Respond with JSON only (no other text):
{
  "intent": "remember" | "query" | "forget" | null,
  "entities": ["extracted entities/nouns from message"],
  "confidence": 0.0-1.0,
  "language": "en" | "nl" | "de" | "fr" | "es" | "other"
}

Rules:
- intent "remember": user wants to store something in memory
- intent "query": user wants to know what the AI remembers
- intent "forget": user wants to remove something from memory
- confidence < ${config.confidenceThreshold}: return null intent
- Extract key entities (nouns, technologies, names)`

  try {
    // Call LLM for intent detection
    const response = await client.complete({
      prompt,
      temperature: 0.1,
      maxTokens: 200
    })
    
    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null
    
    const result = JSON.parse(jsonMatch[0])
    
    return {
      intent: result.intent,
      entities: result.entities || [],
      confidence: result.confidence || 0,
      language: result.language || "en"
    }
  } catch (error) {
    // LLM call failed, return null
    console.error("Memory intent detection failed:", error)
    return null
  }
}

/**
 * Create intent hook
 */
export function createMemoryIntentHook(config: IntentConfig = {
  enabled: true,
  languages: ["en", "nl", "de", "fr", "es"],
  confidenceThreshold: 0.7
}): Hook {
  return {
    name: "memory-intent",
    trigger: "tool.execute.before",
    description: "Detects memory intent using LLM",
    
    execute: async (input: HookExecuteInput) => {
      const { tool, arguments: args, client } = input
      
      // Only process user messages
      if (tool !== "message" && tool !== "chat") {
        return {
          success: true,
          message: "Not a message tool, skipping"
        }
      }
      
      // Extract message from arguments
      const message = typeof args === "string" 
        ? args 
        : args?.prompt || args?.message || args?.content || ""
      
      if (!message || message.length < 3) {
        return {
          success: true,
          message: "Message too short, skipping"
        }
      }
      
      // Detect intent using LLM
      const intentResult = await detectMemoryIntent(message, client, config)
      
      if (!intentResult || !intentResult.intent) {
        return {
          success: true,
          message: "No memory intent detected"
        }
      }
      
      // Handle different intents
      switch (intentResult.intent) {
        case "remember": {
          // Extract content to remember
          // For now, just log - actual storage would call memory-write tool
          return {
            success: true,
            intent: "remember",
            entities: intentResult.entities,
            language: intentResult.language,
            confidence: intentResult.confidence,
            message: `Detected remember intent (confidence: ${intentResult.confidence})`,
            action: "suggest_memory_write",
            content: message
          }
        }
        
        case "query": {
          return {
            success: true,
            intent: "query",
            entities: intentResult.entities,
            language: intentResult.language,
            confidence: intentResult.confidence,
            message: `Detected query intent (confidence: ${intentResult.confidence})`,
            action: "suggest_memory_search",
            query: intentResult.entities.join(" ")
          }
        }
        
        case "forget": {
          return {
            success: true,
            intent: "forget",
            entities: intentResult.entities,
            language: intentResult.language,
            confidence: intentResult.confidence,
            message: `Detected forget intent (confidence: ${intentResult.confidence})`,
            action: "suggest_memory_delete",
            targets: intentResult.entities
          }
        }
        
        default:
          return {
            success: true,
            message: "Unknown intent"
          }
      }
    }
  }
}

export default createMemoryIntentHook
