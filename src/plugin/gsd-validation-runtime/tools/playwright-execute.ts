import { tool } from "@opencode-ai/plugin"
import { spawn } from "node:child_process"
import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { z } from "zod"

import {
  getRunDir,
  readRunRecord,
  resolveProjectPath,
  resolveProjectRoot,
  updateRunStatus,
  writeJsonFile,
} from "../runtime"

interface PlaywrightSummary {
  passed: number
  failed: number
  skipped: number
}

function quote(value: string): string {
  return `"${value.replaceAll('"', '\\"')}"`
}

function parseSummary(stdout: string, exitCode: number): PlaywrightSummary {
  const firstIndex = stdout.indexOf("{")
  const lastIndex = stdout.lastIndexOf("}")

  if (firstIndex >= 0 && lastIndex > firstIndex) {
    const jsonCandidate = stdout.slice(firstIndex, lastIndex + 1)
    try {
      const parsed = JSON.parse(jsonCandidate) as {
        stats?: {
          expected?: number
          unexpected?: number
          skipped?: number
        }
      }

      return {
        passed: parsed.stats?.expected ?? 0,
        failed: parsed.stats?.unexpected ?? 0,
        skipped: parsed.stats?.skipped ?? 0,
      }
    } catch {
      // fallback below
    }
  }

  return {
    passed: exitCode === 0 ? 1 : 0,
    failed: exitCode === 0 ? 0 : 1,
    skipped: 0,
  }
}

export const gsdPlaywrightExecuteTool = tool(
  z.object({
    runId: z.string().min(1),
    phase: z.string().min(1),
    baseUrl: z.string().url(),
    scenarioSource: z.string().min(1),
    visual: z.boolean().default(true),
    trace: z.boolean().default(true),
    projectRoot: z.string().optional(),
    command: z.string().optional(),
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

    const scenarioPath = resolveProjectPath(projectRoot, args.scenarioSource)
    if (!existsSync(scenarioPath)) {
      return {
        success: false,
        error: `Scenario source does not exist: ${scenarioPath}`,
      }
    }

    const playwrightDir = join(runDir, "playwright")
    const outputDir = join(playwrightDir, "output")
    await mkdir(playwrightDir, { recursive: true })
    await mkdir(outputDir, { recursive: true })

    const stdoutPath = join(playwrightDir, "playwright-stdout.log")
    const stderrPath = join(playwrightDir, "playwright-stderr.log")
    const consolePath = join(playwrightDir, "console.json")
    const networkPath = join(playwrightDir, "network.json")

    const command =
      args.command ??
      [
        "bunx playwright test",
        quote(scenarioPath),
        "--reporter=json",
        `--output ${quote(outputDir)}`,
        args.trace ? "--trace on" : "--trace off",
      ].join(" ")

    const child = spawn(command, {
      cwd: projectRoot,
      shell: true,
      env: {
        ...process.env,
        BASE_URL: args.baseUrl,
        GSD_VALIDATION_MODE: args.visual ? "visual" : "headless",
      },
      stdio: ["ignore", "pipe", "pipe"],
    })

    let stdout = ""
    let stderr = ""

    if (child.stdout) {
      child.stdout.on("data", (chunk: Buffer | string) => {
        stdout += chunk.toString("utf-8")
      })
    }

    if (child.stderr) {
      child.stderr.on("data", (chunk: Buffer | string) => {
        stderr += chunk.toString("utf-8")
      })
    }

    const exitCode = await new Promise<number>((resolvePromise) => {
      child.on("close", (code) => {
        resolvePromise(code ?? 1)
      })
      child.on("error", () => {
        resolvePromise(1)
      })
    })

    await writeFile(stdoutPath, stdout, "utf-8")
    await writeFile(stderrPath, stderr, "utf-8")

    const summary = parseSummary(stdout, exitCode)

    if (!existsSync(consolePath)) {
      await writeJsonFile(consolePath, {
        note: "No console artifact emitted by test scenario",
        events: [],
      })
    }

    if (!existsSync(networkPath)) {
      await writeJsonFile(networkPath, {
        note: "No network artifact emitted by test scenario",
        events: [],
      })
    }

    if (exitCode !== 0) {
      await updateRunStatus(runDir, "failed", `Playwright execution failed with exit code ${exitCode}`)
    }

    return {
      success: exitCode === 0,
      error: exitCode === 0 ? undefined : `Playwright command failed with exit code ${exitCode}`,
      data: {
        summary,
        artifactDir: playwrightDir,
        consolePath,
        networkPath,
        stdoutPath,
        stderrPath,
        command,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
        warnings:
          args.visual
            ? undefined
            : ["Visual mode disabled; snapshot evidence may be limited"],
      },
    }
  },
).describe("Execute browser flow validation with Playwright artifacts")
