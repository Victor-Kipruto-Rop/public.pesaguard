import { ContactPage } from "@/components/contact/ContactPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Support | PesaGuard",
  "Share safe diagnostic context for a PesaGuard issue and find documentation and live service status.",
  "/contact/support",
);

export default function Support() {
  return <ContactPage kind="support" />;
}
