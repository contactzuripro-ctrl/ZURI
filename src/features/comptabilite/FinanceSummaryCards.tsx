import { StatCard } from "@/components/ui/StatCard";
import { formatAmount } from "@/lib/format";
import { monthlyFinance } from "@/features/comptabilite/data";

/** Chiffre d'affaires, dépenses et bénéfice net du mois en cours. */
export function FinanceSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <StatCard
        label="Chiffre d'affaires – juillet"
        value={formatAmount(monthlyFinance.revenue)}
      />
      <StatCard
        label="Dépenses – juillet"
        value={formatAmount(monthlyFinance.expenses)}
      />
      <StatCard
        label="Bénéfice net – juillet"
        value={formatAmount(monthlyFinance.netProfit)}
      />
    </div>
  );
}
