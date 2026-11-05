"use client";

import { useEffect, useState } from "react";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID } from "@/data/missions";
import { ALL_STEPS } from "@/data/strategy";
import { useApp } from "@/lib/app";
import { today, uid } from "@/lib/state";
import { Icon } from "../Icon";
import { CodeBlock, copyText, QuizQuestion, Tag } from "../ui";

export function MissionView({ id }: { id: string }) {
  const { s, go, update, addXP, toast, checkBadges, confetti, setReturnTo } = useApp();
  const m = MISSION_BY_ID[id];
  const st = s.missions[id];
  // Zwischenstand der Mission (falls man kurz zur Lektion wechselt)
  const draftKey = "codingAcademy.mission." + id;
  const draft = (() => { try { return JSON.parse(sessionStorage.getItem(draftKey) || "null"); } catch { return null; } })() as null | { qi: number; quizDone: boolean; result: string; projectId: string };
  const [projectId, setProjectId] = useState(draft?.projectId ?? st?.projectId ?? s.activeProject ?? "");
  const [result, setResult] = useState(draft?.result ?? st?.result ?? "");
  const [qi, setQi] = useState(draft?.qi ?? 0);
  const [quizDone, setQuizDone] = useState(draft?.quizDone ?? (!m.quiz || !!st?.done));
  const [answered, setAnswered] = useState(false);
  useEffect(() => {
    try { sessionStorage.setItem(draftKey, JSON.stringify({ qi, quizDone, result, projectId })); } catch {}
  }, [draftKey, qi, quizDone, result, projectId]);
  const toLesson = () => {
    setReturnTo({ route: "praxis/" + id, label: m.title, lesson: m.lesson });
    go("lernen/" + m.lesson);
  };
  const project = s.projects.find((p) => p.id === projectId);
  // Offenes To-do im gewählten Projekt, zu dem diese Mission gehört
  const linkedTodo = project?.todos.find((t) => t.mission === id && !t.done);
  const [tickTodo, setTickTodo] = useState(true);
  const prompt = m.prompt?.replaceAll("{idee}", project?.idea || project?.name || "[DEINE IDEE IN EINEM SATZ]").replaceAll("{projekt}", project?.name || "[PROJEKT]");

  const complete = () => {
    try { sessionStorage.removeItem(draftKey); } catch {}
    const first = !st?.done;
    const txt = result.trim();
    update((d) => {
      d.missions[id] = { done: true, date: today(), projectId: projectId || undefined, result: txt || undefined };
      const key = projectId || "_";
      ALL_STEPS.filter((t) => t.missions.includes(id)).forEach((t) => { d.track[key] = { ...(d.track[key] || {}), [t.id]: true }; });
      const p = d.projects.find((x) => x.id === projectId);
      if (p && txt) p.notes.unshift({ id: uid(), mission: id, lesson: m.lesson, text: txt, date: today() });
      if (p && linkedTodo && tickTodo) {
        const t = p.todos.find((x) => x.id === linkedTodo.id);
        if (t && !t.done) { t.done = true; t.stuck = false; d.todosDone++; }
      }
    });
    if (linkedTodo && tickTodo) setTimeout(() => toast(`To-do „${linkedTodo.text}“ abgehakt`), 1500);
    if (first) { addXP(m.xp, "Mission geschafft"); confetti(); } else toast(txt && project ? "Im Projekt gespeichert" : "Gespeichert");
    setTimeout(checkBadges, 0);
    go(project ? "projekte/" + project.id : "praxis");
  };

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-3">
        <button aria-label="Zurück" onClick={() => history.length > 1 ? history.back() : go("praxis")} className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-surface"><Icon name="back" size={18} /></button>
        <span className="flex-1" />
        <Tag tone={m.level === "play" ? "warn" : m.level === "ai" ? "acc" : "ok"}>{LEVELS[m.level].label}</Tag>
        {st?.done && <Tag tone="ok">erledigt</Tag>}
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-bold leading-tight">{m.title}</h1>
        <span className="font-mono text-[13px] text-muted">{m.min} Min. · +{m.xp} XP · freiwillig{project ? ` · Projekt: ${project.name}` : ""}</span>
      </div>
      <p>{m.intro}</p>

      <ol className="card flex flex-col gap-2.5 p-4">
        {m.steps.map((x, i) => (
          <li key={i} className="flex gap-3 text-[15px]">
            <span className="grid h-6 w-6 flex-none place-items-center rounded-lg bg-accent-soft font-mono text-xs font-bold text-accent-text">{i + 1}</span>
            <span>{x}</span>
          </li>
        ))}
      </ol>

      {s.projects.length > 0 && (
        <div>
          <label htmlFor="mProj" className="mb-1.5 block text-[13px] font-semibold">Für welches Projekt?</label>
          <select id="mProj" value={projectId} onChange={(e) => setProjectId(e.target.value)} className="w-full rounded-[14px] border-[1.5px] border-line bg-surface2 p-3 outline-none focus:border-accent">
            <option value="">– ohne Projekt –</option>
            {s.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      )}

      {prompt && (
        <CodeBlock lang="prompt" text={prompt}
          action={<button className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] text-code-text" onClick={() => copyText(prompt, toast, "Prompt kopiert – jetzt in Claude einfügen")}><Icon name="copy" size={13} />Kopieren</button>} />
      )}

      {m.quiz && !quizDone && (
        <div className="card flex flex-col gap-3 p-4">
          <span className="font-mono text-xs text-accent-text">Frage {qi + 1}/{m.quiz.length}</span>
          <h2 className="text-lg font-bold leading-snug">{m.quiz[qi].q}</h2>
          <QuizQuestion key={qi} q={m.quiz[qi]} onCorrect={() => setAnswered(true)} help={{ label: LESSONS[m.lesson].title, onClick: toLesson }} />
          <button className="btn-primary w-full" disabled={!answered} onClick={() => { if (qi < m.quiz!.length - 1) { setQi(qi + 1); setAnswered(false); } else setQuizDone(true); }}>
            {qi < m.quiz.length - 1 ? "Nächste Frage" : "Challenge abschließen"} <Icon name="arrow" size={18} />
          </button>
        </div>
      )}

      {m.result && (
        <label className="flex flex-col gap-1.5 text-[13px] font-semibold">
          Dein Ergebnis{project ? " (landet im Projekt)" : ""}
          <textarea value={result} onChange={(e) => setResult(e.target.value)} placeholder={`${m.result} …`}
            className="min-h-[90px] resize-y rounded-[14px] border-[1.5px] border-line bg-surface2 p-3.5 text-[15px] font-normal outline-none focus:border-accent" />
        </label>
      )}

      {linkedTodo && (
        <label className="card flex items-start gap-3 p-3.5 text-sm">
          <input type="checkbox" checked={tickTodo} onChange={(e) => setTickTodo(e.target.checked)} className="mt-0.5 h-5 w-5 flex-none accent-[var(--ok)]" />
          <span>Danach das To-do <b>„{linkedTodo.text}“</b> in „{project!.name}“ als erledigt abhaken</span>
        </label>
      )}

      <button onClick={toLesson} className="tap flex items-center gap-2 text-left text-sm font-semibold text-accent-text">
        <Icon name="learn" size={16} /> Hilft dabei: {LESSONS[m.lesson].title}
      </button>

      {quizDone && <div className="sticky bottom-[calc(84px+env(safe-area-inset-bottom))] z-[5] mt-2 grid grid-cols-[1fr_2fr] gap-2.5">
        <button className="btn-ghost" onClick={() => go("praxis")}>Später</button>
        <button className="btn-primary" disabled={!quizDone} onClick={complete}>
          {project && m.result ? "Im Projekt speichern" : st?.done ? "Speichern" : "Mission abschließen"}
        </button>
      </div>}
    </div>
  );
}
