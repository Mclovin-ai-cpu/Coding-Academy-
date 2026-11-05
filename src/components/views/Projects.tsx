"use client";

import { useState } from "react";
import { TEMPLATES } from "@/data/templates";
import { missionForLesson } from "@/data/missions";
import { useApp } from "@/lib/app";
import { projProgress, today, uid, type Project } from "@/lib/state";
import { Icon } from "../Icon";
import { Ring, Sheet } from "../ui";

export function Projects() {
  const { s, go } = useApp();
  const [sheet, setSheet] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-[26px] font-bold leading-tight">Projekte</h1>
        <span className="text-muted">Deine Ideen mit To-dos, passenden Lektionen, Missionen und Ergebnissen.</span>
      </div>
      <button className="btn-primary w-full" onClick={() => setSheet(true)}><Icon name="plus" size={18} /> Neues Projekt</button>
      {s.projects.length ? s.projects.map((p) => {
        const stuck = p.todos.filter((t) => t.stuck && !t.done).length;
        return (
          <button key={p.id} className="card tap flex items-center gap-3 p-4 text-left" onClick={() => go("projekte/" + p.id)}>
            <Ring pct={projProgress(p)} />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] text-muted">{TEMPLATES[p.type]?.emoji || "💡"} {TEMPLATES[p.type]?.label || "Projekt"}{s.activeProject === p.id ? " · aktiv" : ""}</span>
              <b className="text-[17px]">{p.name}</b>
              <span className="block text-[13px] text-muted">
                {p.todos.filter((t) => t.done).length}/{p.todos.length} To-dos{stuck ? <span className="text-warn"> · {stuck} mit Hänger</span> : null}
              </span>
            </span>
            <Icon name="arrow" />
          </button>
        );
      }) : (
        <div className="card flex flex-col items-center gap-2 p-7 text-center">
          <b>Noch kein Projekt</b>
          <p className="text-sm text-muted">Zum Beispiel: „Webpage für Affiliate-Marketing“. Du bekommst eine To-do-Liste, und bei jedem Schritt siehst du, welche Lektion und Mission dir hilft.</p>
        </div>
      )}
      <ProjectSheet open={sheet} onClose={() => setSheet(false)} />
    </div>
  );
}

export function ProjectSheet({ open, onClose, project }: { open: boolean; onClose: () => void; project?: Project }) {
  return (
    <Sheet open={open} onClose={onClose} label={project ? "Projekt bearbeiten" : "Neues Projekt"}>
      {open && <ProjectForm onClose={onClose} project={project} />}
    </Sheet>
  );
}

function ProjectForm({ onClose, project }: { onClose: () => void; project?: Project }) {
  const { update, addXP, checkBadges, go, toast } = useApp();
  const [name, setName] = useState(project?.name || "");
  const [idea, setIdea] = useState(project?.idea || "");
  const [type, setType] = useState(project?.type || "landing");
  const [sure, setSure] = useState(false);
  const edit = !!project;

  const save = () => {
    const n = name.trim();
    if (!n) { toast("Bitte einen Namen eingeben"); return; }
    if (edit) {
      update((d) => { const p = d.projects.find((x) => x.id === project.id)!; p.name = n; p.idea = idea.trim(); });
      toast("Gespeichert"); onClose(); return;
    }
    const np: Project = {
      id: uid(), name: n, idea: idea.trim(), type, created: today(), notes: [],
      todos: TEMPLATES[type].todos.map(([text, lesson, mission]) => ({ id: uid(), text, lesson, mission: mission === "keine" ? undefined : mission || missionForLesson(lesson)?.id, done: false, stuck: false }))
    };
    update((d) => { d.projects.unshift(np); d.activeProject = np.id; });
    onClose();
    addXP(20, "Projekt angelegt · Missionen in Praxis");
    setTimeout(checkBadges, 0);
    go("projekte/" + np.id);
  };

  const field = "w-full rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent";
  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-xl font-bold">{edit ? "Projekt bearbeiten" : "Neues Projekt"}</h2>
      <label htmlFor="pn" className="mb-1.5 mt-3 text-[13px] font-semibold">Name</label>
      <input id="pn" className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Fahrrad-Vergleichsportal" />
      <label htmlFor="pi" className="mb-1.5 mt-3 text-[13px] font-semibold">Idee in einem Satz</label>
      <textarea id="pi" className={field + " min-h-[80px]"} value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Was willst du bauen und für wen?" />
      {!edit && (
        <>
          <span className="mb-1.5 mt-3 text-[13px] font-semibold">Art des Projekts</span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(TEMPLATES).map(([k, t]) => (
              <button key={k} onClick={() => setType(k)} aria-pressed={type === k}
                className={`rounded-full border px-3 py-[7px] text-[13px] ${type === k ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface"}`}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>
          <span className="mt-2 text-[13px] text-muted">Du bekommst eine passende To-do-Liste, die du danach frei anpassen kannst.</span>
        </>
      )}
      <div className="mt-5 grid gap-2.5">
        <button className="btn-primary" onClick={save}>{edit ? "Speichern" : "Projekt anlegen"}</button>
        {edit && (
          <button className="btn-ghost !bg-err-soft !text-err" onClick={() => {
            if (!sure) { setSure(true); return; }
            update((d) => { d.projects = d.projects.filter((x) => x.id !== project.id); if (d.activeProject === project.id) d.activeProject = ""; });
            onClose(); toast("Projekt gelöscht"); go("projekte");
          }}>
            <Icon name="trash" size={18} /> {sure ? "Wirklich löschen? Nochmal tippen" : "Projekt löschen"}
          </button>
        )}
      </div>
    </div>
  );
}
