"use client";

import { LESSONS } from "@/data/lessons";
import { MISSION_BY_ID } from "@/data/missions";
import { AccountProvider, useAccount } from "@/lib/account";
import { AppProvider, buzz, useApp } from "@/lib/app";
import { level } from "@/lib/state";
import { Icon } from "./Icon";
import { TermSheet } from "./TermSheet";
import { Cards } from "./views/Cards";
import { Home } from "./views/Home";
import { Learn } from "./views/Learn";
import { LessonView } from "./views/Lesson";
import { MissionView } from "./views/Mission";
import { Practice } from "./views/Practice";
import { Profile } from "./views/Profile";
import { ProjectView } from "./views/Project";
import { Projects } from "./views/Projects";

const TABS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "lernen", label: "Lernen", icon: "learn" },
  { id: "karten", label: "Karten", icon: "cards" },
  { id: "praxis", label: "Praxis", icon: "tool" },
  { id: "projekte", label: "Projekte", icon: "folder" }
];

export default function Shell() {
  return (
    <AppProvider>
      {(ready) =>
        ready ? (
          <AccountProvider><Frame /></AccountProvider>
        ) : (
          <div className="grid min-h-dvh place-items-center font-mono text-muted">
            <span>
              <span className="text-accent-text">~/</span>academy<span className="cursor-blink ml-1 inline-block h-4 w-2 bg-accent align-[-2px]" />
            </span>
          </div>
        )
      }
    </AppProvider>
  );
}

function Frame() {
  const { s, route, go, update } = useApp();
  const acc = useAccount();
  const [tab, sub] = route.split("/");
  const lessonOpen = tab === "lernen" && sub && LESSONS[sub];
  const missionOpen = tab === "praxis" && sub && MISSION_BY_ID[sub];
  const projectOpen = tab === "projekte" && sub;
  const proj = projectOpen ? s.projects.find((p) => p.id === sub) : null;
  const pathLabel =
    tab === "projekte" && proj ? "projekte/" + proj.name.toLowerCase().replace(/\s+/g, "-").slice(0, 18) :
    tab === "praxis" && missionOpen ? "praxis/mission" : route;
  const dark = s.theme === "dark" || (s.theme === "system" && typeof window !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches);
  const initial = (s.name.trim()[0] || "?").toUpperCase();

  let view;
  if (lessonOpen) view = <LessonView key={sub} id={sub} />;
  else if (missionOpen) view = <MissionView key={sub} id={sub} />;
  else if (projectOpen) view = <ProjectView key={sub} id={sub} />;
  else if (tab === "lernen") view = <Learn />;
  else if (tab === "karten") view = <Cards mode={sub} />;
  else if (tab === "praxis") view = <Practice />;
  else if (tab === "projekte") view = <Projects />;
  else if (tab === "profil") view = <Profile />;
  else view = <Home />;

  return (
    <>
      {!lessonOpen && (
        <header className="sticky top-0 z-20 border-b border-line backdrop-blur-md" style={{ background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}>
          <div className="mx-auto flex max-w-[640px] items-center gap-2 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+12px)]">
            <div className="min-w-0 flex-1 truncate font-mono text-[15px] font-bold">
              <span className="text-accent-text">~/</span>{pathLabel}
              <span className="cursor-blink ml-[3px] inline-block h-[15px] w-2 bg-accent align-[-2px]" />
            </div>
            <span className="rounded-full bg-accent-soft px-2.5 py-1.5 font-mono text-xs font-bold text-accent-text">Lv {level(s)} · {s.xp} XP</span>
            <button
              aria-label={dark ? "Hell anzeigen" : "Dunkel anzeigen"}
              onClick={() => { update((d) => { d.theme = dark ? "light" : "dark"; }); buzz(12); }}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface"
            >
              <Icon name={dark ? "sun" : "moon"} size={18} />
            </button>
            <button aria-label={acc.email ? `Profil öffnen, angemeldet als ${acc.email}` : "Profil öffnen"} onClick={() => go("profil")}
              className={`relative grid h-10 w-10 place-items-center rounded-full font-mono text-[15px] font-bold ${tab === "profil" ? "bg-accent text-accent-ink" : "bg-ink text-bg"}`}>
              {acc.email ? (s.name.trim()[0] || acc.email[0]).toUpperCase() : initial}
              {acc.email && <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${acc.status === "fehler" ? "bg-err" : "bg-ok"}`} aria-hidden="true" />}
            </button>
          </div>
        </header>
      )}
      <main className={`view-in mx-auto max-w-[640px] px-4 pt-4 ${lessonOpen ? "pb-8" : "pb-[calc(96px+env(safe-area-inset-bottom))]"}`} key={route}>
        {view}
      </main>
      {!lessonOpen && (
        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-nav pb-[calc(8px+env(safe-area-inset-bottom))] pt-2" aria-label="Hauptnavigation">
          <div className="mx-auto flex max-w-[640px] justify-around px-1.5">
            {TABS.map((t) => {
              const on = tab === t.id;
              return (
                <button key={t.id} onClick={() => go(t.id)} aria-current={on ? "page" : undefined}
                  className={`relative flex min-w-[60px] flex-col items-center gap-0.5 rounded-xl px-1 py-1 text-[11px] ${on ? "font-semibold text-accent-text" : "text-muted"}`}>
                  {on && <span className="absolute -top-2 h-[3px] w-[22px] rounded-full bg-accent" />}
                  <span className={`transition-transform ${on ? "-translate-y-0.5 scale-110" : ""}`}><Icon name={t.icon} size={23} /></span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      )}
      <TermSheet />
    </>
  );
}
