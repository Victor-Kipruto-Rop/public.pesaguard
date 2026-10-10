import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Terms of use | PesaGuard",
  "Conditions for visiting the PesaGuard website and evaluating or using the service.",
  "/terms",
);

export default function Terms() {
  return <RoutePage slug="terms" title="Terms for working together." description="The baseline conditions for visiting the PesaGuard website and evaluating or using the service." />;
}
