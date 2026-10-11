import type { PageData } from "@/types/content";
import { docsUrl } from "@/config/docs";

/**
 * Per-detail-page content.
 *
 * Detail routes are thin: each one names a title and lets `RoutePage` resolve
 * the body. Before this module existed every detail page inherited a *parent*
 * body, so seven feature pages rendered identical copy with only the heading
 * changed. Entries here are keyed by the exact title the route passes - the
 * titles are unique, which is what makes the lookup unambiguous.
 *
 * Wording rules for this file:
 *   - only claim what the platform does today, and label the rest;
 *   - the active payment scope is M-Pesa (Safaricom Daraja);
 *   - capabilities with no adapter are `not-started` and say so.
 */
export const detailPages: Record<string, PageData> = {
  "Evidence for every important decision.": {
    title: "Evidence for every important decision.",
    description: "An append-only record of what was matched, who decided, and why.",
    label: "Audit trail",
    lede: "Reconciliation is only as useful as the reasoning behind it. Every match, exception, review and configuration change is written to a record that is appended to, never rewritten.",
    spec: [
      { label: "Write model", value: "Append-only" },
      { label: "Attached to", value: "Tenant · transaction · operator" },
      { label: "Secret material", value: "Excluded by design" },
      { label: "Use", value: "Review, dispute response, audit" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Decisions keep their reason",
        body: "When a reviewer accepts, rejects or escalates an exception, the decision is stored with the reason, the actor and the transaction context.",
        items: ["Match evidence retained", "Operator identity recorded", "Timestamps on every change"],
      },
      {
        index: "02",
        title: "History survives staff turnover",
        body: "The record does not depend on anyone remembering a chat thread. Institutional knowledge stays queryable when the team changes.",
      },
      {
        index: "03",
        title: "Redacted at the boundary",
        body: "Secrets are excluded from audit entries and sensitive fields are redacted before they reach logs.",
      },
    ],
    sections: [
      {
        title: "What an audit-ready trail actually needs",
        body: "Three properties matter more than volume: entries can only be added, each entry identifies who did what, and the entry can be traced back to the transaction that caused it.",
        items: [
          "Append-only writes, so a decision cannot be quietly edited",
          "Actor and tenant recorded on each entry",
          "Traceability from provider event to final outcome",
        ],
      },
    ],
    faq: [
      {
        question: "Can an audit entry be deleted?",
        answer: "Entries are append-only, so outcomes cannot be rewritten. Retention and archival follow a documented policy rather than ad-hoc deletion.",
      },
      {
        question: "Does the trail include the underlying transaction?",
        answer: "Yes. Entries reference the transaction and tenant they belong to, so you can move from a decision back to the payment that produced it.",
      },
    ],
    related: [
      { label: "Compliance", href: "/security/compliance", description: "Controls as an operating practice." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Security model", href: "/security", description: "Where the controls sit." },
    ],
    cta: {
      eyebrow: "Review the record",
      title: "Bring an exception your team could not explain.",
      body: "We will show how the evidence, the decision and the operator are captured around it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Walk through the audit trail." },
      secondary: { label: "Read the docs", href: docsUrl(), description: "How the platform is built." },
    },
  },

  "Trust the data before you act.": {
    title: "Trust the data before you act.",
    description: "Understand the checks applied to incoming payment records, what a failure means and where human review remains essential.",
    label: "Data quality",
    lede: "A payment record can look complete and still be unusable. PesaGuard applies explicit checks to incoming data, returns a pass or failure with reasons, and—when the provenance workflow is configured to do so—quarantines failed records instead of treating them as clean input.",
    status: {
      availability: "pilot",
      label: "Data-quality controls are part of the platform MVP.",
      note: "Confirm the validation and quarantine path for your Safaricom Daraja M-Pesa pilot environment.",
    },
    spec: [
      { label: "Rule set", value: "7 explicit input checks" },
      { label: "Result", value: "Pass or fail, with rule reasons" },
      { label: "Failure handling", value: "Quarantine when configured" },
      { label: "Public payment scope", value: "Safaricom Daraja M-Pesa pilot" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Check required identifiers",
        body: "A record needs a transaction identifier and tenant identifier so it can be associated with a payment and its account context.",
        items: ["Transaction ID must be present", "Tenant ID must be present"],
      },
      {
        index: "02",
        title: "Reject unusable transaction values",
        body: "The current rules check that an amount can be read as a number and is greater than zero, that the currency is in the accepted set, and that the provider label is recognized.",
        items: ["Numeric amount greater than zero", "Currency accepted by the rule set: KES or USD", "Provider label from the recognized set"],
      },
      {
        index: "03",
        title: "Require reference and schema context",
        body: "A payment reference and a declared schema version help the processing path interpret a record against its expected shape.",
        items: ["Reference must be present", "Schema version must be present"],
      },
    ],
    sections: [
      {
        title: "What a pass or failure tells your team",
        body: "A pass means this record met the listed rules. A failure includes the failed rule and reason; in the configured provenance workflow, that record can be quarantined with its failure context for follow-up. These checks do not prove that funds settled, that the source values are factually correct, or that a reference belongs to the right business transaction.",
        items: [
          "Failing rule and reason are retained with the quality result.",
          "The provenance flow can quarantine failed records instead of accepting them.",
          "A pass is not a fraud assessment, settlement confirmation or accuracy guarantee.",
          "Duplicate prevention is handled by idempotency controls, not by these seven field checks.",
        ],
      },
    ],
    faq: [
      {
        question: "Which fields are checked?",
        answer: "The current rule set checks that transaction ID, tenant ID, payment reference and schema version are present; amount is numeric and greater than zero; currency is KES or USD; and the provider label belongs to the recognized set. The exact active path and payload must be confirmed for your pilot.",
      },
      {
        question: "What happens when a record fails?",
        answer: "The quality result includes the failed rule and its reason. When the provenance workflow is configured with quarantine enabled, the record is stored as quarantined with its failure context rather than accepted as clean input. Confirm this behavior in the environment and integration path you plan to use.",
      },
      {
        question: "Does a passing check prove the payment is correct?",
        answer: "No. It means only that the record satisfied these explicit checks. It does not prove settlement, fraud status, the factual accuracy of source data, or that the payment belongs to the intended order or customer.",
      },
      {
        question: "Does this feature detect every duplicate?",
        answer: "No. Duplicate-delivery protection is handled separately by idempotency controls. These data-quality rules do not claim to detect every duplicate business record or repeated provider event.",
      },
      {
        question: "Does a recognized provider label mean that provider is connected?",
        answer: "No. A provider label accepted by a validation rule is not evidence that an integration adapter is available. The active public payment scope is Safaricom Daraja M-Pesa in a customer pilot; confirm the actual callback configuration and enabled controls.",
      },
    ],
    cta: {
      eyebrow: "Review your payment data",
      title: "Know what your records can—and cannot—tell you.",
      body: "Walk through a representative Daraja callback, the business context you need to preserve, and how failed checks should be handled in your pilot.",
      primary: { label: "Discuss your data flow", href: "/contact/sales", description: "Review validation scope and failure handling." },
    },
  },

  "Make risk signals useful.": {
    title: "Make risk signals useful.",
    description: "Rule-based and statistical checks that explain why a transaction stood out.",
    label: "Fraud detection",
    lede: "A score on its own changes nothing. Every signal names the pattern it saw, so a reviewer can decide quickly instead of forming a theory.",
    spec: [
      { label: "Method", value: "Explicit rules plus statistical checks" },
      { label: "Signals", value: "Amount · velocity · duplicates · timing · channel" },
      { label: "Output", value: "Score with the reasons listed" },
      { label: "Authority", value: "Signals review, never declares fraud" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Signals are named, not implied",
        body: "Each flag states the pattern behind it, so the reviewer sees the reasoning rather than an opaque number.",
        items: ["Amount outside typical range", "Velocity spike on one account", "Duplicate reference seen before"],
      },
      {
        index: "02",
        title: "Context beats thresholds",
        body: "A large payment is not a problem on its own. Signals are scored against the account and channel behaviour they came from.",
      },
      {
        index: "03",
        title: "Review stays with people",
        body: "A high score routes a transaction to a human. PesaGuard does not auto-declare fraud, and every decision keeps its reason.",
      },
    ],
    sections: [
      {
        title: "Why not simply block on a score",
        body: "Automatic blocking converts a suspicion into a customer-facing event. PesaGuard treats a score as a prompt to look, and keeps the evidence needed to justify whatever the reviewer decides.",
        items: [
          "Flagged transactions queue with severity and reason",
          "Reviewers accept, reject or escalate with a written reason",
          "Outcomes feed the append-only audit trail",
        ],
      },
    ],
    faq: [
      {
        question: "Does PesaGuard use machine learning to detect fraud?",
        answer: "Today it uses explicit rules and statistical checks over transaction behaviour. We describe it that way rather than implying a model we have not shipped.",
      },
      {
        question: "Will a flagged transaction be blocked automatically?",
        answer: "No. A flag raises the payment for review. Blocking, if it happens at all, is a decision your team makes and records.",
      },
    ],
    related: [
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "How a flag reaches an owner." },
      { label: "Transaction monitoring", href: "/features/transaction-monitoring", description: "The flow signals are read from." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Where decisions are recorded." },
    ],
    cta: {
      eyebrow: "Pressure-test the signals",
      title: "Show us the pattern that costs you most.",
      body: "We will map it onto named signals and show how a reviewer would see it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss fraud signals." },
    },
  },

  "Route the right alert to the right owner.": {
    title: "Route the right alert to the right owner.",
    description: "Exceptions and signals delivered with severity, reason and context attached.",
    label: "Real-time alerts",
    lede: "An alert that arrives without context creates work instead of removing it. Notifications carry the amount, the reason, the severity and the transaction reference.",
    spec: [
      { label: "Channels", value: "SMS · email · Slack · webhooks" },
      { label: "Payload", value: "Severity, reason, transaction context" },
      { label: "Delivery", value: "Attempts, retries, dead letters" },
      { label: "Routing", value: "By severity and owner" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Context travels with the alert",
        body: "The recipient sees what happened and how urgent it is without opening a dashboard first.",
        items: ["Amount and reference", "Named reason", "Severity level"],
      },
      {
        index: "02",
        title: "Routing follows responsibility",
        body: "Exceptions reach the team that owns them, so a finance issue does not sit unread in an engineering inbox.",
      },
      {
        index: "03",
        title: "Delivery is observable",
        body: "Alerting is not fire-and-forget. Attempts, retries and exhausted deliveries stay visible, along with the dead-letter path.",
      },
    ],
    sections: [
      {
        title: "Alerting that does not become noise",
        body: "Volume is the failure mode of alerting. Severity and routing exist so a high-severity exception stays distinguishable from a routine one.",
        items: [
          "Severity attached to each exception",
          "Multiple channels so the owner is reachable",
          "Dead letters retained rather than discarded",
        ],
      },
    ],
    faq: [
      {
        question: "Which channels are supported?",
        answer: "SMS, email, Slack and outbound webhooks. Delivery attempts, retries and dead letters are recorded so a missed alert can be traced.",
      },
      {
        question: "Can a failed alert disappear?",
        answer: "No. Exhausted deliveries are dead-lettered and remain visible for investigation rather than being silently dropped.",
      },
    ],
    related: [
      { label: "Fraud detection", href: "/features/fraud-detection", description: "What triggers a review." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed delivery with retries." },
      { label: "Data quality", href: "/features/data-quality", description: "Clean input before alerting." },
    ],
    cta: {
      eyebrow: "Fix an alert that failed you",
      title: "Describe an alert your team missed.",
      body: "We will show how routing, severity and delivery evidence would have caught it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review alert routing." },
    },
  },

  "Reconciliation you can explain.": {
    title: "Reconciliation you can explain.",
    description: "See how PesaGuard compares Safaricom Daraja payment callbacks with expected business records and explains each outcome.",
    label: "Reconciliation",
    lede: "PesaGuard compares a provider callback with the expected business record using agreed reference, amount and timing rules. Each result distinguishes a match from a difference and carries the rules that explain why it was returned.",
    status: {
      availability: "pilot",
      label: "Pilot scope: Safaricom Daraja M-Pesa.",
      note: "Confirm the callback flow, source records and active matching settings for your pilot.",
    },
    spec: [
      { label: "Compared records", value: "Daraja callback + expected business record" },
      { label: "Matching inputs", value: "Reference · amount · time · optional phone" },
      { label: "Engine defaults", value: "0.5% (min 0.01) · 900 seconds" },
      { label: "Possible outcomes", value: "7 explicit reconciliation statuses" },
    ],
    steps: [
      { step: "01", title: "Receive an in-scope callback", body: "An eligible Safaricom Daraja M-Pesa callback enters the configured pilot flow.", detail: "PesaGuard observes payment data; it does not initiate or hold the payment." },
      { step: "02", title: "Validate and normalize", body: "The engine prepares both callback values and expected records for comparison.", detail: "Unusable data, a missing transaction ID or a refund without its original reference returns an EXCEPTION with a reason." },
      { step: "03", title: "Find possible records", body: "The callback is compared with expected business records supplied through the agreed data path.", detail: "If no suitable record is available, the engine does not invent a match." },
      { step: "04", title: "Apply matching rules", body: "Reference, amount and event time are evaluated using the configured flow settings; phone is also checked when both records provide it.", detail: "The engine checks repeated transaction IDs and ambiguous references rather than silently choosing a duplicate." },
      { step: "05", title: "Return an explained result", body: "The outcome includes its status, the matching rules that led to it, a match score, timestamp and candidate evidence where available.", detail: "The result describes a comparison; it is not a settlement confirmation or fraud verdict." },
      { step: "06", title: "Review unresolved differences", body: "A finance or operations owner investigates outcomes that need follow-up using the source records and reason returned.", detail: "The customer team remains responsible for approvals, corrections and final accounting decisions." },
    ],
    capabilities: [
      {
        index: "01",
        title: "Explainable matching",
        body: "Results carry named matching rules and the candidate record, when one is identified, so a reviewer can see why the engine reached that outcome.",
      },
      {
        index: "02",
        title: "Distinct outcomes",
        body: "Exact matches, incomplete matches, conflicting data and invalid input are represented separately rather than collapsed into one generic failure.",
        items: ["Matched or pending", "Partial, mismatch or unmatched", "Duplicate or exception"],
      },
      {
        index: "03",
        title: "Duplicate-aware processing",
        body: "The engine can identify a previously seen transaction ID or multiple internal records with the same reference and return a duplicate outcome for review.",
      },
      {
        index: "04",
        title: "Stable candidate selection",
        body: "When multiple candidates have equal match scores, a stable secondary key breaks the tie so reordering the same records does not change the selected candidate.",
      },
    ],
    sections: [
      {
        eyebrow: "Configuration and boundaries",
        title: "Matching depends on the records and rules you agree.",
        body: "The reconciliation engine has defaults of 0.5% amount tolerance and a 900-second time window. A flow can be configured differently; these defaults are not a promise about the active pilot configuration. Confirm the expected-record source, fields, tolerance, time zone handling and exception owner before evaluating results.",
        items: [
          "The active public product scope is the Safaricom Daraja M-Pesa pilot.",
          "Airtel Money, bank statements and POS feeds are not represented as connected reconciliation sources.",
          "PesaGuard supports reconciliation and review; it does not move funds or replace the customer's ledger.",
        ],
      },
    ],
    faq: [
      {
        question: "What does reconciliation mean in PesaGuard?",
        answer: "It means comparing a payment event received through the supported Daraja M-Pesa pilot with an expected business record supplied through the agreed data path. PesaGuard returns a status and the matching rules that explain the comparison. It does not initiate or settle the payment.",
      },
      {
        question: "Which payment sources are in scope?",
        answer: "Safaricom Daraja M-Pesa is the active pilot scope. Airtel Money, bank statement imports and point-of-sale feeds are not represented as connected reconciliation sources. Confirm merchant eligibility and the callback configuration for the specific pilot.",
      },
      {
        question: "Which business records does PesaGuard compare against?",
        answer: "PesaGuard needs the expected order, receipt, ledger or other business record that represents the payment. The source and delivery method must be agreed for the pilot; this page does not claim a ready-made connector for every accounting, ERP, POS or SACCO system.",
      },
      {
        question: "What do the reconciliation statuses mean?",
        answer: "MATCHED means the reference, amount and time rules align; phone is also compared when both records provide it. PENDING means the candidate internal record is marked pending. PARTIAL identifies a candidate that only meets some or tolerance-based rules. MISMATCH means relevant comparison fields do not align. UNMATCHED means no eligible candidate was found. DUPLICATE identifies a repeated transaction ID or ambiguous reference. EXCEPTION means the callback or an expected record could not be evaluated, such as invalid required data or a refund/reversal without an original reference.",
      },
      {
        question: "What amount tolerance and time window are used?",
        answer: "The engine defaults are 0.5% of the callback amount with a minimum tolerance of 0.01, and a 900-second (15-minute) time window. Flow or tenant configuration can override these values. Confirm the actual settings, time-zone handling and comparison fields for your pilot before interpreting a result.",
      },
      {
        question: "Does MATCHED confirm settlement or prove a payment is safe?",
        answer: "No. MATCHED means the available callback and expected business record met the configured comparison rules. It is not confirmation that funds settled, a guarantee of accounting correctness, or a fraud assessment. Your organization remains responsible for settlement checks and financial decisions.",
      },
      {
        question: "Does a mismatch or duplicate mean fraud?",
        answer: "No. These statuses identify data that differs, repeats or needs investigation. Timing delays, incorrect references, repeated delivery, duplicate source records or incomplete data can all require review. A status is a review signal, not proof of fraud or misconduct.",
      },
      {
        question: "Can PesaGuard hold or move customer money?",
        answer: "No. Reconciliation compares transaction information and supports exception review. It does not initiate, receive, hold, transfer or settle funds.",
      },
    ],
    related: [
      { label: "Data quality", href: "/features/data-quality", description: "The input matching depends on." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Evidence for each decision." },
      { label: "How it works", href: "/how-it-works", description: "The pipeline end to end." },
    ],
    cta: {
      eyebrow: "Scope a reconciliation pilot",
      title: "Start with the callback and the record you need to match.",
      body: "Review your Daraja setup, expected business records, matching fields and exception owners with the PesaGuard team.",
      primary: { label: "Discuss your flow", href: "/contact/sales", description: "Scope a reconciliation pilot." },
      secondary: { label: "Read the matching guide", href: docsUrl("guides/"), description: "Review engine outcomes and matching rules." },
    },
  },

  "Reports people can act on.": {
    title: "Reports people can act on.",
    description: "Reconciliation summaries and exception trends drawn from reconciled records.",
    label: "Reporting",
    lede: "A report is only useful if it closes the loop. Summaries are built from the same reconciled records the operations team already reviewed, so the numbers and the queue agree.",
    spec: [
      { label: "Built from", value: "Reconciled records, not raw exports" },
      { label: "Covers", value: "Match rate · unmatched · exceptions · trends" },
      { label: "Periods", value: "Daily, weekly, period close" },
      { label: "Traceable", value: "Every figure resolves to its events" },
    ],
    capabilities: [
      {
        index: "01",
        title: "One version of the numbers",
        body: "Reports read from reconciled data rather than a parallel export, so finance and operations stop reconciling each other.",
        items: ["Match rate for the period", "Unmatched and pending counts", "Open exceptions by severity"],
      },
      {
        index: "02",
        title: "Trends, not just totals",
        body: "Exception volume and recurring causes are visible over time, which turns a repeating problem into something worth fixing.",
      },
      {
        index: "03",
        title: "Figures that can be traced",
        body: "Each summary resolves back through the reconciliation outcome to the original provider event and its evidence.",
      },
    ],
    sections: [
      {
        title: "Period close without the scramble",
        body: "Close fails when the exception queue and the spreadsheet disagree. Because reporting reads the reconciled record and its exceptions, the two stay consistent by construction.",
        items: [
          "Exceptions counted where they are resolved",
          "Consistent definitions across periods",
          "Traceability for anything queried later",
        ],
      },
    ],
    faq: [
      {
        question: "Are report figures illustrative?",
        answer: "No. Reports are produced from reconciled records. Any figures shown in marketing previews are labelled illustrative so the two are never confused.",
      },
      {
        question: "Can a figure be traced to its source?",
        answer: "Yes. Summaries resolve through the reconciliation outcome to the original provider event and the evidence it carried.",
      },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "The records reports are built on." },
      { label: "Data quality", href: "/features/data-quality", description: "Why the input can be trusted." },
      { label: "Audit trail", href: "/features/audit-trail", description: "Provenance in practice." },
    ],
    cta: {
      eyebrow: "Repeat your last period close",
      title: "Show us the report you assemble by hand.",
      body: "We will show the same view produced from reconciled records instead.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Review reporting needs." },
    },
  },

  "See transaction flows as they change.": {
    title: "Know where each payment is in the process.",
    description: "Follow transaction lifecycle states, understand processing exceptions, and distinguish status monitoring from reconciliation and settlement.",
    label: "Transaction monitoring",
    lede: "Follow a payment transaction through its recorded processing states—from receipt and validation to processing, reconciliation and completion. Understand the exceptions that can interrupt that path and what a status can—and cannot—tell your team.",
    status: {
      availability: "pilot",
      label: "Transaction monitoring is within the PesaGuard MVP pilot.",
      note: "Active public payment scope: Safaricom Daraja M-Pesa. Confirm status visibility for your configured flow.",
    },
    spec: [
      { label: "Payment source", value: "Safaricom Daraja M-Pesa pilot" },
      { label: "Monitoring focus", value: "Reported processing status" },
      { label: "Use", value: "Operational follow-up" },
      { label: "Decision owner", value: "Customer team" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Follow reported processing status",
        body: "See the status information returned for a transaction in the configured processing flow. A status helps explain what the system recorded; it is not proof of settlement.",
      },
      {
        index: "02",
        title: "Bring exceptions into view",
        body: "Use an outcome that needs attention as a prompt to review the payment event and available business context. A signal does not decide the cause or the customer action.",
      },
      {
        index: "03",
        title: "Keep the payment boundary clear",
        body: "Monitoring observes transaction information handled by the configured workflow. PesaGuard does not initiate, hold, transfer or settle customer funds.",
      },
    ],
    steps: [
      { step: "01", title: "Receive an in-scope event", body: "A configured Safaricom Daraja M-Pesa callback enters the pilot processing path." },
      { step: "02", title: "Follow its reported state", body: "Follow the recorded progression through RECEIVED, VALIDATED, PROCESSING, RECONCILING and RECONCILED. FAILED and REJECTED are separate outcomes that need review, not assumptions of success." },
      { step: "03", title: "Investigate with context", body: "Use the status and available transaction information to decide what to check next. Follow-up remains with the customer team." },
    ],
    sections: [],
    faq: [
      {
        question: "Which payment source is in scope?",
        answer: "The active public payment scope is Safaricom Daraja M-Pesa in a customer pilot. Do not assume Airtel Money, bank statements or POS feeds are connected. Confirm the specific callback flow and enabled status reporting for your pilot.",
      },
      {
        question: "Does a transaction status confirm that funds settled?",
        answer: "No. A status does not confirm settlement; it describes processing information recorded by the configured workflow. Verify settlement through the appropriate provider or financial records and your organization's process.",
      },
      {
        question: "Does monitoring identify fraud or the cause of an exception?",
        answer: "No. A status or exception can help your team decide what to investigate, but it does not prove fraud, explain every delay, or make an operational decision on your behalf.",
      },
      {
        question: "Does this mean there is an always-on dashboard or latency guarantee?",
        answer: "No. This page describes the monitoring purpose and the status information available through configured transaction flows. It does not claim an always-on live dashboard, particular refresh intervals, volume coverage or processing-latency guarantees.",
      },
      {
        question: "Who is responsible for the next action?",
        answer: "Your finance or operations team remains responsible for investigating available evidence and deciding what to do. Confirm monitoring access, ownership and escalation steps as part of the pilot setup.",
      },
    ],
    cta: {
      eyebrow: "Scope your monitoring workflow",
      title: "Make payment status easier to interpret.",
      body: "Review your Daraja callback flow, the status information your team needs, and who owns follow-up when an event needs attention.",
      primary: { label: "Discuss your payment flow", href: "/contact/sales", description: "Review transaction monitoring scope." },
    },
  },

  "Bring M-Pesa events into focus.": {
    title: "Bring M-Pesa events into focus.",
    description: "Daraja callbacks received, validated, de-duplicated and matched as they arrive.",
    label: "M-Pesa (Daraja)",
    lede: "M-Pesa through Safaricom Daraja is the active, tested integration. Callbacks land as normalized payment events and reconciliation runs against them in the same step.",
    status: {
      availability: "available",
      label: "Live in the pilot deployment.",
      note: "STK Push and PayBill callbacks over Safaricom Daraja.",
    },
    spec: [
      { label: "Provider", value: "Safaricom Daraja" },
      { label: "Flows", value: "STK Push · PayBill" },
      { label: "On callback", value: "Validate · de-duplicate · match" },
      { label: "Retry safety", value: "Idempotent by write" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Callbacks become events",
        body: "Daraja payloads are validated on arrival and normalized into one canonical payment shape before anything downstream trusts them.",
      },
      {
        index: "02",
        title: "Matched against the ledger",
        body: "Each callback is compared to internal records on amount, reference and timestamp tolerance. Differences queue as exceptions with the delta shown.",
      },
      {
        index: "03",
        title: "Retries do no harm",
        body: "Daraja retries and operator replays are expected. Database-level idempotency means a repeated delivery never becomes a second financial record.",
      },
    ],
    sections: [
      {
        title: "What live means here",
        body: "Live means callbacks are being received and reconciled in the pilot deployment, not that the integration works for every M-Pesa configuration. Coverage and edge cases are scoped in the pilot conversation.",
        items: [
          "STK Push callbacks validated and matched",
          "PayBill callbacks validated and matched",
          "Exceptions with reasons for anything unmatched",
        ],
      },
    ],
    faq: [
      {
        question: "Which M-Pesa flows are covered?",
        answer: "STK Push and PayBill callbacks over Safaricom Daraja, validated and matched in the pilot deployment. Other flows are scoped per pilot.",
      },
      {
        question: "What happens when Daraja retries a callback?",
        answer: "The duplicate is rejected on write by idempotency, so no second record, no second match, and no duplicate alert is created.",
      },
    ],
    related: [
      { label: "Reconciliation", href: "/features/reconciliation", description: "How matches are decided." },
      { label: "Webhooks", href: "/integrations/webhooks", description: "Signed outbound delivery." },
      { label: "How it works", href: "/how-it-works", description: "Callback to record, end to end." },
    ],
    cta: {
      eyebrow: "Connect the Daraja flow",
      title: "Bring your shortcode and callback volume.",
      body: "We will scope validation, matching and exception handling around it.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope the M-Pesa integration." },
      secondary: { label: "M-Pesa docs", href: docsUrl("api/"), description: "Transaction endpoints and shapes." },
    },
  },

  "Connect Airtel Money without losing context.": {
    title: "Connect Airtel Money without losing context.",
    description: "The named roadmap item for a second mobile-money rail, stated without implying it exists.",
    label: "Airtel Money",
    lede: "Airtel Money is on the roadmap, and saying so plainly matters: there is no adapter, no test suite and no documentation for it today. This page describes the shape it will take rather than promising it.",
    status: {
      availability: "not-started",
      label: "Planned. No adapter, tests or docs exist yet.",
      note: "Named so the scope is unambiguous rather than implied.",
    },
    spec: [
      { label: "Adapter", value: "Not built" },
      { label: "Callbacks", value: "Not ingested" },
      { label: "Reconciliation", value: "Not available for this rail" },
      { label: "Path", value: "Scoped after M-Pesa hardening" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Same canonical shape, when it lands",
        body: "The plan is normalization into the same payment-event model as Daraja callbacks, so matching, signals and reporting would work unchanged.",
      },
      {
        index: "02",
        title: "Explicit before implicit",
        body: "Until the adapter exists, the interface labels Airtel Money as planned. A dashboard will not silently treat its absence as coverage.",
      },
    ],
    sections: [
      {
        title: "Why name something unbuilt",
        body: "Teams planning payments across Kenya ask about Airtel Money early. Naming it with an honest status is more useful than leaving the question open and letting readers assume support.",
        items: [
          "No adapter, tests or docs exist today",
          "Intended shape: same canonical event model",
          "Scoped after M-Pesa pilot hardening",
        ],
      },
    ],
    faq: [
      {
        question: "Can we connect Airtel Money today?",
        answer: "No. There is no adapter, test suite or documentation. We name it explicitly so the scope is unambiguous.",
      },
      {
        question: "What will the integration look like when it ships?",
        answer: "The plan is the same one applied to Daraja: validated, normalized callbacks matched against internal records with idempotent writes.",
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The live mobile-money rail." },
      { label: "Integrations", href: "/integrations", description: "The full rail picture." },
      { label: "How it works", href: "/how-it-works", description: "The pipeline any rail feeds." },
    ],
    cta: {
      eyebrow: "Tell us your rail mix",
      title: "If Airtel Money is part of your operation, say so.",
      body: "It helps us sequence the adapter behind real demand rather than a guess.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Register Airtel Money interest." },
    },
  },

  "Make bank settlement data useful.": {
    title: "Make bank settlement data useful.",
    description: "Statement and settlement imports are out of scope today, and this page says which parts.",
    label: "Bank rails",
    lede: "Bank settlement files and statements are the classic reconciliation gap for teams that collect on mobile money and settle through banks. Importing them is not in scope today.",
    status: {
      availability: "not-started",
      label: "Planned. No importer exists yet.",
      note: "Out of scope for the current pilot deployment.",
    },
    spec: [
      { label: "Statement import", value: "Not built" },
      { label: "Settlement matching", value: "Not available" },
      { label: "Blocking on", value: "M-Pesa pilot hardening first" },
      { label: "Manual path", value: "Scoped per pilot conversation" },
    ],
    capabilities: [
      {
        index: "01",
        title: "The gap, described honestly",
        body: "Settlements land in bank statements while collections land on mobile money. Without an importer, matching the two is manual work, and we do not pretend otherwise.",
      },
      {
        index: "02",
        title: "What the importer would do",
        body: "When built, bank files would normalize into the same canonical event model as Daraja callbacks, so matching, exceptions and audit would apply unchanged.",
      },
    ],
    sections: [
      {
        title: "What teams do meanwhile",
        body: "Pilot teams keep bank reconciliation where it already lives while PesaGuard handles the mobile-money side. The boundary is explicit so nobody goes looking for a bank import that does not exist.",
        items: [
          "Mobile-money reconciliation handled in PesaGuard",
          "Bank settlement reconciliation stays with existing tools",
          "Boundary reviewed in each pilot conversation",
        ],
      },
    ],
    faq: [
      {
        question: "Can PesaGuard import bank statements?",
        answer: "No. Statement and settlement imports are out of scope today with no importer built. We say so explicitly rather than letting the question hang.",
      },
      {
        question: "Does that limit the pilot?",
        answer: "Pilots focus on the mobile-money side, where PesaGuard is live. The bank boundary is scoped in the pilot conversation.",
      },
    ],
    related: [
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The rail that is live today." },
      { label: "Integrations", href: "/integrations", description: "The full rail picture." },
      { label: "Reconciliation", href: "/features/reconciliation", description: "Matching on live rails." },
    ],
    cta: {
      eyebrow: "Map the settlement gap",
      title: "Show us where banks enter your reconciliation.",
      body: "We will confirm what is live today and shape the path for the rest.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss bank settlement scope." },
    },
  },

  "Connect the point of sale.": {
    title: "Connect the point of sale.",
    description: "In-store terminal feeds are not ingested today. This page names the boundary.",
    label: "Point of sale",
    lede: "Terminals settle through acquirers on their own schedules, which makes them a separate reconciliation problem. No terminal feed is ingested today.",
    status: {
      availability: "not-started",
      label: "Planned. No terminal feed is ingested today.",
      note: "Out of scope for the current pilot deployment.",
    },
    spec: [
      { label: "Terminal feeds", value: "Not ingested" },
      { label: "Acquirer files", value: "Not imported" },
      { label: "Coverage", value: "Mobile-money rails today" },
      { label: "Path", value: "Scoped per operation" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Why it stays separate for now",
        body: "Terminal settlement batches, acquirer formats and in-store refunds behave differently from mobile-money callbacks. Folding them in prematurely would weaken the guarantees the live rails already carry.",
      },
      {
        index: "02",
        title: "What would come first",
        body: "Settlement-file import in the same canonical shape as provider callbacks, so matching and audit apply without special cases.",
      },
    ],
    sections: [
      {
        title: "The honest boundary for merchants",
        body: "Merchants that collect in-store and settle through banks keep that side of reconciliation where it lives today. PesaGuard handles the mobile-money side with live guarantees.",
        items: [
          "In-store collection stays with existing tools",
          "Mobile-money collection handled in PesaGuard",
          "Boundary reviewed per operation",
        ],
      },
    ],
    faq: [
      {
        question: "Can terminals feed PesaGuard today?",
        answer: "No. No terminal feed is ingested and no acquirer import exists. We keep the boundary explicit rather than advertising roadmap items as coverage.",
      },
      {
        question: "What about settlement files?",
        answer: "Statement and settlement imports are out of scope today. The bank rails page describes that boundary in full.",
      },
    ],
    related: [
      { label: "Bank rails", href: "/integrations/banks", description: "The settlement boundary." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "The live collection rail." },
      { label: "Merchants", href: "/solutions/merchants", description: "Operations PesaGuard supports today." },
    ],
    cta: {
      eyebrow: "Describe the in-store mix",
      title: "Tell us how in-store and mobile collections meet.",
      body: "We will confirm what is live and shape the path for the rest.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Discuss point-of-sale scope." },
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
      { label: "Replay", value: "Safe to re-run without duplication" },
    ],
    capabilities: [
      {
        index: "01",
        title: "Signed by default",
        body: "Consumers verify the sender before trusting the payload, which keeps webhook handling from becoming a spoofing surface.",
      },
      {
        index: "02",
        title: "Retries with a limit",
        body: "Transient failures are retried with bounded backoff. Exhausted deliveries move to a dead-letter path instead of vanishing.",
        items: ["Bounded retry schedule", "Dead-letter retention", "Replay from the dead letter"],
      },
      {
        index: "03",
        title: "Replay without duplication",
        body: "A replayed delivery is safe to run more than once, because idempotency is enforced where writes land.",
      },
    ],
    sections: [
      {
        title: "Delivery you can audit",
        body: "Each attempt is recorded with its outcome, so a consumer asking what was sent and when gets an answer from the record rather than the sender's memory.",
        items: [
          "Attempt history per delivery",
          "Dead letters retained for investigation",
          "Signature verifiable by the consumer",
        ],
      },
    ],
    faq: [
      {
        question: "Are webhook deliveries signed?",
        answer: "Yes. Every outbound delivery carries a signature the consumer can verify before trusting the payload.",
      },
      {
        question: "What happens when a consumer stays down?",
        answer: "Deliveries retry on a bounded schedule and then move to the dead-letter path, where they can be inspected and replayed once the consumer recovers.",
      },
    ],
    related: [
      { label: "Webhook docs", href: docsUrl("webhooks/"), description: "Signature checks, retries and replay." },
      { label: "Real-time alerts", href: "/features/real-time-alerts", description: "What delivery carries." },
      { label: "M-Pesa", href: "/integrations/mpesa", description: "Inbound events, matched live." },
    ],
    cta: {
      eyebrow: "Wire in a consumer",
      title: "Point a staging endpoint at the pilot.",
      body: "We will show signed delivery, a retry, and where the dead letter lands.",
      primary: { label: "Talk to our team", href: "/contact/sales", description: "Scope webhook delivery." },
      secondary: { label: "Webhook docs", href: docsUrl("webhooks/"), description: "Verify the contract." },
    },
  },
};
