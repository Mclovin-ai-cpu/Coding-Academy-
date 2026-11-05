"use client";

import { COURSES } from "@/data/courses";
import { LESSONS } from "@/data/lessons";
import { useApp } from "@/lib/app";
import { nextLesson } from "@/lib/state";
import { Icon } from "../Icon";

export function Learn() {
  const { s, go } = useApp();
  const nx = nextLesson(s);
  let n = 0;
  return (
    <div>
      <div className="mb-4 flex flex-col gap-0.5">
        <h1 className="text-[26px] font-bold leading-tight">Dein Lernpfad</h1>
        <span className="text-muted">Erklärung, Beispiel, Übung, Quiz. Jede Lektion ist offen, die Reihenfolge ist eine Empfehlung.</span>
      </div>
      {COURSES.map((c) => {
        const d = c.lessons.filter((id) => s.done[id]).length;
        return (
          <section key={c.id} id={"c-" + c.id} className="mb-6">
            <div className="mx-0.5 mb-3 flex items-center gap-3">
              <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-xl font-mono text-[13px] font-bold text-white" style={{ background: c.color }}>{c.ico}</span>
              <div className="flex-1">
                <h2 className="text-[17px] font-bold">{c.title}</h2>
                <div className="font-mono text-[13px] text-muted">{d}/{c.lessons.length} abgeschlossen</div>
              </div>
            </div>
            <div className="relative pl-2 before:absolute before:bottom-5 before:left-[27px] before:top-5 before:w-0.5 before:bg-line">
              {c.lessons.map((id) => {
                n++;
                const L = LESSONS[id];
                const done = !!s.done[id];
                const next = id === nx;
                return (
                  <button key={id} onClick={() => go("lernen/" + id)} className="group relative mb-1 flex w-full items-center gap-3.5 py-2.5 pr-0 text-left">
                    <span className={`relative z-[1] grid h-10 w-10 flex-none place-items-center rounded-[14px] border-2 font-mono text-sm font-bold transition-transform group-active:scale-90 ${done ? "border-ok bg-ok text-ok-ink" : next ? "pulse-ring border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted"}`}>
                      {done ? <Icon name="check" size={18} /> : String(n).padStart(2, "0")}
                    </span>
                    <span className={`card flex-1 rounded-2xl px-3.5 py-3 ${next ? "border-accent" : ""}`}>
                      <span className="font-semibold">{L.title}</span>
                      <span className="block text-[13px] text-muted">{L.min} Min. · {L.terms.length} Begriffe{s.practice[id] ? " · Übung gespeichert" : ""}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
