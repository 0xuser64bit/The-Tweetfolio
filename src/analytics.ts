export const GA_MEASUREMENT_ID = "G-W5CMW8EPJL";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Sends a `page_view` to Google Analytics for a client-side navigation.
 * The gtag.js snippet in `index.html` already logs the initial page load;
 * this covers every subsequent navigation in the SPA (including the
 * client-side `*` fallback, which lives outside `Layout`).
 */
export function trackPageView(pagePath: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: pagePath,
  });
}
