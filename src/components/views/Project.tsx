"use client";

import { useState } from "react";
import { CARDS } from "@/data/cards";
import { COURSES } from "@/data/courses";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID, missionForLesson, missionsForProject } from "@/data/missions";
import { TEMPLATES } from "@/data/templates";
import { useApp } from "@/lib/app";
import { courseOf, projProgress, today, uid, type Project, type Todo } from "@/lib/state";
import { Icon } from "../Icon";
import { copyText, Label, Ring, Sheet } from "../ui";
import { ProjectSheet } from "./Projects";

const short = (t: string, n = 26) => (t.length > n ? t.slice(0, n - 1) + "…" : t);

function LessonSelect({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string }) {
  return (
    <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-[14px] border-[1.5px] border-line bg-surface2 p-3 outline-none focus:border-accent">
      <option value="">– keine Lektion –</option>
      {COURSES.map((c) => (
        <optgroup key={c.id} label={c.short}>
          {c.lessons.map((l) => <option key={l} value={l}>{LESSONS[l].title}</option>)}
        </optgroup>
      ))}
    </select>
  );
}

export function ProjectView({ id }: { id: string }) {
  const { s, go, update, addXP, toast, checkBadges, confetti } = useApp();
  const p = s.projects.find((x) => x.id === id);
  const [edit, setEdit] = useState(false);
  const [todoEdit, setTodoEdit] = useState<Todo | null>(null);
  const [stuck, setStuck] = useState<Todo | null>(null);
  const [newT, setNewT] = useState("");
  const [newL, setNewL] = useState("");
  const [note, setNote] = useState("");
  if (!p) return <div className="card p-6 text-center">Projekt nicht gefunden. <button className="font-semibold text-accent-text" onClick={() => go("projekte")}>Zu den Projekten</button></div>;
  const pr = projProgress(p);
  const T = TEMPLATES[p.type];

  const mut = (fn: (pp: Project) => void) => update((d) => fn(d.projects.find((x) => x.id === id)!));
  const toggle = (t: Todo) => {
    const nowDone = !t.done;
    mut((pp) => { const x = pp.todos.find((y) => y.id === t.id)!; x.done = nowDone; if (nowDone) x.stuck = false; });
    if (nowDone) {
      update((d) => { d.todosDone++; });
      addXP(5, "To-do erledigt");
      if (p.todos.filter((x) => x.done || x.id === t.id).length === p.todos.length) { confetti(); toast("Projekt komplett!"); }
    }
    setTimeout(checkBadges, 0);
  };
  const addTodo = () => {
    const txt = newT.trim(); if (!txt) return;
    mut((pp) => pp.todos.push({ id: uid(), text: txt, lesson: newL, mission: newL ? missionForLesson(newL)?.id : undefined, done: false, stuck: false }));
    setNewT(""); setNewL(""); toast("To-do hinzugefügt");
  };
  const brief = () => {
    const txt = `Projekt: ${p.name}\nArt: ${T?.label || "Projekt"}\nIdee: ${p.idea || "-"}\n\nErledigt:\n${p.todos.filter((t) => t.done).map((t) => "- " + t.text).join("\n") || "-"}\n\nOffen:\n${p.todos.filter((t) => !t.done).map((t) => "- " + t.text + (t.stuck ? " (hier hänge ich fest)" : "")).join("\n") || "-"}\n\nNotizen & Ergebnisse:\n${p.notes.slice(0, 6).map((n) => "- " + n.text).join("\n") || "-"}\n\nHilf mir beim nächsten offenen Schritt. Ich bin Einsteiger beim Vibecoding, erkläre Begriffe kurz.`;
    copyText(txt, toast, "Briefing kopiert");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button aria-label="Zurück" onClick={() => go("projekte")} className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface"><Icon name="back" size={18} /></button>
        <span className="flex-1" />
        {s.activeProject !== p.id && (
          <button className="rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]" onClick={() => { update((d) => { d.activeProject = p.id; }); toast("Aktives Projekt für Praxis"); }}>Aktiv setzen</button>
        )}
        <button className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]" onClick={() => setEdit(true)}><Icon name="edit" size={15} /> Bearbeiten</button>
      </div>

      <div className="card flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <Ring pct={pr} />
          <div className="min-w-0 flex-1">
            <span className="text-[13px] text-muted">{T?.emoji || "💡"} {T?.label || "Projekt"} · seit {p.created.split("-").reverse().join(".")}{s.activeProject === p.id ? " · aktiv" : ""}</span>
            <h1 className="text-[22px] font-bold leading-tight">{p.name}</h1>
            <span className="font-mono text-[13px] font-semibold">{p.todos.filter((t) => t.done).length}/{p.todos.length} To-dos erledigt</span>
          </div>
        </div>
        {p.idea && <p className="text-muted">{p.idea}</p>}
      </div>

      <div className="mx-0.5 mt-2 flex items-center justify-between"><h2 className="text-lg font-bold">To-dos</h2><span className="font-mono text-[13px] text-muted">{p.todos.filter((t) => t.done).length}/{p.todos.length}</span></div>
      <div className="flex flex-col gap-2">
        {p.todos.map((t) => {
          const L = LESSONS[t.lesson];
          const M = t.mission ? MISSION_BY_ID[t.mission] : undefined;
          return (
            <div key={t.id} className={`card flex items-start gap-3 rounded-2xl p-3 transition-opacity ${t.done ? "opacity-60" : ""}`}>
              <button aria-label={t.done ? "Als offen markieren" : "Als erledigt markieren"} aria-pressed={t.done} onClick={() => toggle(t)}
                className={`mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-[9px] border-2 transition-transform ${t.done ? "scale-105 border-ok bg-ok text-ok-ink" : "border-line bg-surface2 text-transparent"}`}>
                <Icon name="check" size={16} />
              </button>
              <div className="min-w-0 flex-1">
                <div className={`text-[15px] ${t.done ? "line-through" : ""}`}>{t.text}</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {L && <button className="rounded-lg bg-accent-soft px-2 py-[3px] font-mono text-[11px] text-accent-text" onClick={() => go("lernen/" + t.lesson)}>{short(L.title)}</button>}
                  {M && !t.done && (
                    <button className={`rounded-lg px-2 py-[3px] font-mono text-[11px] ${s.missions[M.id]?.done ? "bg-surface2 text-muted" : "bg-ok-soft text-ok"}`} onClick={() => { if (s.activeProject !== p.id) update((d) => { d.activeProject = p.id; }); go("praxis/" + M.id); }}>
                      Mission: {short(M.title, 24)}{s.missions[M.id]?.done ? " ✓" : ""}
                    </button>
                  )}
                  {t.stuck && !t.done && <span className="rounded-lg bg-warn-soft px-2 py-[3px] font-mono text-[11px] text-warn">hänge fest</span>}
                </div>
              </div>
              <button className="p-1 text-muted" aria-label="Ich hänge fest" onClick={() => setStuck(t)}><Icon name="help" /></button>
              <button className="p-1 text-muted" aria-label="To-do bearbeiten" onClick={() => setTodoEdit(t)}><Icon name="edit" /></button>
            </div>
          );
        })}
      </div>
      <div className="card flex flex-col gap-2 p-3">
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
          <label className="sr-only" htmlFor="newT">Neues To-do</label>
          <input id="newT" value={newT} onChange={(e) => setNewT(e.target.value)} placeholder="Neues To-do …" className="min-w-0 flex-1 rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent" />
          <button aria-label="To-do hinzufügen" className="grid h-12 w-12 flex-none place-items-center rounded-[14px] bg-accent text-accent-ink"><Icon name="plus" /></button>
        </form>
        <label className="sr-only" htmlFor="newTL">Passende Lektion</label>
        <LessonSelect id="newTL" value={newL} onChange={setNewL} />
      </div>

      {(() => {
        const pm = missionsForProject(p);
        const open = [...pm.fromTodos.map((x) => x.mission), ...pm.forType].filter((m) => !s.missions[m.id]?.done);
        if (!open.length) return null;
        return (
          <>
            <div className="mx-0.5 mt-3 flex items-center justify-between"><h2 className="text-lg font-bold">Praxis für dieses Projekt</h2><span className="font-mono text-[13px] text-muted">{open.length} offen</span></div>
            <div className="flex flex-col gap-2">
              {open.slice(0, 3).map((m) => (
                <button key={m.id} className="card tap flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left" onClick={() => { update((d) => { d.activeProject = p.id; }); go("praxis/" + m.id); }}>
                  <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl font-mono text-xs font-bold ${m.level === "play" ? "bg-warn-soft text-warn" : m.level === "ai" ? "bg-accent-soft text-accent-text" : "bg-ok-soft text-ok"}`}>{LEVELS[m.level].code}</span>
                  <span className="min-w-0 flex-1"><b className="text-[15px]">{m.title}</b><span className="block font-mono text-xs text-muted">{LEVELS[m.level].label} · {m.min} Min. · +{m.xp} XP</span></span>
                  <Icon name="arrow" size={18} />
                </button>
              ))}
              <button className="text-left text-sm font-semibold text-accent-text" onClick={() => { update((d) => { d.activeProject = p.id; }); go("praxis"); }}>Alle {open.length} in Praxis ansehen</button>
            </div>
          </>
        );
      })()}

      <div className="mx-0.5 mt-3"><h2 className="text-lg font-bold">Ergebnisse & Notizen</h2></div>
      <div className="card flex flex-col gap-2 p-4">
        {p.notes.length ? p.notes.map((n) => (
          <div key={n.id} className="whitespace-pre-wrap rounded-r-xl border-l-[3px] border-accent bg-surface2 px-3 py-2 text-sm">
            <div className="font-mono text-xs text-muted">
              {n.date.split("-").reverse().join(".")}{n.mission ? ` · Mission: ${MISSION_BY_ID[n.mission]?.title || ""}` : n.lesson ? ` · ${LESSONS[n.lesson]?.title || ""}` : ""}
            </div>
            {/^https?:\/\//.test(n.text.trim()) ? <a className="break-all font-mono text-accent-text underline" href={n.text.trim()} target="_blank" rel="noreferrer">{n.text.trim()}</a> : n.text}
          </div>
        )) : <span className="text-[13px] text-muted">Ergebnisse aus Missionen und gespeicherte Übungen landen hier. Oder schreib eine eigene Notiz:</span>}
        <label className="sr-only" htmlFor="noteIn">Notiz</label>
        <textarea id="noteIn" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Notiz hinzufügen …" className="mt-1 min-h-[70px] rounded-[14px] border-[1.5px] border-line bg-surface2 p-3.5 outline-none focus:border-accent" />
        <button className="btn-ghost" onClick={() => { const t = note.trim(); if (!t) return; mut((pp) => pp.notes.unshift({ id: uid(), text: t, date: today() })); setNote(""); }}>Notiz speichern</button>
      </div>

      <div className="card flex flex-col gap-2 p-4">
        <Label>Prompt für Claude</Label>
        <span className="text-[13px] text-muted">Kopiert dein Projekt samt offener To-dos und Ergebnisse als Briefing, damit du direkt weiterbauen kannst.</span>
        <button className="flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]" onClick={brief}><Icon name="copy" size={16} /> Projekt-Briefing kopieren</button>
      </div>

      <ProjectSheet open={edit} onClose={() => setEdit(false)} project={p} />
      <Sheet open={!!todoEdit} onClose={() => setTodoEdit(null)} label="To-do bearbeiten">
        {todoEdit && <TodoForm key={todoEdit.id} t={todoEdit} onSave={(txt, les) => { mut((pp) => { const x = pp.todos.find((y) => y.id === todoEdit.id)!; x.text = txt; if (x.lesson !== les) { x.lesson = les; x.mission = les ? missionForLesson(les)?.id : undefined; } }); setTodoEdit(null); toast("Gespeichert"); }}
          onDelete={() => { mut((pp) => { pp.todos = pp.todos.filter((y) => y.id !== todoEdit.id); }); setTodoEdit(null); toast("To-do gelöscht"); }} />}
      </Sheet>
      <Sheet open={!!stuck} onClose={() => setStuck(null)} label="Ich hänge fest">
        {stuck && <StuckBody t={stuck} onMark={() => { mut((pp) => { const x = pp.todos.find((y) => y.id === stuck.id)!; x.stuck = !x.stuck; }); setStuck(null); }} onClose={() => setStuck(null)} projectId={p.id} />}
      </Sheet>
    </div>
  );
}

function TodoForm({ t, onSave, onDelete }: { t: Todo; onSave: (txt: string, lesson: string) => void; onDelete: () => void }) {
  const [txt, setTxt] = useState(t.text);
  const [les, setLes] = useState(t.lesson);
  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-xl font-bold">To-do bearbeiten</h2>
      <label htmlFor="tt" className="mb-1.5 mt-3 text-[13px] font-semibold">Text</label>
      <textarea id="tt" value={txt} onChange={(e) => setTxt(e.target.value)} className="min-h-[80px] rounded-[14px] border-[1.5px] border-line bg-surface2 p-3.5 outline-none focus:border-accent" />
      <label htmlFor="tl" className="mb-1.5 mt-3 text-[13px] font-semibold">Passende Lektion (bestimmt auch die Mission)</label>
      <LessonSelect id="tl" value={les} onChange={setLes} />
      <div className="mt-5 grid gap-2.5">
        <button className="btn-primary" onClick={() => txt.trim() && onSave(txt.trim(), les)}>Speichern</button>
        <button className="btn-ghost !bg-err-soft !text-err" onClick={onDelete}><Icon name="trash" size={18} /> To-do löschen</button>
      </div>
    </div>
  );
}

function StuckBody({ t, onMark, onClose, projectId }: { t: Todo; onMark: () => void; onClose: () => void; projectId: string }) {
  const { s, go, update, openTerm } = useApp();
  const L = LESSONS[t.lesson];
  const c = L ? courseOf(t.lesson) : null;
  const before = c ? c.lessons.slice(0, c.lessons.indexOf(t.lesson)).filter((x) => !s.done[x]) : [];
  const M = t.mission ? MISSION_BY_ID[t.mission] : undefined;
  return (
    <div className="flex flex-col gap-3">
      <Label>Ich hänge fest</Label>
      <h2 className="text-xl font-bold">{t.text}</h2>
      {L && c ? (
        <>
          <p>Das hilft dir bei diesem Schritt:</p>
          <button className="card tap flex items-center gap-3 border-accent p-3.5 text-left" onClick={() => { onClose(); go("lernen/" + t.lesson); }}>
            <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl font-mono text-[13px] font-bold text-white" style={{ background: c.color }}>{c.ico}</span>
            <span className="flex-1"><span className="block text-[13px] text-muted">{s.done[t.lesson] ? "Wiederholen" : "Noch nicht gemacht"} · {L.min} Min.</span><b>{L.title}</b></span>
            <Icon name="arrow" />
          </button>
          {M && (
            <button className="card tap flex items-center gap-3 p-3.5 text-left" onClick={() => { onClose(); update((d) => { d.activeProject = projectId; }); go("praxis/" + M.id); }}>
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl bg-ok-soft text-ok"><Icon name="tool" /></span>
              <span className="flex-1"><span className="block text-[13px] text-muted">Mission · {M.min} Min.</span><b>{M.title}</b></span>
              <Icon name="arrow" />
            </button>
          )}
          {before.length > 0 && <p className="text-[13px] text-muted">Vorher sinnvoll: {before.map((x) => LESSONS[x].title).join(", ")}</p>}
          <Label className="mt-1">Begriffe auffrischen</Label>
          <div className="flex flex-wrap gap-2">
            {L.terms.slice(0, 5).map((r) => <button key={r} className="tap rounded-[10px] bg-accent-soft px-2.5 py-1.5 font-mono text-[13px] font-semibold text-accent-text" onClick={() => openTerm(r)}>{CARDS[r].t}</button>)}
          </div>
        </>
      ) : (
        <p className="text-muted">Diesem To-do ist keine Lektion zugeordnet. Über „Bearbeiten“ kannst du eine verknüpfen.</p>
      )}
      <div className="mt-2 grid gap-2.5">
        <button className="btn-ghost" onClick={onMark}>{t.stuck ? "Markierung entfernen" : "Als „hänge fest“ markieren"}</button>
        <button className="btn-primary" onClick={onClose}>Schließen</button>
      </div>
    </div>
  );
}
