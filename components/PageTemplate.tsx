import type { PageData } from "@/types/content";
import { faqJsonLd } from "@/lib/seo/structured-data";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { AvailabilityBadge } from "@/components/ui/Badge";
import { SectionShell } from "@/components/sections/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { StepFlow } from "@/components/sections/StepFlow";
import { PillarGrid } from "@/components/sections/PillarGrid";
import { Timeline } from "@/components/sections/Timeline";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Faq } from "@/components/sections/Faq";
import { RelatedLinks } from "@/components/sections/RelatedLinks";
import { CtaBand } from "@/components/sections/CtaBand";
import { StatBand } from "@/components/sections/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, Check } from "lucide-react";
import { FeatureDetailPage } from "@/components/features/FeatureDetailPage";
import { DataQualityPage } from "@/components/features/DataQualityPage";
import { CookiePreferencesButton } from "@/components/layout/CookieConsent";

const legalPages = [
  { slug: "privacy", label: "Privacy notice" },
  { slug: "terms", label: "Terms of use" },
  { slug: "cookies", label: "Cookie notice" },
];

function legalSectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Shared long-form page renderer.
 *
 * Band order is deliberately varied so adjacent sections never share the same
 * surface: hero (paper) -> spec strip -> metrics -> feature/capability/step
 * bands (sunken) -> comparison -> pillars (sunken) -> plans -> timeline ->
 * faq -> related (sunken) -> closing panel (ink). Pure-prose legal pages keep
 * the article + sticky aside so they stay quiet and readable.
 */
