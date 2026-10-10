import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "M-Pesa Daraja integration | PesaGuard",
  "Learn how PesaGuard's current pilot uses Safaricom Daraja callbacks for transaction validation, matching and exception review.",
  "/integrations/mpesa",
);

export default function MpesaPage() {
  return (
    <RoutePage
      slug="integrations"
      title="Bring M-Pesa events into focus."
      description="Current pilot integration for Safaricom M-Pesa through Daraja."
    />
  );
}
