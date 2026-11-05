"use client";

import { useState } from "react";
import { LESSONS } from "@/data/lessons";
import { missionForLesson } from "@/data/missions";
import { buzz, useApp } from "@/lib/app";
import { BADGES, courseOf, level, levelPct, nextLesson, today, uid } from "@/lib/state";
import { Icon } from "../Icon";
import { Bar, CodeBlock, Label, QuizQuestion, Tag, TermChip } from "../ui";

const STEP_NAMES = ["lernen", "beispiel", "übung", "quiz"];

export function LessonView({ id }: { id: string }) {
  const { s, go, update, addXP, toast, checkBadges, confetti, returnTo, setReturnTo } = useApp();
  // Kommt man aus einer Praxis-Mission, führt der Weg danach dorthin zurück
  const back = returnTo && returnTo.lesson === id ? returnTo : null;
  const goBack = () => { const r = back!.route; setReturnTo(null); go(r); };
  const L = LESSONS[id];
  const c = courseOf(id);
  const mission = missionForLesson(id);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [prac, setPrac] = useState(s.practice[id] || "");
  const [pracProj, setPracProj] = useState(s.activeProject || "");
  const [reward, setReward] = useState<null | { gained: number; first: boolean; badges: typeof BADGES }>(null);

  const next = () => {
    if (step < 3) { setStep(step + 1); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (q < L.quiz.length - 1) { setQ(q + 1); setAnswered(false); return; }
    // Lektion abschließen
    const first = !s.done[id];
    const gained = first ? 50 + correct * 10 : 10;
    update((d) => { d.done[id] = true; L.terms.forEach((t) => { if (!d.cards[t]) d.cards[t] = { box: 0, due: today() }; }); });
    addXP(gained);
    const nb = checkBadges();
    setReward({ gained, first, badges: nb });
    confetti();
    buzz([20, 60, 20]);
  };

  const savePractice = () => {
    const txt = prac.trim();
    if (!txt) { toast("Schreib zuerst etwas"); return; }
    const first = !s.practice[id];
    update((d) => {
      d.practice[id] = txt;
      if (pracProj) d.projects.find((p) => p.id === pracProj)?.notes.unshift({ id: uid(), lesson: id, text: txt, date: today() });
    });
    if (first) addXP(15, "Übung gespeichert"); else toast(pracProj ? "In Projekt gespeichert" : "Aktualisiert");
    setTimeout(checkBadges, 0);
  };

  if (reward) {
    const nx = nextLesson(s);
    return (
      <div className="view-in fixed inset-0 z-[70] flex flex-col items-center justify-center bg-bg p-6 text-center">
        <div className="pop grid h-[120px] w-[120px] place-items-center rounded-[36px] bg-ok text-ok-ink"><Icon name="check" size={64} /></div>
        <h1 className="mb-1.5 mt-5 text-[28px] font-bold">{reward.first ? "Lektion geschafft!" : "Wiederholung geschafft!"}</h1>
        <div className="text-muted">{L.title}</div>
        <div className="my-3 font-mono text-[40px] font-bold text-accent-text">+{reward.gained} XP</div>
        <div className="w-full max-w-[360px] text-left">
          <div className="flex text-[13px]"><span className="flex-1 font-mono">Level {level(s)}</span><span className="font-mono text-muted">{s.xp % 200}/200</span></div>
          <div className="mb-3.5 mt-2"><Bar pct={levelPct(s)} /></div>
          {reward.first && (
            <div className="mb-1.5 flex items-center gap-3 rounded-2xl bg-surface2 px-4 py-3">
              <span className="font-mono text-lg font-bold text-accent-text">+{L.terms.length}</span>
              <div><b>neue Karten</b><div className="text-[13px] text-muted">Jetzt im Reiter „Karten“</div></div>
            </div>
          )}
          {reward.badges.map((b) => (
            <div key={b.id} className="view-in mb-1.5 flex items-center gap-3 rounded-2xl bg-accent-soft px-4 py-3">
              <span className="font-mono text-lg font-bold text-accent-text">{b.code}</span>
              <div><b>Abzeichen: {b.t}</b><div className="text-[13px] text-muted">Neu freigeschaltet</div></div>
            </div>
          ))}
          {mission && !back && !s.missions[mission.id]?.done && (
            <button onClick={() => go("praxis/" + mission.id)} className="tap mt-1.5 flex w-full items-center gap-2.5 rounded-2xl border border-dashed border-line px-3.5 py-3 text-left text-sm">
              <span className="text-accent-text"><Icon name="tool" /></span>
              <span className="flex-1">Optional: Mission „{mission.title}“</span>
              <span className="font-mono text-[11px] text-ok">+{mission.xp} XP</span>
            </button>
          )}
          <div className="mt-5 grid gap-3">
            {back && <button className="btn-primary" onClick={goBack}><Icon name="back" size={18} /> Zurück zur Mission „{back.label}“</button>}
            {nx && <button className={back ? "btn-ghost" : "btn-primary"} onClick={() => { setReturnTo(null); go("lernen/" + nx); }}>Nächste Lektion <Icon name="arrow" size={18} /></button>}
            <button className="btn-ghost" onClick={() => { setReturnTo(null); go("lernen"); }}>Zum Lernpfad</button>
          </div>
        </div>
      </div>
    );
  }

  const Q = L.quiz[q];
  return (
    <div className="flex flex-col gap-3 pt-[env(safe-area-inset-top)]">
      <div className="flex items-center gap-3">
        <button aria-label={back ? `Zurück zur Mission ${back.label}` : "Lektion schließen"} onClick={() => (back ? goBack() : go("lernen"))} className="grid h-10 w-10 flex-none place-items-center rounded-xl border border-line bg-surface"><Icon name={back ? "back" : "x"} size={18} /></button>
        <div className="grid flex-1 grid-cols-4 gap-1.5" aria-label={`Schritt ${step + 1} von 4`}>
          {[0, 1, 2, 3].map((i) => <div key={i} className={`h-1.5 rounded-full transition-colors ${i < step ? "bg-ok" : i === step ? "bg-accent" : "bg-surface2"}`} />)}
        </div>
        <Tag tone="acc">{c.short}</Tag>
      </div>

      {back && (
        <button onClick={goBack} className="tap flex items-center gap-2.5 rounded-2xl bg-accent-soft px-3.5 py-2.5 text-left text-sm text-accent-text">
          <Icon name="tool" size={18} />
          <span className="flex-1">Du kommst aus der Mission <b>„{back.label}“</b>. Nach der Lektion geht es dorthin zurück.</span>
          <span className="font-semibold">Zurück</span>
        </button>
      )}

      <div className="card prose-lesson flex flex-col gap-3 rounded-[20px] p-[18px]">
        <span className="font-mono text-xs text-accent-text">0{step + 1} · {STEP_NAMES[step]}{step === 3 ? ` · Frage ${q + 1}/${L.quiz.length}` : ""}</span>
        {step === 0 && (
          <>
            <h1 className="text-[23px] font-bold leading-tight">{L.title}</h1>
            {L.intro.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
            <div className="flex flex-col gap-2 pt-1">
              <Label>Begriffe · Fahne = später wiederholen</Label>
              <div className="flex flex-wrap gap-2">{L.terms.map((t) => <TermChip key={t} id={t} />)}</div>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h1 className="text-[23px] font-bold leading-tight">So sieht das aus</h1>
            <CodeBlock lang={L.code.lang} text={L.code.text} />
            <div className="flex gap-2.5 rounded-[14px] bg-surface2 p-3 text-sm">
              <span className="font-mono font-bold text-accent-text">tipp</span><span>{L.tip}</span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="text-[23px] font-bold leading-tight">Deine Übung</h1>
            <p>{L.task}</p>
            <label className="sr-only" htmlFor="prac">Deine Antwort</label>
            <textarea id="prac" value={prac} onChange={(e) => setPrac(e.target.value)} placeholder="Deine Antwort … (wird gespeichert)"
              className="min-h-[120px] w-full resize-y rounded-[14px] border-[1.5px] border-line bg-surface2 p-3.5 font-mono text-sm outline-none focus:border-accent" />
            {s.projects.length > 0 ? (
              <div>
                <label htmlFor="pracProj" className="mb-1.5 block text-[13px] font-semibold">Auch in einem Projekt speichern (optional)</label>
                <select id="pracProj" value={pracProj} onChange={(e) => setPracProj(e.target.value)} className="w-full rounded-[14px] border-[1.5px] border-line bg-surface2 p-3 outline-none focus:border-accent">
                  <option value="">– kein Projekt –</option>
                  {s.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            ) : (
              <p className="text-[13px] text-muted">Tipp: Lege im Reiter „Projekte“ eine Idee an, dann kannst du Übungen direkt dort sammeln.</p>
            )}
            <button className="btn-ghost w-full" onClick={savePractice}><Icon name="check" size={18} /> Übung speichern</button>
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="text-[23px] font-bold leading-tight">{Q.q}</h1>
            <QuizQuestion key={q} q={Q} onCorrect={(first) => { setAnswered(true); if (first) setCorrect((x) => x + 1); }} />
          </>
        )}
      </div>

      {step === 0 && mission && (
        <button onClick={() => go("praxis/" + mission.id)} className="tap flex items-center gap-2.5 rounded-2xl border border-dashed border-line px-3.5 py-3 text-left text-sm">
          <span className="text-accent-text"><Icon name="tool" /></span>
          <span className="flex-1">Optional: Mission „{mission.title}“</span>
          <span className="font-mono text-[11px] text-ok">{s.missions[mission.id]?.done ? "erledigt" : `+${mission.xp} XP`}</span>
        </button>
      )}

      <div className="sticky bottom-[calc(14px+env(safe-area-inset-bottom))] z-[5] mt-3">
        <button className={`${step === 3 ? "btn-primary !bg-ok !text-ok-ink !shadow-[0_3px_0_color-mix(in_srgb,var(--ok)_55%,#000)]" : "btn-primary"} w-full`} disabled={step === 3 && !answered} onClick={next}>
          {step === 0 ? "Weiter zum Beispiel" : step === 1 ? "Weiter zur Übung" : step === 2 ? (s.practice[id] ? "Weiter zum Quiz" : "Überspringen & zum Quiz") : q < L.quiz.length - 1 ? "Nächste Frage" : "Lektion abschließen"}
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
