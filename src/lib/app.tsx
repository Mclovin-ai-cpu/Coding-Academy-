"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BADGES, level, load, persist, today, type State } from "./state";

type Badge = (typeof BADGES)[number];

type Ctx = {
  s: State;
  /** Zustand ändern: fn bekommt eine Kopie, die direkt verändert werden darf */
  update: (fn: (d: State) => void) => void;
  addXP: (n: number, why?: string) => void;
  checkBadges: () => Badge[];
  toggleFlag: (term: string) => void;
  route: string;
  go: (r: string) => void;
  toast: (msg: string) => void;
  term: string | null;
  openTerm: (id: string | null) => void;
  confetti: () => void;
  migrated: boolean;
  /** Zu einer Seite wechseln und sich merken, wohin es danach zurückgeht (inkl. Scroll-Position) */
  goVia: (target: string, from: { label: string; kind: BackKind }) => void;
  /** Rückweg für die aktuelle Seite, falls man über goVia hierher kam */
  backFor: (target: string) => BackEntry | null;
  goBack: () => void;
  clearBack: () => void;
};

export type BackKind = "Projekt" | "Mission" | "Praxis" | "Lernpfad" | "Karten";
export type BackEntry = { route: string; target: string; label: string; kind: BackKind; scroll: number };
const RT_KEY = "codingAcademy.backStack";

const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => useContext(AppCtx)!;

const readHash = () => (typeof window === "undefined" ? "home" : decodeURIComponent(window.location.hash.replace(/^#\/?/, "")) || "home");

export function buzz(ms: number | number[] = 8) {
  try { navigator.vibrate?.(ms); } catch {}
}

export function AppProvider({ children }: { children: (ready: boolean) => ReactNode }) {
  const [s, setS] = useState<State | null>(null);
  const [migrated, setMigrated] = useState(false);
  const [route, setRoute] = useState("home");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [term, setTerm] = useState<string | null>(null);
  const [stack, setStackState] = useState<BackEntry[]>([]);
  const stackRef = useRef<BackEntry[]>([]);
  const pendingScroll = useRef<number | null>(null);
  const setStack = useCallback((st: BackEntry[]) => {
    stackRef.current = st.slice(-10);
    setStackState(stackRef.current);
    try { sessionStorage.setItem(RT_KEY, JSON.stringify(stackRef.current)); } catch {}
  }, []);
  const toastT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<State | null>(null);

  useEffect(() => {
    const { state, migrated } = load();
    const d = today();
    if (!state.days.includes(d)) state.days = [...state.days, d].slice(-120);
    persist(state);
    ref.current = state;
    setS(state);
    setMigrated(migrated);
    setRoute(readHash());
    try { const r = sessionStorage.getItem(RT_KEY); if (r) { stackRef.current = JSON.parse(r); setStackState(stackRef.current); } } catch {}
    const onHash = () => {
      setRoute(readHash());
      const y = pendingScroll.current;
      pendingScroll.current = null;
      if (y == null) window.scrollTo({ top: 0 });
      // Mehrfach versuchen, bis die Seite fertig aufgebaut und hoch genug ist
      else [30, 150, 400].forEach((ms) => setTimeout(() => { if (Math.abs(window.scrollY - y) > 4) window.scrollTo({ top: y }); }, ms));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Theme anwenden
  useEffect(() => {
    if (!s) return;
    const r = document.documentElement;
    if (s.theme === "system") r.removeAttribute("data-theme");
    else r.setAttribute("data-theme", s.theme);
    const dark = s.theme === "dark" || (s.theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0b1020" : "#f4f5f9");
  }, [s?.theme, s]);

  const update = useCallback((fn: (d: State) => void) => {
    const next = structuredClone(ref.current!);
    fn(next);
    ref.current = next;
    persist(next);
    setS(next);
  }, []);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastT.current) clearTimeout(toastT.current);
    toastT.current = setTimeout(() => setToastMsg(null), 1900);
  }, []);

  const addXP = useCallback((n: number, why?: string) => {
    const before = level(ref.current!);
    update((d) => { d.xp += n; const t = today(); if (!d.days.includes(t)) d.days.push(t); });
    if (why) toast(`+${n} XP · ${why}`);
    if (level(ref.current!) > before) setTimeout(() => toast(`Level ${level(ref.current!)} erreicht!`), 1400);
  }, [update, toast]);

  const checkBadges = useCallback(() => {
    const cur = ref.current!;
    const fresh = BADGES.filter((b) => !cur.badges.includes(b.id) && b.test(cur));
    if (fresh.length) update((d) => { d.badges.push(...fresh.map((b) => b.id)); });
    return fresh;
  }, [update]);

  const toggleFlag = useCallback((t: string) => {
    const on = ref.current!.flags.includes(t);
    update((d) => { d.flags = on ? d.flags.filter((x) => x !== t) : [...d.flags, t]; });
    buzz(12);
    toast(on ? "Markierung entfernt" : "Markiert – unter Karten › Markiert");
    if (!on) setTimeout(() => checkBadges(), 0);
  }, [update, toast, checkBadges]);

  const go = useCallback((r: string) => {
    const h = "#/" + r;
    if (window.location.hash === h) { setRoute(r); window.scrollTo({ top: 0 }); }
    else window.location.hash = h;
  }, []);

  const goVia = useCallback((target: string, from: { label: string; kind: BackKind }) => {
    setStack([...stackRef.current, { route: readHash(), target, label: from.label, kind: from.kind, scroll: window.scrollY }]);
    go(target);
  }, [go, setStack]);
  const backFor = useCallback((target: string) => {
    const top = stack[stack.length - 1];
    return top && top.target === target ? top : null;
  }, [stack]);
  const goBack = useCallback(() => {
    const top = stackRef.current[stackRef.current.length - 1];
    if (!top) return;
    setStack(stackRef.current.slice(0, -1));
    pendingScroll.current = top.scroll;
    go(top.route);
  }, [go, setStack]);
  const clearBack = useCallback(() => setStack([]), [setStack]);

  const confetti = useCallback(() => {
    const cols = ["#4f46e5", "#15803d", "#f59e0b", "#be185d", "#0e7490"];
    for (let i = 0; i < 60; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = cols[i % cols.length];
      c.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }, []);

  if (!s) return <>{children(false)}</>;
  return (
    <AppCtx.Provider value={{ s, update, addXP, checkBadges, toggleFlag, route, go, toast, term, openTerm: setTerm, confetti, migrated, goVia, backFor, goBack, clearBack }}>
      {children(true)}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 top-[calc(env(safe-area-inset-top)+68px)] z-[90] -translate-x-1/2 w-max max-w-[calc(100vw-32px)] text-center rounded-[18px] bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-all duration-300 pointer-events-none ${toastMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        {toastMsg}
      </div>
    </AppCtx.Provider>
  );
}
