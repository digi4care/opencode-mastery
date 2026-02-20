import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

import {
  checkHttpReady,
  checkLogReady,
  checkTcpReady,
  getRunDir,
  isProcessAlive,
  nowIso,
  readProcessRegistry,
  readRunRecord,
  resolveProjectRoot,
  sleep,
  updateRunStatus,
} from "../runtime"

function latestActiveByName(name: string, records: Array<{ name: string; stoppedAt?: string }>) {
  const matches = records.filter((record) => record.name === name && !record.stoppedAt)
  return matches[matches.length - 1]
}

export const gsdServerWaitReadyTool = tool(
  z.object({
    runId: z.string().min(1),
    name: z.string().min(1),
    timeoutMs: z.number().int().positive().default(30000),
    projectRoot: z.string().optional(),
    pollIntervalMs: z.number().int().min(100).max(5000).default(500),
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

    const records = await readProcessRegistry(runDir)
    const processRecord = latestActiveByName(args.name, records)

    if (!processRecord) {
      return {
        success: false,
        error: `No active process record found for server '${args.name}'`,
      }
    }

    const readiness = processRecord.readiness
    if (!readiness) {
      return {
        success: false,
        error: `No readiness strategy configured for server '${args.name}'`,
      }
    }

    const timeoutMs = Math.min(args.timeoutMs, readiness.timeoutMs)
    const deadline = Date.now() + timeoutMs
    const evidence: string[] = []

    while (Date.now() < deadline) {
      if (!isProcessAlive(processRecord.pid)) {
        evidence.push(`Process ${processRecord.pid} exited before readiness`) 
        await updateRunStatus(runDir, "failed", `Server '${args.name}' exited before readiness`)
        return {
          success: false,
          error: `Server '${args.name}' exited before readiness`,
          data: {
            runId: args.runId,
            name: args.name,
            ready: false,
            checkedAt: nowIso(),
            probeEvidence: evidence,
          },
          metadata: {
            durationMs: Date.now() - startedAt,
            runId: args.runId,
          },
        }
      }

      let ready = false
      if (readiness.type === "http") {
        ready = await checkHttpReady(readiness.target, args.pollIntervalMs)
      } else if (readiness.type === "tcp") {
        ready = await checkTcpReady(readiness.target, args.pollIntervalMs)
      } else {
        ready = await checkLogReady(processRecord.logPath, readiness.target)
      }

      evidence.push(`Probe ${readiness.type}(${readiness.target}) => ${ready ? "ready" : "not-ready"}`)

      if (ready) {
        return {
          success: true,
          data: {
            runId: args.runId,
            name: args.name,
            ready: true,
            checkedAt: nowIso(),
            probeEvidence: evidence,
          },
          metadata: {
            durationMs: Date.now() - startedAt,
            runId: args.runId,
          },
        }
      }

      await sleep(args.pollIntervalMs)
    }

    await updateRunStatus(runDir, "failed", `Readiness timeout for server '${args.name}'`)

    return {
      success: false,
      error: `Readiness timeout for server '${args.name}' after ${timeoutMs}ms`,
      data: {
        runId: args.runId,
        name: args.name,
        ready: false,
        checkedAt: nowIso(),
        probeEvidence: evidence,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
      },
    }
  },
).describe("Wait until a run-owned server is ready")
