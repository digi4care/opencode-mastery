import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

import {
  computeOwnershipHash,
  getRunDir,
  isProcessAlive,
  readProcCmdline,
  readProcCwd,
  readProcessRegistry,
  readRunRecord,
  resolveProjectRoot,
  sleep,
  updateRunStatus,
  writeProcessRegistry,
} from "../runtime"

function isOwnershipValid(args: {
  runId: string
  pid: number
  cwd: string
  command: string
  ownershipHash: string
  procCwd: string | null
  procCmd: string | null
}): boolean {
  const expectedHash = computeOwnershipHash(args.runId, args.cwd, args.command)
  if (expectedHash !== args.ownershipHash) {
    return false
  }

  if (!args.procCwd || !args.procCmd) {
    return false
  }

  const cwdMatches = args.procCwd === args.cwd
  const cmdMatches =
    args.procCmd.includes(args.command) ||
    args.procCmd.includes(args.command.trim().split(/\s+/)[0] ?? "")

  return cwdMatches && cmdMatches
}

function sendSignal(target: number, signal: NodeJS.Signals): boolean {
  try {
    process.kill(target, signal)
    return true
  } catch {
    return false
  }
}

async function waitUntilStopped(pid: number, timeoutMs: number): Promise<boolean> {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (!isProcessAlive(pid)) {
      return true
    }
    await sleep(100)
  }
  return !isProcessAlive(pid)
}

export const gsdServerStopOwnedTool = tool(
  z.object({
    runId: z.string().min(1),
    graceMs: z.number().int().positive().default(3000),
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

    const records = await readProcessRegistry(runDir)
    const stopped: number[] = []
    const skipped: Array<{ pid: number; reason: string }> = []
    const updated = [...records]

    for (let i = 0; i < updated.length; i += 1) {
      const record = updated[i]
      if (!record || record.stoppedAt || record.ownerRunId !== args.runId) {
        continue
      }

      if (!isProcessAlive(record.pid)) {
        record.stoppedAt = new Date().toISOString()
        record.stopReason = "already-exited"
        skipped.push({ pid: record.pid, reason: "already-exited" })
        continue
      }

      const procCwd = await readProcCwd(record.pid)
      const procCmd = await readProcCmdline(record.pid)
      const valid = isOwnershipValid({
        runId: args.runId,
        pid: record.pid,
        cwd: record.cwd,
        command: record.command,
        ownershipHash: record.ownershipHash,
        procCwd,
        procCmd,
      })

      if (!valid) {
        skipped.push({
          pid: record.pid,
          reason: "ownership-validation-failed",
        })
        continue
      }

      const groupTarget = record.pgid ? -record.pgid : record.pid
      const termSent = sendSignal(groupTarget, "SIGTERM") || sendSignal(record.pid, "SIGTERM")
      if (!termSent) {
        skipped.push({ pid: record.pid, reason: "sigterm-failed" })
        continue
      }

      let ended = await waitUntilStopped(record.pid, args.graceMs)
      if (!ended) {
        const killSent = sendSignal(groupTarget, "SIGKILL") || sendSignal(record.pid, "SIGKILL")
        if (!killSent) {
          skipped.push({ pid: record.pid, reason: "sigkill-failed" })
          continue
        }
        ended = await waitUntilStopped(record.pid, 1500)
      }

      if (ended) {
        record.stoppedAt = new Date().toISOString()
        record.stopReason = "stopped-owned"
        stopped.push(record.pid)
      } else {
        skipped.push({ pid: record.pid, reason: "stop-timeout" })
      }
    }

    await writeProcessRegistry(runDir, updated)
    if (skipped.length > 0) {
      await updateRunStatus(
        runDir,
        runRecord.status,
        `Teardown finished with ${skipped.length} skipped process(es)`,
      )
    }

    return {
      success: true,
      data: {
        stopped,
        skipped,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId: args.runId,
        warnings: skipped.length > 0 ? ["Some processes were skipped for safety"] : undefined,
      },
    }
  },
).describe("Stop only processes owned by the current validation run")
