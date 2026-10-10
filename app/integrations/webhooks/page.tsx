import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Outbound webhooks | PesaGuard",
  "Understand PesaGuard's configured outbound webhook delivery, signatures, retries and dead-letter behavior.",
  "/integrations/webhooks",
);

export default function WebhooksPage() {
  return (
    <RoutePage
      slug="integrations"
      title="Webhooks that respect delivery reality."
      description="Configured outbound event delivery with signatures, recorded attempts, retries and a dead-letter path in the pilot scope."
    />
  );
}
