#!/usr/bin/env python3
"""
Gerki Query
Beantwortet Fragen auf Basis der indexierten Dokumente via Claude API.
"""

import json
import sys
import urllib.request
import urllib.error
from pathlib import Path

CONFIG_FILE = Path.home() / ".gerki" / "config.json"
INDEX_FILE = Path.home() / ".gerki" / "index" / "documents.json"

MAX_CHUNKS = 8       # Maximale Anzahl relevanter Abschnitte die an die API gesendet werden
MIN_SCORE = 2        # Mindest-Relevanz-Score


def load_config():
    if not CONFIG_FILE.exists():
        print("Fehler: Gerki ist noch nicht eingerichtet.")
        print("Bitte zuerst ausführen: python scripts/setup.py")
        sys.exit(1)
    with open(CONFIG_FILE, encoding="utf-8") as f:
        return json.load(f)


def load_index():
    if not INDEX_FILE.exists():
        print("Fehler: Kein Index gefunden.")
        print("Bitte zuerst ausführen: python scripts/index.py")
        sys.exit(1)
    with open(INDEX_FILE, encoding="utf-8") as f:
        return json.load(f)


def score_chunk(chunk, keywords):
    """Einfaches Keyword-Scoring für Relevanz."""
    chunk_lower = chunk.lower()
    score = sum(chunk_lower.count(kw.lower()) for kw in keywords)
    return score


def extract_keywords(question):
    """Extrahiert Schlüsselwörter aus der Frage."""
    stopwords = {
        "was", "wie", "wann", "wo", "wer", "warum", "welche", "welcher",
        "ist", "sind", "war", "hat", "haben", "wird", "ich", "du", "er",
        "sie", "es", "wir", "die", "der", "das", "ein", "eine", "und",
        "oder", "aber", "in", "an", "auf", "für", "von", "mit", "zu",
        "what", "how", "when", "where", "who", "why", "which", "is",
        "are", "was", "has", "have", "the", "a", "an", "and", "or",
        "but", "in", "on", "for", "of", "with", "to", "from"
    }
    words = question.lower().replace("?", "").replace(",", "").split()
    return [w for w in words if w not in stopwords and len(w) > 2]


def find_relevant_chunks(question, index):
    """Findet die relevantesten Dokument-Abschnitte für die Frage."""
    keywords = extract_keywords(question)
    if not keywords:
        keywords = question.lower().split()

    scored = []
    for doc_path, doc in index.items():
        for i, chunk in enumerate(doc.get("chunks", [])):
            score = score_chunk(chunk, keywords)
            if score >= MIN_SCORE:
                scored.append({
                    "score": score,
                    "chunk": chunk,
                    "file": doc["name"],
                    "path": doc_path,
                    "modified": doc.get("modified", "")
                })

    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:MAX_CHUNKS]


def build_context(relevant_chunks):
    """Baut den Kontext-String für die API-Anfrage."""
    if not relevant_chunks:
        return None

    parts = []
    for item in relevant_chunks:
        parts.append(f"--- Aus Datei: {item['file']} ---\n{item['chunk']}")

    return "\n\n".join(parts)


def build_system_prompt(config):
    name = config.get("name", "Benutzer")
    language = config.get("language", "de")

    if language == "de":
        return f"""Du bist Gerki, der persönliche KI-Assistent von {name}.
Du hast Zugriff auf die lokalen Dokumente von {name} und beantwortest Fragen dazu.

Regeln:
- Antworte immer auf Deutsch (außer der Benutzer fragt auf Englisch)
- Sei direkt und konkret – keine langen Einleitungen
- Zitiere immer aus welcher Datei du die Information hast
- Wenn du die Antwort nicht findest: sag es ehrlich
- Du bist kein Ersatz für Anwalt, Steuerberater oder Arzt – weise hin wenn nötig
- Gib keine Informationen weiter die nicht gefragt wurden

Antwort-Format:
[Direkte Antwort in 1-3 Sätzen]

Quelle: [Dateiname]"""
    else:
        return f"""You are Gerki, the personal AI assistant of {name}.
You have access to {name}'s local documents and answer questions about them.

Rules:
- Always answer in English (unless the user writes in German)
- Be direct and concrete – no long introductions
- Always cite which file your information comes from
- If you cannot find the answer: say so honestly
- You are not a replacement for a lawyer, accountant, or doctor – mention this if needed
- Don't share information that wasn't asked for

Response format:
[Direct answer in 1-3 sentences]

Source: [filename]"""


def call_claude_api(question, context, config):
    """Sendet die Anfrage an die Claude API."""
    api_key = config.get("api_key", "")
    model = config.get("model", "claude-sonnet-4-6")

    if not api_key:
        print("Fehler: Kein API-Key konfiguriert.")
        sys.exit(1)

    system = build_system_prompt(config)

    if context:
        user_message = f"""Hier sind relevante Abschnitte aus meinen Dokumenten:

{context}

Meine Frage: {question}"""
    else:
        lang = config.get("language", "de")
        if lang == "de":
            user_message = f"""Ich habe folgende Frage, aber in meinen Dokumenten wurden keine direkten Treffer gefunden:

{question}

Antworte ehrlich, dass du keine passenden Dokumente gefunden hast, und gib wenn möglich einen allgemeinen Hinweis."""
        else:
            user_message = f"""I have the following question, but no relevant documents were found:

{question}

Please honestly state that you couldn't find matching documents, and provide general guidance if possible."""

    payload = {
        "model": model,
        "max_tokens": 1024,
        "system": system,
        "messages": [
            {"role": "user", "content": user_message}
        ]
    }

    data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=data,
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return result["content"][0]["text"]
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"API-Fehler {e.code}: {error_body}")
        sys.exit(1)
    except Exception as e:
        print(f"Verbindungsfehler: {e}")
        sys.exit(1)


def main():
    if len(sys.argv) < 2:
        print("Verwendung: python scripts/query.py \"Deine Frage\"")
        sys.exit(1)

    question = " ".join(sys.argv[1:])

    config = load_config()
    index = load_index()

    if not index:
        print("Index ist leer. Bitte zuerst ausführen: python scripts/index.py")
        sys.exit(1)

    relevant = find_relevant_chunks(question, index)
    context = build_context(relevant)

    print()
    answer = call_claude_api(question, context, config)
    print(answer)
    print()


if __name__ == "__main__":
    main()
