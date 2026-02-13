#!/bin/bash

# ============================================
#  Phase 4: Finalization
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/workflow-config.json"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}[FINALIZE]${NC} Starting finalization phase..."

# Load configuration
OUTPUT_PATH=$(jq -r '.output.path' "$CONFIG_FILE")
COMPRESSION=$(jq -r '.output.compression' "$CONFIG_FILE")

# Update state
STATE_FILE="$OUTPUT_PATH/workflow-state.json"
jq '.phase = "finalize" | .status = "in_progress"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Generate summary report
REPORT_FILE="${OUTPUT_PATH}/workflow-report.txt"

cat > "$REPORT_FILE" << EOF
 ========================================
   Workflow Execution Report
 ========================================

Start Time: $(jq -r '.timestamp' "$STATE_FILE")
End Time: $(date -u +%Y-%m-%dT%H:%M:%SZ)
Mode: $(jq -r '.mode' "$STATE_FILE")

Phases Completed:
  ✓ Initialization
  ✓ Validation
  ✓ Execution
  ✓ Finalization

Output File: $(jq -r '.output_file // "none"' "$STATE_FILE")

Status: SUCCESS

 ========================================
