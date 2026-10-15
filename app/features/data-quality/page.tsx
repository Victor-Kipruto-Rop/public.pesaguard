import {
  ArrowRight,
  CheckCheck,
  CircleAlert,
  Database,
  FileSearch,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";

export const metadata = pageMetadata(
  "Data quality | PesaGuard",
  "Understand how PesaGuard validates payment records, flags missing or conflicting data, and keeps reconciliation inputs trustworthy.",
  "/features/data-quality",
);

const problems = [
  "Missing transaction references",
  "Missing required fields",
  "Invalid transaction identifiers",
  "Duplicate transaction and ledger records",
  "Incorrect payment amounts or currency values",
  "Invalid timestamps and date-format drift",
  "Inconsistent customer or account references",
  "Malformed or truncated input data",
  "Unexpected null values and out-of-range numbers",
  "Late-arriving or conflicting updates",
  "Data that violates a defined business rule",
  "Records that cannot be matched confidently",
];

const dimensions = [
  {
    title: "Data validation",
    body: "Check whether each record contains the expected fields, valid formats and required values before it is used in an operational workflow.",
    icon: CheckCheck,
  },
  {
    title: "Data completeness",
    body: "Identify missing fields, incomplete records and gaps that prevent a truthful match or an accurate reconciliation summary.",
    icon: FileSearch,
  },
  {
    title: "Duplicate detection",
    body: "Spot exact repeats, repeated provider events, and related records that may be counting the same payment more than once.",
    icon: Database,
  },
  {
    title: "Data consistency",
    body: "Confirm that amounts, timestamps, customer references, and statuses match the same business meaning across the source record and the expected ledger entry.",
    icon: ShieldCheck,
  },
  {
    title: "Anomaly identification",
    body: "Highlight unusual values, repeated patterns, or timing irregularities that need a human decision instead of an automatic conclusion.",
    icon: TriangleAlert,
  },
  {
    title: "Reliable reconciliation inputs",
    body: "Create a cleaner data foundation so matching decisions are based on usable evidence rather than guesswork or stale records.",
    icon: Sparkles,
  },
];

const lifecycle = [
  {
    step: "01",
    title: "Ingest",
    body: "Collect provider callbacks, business records and import files from the configured data sources.",
  },
  {
    step: "02",
    title: "Validate",
    body: "Check schema, required fields, amount and identifier rules before the record enters normal processing.",
  },
  {
    step: "03",
    title: "Normalize",
    body: "Standardize field naming, currency formatting, timestamps and source mappings without destroying the original evidence.",
  },
  {
    step: "04",
    title: "Compare",
    body: "Use the cleaned and validated records as the foundation for reconciliation and exception review.",
  },
];

const validationRules = [
  { label: "Required fields", value: "Transaction ID, tenant ID, reference, schema version and source context must be present where required." },
  { label: "Type checks", value: "Numeric amounts, valid currencies and correctly formatted identifiers are required before the record is accepted." },
  { label: "Timestamp checks", value: "Dates and times must be plausibly formatted and aligned with the configured source time zone." },
  { label: "Referential integrity", value: "A record should be traceable to the expected account, customer, invoice or payment source referenced by the workflow." },
  { label: "Unique record rules", value: "Repeated provider events and duplicate import records must be flagged rather than double-counted." },
  { label: "Allowed values", value: "Statuses, transaction types and source labels must fall within the configured system rules and supported flow." },
];

const issueTable = [
  { issue: "Missing payment reference", impact: "The record cannot be linked to the expected ledger entry or order.", action: "Quarantine and request source correction or a manual review." },
  { issue: "Amount mismatch", impact: "A payment may be valid but not match the expected value for the business record.", action: "Flag for reconciliation and compare the source evidence before finalizing." },
  { issue: "Duplicate event", impact: "The same payment could be counted twice unless the repeat is clearly identified.", action: "Mark as suspected duplicate and keep the original reference visible." },
  { issue: "Conflicting timestamp", impact: "Timing drift may hide misordered records or late-arriving updates.", action: "Review the source timezone and completion status before accepting the match." },
];

const faq = [
  {
    question: "What does data quality do in reconciliation?",
    answer: "It validates and normalizes incoming records so the reconciliation engine is working with usable evidence instead of malformed, incomplete or ambiguous input.",
  },
  {
    question: "Does a passing validation prove the payment is correct?",
    answer: "No. A valid record is still only one part of the story. It confirms that the data meets the configured checks; it does not guarantee that the payment was authorized, settled or matched to the correct ledger entry.",
  },
  {
    question: "How is a duplicate different from a repeated payment?",
    answer: "A duplicate is a repeated record or repeated event that should not be counted twice. A legitimate repeated payment can still be valid, but its business meaning must be reviewed against the expected source record and the configured rules.",
  },
  {
    question: "What happens when data quality fails?",
    answer: "The failed record is returned with the rule that failed and the reason, and where configured it can be quarantined for human review instead of being treated as clean input.",
  },
];

export default function DataQualityPage() {
  return (
    <>
      <PageHero
        className="page-hero-product"
        label="Data quality"
        title="Trust the data behind every financial decision."
        lede="PesaGuard helps teams validate incoming payment records, identify missing or conflicting values, and keep reconciliation inputs trustworthy enough for review and reporting."
        trail={[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: "Data quality", href: "/features/data-quality" },
        ]}
        actions={
          <>
            <Button href="/contact/sales">Request a demo</Button>
            <Button href="/features/reconciliation" variant="quiet">Explore reconciliation</Button>
          </>
        }
      />

      <SectionShell tone="sunken" className="reconciliation-section">
        <div style={{ display: "grid", gap: 32, gridTemplateColumns: "1.4fr 1fr" }}>
          <div>
            <SectionHeading
              eyebrow="Why it matters"
              title="Good reconciliation starts with trustworthy inputs."
              body="When a payment record is incomplete, duplicated, misformatted or inconsistent, the reconciliation engine has to work harder and the team risks making decisions from weak evidence. Data quality narrows that risk by checking the record before it is treated as a clean financial fact."
            />
          </div>
          <div style={{ border: "1px solid rgba(11,46,36,0.12)", borderRadius: 20, padding: 24, background: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ display: "inline-flex", width: 38, height: 38, borderRadius: 12, background: "#eaf9f0", color: "#0B2E24", alignItems: "center", justifyContent: "center" }}>
                <Database aria-hidden="true" size={18} />
              </span>
              <div>
                <strong style={{ display: "block", fontSize: 14, letterSpacing: "0.08em", color: "#124A3B", textTransform: "uppercase" }}>QUALITY WINDOW</strong>
                <div style={{ fontWeight: 600 }}>Validated records and usable context</div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { label: "Accepted records", value: "93%" },
                { label: "Rejected or quarantined", value: "7%" },
                { label: "Suspected duplicates", value: "2" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(11,46,36,0.08)", paddingTop: 10 }}>
                  <span style={{ color: "#124A3B" }}>{item.label}</span>
                  <strong style={{ fontSize: 18 }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <SectionHeading
          eyebrow="Common problems"
          title="The quickest route to bad reconciliation is weak input."
          body="A payment workflow usually fails because the data is missing, inconsistent, repeated or incompatible with the expected business record. These examples are common in operational finance and payment review, especially around M-Pesa and ledger-based reconciliation."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {problems.map((problem) => (
            <article key={problem} style={{ border: "1px solid rgba(11,46,36,0.12)", borderRadius: 18, padding: 18, background: "#ffffff" }}>
              <span style={{ display: "inline-flex", width: 28, height: 28, borderRadius: 8, background: "#eef9f3", color: "#0B2E24", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <CircleAlert aria-hidden="true" size={14} />
              </span>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{problem}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section">
        <SectionHeading
          eyebrow="Quality dimensions"
          title="The data must be valid, complete and explainable."
          body="Data quality is not one rule. It is a set of checks that make the downstream reconciliation process repeatable and reviewable."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {dimensions.map(({ title, body, icon: Icon }) => (
            <article key={title} style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(11,46,36,0.12)", padding: 20 }}>
              <span style={{ display: "inline-flex", width: 38, height: 38, borderRadius: 12, background: "#edf8ef", color: "#0B2E24", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                <Icon aria-hidden="true" size={18} />
              </span>
              <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
              <p style={{ margin: 0, color: "#124A3B" }}>{body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <SectionHeading
          eyebrow="Validation lifecycle"
          title="From ingestion to reconciled evidence."
          body="The record does not become usable just because it arrived. It becomes trustworthy only after the system validates it, normalizes it, and preserves the original evidence needed for a review."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 18 }}>
          {lifecycle.map(({ step, title, body }) => (
            <article key={step} style={{ border: "1px solid rgba(11,46,36,0.12)", borderRadius: 18, background: "#ffffff", padding: 18 }}>
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#124A3B", marginBottom: 8 }}>{step}</span>
              <h3 style={{ margin: "0 0 8px" }}>{title}</h3>
              <p style={{ margin: 0, color: "#124A3B" }}>{body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section">
        <SectionHeading
          eyebrow="Operational checks"
          title="Validation rules make the quality threshold explicit."
          body="The goal is not to hide a failure. It is to show the exact rule that failed so the team can decide whether to quarantine, correct or review the record."
        />
        <div style={{ display: "grid", gap: 12 }}>
          {validationRules.map((rule) => (
            <div key={rule.label} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 18, background: "#ffffff", borderRadius: 16, border: "1px solid rgba(11,46,36,0.12)", padding: 18 }}>
              <strong style={{ color: "#124A3B" }}>{rule.label}</strong>
              <span style={{ color: "#0B2E24", lineHeight: 1.6 }}>{rule.value}</span>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <SectionHeading
          eyebrow="Examples of poor-quality data"
          title="A clean record is not the same as a correct record."
          body="Some issues are obvious and should be rejected. Others are valid input with a business-level tension that needs action. The right response depends on the rule and the evidence."
        />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#ffffff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(11,46,36,0.12)" }}>
            <thead>
              <tr style={{ background: "#edf8ef" }}>
                <th style={{ textAlign: "left", padding: 14, color: "#124A3B" }}>Issue</th>
                <th style={{ textAlign: "left", padding: 14, color: "#124A3B" }}>Likely impact</th>
                <th style={{ textAlign: "left", padding: 14, color: "#124A3B" }}>Operational response</th>
              </tr>
            </thead>
            <tbody>
              {issueTable.map((row) => (
                <tr key={row.issue} style={{ borderTop: "1px solid rgba(11,46,36,0.1)" }}>
                  <td style={{ padding: 14, fontWeight: 600 }}>{row.issue}</td>
                  <td style={{ padding: 14 }}>{row.impact}</td>
                  <td style={{ padding: 14 }}>{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section">
        <SectionHeading
          eyebrow="What good data quality looks like"
          title="Clear input. Clear ownership. Clear next action."
          body="Where these controls are in place, teams can tell whether a record is accepted, rejected, quarantined or requires a business review without guessing about the source data."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18 }}>
          {[
            "The record has the required source and business identifiers.",
            "The amount, currency and timestamp are readable and consistent with the configured flow.",
            "Duplicate records are tracked rather than silently counted twice.",
            "A failed record includes the reason and a path back to the source evidence.",
            "Reviewers can see whether the issue is invalid input, a mismatch, or a needs-review exception.",
            "The workflow does not treat a validation pass as a settlement or fraud verdict.",
          ].map((item) => (
            <article key={item} style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(11,46,36,0.12)", padding: 18 }}>
              <span style={{ display: "inline-flex", width: 30, height: 30, borderRadius: 9, background: "#eaf9f0", color: "#0B2E24", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <CheckCheck aria-hidden="true" size={15} />
              </span>
              <p style={{ margin: 0, color: "#124A3B", lineHeight: 1.6 }}>{item}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      {faq.length ? (
        <SectionShell className="reconciliation-section">
          <div className="reconciliation-faq-layout">
            <SectionHeading
              className="reconciliation-heading"
              eyebrow="Questions & answers"
              title="The data quality process should make next steps obvious."
              body="These answers clarify what validation does, what it does not prove, and why failed or anomalous records still need accountable review."
            />
            <Faq items={faq} />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring reconciliation-cta">
          <div>
            <p className="eyebrow">Review your inputs</p>
            <h2>Keep the payment data clean enough to trust.</h2>
            <p>Bring one real example of a missing, repeated or inconsistent record and we will map it to the validation, duplicate and exception-handling flow that fits your setup.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowRight aria-hidden="true" size={17} />}>
              Talk to our team
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
