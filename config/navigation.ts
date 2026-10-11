import type { FooterGroup, NavItem } from "@/types/navigation";
import { docsUrl } from "@/config/docs";

/**
 * Header navigation.
 *
 * Every top-level entry links to a real destination. Entries with `groups`
 * also open a mega-menu panel, and the panels only list destinations that
 * exist as routes so the header cannot promise pages we do not ship.
 */
const primary: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    groups: [
      {
        title: "Platform",
        links: [
          { label: "Product overview", href: "/product", description: "What PesaGuard does and where it stands today" },
          { label: "How it works", href: "/how-it-works", description: "From Daraja callback to reconciled record" },
          { label: "Customer requirements", href: "/how-it-works#customer-requirements", description: "What your team needs to prepare for a pilot" },
          { label: "Security model", href: "/security", description: "Tenant isolation, access control, audit trail" },
          { label: "System status", href: "/status", description: "Live health of the services we run" },
        ],
      },
      {
        title: "Capabilities",
        links: [
          { label: "Reconciliation", href: "/features/reconciliation", description: "Match callbacks to internal records as they land" },
          { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Watch the M-Pesa flow in real time" },
          { label: "Fraud detection", href: "/features/fraud-detection", description: "Rule-based and statistical anomaly checks" },
          { label: "Real-time alerts", href: "/features/real-time-alerts", description: "SMS, email and Slack notifications" },
          { label: "Reporting", href: "/features/reporting", description: "Operational and reconciliation summaries" },
          { label: "Audit trail", href: "/features/audit-trail", description: "Append-only record of decisions and actions" },
        ],
      },
    ],
    foot: {
      label: "Talk to the team about your M-Pesa flow",
      href: "/contact/sales",
      description: "Bring your transaction volume and current reconciliation process.",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        title: "By organisation",
        links: [
          { label: "SACCOs", href: "/solutions/saccos", description: "Member collections and exception review" },
          { label: "All organizations", href: "/solutions/by-organization", description: "Explore every organization-specific solution" },
          { label: "Merchants", href: "/solutions/merchants", description: "M-Pesa payment events and order records" },
          { label: "Fintechs", href: "/solutions/fintechs", description: "Fraud visibility without a data team" },
          { label: "Financial institutions", href: "/solutions/financial-institutions", description: "Controls and evidence for audits" },
        ],
      },
      {
        title: "By problem",
        links: [
          { label: "Payment records do not match", href: "/features/reconciliation", description: "Compare M-Pesa events with internal records" },
          { label: "Poor payment visibility", href: "/features/transaction-monitoring", description: "Review the events and exceptions in scope" },
          { label: "Unusual activity", href: "/features/fraud-detection", description: "Investigate anomaly signals without treating them as verdicts" },
          { label: "Late exception handoffs", href: "/features/real-time-alerts", description: "Define owners and verify configured alert channels" },
          { label: "All problem solutions", href: "/solutions/by-problem", description: "Explore operational problems and current limits" },
        ],
      },
    ],
    foot: { label: "Read how it works end to end", href: "/how-it-works", description: "The full path from callback to reconciled record." },
  },
  {
    label: "Features",
    href: "/features",
    groups: [
      {
        title: "Reconcile",
        links: [
          { label: "Reconciliation", href: "/features/reconciliation", description: "Real-time matching against internal records" },
          { label: "Data quality", href: "/features/data-quality", description: "Completeness, duplicates and validity checks" },
        ],
      },
      {
        title: "Monitor",
        links: [
          { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "Live flow, timing and volume signals" },
          { label: "Real-time alerts", href: "/features/real-time-alerts", description: "Notify owners the moment something breaks" },
        ],
      },
      {
        title: "Protect",
        links: [
          { label: "Fraud detection", href: "/features/fraud-detection", description: "Duplicate, amount and timing anomalies" },
          { label: "Audit trail", href: "/features/audit-trail", description: "Append-only history with actor and reason" },
        ],
      },
      {
        title: "Report",
        links: [
          { label: "Reporting", href: "/features/reporting", description: "Summaries for finance and operations" },
        ],
      },
    ],
    foot: { label: "See the capability status list", href: "/features", description: "Each capability marked available, in progress, planned or not started." },
  },
  {
    label: "Integrations",
    href: "/integrations",
    groups: [
      {
        title: "Available now",
        links: [
          { label: "M-Pesa (Daraja)", href: "/integrations/mpesa", availability: "available", description: "Callbacks, OAuth, validation and matching" },
          { label: "Outbound webhooks", href: "/integrations/webhooks", availability: "available", description: "Delivery attempts, retries and dead letters" },
        ],
      },
      {
        title: "Not started",
        links: [
          { label: "Airtel Money", href: "/integrations/airtel-money", availability: "not-started", description: "No adapter exists today" },
          { label: "Bank rails", href: "/integrations/banks", availability: "not-started", description: "No adapter exists today" },
          { label: "Point of sale", href: "/integrations/pos", availability: "not-started", description: "No adapter exists today" },
        ],
      },
    ],
    foot: { label: "Read the integration status list", href: "/integrations", description: "What is live, what is planned, and what is out of scope." },
  },
  { label: "How it works", href: "/how-it-works" },
];

/** Footer columns, rendered by `Footer`. */
const footer: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "Product overview", href: "/product" },
      { label: "Features", href: "/features" },
      { label: "Reconciliation", href: "/features/reconciliation" },
      { label: "Integrations", href: "/integrations" },
      { label: "How it works", href: "/how-it-works" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "SACCOs", href: "/solutions/saccos" },
      { label: "Merchants", href: "/solutions/merchants" },
      { label: "Financial institutions", href: "/solutions/financial-institutions" },
      { label: "Fintechs", href: "/solutions/fintechs" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Get started", href: docsUrl("getting-started/quickstart.html") },
      { label: "API reference", href: "/api" },
      { label: "Webhooks", href: docsUrl("webhooks/") },
      { label: "Error handling", href: docsUrl("errors/") },
      { label: "Changelog", href: docsUrl("changelog/") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sales", href: "/contact/sales" },
      { label: "Support", href: "/contact/support" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Security model", href: "/security" },
      { label: "Tenant isolation", href: "/security/tenant-isolation" },
      { label: "Authentication", href: "/security/authentication" },
      { label: "Access control", href: "/security/access-control" },
      { label: "Encryption", href: "/security/encryption" },
      { label: "Compliance", href: "/security/compliance" },
    ],
  },
];

export const navigation = { primary, footer };
