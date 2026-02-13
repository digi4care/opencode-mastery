#!/bin/bash

# ============================================
#  Phase 3: Execution
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/workflow-config.json"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}[EXECUTE]${NC} Starting execution phase..."

# Load configuration
MODE=$(jq -r '.mode' "$CONFIG_FILE")
OUTPUT_PATH=$(jq -r '.output.path' "$CONFIG_FILE")

# Update state
STATE_FILE="$OUTPUT_PATH/workflow-state.json"
jq '.phase = "execute" | .status = "in_progress"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Determine workload based on mode
case "$MODE" in
  development)
    WORKLOAD="light"
    DURATION=5
    ;;
  staging)
    WORKLOAD="medium"
    DURATION=10
    ;;
  production)
    WORKLOAD="heavy"
    DURATION=20
    ;;
  *)
    WORKLOAD="light"
    DURATION=5
    ;;
esac

echo -e "${YELLOW}[EXECUTE]${NC} Processing $WORKLOAD workload ($DURATION seconds)..."
sleep "$DURATION"

# Generate output
OUTPUT_FILE="${OUTPUT_PATH}/workflow-result-$(date +%Y%m%d-%H%M%S).json"
cat > "$OUTPUT_FILE" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "mode": "$MODE",
  "workload": "$WORKLOAD",
  "duration": $DURATION,
  "status": "success",
  "data": {
    "items_processed": 100,
    "errors": 0,
    "warnings": 0
  }
}
EOF

echo -e "${GREEN}[EXECUTE]${NC} Output generated: $OUTPUT_FILE"

# Update state with output file
jq '.phase = "execute" | .status = "completed" | .output_file = "'"${OUTPUT_FILE}"'"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

echo -e "${GREEN}[EXECUTE]${NC} Execution phase completed successfully"
exit 0
