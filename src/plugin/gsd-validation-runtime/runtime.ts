import { createHash, randomUUID } from "node:crypto"
import { existsSync } from "node:fs"
import {
  appendFile,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises"
import { isAbsolute, join, normalize, relative, resolve } from "node:path"
import net from "node:net"

import type {
  ProcessReadiness,
  ProcessRecord,
  RunRecord,
  ValidationMode,
  ValidationStatus,
} from "./types"

const RUNS_DIR_REL = ".tmp/gsd-runs"
const PROCESS_REGISTRY_FILE = "processes.json"

export function nowIso(): string {
  return new Date().toISOString()
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolvePromise) => {
    setTimeout(resolvePromise, ms)
  })
}

export function resolveProjectRoot(projectRoot?: string): string {
  return resolve(projectRoot ?? process.cwd())
}

export function ensureWithinRoot(projectRoot: string, targetPath: string): string {
  const root = resolve(projectRoot)
  const target = resolve(targetPath)
  const rel = relative(root, target)

  if (rel.startsWith("..") || rel.includes(`..${normalize("/")}`)) {
    throw new Error(`Path escapes project root: ${target}`)
  }

  return target
}

export function resolveProjectPath(projectRoot: string, inputPath: string): string {
  const target = isAbsolute(inputPath)
    ? resolve(inputPath)
    : resolve(projectRoot, inputPath)

  return ensureWithinRoot(projectRoot, target)
}

export function sanitizeSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
}

export function buildRunId(phase: string): string {
  const phasePart = sanitizeSegment(phase) || "phase"
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14)
  const suffix = randomUUID().slice(0, 8)
  return `${phasePart}-${stamp}-${suffix}`
}

export function getRunDir(projectRoot: string, runId: string): string {
  const root = resolveProjectRoot(projectRoot)
  return join(root, RUNS_DIR_REL, runId)
}

export function getRunFilePath(runDir: string): string {
  return join(runDir, "run.json")
}

export function getProcessRegistryPath(runDir: string): string {
  return join(runDir, PROCESS_REGISTRY_FILE)
}

export function getServerLogPath(runDir: string, serverName: string): string {
  return join(runDir, "servers", `${sanitizeSegment(serverName) || "server"}.log`)
}

export async function ensureRunDirStructure(runDir: string): Promise<void> {
  await mkdir(runDir, { recursive: true })
  await mkdir(join(runDir, "servers"), { recursive: true })
  await mkdir(join(runDir, "playwright"), { recursive: true })
}

