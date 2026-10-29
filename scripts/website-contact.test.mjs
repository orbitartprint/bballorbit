import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { fileURLToPath } from "node:url";

test("website intake validates, verifies and durably accepts messages", async (t) => {
  const server = await createServer({ root: fileURLToPath(new URL("../", import.meta.url)), configFile: false, server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" });
  try {
    const { createContactHandler, ContactServiceError, escapeHtml } = await server.ssrLoadModule("/supabase/functions/website-contact/handler.ts");
    const { createContactDatabase } = await server.ssrLoadModule("/supabase/functions/website-contact/database.ts");
    await t.test("database adapter accepts PostgREST void responses and preserves safe failure categories", async () => {
      const database = response => createContactDatabase("https://database.example", "server-test-key", async (url, options) => {
        assert.equal(options.headers.apikey, "server-test-key");
        assert.ok(url.includes("/rest/v1/rpc/"));
        return response;
      });
      assert.equal(await database(new Response(null, { status: 204 }))("maintain_website_contact_queue"), null);
      assert.deepEqual(await database(Response.json([]))("claim_website_contact_outbox"), []);
      for (const [message, status] of [["CONTACT_RATE_LIMITED", 429], ["IDEMPOTENCY_CONFLICT", 409]]) {
        await assert.rejects(database(Response.json({ message }, { status: 400 }))("accept_website_contact"), error => error instanceof ContactServiceError && error.status === status);
      }
      await assert.rejects(database(Response.json({ message: "internal private detail" }, { status: 500 }))("maintain_website_contact_queue"), { message: "Contact database request failed." });
    });
    const valid = { name: " Coach ", email: "coach@example.com", subject: "Practice question", message: "Please help with this drill.", requestId: "aa556677-8899-4abb-8cdd-eeff00112233", turnstileToken: "verified-token", company: "" };
    const request = (body = valid, headers = {}) => new Request("https://example.com/website-contact", { method: "POST", headers: { Origin: "https://bballorbit.com", "Content-Type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
    const setup = (overrides = {}) => {
      const calls = { accepted: [], verified: 0, delivered: [], scheduled: [] };
      const handler = createContactHandler({
        allowedOrigins: ["https://bballorbit.com"], isConfigured: () => true, isWorkerAuthorized: request => request.headers.get("authorization") === "Bearer worker-test-token",
        verifyBot: async () => { calls.verified++; return true; },
        acceptMessage: async (...parameters) => { calls.accepted.push(parameters); },
        processOutbox: async id => { calls.delivered.push(id); }, schedule: work => { calls.scheduled.push(work); }, ...overrides,
      });
      return { handler, calls };
    };
    await t.test("valid message is normalized, verified, stored and queued", async () => {
      const { handler, calls } = setup();
      const response = await handler(request());
      assert.equal(response.status, 202); assert.equal((await response.json()).status, "received");
      assert.equal(calls.accepted[0][0].name, "Coach"); assert.equal(calls.accepted[0][1], valid.requestId);
      assert.equal(calls.verified, 1); assert.deepEqual(calls.delivered, [valid.requestId]);
      assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://bballorbit.com");
    });
    await t.test("a temporary notification failure does not invite duplicate submissions after durable acceptance", async () => {
      const { handler, calls } = setup({ processOutbox: async () => { throw new Error("provider unavailable"); } });
      const response = await handler(request());
      assert.equal(response.status, 202); assert.equal((await response.json()).success, true);
      assert.equal(calls.accepted.length, 1); await Promise.all(calls.scheduled);
    });
    await t.test("foreign origins and public worker attempts have no side effects", async () => {
      const { handler, calls } = setup();
      assert.equal((await handler(request(valid, { Origin: "https://unrelated.example" }))).status, 403);
      assert.equal((await handler(request({ action: "drain" }))).status, 401);
      assert.equal(calls.accepted.length, 0); assert.equal(calls.delivered.length, 0);
      assert.equal(calls.verified, 0);
    });
    await t.test("only the authenticated worker can drain the queue without a browser origin", async () => {
      const { handler, calls } = setup();
      const response = await handler(request({ action: "drain" }, { Origin: "", Authorization: "Bearer worker-test-token" }));
      assert.equal(response.status, 200); assert.deepEqual(calls.delivered, [undefined]);
      assert.equal(calls.accepted.length, 0); assert.equal(calls.verified, 0);
    });
    await t.test("bot rejection, invalid IDs and bad field types cannot store messages", async () => {
      const { handler, calls } = setup();
      for (const input of [null, [], { ...valid, name: 123 }, { ...valid, message: "a".repeat(10_001) }, { ...valid, subject: " " }, { ...valid, email: "bad" }, { ...valid, requestId: "not-a-uuid" }, { ...valid, turnstileToken: "" }, "{"]) assert.equal((await handler(request(input))).status, 400);
      assert.equal(calls.accepted.length, 0);
      const blocked = setup({ verifyBot: async () => false });
      assert.equal((await blocked.handler(request())).status, 400); assert.equal(blocked.calls.accepted.length, 0);
    });
    await t.test("large streamed requests, methods and invalid media types are rejected", async () => {
      const { handler, calls } = setup();
      assert.equal((await handler(request({ ...valid, extra: "a".repeat(65_000) }))).status, 413);
      assert.equal((await handler(new Request("https://example.com", { headers: { Origin: "https://bballorbit.com" } }))).status, 405);
      assert.equal((await handler(request(valid, { "Content-Type": "application/json-invalid" }))).status, 415);
      assert.equal((await handler(new Request("https://example.com", { method: "OPTIONS", headers: { Origin: "https://bballorbit.com" } }))).status, 204);
      assert.equal(calls.accepted.length, 0);
    });
    await t.test("configuration, durable limits and idempotency conflicts do not schedule delivery", async () => {
      for (const [status, overrides] of [[503, { isConfigured: () => false }], [429, { acceptMessage: async () => { throw new ContactServiceError(429, "Rate limited"); } }], [409, { acceptMessage: async () => { throw new ContactServiceError(409, "Conflict"); } }]]) {
        const { handler, calls } = setup(overrides);
        assert.equal((await handler(request())).status, status); assert.equal(calls.scheduled.length, 0);
      }
    });
    await t.test("the honeypot is silently discarded and HTML is escaped", async () => {
      const { handler, calls } = setup();
      assert.equal((await handler(request({ ...valid, company: "spam" }))).status, 200);
      assert.equal(calls.accepted.length, 0); assert.equal(calls.verified, 0);
      assert.equal(escapeHtml('<img onerror="x"> & \'quoted\''), '&lt;img onerror=&quot;x&quot;&gt; &amp; &#39;quoted&#39;');
    });
  } finally { await server.close(); }
});
