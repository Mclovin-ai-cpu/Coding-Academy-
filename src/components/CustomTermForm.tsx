"use client";

import { useState } from "react";
import { useApp } from "@/lib/app";
import { cardsOf, today, uid } from "@/lib/state";
import { Icon } from "./Icon";
import { copyText } from "./ui";

const field = "w-full rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent";

/** Formular zum Anlegen oder Bearbeiten eines eigenen Glossar-Begriffs */
export function CustomTermForm({ editId, onDone }: { editId?: string; onDone: (id?: string) => void }) {
  const { s, update, toast, addXP, openTerm } = useApp();
  const ex = editId ? s.customCards[editId] : undefined;
  const [t, setT] = useState(ex?.t || "");
  const [sh, setSh] = useState(ex?.s || "");
  const [a, setA] = useState(ex?.a || "");
  const [e, setE] = useState(ex?.e || "");
  const [w, setW] = useState(ex?.w || "");
  const [sure, setSure] = useState(false);

  const save = () => {
    const title = t.trim();
    if (!title) { toast("Bitte den Begriff eintragen"); return; }
    if (!sh.trim()) { toast("Bitte kurz erklären, was er bedeutet"); return; }
    const all = cardsOf(s);
    const dup = Object.entries(all).find(([id, c]) => id !== editId && c.t.toLowerCase() === title.toLowerCase());
    if (dup) { toast("Den Begriff gibt es schon"); onDone(); openTerm(dup[0]); return; }
    const id = editId || "eigen-" + uid();
    update((d) => {
      d.customCards[id] = { t: title, s: sh.trim(), a: a.trim(), e: e.trim(), w: w.trim(), r: ex?.r || [], created: ex?.created || today() };
    });
    if (editId) toast("Gespeichert");
    else addXP(5, "Begriff hinzugefügt");
    onDone(id);
  };

  const remove = () => {
    if (!sure) { setSure(true); return; }
    update((d) => {
      delete d.customCards[editId!];
      delete d.cards[editId!];
      d.flags = d.flags.filter((x) => x !== editId);
    });
    toast("Begriff gelöscht");
    onDone();
  };

  const prompt = `Ich lerne Grundlagen für Vibecoding und möchte den Begriff „${t.trim() || "[BEGRIFF]"}“ in mein Glossar aufnehmen. Erkläre ihn für Einsteiger in vier kurzen Teilen:\n1. Kurz erklärt (1 Satz)\n2. So kann ich es mir vorstellen (Alltagsvergleich)\n3. Beispiel aus der Praxis\n4. Warum das für mich als Gründer wichtig ist`;

  return (
    <div className="flex flex-col">
      <h2 className="mb-1 text-xl font-bold">{editId ? "Begriff bearbeiten" : "Eigenen Begriff hinzufügen"}</h2>
      <p className="text-[13px] text-muted">Pflicht sind nur Begriff und Kurzerklärung. Der Rest hilft beim Nachfragen auf der Karte.</p>

      <label htmlFor="ct" className="mb-1.5 mt-3 text-[13px] font-semibold">Begriff</label>
      <input id="ct" className={field + " font-mono"} value={t} onChange={(x) => setT(x.target.value)} placeholder="z. B. Middleware" maxLength={60} />

      <label htmlFor="cs" className="mb-1.5 mt-3 text-[13px] font-semibold">Kurz erklärt</label>
      <textarea id="cs" className={field + " min-h-[64px]"} value={sh} onChange={(x) => setSh(x.target.value)} placeholder="Was bedeutet das in einem Satz?" />

      <button type="button" className="mt-3 flex w-fit items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]"
        onClick={() => copyText(prompt, toast, "Frage kopiert – Antwort von Claude hier einfügen")}>
        <Icon name="copy" size={15} /> Erklärung bei Claude holen
      </button>

      <label htmlFor="ca" className="mb-1.5 mt-3 text-[13px] font-semibold">So kann ich es mir vorstellen <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="ca" className={field + " min-h-[56px]"} value={a} onChange={(x) => setA(x.target.value)} placeholder="Ein Vergleich aus dem Alltag" />
      <label htmlFor="ce" className="mb-1.5 mt-3 text-[13px] font-semibold">Beispiel <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="ce" className={field + " min-h-[56px]"} value={e} onChange={(x) => setE(x.target.value)} placeholder="Wo begegnet mir das?" />
      <label htmlFor="cw" className="mb-1.5 mt-3 text-[13px] font-semibold">Warum wichtig <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="cw" className={field + " min-h-[56px]"} value={w} onChange={(x) => setW(x.target.value)} placeholder="Was bringt mir das Wissen?" />

      <div className="mt-5 grid gap-2.5">
        <button className="btn-primary" onClick={save}>{editId ? "Speichern" : "Zum Glossar hinzufügen"}</button>
        {editId ? (
          <button className="btn-ghost !bg-err-soft !text-err" onClick={remove}><Icon name="trash" size={18} /> {sure ? "Wirklich löschen? Nochmal tippen" : "Begriff löschen"}</button>
        ) : (
          <button className="btn-ghost" onClick={() => onDone()}>Abbrechen</button>
        )}
      </div>
    </div>
  );
}
