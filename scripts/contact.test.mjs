import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

test("contact endpoint rejects invalid requests and reports delivery failures", async (t) => {
  const server = await createServer({ root: fileURLToPath(new URL("../", import.meta.url)), configFile: false, server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" });
  try {
    const { createContactHandler, escapeHtml } = await server.ssrLoadModule("/supabase/functions/send-contact-email/handler.ts");
    const valid = { name: " Coach ", email: "coach@example.com", subject: "Practice question", message: "Please help with this drill." };
    const request = (body = valid, headers = { "Content-Type": "application/json" }) => new Request("https://example.com/contact", { method: "POST", headers, body: typeof body === "string" ? body : JSON.stringify(body) });
    let saved = []; let sent = []; let providerError = false; let storageError = false;
    const handler = createContactHandler({ isConfigured: () => true, checkRateLimit: () => true,
      saveMessage: async data => { if (storageError) throw new Error("storage unavailable"); saved.push(data); },
      sendNotification: async data => { sent.push(data); return { error: providerError ? { name: "provider_error" } : null }; },
    });

    await t.test("valid submission trims fields and succeeds only after storage and notification", async () => {
      const response = await handler(request());
      assert.equal(response.status, 200); assert.equal((await response.json()).success, true);
      assert.equal(saved[0].name, "Coach"); assert.equal(sent.length, 1);
    });
    await t.test("invalid types, blank fields and invalid JSON have no storage/email side effects", async () => {
      saved = []; sent = [];
      for (const data of [null, [], { ...valid, name: 123 }, { ...valid, subject: "  " }, { ...valid, email: "not-an-email" }, { ...valid, message: "a".repeat(10_001) }, "{"]) assert.equal((await handler(request(data))).status, 400);
      assert.equal(saved.length, 0); assert.equal(sent.length, 0);
    });
    await t.test("large requests are rejected even without Content-Length", async () => {
      assert.equal((await handler(request({ ...valid, extra: "a".repeat(65_000) }))).status, 413);
      assert.equal(saved.length, 0);
    });
    await t.test("method, content type, configuration and rate-limit guards", async () => {
      const methodResponse = await handler(new Request("https://example.com/contact"));
      assert.equal(methodResponse.status, 405);
      assert.equal(methodResponse.headers.get("Allow"), "POST, OPTIONS");
      assert.equal((await handler(new Request("https://example.com/contact", { method: "OPTIONS" }))).status, 204);
      assert.equal((await handler(request(valid, { "Content-Type": "text/plain" }))).status, 415);
      assert.equal((await handler(request(valid, { "Content-Type": "application/json-invalid" }))).status, 415);
      assert.equal((await handler(request(valid, { "Content-Type": "application/json; charset=utf-8" }))).status, 200);
      const dependency = { isConfigured: () => false, checkRateLimit: () => true, saveMessage: async () => assert.fail("must not persist"), sendNotification: async () => assert.fail("must not send") };
      assert.equal((await createContactHandler(dependency)(request())).status, 503);
      assert.equal((await createContactHandler({ ...dependency, isConfigured: () => true, checkRateLimit: () => false })(request())).status, 429);
    });
    await t.test("a returned Resend error does not produce success", async () => {
      providerError = true;
      const response = await handler(request());
      assert.equal(response.status, 502); assert.notEqual((await response.json()).success, true);
    });
    await t.test("a storage error does not send an email", async () => {
      storageError = true; sent = [];
      assert.equal((await handler(request())).status, 500); assert.equal(sent.length, 0);
    });
    await t.test("HTML in contact fields is escaped", () => {
      assert.equal(escapeHtml('<img src=x onerror="x"> & \'quoted\''), '&lt;img src=x onerror=&quot;x&quot;&gt; &amp; &#39;quoted&#39;');
    });
  } finally { await server.close(); }
});
