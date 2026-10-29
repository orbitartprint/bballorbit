import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

test("analytics respects explicit consent, navigation and URL privacy", async (t) => {
  const server = await createServer({ root: fileURLToPath(new URL("../", import.meta.url)), configFile: false, server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" });
  try {
    const { parseConsent } = await server.ssrLoadModule("/src/lib/consent.ts");
    const { createAnalyticsController, analyticsUrl } = await server.ssrLoadModule("/src/lib/analytics.ts");
    await t.test("missing, malformed and untouched consent fail closed", () => {
      for (const cookies of ["", "cookieyes-consent=%ZZ", "cookieyes-consent=analytics:yes,action:no", "other=analytics:yes"]) assert.equal(parseConsent(cookies).analytics, false);
      assert.equal(parseConsent("", { isUserActionCompleted: false, categories: { analytics: true } }).analytics, false);
    });
    await t.test("saved choices and provider choices remain granular", () => {
      assert.deepEqual(parseConsent("other=value; cookieyes-consent=action:yes,analytics:yes,advertisement:no,functional:yes"), { analytics: true, advertisement: false, functional: true });
      assert.deepEqual(parseConsent("", { isUserActionCompleted: true, categories: { advertisement: true } }), { analytics: false, advertisement: true, functional: false });
    });
    await t.test("search terms, email addresses, tokens, hash and referrer query are excluded", () => {
      assert.equal(analyticsUrl("https://bballorbit.com/contact?email=coach%40example.com&token=secret&utm_source=youtube&utm_content=coach%40example.com#private"), "https://bballorbit.com/contact?utm_source=youtube");
      assert.equal(analyticsUrl("https://example.com/?utm_source=private&token=secret", false), "https://example.com/");
    });
    await t.test("no tracker or page events are started before consent; rejected pages are not replayed", () => {
      const calls = []; let loads = 0;
      const tracker = createAnalyticsController({ send: (...args) => calls.push(args), load: () => loads++, disable: () => {}, clearCookies: () => {} });
      tracker.consent(false); tracker.page("https://bballorbit.com/private?token=x", "before", "Old page", "");
      assert.equal(loads, 0); assert.equal(calls.length, 0);
      tracker.consent(true); tracker.page("https://bballorbit.com/drills/", "current", "Drills", "");
      assert.equal(loads, 1);
      const pages = calls.filter((call) => call[0] === "event");
      assert.equal(pages.length, 1); assert.equal(pages[0][2].page_location, "https://bballorbit.com/drills/");
    });
    await t.test("one manual event per navigation with automatic initial pageview disabled", () => {
      const calls = [];
      const tracker = createAnalyticsController({ send: (...args) => calls.push(args), load: () => {}, disable: () => {}, clearCookies: () => {} });
      tracker.consent(true); tracker.consent(true);
      tracker.page("https://bballorbit.com/", "home", "Home", "https://example.com/path?email=private");
      tracker.page("https://bballorbit.com/", "home", "Home", "");
      tracker.page("https://bballorbit.com/blog/", "blog", "Blog", "");
      const configs = calls.filter((call) => call[0] === "config");
      assert.equal(configs.length, 1); assert.equal(configs[0][2].send_page_view, false);
      const pages = calls.filter((call) => call[0] === "event");
      assert.equal(pages.length, 2); assert.equal(pages[0][2].page_referrer, "https://example.com/path");
      assert.equal(pages[1][2].page_referrer, "https://bballorbit.com/");
    });
    await t.test("revocation disables tracking before updating consent and clears analytics cookies", () => {
      const calls = []; let clears = 0; let disabled = true;
      const tracker = createAnalyticsController({ send: (...args) => calls.push({ args, disabled }), load: () => {}, disable: value => { disabled = value; }, clearCookies: () => clears++ });
      tracker.consent(true); tracker.page("https://bballorbit.com/", "one", "Home", "");
      tracker.consent(false); tracker.page("https://bballorbit.com/contact/", "two", "Contact", "");
      assert.equal(clears, 1); assert.equal(disabled, true);
      assert.equal(calls.filter((call) => call.args[0] === "event").length, 1);
      assert.equal(calls.at(-1).disabled, true);
    });
  } finally { await server.close(); }
});
