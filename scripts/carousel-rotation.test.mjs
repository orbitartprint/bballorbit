import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";

test("testimonial rotation waits for visibility and respects reader control", async (t) => {
  const server = await createServer({ configFile: false, server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" });
  try {
    const { createCarouselRotation } = await server.ssrLoadModule("/src/lib/carouselRotation.ts");
    const setup = () => {
      const pending = new Map(); let sequence = 0; let advances = 0;
      const rotation = createCarouselRotation(() => { advances++; }, {
        setTimer: (callback, delay) => { const id = sequence++; pending.set(id, { callback, delay }); return id; },
        clearTimer: id => pending.delete(id),
      });
      const fire = () => { const [id, job] = [...pending][0]; pending.delete(id); job.callback(); };
      return { rotation, pending, fire, advances: () => advances };
    };
    await t.test("SSR and out-of-view content never start timers; each visible step has a fresh ten-second delay", () => {
      const s = setup(); assert.equal(s.pending.size, 0);
      s.rotation.connect(); assert.equal(s.pending.size, 0);
      s.rotation.update({ inView: true }); assert.equal(s.pending.size, 1);
      assert.equal([...s.pending.values()][0].delay, 10_000);
      s.fire(); assert.equal(s.advances(), 1); assert.equal(s.pending.size, 1);
      s.rotation.update({ inView: false }); assert.equal(s.pending.size, 0);
    });
    await t.test("hover and hidden tabs pause without losing the user's playback choice", () => {
      const s = setup(); s.rotation.connect(); s.rotation.update({ inView: true });
      s.rotation.update({ hovered: true }); assert.equal(s.pending.size, 0);
      assert.equal(s.rotation.getSnapshot().enabled, true);
      s.rotation.update({ hovered: false }); assert.equal(s.pending.size, 1);
      s.rotation.update({ documentVisible: false }); assert.equal(s.pending.size, 0);
      s.rotation.update({ documentVisible: true }); assert.equal(s.pending.size, 1);
    });
    await t.test("focus, manual swipe/selection and reduced motion stop until an explicit restart", () => {
      const s = setup(); s.rotation.connect(); s.rotation.update({ inView: true });
      s.rotation.stop(); assert.equal(s.pending.size, 0);
      s.rotation.update({ hovered: true }); s.rotation.update({ hovered: false });
      s.rotation.update({ documentVisible: false }); s.rotation.update({ documentVisible: true });
      assert.equal(s.pending.size, 0); assert.equal(s.rotation.getSnapshot().enabled, false);
      s.rotation.start(); assert.equal(s.pending.size, 1);
    });
    await t.test("effect cleanup cancels timer zero and reconnect works during React Strict Mode effect replay", () => {
      const s = setup(); s.rotation.connect(); s.rotation.update({ inView: true });
      assert.ok(s.pending.has(0)); s.rotation.disconnect(); assert.equal(s.pending.size, 0);
      s.rotation.connect(); assert.equal(s.pending.size, 1);
      s.rotation.restart(); assert.equal(s.pending.size, 1);
      s.rotation.disconnect(); assert.equal(s.pending.size, 0);
    });
  } finally { await server.close(); }
});
