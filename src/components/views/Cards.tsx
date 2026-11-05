"use client";

import { useMemo, useState } from "react";
import { CARDS } from "@/data/cards";
import { useApp } from "@/lib/app";
import { dueCards } from "@/lib/state";
import { Icon } from "../Icon";

type Mode = "wiederholen" | "glossar" | "markiert";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const letterOf = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "")[0].toUpperCase();

export function Cards({ mode: m }: { mode?: string }) {
  const { s, go } = useApp();
  const mode: Mode = m === "glossar" || m === "markiert" ? m : "wiederholen";
  const tabs: [Mode, string][] = [["wiederholen", "Wiederholen"], ["glossar", "Glossar"], ["markiert", `Markiert · ${s.flags.length}`]];
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-[26px] font-bold leading-tight">Karten</h1>
      <div className="grid grid-cols-3 gap-1 rounded-[14px] bg-surface2 p-1" role="tablist">
        {tabs.map(([k, l]) => (
          <button key={k} role="tab" aria-selected={mode === k} onClick={() => go(k === "wiederholen" ? "karten" : "karten/" + k)}
            className={`rounded-[11px] px-1 py-2.5 text-sm font-semibold ${mode === k ? "bg-surface text-ink shadow-[0_1px_3px_rgba(15,23,42,.12)]" : "text-muted"}`}>
            {l}
          </button>
        ))}
      </div>
      {mode === "wiederholen" && <Review ids={dueCards(s)} kind="due" />}
      {mode === "glossar" && <Glossary />}
      {mode === "markiert" && <Flagged />}
    </div>
  );
}

