# PesaGuard public website — page-by-page quality and protocol audit

**Repository:** `Victor-Kipruto-Rop/public.pesaguard`  
**Domain:** `https://pesaguard.co.ke`  
**Reference design:** `Victor-Kipruto-Rop/developer.plartform/frontend`  
**Audit branch:** `fix/frontend-asset-recovery-from-main`  
**Review type:** Source-level route/content/component audit. This is not a claim that the production site has passed browser, accessibility, security or deployment tests.

## Acceptance standard for every page

A page is not considered premium merely because it has a large hero. It should provide:
- A specific title and useful introduction, not a generic parent-page body under a changed heading.
- Enough page-specific substance for the route's purpose: process, controls, constraints, examples, decision guidance, FAQs or related next steps as appropriate.
- A consistent PesaGuard forest-green/mint visual system, first-party logo/favicon, responsive layout, readable type, restrained motion and visible keyboard focus.
- Honest maturity labels: **M-Pesa (Safaricom Daraja) is the active payment scope**; outbound webhooks are described only to the extent implemented; Airtel Money, bank rails and POS must remain explicitly marked not started until adapters and tests exist.
- No invented uptime, customer counts, compliance certifications, fraud-prevention guarantees, production readiness or roadmap dates.
- Useful loading, empty, error and unknown states; no fake operational metrics; no sensitive secrets in examples, URLs or logs.
- Page-specific metadata, correct internal links, meaningful heading hierarchy, accessible forms and working in-page navigation.
- Mobile and desktop runtime checks before a merge or production claim.

## Page-by-page inventory

The sitemap defines 51 public routes. The matrix below records each route's implementation shape and the content/protocol checks it needs. “Source-reviewed” does not mean runtime-verified.

