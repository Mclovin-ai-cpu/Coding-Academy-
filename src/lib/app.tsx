"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { BADGES, level, load, persist, today, type State } from "./state";

type Badge = (typeof BADGES)[number];

type Ctx = {
  s: State;
  /** Zustand ändern: fn bekommt eine Kopie, die direkt verändert werden darf */
  update: (fn: (d: State) => void) => void;
  /** Kompletten Zustand ersetzen, ohne ihn als neue Änderung zu zählen (z. B. vom Konto geladen) */
  replace: (next: State) => void;
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
};

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
    const onHash = () => { setRoute(readHash()); window.scrollTo({ top: 0 }); };
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
    next.savedAt = Date.now();
    ref.current = next;
    persist(next);
    setS(next);
  }, []);

  const replace = useCallback((next: State) => {
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
    <AppCtx.Provider value={{ s, update, replace, addXP, checkBadges, toggleFlag, route, go, toast, term, openTerm: setTerm, confetti, migrated }}>
      {children(true)}
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 top-[calc(env(safe-area-inset-top)+68px)] z-[90] -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-all duration-300 pointer-events-none ${toastMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        {toastMsg}
      </div>
    </AppCtx.Provider>
  );
}
