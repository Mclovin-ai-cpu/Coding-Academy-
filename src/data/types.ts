export type Quiz = { q: string; a: string[]; c: number; why: string };

export type Lesson = {
  title: string;
  min: number;
  intro: string[]; // darf <b> enthalten
  terms: string[];
  code: { lang: string; text: string };
  tip: string;
  task: string;
  quiz: Quiz[];
};

/** t = Titel, s = kurz, a = Vorstellung, e = Beispiel, w = warum wichtig, r = verwandte Begriffe */
export type Card = { t: string; s: string; a: string; e: string; w: string; r?: string[] };

export type Course = { id: string; title: string; short: string; ico: string; color: string; lessons: string[] };

export type Template = { label: string; emoji: string; todos: [string, string][] };

export type MissionLevel = "play" | "ai" | "build";

export type Mission = {
  id: string;
  level: MissionLevel;
  title: string;
  min: number;
  xp: number;
  lesson: string;
  intro: string;
  steps: string[];
  /** Prompt-Vorlage; {idee} und {projekt} werden durch das gewählte Projekt ersetzt */
  prompt?: string;
  /** Spielerische Missionen: kurzes Quiz */
  quiz?: Quiz[];
  result?: string; // Beschriftung für das Ergebnisfeld
};

export type TrackStep = { id: string; title: string; text: string; lesson: string; missions: string[] };
