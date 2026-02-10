#!/bin/bash

# ============================================
#  Phase 1: Initialization
# ============================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/workflow-config.json"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}[INIT]${NC} Starting initialization phase..."

# Load configuration
MODE=$(jq -r '.mode' "$CONFIG_FILE")
OUTPUT_PATH=$(jq -r '.output.path' "$CONFIG_FILE")

# Create output directory
mkdir -p "$OUTPUT_PATH"
echo -e "${GREEN}[INIT]${NC} Created output directory: $OUTPUT_PATH"

# Initialize state file
STATE_FILE="$OUTPUT_PATH/workflow-state.json"
echo "{\"phase\": \"init\", \"mode\": \"$MODE\", \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\", \"status\": \"completed\"}" > "$STATE_FILE"
echo -e "${GREEN}[INIT]${NC} State initialized: $STATE_FILE"

# Load dependencies
echo -e "${GREEN}[INIT]${NC} Checking dependencies..."
if command -v jq &> /dev/null; then
  echo -e "${GREEN}[INIT]${NC} ✓ jq found"
else
  echo "✗ jq not found" >&2
  exit 1
fi

# Setup environment
echo -e "${GREEN}[INIT]${NC} Environment setup complete"

echo -e "${GREEN}[INIT]${NC} Initialization phase completed successfully"
exit 0
