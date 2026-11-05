/**
 * Testversion oder finale Version?
 * Auf dem Branch Vtest-mobile ist TEST = true: Die App zeigt „Test“ im Kopf
 * und speichert ihren Fortschritt getrennt von der finalen Version.
 * Beim Übernehmen nach main hier auf false setzen und die Test-Icons zurücktauschen:
 * src/app/apple-icon.png, src/app/icon.png, public/icon.svg, public/icon-512.png, public/manifest.webmanifest
 */
export const TEST = true;
export const EDITION_LABEL = TEST ? "Testversion" : "";
