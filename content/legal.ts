import type { PageData } from "@/types/content";

/**
 * Public legal information pages.
 *
 * These are product-policy summaries, not a substitute for legal review.
 * Keep claims aligned with the deployed product, configured vendors and the
 * current privacy/retention practices before publishing changes.
 */
export const legalDetails: Record<string, PageData> = {
  privacy: {
    title: "Privacy, stated plainly.",
    description: "How PesaGuard handles information submitted through the public website and information processed by the platform.",
    label: "Privacy",
    lede: "Payment operations depend on trust. This page explains the categories of information PesaGuard may receive, why it is used, and the safeguards and choices that should govern its handling. The exact processing for a customer deployment is defined by its applicable agreement and configuration.",
    sections: [
      {
        eyebrow: "01 · Scope",
        title: "Which information this notice covers",
        body: "This notice covers information collected through pesaguard.co.ke, including contact and sales enquiries, support requests, and basic technical information generated when the website is requested. Customer transaction data processed by a PesaGuard deployment may be subject to separate customer terms, data-processing terms and operational settings.",
        items: [
          "Contact details and the message you choose to send us",
          "Basic request metadata such as timestamps, requested paths and diagnostic identifiers where server logging is enabled",
          "Information needed to respond to a sales, pilot or support conversation",
          "Payment or member data only where a customer deliberately supplies it through an agreed and appropriate channel",
        ],
        note: "Do not submit passwords, API secrets, full payment credentials or unnecessary personal information in a public contact message.",
      },
      {
        eyebrow: "02 · Purpose",
        title: "Use information for a defined reason",
        body: "Information should be used for the purpose for which it was provided: responding to a request, assessing a pilot, operating and securing the website or service, diagnosing faults, and meeting applicable legal obligations. It should not be repurposed into unrelated marketing or sold as a data asset.",
        items: [
          "Respond to enquiries and coordinate requested demonstrations",
          "Protect the website and service against abuse, misuse and security incidents",
          "Diagnose reliability issues using appropriately limited technical logs",
          "Maintain records required for legitimate operational or legal purposes",
        ],
      },
      {
        eyebrow: "03 · Access and sharing",
        title: "Limit access to people and providers who need it",
        body: "Access to personal information should be limited by role and operational need. Information may be shared with service providers that help deliver hosting, email or security functions, or when disclosure is required by law. Providers should receive only the information needed for their role and be subject to appropriate safeguards.",
        items: [
          "No sale of personal information to data brokers or advertisers",
          "Access should be restricted to authorized personnel and reviewed when responsibilities change",
          "Provider sharing should be documented and limited to a legitimate service purpose",
          "A legal demand should be reviewed and handled through an authorized process",
        ],
      },
      {
        eyebrow: "04 · Security",
        title: "Protect information throughout its lifecycle",
        body: "PesaGuard's engineering approach prioritizes encrypted transport, least-privilege access, tenant boundaries, redaction of secrets from logs and auditable operational changes. The controls actually available can differ by environment and deployment maturity; do not interpret this summary as a certification or a promise that every control is enabled in every deployment.",
        items: [
          "Never place API keys, passwords or bearer tokens in public pages, URLs or ordinary logs",
          "Keep tenant-scoped data access on the server side and enforce authorization for every request",
          "Use secure transport and managed secret storage for production integrations",
          "Investigate and document suspected exposure through the relevant incident process",
        ],
      },
      {
        eyebrow: "05 · Retention",
        title: "Keep information only as long as there is a reason",
        body: "Retention depends on the type of information, the purpose for which it was collected, applicable legal obligations and the customer agreement. Operational logs should have a defined retention period and should not be kept indefinitely by default. Customer data deletion and export must follow the relevant contract, backup lifecycle and legal holds.",
        items: [
          "Define retention periods for enquiries, diagnostics, audit events and customer records separately",
          "Remove or anonymize information when its retention purpose expires, where legally and technically appropriate",
          "Account for backups and replicas in documented deletion procedures",
        ],
      },
      {
        eyebrow: "06 · Your choices",
        title: "Ask about access, correction or deletion",
        body: "You may contact PesaGuard to ask what personal information was provided through the website, request correction, or raise a concern about its use. Requests will be assessed against identity-verification needs, applicable law, legitimate retention requirements and any customer agreement that governs the data.",
        items: [
          "Identify the enquiry or interaction involved without sending passwords or secrets",
          "Explain whether you are requesting access, correction, deletion or clarification",
          "For transaction records held by a customer deployment, contact the responsible customer organization where it controls the processing",
        ],
        note: "Contact: hello@pesaguard.co.ke. This contact route must be monitored before it is treated as a guaranteed support channel.",
      },
      {
        eyebrow: "07 · Updates",
        title: "Keep this notice current",
        body: "This notice should be reviewed when website analytics, email providers, hosting, support tooling or product data flows change. Material changes should be reflected here with an updated effective date and communicated where required. The final published notice should be reviewed against PesaGuard's actual vendor configuration and applicable Kenyan data-protection requirements.",
      },
    ],
    related: [
      { label: "Cookie notice", href: "/cookies", description: "Browser storage and optional technologies." },
      { label: "Terms of use", href: "/terms", description: "Conditions for using the website and service." },
      { label: "Security model", href: "/security", description: "Technical controls and stated product scope." },
    ],
    cta: {
      eyebrow: "Privacy questions",
      title: "Tell us what information or interaction your question concerns.",
      body: "Please share enough context to locate the enquiry, but never include passwords, API keys, access tokens or full payment credentials.",
      primary: { label: "Contact PesaGuard", href: "/contact", description: "Raise a privacy question." },
    },
  },
  terms: {
    title: "Terms for working together.",
    description: "The baseline conditions for visiting the PesaGuard website and evaluating or using the service.",
    label: "Terms of use",
    lede: "These terms set expectations for the public website and early-stage service evaluation. A signed customer agreement, order form or data-processing agreement may add to or replace provisions for a specific deployment. Obtain legal review before treating this page as the final contract for a production financial service.",
    sections: [
      {
        eyebrow: "01 · Acceptance",
        title: "Use the website lawfully and responsibly",
        body: "By accessing the public website, you agree to use it only for lawful purposes and in a way that does not disrupt the site, compromise another user's information or interfere with service operations. If you do not agree with these conditions, stop using the website.",
        items: [
          "Do not probe, scan or exploit systems without written authorization",
          "Do not attempt to access another tenant's data, credentials or environment",
          "Do not upload malware, unlawful content or information you have no right to disclose",
        ],
      },
      {
        eyebrow: "02 · Service maturity",
        title: "Understand the current pilot boundary",
        body: "PesaGuard is an MVP being operated with a pilot customer while production hardening continues. The active payment integration described on this website is M-Pesa through Safaricom Daraja, alongside the specifically documented webhook capabilities. Pages may describe future or unstarted integrations, but those descriptions are not a promise that an adapter or production capability is available.",
        items: [
          "Check the availability label on each capability and integration page",
          "Do not assume a roadmap item has a committed delivery date",
          "Confirm environment, limits, support arrangements and acceptance criteria in writing before a pilot",
        ],
      },
      {
        eyebrow: "03 · Customer responsibilities",
        title: "Keep credentials and payment data under control",
        body: "If you receive access to a pilot or API, you are responsible for protecting credentials, granting access only to authorized people, using the correct environment and supplying data you are entitled to process. Notify PesaGuard promptly if a credential is lost, exposed or suspected of misuse.",
        items: [
          "Never share a secret key in client-side code, a public repository or a support screenshot",
          "Use separate credentials for separate environments and rotate compromised credentials promptly",
          "Use idempotency keys and follow documented retry and rate-limit guidance",
          "Validate results against your own financial records; do not rely on a single status field as the sole control",
        ],
      },
      {
        eyebrow: "04 · Financial and operational decisions",
        title: "PesaGuard supports review; your organization remains accountable",
        body: "Reconciliation outcomes and anomaly signals are decision-support information. A risk signal is not, by itself, a determination of fraud, and a matched record does not replace your own settlement, accounting, regulatory or customer-service controls. Your organization remains responsible for its payment decisions, approvals and legal obligations.",
        items: [
          "Investigate exceptions using source records and evidence",
          "Require human review where your policy calls for approval",
          "Keep independent reconciliation and incident procedures appropriate to your risk",
        ],
      },
      {
        eyebrow: "05 · Availability and changes",
        title: "Do not treat a status page as a service-level agreement",
        body: "The website and pilot service may change, be unavailable, or return incomplete information while systems are maintained or incidents are investigated. Published status information is operational communication, not a contractual uptime commitment unless a separate written agreement says otherwise.",
        items: [
          "Follow documented backoff and retry guidance rather than creating request storms",
          "Use the status page for incident context and retain your own operational records",
          "Escalate critical production requirements before relying on the service for a financial control",
        ],
      },
      {
        eyebrow: "06 · Intellectual property",
        title: "Respect the platform and its materials",
        body: "The website, brand assets, software and documentation are owned by PesaGuard or their respective rights holders unless a separate license says otherwise. You may use the public documentation to evaluate or integrate with the service within the scope of an applicable authorization. No ownership is transferred by accessing the website.",
      },
      {
        eyebrow: "07 · Disclaimers and liability",
        title: "Use written agreements for production commitments",
        body: "To the extent permitted by applicable law, website content is provided for general product information and may change as the service develops. No warranty, certification, production readiness, regulatory approval or guaranteed financial outcome should be inferred from a marketing statement. Any limitation of liability, indemnity, warranty, service level or data-processing obligation must be set out in a reviewed written agreement.",
      },
      {
        eyebrow: "08 · Suspension and contact",
        title: "Unsafe access may be restricted",
        body: "Access may be suspended or revoked where reasonably necessary to protect users, data, service integrity or legal compliance, subject to applicable agreements and law. Questions about these terms should be sent with enough context to identify the relevant website or pilot interaction, but without including secrets.",
        items: [
          "Website: https://pesaguard.co.ke",
          "Contact: hello@pesaguard.co.ke",
          "Applicable law and dispute terms should be confirmed in a reviewed customer agreement before production use",
        ],
      },
    ],
    related: [
      { label: "Privacy notice", href: "/privacy", description: "How submitted information should be handled." },
      { label: "Security model", href: "/security", description: "The platform's controls and current scope." },
      { label: "System status", href: "/status", description: "Service health and incident context." },
    ],
    cta: {
      eyebrow: "Before production use",
      title: "Agree the operational and legal boundaries in writing.",
      body: "Confirm supported flows, environments, data handling, incident contacts and service expectations before depending on PesaGuard for a financial control.",
      primary: { label: "Discuss a pilot", href: "/contact/sales", description: "Scope a controlled evaluation." },
      secondary: { label: "Read the status page", href: "/status", description: "Review service health." },
    },
  },
  cookies: {
    title: "Cookies and local storage.",
    description: "A practical explanation of browser storage and optional technologies on the PesaGuard website.",
    label: "Cookies",
    lede: "Browser storage should be limited to what the website needs. This notice explains the categories to check and how to manage them; the final published details must match the cookies, scripts and providers actually enabled in production.",
    sections: [
      {
        eyebrow: "01 · What they are",
        title: "Small pieces of browser state",
        body: "Cookies are values stored by a website in your browser. Local storage and session storage are related browser mechanisms that can retain state without using a cookie. They may be used to keep a preference, support a session or measure site usage, depending on the implementation.",
      },
      {
        eyebrow: "02 · Essential storage",
        title: "Keep necessary state narrowly scoped",
        body: "Strictly necessary storage may be required for security, navigation, accessibility or a feature you explicitly request. Such storage should be limited to its stated purpose, use secure cookie attributes where applicable, and avoid holding secrets or unnecessary personal information.",
        items: [
          "Do not store API secrets, passwords or payment credentials in local storage",
          "Set Secure, HttpOnly and SameSite cookie attributes for server-managed session cookies where applicable",
          "Use the shortest practical lifetime for temporary state",
        ],
      },
      {
        eyebrow: "03 · Optional analytics and marketing",
        title: "Do not imply optional tracking is enabled unless it is",
        body: "Analytics, advertising and other non-essential tracking should only be enabled when the relevant tools are actually configured and any required consent or preference has been obtained. This notice does not claim that analytics or advertising trackers are currently active; the deployed site configuration must be checked and this page updated before any such tool is introduced.",
        items: [
          "Inventory scripts and third-party requests before release",
          "Block non-essential trackers until required consent is recorded",
          "Provide a way to change or withdraw preferences where consent is used",
        ],
      },
      {
        eyebrow: "04 · Managing your browser",
        title: "You can review and clear stored data",
        body: "Most browsers let you inspect, block and delete cookies and site storage in privacy or site-settings controls. Blocking essential storage can affect features that depend on it, but should not expose private information or weaken authorization controls.",
        items: [
          "Use your browser's site settings for pesaguard.co.ke",
          "Clear cookies and site data if you want to reset local preferences",
          "Repeat the review after significant browser or device changes",
        ],
      },
      {
        eyebrow: "05 · Changes and questions",
        title: "Keep the notice aligned with the shipped website",
        body: "The site owner should re-check this page whenever analytics, embeds, support widgets, authentication, consent tooling or hosting changes. A browser-level scan of production requests is needed to confirm the current inventory; do not treat this general explanation as proof that no cookies are set.",
        items: [
          "Review this notice when third-party scripts or integrations are added",
          "Document cookie name, purpose, provider, category and lifetime for each deployed item",
          "Send questions to hello@pesaguard.co.ke without including credentials",
        ],
      },
    ],
    related: [
      { label: "Privacy notice", href: "/privacy", description: "How information is handled." },
      { label: "Terms of use", href: "/terms", description: "Conditions for using the website and service." },
      { label: "Contact", href: "/contact", description: "Ask a question about website data handling." },
    ],
  },
};
