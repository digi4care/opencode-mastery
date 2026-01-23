#!/usr/bin/env python3
"""
Memory manager for OpenCode mastery skill.

Tracks sessions and builds topic-specific memory.
"""

import json
from datetime import datetime
from pathlib import Path

MEMORY_BASE = Path.home() / ".ai_docs" / "opencode" / "memory"
SESSIONS_DIR = MEMORY_BASE / "sessions"
TOPICS_DIR = MEMORY_BASE / "topics"
MASTER_INDEX = MEMORY_BASE / "master_index.json"


class MemoryManager:
    def __init__(self, session_id: str | None = None):
        self.session_id = session_id if session_id else self._get_session_id()
        self.session_file = SESSIONS_DIR / f"{self.session_id}.json"
        self._ensure_dirs()

    def _get_session_id(self) -> str:
        return datetime.now().strftime("%Y-%m-%d")

    def _ensure_dirs(self):
        SESSIONS_DIR.mkdir(parents=True, exist_ok=True)
        TOPICS_DIR.mkdir(parents=True, exist_ok=True)

    def add_exchange(self, question: str, answer: str, topics: list[str] | None = None):
        if not self.session_file.exists():
            session_data = {
                "session_id": self.session_id,
                "created": datetime.now().isoformat(),
                "exchanges": [],
            }
        else:
            session_data = json.loads(self.session_file.read_text())

        exchange = {
            "timestamp": datetime.now().isoformat(),
            "question": question,
            "answer": answer,
            "topics": topics or [],
        }

        session_data["exchanges"].append(exchange)
        session_data["last_updated"] = datetime.now().isoformat()

        self.session_file.write_text(json.dumps(session_data, indent=2))

        if topics:
            for topic in topics:
                self._add_to_topic(topic, exchange)

        self._update_master_index(list(topics) if topics else [])

    def _add_to_topic(self, topic: str, exchange: dict):
        topic_file = TOPICS_DIR / f"{topic}.json"

        if topic_file.exists():
            topic_data = json.loads(topic_file.read_text())
        else:
            topic_data = {
                "topic": topic,
                "created": datetime.now().isoformat(),
                "exchanges": [],
            }

        topic_data["exchanges"].append(
            {
                "session_id": self.session_id,
                "timestamp": exchange["timestamp"],
                "question": exchange["question"],
            }
        )

        topic_file.write_text(json.dumps(topic_data, indent=2))

    def _update_master_index(self, topics: list[str]):
        if not topics:
            return

        if MASTER_INDEX.exists():
            master = json.loads(MASTER_INDEX.read_text())
        else:
            master = {"created": datetime.now().isoformat(), "topics": set()}

        existing_topics = set(master.get("topics", []))
        existing_topics.update(topics)

        master["topics"] = sorted(list(existing_topics))
        master["last_updated"] = datetime.now().isoformat()

        MASTER_INDEX.write_text(json.dumps(master, indent=2))

    def get_session_history(self) -> list[dict]:
        if not self.session_file.exists():
            return []

        session_data = json.loads(self.session_file.read_text())
        return session_data.get("exchanges", [])

    def get_topic_memory(self, topic: str) -> list[dict]:
        topic_file = TOPICS_DIR / f"{topic}.json"

        if not topic_file.exists():
            return []

        topic_data = json.loads(topic_file.read_text())
        return topic_data.get("exchanges", [])

    def find_relevant_context(self, keywords: list[str]) -> list[dict]:
        relevant = []

        for topic in MASTER_INDEX.parent.glob("topics/*.json"):
            topic_data = json.loads(topic.read_text())
            topic_name = topic_data.get("topic", "")

            if any(kw.lower() in topic_name.lower() for kw in keywords):
                relevant.extend(topic_data.get("exchanges", []))

        return relevant


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Memory manager for OpenCode skill")
    parser.add_argument("--add", nargs=3, metavar=("QUESTION", "ANSWER", "TOPICS"))
    parser.add_argument("--history", action="store_true")
    parser.add_argument("--topic", type=str)
    parser.add_argument("--search", nargs="+")

    args = parser.parse_args()
    memory = MemoryManager()

    if args.add:
        question, answer, topics = args.add
        memory.add_exchange(question, answer, [topics])
        print(f"✅ Added exchange to memory")

    elif args.history:
        history = memory.get_session_history()
        for i, exchange in enumerate(history, 1):
            print(f"{i}. [{exchange['timestamp']}]")
            print(f"   Q: {exchange['question']}")
            print(f"   A: {exchange['answer'][:100]}...")
            print()

    elif args.topic:
        topic_memory = memory.get_topic_memory(args.topic)
        print(f"📚 Memory for '{args.topic}':\n")
        for i, exchange in enumerate(topic_memory, 1):
            print(f"{i}. [{exchange['timestamp']}] {exchange['question']}")
            print()

    elif args.search:
        context = memory.find_relevant_context(args.search)
        print(f"🔍 Relevant context for: {', '.join(args.search)}\n")
        for exchange in context:
            print(f"- {exchange['question']}")
        print()

    else:
        print("Use --add, --history, --topic, or --search")


if __name__ == "__main__":
    main()
