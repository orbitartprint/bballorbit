import distribution from "@/data/appDistribution.json";

export const appDistribution = distribution;

export type AppLinkPlacement =
  | "home_hero"
  | "home_product"
  | "footer"
  | "app_page"
  | "practice_planning_article"
  | "web_app_header"
  | "web_app_dashboard";

/** Reuses existing analytics; never loads a tracker or delays navigation. */
export function trackAppLink(
  destination: "ios" | "android" | "web" | "details",
  placement: AppLinkPlacement,
) {
  if (typeof window === "undefined") return;

  try {
    const analytics = window as Window & {
      gtag?: (command: string, event: string, parameters: Record<string, string>) => void;
    };
    analytics.gtag?.("event", destination === "ios" || destination === "android" ? "app_store_click" : "app_link_click", {
      app_destination: destination,
      app_placement: placement,
    });
  } catch {
    // Analytics is optional. A blocked tracker must not break the link.
  }
}
