# Testing Patterns

**Analysis Date:** 2026-02-18

## Test Framework

**Runner:**

- pytest (>=7.0.0)
- pytest-asyncio (>=0.21.0)
- pytest-cov (>=4.0.0)
- Config: `pyproject.toml` (no separate config file)

**Assertion Library:**

- Built-in `assert` statements (pytest style)

**Run Commands:**

```bash
bun run test                           # Run all tests via package.json script
uv run pytest                          # Run all tests (direct)
uv run pytest test_file.py             # Specifieke test file
uv run pytest test_file.py::TestClass  # Specifieke test class
uv run pytest test_file.py::TestClass::test_method  # Enkele test
uv run pytest -k "keyword"             # Tests matching keyword
uv run pytest -v                       # Verbose output
```

## Test File Organization

**Location:**

- Co-located with source scripts: `src/skill/opencode-mastery/scripts/test-*.py`
- Test files live in the same directory as the code they test

**Naming:**

- Test files: `test-*.py` or `test_*.py` (both patterns used)
- Test classes: `Test<Feature>` (e.g., `TestLoadOfficialIndex`, `TestFuzzySearchCustom`)
- Test methods: `test_<scenario>` (e.g., `test_load_official_index_success`)

**Structure:**

```
src/skill/opencode-mastery/scripts/
├── load_docs.py              # Source
├── index_builder.py          # Source
├── test-load-docs.py         # Tests for both load_docs.py and index_builder.py
└── test_tool_examples.py     # Smoke tests for TypeScript examples
```

## Test Structure

**Suite Organization (AAA Pattern):**

```python
class TestLoadOfficialIndex:
    """Tests for load_official_index() function."""

    def test_load_official_index_success(self):
        # Arrange
        test_data = {"version": "1.0.0", "keywords": {}}

        # Act
        with (
            patch.object(Path, "exists", return_value=True),
            patch.object(Path, "read_text", return_value=json.dumps(test_data)),
        ):
            result = load_official_index()

        # Assert
        assert result is not None
        assert result["version"] == "1.0.0"

    def test_load_official_index_file_not_exists(self):
        # Arrange
        with patch.object(Path, "exists", return_value=False):
            # Act
            result = load_official_index()

        # Assert
        assert result is None

    def test_load_official_index_invalid_json(self):
        # Arrange
        with (
            patch.object(Path, "exists", return_value=True),
            patch.object(Path, "read_text", return_value="invalid json"),
        ):
            # Act & Assert
            with pytest.raises(json.JSONDecodeError):
                load_official_index()
```

**Patterns:**

- Arrange: Set up test data, mocks, and preconditions
- Act: Execute the function under test
- Assert: Verify the expected outcome
- Each test method is self-contained

## Fixtures

**Test Data Fixtures:**

```python
@pytest.fixture
def sample_official_index():
    """Sample official docs index for testing."""
    return {
        "version": "1.1.0",
        "keywords": {
            "agent": [
                {
                    "doc": "agents.mdx",
                    "source": "agents.mdx",
                    "excerpt": "Agent configuration and setup",
                }
            ],
            "plugin": [
                {
                    "doc": "plugins.mdx",
                    "source": "plugins.mdx",
                    "excerpt": "Plugin development guide",
                }
            ],
        },
        "sections": [],
        "config_keys": [],
    }


@pytest.fixture
def sample_custom_registry():
    """Sample custom references registry for testing."""
    return {
        "version": "1.0.0",
        "created": "2026-02-10T00:00:00Z",
        "registry_type": "reference_documents",
        "references": [
            {
                "id": "local-plugins",
                "title": "Lokale Plugins",
                "filename": "local-plugins.mdx",
                "keywords": ["plugins", "local", "npm"],
            }
        ],
    }


@pytest.fixture
def sample_mdx_content():
    """Sample MDX content for extraction tests."""
    return """# Agent Skills

OpenCode agents are powerful tools for automation.

## Plugin Development

Create plugins using TypeScript.
"""
```

**Pytest Built-in Fixtures:**

```python
def test_display_results_formatted(self, capsys):
    """Use capsys to capture stdout/stderr."""
    # Act
    display_results(results, query, verbose=False)
    captured = capsys.readouterr()

    # Assert
    assert "Found 1 results" in captured.out
    assert "test.mdx" in captured.out


def test_load_registry_valid(self, tmp_path, sample_custom_registry):
    """Use tmp_path for temporary file operations."""
    # Arrange
    registry_file = tmp_path / "registry.json"
    registry_file.write_text(json.dumps(registry_data))

    # Act
    result = load_registry(registry_file, verbose=False)

    # Assert
    assert result is not None
```

## Mocking

**Framework:** `unittest.mock` (patch, MagicMock, mock_open)

