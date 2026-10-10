import { RoutePage } from "@/app/_shared/RoutePage";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Cookies | PesaGuard",
  "Browser storage, essential state and how to manage cookies on the PesaGuard website.",
  "/cookies",
);

export default function Cookies() {
  return <RoutePage slug="cookies" title="Cookies and local storage." description="A practical explanation of browser storage and optional technologies on the PesaGuard website." />;
}
