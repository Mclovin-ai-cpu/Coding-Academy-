import type { Mission, MissionLevel, TrackStep } from "./types";

export const LEVELS: Record<MissionLevel, { label: string; code: string; hint: string }> = {
  play: { label: "Spielerisch", code: "Q&A", hint: "Kurze Wissens-Challenge, ganz ohne Werkzeuge" },
  ai: { label: "Mit KI", code: "KI", hint: "Mit einem fertigen Prompt in Claude ausprobieren" },
  build: { label: "Echt bauen", code: "</>", hint: "Wirklich umsetzen, mit echten Werkzeugen" }
};

export const MISSIONS: Mission[] = [
  // ---------- Spielerisch ----------
  { id: "client-server", level: "play", title: "Client oder Server?", min: 5, xp: 15, lesson: "web-basics",
    intro: "Wo passiert was? Ordne jede Situation richtig zu.",
    steps: ["Fragen beantworten", "Erklärung lesen, wenn du danebenliegst"],
    quiz: [
      { q: "Ein Button wird beim Antippen kurz dunkler.", a: ["Client (im Browser)", "Server"], c: 0, why: "Optische Reaktionen laufen direkt im Browser." },
      { q: "Eine Bestellung wird dauerhaft gespeichert.", a: ["Client (im Browser)", "Server"], c: 1, why: "Dauerhafte, geteilte Daten liegen auf dem Server bzw. in der Datenbank." },
      { q: "Ein Passwort wird mit der Datenbank abgeglichen.", a: ["Client (im Browser)", "Server"], c: 1, why: "Sicherheitsprüfungen gehören immer auf den Server." },
      { q: "Diese App merkt sich deine XP im localStorage.", a: ["Client (im Browser)", "Server"], c: 0, why: "localStorage liegt im Browser auf deinem Gerät." }
    ]},
  { id: "stack-duell", level: "play", title: "Welcher Stack passt? Quiz-Duell", min: 5, xp: 15, lesson: "stack",
    intro: "Drei Geschäftsideen, drei Entscheidungen. Welcher Weg passt jeweils am besten?",
    steps: ["Szenario lesen", "Weg wählen", "Begründung vergleichen"],
    quiz: [
      { q: "Du willst in einer Woche testen, ob jemand Fahrrad-Abos anfragt.", a: ["Landingpage mit Framer oder einfachem HTML", "Eigene App mit Datenbank und Login", "Native iPhone-App"], c: 0, why: "Erst die Nachfrage testen, dann bauen: ein MVP." },
      { q: "Du verkaufst 30 Ersatzteile mit Versand.", a: ["Shopify", "Next.js + Supabase komplett selbst", "GitHub Pages"], c: 0, why: "Shopify bringt Warenkorb, Zahlung und Versand fertig mit." },
      { q: "Händler sollen sich einloggen und Bestellungen verwalten.", a: ["Nur HTML", "Next.js + Supabase", "Ein PDF"], c: 1, why: "Login und gemeinsame Daten brauchen ein Backend." }
    ]},
  { id: "recht-check", level: "play", title: "Pflicht oder Kür? Recht-Check", min: 5, xp: 15, lesson: "legal",
    intro: "Was brauchst du wirklich auf einer geschäftlichen Website in Deutschland? (Keine Rechtsberatung.)",
    steps: ["Fragen beantworten", "Merken, was Pflicht ist"],
    quiz: [
      { q: "Impressum auf einer geschäftlichen Website", a: ["Pflicht", "Kür"], c: 0, why: "Geschäftsmäßige Angebote brauchen ein Impressum." },
      { q: "Cookie-Einwilligung, obwohl du kein Tracking nutzt", a: ["Pflicht", "Meist nicht nötig"], c: 1, why: "Technisch notwendige Cookies brauchen keine Einwilligung, Tracking schon." },
      { q: "Affiliate-Links als Werbung kennzeichnen", a: ["Pflicht", "Kür"], c: 0, why: "Werbung muss als solche erkennbar sein." }
    ]},
  { id: "secret-jagd", level: "play", title: "Finde das Sicherheitsleck", min: 5, xp: 15, lesson: "security",
    intro: "Welche dieser Situationen ist gefährlich?",
    steps: ["Situationen bewerten", "Merken, wo Geheimnisse hingehören"],
    quiz: [
      { q: "Der Stripe-Geheimschlüssel steht in der index.html.", a: ["Gefährlich", "Unbedenklich"], c: 0, why: "Alles im Frontend kann jeder Besucher lesen." },
      { q: "Der API-Key liegt in den Environment Variables bei Vercel.", a: ["Gefährlich", "Unbedenklich"], c: 1, why: "Umgebungsvariablen sind nur auf dem Server lesbar." },
      { q: "Eine Supabase-Tabelle ohne RLS mit öffentlichem Schlüssel im Frontend.", a: ["Gefährlich", "Unbedenklich"], c: 0, why: "Ohne Row Level Security kann der öffentliche Schlüssel zu viel erlauben." }
    ]},
  { id: "kosten-schaetzen", level: "play", title: "Was kostet das?", min: 5, xp: 15, lesson: "kosten",
    intro: "Schätze, welche Posten bei einer kleinen Web-App anfallen.",
    steps: ["Fragen beantworten", "Eigene Kosten im Projekt notieren"],
    quiz: [
      { q: "Eine .de-Domain kostet meistens …", a: ["wenige Euro im Jahr", "mehrere hundert Euro im Monat"], c: 0, why: ".de-Domains sind günstig, oft im einstelligen Eurobereich pro Jahr." },
      { q: "Vercels kostenloser Hobby-Tarif ist gedacht für …", a: ["private, nicht kommerzielle Projekte", "jedes Geschäft ohne Grenzen"], c: 0, why: "Für kommerzielle Nutzung ist ein bezahlter Tarif vorgesehen." },
      { q: "Eine KI-Schnittstelle in deiner App kostet …", a: ["je nach Nutzung", "einmalig beim Einrichten"], c: 0, why: "Abgerechnet wird meist pro Token, also nach Verbrauch." }
    ]},

  // ---------- Mit KI ----------
  { id: "zielgruppe", level: "ai", title: "Zielgruppe schärfen mit KI", min: 15, xp: 40, lesson: "vibe",
    intro: "Lass dir von Claude helfen, deine Zielgruppe konkret zu beschreiben.",
    steps: ["Prompt an deine Idee anpassen", "In Claude einfügen", "Die passendste Persona als Ergebnis speichern"],
    prompt: "Meine Idee: {idee}\n\nHilf mir, die Zielgruppe zu schärfen:\n- Beschreibe 3 mögliche Personas (Alter, Situation, Problem)\n- Welches Problem ist am dringendsten?\n- Wo erreiche ich diese Menschen online?\nAntworte kurz und in Stichpunkten.",
    result: "Deine Persona in 2–3 Sätzen" },
  { id: "domain-ideen", level: "ai", title: "Domain finden und prüfen", min: 15, xp: 40, lesson: "domain",
    intro: "Sammle Namensideen und prüfe, ob die Domain noch frei ist.",
    steps: ["Prompt anpassen und Ideen holen", "Verfügbarkeit bei einem Registrar prüfen", "Deinen Favoriten speichern"],
    prompt: "Meine Idee: {idee}\n\nSchlage 10 kurze, merkbare Namen vor, die als .de- oder .com-Domain funktionieren.\nRegeln: max. 15 Zeichen, keine Bindestriche, leicht auszusprechen.\nErkläre zu jedem Namen in einem Halbsatz die Idee dahinter.",
    result: "Deine Wunsch-Domain" },
  { id: "grundgeruest", level: "ai", title: "Landingpage-Grundgerüst per Prompt", min: 20, xp: 40, lesson: "prompting",
    intro: "Lass Claude das erste Grundgerüst deiner Landingpage bauen.",
    steps: ["Prompt unten an deine Idee anpassen", "In Claude einfügen und Ergebnis ansehen", "Link oder Notiz zum Ergebnis speichern"],
    prompt: "Ziel: Landingpage für {idee}\nZielgruppe: [WER?]\nMuss enthalten: Hero, 3 Vorteile, Preis oder Angebot, Kontaktformular\nTechnik: eine index.html, mobil zuerst\nStil: [FARBE, STIMMUNG]\n// Erkläre jede Datei in einem Satz",
    result: "Link zur Vorschau oder kurze Notiz" },
  { id: "handoff", level: "ai", title: "Dein erster Handoff", min: 20, xp: 40, lesson: "handoff",
    intro: "Schreibe mit Claude eine Übergabe, mit der eine KI dein Design umsetzen kann.",
    steps: ["Prompt anpassen", "Übergabe erzeugen lassen", "Übergabe im Projekt speichern"],
    prompt: "Ich baue: {idee}\n\nErstelle eine kurze Übergabe (handoff.md) für die Umsetzung mit Next.js + Tailwind:\n- Screens und was auf jedem zu sehen ist\n- Farben und Schriften als Design-Tokens\n- Verhalten: Klicks, leere Zustände, Fehler\n- Offene Fragen\nMax. eine Seite.",
    result: "Deine Übergabe (oder Link dazu)" },
  { id: "design-tokens", level: "ai", title: "Farben & Schriften festlegen", min: 15, xp: 40, lesson: "design-system",
    intro: "Entwickle mit Claude ein Mini-Design-System für deine Idee.",
    steps: ["Prompt anpassen", "Vorschlag prüfen: Kontrast, Stimmung", "Tokens speichern"],
    prompt: "Meine Idee: {idee}\n\nSchlage ein Mini-Design-System vor:\n- 1 Akzentfarbe, 1 Hintergrund, 1 Textfarbe (Hex-Codes)\n- prüfe, dass Text mindestens 4,5:1 Kontrast hat\n- 1 Schrift für Text, 1 für Überschriften (Google Fonts)\nGib das Ergebnis als CSS-Variablen aus.",
    result: "Deine Tokens (z. B. --accent: #…)" },
  { id: "bug-report", level: "ai", title: "Bug-Prompt schreiben", min: 10, xp: 30, lesson: "debugging",
    intro: "Übe das Bug-Format an einem echten oder ausgedachten Fehler.",
    steps: ["Vorlage ausfüllen", "An Claude schicken", "Lösung notieren"],
    prompt: "Das passiert: [GENAU BESCHREIBEN]\nErwartet: [WAS SOLLTE PASSIEREN]\nFehlermeldung: [AUS DER KONSOLE KOPIEREN]\nWo: [DATEI / SEITE]\n\nErkläre die Ursache in 2 Sätzen und schlage die kleinste mögliche Korrektur vor.",
    result: "Was war die Ursache?" },
  { id: "rechtstexte", level: "ai", title: "Impressum & Datenschutz vorbereiten", min: 20, xp: 40, lesson: "legal",
    intro: "Lass dir eine Checkliste erstellen, welche Rechtstexte dein Projekt braucht. Texte danach mit einem Generator oder Fachleuten erstellen, nicht ungeprüft übernehmen.",
    steps: ["Prompt anpassen", "Checkliste prüfen", "Offene Punkte speichern"],
    prompt: "Ich plane in Deutschland: {idee}\n\nWelche Rechtstexte und Pflichtangaben brauche ich voraussichtlich (Impressum, Datenschutz, Cookies, AGB, Kennzeichnung)?\nNenne zu jedem Punkt, warum, und welche Daten mein Projekt dafür sammelt.\nHinweis: Das ist keine Rechtsberatung, markiere Punkte, die ich prüfen lassen sollte.",
    result: "Deine Checkliste mit offenen Punkten" },
  { id: "zahlen", level: "ai", title: "Umsatz durchrechnen mit KI", min: 15, xp: 40, lesson: "money",
    intro: "Rechne dein Erlösmodell mit realistischen Annahmen durch.",
    steps: ["Annahmen eintragen", "Rechnung von Claude prüfen lassen", "Ergebnis speichern"],
    prompt: "Meine Idee: {idee}\nErlösmodell: [Abo / Einmalkauf / Affiliate]\nAnnahmen: [Besucher pro Monat], [Conversion-Rate in %], [Preis oder Provision]\nKosten pro Monat: [Hosting, Tools]\n\nRechne Umsatz und Gewinn pro Monat in einer Tabelle und zeige, ab wie vielen Kunden ich die Kosten decke.",
    result: "Break-even: ab wie vielen Kunden?" },
  { id: "seo-titel", level: "ai", title: "Titel & Beschreibung für Google", min: 10, xp: 30, lesson: "seo",
    intro: "Formuliere dein Schaufenster in den Suchergebnissen.",
    steps: ["Prompt anpassen", "Beste Variante wählen", "Speichern"],
    prompt: "Meine Seite: {idee}\nWichtigstes Suchwort: [KEYWORD]\n\nSchreibe 5 Varianten für <title> (max. 60 Zeichen) und meta description (max. 155 Zeichen). Formuliere wie eine Anzeige, mit klarem Nutzen.",
    result: "Dein Titel und deine Beschreibung" },

  // ---------- Echt bauen ----------
  { id: "github-repo", level: "build", title: "Erstes Repository anlegen", min: 20, xp: 60, lesson: "git",
    intro: "Lege auf GitHub ein Repository für dein Projekt an und lade die erste Datei hoch.",
    steps: ["Auf github.com → New repository", "Namen wählen, Sichtbarkeit bewusst entscheiden (öffentlich = jeder kann lesen)", "Eine index.html hochladen (Add file → Upload files)", "Commit-Nachricht schreiben und speichern"],
    result: "Link zu deinem Repository" },
  { id: "vercel-deploy", level: "build", title: "Mit Vercel veröffentlichen", min: 30, xp: 80, lesson: "deploy",
    intro: "Verbinde dein Repository mit Vercel. Danach geht jeder Push automatisch live.",
    steps: ["Auf vercel.com mit GitHub anmelden", "Add New → Project → Repository importieren", "Deploy klicken und warten", "Die .vercel.app-Adresse auf dem Handy öffnen"],
    result: "Deine .vercel.app-Adresse" },
  { id: "domain-verbinden", level: "build", title: "Domain mit Vercel verbinden", min: 30, xp: 80, lesson: "domain",
    intro: "Mach deine eigene Domain zur Adresse deiner App.",
    steps: ["In Vercel: Project → Settings → Domains → Domain eintragen", "Die angezeigten DNS-Einträge beim Registrar eintragen", "Warten, bis Vercel „Valid Configuration“ zeigt (kann dauern)", "Domain im Browser mit https:// testen"],
    result: "Deine Domain" },
  { id: "branch-pr", level: "build", title: "Änderung per Branch & Pull Request", min: 20, xp: 60, lesson: "branch-pr",
    intro: "Probiere eine Änderung gefahrlos in einem Branch aus.",
    steps: ["Auf GitHub einen neuen Branch anlegen", "Eine kleine Änderung machen und committen", "Pull Request öffnen, Preview-Link von Vercel testen", "Mergen, wenn alles passt"],
    result: "Link zum Pull Request" },
  { id: "anfrageformular", level: "build", title: "Anfrageformular, das wirklich ankommt", min: 30, xp: 80, lesson: "js",
    intro: "Ein Formular braucht ein Ziel, an das es die Daten schickt. Ein Formular-Dienst (z. B. Formspree oder Tally) erledigt das ohne eigenes Backend.",
    steps: ["Bei einem Formular-Dienst ein Formular anlegen", "Einbinden lassen: Prompt „Binde dieses Formular in meine Landingpage ein“", "Datenschutzhinweis neben dem Formular ergänzen", "Testanfrage schicken und Eingang prüfen"],
    result: "Ist die Testanfrage angekommen?" },
  { id: "supabase-tabelle", level: "build", title: "Erste Tabelle in Supabase", min: 30, xp: 80, lesson: "supabase",
    intro: "Lege ein kostenloses Supabase-Projekt und deine erste Tabelle an.",
    steps: ["Auf supabase.com ein Projekt anlegen", "Table Editor → New table, z. B. „anfragen“ mit name, email, nachricht", "Row Level Security aktiviert lassen", "Einen Testeintrag von Hand anlegen"],
    result: "Name und Spalten deiner Tabelle" },
  { id: "stripe-test", level: "build", title: "Stripe-Testzahlung", min: 30, xp: 80, lesson: "payments",
    intro: "Erlebe einen Bezahlvorgang, ohne dass echtes Geld fließt.",
    steps: ["Stripe-Konto anlegen und Testmodus einschalten", "Einen Zahlungslink (Payment Link) für ein Testprodukt erstellen", "Mit einer Testkarte aus der Stripe-Dokumentation bezahlen", "Die Zahlung im Dashboard finden"],
    result: "Was hast du im Dashboard gesehen?" },
  { id: "lighthouse", level: "build", title: "Ladezeit & Barrierefreiheit messen", min: 15, xp: 60, lesson: "qualitaet",
    intro: "Miss deine Seite mit Lighthouse und behebe den größten Punkt.",
    steps: ["Seite in Chrome öffnen → Entwicklertools → Lighthouse", "Analyse für Mobil starten", "Die drei wichtigsten Hinweise notieren", "Einen davon mit Claude beheben und neu messen"],
    result: "Deine Punkte vorher → nachher" }
];

