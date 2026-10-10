import { ContactPage } from "@/components/contact/ContactPage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Contact | PesaGuard",
  "Reach PesaGuard with a product, partnership or general enquiry and learn what context helps us respond usefully.",
  "/contact",
);

export default function Contact() {
  return <ContactPage kind="general" />;
}
