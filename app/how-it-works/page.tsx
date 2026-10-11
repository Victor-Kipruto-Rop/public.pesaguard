import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleAlert,
  Database,
  FileCheck2,
  FileSearch,
  GitCompareArrows,
  ListChecks,
  type LucideIcon,
  UserRoundCheck,
} from "lucide-react";
import { pages } from "@/content/pages";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";
import { docsUrl } from "@/config/docs";

const data = pages["how-it-works"];

export const metadata = pageMetadata(
  "How PesaGuard works | PesaGuard",
  data.description,
  "/how-it-works",
);

const stages: { title: string; detail: string; input: string; outcome: string; icon: LucideIcon }[] = [
  {
    title: "Receive payment event",
    detail: "A Safaricom Daraja callback brings the provider's account of a payment into the configured pilot flow.",
    input: "Daraja callback",
    outcome: "An event to check",
    icon: Database,
  },
  {
    title: "Check and prepare",
    detail: "The workflow checks the fields available for processing and prepares supported values for comparison. Missing or unusable data may need follow-up.",
    input: "Provider fields",
    outcome: "Comparable details",
    icon: ListChecks,
  },
  {
    title: "Find the expected record",
    detail: "The payment event is compared with the corresponding business record supplied through the agreed data path.",
    input: "Business record",
    outcome: "Candidate pair",
    icon: FileSearch,
  },
  {
    title: "Compare agreed fields",
    detail: "Configured matching rules can compare references and amounts, and apply any agreed timing tolerance.",
    input: "Reference, amount, rules",
    outcome: "Match or difference",
    icon: GitCompareArrows,
  },
  {
    title: "Classify the outcome",
    detail: "The workflow distinguishes a match from an unmatched or conflicting record so unresolved items are not mistaken for completed reconciliation.",
    input: "Comparison result",
    outcome: "Clear next state",
    icon: FileCheck2,
  },
  {
    title: "Review and resolve",
    detail: "A Finance Officer or authorized operations owner reviews the available context, decides the next action and records the team's outcome.",
    input: "Exception evidence",
    outcome: "Human decision",
    icon: UserRoundCheck,
  },
];

const outcomes = [
  {
    label: "Matched",
    title: "The agreed fields align",
    body: "The payment and expected business record meet the configured matching rules.",
    icon: Check,
  },
  {
    label: "Unmatched",
    title: "A counterpart was not found",
    body: "The available source data does not identify the expected record; the team may need to check data arrival or reference details.",
    icon: FileSearch,
  },
  {
    label: "Needs review",
    title: "The records do not agree",
    body: "A difference in an agreed field is surfaced for a person to investigate. A flag is not proof of fraud.",
    icon: CircleAlert,
  },
];

