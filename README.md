# Coding Academy v3

> Branches: **`v3`** = diese Next.js-App (Vercel) · **`main`** = Version 2 als einzelne index.html (GitHub Pages)

Lern-App für Vibecoding-Grundlagen: Lektionen, Begriffskarten, freiwillige Praxis-Missionen und eigene Projekte.

**Technik:** Next.js + Tailwind CSS, Hosting über Vercel. Fortschritt wird im Browser gespeichert (localStorage, Schlüssel `codingAcademy.v3`). Vorhandene v2-Daten (`codingAcademy.v2`) werden beim ersten Start automatisch übernommen, Backups aus v2 lassen sich im Profil importieren.

## Inhalte bearbeiten

Alle Inhalte liegen als Daten-Dateien in `src/data/`:

| Datei | Inhalt |
| --- | --- |
| `courses.ts` | Kurse und Reihenfolge der Lektionen |
| `lessons.ts` | 27 Lektionen (Erklärung, Beispiel, Tipp, Übung, Quiz) |
| `cards.ts` | Begriffskarten fürs Glossar (kurz, Vorstellung, Beispiel, warum wichtig, verwandte Begriffe). Eigene Begriffe legst du direkt in der App an (Karten › Glossar). |
| `missions.ts` | Praxis-Missionen (Spielerisch · Mit KI · Echt bauen) und die Strecke „Idee umsetzen“ |
| `templates.ts` | Projektvorlagen mit To-dos |

## Lokal starten

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktions-Build prüfen
```

## Aufbau

- `src/components/Shell.tsx` – Rahmen mit Pfad-Kopfzeile, Navigation und Routen (`#/lernen/html`, `#/karten/markiert`, `#/praxis/grundgeruest` …)
- `src/components/views/` – Home, Lernen, Lektion, Karten, Praxis, Mission, Projekte, Projekt, Profil
- `src/lib/state.ts` – Datenmodell, Migration von v2, XP/Level/Serie/Abzeichen
- `src/lib/app.tsx` – Speichern, Toasts, Markieren, Navigation

Die alte Ein-Datei-Version liegt unter `archiv/v2-index.html`.
