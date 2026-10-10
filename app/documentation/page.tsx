import Link from "next/link";
import { ArrowUpRight, BookOpen, Braces, Bug, Code2, GitBranch, KeyRound, LifeBuoy, ShieldCheck, Webhook, Workflow, Wrench } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Developer documentation | PesaGuard",
  "Official PesaGuard integration documentation: getting started, API contracts, transactions, reconciliation, webhooks, security, environments, testing and support.",
  "/documentation",
);

const DOCS_BASE = "https://docs.pesaguard.co.ke";

const groups = [
  {
    title: "Get started",
    description: "Set up an integration in a deliberate sequence, from access and the first request to production review.",
    items: [
      { title: "Getting started", description: "Quickstart, account and API-key setup, first request and first transaction.", href: "/getting-started/", icon: BookOpen },
      { title: "Environments", description: "Understand staging and production boundaries before using credentials or real data.", href: "/environments/", icon: Workflow },
      { title: "OpenAPI contract", description: "Inspect the generated API specification and its request and response schemas.", href: "/api-reference/", icon: Braces },
    ],
  },
  {
    title: "Build an integration",
    description: "Implementation guides for the main integration surfaces documented by PesaGuard.",
    items: [
      { title: "API reference and guides", description: "Authentication, requests, pagination, validation, rate limits and errors.", href: "/api/", icon: Code2 },
      { title: "Transactions and reconciliation", description: "Submit transaction records, understand matching outcomes and work exceptions.", href: "/guides/", icon: GitBranch },
      { title: "Webhooks", description: "Event catalog, signature verification, retries and delivery behavior.", href: "/webhooks/", icon: Webhook },
      { title: "SDKs and clients", description: "Use HTTP clients or generate a client from the OpenAPI contract. Official SDKs are not yet available.", href: "/sdks/", icon: Braces },
    ],
  },
  {
    title: "Operate with confidence",
    description: "Learn the system boundaries and test failure cases before relying on an integration.",
    items: [
      { title: "Concepts", description: "Architecture, transaction lifecycle, idempotency, tenant boundaries and risk signals.", href: "/concepts/", icon: Workflow },
      { title: "Security", description: "API-key handling, authorization, webhook security, data protection and tenant isolation.", href: "/security/", icon: ShieldCheck },
      { title: "Testing", description: "Integration checks, webhook tests, sandbox guidance and failure scenarios.", href: "/testing/", icon: Bug },
      { title: "Errors and recovery", description: "Interpret error codes, decide when to retry and collect useful diagnostics.", href: "/errors/", icon: Wrench },
    ],
  },
  {
    title: "Maintain and get help",
    description: "Review changes, prepare migrations and find the right support path.",
    items: [
      { title: "Migration guides", description: "API and webhook changes, compatibility notes and deprecated endpoints.", href: "/migration/", icon: GitBranch },
      { title: "Changelog", description: "Dated documentation and contract changes that may affect integrations.", href: "/changelog/", icon: BookOpen },
      { title: "Support", description: "Troubleshooting, frequently asked questions and contact guidance.", href: "/support/", icon: LifeBuoy },
    ],
  },
];

export default function Documentation() {
  return (
    <main className="pg-docs-hub">
      <section className="pg-docs-hero">
        <div className="pg-container">
          <p className="pg-eyebrow">PesaGuard · Developer documentation</p>
          <h1>Build against clear contracts.</h1>
          <p className="pg-docs-lede">
            The dedicated documentation site is the source of truth for integration guides,
            API contracts, environments, webhooks, security and operational runbooks. Start
            with the path that matches the work you need to do.
          </p>
          <div className="pg-docs-actions">
            <Link className="pg-btn pg-btn-primary" href={`${DOCS_BASE}/getting-started/quickstart.html`} target="_blank" rel="noreferrer">
              Start building <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
            <Link className="pg-btn pg-btn-ghost" href={`${DOCS_BASE}/api-reference/`} target="_blank" rel="noreferrer">
              OpenAPI contract <ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
          <div className="pg-docs-meta" aria-label="Documentation notes">
            <span><KeyRound aria-hidden="true" size={14} /> Access is provisioned through the pilot team</span>
            <span><ShieldCheck aria-hidden="true" size={14} /> Live, draft and planned scope is labelled</span>
          </div>
        </div>
      </section>

      <div className="pg-container pg-docs-content">
        {groups.map((group, index) => (
          <section className="pg-docs-group" key={group.title}>
            <div className="pg-docs-group-heading">
              <span className="pg-docs-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
            </div>
            <div className="pg-docs-grid">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link className="pg-docs-card" href={`${DOCS_BASE}${item.href}`} key={item.title} target="_blank" rel="noreferrer">
                    <span className="pg-docs-card-icon"><Icon aria-hidden="true" size={18} /></span>
                    <span className="pg-docs-card-copy">
                      <strong>{item.title}</strong>
                      <span>{item.description}</span>
                    </span>
                    <ArrowUpRight className="pg-docs-card-arrow" aria-hidden="true" size={16} />
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="pg-docs-note">
          <div>
            <p className="pg-eyebrow">Important</p>
            <h2>Verify the contract for your environment.</h2>
            <p>
              Documentation describes intended behavior and repository evidence; it does not
              by itself prove a deployment is reachable or production-ready. The docs site
              notes that there is no public self-serve sandbox today, and labels work without
              a verified adapter or test suite as planned.
            </p>
          </div>
          <div className="pg-docs-note-links">
            <Link href="https://docs.pesaguard.co.ke/environments/" target="_blank" rel="noreferrer">Environment guide <ArrowUpRight aria-hidden="true" size={14} /></Link>
            <Link href="https://docs.pesaguard.co.ke/security/" target="_blank" rel="noreferrer">Security guide <ArrowUpRight aria-hidden="true" size={14} /></Link>
            <Link href="https://status.pesaguard.co.ke" target="_blank" rel="noreferrer">Service status <ArrowUpRight aria-hidden="true" size={14} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
