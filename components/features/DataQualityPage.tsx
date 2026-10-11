import { ArrowUpRight, Check, CircleAlert, FileCheck2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { faqJsonLd } from "@/lib/seo/structured-data";
import type { PageData } from "@/types/content";

const checkGroups = [
  {
    number: "01",
    title: "Is the record identifiable?",
    description: "Required context helps connect an event to the right payment flow.",
    checks: ["Transaction identifier is present", "Tenant identifier is present"],
  },
  {
    number: "02",
    title: "Are the values usable?",
    description: "Basic value rules catch input that cannot safely be compared.",
    checks: ["Amount is numeric and greater than zero", "Currency is in the configured supported set", "Provider label is recognized"],
  },
  {
    number: "03",
    title: "Can the record be interpreted?",
    description: "Reference and schema context make the incoming shape easier to evaluate.",
    checks: ["Required payment reference is present", "Schema version is declared"],
  },
];

const flow = [
  {
    number: "01",
    title: "Receive the configured event",
    body: "An incoming record enters the agreed payment-data path. For the public pilot scope, that means Safaricom Daraja M-Pesa.",
  },
  {
    number: "02",
    title: "Apply explicit rules",
    body: "The validator checks required identifiers, amount, currency, provider label, payment reference and schema-version presence.",
  },
  {
    number: "03",
    title: "Return a reasoned decision",
    body: "A pass or failure is returned. When the provenance workflow is configured to quarantine failures, the record is held with the failed rule and reason for follow-up.",
  },
];

export function DataQualityPage({ data }: { data: PageData }) {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <section className="page-hero page-hero-data-quality">
        <div className="container dq-hero-layout">
          <div className="dq-hero-copy">
            <Breadcrumbs trail={[
              { label: "Home", href: "/" },
              { label: "Features", href: "/features" },
              { label: "Data quality", href: "/features" },
            ]} />
            <p className="eyebrow">Data quality</p>
            <h1>{data.title}</h1>
            <p className="lede">{data.lede}</p>
            <div className="dq-hero-scope">
              <AvailabilityBadge availability={data.status?.availability ?? "pilot"} />
              <p>
                <strong>Safaricom Daraja M-Pesa pilot.</strong>{" "}
                Confirm validation and quarantine behavior for your environment and callback flow.
              </p>
            </div>
            <div className="actions">
              <Button href={data.cta?.primary.href ?? "/contact/sales"} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                Discuss your data flow
              </Button>
            </div>
          </div>
          <div className="dq-example" aria-label="Illustrative example of a failed data-quality check">
          <div className="dq-example-head">
            <span className="dq-example-icon"><FileCheck2 aria-hidden="true" size={18} /></span>
            <div>
              <strong>Example validation result</strong>
              <span>Illustrative record · not live data</span>
            </div>
            <span className="dq-result-fail"><CircleAlert aria-hidden="true" size={14} /> Review</span>
          </div>
          <div className="dq-example-fields">
            <div><span>Transaction ID</span><strong>Present</strong></div>
            <div><span>Amount</span><strong className="dq-invalid-value">-25.00 <small>Must be above zero</small></strong></div>
            <div><span>Currency</span><strong>KES</strong></div>
            <div><span>Reference</span><strong>Present</strong></div>
          </div>
          <p className="dq-example-foot">Decision: fail the amount rule and return the reason. A configured ingestion path can quarantine the record for review.</p>
        </div>
        </div>
      </section>

      <SectionShell tone="sunken" className="dq-section">
        <SectionHeading
          eyebrow="What gets checked"
          title="A payment record should be identifiable, usable and interpretable."
          body="These are concrete validation rules—not a claim that every possible data problem can be detected."
        />
        <div className="dq-check-grid">
          {checkGroups.map((group) => (
            <article className="dq-check-card" key={group.number}>
              <span className="dq-check-number">{group.number}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.checks.map((check) => (
                  <li key={check}><Check aria-hidden="true" size={15} />{check}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="dq-section">
        <SectionHeading
          eyebrow="How a check becomes useful"
          title="Find the problem early. Keep the reason attached."
          body="A validation result should help a person understand what needs attention, not hide a bad input behind a reassuring status."
        />
        <ol className="dq-flow">
          {flow.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="dq-outcomes">
          <article>
            <span className="dq-outcome-mark dq-pass-mark"><Check aria-hidden="true" size={17} /></span>
            <div><h3>Pass</h3><p>The record satisfies the listed checks. This is permission to continue through the configured workflow—not proof the payment is settled or the business record is correct.</p></div>
          </article>
          <article>
            <span className="dq-outcome-mark dq-fail-mark"><ShieldAlert aria-hidden="true" size={17} /></span>
            <div><h3>Fail</h3><p>One or more checks return a rule and failure reason. In the configured provenance flow, the failed record can be quarantined instead of treated as clean input.</p></div>
          </article>
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="dq-section">
        <div className="dq-boundary-layout">
          <SectionHeading
            eyebrow="Important boundaries"
            title="A clean input is not the same as a correct payment."
            body="Data-quality checks answer a narrow question: does this record satisfy the rules currently applied to it?"
          />
          <div className="dq-boundary-list">
            <p><Check aria-hidden="true" size={17} /><span><strong>It can tell you</strong> whether required values are present and selected values pass their configured validation rules.</span></p>
            <p><CircleAlert aria-hidden="true" size={17} /><span><strong>It cannot prove</strong> funds settled, a payer is genuine, a reference belongs to the right order, or the source data is factually correct.</span></p>
            <p><CircleAlert aria-hidden="true" size={17} /><span><strong>It is not a quality percentage.</strong> Current rule outcomes are pass/fail; a green result is not a measured accuracy score.</span></p>
            <p><CircleAlert aria-hidden="true" size={17} /><span><strong>Duplicate protection is separate.</strong> Provider retries and duplicate transaction handling belong to idempotency controls, not these seven field checks.</span></p>
          </div>
        </div>
        <p className="dq-scope-note">
          The active public payment scope is the Safaricom Daraja M-Pesa pilot. Confirm that the validation and quarantine path is enabled in the specific environment and callback flow before relying on it. A provider label accepted by a rule does not, by itself, mean that provider is an available integration.
        </p>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell className="dq-section">
          <div className="dq-faq-layout">
            <SectionHeading eyebrow="Plain answers" title="Questions about data quality." />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      {data.cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring dq-cta">
            <div>
              {data.cta.eyebrow ? <p className="eyebrow">{data.cta.eyebrow}</p> : null}
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
