/**
 * Trace Root Cause
 * 
 * Analyzes error messages and stack traces to identify root cause.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const traceRootCause = tool(
  z.object({
    errorMessage: z.string().describe("The error message"),
    stackTrace: z.string().optional().describe("Full stack trace if available"),
    context: z.string().optional().describe("Additional context about what was happening"),
  }),
  async (args) => {
    // Parse error message for key information
    const errorType = extractErrorType(args.errorMessage);
    const errorLocation = extractErrorLocation(args.stackTrace || args.errorMessage);
    
    return {
      success: true,
      data: {
        errorType,
        errorLocation,
        analysis: {
          message: args.errorMessage,
          probableCause: suggestCause(errorType, args.errorMessage),
          suggestedFix: suggestFix(errorType, args.errorMessage),
        },
      },
      metadata: {
        hasStackTrace: !!args.stackTrace,
        hasContext: !!args.context,
      },
    };
  }
).describe("Analyze error message and stack trace to identify probable root cause.");

function extractErrorType(message: string): string {
  if (message.includes("TypeError")) return "TypeError";
  if (message.includes("ReferenceError")) return "ReferenceError";
  if (message.includes("SyntaxError")) return "SyntaxError";
  if (message.includes("AssertionError")) return "AssertionError";
  if (message.includes("ENOENT")) return "FileNotFound";
  if (message.includes("ECONNREFUSED")) return "ConnectionRefused";
  return "Unknown";
}

function extractErrorLocation(trace: string): string | null {
  const match = trace.match(/at .+ \((.+):(\d+):(\d+)\)/);
  return match ? `${match[1]}:${match[2]}` : null;
}

function suggestCause(type: string, message: string): string {
  const causes: Record<string, string> = {
    TypeError: "Variable is undefined or has wrong type",
    ReferenceError: "Variable or function is not defined",
    SyntaxError: "Code has syntax errors",
    AssertionError: "Test assertion failed",
    FileNotFound: "File path is incorrect or file doesn't exist",
    ConnectionRefused: "Service is not running or wrong port/host",
  };
  return causes[type] || "Unknown cause";
}

function suggestFix(type: string, message: string): string {
  const fixes: Record<string, string> = {
    TypeError: "Check if variable exists before using it. Add null checks.",
    ReferenceError: "Check spelling and import statements.",
    SyntaxError: "Check for missing brackets, quotes, or semicolons.",
    AssertionError: "Compare expected vs actual values in test.",
    FileNotFound: "Verify file path and check if file exists.",
    ConnectionRefused: "Check if service is running and port is correct.",
  };
  return fixes[type] || "Review error message for clues.";
}