| Route | Page purpose / implementation | Audit result and required protocol |
|---|---|---|
| `/` | Bespoke homepage: transaction pipeline, live-feed-style demo, reconciliation demo, use-case tabs, FAQ and security/observability sections | Rich bespoke experience. Keep demo/simulated UI clearly illustrative; distinguish current pilot scope from roadmap rails; never present sample feed values as live production telemetry. |
| `/product` | Long-form product page | Content-driven page with workflow, comparison, scope and related paths. Preserve the MVP/pilot maturity label and active M-Pesa boundary. |
| `/solutions` | Solutions index | Explain cross-industry problems, then route visitors to specific solutions. Avoid implying all payment rails are supported. |
| `/solutions/saccos` | SACCO detail | Must focus on member collections, loan repayments, exceptions and evidence; avoid implying PesaGuard replaces the SACCO's accounting/core banking system. |
| `/solutions/merchants` | Merchant detail | Focus on mobile-money collections and settlement comparison; state POS/acquirer feeds are not ingested until implemented. |
| `/solutions/financial-institutions` | Institution detail | Emphasize role boundaries, evidence and oversight without claiming regulatory certification. |
| `/solutions/fintechs` | Fintech detail | Explain API-first operations and exception workflows; make pilot availability explicit. |
| `/how-it-works` | End-to-end workflow | Keep the callback → validation/idempotency → matching → exception/review → audit flow technically accurate. |
| `/features` | Capability index | Show availability labels and link to dedicated feature pages; do not describe planned work as shipped. |
| `/features/reconciliation` | Reconciliation detail | Explain match inputs, deterministic outcomes, unmatched records and exception review; do not promise every provider is integrated. |
| `/features/transaction-monitoring` | Monitoring detail | Explain signals and limits; avoid fabricated live metrics. |
| `/features/fraud-detection` | Risk/anomaly detail | Signals support investigation; never claim an algorithm proves fraud or guarantees loss prevention. |
| `/features/real-time-alerts` | Alerting detail | State channels and delivery guarantees only where implemented; distinguish retry behaviour from guaranteed delivery. |
| `/features/reporting` | Reporting detail | Explain report scope and source data; do not imply unsupported exports or accounting integrations. |
| `/features/audit-trail` | Audit evidence detail | Explain actor, reason, timestamps and append-only intent; retention/deletion language must match actual storage controls. |
| `/features/data-quality` | Validation detail | Explain validation and quarantine outcomes; never silently describe rejected input as successful. |
| `/security` | Security overview | Describe defence-in-depth without claiming independent certification or production readiness. |
| `/security/encryption` | Encryption detail | Keep claims aligned to actual transport, storage and key-management configuration per environment. |
| `/security/authentication` | Authentication detail | Describe supported credentials and token handling accurately; do not expose secrets or promise unimplemented MFA. |
| `/security/access-control` | Authorization detail | Explain server-side permissions and role boundaries; enforce rather than merely document tenant/role checks. |
| `/security/tenant-isolation` | Tenant isolation detail | Claims about database enforcement and zero cross-tenant results must remain tied to reproducible tests; do not turn a test result into a universal guarantee. |
| `/security/compliance` | Governance/compliance detail | Present controls and operational practices, not a claim of certification or legal compliance unless independently substantiated. |
| `/integrations` | Integration index | Clearly separate available integrations from planned/not-started connectors. |
| `/integrations/mpesa` | Active M-Pesa/Daraja detail | Describe callback validation, OAuth/configuration, idempotency and failure paths only as supported by code and tests. |
| `/integrations/airtel-money` | Planned integration | Prominently state no adapter exists yet; no CTA or copy should imply it can be connected today. |
| `/integrations/banks` | Planned integration | State bank rails/files are not imported today; avoid suggesting settlement-file support is live. |
| `/integrations/pos` | Planned integration | State terminal/acquirer feeds are not ingested today. |
| `/integrations/webhooks` | Webhook detail | Separate inbound provider callbacks from outbound event delivery; explain signatures, idempotency, retries and dead letters only to the implemented extent. |
| `/pricing` | Pilot/commercial scope | Avoid fake public prices or a billing prerequisite; scope pilots with volume, source, retention and support expectations. |
| `/documentation` | Documentation index | Must guide developers to the correct current API base, credential header and supported endpoints. |
| `/documentation/getting-started` | Working quick start | Hand-authored, includes request/response examples and retry guidance. Revalidate examples against the deployed API contract before release. |
| `/documentation/authentication` | Auth guide | Ensure header name, key lifecycle, permissions and environment behaviour match the live API. |
| `/documentation/transactions` | Transaction reference | Validate field names, status codes and response shape against OpenAPI/live contract. |
| `/documentation/discrepancies` | Exception guide | Verify routes, permissions and state transitions against implemented backend endpoints. |
| `/documentation/idempotency` | Retry-safety guide | Explain key scope, conflict behaviour and replay semantics exactly as implemented. |
| `/documentation/errors` | Error guide | Use stable error shapes and accurate retryability; avoid advising retries for validation/auth failures. |
| `/documentation/rate-limits` | Rate-limit guide | Publish only configured limits and actual response headers; otherwise label limits as deployment-specific. |
| `/documentation/reconciliation` | Matching guide | Explain actual matching fields, tolerance and exception reasons without suggesting every rail is active. |
| `/documentation/webhooks` | Webhook guide | Specify signing, retry schedule and replay protection only where backed by implementation/tests. |
| `/documentation/fraud` | Risk guide | Keep model/rule descriptions interpretable; signal is not a fraud verdict. |
| `/documentation/changelog` | Change history | Entries must correspond to shipped changes and dates; do not invent releases. |
| `/api` | API capability/status page | Distinguish implemented endpoints from planned surface area and point to the canonical docs/API domain. |
| `/about` | Company/product principles | Keep the story factual and aligned to current product maturity; avoid invented team/customer claims. |
| `/contact` | General contact form | The UI must state if submission opens a mail draft rather than creating a ticket. Do not imply guaranteed delivery or response SLAs. |
| `/contact/sales` | Sales/pilot enquiry | Ask for only useful qualification details; do not collect credentials or sensitive payment data. |
| `/contact/support` | Support route | Clearly explain the actual contact mechanism and what context to include; no fake ticket status. |
| `/status` | Backend health/status page | Must show live probe result or explicit unknown/unavailable; no green/healthy default when the probe fails. |
| `/status/incidents` | Incident history | Must describe actual incidents or clearly state when no published incident entries exist; must not inherit generic security copy. |
| `/privacy` | Privacy notice | **Fixed in this audit:** now has dedicated privacy sections, clear scope, purpose, sharing, retention and rights language. Requires legal review against real vendor/data flows before production. |
| `/terms` | Terms of use | **Fixed in this audit:** now has dedicated terms content covering pilot maturity, customer responsibilities and no unsupported production guarantees. Requires legal review before being treated as a binding contract. |
| `/cookies` | Cookie/storage notice | **Fixed in this audit:** now has dedicated content and explicitly says deployed cookies/scripts must be inventoried; browser scan still required. |
| `/status/incidents` | Incident communication detail | Dedicated detail content exists in the content modules; confirm it renders as incident-specific information and never implies an incident occurred without a record. |

