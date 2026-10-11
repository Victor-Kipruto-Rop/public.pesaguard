import TransactionMonitoringPage from "@/components/features/TransactionMonitoringPage";
import { detailPages } from "@/content/detail";
import { pageMetadata } from "@/lib/seo/metadata";

const data = detailPages["See transaction flows as they change."];

export const metadata = pageMetadata(
  "Transaction monitoring | PesaGuard",
  data.description,
  "/features/transaction-monitoring",
);

export default function Monitoring() {
  return <TransactionMonitoringPage />;
}
