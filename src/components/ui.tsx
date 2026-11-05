"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CARDS } from "@/data/cards";
import type { Quiz } from "@/data/types";
import { buzz, useApp } from "@/lib/app";
import { Icon } from "./Icon";

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`label-mono flex items-center gap-1.5 ${className}`}>
      <span className="text-accent-text">//</span>
      {children}
    </div>
  );
}

export function Tag({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "acc" | "ok" | "warn" }) {
  const t = {
    neutral: "bg-surface2 text-muted",
    acc: "bg-accent-soft text-accent-text",
    ok: "bg-ok-soft text-ok",
    warn: "bg-warn-soft text-warn"
  }[tone];
  return <span className={`inline-block rounded-lg px-2 py-[3px] font-mono text-[11px] ${t}`}>{children}</span>;
}

export function Bar({ pct, tone = "grad", h = 8 }: { pct: number; tone?: "grad" | "ok" | "light"; h?: number }) {
  const bg = tone === "ok" ? "bg-ok" : tone === "light" ? "bg-[#5eead4]" : "bg-gradient-to-r from-accent to-ok";
  return (
    <div className={`overflow-hidden rounded-full ${tone === "light" ? "bg-white/15" : "bg-surface2"}`} style={{ height: h }}>
      <div className={`h-full rounded-full ${bg} transition-[width] duration-700`} style={{ width: `${Math.max(0, Math.min(100, pct))}%` }} />
    </div>
  );
}

export function Ring({ pct, size = 64 }: { pct: number; size?: number }) {
  return (
    <div
      className="grid flex-none place-items-center rounded-full"
      style={{ width: size, height: size, background: `conic-gradient(var(--ok) ${pct}%, var(--surface2) 0)` }}
    >
      <span className="grid place-items-center rounded-full bg-surface font-mono text-[13px] font-bold" style={{ width: size - 14, height: size - 14 }}>
        {pct}%
      </span>
    </div>
  );
}

/** Begriff-Chip: antippen öffnet die Karte, die Fahne markiert */
export function TermChip({ id, withFlag = true }: { id: string; withFlag?: boolean }) {
  const { s, openTerm, toggleFlag } = useApp();
  const on = s.flags.includes(id);
  const c = CARDS[id];
  if (!c) return null;
  return (
    <span className={`inline-flex items-stretch overflow-hidden rounded-[10px] font-mono text-[13px] font-semibold ${on ? "bg-warn-soft text-warn" : "bg-accent-soft text-accent-text"}`}>
      <button className="px-2.5 py-[7px] tap" onClick={() => openTerm(id)}>{c.t}</button>
      {withFlag && (
        <button
          className="grid w-8 place-items-center border-l border-current/15"
          aria-label={on ? `${c.t}: Markierung entfernen` : `${c.t} markieren`}
          aria-pressed={on}
          onClick={() => toggleFlag(id)}
        >
          <Icon name="flag" size={14} filled={on} />
        </button>
      )}
    </span>
  );
}

export function Sheet({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: ReactNode; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (open) { const r = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(r); }
    setShow(false);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`} style={{ background: "var(--dim)" }} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={`fixed inset-x-0 bottom-0 z-[51] mx-auto max-h-[88dvh] max-w-[640px] overflow-y-auto rounded-t-[26px] bg-surface px-[18px] pb-[calc(22px+env(safe-area-inset-bottom))] pt-2.5 transition-transform duration-300 ease-out ${show ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mx-auto mb-3.5 mt-1 h-[5px] w-11 rounded-full bg-line" />
        {children}
      </div>
    </>
  );
}

function highlight(code: string, lang: string) {
  const e = code.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
  if (!["html", "css", "js", "jsx"].includes(lang)) return e;
  return e.replace(
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|&lt;!--[\s\S]*?--&gt;|"[^\n"]*?"|&lt;\/?[a-zA-Z][\w-]*|&gt;|\b(?:const|let|function|return|await|async|if|else|import|export|from)\b|#[0-9a-fA-F]{3,6}\b|\b\d+(?:\.\d+)?\b)/g,
    (m) => {
      if (m.startsWith("//") || m.startsWith("/*") || m.startsWith("&lt;!--")) return `<span style="color:#64748b;font-style:italic">${m}</span>`;
      if (m.startsWith('"')) return `<span style="color:#5eead4">${m}</span>`;
      if (m.startsWith("&lt;") || m === "&gt;") return `<span style="color:#f9a8d4">${m}</span>`;
      if (/^[a-z]+$/.test(m)) return `<span style="color:#c4a1ff">${m}</span>`;
      return `<span style="color:#fcd34d">${m}</span>`;
    }
  );
}

export function CodeBlock({ lang, text, action }: { lang: string; text: string; action?: ReactNode }) {
  const lines = highlight(text, lang).split("\n");
  return (
    <div className="my-3 overflow-hidden rounded-2xl bg-code font-mono text-[13px] text-code-text">
      <div className="flex items-center gap-1.5 border-b border-white/[.07] px-3 py-2.5 text-[11px] text-code-muted">
        <span className="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1">{lang}</span>
        {action}
      </div>
      <pre className="overflow-x-auto py-3 leading-[1.65]">
        {lines.map((l, i) => (
          <span key={i} className="block whitespace-pre pr-3.5">
            <span className="inline-block w-[34px] select-none pr-3 text-right text-[#475569]">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: l || " " }} />
          </span>
        ))}
      </pre>
    </div>
  );
}

/** Eine Quizfrage mit Antwortoptionen. onAnswer(firstTry) wird bei richtiger Antwort aufgerufen. */
export function QuizQuestion({ q, onCorrect }: { q: Quiz; onCorrect: (firstTry: boolean) => void }) {
  const [wrong, setWrong] = useState<number | null>(null);
  const [tries, setTries] = useState(0);
  const [right, setRight] = useState(false); // Zurücksetzen per key={…} beim Aufrufer
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        {q.a.map((a, i) => {
          const isRight = right && i === q.c;
          const isWrong = wrong === i && !right;
          return (
            <button
              key={i + a}
              disabled={right}
              onClick={() => {
                if (i === q.c) { setRight(true); buzz(20); onCorrect(tries === 0); }
                else { setWrong(null); requestAnimationFrame(() => setWrong(i)); setTries((t) => t + 1); buzz([30, 40, 30]); }
              }}
              className={`tap w-full rounded-2xl border-2 px-4 py-3.5 text-left text-base transition-colors ${isRight ? "border-ok bg-ok-soft" : isWrong ? "shake border-err bg-err-soft" : "border-line bg-surface"}`}
            >
              {a}
            </button>
          );
        })}
      </div>
      {right ? (
        <div className="view-in mt-3 rounded-2xl bg-ok-soft p-3.5 text-[15px]"><b>Richtig!</b> {q.why}</div>
      ) : wrong !== null ? (
        <div className="view-in mt-3 rounded-2xl bg-err-soft p-3.5 text-[15px]"><b>Noch nicht.</b> Versuch es nochmal, du schaffst das.</div>
      ) : null}
    </div>
  );
}

export async function copyText(text: string, toast: (m: string) => void, ok = "Kopiert") {
  try { await navigator.clipboard.writeText(text); toast(ok); } catch { toast("Kopieren nicht möglich"); }
}
