import { tool } from "@opencode-ai/plugin"
import { spawn } from "node:child_process"
import { z } from "zod"

import {
  appendLogLine,
  computeOwnershipHash,
  ensureRunDirStructure,
  getRunDir,
  getServerLogPath,
  normalizeReadiness,
  nowIso,
  readRunRecord,
  resolveProjectPath,
  resolveProjectRoot,
  upsertProcessRecord,
  writeRunRecord,
} from "../runtime"

export const gsdServerStartTool = tool(
  z.object({
    runId: z.string().min(1),
    name: z.string().min(1),
    command: z.string().min(1),
    cwd: z.string().min(1),
    port: z.number().int().positive().optional(),
    env: z.record(z.string()).optional(),
    readiness: z
      .object({
        type: z.enum(["http", "tcp", "log"]),
        target: z.string().min(1),
        timeoutMs: z.number().int().positive().default(30000),
      })
      .optional(),
    projectRoot: z.string().optional(),
    defaultTimeoutMs: z.number().int().positive().default(30000),
  }),
  async (args) => {
    const startedAt = Date.now()
    const projectRoot = resolveProjectRoot(args.projectRoot)
    const runDir = getRunDir(projectRoot, args.runId)

    await ensureRunDirStructure(runDir)

    const runRecord = await readRunRecord(runDir)
    if (!runRecord) {
      return {
        success: false,
        error: `Run not found for runId ${args.runId}. Execute gsd-run-create first.`,
      }
    }

    const cwd = resolveProjectPath(projectRoot, args.cwd)
    const logPath = getServerLogPath(runDir, args.name)

    const child = spawn(args.command, {
      cwd,
      env: {
        ...process.env,
        ...(args.env ?? {}),
      },
      shell: true,
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    })

    if (!child.pid) {
      return {
        success: false,
        error: `Failed to start server '${args.name}'`,
      }
    }

    const pid = child.pid
    const pgid = child.pid
    const ownershipHash = computeOwnershipHash(args.runId, cwd, args.command)
    const readiness = normalizeReadiness(
      args.readiness,
      args.port,
      args.defaultTimeoutMs,
    )

    if (child.stdout) {
      child.stdout.on("data", (chunk: Buffer | string) => {
        const line = chunk.toString("utf-8").trimEnd()
        if (line.length > 0) {
          void appendLogLine(logPath, `[stdout] ${line}`)
        }
      })
    }

    if (child.stderr) {
      child.stderr.on("data", (chunk: Buffer | string) => {
        const line = chunk.toString("utf-8").trimEnd()
        if (line.length > 0) {
          void appendLogLine(logPath, `[stderr] ${line}`)
        }
      })
    }

    child.on("error", (error) => {
      void appendLogLine(logPath, `[spawn-error] ${error.message}`)
    })

    child.on("exit", (code, signal) => {
      void appendLogLine(logPath, `[exit] code=${code ?? "null"} signal=${signal ?? "null"}`)
    })

    child.unref()

    await upsertProcessRecord(runDir, {
      name: args.name,
      pid,
      pgid,
      command: args.command,
      cwd,
      port: args.port,
      logPath,
      ownerRunId: args.runId,
      ownershipHash,
      readiness,
      startedAt: nowIso(),
    })

    runRecord.updatedAt = nowIso()
    runRecord.notes.push(`Started server '${args.name}' (pid ${pid})`)
    await writeRunRecord(runDir, runRecord)

    return {
      success: true,
      data: {
        runId: args.runId,
        name: args.name,
        pid,
        pgid,
        port: args.port,
        cwd,
        logPath,
        ownershipHash,
        readiness,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
      },
    }
  },
).describe("Start and register a run-owned server process")
