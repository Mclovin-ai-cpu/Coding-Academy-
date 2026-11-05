// Automatisch aus v2 übernommen und für v3 ergänzt. Inhalte hier direkt bearbeiten.
import type { Lesson } from "./types";

export const LESSONS: Record<string, Lesson> = {
  "web-basics": {
    "title": "Was passiert, wenn du eine Website öffnest?",
    "min": 10,
    "intro": [
      "Wenn du eine Adresse eintippst, schickt dein Browser eine <b>Anfrage</b> (Request) ins Internet. Irgendwo steht ein <b>Server</b> – ein Computer, der rund um die Uhr läuft – und schickt die passenden Dateien zurück.",
      "Dein Gerät ist dabei der <b>Client</b>: Es fragt an und zeigt an. Der Server liefert. Fast alles im Web folgt diesem Muster, auch die meisten Apps auf deinem Handy.",
      "Für dich als Gründer heißt das: Eine Website ist zuerst nur ein Paket Dateien. Spannend wird es, wenn der Server zusätzlich rechnet, speichert oder Daten liefert."
    ],
    "terms": [
      "browser",
      "server",
      "client",
      "request"
    ],
    "code": {
      "lang": "ablauf",
      "text": "Du tippst meinshop.de\n   ↓  Request\nServer sucht index.html\n   ↓  Response\nBrowser zeigt die Seite an"
    },
    "tip": "Wenn eine KI sagt „das läuft im Frontend“, meint sie: im Browser, also beim Client.",
    "task": "Beschreibe in 2–3 Sätzen, was passiert, wenn jemand deine zukünftige Website aufruft.",
    "quiz": [
      {
        "q": "Wer schickt die Dateien einer Website zurück?",
        "a": [
          "Der Browser",
          "Der Server",
          "Die Domain"
        ],
        "c": 1,
        "why": "Der Server liefert, der Browser zeigt an."
      },
      {
        "q": "Was ist dein iPhone, wenn du eine Website öffnest?",
        "a": [
          "Der Client",
          "Der Server",
          "Die Datenbank"
        ],
        "c": 0,
        "why": "Das Gerät, das anfragt und anzeigt, ist der Client."
      }
    ]
  },
  "domain": {
    "title": "Domain, DNS & Hosting",
    "min": 12,
    "intro": [
      "Die <b>Domain</b> ist die Adresse deiner Website, zum Beispiel meinshop.de. Du kaufst sie bei einem Registrar wie IONOS, Strato, Namecheap oder Cloudflare, meist für wenige Euro im Jahr.",
      "<b>DNS</b> ist das Telefonbuch des Internets: Es übersetzt die Domain in die technische Adresse (IP) des Servers.",
      "<b>Hosting</b> ist der Ort, an dem deine Dateien liegen, etwa GitHub Pages, Vercel oder Netlify. Das Schloss im Browser (<b>HTTPS</b>) zeigt, dass die Verbindung verschlüsselt ist."
    ],
    "terms": [
      "domain",
      "dns",
      "hosting",
      "https"
    ],
    "code": {
      "lang": "ablauf",
      "text": "meinshop.de   →   DNS   →   76.76.21.21\n(Adresse)       (Telefonbuch)   (Server)"
    },
    "tip": "Domain und Hosting können bei unterschiedlichen Anbietern liegen. Verbunden werden sie über DNS-Einträge.",
    "task": "Überlege dir zwei mögliche Domains für eine deiner Ideen und notiere, welche Endung (.de, .com, .app) passt.",
    "quiz": [
      {
        "q": "Was macht DNS?",
        "a": [
          "Es speichert Kundendaten",
          "Es übersetzt die Domain in die Server-Adresse",
          "Es gestaltet die Seite"
        ],
        "c": 1,
        "why": "DNS ist das Telefonbuch: Name → Adresse."
      },
      {
        "q": "Wofür steht das Schloss bzw. HTTPS?",
        "a": [
          "Verschlüsselte Verbindung",
          "Bezahlte Domain",
          "Schnellerer Server"
        ],
        "c": 0,
        "why": "HTTPS verschlüsselt die Daten zwischen Browser und Server."
      }
    ]
  },
  "html": {
    "title": "HTML – das Grundgerüst",
    "min": 12,
    "intro": [
      "<b>HTML</b> beschreibt Inhalt und Struktur: Überschriften, Texte, Bilder, Buttons, Links.",
      "Die Bausteine heißen <b>Tags</b> und haben meist einen Start- und einen End-Tag, zum Beispiel &lt;h1&gt; … &lt;/h1&gt;.",
      "Du musst HTML nicht auswendig schreiben. Du solltest es aber lesen können, damit du KI-Code verstehst und gezielt ändern kannst."
    ],
    "terms": [
      "html",
      "tag"
    ],
    "code": {
      "lang": "html",
      "text": "<!-- Eine einfache Landingpage -->\n<h1>Dein Fahrrad-Abo</h1>\n<p>Monatlich fahren, nie reparieren.</p>\n<a href=\"/kontakt\">Jetzt anfragen</a>"
    },
    "tip": "Die wichtigste Datei einer einfachen Website heißt index.html, denn sie ist die Startseite. Frameworks wie Next.js erzeugen sie beim Bauen automatisch.",
    "task": "Schreibe eine Überschrift und einen Satz für die Startseite deiner Idee, so als wären es <h1> und <p>.",
    "quiz": [
      {
        "q": "Wofür ist HTML zuständig?",
        "a": [
          "Struktur und Inhalt",
          "Farben und Animationen",
          "Speichern von Daten"
        ],
        "c": 0,
        "why": "HTML = was auf der Seite steht."
      },
      {
        "q": "Welche Datei ist die Startseite?",
        "a": [
          "README.md",
          "index.html",
          "style.css"
        ],
        "c": 1,
        "why": "Server und Hoster suchen automatisch nach index.html."
      }
    ]
  },
  "css": {
    "title": "CSS – das Design",
    "min": 12,
    "intro": [
      "<b>CSS</b> bestimmt das Aussehen: Farben, Schriften, Abstände und das Layout.",
      "Eine Regel besteht aus einem Selektor (was gestaltet wird) und Eigenschaften (wie es aussehen soll).",
      "<b>Responsive</b> heißt: Die Seite passt sich an Handy, Tablet und Desktop an. Das ist Pflicht, weil die meisten Besucher mobil kommen."
    ],
    "terms": [
      "css",
      "responsive"
    ],
    "code": {
      "lang": "css",
      "text": "/* Button im Markenstil */\n.button {\n  background: #16a34a;\n  color: white;\n  border-radius: 12px;\n  padding: 14px 20px;\n}"
    },
    "tip": "Beim Vibecoding reicht oft: „Mach den Button runder und nutze unsere Markenfarbe #16a34a.“ Wer die Begriffe kennt, trifft genauer.",
    "task": "Beschreibe den Look deiner Website in drei Stichworten (Farben, Stimmung, Schrift).",
    "quiz": [
      {
        "q": "Was bedeutet „responsive“?",
        "a": [
          "Die Seite lädt schneller",
          "Die Seite passt sich an die Bildschirmgröße an",
          "Die Seite beantwortet E-Mails"
        ],
        "c": 1,
        "why": "Responsive = ein Layout für alle Bildschirme."
      },
      {
        "q": "Was steuert CSS NICHT?",
        "a": [
          "Farben",
          "Abstände",
          "Gespeicherte Bestellungen"
        ],
        "c": 2,
        "why": "Daten speichern ist Aufgabe von Backend und Datenbank."
      }
    ]
  },
  "js": {
    "title": "JavaScript – die Logik",
    "min": 15,
    "intro": [
      "<b>JavaScript</b> macht Seiten interaktiv: Klicks, Berechnungen, Formulare prüfen, Daten nachladen.",
      "Variablen speichern Werte, <b>Funktionen</b> erledigen Aufgaben, die man immer wieder aufrufen kann.",
      "Diese App läuft mit JavaScript (genauer: React und Next.js). Deinen Fortschritt speichert sie im Browser, im sogenannten <b>localStorage</b>."
    ],
    "terms": [
      "javascript",
      "funktion",
      "localstorage"
    ],
    "code": {
      "lang": "js",
      "text": "// Preis mit Rabatt berechnen\nfunction endpreis(preis, rabatt) {\n  return preis - preis * rabatt;\n}\n\nendpreis(100, 0.2); // 80"
    },
    "tip": "HTML = was da ist. CSS = wie es aussieht. JavaScript = was passiert.",
    "task": "Welche interaktive Funktion soll deine Website haben? (z. B. Preisrechner, Filter, Formular)",
    "quiz": [
      {
        "q": "Wofür nutzt du JavaScript?",
        "a": [
          "Für Interaktion und Logik",
          "Nur für Schriftarten",
          "Um eine Domain zu kaufen"
        ],
        "c": 0,
        "why": "JS reagiert auf Nutzer und rechnet."
      },
      {
        "q": "Wo speichert diese App deinen Fortschritt?",
        "a": [
          "Auf einem fremden Server",
          "Im Browser (localStorage)",
          "In GitHub"
        ],
        "c": 1,
        "why": "localStorage liegt nur auf deinem Gerät, in diesem Browser."
      }
    ]
  },
  "git": {
    "title": "Code-Editor, Git & GitHub",
    "min": 15,
    "intro": [
      "Code schreibst du in einem <b>Editor</b>, zum Beispiel VS Code oder Cursor (ein Editor mit eingebauter KI).",
      "<b>Git</b> ist eine Versionsverwaltung: Jede gespeicherte Änderung, ein <b>Commit</b>, ist wie ein Speicherpunkt im Spiel. Du kannst jederzeit zurückspringen.",
      "<b>GitHub</b> ist der Online-Ort für deine <b>Repositories</b> (Projektordner) und die Brücke zu Hosting-Diensten wie Vercel."
    ],
    "terms": [
      "editor",
      "git",
      "repository",
      "commit"
    ],
    "code": {
      "lang": "terminal",
      "text": "$ git add index.html\n$ git commit -m \"Neue Startseite\"\n$ git push\n→ GitHub hat jetzt die neue Version"
    },
    "tip": "Commit-Nachrichten kurz und klar halten, z. B. „Hell/Dunkel-Modus ergänzt“. So findest du alte Stände schnell wieder.",
    "task": "Notiere, welche Projekte du auf GitHub hast oder anlegen willst und wofür jedes gedacht ist.",
    "quiz": [
      {
        "q": "Was ist ein Commit?",
        "a": [
          "Ein gespeicherter Stand deiner Änderungen",
          "Eine Domain",
          "Ein Bezahlanbieter"
        ],
        "c": 0,
        "why": "Commit = Speicherpunkt mit kurzer Beschreibung."
      },
      {
        "q": "Was ist Cursor?",
        "a": [
          "Ein Code-Editor mit KI",
          "Ein Hosting-Anbieter",
          "Eine Datenbank"
        ],
        "c": 0,
        "why": "Cursor ist ein Editor, in dem eine KI direkt mitarbeitet."
      }
    ]
  },
  "deploy": {
    "title": "Deployment: online gehen",
    "min": 12,
    "intro": [
      "<b>Deployment</b> heißt: Deine Dateien kommen auf einen Server, damit andere sie aufrufen können.",
      "GitHub Pages ist einfach und kostenlos, aber öffentlich und nur für <b>statische</b> Seiten.",
      "<b>Vercel</b> und Netlify verbinden sich mit GitHub und veröffentlichen bei jedem Push automatisch neu. Vercel kann zusätzlich Serverfunktionen ausführen und Seiten hinter einen Login stellen."
    ],
    "terms": [
      "deployment",
      "vercel",
      "statisch"
    ],
    "code": {
      "lang": "ablauf",
      "text": "Du änderst index.html\n   ↓  Commit & Push\nGitHub-Repository\n   ↓  automatisch\nVercel baut & veröffentlicht\n   ↓\ndeine-app.vercel.app"
    },
    "tip": "„Statisch“ heißt: Der Server liefert nur fertige Dateien. Für Logins, Datenbanken oder KI-Funktionen brauchst du zusätzlich ein Backend.",
    "task": "Welche deiner Ideen kann rein statisch sein und welche braucht ein Backend? Kurz begründen.",
    "quiz": [
      {
        "q": "Was passiert bei Vercel nach einem Push zu GitHub?",
        "a": [
          "Nichts",
          "Automatisch ein neues Deployment",
          "Die Domain wird gelöscht"
        ],
        "c": 1,
        "why": "Push → Vercel baut und veröffentlicht von selbst."
      },
      {
        "q": "Was kann GitHub Pages nicht?",
        "a": [
          "HTML-Dateien anzeigen",
          "Serverfunktionen ausführen",
          "Kostenlos hosten"
        ],
        "c": 1,
        "why": "GitHub Pages liefert nur statische Dateien."
      }
    ]
  },
  "backend": {
    "title": "Backend, Datenbank & API",
    "min": 15,
    "intro": [
      "<b>Frontend</b> ist alles, was Nutzer sehen. <b>Backend</b> ist das, was im Hintergrund passiert: Daten speichern, Nutzer anmelden, E-Mails senden.",
      "Eine <b>Datenbank</b> speichert strukturierte Daten wie Produkte, Nutzer oder Bestellungen. Eine <b>API</b> ist die Schnittstelle, über die Programme miteinander reden.",
      "Fertige Dienste wie <b>Supabase</b> oder Firebase liefern Datenbank, Login (<b>Auth</b>) und Dateispeicher. Das ist ideal für Vibecoding."
    ],
    "terms": [
      "frontend",
      "backend",
      "datenbank",
      "api",
      "auth",
      "supabase"
    ],
    "code": {
      "lang": "js",
      "text": "// Produkte über eine API laden\nconst res = await fetch(\"/api/produkte\");\nconst produkte = await res.json();"
    },
    "tip": "So kannst du es formulieren: „Speichere die Projekte in Supabase statt im localStorage, mit Login per E-Mail.“",
    "task": "Liste drei Arten von Daten auf, die deine App speichern müsste (z. B. Nutzer, Produkte, Bestellungen).",
    "quiz": [
      {
        "q": "Was ist eine API?",
        "a": [
          "Eine Schnittstelle zum Datenaustausch",
          "Ein Bildformat",
          "Eine Schriftart"
        ],
        "c": 0,
        "why": "Über APIs fragen Programme Daten an und schicken sie."
      },
      {
        "q": "Was bietet Supabase?",
        "a": [
          "Nur Domains",
          "Datenbank, Login und Speicher",
          "Einen Code-Editor"
        ],
        "c": 1,
        "why": "Supabase ist ein fertiges Backend zum Mieten."
      }
    ]
  },
  "payments": {
    "title": "Bezahlen & Automatisieren",
    "min": 12,
    "intro": [
      "Online-Zahlungen baust du nie selbst. Du nutzt Anbieter wie <b>Stripe</b>, PayPal oder Mollie, die sich um Kartendaten und Sicherheit kümmern.",
      "Ein <b>Webhook</b> ist eine automatische Benachrichtigung, etwa „Zahlung erfolgreich“. Deine App reagiert darauf und schaltet zum Beispiel ein Abo frei.",
      "Für Automationen ohne Code gibt es Tools wie Zapier oder Make. Shopsysteme wie Shopify bringen Warenkorb und Zahlung schon mit."
    ],
    "terms": [
      "stripe",
      "webhook"
    ],
    "code": {
      "lang": "ablauf",
      "text": "Kunde klickt „Kaufen“\n   ↓\nStripe Checkout (sichere Bezahlseite)\n   ↓  Webhook: payment.succeeded\nDeine App schaltet den Zugang frei"
    },
    "tip": "Teste Zahlungen immer zuerst im Testmodus des Anbieters, bevor echtes Geld fließt.",
    "task": "Wie würden Kunden für deine Idee bezahlen: einmalig, im Abo oder gar nicht (z. B. Affiliate)?",
    "quiz": [
      {
        "q": "Warum nutzt man Stripe statt einer eigenen Lösung?",
        "a": [
          "Sicherheit und Umgang mit Kartendaten",
          "Weil es schöner aussieht",
          "Für bessere Schriftarten"
        ],
        "c": 0,
        "why": "Kartendaten sicher zu verarbeiten ist aufwendig und streng geregelt."
      },
      {
        "q": "Was ist ein Webhook?",
        "a": [
          "Eine automatische Nachricht bei einem Ereignis",
          "Ein Design-Template",
          "Ein Domain-Typ"
        ],
        "c": 0,
        "why": "Ereignis passiert → Anbieter ruft deine App an."
      }
    ]
  },
  "frameworks": {
    "title": "Frameworks: React, Next.js & Co.",
    "min": 15,
    "intro": [
      "Ein <b>Framework</b> ist ein Baukasten mit fertigen Regeln und Bausteinen, damit du nicht bei null anfängst.",
      "<b>React</b> baut Oberflächen aus <b>Komponenten</b>, also wiederverwendbaren Bausteinen wie Button, Karte oder Menü. <b>Next.js</b> baut auf React auf und bringt Seiten, Routing und Serverfunktionen mit. Es passt sehr gut zu Vercel.",
      "<b>Tailwind CSS</b> ist ein Styling-Framework: kurze Klassen direkt im HTML statt eigener CSS-Dateien."
    ],
    "terms": [
      "framework",
      "react",
      "nextjs",
      "komponente",
      "tailwind"
    ],
    "code": {
      "lang": "jsx",
      "text": "// Eine React-Komponente\nfunction ProduktKarte({ name, preis }) {\n  return <div className=\"rounded-xl p-4\">\n    {name} – {preis} €\n  </div>;\n}"
    },
    "tip": "Ein sehr verbreiteter Vibecoding-Stack ist Next.js + Tailwind + Supabase + Vercel. Den solltest du zumindest vom Namen her kennen.",
    "task": "Welche Komponenten bräuchte deine Startseite? Liste 4–5 auf (z. B. Menü, Hero, Produktkarte, Footer).",
    "quiz": [
      {
        "q": "Was ist eine Komponente?",
        "a": [
          "Ein wiederverwendbarer Baustein der Oberfläche",
          "Eine Datenbanktabelle",
          "Ein Server"
        ],
        "c": 0,
        "why": "Einmal bauen, überall verwenden."
      },
      {
        "q": "Welches Framework baut auf React auf?",
        "a": [
          "Tailwind",
          "Next.js",
          "GitHub"
        ],
        "c": 1,
        "why": "Next.js erweitert React um Seiten und Serverfunktionen."
      }
    ]
  },
  "stack": {
    "title": "Den richtigen Weg wählen",
    "min": 12,
    "intro": [
      "Nicht jedes Projekt braucht Code. <b>No-Code</b>-Tools: WordPress für Blogs und Affiliate-Seiten, Webflow oder Framer für Design-Websites, Shopify für Shops.",
      "KI-App-Builder wie Lovable, Bolt oder v0 erzeugen ganze Apps aus Prompts. Mit eigenem Code (z. B. mit Claude oder Cursor) hast du die meiste Kontrolle.",
      "Faustregel: Schnell testen mit No-Code, eigene Logik und Wachstum mit Code. Die Kombination deiner Technologien heißt <b>Stack</b>."
    ],
    "terms": [
      "stack",
      "nocode"
    ],
    "code": {
      "lang": "übersicht",
      "text": "Affiliate-Blog     → WordPress oder Next.js\nLandingpage        → Framer, Webflow, HTML\nOnline-Shop        → Shopify\nWeb-App mit Login  → Next.js + Supabase"
    },
    "tip": "Frag die KI immer: „Welcher Stack passt zu meinem Ziel und Budget, und warum?“",
    "task": "Wähle für deine Hauptidee einen Weg (No-Code, KI-Builder oder Code) und begründe ihn in einem Satz.",
    "quiz": [
      {
        "q": "Was passt für einen schnellen Online-Shop am besten?",
        "a": [
          "Shopify",
          "Ein selbst gebautes Datenbanksystem",
          "Nur HTML"
        ],
        "c": 0,
        "why": "Shopify bringt Warenkorb, Zahlung und Versand mit."
      },
      {
        "q": "Was ist ein Stack?",
        "a": [
          "Die Kombination deiner Technologien",
          "Ein Stapel Rechnungen",
          "Ein Bildformat"
        ],
        "c": 0,
        "why": "Frontend, Backend, Hosting usw. zusammen = dein Stack."
      }
    ]
  },
  "pwa": {
    "title": "Web-App & PWA",
    "min": 10,
    "intro": [
      "Eine <b>Web-App</b> läuft im Browser, fühlt sich aber an wie eine App.",
      "Eine <b>PWA</b> (Progressive Web App) kannst du zum Home-Bildschirm hinzufügen. Sie startet im Vollbild und kann teilweise offline funktionieren. Genau so nutzt du diese Academy.",
      "Für eine <b>native</b> App im App Store brauchst du z. B. Swift oder React Native und ein Apple-Entwicklerkonto."
    ],
    "terms": [
      "webapp",
      "pwa",
      "native"
    ],
    "code": {
      "lang": "html",
      "text": "<!-- Macht die Seite home-screen-tauglich -->\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n<link rel=\"manifest\" href=\"/manifest.json\">"
    },
    "tip": "Starte fast immer als PWA: kein App Store, sofort teilbar, später ausbaubar.",
    "task": "Soll deine Idee eine Website, eine PWA oder eine App-Store-App werden? Warum?",
    "quiz": [
      {
        "q": "Was ist ein Vorteil einer PWA?",
        "a": [
          "Kein App Store nötig",
          "Läuft nur auf Android",
          "Braucht keine Internetadresse"
        ],
        "c": 0,
        "why": "Link teilen, zum Home-Bildschirm hinzufügen, fertig."
      },
      {
        "q": "Was brauchst du für eine native iPhone-App?",
        "a": [
          "Nur eine HTML-Datei",
          "z. B. Swift oder React Native und ein Entwicklerkonto",
          "Nur eine Domain"
        ],
        "c": 1,
        "why": "Der App Store hat eigene Technik und Regeln."
      }
    ]
  },
  "vibe": {
    "title": "Was ist Vibecoding?",
    "min": 10,
    "intro": [
      "<b>Vibecoding</b> heißt: Du beschreibst in normaler Sprache, was du willst, und eine KI schreibt den Code.",
      "Deine Rolle ist die von Produktmanager, Tester und Entscheider. Dein Wissen aus diesem Kurs sorgt dafür, dass du präzise formulierst, Ergebnisse prüfst und merkst, wenn die KI Unsinn baut.",
      "Ein guter <b>Prompt</b> enthält <b>Kontext</b>: Ziel, Zielgruppe, Inhalte, Technik und Stil."
    ],
    "terms": [
      "vibecoding",
      "prompt",
      "kontext"
    ],
    "code": {
      "lang": "prompt",
      "text": "Ziel: Landingpage für mein Fahrrad-Abo\nZielgruppe: Pendler, 25–45\nMuss enthalten: Hero, 3 Vorteile, Preis, Kontaktformular\nTechnik: eine index.html, mobil zuerst\nStil: hell, grün, freundlich"
    },
    "tip": "Die KI kennt dein Projekt nur so gut, wie du es beschreibst. Kontext ist alles.",
    "task": "Schreibe deinen ersten Prompt für deine Idee: Ziel, Zielgruppe, Inhalte, Technik und Stil.",
    "quiz": [
      {
        "q": "Was ist deine wichtigste Rolle beim Vibecoding?",
        "a": [
          "Jede Zeile selbst tippen",
          "Beschreiben, prüfen und entscheiden",
          "Nichts, die KI macht alles"
        ],
        "c": 1,
        "why": "Du steuerst, die KI tippt."
      },
      {
        "q": "Was verbessert KI-Ergebnisse am meisten?",
        "a": [
          "Klarer Kontext",
          "Möglichst kurze Prompts",
          "Viele Emojis"
        ],
        "c": 0,
        "why": "Je mehr die KI über Ziel und Rahmen weiß, desto besser passt das Ergebnis."
      }
    ]
  },
  "prompting": {
    "title": "Gute Prompts & Iteration",
    "min": 12,
    "intro": [
      "Bau in kleinen Schritten: erst das Grundgerüst, dann eine Funktion nach der anderen. Pro Prompt eine Änderung, das nennt man <b>Iteration</b>.",
      "Gib Beispiele („wie bei Duolingo“), nenne Grenzen („keine externen Bibliotheken“, „bestehende Daten nicht löschen“) und bitte um eine kurze Erklärung der Änderung.",
      "Denke in einem <b>MVP</b>: Was ist die kleinste Version, die schon nützlich ist? Speichere funktionierende Stände per Commit, bevor du Großes änderst."
    ],
    "terms": [
      "iteration",
      "mvp"
    ],
    "code": {
      "lang": "prompt",
      "text": "Ändere NUR den Projekte-Reiter:\n- Projekte sollen umbenannt werden können\n- Bestehende Daten nicht löschen\n- Erkläre danach in 3 Sätzen, was du geändert hast"
    },
    "tip": "Wenn ein Ergebnis danebenliegt, beschreibe den Unterschied: „Erwartet war X, passiert ist Y.“ Nicht einfach neu würfeln.",
    "task": "Formuliere einen Änderungs-Prompt für diese App: Was soll als Nächstes besser werden?",
    "quiz": [
      {
        "q": "Wie viele Änderungen pro Prompt sind ideal?",
        "a": [
          "Möglichst alle auf einmal",
          "Eine klar umrissene Änderung",
          "Keine"
        ],
        "c": 1,
        "why": "Kleine Schritte lassen sich prüfen und rückgängig machen."
      },
      {
        "q": "Was ist ein MVP?",
        "a": [
          "Die kleinste nützliche Version eines Produkts",
          "Ein Bezahlanbieter",
          "Ein Framework"
        ],
        "c": 0,
        "why": "Minimum Viable Product: erst testen, dann ausbauen."
      }
    ]
  },
  "debugging": {
    "title": "Fehler finden mit KI",
    "min": 12,
    "intro": [
      "Fehler, auch <b>Bugs</b> genannt, sind normal. Wenn etwas nicht geht, kläre drei Fragen: Was passiert genau? Was sollte passieren? Gibt es eine Fehlermeldung?",
      "Die <b>Konsole</b> im Browser zeigt Fehlermeldungen. Auf dem Mac: Safari → Einstellungen → Erweitert → Entwicklermenü einblenden.",
      "Kopiere die Meldung wörtlich in die KI. Das ist oft schon die halbe Lösung."
    ],
    "terms": [
      "bug",
      "konsole"
    ],
    "code": {
      "lang": "konsole",
      "text": "Uncaught TypeError: Cannot read properties of null\n    at showLesson (index.html:214)\n\n→ In Zeile 214 fehlt ein Element, das der Code erwartet."
    },
    "tip": "Bug-Prompt: „Das passiert: … Erwartet: … Fehlermeldung: … Hier ist der Code: …“",
    "task": "Beschreibe ein Problem, das dir zuletzt beim Bauen passiert ist, im Bug-Format (passiert / erwartet / Meldung).",
    "quiz": [
      {
        "q": "Was hilft der KI beim Debuggen am meisten?",
        "a": [
          "Die genaue Fehlermeldung",
          "„Geht nicht“",
          "Ein Foto vom Home-Bildschirm"
        ],
        "c": 0,
        "why": "Die Meldung sagt, wo und was schiefgeht."
      },
      {
        "q": "Wo siehst du Fehlermeldungen im Browser?",
        "a": [
          "In der Konsole",
          "Im App Store",
          "In der Domain"
        ],
        "c": 0,
        "why": "Die Entwickler-Konsole protokolliert Fehler."
      }
    ]
  },
  "security": {
    "title": "Sicherheit beim Vibecoding",
    "min": 12,
    "intro": [
      "<b>API-Keys</b> und Passwörter sind Geheimnisse. Sie gehören nie in den Frontend-Code und nie in ein öffentliches GitHub-Repository.",
      "Dafür gibt es <b>Umgebungsvariablen</b>, z. B. in Vercel unter „Environment Variables“. Nur der Server kann sie lesen.",
      "Prüfe KI-Code besonders bei Logins, Datenzugriffen und Formularen. Und denk dran: Ein öffentliches Repository kann jeder lesen."
    ],
    "terms": [
      "apikey",
      "envvar"
    ],
    "code": {
      "lang": "js",
      "text": "// FALSCH – jeder kann den Key sehen\nconst key = \"sk-geheim-123\";\n\n// RICHTIG – nur auf dem Server\nconst key = process.env.API_KEY;"
    },
    "tip": "Lass die KI gegenprüfen: „Prüfe den Code auf Sicherheitsprobleme und offenliegende Secrets.“",
    "task": "Notiere, welche Zugänge oder Keys dein Projekt brauchen könnte und wo sie sicher liegen sollen.",
    "quiz": [
      {
        "q": "Wo gehört ein API-Key hin?",
        "a": [
          "Direkt in die index.html",
          "In Umgebungsvariablen auf dem Server",
          "In die README"
        ],
        "c": 1,
        "why": "Alles im Frontend kann jeder Besucher auslesen."
      },
      {
        "q": "Wer kann ein öffentliches GitHub-Repository lesen?",
        "a": [
          "Nur ich",
          "Jeder",
          "Nur Vercel"
        ],
        "c": 1,
        "why": "Öffentlich heißt wirklich öffentlich."
      }
    ]
  },
  "legal": {
    "title": "Recht: Impressum, DSGVO & Cookies",
    "min": 12,
    "intro": [
      "In Deutschland brauchen geschäftsmäßige Websites ein <b>Impressum</b> und eine Datenschutzerklärung.",
      "Die <b>DSGVO</b> regelt, wie du personenbezogene Daten (Name, E-Mail, IP-Adresse) verarbeitest. Für nicht notwendige <b>Cookies</b> und Tracking brauchst du vorher eine Einwilligung, deshalb gibt es Cookie-Banner.",
      "Generatoren wie eRecht24 helfen beim Start. Das hier ist keine Rechtsberatung, bei Unsicherheit frag eine Fachanwältin oder einen Fachanwalt."
    ],
    "terms": [
      "impressum",
      "dsgvo",
      "cookie"
    ],
    "code": {
      "lang": "checkliste",
      "text": "☐ Impressum (mit 2 Klicks erreichbar)\n☐ Datenschutzerklärung\n☐ Cookie-Einwilligung bei Tracking\n☐ Auftragsverarbeitung mit Hostern & Tools\n☐ Affiliate-Links als Werbung kennzeichnen"
    },
    "tip": "Lass dir von der KI eine Checkliste geben, aber übernimm Rechtstexte nicht ungeprüft.",
    "task": "Welche personenbezogenen Daten würde deine Idee sammeln? (Kontaktformular, Newsletter, Login …)",
    "quiz": [
      {
        "q": "Was braucht eine geschäftliche Website in Deutschland?",
        "a": [
          "Nur ein Logo",
          "Impressum und Datenschutzerklärung",
          "Eine .com-Domain"
        ],
        "c": 1,
        "why": "Beides ist für geschäftsmäßige Angebote vorgeschrieben."
      },
      {
        "q": "Wann brauchst du eine Cookie-Einwilligung?",
        "a": [
          "Für nicht notwendige Cookies wie Tracking",
          "Nie",
          "Nur für Bilder"
        ],
        "c": 0,
        "why": "Technisch notwendige Cookies sind erlaubt, Tracking braucht Zustimmung."
      }
    ]
  },
  "money": {
    "title": "Geld verdienen mit Web & Apps",
    "min": 12,
    "intro": [
      "Gängige Modelle: <b>Abo</b> (wiederkehrend), Einmalkauf, <b>Freemium</b> (Basis gratis, Extras kostenpflichtig), Werbung und Provision.",
      "Beim <b>Affiliate</b>-Marketing empfiehlst du Produkte über spezielle Links, z. B. über Amazon PartnerNet oder awin, und bekommst eine Provision pro Verkauf.",
      "Affiliate-Links müssen als Werbung gekennzeichnet sein. Und: Ohne Besucher keine Einnahmen, Inhalte und SEO sind hier entscheidend."
    ],
    "terms": [
      "affiliate",
      "freemium",
      "abo"
    ],
    "code": {
      "lang": "ablauf",
      "text": "Besucher liest deinen Vergleichsartikel\n   ↓  klickt Affiliate-Link\nKauf beim Händler\n   ↓\nDu erhältst eine Provision (meist ein paar Prozent)"
    },
    "tip": "Rechne früh: Besucher × Klickrate × Kaufrate × Provision = Umsatz. Hier hilft dir dein BWL-Wissen direkt.",
    "task": "Welches Erlösmodell passt zu deiner Idee? Schätze grob, wie viele Kunden du für 1.000 € im Monat bräuchtest.",
    "quiz": [
      {
        "q": "Was ist Affiliate-Marketing?",
        "a": [
          "Provision für vermittelte Verkäufe",
          "Ein Abo-Modell",
          "Ein Hosting-Tarif"
        ],
        "c": 0,
        "why": "Du vermittelst, der Händler verkauft und zahlt dir Provision."
      },
      {
        "q": "Was ist Freemium?",
        "a": [
          "Alles kostenlos",
          "Basis gratis, Extras kostenpflichtig",
          "Nur Werbung"
        ],
        "c": 1,
        "why": "Viele Apps verdienen so: gratis anfixen, Premium verkaufen."
      }
    ]
  },
  "seo": {
    "title": "SEO, Analytics & Conversion",
    "min": 12,
    "intro": [
      "<b>SEO</b> (Suchmaschinenoptimierung) sorgt dafür, dass Google deine Seite findet: klare Titel, gute Inhalte, schnelle Ladezeit, mobilfreundlich.",
      "<b>Analytics</b> misst, wer kommt und was Besucher tun. Datenschutzfreundliche Tools sind z. B. Plausible oder Matomo.",
      "Eine <b>Conversion</b> ist die gewünschte Aktion: Kauf, Anfrage, Klick. Die Conversion-Rate ist der Anteil der Besucher, die sie ausführen."
    ],
    "terms": [
      "seo",
      "analytics",
      "conversion"
    ],
    "code": {
      "lang": "html",
      "text": "<title>Fahrrad-Abo für Pendler | MeinRad</title>\n<meta name=\"description\"\n      content=\"Monatlich fahren, Service inklusive.\">"
    },
    "tip": "Titel und Beschreibung sind dein Schaufenster bei Google. Formuliere sie wie eine Anzeige.",
    "task": "Definiere die wichtigste Conversion deiner Idee und eine Kennzahl, die du messen willst.",
    "quiz": [
      {
        "q": "Was ist eine Conversion?",
        "a": [
          "Eine gewünschte Nutzeraktion",
          "Eine Dateiumwandlung",
          "Ein Server-Neustart"
        ],
        "c": 0,
        "why": "Z. B. Kauf, Anmeldung oder Klick auf einen Affiliate-Link."
      },
      {
        "q": "Was hilft bei SEO?",
        "a": [
          "Klare Titel und schnelle Ladezeit",
          "Möglichst viele Pop-ups",
          "Keine Texte"
        ],
        "c": 0,
        "why": "Google belohnt hilfreiche, schnelle, mobile Seiten."
      }
    ]
  },
  "claude-code": {
    "title": "Claude Code: die KI im Projektordner",
    "min": 12,
    "intro": [
      "Im Chat beschreibst du, was du willst, und kopierst Code hin und her. <b>Claude Code</b> geht einen Schritt weiter: Es arbeitet direkt in deinem Projekt, liest die vorhandenen Dateien, ändert sie und führt Befehle aus.",
      "Du gibst eine Aufgabe, etwa „Füge einen Dunkelmodus hinzu“. Claude Code sucht die passenden Stellen, schlägt Änderungen vor, testet sie und speichert das Ergebnis als Commit in deinem <b>Repository</b>.",
      "Ein <b>Agent</b> ist genau das: eine KI, die mehrere Schritte selbstständig plant und ausführt. Deine Aufgabe bleibt, klare Ziele zu setzen und das Ergebnis zu prüfen."
    ],
    "terms": [
      "claudecode",
      "agent",
      "repository",
      "commit"
    ],
    "code": {
      "lang": "terminal",
      "text": "$ claude\n> Füge auf der Startseite einen Hell/Dunkel-Schalter hinzu.\n  Bestehende Daten nicht löschen.\n\n✓ 2 Dateien geändert, Build getestet\n✓ Commit: „Hell/Dunkel-Schalter ergänzt“"
    },
    "tip": "Je klarer die Grenzen („nur diese Datei“, „nichts löschen“), desto ruhiger arbeitet ein Agent.",
    "task": "Formuliere eine Aufgabe für Claude Code, die deine App um eine kleine Funktion erweitert. Nenne Ziel und eine Grenze.",
    "quiz": [
      {
        "q": "Was unterscheidet Claude Code vom normalen Chat?",
        "a": [
          "Es arbeitet direkt in den Projektdateien",
          "Es kann nur Texte schreiben",
          "Es ersetzt GitHub"
        ],
        "c": 0,
        "why": "Claude Code liest, ändert und testet Dateien direkt im Projekt."
      },
      {
        "q": "Was ist ein Agent?",
        "a": [
          "Eine KI, die mehrere Schritte selbst plant und ausführt",
          "Ein Hosting-Tarif",
          "Ein Passwort"
        ],
        "c": 0,
        "why": "Agenten erledigen Aufgaben in mehreren Schritten, du prüfst das Ergebnis."
      }
    ]
  },
  "branch-pr": {
    "title": "Branch, Pull Request & Merge",
    "min": 12,
    "intro": [
      "Der Haupt-Stand deines Projekts liegt im <b>Branch</b> „main“. Was dort ist, geht bei Vercel live.",
      "Für eine neue Funktion legst du einen eigenen Branch an, einen Abzweig. Dort darfst du ausprobieren, ohne dass die Live-Seite kaputtgeht. Vercel erzeugt dafür sogar eine eigene Vorschau-Adresse (<b>Preview</b>).",
      "Ist alles gut, stellst du einen <b>Pull Request</b>: die Bitte, die Änderung in main zu übernehmen. Nach dem Prüfen folgt der <b>Merge</b>, also das Zusammenführen."
    ],
    "terms": [
      "branch",
      "pullrequest",
      "merge",
      "preview"
    ],
    "code": {
      "lang": "ablauf",
      "text": "main  ●────────────●── live\n       \\          /\n        ●──●──●──●   branch: dunkelmodus\n             ↑\n      Preview-Link zum Testen"
    },
    "tip": "Ein Branch pro Idee. Klein halten, dann ist der Pull Request schnell geprüft.",
    "task": "Welche Änderung an deiner App würdest du zuerst in einem eigenen Branch ausprobieren? Gib dem Branch einen Namen.",
    "quiz": [
      {
        "q": "Wofür ist ein Branch gut?",
        "a": [
          "Änderungen gefahrlos ausprobieren",
          "Eine Domain kaufen",
          "Bilder verkleinern"
        ],
        "c": 0,
        "why": "Der Branch ist ein Abzweig. main und die Live-Seite bleiben unberührt."
      },
      {
        "q": "Was passiert beim Merge?",
        "a": [
          "Die Änderung wird in main übernommen",
          "Das Repository wird gelöscht",
          "Die App wird offline genommen"
        ],
        "c": 0,
        "why": "Merge = zusammenführen. Danach geht die Änderung mit main live."
      }
    ]
  },
  "handoff": {
    "title": "Vom Design zum Code: der Handoff",
    "min": 12,
    "intro": [
      "Ein Design ist erst ein Bild. Damit eine echte App daraus wird, übergibst du es an den, der den Code schreibt. Das nennt man <b>Handoff</b>.",
      "Zum Handoff gehören die Screens, die Farben und Schriften als <b>Design-Tokens</b> und die Entscheidungen, die ihr unterwegs getroffen habt: Was passiert bei einem Klick? Was zeigt ein leerer Zustand?",
      "Baust du mit KI, ist der Empfänger oft <b>Claude Code</b>. Je vollständiger das Paket, desto weniger muss die KI raten."
    ],
    "terms": [
      "handoff",
      "designtoken",
      "claudecode"
    ],
    "code": {
      "lang": "handoff.md",
      "text": "Screens: Home, Lektion, Karten, Praxis, Projekt\nFarben: Akzent #4F46E5, Erfolg #15803D\nSchriften: IBM Plex Sans, JetBrains Mono\nRegeln: Praxis ist freiwillig\nLeerer Zustand: Hinweis + Button „Projekt anlegen“"
    },
    "tip": "Halte Entscheidungen im Design-Chat fest. Sie wandern beim Handoff als Kontext mit.",
    "task": "Schreibe eine Mini-Übergabe für deine Idee: drei Screens, zwei Farben, eine wichtige Regel.",
    "quiz": [
      {
        "q": "Was gehört NICHT zwingend in einen Handoff?",
        "a": [
          "Farben und Schriften",
          "Verhalten bei Klicks",
          "Dein privates Passwort"
        ],
        "c": 2,
        "why": "Geheimnisse gehören nie in Übergaben, Designentscheidungen schon."
      },
      {
        "q": "Warum ist ein gutes Handoff-Paket wichtig für KI?",
        "a": [
          "Die KI muss weniger raten",
          "Die KI wird schneller bezahlt",
          "Es ersetzt das Testen"
        ],
        "c": 0,
        "why": "Mehr Kontext, weniger Annahmen, besseres Ergebnis."
      }
    ]
  },
  "ux": {
    "title": "UX: Wie fühlt sich deine App an?",
    "min": 12,
    "intro": [
      "<b>UX</b> (User Experience) ist das Erlebnis: Findet jemand schnell, was er sucht? Versteht er, was als Nächstes kommt? <b>UI</b> (User Interface) ist die sichtbare Oberfläche: Buttons, Farben, Abstände.",
      "Ein <b>User Flow</b> beschreibt den Weg, den ein Nutzer geht, z. B. Startseite → Produkt ansehen → Anfrage senden. Jeder unnötige Schritt kostet Conversions.",
      "Vor dem Design steht oft ein <b>Wireframe</b>: eine grobe Skizze in Kästen, ohne Farben. So klärst du Aufbau und Reihenfolge, bevor du Zeit in Details steckst."
    ],
    "terms": [
      "ux",
      "userflow",
      "wireframe"
    ],
    "code": {
      "lang": "user-flow",
      "text": "Google-Suche „Pendlerrad Vergleich“\n   ↓\nLandingpage: Hero + 3 Vorteile\n   ↓  Klick „Vergleich ansehen“\nVergleichstabelle\n   ↓  Klick Affiliate-Link\nKauf beim Händler = Conversion"
    },
    "tip": "Teste deinen Flow mit einer Person, die die Idee nicht kennt. Wo sie zögert, ist deine UX-Baustelle.",
    "task": "Skizziere den User Flow deiner Idee in 3–5 Schritten, von der ersten Berührung bis zur Conversion.",
    "quiz": [
      {
        "q": "Was ist der Unterschied zwischen UX und UI?",
        "a": [
          "UX ist das Erlebnis, UI die sichtbare Oberfläche",
          "Beides ist dasselbe",
          "UI ist das Backend"
        ],
        "c": 0,
        "why": "UI ist Teil der UX, aber UX umfasst den ganzen Weg."
      },
      {
        "q": "Wofür ist ein Wireframe?",
        "a": [
          "Aufbau klären, bevor Details gestaltet werden",
          "Code auf GitHub speichern",
          "Zahlungen abwickeln"
        ],
        "c": 0,
        "why": "Grob vor fein: erst Struktur, dann Look."
      }
    ]
  },
  "design-system": {
    "title": "Design-System, Tokens & Typografie",
    "min": 15,
    "intro": [
      "Ein <b>Design-System</b> ist die Sammlung aller Regeln und Bausteine deines Auftritts: Farben, Schriften, Abstände und fertige Komponenten wie Buttons oder Karten.",
      "<b>Design-Tokens</b> sind die benannten Grundwerte, etwa „accent = #4F46E5“. Im Code stehen sie als CSS-Variablen. Ändert sich die Markenfarbe, änderst du eine Zeile, nicht hundert.",
      "<b>Typografie</b> heißt: wenige Schriften, klare Größenstufen. Diese App nutzt IBM Plex Sans für Text und JetBrains Mono für Code und Labels."
    ],
    "terms": [
      "designsystem",
      "designtoken",
      "typografie",
      "komponente"
    ],
    "code": {
      "lang": "css",
      "text": "/* Tokens dieser Academy */\n:root {\n  --accent: #4F46E5;\n  --ok: #15803D;\n  --radius: 16px;\n}\n.button { background: var(--accent); }"
    },
    "tip": "Gib der KI deine Tokens mit: „Nutze ausschließlich diese Farben und Abstände.“ So bleibt alles einheitlich.",
    "task": "Lege für deine Idee fest: 1 Akzentfarbe (Hex-Code), 1 Textschrift, 1 Schrift für Überschriften.",
    "quiz": [
      {
        "q": "Was ist ein Design-Token?",
        "a": [
          "Ein benannter Grundwert wie eine Farbe",
          "Ein API-Key",
          "Ein Login-Code"
        ],
        "c": 0,
        "why": "Tokens geben Farben, Abständen und Größen einen Namen."
      },
      {
        "q": "Warum Tokens statt fester Werte überall?",
        "a": [
          "Eine Änderung wirkt überall",
          "Die Seite wird größer",
          "Google verlangt es"
        ],
        "c": 0,
        "why": "Eine Variable, viele Stellen: wartbar und einheitlich."
      }
    ]
  },
  "supabase": {
    "title": "Daten speichern mit Supabase",
    "min": 15,
    "intro": [
      "Diese Academy speichert deinen Fortschritt im Browser. Für Daten auf allen Geräten oder für mehrere Nutzer brauchst du eine Datenbank. <b>Supabase</b> liefert sie fertig, mit Login und Dateispeicher.",
      "Daten liegen in einer <b>Tabelle</b>: Zeilen sind Einträge, Spalten ihre Eigenschaften. Eine Tabelle „projekte“ hätte z. B. die Spalten name, idee und nutzer_id.",
      "Wichtig ist <b>Row Level Security</b> (RLS): Regeln, wer welche Zeilen lesen und ändern darf, z. B. „jeder nur seine eigenen Projekte“. Ohne RLS kann der öffentliche Schlüssel im Frontend zu viel erlauben."
    ],
    "terms": [
      "supabase",
      "tabelle",
      "rls",
      "auth"
    ],
    "code": {
      "lang": "js",
      "text": "// Eigene Projekte laden\nconst { data } = await supabase\n  .from(\"projekte\")\n  .select(\"name, idee\");\n\n// RLS sorgt dafür: nur Zeilen des angemeldeten Nutzers"
    },
    "tip": "Prompt-Idee: „Lege eine Tabelle projekte an, aktiviere RLS, damit jeder Nutzer nur seine eigenen Zeilen sieht, und erkläre die Regel in einem Satz.“",
    "task": "Entwirf eine Tabelle für deine Idee: Name der Tabelle und 3–5 Spalten.",
    "quiz": [
      {
        "q": "Was regelt Row Level Security?",
        "a": [
          "Wer welche Zeilen sehen und ändern darf",
          "Die Schriftgröße",
          "Den Domainnamen"
        ],
        "c": 0,
        "why": "RLS schützt Daten zeilenweise, z. B. nur eigene Projekte."
      },
      {
        "q": "Wann brauchst du Supabase statt localStorage?",
        "a": [
          "Wenn Daten auf mehreren Geräten oder für mehrere Nutzer da sein sollen",
          "Für Farben",
          "Nie"
        ],
        "c": 0,
        "why": "localStorage gilt nur für einen Browser auf einem Gerät."
      }
    ]
  },
  "kosten": {
    "title": "Kosten & Betrieb",
    "min": 12,
    "intro": [
      "Eine kleine Web-App ist günstig, aber nicht immer kostenlos. Typische Posten: <b>Domain</b> (meist wenige Euro bis etwa 20 € im Jahr), <b>Hosting</b>, Datenbank, E-Mail-Versand und KI-Schnittstellen.",
      "Viele Anbieter haben einen <b>Free Tier</b>: kostenlos bis zu einer Grenze. Achtung: Bei Vercel ist der kostenlose Hobby-Tarif für private, nicht kommerzielle Projekte gedacht. Für ein Geschäft brauchst du meist einen bezahlten Tarif.",
      "KI-Schnittstellen rechnen <b>nutzungsbasiert</b> ab, oft pro Token (Textstück). Setze Ausgabenlimits und rechne früh durch, was ein Nutzer im Monat kostet."
    ],
    "terms": [
      "freetier",
      "nutzungsbasiert",
      "domain",
      "hosting"
    ],
    "code": {
      "lang": "übersicht",
      "text": "Domain .de           ~ 1–15 € / Jahr\nHosting (Vercel)     Hobby gratis, Pro kostet monatlich\nDatenbank (Supabase) Free Tier, danach Monatstarif\nKI-Schnittstelle     pro Nutzung (Token)\n\nPreise ändern sich – immer auf der Anbieterseite prüfen"
    },
    "tip": "Rechne pro Kunde: Kosten pro Monat ÷ zahlende Nutzer. Liegt das unter deinem Preis, trägt sich das Modell.",
    "task": "Liste die Dienste deiner Idee auf und schätze die monatlichen Kosten bei 0, 100 und 1.000 Nutzern.",
    "quiz": [
      {
        "q": "Was ist ein Free Tier?",
        "a": [
          "Kostenlos bis zu einer Nutzungsgrenze",
          "Für immer unbegrenzt gratis",
          "Ein Rabattcode"
        ],
        "c": 0,
        "why": "Bis zur Grenze gratis, darüber kostenpflichtig."
      },
      {
        "q": "Wie rechnen KI-Schnittstellen meist ab?",
        "a": [
          "Nach Nutzung, z. B. pro Token",
          "Einmalig beim Kauf",
          "Gar nicht"
        ],
        "c": 0,
        "why": "Je mehr Anfragen, desto höher die Rechnung. Limits setzen!"
      }
    ]
  },
  "qualitaet": {
    "title": "Qualität: Testen, Ladezeit, Barrierefreiheit",
    "min": 15,
    "intro": [
      "<b>Testen</b> heißt: Bevor du veröffentlichst, klickst du die wichtigsten Wege einmal durch, auf dem Handy und am Rechner. Lass dir von der KI eine kurze Testliste schreiben.",
      "Die <b>Ladezeit</b> entscheidet, ob Besucher bleiben. Große Bilder sind der häufigste Bremsklotz. <b>Lighthouse</b> in Chrome (Entwicklertools) misst Ladezeit, Barrierefreiheit und SEO und gibt dir Punkte von 0 bis 100.",
      "<b>Barrierefreiheit</b> bedeutet: Alle können deine Seite nutzen, auch mit Screenreader oder schwacher Sehkraft. Dazu gehören Alt-Texte für Bilder, genug Kontrast und Bedienung per Tastatur. Für viele Online-Shops und -Dienste in der EU ist das inzwischen Pflicht."
    ],
    "terms": [
      "testen",
      "ladezeit",
      "lighthouse",
      "barrierefreiheit"
    ],
    "code": {
      "lang": "checkliste",
      "text": "☐ Wichtigster Weg auf dem Handy getestet\n☐ Bilder komprimiert (z. B. WebP)\n☐ Lighthouse: Leistung & Barrierefreiheit über 90\n☐ Jedes Bild hat einen Alt-Text\n☐ Text-Kontrast mindestens 4,5 : 1"
    },
    "tip": "Prompt: „Prüfe meine Seite auf Barrierefreiheit: Alt-Texte, Kontrast, Tastaturbedienung. Liste Probleme mit Fundstelle.“",
    "task": "Schreibe eine Testliste mit 5 Punkten für deine Idee: Was muss vor dem Launch funktionieren?",
    "quiz": [
      {
        "q": "Was bremst Websites am häufigsten?",
        "a": [
          "Zu große Bilder",
          "Zu kurze Texte",
          "Zu wenige Farben"
        ],
        "c": 0,
        "why": "Bilder machen oft den Großteil der Datenmenge aus."
      },
      {
        "q": "Was gehört zur Barrierefreiheit?",
        "a": [
          "Alt-Texte und ausreichender Kontrast",
          "Möglichst viele Animationen",
          "Nur Desktop-Ansicht"
        ],
        "c": 0,
        "why": "So können auch Menschen mit Einschränkungen die Seite nutzen."
      }
    ]
  },
  "website-vs-app": {
    "title": "Website, Web-App oder App?",
    "min": 12,
    "intro": [
      "Eine <b>Website</b> will gefunden werden und überzeugen: Besucher kommen über Google oder Werbung, lesen, vergleichen und fragen an oder kaufen. Wichtig sind SEO, Ladezeit und eine klare Conversion.",
      "Eine <b>Web-App</b> oder eine App im Store will, dass Menschen <b>wiederkommen</b> und sie regelmäßig nutzen. Wichtig sind Login, gespeicherte Daten, schnelle Bedienung und Erinnerungen. Diese Wiederkehr nennt man <b>Retention</b>.",
      "Viele Geschäftsideen brauchen beides: eine Website, die Kunden gewinnt, und eine App, die sie hält. Starte mit dem Teil, der dein Geschäftsmodell zuerst beweist, meist der Website."
    ],
    "terms": [
      "website",
      "webapp",
      "native",
      "retention"
    ],
    "code": {
      "lang": "übersicht",
      "text": "Ziel                      → Start mit\nGefunden werden, Anfragen → Website / Landingpage\nTäglich nutzen, Login     → Web-App (PWA)\nKamera, Push, Offline     → App im Store\nKunden gewinnen + halten  → Website + App, ein Backend"
    },
    "tip": "Frage dich: Woher kommen meine Nutzer, und warum kommen sie wieder? Die erste Antwort braucht eine Website, die zweite eine App.",
    "task": "Ordne deine Idee ein: Website, Web-App, App im Store oder beides? Begründe mit einem Satz zu „gefunden werden“ und einem zu „wiederkommen“.",
    "quiz": [
      {
        "q": "Was ist der wichtigste Schwerpunkt einer Website?",
        "a": [
          "Gefunden werden und überzeugen",
          "Push-Nachrichten",
          "Offline-Nutzung"
        ],
        "c": 0,
        "why": "Websites leben von Besuchern über Suche und Werbung und von einer klaren Conversion."
      },
      {
        "q": "Was bedeutet Retention?",
        "a": [
          "Dass Nutzer wiederkommen",
          "Die Ladezeit einer Seite",
          "Eine Domain-Endung"
        ],
        "c": 0,
        "why": "Retention misst, wie viele Nutzer nach Tagen oder Wochen noch aktiv sind."
      }
    ]
  },
  "ein-backend": {
    "title": "Website und App mit einem Login",
    "min": 15,
    "intro": [
      "Bauen Website und App getrennt eigene Konten, müssen sich Kunden doppelt registrieren und Daten passen nicht zusammen. Besser: <b>ein gemeinsames Backend</b> für beides.",
      "Das Backend, z. B. Supabase, hält Login (<b>Auth</b>), Datenbank und Dateien. Website und App sind nur zwei Oberflächen, die über eine <b>API</b> dieselben Daten lesen und schreiben.",
      "Mit Frameworks wie Next.js für das Web und Expo für Handy-Apps teilst du sogar Teile des Codes. Das nennt man <b>Cross-Platform</b>."
    ],
    "terms": [
      "backend",
      "auth",
      "api",
      "crossplatform"
    ],
    "code": {
      "lang": "ablauf",
      "text": "Website (Next.js)      App (Expo / PWA)\n        \\                /\n         ↓              ↓\n        Supabase: Login, Datenbank\n        ein Konto · dieselben Daten"
    },
    "tip": "Plane das Datenmodell zuerst. Wenn Tabellen und Login stehen, ist eine zweite Oberfläche (App oder Website) viel schneller gebaut.",
    "task": "Welche Daten müssten Website und App deiner Idee gemeinsam nutzen? Nenne drei (z. B. Nutzer, Bestellungen, Favoriten).",
    "quiz": [
      {
        "q": "Warum ein gemeinsames Backend für Website und App?",
        "a": [
          "Ein Konto und dieselben Daten überall",
          "Weil es schöner aussieht",
          "Damit SEO besser wird"
        ],
        "c": 0,
        "why": "Kunden registrieren sich einmal, Daten sind überall gleich."
      },
      {
        "q": "Was bedeutet Cross-Platform?",
        "a": [
          "Ein Code oder Werkzeug für mehrere Plattformen",
          "Eine Zahlungsart",
          "Ein Cookie-Banner"
        ],
        "c": 0,
        "why": "Zum Beispiel eine App, die aus einer Codebasis für iOS und Android entsteht."
      }
    ]
  },
  "tools-plus": {
    "title": "Shop, Newsletter & Co.: welche Tools wann?",
    "min": 12,
    "intro": [
      "Nicht alles baust du selbst. Für Inhalte, die sich oft ändern (Blog, Ratgeber), gibt es ein <b>CMS</b> (Content-Management-System) wie WordPress, Sanity oder Storyblok.",
      "Für Verkäufe nimmst du Shopify (kompletter Shop) oder Stripe (Bezahlung in deiner eigenen App). Für E-Mails an Kunden einen <b>Newsletter</b>-Dienst wie Brevo oder Mailchimp.",
      "Bei Newslettern ist in Deutschland das <b>Double-Opt-in</b> üblich: Nach der Anmeldung bestätigt die Person ihre Adresse per Link. So weist du die Einwilligung nach."
    ],
    "terms": [
      "cms",
      "newsletter",
      "doubleoptin",
      "stripe"
    ],
    "code": {
      "lang": "übersicht",
      "text": "Inhalte pflegen     → CMS (WordPress, Sanity)\nProdukte verkaufen  → Shopify oder Stripe\nE-Mails & Newsletter→ Brevo, Mailchimp\nTermine buchen      → Cal.com, Calendly\nMessen              → Plausible, Matomo"
    },
    "tip": "Jedes Tool kostet Geld, Zeit und Datenschutz-Aufwand. Nimm nur, was dein MVP wirklich braucht.",
    "task": "Stelle deinen Tool-Stack zusammen: Welche 3 Tools braucht deine Idee am Anfang wirklich, und welches kommt erst später?",
    "quiz": [
      {
        "q": "Wofür ist ein CMS gut?",
        "a": [
          "Inhalte ohne Programmieren pflegen",
          "Kartendaten speichern",
          "Apps im Store veröffentlichen"
        ],
        "c": 0,
        "why": "Texte und Bilder ändern, ohne den Code anzufassen."
      },
      {
        "q": "Was ist ein Double-Opt-in?",
        "a": [
          "Anmeldung plus Bestätigung per E-Mail-Link",
          "Zwei Newsletter pro Woche",
          "Ein doppelter Login"
        ],
        "c": 0,
        "why": "So ist nachweisbar, dass die Person wirklich zugestimmt hat."
      }
    ]
  },
  "store-app": {
    "title": "Vom Web in den App Store",
    "min": 15,
    "intro": [
      "Eine PWA reicht oft lange. Eine App im Store lohnt sich, wenn du <b>Push-Nachrichten</b>, Kamera, Bluetooth oder Offline-Nutzung brauchst, oder wenn Kunden dich im Store suchen.",
      "Zwei Wege: Mit <b>Capacitor</b> verpackst du deine bestehende Web-App als App. Mit <b>Expo</b> (React Native) baust du eine echte native App und nutzt dein React-Wissen.",
      "Für den <b>App Store</b> brauchst du ein Apple-Entwicklerkonto (jährliche Gebühr), für Google Play ein Konto mit einmaliger Gebühr. Jede App wird vor der Veröffentlichung geprüft und braucht eine Datenschutzerklärung."
    ],
    "terms": [
      "capacitor",
      "expo",
      "pushnotification",
      "appstore"
    ],
    "code": {
      "lang": "ablauf",
      "text": "1. Web-App läuft stabil (PWA)\n2. Login + Daten in Supabase\n3. Capacitor oder Expo wählen\n4. Entwicklerkonten anlegen\n5. Testversion (TestFlight / interner Test)\n6. Prüfung durch Apple / Google → live"
    },
    "tip": "Erst Web-App stabil, dann Backend, dann Store. Sonst baust du zweimal.",
    "task": "Braucht deine Idee wirklich eine Store-App? Liste die Handy-Funktionen auf, die eine PWA nicht kann, und entscheide.",
    "quiz": [
      {
        "q": "Was macht Capacitor?",
        "a": [
          "Verpackt eine Web-App als Store-App",
          "Verschickt Newsletter",
          "Ist eine Datenbank"
        ],
        "c": 0,
        "why": "Dein Web-Code läuft in einer App-Hülle, die in den Store kann."
      },
      {
        "q": "Wann lohnt sich eine Store-App besonders?",
        "a": [
          "Wenn du Push, Kamera oder Offline brauchst",
          "Für eine reine Landingpage",
          "Nie"
        ],
        "c": 0,
        "why": "Diese Funktionen kann eine Website nur eingeschränkt."
      }
    ]
  },
  "content-creation": {
    "title": "Content Creation & Personal Brand",
    "min": 12,
    "intro": [
      "<b>Content Creation</b> heißt: Du erstellst regelmäßig Inhalte (Videos, Posts, Texte), die einer Zielgruppe helfen oder sie unterhalten. Aus Vertrauen wird später Umsatz.",
      "Eine <b>Personal Brand</b> ist das, wofür man dich kennt: ein klares Thema, ein erkennbarer Stil, eine Haltung. Je enger das Thema, desto schneller findest du deine Leute.",
      "Plane mit 3–4 <b>Content-Säulen</b>, also festen Themenbereichen. Und nutze jeden Inhalt mehrfach: Aus einem Video werden ein Short, ein Post und ein Newsletter. Das nennt man <b>Repurposing</b>."
    ],
    "terms": [
      "personalbrand",
      "contentpillar",
      "repurposing"
    ],
    "code": {
      "lang": "redaktionsplan",
      "text": "Säule 1: Tipps        → Mo: Kurzvideo\nSäule 2: Hinter den Kulissen → Mi: Story\nSäule 3: Kundenfragen → Fr: Karussell-Post\nEin Video → Short + Post + Newsletter"
    },
    "tip": "Lieber zwei Beiträge pro Woche über drei Monate als zehn Beiträge in einer Woche und dann Pause. Regelmäßigkeit schlägt Menge.",
    "task": "Lege für deine Idee drei Content-Säulen fest und schreibe zu jeder eine konkrete Beitragsidee.",
    "quiz": [
      {
        "q": "Was sind Content-Säulen?",
        "a": [
          "Feste Themenbereiche für deine Inhalte",
          "Server für Videos",
          "Werbeanzeigen"
        ],
        "c": 0,
        "why": "Sie geben Struktur und machen dich wiedererkennbar."
      },
      {
        "q": "Was bedeutet Repurposing?",
        "a": [
          "Einen Inhalt in mehreren Formaten nutzen",
          "Einen Account löschen",
          "Follower kaufen"
        ],
        "c": 0,
        "why": "Aus einem Video werden Short, Post und Newsletter: mehr Reichweite bei gleichem Aufwand."
      }
    ]
  },
  "social-media": {
    "title": "Social Media: Plattformen & Reichweite",
    "min": 12,
    "intro": [
      "Jede Plattform hat ihre Stärken: <b>Instagram</b> und <b>TikTok</b> für Kurzvideos und Bilder, <b>LinkedIn</b> für Fachthemen und B2B. Starte auf der Plattform, auf der deine Zielgruppe schon ist.",
      "Der <b>Algorithmus</b> entscheidet, wem dein Beitrag gezeigt wird. Er belohnt, was Menschen bis zum Ende ansehen, kommentieren und teilen. Die ersten zwei Sekunden, der <b>Hook</b>, entscheiden, ob jemand weiterschaut.",
      "Miss nicht nur Follower, sondern die <b>Engagement-Rate</b>: Wie viele reagieren auf einen Beitrag? Und denk dran: Geschäftliche Profile brauchen in Deutschland ein Impressum, oft per Link in der Bio."
    ],
    "terms": [
      "algorithmus",
      "hook",
      "engagement",
      "impressum"
    ],
    "code": {
      "lang": "kurzvideo",
      "text": "0–2 s   Hook: „3 Fehler beim E-Bike-Kauf“\n2–20 s  Inhalt: Fehler 1, 2, 3\n20–25 s Aufforderung: „Speicher dir das“\nText im Bild, Untertitel an"
    },
    "tip": "Schau dir an, welche Beiträge in deiner Nische gut laufen, und frag: Was ist der Hook? Was ist das Versprechen? Dann mach es auf deine Art.",
    "task": "Welche Plattform nutzt deine Zielgruppe am meisten? Schreibe drei Hooks für deine ersten Beiträge.",
    "quiz": [
      {
        "q": "Was ist ein Hook?",
        "a": [
          "Der Einstieg, der in Sekunden Aufmerksamkeit holt",
          "Ein Bezahlsystem",
          "Ein Hashtag-Paket"
        ],
        "c": 0,
        "why": "Ohne starken Einstieg wischen Menschen weiter."
      },
      {
        "q": "Was belohnt der Algorithmus meist?",
        "a": [
          "Ansehen bis zum Ende, Kommentare, Teilen",
          "Möglichst viele Hashtags",
          "Lange Pausen zwischen Posts"
        ],
        "c": 0,
        "why": "Plattformen zeigen, was Menschen auf der Plattform hält."
      }
    ]
  },
  "youtube": {
    "title": "YouTube: Kanal, Videos & Shorts",
    "min": 15,
    "intro": [
      "YouTube ist auch eine <b>Suchmaschine</b>: Menschen suchen „wie mache ich …“. Videos, die solche Fragen gut beantworten, werden über Jahre gefunden.",
      "<b>Titel</b> und <b>Thumbnail</b> (Vorschaubild) entscheiden, ob jemand klickt. Diese Klickrate heißt <b>CTR</b>. Danach zählt die <b>Watchtime</b>: Wie lange schauen Menschen zu?",
      "<b>Shorts</b> (kurze Hochkant-Videos) bringen schnell neue Zuschauer, lange Videos bauen Vertrauen auf. Geld verdienen kannst du über das Partnerprogramm (die Voraussetzungen ändern sich, aktuell bei YouTube prüfen), Sponsoring und eigene Angebote."
    ],
    "terms": [
      "thumbnail",
      "ctr",
      "watchtime"
    ],
    "code": {
      "lang": "video-plan",
      "text": "Suchfrage:  „E-Bike Akku richtig laden“\nTitel:      Akku richtig laden: 5 Fehler, die Geld kosten\nThumbnail:  Akku + großes ✗, max. 3 Wörter\nEinstieg:   Ergebnis in den ersten 15 Sekunden zeigen"
    },
    "tip": "Denke Titel und Thumbnail vor dem Dreh. Wenn dir keiner einfällt, auf den man klicken will, ist die Videoidee noch nicht stark genug.",
    "task": "Schreibe drei Videoideen für deine Idee als Suchfragen, so wie deine Zielgruppe sie bei YouTube eintippen würde.",
    "quiz": [
      {
        "q": "Wofür steht CTR bei YouTube?",
        "a": [
          "Anteil der Leute, die auf dein Video klicken",
          "Länge des Videos",
          "Anzahl der Abonnenten"
        ],
        "c": 0,
        "why": "Click-Through-Rate: Wie viele klicken, nachdem sie Titel und Thumbnail gesehen haben."
      },
      {
        "q": "Warum sind Erklär-Videos auf YouTube wertvoll?",
        "a": [
          "Sie werden über die Suche lange gefunden",
          "Sie verschwinden nach 24 Stunden",
          "Sie brauchen kein Thumbnail"
        ],
        "c": 0,
        "why": "YouTube ist eine Suchmaschine: Gute Antworten bringen über Jahre Zuschauer."
      }
    ]
  },
  "creator-business": {
    "title": "Geld verdienen als Creator",
    "min": 12,
    "intro": [
      "Creator verdienen meist aus mehreren Quellen: <b>Sponsoring</b> (Marken bezahlen für Erwähnungen), Affiliate-Links, Werbeeinnahmen der Plattform und eigene Produkte wie Kurse, Beratung oder Merch.",
      "Für Marken-Kooperationen brauchst du ein <b>Mediakit</b>: Wer bist du, wer schaut dir zu, welche Zahlen hast du, was kostet eine Zusammenarbeit?",
      "Bezahlte oder geschenkte Kooperationen musst du in Deutschland als Werbung kennzeichnen, z. B. mit „Werbung“ oder „Anzeige“ gut sichtbar am Anfang. Das ist keine Rechtsberatung, im Zweifel prüfen lassen."
    ],
    "terms": [
      "sponsoring",
      "mediakit",
      "affiliate"
    ],
    "code": {
      "lang": "einnahmen",
      "text": "Sponsoring     → Marke zahlt pro Beitrag\nAffiliate      → Provision pro Verkauf\nPlattform      → Anteil an Werbeeinnahmen\nEigenes Produkt→ Kurs, Beratung, Shop\nZiel: nicht von einer Quelle abhängig sein"
    },
    "tip": "Eine kleine, treue Zielgruppe kann mehr wert sein als viele lose Follower. Marken achten zunehmend auf Engagement und Passung.",
    "task": "Welche zwei Einnahmequellen passen zu deiner Idee? Schätze, was eine Kooperation bei dir kosten könnte, und begründe.",
    "quiz": [
      {
        "q": "Was gehört in ein Mediakit?",
        "a": [
          "Zielgruppe, Zahlen und Preise für Kooperationen",
          "Dein Passwort",
          "Nur dein Profilbild"
        ],
        "c": 0,
        "why": "Marken wollen schnell sehen, ob du zu ihnen passt."
      },
      {
        "q": "Muss eine bezahlte Kooperation gekennzeichnet werden?",
        "a": [
          "Ja, als Werbung",
          "Nur bei über 10.000 Followern",
          "Nein"
        ],
        "c": 0,
        "why": "Werbung muss für Zuschauer erkennbar sein, unabhängig von der Größe."
      }
    ]
  }
};
