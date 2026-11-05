// Automatisch aus v2 übernommen und für v3 ergänzt. Inhalte hier direkt bearbeiten.
import type { Card } from "./types";

export const CARDS: Record<string, Card> = {
  "browser": {
    "t": "Browser",
    "s": "Programm, das Websites anzeigt (Safari, Chrome).",
    "a": "Wie ein Fernseher: Er zeigt an, was gesendet wird, produziert aber selbst nichts.",
    "e": "Safari auf deinem iPhone öffnet gerade diese App.",
    "w": "Deine Seite muss in allen gängigen Browsern gut aussehen.",
    "r": [
      "server",
      "client",
      "request"
    ]
  },
  "server": {
    "t": "Server",
    "s": "Computer, der Dateien oder Daten bereitstellt.",
    "a": "Stell dir einen Computer ohne Bildschirm vor, der in einem klimatisierten Rechenzentrum im Regal steht, Tag und Nacht läuft und auf Anfragen wartet. Wie ein Lager mit Mitarbeiter: Du bestellst, er sucht die Ware heraus und schickt sie dir.",
    "e": "Wenn du deine Academy öffnest, schickt ein Server von Vercel die Seite an dein Handy.",
    "w": "Ohne Server ist deine Website nur auf deinem eigenen Gerät sichtbar.",
    "r": [
      "browser",
      "client",
      "request"
    ]
  },
  "client": {
    "t": "Client",
    "s": "Das Gerät oder Programm, das etwas anfragt.",
    "a": "Der Kunde im Restaurant: Er bestellt (Anfrage), die Küche (Server) liefert.",
    "e": "Dein iPhone mit Safari ist der Client.",
    "w": "„Clientseitig“ heißt: läuft auf dem Gerät des Nutzers, nicht auf dem Server.",
    "r": [
      "browser",
      "server",
      "request"
    ]
  },
  "request": {
    "t": "Request / Response",
    "s": "Anfrage an den Server und seine Antwort.",
    "a": "Wie eine Bestellung und die Lieferung.",
    "e": "Browser: „Gib mir index.html“ → Server: „Hier ist sie.“",
    "w": "Jeder Klick, der Daten lädt, ist ein Request. Viele davon machen eine Seite langsam.",
    "r": [
      "browser",
      "server",
      "client"
    ]
  },
  "domain": {
    "t": "Domain",
    "s": "Die Internetadresse einer Website.",
    "a": "Wie die Hausnummer und der Straßenname deines Ladens.",
    "e": "meinshop.de, coding-academy.vercel.app",
    "w": "Eine gute Domain ist kurz, merkbar und passt zur Marke.",
    "r": [
      "dns",
      "hosting",
      "https",
      "freetier",
      "nutzungsbasiert"
    ]
  },
  "dns": {
    "t": "DNS",
    "s": "Übersetzt Domains in Server-Adressen (IP).",
    "a": "Das Telefonbuch des Internets: Name rein, Nummer raus.",
    "e": "meinshop.de → 76.76.21.21",
    "w": "Wenn du eine Domain mit Vercel verbindest, trägst du DNS-Einträge ein.",
    "r": [
      "domain",
      "hosting",
      "https"
    ]
  },
  "hosting": {
    "t": "Hosting",
    "s": "Speicherplatz und Server für deine Website.",
    "a": "Die gemietete Ladenfläche, auf der deine Ware steht.",
    "e": "GitHub Pages, Vercel, Netlify, IONOS",
    "w": "Bestimmt Kosten, Geschwindigkeit und was technisch möglich ist.",
    "r": [
      "domain",
      "dns",
      "https",
      "freetier",
      "nutzungsbasiert"
    ]
  },
  "https": {
    "t": "HTTPS / SSL",
    "s": "Verschlüsselte Verbindung, erkennbar am Schloss.",
    "a": "Ein versiegelter Briefumschlag statt einer Postkarte.",
    "e": "https://meinshop.de",
    "w": "Ohne HTTPS warnen Browser die Besucher, und Google rankt schlechter.",
    "r": [
      "domain",
      "dns",
      "hosting"
    ]
  },
  "html": {
    "t": "HTML",
    "s": "Sprache für Struktur und Inhalt einer Seite.",
    "a": "Das Skelett bzw. der Rohbau eines Hauses.",
    "e": "<h1>Willkommen</h1>",
    "w": "Wenn du HTML lesen kannst, verstehst du, was die KI gebaut hat.",
    "r": [
      "tag"
    ]
  },
  "tag": {
    "t": "Tag",
    "s": "Baustein in HTML, z. B. <p> oder <a>.",
    "a": "Wie ein Etikett: „Das hier ist eine Überschrift.“",
    "e": "<a href=\"/kontakt\">Kontakt</a> ist ein Link.",
    "w": "Mit Tag-Namen kannst du der KI genau sagen, was sie ändern soll.",
    "r": [
      "html"
    ]
  },
  "css": {
    "t": "CSS",
    "s": "Sprache für das Aussehen: Farben, Schriften, Layout.",
    "a": "Farbe, Tapete und Möbel im Rohbau.",
    "e": "h1 { color: green; }",
    "w": "Damit setzt du dein Corporate Design um.",
    "r": [
      "responsive",
      "designtoken",
      "tailwind"
    ]
  },
  "responsive": {
    "t": "Responsive",
    "s": "Layout passt sich an jede Bildschirmgröße an.",
    "a": "Wie Wasser, das die Form jedes Glases annimmt.",
    "e": "Auf dem Handy eine Spalte, am Desktop drei.",
    "w": "Die meisten Besucher kommen mobil.",
    "r": [
      "css"
    ]
  },
  "javascript": {
    "t": "JavaScript",
    "s": "Programmiersprache für Logik im Browser.",
    "a": "Der Strom und die Elektrik im Haus: Lichtschalter, Klingel, Rollläden.",
    "e": "Ein Klick auf „Antwort prüfen“ in dieser App.",
    "w": "Fast jede interaktive Funktion braucht JavaScript.",
    "r": [
      "funktion",
      "localstorage"
    ]
  },
  "funktion": {
    "t": "Funktion",
    "s": "Benannter Code-Block, der eine Aufgabe erledigt.",
    "a": "Ein Rezept: einmal aufschreiben, beliebig oft kochen.",
    "e": "function endpreis(preis, rabatt) { … }",
    "w": "KI-Code ist in Funktionen gegliedert. Die Namen verraten, was sie tun.",
    "r": [
      "javascript",
      "localstorage"
    ]
  },
  "localstorage": {
    "t": "localStorage",
    "s": "Kleiner Speicher im Browser auf deinem Gerät.",
    "a": "Ein Notizzettel, der an deinem Browser klebt, nur für dich.",
    "e": "Diese App merkt sich so deine XP und Projekte.",
    "w": "Gut für den Start. Wechselst du Gerät oder Browser, sind die Daten dort nicht da.",
    "r": [
      "javascript",
      "funktion",
      "supabase",
      "datenbank"
    ]
  },
  "editor": {
    "t": "Code-Editor",
    "s": "Programm zum Schreiben von Code.",
    "a": "Word, nur für Code, mit Farben und Hilfen.",
    "e": "VS Code, Cursor, Zed",
    "w": "Cursor hat KI eingebaut und ist beliebt fürs Vibecoding.",
    "r": [
      "git",
      "repository",
      "commit"
    ]
  },
  "git": {
    "t": "Git",
    "s": "Versionsverwaltung für Code.",
    "a": "Speicherpunkte in einem Videospiel.",
    "e": "git commit -m \"Startseite fertig\"",
    "w": "Du kannst jede kaputte Änderung rückgängig machen.",
    "r": [
      "editor",
      "repository",
      "commit",
      "branch"
    ]
  },
  "repository": {
    "t": "Repository",
    "s": "Projektordner mit allen Dateien und ihrer Historie.",
    "a": "Ein Aktenordner mit allen Versionen eines Vertrags.",
    "e": "Dein Repo „Coding-Academy-“ auf GitHub.",
    "w": "Vercel und andere Dienste lesen direkt aus deinem Repository.",
    "r": [
      "editor",
      "git",
      "commit",
      "claudecode",
      "agent",
      "branch"
    ]
  },
  "commit": {
    "t": "Commit",
    "s": "Gespeicherter Stand mit kurzer Beschreibung.",
    "a": "Ein Foto deines Projekts zu einem Zeitpunkt.",
    "e": "„Hell/Dunkel-Modus ergänzt“",
    "w": "Jeder Commit kann bei Vercel ein neues Deployment auslösen.",
    "r": [
      "editor",
      "git",
      "repository",
      "claudecode",
      "agent",
      "branch"
    ]
  },
  "deployment": {
    "t": "Deployment",
    "s": "Veröffentlichen deiner App auf einem Server.",
    "a": "Die Ladeneröffnung: Die Ware kommt vom Lager ins Schaufenster.",
    "e": "Push zu GitHub → Vercel deployt automatisch.",
    "w": "Erst nach dem Deployment können andere deine App nutzen.",
    "r": [
      "vercel",
      "statisch",
      "preview",
      "commit"
    ]
  },
  "vercel": {
    "t": "Vercel",
    "s": "Hosting-Plattform mit automatischem Deployment aus GitHub.",
    "a": "Ein Lieferdienst, der jede neue Version sofort in den Laden stellt.",
    "e": "coding-academy.vercel.app",
    "w": "Kann Seiten per Login schützen und Serverfunktionen ausführen.",
    "r": [
      "deployment",
      "statisch",
      "preview",
      "envvar"
    ]
  },
  "statisch": {
    "t": "Statische Seite",
    "s": "Seite aus fertigen Dateien, ohne Server-Logik.",
    "a": "Ein gedruckter Flyer: Alle sehen dasselbe.",
    "e": "Eine Landingpage aus fertigen HTML-Dateien, ohne Login und Datenbank.",
    "w": "Günstig und schnell. Für Logins oder echte KI brauchst du mehr.",
    "r": [
      "deployment",
      "vercel"
    ]
  },
  "frontend": {
    "t": "Frontend",
    "s": "Der sichtbare Teil einer App.",
    "a": "Der Verkaufsraum mit Theke und Schaufenster.",
    "e": "Buttons, Texte, Formulare",
    "w": "Alles im Frontend kann jeder Besucher einsehen.",
    "r": [
      "backend",
      "datenbank",
      "api",
      "auth",
      "supabase"
    ]
  },
  "backend": {
    "t": "Backend",
    "s": "Der unsichtbare Teil: Logik, Daten, Logins.",
    "a": "Lager, Buchhaltung und Büro hinter dem Laden.",
    "e": "Bestellung speichern, Bestätigungsmail senden",
    "w": "Sobald Daten zwischen Nutzern geteilt werden, brauchst du ein Backend.",
    "r": [
      "frontend",
      "datenbank",
      "api",
      "auth",
      "supabase"
    ]
  },
  "datenbank": {
    "t": "Datenbank",
    "s": "Strukturierter Speicher für Daten.",
    "a": "Eine riesige, blitzschnelle Excel-Tabelle.",
    "e": "Tabelle „Produkte“ mit Name, Preis, Bestand",
    "w": "Kunden, Bestellungen und Inhalte leben hier.",
    "r": [
      "frontend",
      "backend",
      "api",
      "auth",
      "supabase",
      "tabelle"
    ]
  },
  "api": {
    "t": "API",
    "s": "Schnittstelle, über die Programme Daten austauschen.",
    "a": "Ein Kellner: Er nimmt deine Bestellung auf und bringt das Essen aus der Küche.",
    "e": "fetch(\"/api/produkte\") holt Produktdaten.",
    "w": "Über APIs bindest du Zahlung, KI, Karten oder Wetter ein.",
    "r": [
      "frontend",
      "backend",
      "datenbank",
      "auth",
      "supabase",
      "webhook"
    ]
  },
  "auth": {
    "t": "Auth (Login)",
    "s": "Anmeldung und Prüfung, wer jemand ist.",
    "a": "Der Türsteher, der den Ausweis prüft.",
    "e": "Login mit E-Mail oder Google",
    "w": "Selbst bauen ist riskant. Nutze fertige Lösungen wie Supabase Auth.",
    "r": [
      "frontend",
      "backend",
      "datenbank",
      "api",
      "supabase",
      "tabelle"
    ]
  },
  "supabase": {
    "t": "Supabase",
    "s": "Fertiges Backend: Datenbank, Login, Speicher.",
    "a": "Ein voll eingerichtetes Büro zur Miete.",
    "e": "Projekte dieser App könnten dort statt im localStorage liegen.",
    "w": "Damit hast du deine Daten auf jedem Gerät.",
    "r": [
      "frontend",
      "backend",
      "datenbank",
      "api",
      "auth",
      "tabelle"
    ]
  },
  "stripe": {
    "t": "Stripe",
    "s": "Anbieter für Online-Zahlungen.",
    "a": "Das Kartenterminal deines Online-Ladens.",
    "e": "Stripe Checkout, Abos, Rechnungen",
    "w": "Spart dir Sicherheitsaufwand und Haftungsrisiken.",
    "r": [
      "webhook"
    ]
  },
  "webhook": {
    "t": "Webhook",
    "s": "Automatische Nachricht bei einem Ereignis.",
    "a": "Die Türklingel: Jemand ist da, du reagierst.",
    "e": "Stripe meldet „Zahlung erfolgreich“ → Zugang freischalten.",
    "w": "Damit verbindest du Dienste ohne ständiges Nachfragen.",
    "r": [
      "stripe",
      "api"
    ]
  },
  "framework": {
    "t": "Framework",
    "s": "Baukasten mit Regeln und fertigen Teilen.",
    "a": "Ein Fertighaus-System statt jeden Ziegel selbst zu brennen.",
    "e": "React, Next.js, Vue",
    "w": "KI-Tools nutzen fast immer ein Framework. Du solltest wissen, welches.",
    "r": [
      "react",
      "nextjs",
      "komponente",
      "tailwind"
    ]
  },
  "react": {
    "t": "React",
    "s": "Bibliothek für Oberflächen aus Komponenten.",
    "a": "LEGO für Benutzeroberflächen.",
    "e": "<ProduktKarte name=\"Rad\" />",
    "w": "Sehr verbreitet, riesige Community, viel KI-Wissen.",
    "r": [
      "framework",
      "nextjs",
      "komponente",
      "tailwind"
    ]
  },
  "nextjs": {
    "t": "Next.js",
    "s": "Framework auf Basis von React, mit Seiten und Server.",
    "a": "React plus Statik, Elektrik und Fundament.",
    "e": "Viele Vercel-Projekte laufen mit Next.js.",
    "w": "Guter Standard, wenn du mehr als eine statische Seite brauchst.",
    "r": [
      "framework",
      "react",
      "komponente",
      "tailwind"
    ]
  },
  "komponente": {
    "t": "Komponente",
    "s": "Wiederverwendbarer Baustein der Oberfläche.",
    "a": "Ein Fertigbauteil wie ein Fenster, das in jedes Haus passt.",
    "e": "Button, Karte, Navigation",
    "w": "Mit Komponenten-Namen kannst du der KI Änderungen gezielt beschreiben.",
    "r": [
      "framework",
      "react",
      "nextjs",
      "tailwind",
      "designsystem",
      "designtoken"
    ]
  },
  "tailwind": {
    "t": "Tailwind CSS",
    "s": "CSS-Framework mit kurzen Klassen.",
    "a": "Ein Stempelkasten statt jedes Mal frei zu malen.",
    "e": "class=\"rounded-xl p-4 bg-green-500\"",
    "w": "KI-Tools erzeugen sehr oft Tailwind-Code.",
    "r": [
      "framework",
      "react",
      "nextjs",
      "komponente"
    ]
  },
  "stack": {
    "t": "Stack",
    "s": "Die Kombination deiner Technologien.",
    "a": "Die Zutatenliste deines Rezepts.",
    "e": "Next.js + Supabase + Vercel",
    "w": "Den Stack früh festlegen spart später Umbauten.",
    "r": [
      "nocode"
    ]
  },
  "nocode": {
    "t": "No-Code",
    "s": "Seiten und Apps bauen ohne zu programmieren.",
    "a": "Ein Möbelhaus statt einer Schreinerei.",
    "e": "WordPress, Webflow, Framer, Shopify",
    "w": "Ideal, um Ideen schnell am Markt zu testen.",
    "r": [
      "stack"
    ]
  },
  "webapp": {
    "t": "Web-App",
    "s": "Anwendung, die im Browser läuft.",
    "a": "Ein Werkzeug statt eines Prospekts.",
    "e": "Diese Academy, Google Docs",
    "w": "Eine Codebasis für alle Geräte.",
    "r": [
      "pwa",
      "native"
    ]
  },
  "pwa": {
    "t": "PWA",
    "s": "Web-App, die man wie eine App installieren kann.",
    "a": "Eine Website, die einen eigenen Schlüssel für deinen Home-Bildschirm bekommt.",
    "e": "Safari → Teilen → Zum Home-Bildschirm",
    "w": "App-Gefühl ohne App Store und ohne Gebühren.",
    "r": [
      "webapp",
      "native"
    ]
  },
  "native": {
    "t": "Native App",
    "s": "App speziell für iOS oder Android.",
    "a": "Ein Maßanzug statt Konfektion.",
    "e": "Swift (iOS), Kotlin (Android), React Native",
    "w": "Teurer, aber vollen Zugriff auf Handy-Funktionen.",
    "r": [
      "webapp",
      "pwa"
    ]
  },
  "vibecoding": {
    "t": "Vibecoding",
    "s": "Software bauen, indem du einer KI beschreibst, was du willst.",
    "a": "Du bist Bauherr mit Architektin: Du beschreibst, sie zeichnet und baut.",
    "e": "Diese Academy ist so entstanden.",
    "w": "Du brauchst weniger Code-Wissen, aber mehr Begriffswissen und Urteilsvermögen.",
    "r": [
      "prompt",
      "kontext"
    ]
  },
  "prompt": {
    "t": "Prompt",
    "s": "Deine Anweisung an die KI.",
    "a": "Ein Briefing an eine Agentur.",
    "e": "„Baue eine Landingpage für …“",
    "w": "Die Qualität des Prompts bestimmt die Qualität des Ergebnisses.",
    "r": [
      "vibecoding",
      "kontext"
    ]
  },
  "kontext": {
    "t": "Kontext",
    "s": "Alle Infos, die die KI für die Aufgabe braucht.",
    "a": "Die Einarbeitungsmappe für neue Mitarbeitende.",
    "e": "Ziel, Zielgruppe, bestehender Code, Grenzen",
    "w": "Ohne Kontext rät die KI, mit Kontext trifft sie.",
    "r": [
      "vibecoding",
      "prompt"
    ]
  },
  "iteration": {
    "t": "Iteration",
    "s": "Schrittweise verbessern in kleinen Runden.",
    "a": "Wie Bildhauen: Stück für Stück, nicht alles auf einmal.",
    "e": "Erst Layout, dann Farben, dann Funktionen.",
    "w": "Kleine Schritte sind leichter zu prüfen und zu reparieren.",
    "r": [
      "mvp"
    ]
  },
  "mvp": {
    "t": "MVP",
    "s": "Minimum Viable Product, die kleinste nützliche Version.",
    "a": "Erst ein Skateboard, dann ein Fahrrad, dann ein Auto.",
    "e": "Landingpage mit Anfrageformular statt kompletter Plattform.",
    "w": "Spart Zeit und Geld, bevor du weißt, ob die Idee ankommt.",
    "r": [
      "iteration"
    ]
  },
  "bug": {
    "t": "Bug",
    "s": "Fehler im Programm.",
    "a": "Ein Wackelkontakt in der Elektrik.",
    "e": "Der Button reagiert nicht.",
    "w": "Bugs genau beschreiben ist die halbe Lösung.",
    "r": [
      "konsole"
    ]
  },
  "konsole": {
    "t": "Konsole",
    "s": "Bereich im Browser, der Fehlermeldungen zeigt.",
    "a": "Das Armaturenbrett mit den Warnleuchten.",
    "e": "Uncaught TypeError …",
    "w": "Die Fehlermeldung von dort ist Gold wert für die KI.",
    "r": [
      "bug"
    ]
  },
  "apikey": {
    "t": "API-Key",
    "s": "Geheimer Schlüssel für den Zugang zu einem Dienst.",
    "a": "Die Kreditkarte deiner App.",
    "e": "Ein Key für Stripe oder eine KI-Schnittstelle",
    "w": "Wer deinen Key hat, kann auf deine Kosten Dienste nutzen.",
    "r": [
      "envvar",
      "api",
      "rls"
    ]
  },
  "envvar": {
    "t": "Umgebungsvariable",
    "s": "Geheimer Wert, der nur auf dem Server liegt.",
    "a": "Ein Tresor im Hinterzimmer statt Geld in der Schaufensterauslage.",
    "e": "process.env.API_KEY",
    "w": "So bleiben Keys aus dem öffentlichen Code heraus.",
    "r": [
      "apikey"
    ]
  },
  "impressum": {
    "t": "Impressum",
    "s": "Pflichtangaben zum Anbieter einer Website.",
    "a": "Das Klingelschild mit Namen und Adresse.",
    "e": "Name, Anschrift, E-Mail, ggf. Handelsregister",
    "w": "Fehlt es, drohen Abmahnungen.",
    "r": [
      "dsgvo",
      "cookie"
    ]
  },
  "dsgvo": {
    "t": "DSGVO",
    "s": "EU-Regeln zum Umgang mit personenbezogenen Daten.",
    "a": "Die Hausordnung für fremde Daten.",
    "e": "Kontaktformular, Newsletter, Analytics",
    "w": "Gilt auch für kleine Projekte, sobald du Daten sammelst.",
    "r": [
      "impressum",
      "cookie"
    ]
  },
  "cookie": {
    "t": "Cookie",
    "s": "Kleine Datei, die eine Website im Browser speichert.",
    "a": "Eine Garderobenmarke: Daran erkennt dich die Seite wieder.",
    "e": "Login merken, Tracking",
    "w": "Nicht notwendige Cookies brauchen eine Einwilligung.",
    "r": [
      "impressum",
      "dsgvo"
    ]
  },
  "affiliate": {
    "t": "Affiliate",
    "s": "Provision für vermittelte Verkäufe über Links.",
    "a": "Ein Tippgeber, der pro vermitteltem Kunden bezahlt wird.",
    "e": "Amazon PartnerNet, awin",
    "w": "Ein beliebtes Modell für Inhaltsseiten und Vergleichsportale.",
    "r": [
      "freemium",
      "abo"
    ]
  },
  "freemium": {
    "t": "Freemium",
    "s": "Basis gratis, Extras kostenpflichtig.",
    "a": "Probefahrt gratis, Ausstattung kostet.",
    "e": "Spotify, Canva",
    "w": "Senkt die Einstiegshürde für Nutzer.",
    "r": [
      "affiliate",
      "abo"
    ]
  },
  "abo": {
    "t": "Abo-Modell",
    "s": "Regelmäßige Zahlung für fortlaufenden Zugang.",
    "a": "Wie ein Fitnessstudio-Vertrag.",
    "e": "9 € im Monat für Premium-Funktionen",
    "w": "Planbare, wiederkehrende Umsätze.",
    "r": [
      "affiliate",
      "freemium"
    ]
  },
  "seo": {
    "t": "SEO",
    "s": "Optimierung, damit Suchmaschinen deine Seite finden.",
    "a": "Dein Laden in der Fußgängerzone statt im Hinterhof.",
    "e": "Titel, Beschreibung, Ladezeit, gute Inhalte",
    "w": "Kostenlose, dauerhafte Besucher.",
    "r": [
      "analytics",
      "conversion",
      "ladezeit"
    ]
  },
  "analytics": {
    "t": "Analytics",
    "s": "Messen, wer kommt und was Besucher tun.",
    "a": "Der Kundenzähler und die Kameras im Laden, nur anonym.",
    "e": "Plausible, Matomo, Google Analytics",
    "w": "Ohne Messen kein Optimieren.",
    "r": [
      "seo",
      "conversion"
    ]
  },
  "conversion": {
    "t": "Conversion",
    "s": "Die gewünschte Aktion eines Besuchers.",
    "a": "Aus einem Schaufenstergucker wird ein Käufer.",
    "e": "Kauf, Anfrage, Newsletter-Anmeldung",
    "w": "Daran misst du, ob deine Seite ihren Zweck erfüllt.",
    "r": [
      "seo",
      "analytics",
      "userflow"
    ]
  },
  "claudecode": {
    "t": "Claude Code",
    "s": "KI-Werkzeug, das direkt im Projekt Code liest, ändert und testet.",
    "a": "Eine Entwicklerin, die bei dir im Büro sitzt und direkt in deinen Ordnern arbeitet, statt dir Zettel zu schicken.",
    "e": "„Füge einen Dunkelmodus hinzu“ → Claude Code ändert die Dateien und macht einen Commit.",
    "w": "Damit baust du größere Änderungen, ohne Code hin und her zu kopieren.",
    "r": [
      "agent",
      "repository",
      "commit",
      "handoff",
      "designtoken",
      "vibecoding"
    ]
  },
  "agent": {
    "t": "Agent",
    "s": "KI, die mehrere Schritte selbstständig plant und ausführt.",
    "a": "Ein Assistent, dem du ein Ziel gibst statt jeder einzelnen Anweisung.",
    "e": "Suchen → ändern → testen → committen in einem Durchgang.",
    "w": "Klare Ziele und Grenzen machen Agenten zuverlässig.",
    "r": [
      "claudecode",
      "repository",
      "commit"
    ]
  },
  "branch": {
    "t": "Branch",
    "s": "Abzweig im Repository zum gefahrlosen Ausprobieren.",
    "a": "Eine Kopie deines Entwurfs, auf der du herumkritzeln darfst, während das Original sicher liegt.",
    "e": "Branch „dunkelmodus“ neben „main“.",
    "w": "Die Live-Seite bleibt heil, während du baust.",
    "r": [
      "pullrequest",
      "merge",
      "preview",
      "repository"
    ]
  },
  "pullrequest": {
    "t": "Pull Request",
    "s": "Antrag, Änderungen aus einem Branch zu übernehmen.",
    "a": "Ein Änderungsantrag, den jemand prüft und abzeichnet.",
    "e": "„Dunkelmodus ergänzt“ – 2 Dateien geändert, bitte prüfen.",
    "w": "Hier siehst du genau, was die KI geändert hat, bevor es live geht.",
    "r": [
      "branch",
      "merge",
      "preview"
    ]
  },
  "merge": {
    "t": "Merge",
    "s": "Zusammenführen eines Branches in einen anderen.",
    "a": "Der genehmigte Entwurf wird ins Original übernommen.",
    "e": "Branch „dunkelmodus“ → main → Vercel deployt.",
    "w": "Erst nach dem Merge in main ist die Änderung live.",
    "r": [
      "branch",
      "pullrequest",
      "preview"
    ]
  },
  "preview": {
    "t": "Preview-Deployment",
    "s": "Eigene Vorschau-Adresse für einen Branch.",
    "a": "Eine Probefahrt, bevor das Auto ausgeliefert wird.",
    "e": "coding-academy-git-dunkelmodus.vercel.app",
    "w": "Du testest auf dem Handy, ohne die echte Seite anzufassen.",
    "r": [
      "branch",
      "pullrequest",
      "merge"
    ]
  },
  "handoff": {
    "t": "Handoff",
    "s": "Übergabe eines Designs an die Umsetzung im Code.",
    "a": "Die Übergabe der Baupläne vom Architekten an die Baufirma.",
    "e": "Screens, Farben, Schriften und Regeln als Paket für Claude Code.",
    "w": "Je vollständiger die Übergabe, desto weniger rät die KI.",
    "r": [
      "designtoken",
      "claudecode",
      "designsystem"
    ]
  },
  "ux": {
    "t": "UX / UI",
    "s": "UX ist das Nutzungserlebnis, UI die sichtbare Oberfläche.",
    "a": "UX ist, wie gut ein Restaurantbesuch läuft. UI sind Tische, Karte und Deko.",
    "e": "UX: Anfrage in zwei Klicks. UI: grüner, runder Button.",
    "w": "Gute UX bringt Conversions, nicht nur schöne Farben.",
    "r": [
      "userflow",
      "wireframe"
    ]
  },
  "userflow": {
    "t": "User Flow",
    "s": "Der Weg eines Nutzers durch deine App bis zum Ziel.",
    "a": "Der Weg durch den Supermarkt bis zur Kasse.",
    "e": "Startseite → Produkt → Anfrage senden",
    "w": "Jeder unnötige Schritt verliert Besucher.",
    "r": [
      "ux",
      "wireframe"
    ]
  },
  "wireframe": {
    "t": "Wireframe",
    "s": "Grobe Skizze einer Seite aus Kästen, ohne Design.",
    "a": "Der Grundriss, bevor die Tapete ausgesucht wird.",
    "e": "Kasten „Hero“, drei Kästen „Vorteile“, Kasten „Kontakt“.",
    "w": "Spart Zeit: Struktur klären, bevor Details entstehen.",
    "r": [
      "ux",
      "userflow"
    ]
  },
  "designsystem": {
    "t": "Design-System",
    "s": "Sammlung aller Gestaltungsregeln und Bausteine.",
    "a": "Das Markenhandbuch plus der Baukasten dazu.",
    "e": "Farben, Schriften, Abstände, Buttons, Karten",
    "w": "Alles sieht einheitlich aus, auch wenn die KI neue Seiten baut.",
    "r": [
      "designtoken",
      "typografie",
      "komponente"
    ]
  },
  "designtoken": {
    "t": "Design-Token",
    "s": "Benannter Grundwert wie Farbe, Abstand oder Radius.",
    "a": "Ein Etikett im Farbregal: „Markengrün“ statt einer Nummer.",
    "e": "--accent: #4F46E5",
    "w": "Eine Änderung am Token wirkt überall in der App.",
    "r": [
      "handoff",
      "claudecode",
      "designsystem",
      "typografie",
      "komponente"
    ]
  },
  "typografie": {
    "t": "Typografie",
    "s": "Wahl und Einsatz von Schriften und Schriftgrößen.",
    "a": "Die Stimme deiner Marke, nur zum Lesen.",
    "e": "IBM Plex Sans für Text, JetBrains Mono für Code",
    "w": "Gute Lesbarkeit hält Besucher auf der Seite.",
    "r": [
      "designsystem",
      "designtoken",
      "komponente"
    ]
  },
  "tabelle": {
    "t": "Tabelle",
    "s": "Datenbank-Bereich aus Zeilen (Einträge) und Spalten (Eigenschaften).",
    "a": "Ein Excel-Blatt, das deine App lesen und schreiben kann.",
    "e": "Tabelle „projekte“: name, idee, nutzer_id",
    "w": "Gut geplante Tabellen sparen später Umbauten.",
    "r": [
      "supabase",
      "rls",
      "auth"
    ]
  },
  "rls": {
    "t": "Row Level Security",
    "s": "Regeln, wer welche Zeilen einer Tabelle sehen und ändern darf.",
    "a": "Schließfächer statt eines offenen Regals: jeder hat nur seinen Schlüssel.",
    "e": "„Nutzer sehen nur Projekte mit ihrer nutzer_id.“",
    "w": "Ohne RLS können Fremde womöglich alle Daten lesen.",
    "r": [
      "supabase",
      "tabelle",
      "auth"
    ]
  },
  "freetier": {
    "t": "Free Tier",
    "s": "Kostenloses Kontingent eines Dienstes bis zu einer Grenze.",
    "a": "Die Gratisprobe im Supermarkt: bis zu einer Menge umsonst.",
    "e": "Supabase, Vercel Hobby, viele E-Mail-Dienste",
    "w": "Ideal für den Start. Bedingungen und Grenzen kennen, z. B. „nicht kommerziell“.",
    "r": [
      "nutzungsbasiert",
      "domain",
      "hosting"
    ]
  },
  "nutzungsbasiert": {
    "t": "Nutzungsbasierte Abrechnung",
    "s": "Du zahlst nach Verbrauch statt pauschal.",
    "a": "Wie der Stromzähler: mehr Verbrauch, höhere Rechnung.",
    "e": "KI-Schnittstelle: Abrechnung pro Token",
    "w": "Ausgabenlimits schützen vor bösen Überraschungen.",
    "r": [
      "freetier",
      "domain",
      "hosting"
    ]
  },
  "testen": {
    "t": "Testen",
    "s": "Prüfen, ob die App wie geplant funktioniert.",
    "a": "Die Probefahrt vor der Übergabe an den Kunden.",
    "e": "Anfrageformular auf dem Handy ausfüllen und absenden",
    "w": "Fehler vor dem Launch kosten nichts, danach Kunden.",
    "r": [
      "ladezeit",
      "lighthouse",
      "barrierefreiheit"
    ]
  },
  "ladezeit": {
    "t": "Ladezeit",
    "s": "Wie lange es dauert, bis die Seite nutzbar ist.",
    "a": "Die Wartezeit an der Ladentür.",
    "e": "Ein 5-MB-Foto bremst, ein komprimiertes WebP nicht.",
    "w": "Langsame Seiten verlieren Besucher und Google-Ranking.",
    "r": [
      "testen",
      "lighthouse",
      "barrierefreiheit"
    ]
  },
  "lighthouse": {
    "t": "Lighthouse",
    "s": "Prüfwerkzeug in Chrome für Leistung, Barrierefreiheit und SEO.",
    "a": "Der TÜV für deine Website, mit Punkten von 0 bis 100.",
    "e": "Chrome → Entwicklertools → Lighthouse → Analyse",
    "w": "Zeigt konkret, was du verbessern kannst.",
    "r": [
      "testen",
      "ladezeit",
      "barrierefreiheit"
    ]
  },
  "barrierefreiheit": {
    "t": "Barrierefreiheit",
    "s": "Alle können die Seite nutzen, auch mit Einschränkungen.",
    "a": "Eine Rampe neben der Treppe: hilft vielen, stört niemanden.",
    "e": "Alt-Texte, Kontrast 4,5 : 1, Tastaturbedienung",
    "w": "Für viele Shops und Online-Dienste in der EU Pflicht, und gut für SEO.",
    "r": [
      "testen",
      "ladezeit",
      "lighthouse"
    ]
  },
  "website": {
    "t": "Website",
    "s": "Seiten, die informieren und überzeugen, meist ohne Login.",
    "a": "Das Schaufenster und der Verkaufsprospekt deines Geschäfts.",
    "e": "Landingpage, Blog, Firmenseite",
    "w": "Bringt neue Kunden über Google und Werbung.",
    "r": [
      "webapp",
      "native",
      "retention",
      "seo",
      "conversion"
    ]
  },
  "retention": {
    "t": "Retention",
    "s": "Wie viele Nutzer nach einiger Zeit wiederkommen.",
    "a": "Die Stammkunden-Quote deines Cafés.",
    "e": "Von 100 neuen Nutzern sind nach 30 Tagen noch 25 aktiv.",
    "w": "Apps verdienen an wiederkehrenden Nutzern, nicht an Downloads.",
    "r": [
      "website",
      "webapp",
      "native",
      "pushnotification"
    ]
  },
  "crossplatform": {
    "t": "Cross-Platform",
    "s": "Ein Code oder Werkzeug für mehrere Plattformen.",
    "a": "Ein Rezept, das in jeder Küche funktioniert.",
    "e": "Expo baut aus einem Code eine iOS- und eine Android-App.",
    "w": "Spart Zeit und Geld, wenn du Website und Apps anbietest.",
    "r": [
      "backend",
      "auth",
      "api"
    ]
  },
  "cms": {
    "t": "CMS",
    "s": "Content-Management-System: Inhalte pflegen ohne Programmieren.",
    "a": "Ein Redaktionsbüro mit Formularen statt Druckerei.",
    "e": "WordPress, Sanity, Storyblok",
    "w": "Du oder dein Team ändern Texte selbst, ohne Entwickler.",
    "r": [
      "newsletter",
      "doubleoptin",
      "stripe",
      "website",
      "seo"
    ]
  },
  "newsletter": {
    "t": "Newsletter-Dienst",
    "s": "Werkzeug zum Verwalten von Kontakten und Versenden von E-Mails.",
    "a": "Ein Postversand mit Adressbuch und Statistik.",
    "e": "Brevo, Mailchimp, Resend",
    "w": "E-Mail ist ein eigener Kanal, unabhängig von Google und Social Media.",
    "r": [
      "cms",
      "doubleoptin",
      "stripe",
      "dsgvo"
    ]
  },
  "doubleoptin": {
    "t": "Double-Opt-in",
    "s": "Anmeldung plus Bestätigung per E-Mail-Link.",
    "a": "Wie eine Unterschrift unter dem Anmeldeformular.",
    "e": "„Bitte bestätige deine Anmeldung“ mit Link",
    "w": "Belegt die Einwilligung und schützt vor Fake-Anmeldungen.",
    "r": [
      "cms",
      "newsletter",
      "stripe",
      "dsgvo"
    ]
  },
  "capacitor": {
    "t": "Capacitor",
    "s": "Werkzeug, das eine Web-App als Store-App verpackt.",
    "a": "Ein Umzugskarton, in dem deine Website in den App Store passt.",
    "e": "Diese Academy könnte so als iPhone-App erscheinen.",
    "w": "Schnellster Weg in den Store mit vorhandenem Code.",
    "r": [
      "expo",
      "pushnotification",
      "appstore",
      "pwa"
    ]
  },
  "expo": {
    "t": "Expo",
    "s": "Plattform zum Bauen nativer Apps mit React Native.",
    "a": "Ein Baukasten für echte Handy-Apps mit React-Bausteinen.",
    "e": "Eine App mit Kamera und Push für iOS und Android",
    "w": "Fühlt sich am nativsten an und nutzt dein React-Wissen.",
    "r": [
      "capacitor",
      "pushnotification",
      "appstore",
      "react",
      "native"
    ]
  },
  "pushnotification": {
    "t": "Push-Nachricht",
    "s": "Mitteilung, die eine App aufs Handy schickt, auch wenn sie zu ist.",
    "a": "Die Türklingel deiner App.",
    "e": "„Deine Lernserie endet heute – 5 Minuten?“",
    "w": "Stärkster Hebel für Retention, aber sparsam einsetzen.",
    "r": [
      "capacitor",
      "expo",
      "appstore"
    ]
  },
  "appstore": {
    "t": "App Store / Google Play",
    "s": "Die offiziellen Läden für Handy-Apps.",
    "a": "Das Kaufhaus mit Türsteher: Jede App wird vorher geprüft.",
    "e": "Apple Developer Program, Google Play Console",
    "w": "Kosten, Prüfung und Regeln früh einplanen.",
    "r": [
      "capacitor",
      "expo",
      "pushnotification",
      "native"
    ]
  }
};
