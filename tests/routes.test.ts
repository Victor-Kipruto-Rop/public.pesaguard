import { describe, expect, it } from "vitest";
import { navigation } from "@/config/navigation";
import { integrations } from "@/config/integrations";
import { pages } from "@/content/pages";
import { detailPages } from "@/content/detail";

const routes = ["/", "/product", "/solutions", "/features", "/security", "/integrations", "/api", "/about", "/contact", "/status", "/privacy", "/terms", "/cookies", "/how-it-works"];

describe("public route contract", () => {
  it("keeps the primary routes explicit", () => {
    expect(routes).toHaveLength(14);
    expect(routes).toContain("/status");
    expect(routes).not.toContain("/pricing");
  });

  it("only links to routes that exist", () => {
    const known = new Set(routes);
    const linked = new Set<string>();

    for (const item of navigation.primary) {
      linked.add(item.href);
      for (const group of item.groups ?? []) {
        for (const link of group.links) {
          linked.add(link.href);
        }
      }
      if (item.foot) {
        linked.add(item.foot.href);
      }
    }
    for (const group of navigation.footer) {
      for (const link of group.links) {
        linked.add(link.href);
      }
    }
    for (const integration of integrations) {
      linked.add(integration.href);
    }

    const dynamicPrefixes = ["/features/", "/solutions/", "/integrations/", "/security/", "/api/", "/contact/", "/status/"];
    for (const href of linked) {
      if (!href.startsWith("/")) continue;
      const route = href.split("#")[0];
      const knownRoute = known.has(route) || dynamicPrefixes.some((prefix) => route.startsWith(prefix));
      expect(knownRoute, `navigation links to unknown route ${href}`).toBe(true);
    }
  });

  it("links to customer requirements from the Product menu", () => {
    const productMenu = navigation.primary.find((item) => item.label === "Product");
    const links = productMenu?.groups?.flatMap((group) => group.links) ?? [];

    expect(links).toContainEqual(expect.objectContaining({
      label: "Customer requirements",
      href: "/how-it-works#customer-requirements",
    }));
  });

  it("keeps documentation out of the primary navigation and links developers externally", () => {
    expect(navigation.primary.some((item) => item.label === "Docs")).toBe(false);
    expect(navigation.primary.some((item) => item.href.startsWith("/documentation"))).toBe(false);
    const developerLinks = navigation.footer.find((group) => group.title === "Developers")?.links ?? [];
    expect(developerLinks.some((link) => link.href.startsWith("/documentation"))).toBe(false);
    expect(developerLinks.find((link) => link.label === "Get started")?.href).toBe(
      "https://docs.pesaguard.co.ke/getting-started/quickstart.html",
    );
  });
});

describe("public product overview content", () => {
  it("states the pilot scope and review boundaries", () => {
    const product = pages.product;

    expect(product.status?.availability).toBe("pilot");
    expect(product.status?.note).toContain("Safaricom Daraja");
    expect(product.faq?.some((item) => item.question.includes("prevent fraud"))).toBe(true);
    expect(product.faq?.some((item) => item.answer.includes("not proof of fraud"))).toBe(true);
    expect(product.title).toBe("A clearer payment operation.");
    expect(product.faq).toHaveLength(8);
  });
});

describe("how-it-works page claims", () => {
  it("limits the published flow to the Daraja pilot and human review", () => {
    const howItWorks = pages["how-it-works"];

    expect(howItWorks.status?.availability).toBe("pilot");
    expect(howItWorks.status?.note).toContain("Safaricom Daraja M-Pesa");
    expect(howItWorks.description).toContain("compares them with business records");
    expect(howItWorks.faq?.some((item) => item.answer.includes("reason to review"))).toBe(true);
    expect(howItWorks.sections).toHaveLength(0);
  });
});

describe("security page claims", () => {
  it("states pilot maturity and asks customers to verify deployment-specific controls", () => {
    const security = pages.security;

    expect(security.status?.availability).toBe("pilot");
    expect(security.status?.note).toContain("Production hardening is in progress");
    expect(security.title).toBe("Security controls you can review.");
    expect(security.description).toContain("deployment-specific evidence");
    expect(security.faq).toHaveLength(7);
    expect(security.faq?.some((item) => item.question.includes("certification") && item.answer.includes("No third-party security certification is currently claimed"))).toBe(true);
    expect(security.faq?.some((item) => item.question.includes("data kept separate") && item.answer.includes("not proof that every route"))).toBe(true);
    expect(security.faq?.some((item) => item.question.includes("backups") && item.answer.includes("does not claim a tested backup restoration"))).toBe(true);
    expect(security.faq?.some((item) => item.question.includes("callbacks") && item.answer.includes("exact signature scheme"))).toBe(true);
  });
});

