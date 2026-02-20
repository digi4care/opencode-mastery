export type ValidationMode = "quick" | "full"
export type ValidationStatus = "running" | "passed" | "failed" | "blocked"
export type ReadinessType = "http" | "tcp" | "log"

export interface GsdValidationFeatureConfig {
  enabled: boolean
  default_mode: ValidationMode
  require_gap_gate: boolean
  readiness_timeout_ms: number
}

export interface ProcessReadiness {
  type: ReadinessType
  target: string
  timeoutMs: number
}

export interface ProcessRecord {
  name: string
  pid: number
  pgid?: number
  command: string
  cwd: string
  port?: number
  logPath: string
  ownerRunId: string
  ownershipHash: string
  readiness?: ProcessReadiness
  startedAt: string
  stoppedAt?: string
  stopReason?: string
}

export interface RunRecord {
  runId: string
  phase: string
  mode: ValidationMode
  projectRoot: string
  runDir: string
  status: ValidationStatus
  startedAt: string
  updatedAt: string
  finishedAt?: string
  notes: string[]
}

export interface LogIssue {
  source: string
  severity: "critical" | "high" | "medium" | "low"
  message: string
  evidence: string
}