**Path Object Mocking:**

```python
# Mock Path.exists() and Path.read_text()
with (
    patch.object(Path, "exists", return_value=True),
    patch.object(Path, "read_text", return_value=json.dumps(test_data)),
):
    result = load_official_index()

# Mock Path to return False
with patch.object(Path, "exists", return_value=False):
    result = load_official_index()
```

**Module Variable Mocking:**

```python
# Mock a module-level variable/flag
with patch.object(load_docs, "HAS_RAPIDFUZZ", False):
    results = fuzzy_search_official(query, index)

# Mock a constant in another module
with patch.object(index_builder, "INDEX_FILE", Path("/nonexistent/index.json")):
    results = search_index(query, index)
```

**What to Mock:**

- File system operations (`Path.exists`, `Path.read_text`, `readFile`)
- Network calls (`urllib.request.urlopen`)
- External dependencies (rapidfuzz availability)
- Time-dependent behavior (if needed)

**What NOT to Mock:**

- Pure functions with no side effects
- Data transformation logic
- Simple string/list operations

## Test Categories

**Unit Tests:**

- Test individual functions in isolation
- Mock all external dependencies
- Fast, no I/O
- Located: `test-load-docs.py`, `test_tool_examples.py`

```python
class TestExtractKeywords:
    """Tests for extract_keywords() function."""

    def test_extract_keywords_headings(self, sample_mdx_content):
        content = sample_mdx_content
        keywords = extract_keywords(content)
        assert "agent skills" in keywords
        assert "plugin development" in keywords
```

**Integration Tests:**

- Test complete workflows with real dependencies
- Grouped in dedicated class
- Located: End of test file

```python
class TestIntegration:
    """Integration tests for complete workflows."""

    def test_complete_search_workflow(
        self, sample_official_index, sample_custom_registry
    ):
        query = "plugin"

        with patch.object(load_docs, "HAS_RAPIDFUZZ", False):
            official_results = fuzzy_search_official(query, sample_official_index)
            custom_results = fuzzy_search_custom(query, sample_custom_registry)
            combined = combine_and_rank_results(official_results, custom_results)

        assert len(combined) >= 1
```

**Smoke Tests:**

- Quick validation that files exist and have expected patterns
- Don't execute actual code
- Located: `test_tool_examples.py`

```python
def test_minimal_tool_example_has_expected_exports_and_patterns() -> None:
    """Validate minimal tool follows expected patterns."""
    index = TOOLS_DIR / "minimal-tool" / "index.ts"
    content = _read_text(index)

    _assert_contains(content, "export const echoText")
    _assert_contains(content, "tool(")
    _assert_contains(content, "z.object(")
    _assert_contains(content, ").describe(")
```

## Coverage

**Requirements:** No explicit coverage threshold enforced

**View Coverage:**

```bash
uv run pytest --cov=src/skill/opencode-mastery/scripts --cov-report=term-missing
```

## Common Patterns

**Testing Async Code:**

```python
# Not currently used in this codebase
# If needed, use pytest-asyncio:
@pytest.mark.asyncio
async def test_async_function():
    result = await async_function()
    assert result is not None
```

**Error Testing:**

```python
def test_function_raises_expected_error(self):
    with pytest.raises(ValueError):
        raise ValueError("expected error")

def test_function_handles_gracefully(self):
    # Function should not raise, return None or empty
    result = function_with_bad_input(None)
    assert result is None
    # or
    assert result == []
```

**Edge Case Testing:**

```python
def test_empty_input(self):
    result = function_under_test("")
    assert result == []  # or appropriate empty response

def test_none_input(self):
    result = function_under_test(None)
    assert result is None  # or appropriate handling

def test_special_characters(self, sample_data):
    query = "@#$%^&*()"
    # Should not crash
    results = search(query, sample_data)
    assert results == []  # No crash, just no results
```

**Deduplication Testing:**

```python
def test_search_deduplicates(self):
    index = {
        "keywords": {
            "agent": [
                {"doc": "agents.mdx", "source": "agents.mdx"},
                {"doc": "agents.mdx", "source": "agents.mdx"},  # Duplicate
            ]
        }
    }
    results = search_index("agent", index)
    # Should only return one unique doc
    assert len(results) == 1
```

## Test Execution Entry Point

**Standalone Test Execution:**

```python
if __name__ == "__main__":
    # When executed as a script (via `bun run test`), run the pytest suite.
    this_file = str(Path(__file__).resolve())
    tools_tests = str((SCRIPT_DIR / "test_tool_examples.py").resolve())
    raise SystemExit(pytest.main([this_file, tools_tests]))
```

This allows running tests directly:

```bash
uv run test-load-docs.py
# or
python test-load-docs.py
```

---

_Testing analysis: 2026-02-18_
