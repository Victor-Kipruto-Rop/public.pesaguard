import { ContactPage } from "@/components/contact/ContactPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Sales and pilots | PesaGuard",
  "Scope a PesaGuard pilot around your M-Pesa flow, reconciliation process and operational risks.",
  "/contact/sales",
);

export default function Sales() {
  return <ContactPage kind="sales" />;
}
