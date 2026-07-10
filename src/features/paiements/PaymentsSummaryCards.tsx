import { StatCard } from "@/components/ui/StatCard";
import { formatAmount } from "@/lib/format";
import { paymentsSummary } from "@/features/paiements/data";

/** Les trois indicateurs du haut de la page Paiements. */
export function PaymentsSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <StatCard
        label="Encaissé aujourd'hui"
        value={formatAmount(paymentsSummary.collectedToday)}
      />
      <StatCard
        label="Acomptes en attente"
        value={formatAmount(paymentsSummary.pendingDeposits)}
      />
      <StatCard
        label="Transactions – aujourd'hui"
        value={String(paymentsSummary.transactionsToday)}
      />
    </div>
  );
}
