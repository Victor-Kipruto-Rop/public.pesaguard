import { afterEach, describe, expect, it, vi } from "vitest";
import { getBackendHealth } from "@/lib/api/client";
import { buildStatusSnapshot } from "@/lib/content/status";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Core API status probe", () => {
  it("reads overall and dependency states from the live health response", async () => {
    vi.stubEnv("PESAGUARD_API_URL", "https://api.pesaguard.co.ke/");
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "ok",
      checks: {
        database: { status: "ok" },
        kafka: { status: "degraded" },
        redis: { status: "ok" },
        daraja: { status: "failed" },
      },
    }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const probe = await getBackendHealth();
    const snapshot = buildStatusSnapshot(probe);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.pesaguard.co.ke/health",
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(snapshot.live).toBe(true);
    expect(snapshot.state).toBe("outage");
    expect(snapshot.headline).toContain("reports a service outage");
    expect(snapshot.services.map(({ name, state }) => [name, state])).toEqual([
      ["Core API", "outage"],
      ["Database", "operational"],
      ["Event processing", "degraded"],
      ["Cache", "operational"],
      ["Daraja provider", "outage"],
    ]);
    expect(snapshot.note).toContain("does not include incident history");
  });

  it("reports operational only when the health response and measured checks are healthy", async () => {
    vi.stubEnv("PESAGUARD_API_URL", "https://api.pesaguard.co.ke");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "ok",
      checks: {
        database: { status: "ok" },
        kafka: { status: "ok" },
        redis: { status: "ok" },
        daraja: { status: "ok" },
      },
    }), { status: 200 })));

    const probe = await getBackendHealth();

    expect(probe.state).toBe("operational");
    expect(probe.services.every(({ state }) => state === "operational")).toBe(true);
  });

  it("does not convert an unhealthy HTTP response into operational status", async () => {
    vi.stubEnv("PESAGUARD_API_URL", "https://api.pesaguard.co.ke");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "failed",
      checks: { database: { status: "failed" } },
    }), { status: 503 })));

    const probe = await getBackendHealth();

    expect(probe.reachable).toBe(true);
    expect(probe.state).toBe("outage");
    expect(probe.services[0]).toMatchObject({ name: "Database", state: "outage" });
  });

  it("leaves unknown or malformed API health data unknown", async () => {
    vi.stubEnv("PESAGUARD_API_URL", "https://api.pesaguard.co.ke");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      status: "healthy-ish",
      checks: { database: { status: "healthy-ish" } },
    }), { status: 200 })));

    const probe = await getBackendHealth();

    expect(probe.reachable).toBe(true);
    expect(probe.state).toBe("unknown");
    expect(probe.services.every(({ state }) => state === "unknown")).toBe(true);
  });

  it("reports unreachable Core API health as unknown", async () => {
    vi.stubEnv("PESAGUARD_API_URL", "https://api.pesaguard.co.ke");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("network error")));

    const probe = await getBackendHealth();

    expect(probe.reachable).toBe(false);
    expect(probe.state).toBe("unknown");
    expect(probe.endpoint).toBe("https://api.pesaguard.co.ke/health");
  });
});
