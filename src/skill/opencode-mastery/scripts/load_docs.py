#!/usr/bin/env python3
"""
Lazy loader for OpenCode documentation.
Searches both official docs and custom references using keyword matching.

Usage:
    python load-docs.py --query "keyword" [--verbose]
"""

import argparse
import json
import sys
from pathlib import Path
from typing import NoReturn

# Optional dependency - fuzzy matching library
try:
    from rapidfuzz import fuzz, process

    HAS_RAPIDFUZZ = True
except ImportError:
    HAS_RAPIDFUZZ = False

# Path constants
OFFICIAL_DOCS_PATH = Path.home() / ".ai_docs" / "opencode" / "docs"
MEMORY_PATH = Path.home() / ".ai_docs" / "opencode" / "memory"
OFFICIAL_INDEX_FILE = MEMORY_PATH / "index.json"

# Custom references paths
# After install: scripts are in ~/.ai_docs/opencode/scripts/
# References are in ~/.config/opencode/skill/opencode-mastery/references/
INSTALLED_REFERENCES_DIR = (
    Path.home() / ".config" / "opencode" / "skill" / "opencode-mastery" / "references"
)
DEV_REFERENCES_DIR = Path(__file__).parent.parent / "references"

# Use installed path if exists, otherwise dev path
REFERENCES_DIR = (
    INSTALLED_REFERENCES_DIR
    if INSTALLED_REFERENCES_DIR.exists()
    else DEV_REFERENCES_DIR
)
REGISTRY_FILE = REFERENCES_DIR / "registry.json"

# Fuzzy match threshold (0-100)
DEFAULT_THRESHOLD = 70


def load_official_index() -> dict | None:
    """Load the official docs search index from disk."""
    if OFFICIAL_INDEX_FILE.exists():
        return json.loads(OFFICIAL_INDEX_FILE.read_text())
    return None


def load_custom_registry() -> dict | None:
    """Load the custom references registry from disk."""
    if REGISTRY_FILE.exists():
        return json.loads(REGISTRY_FILE.read_text())
    return None


def fuzzy_search_official(
    query: str, index: dict | None, threshold: int = DEFAULT_THRESHOLD
) -> list[dict]:
    """Search official docs index with fuzzy matching."""
    if not index:
        return []

    results = []
    keywords = index.get("keywords", {})
    query_lower = query.lower()

    if HAS_RAPIDFUZZ:
        # Use rapidfuzz process.extract for top matches
        keyword_list = list(keywords.keys())
        matches = process.extract(
            query, keyword_list, scorer=fuzz.WRatio, limit=10, score_cutoff=threshold
        )

        for keyword, score, _ in matches:
            matches_list = keywords.get(keyword, [])
            for match in matches_list:
                match["score"] = score
                match["source_type"] = "official"
                if not any(
                    r["doc"] == match["doc"] and r.get("source_type") == "official"
                    for r in results
                ):
                    results.append(match)
    else:
        # Fallback to simple substring matching
        for keyword, matches_list in keywords.items():
            if query_lower in keyword or keyword in query_lower:
                for match in matches_list:
                    match["score"] = 80  # Default score for substring match
                    match["source_type"] = "official"
                    if not any(
                        r["doc"] == match["doc"] and r.get("source_type") == "official"
                        for r in results
                    ):
                        results.append(match)

    return results


def fuzzy_search_custom(
    query: str, registry: dict | None, threshold: int = DEFAULT_THRESHOLD
) -> list[dict]:
    """Search custom references registry with fuzzy matching."""
    if not registry:
        return []

    results = []
    # Registry uses "entries" not "references"
    references = registry.get("entries", registry.get("references", []))
    query_lower = query.lower()

    for ref in references:
        keywords = ref.get("keywords", [])
        best_score = 0

        if HAS_RAPIDFUZZ:
            for keyword in keywords:
                score = fuzz.WRatio(query, keyword)
                if score > best_score:
                    best_score = score
        else:
            # Fallback to substring matching
            for keyword in keywords:
                keyword_lower = keyword.lower()
                if query_lower in keyword_lower or keyword_lower in query_lower:
                    best_score = 80  # Default score for substring match
                    break

        if best_score >= threshold:
            result = {
                "doc": ref.get("filename", ""),
                "source": f"references/{ref.get('filename', '')}",
                "excerpt": ref.get("description", "")[:200],
                "score": best_score,
                "source_type": "custom",
                "title": ref.get("title", ""),
            }
            if not any(
                r["doc"] == result["doc"] and r.get("source_type") == "custom"
                for r in results
            ):
                results.append(result)

    return results


