# Tenant onboarding frontend integration guide

## Current state

The public onboarding journey is a frontend preview. It does not create accounts, send email, verify tokens, approve tenants, provision workspaces, issue sessions, or grant access. The UI calls this out explicitly. Replace the preview interactions with the Core API adapter before presenting the journey as live.

## Routes

| Route | Responsibility |
| --- | --- |
| `/get-started` | Collect account, organization, intended reconciliation setup and consent; review before registration. |
| `/onboarding/verify-email` | Explain email verification, display delivery state, support safe resend and consume a verification link. |
| `/onboarding/status` | Render authoritative request status and the next action returned by the API. |
| `/onboarding/setup` | Prepare team invitations, internal record source and sandbox readiness. |
| `/onboarding/complete` | Show backend-confirmed readiness and link to the tenant app. |
| `/login` | Authenticate with the Core API. |
| `/forgot-password` | Request a reset link using a generic, non-enumerating response. |
| `/invite/accept` | Validate an invitation token and accept membership only after server authorization. |

## Suggested API contract (proposed; not implemented here)

The names below are an integration proposal for the frontend/backend handoff, not a claim that these routes currently exist.

### 1. Register

`POST /api/v1/public/onboarding-requests`

Request:
- `applicant.full_name`
- `applicant.email`
- `applicant.phone`
- `applicant.password`
- `organization.name`
- `organization.type`
- `organization.country`
- `setup.payment_source`
- `setup.expected_monthly_volume`
- `setup.internal_record_source`
- `consent: true`
- `requested_environment: "sandbox"`

Return a stable `request_id`, a non-sensitive onboarding `status`, and a verification-delivery state. Never return password hashes, verification tokens, secrets, or internal approval notes.

### 2. Verify email

A suggested endpoint is `POST /api/v1/public/onboarding-requests/verify-email`, with a single-use, short-lived token. Do not mark the UI verified from a query parameter alone; the server must validate the token and return the authoritative next stage. Resend should be rate-limited and use a response that does not expose whether an email is registered.

### 3. Read status

A suggested authenticated or capability-protected endpoint is `GET /api/v1/public/onboarding-requests/{request_id}`. Return only fields the current user is permitted to see. Expected states may include `email_verification`, `review_pending`, `approved`, `rejected`, `provisioning`, and `ready`; align this enum with the actual backend before connecting it.

### 4. Complete setup

A suggested endpoint is `POST /api/v1/tenants/{tenant_id}/onboarding/setup` after identity and tenant authorization are established. It may accept invitation email addresses, record-source selection and requested sandbox environment. Send invitations server-side only after validating permissions. Do not collect Daraja consumer secrets or payment PINs in this public form.

### 5. Login and dashboard handoff

Connect `/login` to the real authentication endpoint. Prefer secure, HttpOnly, Secure, SameSite cookies or the established application session pattern. Do not store bearer tokens or session identifiers in localStorage/sessionStorage. The UI may link to `https://app.pesaguard.co.ke`, but access control must be enforced by the application/API; a redirect is not authorization.

## Required security behavior

- Server-side validation for every field and all state transitions.
- Password hashing and credential policy on the backend; password never persisted in browser storage.
- Verification and password-reset tokens must be high entropy, single use, expiring and invalidated after use.
- Rate limiting, abuse protection and generic responses for registration, login, resend and recovery.
- Explicit tenant membership checks on every tenant-scoped request; never trust a client-provided tenant ID.
- Idempotent registration/provisioning to avoid duplicate organizations after retries.
- Audit registration, approval, provisioning, invitation and membership changes server-side.
- Keep production access separate from sandbox onboarding and require explicit server-side approval.
- The UI must render only API-confirmed statuses and errors; it must not infer that email was sent, identity verified or tenant provisioning succeeded.

## Connecting the UI

The typed frontend contract lives in `lib/onboarding/contracts.ts`. Implement a concrete `TenantOnboardingApi` adapter against the actual Core API schemas, then replace the preview-only handlers in the page components. Update `TENANT_ONBOARDING_PREVIEW_MODE` only after the real endpoints, cookie/session behavior, and error handling have been tested. The frontend currently has no live API adapter.
