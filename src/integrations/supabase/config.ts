import configuration from "../../data/publicSupabaseConfig.json";

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || configuration.url;
export const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || configuration.publishableKey;
// Frontend credentials must always be public. A privileged key must fail closed.
const keyRole = (() => {
  try { return JSON.parse(atob(SUPABASE_PUBLISHABLE_KEY.split(".")[1])).role; }
  catch { return undefined; }
})();
if (SUPABASE_PUBLISHABLE_KEY.startsWith("sb_secret_") || keyRole === "service_role") {
  throw new Error("A private Supabase key must never be used in the public website.");
}
