import { dependencyCatalogue } from "@/content/status";
import type { ServiceRow, ServiceState } from "@/types/status";

/** What a Core API health probe returns for the public status page. */
export type HealthProbe = {
  reachable: boolean;
  state: ServiceState;
  detail: string;
  endpoint: string;
  checkedAt?: string;
  services: ServiceRow[];
};

const DEFAULT_API_URL = "https://api.pesaguard.co.ke";
const healthStates: Record<string, ServiceState> = {
  ok: "operational",
  operational: "operational",
  degraded: "degraded",
  failed: "outage",
  outage: "outage",
};

function readState(value: unknown): ServiceState {
  return typeof value === "string" ? healthStates[value.toLowerCase()] ?? "unknown" : "unknown";
}

function readHealthServices(checks: unknown): ServiceRow[] {
  const healthChecks = typeof checks === "object" && checks !== null
    ? checks as Record<string, unknown>
    : {};

  return dependencyCatalogue.map((dependency) => {
    const check = healthChecks[dependency.id];
    const checkStatus = typeof check === "object" && check !== null
      ? (check as Record<string, unknown>).status
      : undefined;
    const state = readState(checkStatus);
    return {
      name: dependency.name,
      state,
      detail: state === "unknown"
        ? `${dependency.detail} The health endpoint did not return a recognized state for this check.`
        : dependency.detail,
    };
  });
}

/**
 * Probe the Core API's public health endpoint.
 *
 * The API URL can be overridden for a deployment, but defaults to the public
 * Core API. A reachable endpoint is not automatically considered operational:
 * the response must contain a recognized health state.
 */
export async function getBackendHealth(): Promise<HealthProbe> {
  const baseUrl = (process.env.PESAGUARD_API_URL || DEFAULT_API_URL).replace(/\/+$/, "");
  const endpoint = `${baseUrl}/health`;

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });

    const checkedAt = new Date().toISOString();
    let payload: Record<string, unknown> = {};
    try {
      const body: unknown = await response.json();
      if (typeof body === "object" && body !== null) {
        payload = body as Record<string, unknown>;
      }
    } catch {
      return {
        reachable: true,
        state: "unknown",
        detail: `The Core API responded with HTTP ${response.status}, but its health response was not valid JSON.`,
        endpoint,
        checkedAt,
        services: readHealthServices(undefined),
      };
    }

    const state = readState(payload.status);
    const services = readHealthServices(payload.checks);
    const componentStates = services.map((service) => service.state);
    const reportedState = componentStates.includes("outage")
      ? "outage"
      : componentStates.includes("degraded") || (!response.ok && state === "operational")
        ? "degraded"
        : state;
    return {
      reachable: true,
      state: reportedState,
      detail: state === "unknown"
        ? `The Core API responded with HTTP ${response.status}, but did not return a recognized overall health state.`
        : `Current health was reported by the Core API at ${endpoint}.`,
      endpoint,
      checkedAt,
      services,
    };
  } catch {
    return {
      reachable: false,
      state: "unknown",
      detail: "The Core API health endpoint could not be reached. Current service health is unknown.",
      endpoint,
      checkedAt: new Date().toISOString(),
      services: readHealthServices(undefined),
    };
  }
}
