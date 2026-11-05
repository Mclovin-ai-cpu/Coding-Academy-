import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coding Academy",
    short_name: "Academy",
    description: "Vibecoding-Grundlagen lernen und eigene Ideen umsetzen.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f5f9",
    theme_color: "#4f46e5",
    lang: "de",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  };
}
