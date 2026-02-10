# Test Plan: Lazy Loading Documentation System

## Overview

Comprehensive test suite for the lazy loading docs system covering both `load-docs.py` and `index-builder.py`.

## Test Structure

### Files to Create

- `src/skill/opencode-mastery/scripts/test-load-docs.py` - Primary test file
- `test-results.md` - Test execution results

---

## Tests for load-docs.py

### 1. load_official_index()

| Test Type   | Description                                 | Expected Result                  |
| ----------- | ------------------------------------------- | -------------------------------- |
| ✅ Positive | Successfully loads index from existing file | Returns dict with keys           |
| ❌ Negative | File doesn't exist                          | Returns None                     |
| ❌ Negative | Invalid JSON in file                        | Returns None (graceful handling) |

### 2. load_custom_registry()

| Test Type   | Description                                    | Expected Result                  |
| ----------- | ---------------------------------------------- | -------------------------------- |
| ✅ Positive | Successfully loads registry from existing file | Returns dict with 'entries'      |
| ❌ Negative | File doesn't exist                             | Returns None                     |
| ❌ Negative | Invalid JSON in file                           | Returns None (graceful handling) |

### 3. fuzzy_search_official()

| Test Type   | Description                       | Expected Result                             |
| ----------- | --------------------------------- | ------------------------------------------- |
| ✅ Positive | Exact match with rapidfuzz        | Returns results with high score (90+)       |
| ✅ Positive | Fuzzy match with rapidfuzz        | Returns results with moderate score (70-90) |
| ✅ Positive | Substring fallback (no rapidfuzz) | Returns results with default score (80)     |
| ✅ Positive | Respects threshold parameter      | Filters out scores below threshold          |
| ❌ Negative | Index is None                     | Returns empty list                          |
| ❌ Negative | Empty keywords in index           | Returns empty list                          |
| ❌ Negative | No matches for query              | Returns empty list                          |
| ❌ Negative | Empty query string                | Returns empty list                          |
| ❌ Negative | Special characters in query       | Handles gracefully (no crash)               |
| ❌ Negative | Deduplication works               | No duplicate docs returned                  |

### 4. fuzzy_search_custom()

| Test Type   | Description                       | Expected Result                                 |
| ----------- | --------------------------------- | ----------------------------------------------- |
| ✅ Positive | Exact match with rapidfuzz        | Returns results with high score (90+)           |
| ✅ Positive | Fuzzy match with rapidfuzz        | Returns results with moderate score (70-90)     |
| ✅ Positive | Substring fallback (no rapidfuzz) | Returns results with default score (80)         |
| ✅ Positive | Respects threshold parameter      | Filters out scores below threshold              |
| ✅ Positive | Includes all required fields      | doc, source, excerpt, score, source_type, title |
| ❌ Negative | Registry is None                  | Returns empty list                              |
| ❌ Negative | Empty references in registry      | Returns empty list                              |
| ❌ Negative | No matches for query              | Returns empty list                              |
| ❌ Negative | Empty query string                | Returns empty list                              |
| ❌ Negative | Special characters in query       | Handles gracefully (no crash)                   |
| ❌ Negative | Deduplication works               | No duplicate docs returned                      |

### 5. combine_and_rank_results()

| Test Type   | Description               | Expected Result                   |
| ----------- | ------------------------- | --------------------------------- |
| ✅ Positive | Combines both result sets | Returns list with both types      |
| ✅ Positive | Sorts by score descending | Highest score first               |
| ✅ Positive | Returns top 10 only       | Max 10 results                    |
| ✅ Positive | Handles ties in scores    | Both present, order not critical  |
| ❌ Negative | Both input lists empty    | Returns empty list                |
| ❌ Negative | One list empty            | Returns items from non-empty list |
| ❌ Negative | Missing score in result   | Defaults to 0 (lowest rank)       |

### 6. display_results()

| Test Type   | Description                  | Expected Result              |
| ----------- | ---------------------------- | ---------------------------- |
| ✅ Positive | Displays formatted results   | No crash, prints output      |
| ✅ Positive | Verbose mode shows breakdown | Shows official/custom counts |
| ❌ Negative | Empty results list           | Shows "No results found"     |

---

## Tests for index-builder.py

### 1. extract_keywords()

