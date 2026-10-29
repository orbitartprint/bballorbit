import { appendFileSync } from "node:fs";
import { fetchPublicationRows, publicationFingerprint } from "./publication.mjs";

const rows = await fetchPublicationRows();
const response = await fetch("https://raw.githubusercontent.com/orbitartprint/bballorbit/gh-pages/public-route-manifest.json", { signal: AbortSignal.timeout(20_000), headers: { "Cache-Control": "no-cache" } });
if (!response.ok && response.status !== 404) throw new Error(`Cannot read deployed publication manifest (${response.status}).`);
const deployed = response.ok ? await response.json() : {};
const changed = publicationFingerprint(rows) !== deployed.publicationFingerprint;
console.log(`${rows.length} published drills; rebuild ${changed ? "required" : "not needed"}.`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`);
