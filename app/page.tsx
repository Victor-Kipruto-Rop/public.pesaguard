import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, Code2, FileCheck2, Fingerprint, GitBranch, ShieldCheck, Webhook, Workflow } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { softwareApplicationJsonLd } from "@/lib/seo/structured-data";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { integrations } from "@/config/integrations";
import { docsUrl } from "@/config/docs";
import { tenantAppRoutes } from "@/config/app";
import "@/styles/homepage.css";

export const metadata = pageMetadata(
  "PesaGuard | M-Pesa reconciliation and payment accountability",
  "Reconcile M-Pesa payments against internal records, investigate exceptions with evidence, and give finance and engineering teams one accountable workflow.",
  "/",
);

const steps = [
  {
    n: "01",
    phase: "Payment event",
    title: "Receive and validate",
    body: "A Safaricom Daraja callback enters the workflow. Its structure and required fields are checked before the event proceeds.",
    outcome: "A validated event, or a clear reason it cannot proceed",
    Icon: Webhook,
  },
  {
    n: "02",
    phase: "Internal record",
    title: "Compare and match",
    body: "The payment event is compared with your internal transaction record using the reference, amount and timing rules agreed for your workflow.",
    outcome: "A match, or a difference that needs attention",
    Icon: GitBranch,
  },
  {
    n: "03",
    phase: "Team review",
    title: "Investigate and resolve",
    body: "Matched outcomes stay traceable. Unmatched or unusual records are routed as exceptions so your team can inspect the available evidence.",
    outcome: "A reviewable exception with a human-owned decision",
    Icon: FileCheck2,
  },
];
const principles = [
  {
    n: "01",
    Icon: Fingerprint,
    title: "Make every match explainable",
    body: "A useful reconciliation outcome connects the incoming payment event to the internal record it was compared against. Teams should be able to review the reference, amount and timing criteria used, then understand why the result matched or needs attention.",
    checkpointLabel: "Before matching",
    checkpoint: "Agree which internal record is authoritative, how references are mapped, and what amount or timing differences require review.",
  },
  {
    n: "02",
    Icon: CircleAlert,
    title: "Keep exceptions under human control",
    body: "A mismatch, duplicate or unusual event is a signal to investigate, not proof of fraud or a final decision. PesaGuard helps bring the discrepancy and its available context into view; your team owns the investigation and its resolution.",
    checkpointLabel: "When something differs",
    checkpoint: "Assign the right operational owner, inspect the available evidence, and follow your own approval and record-keeping process before resolving it.",
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "Be precise about integration scope",
    body: "The active payment scope is M-Pesa through Safaricom Daraja, with configured outbound webhooks in the pilot. Airtel Money, bank rails and point-of-sale connections are not available to connect today.",
    checkpointLabel: "Before rollout",
    checkpoint: "Confirm the Daraja callback setup, internal record source, webhook destinations and the operational ownership for failures and unresolved events.",
  },
];

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }} />
    <div className="pg-enterprise-home">
      <section className="pg-enterprise-hero">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-hero-grid">
            <div className="pg-enterprise-hero-copy">
              <p className="pg-enterprise-eyebrow pg-enterprise-hero-eyebrow"><span className="pg-enterprise-live-dot" /> PAYMENT RECONCILIATION INFRASTRUCTURE</p>
              <HeroHeadline />
              <p className="pg-enterprise-lede">PesaGuard helps teams reconcile M-Pesa transactions against internal records, investigate exceptions and account for what happened, without relying on scattered spreadsheets and manual follow-up.</p>
              <div className="pg-enterprise-actions">
                <Link className="pg-enterprise-button pg-enterprise-button-primary" href={tenantAppRoutes.getStarted}>Open tenant dashboard <ArrowRight size={15} aria-hidden="true" /></Link>
                <Link className="pg-enterprise-button pg-enterprise-button-secondary" href={docsUrl()}>Read the documentation <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="pg-enterprise-visual">
              <Image alt="Illustrative PesaGuard dashboard demo with reconciliation summary and transactions" className="pg-enterprise-demo-image" height={1024} priority sizes="(max-width: 960px) 100vw, 50vw" src="/dashboard-demo.jpeg" width={1536} />
              <span className="pg-enterprise-demo-badge">Demo</span>
            </div>
          </div>
          <div className="pg-enterprise-hero-summary">
            <div className="pg-enterprise-scope-note"><span className="pg-enterprise-scope-mark"><Check size={13} aria-hidden="true" /></span><p><strong>Current scope:</strong> M-Pesa through Safaricom Daraja and outbound webhooks. Other payment rails are not live.</p></div>
            <div className="pg-enterprise-hero-bottom"><span>BUILT FOR ACCOUNTABILITY</span><p>Finance gets clearer exceptions. Operations gets a traceable workflow. Engineering gets defined integration behavior.</p></div>
          </div>
        </div>
      </section>
      <section className="pg-enterprise-section pg-enterprise-operating" id="how-it-works">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-section-heading pg-enterprise-operating-heading">
            <div>
              <p className="pg-enterprise-eyebrow"><span className="pg-operating-eyebrow-mark" /> THE OPERATING MODEL</p>
              <h2>From payment callback to a decision your team can explain.</h2>
            </div>
            <div className="pg-operating-intro">
              <p>Follow each payment through a defined reconciliation path. Validate the incoming event, compare it against your records, then make exceptions visible for human review.</p>
              <span className="pg-operating-scope"><span aria-hidden="true" /> Current flow: M-Pesa via Safaricom Daraja</span>
            </div>
          </div>
          <div className="pg-enterprise-steps">
            {steps.map(({ n, phase, title, body, outcome, Icon }) => (
              <article className="pg-enterprise-step" key={n}>
                <div className="pg-enterprise-step-top">
                  <span className="pg-enterprise-step-number">{n}</span>
                  <span className="pg-enterprise-step-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
                </div>
                <p className="pg-enterprise-step-phase">{phase}</p>
                <h3>{title}</h3>
                <p className="pg-enterprise-step-body">{body}</p>
                <div className="pg-enterprise-step-outcome"><span>OUTCOME</span><p>{outcome}</p></div>
              </article>
            ))}
          </div>
          <div className="pg-enterprise-process-note">
            <span className="pg-enterprise-process-icon"><Workflow size={19} aria-hidden="true" /></span>
            <div className="pg-enterprise-process-copy">
              <span className="pg-enterprise-process-label">EXCEPTION HANDLING</span>
              <h3>A mismatch prompts review, not an automatic verdict.</h3>
              <p>PesaGuard helps surface the difference and its available context. Your team investigates the evidence and remains responsible for deciding and recording the resolution.</p>
            </div>
            <span className="pg-enterprise-process-owner">Finance Officer review</span>
          </div>
        </div>
      </section>
      <section className="pg-enterprise-section pg-enterprise-scope" id="scope">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-section-heading pg-enterprise-scope-heading"><div><p className="pg-enterprise-eyebrow">CAPABILITY BOUNDARIES</p><h2>Know what is available before you integrate.</h2></div><p>Explore each payment connection to review its current scope. Pilot integrations are distinguished from connectors that are not available yet.</p></div>
          <div className="pg-enterprise-boundaries">
            {integrations.map((integration) => {
              const inPilot = integration.availability === "pilot";
              const available = inPilot || integration.availability === "available";
              const state = inPilot ? "Pilot scope" : available ? "Available" : "Coming soon";
              return (
                <article className="pg-enterprise-boundary" data-available={available} data-status={integration.availability} key={integration.href}>
                  <span className="pg-enterprise-boundary-icon">{available ? <Check size={16} aria-hidden="true" /> : <CircleAlert size={16} aria-hidden="true" />}</span>
                  <div className="pg-enterprise-boundary-copy">
                    <span className="pg-enterprise-boundary-state">{state}</span>
                    <h3>{integration.name}</h3>
                    <p>{integration.summary}</p>
                  </div>
                  <Link aria-label={`Explore ${integration.name} integration details`} className="pg-enterprise-boundary-arrow" href={integration.href}>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="pg-enterprise-scope-links"><Link href="/integrations">See integration details <ArrowRight size={14} aria-hidden="true"/></Link><Link href="/status">Check service status <ArrowRight size={14} aria-hidden="true"/></Link><Link href="/security">Review security approach <ArrowRight size={14} aria-hidden="true"/></Link></div>
        </div>
      </section>
      <section className="pg-enterprise-section" id="principles">
        <div className="pg-enterprise-container pg-enterprise-principles">
          <div className="pg-enterprise-principles-heading">
            <div className="pg-enterprise-principles-title">
              <p className="pg-enterprise-eyebrow"><span className="pg-operating-eyebrow-mark" /> DESIGNED FOR REAL OPERATIONS</p>
              <h2>Clarity is an operational control.</h2>
            </div>
            <p className="pg-enterprise-principles-lede">Reliable payment operations depend on more than a status badge. Teams need to know what was received, how a record was compared, who owns an exception, and where the supported integration boundary ends.</p>
          </div>
          <div className="pg-enterprise-principles-list">
            {principles.map(({ n, Icon, title, body, checkpointLabel, checkpoint }) => (
              <article className="pg-enterprise-principle" key={n}>
                <div className="pg-enterprise-principle-index">
                  <span>{n}</span>
                  <span className="pg-enterprise-principle-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></span>
                </div>
                <div className="pg-enterprise-principle-detail">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <aside className="pg-enterprise-principle-check">
                  <span>{checkpointLabel}</span>
                  <p>{checkpoint}</p>
                </aside>
              </article>
            ))}
          </div>
          <div className="pg-enterprise-principles-footer">
            <span>Operational clarity</span>
            <p>Use the integration guidance to confirm fit and responsibilities before connecting a payment flow.</p>
            <Link className="pg-enterprise-text-link" href="/integrations">Review integration scope <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <section className="pg-enterprise-close"><div className="pg-enterprise-container"><div className="pg-enterprise-close-card"><div className="pg-enterprise-close-copy"><p className="pg-enterprise-eyebrow">START WITH YOUR CURRENT FLOW</p><h2>Bring the process you have. Find the gaps you can explain.</h2><p>Tell us how M-Pesa payments arrive, which internal records they should match, and where your team spends time resolving differences. We will discuss fit and current limitations openly.</p></div><div className="pg-enterprise-close-actions"><Link className="pg-enterprise-button pg-enterprise-button-primary" href="/contact/sales">Talk through a pilot <ArrowRight size={16} aria-hidden="true"/></Link><Link className="pg-enterprise-close-docs" href={docsUrl()}><Code2 size={16} aria-hidden="true"/> Developer documentation</Link><span className="pg-enterprise-sandbox-note"><span aria-hidden="true" /> Tenant access opens in the PesaGuard application.</span></div></div></div></section>
    </div>
  </>;
}
