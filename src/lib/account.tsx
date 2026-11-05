"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Sheet } from "@/components/ui";
import { useApp } from "./app";
import { doneCount, normalize, type State } from "./state";

/*
 * Konto & Abgleich
 * - Login per E-Mail-Code (funktioniert auch in der Home-Bildschirm-App, weil kein Link-Wechsel nötig ist)
 * - Der komplette Fortschritt liegt pro Nutzer als JSON in der Tabelle academy_state (geschützt mit RLS)
 */

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const KEY_ = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const accountConfigured = !!(URL_ && KEY_);

let client: SupabaseClient | null = null;
function sb() {
  if (!accountConfigured) return null;
  if (!client) client = createClient(URL_, KEY_, { auth: { flowType: "pkce", persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, storageKey: "codingAcademy.auth" } });
  return client;
}

const SYNC_KEY = "codingAcademy.sync";
type SyncMeta = { userId: string; lastSyncedAt: number };
const readMeta = (): SyncMeta | null => { try { return JSON.parse(localStorage.getItem(SYNC_KEY) || "null"); } catch { return null; } };
const writeMeta = (m: SyncMeta | null) => { try { m ? localStorage.setItem(SYNC_KEY, JSON.stringify(m)) : localStorage.removeItem(SYNC_KEY); } catch {} };

export type SyncStatus = "aus" | "lädt" | "synchron" | "speichert" | "fehler";

type Ctx = {
  configured: boolean;
  email: string | null;
  status: SyncStatus;
  lastSync: number | null;
  aiEnabled: boolean;
  sendCode: (email: string) => Promise<string | null>;
  verifyCode: (email: string, code: string) => Promise<string | null>;
  signOut: () => Promise<void>;
  token: () => Promise<string | null>;
};
const AccountCtx = createContext<Ctx | null>(null);
export const useAccount = () => useContext(AccountCtx)!;

type Remote = { data: State; saved_at: number };
const hasProgress = (s: State) => s.xp > 0 || s.projects.length > 0 || doneCount(s) > 0 || Object.keys(s.customCards).length > 0;

