import { createContactHandler, escapeHtml, type ContactFormData } from "./handler.ts";
import { createContactDatabase } from "./database.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const resendKey = Deno.env.get("RESEND_API_KEY") || "";
const turnstileKey = Deno.env.get("WEBSITE_TURNSTILE_SECRET_KEY") || "";
const hosts = new Set(["bballorbit.com", "www.bballorbit.com"]);
const origins = ["https://bballorbit.com", "https://www.bballorbit.com"];
let workerDigest: { expires: number; value: Promise<string | null> } | undefined;

const rpc = createContactDatabase(supabaseUrl, serviceKey);

const bytesToHex = (buffer: ArrayBuffer) => Array.from(new Uint8Array(buffer), value => value.toString(16).padStart(2, "0")).join("");
async function rateKey(ip: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(serviceKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return bytesToHex(await crypto.subtle.sign("HMAC", key, encoder.encode(`website-contact-rate-v1:${ip}`)));
}

async function isWorkerAuthorized(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  if (!/^[a-f0-9-]{72}$/.test(token)) return false;
  if (!workerDigest || workerDigest.expires < Date.now()) {
    workerDigest = { expires: Date.now() + 60_000, value: rpc<string | null>("website_contact_worker_digest").catch(() => null) };
  }
  const expected = await workerDigest.value;
  if (typeof expected !== "string" || !/^[a-f0-9]{64}$/.test(expected)) return false;
  const actual = bytesToHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token)));
  let difference = actual.length ^ expected.length;
  for (let index = 0; index < actual.length; index++) difference |= actual.charCodeAt(index) ^ expected.charCodeAt(index);
  return difference === 0;
}

type Delivery = ContactFormData & { request_id: string; attempt: number };
async function processOutbox(requestId?: string) {
  await rpc("maintain_website_contact_queue");
  const deliveries = await rpc<Delivery[]>("claim_website_contact_outbox", { p_request_id: requestId || null });
  await Promise.all(deliveries.map(async (delivery) => {
    let providerId: string | null = null;
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json", "Idempotency-Key": `website-contact-v1/${delivery.request_id}` },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from: "Basketball Orbit <info@bballorbit.com>", to: ["info@bballorbit.com"], reply_to: delivery.email,
          subject: `Website contact: ${delivery.subject}`,
          text: `From: ${delivery.name} (${delivery.email})\nSubject: ${delivery.subject}\n\n${delivery.message}`,
          html: `<h2>Website contact</h2><p><strong>From:</strong> ${escapeHtml(delivery.name)} (${escapeHtml(delivery.email)})</p><p><strong>Subject:</strong> ${escapeHtml(delivery.subject)}</p><div>${escapeHtml(delivery.message).replace(/\n/g, "<br>")}</div>`,
        }),
      });
      const result = await response.json();
      if (response.ok && typeof result.id === "string" && result.id.length > 0) providerId = result.id;
    } catch { /* A timeout remains in the durable queue; the provider key prevents duplicate email. */ }
    await rpc("finish_website_contact_delivery", { p_request_id: delivery.request_id, p_attempt: delivery.attempt, p_provider_id: providerId });
    if (!providerId) console.warn("Website contact notification is queued for retry.");
  }));
}

const handler = createContactHandler({
  allowedOrigins: origins,
  isConfigured: () => Boolean(supabaseUrl && serviceKey && resendKey && turnstileKey),
  isWorkerAuthorized,
  async verifyBot(token, requestId) {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileKey, response: token, idempotency_key: requestId }), signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error("Anti-spam verification unavailable.");
    const result = await response.json();
    return result.success === true && hosts.has(result.hostname) && result.action === "website-contact";
  },
  async acceptMessage(data, requestId, ip) {
    const fingerprint = bytesToHex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify([data.name, data.email, data.subject, data.message]))));
    await rpc("accept_website_contact", {
      p_request_id: requestId, p_rate_key: await rateKey(ip), p_fingerprint: fingerprint,
      p_name: data.name, p_email: data.email, p_subject: data.subject, p_message: data.message,
    });
  },
  processOutbox,
  schedule(work) {
    const runtime = (globalThis as unknown as { EdgeRuntime?: { waitUntil: (work: Promise<unknown>) => void } }).EdgeRuntime;
    if (runtime) runtime.waitUntil(work);
    else void work;
  },
});

Deno.serve(handler);