def combine_and_rank_results(
    official_results: list[dict], custom_results: list[dict]
) -> list[dict]:
    """Combine results from both sources and rank by score."""
    combined = official_results + custom_results
    # Sort by score descending
    combined.sort(key=lambda x: x.get("score", 0), reverse=True)
    return combined[:10]  # Return top 10 results


def display_results(results: list[dict], query: str, verbose: bool = False) -> None:
    """Display search results in a user-friendly format."""
    if not results:
        print(f"❌ No results found for: '{query}'")
        return

    print(f"🔎 Found {len(results)} results for '{query}':\n")

    for i, result in enumerate(results, 1):
        source_type = result.get("source_type", "unknown")
        icon = "📘" if source_type == "official" else "📝"
        score = result.get("score", 0)

        title = result.get("title", result["doc"])
        print(f"{i}. {icon} {title} (confidence: {score}%)")
        print(f"   Source: {result['source']}")

        if "excerpt" in result:
            print(f"   {result['excerpt']}")

        if verbose and "source_type" in result:
            print(f"   Type: {source_type}")

        print()

    if verbose:
        official_count = sum(1 for r in results if r.get("source_type") == "official")
        custom_count = sum(1 for r in results if r.get("source_type") == "custom")
        print(f"📊 Results breakdown: {official_count} official, {custom_count} custom")


def main() -> NoReturn:
    """Main entry point for the lazy loader script."""
    parser = argparse.ArgumentParser(
        description="Lazy load OpenCode documentation by searching both official docs and custom references"
    )
    parser.add_argument(
        "--query", "-q", type=str, required=False, help="Search query keyword(s)"
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show detailed search process"
    )

    args = parser.parse_args()

    # Handle missing query
    if not args.query or not args.query.strip():
        print("❌ Error: Query is required")
        print("Usage: python load-docs.py --query 'keyword' [--verbose]")
        sys.exit(1)

    query = args.query.strip()

    if args.verbose:
        print(f"🔍 Searching for: '{query}'")
        print(f"📍 Official docs index: {OFFICIAL_INDEX_FILE}")
        print(f"📍 Custom registry: {REGISTRY_FILE}")
        print()

    # Load indices
    official_index = load_official_index()
    custom_registry = load_custom_registry()

    if args.verbose:
        if official_index:
            print(
                f"✅ Loaded official index with {len(official_index.get('keywords', {}))} keywords"
            )
        else:
            print("⚠️  Official index not found (run: python index-builder.py)")

        if custom_registry:
            print(
                f"✅ Loaded custom registry with {len(custom_registry.get('references', []))} references"
            )
        else:
            print(
                "⚠️  Custom registry not found (run: python references/build-registry.py)"
            )
        print()

    # Search both sources
    try:
        if args.verbose:
            print("🔎 Searching official docs...")
        official_results = fuzzy_search_official(query, official_index)

        if args.verbose:
            print(f"   → Found {len(official_results)} official results")
            print("🔎 Searching custom references...")
        custom_results = fuzzy_search_custom(query, custom_registry)

        if args.verbose:
            print(f"   → Found {len(custom_results)} custom results")
            print()

        # Combine and rank
        combined_results = combine_and_rank_results(official_results, custom_results)

        # Display results
        display_results(combined_results, query, verbose=args.verbose)

        # Exit with success
        sys.exit(0 if combined_results else 1)

    except KeyboardInterrupt:
        print("\n\n⚠️  Search interrupted")
        sys.exit(130)
    except Exception as e:
        print(f"\n❌ Error: {e}")
        if args.verbose:
            import traceback

            traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