## Source-level defects found and corrected in this pass

1. **Legal pages were reusing the About page body.** The privacy, terms and cookies route components all passed `slug="about"`; their headings changed but their body was inherited from the About page. Added dedicated content in `content/legal.ts`, resolved it by legal route, and corrected each route's slug and metadata.
2. **Legal table-of-contents links did not navigate to their sections.** Every link pointed back to the page root. Added stable section IDs and matching fragment links.
3. **Legal pages lacked meaningful route-specific metadata.** Added dedicated title and description metadata for privacy, terms and cookies.
4. **Contact, sales and support pages were thin single-screen forms.** Added a shared, detailed contact experience with route-specific preparation guidance, safe-information reminders, next-step resources and explicit mail-draft limitations. Added route metadata for support and clarified that the configured mailbox must be verified before launch.

## Protocol rules to keep enforced

- **Scope truth:** M-Pesa/Daraja is the active rail. Airtel Money, banks and POS stay marked not started until real adapters, tests and docs exist.
- **No false production claims:** MVP/pilot and hardening status must be visible. A successful unit/load test is evidence for that test, not a universal security guarantee.
- **Tenant isolation:** enforce at the server/database boundary, test cross-tenant negative cases, and never trust a tenant ID supplied by a client without authorization.
- **Idempotency and retries:** examples must use safe keys; retry guidance must match status codes and actual server behaviour.
- **Secret hygiene:** no API keys, bearer tokens, passwords or payment secrets in source examples, logs, query strings or client storage.
- **Risk decisions:** anomaly scores are review signals, not automatic fraud verdicts.
- **Privacy and compliance:** do not claim certifications or legal compliance without evidence; synchronize policy copy with actual deployment and obtain legal review.
- **Accessibility and responsive design:** semantic headings, keyboard operation, visible focus, accessible validation, reduced-motion support and narrow-screen layouts.
- **Failure states:** status/health unknown is not healthy; forms must explain what happens on submit; no fake live metrics or false success states.
- **Quality gate:** lint, typecheck, tests, production build, link/metadata checks, browser console/network checks and desktop/mobile screenshots must pass before merge. CI currently has a known failure and browser checks have not been run in this audit.

## Remaining work / release blockers

- Run the complete quality gate and investigate the failing GitHub Actions check before merging.
- Run automated broken-link and sitemap checks across every route.
- Review every docs example against the live API/OpenAPI contract.
- Browser-test all route families at mobile, tablet and desktop widths; verify navigation, forms, focus, reduced motion, empty/error states, favicon and canonical URLs.
- Scan the deployed site for cookies, local storage, third-party scripts and outbound requests; update the cookie/privacy notices to the observed inventory.
- Have legal counsel review the privacy notice and terms before production use.
- Verify that status and incident routes reflect real service/incident data rather than static or illustrative content.

## Verification statement

The source changes and content paths have been inspected through the repository integration. No local install, lint, typecheck, unit test, production build or browser run has been executed in this pass. This report does not mark those checks as passed.
