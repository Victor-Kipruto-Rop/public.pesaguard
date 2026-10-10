import type { IntegrationSummary } from "@/types/content";

/**
 * Public-facing integration inventory. Evidence stays in the repository for
 * maintainers; customer pages describe availability without exposing source
 * file paths or implying roadmap work is shipped.
 */
export const integrations: IntegrationSummary[] = [
  {
    name: "M-Pesa (Safaricom Daraja)",
    href: "/integrations/mpesa",
    availability: "pilot",
    summary:
      "The active pilot scope: receive Daraja callbacks, validate and de-duplicate events, and compare them with internal records for exception review.",
    evidence: "docs/product/PILOT_READINESS.md · docs/architecture/CURRENT_ARCHITECTURE.md",
  },
  {
    name: "Outbound webhooks",
    href: "/integrations/webhooks",
    availability: "pilot",
    summary:
      "Configured outbound event delivery with signatures, recorded attempts, bounded retries and a dead-letter path in the pilot scope.",
    evidence: "webhook_manager.py · webhook delivery tables and migrations",
  },
  {
    name: "Airtel Money",
    href: "/integrations/airtel-money",
    availability: "not-started",
    summary:
      "Planned mobile-money connector. Airtel events cannot be connected, imported or reconciled through PesaGuard today.",
    evidence: "docs/architecture/CURRENT_ARCHITECTURE.md: Airtel Money is not implemented",
  },
  {
    name: "Bank rails",
    href: "/integrations/banks",
    availability: "not-started",
    summary:
      "Planned bank statement and settlement scope. No bank APIs, account connections or statement imports are available today.",
    evidence: "docs/architecture/CURRENT_ARCHITECTURE.md: bank adapters not implemented",
  },
  {
    name: "Point of sale",
    href: "/integrations/pos",
    availability: "not-started",
    summary:
      "Planned POS and acquirer scope. Terminal feeds and in-store transaction records are not ingested today.",
    evidence: "docs/product/PRODUCT_SCOPE.md: M-Pesa is the active scope",
  },
];

export const availableIntegrations = integrations.filter(
  (integration) => integration.availability === "available" || integration.availability === "pilot",
);

export const pendingIntegrations = integrations.filter(
  (integration) => integration.availability !== "available" && integration.availability !== "pilot",
);
