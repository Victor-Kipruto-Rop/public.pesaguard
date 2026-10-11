/** Runtime state of one PesaGuard service, shown on the status page. */
export type ServiceState = "operational" | "degraded" | "outage" | "unknown";

/** A health signal a reader can act on. */
export type ServiceRow = {
  name: string;
  state: ServiceState;
  detail: string;
};

/** What the status page renders. */
export type StatusSnapshot = {
  /** True when the Core API returned an HTTP response for the health request. */
  live: boolean;
  state: ServiceState;
  headline: string;
  note: string;
  endpoint: string;
  checkedAt?: string;
  services: ServiceRow[];
};
