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
  track: TrackStep[];
};

export const LEAN = {
  title: "Lean Startup: Bauen → Messen → Lernen",
  text: "Baue nicht gleich das fertige Produkt. Finde die eine Annahme, an der deine Idee hängt, teste sie mit dem kleinsten möglichen Angebot (MVP) und miss eine klare Kennzahl. Danach entscheidest du: weitermachen, anpassen (Pivot) oder stoppen. So investierst du Zeit und Geld erst, wenn echte Nachfrage da ist.",
  loop: [
    { k: "Bauen", v: "Kleinstes Angebot, das die Annahme testet" },
    { k: "Messen", v: "Eine Kennzahl, z. B. Anfragen oder Klicks" },
    { k: "Lernen", v: "Weitermachen, anpassen oder stoppen" }
  ]
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
    id: "content", label: "Content & Newsletter", short: "Content",
    hypothesis: "Menschen abonnieren deine Inhalte, weil sie ihnen regelmäßig helfen.",
    mvp: "Eine Anmeldeseite und drei Ausgaben, die du selbst verschickst.",
    metric: "Neue Abonnenten pro Woche und Öffnungsrate",
    signal: "Richtwert: Wenn Abonnenten stetig wachsen und Mails geöffnet werden, über Sponsoring, Abo oder eigene Produkte nachdenken.",
    revenue: "Sponsoring, Werbung, bezahltes Abo, eigene Produkte",
    stack: "Newsletter-Dienst · Landingpage · Analytics",
    templates: ["content"],
    track: [
      { id: "con-thema", title: "Thema & Leser", text: "Worüber schreibst du, und wem hilft es?", lesson: "vibe", missions: ["zielgruppe"] },
      { id: "con-name", title: "Name & Domain", text: "Ein Name, den man sich merkt.", lesson: "domain", missions: ["domain-ideen"] },
      { id: "con-seite", title: "Anmeldeseite bauen", text: "Klarer Nutzen, ein Eingabefeld.", lesson: "ux", missions: ["hero-text"] },
      { id: "con-newsletter", title: "Newsletter mit Double-Opt-in", text: "Rechtssicher anmelden und bestätigen.", lesson: "tools-plus", missions: ["newsletter-doi"] },
      { id: "con-reichweite", title: "Erste Ausgaben & Reichweite", text: "Drei Ausgaben, gefunden werden.", lesson: "seo", missions: ["seo-titel"] },
      { id: "con-geld", title: "Geld verdienen", text: "Sponsoring, Abo oder eigenes Produkt?", lesson: "money", missions: ["zahlen"] }
    ]
  }
];

export const MODEL_BY_ID: Record<string, Model> = Object.fromEntries(MODELS.map((m) => [m.id, m]));
export const modelForTemplate = (type?: string) => MODELS.find((m) => type && m.templates.includes(type)) || MODELS[0];
export const ALL_STEPS: TrackStep[] = MODELS.flatMap((m) => m.track);

/** Missionen, die zu einem Modell gehören (aus seiner Strecke), in Reihenfolge */
export const missionsOfModel = (m: Model) => [...new Set(m.track.flatMap((s) => s.missions))];
