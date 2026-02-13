#!/bin/bash

# ============================================
#  Phase 2: Validation
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/workflow-config.json"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}[VALIDATE]${NC} Starting validation phase..."

# Load configuration
VALIDATION_CONFIG=$(jq '.validation' "$CONFIG_FILE")
STRICT=$(echo "$VALIDATION_CONFIG" | jq -r '.strict')
FAIL_FAST=$(echo "$VALIDATION_CONFIG" | jq -r '.fail_fast')

# Update state
OUTPUT_PATH=$(jq -r '.output.path' "$CONFIG_FILE")
STATE_FILE="$OUTPUT_PATH/workflow-state.json"
jq '.phase = "validate" | .status = "in_progress"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

# Validation rules
RULES=$(echo "$VALIDATION_CONFIG" | jq -r '.rules')

echo -e "${YELLOW}[VALIDATE]${NC} Running validation rules..."

# Check dependencies
if [[ $(echo "$RULES" | jq -r '.check_dependencies') == "true" ]]; then
  echo -e "${YELLOW}[VALIDATE]${NC} Checking dependencies..."
  if command -v jq &> /dev/null; then
    echo -e "${GREEN}[VALIDATE]${NC} ✓ jq available"
  else
    if [[ "$STRICT" == "true" ]]; then
      echo -e "${RED}[VALIDATE]${NC} ✗ jq required but not found" >&2
      jq '.status = "failed" | .error = "jq dependency not found"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"
      exit 1
    else
      echo -e "${YELLOW}[VALIDATE]${NC} ⚠ jq not found (non-strict mode)"
    fi
  fi
fi

# Check disk space
if [[ $(echo "$RULES" | jq -r '.check_disk_space') == "true" ]]; then
  echo -e "${YELLOW}[VALIDATE]${NC} Checking disk space..."
  AVAILABLE=$(df . | awk 'NR==2 {print $4}')
  if [[ $AVAILABLE -gt 1048576 ]]; then  # > 1GB
    echo -e "${GREEN}[VALIDATE]${NC} ✓ Sufficient disk space (${AVAILABLE}KB)"
  else
    echo -e "${YELLOW}[VALIDATE]${NC} ⚠ Low disk space (${AVAILABLE}KB)"
  fi
fi

# Check permissions
if [[ $(echo "$RULES" | jq -r '.check_permissions') == "true" ]]; then
  echo -e "${YELLOW}[VALIDATE]${NC} Checking permissions..."
  if [[ -r "$CONFIG_FILE" && -w "$OUTPUT_PATH" ]]; then
    echo -e "${GREEN}[VALIDATE]${NC} ✓ Permissions OK"
  else
    echo -e "${RED}[VALIDATE]${NC} ✗ Permission denied" >&2
    jq '.status = "failed" | .error = "Permission denied"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"
    exit 1
  fi
fi

# Update state on success
jq '.phase = "validate" | .status = "completed"' "$STATE_FILE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

echo -e "${GREEN}[VALIDATE]${NC} All validations passed"
exit 0
