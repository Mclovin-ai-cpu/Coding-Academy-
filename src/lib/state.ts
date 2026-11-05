import { COURSES } from "@/data/courses";
import { LESSONS } from "@/data/lessons";
import { missionForLesson, TRACK } from "@/data/missions";

export type Todo = { id: string; text: string; lesson: string; mission?: string; done: boolean; stuck: boolean };
export type Note = { id: string; lesson?: string; mission?: string; text: string; date: string };
export type Project = { id: string; name: string; idea: string; type: string; created: string; todos: Todo[]; notes: Note[] };
export type MissionState = { done: boolean; date: string; projectId?: string; result?: string };

export type State = {
  v: 3;
  name: string;
  theme: "system" | "light" | "dark";
  xp: number;
  done: Record<string, boolean>;
  practice: Record<string, string>;
  cards: Record<string, { box: number; due: string }>;
  reviewed: number;
  projects: Project[];
  days: string[];
  badges: string[];
  todosDone: number;
  flags: string[];
  missions: Record<string, MissionState>;
  /** Fortschritt der Strecke „Idee umsetzen“ je Projekt ("_" = ohne Projekt) */
  track: Record<string, Record<string, boolean>>;
  activeProject: string;
};

export const KEY_V3 = "codingAcademy.v3";
export const KEY_V2 = "codingAcademy.v2";

export const fresh = (): State => ({
  v: 3, name: "", theme: "system", xp: 0, done: {}, practice: {}, cards: {}, reviewed: 0, projects: [], days: [],
  badges: [], todosDone: 0, flags: [], missions: {}, track: {}, activeProject: ""
});

/** Bringt beliebige gespeicherte Daten (v2 oder v3, auch Importe) in die v3-Form. */
export function normalize(raw: unknown): State {
  const s = Object.assign(fresh(), (raw && typeof raw === "object" ? raw : {}) as Partial<State>);
  s.v = 3;
  s.flags = Array.isArray(s.flags) ? s.flags : [];
  s.missions = s.missions || {};
  s.track = s.track || {};
  s.projects = (s.projects || []).map((p) => ({
    ...p,
    idea: p.idea || "",
    notes: p.notes || [],
    todos: (p.todos || []).map((t) => ({ ...t, mission: t.mission ?? missionForLesson(t.lesson)?.id, stuck: !!t.stuck }))
  }));
  if (s.activeProject && !s.projects.some((p) => p.id === s.activeProject)) s.activeProject = "";
  return s;
}

export function load(): { state: State; migrated: boolean } {
  try {
    const v3 = localStorage.getItem(KEY_V3);
    if (v3) return { state: normalize(JSON.parse(v3)), migrated: false };
    const v2 = localStorage.getItem(KEY_V2);
    if (v2) return { state: normalize(JSON.parse(v2)), migrated: true };
  } catch {}
  return { state: fresh(), migrated: false };
}

export function persist(s: State) {
  try { localStorage.setItem(KEY_V3, JSON.stringify(s)); } catch {}
}

/* ---------- abgeleitete Werte ---------- */
export const ALL = COURSES.flatMap((c) => c.lessons);
export const courseOf = (id: string) => COURSES.find((c) => c.lessons.includes(id))!;
export const lessonOfTerm = (term: string) => ALL.find((l) => LESSONS[l].terms.includes(term));
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
export const dayStr = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const uid = () => Math.random().toString(36).slice(2, 9);

export const doneCount = (s: State) => ALL.filter((id) => s.done[id]).length;
export const level = (s: State) => Math.floor(s.xp / 200) + 1;
export const levelPct = (s: State) => Math.round((s.xp % 200) / 2);
export const nextLesson = (s: State) => ALL.find((id) => !s.done[id]);

export function streak(s: State) {
  const set = new Set(s.days);
  const d = new Date();
  if (!set.has(dayStr(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(dayStr(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function unlockedCards(s: State) {
  const set = new Set<string>();
  ALL.forEach((id) => { if (s.done[id]) LESSONS[id].terms.forEach((t) => set.add(t)); });
  if (!set.size) LESSONS[ALL[0]].terms.forEach((t) => set.add(t));
  return [...set];
}
export function dueCards(s: State) {
  const t = today();
  return unlockedCards(s).filter((id) => !s.cards[id] || s.cards[id].due <= t);
}

export const projProgress = (p: Project) => (p.todos.length ? Math.round((p.todos.filter((t) => t.done).length / p.todos.length) * 100) : 0);

export const trackKey = (s: State) => s.activeProject || "_";
export function trackDone(s: State, key = trackKey(s)) {
  const t = s.track[key] || {};
  return TRACK.filter((st) => t[st.id]).length;
}

export const BADGES: { id: string; t: string; code: string; test: (s: State) => boolean }[] = [
  { id: "first", code: "01", t: "Erste Lektion", test: (s) => doneCount(s) >= 1 },
  { id: "five", code: "05", t: "5 Lektionen", test: (s) => doneCount(s) >= 5 },
  { id: "course", code: "✓", t: "Kurs abgeschlossen", test: (s) => COURSES.some((c) => c.lessons.every((id) => s.done[id])) },
  { id: "project", code: "[ ]", t: "Erstes Projekt", test: (s) => s.projects.length >= 1 },
  { id: "cards", code: "20", t: "20 Karten geübt", test: (s) => s.reviewed >= 20 },
  { id: "flags", code: "⚑", t: "5 Begriffe markiert", test: (s) => s.flags.length >= 5 },
  { id: "mission", code: "</>", t: "Erste Mission", test: (s) => Object.values(s.missions).some((m) => m.done) },
  { id: "builder", code: "+80", t: "„Echt bauen“ geschafft", test: (s) => Object.entries(s.missions).some(([id, m]) => m.done && id && ["github-repo", "vercel-deploy", "domain-verbinden", "branch-pr", "anfrageformular", "supabase-tabelle", "stripe-test", "lighthouse"].includes(id)) },
  { id: "track", code: "6/6", t: "Idee umgesetzt", test: (s) => Object.keys(s.track).some((k) => trackDone(s, k) === TRACK.length) },
  { id: "streak", code: "3d", t: "3 Tage Serie", test: (s) => streak(s) >= 3 },
  { id: "todo", code: "10", t: "10 To-dos erledigt", test: (s) => s.todosDone >= 10 },
  { id: "all", code: "100", t: "Alle Lektionen", test: (s) => doneCount(s) === ALL.length }
];
