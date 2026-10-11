import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Features | PesaGuard",
  "Reconciliation, monitoring, fraud signals, alerting, reporting and audit evidence.",
  "/features",
);

const data = pages.features;

const workflow = [
  {
    title: "Receive",
    body: "A payment callback arrives through the configured Safaricom Daraja M-Pesa pilot flow.",
  },
  {
    title: "Compare",
    body: "The callback is checked against the expected business record using the agreed fields and rules.",
  },
  {
    title: "Review",
    body: "A match or exception is returned with available context; unresolved differences remain for human review.",
  },
  {
    title: "Account",
    body: "Teams use the recorded outcome and evidence to follow their own operational and accounting procedures.",
  },
];

export default function Features() {
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.description}
        label="PesaGuard features"
        trail={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }]}
      />

      {data.features?.length ? (
        <SectionShell tone="sunken" className="feature-overview-section">
          <Reveal>
            <SectionHeading
              eyebrow="Core capabilities"
              title="One clear path from payment event to review."
              body="These capabilities support the same practical goal: help your team understand what happened to a payment and what needs attention."
            />
            <FeatureGrid className="feature-overview-grid" items={data.features} />
          </Reveal>
        </SectionShell>
      ) : null}

      <SectionShell className="feature-workflow-section">
        <SectionHeading
          eyebrow="How the capabilities fit together"
          title="A straightforward operating rhythm."
          body="PesaGuard helps teams compare the payment event with the business record, make differences visible, and keep the final decision with an accountable person."
        />
        <ol className="feature-overview-flow">
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell tone="sunken" tight>
        <div className="feature-scope-note">
          <div>
            <p className="eyebrow">Current scope</p>
            <h2>Safaricom Daraja M-Pesa pilot</h2>
          </div>
          <p>
            Other payment rails and ready-made connectors are not implied. Confirm the callback flow,
            data source, feature coverage and configuration for your pilot before relying on a capability.
          </p>
        </div>
      </SectionShell>

      {data.cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring feature-overview-cta">
            <div style={{ maxWidth: "52ch", position: "relative" }}>
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