export async function readJsonFile<T>(
  filePath: string,
  fallback: T,
): Promise<T> {
  if (!existsSync(filePath)) {
    return fallback
  }

  try {
    const raw = await readFile(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  const payload = JSON.stringify(value, null, 2)
  await writeFile(filePath, `${payload}\n`, "utf-8")
}

export async function appendLogLine(logPath: string, line: string): Promise<void> {
  const entry = `[${nowIso()}] ${line}\n`
  await appendFile(logPath, entry, "utf-8")
}

export function computeOwnershipHash(runId: string, cwd: string, command: string): string {
  const hash = createHash("sha256")
  hash.update(runId)
  hash.update("|")
  hash.update(resolve(cwd))
  hash.update("|")
  hash.update(command.trim())
  return hash.digest("hex")
}

export async function readRunRecord(runDir: string): Promise<RunRecord | null> {
  const filePath = getRunFilePath(runDir)
  return readJsonFile<RunRecord | null>(filePath, null)
}

export async function writeRunRecord(runDir: string, record: RunRecord): Promise<void> {
  await writeJsonFile(getRunFilePath(runDir), record)
}

export async function updateRunStatus(
  runDir: string,
  status: ValidationStatus,
  note?: string,
): Promise<RunRecord | null> {
  const existing = await readRunRecord(runDir)
  if (!existing) {
    return null
  }

  const updated: RunRecord = {
    ...existing,
    status,
    updatedAt: nowIso(),
    notes: note ? [...existing.notes, note] : existing.notes,
    finishedAt:
      status === "passed" || status === "failed" || status === "blocked"
        ? nowIso()
        : existing.finishedAt,
  }

  await writeRunRecord(runDir, updated)
  return updated
}

export async function readProcessRegistry(runDir: string): Promise<ProcessRecord[]> {
  return readJsonFile<ProcessRecord[]>(getProcessRegistryPath(runDir), [])
}

export async function writeProcessRegistry(
  runDir: string,
  records: ProcessRecord[],
): Promise<void> {
  await writeJsonFile(getProcessRegistryPath(runDir), records)
}

export async function upsertProcessRecord(
  runDir: string,
  record: ProcessRecord,
): Promise<ProcessRecord[]> {
  const existing = await readProcessRegistry(runDir)
  const next = existing.filter((item) => !(item.name === record.name && !item.stoppedAt))
  next.push(record)
  await writeProcessRegistry(runDir, next)
  return next
}

export function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

export async function readProcCmdline(pid: number): Promise<string | null> {
  const filePath = `/proc/${pid}/cmdline`
  if (!existsSync(filePath)) {
    return null
  }

  try {
    const raw = await readFile(filePath)
    return raw.toString("utf-8").split("\u0000").filter(Boolean).join(" ")
  } catch {
    return null
  }
}

export async function readProcCwd(pid: number): Promise<string | null> {
  const linkPath = `/proc/${pid}/cwd`
  if (!existsSync(linkPath)) {
    return null
  }

  try {
    const fs = await import("node:fs/promises")
    return await fs.realpath(linkPath)
  } catch {
    return null
  }
}

export function parseTcpTarget(target: string): { host: string; port: number } {
  const [hostPart, portPart] = target.split(":")
  const host = hostPart || "127.0.0.1"
  const port = Number(portPart)

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`Invalid tcp target: ${target}`)
  }

  return { host, port }
}

export async function checkTcpReady(target: string, timeoutMs: number): Promise<boolean> {
  const { host, port } = parseTcpTarget(target)

  return new Promise((resolvePromise) => {
    const socket = net.createConnection({ host, port })
    const timer = setTimeout(() => {
      socket.destroy()
      resolvePromise(false)
    }, timeoutMs)

    socket.on("connect", () => {
      clearTimeout(timer)
      socket.end()
      resolvePromise(true)
    })

    socket.on("error", () => {
      clearTimeout(timer)
      resolvePromise(false)
    })
  })
}

export async function checkHttpReady(target: string, timeoutMs: number): Promise<boolean> {
  const controller = new AbortController()
  const timer = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    const response = await fetch(target, {
      signal: controller.signal,
      method: "GET",
    })
    return response.status < 500
  } catch {
    return false
  } finally {
    clearTimeout(timer)
  }
}

export async function checkLogReady(logPath: string, marker: string): Promise<boolean> {
  if (!existsSync(logPath)) {
    return false
  }

  try {
    const content = await readFile(logPath, "utf-8")
    return content.includes(marker)
  } catch {
    return false
  }
}

export async function listServerLogs(runDir: string): Promise<string[]> {
  const serversDir = join(runDir, "servers")
  if (!existsSync(serversDir)) {
    return []
  }

  const entries = await readdir(serversDir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".log"))
    .map((entry) => join(serversDir, entry.name))
}

export function defaultRunRecord(input: {
  runId: string
  phase: string
  mode: ValidationMode
  projectRoot: string
  runDir: string
}): RunRecord {
  const stamp = nowIso()

  return {
    runId: input.runId,
    phase: input.phase,
    mode: input.mode,
    projectRoot: input.projectRoot,
    runDir: input.runDir,
    status: "running",
    startedAt: stamp,
    updatedAt: stamp,
    notes: [],
  }
}

export function normalizeReadiness(
  readiness: ProcessReadiness | undefined,
  port: number | undefined,
  timeoutMs: number,
): ProcessReadiness | undefined {
  if (readiness) {
    return {
      type: readiness.type,
      target: readiness.target,
      timeoutMs: readiness.timeoutMs,
    }
  }

  if (!port) {
    return undefined
  }

  return {
    type: "tcp",
    target: `127.0.0.1:${port}`,
    timeoutMs,
  }
}
