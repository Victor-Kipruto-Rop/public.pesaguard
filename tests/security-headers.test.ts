import { describe, expect, it } from "vitest";
import { securityHeaders } from "../next.config";

const byKey = (production: boolean) =>
  Object.fromEntries(securityHeaders(production).map((header) => [header.key, header.value]));

describe("security headers", () => {
  it("always sends the baseline headers", () => {
    const headers = byKey(false);
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Referrer-Policy"]).toBeDefined();
    expect(headers["Permissions-Policy"]).toBeDefined();
    expect(headers["Strict-Transport-Security"]).toBeDefined();
    expect(headers["Content-Security-Policy"]).toBeUndefined();
  });

  it("adds a CSP in production that blocks framing and plugins", () => {
    const csp = byKey(true)["Content-Security-Policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("https://fonts.googleapis.com");
    expect(csp).toContain("https://fonts.gstatic.com");
    expect(csp).not.toContain("googletagmanager.com");
  });

  it("allows Google Analytics origins only when an analytics ID is configured", () => {
    const csp = Object.fromEntries(securityHeaders(true, true).map((header) => [header.key, header.value]))[
      "Content-Security-Policy"
    ];
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://www.google-analytics.com");
    expect(csp).toContain("https://region1.google-analytics.com");
  });
});
