"use client";

import { useRef, useState } from "react";
import { useApp } from "@/lib/app";
import { BADGES, doneCount, fresh, level, levelPct, normalize, streak, today } from "@/lib/state";
import { Bar, Label } from "../ui";

export function Profile() {
  const { s, update, toast, go } = useApp();
  const [sure, setSure] = useState(false);
  const file = useRef<HTMLInputElement>(null);
  const learned = Object.values(s.cards).filter((c) => c.box >= 2).length;
  const missions = Object.values(s.missions).filter((m) => m.done).length;

  const stats: [string | number, string][] = [
    [streak(s), "Tage Serie"], [doneCount(s), "Lektionen"], [learned, "Karten sicher"],
    [missions, "Missionen"], [s.projects.length, "Projekte"], [s.todosDone, "To-dos"]
  ];

  return (
    <div className="flex flex-col gap-3.5">
      <section className="flex flex-col items-center gap-1 rounded-[20px] bg-code p-5 text-center text-code-text">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white font-mono text-2xl font-bold text-[#0f172a]">{(s.name.trim()[0] || "?").toUpperCase()}</span>
        <h1 className="mt-2 text-[22px] font-bold">{s.name || "Dein Profil"} · Level {level(s)}</h1>
        <span className="font-mono text-sm text-code-muted">{s.xp} XP gesamt</span>
        <div className="mt-3 w-full"><Bar pct={levelPct(s)} tone="light" /></div>
        <span className="text-[13px] text-code-muted">{200 - (s.xp % 200)} XP bis Level {level(s) + 1}</span>
      </section>

      <div className="grid grid-cols-3 gap-2.5">
        {stats.map(([v, l]) => (
          <div key={l} className="card rounded-2xl px-2.5 py-3 text-center">
            <div className="font-mono text-[21px] font-bold">{v}</div>
            <div className="text-xs text-muted">{l}</div>
          </div>
        ))}
      </div>

      <div className="mx-0.5 mt-2 flex items-center justify-between"><h2 className="text-lg font-bold">Abzeichen</h2><span className="font-mono text-[13px] text-muted">{s.badges.length}/{BADGES.length}</span></div>
      <div className="grid grid-cols-3 gap-2.5">
        {BADGES.map((b) => {
          const on = s.badges.includes(b.id);
          return (
            <div key={b.id} className={`rounded-[18px] px-1.5 py-3.5 text-center text-xs ${on ? "bg-accent-soft" : "bg-surface2 text-muted"}`}>
              <span className={`mb-1 block font-mono text-lg font-bold ${on ? "text-accent-text" : "opacity-40"}`}>{b.code}</span>
              {b.t}
            </div>
          );
        })}
      </div>

      <div className="mx-0.5 mt-2"><h2 className="text-lg font-bold">Einstellungen</h2></div>
      <div className="card flex flex-col gap-4 p-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block font-bold">Dein Name</label>
          <input id="name" value={s.name} onChange={(e) => update((d) => { d.name = e.target.value.slice(0, 30); })} placeholder="Für die Begrüßung"
            className="w-full rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent" />
        </div>
        <div>
          <b>Darstellung</b>
          <div className="text-[13px] text-muted">Hell, dunkel oder wie dein Gerät</div>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-[14px] bg-surface2 p-1">
            {([["light", "Hell"], ["dark", "Dunkel"], ["system", "System"]] as const).map(([k, l]) => (
              <button key={k} aria-pressed={s.theme === k} onClick={() => update((d) => { d.theme = k; })}
                className={`rounded-[11px] py-2.5 text-sm font-semibold ${s.theme === k ? "bg-surface text-ink shadow-[0_1px_3px_rgba(15,23,42,.12)]" : "text-muted"}`}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <b>Daten sichern</b>
          <div className="text-[13px] text-muted">Dein Fortschritt liegt nur in diesem Browser. Exportiere ihn als Datei oder importiere ihn auf einem anderen Gerät (auch Backups aus Version 2).</div>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            <button className="btn-ghost" onClick={() => {
              const blob = new Blob([JSON.stringify(s, null, 2)], { type: "application/json" });
              const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `coding-academy-backup-${today()}.json`; a.click();
              setTimeout(() => URL.revokeObjectURL(a.href), 2000); toast("Backup erstellt");
            }}>Export</button>
            <button className="btn-ghost" onClick={() => file.current?.click()}>Import</button>
          </div>
          <input ref={file} type="file" accept="application/json" hidden onChange={(e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const r = new FileReader();
            r.onload = () => { try { const n = normalize(JSON.parse(String(r.result))); update((d) => Object.assign(d, n)); toast("Import erfolgreich"); } catch { toast("Datei konnte nicht gelesen werden"); } };
            r.readAsText(f); e.target.value = "";
          }} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1"><b>Zurücksetzen</b><div className="text-[13px] text-muted">Löscht Fortschritt, Karten und Projekte auf diesem Gerät</div></div>
          <button className="btn-ghost !bg-err-soft !px-3.5 !py-2.5 !text-err" onClick={() => {
            if (!sure) { setSure(true); return; }
            update((d) => { const th = d.theme, nm = d.name; Object.assign(d, fresh(), { theme: th, name: nm, days: [today()] }); });
            toast("Zurückgesetzt"); go("home");
          }}>{sure ? "Sicher?" : "Reset"}</button>
        </div>
      </div>
      <Label className="justify-center">Coding Academy · Version 3.6 Test</Label>
    </div>
  );
}
