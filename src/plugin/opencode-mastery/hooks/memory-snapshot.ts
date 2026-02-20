/**
 * Memory Snapshot Hook (HOOK-02)
 * 
 * Triggered on session.deleted event.
 * Saves session snapshot for recovery and context continuity.
 */
import { getFeatureConfig } from "../../../lib/config";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

/**
 * Creates the memory snapshot hook handler.
 * Saves last N messages to .memory/snapshots/ when session ends.
 */
export function createMemorySnapshotHook() {
  return async (input: any, output: any) => {
    const config = getFeatureConfig("memory");
    
    try {
      const { session } = input;
      const projectRoot = session?.workingDirectory || process.cwd();
      
      // Get config values with defaults
      const maxMessages = config.snapshots?.maxMessages || 15;
      const maxContentLength = config.snapshots?.maxContentLength || 500;
      
      // Create snapshots directory
      const snapshotsPath = join(projectRoot, ".memory", "snapshots");
      await mkdir(snapshotsPath, { recursive: true });
      
      // Get session messages
      const messages = session?.messages || [];
      const lastMessages = messages.slice(-maxMessages);
      
      if (lastMessages.length === 0) {
        return { success: true, messagesSaved: 0, reason: "No messages to save" };
      }
      
      // Create snapshot with truncated content
      const timestamp = new Date().toISOString();
      const snapshot = {
        sessionId: session?.id,
        timestamp,
        messageCount: lastMessages.length,
        messages: lastMessages.map((m: any) => ({
          role: m.role,
          content: typeof m.content === "string" 
            ? m.content.slice(0, maxContentLength) 
            : JSON.stringify(m.content).slice(0, maxContentLength),
        })),
      };
      
      // Write snapshot file (timestamp-based filename)
      const filename = `${timestamp.replace(/[:.]/g, "-")}.json`;
      const filePath = join(snapshotsPath, filename);
      await writeFile(filePath, JSON.stringify(snapshot, null, 2));
      
      console.log(`[memory-snapshot] Saved ${lastMessages.length} messages to ${filename}`);
      
      return { success: true, file: filename, messagesSaved: lastMessages.length };
    } catch (error) {
      // Fail silently - don't block session termination
      console.error("[memory-snapshot] Hook failed:", error);
      return { success: true, messagesSaved: 0, error: String(error) };
    }
  };
}
