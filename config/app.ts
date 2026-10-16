/** Public entry points for customer acquisition and the tenant application. */
export const tenantAppUrl = process.env.NEXT_PUBLIC_TENANT_APP_URL ?? "https://app.pesaguard.co.ke";
export const publicSignInUrl = "/login";
export const publicGetStartedUrl = "/get-started";

export const tenantAppRoutes = {
  home: tenantAppUrl,
  signIn: publicSignInUrl,
  getStarted: publicGetStartedUrl,
  dashboard: tenantAppUrl,
} as const;
