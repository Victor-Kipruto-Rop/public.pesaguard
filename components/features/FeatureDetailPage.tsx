import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { StepFlow } from "@/components/sections/StepFlow";
import { faqJsonLd } from "@/lib/seo/structured-data";
import type { PageData } from "@/types/content";

const pilotStatus = {
  availability: "pilot" as const,
  label: "PesaGuard MVP is in a customer pilot.",
  note: "Confirm this feature's availability and configuration for your workflow.",
};

export function FeatureDetailPage({ data }: { data: PageData }) {
  const cta = data.cta;

  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <PageHero
        title={data.title}
        lede={data.lede ?? data.description}
        label={data.label ?? "PesaGuard feature"}
        trail={[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: data.label ?? data.title, href: "/features" },
        ]}
        status={data.status ?? pilotStatus}
        actions={
          <Button href={cta?.primary.href ?? "/contact/sales"} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
            Discuss your payment workflow
          </Button>
        }
      />

      {data.spec?.length ? (
        <SectionShell tight className="spec-strip-wrapper">
          <dl className="spec-strip">
            {data.spec.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </SectionShell>
      ) : null}

      {data.steps?.length ? (
        <SectionShell tone="sunken" className="feature-detail-section">
          <SectionHeading
            eyebrow="The workflow"
            title="From incoming payment data to a clear next step."
            body="The exact setup is agreed for each pilot. These steps show how this feature fits into the payment-accountability workflow."
          />
          <StepFlow steps={data.steps} />
        </SectionShell>
      ) : null}

      {data.capabilities?.length ? (
        <SectionShell className="feature-detail-section">
          <SectionHeading
            eyebrow="What this feature does"
            title="Useful context for finance and operations."
            body="Each capability is described in practical terms, including what a team can review and where a human decision remains necessary."
          />
          <CapabilityList items={data.capabilities} />
        </SectionShell>
      ) : null}

      {data.sections.length ? (
        <SectionShell tone="sunken" className="feature-detail-section">
          {data.sections.map((section) => (
            <article className="feature-detail-explainer" key={section.title}>
              <p className="eyebrow">{section.eyebrow ?? "In practice"}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.items?.length ? (
                <ul className="check-list">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.note ? <p className="small muted">{section.note}</p> : null}
            </article>
          ))}
        </SectionShell>
      ) : null}

      {data.faq?.length ? (
        <SectionShell className="feature-detail-section">
          <div className="feature-detail-faq">
            <SectionHeading
              eyebrow="Clear answers"
              title="Questions teams ask before relying on a workflow."
            />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      {cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring feature-detail-cta">
            <div>
              {cta.eyebrow ? <p className="eyebrow">{cta.eyebrow}</p> : null}
              <h2>{cta.title}</h2>
              <p>{cta.body}</p>
            </div>
            <div className="actions">
              <Button href={cta.primary.href} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                {cta.primary.label}
              </Button>
            </div>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
