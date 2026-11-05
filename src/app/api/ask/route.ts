/*
 * Serverfunktion: Fragen an Claude
 * - Läuft nur auf dem Server (Vercel). Der API-Key steht in den Environment Variables und erreicht nie den Browser.
 * - Nur angemeldete Nutzer dürfen fragen (Prüfung des Supabase-Logins), damit niemand Fremdes Kosten verursacht.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || "";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";
const ANTHROPIC_URL = (process.env.ANTHROPIC_BASE_URL || "https://api.anthropic.com").replace(/\/$/, "");
const ALLOWED = (process.env.ALLOWED_EMAILS || "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);

const SYSTEM = `Du bist Tutor in der „Coding Academy“, einer Lern-App für Einsteiger ins Vibecoding.
Die lernende Person hat einen BWL- und Marketing-Hintergrund und will eigene Websites und Apps mit KI bauen.
Antworte auf Deutsch, kurz und konkret (höchstens etwa 150 Wörter), mit einem Alltagsvergleich, wenn es hilft.
Erkläre Fachbegriffe beim ersten Auftreten in wenigen Worten. Keine Rechts- oder Steuerberatung; weise bei solchen Fragen auf Fachleute hin.`;

const json = (body: unknown, status = 200) => Response.json(body, { status });

/** GET: Ist die KI-Funktion eingerichtet? (für die Anzeige in der App) */
export async function GET() {
  return json({ ai: !!(ANTHROPIC_KEY && SUPABASE_URL && SUPABASE_KEY) });
}

export async function POST(req: Request) {
  if (!ANTHROPIC_KEY || !SUPABASE_URL || !SUPABASE_KEY) return json({ error: "Die KI-Funktion ist noch nicht eingerichtet." }, 503);

  // 1. Login prüfen
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) return json({ error: "Bitte zuerst anmelden." }, 401);
  const u = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { apikey: SUPABASE_KEY, Authorization: auth } });
  if (!u.ok) return json({ error: "Anmeldung abgelaufen. Bitte neu anmelden." }, 401);
  const user = (await u.json()) as { email?: string };
  if (ALLOWED.length && !ALLOWED.includes((user.email || "").toLowerCase())) return json({ error: "Dieses Konto ist für die KI-Funktion nicht freigeschaltet." }, 403);

  // 2. Anfrage lesen und begrenzen
  let body: { kind?: string; question?: string; context?: string };
  try { body = await req.json(); } catch { return json({ error: "Ungültige Anfrage." }, 400); }
  const question = String(body.question || "").trim().slice(0, 1000);
  const context = String(body.context || "").trim().slice(0, 4000);
  if (!question) return json({ error: "Bitte eine Frage eingeben." }, 400);
  const intro = body.kind === "project" ? "Projekt der lernenden Person:" : "Begriff, um den es geht:";

  // 3. Claude fragen
  const r = await fetch(`${ANTHROPIC_URL}/v1/messages`, {
    method: "POST",
    headers: { "x-api-key": ANTHROPIC_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 700,
      system: SYSTEM,
      messages: [{ role: "user", content: `${intro}\n${context}\n\nFrage: ${question}` }]
    })
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => "");
    console.error("Anthropic-Fehler", r.status, detail.slice(0, 300));
    return json({ error: r.status === 429 ? "Gerade zu viele Anfragen. Bitte kurz warten." : "Claude ist gerade nicht erreichbar." }, 502);
  }
  const data = (await r.json()) as { content?: { type: string; text?: string }[] };
  const answer = (data.content || []).filter((c) => c.type === "text").map((c) => c.text).join("\n").trim();
  return json({ answer: answer || "Keine Antwort erhalten." });
}
