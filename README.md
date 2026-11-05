# Coding Academy

Dieser Branch (`main`) wird von **GitHub Pages** veröffentlicht:

- **Version 2** (eine einzelne `index.html`): https://mclovin-ai-cpu.github.io/Coding-Academy-/
- **Version 3** (fertig gebaute Dateien im Ordner `v3/`): https://mclovin-ai-cpu.github.io/Coding-Academy-/v3/

Den Quellcode von Version 3 findest du auf den Branches [`v3`](../../tree/v3) (Grundlage für die GitHub-Pages-Fassung) und [`vercel`](../../tree/vercel) (wird von Vercel automatisch gebaut).

Der Ordner `v3/` wird nicht von Hand bearbeitet: Er entsteht mit `npm run build:pages` auf dem Branch `v3` (Ordner `out/`).
`.nojekyll` sorgt dafür, dass GitHub Pages den Ordner `_next/` mit ausliefert.
