import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Cookies and analytics | PesaGuard",
  "How cookies and browser storage work on PesaGuard, how analytics consent is saved, and how to change or withdraw a choice.",
  "/cookies",
);

export default function Cookies() {
  return <RoutePage slug="cookies" title="Cookies" />;
}
