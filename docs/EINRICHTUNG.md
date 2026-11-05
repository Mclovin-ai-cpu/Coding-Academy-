# Version 4 einrichten: Login & KI

Version 4 (Branch `v4`) bringt zwei neue Funktionen, die nur mit Vercel funktionieren:

1. **Konto mit Login per E-Mail-Code** – dein Fortschritt liegt in Supabase und ist auf jedem Gerät da.
2. **Claude direkt fragen** – in Begriffen und Projekten, über die Serverfunktion `/api/ask`.

Ohne Zugangsdaten läuft die App wie v3 weiter, die neuen Bereiche zeigen dann einen Hinweis.

Die Bezeichnungen der Menüs können sich bei den Anbietern leicht ändern.

---

## Schritt 1 – Supabase-Projekt anlegen (ca. 10 Min.)

1. Auf **supabase.com** anmelden (z. B. mit GitHub) › **New project**. Name z. B. `academy`, Region **Frankfurt (eu-central-1)**, ein sicheres Datenbank-Passwort speichern.
2. Links **SQL Editor** › neue Abfrage › den Inhalt von [`supabase/setup.sql`](../supabase/setup.sql) einfügen › **Run**. Damit entsteht die Tabelle `academy_state` mit Row Level Security.
3. **Authentication › Emails › Templates › Magic Link**: im Text der E-Mail diese Zeile ergänzen, damit der Code in der Mail steht:
   ```
   Dein Code: {{ .Token }}
   ```
   (Der Code ist wichtig für die App auf dem Home-Bildschirm: Ein Link würde sich in Safari öffnen statt in der App.)
4. **Authentication › URL Configuration**: bei **Site URL** deine Vercel-Adresse eintragen, z. B. `https://academy-xyz.vercel.app`. Unter **Redirect URLs** zusätzlich `https://*.vercel.app/**` hinzufügen.
5. **Project Settings › API** (bzw. **API Keys**): die **Project URL** und den **anon / publishable key** kopieren. Den `service_role`/`secret`-Key brauchst du **nicht** – den nie in die App eintragen.

Optional, wenn nur du dich registrieren sollst: Nach deiner ersten Anmeldung unter **Authentication › Sign In / Providers** „Allow new users to sign up“ ausschalten.

## Schritt 2 – Claude-API-Key holen (ca. 5 Min.)

1. Auf **console.anthropic.com** anmelden › **API Keys** › **Create Key**. Den Key sofort kopieren (er wird nur einmal angezeigt).
2. Unter **Billing** Guthaben aufladen und unter **Limits** ein monatliches Ausgabenlimit setzen, z. B. 5 €.

## Schritt 3 – Werte bei Vercel eintragen

Im Vercel-Projekt › **Settings › Environment Variables** diese Werte anlegen (Umgebung: Production und Preview):

| Name | Wert | Geheim? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL aus Supabase | nein |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key | nein, durch RLS geschützt |
| `ANTHROPIC_API_KEY` | dein Claude-API-Key | **ja** |
| `ALLOWED_EMAILS` | deine E-Mail-Adresse (mehrere mit Komma) | nein – nur diese Konten dürfen die KI nutzen |
| `ANTHROPIC_MODEL` | optional, Standard `claude-haiku-5-5` (günstig und schnell) | nein |

Danach **Deployments** › beim neuesten Eintrag **⋯ › Redeploy**. Neue Werte wirken erst nach einem neuen Build.

## Schritt 4 – Testen

1. App öffnen › Profil › **Konto** › E-Mail eingeben › **Code per E-Mail senden**.
2. Code aus der Mail eintippen › **Anmelden**. Der Punkt am Avatar wird grün.
3. Einen Begriff öffnen › eigene Frage stellen › **Claude direkt fragen**.
4. Auf einem zweiten Gerät anmelden: Dein Fortschritt ist da.

## Gut zu wissen

- **Kosten:** Supabase und Vercel Hobby sind für dieses Projekt kostenlos. Claude wird pro Nutzung abgerechnet, eine Frage kostet mit Haiku in der Regel nur Bruchteile eines Cents. Aktuelle Preise beim Anbieter prüfen.
- **E-Mail-Versand:** Der eingebaute Mailversand von Supabase ist auf wenige Mails pro Stunde begrenzt. Für dich allein reicht das. Für einen Newsletter oder viele Nutzer brauchst du später einen eigenen Mail-Dienst.
- **Datenschutz:** Sobald andere Menschen ein Konto anlegen, brauchst du eine Datenschutzerklärung (Supabase, Vercel und Anthropic verarbeiten Daten).
- **Vercel-Schutz und App-Login:** Mit Deployment Protection meldest du dich zusätzlich bei Vercel an. Wenn dich das auf dem Handy stört, kannst du den Schutz später für die Produktionsadresse lockern – der eigene Login schützt dann deine Daten.