export function AccountProvider({ children }: { children: ReactNode }) {
  const { s, replace, toast } = useApp();
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SyncStatus>("aus");
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [conflict, setConflict] = useState<null | { remote: Remote }>(null);
  const ready = useRef(false); // erst nach dem ersten Abgleich hochladen
  const sRef = useRef(s);
  sRef.current = s;

  // Sitzung beobachten
  useEffect(() => {
    const c = sb();
    if (!c) return;
    c.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = c.auth.onAuthStateChange((_e, sess) => setSession(sess));
    // Login-Link (PKCE) hinterlässt ?code= in der Adresse – aufräumen
    if (window.location.search.includes("code=")) history.replaceState(null, "", window.location.pathname + window.location.hash);
    return () => data.subscription.unsubscribe();
  }, []);

  // Ist die KI-Funktion auf dem Server eingerichtet?
  useEffect(() => {
    if (!session) { setAiEnabled(false); return; }
    fetch("/api/ask").then((r) => r.json()).then((j) => setAiEnabled(!!j.ai)).catch(() => setAiEnabled(false));
  }, [session]);

  const upload = useCallback(async (state: State, userId: string) => {
    const c = sb(); if (!c) return;
    setStatus("speichert");
    const saved_at = state.savedAt || Date.now();
    const { error } = await c.from("academy_state").upsert({ user_id: userId, data: state, saved_at, updated_at: new Date().toISOString() });
    if (error) { setStatus("fehler"); return; }
    writeMeta({ userId, lastSyncedAt: saved_at });
    setLastSync(Date.now());
    setStatus("synchron");
  }, []);

  const applyRemote = useCallback((remote: Remote, userId: string) => {
    const n = normalize(remote.data);
    n.theme = sRef.current.theme; // Darstellung bleibt pro Gerät
    n.savedAt = remote.saved_at;
    replace(n);
    writeMeta({ userId, lastSyncedAt: remote.saved_at });
    setLastSync(Date.now());
    setStatus("synchron");
  }, [replace]);

  // Erster Abgleich nach dem Login bzw. App-Start
  useEffect(() => {
    const c = sb();
    const userId = session?.user.id;
    ready.current = false;
    if (!c || !userId) { setStatus("aus"); return; }
    let cancelled = false;
    (async () => {
      setStatus("lädt");
      const { data, error } = await c.from("academy_state").select("data, saved_at").eq("user_id", userId).maybeSingle();
      if (cancelled) return;
      if (error) { setStatus("fehler"); toast("Konto: Abgleich fehlgeschlagen"); return; }
      const local = sRef.current;
      const meta = readMeta();
      const known = meta?.userId === userId ? meta.lastSyncedAt : 0;
      const localChanged = (local.savedAt || 0) > known;
      if (!data) { await upload(local, userId); ready.current = true; return; }
      const remote = data as Remote;
      const remoteChanged = remote.saved_at > known;
      if (!remoteChanged) { if (localChanged) await upload(local, userId); else setStatus("synchron"); setLastSync(Date.now()); ready.current = true; return; }
      if (!localChanged || !hasProgress(local)) { applyRemote(remote, userId); toast("Fortschritt vom Konto geladen"); ready.current = true; return; }
      setConflict({ remote }); // beide Seiten haben sich geändert: nachfragen
    })();
    return () => { cancelled = true; };
  }, [session?.user.id, upload, applyRemote, toast]);

  // Änderungen automatisch hochladen (gebündelt)
  useEffect(() => {
    const userId = session?.user.id;
    if (!userId || !ready.current || conflict) return;
    const meta = readMeta();
    if (meta?.userId === userId && (s.savedAt || 0) <= meta.lastSyncedAt) return;
    const t = setTimeout(() => upload(sRef.current, userId), 1500);
    return () => clearTimeout(t);
  }, [s, session?.user.id, conflict, upload]);

  const sendCode = useCallback(async (email: string) => {
    const c = sb(); if (!c) return "Konto ist noch nicht eingerichtet.";
    const { error } = await c.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: window.location.origin + window.location.pathname } });
    return error ? error.message : null;
  }, []);
  const verifyCode = useCallback(async (email: string, code: string) => {
    const c = sb(); if (!c) return "Konto ist noch nicht eingerichtet.";
    const { error } = await c.auth.verifyOtp({ email, token: code, type: "email" });
    return error ? error.message : null;
  }, []);
  const signOut = useCallback(async () => {
    await sb()?.auth.signOut();
    writeMeta(null);
    setStatus("aus");
    toast("Abgemeldet – dein Fortschritt bleibt auf diesem Gerät");
  }, [toast]);
  const token = useCallback(async () => (await sb()?.auth.getSession())?.data.session?.access_token || null, []);

  const resolve = async (useRemote: boolean) => {
    const userId = session!.user.id;
    if (useRemote) applyRemote(conflict!.remote, userId);
    else await upload(sRef.current, userId);
    setConflict(null);
    ready.current = true;
  };

  return (
    <AccountCtx.Provider value={{ configured: accountConfigured, email: session?.user.email || null, status, lastSync, aiEnabled, sendCode, verifyCode, signOut, token }}>
      {children}
      <Sheet open={!!conflict} onClose={() => {}} label="Welchen Stand behalten?">
        {conflict && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Welchen Stand möchtest du behalten?</h2>
            <p className="text-[15px] text-muted">Auf diesem Gerät und in deinem Konto gibt es unterschiedliche Fortschritte.</p>
            <div className="grid grid-cols-2 gap-2.5 text-center text-sm">
              {[["Dieses Gerät", sRef.current], ["Konto", normalize(conflict.remote.data)]].map(([label, st]) => {
                const x = st as State;
                return (
                  <div key={label as string} className="card p-3">
                    <b className="block">{label as string}</b>
                    {x.xp} XP · {doneCount(x)} Lektionen
                    <span className="block text-muted">{x.projects.length ? x.projects.map((p) => p.name).slice(0, 3).join(", ") : "keine Projekte"}</span>
                  </div>
                );
              })}
            </div>
            <button className="btn-primary" onClick={() => resolve(true)}>Stand aus dem Konto laden</button>
            <button className="btn-ghost" onClick={() => resolve(false)}>Stand dieses Geräts ins Konto übernehmen</button>
            <p className="text-[13px] text-muted">Tipp: Vorher unter Profil › Export sichern, wenn du unsicher bist.</p>
          </div>
        )}
      </Sheet>
    </AccountCtx.Provider>
  );
}
