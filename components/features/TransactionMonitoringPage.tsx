import { ArrowUpRight, CircleAlert, Eye, GitCompareArrows } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { detailPages } from "@/content/detail";
import { faqJsonLd } from "@/lib/seo/structured-data";

const data = detailPages["See transaction flows as they change."];

const lifecycle = [
  {
    status: "RECEIVED",
    title: "Payment event received",
    body: "The event is recorded by the configured flow and is ready for validation.",
  },
  {
    status: "VALIDATED",
    title: "Input checks passed",
    body: "The transaction has moved past initial validation and can enter processing.",
  },
  {
    status: "PROCESSING",
    title: "Processing",
    body: "The workflow is carrying out its next configured operation.",
  },
  {
    status: "RECONCILING",
    title: "Comparison in progress",
    body: "The event is being compared with the expected business record.",
  },
  {
    status: "RECONCILED",
    title: "Comparison complete",
    body: "The reconciliation step completed. This does not confirm that funds settled.",
  },
];

const exceptionStates = [
  {
    status: "FAILED",
    branch: "May return to PROCESSING",
    title: "Processing failed",
    body: "A processing step failed. Depending on the configured flow, the transaction may return to PROCESSING; FAILED is not a successful or reconciled outcome.",
    action: "Review the recorded transaction context and confirm retry eligibility. Retry only through the approved, idempotent workflow.",
  },
  {
    status: "REJECTED",
    branch: "Terminal lifecycle outcome",
    title: "Event rejected",
    body: "The processing flow declined the event. REJECTED is terminal in this lifecycle and does not continue toward RECONCILED.",
    action: "Check the available source information and follow your team's agreed correction or escalation procedure.",
  },
];

const operationalGuidance = [
  {
    states: "RECEIVED · VALIDATED · PROCESSING · RECONCILING",
    title: "Confirm whether processing is still expected",
    body: "Read the reported state alongside the transaction identifier and your configured flow. The state shows what was recorded; it does not provide a timing guarantee.",
  },
  {
    states: "FAILED",
    title: "Review the failure before deciding whether to retry",
    body: "Check the transaction and processing context available to your team. Retry only when eligible and through the approved flow with its idempotency controls.",
  },
  {
    states: "REJECTED",
    title: "Investigate why the event did not proceed",
    body: "Use the available source data and follow your correction or escalation procedure. Do not treat rejection as a pending state or successful completion.",
  },
  {
    states: "RECONCILED",
    title: "Verify settlement separately",
    body: "This records completion of the comparison workflow. Confirm movement of funds through the appropriate provider or financial records and your organization's process.",
  },
];

