import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleAlert, Code2, FileCheck2, Fingerprint, GitBranch, ShieldCheck, Webhook, Workflow } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { softwareApplicationJsonLd } from "@/lib/seo/structured-data";
import { PipelineCanvas } from "@/components/home/PipelineCanvas";
import "@/styles/homepage.css";

export const metadata = pageMetadata(
  "PesaGuard | M-Pesa reconciliation and payment accountability",
  "Reconcile M-Pesa payments against internal records, investigate exceptions with evidence, and give finance and engineering teams one accountable workflow.",
  "/",
);

const steps = [
  { n: "01", title: "Receive", body: "Accept a Safaricom Daraja callback and validate its shape and required fields before it enters the reconciliation flow.", Icon: Webhook },
  { n: "02", title: "Match", body: "Compare the payment event with your internal transaction record using explicit reference, amount and timing rules.", Icon: GitBranch },
  { n: "03", title: "Resolve", body: "Keep matched outcomes traceable. Route unmatched or unusual records to an exception for human review.", Icon: FileCheck2 },
];
const boundaries = [
  { available: true, state: "Available scope", title: "M-Pesa via Safaricom Daraja", body: "Callback ingestion, validation, duplicate handling and reconciliation against internal records." },
  { available: true, state: "Available scope", title: "Outbound webhooks", body: "Deliver event notifications to connected systems with delivery handling and retry behavior." },
  { available: false, state: "Not available yet", title: "Airtel, bank and POS adapters", body: "These integrations are not live. We will not present them as connected payment rails." },
];
const principles = [
  { Icon: Fingerprint, title: "Evidence stays attached", body: "A match or exception should be explainable from the event, the rule applied and the resulting record." },
  { Icon: CircleAlert, title: "Signals are not verdicts", body: "An anomaly is a reason to investigate, not an automatic conclusion that someone committed fraud." },
  { Icon: ShieldCheck, title: "Scope stays explicit", body: "We distinguish current capabilities from work in progress and planned integrations." },
];

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd()) }} />
    <div className="pg-enterprise-home">
      <section className="pg-enterprise-hero">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-hero-grid">
            <div className="pg-enterprise-hero-copy">
              <p className="pg-enterprise-eyebrow"><span className="pg-enterprise-live-dot" /> PAYMENT RECONCILIATION INFRASTRUCTURE</p>
              <h1>Every payment should have a <em>clear record.</em></h1>
              <p className="pg-enterprise-lede">PesaGuard helps teams reconcile M-Pesa transactions against internal records, investigate exceptions and account for what happened—without relying on scattered spreadsheets and manual follow-up.</p>
              <div className="pg-enterprise-actions">
                <Link className="pg-enterprise-button pg-enterprise-button-primary" href="/contact/sales">Discuss your workflow <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link className="pg-enterprise-button pg-enterprise-button-secondary" href="/documentation">Read the documentation <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
              <div className="pg-enterprise-scope-note"><span className="pg-enterprise-scope-mark"><Check size={13} aria-hidden="true" /></span><p><strong>Current scope:</strong> M-Pesa through Safaricom Daraja and outbound webhooks. Other payment rails are not live.</p></div>
            </div>
            <div className="pg-enterprise-visual" aria-label="Illustration of a payment event moving through reconciliation">
              <div className="pg-enterprise-visual-top"><div><span className="pg-enterprise-visual-kicker">RECONCILIATION FLOW</span><strong>From callback to outcome</strong></div><span className="pg-enterprise-visual-tag">Illustrative</span></div>
              <div className="pg-enterprise-canvas"><PipelineCanvas /></div>
              <div className="pg-enterprise-flow-legend"><span><i className="pg-legend-dot pg-legend-mint" /> Matched record</span><span><i className="pg-legend-dot pg-legend-amber" /> Needs review</span></div>
              <div className="pg-enterprise-visual-footer"><span>01 / Validate</span><span>02 / Reconcile</span><span>03 / Review</span></div>
            </div>
          </div>
          <div className="pg-enterprise-hero-bottom"><span>BUILT FOR ACCOUNTABILITY</span><p>Finance gets clearer exceptions. Operations gets a traceable workflow. Engineering gets defined integration behavior.</p></div>
        </div>
      </section>
      <section className="pg-enterprise-section" id="how-it-works">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-section-heading"><div><p className="pg-enterprise-eyebrow">THE OPERATING MODEL</p><h2>One path from payment event to accountable outcome.</h2></div><p>Each step has a job. The goal is not another dashboard—it is a reliable way to know which records agree and which need attention.</p></div>
          <div className="pg-enterprise-steps">{steps.map(({n,title,body,Icon})=><article className="pg-enterprise-step" key={n}><div className="pg-enterprise-step-top"><span>{n}</span><Icon size={19} strokeWidth={1.7} aria-hidden="true" /></div><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="pg-enterprise-process-note"><Workflow size={18} aria-hidden="true" /><p><strong>What happens when records do not match?</strong> The result becomes an exception with a reason for review. PesaGuard supports investigation; your team remains responsible for deciding and recording the resolution.</p></div>
        </div>
      </section>
      <section className="pg-enterprise-section pg-enterprise-scope" id="scope">
        <div className="pg-enterprise-container">
          <div className="pg-enterprise-section-heading"><div><p className="pg-enterprise-eyebrow">CAPABILITY BOUNDARIES</p><h2>Know what is available before you integrate.</h2></div><p>Enterprise software should be precise about its limits. Here is the current integration boundary—not a roadmap presented as a working feature.</p></div>
          <div className="pg-enterprise-boundaries">{boundaries.map(item=><article className="pg-enterprise-boundary" data-available={item.available} key={item.title}><span className="pg-enterprise-boundary-icon">{item.available?<Check size={16} aria-hidden="true"/>:<CircleAlert size={16} aria-hidden="true"/>}</span><div className="pg-enterprise-boundary-copy"><span className="pg-enterprise-boundary-state">{item.state}</span><h3>{item.title}</h3><p>{item.body}</p></div><span className="pg-enterprise-boundary-arrow" aria-hidden="true"><ArrowUpRight size={17}/></span></article>)}</div>
          <div className="pg-enterprise-scope-links"><Link href="/integrations">See integration details <ArrowRight size={14} aria-hidden="true"/></Link><Link href="/status">Check service status <ArrowRight size={14} aria-hidden="true"/></Link><Link href="/security">Review security approach <ArrowRight size={14} aria-hidden="true"/></Link></div>
        </div>
      </section>
      <section className="pg-enterprise-section" id="principles">
        <div className="pg-enterprise-container pg-enterprise-principles-grid">
          <div className="pg-enterprise-principles-intro"><p className="pg-enterprise-eyebrow">DESIGNED FOR REAL OPERATIONS</p><h2>Clarity is a control.</h2><p>Payment operations need more than a green status badge. Teams need to understand what was received, why a record matched or did not, and what remains for a person to decide.</p><Link className="pg-enterprise-text-link" href="/product">Explore the platform <ArrowRight size={15} aria-hidden="true"/></Link></div>
          <div className="pg-enterprise-principles-list">{principles.map(({Icon,title,body})=><article className="pg-enterprise-principle" key={title}><span className="pg-enterprise-principle-icon"><Icon size={19} strokeWidth={1.7} aria-hidden="true"/></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </div>
      </section>
      <section className="pg-enterprise-close"><div className="pg-enterprise-container"><div className="pg-enterprise-close-card"><div className="pg-enterprise-close-copy"><p className="pg-enterprise-eyebrow">START WITH YOUR CURRENT FLOW</p><h2>Bring the process you have. Find the gaps you can explain.</h2><p>Tell us how M-Pesa payments arrive, which internal records they should match, and where your team spends time resolving differences. We will discuss fit and current limitations openly.</p></div><div className="pg-enterprise-close-actions"><Link className="pg-enterprise-button pg-enterprise-button-primary" href="/contact/sales">Talk through a pilot <ArrowRight size={16} aria-hidden="true"/></Link><Link className="pg-enterprise-close-docs" href="/documentation"><Code2 size={16} aria-hidden="true"/> Developer documentation</Link><span>No public self-serve sandbox is available today.</span></div></div></div></section>
    </div>
  </>;
}
