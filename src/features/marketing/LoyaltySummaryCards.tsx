import { StatCard } from "@/components/ui/StatCard";
import { formatPercent } from "@/lib/format";
import { loyaltySummary } from "@/features/marketing/data";

/** Indicateurs du programme de fidélité. */
export function LoyaltySummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <StatCard
        label="Cartes de fidélité actives"
        value={String(loyaltySummary.activeCards)}
      />
      <StatCard
        label="Récompenses utilisées ce mois"
        value={String(loyaltySummary.rewardsRedeemedThisMonth)}
      />
      <StatCard
        label="Taux de retour clientes"
        value={formatPercent(loyaltySummary.returnRate)}
      />
    </div>
  );
}
