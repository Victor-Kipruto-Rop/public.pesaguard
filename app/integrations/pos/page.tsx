import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Point-of-sale integration status | PesaGuard",
  "POS transaction feeds and acquirer settlement imports are not available yet. Review the intended scope and requirements.",
  "/integrations/pos",
);

export default function PointOfSalePage() {
  return (
    <RoutePage
      slug="integrations"
      title="Connect the point of sale."
      description="Planned POS and acquirer reconciliation connector; no terminal feeds are ingested today."
    />
  );
}
