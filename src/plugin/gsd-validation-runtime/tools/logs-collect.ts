import { tool } from "@opencode-ai/plugin"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { z } from "zod"

import {
  getRunDir,
  listServerLogs,
  readRunRecord,
  resolveProjectPath,
  resolveProjectRoot,
  writeJsonFile,
} from "../runtime"

const DEFAULT_PATTERNS = [
  "error",
  "exception",
  "fatal",
  "panic",
  "failed",
  "timeout",
  "5xx",
  "500",
  "502",
  "503",
  "504",
]

function determineSeverity(message: string): "critical" | "high" | "medium" | "low" {
  const normalized = message.toLowerCase()
  if (normalized.includes("panic") || normalized.includes("fatal")) {
    return "critical"
  }

  if (
    normalized.includes("exception") ||
    normalized.includes("error") ||
    normalized.includes("503") ||
    normalized.includes("504")
  ) {
    return "high"
  }

  if (normalized.includes("failed") || normalized.includes("timeout")) {
    return "medium"
  }

  return "low"
}

function createRegexList(patterns: string[]): RegExp[] {
  return patterns.map((pattern) => new RegExp(pattern, "i"))
}

export const gsdLogsCollectTool = tool(
  z.object({
    runId: z.string().min(1),
    sources: z.array(z.string().min(1)).default([]),
    patterns: z.array(z.string().min(1)).default([]),
    projectRoot: z.string().optional(),
  }),
  async (args) => {
    const startedAt = Date.now()
    const projectRoot = resolveProjectRoot(args.projectRoot)
    const runDir = getRunDir(projectRoot, args.runId)

    const runRecord = await readRunRecord(runDir)
    if (!runRecord) {
      return {
        success: false,
        error: `Run not found for runId ${args.runId}. Execute gsd-run-create first.`,
      }
    }

    const serverLogs = await listServerLogs(runDir)
    const autoSources = [
      ...serverLogs,
      join(runDir, "playwright", "playwright-stdout.log"),
      join(runDir, "playwright", "playwright-stderr.log"),
      join(runDir, "playwright", "console.json"),
      join(runDir, "playwright", "network.json"),
    ]

    const userSources = args.sources.map((source) => resolveProjectPath(projectRoot, source))
    const allSources = [...new Set([...autoSources, ...userSources])].filter((filePath) =>
      existsSync(filePath),
    )

    const patternList = args.patterns.length > 0 ? args.patterns : DEFAULT_PATTERNS
    const regexes = createRegexList(patternList)

    const issues: Array<{
      source: string
      severity: "critical" | "high" | "medium" | "low"
      message: string
      evidence: string
    }> = []

    for (const source of allSources) {
      const content = await readFile(source, "utf-8")
      const lines = content.split(/\r?\n/)

      lines.forEach((line, index) => {
        const trimmed = line.trim()
        if (trimmed.length === 0) {
          return
        }

        const matches = regexes.some((regex) => regex.test(trimmed))
        if (!matches) {
          return
        }

        issues.push({
          source,
          severity: determineSeverity(trimmed),
          message: `${basename(source)}:${index + 1}`,
          evidence: trimmed,
        })
      })
    }

    const logIndexPath = join(runDir, "log-index.json")
    await writeJsonFile(logIndexPath, {
      runId: args.runId,
      generatedAt: new Date().toISOString(),
      scannedFiles: allSources,
      patternList,
      issueCount: issues.length,
      issues,
    })

    return {
      success: true,
      data: {
        issues,
        logIndexPath,
        scannedFiles: allSources,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
        warnings:
          allSources.length === 0
            ? ["No log sources found to scan"]
            : undefined,
      },
    }
  },
).describe("Collect and summarize validation logs")
