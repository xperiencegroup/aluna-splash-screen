declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string) {
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event });
    }

    if (import.meta.env.DEV) {
      console.log("[track]", event);
    }
  } catch {}
}
