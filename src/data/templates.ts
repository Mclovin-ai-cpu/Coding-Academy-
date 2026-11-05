// Automatisch aus v2 übernommen und für v3 ergänzt. Inhalte hier direkt bearbeiten.
import type { Template } from "./types";

export const TEMPLATES: Record<string, Template> = {
  "landing": {
    "label": "Landingpage",
    "emoji": "🚀",
    "todos": [
      [
        "Ziel, Zielgruppe & wichtigste Conversion festlegen",
        "seo"
      ],
      [
        "Domain auswählen und Verfügbarkeit prüfen",
        "domain"
      ],
      [
        "Seitenaufbau skizzieren (Hero, Vorteile, Preis, Kontakt)",
        "ux"
      ],
      [
        "Ersten Prompt schreiben und Grundgerüst erzeugen",
        "vibe"
      ],
      [
        "Design anpassen: Farben, Schrift, mobil",
        "css"
      ],
      [
        "Farben & Schriften als Design-Tokens festlegen",
        "design-system"
      ],
      [
        "Kontaktformular einbauen",
        "js"
      ],
      [
        "Impressum & Datenschutz ergänzen",
        "legal"
      ],
      [
        "Code auf GitHub speichern",
        "git"
      ],
      [
        "Mit Vercel veröffentlichen & Domain verbinden",
        "deploy"
      ]
    ]
  },
  "affiliate": {
    "label": "Affiliate-Website",
    "emoji": "🔗",
    "todos": [
      [
        "Nische & Zielgruppe wählen",
        "money"
      ],
      [
        "Affiliate-Programme recherchieren (z. B. Amazon PartnerNet, awin)",
        "money"
      ],
      [
        "Plattform wählen: WordPress oder eigener Code",
        "stack"
      ],
      [
        "Domain sichern",
        "domain"
      ],
      [
        "Keyword-Recherche für die ersten 5 Artikel",
        "seo"
      ],
      [
        "Seitenvorlagen per Prompt bauen (Start, Vergleich, Artikel)",
        "prompting"
      ],
      [
        "Affiliate-Links einbauen und als Werbung kennzeichnen",
        "legal"
      ],
      [
        "Impressum, Datenschutz & Cookie-Banner",
        "legal"
      ],
      [
        "Analytics einrichten",
        "seo"
      ],
      [
        "Veröffentlichen",
        "deploy"
      ]
    ]
  },
  "shop": {
    "label": "Online-Shop",
    "emoji": "🛒",
    "todos": [
      [
        "Produkte & Preise definieren",
        "money"
      ],
      [
        "Shopsystem wählen (Shopify vs. eigener Code)",
        "stack"
      ],
      [
        "Zahlungsanbieter einrichten",
        "payments"
      ],
      [
        "Produktseiten & Warenkorb gestalten",
        "css"
      ],
      [
        "AGB, Widerruf, Versand, Impressum",
        "legal"
      ],
      [
        "Bestellbestätigung automatisieren (Webhook/E-Mail)",
        "payments"
      ],
      [
        "Domain verbinden",
        "domain"
      ],
      [
        "Laufende Kosten durchrechnen",
        "kosten"
      ],
      [
        "Testkauf durchführen und Fehler beheben",
        "debugging"
      ]
    ]
  },
  "webapp": {
    "label": "Web-App",
    "emoji": "📱",
    "todos": [
      [
        "Problem & Kernfunktion beschreiben (MVP)",
        "prompting"
      ],
      [
        "Stack wählen (z. B. Next.js + Supabase)",
        "stack"
      ],
      [
        "Datenmodell festlegen: Welche Daten?",
        "supabase"
      ],
      [
        "Login einbauen",
        "backend"
      ],
      [
        "Erste Funktion per Prompt bauen",
        "vibe"
      ],
      [
        "Testen & debuggen",
        "debugging"
      ],
      [
        "Ladezeit & Barrierefreiheit prüfen",
        "qualitaet"
      ],
      [
        "Secrets sicher ablegen",
        "security"
      ],
      [
        "Als PWA installierbar machen",
        "pwa"
      ],
      [
        "Mit Vercel veröffentlichen",
        "deploy"
      ],
      [
        "Erlösmodell festlegen",
        "money"
      ]
    ]
  },
  "free": {
    "label": "Eigene Idee",
    "emoji": "💡",
    "todos": [
      [
        "Idee in einem Satz beschreiben",
        "vibe"
      ],
      [
        "Passenden Weg wählen (No-Code, KI-Builder, Code)",
        "stack"
      ]
    ]
  }
};
