"use client";

import { COURSES } from "@/data/courses";
import { LESSONS } from "@/data/lessons";
import { LEVELS, MISSION_BY_ID, TRACK } from "@/data/missions";
import { useAccount } from "@/lib/account";
import { useApp } from "@/lib/app";
import { ALL, cardsOf, courseOf, doneCount, dueCards, level, levelPct, nextLesson, projProgress, streak, trackKey } from "@/lib/state";
import { Icon } from "../Icon";
import { Bar, Label, Ring, Tag } from "../ui";

export function Home() {
  const { s, go, openTerm, migrated } = useApp();
  const acc = useAccount();
  const h = new Date().getHours();
  const greet = h < 11 ? "Guten Morgen" : h < 18 ? "Hallo" : "Guten Abend";
  const nx = nextLesson(s);
  const due = dueCards(s).length;
  const active = s.projects.find((p) => p.id === s.activeProject) || s.projects.find((p) => p.todos.some((t) => !t.done));
  const tk = s.track[trackKey(s)] || {};
  const step = TRACK.find((st) => !tk[st.id]);
  const mission = step?.missions.map((m) => MISSION_BY_ID[m]).find((m) => !s.missions[m.id]?.done);
  const c = nx ? courseOf(nx) : null;
  const coursePct = c ? Math.round((c.lessons.filter((l) => s.done[l]).length / c.lessons.length) * 100) : 100;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-[13px] text-muted">$ academy --start</span>
        <h1 className="text-[26px] font-bold leading-tight">{greet}{s.name ? `, ${s.name}` : ""}</h1>
        <span className="text-muted">Von der Geschäftsidee zur eigenen Web-App.</span>
      </div>

      {migrated && (
        <div className="card flex items-center gap-3 border-ok p-3.5 text-sm">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-ok-soft text-ok"><Icon name="check" size={18} /></span>
          <span>Dein Fortschritt aus Version 2 wurde übernommen.</span>
        </div>
      )}

      {acc.configured && !acc.email && (
        <button className="card tap flex items-center gap-3 p-3.5 text-left text-sm" onClick={() => go("profil")}>
          <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-accent-soft font-mono text-xs font-bold text-accent-text">ID</span>
          <span className="flex-1"><b>Konto anlegen</b> – Fortschritt auf allen Geräten und Claude direkt fragen</span>
          <Icon name="arrow" size={18} />
        </button>
      )}

      <div className="grid grid-cols-3 gap-2.5">
        {[
          [String(streak(s)), "Tage Serie"],
          [`${doneCount(s)}/${ALL.length}`, "Lektionen"],
          [String(s.flags.length), "Markiert"]
        ].map(([v, l]) => (
          <div key={l} className="card rounded-2xl px-2.5 py-3 text-center">
            <div className="font-mono text-[21px] font-bold">{v}</div>
            <div className="text-xs text-muted">{l}</div>
          </div>
        ))}
      </div>

      <div className="card flex flex-col gap-2 px-4 py-3.5">
        <div className="flex text-[13px]"><span className="flex-1 font-mono">Level {level(s)} → {level(s) + 1}</span><span className="font-mono text-muted">{s.xp % 200}/200 XP</span></div>
        <Bar pct={levelPct(s)} />
      </div>

      {nx && c ? (
        <section className="flex flex-col gap-2.5 rounded-[20px] bg-code p-4 text-code-text">
          <div className="flex items-center gap-1.5">
            <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" /><span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]" /><span className="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px] text-code-muted">{c.id}/{nx}.md</span>
          </div>
          <span className="font-mono text-xs text-[#5eead4]">// weiter lernen · {LESSONS[nx].min} Min. · {c.short}</span>
          <h2 className="text-xl font-bold leading-snug">{LESSONS[nx].title}</h2>
          <Bar pct={coursePct} tone="light" />
          <button onClick={() => go("lernen/" + nx)} className="tap rounded-xl bg-white p-3.5 text-[15px] font-bold text-[#0f172a]">
            {s.done[ALL[0]] ? "Weiterlernen" : "Erste Lektion starten"}
          </button>
        </section>
      ) : (
        <section className="rounded-[20px] bg-code p-4 text-code-text">
          <span className="font-mono text-xs text-[#5eead4]">// alle {ALL.length} Lektionen geschafft</span>
          <h2 className="mt-1 text-xl font-bold">Stark! Jetzt Karten wiederholen oder bauen.</h2>
        </section>
      )}

      <section className="card flex flex-col gap-2.5 px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-warn"><Icon name="flag" size={18} filled /></span>
          <b className="flex-1">{s.flags.length ? `${s.flags.length} ${s.flags.length === 1 ? "Begriff" : "Begriffe"} markiert` : "Noch nichts markiert"}</b>
          <button className="text-sm font-semibold text-accent-text" onClick={() => go(s.flags.length ? "karten/markiert" : "karten/glossar")}>
            {s.flags.length ? "Wiederholen" : "Zum Glossar"}
          </button>
        </div>
        {s.flags.length ? (
          <div className="flex flex-wrap gap-2">
            {s.flags.slice(0, 8).map((f) => (
              <button key={f} onClick={() => openTerm(f)} className="tap rounded-[10px] bg-warn-soft px-2.5 py-1.5 font-mono text-[13px] font-semibold text-warn">{cardsOf(s)[f]?.t}</button>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted">Tippe in Lektionen oder im Glossar auf die Fahne, um Begriffe für später zu sammeln.</span>
        )}
      </section>

      <button className="card tap flex items-center gap-3 px-4 py-3.5 text-left" onClick={() => go("karten")}>
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft text-accent-text"><Icon name="cards" /></span>
        <span className="flex-1">
          <b>{due ? `${due} Karten fällig` : "Karten auf Stand"}</b>
          <span className="block text-[13px] text-muted">{due ? "5 Minuten wiederholen, Wissen festigen" : "Im Glossar kannst du frei stöbern"}</span>
        </span>
        <Icon name="arrow" />
      </button>

      {mission && (
        <button className="card tap flex flex-col gap-1.5 px-4 py-3.5 text-left" onClick={() => go("praxis/" + mission.id)}>
          <Label>Praxis{active && s.activeProject ? ` für „${active.name}“` : ""} · {step!.title}</Label>
          <b className="text-base">{mission.title}</b>
          <span className="flex flex-wrap gap-1.5">
            <Tag tone="acc">{LEVELS[mission.level].label}</Tag><Tag>{mission.min} Min.</Tag><Tag tone="ok">+{mission.xp} XP · freiwillig</Tag>
          </span>
        </button>
      )}

      {active ? (
        <button className="card tap flex flex-col gap-2 px-4 py-3.5 text-left" onClick={() => go("projekte/" + active.id)}>
          <Label>Aktives Projekt</Label>
          <span className="flex items-center gap-3">
            <Ring pct={projProgress(active)} />
            <span className="min-w-0 flex-1">
              <b>{active.name}</b>
              <span className="block text-[13px] text-muted">{(() => { const n = active.todos.find((t) => !t.done); return n ? `Nächster Schritt: ${n.text}` : "Alle To-dos erledigt"; })()}</span>
            </span>
          </span>
        </button>
      ) : (
        <button className="card tap flex flex-col gap-1 px-4 py-3.5 text-left" onClick={() => go("projekte")}>
          <Label>Projekte</Label>
          <b>Bau etwas Eigenes</b>
          <span className="text-[13px] text-muted">Lege eine Idee an und bekomme eine To-do-Liste mit passenden Lektionen und Missionen.</span>
        </button>
      )}

      <div className="mx-0.5 mt-3 flex items-center justify-between"><h2 className="text-lg font-bold">Kurse</h2><span className="font-mono text-[13px] text-muted">{COURSES.length} Module</span></div>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2">
        {COURSES.map((co) => {
          const d = co.lessons.filter((id) => s.done[id]).length;
          return (
            <button key={co.id} className="card tap min-w-[150px] p-3.5 text-left" onClick={() => go("lernen")}>
              <span className="mb-2.5 grid h-[38px] w-[38px] place-items-center rounded-xl font-mono text-[13px] font-bold text-white" style={{ background: co.color }}>{co.ico}</span>
              <b className="text-sm">{co.short}</b>
              <div className="mt-2.5"><Bar pct={(d / co.lessons.length) * 100} h={6} /></div>
              <div className="mt-1 font-mono text-[13px] text-muted">{d}/{co.lessons.length}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
