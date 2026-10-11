import type { NextConfig } from "next";

type Header = { key: string; value: string };
const docsBaseUrl = "https://docs.pesaguard.co.ke/";

/**
 * Baseline security headers for every route.
 *
 * The CSP allows inline scripts and styles because Next.js injects inline
 * hydration data and the pages carry JSON-LD; a nonce-based CSP would require
 * dynamic rendering for every route. External origins are limited to Google
 * Fonts, which styles/globals.css imports. The CSP is production-only because
 * the dev server needs eval for fast refresh.
 */
export function securityHeaders(production: boolean, googleAnalyticsEnabled = false): Header[] {
  const headers: Header[] = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    { key: "Strict-Transport-Security", value: "max-age=31536000" },
  ];

  if (production) {
    const analyticsScript = googleAnalyticsEnabled ? " https://www.googletagmanager.com" : "";
    const analyticsConnect = googleAnalyticsEnabled
      ? " https://www.google-analytics.com https://region1.google-analytics.com"
      : "";
    const analyticsImage = googleAnalyticsEnabled
      ? " https://www.google-analytics.com https://stats.g.doubleclick.net"
      : "";
    headers.push({
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        `script-src 'self' 'unsafe-inline'${analyticsScript}`,
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com",
        `img-src 'self' data:${analyticsImage}`,
        `connect-src 'self'${analyticsConnect}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join("; "),
    });
  }

  return headers;
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/documentation", destination: docsBaseUrl, permanent: true },
      { source: "/documentation/getting-started", destination: `${docsBaseUrl}getting-started/quickstart.html`, permanent: true },
      { source: "/documentation/authentication", destination: `${docsBaseUrl}security/`, permanent: true },
      { source: "/documentation/transactions", destination: `${docsBaseUrl}api/`, permanent: true },
      { source: "/documentation/discrepancies", destination: `${docsBaseUrl}guides/`, permanent: true },
      { source: "/documentation/idempotency", destination: `${docsBaseUrl}concepts/`, permanent: true },
      { source: "/documentation/errors", destination: `${docsBaseUrl}errors/`, permanent: true },
      { source: "/documentation/rate-limits", destination: `${docsBaseUrl}api/`, permanent: true },
      { source: "/documentation/reconciliation", destination: `${docsBaseUrl}guides/`, permanent: true },
      { source: "/documentation/webhooks", destination: `${docsBaseUrl}webhooks/`, permanent: true },
      { source: "/documentation/fraud", destination: `${docsBaseUrl}concepts/`, permanent: true },
      { source: "/documentation/changelog", destination: `${docsBaseUrl}changelog/`, permanent: true },
      { source: "/documentation/:path*", destination: docsBaseUrl, permanent: true },
      { source: "/api/authentication", destination: `${docsBaseUrl}security/`, permanent: true },
      { source: "/api/transactions", destination: `${docsBaseUrl}api/`, permanent: true },
      { source: "/api/reconciliation", destination: `${docsBaseUrl}guides/`, permanent: true },
      { source: "/api/fraud", destination: `${docsBaseUrl}concepts/`, permanent: true },
      { source: "/api/webhooks", destination: `${docsBaseUrl}webhooks/`, permanent: true },
      { source: "/api/reference", destination: "/api", permanent: true },
    ];
  },
  async headers() {
    const googleAnalyticsEnabled = /^G-[A-Z0-9]+$/i.test(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    );
    return [{
      source: "/:path*",
      headers: securityHeaders(process.env.NODE_ENV === "production", googleAnalyticsEnabled),
    }];
  },
};

export default nextConfig;
