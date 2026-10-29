export type ContactFormData = { name: string; email: string; subject: string; message: string };
export type ContactDependencies = {
  isConfigured: () => boolean;
  checkRateLimit: (ip: string) => boolean;
  saveMessage: (data: ContactFormData) => Promise<void>;
  sendNotification: (data: ContactFormData) => Promise<{ error: unknown }>;
};

const MAX_BODY_BYTES = 64_000;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (status: number, body: object, headers: Record<string, string> = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
});

class InputError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}

export function validateContactInput(value: unknown): ContactFormData {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new InputError(400, "Invalid contact form data.");
  const input = value as Record<string, unknown>;
  const limits = { name: 200, email: 255, subject: 500, message: 10_000 };
  const data = {} as ContactFormData;
  for (const key of Object.keys(limits) as (keyof ContactFormData)[]) {
    if (typeof input[key] !== "string") throw new InputError(400, "All fields must be text.");
    const field = input[key].trim();
    if (!field || field.length > limits[key]) throw new InputError(400, "A required field is empty or exceeds its maximum length.");
    data[key] = field;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new InputError(400, "Invalid email address.");
  return data;
}

async function readInput(req: Request) {
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) throw new InputError(413, "Request body is too large.");
  if (!req.body) throw new InputError(400, "Contact form data is required.");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new InputError(413, "Request body is too large.");
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)) as unknown; }
  catch { throw new InputError(400, "Invalid JSON."); }
}

export function escapeHtml(value: string): string {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function createContactHandler(dependencies: ContactDependencies) {
  return async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
    if (req.method !== "POST") return json(405, { error: "Method not allowed." }, { Allow: "POST, OPTIONS" });
    const mediaType = req.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
    if (mediaType !== "application/json") return json(415, { error: "Content-Type must be application/json." });
    try {
      const data = validateContactInput(await readInput(req));
      if (!dependencies.isConfigured()) return json(503, { error: "The contact service is temporarily unavailable. Please contact info@bballorbit.com." });
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
      if (!dependencies.checkRateLimit(ip)) return json(429, { error: "Too many submissions. Please try again later." });
      await dependencies.saveMessage(data);
      try {
        const result = await dependencies.sendNotification(data);
        if (result.error) throw new Error("Notification provider rejected the message.");
      } catch {
        console.error("Contact message stored, but email notification failed.");
        return json(502, { error: "The email notification could not be sent. Please contact info@bballorbit.com if your inquiry is urgent." });
      }
      return json(200, { success: true, message: "Contact form submitted successfully." });
    } catch (error: unknown) {
      if (error instanceof InputError) return json(error.status, { error: error.message });
      console.error("Contact message processing failed.");
      return json(500, { error: "Failed to send message. Please try again later." });
    }
  };
}
