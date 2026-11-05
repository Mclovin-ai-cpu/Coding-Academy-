"use client";

import { CARDS } from "@/data/cards";
import { COURSES } from "@/data/courses";
import { MISSIONS } from "@/data/missions";
import { useApp } from "@/lib/app";
import { ALL, doneCount } from "@/lib/state";
import { Label } from "./ui";

/** Ringdiagramm für einen Anteil (eine Farbe, grauer Rest) */
function Donut({ value, total, size = 76, stroke = 9, label }: { value: number; total: number; size?: number; stroke?: number; label: string }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = total ? (value / total) * c : 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${pct} Prozent (${value} von ${total})`}>
      <title>{`${label}: ${value} von ${total} (${pct} %)`}</title>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface2)" strokeWidth={stroke} />
      {value > 0 && (
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ok)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${Math.max(dash - (value < total ? 2 : 0), 0.01)} ${c}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      )}
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="var(--ink)" fontFamily="var(--font-mono)" fontWeight="700" fontSize={size * 0.22}>{pct}%</text>
    </svg>
  );
}

export function Dashboard() {
  const { s, go } = useApp();
  const todosAll = s.projects.flatMap((p) => p.todos);
  const todosDone = todosAll.filter((t) => t.done).length;
  const missionsDone = MISSIONS.filter((m) => s.missions[m.id]?.done).length;
  const cardIds = Object.keys(CARDS);
  const cardsSafe = cardIds.filter((id) => (s.cards[id]?.box || 0) >= 2).length;

  const areas: [string, number, number, string][] = [
    ["Lektionen", doneCount(s), ALL.length, "lernen"],
    ["Missionen", missionsDone, MISSIONS.length, "praxis"],
    ["To-dos", todosDone, todosAll.length, "projekte"],
    ["Karten sicher", cardsSafe, cardIds.length, "karten"]
  ];

  return (
    <section className="card flex flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Donut value={doneCount(s)} total={ALL.length} size={108} stroke={12} label="Gesamtfortschritt Lektionen" />
        <div className="min-w-0 flex-1">
          <Label>Dashboard</Label>
          <b className="block text-[17px] leading-snug">Dein Fortschritt</b>
          <span className="text-[13px] text-muted">{doneCount(s)} von {ALL.length} Lektionen abgeschlossen. Tippe auf einen Bereich, um dorthin zu springen.</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {areas.map(([l, v, t, r]) => (
          <button key={l} onClick={() => go(r)} className="tap flex items-center gap-2.5 rounded-2xl bg-surface2 p-2.5 text-left">
            <Donut value={v} total={t} size={56} stroke={7} label={l} />
            <span className="min-w-0"><b className="block text-sm">{l}</b><span className="font-mono text-[13px] text-muted">{v}/{t}</span></span>
          </button>
        ))}
      </div>

      <div>
        <Label>Lektionen nach Bereich</Label>
        <div className="mt-2 grid grid-cols-3 gap-x-2 gap-y-3">
          {COURSES.map((c) => {
            const d = c.lessons.filter((id) => s.done[id]).length;
            return (
              <button key={c.id} onClick={() => go("lernen")} className="tap flex flex-col items-center gap-1 text-center">
                <Donut value={d} total={c.lessons.length} size={64} stroke={8} label={c.title} />
                <span className="text-xs font-semibold leading-tight">{c.short}</span>
                <span className="font-mono text-[11px] text-muted">{d}/{c.lessons.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
