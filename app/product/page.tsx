import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  CircleAlert,
  Database,
  FileText,
  type LucideIcon,
  Network,
  ShieldCheck,
} from "lucide-react";
import { pages } from "@/content/pages";
import { faqJsonLd } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { docsUrl } from "@/config/docs";

const data = pages.product;

export const metadata = pageMetadata(
  "Product overview | PesaGuard",
  data.description,
  "/product",
);

const platformLinks = [
  { href: "#overview", title: "Product overview", body: "What PesaGuard does and where it fits." },
  { href: "#how-it-works", title: "How it works", body: "Follow payment data through reconciliation and review." },
  { href: "#security", title: "Security model", body: "Access controls, data protection and auditability." },
  { href: "/status", title: "System status", body: "Service availability and operational updates." },
];

const capabilities: { title: string; body: string; href: string; icon: LucideIcon }[] = [
  { title: "Reconciliation", body: "Match payments against business records.", href: "/features/reconciliation", icon: Check },
  { title: "Transaction monitoring", body: "Review payment events and processing states.", href: "/features/transaction-monitoring", icon: Database },
  { title: "Anomaly signals", body: "Flag discrepancies and unusual activity for review.", href: "/features/fraud-detection", icon: CircleAlert },
  { title: "Alerts and notifications", body: "Bring relevant exceptions to authorized reviewers.", href: "/features/real-time-alerts", icon: Network },
  { title: "Reports and analytics", body: "Review reconciliation outcomes and open exceptions.", href: "/features/audit-trail", icon: FileText },
  { title: "Audit history", body: "Keep processing events and decisions traceable.", href: "/features/audit-trail", icon: ShieldCheck },
];

const workflow: { title: string; body: string }[] = [
  { title: "Receive", body: "Accept a Daraja callback through the configured pilot integration." },
  { title: "Validate", body: "Check required fields and prepare supported data for processing." },
  { title: "Normalize", body: "Standardize transaction details used by the agreed workflow." },
  { title: "Match", body: "Compare the payment reference and amount with the expected business record." },
  { title: "Reconcile", body: "Record a match or classify a difference for follow-up." },
  { title: "Investigate", body: "Let a Finance Officer review unmatched or flagged records and record an outcome." },
  { title: "Report", body: "Review available summaries and the history behind recorded outcomes." },
];

const capabilityGroups = [
  {
    title: "Reliable records",
    body: "Validate and normalize incoming events, handle repeats, and make transactions searchable by the identifiers available in the configured flow.",
  },
  {
    title: "Useful comparisons",
    body: "Compare references, amounts and agreed fields; surface missing counterparts and unmatched records rather than silently treating them as reconciled.",
  },
  {
    title: "Human-led follow-up",
    body: "Give authorized reviewers context for exceptions, notifications where configured, and a place to record investigation outcomes.",
  },
  {
    title: "Operational evidence",
    body: "Review reconciliation summaries and retain event and decision history. Report formats, permissions and monitoring depend on the pilot setup.",
  },
];

const integrationScopes = [
  {
    status: "Pilot",
    title: "Safaricom Daraja M-Pesa",
    body: "The active payment-event source. PayBill or Buy Goods/Till support depends on merchant eligibility, Daraja access and the configured callback flow.",
  },
  {
    status: "Documented",
    title: "PesaGuard API and webhooks",
    body: "Developer documentation describes API access and event delivery. Confirm credentials, availability and exact behavior for your pilot environment.",
  },
  {
    status: "Not currently available",
    title: "Other providers and connectors",
    body: "Bank feeds, other mobile-money providers, POS/ERP/SACCO connectors and CSV imports are not offered as live integrations today.",
  },
];

const audiences = [
  { title: "Merchants and retailers", body: "Compare payment events with sales and expected receipts." },
  { title: "SACCOs and finance teams", body: "Review collection discrepancies with traceable records." },
  { title: "E-commerce and distributors", body: "Compare incoming payments with orders and invoices." },
  { title: "Operations and auditors", body: "Investigate exceptions and review recorded decisions." },
];

