import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";
import type { FeatureBlock } from "@/types/content";

type ContactKind = "general" | "sales" | "support";

const pageCopy: Record<ContactKind, {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  label: string;
  preparationTitle: string;
  preparationBody: string;
  items: FeatureBlock[];
  note: string;
  responseTitle: string;
  responseBody: string;
}> = {
  general: {
    eyebrow: "CONTACT THE TEAM",
    title: "Good conversations start with",
    accent: "the right context.",
    description: "Tell us what you are working on. We’ll make the next conversation focused on your payment workflow, your questions and the decisions ahead.",
    label: "General enquiry",
    preparationTitle: "What would you like to solve?",
    preparationBody: "You don’t need a polished brief. A little context helps us make the conversation useful from the start.",
    items: [
      { index: "01", title: "Product and workflow", body: "Explain how collections arrive and where your team compares payment and business records." },
      { index: "02", title: "Partnerships", body: "Share the kind of collaboration you have in mind and who it would serve." },
      { index: "03", title: "A question or idea", body: "Tell us what you need to understand, validate or explore next." },
    ],
    note: "This form opens a pre-filled email draft. It does not create a ticket or guarantee delivery.",
    responseTitle: "A clear starting point",
    responseBody: "We’ll have a better basis for a practical conversation when you include your goal and relevant non-sensitive context.",
  },
  sales: {
    eyebrow: "PILOTS & COMMERCIAL ENQUIRIES",
    title: "Make your payment operation",
    accent: "easier to account for.",
    description: "Explore whether PesaGuard fits your reconciliation workflow. Start with one payment flow, clear acceptance criteria and an honest view of current product scope.",
    label: "Sales and pilots",
    preparationTitle: "Help us scope the right pilot.",
    preparationBody: "We want to understand the operational problem before suggesting a path forward. Approximate figures and system names are enough.",
    items: [
      { index: "01", title: "Volume and timing", body: "Approximate daily transaction volume and when reconciliation currently takes place." },
      { index: "02", title: "Systems in the flow", body: "Safaricom Daraja callbacks, internal ledger or order records, and who reviews exceptions." },
      { index: "03", title: "What success means", body: "The exception types, evidence and reporting outcomes that would make a pilot worthwhile." },
    ],
    note: "Current payment scope is M-Pesa through Safaricom Daraja. Other rails remain planned until their adapters and tests exist.",
    responseTitle: "A scoped conversation",
    responseBody: "Please share operational context only. Never send API keys, credentials, customer/member data or full payment records through this public form.",
  },
  support: {
    eyebrow: "PRODUCT & INTEGRATION SUPPORT",
    title: "Let’s get to the",
    accent: "useful details.",
    description: "Describe what you expected, what happened instead, and whether the issue affects a test or pilot environment. Keep sensitive information out of the message.",
    label: "Support",
    preparationTitle: "Give us a safe way to investigate.",
    preparationBody: "A short reproduction path and correlation identifier are more useful than a screenshot containing private or payment data.",
    items: [
      { index: "01", title: "Environment and time", body: "Tell us whether it happened in test or pilot and include the approximate time and timezone." },
      { index: "02", title: "Diagnostic context", body: "Include the endpoint, HTTP status and X-Correlation-ID if one was returned." },
      { index: "03", title: "Expected vs. actual", body: "Describe the result you expected and what happened, with sensitive values removed." },
    ],
    note: "Never include passwords, API keys, bearer tokens, OTPs, full phone numbers or unredacted payment/member data. This form opens an email draft; it does not create a ticket.",
    responseTitle: "Keep sensitive data out",
    responseBody: "If a live issue is involved, check the service status page and share safe request context—not secrets or full customer records.",
  },
};

const resources = [
  { number: "01", title: "Developer documentation", body: "Authentication, requests, idempotency and error handling.", href: "/documentation", action: "Explore docs" },
  { number: "02", title: "Service status", body: "Check the latest available service and backend signals.", href: "/status", action: "View status" },
  { number: "03", title: "Security and scope", body: "Review current controls, maturity and integration boundaries.", href: "/security", action: "Review security" },
];

