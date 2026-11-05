"use client";

import { useState } from "react";
import { useAccount } from "@/lib/account";
import { useApp } from "@/lib/app";
import { Icon } from "./Icon";
import { Label } from "./ui";

/** Frage direkt an Claude (Serverfunktion /api/ask). Gibt null zurück, wenn KI nicht verfügbar ist. */
export async function askClaude(token: string | null, kind: "term" | "project", question: string, context: string) {
  const r = await fetch("/api/ask", {
    method: "POST",
    headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify({ kind, question, context })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Fehler bei der Anfrage");
  return String(j.answer || "");
}

/** Hinweis bzw. Knopf, je nachdem ob Konto/KI eingerichtet sind */
export function useClaude() {
  const acc = useAccount();
  return { available: !!acc.email && acc.aiEnabled, needsLogin: acc.configured && !acc.email, token: acc.token };
}

/** Eigenständiger Frage-Block, z. B. im Projekt */
export function AskClaudeCard({ kind, context, title, placeholder, onSave }: { kind: "term" | "project"; context: string; title: string; placeholder: string; onSave?: (text: string) => void }) {
  const { go, toast } = useApp();
  const { available, needsLogin, token } = useClaude();
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!available) {
    if (!needsLogin) return null;
    return (
      <button className="card tap flex items-center gap-3 p-4 text-left" onClick={() => go("profil")}>
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-accent-soft font-mono text-xs font-bold text-accent-text">KI</span>
        <span className="flex-1"><b>{title}</b><span className="block text-[13px] text-muted">Melde dich im Profil an, um Claude direkt aus der App zu fragen.</span></span>
        <Icon name="arrow" />
      </button>
    );
  }

  const send = async () => {
    if (!q.trim() || busy) return;
    setBusy(true); setErr(""); setAnswer("");
    try { setAnswer(await askClaude(await token(), kind, q.trim(), context)); }
    catch (e) { setErr((e as Error).message); }
    setBusy(false);
  };

  return (
    <div className="card flex flex-col gap-2.5 p-4">
      <Label>{title}</Label>
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label className="sr-only" htmlFor={"ask-" + kind}>Frage an Claude</label>
        <input id={"ask-" + kind} value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder}
          className="min-w-0 flex-1 rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent" />
        <button aria-label="Claude fragen" disabled={busy} className="grid h-12 w-12 flex-none place-items-center rounded-[14px] bg-accent text-accent-ink disabled:opacity-50">
          {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : <Icon name="arrow" />}
        </button>
      </form>
      {err && <div className="rounded-xl bg-err-soft p-3 text-sm">{err}</div>}
      {answer && (
        <div className="view-in whitespace-pre-wrap rounded-2xl bg-surface2 p-3.5 text-[15px]">
          {answer}
          {onSave && <button className="mt-2.5 flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-[7px] text-[13px]" onClick={() => { onSave(`Frage: ${q}\n\n${answer}`); toast("Als Notiz gespeichert"); }}><Icon name="check" size={15} /> Als Notiz speichern</button>}
        </div>
      )}
    </div>
  );
}
