import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";

// Load the same TypeScript module used by both pages, with the project's aliases.
test("public Drill Library loads independently of login state and reports fallback", async (t) => {
  const server = await createServer({ server: { middlewareMode: true, watch: null }, appType: "custom" });
  const originalFetch = globalThis.fetch;
  try {
    const { fetchPublicDrills } = await server.ssrLoadModule("/src/data/publicDrills.ts");
    const { SUPABASE_PUBLISHABLE_KEY } = await server.ssrLoadModule("/src/integrations/supabase/config.ts");
    const row = {
      library_item_id: "00000000-0000-4000-8000-000000000001",
      version_id: "00000000-0000-4000-8000-000000000002",
      public_slug: "relay-tag-warm-up",
      seo_title: "Relay Tag Warm-Up", seo_description: null, thumbnail_path: null,
      cached_payload: { title: "Relay Tag Warm-Up" }, rendered_at: null,
    };
    const json = (value, status = 200) => new Response(JSON.stringify(value), { status, headers: { "Content-Type": "application/json" } });

    await t.test("requests only published drills with the public key, without cookies or cached responses", async () => {
      let calls = 0;
      globalThis.fetch = async (url, options) => {
        calls++;
        assert.equal(url.pathname, "/rest/v1/public_library_pages");
        assert.equal(url.searchParams.get("cache_status"), "eq.published");
        assert.equal(url.searchParams.get("kind"), "eq.drill");
        assert.equal(options.headers.Authorization, `Bearer ${SUPABASE_PUBLISHABLE_KEY}`);
        assert.equal(options.headers.apikey, SUPABASE_PUBLISHABLE_KEY);
        assert.equal(options.credentials, "omit");
        assert.equal(options.cache, "no-store");
        assert.ok(options.signal instanceof AbortSignal);
        return json([row]);
      };
      const result = await fetchPublicDrills();
      assert.equal(result.source, "live");
      assert.equal(result.drills[0].title, "Relay Tag Warm-Up");
      assert.equal(calls, 1);
    });

    for (const failure of ["network", "timeout", "unauthorized", "server", "invalid-response"]) {
      await t.test(`${failure} falls back explicitly and a subsequent request recovers`, async () => {
        const calls = [];
        globalThis.fetch = async (url, options) => {
          calls.push(String(url));
          if (String(url) === "/drill-library-snapshot.json") {
            assert.equal(options.cache, "no-cache");
            return json([row]);
          }
          if (failure === "network") throw new TypeError("Failed to fetch");
          if (failure === "timeout") throw new DOMException("Timed out", "TimeoutError");
          return failure === "invalid-response" ? json({}) : json({}, failure === "unauthorized" ? 401 : 503);
        };
        const result = await fetchPublicDrills();
        assert.equal(result.source, "snapshot");
        assert.equal(result.drills.length, 1);
        assert.equal(calls.length, 2);
        globalThis.fetch = async () => json([row]);
        assert.equal((await fetchPublicDrills()).source, "live");
      });
    }

    await t.test("an empty live catalog does not resurrect unpublished snapshot drills", async () => {
      globalThis.fetch = async (url) => {
        assert.notEqual(String(url), "/drill-library-snapshot.json");
        return json([]);
      };
      assert.deepEqual(await fetchPublicDrills(), { drills: [], source: "live" });
    });

    await t.test("an unavailable or invalid snapshot produces a load error", async () => {
      for (const snapshot of [() => json({}, 503), () => json({})]) {
        globalThis.fetch = async (url) => String(url) === "/drill-library-snapshot.json" ? snapshot() : json({}, 503);
        await assert.rejects(fetchPublicDrills());
      }
    });
  } finally {
    globalThis.fetch = originalFetch;
    await server.close();
  }
});
