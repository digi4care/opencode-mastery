#!/usr/bin/env python3
"""Smoke tests for the TypeScript tool examples.

These tests validate that the repo's example tool files exist and follow the
expected authoring patterns (tool() + Zod schema + .describe()).

They intentionally do NOT execute TypeScript. This keeps the tests fast and
dependency-free, while still catching accidental deletions or major regressions
in the example code.
"""

from __future__ import annotations

import re
from pathlib import Path


SCRIPT_DIR = Path(__file__).parent
SKILL_DIR = SCRIPT_DIR.parent
TOOLS_DIR = SKILL_DIR / "examples" / "tools"


def _read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _assert_contains(text: str, needle: str) -> None:
    assert needle in text


def _assert_regex(text: str, pattern: str) -> None:
    assert re.search(pattern, text, flags=re.MULTILINE) is not None


def test_tools_docs_exist() -> None:
    # Arrange
    readme = TOOLS_DIR / "README.md"
    guide = TOOLS_DIR / "TOOLS_GUIDE.md"
    ref = TOOLS_DIR / "TOOLS_REFERENCE.md"

    # Act
    exists = (readme.exists(), guide.exists(), ref.exists())

    # Assert
    assert exists == (True, True, True)


def test_minimal_tool_example_has_expected_exports_and_patterns() -> None:
    # Arrange
    index = TOOLS_DIR / "minimal-tool" / "index.ts"

    # Act
    content = _read_text(index)

    # Assert
    _assert_contains(content, "export const echoText")
    _assert_contains(content, "tool(")
    _assert_contains(content, "z.object(")
    _assert_contains(content, ").describe(")


def test_intermediate_tool_example_exports_two_tools() -> None:
    # Arrange
    index = TOOLS_DIR / "intermediate-tool" / "index.ts"

    # Act
    content = _read_text(index)

    # Assert
    _assert_contains(content, "export const normalizeText")
    _assert_contains(content, "export const textStats")


def test_advanced_tool_example_exposes_toolset() -> None:
    # Arrange
    index = TOOLS_DIR / "advanced-tool" / "index.ts"

    # Act
    content = _read_text(index)

    # Assert
    _assert_contains(content, "export const toolset")
    _assert_regex(content, r"toolset\s*=\s*\[")


def test_advanced_tool_factory_pattern_exists() -> None:
    # Arrange
    timestamp_tool = TOOLS_DIR / "advanced-tool" / "tools" / "timestamp.ts"

    # Act
    content = _read_text(timestamp_tool)

    # Assert
    _assert_contains(content, "export const createTimestampTool")
    _assert_contains(content, "now: () => Date")


def test_advanced_utils_exist_and_expose_expected_functions() -> None:
    # Arrange
    unknown_error = TOOLS_DIR / "advanced-tool" / "utils" / "unknown-error.ts"
    text_utils = TOOLS_DIR / "advanced-tool" / "utils" / "text.ts"

    # Act
    unknown_error_content = _read_text(unknown_error)
    text_utils_content = _read_text(text_utils)

    # Assert
    _assert_contains(unknown_error_content, "export const toErrorMessage")
    _assert_contains(text_utils_content, "export const normalizeText")
    _assert_contains(text_utils_content, "export const getTextStats")
