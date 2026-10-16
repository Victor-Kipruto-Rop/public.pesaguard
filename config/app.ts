/** Canonical customer application URL. */
export const tenantAppUrl = process.env.NEXT_PUBLIC_TENANT_APP_URL ?? "https://app.pesaguard.co.ke";

export const tenantAppRoutes = {
  home: tenantAppUrl,
  signIn: tenantAppUrl,
  getStarted: tenantAppUrl,
} as const;
