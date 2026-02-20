import {
  getFeatureConfig,
  isFeatureEnabled,
} from "../../lib/config"
import {
  gsdLogsCollectTool,
} from "./tools/logs-collect"
import {
  gsdPlaywrightExecuteTool,
} from "./tools/playwright-execute"
import {
  gsdRunCreateTool,
} from "./tools/run-create"
import {
  gsdRunFinalizeTool,
} from "./tools/run-finalize"
import {
  gsdServerStartTool,
} from "./tools/server-start"
import {
  gsdServerStopOwnedTool,
} from "./tools/server-stop-owned"
import {
  gsdServerWaitReadyTool,
} from "./tools/server-wait-ready"
import type {
  GsdValidationFeatureConfig,
} from "./types"

function resolveFeatureConfig(): GsdValidationFeatureConfig {
  const raw = getFeatureConfig("gsdValidation") as Partial<GsdValidationFeatureConfig>

  return {
    enabled: raw.enabled ?? true,
    default_mode: raw.default_mode ?? "full",
    require_gap_gate: raw.require_gap_gate ?? true,
    readiness_timeout_ms: raw.readiness_timeout_ms ?? 30000,
  }
}

export default async function plugin() {
  if (!isFeatureEnabled("gsdValidation")) {
    return {
      tool: [],
    }
  }

  const config = resolveFeatureConfig()

  return {
    tool: [
      ["gsd-run-create", gsdRunCreateTool],
      ["gsd-server-start", gsdServerStartTool],
      ["gsd-server-wait-ready", gsdServerWaitReadyTool],
      ["gsd-playwright-execute", gsdPlaywrightExecuteTool],
      ["gsd-logs-collect", gsdLogsCollectTool],
      ["gsd-server-stop-owned", gsdServerStopOwnedTool],
      ["gsd-run-finalize", gsdRunFinalizeTool],
    ],
    metadata: {
      feature: "gsdValidation",
      mode: config.default_mode,
    },
  }
}
