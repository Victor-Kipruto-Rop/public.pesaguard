import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Bank reconciliation integration status | PesaGuard",
  "Bank APIs and statement imports are not available yet. Review the planned reconciliation scope and prerequisites.",
  "/integrations/banks",
);

export default function BanksPage() {
  return (
    <RoutePage
      slug="integrations"
      title="Make bank settlement data useful."
      description="Planned bank statement and settlement integration; not available to connect yet."
    />
  );
}
