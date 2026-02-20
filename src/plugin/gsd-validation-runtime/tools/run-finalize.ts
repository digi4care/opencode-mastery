import { tool } from "@opencode-ai/plugin"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join, relative } from "node:path"
import { z } from "zod"

import {
  getRunDir,
  nowIso,
  readRunRecord,
  resolveProjectRoot,
  updateRunStatus,
  writeJsonFile,
} from "../runtime"

async function tryReadJson(filePath: string): Promise<unknown | null> {
  if (!existsSync(filePath)) {
    return null
  }

  try {
    const raw = await readFile(filePath, "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function toRelative(projectRoot: string, target: string): string {
  return relative(projectRoot, target)
}

export const gsdRunFinalizeTool = tool(
  z.object({
    runId: z.string().min(1),
    status: z.enum(["passed", "failed", "blocked"]),
    summary: z.string().min(1),
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

    const flowAnalysisPath = join(runDir, "flow-analysis.json")
    const verifyPath = join(runDir, "verify.json")
    const gateDecisionPath = join(runDir, "gate-decision.json")
    const logIndexPath = join(runDir, "log-index.json")
    const playwrightDir = join(runDir, "playwright")
    const consolePath = join(playwrightDir, "console.json")
    const networkPath = join(playwrightDir, "network.json")
    const stdoutPath = join(playwrightDir, "playwright-stdout.log")
    const stderrPath = join(playwrightDir, "playwright-stderr.log")

    const flowAnalysis = await tryReadJson(flowAnalysisPath)
    const verify = await tryReadJson(verifyPath)
    const gateDecision = await tryReadJson(gateDecisionPath)
    const logIndex = await tryReadJson(logIndexPath)

    const artifacts = {
      runDir: toRelative(projectRoot, runDir),
      flowAnalysis: existsSync(flowAnalysisPath) ? toRelative(projectRoot, flowAnalysisPath) : null,
      verify: existsSync(verifyPath) ? toRelative(projectRoot, verifyPath) : null,
      gateDecision: existsSync(gateDecisionPath) ? toRelative(projectRoot, gateDecisionPath) : null,
      logIndex: existsSync(logIndexPath) ? toRelative(projectRoot, logIndexPath) : null,
      console: existsSync(consolePath) ? toRelative(projectRoot, consolePath) : null,
      network: existsSync(networkPath) ? toRelative(projectRoot, networkPath) : null,
      playwrightStdout: existsSync(stdoutPath) ? toRelative(projectRoot, stdoutPath) : null,
      playwrightStderr: existsSync(stderrPath) ? toRelative(projectRoot, stderrPath) : null,
    }

    const finalJsonPath = join(runDir, "FINAL-VALIDATION.json")
    const finalMarkdownPath = join(runDir, "FINAL-VALIDATION.md")

    const report = {
      runId: args.runId,
      status: args.status,
      summary: args.summary,
      generatedAt: nowIso(),
      run: runRecord,
      artifacts,
      context: {
        verify,
        flowAnalysis,
        gateDecision,
        logIndex,
      },
    }

    await writeJsonFile(finalJsonPath, report)

    const markdown = [
      "# Final Validation Report",
      "",
      `- Run ID: ${args.runId}`,
      `- Status: ${args.status}`,
      `- Generated: ${report.generatedAt}`,
      "",
      "## Summary",
      "",
      args.summary,
      "",
      "## Artifacts",
      "",
      `- Run directory: \`${artifacts.runDir}\``,
      `- Verify: ${artifacts.verify ? `\`${artifacts.verify}\`` : "not-found"}`,
      `- Flow analysis: ${artifacts.flowAnalysis ? `\`${artifacts.flowAnalysis}\`` : "not-found"}`,
      `- Gate decision: ${artifacts.gateDecision ? `\`${artifacts.gateDecision}\`` : "not-found"}`,
      `- Log index: ${artifacts.logIndex ? `\`${artifacts.logIndex}\`` : "not-found"}`,
      `- Console events: ${artifacts.console ? `\`${artifacts.console}\`` : "not-found"}`,
      `- Network events: ${artifacts.network ? `\`${artifacts.network}\`` : "not-found"}`,
      `- Playwright stdout: ${artifacts.playwrightStdout ? `\`${artifacts.playwrightStdout}\`` : "not-found"}`,
      `- Playwright stderr: ${artifacts.playwrightStderr ? `\`${artifacts.playwrightStderr}\`` : "not-found"}`,
      "",
      "## Next Step",
      "",
      args.status === "passed"
        ? "Validation passed. Continue to release or integration checkpoint."
        : args.status === "blocked"
          ? "Validation blocked by gap gate. Resolve planning gaps before test rerun."
          : "Validation failed. Review artifacts and run debug/fix workflow.",
      "",
    ].join("\n")

    await writeJsonFile(join(runDir, "finalization-metadata.json"), {
      finalizedAt: report.generatedAt,
      status: args.status,
      runId: args.runId,
    })

    await import("node:fs/promises").then((fs) => fs.writeFile(finalMarkdownPath, markdown, "utf-8"))
    await updateRunStatus(runDir, args.status, `Finalized run with status '${args.status}'`)

    return {
      success: true,
      data: {
        finalMarkdownPath,
        finalJsonPath,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
      },
    }
  },
).describe("Finalize validation run and emit final report artifacts")
