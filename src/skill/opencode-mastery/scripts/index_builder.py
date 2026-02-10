#!/usr/bin/env python3
"""
Build fuzzy search index from downloaded OpenCode documentation.

Usage:
    python index-builder.py [--rebuild] [--verbose]
"""

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

# Paths for official OpenCode docs
DOCS_PATH = Path.home() / ".ai_docs" / "opencode" / "docs"
INDEX_PATH = Path.home() / ".ai_docs" / "opencode" / "memory"
INDEX_FILE = INDEX_PATH / "index.json"
MASTER_INDEX_FILE = INDEX_PATH / "master_index.json"

# Path for custom references (relative to script location)
SCRIPT_DIR = Path(__file__).parent
REFERENCES_PATH = SCRIPT_DIR.parent / "references"
REGISTRY_FILE = REFERENCES_PATH / "registry.json"


def extract_keywords(content: str) -> list[str]:
    keywords = []
    keywords.extend(re.findall(r"^#+\s+(.+)$", content, re.MULTILINE))
    keywords.extend(re.findall(r"`([^`]+)`", content))
    keywords.extend(re.findall(r'"([^"]+)":\s*(?:true|false|\d+)', content))
    keywords.extend(re.findall(r"[A-Z][a-zA-Z]+(?=\s+\()", content))

    return [k.lower().strip() for k in keywords if len(k.strip()) > 2]


def extract_sections(content: str, filename: str) -> list[dict]:
    sections = []
    current_section = ""
    lines = content.split("\n")
    current_header = filename

    for line in lines:
        if line.startswith("#"):
            if current_section.strip():
                sections.append(
                    {
                        "header": current_header,
                        "content": current_section.strip()[:500],
                        "source": filename,
                    }
                )
            current_header = line.lstrip("#").strip()
            current_section = ""
        else:
            current_section += line + "\n"

    if current_section.strip():
        sections.append(
            {
                "header": current_header,
                "content": current_section.strip()[:500],
                "source": filename,
            }
        )

    return sections


def extract_config_keys(content: str, filename: str) -> list[dict]:
    config_items = []
    keys = re.findall(r'"([^"]+)":\s*(?:true|false|"[^"]*")', content)

    for key in keys:
        config_items.append({"type": "config", "key": key, "source": filename})

    return config_items


def load_registry(registry_path: Path, verbose: bool = False) -> dict | None:
    """Load custom references registry file."""
    if not registry_path.exists():
        if verbose:
            print(f"⚠️  Registry file not found: {registry_path}")
        return None

    try:
        content = registry_path.read_text()
        return json.loads(content)
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing registry: {e}")
        return None

    try:
        content = registry_path.read_text()
        return json.loads(content)
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing registry: {e}")
        return None


def process_custom_references(registry: dict, refs_path: Path) -> dict:
    """Process custom reference files and build index."""
    custom_topics = defaultdict(list)
    custom_sections = []
    custom_configs = []

    entries = registry.get("entries", [])

    for entry in entries:
        filename = entry.get("filename")
        if not filename:
            continue

        ref_file = refs_path / filename
        if not ref_file.exists():
            print(f"⚠️  Custom ref not found: {filename}")
            continue

        print(f"  📄 Processing custom ref: {filename}")

        content = ref_file.read_text()
        keywords = entry.get("keywords", [])

        # Extract sections
        ref_sections = extract_sections(content, f"custom:{filename}")
        custom_sections.extend(ref_sections)

        # Extract config keys
        ref_configs = extract_config_keys(content, f"custom:{filename}")
        custom_configs.extend(ref_configs)

        # Build topic index from registry keywords and extracted keywords
        all_keywords = list(set(keywords + extract_keywords(content)))

        for kw in all_keywords:
            custom_topics[kw].append(
                {
                    "doc": entry.get("id", ref_file.stem),
                    "source": f"custom:{filename}",
                    "excerpt": content[:200].replace("\n", " ").strip(),
                    "title": entry.get("title", ""),
                    "category": entry.get("category", "custom"),
                }
            )

    return {
        "topics": dict(custom_topics),
        "sections": custom_sections,
        "configs": custom_configs,
    }


