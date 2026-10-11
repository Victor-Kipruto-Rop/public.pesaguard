import { navigation } from "@/config/navigation";

/**
 * Canonical site facts.
 *
 * `maturity` and `scope` are the single source of truth for how
 * the product's status is described across the site. Update them here first,
 * and only claim what the repository can show evidence for.
 */
export const siteConfig = {
  name: "PesaGuard",
  tagline: "Real-time M-Pesa reconciliation and anomaly detection.",
  description:
    "PesaGuard watches M-Pesa (Safaricom Daraja) transaction flow as it happens, matches callbacks against internal records, and flags mismatches and suspicious patterns before they become disputes or losses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pesaguard.co.ke",
  email: "hello@pesaguard.co.ke",
  repository: "https://github.com/Victor-Kipruto-Rop/pesaguard",
  region: "Nairobi, Kenya",
  /** Product maturity, stated the same way everywhere. */
  maturity: "MVP live with a pilot customer. Production hardening in progress.",
  /** The payment scope we actually support today. */
  scope: "Active payment scope: M-Pesa (Safaricom Daraja).",
  nav: navigation.primary,
};

export type SiteConfig = typeof siteConfig;
