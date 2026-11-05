import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TEST } from "@/lib/edition";

const base = process.env.GITHUB_PAGES === "1" ? `/Coding-Academy-/${process.env.PAGES_PATH || "v3"}` : "";

export const metadata: Metadata = {
  manifest: `${base}/manifest.webmanifest`,
  title: TEST ? "Coding Academy Test" : "Coding Academy",
  description: "Vibecoding-Grundlagen lernen: Begriffe, Lektionen, Praxis-Missionen und eigene Projekte.",
  appleWebApp: { capable: true, title: TEST ? "Academy Test" : "Academy", statusBarStyle: "black-translucent" },
  robots: { index: false, follow: false }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f5f9"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* Theme vor dem ersten Zeichnen setzen, damit nichts aufblitzt */}
        <script dangerouslySetInnerHTML={{ __html: `try{var s=JSON.parse(localStorage.getItem("codingAcademy.vtest")||localStorage.getItem("codingAcademy.v3")||localStorage.getItem("codingAcademy.v2")||"{}");if(s.theme==="light"||s.theme==="dark")document.documentElement.setAttribute("data-theme",s.theme)}catch(e){}` }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
