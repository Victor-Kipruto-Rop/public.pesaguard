import { RefreshCw } from "lucide-react";
import { Badge, StatusDot } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { StatusSnapshot } from "@/types/status";

export function StatusBoard({ snapshot }: { snapshot: StatusSnapshot }) {
  return (
    <div className="status-board-layout">
      <section className={`status-summary status-summary-${snapshot.state}`} aria-labelledby="status-summary-title">
        <div className="status-summary-copy">
          <Badge dot={snapshot.live} tone={snapshot.live ? "live" : "neutral"}>
            {snapshot.live ? "Live API response" : "No live response"}
          </Badge>
          <h2 id="status-summary-title">{snapshot.headline}</h2>
          <p>{snapshot.note}</p>
          <div className="status-summary-meta">
            {snapshot.checkedAt ? <span>Checked {new Date(snapshot.checkedAt).toISOString()}</span> : null}
          </div>
        </div>
        <div className="status-summary-actions">
          <StatusDot state={snapshot.state} />
          <Button href="/status" variant="quiet" trailing={<RefreshCw aria-hidden="true" size={15} />}>
            Check again
          </Button>
        </div>
      </section>

      <section aria-labelledby="status-components-title">
        <div className="status-components-heading">
          <div>
            <p className="eyebrow">Health checks</p>
            <h2 id="status-components-title">Monitored components</h2>
          </div>
          <span>Source: Core API /health</span>
        </div>
        <div className="status-board">
          {snapshot.services.map((service) => (
            <article className="status-row" key={service.name}>
              <div className="status-row-copy">
                <strong>{service.name}</strong>
                <span>{service.detail}</span>
              </div>
              <StatusDot state={service.state} />
            </article>
          ))}
        </div>
      </section>
      <p className="status-scope-note">
        A successful provider connectivity check does not confirm that individual payments or reconciliation flows are processing end to end. Incident history and uptime reporting are not included in this feed.
      </p>
    </div>
  );
}
