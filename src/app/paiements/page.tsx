import { PageHeader } from "@/components/layout/PageHeader";
import { PaymentLinkAction } from "@/features/paiements/PaymentLinkAction";
import { PaymentsSummaryCards } from "@/features/paiements/PaymentsSummaryCards";
import { PaymentsTable } from "@/features/paiements/PaymentsTable";

/** Paiements — suivi des transactions Orange Money, Wave et espèces. */
export default function PaiementsPage() {
  return (
    <>
      <PageHeader
        title="Paiements"
        action={<PaymentLinkAction />}
      />
      <div className="space-y-10 px-5 py-8 sm:px-10">
        <PaymentsSummaryCards />
        <PaymentsTable />
      </div>
    </>
  );
}
