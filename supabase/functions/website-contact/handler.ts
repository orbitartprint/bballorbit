export type ContactFormData = { name: string; email: string; subject: string; message: string };
export type ContactDependencies = {
  isConfigured: () => boolean;
  allowedOrigins: readonly string[];
  isWorkerAuthorized: (request: Request) => boolean | Promise<boolean>;
  verifyBot: (token: string, requestId: string) => Promise<boolean>;
  acceptMessage: (data: ContactFormData, requestId: string, ip: string) => Promise<void>;
  processOutbox: (requestId?: string) => Promise<void>;
  schedule: (work: Promise<void>) => void;
};
export class ContactServiceError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}
const MAX_BODY_BYTES = 64_000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateContactInput(value: unknown): ContactFormData {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ContactServiceError(400, "Invalid contact form data.");
  const input = value as Record<string, unknown>;
  const limits = { name: 200, email: 255, subject: 500, message: 10_000 };
  const data = {} as ContactFormData;
  for (const key of Object.keys(limits) as (keyof ContactFormData)[]) {
    if (typeof input[key] !== "string") throw new ContactServiceError(400, "All fields must be text.");
    const field = input[key].trim();
    if (!field || field.length > limits[key]) throw new ContactServiceError(400, "A required field is empty or too long.");
    data[key] = field;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new ContactServiceError(400, "Invalid email address.");
  return data;
}

async function readInput(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) throw new ContactServiceError(413, "Request body is too large.");
  if (!request.body) throw new ContactServiceError(400, "Contact form data is required.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new ContactServiceError(413, "Request body is too large."); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const buffer = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
  try {
    const input: unknown = JSON.parse(new TextDecoder().decode(buffer));
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid object");
    return input as Record<string, unknown>;
  } catch { throw new ContactServiceError(400, "Invalid JSON."); }
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

export function createContactHandler(dependencies: ContactDependencies) {
  return async (request: Request): Promise<Response> => {
    const origin = request.headers.get("origin") || "";
    const worker = await dependencies.isWorkerAuthorized(request);
    const allowed = dependencies.allowedOrigins.includes(origin);
    const headers = {
      ...(allowed ? { "Access-Control-Allow-Origin": origin } : {}),
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
      "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin", "Cache-Control": "no-store", "Content-Type": "application/json",
    };
    const json = (status: number, data: object) => new Response(JSON.stringify(data), { status, headers });
    if (!allowed && !worker) return json(403, { error: "Origin not allowed." });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    if (request.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed." }), { status: 405, headers: { ...headers, Allow: "POST, OPTIONS" } });
    if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") return json(415, { error: "Content-Type must be application/json." });
    try {
      const input = await readInput(request);
      if (input.action === "drain") {
        if (!worker) return json(401, { error: "Not authorized." });
        await dependencies.processOutbox();
        return json(200, { success: true });
      }
      if (typeof input.company === "string" && input.company.trim()) return json(200, { success: true });
      const data = validateContactInput(input);
      if (typeof input.requestId !== "string" || !UUID.test(input.requestId)) throw new ContactServiceError(400, "Invalid submission ID.");
      if (typeof input.turnstileToken !== "string" || !input.turnstileToken.trim() || input.turnstileToken.length > 2048) throw new ContactServiceError(400, "Please complete the anti-spam verification.");
      if (!dependencies.isConfigured()) return json(503, { error: "The contact service is temporarily unavailable. Please email info@bballorbit.com." });
      if (!await dependencies.verifyBot(input.turnstileToken, input.requestId)) return json(400, { error: "Please repeat the anti-spam verification." });
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      await dependencies.acceptMessage(data, input.requestId, ip);
      try {
        dependencies.schedule(dependencies.processOutbox(input.requestId).catch(() => { console.error("Website contact notification remains queued."); }));
      } catch { console.error("Website contact notification will be retried by the scheduled worker."); }
      return json(202, { success: true, status: "received" });
    } catch (error: unknown) {
      if (error instanceof ContactServiceError) return json(error.status, { error: error.message });
      console.error("Website contact processing failed.");
      return json(503, { error: "The contact service is temporarily unavailable. Please try again or email info@bballorbit.com." });
    }
  };
}
