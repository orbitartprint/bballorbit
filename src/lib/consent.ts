export type ConsentState = { analytics: boolean; advertisement: boolean; functional: boolean };
export const DENIED_CONSENT: ConsentState = Object.freeze({ analytics: false, advertisement: false, functional: false });

declare global {
  interface Window {
    getCkyConsent?: () => { isUserActionCompleted?: boolean; categories?: Partial<ConsentState> };
    revisitCkyConsent?: () => void;
  }
}

/** Provider defaults never count as an explicit visitor decision. */
export function parseConsent(cookieHeader: string, provider?: ReturnType<NonNullable<Window["getCkyConsent"]>>): ConsentState {
  if (provider) {
    return provider.isUserActionCompleted === true ? {
      analytics: provider.categories?.analytics === true,
      advertisement: provider.categories?.advertisement === true,
      functional: provider.categories?.functional === true,
    } : DENIED_CONSENT;
  }
  const cookie = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith("cookieyes-consent="));
  if (!cookie) return DENIED_CONSENT;
  try {
    const fields = Object.fromEntries(decodeURIComponent(cookie.slice("cookieyes-consent=".length)).split(",").map((field) => {
      const separator = field.indexOf(":");
      return [field.slice(0, separator), field.slice(separator + 1)];
    }));
    if (fields.action !== "yes") return DENIED_CONSENT;
    return { analytics: fields.analytics === "yes", advertisement: fields.advertisement === "yes", functional: fields.functional === "yes" };
  } catch { return DENIED_CONSENT; }
}

let current = DENIED_CONSENT;
const listeners = new Set<() => void>();
let interval: ReturnType<typeof setInterval> | undefined;
const events = ["cookieyes_banner_load", "cookieyes_banner_loaded", "cookieyes_consent_update"];

export function readCurrentConsent(): ConsentState {
  if (typeof window === "undefined") return DENIED_CONSENT;
  let provider: ReturnType<NonNullable<Window["getCkyConsent"]>> | undefined;
  try { provider = window.getCkyConsent?.(); } catch { /* Read a saved explicit decision if the provider is unavailable. */ }
  return parseConsent(document.cookie, provider);
}

export const getConsentSnapshot = () => current;
const refresh = () => {
  const next = readCurrentConsent();
  if (!Object.keys(next).some((key: keyof ConsentState) => next[key] !== current[key])) return;
  current = next;
  listeners.forEach((notify) => notify());
};
export function subscribeToConsent(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    events.forEach((event) => document.addEventListener(event, refresh));
    window.addEventListener("focus", refresh);
    // Legacy banners do not always emit an event when a saved cookie changes.
    interval = setInterval(refresh, 1000);
  }
  refresh();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      events.forEach((event) => document.removeEventListener(event, refresh));
      window.removeEventListener("focus", refresh);
      clearInterval(interval);
      interval = undefined;
    }
  };
}

export function openConsentPreferences() {
  if (typeof window === "undefined") return;
  window.revisitCkyConsent?.();
}
