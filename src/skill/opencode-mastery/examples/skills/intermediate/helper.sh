#!/bin/bash

# =========================================
# Intermediate Example: Helper Script
# Demonstrates sequential execution with
# rich console output
# =========================================

set -e  # Exit on error

# Script metadata
SCRIPT_VERSION="1.0.0"
SCRIPT_NAME="Sequential Execution Helper"
TOTAL_STEPS=5

# Helper function for formatting
print_header() {
    echo ""
    echo "=========================================="
    echo "  $SCRIPT_NAME"
    echo "  Version: $SCRIPT_VERSION"
    echo "=========================================="
    echo ""
}

print_step() {
    local step_num=$1
    local step_name=$2
    local timestamp=$(date '+%H:%M:%S')

    echo "[$timestamp] Step $step_num/$TOTAL_STEPS: $step_name"
}

print_success() {
    echo "  ✓ Completed successfully"
    echo ""
}

# Main execution
print_header

# Step 1: Initialization
print_step 1 "Initializing workflow"
sleep 1  # Simulate work
echo "  Loading configuration..."
echo "  Setting up environment..."
print_success

# Step 2: Processing
print_step 2 "Processing data"
sleep 1
echo "  Reading input data..."
echo "  Applying transformations..."
echo "  Generating intermediate results..."
print_success

# Step 3: Validation
print_step 3 "Validating results"
sleep 1
echo "  Checking data integrity..."
echo "  Verifying constraints..."
echo "  Running validation tests..."
print_success

# Step 4: Output Generation
print_step 4 "Generating output"
sleep 1
echo "  Formatting results..."
echo "  Creating output files..."
echo "  Writing reports..."
print_success

# Step 5: Cleanup
print_step 5 "Finalizing and cleanup"
sleep 1
echo "  Cleaning temporary files..."
echo "  Updating status..."
echo "  Releasing resources..."
print_success

# Completion message
echo "=========================================="
echo "  Execution Complete"
echo "  All $TOTAL_STEPS steps finished successfully"
echo "=========================================="
echo ""