const requirements = [
  {
    title: "An eligible M-Pesa setup",
    body: "A Safaricom Daraja merchant setup with access to configure the callback flow. PayBill or Buy Goods/Till eligibility depends on the merchant and provider configuration.",
  },
  {
    title: "Access to payment event data",
    body: "The authorized technical contact who can coordinate callback configuration and confirm which transaction fields are available.",
  },
  {
    title: "The business records to match",
    body: "Orders, receipts, ledger entries or another agreed internal source that represents the expected payment, plus a clear way to provide those records.",
  },
  {
    title: "Agreed matching rules",
    body: "The reference and amount fields to compare, any acceptable timing tolerance, and how incomplete or conflicting records should be classified.",
  },
  {
    title: "Named exception owners",
    body: "A Finance Officer or operations owner who can review unmatched records, decide next actions and confirm the team's resolution process.",
  },
  {
    title: "A test and access plan",
    body: "Agreement on a safe test environment, authorized users and data handling before any live flow is considered. A public self-serve sandbox is not available yet.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        className="page-hero-how-it-works"
        title={data.title}
        lede={data.lede ?? data.description}
        label="How it works"
        trail={[{ label: "Home", href: "/" }, { label: "How it works", href: "/how-it-works" }]}
        status={data.status}
        actions={
          <>
            <Button href="#payment-flow">Follow the payment flow</Button>
            <Button href={docsUrl()} variant="quiet">Read documentation</Button>
          </>
        }
      />

      <SectionShell id="payment-flow" tone="sunken" className="how-it-works-section">
        <SectionHeading
          className="how-it-works-heading"
          eyebrow="The payment flow"
          title="From provider event to a reviewed outcome."
          body="PesaGuard compares a payment event with the business record expected for it. Each step makes clear what was received, what was compared and whether a person needs to follow up."
        />
        <ol className="how-it-works-stages">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <li className="how-it-works-stage" key={stage.title}>
                <div className="how-it-works-stage-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" size={18} />
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
                <div className="how-it-works-transition">
                  <span>{stage.input}</span>
                  <ArrowRight aria-hidden="true" size={14} />
                  <strong>{stage.outcome}</strong>
                </div>
              </li>
            );
          })}
        </ol>
      </SectionShell>

      <SectionShell id="outcomes" className="how-it-works-section">
        <SectionHeading
          className="how-it-works-heading"
          eyebrow="Understanding the result"
          title="A match is specific. An exception needs a person."
          body="Payment confirmation and reconciliation answer different questions. A provider can confirm a payment while the matching business record is still missing or inconsistent."
        />
        <div className="how-it-works-outcomes">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <article className="how-it-works-outcome" key={outcome.label}>
                <span className="how-it-works-outcome-icon">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <div>
                  <span className="how-it-works-outcome-label">{outcome.label}</span>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell id="customer-requirements" tone="sunken" className="how-it-works-section">
        <SectionHeading
          className="how-it-works-heading"
          eyebrow="Customer requirements"
          title="What your team needs to get started."
          body="A successful evaluation needs a supported payment flow, usable business records and people who can agree how exceptions are handled. The team confirms the details with you before setup."
        />
        <div className="how-it-works-inputs">
          {requirements.map((requirement, index) => (
            <article className="how-it-works-input" key={requirement.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{requirement.title}</h3>
              <p>{requirement.body}</p>
            </article>
          ))}
        </div>
        <p className="how-it-works-note">
          The active payment scope is Safaricom Daraja M-Pesa. Other payment providers and business
          system connectors are not currently offered as live integrations.
        </p>
      </SectionShell>

      <SectionShell id="boundaries" className="how-it-works-section">
        <div className="how-it-works-boundaries">
          <div>
            <p className="eyebrow">Product boundaries</p>
            <h2>Reconciliation support—not payment execution.</h2>
            <p>
              PesaGuard helps teams inspect payment records and investigate differences. It does
              not, by itself, initiate payments, hold funds, confirm settlement or process refunds.
              Other payment providers and business-system connectors should not be assumed to be
              available.
            </p>
          </div>
          <div className="how-it-works-boundary-links">
            <Link href="/integrations/mpesa">Check M-Pesa pilot requirements<ArrowUpRight aria-hidden="true" size={15} /></Link>
            <Link href="/integrations">Review integration scope<ArrowUpRight aria-hidden="true" size={15} /></Link>
            <Link href="/security">Review security controls<ArrowUpRight aria-hidden="true" size={15} /></Link>
          </div>
        </div>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell id="faq" tone="sunken" className="how-it-works-section">
          <div className="how-it-works-faq">
            <SectionHeading
              className="how-it-works-heading"
              eyebrow="Common questions"
              title="What to expect."
            />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring how-it-works-cta">
          <div>
            <p className="eyebrow">Start with your payment flow</p>
            <h2>Make each reconciliation step understandable.</h2>
            <p>Discuss your Daraja setup, business records and pilot requirements with our team.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
              Talk to our team
            </Button>
            <Button href="/product" variant="ghost-light">Explore the product</Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
