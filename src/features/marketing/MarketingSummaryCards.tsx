import { StatCard } from "@/components/ui/StatCard";
import { formatPercent } from "@/lib/format";
import { marketingSummary } from "@/features/marketing/data";

/** Indicateurs marketing : messages envoyés, taux d'ouverture, coupons utilisés. */
export function MarketingSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        label={`Messages envoyés - ${marketingSummary.monthLabel}`}
        value={String(marketingSummary.messagesSentThisMonth)}
      />
      <StatCard
        label="Taux d'ouverture"
        value={formatPercent(marketingSummary.openRate)}
      />
      <StatCard
        label="Coupons utilisés"
        value={String(marketingSummary.couponsUsed)}
      />
    </div>
  );
}
