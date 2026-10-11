import { ArrowDown, ArrowUpRight, CircleAlert, GitCompareArrows } from "lucide-react";
import { detailPages } from "@/content/detail";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { pageMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/structured-data";

const data = detailPages["Reconciliation you can explain."];

export const metadata = pageMetadata(
  "Payment reconciliation | PesaGuard",
  data.description,
  "/features/reconciliation",
);

const outcomes = [
  {
    status: "MATCHED",
    meaning: "The reference, amount and event time meet the configured match rules for one expected record; phone is also checked if both sides provide it.",
    next: "Review as a successful comparison; confirm settlement separately where required.",
  },
  {
    status: "PENDING",
    meaning: "A candidate is identified, but its internal record is marked as pending.",
    next: "Check the source record and follow your team's pending-payment procedure.",
  },
  {
    status: "PARTIAL",
    meaning: "A plausible candidate meets only some criteria or falls within a tolerance-based rule.",
    next: "Compare the evidence and decide whether the difference is acceptable or needs correction.",
  },
  {
    status: "MISMATCH",
    meaning: "A candidate exists, but a relevant amount, reference or timing check does not align.",
    next: "Investigate the conflicting source values; do not treat this status as a fraud verdict.",
  },
  {
    status: "UNMATCHED",
    meaning: "No eligible expected business record was found for the callback.",
    next: "Check whether the record arrived, uses the expected reference, or belongs to another flow.",
  },
  {
    status: "DUPLICATE",
    meaning: "The transaction ID was already seen, or multiple expected records share a reference.",
    next: "Inspect the repeated event or ambiguous business records before taking action.",
  },
  {
    status: "EXCEPTION",
    meaning: "Required data could not be evaluated, such as an invalid amount, missing transaction ID or missing refund reference.",
    next: "Correct or supply the required source information, then follow the agreed reprocessing procedure.",
  },
];

const inputs = [
  {
    title: "A supported Daraja callback",
    body: "The configured M-Pesa callback flow and the transaction fields available from the merchant's Safaricom Daraja setup.",
  },
  {
    title: "The expected business record",
    body: "An order, receipt or ledger entry that represents the payment, supplied through the data path agreed for the pilot.",
  },
  {
    title: "Rules and an owner",
    body: "The references and amounts to compare, the applicable time window and tolerance, and the person responsible for unresolved outcomes.",
  },
];

const decisions = [
  "Validate and normalize the callback; unusable input is returned as an exception.",
  "Check repeated transaction IDs and ambiguous internal references before accepting a candidate.",
  "Accept an exact reference, amount and time-window match as MATCHED (or PENDING where the candidate record is marked pending); compare phone when both sides provide it.",
  "Classify weaker candidates as PARTIAL or MISMATCH; return UNMATCHED when no candidate fits.",
];

export default function Reconciliation() {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <SectionShell tone="sunken" className="reconciliation-section">
        <div className="reconciliation-explainer">
          <div>
            <SectionHeading
              eyebrow="What is being reconciled"
              title="A provider event is compared with the business record that should explain it."
              body="A callback can confirm that a provider reported a payment. Reconciliation answers a different question: can the callback be matched to the expected order, receipt or ledger entry using the agreed fields?"
            />
          </div>
          <aside className="reconciliation-purpose-card">
            <span><GitCompareArrows aria-hidden="true" size={19} /></span>
            <h3>Comparison, not money movement</h3>
            <p>PesaGuard analyzes transaction information and surfaces outcomes. It does not initiate, hold, transfer or settle customer funds, and a MATCHED result is not a settlement guarantee.</p>
          </aside>
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <div className="reconciliation-flow-layout">
          <div className="reconciliation-flow-process">
            <SectionHeading
              className="reconciliation-heading"
              eyebrow="The reconciliation flow"
              title="From callback to a reasoned result."
              body="PesaGuard validates an incoming provider event, compares it with the expected business record, then returns an outcome with the rules and evidence that explain it. Customer data sources and active matching settings are confirmed during the Daraja pilot setup."
            />
            <ol className="reconciliation-flow">
              {data.steps?.map((step) => (
                <li className="reconciliation-flow-step" key={step.step}>
                  <div className="reconciliation-flow-index">
                    <span>{step.step}</span>
                    <ArrowDown aria-hidden="true" size={15} />
                  </div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    {step.detail ? <p className="reconciliation-flow-detail">{step.detail}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="reconciliation-flow-demo" aria-labelledby="reconciliation-demo-title">
            <figcaption className="reconciliation-demo-heading">
              <div>
                <span className="reconciliation-demo-kicker">Illustrative flow</span>
                <h3 id="reconciliation-demo-title">Two records. One explained comparison.</h3>
              </div>
              <span className="reconciliation-demo-label">Sample data · not live</span>
            </figcaption>

            <div className="reconciliation-demo-sources" aria-label="Example comparison inputs">
              <article className="reconciliation-demo-record">
                <span className="reconciliation-demo-record-type"><GitCompareArrows aria-hidden="true" size={14} /> PROVIDER CALLBACK</span>
                <strong>Safaricom Daraja</strong>
                <dl>
                  <div><dt>Reference</dt><dd>PG-DEMO-0184</dd></div>
                  <div><dt>Amount</dt><dd>KES 1,250.00</dd></div>
                  <div><dt>Received</dt><dd>11 Oct · 10:42:16</dd></div>
                </dl>
              </article>
              <article className="reconciliation-demo-record">
                <span className="reconciliation-demo-record-type"><GitCompareArrows aria-hidden="true" size={14} /> EXPECTED RECORD</span>
                <strong>Order · #0184</strong>
                <dl>
                  <div><dt>Reference</dt><dd>PG-DEMO-0184</dd></div>
                  <div><dt>Amount</dt><dd>KES 1,250.00</dd></div>
                  <div><dt>Created</dt><dd>11 Oct · 10:41:32</dd></div>
                </dl>
              </article>
            </div>

            <div className="reconciliation-demo-merge" aria-hidden="true">
              <span className="reconciliation-demo-packet reconciliation-demo-packet-left" />
              <span className="reconciliation-demo-packet reconciliation-demo-packet-right" />
            </div>

            <div className="reconciliation-demo-engine">
              <div className="reconciliation-demo-engine-head">
                <span className="reconciliation-demo-engine-icon"><GitCompareArrows aria-hidden="true" size={16} /></span>
                <div><strong>Matching rules</strong><span>Configured comparison · sample values</span></div>
              </div>
              <ul>
                <li><span>Reference</span><strong>Exact match</strong><i aria-hidden="true">✓</i></li>
                <li><span>Amount</span><strong>Exact amount</strong><i aria-hidden="true">✓</i></li>
                <li><span>Event time</span><strong>44s · within window</strong><i aria-hidden="true">✓</i></li>
              </ul>
            </div>

            <div className="reconciliation-demo-result-link" aria-hidden="true">
              <span className="reconciliation-demo-packet reconciliation-demo-packet-result" />
            </div>

            <div className="reconciliation-demo-result">
              <div>
                <span className="reconciliation-demo-result-status">MATCHED</span>
                <strong>Comparison rules satisfied</strong>
              </div>
              <p>Explained by the reference, amount and event-time checks. This result does not confirm settlement.</p>
            </div>
            <p className="reconciliation-demo-foot">Illustration only. The sample times are 44 seconds apart; the default comparison window is 900 seconds. Confirm active fields and settings for your pilot.</p>
          </figure>
        </div>
      </SectionShell>

      {data.capabilities?.length ? (
        <SectionShell tone="sunken" className="reconciliation-section">
          <SectionHeading
            className="reconciliation-heading"
            eyebrow="Why results are reviewable"
            title="Make the reasoning visible, not just the final label."
            body="The engine returns context that helps an operator understand a result and handle duplicate or ambiguous records deliberately."
          />
          <div className="reconciliation-capability-grid">
            {data.capabilities.map((capability) => (
              <article className="reconciliation-capability" key={capability.index}>
                <span>{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                {capability.items?.length ? (
                  <ul>
                    {capability.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </SectionShell>
      ) : null}

      <SectionShell tone="sunken" className="reconciliation-section">
        <SectionHeading
          className="reconciliation-heading"
          eyebrow="Understand the result"
          title="Seven statuses. Seven different meanings."
          body="A result is a classification of the available data, not an automatic operational or financial decision. Use its evidence to choose the appropriate next step."
        />
        <div className="reconciliation-outcomes" role="list">
          {outcomes.map((outcome) => (
            <article className="reconciliation-outcome" key={outcome.status} role="listitem">
              <span className="reconciliation-outcome-status">{outcome.status}</span>
              <p>{outcome.meaning}</p>
              <div>
                <span>What to do</span>
                <p>{outcome.next}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="reconciliation-section">
        <div className="reconciliation-rules-layout">
          <SectionHeading
            className="reconciliation-heading"
            eyebrow="How a match is decided"
            title="Compare the agreed fields in a defined order."
            body="The engine validates input, handles duplicate cases, then evaluates exact and tolerance-based candidates. The order matters: invalid or ambiguous inputs must not be silently treated as a clean match."
          />
          <div className="reconciliation-rules-content">
            <ol className="reconciliation-decision-list">
              {decisions.map((decision, index) => (
                <li key={decision}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{decision}</p>
                </li>
              ))}
            </ol>
            <aside className="reconciliation-tolerance">
              <CircleAlert aria-hidden="true" size={19} />
              <div>
                <h3>Defaults are not a promise about your pilot configuration.</h3>
                <p>The engine defaults are a 0.5% amount tolerance and a 900-second (15-minute) time window. A flow can override them. Confirm the active settings, time-zone handling and reference fields before interpreting results.</p>
              </div>
            </aside>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="sunken" className="reconciliation-section">
        <SectionHeading
          className="reconciliation-heading"
          eyebrow="What a pilot needs"
          title="Good matching starts with good inputs."
          body="The team needs to agree how the provider event and your expected business record relate before a result can be useful."
        />
        <div className="reconciliation-inputs">
          {inputs.map((input, index) => (
            <article key={input.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{input.title}</h3>
              <p>{input.body}</p>
            </article>
          ))}
        </div>
        <p className="reconciliation-scope-note">
          The active public scope is Safaricom Daraja M-Pesa in a pilot. Airtel Money, bank statements and POS feeds are not connected reconciliation sources. Customer teams remain responsible for investigating exceptions and making accounting or payment decisions.
        </p>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell className="reconciliation-section">
          <div className="reconciliation-faq-layout">
            <SectionHeading
              className="reconciliation-heading"
              eyebrow="Questions and answers"
              title="Know what a result does—and does not—tell you."
              body="These answers describe the matching workflow and its current scope, including where configuration or customer review is still required."
            />
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
