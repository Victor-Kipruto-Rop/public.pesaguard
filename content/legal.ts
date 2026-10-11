import type { PageData } from "@/types/content";

const googleAnalyticsConfigured = /^G-[A-Z0-9]+$/i.test(
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
);

/**
 * Public legal information pages.
 *
 * These are product-policy summaries, not a substitute for legal review.
 * Keep claims aligned with the deployed product, configured vendors and the
 * current privacy/retention practices before publishing changes.
 */
export const legalDetails: Record<string, PageData> = {
  privacy: {
    title: "Privacy",
    description: "How PesaGuard handles information submitted through the public website and information processed by the platform.",
    label: "PesaGuard legal",
    lede: "How PesaGuard handles your information.",
    sections: [
      {
        eyebrow: "01 · Scope",
        title: "Which information this notice covers",
        body: "This notice covers information about visitors and correspondents using the PesaGuard public website, and information processed by the service when a customer has configured and authorized a pilot. The marketing contact form opens the visitor's email application with a prepared message; it does not submit a ticket to this website. Information in that email is handled by the sender's mail provider and the recipient's email service.",
        items: [
          "Contact name, email address and message that you choose to send",
          "Technical request information that infrastructure or monitoring may process, such as IP address, timestamps, requested paths, browser details or security events; exact fields depend on deployed settings",
          "The service data catalogue includes tenant-scoped transaction identifiers, provider references, amounts, currencies, timestamps and statuses",
          "Transaction records may include a payer phone number; provider-event payloads and metadata may contain personal data; audit actors may also be identifiable",
          "Customer account, callback, reconciliation, risk-signal or audit information only where a customer deployment is configured to process it",
          "Information you provide in sales, pilot, support or privacy correspondence",
        ],
        note: "Do not email passwords, API keys, bearer tokens, full card details, PINs or information you are not authorized to disclose.",
      },
      {
        eyebrow: "02 · Purpose",
        title: "Use information for a defined reason",
        body: "Information is used for a stated and relevant purpose: replying to a request, arranging a customer-approved pilot, delivering the configured service, protecting infrastructure, diagnosing faults, administering agreements and complying with applicable law. The lawful basis depends on the particular purpose and the relationship with the person or customer; it must be assessed for the actual deployment rather than assumed from this notice.",
        items: [
          "Respond to correspondence and take requested pre-contract steps",
          "Operate the service and customer configuration agreed in writing",
          "Protect, maintain and investigate the website and infrastructure",
          "Use optional website analytics only after the visitor's affirmative choice, when a measurement ID is configured",
          "Meet legal obligations and establish, exercise or defend legal claims where applicable",
        ],
      },
      {
        eyebrow: "03 · Access and sharing",
        title: "Use providers for defined infrastructure functions",
        body: "The project has identified Cloudflare for DNS, Amazon Web Services (AWS) for cloud infrastructure including PostgreSQL hosting, Resend for outbound email, and Grafana for monitoring. This is not a complete subprocessor register: the precise products, legal entities, information each receives, hosting regions and transfer arrangements have not been verified here and must be checked against production configuration and vendor terms.",
        items: [
          "Providers may process information needed to provide their contracted infrastructure function",
          "Information may be disclosed where required by law or to protect people, rights and service integrity",
          "Access should be restricted to authorized people and the minimum needed for their role",
          "A production provider list and relevant international-transfer safeguards should be confirmed before customer data is sent",
        ],
      },
      {
        eyebrow: "04 · Data roles",
        title: "Controller and processor roles depend on the activity",
        body: "The service data catalogue includes tenant-scoped financial records and personal data, including payer phone numbers, provider payloads and actor information. This shows that the service can process personal data; it does not establish the legal roles of the parties. There is no verified controller/processor designation in the website configuration. For a customer's payment records, the customer may determine the business purposes while PesaGuard processes data on documented instructions; PesaGuard may have a separate role for its own website correspondence or security operations. The applicable contract must identify the actual roles, instructions and responsibilities for each deployment.",
        items: [
          "The data model associates financial records with a tenant identifier; customers must confirm the deployed authorization and tenant-isolation controls before sending live personal data",
          "The customer agreement and data-processing addendum should identify the parties, purposes, instructions and responsibilities",
          "A person seeking access to customer-controlled transaction information should normally contact the relevant customer organization first",
          "Do not send live personal or payment data to a pilot until roles and processing terms are agreed",
        ],
      },
      {
        eyebrow: "05 · Security",
        title: "Security controls must be verified for the deployment",
        body: "The product's published security material describes engineering intentions, but this notice does not certify that a particular control is enabled in every environment. Production controls, access restrictions, encryption configuration, backups, logging, incident response and independent assurance should be confirmed for the actual service and customer agreement.",
        items: [
          "Never place passwords, API secrets or access tokens in public forms or ordinary logs",
          "Confirm tenant boundaries, access controls and security responsibilities before processing live data",
          "Report suspected unauthorized disclosure promptly using the contact details below",
        ],
      },
      {
        eyebrow: "06 · Retention",
        title: "Retention periods are not published as fixed numbers",
        body: "No verified retention schedule for enquiries, infrastructure logs, monitoring records, backups or customer transaction data was available for this update. Retention depends on the information, purpose, configuration, applicable law and customer agreement. The responsible operator must confirm actual periods, deletion workflows, backup expiry and any legal holds before production use; do not read this notice as a promise of a specific deletion date.",
        items: [
          "The signed customer terms should specify retention and deletion for each relevant data class",
          "Deletion requests may be subject to legal retention duties, security requirements or backup cycles",
          "Contact the responsible customer if the request concerns records held for that customer's service",
        ],
      },
      {
        eyebrow: "07 · Your rights",
        title: "Exercise privacy rights under applicable Kenyan law",
        body: "The Kenya Data Protection Act, 2019 and applicable regulations provide rights and protections, subject to statutory conditions and exceptions. Depending on the circumstances, you may ask to be informed about processing, access or correct personal data, request deletion, object to or restrict certain processing, withdraw consent where consent is the basis, or request portability where applicable. You may also raise a complaint with the Office of the Data Protection Commissioner.",
        items: [
          "Email hello@pesaguard.co.ke with the request type and enough context to locate the information",
          "We may ask for proportionate identity or authority verification before acting",
          "If a customer organization controls the data, contact that organization; we will direct or assist as required by the applicable agreement and law",
          "Response timelines, exemptions and complaint routes are governed by applicable law",
        ],
      },
      {
        eyebrow: "08 · Contact and changes",
        title: "Contact the project lead and review updates",
        body: "The public project identifies Victor Kipruto Rop as its project developer and Data Engineer. PesaGuard is the product name; a registered contracting entity has not been confirmed for this notice. The project is based in Nairobi, Kenya. This notice should be updated when the operator, infrastructure providers, analytics, data flows or retention arrangements change.",
        items: [
          "Privacy enquiries: hello@pesaguard.co.ke",
          "Project contact: hello@victorkipruto.com · +254 723 484 552",
          "Location: Nairobi, Kenya",
          "Effective date: 11 October 2026",
        ],
      },
    ],
    related: [
      { label: "Cookie notice", href: "/cookies", description: "Browser storage and optional technologies." },
      { label: "Terms of use", href: "/terms", description: "Conditions for using the website and service." },
      { label: "Security model", href: "/security", description: "Technical controls and stated product scope." },
    ],
  },
  terms: {
    title: "Terms",
    description: "The baseline conditions for visiting the PesaGuard website and evaluating or using the service.",
    label: "PesaGuard legal",
    sections: [
      {
        eyebrow: "01 · Acceptance",
        title: "Use the website lawfully and responsibly",
        body: "Use the public website lawfully, in good faith and without interfering with other visitors, infrastructure or service operations. These terms govern access to public pages only. Access to a customer, pilot or API environment is subject to the applicable written agreement and access authorization; a page view does not grant credentials, a service entitlement or permission to process another person's data.",
        items: [
          "Do not probe, scan or exploit systems without written authorization",
          "Do not attempt to access another tenant's data, credentials or environment",
          "Do not upload malware, unlawful content or information you have no right to disclose",
          "Do not bypass authentication, rate limits or technical access controls",
          "Stop using the website if you do not accept these conditions",
        ],
      },
      {
        eyebrow: "02 · Service maturity",
        title: "Understand the current pilot boundary",
        body: "PesaGuard is an MVP with a pilot customer while production hardening continues. The active public payment scope is M-Pesa through Safaricom Daraja. Feature pages distinguish pilot, planned and illustrative material; a product description does not promise availability, compatibility, delivery date or a particular result.",
        items: [
          "Check the availability label on each capability and integration page",
          "Do not assume a roadmap item has a committed delivery date",
          "Confirm environments, supported callbacks, limits, support routes, security controls and acceptance criteria in writing before a pilot",
          "Do not treat a demonstration, mock record or animated example as live production data",
        ],
      },
      {
        eyebrow: "03 · Customer responsibilities",
        title: "Keep credentials and payment data under control",
        body: "If an organization is authorized to use a pilot or API, that organization is responsible for its users, credentials, environment, source data and legal authority to process the information it supplies. It must configure access appropriately and promptly report suspected credential exposure through the agreed incident channel.",
        items: [
          "Never share a secret key in client-side code, a public repository or a support screenshot",
          "Use separate credentials for separate environments and rotate compromised credentials promptly",
          "Use idempotency keys and follow documented retry and rate-limit guidance",
          "Validate results against your own financial records; do not rely on a single status field as the sole control",
          "Use only data that the organization is entitled to disclose and process, and follow the agreed retention and deletion terms",
        ],
      },
      {
        eyebrow: "04 · Financial and operational decisions",
        title: "PesaGuard supports review; your organization remains accountable",
        body: "Transaction states, reconciliation outcomes, reports and anomaly signals are information for review. They do not move, hold, safeguard or settle money; a status does not prove settlement, a match is not proof that funds were received, and a signal is not a finding of fraud. The customer organization retains responsibility for its payments, accounting, approvals, customer treatment and regulatory duties.",
        items: [
          "Investigate exceptions using source records and evidence",
          "Require human review where your policy calls for approval",
          "Keep independent reconciliation and incident procedures appropriate to your risk",
        ],
      },
      {
        eyebrow: "05 · Availability and changes",
        title: "Do not treat a status page as a service-level agreement",
        body: "The public website and pilot service may change, be unavailable, be suspended or provide incomplete information during maintenance, deployment or incident response. The status page is an operational report, not a service-level commitment, recovery-time objective or guarantee of event delivery unless an executed written agreement expressly makes one.",
        items: [
          "Follow documented backoff and retry guidance rather than creating request storms",
          "Use the status page for incident context and retain your own operational records",
          "Agree incident contacts, recovery expectations, support hours and escalation procedures before production use",
        ],
      },
      {
        eyebrow: "06 · Intellectual property",
        title: "Respect the platform and its materials",
        body: "The PesaGuard name, website design, original text, software and other materials are owned by their respective rights holders and protected by applicable intellectual-property laws. You may access and refer to public materials for evaluation and lawful integration, subject to any separate license. Third-party marks remain the property of their owners. Website access does not transfer ownership or grant a broader software license.",
      },
      {
        eyebrow: "07 · Disclaimers and liability",
        title: "Use written agreements for production commitments",
        body: "Website content is provided for general information and may change. Unless expressly agreed in a signed contract, no marketing statement creates a warranty, certification, regulatory approval, production-readiness representation, uptime promise or guaranteed financial outcome. A customer agreement must define any service warranty, service levels, indemnity, data-processing duties and liability allocation. Nothing in this notice excludes or limits a right or liability that applicable law does not permit to be excluded or limited.",
        items: [
          "No independent security certification or regulator approval is claimed by this notice",
          "Pilot or illustrative workflows should be verified against the deployed version",
          "The customer should retain appropriate independent payment, settlement and operational controls",
        ],
      },
      {
        eyebrow: "08 · Governing law and disputes",
        title: "Apply Kenyan law, subject to mandatory protections",
        body: "These public website terms are intended to be interpreted under the laws of Kenya, subject to any mandatory law that applies to the visitor and any different terms in an executed customer agreement. The parties, dispute forum and dispute-resolution procedure for a customer deployment must be identified in that signed agreement; this notice does not invent a contracting entity or a forum for that contract.",
      },
      {
        eyebrow: "09 · Suspension and contact",
        title: "Protect the service and raise a question",
        body: "Access may be restricted where reasonably necessary to protect people, data, infrastructure or legal compliance, subject to applicable law and any customer agreement. Questions should identify the relevant page or pilot interaction without including passwords, API keys, payment credentials or other secrets.",
        items: [
          "Website: https://pesaguard.co.ke",
          "Legal and privacy contact: hello@pesaguard.co.ke",
          "Project developer: Victor Kipruto Rop, Data Engineer · hello@victorkipruto.com · +254 723 484 552",
          "Location: Nairobi, Kenya · Effective date: 11 October 2026",
        ],
      },
    ],
    related: [
      { label: "Privacy notice", href: "/privacy", description: "How submitted information should be handled." },
      { label: "Security model", href: "/security", description: "The platform's controls and current scope." },
      { label: "System status", href: "/status", description: "Service health and incident context." },
    ],
  },
  cookies: {
    title: "Cookies",
    description: "Detailed cookie and browser-storage notice for the PesaGuard website, including saved preferences and consent-gated analytics.",
    label: "Cookies",
    sections: [
      {
        eyebrow: "01 · Definitions",
        title: "Cookies, local storage and similar technologies",
        body: "A cookie is a small value a website or an embedded service asks your browser to store and send with later requests. Session cookies normally expire when a browsing session ends; persistent cookies remain until an expiry time or removal. First-party cookies are set for the site you visit; third-party cookies are associated with another domain. Local storage is a separate browser feature: values are kept for the site but are not automatically sent with each network request. Pixels, scripts and device identifiers can also observe activity without relying only on cookies.",
        items: [
          "Cookies may support security, session continuity, saved preferences, measurement or advertising, depending on their purpose",
          "Blocking all storage can affect sign-in or preference features on some websites",
          "This notice is for the PesaGuard public website; a separately hosted dashboard or customer deployment may use different session storage and notices",
        ],
      },
      {
        eyebrow: "02 · Current preference storage",
        title: "The choice is stored in this browser, not in a cookie",
        body: "The public site's preference panel uses browser local storage under the key pesaguard_cookie_consent_v2. It saves either an analytics-allowed or optional-analytics-denied choice and the analytics measurement ID disclosed when the choice was made. The measurement ID check means an old choice is not silently reused if a different analytics property is later configured. This key is not an authentication token and is not sent to PesaGuard with each page request.",
        items: [
          "Storage type: first-party local storage for the PesaGuard website",
          "Purpose: remember your optional analytics choice and avoid asking on each page visit",
          "Expiry: it remains until you clear the site's browser data or the preference version changes",
          "If your browser blocks local storage, the choice may not persist and the panel can appear again",
          "The preference itself contains no name, email, payment record or password",
        ],
      },
      {
        eyebrow: "03 · Analytics",
        title: googleAnalyticsConfigured
          ? "Google Analytics runs only after you allow it"
          : "Google Analytics is planned, not currently configured",
        body: googleAnalyticsConfigured
          ? "A Google Analytics 4 measurement ID is configured for this site. The Google tag is not loaded and analytics cookies are not requested until you choose Allow analytics. After you allow, the tag may set first-party measurement cookies such as _ga and a property-specific _ga_<id> cookie, and sends page-view measurement to Google. If you reject or withdraw permission, PesaGuard stops analytics collection through the tag and removes matching Google Analytics cookies where the browser permits. Google's processing is also subject to Google's own terms and privacy information."
          : "A Google Analytics 4 integration is prepared to remain inactive until a valid public measurement ID is configured. As currently built without that ID, no Google Analytics tag is loaded by this site. If the integration is later enabled, the tag will load only after you choose Allow analytics; choosing reject does not load it. The cookie inventory and this notice must be checked against the live deployment before enabling measurement.",
        items: [
          "Optional analytics is not required to view the site's public pages",
          "A saved allow choice is tied to the measurement ID configured when you made that choice",
          "No advertising or cross-site ad targeting is described or enabled by this consent control",
        ],
      },
      {
        eyebrow: "04 · Infrastructure storage",
        title: "Edge security storage depends on the deployed configuration",
        body: "The project uses Cloudflare for DNS, but the application source alone cannot establish which Cloudflare security products or cookie rules are active for every visitor. Cloudflare may use strictly necessary security or bot-management cookies when the deployed configuration requires them. The exact names, purposes, domains and lifetimes must be confirmed against the production Cloudflare configuration and browser inspection; this notice does not claim a complete edge-cookie inventory.",
        items: [
          "Cloudflare DNS, AWS infrastructure, PostgreSQL, Resend email and Grafana monitoring are infrastructure providers identified by the project",
          "Those provider names do not by themselves prove that each provider sets a cookie in your browser",
          "Any essential security cookie should be limited to its security purpose and documented once verified",
        ],
      },
      {
        eyebrow: "05 · Your choices",
        title: "Allow, reject or withdraw optional analytics",
        body: "Use the preference panel to allow analytics or reject optional analytics. Rejecting does not block essential page delivery. You can reopen Cookie preferences from the footer or this page, change your choice, or remove this site's stored data in your browser. A changed choice takes effect in the current browser; other browsers and devices keep separate preferences.",
        items: [
          "Allow analytics: saves your choice and loads the configured Google Analytics tag, if an ID is active",
          "Reject optional: saves your choice and keeps optional analytics unloaded",
          "Cookie preferences in the site footer reopens the controls so you can change or withdraw the choice",
          "Clear site data for pesaguard.co.ke in browser settings to remove the local preference; the panel will ask again",
          "Clearing Google Analytics cookies in your browser is also available through site-data settings",
        ],
      },
      {
        eyebrow: "06 · Browser controls",
        title: "Manage storage in your browser settings",
        body: "Most current browsers let you inspect, block and delete cookies and site data by domain. Browser names and menu locations change over time, so use the privacy, security or site-settings area for pesaguard.co.ke. Blocking local storage resets the remembered choice; blocking cookies may limit optional analytics and can affect other site functions if those are later introduced.",
        items: [
          "Browser clearing is separate from PesaGuard's preference control",
          "Private browsing sessions may clear some or all site storage when closed",
          "Do not use browser storage to keep passwords, payment credentials or API secrets",
        ],
      },
      {
        eyebrow: "07 · Scope and updates",
        title: "Check this inventory when the live site changes",
        body: "Cookie behavior can vary by browser, Cloudflare rules and production environment variables. Before launch or whenever a tag, embed, support widget, login flow, CDN rule or analytics provider changes, the live site must be inspected for cookies and similar storage, and this notice updated with verified provider, purpose, expiry and opt-out behavior. The personal portfolio site and separate dashboard are outside this public-site inventory.",
        items: [
          "Effective date: 11 October 2026",
          "Do not treat this notice as a full inventory of the separately hosted dashboard",
          "Report a suspected mismatch between this notice and browser behavior to hello@pesaguard.co.ke",
        ],
      },
      {
        eyebrow: "08 · Contact",
        title: "Ask about the site's cookie behavior",
        body: "For questions about this notice or to request assistance exercising your choice, contact the project using the details below. Please do not send credentials, authentication tokens or payment information.",
        items: [
          "Privacy contact: hello@pesaguard.co.ke",
          "Project developer: Victor Kipruto Rop, Data Engineer",
          "Project contact: hello@victorkipruto.com · +254 723 484 552",
          "Location: Nairobi, Kenya",
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
