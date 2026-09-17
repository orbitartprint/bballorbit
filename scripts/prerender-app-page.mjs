import { readFile, mkdir, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const distribution = JSON.parse(await readFile(new URL("src/data/appDistribution.json", root), "utf8"));
const destination = new URL(distribution.downloadPageUrl);
if (destination.href !== "https://app.bballorbit.com/app") throw new Error("Unexpected app redirect destination");
await mkdir(new URL("dist/app/", root), { recursive: true });
await writeFile(new URL("dist/app/index.html", root), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Basketball Orbit mobile app</title><meta name="robots" content="noindex, follow">
<link rel="canonical" href="${destination.href}"><meta http-equiv="refresh" content="0;url=${destination.href}">
</head><body><a href="${destination.href}" target="_blank" rel="noopener noreferrer">Open the Basketball Orbit app download page</a></body></html>`);
console.log("Generated legacy /app redirect to the product website.");