| Test Type   | Description                          | Expected Result        |
| ----------- | ------------------------------------ | ---------------------- |
| ✅ Positive | Extracts headings (# ###)            | Returns heading text   |
| ✅ Positive | Extracts code in backticks           | Returns code text      |
| ✅ Positive | Extracts config keys ("key":)        | Returns key names      |
| ✅ Positive | Extracts function names (PascalCase) | Returns function names |
| ✅ Positive | Filters short keywords (<3 chars)    | Excludes short words   |
| ✅ Positive | Normalizes to lowercase              | All keywords lowercase |
| ❌ Negative | Empty content                        | Returns empty list     |
| ❌ Negative | No patterns found                    | Returns empty list     |

### 2. extract_sections()

| Test Type   | Description               | Expected Result                        |
| ----------- | ------------------------- | -------------------------------------- |
| ✅ Positive | Extracts section headers  | Returns list of sections               |
| ✅ Positive | Captures section content  | Content limited to 500 chars           |
| ✅ Positive | Handles multiple sections | All sections returned                  |
| ✅ Positive | Tracks source filename    | Each section has 'source' field        |
| ❌ Negative | Empty content             | Returns single section (filename only) |
| ❌ Negative | No headings               | Returns single section                 |

### 3. extract_config_keys()

| Test Type   | Description           | Expected Result               |
| ----------- | --------------------- | ----------------------------- |
| ✅ Positive | Extracts JSON keys    | Returns list of config items  |
| ✅ Positive | Filters by value type | Only true/false/string values |
| ❌ Negative | No config keys        | Returns empty list            |
| ❌ Negative | Invalid JSON content  | Returns empty list (no crash) |

### 4. load_registry()

| Test Type   | Description          | Expected Result            |
| ----------- | -------------------- | -------------------------- |
| ✅ Positive | Loads valid registry | Returns dict               |
| ❌ Negative | File doesn't exist   | Returns None               |
| ❌ Negative | Invalid JSON         | Returns None, prints error |
| ❌ Negative | Verbose flag works   | Shows warning message      |

### 5. process_custom_references()

| Test Type   | Description                    | Expected Result                   |
| ----------- | ------------------------------ | --------------------------------- |
| ✅ Positive | Processes one reference        | Returns topics, sections, configs |
| ✅ Positive | Processes multiple references  | Merges all refs                   |
| ✅ Positive | Uses registry keywords         | Keywords added to topics          |
| ✅ Positive | Extracts keywords from content | Auto-extracted keywords added     |
| ❌ Negative | Empty registry                 | Returns empty structure           |
| ❌ Negative | Missing filename in entry      | Skips entry                       |
| ❌ Negative | File doesn't exist             | Skips entry, prints warning       |

### 6. build_index()

| Test Type   | Description                 | Expected Result                           |
| ----------- | --------------------------- | ----------------------------------------- |
| ✅ Positive | Processes official docs     | Builds index with topics/sections/configs |
| ✅ Positive | Includes custom refs        | Merges custom topics/sections             |
| ✅ Positive | Creates directories         | Creates index path if needed              |
| ✅ Positive | Writes both index files     | index.json and master_index.json          |
| ✅ Positive | Verbose mode shows progress | Prints processing info                    |
| ❌ Negative | No docs directory           | Returns empty index                       |
| ❌ Negative | No custom registry          | Builds with official only                 |

### 7. load_index()

| Test Type   | Description          | Expected Result |
| ----------- | -------------------- | --------------- |
| ✅ Positive | Loads existing index | Returns dict    |
| ❌ Negative | File doesn't exist   | Returns None    |

### 8. search_index()

| Test Type   | Description             | Expected Result         |
| ----------- | ----------------------- | ----------------------- |
| ✅ Positive | Finds matching keywords | Returns list of matches |
| ✅ Positive | Deduplicates results    | No duplicate docs       |
| ❌ Negative | Index is None           | Returns empty list      |
| ❌ Negative | No matches found        | Returns empty list      |

---

## Edge Cases & Special Scenarios

### Query Variations

| Scenario                           | Description        |
| ---------------------------------- | ------------------ |
| Empty string                       | Handle gracefully  |
| Whitespace only                    | Handle gracefully  |
| Special characters (@, #, $, etc.) | No crashes         |
| Unicode characters                 | Works correctly    |
| Very long query (>100 chars)       | Handles gracefully |

### Content Variations

| Scenario                      | Description        |
| ----------------------------- | ------------------ |
| Empty files                   | No crashes         |
| Files with only whitespace    | No crashes         |
| Files with invalid characters | No crashes         |
| Very large files (>1MB)       | Handles gracefully |
| Files with no headings        | Still processes    |

### State Variations

| Scenario               | Description             |
| ---------------------- | ----------------------- |
| Missing index files    | Falls back to None      |
| Corrupt index files    | Returns None gracefully |
| Missing registry files | Falls back to None      |
| Corrupt registry files | Returns None gracefully |

---

## Test Data

### Fixtures

- Sample official index (mocked)
- Sample custom registry (mocked)
- Sample MDX content for extraction tests
- Sample queries (single word, multi-word, phrases)

---

## Success Criteria

1. **All tests pass** - No failures or errors
2. **>90% code coverage** - Core functions covered
3. **Positive + Negative coverage** - Every behavior has both test types
4. **AAA pattern** - All tests follow Arrange-Act-Assert
5. **Deterministic** - No flaky tests, all external deps mocked
6. **Clear results** - test-results.md generated with summary

---

## Test Execution Order

```bash
# Install pytest (if not already installed)
pip install pytest pytest-cov pytest-mock

# Run all tests
pytest src/skill/opencode-mastery/scripts/test-load-docs.py -v

# Run with coverage
pytest src/skill/opencode-mastery/scripts/test-load-docs.py --cov=src/skill/opencode-mastery/scripts --cov-report=html

# Generate results
pytest src/skill/opencode-mastery/scripts/test-load-docs.py -v > test-results.md 2>&1
```
