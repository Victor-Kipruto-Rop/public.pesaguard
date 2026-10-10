import type { PageData } from "@/types/content";

/**
 * Integration pages describe the customer outcome, prerequisites and current
 * boundary. Roadmap capabilities are explicitly framed as potential scope,
 * not as commitments or supported features.
 */
export const integrationDetails: Record<string, PageData> = {
  "Bring M-Pesa events into focus.": {
    title: "Bring M-Pesa events into focus.",
    description: "Current pilot integration for Safaricom M-Pesa through Daraja.",
    label: "M-Pesa · available in pilot",
    lede: "PesaGuard receives Safaricom Daraja payment callbacks, validates and de-duplicates events, then matches them against internal records so finance and operations teams can investigate what does not line up. This is the active payment-rail scope; availability remains subject to the pilot deployment and the customer’s Daraja setup.",
    status: {
      availability: "pilot",
      label: "Available in the current pilot scope.",
      note: "Requires an eligible Daraja setup and agreed callback configuration.",
    },
    spec: [
      { label: "Provider", value: "Safaricom M-Pesa / Daraja" },
      { label: "Event intake", value: "Daraja callbacks" },
      { label: "Core outcome", value: "Match and investigate" },
      { label: "Availability", value: "Pilot scope" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Receive payment events",
        body: "Daraja sends transaction notifications to the configured callback endpoint. PesaGuard uses those incoming events as the source signal for its current M-Pesa workflow; it is not a replacement for Safaricom or your business account.",
        items: ["Callback configuration is required", "Provider delivery and network availability still matter", "A callback is processed as an event, not treated as a guarantee that every business ledger is correct"],
      },
      {
        index: "02",
        title: "Validate, de-duplicate and match",
        body: "Incoming records are checked and duplicate handling helps prevent repeated notifications from becoming repeated business records. PesaGuard compares payment events with the internal records made available to the workflow and surfaces differences for investigation.",
        items: ["Reference and amount mismatches can be reviewed", "Missing counterpart records remain exceptions", "Teams retain responsibility for resolving business disputes"],
      },
      {
        index: "03",
        title: "Preserve an operational trail",
        body: "The workflow is designed to make payment events, reconciliation outcomes and follow-up easier to inspect. Outbound webhooks can notify systems that consume PesaGuard events where configured.",
      },
    ],
    sections: [
      {
        eyebrow: "What customers should prepare",
        title: "What is needed to connect",
        body: "A useful pilot starts with a clearly owned PayBill or Till flow, a Daraja application and callback configuration, and a reliable source of internal payment or ledger records to compare against.",
        items: [
          "An eligible Safaricom M-Pesa business setup and Daraja access",
          "Callback URLs and credentials configured for the agreed environment",
          "A definition of which internal records are authoritative for matching",
          "Named owners for exceptions, reversals and unresolved transactions",
          "A test plan covering successful, duplicated, delayed and mismatched events",
        ],
      },
      {
        eyebrow: "Operational expectations",
        title: "What PesaGuard does — and does not do",
        body: "PesaGuard supports visibility and reconciliation around M-Pesa events. It does not operate Safaricom’s network, guarantee callback delivery during provider outages, or make a fraud determination solely from an anomaly signal.",
        items: [
          "It helps teams find and explain mismatches; people still decide how to resolve them",
          "It does not guarantee that every bank settlement or internal ledger is correct",
          "Reversals, refunds and transaction-status checks depend on the provider flow and implemented scope",
          "Production readiness depends on deployment, callback configuration, monitoring and operational testing",
        ],
      },
    ],
    faq: [
      { question: "Is M-Pesa available now?", answer: "M-Pesa through Safaricom Daraja is the active integration in the current pilot scope. Contact the team to confirm eligibility and the exact configuration before planning a rollout." },
      { question: "Does PesaGuard move or hold customer money?", answer: "No. PesaGuard is an operational reconciliation and monitoring layer; it is not a wallet, bank, payment processor or custodian of customer funds." },
      { question: "Does an anomaly mean fraud?", answer: "No. An anomaly is a signal for review. The team should inspect the available evidence and follow its own approval and investigation process." },
      { question: "Can I connect Airtel, banks or POS at the same time?", answer: "Those adapters are not available today. Their pages explain the intended scope without implying that a connector can already be configured." },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matching and exceptions are presented." },
      { label: "Webhook delivery", href: "/integrations/webhooks", description: "Send configured events to your systems." },
      { label: "Documentation", href: "/documentation", description: "Review the current integration guidance." },
    ],
    cta: {
      eyebrow: "Pilot fit",
      title: "Confirm your Daraja flow before implementation.",
      body: "Share your PayBill or Till setup, internal record source and exception workflow. The team can confirm the current supported boundary and the steps needed for a pilot.",
      primary: { label: "Discuss an M-Pesa pilot", href: "/contact/sales", description: "Confirm current scope." },
      secondary: { label: "Read documentation", href: "/documentation", description: "Review available guidance." },
    },
  },

  "Connect Airtel Money without losing context.": {
    title: "Connect Airtel Money without losing context.",
    description: "Planned Airtel Money reconciliation connector; not available to connect yet.",
    label: "Airtel Money · under development",
    lede: "The intended goal is to help teams reconcile Airtel Money collections against their own invoices, receipts or ledger records using a consistent operational workflow. PesaGuard does not currently have an Airtel Money adapter, so Airtel transactions cannot be connected, imported or reconciled through this integration today.",
    status: {
      availability: "not-started",
      label: "Under development planning — not available today.",
      note: "No production connector, customer setup flow or delivery date is being promised.",
    },
    spec: [
      { label: "Provider", value: "Airtel Money" },
      { label: "Connector status", value: "Not implemented" },
      { label: "Transaction intake", value: "Not available" },
      { label: "Timeline", value: "Not committed" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Provider event intake — planned",
        body: "A future connector would need an approved Airtel developer application, the relevant country and product API permissions, environment configuration and a supported way to receive or retrieve transaction events. No Airtel endpoint is currently wired into PesaGuard.",
      },
      {
        index: "02",
        title: "Normalize payment records — planned",
        body: "The design goal is to map provider references, amounts, currency, timestamps, status and merchant identifiers into a common record shape while retaining provider-specific evidence. Field mapping and supported event types have not yet been validated against a live adapter.",
      },
      {
        index: "03",
        title: "Reconcile and investigate — planned",
        body: "If implemented and tested, normalized Airtel records could be compared with internal sales, invoice or ledger records, with unmatched or contradictory items presented for human review. This workflow is a target, not a capability customers can use today.",
      },
    ],
    sections: [
      {
        eyebrow: "Potential customer outcome",
        title: "What this integration is intended to solve",
        body: "For businesses collecting through more than one mobile-money provider, the intended outcome is one place to review payment references, compare collections to internal records and investigate exceptions without pretending that providers have identical semantics.",
        items: [
          "Provider-specific transaction references and statuses retained",
          "A consistent reconciliation view across supported records",
          "Exceptions grouped for finance or operations follow-up",
          "Audit context for who reviewed or resolved an item, if implemented",
        ],
        note: "These are design objectives. They are not available Airtel Money features at this time.",
      },
      {
        eyebrow: "What a customer should expect before a pilot",
        title: "Dependencies and decisions still to be completed",
        body: "A reliable connector needs more than a page and an API URL. Provider access, event delivery semantics, security, retries, duplicate handling and operational support must be tested before any availability claim is made.",
        items: [
          "Confirm Airtel Money API access, country/product coverage and business eligibility",
          "Agree on callback or transaction-query capabilities actually available to the customer",
          "Define authentication, secret storage, rotation and environment separation",
          "Test duplicate, delayed, missing, reversed and failed transaction events",
          "Define reconciliation keys, exception ownership, retention and audit expectations",
          "Publish verified setup docs, error behavior, support boundaries and release status",
        ],
      },
      {
        eyebrow: "Scope boundary",
        title: "What is not supported today",
        body: "PesaGuard cannot currently connect to an Airtel Money account, receive Airtel callbacks, fetch Airtel transaction history, initiate Airtel payments or confirm Airtel settlement. No launch date is committed.",
        items: [
          "No Airtel credentials can be activated in PesaGuard",
          "No Airtel sandbox or production connector is offered here",
          "No claim is made that Airtel and M-Pesa callbacks are interchangeable",
        ],
      },
    ],
    faq: [
      { question: "Can I connect Airtel Money now?", answer: "No. The adapter is not implemented. This page describes the intended scope and the work that would need to be validated." },
      { question: "Will it support real-time reconciliation?", answer: "That depends on the provider capabilities available to the customer and the connector that is eventually implemented and tested. Real-time support is not promised today." },
      { question: "Can I join a pilot or request the integration?", answer: "You can describe your Airtel Money use case to the team. That is an expression of interest, not a commitment that the integration is available or has a delivery date." },
    ],
    related: [
      { label: "M-Pesa / Daraja", href: "/integrations/mpesa", description: "The active mobile-money pilot integration." },
      { label: "Bank rails", href: "/integrations/banks", description: "Planned statement and settlement data support." },
      { label: "Integration overview", href: "/integrations", description: "See the live and not-yet-available boundaries." },
    ],
    cta: {
      eyebrow: "Share your requirements",
      title: "Tell us how you use Airtel Money today.",
      body: "Describe your country, product, transaction volume and current reconciliation process. We will record the requirement and confirm the current status without implying a connector is ready.",
      primary: { label: "Discuss Airtel Money scope", href: "/contact/sales", description: "Share integration requirements." },
    },
  },

  "Make bank settlement data useful.": {
    title: "Make bank settlement data useful.",
    description: "Planned bank statement and settlement integration; not available to connect yet.",
    label: "Bank rails · under development",
    lede: "The intended goal is to compare bank credits, transfers and settlement records with the payments or sales they should represent. PesaGuard does not currently import bank statements, connect to bank APIs or ingest bank settlement files, so bank reconciliation is not available through this integration today.",
    status: {
      availability: "not-started",
      label: "Under development planning — not available today.",
      note: "No bank connection, file-import workflow or launch date is promised.",
    },
    spec: [
      { label: "Data sources", value: "Not connected" },
      { label: "Statement import", value: "Not implemented" },
      { label: "Bank APIs", value: "Not connected" },
      { label: "Timeline", value: "Not committed" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Bring in bank records — planned",
        body: "A future version may support agreed statement files or specific bank APIs. The actual formats, connection methods, supported institutions and frequency would be selected and verified per use case; no bank coverage is currently available.",
      },
      {
        index: "02",
        title: "Map credits and settlement references — planned",
        body: "The target is to preserve bank references, value dates, posting dates, amounts, fees and transaction descriptions where supplied, then map them to a normalized record without losing the source evidence. Exact fields depend on the selected bank and statement format.",
      },
      {
        index: "03",
        title: "Explain differences — planned",
        body: "A future reconciliation workflow could identify missing credits, amount differences, duplicate entries, fees or timing differences against internal records. These are intended use cases, not implemented bank features.",
      },
    ],
    sections: [
      {
        eyebrow: "Potential customer outcome",
        title: "What bank integration should help answer",
        body: "A well-scoped bank connector should help finance teams explain whether expected funds reached the account, which settlement a payment belongs to, and why totals differ between the payment source and the bank record.",
        items: [
          "Match expected settlements to bank credits",
          "Identify records with no counterpart or conflicting amounts",
          "Account for timing differences and fees when the source data supports it",
          "Keep source rows and review decisions available for audit",
        ],
        note: "These outcomes depend on a future connector, supported source formats and verified reconciliation rules.",
      },
      {
        eyebrow: "Customer readiness",
        title: "Information that will be needed",
        body: "Bank reconciliation is not one universal API. Before implementation, the team will need to agree on the institution, account ownership and authorization, source format, delivery cadence and matching rules.",
        items: [
          "Which bank, account type and country are in scope",
          "Whether records will arrive through a bank API, SFTP, statement upload or another approved channel",
          "Sample statements with sensitive information removed where possible",
          "How references, dates, currencies, fees and reversals appear in the source",
          "Who may access account data and how long it should be retained",
          "What counts as a match, timing difference, fee or unresolved exception",
        ],
      },
      {
        eyebrow: "Scope boundary",
        title: "What is not supported today",
        body: "PesaGuard does not currently connect to bank accounts, download statements, import CSV/Excel/PDF statements, ingest settlement files, initiate transfers or certify that a settlement has occurred.",
        items: [
          "No named bank should be read as an active partner or supported institution",
          "No automated bank settlement confirmation is available",
          "No statement-upload promise should be inferred from this roadmap page",
        ],
      },
    ],
    faq: [
      { question: "Which banks are supported?", answer: "None through this integration today. Bank APIs and statement imports are not implemented, and no institution-specific coverage is being advertised." },
      { question: "Will I be able to upload CSV or Excel statements?", answer: "That is a possible implementation path, not an available feature. Supported formats and validation rules must be designed and tested first." },
      { question: "Can PesaGuard initiate or move bank funds?", answer: "No bank transfer or funds-movement capability is offered by this planned integration." },
    ],
    related: [
      { label: "Point of sale", href: "/integrations/pos", description: "Planned terminal and acquirer data support." },
      { label: "M-Pesa / Daraja", href: "/integrations/mpesa", description: "The active payment-rail scope." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matching and exceptions are intended to work." },
    ],
    cta: {
      eyebrow: "Define the bank data path",
      title: "Tell us which settlement records you need to reconcile.",
      body: "Share the institution, source format and matching problem. The team can assess the requirement without presenting a bank connector as available today.",
      primary: { label: "Discuss bank integration scope", href: "/contact/sales", description: "Share bank reconciliation requirements." },
    },
  },

  "Connect the point of sale.": {
    title: "Connect the point of sale.",
    description: "Planned POS and acquirer reconciliation connector; no terminal feeds are ingested today.",
    label: "Point of sale · under development",
    lede: "The intended goal is to connect till or terminal sales with payment and settlement records so merchants can explain differences between what the POS recorded, what a provider reported and what reached the bank. PesaGuard does not currently ingest POS transactions, terminal feeds or acquirer settlement files.",
    status: {
      availability: "not-started",
      label: "Under development planning — not available today.",
      note: "No POS vendor, acquirer or terminal integration is currently supported.",
    },
    spec: [
      { label: "POS transactions", value: "Not ingested" },
      { label: "Terminal feeds", value: "Not connected" },
      { label: "Acquirer files", value: "Not imported" },
      { label: "Timeline", value: "Not committed" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Capture sales and payment references — planned",
        body: "A future adapter would need to obtain transaction identifiers, terminal or store references, amounts, timestamps, tender type and status from a supported POS or payment acquirer. The vendors and fields supported have not been selected or verified.",
      },
      {
        index: "02",
        title: "Compare POS, provider and settlement records — planned",
        body: "The intended workflow is to compare a sale or till receipt with the corresponding payment event and settlement entry when those records are available. This could surface missing payments, duplicates, amount differences, voids and refund mismatches for review.",
      },
      {
        index: "03",
        title: "Keep branch-level accountability — planned",
        body: "If implemented, store, till, terminal and operator context could help finance teams trace a difference to the right location or workflow. Such fields depend on the selected POS vendor and must not be assumed to exist in every feed.",
      },
    ],
    sections: [
      {
        eyebrow: "Potential customer outcome",
        title: "What merchants should expect from a mature POS connector",
        body: "A useful POS integration should preserve the distinction between a sale, a payment authorization or receipt, an acquirer settlement and a bank credit. Those events can occur at different times and are not interchangeable.",
        items: [
          "Compare POS totals with payment-provider and settlement records",
          "Separate voids, refunds, reversals and ordinary sales where the source supports them",
          "Investigate missing, duplicate or mismatched records",
          "Retain source references and review decisions for audit",
          "Support branch or terminal grouping when the integration supplies reliable identifiers",
        ],
        note: "This list describes expected design goals, not features available through PesaGuard today.",
      },
      {
        eyebrow: "Customer readiness",
        title: "What will need to be agreed",
        body: "POS systems vary significantly. A practical scope begins with the specific POS product, acquirer and settlement path rather than a generic promise to connect every terminal.",
        items: [
          "POS vendor, version, deployment model and supported API or export options",
          "Acquirer or processor responsible for card or other terminal payments",
          "Sample transaction exports and settlement reports with sensitive data removed",
          "How the business represents sales, tips, fees, voids, refunds and chargebacks",
          "Store, till, terminal and cashier identifiers that may be used in matching",
          "Data access permissions, refresh cadence, retention and exception ownership",
        ],
      },
      {
        eyebrow: "Scope boundary",
        title: "What is not supported today",
        body: "PesaGuard does not currently connect to POS vendors, read terminal devices, ingest card-acquirer feeds, reconcile card settlements or synchronize inventory. A POS brand appearing in a future plan would not by itself mean that its integration is live.",
        items: [
          "No POS provider is currently advertised as supported",
          "No terminal transaction or acquirer settlement file is ingested",
          "No card processing, authorization or funds movement is performed by this integration",
        ],
      },
    ],
    faq: [
      { question: "Can I connect my POS system today?", answer: "No. POS adapters and terminal-feed ingestion have not been implemented. This page outlines the intended scope only." },
      { question: "Will this work with every POS vendor?", answer: "That cannot be promised. Support would need to be built and tested against specific vendor APIs, exports and acquirer formats." },
      { question: "Will it show why POS totals differ from bank deposits?", answer: "That is a target use case. It requires supported POS records and corresponding provider or bank settlement data, and those connectors are not currently available." },
    ],
    related: [
      { label: "Bank rails", href: "/integrations/banks", description: "Planned statement and settlement data support." },
      { label: "M-Pesa / Daraja", href: "/integrations/mpesa", description: "The active mobile-money integration." },
      { label: "Merchant operations", href: "/solutions/merchants", description: "Current merchant use cases and boundaries." },
    ],
    cta: {
      eyebrow: "Describe your checkout flow",
      title: "Tell us which POS, acquirer and settlement report you use.",
      body: "We will capture the actual workflow and determine what would need to be supported first. This is a discovery conversation, not a claim that your POS can be connected today.",
      primary: { label: "Discuss POS requirements", href: "/contact/sales", description: "Share POS and settlement requirements." },
    },
  },

  "Webhooks that respect delivery reality.": {
    title: "Webhooks that respect delivery reality.",
    description: "Signed outbound events with attempts, retries and a dead-letter path.",
    label: "Webhooks",
    lede: "Outbound webhooks carry exceptions and notifications to systems you run. Every delivery is signed, retried on failure, and dead-lettered when exhausted.",
    status: {
      availability: "available",
      label: "Live in the pilot deployment.",
      note: "Signed delivery with observable retries.",
    },
    spec: [
      { label: "Signing", value: "Every delivery is signed" },
      { label: "On failure", value: "Bounded retries, then dead letter" },
      { label: "Visibility", value: "Attempts and outcomes recorded" },
      { label: "Replay", value: "Safe to re-run" },
    ],
    capabilities: [
      { index: "01", title: "Signed by default", body: "Consumers verify the sender before trusting the payload, so webhook handling never becomes a spoofing surface." },
      { index: "02", title: "Retries with a limit", body: "Transient failures retry with bounded backoff. Exhausted deliveries move to a dead-letter path instead of vanishing.", items: ["Bounded retry schedule", "Dead-letter retention", "Replay from the dead letter"] },
      { index: "03", title: "Replay without duplication", body: "Replaying a delivery is safe to run more than once, because idempotency is enforced where writes land." },
    ],
    sections: [
      { title: "Delivery you can audit", body: "Each attempt is recorded with its outcome, so a consumer asking what was sent and when gets an answer from the record.", items: ["Attempt history per delivery", "Dead letters retained for investigation", "Signatures verifiable by the consumer"] },
    ],
    faq: [
      { question: "Are webhook deliveries signed?", answer: "Yes. Every outbound delivery carries a signature the consumer verifies before trusting the payload." },
      { question: "What happens when a consumer stays down?", answer: "Deliveries retry on a bounded schedule, then move to the dead-letter path for inspection and replay once the consumer recovers." },
    ],
    related: [
      { label: "Webhook docs", href: "/documentation/webhooks", description: "Signature checks, retries and replay." },
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "What delivery carries." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "Inbound events, matched live." },
    ],
    cta: {
      eyebrow: "Wire in a consumer",
      title: "Point a staging endpoint at the pilot.",
      body: "We will show signed delivery, a retry, and where the dead letter lands.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope webhook delivery." },
      secondary: { label: "Webhook docs", href: "/documentation/webhooks", description: "Verify the contract." },
    },
  },
};
