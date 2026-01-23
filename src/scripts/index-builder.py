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

DOCS_PATH = Path.home() / ".ai_docs" / "opencode" / "docs"
INDEX_PATH = Path.home() / ".ai_docs" / "opencode" / "memory"
INDEX_FILE = INDEX_PATH / "index.json"


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


def build_index(docs_path: Path, index_path: Path, rebuild: bool = False):
    print(f"🔍 Building search index from: {docs_path}")
    print()

    topics = defaultdict(list)
    sections = []
    config_keys = []

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

    topic_index = {
        "version": "1.0.0",
        "built": str(Path(__file__).stat().st_mtime),
        "keywords": dict(topics),
        "sections": sections,
        "config_keys": config_keys,
    }

    index_path.mkdir(parents=True, exist_ok=True)

    with open(INDEX_FILE, "w") as f:
        json.dump(topic_index, f, indent=2)

    print()
    print(f"✅ Index built:")
    print(f"   - Keywords: {len(topics)}")
    print(f"   - Sections: {len(sections)}")
    print(f"   - Config keys: {len(config_keys)}")
    print()
    print(f"📍 Saved to: {INDEX_FILE}")


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

    build_index(DOCS_PATH, INDEX_PATH, rebuild=args.rebuild)
    return 0


if __name__ == "__main__":
    sys.exit(main())
