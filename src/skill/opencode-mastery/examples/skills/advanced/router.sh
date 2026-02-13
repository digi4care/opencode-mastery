#!/bin/bash

# ============================================
#  Advanced Workflow Router
#  Version: 1.0.0
# ============================================

set -euo pipefail

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/config/workflow-config.json"
SCRIPTS_DIR="${SCRIPT_DIR}/scripts"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
#  Helper Functions
# ============================================

print_header() {
  echo -e "${BLUE}============================================${NC}"
  echo -e "${BLUE}  Advanced Workflow Router${NC}"
  echo -e "${BLUE}  Version: 1.0.0${NC}"
  echo -e "${BLUE}============================================${NC}"
  echo ""
}

print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

print_info() {
  echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

show_help() {
  cat << EOF
Usage: $0 [OPTIONS]

Advanced Workflow Router - Orchestrates phase-based workflow execution

OPTIONS:
  --phase PHASE          Run specific phase (init|validate|execute|finalize)
  --mode MODE            Override execution mode (development|staging|production)
  --verbose              Enable verbose logging
  --dry-run              Simulate execution without running phases
  --parallel             Run phases in parallel (if configured)
  --help                 Show this help message

EXAMPLES:
  # Run complete workflow
  $0

  # Run specific phase
  $0 --phase init

  # Run with verbose output
  $0 --verbose

  # Simulate execution
  $0 --dry-run

PHASES:
  init      Initialize environment and load dependencies
  validate  Validate inputs and check prerequisites
  execute   Execute main business logic
  finalize  Cleanup and generate reports

EOF
}

check_dependencies() {
  local deps=("jq" "bash")
  local missing=()

  for dep in "${deps[@]}"; do
    if ! command -v "$dep" &> /dev/null; then
      missing+=("$dep")
    fi
  done

  if [[ ${#missing[@]} -gt 0 ]]; then
    print_error "Missing required dependencies: ${missing[*]}"
    exit 1
  fi
}

load_config() {
  if [[ ! -f "$CONFIG_FILE" ]]; then
    print_error "Configuration file not found: $CONFIG_FILE"
    exit 1
  fi

  CONFIG=$(cat "$CONFIG_FILE")
  MODE=$(echo "$CONFIG" | jq -r '.mode')
  VERBOSE=$(echo "$CONFIG" | jq -r '.verbose')
  CONTINUE_ON_ERROR=$(echo "$CONFIG" | jq -r '.execution.continue_on_error')
  DRY_RUN=$(echo "$CONFIG" | jq -r '.execution.dry_run')

  print_success "Configuration loaded: $MODE mode"
}

validate_phase() {
  local phase="$1"
  local valid_phases=("init" "validate" "execute" "finalize")

  for valid_phase in "${valid_phases[@]}"; do
    if [[ "$phase" == "$valid_phase" ]]; then
      return 0
    fi
  done

  return 1
}

run_phase() {
  local phase="$1"
  local phase_script="${SCRIPTS_DIR}/phase-${phase}.sh"

  # Check if phase script exists
  if [[ ! -f "$phase_script" ]]; then
    print_error "Phase script not found: $phase_script"
    return 1
  fi

  # Check if phase is enabled in config
  local enabled=$(echo "$CONFIG" | jq -r ".phases.${phase}.enabled")
  if [[ "$enabled" == "false" ]]; then
    print_info "Phase '$phase' is disabled in configuration - skipping"
    return 0
  fi

  # Dry run mode
  if [[ "$DRY_RUN" == "true" ]]; then
    print_info "[DRY RUN] Would execute phase: $phase"
    return 0
  fi

  # Execute phase
  print_info "Executing phase: $phase"

  if bash "$phase_script"; then
    print_success "Phase '$phase' completed successfully"
    return 0
  else
    print_error "Phase '$phase' failed with exit code $?"
    return 1
  fi
}

run_all_phases() {
  local phases=("init" "validate" "execute" "finalize")
  local failed_phase=""

  print_info "Starting complete workflow execution"
  echo ""

  for phase in "${phases[@]}"; do
    echo "---"
    if ! run_phase "$phase"; then
      failed_phase="$phase"

      # Check if phase is required
      local required=$(echo "$CONFIG" | jq -r ".phases.${phase}.required")
      if [[ "$required" == "true" ]]; then
        print_error "Required phase '$phase' failed - aborting workflow"
        return 1
      elif [[ "$CONTINUE_ON_ERROR" == "true" ]]; then
        print_warning "Phase '$phase' failed - continuing (continue_on_error=true)"
      else
        print_error "Phase '$phase' failed - aborting workflow"
        return 1
      fi
    fi
  done

  echo ""
  print_success "All phases completed successfully"
  return 0
}

# ============================================
#  Argument Parsing
# ============================================

PHASE=""
PARSED_MODE=""
VERBOSE_OVERRIDE=""
DRY_RUN_OVERRIDE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --phase)
      PHASE="$2"
      shift 2
      ;;
    --mode)
      PARSED_MODE="$2"
      shift 2
      ;;
    --verbose)
      VERBOSE_OVERRIDE="true"
      shift
      ;;
    --dry-run)
      DRY_RUN_OVERRIDE="true"
      shift
      ;;
    --parallel)
      PARSED_PARALLEL="true"
      shift
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    *)
      print_error "Unknown option: $1"
      echo ""
      show_help
      exit 1
      ;;
  esac
done

# ============================================
#  Main Execution
# ============================================

print_header

# Check dependencies
check_dependencies

# Load configuration
load_config

# Apply command-line overrides
if [[ -n "$PARSED_MODE" ]]; then
  MODE="$PARSED_MODE"
  print_info "Mode overridden: $MODE"
fi

if [[ "$VERBOSE_OVERRIDE" == "true" ]]; then
  VERBOSE="true"
  print_info "Verbose mode enabled"
fi

if [[ "$DRY_RUN_OVERRIDE" == "true" ]]; then
  DRY_RUN="true"
  print_info "Dry run mode enabled"
fi

# Verbose logging
if [[ "$VERBOSE" == "true" ]]; then
  print_info "Configuration:"
  echo "  Mode: $MODE"
  echo "  Verbose: $VERBOSE"
  echo "  Continue on error: $CONTINUE_ON_ERROR"
  echo "  Dry run: $DRY_RUN"
  echo ""
fi

# Execute workflow
if [[ -n "$PHASE" ]]; then
  # Run specific phase
  if validate_phase "$PHASE"; then
    if run_phase "$PHASE"; then
      echo ""
      print_success "Workflow completed successfully"
      exit 0
    else
      echo ""
      print_error "Workflow failed"
      exit 1
    fi
  else
    print_error "Invalid phase: $PHASE"
    echo "Valid phases: init, validate, execute, finalize"
    exit 1
  fi
else
  # Run all phases
  if run_all_phases; then
    echo ""
    print_success "Workflow completed successfully"
    exit 0
  else
    echo ""
    print_error "Workflow failed"
    exit 1
  fi
fi
