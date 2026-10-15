import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata = pageMetadata(
  "Solutions by organization and problem | PesaGuard",
  "Explore PesaGuard by organization type or payment operations problem, with clear current capabilities, prerequisites and limitations.",
  "/solutions",
);

const organizations = [
  {
    href: "/solutions/saccos",
    title: "SACCOs and member-based finance",
    eyebrow: "Member collections",
    body: "Compare M-Pesa collection events with the member, contribution, receipt or repayment records made available to the workflow. Give officers a clearer process for investigating missing or conflicting records.",
    challenges: ["Member payment queries", "Reference and amount differences", "Unresolved collection records", "Committee and finance review"],
    fit: "Best fit to evaluate: a SACCO with a defined Daraja collection flow and an authoritative internal record source.",
  },
  {
    href: "/solutions/merchants",
    title: "Merchants and multi-location operators",
    eyebrow: "Sales and payment records",
    body: "Review whether M-Pesa payment events correspond to the merchant's internal order, receipt or expected-payment record. Keep customer queries and exceptions visible without claiming that POS or bank settlement data is already connected.",
    challenges: ["Paid-order questions", "Collection reference mismatches", "Daily exception follow-up", "Payment evidence gathering"],
    fit: "Best fit to evaluate: a merchant that can supply the order or payment records needed for matching.",
  },
  {
    href: "/solutions/financial-institutions",
    title: "Financial institutions",
    eyebrow: "Oversight and controls",
    body: "Evaluate payment reconciliation as an operational control with clear data ownership, exception responsibilities and evidence requirements. Use a narrow pilot to test fit before making institutional production decisions.",
    challenges: ["Control ownership", "Exception escalation", "Security and audit review", "Evidence requirements"],
    fit: "Best fit to evaluate: a team able to run a technical, security and operational review before adoption.",
  },
  {
    href: "/solutions/fintechs",
    title: "Fintechs and payment product teams",
    eyebrow: "Engineering and operations",
    body: "Evaluate the callback-to-reconciliation workflow, data contract, duplicate handling and configured outbound webhooks. Confirm each API contract and reliability guarantee against the current implementation before integrating.",
    challenges: ["Provider event processing", "Idempotency and retries", "Data contract ownership", "Operational visibility"],
    fit: "Best fit to evaluate: an engineering team with a specific M-Pesa flow and documented integration requirements.",
  },
];

const problems = [
  {
    href: "/features/reconciliation",
    title: "Payment records do not line up",
    body: "Compare incoming M-Pesa events with the internal records supplied to the workflow. Define matching keys, timing rules and how missing or conflicting records reach a reviewer.",
    includes: ["Reference and amount comparisons", "Unmatched record investigation", "Clear source-of-truth decisions"],
    boundary: "Bank statement, Airtel Money and POS matching are not available today.",
  },
  {
    href: "/features/transaction-monitoring",
    title: "Teams cannot see payment flow clearly",
    body: "Understand which configured events arrived and which need attention, then agree on operational ownership for delayed, missing or contradictory records.",
    includes: ["Event-level operational context", "A defined review and escalation process", "Investigation of unusual patterns"],
    boundary: "Monitoring depends on the data sources, telemetry and features available in the deployed pilot.",
  },
  {
    href: "/features/fraud-detection",
    title: "Unusual activity is difficult to investigate",
    body: "Use anomaly signals as a prompt to review source records and context. Keep the distinction between a suspicious pattern and a proven fraud event explicit.",
    includes: ["Reviewable anomaly signals where implemented", "Context gathering", "Human-led investigation and decision"],
    boundary: "No anomaly signal proves theft or fraud by itself; verify the currently deployed detection rules.",
  },
  {
    href: "/features/real-time-alerts",
    title: "The right person learns about an exception too late",
    body: "Evaluate the alert channels actually configured for the deployment and decide which team owns each exception type, escalation and response target.",
    includes: ["Alert ownership and routing decisions", "Practical escalation design", "Review of notification content and sensitivity"],
    boundary: "Available channels and delivery guarantees must be confirmed for the current deployment.",
  },
  {
    href: "/features/reporting",
    title: "Finance cannot explain period differences",
    body: "Use reports and source records within the configured scope to support review of matched, unmatched and unresolved payment events.",
    includes: ["Period-based operational review", "Exception follow-up", "Traceability to underlying records where available"],
    boundary: "Reports cannot cover bank or POS sources that are not connected, and must not replace official accounting records.",
  },
  {
    href: "/features/audit-trail",
    title: "Reviewers need to understand who did what",
    body: "Establish which source events, review decisions and configuration changes are recorded by the deployed version and what evidence can be exported for a control review.",
    includes: ["Audit requirements mapping", "Decision and actor evidence where supported", "Retention and export review"],
    boundary: "Verify audit coverage, immutability and retention before relying on it for regulated or critical workflows.",
  },
];

