import { tool } from "@opencode-ai/plugin"
import { z } from "zod"

import {
  buildRunId,
  defaultRunRecord,
  ensureRunDirStructure,
  getRunDir,
  nowIso,
  readRunRecord,
  resolveProjectRoot,
  writeRunRecord,
} from "../runtime"

export const gsdRunCreateTool = tool(
  z.object({
    phase: z.string().min(1),
    mode: z.enum(["quick", "full"]).default("full"),
    projectRoot: z.string().optional(),
    requestedRunId: z.string().min(1).optional(),
  }),
  async (args) => {
    const startedAt = Date.now()
    const projectRoot = resolveProjectRoot(args.projectRoot)
    const runId = args.requestedRunId ?? buildRunId(args.phase)
    const runDir = getRunDir(projectRoot, runId)

    await ensureRunDirStructure(runDir)

    const existing = await readRunRecord(runDir)
    if (existing) {
      return {
        success: true,
        data: {
          runId,
          runDir,
          projectRoot,
          phase: existing.phase,
          mode: existing.mode,
          resumed: true,
          createdAt: existing.startedAt,
          updatedAt: existing.updatedAt,
        },
        metadata: {
          durationMs: Date.now() - startedAt,
          runId,
        },
      }
    }

    const record = defaultRunRecord({
      runId,
      phase: args.phase,
      mode: args.mode,
      projectRoot,
      runDir,
    })

    record.notes.push("Run initialized via gsd-run-create")
    record.updatedAt = nowIso()
    await writeRunRecord(runDir, record)

    return {
      success: true,
      data: {
        runId,
        runDir,
        projectRoot,
        phase: args.phase,
        mode: args.mode,
        resumed: false,
        createdAt: record.startedAt,
      },
      metadata: {
        durationMs: Date.now() - startedAt,
        runId,
      },
    }
  },
).describe("Create a validation run workspace and metadata")
