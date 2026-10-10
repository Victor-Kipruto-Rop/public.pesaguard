import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Airtel Money integration status | PesaGuard",
  "Airtel Money is not connected yet. Review the planned scope, prerequisites and current limitations.",
  "/integrations/airtel-money",
);

export default function AirtelMoneyPage() {
  return (
    <RoutePage
      slug="integrations"
      title="Connect Airtel Money without losing context."
      description="Planned Airtel Money reconciliation connector; not available to connect yet."
    />
  );
}
