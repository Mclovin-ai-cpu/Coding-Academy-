"use client";

import { useState } from "react";
import { useAccount } from "@/lib/account";
import { useApp } from "@/lib/app";
import { Icon } from "./Icon";

const field = "w-full rounded-[14px] border-[1.5px] border-line bg-surface2 px-3.5 py-3 outline-none focus:border-accent";
const STATUS: Record<string, string> = { aus: "nicht verbunden", "lädt": "lädt …", synchron: "synchronisiert", speichert: "speichert …", fehler: "Abgleich fehlgeschlagen" };

export function AccountCard() {
  const acc = useAccount();
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!acc.configured) {
    return (
      <div className="card flex flex-col gap-1.5 p-4">
        <b>Konto</b>
        <span className="text-[13px] text-muted">Das Login ist in dieser Version vorbereitet, aber noch nicht mit Supabase verbunden. Sobald die Zugangsdaten bei Vercel hinterlegt sind, erscheint hier die Anmeldung.</span>
      </div>
    );
  }

  if (acc.email) {
    return (
      <div className="card flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${acc.status === "fehler" ? "bg-err-soft text-err" : "bg-ok-soft text-ok"}`}><Icon name="check" /></span>
          <div className="min-w-0 flex-1">
            <b>Angemeldet</b>
            <span className="block truncate text-[13px] text-muted">{acc.email}</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-surface2 px-3 py-2.5 text-[13px]">
          <span>Fortschritt: <b>{STATUS[acc.status]}</b></span>
          {acc.lastSync && <span className="font-mono text-muted">{new Date(acc.lastSync).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</span>}
        </div>
        <span className="text-[13px] text-muted">
          Dein Fortschritt wird automatisch in deinem Konto gespeichert und ist auf jedem Gerät da, auf dem du dich anmeldest.
          {acc.aiEnabled ? " Claude kannst du direkt in Begriffen und Projekten fragen." : " Die KI-Funktion ist auf dem Server noch nicht eingerichtet."}
        </span>
        <button className="btn-ghost" onClick={acc.signOut}>Abmelden</button>
      </div>
    );
  }

  const send = async () => {
    const e = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(e)) { setErr("Bitte eine gültige E-Mail-Adresse eingeben."); return; }
    setBusy(true); setErr("");
    const r = await acc.sendCode(e);
    setBusy(false);
    if (r) setErr(r); else { setStep("code"); toast("Code ist unterwegs – schau in dein Postfach"); }
  };
  const verify = async () => {
    const c = code.replace(/\s/g, "");
    if (c.length < 6) { setErr("Bitte den Code aus der E-Mail eingeben."); return; }
    setBusy(true); setErr("");
    const r = await acc.verifyCode(email.trim(), c);
    setBusy(false);
    if (r) setErr("Der Code passt nicht oder ist abgelaufen."); else toast("Angemeldet");
  };

  return (
    <div className="card flex flex-col gap-2.5 p-4">
      <b>Konto anlegen oder anmelden</b>
      <span className="text-[13px] text-muted">Ohne Passwort: Du bekommst einen Code per E-Mail. Danach liegt dein Fortschritt sicher im Konto und ist auf allen Geräten da.</span>
      {step === "email" ? (
        <form className="flex flex-col gap-2.5" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <label htmlFor="accEmail" className="text-[13px] font-semibold">E-Mail-Adresse</label>
          <input id="accEmail" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="du@beispiel.de" className={field} />
          <button className="btn-primary" disabled={busy}>{busy ? "Sende …" : "Code per E-Mail senden"}</button>
        </form>
      ) : (
        <form className="flex flex-col gap-2.5" onSubmit={(e) => { e.preventDefault(); verify(); }}>
          <label htmlFor="accCode" className="text-[13px] font-semibold">Code aus der E-Mail an {email}</label>
          <input id="accCode" inputMode="numeric" autoComplete="one-time-code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" maxLength={10} className={field + " text-center font-mono text-xl tracking-[.3em]"} />
          <button className="btn-primary" disabled={busy}>{busy ? "Prüfe …" : "Anmelden"}</button>
          <button type="button" className="text-sm font-semibold text-accent-text" onClick={() => { setStep("email"); setCode(""); setErr(""); }}>Andere E-Mail oder Code neu senden</button>
        </form>
      )}
      {err && <div className="rounded-xl bg-err-soft p-3 text-sm">{err}</div>}
    </div>
  );
}
