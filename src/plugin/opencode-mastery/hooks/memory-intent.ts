/**
 * Memory Intent Hook (HOOK-05)
 * 
 * Triggered on tool.execute.before event.
 * Detects user intent to remember or recall information and shows toast suggestions.
 * 
 * Pattern-based intent detection across 5 languages (en, nl, de, fr, es).
 * Confidence threshold configurable via memory.intent.confidenceThreshold (default 0.7).
 */
import { getFeatureConfig } from "../../../lib/config";

// Intent patterns by type and language
const REMEMBER_PATTERNS: Record<string, RegExp[]> = {
  en: [/i want to remember/i, /save this/i, /this is important/i, /don't forget/i, /remember that/i],
  nl: [/ik wil onthouden/i, /sla dit op/i, /dit is belangrijk/i, /vergeet niet/i],
  de: [/ich möchte mich erinnern/i, /speichere das/i, /das ist wichtig/i, /vergiss nicht/i],
  fr: [/je veux me souvenir/i, /sauvegarde ça/i, /c'est important/i, /n'oublie pas/i],
  es: [/quiero recordar/i, /guarda esto/i, /esto es importante/i, /no olvides/i],
};

const QUERY_PATTERNS: Record<string, RegExp[]> = {
  en: [/what did i say about/i, /recall when/i, /do you remember/i, /what was that/i, /did i mention/i],
  nl: [/wat zei ik over/i, /herinner je/i, /wat was dat ook alweer/i],
  de: [/was habe ich gesagt/i, /erinnerst du dich/i, /was war das/i],
  fr: [/qu'ai-je dit sur/i, /te souviens-tu/i, /c'était quoi/i],
  es: [/qué dije sobre/i, /recuerdas cuando/i, /qué era eso/i],
};

type IntentType = "remember" | "query" | null;

/**
 * Detects memory-related intent from user message.
 * @param message - User's message content
 * @param threshold - Minimum confidence to consider a match (0-1)
 * @returns Detected intent type and confidence score
 */
function detectIntent(message: string, threshold: number): { intent: IntentType; confidence: number } {
  const lowerMessage = message.toLowerCase();
  
  // Check remember patterns across all languages
  for (const patterns of Object.values(REMEMBER_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerMessage)) {
        return { intent: "remember", confidence: 0.8 };
      }
    }
  }
  
  // Check query patterns across all languages
  for (const patterns of Object.values(QUERY_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lowerMessage)) {
        return { intent: "query", confidence: 0.8 };
      }
    }
  }
  
  return { intent: null, confidence: 0 };
}

/**
 * Creates the memory intent hook handler.
 * Analyzes messages for memory-related intent and shows toast suggestions.
 * 
 * Hook lifecycle:
 * 1. Receives tool.execute.before input with tool name and arguments
 * 2. Extracts message content from prompt/message/content fields
 * 3. Runs pattern-based intent detection
 * 4. Shows toast via client.tui.showToast if intent detected above threshold
 * 5. Never blocks tool execution - returns success regardless of outcome
 */
export function createMemoryIntentHook() {
  return async (input: any) => {
    const config = getFeatureConfig("memory");
    
    try {
      const { tool, arguments: args, client } = input;
      
      // Only process user message tools
      if (tool !== "message" && tool !== "chat" && tool !== "prompt") {
        return { success: true, intentDetected: false, reason: "Not a message tool" };
      }
      
      // Extract message content
      const message = args?.prompt || args?.message || args?.content || "";
      
      if (!message || typeof message !== "string") {
        return { success: true, intentDetected: false, reason: "No message content" };
      }
      
      // Get threshold from config (default 0.7)
      const threshold = config.intent?.confidenceThreshold || 0.7;
      
      // Detect intent
      const result = detectIntent(message, threshold);
      
      if (!result.intent || result.confidence < threshold) {
        return { success: true, intentDetected: false, confidence: result.confidence };
      }
      
      // Show toast notification
      if (client?.tui?.showToast) {
        const toastMessage = result.intent === "remember"
          ? "💡 Detected memory intent. Use /remember to save this."
          : "💡 Detected recall intent. Use /recall to search memory.";
        
        await client.tui.showToast({
          body: {
            message: toastMessage,
            variant: "info",
          },
        });
        
        console.log(`[memory-intent] Detected ${result.intent} intent (confidence: ${result.confidence})`);
      }
      
      return { 
        success: true, 
        intentDetected: true, 
        intent: result.intent, 
        confidence: result.confidence 
      };
    } catch (error) {
      // Fail silently - intent detection is optional enhancement
      console.error("[memory-intent] Hook failed:", error);
      return { success: true, intentDetected: false, error: String(error) };
    }
  };
}