export default function Product() {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <PageHero
        className="page-hero-product"
        title={data.title}
        lede={data.lede}
        label="Financial reconciliation infrastructure"
        trail={[{ label: "Home", href: "/" }, { label: "Product", href: "/product" }]}
        status={data.status}
        actions={
          <>
            <Button href="#overview">View platform</Button>
            <Button href={docsUrl()} variant="quiet">Documentation</Button>
          </>
        }
      />

      <SectionShell id="overview" className="product-overview-shell">
        <div className="product-overview-grid">
          <div>
            <SectionHeading
              className="product-section-heading"
              eyebrow="Platform"
              title="Everything in its place."
            />
            <nav aria-label="Product overview" className="product-platform-links">
              {platformLinks.map((item) => (
                <Link className="product-platform-link" href={item.href} key={item.title}>
                  <span><strong>{item.title}</strong><small>{item.body}</small></span>
                  <ArrowUpRight aria-hidden="true" size={16} />
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <SectionHeading
              className="product-section-heading"
              eyebrow="Capabilities"
              title="Clear, connected capabilities."
              body="Available features depend on the configured pilot flow."
            />
            <div className="product-capability-links">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <Link className="product-capability-link" href={capability.href} key={capability.title}>
                    <span className="product-capability-icon"><Icon aria-hidden="true" size={16} /></span>
                    <span><strong>{capability.title}</strong><small>{capability.body}</small></span>
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="how-it-works" tone="sunken">
        <SectionHeading
          className="product-section-heading"
          eyebrow="How it works"
          title="From payment event to reconciled record."
          body="The configured M-Pesa pilot flow receives and checks payment data, compares it with the expected business record, then makes unresolved differences available for review."
        />
        <div className="product-how-it-works-grid">
          <div>
            <ol className="product-workflow-grid product-workflow-stepper">
              {workflow.map((stage, index) => (
                <li className="product-workflow-stage" key={stage.title}>
                  <span className="product-workflow-stage-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="product-how-it-works-figure">
            <Image
              alt="Illustrative PesaGuard workflow diagram showing sample data sources, reconciliation steps, a sample dashboard, and outputs."
              className="product-how-it-works-image"
              height={768}
              sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 55vw"
              src="/product-how-it-works.png"
              width={1152}
            />
          </figure>
        </div>
      </SectionShell>

      <SectionShell id="capabilities" className="product-refined-section">
        <SectionHeading
          className="product-section-heading"
          eyebrow="Core capabilities"
          title="Useful detail without the noise."
          body="The exact fields and actions depend on the records and rules agreed for the pilot."
        />
        <div className="product-detail-grid">
          {capabilityGroups.map((group, index) => (
            <article className="product-detail-item" key={group.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="integrations" tone="sunken" className="product-refined-section">
        <SectionHeading
          className="product-section-heading"
          eyebrow="Integrations"
          title="Connect the payment flow you can verify."
          body="PesaGuard distinguishes the active pilot integration from documented interfaces and connectors that are not available yet."
        />
        <div className="product-scope-grid">
          {integrationScopes.map((scope) => (
            <article className="product-scope-item" key={scope.title}>
              <span>{scope.status}</span>
              <h3>{scope.title}</h3>
              <p>{scope.body}</p>
            </article>
          ))}
        </div>
        <p className="product-scope-note">
          No public self-serve sandbox is available yet. Pilot access and testing arrangements are
          confirmed with the team. <Link href={docsUrl()}>Explore documentation<ArrowUpRight aria-hidden="true" size={14} /></Link>
        </p>
      </SectionShell>

      <SectionShell id="security" className="product-refined-section">
        <div className="product-security-layout">
          <SectionHeading
            className="product-section-heading"
            eyebrow="Security and accountability"
            title="Built for traceable financial operations."
            body="Published security information describes authentication, access permissions, tenant separation, encryption and audit controls. Confirm which controls, retention and recovery practices apply to a specific pilot deployment."
          />
          <div className="product-security-note">
            <ShieldCheck aria-hidden="true" size={20} />
            <p>
              PesaGuard supports reconciliation and investigation; it does not initiate payments,
              hold funds, or imply settlement or refunds. An anomaly requires human review and is
              not a finding of fraud.
            </p>
            <Link href="/security">Review the security model<ArrowUpRight aria-hidden="true" size={15} /></Link>
          </div>
        </div>
      </SectionShell>

      <SectionShell tone="sunken" id="use-cases" className="product-refined-section">
        <SectionHeading
          className="product-section-heading"
          eyebrow="Who it serves"
          title="For the teams responsible for the numbers."
        />
        <div className="product-audience-grid">
          {audiences.map((audience, index) => (
            <article className="product-audience-card" key={audience.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{audience.title}</h3>
              <p>{audience.body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell id="faq" className="product-refined-section product-faq-section">
          <div className="product-faq-layout">
            <SectionHeading
              className="product-section-heading"
              eyebrow="Frequently asked questions"
              title="Before you get started."
            />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring product-cta">
          <div>
            <p className="eyebrow">Every Transaction. Accounted For.</p>
            <h2>Bring clarity to payment operations.</h2>
            <p>Discuss your Daraja setup, source records and pilot requirements with our team.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
              Get started
            </Button>
            <Button href="/contact" variant="ghost-light">Talk to our team</Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