describe("reconciliation feature content", () => {
  it("explains the workflow and keeps support claims within the Daraja pilot", () => {
    const reconciliation = detailPages["Reconciliation you can explain."];

    expect(reconciliation.status?.availability).toBe("pilot");
    expect(reconciliation.status?.label).toContain("Safaricom Daraja M-Pesa");
    expect(reconciliation.steps).toHaveLength(6);
    expect(reconciliation.spec?.find((item) => item.label === "Engine defaults")?.value).toContain("900 seconds");
    expect(reconciliation.faq).toHaveLength(8);
    expect(reconciliation.faq?.some((item) => item.answer.includes("not confirmation that funds settled"))).toBe(true);
    expect(reconciliation.faq?.some((item) => item.answer.includes("not proof of fraud"))).toBe(true);
    expect(reconciliation.faq?.some((item) => item.answer.includes("bank statement imports") && item.answer.includes("not represented as connected"))).toBe(true);
  });
});

describe("feature overview content", () => {
  it("covers the payment-accountability workflow and all seven features", () => {
    const features = pages.features;
    const featureTitles = features.features?.map((feature) => feature.title) ?? [];

    expect(features.status?.availability).toBe("pilot");
    expect(features.title).toContain("clear record");
    expect(features.lede).toContain("what was received");
    expect(features.status?.note).toContain("Safaricom Daraja M-Pesa");
    expect(featureTitles).toHaveLength(7);
    expect(featureTitles).toContain("Data quality");
    expect(features.features?.find((feature) => feature.title === "Fraud signals")?.body).toContain("not a fraud finding");
  });
});

describe("data-quality feature content", () => {
  it("explains the implemented checks, failure handling and product boundaries", () => {
    const quality = detailPages["Trust the data before you act."];
    const allCopy = [
      quality.lede,
      ...(quality.capabilities?.map((item) => `${item.title} ${item.body} ${(item.items ?? []).join(" ")}`) ?? []),
      ...quality.sections.map((item) => `${item.title} ${item.body} ${(item.items ?? []).join(" ")}`),
      ...(quality.faq?.map((item) => `${item.question} ${item.answer}`) ?? []),
    ].join(" ");

    expect(quality.status?.availability).toBe("pilot");
    expect(quality.status?.note).toContain("Safaricom Daraja M-Pesa");
    expect(quality.spec?.find((item) => item.label === "Rule set")?.value).toContain("7");
    expect(allCopy).toContain("tenant ID");
    expect(allCopy).toContain("schema version");
    expect(allCopy).toContain("quarantine");
    expect(allCopy).toContain("does not prove settlement");
    expect(allCopy).toContain("Duplicate prevention is handled by idempotency");
    expect(quality.related).toBeUndefined();
    expect(quality.faq).toHaveLength(5);
  });
});

describe("transaction monitoring feature content", () => {
  it("explains lifecycle states, human follow-up and Daraja pilot boundaries", () => {
    const monitoring = detailPages["See transaction flows as they change."];
    const allCopy = [
      monitoring.title,
      monitoring.lede,
      ...(monitoring.capabilities?.map((item) => `${item.title} ${item.body}`) ?? []),
      ...(monitoring.steps?.map((item) => `${item.title} ${item.body}`) ?? []),
      ...(monitoring.faq?.map((item) => `${item.question} ${item.answer}`) ?? []),
    ].join(" ");

    expect(monitoring.status?.availability).toBe("pilot");
    expect(monitoring.status?.note).toContain("Safaricom Daraja M-Pesa");
    expect(monitoring.steps).toHaveLength(3);
    expect(monitoring.capabilities).toHaveLength(3);
    expect(monitoring.faq).toHaveLength(5);
    expect(monitoring.title).toContain("Know where each payment");
    expect(allCopy).toContain("does not confirm settlement");
    expect(allCopy).toContain("RECONCILING");
    expect(allCopy).toContain("does not prove fraud");
    expect(allCopy).toContain("always-on live dashboard");
    expect(monitoring.related).toBeUndefined();
  });
});