export function ContactPage({ kind = "general" }: { kind?: ContactKind }) {
  const data = pageCopy[kind];

  return (
    <main className="contact-premium">
      <section className="contact-premium-hero">
        <div className="contact-premium-container">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><span>{data.label}</span>
          </nav>
          <div className="contact-hero-grid">
            <div className="contact-hero-copy">
              <p className="contact-eyebrow"><span className="contact-eyebrow-dot" />{data.eyebrow}</p>
              <h1>{data.title}<em>{data.accent}</em></h1>
              <p className="contact-hero-lede">{data.description}</p>
              <div className="contact-hero-meta">
                <span><i aria-hidden="true">↗</i> Practical, focused conversations</span>
                <span><i aria-hidden="true">◌</i> No sensitive data required</span>
              </div>
            </div>
            <aside className="contact-hero-aside">
              <div className="contact-aside-top">
                <span className="contact-aside-index">PG / CONTACT</span>
                <span className="contact-aside-mark" aria-hidden="true">↗</span>
              </div>
              <p className="contact-aside-label">THE FIRST STEP</p>
              <h2>Start with the workflow. Not the pitch.</h2>
              <p>What happens today, where the uncertainty appears, and what a better outcome would look like.</p>
              <div className="contact-aside-rule" />
              <div className="contact-aside-bottom"><span>Response context</span><strong>Clear · Specific · Safe</strong></div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-premium-container">
          <div className="contact-form-layout">
            <div className="contact-context-column">
              <p className="contact-eyebrow contact-eyebrow-muted">BEFORE YOU WRITE</p>
              <h2>{data.preparationTitle}</h2>
              <p className="contact-context-intro">{data.preparationBody}</p>
              <div className="contact-context-list">
                {data.items.map((item) => (
                  <article className="contact-context-item" key={item.title}>
                    <span className="contact-context-number">{item.index}</span>
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                  </article>
                ))}
              </div>
              <div className="contact-safety-note">
                <span className="contact-safety-icon" aria-hidden="true">i</span>
                <div><strong>{data.responseTitle}</strong><p>{data.responseBody}</p></div>
              </div>
            </div>

            <aside className="contact-form-card">
              <div className="contact-form-card-head">
                <div><p className="contact-eyebrow contact-eyebrow-muted">YOUR MESSAGE</p><h2>Talk to PesaGuard</h2></div>
                <span className="contact-form-symbol" aria-hidden="true">↗</span>
              </div>
              <p className="contact-form-card-intro">A few useful details are all you need to get started.</p>
              <ContactForm kind={kind} />
              <div className="contact-form-privacy">
                <span aria-hidden="true">◇</span>
                <p>By continuing, you choose what to include in an email draft. See our <Link href="/privacy">privacy notice</Link>.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="contact-resource-section">
        <div className="contact-premium-container">
          <div className="contact-resource-heading">
            <div><p className="contact-eyebrow contact-eyebrow-muted">SELF-SERVE RESOURCES</p><h2>Need an answer before a conversation?</h2></div>
            <p>Start with the source that best matches what you need to do next.</p>
          </div>
          <div className="contact-resource-grid">
            {resources.map((resource) => (
              <Link className="contact-resource-card" href={resource.href} key={resource.number}>
                <span className="contact-resource-number">{resource.number}</span>
                <span className="contact-resource-arrow" aria-hidden="true">↗</span>
                <h3>{resource.title}</h3>
                <p>{resource.body}</p>
                <span className="contact-resource-action">{resource.action}<span aria-hidden="true">→</span></span>
              </Link>
            ))}
          </div>
          <p className="contact-configured-email">Configured contact address: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Mailbox routing should be verified before launch.</p>
        </div>
      </section>
    </main>
  );
}
