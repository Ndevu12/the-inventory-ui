export const CONTACT_ANALYTICS_EVENTS = [
  "view",
  "sign-in",
  "get-started",
] as const;

export type ContactAnalyticsEvent = (typeof CONTACT_ANALYTICS_EVENTS)[number];

export type ContactAnalyticsConsent = "granted" | "denied";

const STORAGE_KEY = "contact-analytics-consent";

/** Read the stored choice, or null when the visitor has not answered. */
export function readContactAnalyticsConsent(): ContactAnalyticsConsent | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

/** Remember whether anonymous contact counts are allowed on this browser. */
export function storeContactAnalyticsConsent(value: ContactAnalyticsConsent): void {
  window.localStorage.setItem(STORAGE_KEY, value);
}

/** Send one contact event when the visitor has allowed counts. */
export function trackContactEvent(event: ContactAnalyticsEvent): void {
  if (readContactAnalyticsConsent() !== "granted") return;
  void fetch("/api/contact-analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event, path: "/contact" }),
    keepalive: true,
  }).catch(() => undefined);
}
