import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { availableIntegrations, pendingIntegrations } from "@/config/integrations";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata(
  "Integrations | PesaGuard",
  "See which payment integrations are available today and which connectors are not available yet.",
  "/integrations",
);

const data = pages.integrations;

export default function Integrations() {
  return (
    <>
      <PageHero
        title="Connect the payment records you need to explain."
        lede="PesaGuard currently focuses on M-Pesa through Safaricom Daraja and outbound webhooks. Airtel Money, bank data and point-of-sale connectors are listed below as planned work—not as services you can connect today."
        label="Integrations · clear scope, no guesswork"
        trail={[{ label: "Home", href: "/" }, { label: "Integrations", href: "/integrations" }]}
      />

      <SectionShell>
        <Reveal>
          <SectionHeading
            eyebrow="Available in the current pilot"
            title="What can be discussed for a live setup"
            body="Availability is limited to the current deployment and agreed configuration. Contact the team to confirm fit before planning a rollout."
          />
          <div className="status-board">
            {availableIntegrations.map((integration) => (
              <a className="status-row" href={integration.href} key={integration.href}>
                <strong>
                  <AvailabilityBadge availability={integration.availability} />
                  {integration.name}
                </strong>
                <span>{integration.summary}</span>
                <span className="badge badge-neutral"><CheckCircle2 aria-hidden="true" size={14} /> View scope</span>
              </a>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell tone="sunken">
        <Reveal>
          <SectionHeading
            eyebrow="Roadmap · not connectable yet"
            title="Under development"
            body="These are customer requirements PesaGuard intends to evaluate. No adapter, connection flow or delivery date is being promised. Each connector must be implemented, tested and documented before its status changes."
          />
          <div className="status-board">
            {pendingIntegrations.map((integration) => (
              <a className="status-row" href={integration.href} key={integration.href}>
                <strong>
                  <AvailabilityBadge availability={integration.availability} />
                  {integration.name}
                </strong>
                <span>{integration.summary}</span>
                <span className="badge badge-neutral"><Clock3 aria-hidden="true" size={14} /> Planned scope</span>
              </a>
            ))}
          </div>
        </Reveal>
      </SectionShell>

      <SectionShell>
        <div className="split split-center">
          <div>
            <p className="eyebrow">A connector is more than an API call<span aria-hidden="true" className="eyebrow-rule" /></p>
            <h2 className="display-3">Built around the records your team must trust.</h2>
          </div>
          <div>
            <p className="large-copy">For each new provider, PesaGuard must validate access, map the source fields, handle duplicate and delayed events, define matching rules, retain source evidence and test failure paths. A connector is not considered available until those parts have been built and checked.</p>
            <ul className="check-list" style={{ marginTop: 24 }}>
              <li>Verified source access and documented prerequisites</li>
              <li>Defined transaction references, status mapping and data quality rules</li>
              <li>Duplicate-safe processing and clear failure behavior</li>
              <li>Test coverage for mismatches, reversals and delayed records where relevant</li>
              <li>Operational ownership, monitoring and customer-facing setup guidance</li>
            </ul>
          </div>
        </div>
      </SectionShell>

      {data.related?.length ? (
        <SectionShell tone="sunken" tight>
          <SectionHeading eyebrow="Keep reading" title="Understand the operating model." />
          <RelatedLinks links={data.related} />
        </SectionShell>
      ) : null}

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring">
          <div style={{ maxWidth: "46ch", position: "relative" }}>
            <p className="eyebrow">Tell us what you need</p>
            <h2>Start with your actual payment flow.</h2>
            <p>Tell us which providers, bank reports or POS records you use. We will confirm the current boundary and capture requirements for future work without implying that a planned connector is already available.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>Discuss integration requirements</Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
