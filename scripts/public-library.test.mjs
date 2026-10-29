import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Load the same TypeScript module used by both pages, with the project's aliases.
test("public Drill Library loads independently of login state and reports fallback", async (t) => {
  const server = await createServer({ server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" });
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

    await t.test("public drill search matches title, description, excerpt, tags and categories without case sensitivity", async () => {
      const { parsePublicDrills, matchesPublicDrillSearch } = await server.ssrLoadModule("/src/data/publicDrills.ts");
      const drill = parsePublicDrills([{ ...row, cached_payload: {
        title: "1v1 High-Five Scramble", description: "Win a loose ball and attack the basket.", excerpt: "React to the coach's signal.",
        tags: ["Finishing", "Agility"], categories: [{ slug: "small-sided-games", label: "Small-Sided Games" }],
      } }])[0];
      for (const query of ["", "   ", "  HIGH-FIVE  ", "LOOSE BALL", "coach's signal", "finishing", "agility", "Small-Sided Games", "small-sided-games"]) {
        assert.equal(matchesPublicDrillSearch(drill, query), true, `Expected a search match for ${JSON.stringify(query)}`);
      }
      assert.equal(matchesPublicDrillSearch(drill, "unrelated drill"), false);
    });

    await t.test("full animation starts with opening still phases instead of skipping to the first action", async () => {
      const { buildAnimationTimeline, getAnimationFramePhase, getAnimationPlaybackStartMs } = await server.ssrLoadModule("/src/features/creator/animation.ts");
      const opening = { id: "setup", title: "Setup", players: [{ id: "player-1", kind: "offense", number: "1", x: 10, y: 0 }], actions: [], objects: [{ id: "setup-note", type: "text", x: 10, y: 5, text: "Opening still" }], notes: "" };
      const moving = { ...opening, id: "movement", title: "Movement", objects: [], actions: [{ id: "cut-1", type: "cut", start: { x: 10, y: 0 }, end: { x: 15, y: 0 }, shape: "straight", actorId: "player-1" }] };
      const diagram = { schemaVersion: 1, metadata: { title: "Still phase regression", description: "", tags: [] }, court: { template: "fiba", size: "full-horizontal", theme: "clean", showGrid: false }, phases: [opening, moving], activePhaseId: moving.id };
      const timeline = buildAnimationTimeline(diagram, diagram.activePhaseId, "all");
      assert.equal(getAnimationPlaybackStartMs(timeline), 0);
      assert.equal(timeline.segments[0].endMs, 2000);
      assert.ok(timeline.steps.some(step => step.enabled && step.sourceActionId));
      assert.equal(getAnimationFramePhase(timeline, 0).id, opening.id);
      assert.equal(getAnimationFramePhase(timeline, 1999).id, opening.id);
      assert.deepEqual(getAnimationFramePhase(timeline, 1000).objects, opening.objects);
      assert.equal(getAnimationFramePhase(timeline, 2001).id, moving.id);

      const consecutive = buildAnimationTimeline({ ...diagram, phases: [opening, { ...opening, id: "second-still" }, moving] }, moving.id, "all");
      assert.equal(getAnimationPlaybackStartMs(consecutive), 0);
      assert.equal(getAnimationFramePhase(consecutive, 3000).id, "second-still");
      assert.equal(getAnimationFramePhase(consecutive, 4001).id, moving.id);
      assert.equal(getAnimationPlaybackStartMs(buildAnimationTimeline({ ...diagram, phases: [moving] }, moving.id, "phase")), 0);
      assert.equal(getAnimationPlaybackStartMs(buildAnimationTimeline({ ...diagram, phases: [] }, "", "all")), 0);
    });

    await t.test("embedded Creator images keep public diagrams available in every court orientation", async () => {
      const { parsePublicDrills } = await server.ssrLoadModule("/src/data/publicDrills.ts");
      const { CourtSvg } = await server.ssrLoadModule("/src/features/creator/court/CourtSvg.tsx");
      const image = { dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=", assetId: "asset-1", name: "players-plank.png", pixelWidth: 1, pixelHeight: 1 };
      for (const size of ["full-horizontal", "half", "full-vertical"]) {
        const imageObject = { id: "image-1", type: "image", x: 4, y: 6, width: 12, height: 8, angle: 30, opacity: 0.6, image };
        const source = { ...row, cached_payload: { title: row.seo_title, diagramDocument: {
          court: { template: "fiba", size, theme: "hardwood", showGrid: false },
          phases: [{ id: "phase-1", title: "Setup", players: [], actions: [], objects: [imageObject] }, { id: "phase-2", title: "Play", players: [], actions: [], objects: [] }],
        } } };
        const drill = parsePublicDrills([source])[0];
        assert.ok(drill.diagram, "an image must not invalidate the entire public diagram");
        assert.equal(drill.diagram.phases.length, 2);
        assert.deepEqual(drill.diagram.phases[0].objects[0], imageObject);
        const render = (phase) => renderToStaticMarkup(createElement(CourtSvg, { ...drill.diagram.court, phase, interactive: false, selection: null, draftActionStart: null }));
        const markup = render(drill.diagram.phases[0]);
        assert.match(markup, /<image /);
        assert.ok(markup.includes(`href="${image.dataUrl}"`));
        assert.match(markup, /rotate\(-30\)/);
        assert.match(markup, /opacity="0.6"/);
        assert.ok(markup.includes(size === "full-horizontal" ? 'width="12" height="8" opacity=' : 'width="8" height="12" opacity='));
        assert.match(markup, /<title>players-plank.png<\/title>/);
        assert.doesNotMatch(render(drill.diagram.phases[1]), /<image /);
        assert.match(render({ ...drill.diagram.phases[0], objects: [{ ...imageObject, image: undefined }] }), />Image<\/text>/);
        assert.match(render({ ...drill.diagram.phases[0], objects: [{ ...imageObject, image: { ...image, dataUrl: "https://example.com/expired.png" } }] }), /Image unavailable/);
        const assetPath = `/drill-assets/${"a".repeat(64)}.png`;
        assert.ok(render({ ...drill.diagram.phases[0], objects: [{ ...imageObject, image: { ...image, dataUrl: assetPath } }] }).includes(`href="${assetPath}"`), "build-generated shared raster images must remain visible");
        for (const unsafe of ["/drill-assets/../image.png", `//example.com/${"a".repeat(64)}.png`, `/drill-assets/${"a".repeat(64)}.svg`, assetPath + "?redirect=1"]) {
          assert.match(render({ ...drill.diagram.phases[0], objects: [{ ...imageObject, image: { ...image, dataUrl: unsafe } }] }), /Image unavailable/);
        }
      }
    });

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
