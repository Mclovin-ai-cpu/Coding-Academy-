"use client";

import { useState } from "react";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID, MISSIONS, missionsForProject, TRACK } from "@/data/missions";
import { TEMPLATES } from "@/data/templates";
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
  const pm = active ? missionsForProject(active) : null;
  const nextUp = pm ? [...pm.fromTodos.map((x) => ({ m: x.mission, todo: x.todo })), ...pm.forType.map((m) => ({ m, todo: "" }))].find((x) => !s.missions[x.m.id]?.done) : null;
  const list = MISSIONS.filter((m) => (filter === "all" || m.level === filter) && !(pm && pm.ids.has(m.id)));
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

      {active && pm ? (
        <>
          {nextUp ? (
            <button onClick={() => go("praxis/" + nextUp.m.id)} className="tap flex flex-col gap-2 rounded-[20px] bg-code p-4 text-left text-code-text">
              <span className="font-mono text-xs text-[#5eead4]">// als Nächstes für „{active.name}“</span>
              <b className="text-lg leading-snug">{nextUp.m.title}</b>
              {nextUp.todo && <span className="text-sm text-code-muted">Zu deinem To-do: {nextUp.todo}</span>}
              <span className="font-mono text-xs text-code-muted">{LEVELS[nextUp.m.level].label} · {nextUp.m.min} Min. · +{nextUp.m.xp} XP</span>
              <span className="mt-1 rounded-xl bg-white p-3 text-center text-[15px] font-bold text-[#0f172a]">Mission starten</span>
            </button>
          ) : (
            <div className="card p-4 text-sm"><b>Alle Missionen für „{active.name}“ erledigt.</b> Stark! Unten findest du weitere.</div>
          )}
          {pm.fromTodos.length > 0 && (
            <>
              <Label className="mt-1">Passend zu deinen offenen To-dos · {pm.fromTodos.length}</Label>
              <div className="flex flex-col gap-2">{pm.fromTodos.map((x) => <MissionRow key={x.mission.id} id={x.mission.id} sub={"To-do: " + x.todo} />)}</div>
            </>
          )}
          {pm.forType.length > 0 && (
            <>
              <Label className="mt-1">Speziell für {TEMPLATES[active.type]?.label || "dein Projekt"} · {pm.forType.length}</Label>
              <div className="flex flex-col gap-2">{pm.forType.map((m) => <MissionRow key={m.id} id={m.id} />)}</div>
            </>
          )}
        </>
      ) : (
        <button className="card tap flex items-center gap-3 p-4 text-left" onClick={() => go("projekte")}>
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-text"><Icon name="folder" /></span>
          <span className="flex-1">
            <b>{s.projects.length ? "Projekt oben auswählen" : "Projekt anlegen"}</b>
            <span className="block text-[13px] text-muted">{s.projects.length ? "Dann stellt Praxis dir Missionen passend zu deinen To-dos zusammen." : "Dann stellt Praxis dir Missionen passend zu deiner Idee und deinen To-dos zusammen."}</span>
          </span>
          {!s.projects.length && <Icon name="arrow" />}
        </button>
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

      <Label className="mt-2">{active ? "Weitere Missionen" : "Alle Missionen"}</Label>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Stufe filtern">
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

export function MissionRow({ id, sub }: { id: string; sub?: string }) {
  const { s, go } = useApp();
  const m = MISSION_BY_ID[id];
  const done = s.missions[id]?.done;
  return (
    <button onClick={() => go("praxis/" + id)} className={`card tap flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left ${done ? "opacity-70" : ""}`}>
      <MissionBadge level={m.level} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <b className="text-[15px]">{m.title}</b>
        <span className="truncate font-mono text-xs text-muted">{LEVELS[m.level].label} · {m.min} Min. · {LESSONS[m.lesson].title}</span>
        {sub && <span className="truncate text-xs text-accent-text">{sub}</span>}
      </span>
      {done ? <span className="text-ok"><Icon name="check" /></span> : <span className="font-mono text-xs font-bold text-ok">+{m.xp}</span>}
    </button>
  );
}
