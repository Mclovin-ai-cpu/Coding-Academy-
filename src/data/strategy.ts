import { TRACK } from "./missions";
import type { TrackStep } from "./types";

/*
 * Strategie-Übersicht nach Lean Startup:
 * Jedes Geschäftsmodell startet mit der wichtigsten Annahme (Hypothese),
 * testet sie mit dem kleinsten möglichen Produkt (MVP), misst eine klare Kennzahl
 * und entscheidet dann: weitermachen, anpassen oder stoppen.
 * Die Richtwerte sind Orientierung für den Start, keine festen Branchenzahlen.
 */

export type Model = {
  id: string;
  label: string;
  short: string;
  /** Wichtigste Annahme, die zuerst bewiesen werden muss */
  hypothesis: string;
  /** Kleinstes Produkt, das diese Annahme testet */
  mvp: string;
  /** Woran du misst, ob es funktioniert */
  metric: string;
  /** Wann weitermachen lohnt (Richtwert) */
  signal: string;
  revenue: string;
  stack: string;
  /** Projektvorlagen, die zu diesem Modell gehören */
  templates: string[];
  /** Die Lean-Schleife konkret für dieses Modell */
  loop: { build: string; measure: string; learn: string };
  /** Häufige Fehler gerade bei diesem Modell */
  mistakes: string[];
  track: TrackStep[];
};

export const LEAN = {
  title: "Lean Startup: Bauen → Messen → Lernen",
  text: "Baue nicht gleich das fertige Produkt. Teste die eine Annahme, an der deine Idee hängt, mit dem kleinsten möglichen Angebot und miss eine klare Kennzahl. Danach entscheidest du: weitermachen, anpassen (Pivot) oder stoppen."
};

