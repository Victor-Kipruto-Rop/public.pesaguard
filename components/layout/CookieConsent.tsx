"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CONSENT_KEY = "pesaguard_cookie_consent_v2";
type ConsentChoice = "allow" | "deny";
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function parseConsent(value: string | null): ConsentChoice | null {
  if (!value) return null;
  try {
    const saved: unknown = JSON.parse(value);
    if (typeof saved !== "object" || saved === null) return null;
    const choice = Reflect.get(saved, "choice");
    const measurementId = Reflect.get(saved, "measurementId");
    if (
      (choice !== "allow" && choice !== "deny") ||
      measurementId !== (GA_MEASUREMENT_ID ?? null)
    ) {
      return null;
    }
    return choice;
  } catch (error) {
    console.error("Unable to parse the saved cookie preference.", error);
    return null;
  }
}

function readConsent(): ConsentChoice | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_KEY));
  } catch (error) {
    console.error("Unable to read the cookie preference from local storage.", error);
    return null;
  }
}

function clearGoogleAnalyticsCookies() {
  const analyticsCookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((name) => name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"));
  const domains = [undefined, ...(location.hostname.endsWith("pesaguard.co.ke") ? ["pesaguard.co.ke"] : [])];

  for (const name of analyticsCookieNames) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function applyAnalyticsChoice(choice: ConsentChoice | null, pathname: string) {
  if (!GA_MEASUREMENT_ID) return;
  if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
    console.error("Google Analytics is disabled because NEXT_PUBLIC_GA_MEASUREMENT_ID is invalid.");
    return;
  }

  const disableKey = `ga-disable-${GA_MEASUREMENT_ID}`;
  if (choice !== "allow") {
    Reflect.set(window, disableKey, true);
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    clearGoogleAnalyticsCookies();
    return;
  }

  Reflect.set(window, disableKey, false);
  if (!window.gtag) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag("js", new Date());
    window.gtag("consent", "default", { analytics_storage: "denied" });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    script.dataset.pesaguardAnalytics = "true";
    script.addEventListener("error", () => console.error("Unable to load the opted-in Google Analytics script."));
    document.head.append(script);
  } else {
    window.gtag("consent", "update", { analytics_storage: "granted" });
  }

  window.gtag("event", "page_view", {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
  });
}

export function CookieConsent() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = readConsent();
    setChoice(savedChoice);
    setVisible(savedChoice === null);

    const openSettings = () => setVisible(true);
    const syncChoice = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      const nextChoice = parseConsent(event.newValue);
      setChoice(nextChoice);
      setVisible(nextChoice === null);
    };
    window.addEventListener("pesaguard:open-cookie-settings", openSettings);
    window.addEventListener("storage", syncChoice);
    return () => {
      window.removeEventListener("pesaguard:open-cookie-settings", openSettings);
      window.removeEventListener("storage", syncChoice);
    };
  }, []);

  useEffect(() => {
    applyAnalyticsChoice(choice, pathname);
  }, [choice, pathname]);

  function saveChoice(nextChoice: ConsentChoice) {
    try {
      window.localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ choice: nextChoice, measurementId: GA_MEASUREMENT_ID ?? null }),
      );
    } catch (error) {
      console.error("Unable to save the cookie preference to local storage.", error);
    }
    setChoice(nextChoice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside aria-label="Cookie preferences" className="cookie-consent" role="region">
      <div className="cookie-consent-copy">
        <p className="cookie-consent-eyebrow">YOUR PRIVACY, YOUR CHOICE</p>
        <h2>Choose optional analytics</h2>
        <p>
          Essential site storage keeps this choice in your browser. Google Analytics is planned
          and is not active unless PesaGuard configures a measurement ID; if enabled, it loads
          only after you allow analytics. Your choice is saved locally and can be changed at any
          time.
        </p>
        {choice ? <p className="cookie-consent-saved">Saved preference: {choice === "allow" ? "Analytics allowed" : "Optional analytics denied"}</p> : null}
        <Link href="/cookies">Read our cookie notice</Link>
      </div>
      <div className="cookie-consent-actions">
        <button className="cookie-consent-allow" onClick={() => saveChoice("allow")} type="button">
          Allow analytics
        </button>
        <button className="cookie-consent-deny" onClick={() => saveChoice("deny")} type="button">
          Reject optional
        </button>
      </div>
    </aside>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      className="legal-cookie-settings-button"
      aria-label="Open cookie preferences"
      onClick={() => window.dispatchEvent(new Event("pesaguard:open-cookie-settings"))}
      type="button"
    >
      Cookie preferences
    </button>
  );
}
