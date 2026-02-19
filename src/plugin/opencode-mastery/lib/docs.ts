/**
 * Local documentation manager for OpenCode docs
 * Downloads and indexes docs from anomalyco/opencode GitHub repo
 */
import { $ } from "bun";
import { join } from "path";
import { existsSync, readFileSync, writeFileSync } from "fs";

const DOCS_DIR = join(process.env.HOME || "", ".ai_docs", "opencode", "docs");
const INDEX_FILE = join(process.env.HOME || "", ".ai_docs", "opencode", "memory", "index.json");
const CACHE_TTL_DAYS = 7;

interface DocEntry {
  file: string;
  title: string;
  content: string;
  keywords: string[];
}

interface DocIndex {
  version: string;
  lastUpdated: string;
  entries: DocEntry[];
  keywords: Record<string, string[]>;
}

/**
 * Check if local docs exist and are recent
 */
export async function docsNeedUpdate(): Promise<boolean> {
  if (!existsSync(DOCS_DIR)) return true;
  
  try {
    const index = await loadIndex();
    if (!index || !index.lastUpdated) return true;
    
    const lastUpdate = new Date(index.lastUpdated);
    const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceUpdate > CACHE_TTL_DAYS;
  } catch {
    return true;
  }
}

/**
 * Load the documentation index
 */
export async function loadIndex(): Promise<DocIndex | null> {
  if (!existsSync(INDEX_FILE)) return null;
  
  try {
    const content = readFileSync(INDEX_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Search local docs using fuzzy matching
 */
export async function searchLocalDocs(
  query: string,
  maxResults: number = 5
): Promise<Array<{ file: string; title: string; snippet: string; score: number }>> {
  const index = await loadIndex();
  if (!index) return [];
  
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  const results: Array<{ file: string; title: string; snippet: string; score: number }> = [];
  
  for (const entry of index.entries) {
    let score = 0;
    
    // Check title match
    if (entry.title.toLowerCase().includes(queryLower)) {
      score += 100;
    }
    
    // Check keyword matches
    for (const keyword of entry.keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 50;
      }
    }
    
    // Check content matches
    for (const word of queryWords) {
      if (entry.content.toLowerCase().includes(word)) {
        score += 10;
      }
    }
    
    if (score > 0) {
      // Extract snippet around first match
      const contentLower = entry.content.toLowerCase();
      const matchIndex = contentLower.indexOf(queryLower);
      const snippetStart = Math.max(0, matchIndex - 100);
      const snippetEnd = Math.min(entry.content.length, matchIndex + query.length + 200);
      const snippet = entry.content.slice(snippetStart, snippetEnd);
      
      results.push({
        file: entry.file,
        title: entry.title,
        snippet: snippet.trim(),
        score,
      });
    }
  }
  
  // Sort by score and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Download docs from GitHub
 */
export async function downloadDocs(force: boolean = false): Promise<{ success: boolean; count: number; path: string }> {
  const REPO_URL = "https://github.com/anomalyco/opencode";
  const TEMP_DIR = join(process.env.HMP || "/tmp", "opencode-docs-download");
  
  try {
    // Create directories
    if (!existsSync(DOCS_DIR)) {
      await $`mkdir -p ${DOCS_DIR}`.quiet();
    }
    
    // Download tarball
    await $`mkdir -p ${TEMP_DIR}`.quiet();
    await $`curl -fsSL ${REPO_URL}/tarball/main | tar xz --strip=1 -C ${TEMP_DIR}`.quiet();
    
    // Copy docs folder
    const docsSource = join(TEMP_DIR, "docs");
    await $`cp -r ${docsSource}/* ${DOCS_DIR}/`.quiet();
    
    // Count files
    const result = await $`find ${DOCS_DIR} -name "*.md" -type f | wc -l`;
    const count = parseInt(result.text().trim());
    
    // Cleanup
    await $`rm -rf ${TEMP_DIR}`.quiet();
    
    return { success: true, count, path: DOCS_DIR };
  } catch (error) {
    return { success: false, count: 0, path: DOCS_DIR };
  }
}

/**
 * Build search index from downloaded docs
 */
export async function buildIndex(): Promise<{ success: boolean; keywords: number; sections: number }> {
  const entries: DocEntry[] = [];
  const keywordMap: Record<string, string[]> = {};
  
  try {
    // Find all markdown files
    const result = await $`find ${DOCS_DIR} -name "*.md" -type f`;
    const files = result.text().trim().split("\n").filter(Boolean);
    
    for (const file of files) {
      const content = readFileSync(file, "utf-8");
      
      // Extract title from first heading
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.split("/").pop() || file;
      
      // Extract keywords from headings and code blocks
      const keywords = new Set<string>();
      const headings = content.match(/^#+\s+.+$/gm) || [];
      for (const h of headings) {
        const words = h.replace(/^#+\s+/, "").split(/\s+/);
        words.forEach(w => {
          if (w.length > 3) keywords.add(w.toLowerCase());
        });
      }
      
      const entry: DocEntry = {
        file,
        title,
        content,
        keywords: Array.from(keywords),
      };
      
      entries.push(entry);
      
      // Build keyword index
      for (const keyword of keywords) {
        if (!keywordMap[keyword]) {
          keywordMap[keyword] = [];
        }
        keywordMap[keyword].push(file);
      }
    }
    
    // Save index
    const index: DocIndex = {
      version: "1.0.0",
      lastUpdated: new Date().toISOString(),
      entries,
      keywords: keywordMap,
    };
    
    // Ensure memory directory exists
    const memoryDir = join(process.env.HOME || "", ".ai_docs", "opencode", "memory");
    if (!existsSync(memoryDir)) {
      await $`mkdir -p ${memoryDir}`.quiet();
    }
    
    writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
    
    return {
      success: true,
      keywords: Object.keys(keywordMap).length,
      sections: entries.length,
    };
  } catch (error) {
    return { success: false, keywords: 0, sections: 0 };
  }
}
