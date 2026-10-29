import assert from "node:assert/strict";
import test from "node:test";
import { publicationFingerprint, publicConfiguration, fetchPublicationRows } from "./publication.mjs";

const first = { public_slug: "first-drill", version_id: "version-1", rendered_at: "2026-10-29T00:00:00Z" };
const second = { public_slug: "second-drill", version_id: "version-2", rendered_at: null };
test("publication fingerprint detects publish, update, unpublish and timestamp changes, ignoring order", () => {
  assert.equal(publicationFingerprint([first, second]), publicationFingerprint([second, first]));
  for (const changed of [[first], [first, { ...second, version_id: "new-version" }], [{ ...first, rendered_at: "2026-10-30T00:00:00Z" }, second]]) assert.notEqual(publicationFingerprint(changed), publicationFingerprint([first, second]));
  for (const invalid of [[], [first, first], [{ ...first, public_slug: "../invalid" }], [{ ...first, version_id: null }]]) assert.throws(() => publicationFingerprint(invalid));
});
test("public configuration rejects private keys without printing them", () => {
  assert.throws(() => publicConfiguration({ VITE_SUPABASE_PUBLISHABLE_KEY: "sb_secret_test" }));
  assert.throws(() => publicConfiguration({ VITE_SUPABASE_PUBLISHABLE_KEY: `header.${Buffer.from('{"role":"service_role"}').toString("base64url")}.signature` }));
  assert.ok(publicConfiguration().publishableKey);
});
test("publication check requests only the minimal public projection and fails closed on network error", async () => {
  const rows = await fetchPublicationRows(async (url, options) => {
    assert.equal(url.searchParams.get("select"), "public_slug,version_id,rendered_at");
    assert.equal(url.searchParams.get("cache_status"), "eq.published");
    assert.equal(url.searchParams.get("kind"), "eq.drill");
    assert.ok(options.headers.apikey);
    return Response.json([first]);
  });
  assert.deepEqual(rows, [first]);
  await assert.rejects(fetchPublicationRows(async () => new Response(null, { status: 503 })));
});
