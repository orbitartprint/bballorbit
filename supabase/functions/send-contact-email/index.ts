import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createContactHandler, escapeHtml } from "./handler.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const resendKey = Deno.env.get("RESEND_API_KEY");

// Best-effort per-instance protection. A durable, shared limit is still required
// at the gateway/database layer; cold starts and parallel isolates do not share this map.
const rateLimits = new Map<string, { count: number; resetTime: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_LIMIT_ENTRIES = 10_000;

const handler = createContactHandler({
  isConfigured: () => Boolean(supabaseUrl && serviceKey && resendKey),
  checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimits.get(ip);
    if (record && record.resetTime > now) {
      if (record.count >= 5) return false;
      record.count++;
      return true;
    }
    if (rateLimits.size >= MAX_LIMIT_ENTRIES) {
      for (const [key, value] of rateLimits) if (value.resetTime <= now) rateLimits.delete(key);
      if (rateLimits.size >= MAX_LIMIT_ENTRIES) return false;
    }
    rateLimits.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  },
  async saveMessage(data) {
    const supabase = createClient(supabaseUrl!, serviceKey!);
    const { error } = await supabase.from("contact_messages").insert(data);
    if (error) throw new Error("Contact message could not be stored.");
  },
  async sendNotification(data) {
    const resend = new Resend(resendKey!);
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const subject = escapeHtml(data.subject);
    const message = escapeHtml(data.message).replace(/\n/g, "<br>");
    return resend.emails.send({
      from: "Basketball Orbit <info@bballorbit.com>",
      to: ["info@bballorbit.com"],
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: `<h2>New Contact Form Submission</h2><p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject}</p><div>${message}</div>`,
    });
  },
});

serve(handler);
