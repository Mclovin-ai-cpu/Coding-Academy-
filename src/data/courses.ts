// Automatisch aus v2 übernommen und für v3 ergänzt. Inhalte hier direkt bearbeiten.
import type { Course } from "./types";

export const COURSES: Course[] = [
  {
    "id": "web",
    "title": "Wie das Web funktioniert",
    "short": "Web-Grundlagen",
    "ico": "</>",
    "color": "#4F46E5",
    "lessons": [
      "web-basics",
      "domain",
      "html",
      "css",
      "js"
    ]
  },
  {
    "id": "tools",
    "title": "Werkzeuge & Anbieter",
    "short": "Tools",
    "ico": "git",
    "color": "#0E7490",
    "lessons": [
      "git",
      "deploy",
      "backend",
      "supabase",
      "payments"
    ]
  },
  {
    "id": "workflow",
    "title": "Workflow mit Claude",
    "short": "Workflow",
    "ico": ">_",
    "color": "#0F766E",
    "lessons": [
      "claude-code",
      "branch-pr",
      "handoff"
    ]
  },
  {
    "id": "fw",
    "title": "Frameworks & Bausteine",
    "short": "Frameworks",
    "ico": "{ }",
    "color": "#BE185D",
    "lessons": [
      "frameworks",
      "stack",
      "pwa"
    ]
  },
  {
    "id": "design",
    "title": "Design-Grundlagen",
    "short": "Design",
    "ico": "Aa",
    "color": "#C2410C",
    "lessons": [
      "ux",
      "design-system"
    ]
  },
  {
    "id": "produkt",
    "title": "Website, App oder beides",
    "short": "Web & App",
    "ico": "[ ]",
    "color": "#1D4ED8",
    "lessons": [
      "website-vs-app",
      "ein-backend",
      "tools-plus",
      "store-app"
    ]
  },
  {
    "id": "creator",
    "title": "Content, Social Media & YouTube",
    "short": "Creator",
    "ico": "▶",
    "color": "#B91C1C",
    "lessons": [
      "content-creation",
      "social-media",
      "youtube",
      "creator-business"
    ]
  },
  {
    "id": "vibe",
    "title": "Vibecoding mit KI",
    "short": "Vibecoding",
    "ico": "AI",
    "color": "#6D28D9",
    "lessons": [
      "vibe",
      "prompting",
      "debugging",
      "security",
      "qualitaet"
    ]
  },
  {
    "id": "biz",
    "title": "Business & Recht",
    "short": "Business",
    "ico": "€",
    "color": "#15803D",
    "lessons": [
      "legal",
      "money",
      "seo",
      "kosten"
    ]
  }
];