def build_index(
    docs_path: Path,
    index_path: Path,
    rebuild: bool = False,
    include_custom: bool = True,
    verbose: bool = False,
):
    """Build search index from official docs and custom references."""
    print(f"🔍 Building search index from: {docs_path}")
    print()

    topics = defaultdict(list)
    sections = []
    config_keys = []
    custom_refs_data = None
    registry = None

    # Process official OpenCode docs
    for doc in docs_path.glob("*.mdx"):
        if not doc.is_file():
            continue

        print(f"  📄 Processing {doc.name}")

        content = doc.read_text()
        keywords = extract_keywords(content)

        doc_sections = extract_sections(content, doc.name)
        sections.extend(doc_sections)

        doc_configs = extract_config_keys(content, doc.name)
        config_keys.extend(doc_configs)

        for kw in set(keywords):
            topics[kw].append(
                {
                    "doc": doc.stem,
                    "source": doc.name,
                    "excerpt": content[:200].replace("\n", " ").strip(),
                }
            )

    # Process custom references if enabled
    if include_custom:
        print()
        print("📚 Processing custom references...")
        registry = load_registry(REGISTRY_FILE, verbose=verbose)
        if registry:
            custom_refs_data = process_custom_references(registry, REFERENCES_PATH)

            # Merge custom topics with official topics
            for kw, matches in custom_refs_data["topics"].items():
                topics[kw].extend(matches)

            # Merge sections
            sections.extend(custom_refs_data["sections"])

            # Merge config keys
            config_keys.extend(custom_refs_data["configs"])

            print(f"   ✅ Loaded {len(custom_refs_data['topics'])} custom topics")
        else:
            print("   ⚠️  No custom references found or registry invalid")
            registry = None

    topic_index = {
        "version": "1.1.0",
        "built": str(Path(__file__).stat().st_mtime),
        "keywords": dict(topics),
        "sections": sections,
        "config_keys": config_keys,
    }

    # Include custom refs metadata if available
    if custom_refs_data:
        topic_index["custom_refs"] = {
            "enabled": True,
            "count": len(custom_refs_data["topics"]),
            "registry_version": registry.get("version", "unknown")
            if registry
            else "unknown",
        }
    else:
        topic_index["custom_refs"] = {
            "enabled": False,
            "count": 0,
        }

    index_path.mkdir(parents=True, exist_ok=True)

    with open(INDEX_FILE, "w") as f:
        json.dump(topic_index, f, indent=2)

    print()
    print(f"✅ Index built:")
    print(f"   - Keywords: {len(topics)}")
    print(f"   - Sections: {len(sections)}")
    print(f"   - Config keys: {len(config_keys)}")
    if custom_refs_data:
        print(f"   - Custom refs: {len(custom_refs_data['topics'])}")
    print()
    print(f"📍 Saved to: {INDEX_FILE}")

    # Also save to master_index.json for backward compatibility
    with open(MASTER_INDEX_FILE, "w") as f:
        json.dump(topic_index, f, indent=2)
    if verbose:
        print(f"📍 Master index also saved to: {MASTER_INDEX_FILE}")


def load_index() -> dict | None:
    if INDEX_FILE.exists():
        return json.loads(INDEX_FILE.read_text())
    return None


def search_index(query: str, index: dict | None = None) -> list[dict]:
    if index is None:
        loaded_index = load_index()
        if loaded_index is None:
            return []
        index = loaded_index

    if not index:
        return []

    query_lower = query.lower()
    results = []

    for keyword, matches in index.get("keywords", {}).items():
        if query_lower in keyword or keyword in query_lower:
            for match in matches:
                if not any(r["doc"] == match["doc"] for r in results):
                    results.append(match)

    return results[:5]


def main():
    parser = argparse.ArgumentParser(description="Build search index for OpenCode docs")
    parser.add_argument("--rebuild", action="store_true", help="Force rebuild index")
    parser.add_argument("--search", "-s", type=str, help="Search for a topic")
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show detailed output"
    )

    args = parser.parse_args()

    if args.search:
        index = load_index()
        results = search_index(args.search, index)

        if not results:
            print(f"❌ No results for: {args.search}")
            return 1

        print(f"🔎 Results for '{args.search}':\n")
        for i, result in enumerate(results, 1):
            print(f"{i}. {result['doc']} ({result['source']})")
            print(f"   {result['excerpt']}")
            print()
        return 0

    build_index(DOCS_PATH, INDEX_PATH, rebuild=args.rebuild, verbose=args.verbose)
    return 0


if __name__ == "__main__":
    sys.exit(main())
