type Store = { id: string; url: string | null };
type Device = { userAgent: string; maxTouchPoints?: number };

/** Keep desktop navigation separate; mobile store handoff requires a direct user gesture. */
export function getStoreNavigation(store: Store, device?: Device) {
  if (!store.url) return {};
  const browser = device ?? (typeof navigator === "undefined" ? { userAgent: "" } : navigator);
  const androidChrome = /Android/i.test(browser.userAgent) && /Chrome\//i.test(browser.userAgent) && !/; wv\)/i.test(browser.userAgent);
  const ios = /iPhone|iPad|iPod/i.test(browser.userAgent) || (/Macintosh/i.test(browser.userAgent) && (browser.maxTouchPoints ?? 0) > 1);
  if (store.id === "android" && androidChrome) {
    const url = new URL(store.url);
    const packageId = encodeURIComponent(url.searchParams.get("id") ?? "");
    // Chrome opens Google Play; devices without Play fall back to the official HTTPS listing.
    return {
      href: `intent://details?id=${packageId}#Intent;scheme=market;package=com.android.vending;S.browser_fallback_url=${encodeURIComponent(store.url)};end`,
      target: "_self",
      rel: "noopener noreferrer",
    };
  }
  // Apple's official HTTPS app links allow iOS/iPadOS to hand off to the App Store.
  return { href: store.url, target: store.id === "ios" && ios ? "_self" : "_blank", rel: "noopener noreferrer" };
}
