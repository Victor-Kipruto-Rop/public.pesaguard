import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Privacy | PesaGuard",
  "How PesaGuard handles website enquiries, operational information and customer data boundaries.",
  "/privacy",
);

export default function Privacy() {
  return <RoutePage slug="privacy" title="Privacy, stated plainly." description="How PesaGuard handles information entrusted to the website and platform." />;
}
