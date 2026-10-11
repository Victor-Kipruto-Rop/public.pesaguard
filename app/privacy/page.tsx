import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Privacy notice | PesaGuard",
  "How PesaGuard handles website enquiries and configured service data, including data roles, identified infrastructure providers and privacy rights.",
  "/privacy",
);

export default function Privacy() {
  return <RoutePage slug="privacy" title="Privacy" description="How PesaGuard handles your information." />;
}
