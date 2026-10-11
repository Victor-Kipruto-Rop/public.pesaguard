/** Dependency checks exposed by the Core API's public `/health` endpoint. */
export const dependencyCatalogue = [
  { id: "database", name: "Database", detail: "Database connectivity reported by the Core API." },
  { id: "kafka", name: "Event processing", detail: "Kafka connectivity reported by the Core API." },
  { id: "redis", name: "Cache", detail: "Redis connectivity reported by the Core API." },
  { id: "daraja", name: "Daraja provider", detail: "Daraja connectivity check reported by the Core API." },
] as const;
