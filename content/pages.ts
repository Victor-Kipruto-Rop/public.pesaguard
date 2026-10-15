import type { PageData } from "@/types/content";
import { docsUrl } from "@/config/docs";

export const pages: Record<string, PageData> = {
  product: {
    title: "A clearer payment operation.",
    description: "See how PesaGuard compares Safaricom Daraja M-Pesa events with business records, surfaces exceptions and supports accountable review.",
    label: "PesaGuard product",
    lede: "Understand how PesaGuard processes payment data, reconciles records, detects discrepancies and supports financial accountability.",
    sections: [],
    status: {
      availability: "pilot",
      label: "MVP live with a pilot customer",
      note: "Safaricom Daraja M-Pesa pilot; production hardening is in progress.",
    },
    faq: [
      { question: "What is PesaGuard?", answer: "PesaGuard is a payment reconciliation and exception-review product. It compares payment events with expected business records and helps teams follow up on differences." },
      { question: "How does reconciliation work?", answer: "The configured workflow validates and compares Daraja events with the business records supplied for the pilot. Matching fields and tolerances are agreed for each flow; unresolved differences are sent for review." },
      { question: "Which M-Pesa flows are supported?", answer: "Safaricom Daraja M-Pesa is the active pilot scope. PayBill or Buy Goods/Till support depends on merchant eligibility, Daraja access and callback configuration." },
      { question: "Can PesaGuard identify missing or duplicate transactions?", answer: "The workflow can surface unmatched records and handle repeated provider events. Results depend on source data and the matching configuration." },
      { question: "Does PesaGuard prevent fraud?", answer: "No. An anomaly is a reason to investigate, not proof of fraud or an automatic payment block. A responsible team reviews the evidence and decides what to do." },
      { question: "Can it integrate with existing business systems?", answer: "The API and webhook interfaces are documented. Specific POS, accounting, ERP, SACCO or other provider connectors are not implied; confirm a required data path with the team." },
      { question: "How is transaction data protected?", answer: "Published security information describes authentication, access permissions, tenant separation, encryption and audit controls. Confirm deployment-specific details with the team." },
      { question: "How do I get started?", answer: "Contact the team to review your Daraja setup, the internal records to compare and the test arrangements for a scoped pilot." },
    ],
  },
  solutions: {
    title: "Payment operations that fit your world.",
    description: "Purpose-built workflows for teams moving money across East Africa.",
    sections: [
      {
        title: "A clearer operating rhythm",
        body: "Whether you run a SACCO, merchant network, institution, or fintech, PesaGuard turns fragmented payment data into accountable action.",
        items: [
          "SACCOs: reconcile member collections with confidence",
          "Merchants: protect revenue across every channel",
          "Financial institutions: strengthen controls without slowing teams",
          "Fintechs: scale payment operations with durable foundations",
        ],
      },
    ],
    related: [
      { label: "SACCOs", href: "/solutions/saccos", description: "Member contributions and loan repayments." },
      { label: "Merchants", href: "/solutions/merchants", description: "STK Push volume and reversal checks." },
      { label: "Fintechs", href: "/solutions/fintechs", description: "Fraud visibility without a data team." },
    ],
    cta: {
      eyebrow: "Find your fit",
      title: "Tell us how money moves through your organisation.",
      body: "We will map your flow to the reconciliation, monitoring and alerting controls that matter first.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Start a solutions conversation." },
    },
  },
  "how-it-works": {
    title: "How payment reconciliation works.",
    description: "A clear guide to how the Safaricom Daraja M-Pesa pilot receives payment events, compares them with business records and routes differences for human review.",
    lede: "Follow a payment event from the Daraja callback through validation and matching to a recorded team decision. The active integration is currently in a customer pilot.",
    status: {
      availability: "pilot",
      label: "MVP live with a pilot customer",
      note: "Active payment scope: Safaricom Daraja M-Pesa.",
    },
    sections: [],
    faq: [
      { question: "What information is compared?", answer: "The agreed workflow can compare available transaction references and amounts, plus any configured timing tolerance. The fields and rules are confirmed for each pilot flow." },
      { question: "What happens when a payment has no matching record?", answer: "It remains unmatched for the customer team to investigate. The team may need to check whether the expected business record arrived or whether the reference needs clarification." },
      { question: "Does a flagged transaction mean fraud?", answer: "No. A mismatch or unusual signal is a reason to review available evidence. An authorized customer reviewer decides what action to take." },
      { question: "Which payment methods does this flow support?", answer: "Safaricom Daraja M-Pesa is the active pilot scope. PayBill and Buy Goods/Till eligibility depends on merchant access and the callback configuration. Other provider connections should not be assumed." },
      { question: "Does PesaGuard move or hold money?", answer: "No. PesaGuard supports reconciliation and exception review; it does not itself initiate payments or hold customer funds." },
    ],
  },
  features: {
    title: "Every payment should have a clear record.",
    description: "See how PesaGuard compares M-Pesa payment callbacks with business records, explains exceptions and supports accountable review.",
    label: "PesaGuard features",
    lede: "PesaGuard helps finance and operations teams understand what was received, what it matched, and what still needs a person to review it.",
    status: {
      availability: "pilot",
      label: "MVP live with a pilot customer",
      note: "Active payment scope: Safaricom Daraja M-Pesa. Feature coverage is confirmed for each pilot workflow.",
    },
    features: [
      { iconKey: "reconcile", title: "Reconciliation", body: "Compare a Safaricom Daraja M-Pesa callback with the expected order, receipt or ledger record. See the result and why it needs attention.", href: "/product/reconciliation", linkLabel: "View reconciliation details" },
      { iconKey: "monitor", title: "Transaction monitoring", body: "Follow payment events through validation, matching and review. Help teams see pending work and changes in the pilot flow.", href: "/features/transaction-monitoring", linkLabel: "View monitoring details" },
      { iconKey: "shield", title: "Fraud signals", body: "Surface unusual patterns for investigation. A flag is context for a human reviewer, not a fraud finding or an automatic block.", href: "/features/fraud-detection", linkLabel: "View fraud-signal details" },
      { iconKey: "alert", title: "Exception alerts", body: "Make an unresolved difference easier to notice and follow up, with the reason and available transaction context.", href: "/features/real-time-alerts", linkLabel: "View alert details" },
      { iconKey: "report", title: "Reporting", body: "Summarize reconciliation outcomes and open exceptions so finance and operations can review activity over an agreed period.", href: "/features/reporting", linkLabel: "View reporting details" },
      { iconKey: "audit", title: "Audit trail", body: "Keep the context behind important workflow actions and decisions available for later operational review.", href: "/features/audit-trail", linkLabel: "View audit-trail details" },
      { iconKey: "data", title: "Data quality", body: "Check incoming payment data for missing or inconsistent information before teams rely on it to explain a result.", href: "/features/data-quality", linkLabel: "View data-quality details" },
    ],
    sections: [],
    cta: {
      eyebrow: "Start with your payment flow",
      title: "Make the records easier to explain.",
      body: "Tell us how M-Pesa payments arrive, which business records they should match, and how your team handles exceptions. We will clarify fit and pilot coverage before you integrate.",
      primary: { label: "Discuss a pilot", href: "/contact/sales", description: "Discuss the current pilot scope." },
    },
  },
  security: {
    title: "Security controls you can review.",
    description: "Explore PesaGuard's documented security control areas and the deployment-specific evidence customers should verify before use.",
    lede: "Payment and reconciliation data deserve careful handling. We describe the safeguards the platform is designed around, distinguish them from deployment evidence, and invite customers to review the details relevant to their environment.",
    status: {
      availability: "pilot",
      label: "MVP live with a pilot customer",
      note: "Production hardening is in progress; deployment controls require review.",
    },
    faq: [
      {
        question: "Does PesaGuard hold an independent security certification?",
        answer: "No third-party security certification is currently claimed for PesaGuard. The security materials describe controls and the evidence customers can review directly; they are not a substitute for an independent certification or audit. If an attestation is a procurement requirement, ask whether one is available before sharing production data.",
      },
      {
        question: "How is one customer's data kept separate from another's?",
        answer: "The documented design scopes tenant-owned resources to the authenticated tenant context and describes tenant separation at the database layer. That describes the intended control, not proof that every route, background job, export or deployment has been verified. For the environment you plan to use, request current cross-tenant test results and review how the boundary is enforced across those paths.",
      },
      {
        question: "Is payment data encrypted, and how are keys handled?",
        answer: "Published security material describes encrypted traffic between services and encryption for sensitive data at rest. It also states that keys are kept outside application source and rotated, while credentials and keys are excluded from logs and audit entries. Confirm the hosting configuration, key-management responsibilities, rotation process and any customer-specific options for your deployment.",
      },
      {
        question: "What information appears in logs and audit records?",
        answer: "The documented approach excludes credentials, tokens and keys from logs and audit entries, and describes redacting sensitive fields at logging boundaries. Audit records are intended to help trace actors, tenant context and transaction-related decisions. Ask to review the deployed redaction rules, recorded fields, access to logs and retention period before onboarding.",
      },
      {
        question: "How long is customer data kept, and how can it be deleted?",
        answer: "The security materials describe retention and archival under a documented policy that considers tenant, legal-hold and residency requirements; they do not specify a single universal retention period here. Confirm the schedule, deletion process, archival behavior and any legal-hold exceptions in the applicable agreement and deployment before sending data.",
      },
      {
        question: "Are backups, recovery and incident response verified?",
        answer: "This page does not claim a tested backup restoration, recovery-time objective, recovery-point objective or independently verified incident-response capability. Those require operational evidence from the relevant environment. Before production use, request the current backup-and-restore results, recovery responsibilities, escalation path and incident communication process.",
      },
      {
        question: "How are payment callbacks and webhooks protected?",
        answer: "Published integration material describes signature verification for inbound provider callbacks, and recommends that webhook consumers verify signatures and handle retries or repeated deliveries safely. The exact signature scheme, replay protections and failure behavior depend on the integration contract. Confirm the supported controls for your Daraja pilot flow and test them before go-live.",
      },
    ],
    pillars: [
      { index: "01", title: "Encrypt in transit and at rest", body: "Protect sensitive payment and operational data across every hop." },
      { index: "02", title: "Authenticate explicitly", body: "Bearer tokens, scopes and rotation for server-to-server access." },
      { index: "03", title: "Isolate tenants", body: "Every tenant-owned resource is evaluated against the authenticated tenant context." },
      { index: "04", title: "Keep evidence", body: "Append-only audit records make review and compliance practical." },
    ],
    sections: [
      {
        title: "Designed for accountable access",
        body: "PesaGuard keeps security practical: protect data in transit and at rest, make access explicit, isolate tenants, and retain useful evidence.",
        items: ["Encryption-aware architecture", "Authentication and role-based access", "Tenant isolation", "Operational compliance controls"],
      },
    ],
    related: [
      { label: "Tenant isolation", href: "/security/tenant-isolation", description: "Strong boundaries between tenants." },
      { label: "Authentication", href: "/security/authentication", description: "Identity teams can reason about." },
      { label: "Compliance", href: "/security/compliance", description: "Policies as visible controls." },
    ],
    cta: {
      eyebrow: "Review the controls",
      title: "Bring your security questionnaire to the first call.",
      body: "We will walk through encryption, isolation, access and audit evidence line by line.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Start a security review." },
    },
  },
  integrations: {
    title: "Meet your payment stack where it is.",
    description: "Connect the rails, channels, and systems that matter to your operation.",
    lede: "M-Pesa (Safaricom Daraja) and outbound webhooks are live. Everything else on this page is named so the scope is unambiguous.",
    sections: [
      {
        title: "Start with the signals you already have",
        body: "Use adapters and webhooks to bring mobile money, banks, point of sale, and internal events into a consistent operational model.",
        items: ["M-Pesa", "Airtel Money", "Banks", "Point of sale", "Webhooks"],
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "Daraja callbacks, validated and matched." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed delivery with retries and dead letters." },
      { label: "Webhook docs", href: docsUrl("webhooks/"), description: "Signature checks, retries and replay." },
    ],
    cta: {
      eyebrow: "Check your rail",
      title: "Tell us which rails and channels you depend on.",
      body: "We will confirm what is live today and what the path looks like for the rest.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Confirm integration scope." },
    },
  },
  about: {
    title: "Building trust into African payments.",
    description: "PesaGuard is focused on the operational layer that makes digital payments dependable.",
    lede: "MVP live with a pilot customer. Active payment scope: M-Pesa (Safaricom Daraja).",
    timeline: [
      { when: "Now", title: "Pilot live", body: "Real-time M-Pesa reconciliation and anomaly detection with a pilot customer.", state: "active" },
      { when: "Next", title: "Production hardening", body: "Reliability, evidence and review workflows for wider rollout.", state: "todo" },
      { when: "Later", title: "More rails", body: "Additional payment rails only when adapters, tests and docs exist.", state: "todo" },
    ],
    sections: [
      { title: "Our mission", body: "Make it easier for payment teams to know what happened, why it happened, and what to do next." },
      { title: "Our approach", body: "We favor durable controls, clear evidence, and systems that respect the realities of high-volume payment operations." },
    ],
    related: [
      { label: "Product overview", href: "/product", description: "What PesaGuard does today." },
      { label: "Contact", href: "/contact", description: "Start a conversation with the team." },
    ],
    cta: {
      eyebrow: "Meet the team",
      title: "Tell us what you reconcile today.",
      body: "We build around real operator workflows.",
      primary: { label: "Contact us", href: "/contact", description: "Start a conversation." },
    },
  },
};