export default function TransactionMonitoringPage() {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <section className="page-hero monitoring-hero">
        <div className="container">
          <div className="monitoring-hero-grid">
            <div className="monitoring-hero-copy">
              <p className="eyebrow">Transaction monitoring</p>
              <h1>{data.title}</h1>
              <p className="lede">{data.lede}</p>
              <div className="monitoring-availability">
                <AvailabilityBadge availability={data.status?.availability ?? "pilot"} />
                <p><strong>Safaricom Daraja M-Pesa pilot.</strong> Confirm which callback flows, status reporting and access are enabled in your environment.</p>
              </div>
              <div className="actions">
                <Button href={data.cta?.primary.href ?? "/contact/sales"} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                  Discuss your payment flow
                </Button>
              </div>
            </div>
            <aside className="monitoring-lifecycle-card" aria-label="Illustrative transaction processing lifecycle">
              <div className="monitoring-lifecycle-head">
                <span className="monitoring-lifecycle-icon"><Eye aria-hidden="true" size={18} /></span>
                <div>
                  <strong>Transaction lifecycle</strong>
                  <span>Illustrative path · not live transaction data</span>
                </div>
              </div>
              <ol className="monitoring-lifecycle-track">
                {lifecycle.map((stage, index) => (
                  <li key={stage.status}>
                    <span className="monitoring-lifecycle-node">{String(index + 1).padStart(2, "0")}</span>
                    <span className="monitoring-lifecycle-copy">
                      <strong>{stage.status}</strong>
                      <span>{stage.title}</span>
                    </span>
                    {index < lifecycle.length - 1 ? <span className="monitoring-lifecycle-connector" aria-hidden="true" /> : null}
                  </li>
                ))}
              </ol>
              <div className="monitoring-lifecycle-branches">
                {exceptionStates.map((state) => <span key={state.status}>{state.status}</span>)}
                <p>FAILED can occur from active stages; REJECTED branches from initial receipt.</p>
              </div>
              <p className="monitoring-lifecycle-foot">A status is a recorded processing state. It provides context for review; it is not a payment-settlement signal.</p>
            </aside>
          </div>
        </div>
      </section>

      <SectionShell className="reconciliation-section monitoring-lifecycle-section">
        <SectionHeading
          className="reconciliation-heading"
          eyebrow="The transaction lifecycle"
          title="Read the state, not just the status label."
          body="Each state describes a point recorded in the configured processing workflow—from initial receipt through comparison. The sequence below is the standard path, not a promise that every event reaches the end or does so within a set time."
        />
        <div className="monitoring-path-label"><span>STANDARD PROCESSING PATH</span><p>Each step reflects a recorded workflow state—not confirmation that money has moved.</p></div>
        <ol className="monitoring-state-grid">
          {lifecycle.map((stage, index) => (
            <li className="monitoring-state-card" key={stage.status}>
              <span className="monitoring-state-step">STEP {String(index + 1).padStart(2, "0")}</span>
              <span className="monitoring-state-code">{stage.status}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section monitoring-branches-section">
        <SectionHeading
          className="reconciliation-heading"
          eyebrow="When the path branches"
          title="A failure may recover. A rejection is terminal."
          body="These outcomes are not later steps on the standard path. Their meaning affects what your team checks next—and neither one should be mistaken for a successful comparison."
        />
        <div className="monitoring-exception-grid">
          {exceptionStates.map((state) => (
            <article className="monitoring-exception-card" key={state.status}>
              <div className="monitoring-exception-top">
                <span className="monitoring-state-code">{state.status}</span>
                <span className="monitoring-branch-label">{state.branch}</span>
              </div>
              <h3>{state.title}</h3>
              <p>{state.body}</p>
              <div className="monitoring-exception-next"><strong>What to review</strong><p>{state.action}</p></div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <div className="monitoring-meaning-layout">
          <div className="monitoring-meaning-intro">
            <SectionHeading
              className="reconciliation-heading"
              eyebrow="Monitoring and reconciliation"
              title="One follows progress. The other checks agreement."
              body="They answer different operational questions. A transaction can have a reported processing state while its business record still needs to be compared."
            />
            <p className="monitoring-meaning-note">Keep the distinction clear: a status is not a match result, and a match result is not proof of settlement.</p>
          </div>
          <div className="monitoring-question-cards">
            <article>
              <div className="monitoring-question-head"><span><Eye aria-hidden="true" size={18} /></span><span>PROCESS STATE</span></div>
              <h3>Monitoring: where was the transaction recorded in its workflow?</h3>
              <p>It tells your team the processing state reported by the configured flow, such as PROCESSING or FAILED.</p>
              <p className="monitoring-question-boundary"><strong>It does not establish:</strong> whether the provider event matches the expected order or whether funds settled.</p>
            </article>
            <article>
              <div className="monitoring-question-head"><span><GitCompareArrows aria-hidden="true" size={18} /></span><span>RECORD COMPARISON</span></div>
              <h3>Reconciliation: does the provider event agree with the business record?</h3>
              <p>Compare the provider callback with the expected order, receipt or ledger entry using configured matching rules.</p>
              <p className="monitoring-question-boundary"><strong>It does not establish:</strong> that payment processing is still active or that funds have settled.</p>
            </article>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section monitoring-operations-section">
        <SectionHeading
          className="reconciliation-heading"
          eyebrow="Operational use"
          title="Turn a reported state into a disciplined next check."
          body="Start with the transaction identifier and current state, then use the context available in your configured flow. Monitoring supports investigation; your team owns decisions, escalation and verification."
        />
        <ol className="monitoring-action-list">
          {operationalGuidance.map((item, index) => (
            <li className="monitoring-action-row" key={item.states}>
              <span className="monitoring-action-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="monitoring-action-state"><span>{item.states}</span><h3>{item.title}</h3></div>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell tone="sunken" className="reconciliation-section monitoring-faq-section">
          <div className="reconciliation-faq-layout monitoring-faq-layout">
            <div className="monitoring-faq-intro">
              <SectionHeading
                className="reconciliation-heading"
                eyebrow="Questions and answers"
                title="Clear answers about status, scope and responsibility."
                body="Use these answers to understand what the monitoring flow reports, what remains outside its claim, and what to confirm for your pilot."
              />
              <ul className="monitoring-faq-boundaries">
                <li><Eye aria-hidden="true" size={16} /><span>Reported processing state—not settlement proof</span></li>
                <li><GitCompareArrows aria-hidden="true" size={16} /><span>Configured Daraja pilot scope—not every payment rail</span></li>
                <li><CircleAlert aria-hidden="true" size={16} /><span>Your team retains investigation and action ownership</span></li>
              </ul>
            </div>
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      {data.cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring reconciliation-cta">
            <div>
              <p className="eyebrow">{data.cta.eyebrow}</p>
              <h2>{data.cta.title}</h2>
              <p>{data.cta.body}</p>
            </div>
            <div className="actions">
              <Button href={data.cta.primary.href} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                {data.cta.primary.label}
              </Button>
            </div>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
