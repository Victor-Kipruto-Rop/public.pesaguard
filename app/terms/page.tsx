import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Terms of use | PesaGuard",
  "Public website terms for lawful access, pilot scope, customer responsibilities, product boundaries and legal review.",
  "/terms",
);

export default function Terms() {
  return <RoutePage slug="terms" title="Terms" />;
}
