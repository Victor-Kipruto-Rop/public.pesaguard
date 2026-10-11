import Link from "next/link";
import {
  ArrowUpRight,
  ClipboardCheck,
  FileClock,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Network,
  UserRoundCog,
} from "lucide-react";
import { pages } from "@/content/pages";
import { faqJsonLd } from "@/lib/seo/structured-data";
import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SectionShell } from "@/components/sections/SectionShell";

const data = pages.security;

export const metadata = pageMetadata(
  "Security and data protection | PesaGuard",
  data.description,
  "/security",
);

const controls = [
  {
    title: "Authentication",
    status: "Documented approach",
    description: "Requests should have a verifiable identity before data or actions are available.",
    icon: Fingerprint,
    points: [
      "Server integrations use scoped bearer credentials with expiry and rotation metadata.",
      "Expired, revoked or invalid credentials are intended to be rejected rather than treated as anonymous.",
      "Provider callbacks are described as requiring signature verification before processing.",
      "Confirm dashboard session duration, MFA support and account-recovery controls for the target deployment.",
    ],
    href: "/security/authentication",
    link: "Authentication details",
  },
  {
    title: "Authorization and least privilege",
    status: "Documented approach",
    description: "Access should follow the responsibilities of the people and services using the platform.",
    icon: UserRoundCog,
    points: [
      "Role-based access is described for operational reviewers, users and administrators.",
      "The documented principle is to grant only the permissions needed for a role.",
      "Sensitive actions and permission changes should remain attributable to an authorized identity.",
      "Ask for the role and permission matrix that applies to your tenant and pilot.",
    ],
    href: "/security/access-control",
    link: "Access control details",
  },
  {
    title: "Tenant data separation",
    status: "Verify deployment evidence",
    description: "A customer should only be able to access information belonging to its authorized tenant context.",
    icon: Network,
    points: [
      "The documented design scopes tenant-owned data to authenticated tenant context.",
      "Review how this boundary applies to reads, writes, exports, background jobs and event delivery.",
      "Request current cross-tenant negative-test evidence for the environment you will use.",
      "Do not treat a design description or isolated test as a guarantee about every production deployment.",
    ],
    href: "/security/tenant-isolation",
    link: "Tenant isolation details",
  },
  {
    title: "Encryption and secrets",
    status: "Confirm environment configuration",
    description: "Encryption and careful secret handling reduce exposure if traffic, storage or logs are accessed improperly.",
    icon: LockKeyhole,
    points: [
      "Security material describes encrypted transport and encryption at rest for sensitive data.",
      "Credentials and tokens should not appear in logs or audit records; sensitive fields are described as redacted at logging boundaries.",
      "Key and secret storage, rotation ownership and access should be confirmed for the specific deployment.",
      "Request details for data locations, key management and any customer-managed key options before relying on them.",
    ],
    href: "/security/encryption",
    link: "Encryption details",
  },
  {
    title: "Payment and webhook integrity",
    status: "Review the integration contract",
    description: "Integration security depends on validating who sent an event and protecting credentials on both sides.",
    icon: KeyRound,
    points: [
      "The published integration material describes signature verification for inbound provider callbacks.",
      "API credentials should be scoped, protected from client-side exposure and rotated if compromised.",
      "Outbound webhook consumers should verify signatures and handle retries or duplicate deliveries safely.",
      "Confirm the supported signing, replay protection and failure behavior for the integration in scope.",
    ],
    href: "/integrations/webhooks",
    link: "Webhook security guidance",
  },
  {
    title: "Auditability and data lifecycle",
    status: "Confirm policy and operations",
    description: "A security review needs both traceable decisions and clear rules for how long information is kept.",
    icon: FileClock,
    points: [
      "The documented audit model describes recording actors, tenant context and transaction-related decisions.",
      "Secrets are described as excluded from audit records, with sensitive values redacted at logging boundaries.",
      "Confirm retention, deletion, archival and legal-hold rules for your contract and deployment.",
      "Request evidence for backup and restore tests, incident response, monitoring and security review cadence.",
    ],
    href: "/security/compliance",
    link: "Governance and compliance details",
  },
];

const reviewItems = [
  "Which environment, hosting region and subprocessors will handle our data?",
  "What authentication, user roles and credential-rotation procedures will be enabled?",
  "What evidence demonstrates tenant isolation in the environment we will use?",
  "How are data retention, deletion, backups, restoration and incident communication handled?",
  "Which security attestations are available? PesaGuard does not claim third-party certification on this page.",
];

export default function Security() {
  return (
    <>
      {data.faq?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(data.faq)) }}
        />
      ) : null}

      <SectionShell tone="sunken" className="security-page-section">
        <SectionHeading
          className="security-page-heading"
          eyebrow="Control areas"
          title="Security features, explained."
          body="PesaGuard documents controls across identity, access, tenant boundaries, encryption, integration integrity and auditability. The notes below distinguish described controls from evidence that must be confirmed for a specific deployment."
        />
        <div className="security-control-grid">
          {controls.map((control, index) => {
            const Icon = control.icon;
            return (
              <article className="security-control" key={control.title}>
                <div className="security-control-top">
                  <span className="security-control-icon"><Icon aria-hidden="true" size={19} /></span>
                  <span className="security-control-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="security-control-status">{control.status}</p>
                <h3>{control.title}</h3>
                <p className="security-control-description">{control.description}</p>
                <ul>
                  {control.points.map((point) => (
                    <li key={point}><span aria-hidden="true" />{point}</li>
                  ))}
                </ul>
                <Link href={control.href}>
                  {control.link}<ArrowUpRight aria-hidden="true" size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell className="security-page-section">
        <div className="security-review-layout">
          <SectionHeading
            className="security-page-heading"
            eyebrow="Customer security review"
            title="Ask for evidence that matches your deployment."
            body="Security depends on how the service is configured and operated. Before sending production data, review the controls, owners and evidence for the environment and integration your team will use."
          />
          <div className="security-review-panel">
            <div className="security-review-panel-heading">
              <ClipboardCheck aria-hidden="true" size={20} />
              <h3>Review together with the PesaGuard team</h3>
            </div>
            <ul>
              {reviewItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href="/contact/sales">
              Request a security discussion<ArrowUpRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </div>
      </SectionShell>

      {data.faq?.length ? (
        <SectionShell className="security-page-section">
          <div className="security-faq-layout">
            <SectionHeading
              className="security-page-heading"
              eyebrow="Security questions"
              title="What is documented, and what should you verify?"
              body="These answers reflect published security design information. Ask for current configuration and evidence for the specific environment, integration and contract you are evaluating."
            />
            <Faq items={data.faq} />
          </div>
        </SectionShell>
      ) : null}

      <SectionShell>
        <div className="panel panel-split ring-decoration closing-ring security-page-cta">
          <div>
            <p className="eyebrow">Security is a shared responsibility</p>
            <h2>Bring your requirements. Review the evidence with us.</h2>
            <p>We can discuss the controls and deployment details relevant to your payment flow.</p>
          </div>
          <div className="actions">
            <Button href="/contact/sales" trailing={<ArrowUpRight aria-hidden="true" size={17} />}>
              Talk to our team
            </Button>
            <Button href="/how-it-works" variant="ghost-light">How PesaGuard works</Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