export function PageTemplate({ data, slug }: { data: PageData; slug: string }) {
  if (slug === "privacy" || slug === "terms" || slug === "cookies") {
    return <LegalTemplate data={data} slug={slug} />;
  }

  if (slug === "features") {
    if (data.label === "Data quality") {
      return <DataQualityPage data={data} />;
    }
    return <FeatureDetailPage data={data} />;
  }

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
        label={data.label ?? "PesaGuard platform"}
        trail={[{ label: "Home", href: "/" }, { label: data.label ?? data.title, href: `/${slug}` }]}
        status={data.status}
        actions={
          <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
            Talk to our team
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

      {data.metrics?.length ? (
        <SectionShell tight>
          <StatBand metrics={data.metrics} />
        </SectionShell>
      ) : null}


      {data.features?.length || data.capabilities?.length || data.steps?.length ? (
        <SectionShell tone="sunken">
          <Reveal>
            {data.features?.length ? (
              <div>
                <SectionHeading eyebrow="Capabilities" title="What this page covers." />
                <FeatureGrid items={data.features} />
              </div>
            ) : null}
            {data.capabilities?.length ? (
              <div>
                <SectionHeading eyebrow="Details" title="How each part works." />
                <CapabilityList items={data.capabilities} />
              </div>
            ) : null}
            {data.steps?.length ? (
              <div>
                <SectionHeading eyebrow="How it works" title="A practical path, end to end." />
                <StepFlow steps={data.steps} />
              </div>
            ) : null}
          </Reveal>
        </SectionShell>
      ) : null}

      {data.sections.length ? (
        <SectionShell>
          <div className="content-layout">
            <div className="content-main">
              {data.sections.map((section) => (
                <article className="content-section" id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} key={section.title}>
                  <p className="eyebrow">{section.eyebrow ?? slug.replaceAll("-", " ")}</p>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.items ? (
                    <ul className="check-list">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Check aria-hidden="true" size={16} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.availability ? (
                    <p className="mt-3">
                      <AvailabilityBadge availability={section.availability} showNote />
                    </p>
                  ) : null}
                  {section.note ? <p className="small muted">{section.note}</p> : null}
                </article>
              ))}
            </div>
            <aside className="side-note">
              <span className="status-dot" />
              <strong>Designed for accountable operations</strong>
              <p>Clear controls, useful evidence, and practical workflows for teams that move money.</p>
              {data.related?.length ? (
                <nav aria-label="Related pages" className="side-note-links">
                  {data.related.map((link) => (
                    <a href={link.href} key={link.href}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              ) : null}
            </aside>
          </div>
        </SectionShell>
      ) : null}

      {data.comparison?.length ? (
        <SectionShell tone="ink">
          <SectionHeading eyebrow="Contrast" title="Where PesaGuard differs." />
          <ComparisonTable rows={data.comparison} />
        </SectionShell>
      ) : null}

      {data.pillars?.length ? (
        <SectionShell tone="sunken">
          <Reveal>
            <SectionHeading eyebrow="Principles" title="What we optimize for." />
            <PillarGrid pillars={data.pillars} />
          </Reveal>
        </SectionShell>
      ) : null}

      {data.timeline?.length ? (
        <SectionShell tone="sunken">
          <div className="split">
            <SectionHeading eyebrow="Roadmap" title="Where the work goes next." />
            <Timeline entries={data.timeline} />
          </div>
        </SectionShell>
      ) : null}

      {data.faq?.length ? (
        <SectionShell>
          <div className="split">
            <SectionHeading eyebrow="Questions" title="Asked and answered." />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      {data.related?.length ? (
        <SectionShell tone="sunken" tight>
          <SectionHeading eyebrow="Keep reading" title="Adjacent pages." />
          <RelatedLinks links={data.related} />
        </SectionShell>
      ) : null}

      {data.cta ? (
        <SectionShell>
          <div className="panel panel-split ring-decoration closing-ring">
            {data.cta.eyebrow ? <p className="eyebrow">{data.cta.eyebrow}</p> : null}
            <h2>{data.cta.title}</h2>
            <p>{data.cta.body}</p>
            <div className="actions">
              <Button href={data.cta.primary.href} trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
                {data.cta.primary.label}
              </Button>
              {data.cta.secondary ? (
                <Button href={data.cta.secondary.href} variant="ghost-light">
                  {data.cta.secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}

/** Legal pages: a focused article with a sticky table-of-contents aside. */
function LegalTemplate({ data, slug }: { data: PageData; slug: string }) {
  return (
    <>
      <PageHero
        title={data.title}
        lede={undefined}
        label={undefined}
        trail={slug === "privacy" || slug === "terms" || slug === "cookies" ? undefined : [{ label: "Home", href: "/" }, { label: data.label ?? data.title, href: `/${slug}` }]}
        className="page-hero-legal"
      />
      <SectionShell className="legal-document-section">
        <p className="legal-document-meta">
          <span>Effective date</span>
          <time dateTime="2026-10-11">11 October 2026</time>
          <span>Public website notice · PesaGuard, Nairobi, Kenya</span>
        </p>
        <div className="content-layout legal-content-layout">
          <div className="content-main">
            {data.sections.map((section) => (
              <article
                aria-labelledby={`${legalSectionId(section.title)}-heading`}
                className="content-section legal-content-section"
                id={legalSectionId(section.title)}
                key={section.title}
              >
                <p className="eyebrow">{section.eyebrow ?? slug}</p>
                <h2 id={`${legalSectionId(section.title)}-heading`}>{section.title}</h2>
                <p>{section.body}</p>
                {section.items ? (
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
          </div>
          <aside aria-label="Legal page navigation and contact information" className="legal-sidebar">
            <div>
              <p className="legal-sidebar-label">PESAGUARD POLICIES</p>
              <nav aria-label="Legal pages" className="legal-policy-nav">
                {legalPages.map((page) => (
                  <Link aria-current={page.slug === slug ? "page" : undefined} href={`/${page.slug}`} key={page.slug}>
                    {page.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="legal-sidebar-label">ON THIS PAGE</p>
              <nav aria-label="On this page" className="toc">
                {data.sections.map((section) => {
                  const sectionId = legalSectionId(section.title);
                  return <a href={`#${sectionId}`} key={section.title}>{section.title}</a>;
                })}
              </nav>
            </div>
            <div className="legal-contact-card">
              <p className="legal-sidebar-label">NOTICE CONTACT</p>
              <strong>Victor Kipruto Rop</strong>
              <p>Project developer · Data Engineer</p>
              <address>
                <a href="mailto:hello@pesaguard.co.ke">hello@pesaguard.co.ke</a>
                <a href="mailto:hello@victorkipruto.com">hello@victorkipruto.com</a>
                <a href="tel:+254723484552">+254 723 484 552</a>
                <span>Nairobi, Kenya</span>
              </address>
              <p className="legal-entity-caveat">PesaGuard is the product name shown on this website. The contracting legal entity, if applicable, must be identified in the signed customer agreement.</p>
            </div>
            {slug === "cookies" ? <CookiePreferencesButton /> : null}
          </aside>
        </div>
      </SectionShell>
      {data.cta ? <CtaBand cta={data.cta} /> : null}
    </>
  );
}
