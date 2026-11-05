"use client";

import { useState } from "react";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID, MISSIONS, missionsForProject } from "@/data/missions";
import { LEAN, MODEL_BY_ID, MODELS, missionsOfModel, modelForTemplate, type Model } from "@/data/strategy";
import { TEMPLATES } from "@/data/templates";
import type { MissionLevel } from "@/data/types";
import { useApp } from "@/lib/app";
import { activeModel, projectModels, typesLabel } from "@/lib/state";
import { Icon } from "../Icon";
import { Bar, Collapse, Label } from "../ui";

const LEVEL_STYLE: Record<MissionLevel, string> = {
  play: "bg-warn-soft text-warn",
  ai: "bg-accent-soft text-accent-text",
  build: "bg-ok-soft text-ok"
};

export function MissionBadge({ level }: { level: MissionLevel }) {
  return <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl font-mono text-xs font-bold ${LEVEL_STYLE[level]}`}>{LEVELS[level].code}</span>;
}

export function Practice() {
  const { s, go, goVia, update, toast, checkBadges, confetti } = useApp();
  const [filter, setFilter] = useState<MissionLevel | "all">("all");
  const active = s.projects.find((p) => p.id === s.activeProject);
  // Überkategorie: Geschäftsmodell. Standard ist das Modell des aktiven Projekts.
  const [modelId, setModelId] = useState(activeModel(s).id);
  const model = MODEL_BY_ID[modelId] || MODELS[0];
  const projectModel = active ? modelForTemplate(active.type) : null;
  const pModels = active ? projectModels(active) : [];
  const ownModel = !active || pModels.some((m) => m.id === model.id);
  const key = active && ownModel ? active.id : active ? "_vorschau-" + model.id : "_";
  const tk = s.track[key] || {};
  const nDone = model.track.filter((st) => tk[st.id]).length;
  const pm = active && ownModel ? missionsForProject(active) : null;
  const nextUp = pm ? [...pm.fromTodos.map((x) => ({ m: x.mission, todo: x.todo })), ...pm.forType.map((m) => ({ m, todo: "" }))].find((x) => !s.missions[x.m.id]?.done) : null;
  const shown = new Set(pm ? pm.ids : []);
  const modelMissions = [...missionsOfModel(model), ...MISSIONS.filter((m) => m.types?.some((t) => model.templates.includes(t))).map((m) => m.id)]
    .filter((id, i, a) => a.indexOf(id) === i && !shown.has(id) && MISSION_BY_ID[id]);
  modelMissions.forEach((id) => shown.add(id));
  const list = MISSIONS.filter((m) => (filter === "all" || m.level === filter) && !shown.has(m.id));
  const open = list.filter((m) => !s.missions[m.id]?.done);
  const done = list.filter((m) => s.missions[m.id]?.done);

  const toggleStep = (id: string) => {
    const was = !!tk[id];
    update((d) => { d.track[key] = { ...(d.track[key] || {}), [id]: !was }; });
    if (!was && nDone + 1 === model.track.length) { confetti(); toast("Strecke geschafft!"); }
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

      <div className="flex flex-col gap-1.5">
        <Label>Geschäftsmodell</Label>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Geschäftsmodell wählen">
          {MODELS.map((m) => (
            <button key={m.id} aria-pressed={model.id === m.id} onClick={() => { setModelId(m.id); if (!active) update((d) => { d.model = m.id; }); }}
              className={`flex-none rounded-full border px-3 py-[7px] text-[13px] ${model.id === m.id ? "border-accent bg-accent font-semibold text-accent-ink" : "border-line bg-surface"}`}>
              {m.short}{pModels.some((x) => x.id === m.id) ? " · dein Projekt" : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-0.5 rounded-2xl bg-surface2 px-3.5 py-2.5 text-[13px] text-muted">
        <span><b className="text-ink">Strategie</b> = warum und wie du vorgehst · <b className="text-ink">Strecke</b> = die 6 Etappen deines Modells · <b className="text-ink">Missionen</b> = konkrete Übungen dafür</span>
      </div>

      <Collapse id="praxis-strategie" title={`Strategie: ${model.label}`} sub={model.hypothesis}>
        <StrategyBody model={model} />
      </Collapse>

      {active && !ownModel && (
        <div className="rounded-2xl bg-surface2 p-3.5 text-[13px]">
          Du siehst gerade Ideen für <b>{model.label}</b>. Dein Projekt „{active.name}“ gehört zu <b>{pModels.map((m) => m.label).join(" + ")}</b>.{" "}
          <button className="font-semibold text-accent-text" onClick={() => setModelId(projectModel!.id)}>Zurück zu deinem Modell</button>
        </div>
      )}

      {active && pm && nextUp && (
        <button onClick={() => goVia("praxis/" + nextUp.m.id, { label: "Praxis", kind: "Praxis" })} className="tap flex flex-col gap-2 rounded-[20px] bg-code p-4 text-left text-code-text">
          <span className="font-mono text-xs text-[#5eead4]">// als Nächstes für „{active.name}“</span>
          <b className="text-lg leading-snug">{nextUp.m.title}</b>
          {nextUp.todo && <span className="text-sm text-code-muted">Zu deinem To-do: {nextUp.todo}</span>}
          <span className="font-mono text-xs text-code-muted">{LEVELS[nextUp.m.level].label} · {nextUp.m.min} Min. · +{nextUp.m.xp} XP</span>
          <span className="mt-1 rounded-xl bg-white p-3 text-center text-[15px] font-bold text-[#0f172a]">Mission starten</span>
        </button>
      )}
      {!active && (
        <button className="card tap flex items-center gap-3 p-4 text-left" onClick={() => go("projekte")}>
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-text"><Icon name="folder" /></span>
          <span className="flex-1">
            <b>{s.projects.length ? "Projekt oben auswählen" : "Projekt anlegen"}</b>
            <span className="block text-[13px] text-muted">Dann stellt Praxis dir Missionen passend zu deinen To-dos zusammen.</span>
          </span>
          {!s.projects.length && <Icon name="arrow" />}
        </button>
      )}

      <Collapse id="praxis-strecke" defaultOpen title={`Strecke: Idee umsetzen · ${model.short}`} sub="Die 6 Etappen deines Modells. Hake ab, was erledigt ist." meta={`${nDone}/${model.track.length}`}>
        <Bar pct={(nDone / model.track.length) * 100} tone="ok" />
        <ol className="flex flex-col gap-1">
          {model.track.map((st, i) => {
            const isDone = !!tk[st.id];
            const isNow = !isDone && model.track.findIndex((x) => !tk[x.id]) === i;
            const nextM = st.missions.map((m) => MISSION_BY_ID[m]).find((m) => !s.missions[m.id]?.done) || MISSION_BY_ID[st.missions[0]];
            return (
              <li key={st.id} className="flex items-center gap-2.5">
                <button onClick={() => toggleStep(st.id)} aria-pressed={isDone} aria-label={`${st.title} als erledigt markieren`}
                  className={`grid h-7 w-7 flex-none place-items-center rounded-lg font-mono text-[11px] font-bold ${isDone ? "bg-ok text-ok-ink" : isNow ? "bg-accent-soft text-accent-text" : "bg-surface2 text-accent-text"}`}>
                  {isDone ? <Icon name="check" size={15} /> : isNow ? "→" : ""}
                </button>
                <button className="tap flex-1 py-1.5 text-left text-sm" onClick={() => goVia("praxis/" + nextM.id, { label: "Praxis", kind: "Praxis" })}>
                  <span className={`${isNow ? "font-bold" : ""} ${!isDone && !isNow ? "text-muted" : ""}`}>{st.title}</span>
                  {isNow && <span className="block text-xs text-muted">{st.text} Mission: {nextM.title}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </Collapse>

      {active && pm && (pm.fromTodos.length > 0 || pm.forType.length > 0) && (
        <Collapse id="praxis-projekt" defaultOpen title={`Missionen für „${active.name}“`} sub="Passend zu deinen offenen To-dos und deiner Projektart" meta={pm.fromTodos.length + pm.forType.length}>
          {pm.fromTodos.map((x) => <MissionRow key={x.mission.id} id={x.mission.id} sub={"To-do: " + x.todo} />)}
          {pm.forType.length > 0 && <Label className="mt-1">Speziell für {typesLabel(active)}</Label>}
          {pm.forType.map((m) => <MissionRow key={m.id} id={m.id} />)}
        </Collapse>
      )}

      {modelMissions.length > 0 && (
        <Collapse id="praxis-modell" title={`Missionen für ${model.short}`} sub="Weitere Übungen, die zu diesem Geschäftsmodell passen" meta={modelMissions.length}>
          {modelMissions.map((id) => <MissionRow key={id} id={id} />)}
        </Collapse>
      )}

      <Collapse id="praxis-alle" title="Alle übrigen Missionen" sub="Nach Stufe filtern: Spielerisch, Mit KI, Echt bauen" meta={open.length + done.length}>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Stufe filtern">
          {(["all", "play", "ai", "build"] as const).map((k) => (
            <button key={k} onClick={() => setFilter(k)} aria-pressed={filter === k}
              className={`flex-none rounded-full border px-3 py-[7px] text-[13px] ${filter === k ? "border-ink bg-ink font-semibold text-bg" : "border-line bg-surface"}`}>
              {k === "all" ? "Alle" : LEVELS[k].label}
            </button>
          ))}
        </div>
        {filter !== "all" && <span className="text-[13px] text-muted">{LEVELS[filter].hint}</span>}
        {open.map((m) => <MissionRow key={m.id} id={m.id} />)}
        {done.length > 0 && <Label className="mt-2">Erledigt · {done.length}</Label>}
        {done.map((m) => <MissionRow key={m.id} id={m.id} />)}
      </Collapse>
    </div>
  );
}

export function MissionRow({ id, sub }: { id: string; sub?: string }) {
  const { s, goVia } = useApp();
  const m = MISSION_BY_ID[id];
  const done = s.missions[id]?.done;
  return (
    <button onClick={() => goVia("praxis/" + id, { label: "Praxis", kind: "Praxis" })} className={`card tap flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left ${done ? "opacity-70" : ""}`}>
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

/** Strategie nach Lean Startup, zugeschnitten auf ein Geschäftsmodell */
function StrategyBody({ model }: { model: Model }) {
  const loop: [string, string][] = [["Bauen", model.loop.build], ["Messen", model.loop.measure], ["Lernen", model.loop.learn]];
  const rows: [string, string][] = [
    ["Kleinstes Produkt (MVP)", model.mvp],
    ["Kennzahl", model.metric],
    ["Weitermachen, wenn …", model.signal],
    ["Erlösmodell", model.revenue],
    ["Typischer Stack", model.stack]
  ];
  return (
    <>
      <Label>Lean Startup: Bauen → Messen → Lernen</Label>
      <ol className="flex flex-col gap-2">
        {loop.map(([k, v], i) => (
          <li key={k} className="flex gap-2.5 text-sm">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-lg bg-surface2 font-mono text-xs font-bold text-accent-text">{i + 1}</span>
            <span><b>{k}:</b> {v}</span>
          </li>
        ))}
      </ol>
      {rows.map(([k, v]) => (
        <div key={k} className="text-sm"><span className="block text-[13px] font-semibold text-muted">{k}</span>{v}</div>
      ))}
      <div className="text-sm">
        <span className="block text-[13px] font-semibold text-muted">Typische Fehler bei {model.short}</span>
        <ul className="mt-1 flex flex-col gap-1">{model.mistakes.map((m) => <li key={m} className="flex gap-2"><span className="text-err">✗</span>{m}</li>)}</ul>
      </div>
      <div className="rounded-xl bg-surface2 p-3 text-[13px] text-muted">{LEAN.text}</div>
    </>
  );
}
