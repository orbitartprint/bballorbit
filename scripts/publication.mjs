import { createHash } from "node:crypto";
import configuration from "../src/data/publicSupabaseConfig.json" with { type: "json" };

export function publicConfiguration(environment = process.env) {
  const url = environment.VITE_SUPABASE_URL || configuration.url;
  const publishableKey = environment.VITE_SUPABASE_PUBLISHABLE_KEY || configuration.publishableKey;
  let role;
  try { role = JSON.parse(Buffer.from(publishableKey.split(".")[1], "base64url").toString()).role; } catch { /* New publishable keys are opaque. */ }
  if (publishableKey.startsWith("sb_secret_") || role === "service_role") throw new Error("Private credentials cannot be used by the public website.");
  return { url, publishableKey };
}

export function publicationFingerprint(rows) {
  if (!Array.isArray(rows) || rows.length === 0) throw new Error("Published library is empty; refusing automatic publication.");
  const slugs = new Set();
  const values = rows.map(row => {
    if (!row || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.public_slug || "") || slugs.has(row.public_slug) || typeof row.version_id !== "string") throw new Error("Invalid or duplicate published drill.");
    slugs.add(row.public_slug);
    return [row.public_slug, row.version_id, row.rendered_at || ""];
  }).sort((left, right) => left[0].localeCompare(right[0], "en"));
  return createHash("sha256").update(JSON.stringify(values)).digest("hex");
}

export async function fetchPublicationRows(fetcher = fetch) {
  const { url, publishableKey } = publicConfiguration();
  const endpoint = new URL("/rest/v1/public_library_pages", url);
  endpoint.search = new URLSearchParams({ select: "public_slug,version_id,rendered_at", kind: "eq.drill", cache_status: "eq.published", order: "public_slug.asc" }).toString();
  const response = await fetcher(endpoint, { headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}` }, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`Publication check failed (${response.status}).`);
  const rows = await response.json();
  publicationFingerprint(rows);
  return rows;
}
