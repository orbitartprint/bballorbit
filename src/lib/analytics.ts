import { readCurrentConsent } from "./consent";

export const GA_MEASUREMENT_ID = "G-Y60WQZCGGY";
type AnalyticsValue = string | number | boolean;
type Gtag = (...parameters: unknown[]) => void;
declare global { interface Window { gtag?: Gtag; dataLayer?: unknown[]; } }

const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
const campaignKeys = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"]);

/** Avoid forwarding search terms, emails, tokens and URL fragments to analytics. */
export function analyticsUrl(value: string, keepCampaign = true) {
  const input = new URL(value, "https://bballorbit.com");
  const output = new URL(input.origin + input.pathname);
  if (keepCampaign) for (const [key, item] of input.searchParams) {
    if (campaignKeys.has(key) && item.length <= 200 && !item.includes("@")) output.searchParams.set(key, item);
  }
  return output.href;
}

export function createAnalyticsController(adapter: { send: Gtag; load: () => void; disable: (disabled: boolean) => void; clearCookies: () => void }) {
  let initialized = false;
  let allowed = false;
  let lastNavigation = "";
  let previousPage = "";
  return {
    consent(granted: boolean) {
      adapter.disable(!granted);
      if (allowed === granted) return;
      allowed = granted;
      lastNavigation = "";
      previousPage = "";
      if (!granted) {
        if (initialized) { adapter.send("consent", "update", denied); adapter.clearCookies(); }
        return;
      }
      if (!initialized) {
        adapter.send("consent", "default", denied);
        adapter.send("js", new Date());
        adapter.send("consent", "update", { ...denied, analytics_storage: "granted" });
        adapter.send("config", GA_MEASUREMENT_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        adapter.load();
        initialized = true;
      } else adapter.send("consent", "update", { ...denied, analytics_storage: "granted" });
    },
    page(url: string, navigationKey: string, title: string, referrer: string) {
      if (!allowed || lastNavigation === navigationKey) return;
      const page = analyticsUrl(url);
      adapter.send("event", "page_view", { page_location: page, page_title: title, page_referrer: previousPage || (referrer ? analyticsUrl(referrer, false) : "") });
      lastNavigation = navigationKey;
      previousPage = page;
    },
  };
}

const send: Gtag = (...parameters) => {
  window.dataLayer ??= [];
  window.gtag ??= function () {
    // eslint-disable-next-line prefer-rest-params -- Preserve the documented Google tag command queue format.
    window.dataLayer!.push(arguments);
  };
  window.gtag(...parameters);
};
const controller = createAnalyticsController({
  send,
  disable(disabled) { (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled; },
  clearCookies() {
    for (const field of document.cookie.split(";")) {
      const name = field.split("=", 1)[0].trim();
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ["", location.hostname, ".bballorbit.com"]) document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""} SameSite=Lax`;
    }
  },
  load() {
    if (document.getElementById("website-analytics")) return;
    const script = document.createElement("script");
    script.id = "website-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  },
});

export const updateAnalyticsConsent = (granted: boolean) => controller.consent(granted);
export const trackPageView = (url: string, key: string, title: string, referrer: string) => {
  if (readCurrentConsent().analytics) controller.page(url, key, title, referrer);
};
export function trackWebsiteEvent(event: string, parameters: Record<string, AnalyticsValue>) {
  if (typeof window !== "undefined" && readCurrentConsent().analytics) window.gtag?.("event", event, parameters);
}
