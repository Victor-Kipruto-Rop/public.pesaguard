import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata(
  "Solutions by organization | PesaGuard",
  "Detailed PesaGuard solution fit for SACCOs, merchants, financial institutions and fintechs, including prerequisites and current limitations.",
  "/solutions/by-organization",
);

const groups = [
  {
    href: "/solutions/saccos",
    name: "SACCOs and member-based finance",
    problem: "Member collections and payment queries",
    description: "Compare configured M-Pesa events with the internal member, contribution, receipt or repayment records made available to the reconciliation workflow. Give officers a repeatable way to investigate differences while keeping the official member register and loan book in the SACCO's existing system.",
    who: ["Finance and collections officers", "Member-services teams", "Supervisors and committee reviewers"],
    requirements: ["A defined Daraja collection flow", "An authoritative internal record to compare", "Agreed member/payment reference mapping", "Named exception owners and approval rules"],
    boundary: "PesaGuard does not replace SACCO management software, calculate loans or automatically reconcile bank statements.",
  },
  {
    href: "/solutions/merchants",
    name: "Merchants and multi-location operators",
    problem: "Payment events that do not match sales records",
    description: "Compare in-scope M-Pesa payment events with the merchant's internal order, receipt or expected-payment record. Use exception review to investigate missing records, amount differences and payment queries without claiming the POS, card-acquirer or bank side is already connected.",
    who: ["Store and checkout operations", "Finance and reconciliation staff", "Customer support and supervisors"],
    requirements: ["Daraja setup and callback configuration", "Order or receipt records in a supported input format", "Defined reference and amount rules", "A clear process for disputes and corrections"],
    boundary: "POS feeds, card-acquirer settlements and bank statements are not available as PesaGuard integrations today.",
  },
  {
    href: "/solutions/financial-institutions",
    name: "Financial institutions",
    problem: "Operational oversight and evidence requirements",
    description: "Evaluate a focused reconciliation workflow with operations, finance, risk, security and audit stakeholders. Use the pilot to validate data boundaries, exception ownership and evidence against the institution's actual control requirements.",
    who: ["Operations and finance", "Risk and compliance", "Information security and architecture", "Internal audit and control owners"],
    requirements: ["Business and technical owners", "Source-system and data-flow inventory", "Security and access-control review", "Acceptance criteria and evidence checklist"],
    boundary: "A solution page is not proof of production readiness, regulator approval, certification, an SLA or comprehensive bank integration.",
  },
  {
    href: "/solutions/fintechs",
    name: "Fintechs and payment product teams",
    problem: "Engineering complexity around payment events",
    description: "Evaluate the current Daraja callback-to-reconciliation flow and configured outbound webhooks. Verify actual request/response contracts, idempotency, retry behavior, observability and deployment readiness before relying on the integration.",
    who: ["Backend and platform engineers", "Payment operations", "Product and risk teams", "Reliability and security owners"],
    requirements: ["Specific integration use case and event model", "Current API/webhook contract review", "Credential and tenant-context design", "Failure-mode tests and support ownership"],
    boundary: "PesaGuard is not a complete payments backend; unimplemented rails, endpoints and production guarantees must not be assumed.",
  },
];

export default function SolutionsByOrganization() {
  return (
    <>
      <PageHero
        title="Solutions shaped around the team doing the work."
        lede="Choose the organization whose responsibilities most closely match yours. Each guide covers the operating problem, likely users, information needed to start, what to validate and what PesaGuard does not currently provide."
        label="Solutions by organization"
        trail={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "By organization", href: "/solutions/by-organization" }]}
        actions={<Button href="/solutions" variant="quiet" >All solutions</Button>}
      />
      {groups.map((group, index) => (
        <SectionShell key={group.href} tone={index % 2 === 0 ? "sunken" : "paper"}>
          <div className="split">
            <div>
              <p className="eyebrow">Organization {String(index + 1).padStart(2, "0")}</p>
              <h2 className="display-3">{group.name}</h2>
              <p className="large-copy">{group.problem}</p>
              <p>{group.description}</p>
              <Link className="text-link" href={group.href}>Read the full solution <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </div>
            <div className="content-section">
              <h3>Teams involved</h3>
              <ul className="check-list">{group.who.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3>What to prepare</h3>
              <ul className="check-list">{group.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="small muted"><strong>Current boundary:</strong> {group.boundary}</p>
            </div>
          </div>
        </SectionShell>
      ))}
      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring">
          <div style={{ maxWidth: "48ch", position: "relative" }}>
            <p className="eyebrow">Not sure which fits?</p>
            <h2>Describe the work, not just the industry.</h2>
            <p>Share your payment source, internal record, exception process and control requirements. We will map your use case to current pilot capability and make gaps explicit.</p>
          </div>
          <div className="actions"><Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>Discuss your organization</Button></div>
        </div>
      </SectionShell>
    </>
  );
}
