import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useConsent } from "./useConsent";
import { trackPageView, updateAnalyticsConsent } from "@/lib/analytics";
export default function usePageTracking() {
  const location = useLocation();
  const { analytics } = useConsent();
  useEffect(() => {
    updateAnalyticsConsent(analytics);
    if (analytics) trackPageView(window.location.href, `${location.key}:${location.pathname}:${location.search}`, document.title, document.referrer);
  }, [analytics, location.key, location.pathname, location.search]);
}
