#!/usr/bin/env python3
"""
Gerki Setup-Wizard
Einmalige Einrichtung: Name, Ordner, Sprache, API-Key – und direkt Indexierung.
Ein einziger Lauf, danach ist Gerki sofort einsatzbereit.
"""

import json
import os
import sys
import importlib.util
from pathlib import Path

CONFIG_DIR = Path.home() / ".gerki"
CONFIG_FILE = CONFIG_DIR / "config.json"


def print_banner():
    print()
    print("=" * 50)
    print("  Willkommen bei Gerki!")
    print("  Dein lokaler KI-Assistent")
    print("=" * 50)
    print()


def ask(question, default=None):
    if default:
        prompt = f"{question} [{default}]: "
    else:
        prompt = f"{question}: "
    answer = input(prompt).strip()
    return answer if answer else default


def setup_name():
    print("Schritt 1/4: Dein Name")
    print("-" * 30)
    name = ask("Wie heißt du?")
    while not name:
        print("Bitte gib deinen Namen ein.")
        name = ask("Wie heißt du?")
    return name


def setup_language():
    print()
    print("Schritt 2/4: Sprache")
    print("-" * 30)
    print("1) Deutsch (Standard)")
    print("2) English")
    choice = ask("Deine Wahl (1 oder 2)", "1")
    return "de" if choice != "2" else "en"


def setup_folders():
    print()
    print("Schritt 3/4: Deine Ordner")
    print("-" * 30)
    print("Gerki liest Dokumente aus diesen Ordnern.")
    print("Du kannst mehrere Ordner angeben.")
    print("Drücke Enter ohne Eingabe um fertig zu sein.")
    print()

    folders = []
    while True:
        folder = ask(f"Ordner {len(folders) + 1} (Pfad)")
        if not folder:
            if not folders:
                print("Bitte gib mindestens einen Ordner an.")
                continue
            break

        path = Path(folder)
        if not path.exists():
            print(f"  Warnung: Ordner '{folder}' existiert nicht. Trotzdem hinzufügen? (j/n)")
            confirm = input().strip().lower()
            if confirm not in ("j", "y", "ja", "yes"):
                continue

        folders.append(str(path))
        print(f"  ✓ Hinzugefügt: {folder}")

    return folders


def setup_api_key():
    print()
    print("Schritt 4/4: API-Key")
    print("-" * 30)
    print("Gerki benötigt einen Anthropic API-Key.")
    print("Hol dir einen kostenlos auf: console.anthropic.com")
    print()

    api_key = ask("Dein Anthropic API-Key (sk-ant-...)")
    while not api_key or not api_key.startswith("sk-"):
        print("Ungültiger API-Key. Er muss mit 'sk-' beginnen.")
        api_key = ask("Dein Anthropic API-Key")

    return api_key


def save_config(config):
    CONFIG_DIR.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)


def run_indexing():
    """Führt die Indexierung direkt im selben Prozess aus."""
    index_script = Path(__file__).parent / "index.py"
    if not index_script.exists():
        print("  Warnung: index.py nicht gefunden – übersprungen.")
        return

    spec = importlib.util.spec_from_file_location("gerki_index", index_script)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.main()


def main():
    # Existing config check
    if CONFIG_FILE.exists():
        print()
        print("Gerki ist bereits eingerichtet.")
        print(f"Konfiguration: {CONFIG_FILE}")
        print()
        overwrite = input("Neu einrichten? (j/n): ").strip().lower()
        if overwrite not in ("j", "y", "ja", "yes"):
            print("Setup abgebrochen.")
            return

    print_banner()

    name = setup_name()
    language = setup_language()
    folders = setup_folders()
    api_key = setup_api_key()

    config = {
        "name": name,
        "language": language,
        "folders": folders,
        "api_key": api_key,
        "model": "claude-sonnet-4-6",
        "last_indexed": None
    }

    save_config(config)

    print()
    print("=" * 50)
    print(f"  Konfiguration gespeichert. Hallo, {name}!")
    print("=" * 50)
    print()
    print("Dokumente werden jetzt eingelesen...")
    print()

    run_indexing()

    print()
    print("=" * 50)
    print(f"  Gerki ist bereit, {name}!")
    print("=" * 50)
    print()
    print("Fragen stellen:")
    print()
    print('  python scripts/query.py "Deine Frage"')
    print()
    print("Index aktualisieren (nach neuen Dateien):")
    print()
    print("  python scripts/index.py --update")
    print()


if __name__ == "__main__":
    main()
