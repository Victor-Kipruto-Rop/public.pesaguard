/**
 * Frontend contract for tenant onboarding.
 *
 * The UI deliberately runs in preview mode until the owner connects the Core API.
 * Implement these methods in an adapter when the backend endpoints and response
 * schemas are ready. Never treat local preview state as verified identity,
 * tenant approval, provisioning, or an authenticated session.
 */
export type OrganizationType = "SACCO" | "Merchant / retailer" | "E-commerce" | "Fintech" | "Financial institution" | "Other organization";
export type OnboardingStage = "email_verification" | "review_pending" | "approved" | "rejected" | "provisioning" | "ready";
export type OnboardingRegistrationRequest = {
  applicant: { full_name: string; email: string; phone: string; password: string };
  organization: { name: string; type: OrganizationType; country: string };
  setup: { payment_source: string; expected_monthly_volume: string; internal_record_source: string };
  consent: boolean;
  requested_environment: "sandbox";
};
export type OnboardingRegistrationResponse = { request_id: string; status: OnboardingStage; verification_delivery?: "sent" | "queued" };
export type OnboardingStatusResponse = { request_id: string; status: OnboardingStage; organization_name: string; next_action?: string; updated_at?: string };
export interface TenantOnboardingApi {
  register(request: OnboardingRegistrationRequest): Promise<OnboardingRegistrationResponse>;
  verifyEmail(token: string): Promise<{ verified: boolean; next_stage: OnboardingStage }>;
  resendVerification(email: string): Promise<{ accepted: boolean }>;
  getStatus(requestId: string): Promise<OnboardingStatusResponse>;
  completeSetup(input: { request_id: string; invite_emails: string[]; record_source: string; requested_environment: "sandbox" }): Promise<OnboardingStatusResponse>;
}
export const TENANT_ONBOARDING_PREVIEW_MODE = true;
