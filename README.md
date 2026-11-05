# Coding Academy

> **Branches**
> - `main` – GitHub Pages: Version 2 unter `/Coding-Academy-/`, Version 3 als fertige Dateien unter `/Coding-Academy-/v3/`
> - `v3` – Quellcode von Version 3 (Grundlage für die GitHub-Pages-Fassung)
> - `vercel` – Version 3, wie sie ist, für Vercel (privat über Deployment Protection)
> - `v4` – Version 4 mit **Login (Supabase)** und **KI-Fragen an Claude**, nur auf Vercel lauffähig. Einrichtung: [docs/EINRICHTUNG.md](docs/EINRICHTUNG.md)

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
npm run build         # Build für Vercel
```

## Aufbau

- `src/components/Shell.tsx` – Rahmen mit Pfad-Kopfzeile, Navigation und Routen (`#/lernen/html`, `#/karten/markiert`, `#/praxis/grundgeruest` …)
- `src/components/views/` – Home, Lernen, Lektion, Karten, Praxis, Mission, Projekte, Projekt, Profil
- `src/lib/state.ts` – Datenmodell, Migration von v2, XP/Level/Serie/Abzeichen
- `src/lib/app.tsx` – Speichern, Toasts, Markieren, Navigation
- `src/lib/account.tsx` – Login per E-Mail-Code und Abgleich mit Supabase (v4)
- `src/app/api/ask/route.ts` – Serverfunktion für Fragen an Claude (v4)
- `supabase/setup.sql` – Tabelle und Zugriffsregeln für Supabase (v4)

Die alte Ein-Datei-Version liegt unter `archiv/v2-index.html`.
