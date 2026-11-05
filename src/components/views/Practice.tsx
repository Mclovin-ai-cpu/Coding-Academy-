"use client";

import { useState } from "react";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID, MISSIONS, TRACK } from "@/data/missions";
import type { MissionLevel } from "@/data/types";
import { useApp } from "@/lib/app";
import { trackDone, trackKey } from "@/lib/state";
import { Icon } from "../Icon";
import { Bar, Label } from "../ui";

const LEVEL_STYLE: Record<MissionLevel, string> = {
  play: "bg-warn-soft text-warn",
  ai: "bg-accent-soft text-accent-text",
  build: "bg-ok-soft text-ok"
};

export function MissionBadge({ level }: { level: MissionLevel }) {
  return <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl font-mono text-xs font-bold ${LEVEL_STYLE[level]}`}>{LEVELS[level].code}</span>;
}

export function Practice() {
  const { s, go, update, toast, checkBadges, confetti } = useApp();
  const [filter, setFilter] = useState<MissionLevel | "all">("all");
  const active = s.projects.find((p) => p.id === s.activeProject);
  const key = trackKey(s);
  const tk = s.track[key] || {};
  const nDone = trackDone(s);
  const list = MISSIONS.filter((m) => filter === "all" || m.level === filter);
  const open = list.filter((m) => !s.missions[m.id]?.done);
  const done = list.filter((m) => s.missions[m.id]?.done);

  const toggleStep = (id: string) => {
    const was = !!tk[id];
    update((d) => { d.track[key] = { ...(d.track[key] || {}), [id]: !was }; });
    if (!was && nDone + 1 === TRACK.length) { confetti(); toast("Strecke geschafft!"); }
    setTimeout(checkBadges, 0);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[26px] font-bold leading-tight">Praxis</h1>
        <span className="text-sm text-muted">Freiwillige Missionen mit Bonus-XP. Lektionen sind auch ohne sie vollständig. Ergebnisse landen in deinen Projekten.</span>
      </div>

      {s.projects.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <Label>Üben für</Label>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
            {[{ id: "", name: "Ohne Projekt" }, ...s.projects].map((p) => (
              <button key={p.id || "_"} onClick={() => update((d) => { d.activeProject = p.id; })} aria-pressed={s.activeProject === p.id}
                className={`flex-none rounded-full border px-3 py-[7px] text-[13px] ${s.activeProject === p.id ? "border-ink bg-ink font-semibold text-bg" : "border-line bg-surface"}`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="card flex flex-col gap-2.5 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 flex-col">
            <Label>Strecke{active ? ` · ${active.name}` : ""}</Label>
            <b className="text-[17px]">Idee umsetzen</b>
          </div>
          <span className="font-mono text-[13px] font-bold">{nDone}/{TRACK.length}</span>
        </div>
        <Bar pct={(nDone / TRACK.length) * 100} tone="ok" />
        <ol className="flex flex-col gap-1">
          {TRACK.map((st, i) => {
            const isDone = !!tk[st.id];
            const isNow = !isDone && TRACK.findIndex((x) => !tk[x.id]) === i;
            const nextM = st.missions.map((m) => MISSION_BY_ID[m]).find((m) => !s.missions[m.id]?.done) || MISSION_BY_ID[st.missions[0]];
            return (
              <li key={st.id} className="flex items-center gap-2.5">
                <button onClick={() => toggleStep(st.id)} aria-pressed={isDone} aria-label={`${st.title} als erledigt markieren`}
                  className={`grid h-7 w-7 flex-none place-items-center rounded-lg font-mono text-[11px] font-bold ${isDone ? "bg-ok text-ok-ink" : isNow ? "bg-accent-soft text-accent-text" : "bg-surface2 text-accent-text"}`}>
                  {isDone ? <Icon name="check" size={15} /> : isNow ? "→" : ""}
                </button>
                <button className="tap flex-1 py-1.5 text-left text-sm" onClick={() => go("praxis/" + nextM.id)}>
                  <span className={`${isNow ? "font-bold" : ""} ${!isDone && !isNow ? "text-muted" : ""}`}>{st.title}</span>
                  {isNow && <span className="block text-xs text-muted">{st.text} Mission: {nextM.title}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pt-1" role="group" aria-label="Stufe filtern">
        {(["all", "play", "ai", "build"] as const).map((k) => (
          <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k}
            className={`flex-none rounded-full border px-3 py-[7px] text-[13px] ${filter === k ? "border-ink bg-ink font-semibold text-bg" : "border-line bg-surface"}`}>
            {k === "all" ? "Alle" : LEVELS[k].label}
          </button>
        ))}
      </div>
      {filter !== "all" && <span className="text-[13px] text-muted">{LEVELS[filter].hint}</span>}

      <div className="flex flex-col gap-2">
        {open.map((m) => <MissionRow key={m.id} id={m.id} />)}
      </div>
      {done.length > 0 && (
        <>
          <Label className="mt-2">Erledigt · {done.length}</Label>
          <div className="flex flex-col gap-2">{done.map((m) => <MissionRow key={m.id} id={m.id} />)}</div>
        </>
      )}
    </div>
  );
}

export function MissionRow({ id }: { id: string }) {
  const { s, go } = useApp();
  const m = MISSION_BY_ID[id];
  const done = s.missions[id]?.done;
  return (
    <button onClick={() => go("praxis/" + id)} className={`card tap flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left ${done ? "opacity-70" : ""}`}>
      <MissionBadge level={m.level} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <b className="text-[15px]">{m.title}</b>
        <span className="truncate font-mono text-xs text-muted">{LEVELS[m.level].label} · {m.min} Min. · {LESSONS[m.lesson].title}</span>
      </span>
      {done ? <span className="text-ok"><Icon name="check" /></span> : <span className="font-mono text-xs font-bold text-ok">+{m.xp}</span>}
    </button>
  );
}
