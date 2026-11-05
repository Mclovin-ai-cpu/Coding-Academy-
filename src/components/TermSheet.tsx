"use client";

import { useState } from "react";
import { CARDS } from "@/data/cards";
import { LESSONS } from "@/data/lessons";
import { useApp } from "@/lib/app";
import { courseOf, lessonOfTerm } from "@/lib/state";
import { Icon } from "./Icon";
import { copyText, Label, Sheet } from "./ui";

const ASK = [
  { k: "a", q: "Wie kann ich mir das vorstellen?", h: "So kannst du es dir vorstellen" },
  { k: "e", q: "Gib mir ein Beispiel", h: "Beispiel aus der Praxis" },
  { k: "w", q: "Warum ist das wichtig?", h: "Warum das für dich wichtig ist" }
] as const;
type K = (typeof ASK)[number]["k"];

export function TermSheet() {
  const { term, openTerm } = useApp();
  return (
    <Sheet open={!!term} onClose={() => openTerm(null)} label="Begriff">
      {term && <TermBody key={term} id={term} />}
    </Sheet>
  );
}

function TermBody({ id }: { id: string }) {
  const { s, openTerm, toggleFlag, go, toast } = useApp();
  const C = CARDS[id];
  const [keys, setKeys] = useState<K[]>(["a"]);
  const [own, setOwn] = useState("");
  const [asked, setAsked] = useState("");
  const lesson = lessonOfTerm(id);
  const flagged = s.flags.includes(id);
  if (!C) return null;

  const ask = () => {
    const q = own.trim().toLowerCase();
    if (!q) return;
    const k: K[] = [];
    if (/vorstell|bild|analog|vergleich|wie kann|wie sieht|aussehen|verstehe nicht|erklär/.test(q)) k.push("a");
    if (/beispiel|praxis|konkret|zeig|wo begegne|z\.\s?b/.test(q)) k.push("e");
    if (/warum|wieso|wichtig|brauch|nutzen|wofür|bringt/.test(q)) k.push("w");
    setKeys(k.length ? k : ["a", "e", "w"]);
    setAsked(own.trim());
  };
  const prompt = `Ich lerne gerade Grundlagen für Vibecoding. Erkläre mir den Begriff „${C.t}“ (${C.s}) einfach und mit einem Alltagsvergleich. Meine Frage: ${asked}`;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <Label>{lesson ? courseOf(lesson).title : "Begriff"}</Label>
          <h2 className="font-mono text-[26px] font-bold leading-tight">{C.t}</h2>
        </div>
        <button
          onClick={() => toggleFlag(id)}
          aria-pressed={flagged}
          className={`tap flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold ${flagged ? "bg-warn-soft text-warn" : "bg-surface2 text-muted"}`}
        >
          <Icon name="flag" size={16} filled={flagged} />
          {flagged ? "Markiert" : "Markieren"}
        </button>
      </div>
      <p className="text-[17px]">{C.s}</p>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] text-muted">Was möchtest du genauer wissen?</span>
        <div className="flex flex-wrap gap-2">
          {ASK.map((a) => {
            const on = keys.length === 1 && keys[0] === a.k && !asked;
            return (
              <button
                key={a.k}
                onClick={() => { setKeys([a.k]); setAsked(""); }}
                className={`tap rounded-full border px-3 py-[7px] text-[13px] ${on ? "border-accent bg-accent font-semibold text-accent-ink" : "border-line bg-surface"}`}
              >
                {a.q}
              </button>
            );
          })}
        </div>
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(); }}>
          <label className="sr-only" htmlFor="askIn">Eigene Frage</label>
          <input id="askIn" value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Eigene Frage stellen …"
            className="min-w-0 flex-1 rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent" />
          <button aria-label="Fragen" className="grid h-12 w-12 flex-none place-items-center rounded-[14px] bg-accent text-accent-ink"><Icon name="arrow" /></button>
        </form>
      </div>

      {keys.map((k) => (
        <div key={k} className="view-in flex flex-col gap-1 rounded-2xl bg-surface2 p-3.5">
          <Label>{ASK.find((a) => a.k === k)!.h}</Label>
          <span>{C[k]}</span>
        </div>
      ))}
      {asked && (
        <div className="view-in rounded-2xl bg-surface2 p-3.5 text-[15px]">
          <Label>Noch Fragen offen?</Label>
          Für freie Fragen kopiert die App eine fertige Frage für Claude in deine Zwischenablage.
          <button className="tap mt-2.5 flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]"
            onClick={() => copyText(prompt, toast, "Kopiert – jetzt in Claude einfügen")}>
            <Icon name="copy" size={16} /> Frage für Claude kopieren
          </button>
        </div>
      )}

      {!!C.r?.length && (
        <div className="flex flex-col gap-2">
          <Label>Hängt zusammen mit</Label>
          <div className="flex flex-wrap gap-2">
            {C.r.map((r) => (
              <button key={r} onClick={() => openTerm(r)}
                className={`tap rounded-[10px] px-2.5 py-1.5 font-mono text-[13px] font-semibold ${s.flags.includes(r) ? "bg-warn-soft text-warn" : "bg-accent-soft text-accent-text"}`}>
                {CARDS[r].t}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-2 flex flex-col gap-2.5">
        {lesson && (
          <button className="btn-ghost w-full" onClick={() => { openTerm(null); go("lernen/" + lesson); }}>
            Zur Lektion: {LESSONS[lesson].title}
          </button>
        )}
        <button className="btn-primary w-full" onClick={() => openTerm(null)}>Verstanden</button>
      </div>
    </div>
  );
}
