import { getBackendHealth } from "@/lib/api/client";
import { StatusBoard } from "@/components/sections/StatusBoard";
import { SectionShell } from "@/components/sections/SectionShell";
import { buildStatusSnapshot } from "@/lib/content/status";
import { pageMetadata } from "@/lib/seo/metadata";
import { ArrowUpRight, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata(
  "System status | PesaGuard",
  "Current health checks reported by the PesaGuard Core API.",
  "/status",
);

export default async function Status() {
  const probe = await getBackendHealth();
  const snapshot = buildStatusSnapshot(probe);
  return (
    <main className="status-page">
      <SectionShell className="status-page-intro">
        <div className="status-intro-layout">
          <div className="status-intro-copy">
            <p className="eyebrow">PesaGuard / Service status</p>
            <h1>PesaGuard service status</h1>
            <p>
              A current view of the Core API and the dependencies it reports. Each status comes
              from a health check; missing or unreachable signals stay unknown.
            </p>
          </div>
          <aside className="status-source-card" aria-label="Status data source">
            <span className="status-source-icon"><Activity aria-hidden="true" size={19} /></span>
            <div>
              <p className="status-source-label">Health feed</p>
              <a href={snapshot.endpoint} target="_blank" rel="noreferrer">
                {snapshot.endpoint.replace(/^https?:\/\//, "")}<ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <p>Checked on each page request. Only states reported by this endpoint are shown.</p>
            </div>
          </aside>
        </div>
      </SectionShell>
      <SectionShell className="status-page-content">
        <StatusBoard snapshot={snapshot} />
      </SectionShell>
    </main>
  );
}
