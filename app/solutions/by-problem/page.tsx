import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionShell } from "@/components/sections/SectionShell";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata(
  "Solutions by payment operations problem | PesaGuard",
  "Explore payment reconciliation, monitoring, anomaly investigation, alerts, reporting and audit needs, with explicit current capability boundaries.",
  "/solutions/by-problem",
);

const problems = [
  {
    href: "/features/reconciliation",
    title: "Payment and internal records do not match",
    description: "Use a defined matching process to compare M-Pesa events with the internal records supplied to the workflow. Decide what reference, amount, timestamp and status rules make a match acceptable, and route incomplete or conflicting records for investigation.",
    questions: ["Which record is authoritative?", "What reference links the event to the business record?", "How are timing differences and duplicates treated?", "Who owns an unresolved item?"],
    boundary: "The current pilot is scoped to M-Pesa/Daraja events and supported internal records. Bank, Airtel and POS sources are not connected today.",
  },
  {
    href: "/features/transaction-monitoring",
    title: "The team lacks visibility into payment flow",
    description: "Define which incoming events matter, what constitutes an exception and how operations should respond when a record is missing, delayed or contradictory. Verify monitoring signals and telemetry in the target deployment.",
    questions: ["Which events are in scope?", "What should be reviewed immediately?", "Who receives an escalation?", "How is recovery verified?"],
    boundary: "Do not infer full cross-rail monitoring or production observability from a page description; validate the deployed sources and monitoring.",
  },
  {
    href: "/features/fraud-detection",
    title: "Unusual activity needs investigation",
    description: "Use anomaly signals, where implemented, to prioritize a review of transaction context and source records. Build a human-led investigation process that distinguishes suspicious patterns from proven fraud.",
    questions: ["What rule or signal raised the flag?", "What evidence is available?", "Who can approve a response?", "How are false positives recorded?"],
    boundary: "Signals are not verdicts. No claim of guaranteed fraud prevention or theft detection should be inferred.",
  },
  {
    href: "/features/real-time-alerts",
    title: "Exceptions reach the owner too late",
    description: "Agree which exception types need notification, which channels are actually configured, what data is safe to include and what escalation path follows an unanswered alert.",
    questions: ["Who owns this class of exception?", "What is the response target?", "Which channel is configured?", "What happens if delivery fails?"],
    boundary: "Available channels, delivery guarantees and escalation automation must be verified for the current deployment.",
  },
  {
    href: "/features/reporting",
    title: "Period totals are difficult to explain",
    description: "Define the population, date boundaries and source records behind each report. Review matched and unresolved items together so a period summary does not hide exclusions or incomplete data.",
    questions: ["Which records are included?", "What date and time zone apply?", "Which differences remain unresolved?", "How does the total tie back to source data?"],
    boundary: "PesaGuard reporting cannot include bank or POS sources that are not connected and does not replace official accounting records.",
  },
  {
    href: "/features/audit-trail",
    title: "Reviewers need evidence of decisions",
    description: "Identify which actions must be attributable to a user or service, what source references should be retained, who can export evidence and how long records must remain available.",
    questions: ["Which actions must be recorded?", "Can the record be linked to its source event?", "Who can amend or export evidence?", "What retention policy applies?"],
    boundary: "Verify audit completeness, integrity, access, retention and export behavior in the deployed version before relying on it for formal audit.",
  },
  {
    href: "/integrations/webhooks",
    title: "Downstream systems need event notifications",
    description: "Evaluate configured outbound webhooks for the required event, signature verification, timeout handling, retries, duplicate deliveries, dead-letter processing and replay permissions.",
    questions: ["Which events are available?", "How is the signature verified?", "What retry and timeout behavior applies?", "How does the consumer avoid duplicate actions?"],
    boundary: "Confirm the current event contract and delivery guarantees; do not assume exactly-once delivery or universal event coverage.",
  },
];

export default function SolutionsByProblem() {
  return (
    <>
      <PageHero
        title="Start with the problem you need to solve."
        lede="Explore common payment-operations problems, the questions a good implementation should answer, and the boundaries you need to validate. The goal is not to imply every capability is already live; it is to help you define a useful, testable scope."
        label="Solutions by problem"
        trail={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "By problem", href: "/solutions/by-problem" }]}
        actions={<Button href="/solutions" variant="secondary" leading={<ArrowLeft aria-hidden="true" size={16} />}>All solutions</Button>}
      />
      <SectionShell tone="sunken">
        <SectionHeading eyebrow="Operational problem library" title="Choose the gap you need to close." body="Each guide links to a related capability page and lists the decisions to make before relying on it." />
        <div className="feature-grid">
          {problems.map((problem, index) => (
            <article className="feature-card" key={problem.href}>
              <span className="feature-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <Link className="text-link" href={problem.href}>Explore related capability <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </article>
          ))}
        </div>
      </SectionShell>
      {problems.map((problem, index) => (
        <SectionShell key={problem.href} tone={index % 2 === 0 ? "paper" : "sunken"}>
          <div className="split">
            <div>
              <p className="eyebrow">Problem {String(index + 1).padStart(2, "0")}</p>
              <h2 className="display-3">{problem.title}</h2>
              <p>{problem.description}</p>
              <Link className="text-link" href={problem.href}>Read capability details <ArrowUpRight aria-hidden="true" size={16} /></Link>
            </div>
            <div className="content-section">
              <h3>Questions to answer before implementation</h3>
              <ul className="check-list">{problem.questions.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="small muted"><strong>Scope boundary:</strong> {problem.boundary}</p>
            </div>
          </div>
        </SectionShell>
      ))}
      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring">
          <div style={{ maxWidth: "48ch", position: "relative" }}>
            <p className="eyebrow">Turn a pain point into a testable pilot</p>
            <h2>Define the records, the rule and the owner.</h2>
            <p>Bring one concrete example of a mismatch or delayed decision. Together, define the data needed, how success will be measured and which requirements are not covered by the current deployment.</p>
          </div>
          <div className="actions"><Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>Scope the problem</Button></div>
        </div>
      </SectionShell>
    </>
  );
}
