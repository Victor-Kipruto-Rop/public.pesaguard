import type { HealthProbe } from "@/lib/api/client";
import type { ServiceRow, StatusSnapshot } from "@/types/status";

export function buildStatusSnapshot(probe: HealthProbe): StatusSnapshot {
  const services: ServiceRow[] = [{
    name: "Core API",
    state: probe.state,
    detail: "Overall health reported by the Core API's /health endpoint.",
  }, ...probe.services];

  return {
    live: probe.reachable,
    state: probe.state,
    headline: probe.state === "operational"
      ? "The Core API reports that measured services are operational."
      : probe.state === "degraded"
        ? "The Core API reports degraded service health."
        : probe.state === "outage"
          ? "The Core API reports a service outage."
          : "Service health could not be confirmed.",
    note: `${probe.detail} This feed reflects only checks returned by the Core API; it does not include incident history or uptime calculations.`,
    endpoint: probe.endpoint,
    checkedAt: probe.checkedAt,
    services,
  };
}