export const MISSION_BY_ID: Record<string, Mission> = Object.fromEntries(MISSIONS.map((m) => [m.id, m]));

/** Passende Mission zu einer Lektion (für To-dos und Lektionen) */
export function missionForLesson(lesson: string): Mission | undefined {
  const list = MISSIONS.filter((m) => m.lesson === lesson);
  return list.find((m) => m.level === "ai") || list.find((m) => m.level === "build") || list[0];
}

export const TRACK: TrackStep[] = [
  { id: "zielgruppe", title: "Zielgruppe schärfen", text: "Für wen baust du, und welches Problem löst du?", lesson: "vibe", missions: ["zielgruppe"] },
  { id: "name", title: "Name & Domain finden", text: "Ein merkbarer Name und eine freie Domain.", lesson: "domain", missions: ["domain-ideen", "domain-verbinden"] },
  { id: "landing", title: "Landingpage bauen", text: "Grundgerüst per Prompt, dann online stellen.", lesson: "prompting", missions: ["grundgeruest", "github-repo", "vercel-deploy"] },
  { id: "recht", title: "Impressum & Datenschutz klären", text: "Pflichtangaben vorbereiten und prüfen lassen.", lesson: "legal", missions: ["rechtstexte", "recht-check"] },
  { id: "anfragen", title: "Erste Anfragen bekommen", text: "Formular, das ankommt, und Titel, die gefunden werden.", lesson: "seo", missions: ["anfrageformular", "seo-titel"] },
  { id: "zahlen", title: "Zahlen durchrechnen", text: "Kosten, Preis, Break-even.", lesson: "money", missions: ["zahlen", "kosten-schaetzen"] }
];