export default function Solutions() {
  return (
    <>
      <PageHero
        title="Start with your operation. Or start with the problem."
        lede="PesaGuard helps teams investigate payment-record differences around the M-Pesa (Safaricom Daraja) pilot. Explore the solution by organization type or by the operational problem you need to solve. Each page separates the current pilot scope from dependencies and capabilities that are not available yet."
        label="Solutions · organization and problem"
        trail={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }]}
        actions={
          <>
            <Button href="/solutions/by-organization" trailing={<ArrowRight aria-hidden="true" size={16} />}>Browse by organization</Button>
            <Button href="/solutions/by-problem" variant="quiet" trailing={<ArrowRight aria-hidden="true" size={16} />}>Browse by problem</Button>
          </>
        }
      />

      <SectionShell tone="sunken">
        <SectionHeading
          eyebrow="Choose your operating context"
          title="Solutions by organization"
          body="The same payment event can mean different work to a member-services officer, merchant finance team, institutional control owner or fintech engineer. Choose the page that matches your team."
        />
        <div className="audience-grid">
          {organizations.map((item, index) => (
            <Link className="audience-card" href={item.href} key={item.href}>
              <span aria-hidden="true" className="audience-count">{String(index + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="audience-link text-link">Explore solution <ArrowUpRight aria-hidden="true" size={16} /></span>
            </Link>
          ))}
        </div>
        <div className="actions" style={{ marginTop: 24 }}>
          <Button href="/solutions/by-organization" variant="quiet" trailing={<ArrowRight aria-hidden="true" size={16} />}>View all organization solutions</Button>
        </div>
      </SectionShell>

      <SectionShell>
        <SectionHeading
          eyebrow="Choose the operational issue"
          title="Solutions by problem"
          body="You do not need to start with an industry label. Start with the difference, delay or evidence gap your team is trying to explain."
        />
        <div className="feature-grid">
          {problems.map((item, index) => (
            <article className="feature-card" key={item.href}>
              <span className="feature-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link className="text-link" href={item.href}>Explore related capability <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </article>
          ))}
        </div>
        <div className="actions" style={{ marginTop: 24 }}>
          <Button href="/solutions/by-problem" variant="quiet" trailing={<ArrowRight aria-hidden="true" size={16} />}>View all problem solutions</Button>
        </div>
      </SectionShell>

      <SectionShell tone="sunken">
        <div className="split">
          <div>
            <p className="eyebrow">What the current product covers</p>
            <h2 className="display-3">Be specific about what is live.</h2>
          </div>
          <div>
            <p className="large-copy">The current pilot scope is focused on Safaricom M-Pesa through Daraja and configured outbound webhooks. PesaGuard can support the review of payment events against internal records made available to the workflow. It is not a bank, wallet, payment processor or replacement for your official ledger.</p>
            <ul className="check-list" style={{ marginTop: 24 }}>
              <li>M-Pesa and Daraja scope must be confirmed for the proposed flow</li>
              <li>Matching depends on the quality and availability of internal comparison records</li>
              <li>Airtel Money, bank statement/API and POS/acquirer integrations are not available today</li>
              <li>An anomaly is a reason to investigate, not a verdict of fraud</li>
              <li>Production readiness, security controls and service guarantees require separate verification</li>
            </ul>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring">
          <div style={{ maxWidth: "48ch", position: "relative" }}>
            <p className="eyebrow">Find the right starting point</p>
            <h2>Bring the records you need to reconcile.</h2>
            <p>Tell us which provider flow you use, what internal record should match it, which differences are most expensive to investigate and what evidence your team needs. We will map that need to current capability and clearly identify any gaps.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>Discuss your use case</Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
