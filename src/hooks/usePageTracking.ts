// src/hooks/usePageTracking.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Automatically tracks page views in Google Analytics (GA4)
 * when the route changes in your React app.
 */
export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-Y60WQZCGGY", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}
