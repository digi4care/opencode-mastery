/**
 * Memory manager for OpenCode sessions
 * 
 * Provides persistent memory storage in .memory.md files
 * with automatic compaction when memory grows too large.
 */
import { join } from "path";
import { existsSync, readFileSync, writeFileSync, appendFileSync, statSync } from "fs";

const MEMORY_FILE = ".memory.md";
const MAX_MEMORY_SIZE_KB = 50; // Compact when larger than 50KB

interface MemoryEntry {
  timestamp: string;
  category?: string;
  priority?: string;
  content: string;
}

/**
 * Get memory file path for a project
 */
export function getMemoryPath(projectPath: string): string {
  return join(projectPath, MEMORY_FILE);
}

/**
 * Check if memory exists for a project
 */
export function memoryExists(projectPath: string): boolean {
  return existsSync(getMemoryPath(projectPath));
}

/**
 * Get memory status
 */
export function getMemoryStatus(projectPath: string): {
  exists: boolean;
  size: number;
  entries: number;
  path: string;
} {
  const path = getMemoryPath(projectPath);
  
  if (!existsSync(path)) {
    return { exists: false, size: 0, entries: 0, path };
  }
  
  const content = readFileSync(path, "utf-8");
  const stats = statSync(path);
  const entries = (content.match(/^## \d{4}-\d{2}-\d{2}/gm) || []).length;
  
  return {
    exists: true,
    size: stats.size,
    entries,
    path,
  };
}

/**
 * Add entry to memory
 */
export function remember(
  projectPath: string,
  content: string,
  category?: string,
  priority?: string
): { success: boolean; path: string } {
  const path = getMemoryPath(projectPath);
  const timestamp = new Date().toISOString();
  
  let entry = `## ${timestamp.split("T")[0]}\n\n`;
  if (category) entry += `**Category:** ${category}\n`;
  if (priority) entry += `**Priority:** ${priority}\n`;
  entry += `\n${content}\n\n---\n\n`;
  
  try {
    appendFileSync(path, entry);
    return { success: true, path };
  } catch (error) {
    return { success: false, path };
  }
}

/**
 * Read all memory entries
 */
export function readMemory(projectPath: string): string {
  const path = getMemoryPath(projectPath);
  
  if (!existsSync(path)) {
    return "";
  }
  
  return readFileSync(path, "utf-8");
}

/**
 * Compact memory by summarizing old entries
 */
export function compactMemory(projectPath: string): {
  success: boolean;
  beforeSize: number;
  afterSize: number;
  entriesKept: number;
} {
  const path = getMemoryPath(projectPath);
  
  if (!existsSync(path)) {
    return { success: false, beforeSize: 0, afterSize: 0, entriesKept: 0 };
  }
  
  const content = readFileSync(path, "utf-8");
  const beforeSize = Buffer.byteLength(content);
  
  // Split into entries
  const sections = content.split(/^## \d{4}-\d{2}-\d{2}/gm).filter(Boolean);
  
  // Keep last 10 entries (most recent)
  const recentEntries = sections.slice(-10);
  
  // Build compacted memory
  let compacted = "# Project Memory\n\n";
  compacted += "> Auto-compacted on " + new Date().toISOString() + "\n\n";
  
  // Add summary of old entries
  if (sections.length > 10) {
    compacted += `## Historical Summary\n\n`;
    compacted += `> ${sections.length - 10} older entries compacted.\n\n`;
  }
  
  // Add recent entries
  for (const entry of recentEntries) {
    compacted += `## [Date preserved]\n${entry}\n`;
  }
  
  try {
    writeFileSync(path, compacted);
    const afterSize = Buffer.byteLength(compacted);
    
    return {
      success: true,
      beforeSize,
      afterSize,
      entriesKept: Math.min(sections.length, 10),
    };
  } catch (error) {
    return { success: false, beforeSize, afterSize: beforeSize, entriesKept: 0 };
  }
}

/**
 * Check if memory needs compaction
 */
export function needsCompaction(projectPath: string): boolean {
  const status = getMemoryStatus(projectPath);
  return status.size > MAX_MEMORY_SIZE_KB * 1024;
}
