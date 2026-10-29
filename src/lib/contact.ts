import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/config";
import configuration from "@/data/contactConfig.json";

export const CONTACT_SITE_KEY = import.meta.env.VITE_CONTACT_TURNSTILE_SITE_KEY || configuration.turnstileSiteKey;
export type WebsiteContactSubmission = { name: string; email: string; subject: string; message: string; company: string; requestId: string; turnstileToken: string };

/** The public website never inherits an app user's saved authentication session. */
export async function submitWebsiteContact(data: WebsiteContactSubmission) {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/website-contact`, {
    method: "POST", credentials: "omit", cache: "no-store", signal: AbortSignal.timeout(20_000),
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok || result?.success !== true) throw new Error("The contact service did not confirm receipt.");
}
