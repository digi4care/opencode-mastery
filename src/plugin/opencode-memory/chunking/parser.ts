/**
 * Markdown parsing with accurate line position tracking.
 * Uses mdast (Markdown Abstract Syntax Tree) for semantic boundary detection.
 */
import { fromMarkdown } from "mdast-util-from-markdown";
import { visit } from "unist-util-visit";
import type { Nodes, Position } from "mdast-util-from-markdown/lib";

/**
 * Semantic boundary in markdown content.
 * Represents a discrete unit that should not be split mid-way.
 */
export interface SemanticBoundary {
  type: "heading" | "paragraph" | "code" | "list" | "blockquote" | "thematicBreak";
  startLine: number;
  endLine: number;
  startOffset: number;
  endOffset: number;
  text: string;
  level?: number; // For headings: 1-6
  lang?: string; // For code blocks: language identifier
}

/**
 * Parse markdown content and extract semantic boundaries.
 * Each boundary represents a structural element with line positions.
 * 
 * @param content - Raw markdown content
 * @returns Array of semantic boundaries with line info
 */
export function extractBoundaries(content: string): SemanticBoundary[] {
  const tree = fromMarkdown(content);
  const boundaries: SemanticBoundary[] = [];

  visit(tree, (node) => {
    // Only process nodes with position info
    if (!node.position) return;

    // Extract boundaries for structural elements
    if (
      node.type === "heading" ||
      node.type === "paragraph" ||
      node.type === "code" ||
      node.type === "list" ||
      node.type === "blockquote" ||
      node.type === "thematicBreak"
    ) {
      const pos = node.position;
      const text = content.slice(pos.start.offset ?? 0, pos.end.offset ?? 0);

      const boundary: SemanticBoundary = {
        type: node.type as SemanticBoundary["type"],
        startLine: pos.start.line,
        endLine: pos.end.line,
        startOffset: pos.start.offset ?? 0,
        endOffset: pos.end.offset ?? 0,
        text,
      };

      // Add heading level
      if (node.type === "heading" && "depth" in node) {
        boundary.level = node.depth;
      }

      // Add code language
      if (node.type === "code" && "lang" in node && node.lang) {
        boundary.lang = node.lang;
      }

      boundaries.push(boundary);
    }
  });

  return boundaries;
}

/**
 * Parse markdown to AST (for advanced usage).
 * Returns full mdast tree with position info.
 */
export function parseMarkdown(content: string): Nodes {
  return fromMarkdown(content);
}

/**
 * Get the line range for a specific section by heading.
 * Useful for extracting specific sections from MEMORY.md.
 * 
 * @param content - Raw markdown content
 * @param headingText - Heading text to find (without #)
 * @returns Line range or null if not found
 */
export function getSectionLineRange(
  content: string,
  headingText: string
): { startLine: number; endLine: number } | null {
  const boundaries = extractBoundaries(content);
  const targetHeading = boundaries.find(
    (b) => b.type === "heading" && b.text.toLowerCase().includes(headingText.toLowerCase())
  );

  if (!targetHeading) return null;

  // Find next heading at same or higher level to determine end
  const headingLevel = targetHeading.level ?? 1;
  const startIdx = boundaries.indexOf(targetHeading);

  for (let i = startIdx + 1; i < boundaries.length; i++) {
    const b = boundaries[i];
    if (b.type === "heading" && (b.level ?? 6) <= headingLevel) {
      return { startLine: targetHeading.startLine, endLine: b.startLine - 1 };
    }
  }

  // No next heading, goes to end of document
  return { startLine: targetHeading.startLine, endLine: boundaries[boundaries.length - 1].endLine };
}