function Review({ ids, kind }: { ids: string[]; kind: "due" | "flags" }) {
  const { s, update, addXP, checkBadges, openTerm, toggleFlag, go } = useApp();
  const [queue, setQueue] = useState(() => [...ids].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState(0);

  if (!queue.length) {
    return (
      <div className="card flex flex-col items-center gap-2 p-7 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ok-soft text-ok"><Icon name="check" size={26} /></span>
        <b>{count ? `${count} Karten wiederholt!` : kind === "due" ? "Alles wiederholt!" : "Keine markierten Karten"}</b>
        <p className="text-sm text-muted">
          {kind === "due" ? "Neue Karten bekommst du mit jeder abgeschlossenen Lektion. Gelernte Karten kommen nach 1, 3, 7 und 14 Tagen wieder." : "Markiere Begriffe mit der Fahne, dann kannst du sie hier gezielt üben."}
        </p>
        <button className="btn-ghost" onClick={() => go("karten/glossar")}>Glossar öffnen</button>
      </div>
    );
  }
  const id = queue[0];
  const C = CARDS[id];
  const box = s.cards[id]?.box || 0;
  const flagged = s.flags.includes(id);

  const rate = (ok: boolean) => {
    update((d) => {
      const cur = d.cards[id] || { box: 0, due: "" };
      const nb = ok ? Math.min(cur.box + 1, 4) : 0;
      const days = [0, 1, 3, 7, 14][nb];
      const dt = new Date(); dt.setDate(dt.getDate() + (ok ? days : 0));
      d.cards[id] = { box: nb, due: `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}` };
      d.reviewed++;
    });
    setQueue((qq) => { const r = qq.slice(1); if (!ok) r.push(id); return r; });
    setFlipped(false);
    setCount((c) => c + 1);
    addXP(2);
    setTimeout(checkBadges, 0);
  };

  return (
    <div>
      <div className="mb-2.5 flex items-center font-mono text-[13px] text-muted">
        <span className="flex-1">{queue.length} übrig{kind === "flags" ? " · markiert" : ""}</span>
        <span className="flex gap-[3px]" aria-label={`Stufe ${box} von 4`}>{[0, 1, 2, 3].map((i) => <i key={i} className={`h-1.5 w-1.5 rounded-full ${i < box ? "bg-ok" : "bg-line"}`} />)}</span>
      </div>
      <div className={`flip mb-4 h-[300px] ${flipped ? "flipped" : ""}`}>
        <div className="flip-in">
          <button className="face card flex flex-col rounded-3xl p-[22px] text-left shadow-sm" onClick={() => setFlipped(true)} aria-label={`${C.t} – umdrehen`} tabIndex={flipped ? -1 : 0}>
            <span className="label-mono"><span className="text-accent-text">//</span> Begriff</span>
            <span className="my-auto w-full text-center font-mono text-3xl font-bold">{C.t}</span>
            <span className="w-full text-center text-[13px] text-muted">Tippen zum Umdrehen</span>
          </button>
          <div className="face back card flex flex-col rounded-3xl p-[22px] shadow-sm">
            <span className="label-mono"><span className="text-accent-text">//</span> {C.t}</span>
            <div className="mb-3 mt-2 text-[19px] font-semibold leading-snug">{C.s}</div>
            <div className="text-sm text-muted">{C.a}</div>
            <div className="mt-auto flex gap-2">
              <button className="tap flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]" onClick={() => openTerm(id)} tabIndex={flipped ? 0 : -1}>
                <Icon name="help" size={16} /> Nachfragen
              </button>
              <button className={`tap flex items-center gap-1.5 rounded-full px-3 py-[7px] text-[13px] ${flagged ? "bg-warn-soft text-warn" : "border border-line bg-surface"}`} onClick={() => toggleFlag(id)} aria-pressed={flagged} tabIndex={flipped ? 0 : -1}>
                <Icon name="flag" size={15} filled={flagged} /> {flagged ? "Markiert" : "Markieren"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-2 gap-3 transition-opacity ${flipped ? "" : "pointer-events-none opacity-35"}`}>
        <button className="btn-ghost" onClick={() => rate(false)} disabled={!flipped}>Nochmal</button>
        <button className="btn-primary !bg-ok !text-ok-ink" onClick={() => rate(true)} disabled={!flipped}>Gewusst</button>
      </div>
    </div>
  );
}

function Glossary() {
  const { s, openTerm, toggleFlag } = useApp();
  const [q, setQ] = useState("");
  const all = useMemo(() => Object.keys(CARDS).sort((a, b) => CARDS[a].t.localeCompare(CARDS[b].t, "de")), []);
  const ql = q.trim().toLowerCase();
  const list = all.filter((id) => !ql || CARDS[id].t.toLowerCase().includes(ql) || CARDS[id].s.toLowerCase().includes(ql));
  const groups = LETTERS.map((L) => ({ L, items: list.filter((id) => letterOf(CARDS[id].t) === L) })).filter((g) => g.items.length);
  const has = new Set(groups.map((g) => g.L));

  return (
    <>
      <label className="flex h-[46px] items-center gap-2 rounded-[14px] border-[1.5px] border-line bg-surface px-3 text-muted focus-within:border-accent">
        <Icon name="search" size={18} />
        <input aria-label="Begriff suchen" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Begriff suchen, z. B. API" className="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none" />
        <span className="font-mono text-xs">{list.length}</span>
      </label>
      <div className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 font-mono text-[13px] font-semibold" aria-label="Buchstaben">
        {LETTERS.map((L) => (
          <button key={L} disabled={!has.has(L)} onClick={() => document.getElementById("gl-" + L)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={`grid h-8 w-7 flex-none place-items-center rounded-lg ${has.has(L) ? "text-ink active:bg-accent active:text-accent-ink" : "text-line"}`}>
            {L}
          </button>
        ))}
      </div>
      {!groups.length && <div className="p-7 text-center text-muted">Nichts gefunden.</div>}
      <div className="flex flex-col gap-1.5">
        {groups.map((g) => (
          <div key={g.L} id={"gl-" + g.L} className="flex scroll-mt-20 flex-col gap-1.5">
            <span className="px-0.5 pt-1.5 font-mono text-xs font-bold text-accent-text">{g.L}</span>
            {g.items.map((id) => {
              const on = s.flags.includes(id);
              const box = s.cards[id]?.box || 0;
              return (
                <div key={id} className="card flex items-center gap-2.5 rounded-[14px] px-3 py-2.5">
                  <button className="tap min-w-0 flex-1 text-left" onClick={() => openTerm(id)}>
                    <span className="flex items-center gap-2 font-mono text-sm font-bold">
                      {CARDS[id].t}
                      {box > 0 && <span className="flex gap-[3px]" aria-label={`Stufe ${box}`}>{[0, 1, 2, 3].map((i) => <i key={i} className={`h-1.5 w-1.5 rounded-full ${i < box ? "bg-ok" : "bg-line"}`} />)}</span>}
                    </span>
                    <span className="block truncate text-[13px] text-muted">{CARDS[id].s}</span>
                  </button>
                  <button aria-label={on ? `${CARDS[id].t}: Markierung entfernen` : `${CARDS[id].t} markieren`} aria-pressed={on} onClick={() => toggleFlag(id)}
                    className={`grid h-10 w-10 flex-none place-items-center rounded-[10px] ${on ? "bg-warn-soft text-warn" : "bg-surface2 text-muted"}`}>
                    <Icon name="flag" size={16} filled={on} />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}

function Flagged() {
  const { s, openTerm, toggleFlag } = useApp();
  const [session, setSession] = useState(0);
  if (session) return <Review key={session} ids={s.flags} kind="flags" />;
  if (!s.flags.length) return <Review ids={[]} kind="flags" />;
  return (
    <>
      <button className="btn-primary w-full" onClick={() => setSession(Date.now())}>{s.flags.length} markierte Karten wiederholen</button>
      <div className="flex flex-col gap-1.5">
        {s.flags.map((id) => CARDS[id] && (
          <div key={id} className="card flex items-center gap-2.5 rounded-[14px] px-3 py-2.5">
            <button className="tap min-w-0 flex-1 text-left" onClick={() => openTerm(id)}>
              <span className="font-mono text-sm font-bold">{CARDS[id].t}</span>
              <span className="block truncate text-[13px] text-muted">{CARDS[id].s}</span>
            </button>
            <button aria-label={`${CARDS[id].t}: Markierung entfernen`} onClick={() => toggleFlag(id)} className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-warn-soft text-warn">
              <Icon name="flag" size={16} filled />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