export const MODELS: Model[] = [
  {
    id: "landing", label: "Landingpage & Anfragen", short: "Landingpage",
    hypothesis: "Menschen fragen dein Angebot an, wenn sie es auf einer Seite klar verstehen.",
    mvp: "Eine Seite mit Nutzenversprechen, drei Vorteilen und Anfrageformular.",
    metric: "Anfragen pro 100 Besucher (Conversion-Rate)",
    signal: "Richtwert: ab etwa 2–5 Anfragen pro 100 Besuchern lohnt sich der Ausbau.",
    revenue: "Dienstleistung, Projektpreis, Termin",
    stack: "Framer oder Next.js · Formular-Dienst · Vercel",
    templates: ["landing", "free"],
    loop: { build: "Eine Seite mit Angebot, Preis oder Preisspanne und Anfrageformular, an einem Wochenende gebaut.", measure: "Zwei Wochen gezielt Besucher holen (Bekannte, eine kleine Anzeige) und Anfragen pro 100 Besucher zählen.", learn: "Viele Besucher, keine Anfragen: Angebot oder Preis anpassen. Kaum Besucher: erst die Reichweite lösen." },
    mistakes: ["Monatelang an Design feilen, bevor ein einziger Besucher kam", "Zu viele Angebote auf einer Seite statt einem klaren", "Kein Formular oder keine sichtbare Kontaktmöglichkeit"],
    track: TRACK
  },
  {
    id: "affiliate", label: "Affiliate-Seite", short: "Affiliate",
    hypothesis: "Leser vertrauen deinen Vergleichen und klicken auf deine Empfehlungen.",
    mvp: "Drei bis fünf ehrliche Vergleichsartikel zu einer klaren Nische.",
    metric: "Klickrate auf Affiliate-Links und Besucher aus Google",
    signal: "Richtwert: Wenn Artikel nach einigen Wochen Besucher aus Google bekommen und ein Teil davon klickt, mehr Artikel schreiben.",
    revenue: "Provision pro Verkauf",
    stack: "WordPress oder Next.js · Affiliate-Netzwerk · Analytics",
    templates: ["affiliate"],
    loop: { build: "Drei Vergleichsartikel zu Suchbegriffen mit Kaufabsicht, z. B. „bestes Pendlerrad bis 1.000 €“.", measure: "Nach einigen Wochen: Besucher aus Google pro Artikel und Klickrate auf die Affiliate-Links.", learn: "Besucher, aber keine Klicks: Empfehlungen klarer machen. Gar keine Besucher: Suchbegriffe mit weniger Konkurrenz wählen." },
    mistakes: ["Zu breite Nische mit starker Konkurrenz", "Produkte empfehlen, die man nicht kennt", "Affiliate-Links nicht als Werbung kennzeichnen"],
    track: [
      { id: "aff-nische", title: "Nische & Zielgruppe wählen", text: "Ein Thema, bei dem du Leser wirklich weiterbringst.", lesson: "money", missions: ["zielgruppe"] },
      { id: "aff-keywords", title: "Suchbegriffe finden", text: "Wonach suchen deine Leser bei Google?", lesson: "seo", missions: ["seo-titel"] },
      { id: "aff-artikel", title: "Erste Vergleichsartikel", text: "Drei bis fünf Artikel mit Vergleichstabelle.", lesson: "money", missions: ["affiliate-vergleich"] },
      { id: "aff-online", title: "Online & Werbung kennzeichnen", text: "Seite veröffentlichen, Affiliate-Links markieren.", lesson: "legal", missions: ["vercel-deploy", "recht-check"] },
      { id: "aff-binden", title: "Leser binden", text: "Newsletter, damit Leser wiederkommen.", lesson: "tools-plus", missions: ["newsletter-doi"] },
      { id: "aff-messen", title: "Klicks & Umsatz messen", text: "Welche Artikel bringen Klicks und Provision?", lesson: "seo", missions: ["zahlen"] }
    ]
  },
  {
    id: "shop", label: "Online-Shop", short: "Shop",
    hypothesis: "Kunden kaufen dein Produkt online zu einem Preis, der sich für dich rechnet.",
    mvp: "Wenige Produkte in einem fertigen Shopsystem mit echter Bezahlung.",
    metric: "Käufe pro 100 Besucher und Gewinn pro Bestellung",
    signal: "Richtwert: Wenn erste Fremde kaufen und nach Versand und Gebühren Gewinn bleibt, Sortiment und Werbung ausbauen.",
    revenue: "Einmalkauf, ggf. Abo",
    stack: "Shopify oder Stripe · Versanddienst · Analytics",
    templates: ["shop"],
    loop: { build: "Drei bis fünf Produkte in einem fertigen Shopsystem, echte Bezahlung, einfacher Versand.", measure: "Käufe pro 100 Besucher und was pro Bestellung nach Versand, Gebühren und Retouren übrig bleibt.", learn: "Käufe, aber kein Gewinn: Preis, Versand oder Einkauf ändern. Keine Käufe: Produktseiten, Vertrauen oder Zielgruppe prüfen." },
    mistakes: ["Großes Sortiment vor dem ersten Verkauf einkaufen", "Versand- und Zahlungsgebühren nicht einrechnen", "AGB und Widerrufsbelehrung vergessen"],
    track: [
      { id: "shop-produkte", title: "Produkte & Preise festlegen", text: "Was verkaufst du, und was bleibt pro Stück übrig?", lesson: "kosten", missions: ["kosten-schaetzen"] },
      { id: "shop-system", title: "Shopsystem wählen", text: "Fertiger Shop oder eigene Lösung?", lesson: "stack", missions: ["stack-duell", "tool-auswahl"] },
      { id: "shop-seiten", title: "Produktseiten texten", text: "Nutzen statt Merkmale, gut auffindbar.", lesson: "seo", missions: ["produkttexte"] },
      { id: "shop-zahlung", title: "Bezahlung testen", text: "Testzahlung, bevor echtes Geld fließt.", lesson: "payments", missions: ["stripe-test"] },
      { id: "shop-recht", title: "AGB, Widerruf, Impressum", text: "Pflichtangaben für den Verkauf vorbereiten.", lesson: "legal", missions: ["rechtstexte"] },
      { id: "shop-zahlen", title: "Testkauf & Zahlen", text: "Lohnt sich jede Bestellung?", lesson: "money", missions: ["zahlen"] }
    ]
  },
  {
    id: "webapp", label: "Web-App (Abo / Freemium)", short: "Web-App",
    hypothesis: "Nutzer haben ein wiederkehrendes Problem und kommen zurück, wenn deine App es löst.",
    mvp: "Eine Kernfunktion mit Login, die ein Problem gut löst.",
    metric: "Wie viele Testnutzer nach einer Woche wiederkommen (Retention)",
    signal: "Richtwert: Wenn ein guter Teil der Testnutzer nach einer Woche noch aktiv ist, Bezahlfunktionen ergänzen.",
    revenue: "Abo, Freemium",
    stack: "Next.js · Supabase · Vercel · Stripe",
    templates: ["webapp"],
    loop: { build: "Eine Kernfunktion mit Login, die du fünf echten Menschen aus der Zielgruppe gibst.", measure: "Wie viele die App nach einer Woche noch nutzen und wofür genau.", learn: "Niemand kommt wieder: Problem ist zu klein oder die Lösung passt nicht. Wenige kommen oft wieder: genau für diese Gruppe weiterbauen." },
    mistakes: ["Viele Funktionen statt einer, die richtig gut ist", "Ohne echte Testnutzer bauen", "Erst ganz am Ende über den Preis nachdenken"],
    track: [
      { id: "app-problem", title: "Problem & Zielgruppe", text: "Welches wiederkehrende Problem löst du, und für wen?", lesson: "vibe", missions: ["zielgruppe"] },
      { id: "app-plan", title: "MVP planen", text: "Eine Kernfunktion, Website und App gemeinsam denken.", lesson: "ein-backend", missions: ["produkt-plan", "website-oder-app"] },
      { id: "app-daten", title: "Datenmodell & Login", text: "Welche Daten, welche Regeln?", lesson: "supabase", missions: ["datenmodell", "supabase-tabelle"] },
      { id: "app-bauen", title: "Erste Funktion bauen", text: "In kleinen Schritten, jede Änderung als Commit.", lesson: "branch-pr", missions: ["github-repo", "branch-pr"] },
      { id: "app-test", title: "Testnutzer & Qualität", text: "Fünf echte Menschen testen lassen, Fehler beheben.", lesson: "qualitaet", missions: ["lighthouse", "bug-report"] },
      { id: "app-erloes", title: "Erlösmodell & Kosten", text: "Abo oder Freemium, und was kostet ein Nutzer?", lesson: "money", missions: ["zahlen", "store-check"] }
    ]
  },
  {
    id: "content", label: "Newsletter & Blog", short: "Newsletter",
    hypothesis: "Menschen abonnieren deine Inhalte, weil sie ihnen regelmäßig helfen.",
    mvp: "Eine Anmeldeseite und drei Ausgaben, die du selbst verschickst.",
    metric: "Neue Abonnenten pro Woche und Öffnungsrate",
    signal: "Richtwert: Wenn Abonnenten stetig wachsen und Mails geöffnet werden, über Sponsoring, Abo oder eigene Produkte nachdenken.",
    revenue: "Sponsoring, Werbung, bezahltes Abo, eigene Produkte",
    stack: "Newsletter-Dienst · Landingpage · Analytics",
    templates: ["content"],
    loop: { build: "Anmeldeseite mit klarem Nutzenversprechen und drei Ausgaben, die du von Hand verschickst.", measure: "Neue Abonnenten pro Woche, Öffnungsrate und Antworten auf deine Mails.", learn: "Viele öffnen, wenige melden sich an: Anmeldeseite verbessern. Wenige öffnen: Betreffzeilen und Thema schärfen." },
    mistakes: ["Unregelmäßig verschicken", "Ohne Double-Opt-in und Datenschutzhinweis starten", "Zu breites Thema ohne klaren Nutzen"],
    track: [
      { id: "con-thema", title: "Thema & Leser", text: "Worüber schreibst du, und wem hilft es?", lesson: "vibe", missions: ["zielgruppe"] },
      { id: "con-name", title: "Name & Domain", text: "Ein Name, den man sich merkt.", lesson: "domain", missions: ["domain-ideen"] },
      { id: "con-seite", title: "Anmeldeseite bauen", text: "Klarer Nutzen, ein Eingabefeld.", lesson: "ux", missions: ["hero-text"] },
      { id: "con-newsletter", title: "Newsletter mit Double-Opt-in", text: "Rechtssicher anmelden und bestätigen.", lesson: "tools-plus", missions: ["newsletter-doi"] },
      { id: "con-reichweite", title: "Erste Ausgaben & Reichweite", text: "Drei Ausgaben, gefunden werden.", lesson: "seo", missions: ["seo-titel"] },
      { id: "con-geld", title: "Geld verdienen", text: "Sponsoring, Abo oder eigenes Produkt?", lesson: "money", missions: ["zahlen"] }
    ]
  },
  {
    id: "creator", label: "Content Creation & Personal Brand", short: "Content Creation",
    hypothesis: "Deine Inhalte zu einem klaren Thema ziehen Menschen an, die dir folgen und dir vertrauen.",
    mvp: "Vier Wochen lang zwei Beiträge pro Woche zu einem Thema auf einer Plattform.",
    metric: "Engagement-Rate und Follower-Wachstum pro Woche",
    signal: "Richtwert: Wenn einzelne Beiträge deutlich besser laufen als der Rest, mehr davon machen und auf eine zweite Plattform ausweiten.",
    revenue: "Sponsoring, Affiliate, eigene Produkte, Beratung",
    stack: "Smartphone · CapCut / Canva · Linkliste oder Landingpage · Newsletter",
    templates: [],
    loop: { build: "Ein Thema, drei Content-Säulen, acht Beiträge in vier Wochen, jeder Inhalt in mehreren Formaten.", measure: "Pro Beitrag: Aufrufe, Kommentare, Speichern und Teilen. Welche Säule wirkt am stärksten?", learn: "Die stärkste Säule ausbauen, die schwächste streichen. Sobald dir Menschen schreiben, frag, wobei sie Hilfe brauchen: das wird dein Produkt." },
    mistakes: ["Über alles posten statt über ein Thema", "Nach zwei Wochen ohne Wachstum aufhören", "Nur auf geliehener Reichweite bauen, ohne eigene Liste"],
    track: [
      { id: "cre-position", title: "Positionierung finden", text: "Wofür willst du bekannt sein, und für wen?", lesson: "content-creation", missions: ["zielgruppe"] },
      { id: "cre-saeulen", title: "Content-Säulen & Plan", text: "Drei Themenbereiche, vier Wochen geplant.", lesson: "content-creation", missions: ["content-saeulen"] },
      { id: "cre-start", title: "Erste Beiträge mit starkem Hook", text: "Veröffentlichen, nicht perfektionieren.", lesson: "social-media", missions: ["hook-ideen"] },
      { id: "cre-repurpose", title: "Inhalte mehrfach nutzen", text: "Ein Inhalt, drei Formate.", lesson: "content-creation", missions: ["repurpose"] },
      { id: "cre-liste", title: "Eigene Liste aufbauen", text: "Newsletter, damit dir die Reichweite gehört.", lesson: "tools-plus", missions: ["newsletter-doi"] },
      { id: "cre-geld", title: "Erste Einnahmen", text: "Mediakit, Sponsoring oder eigenes Angebot.", lesson: "creator-business", missions: ["mediakit", "werbung-check"] }
    ]
  },
  {
    id: "social", label: "Social Media", short: "Social Media",
    hypothesis: "Deine Zielgruppe ist auf einer bestimmten Plattform aktiv und reagiert auf deine Art von Beiträgen.",
    mvp: "Ein vollständiges Profil auf einer Plattform und zehn Beiträge mit unterschiedlichen Hooks.",
    metric: "Reichweite neuer Beiträge (Nicht-Follower) und Engagement-Rate",
    signal: "Richtwert: Wenn mehrere Beiträge über deine Follower hinaus ausgespielt werden, das Format wiederholen und regelmäßig posten.",
    revenue: "Sponsoring, Affiliate, Verkehr auf Shop oder Landingpage",
    stack: "Instagram, TikTok oder LinkedIn · CapCut / Canva · Planungstool",
    templates: ["social"],
    loop: { build: "Zehn Beiträge im gleichen Format, aber mit zehn verschiedenen Hooks.", measure: "Welche Hooks bringen Aufrufe von Nicht-Followern, welche werden bis zum Ende angesehen?", learn: "Den besten Hook-Typ zur Vorlage machen und jeweils nur eine Sache ändern: Länge, Thema oder Bild." },
    mistakes: ["Auf allen Plattformen gleichzeitig starten", "Follower kaufen oder Fake-Interaktionen", "Kein Impressum bei geschäftlicher Nutzung"],
    track: [
      { id: "soc-plattform", title: "Plattform wählen", text: "Wo ist deine Zielgruppe wirklich?", lesson: "social-media", missions: ["plattform-check"] },
      { id: "soc-profil", title: "Profil einrichten", text: "Bio, Link, Impressum.", lesson: "social-media", missions: ["kanal-start"] },
      { id: "soc-hooks", title: "Hooks & Formate testen", text: "Zehn Einstiege, ein Format.", lesson: "social-media", missions: ["hook-ideen"] },
      { id: "soc-plan", title: "Regelmäßig posten", text: "Redaktionsplan für vier Wochen.", lesson: "content-creation", missions: ["content-saeulen", "repurpose"] },
      { id: "soc-messen", title: "Auswerten & lernen", text: "Was lief, was nicht, was testest du als Nächstes?", lesson: "social-media", missions: ["analyse-beitraege"] },
      { id: "soc-geld", title: "Monetarisieren", text: "Kooperationen und Kennzeichnung.", lesson: "creator-business", missions: ["mediakit", "werbung-check"] }
    ]
  },
  {
    id: "youtube", label: "YouTube-Kanal", short: "YouTube",
    hypothesis: "Menschen suchen nach Antworten zu deinem Thema und schauen deine Videos lange genug an.",
    mvp: "Drei Videos zu konkreten Suchfragen plus je zwei Shorts daraus.",
    metric: "Klickrate (CTR) auf Thumbnails und durchschnittliche Wiedergabedauer",
    signal: "Richtwert: Wenn ein Video über die Suche stetig Aufrufe bekommt, mehr Videos zu ähnlichen Fragen machen.",
    revenue: "YouTube-Partnerprogramm, Sponsoring, Affiliate, eigene Produkte",
    stack: "Smartphone oder Kamera · Mikrofon · Schnittprogramm · Canva für Thumbnails",
    templates: ["youtube"],
    loop: { build: "Drei Videos zu Suchfragen mit Kaufabsicht oder echtem Problem, Titel und Thumbnail vor dem Dreh geplant.", measure: "In YouTube Studio: Klickrate, Wiedergabedauer, und an welcher Stelle Zuschauer abspringen.", learn: "Niedrige Klickrate: Titel und Thumbnail ändern. Früher Absprung: Einstieg kürzen und Ergebnis früher zeigen." },
    mistakes: ["Lange Einleitung, bevor es zur Sache geht", "Videos ohne Suchfrage im Kopf drehen", "Zu selten hochladen und nach drei Videos aufgeben"],
    track: [
      { id: "yt-nische", title: "Nische & Zielgruppe", text: "Welche Fragen beantwortest du besser als andere?", lesson: "youtube", missions: ["zielgruppe"] },
      { id: "yt-kanal", title: "Kanal einrichten", text: "Name, Banner, Beschreibung, Impressum.", lesson: "youtube", missions: ["kanal-start"] },
      { id: "yt-ideen", title: "Titel & Thumbnails planen", text: "Erst Klick-Idee, dann Dreh.", lesson: "youtube", missions: ["youtube-titel"] },
      { id: "yt-skript", title: "Erstes Video", text: "Skript, Dreh, Upload.", lesson: "youtube", missions: ["video-skript"] },
      { id: "yt-shorts", title: "Shorts & Wiederverwerten", text: "Aus jedem Video zwei Shorts.", lesson: "content-creation", missions: ["repurpose", "analyse-beitraege"] },
      { id: "yt-geld", title: "Geld verdienen", text: "Partnerprogramm, Sponsoring, Kennzeichnung.", lesson: "creator-business", missions: ["mediakit", "werbung-check"] }
    ]
  }
];

export const MODEL_BY_ID: Record<string, Model> = Object.fromEntries(MODELS.map((m) => [m.id, m]));
export const modelForTemplate = (type?: string) => MODELS.find((m) => type && m.templates.includes(type)) || MODELS[0];
export const ALL_STEPS: TrackStep[] = MODELS.flatMap((m) => m.track);

/** Missionen, die zu einem Modell gehören (aus seiner Strecke), in Reihenfolge */
export const missionsOfModel = (m: Model) => [...new Set(m.track.flatMap((s) => s.missions))];
