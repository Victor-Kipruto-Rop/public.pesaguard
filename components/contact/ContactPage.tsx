import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import type { FeatureBlock } from "@/types/content";

type ContactKind = "general" | "sales" | "support";

const pageCopy: Record<ContactKind, {
  title: string;
  description: string;
  label: string;
  intro: string;
  preparationTitle: string;
  preparationBody: string;
  items: FeatureBlock[];
  note: string;
}> = {
  general: {
    title: "Let's talk about the work behind your payments.",
    description: "Reach the PesaGuard team with a product, partnership or general enquiry.",
    label: "Contact PesaGuard",
    intro: "Tell us what your team is solving. We will use the context you share to make the next conversation specific, practical and honest about the platform's current scope.",
    preparationTitle: "Make the first conversation useful.",
    preparationBody: "A little operational context is more useful than a long brief. Share the workflow and the decision you want to improve.",
    items: [
      { index: "01", title: "Your payment flow", body: "Describe how collections arrive today and where records are compared." },
      { index: "02", title: "The costly exception", body: "Tell us what takes the most time: missing callbacks, duplicates, reversals or settlement differences." },
      { index: "03", title: "Your next decision", body: "Let us know whether you are exploring a pilot, asking a technical question or discussing a partnership." },
    ],
    note: "The form opens a pre-filled email draft. It does not create a support ticket or guarantee delivery.",
  },
  sales: {
    title: "Build a more accountable payment operation.",
    description: "Scope a PesaGuard pilot around your M-Pesa flow, reconciliation process and operational risks.",
    label: "Sales and pilots",
    intro: "We start with one clear flow, agree what success looks like, and keep the active product boundary explicit. The current payment scope is M-Pesa through Safaricom Daraja; other rails remain planned until their adapters and tests exist.",
    preparationTitle: "What helps us scope a pilot.",
    preparationBody: "We want to understand the work before suggesting a solution. Please share non-sensitive operational details only.",
    items: [
      { index: "01", title: "Volume and timing", body: "Approximate daily transaction volume and when reconciliation currently happens." },
      { index: "02", title: "Systems involved", body: "Daraja callbacks, internal ledger or order records, and the people who investigate exceptions." },
      { index: "03", title: "Acceptance criteria", body: "The exception types, evidence and reporting outcomes that would make a pilot useful." },
    ],
    note: "Do not send API keys, credentials, customer/member data or full payment records through this public enquiry form.",
  },
  support: {
    title: "Help for the moments that matter.",
    description: "Share a PesaGuard issue with enough safe context to help investigate the request or environment.",
    label: "Support",
    intro: "Describe what you expected, what happened instead, and whether the issue affects a test or pilot environment. We cannot look up a request from a secret or a full customer record, so use safe diagnostic identifiers instead.",
    preparationTitle: "Help us investigate safely.",
    preparationBody: "A concise reproduction path and correlation identifier are usually more useful than a screenshot containing private data.",
    items: [
      { index: "01", title: "Environment and time", body: "State whether the request was in test or pilot and include the approximate time with timezone." },
      { index: "02", title: "Safe diagnostic context", body: "Include the endpoint, status code and X-Correlation-ID if one was returned." },
      { index: "03", title: "Expected versus actual", body: "Describe the result you expected and the result you observed, with sensitive values removed." },
    ],
    note: "Never include passwords, API keys, bearer tokens, OTPs, full phone numbers or unredacted payment/member data. This form opens an email draft; it does not create a ticket.",
  },
};

const commonCards: FeatureBlock[] = [
  { iconKey: "terminal", title: "Developer documentation", body: "Check authentication, request formats, idempotency and error-handling guidance.", href: "/documentation", linkLabel: "Read the docs" },
  { iconKey: "monitor", title: "Service status", body: "Review the latest backend probe and distinguish live results from unknown status.", href: "/status", linkLabel: "View status" },
  { iconKey: "shield", title: "Security and scope", body: "Understand the controls, current maturity and integration boundaries before relying on the service.", href: "/security", linkLabel: "Review security" },
];

export function ContactPage({ kind = "general" }: { kind?: ContactKind }) {
  const data = pageCopy[kind];
  return (
    <>
      <PageHero
        title={data.title}
        lede={data.intro}
        label={data.label}
        trail={[{ label: "Home", href: "/" }, { label: data.label, href: kind === "general" ? "/contact" : `/contact/${kind}` }]}
      />
      <SectionShell>
        <div className="content-layout">
          <div className="content-main">
            <SectionHeading eyebrow="Before you write" title={data.preparationTitle} body={data.preparationBody} />
            <FeatureGrid items={data.items} />
            <div className="content-section">
              <h2>What happens after you submit</h2>
              <p>{data.note}</p>
              <ul className="check-list">
                <li>We receive only the context your email draft contains if you choose to send it.</li>
                <li>Use <a href="https://docs.pesaguard.co.ke" target="_blank" rel="noreferrer">the developer documentation</a> for technical reference material.</li>
                <li>For a live issue, include the safe request context and check the <a href="/status">service status</a> page.</li>
              </ul>
              <p className="small muted">Configured contact address: {siteConfig.email}. This address and its mailbox routing should be verified before launch.</p>
            </div>
          </div>
          <aside className="side-note">
            <span className="status-dot" />
            <strong>Keep the conversation safe and specific.</strong>
            <p>Describe the workflow, not secrets. PesaGuard's current active payment scope is M-Pesa (Safaricom Daraja); planned integrations are not represented as live capabilities.</p>
            <div className="side-note-links">
              <a href="/integrations">Integration availability</a>
              <a href="/privacy">Privacy notice</a>
              <a href="/terms">Terms of use</a>
            </div>
            <ContactForm kind={kind} />
          </aside>
        </div>
      </SectionShell>
      <SectionShell tone="sunken">
        <SectionHeading eyebrow="Useful next steps" title="Find the right context first." body="These resources answer common questions and help keep the first conversation focused." />
        <FeatureGrid items={commonCards} />
      </SectionShell>
    </>
  );
}
