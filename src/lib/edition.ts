/**
 * Testversion oder finale Version?
 * Auf dem Branch Vtest-mobile ist TEST = true: Die App zeigt „Test“ im Kopf
 * und speichert ihren Fortschritt getrennt von der finalen Version.
 * Beim Übernehmen nach main hier auf false setzen.
 */
export const TEST = true;
export const EDITION_LABEL = TEST ? "Testversion" : "";
