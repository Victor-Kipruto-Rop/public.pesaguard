import ReconciliationFeaturePage from "@/app/features/reconciliation/page";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Payment Reconciliation | PesaGuard",
  "Discover how PesaGuard helps businesses reconcile M-Pesa transactions against business records, identify discrepancies, and improve financial accountability.",
  "/product/reconciliation",
);

export default function ProductReconciliationPage() {
  return (
    <>
      <PageHero
        className="page-hero-product"
        label="Payment reconciliation"
        title="Every payment. Accounted for."
        lede="PesaGuard helps businesses reconcile incoming M-Pesa transactions against their business records, identify discrepancies, investigate exceptions, and maintain a clearer view of what has been accounted for."
        trail={[
          { label: "Home", href: "/" },
          { label: "Product", href: "/product" },
          { label: "Reconciliation", href: "/product/reconciliation" },
        ]}
        actions={
          <>
            <Button href="/contact/sales">Request a demo</Button>
            <Button href="#reconciliation-overview" variant="quiet">See how it works</Button>
          </>
        }
      />

      <div id="reconciliation-overview">
        <ReconciliationFeaturePage />
      </div>
    </>
  );
}
