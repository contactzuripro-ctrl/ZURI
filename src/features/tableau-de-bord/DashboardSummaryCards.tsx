import { StatCard } from "@/components/ui/StatCard";
import { formatAmount } from "@/lib/format";
import { dashboardSummary } from "@/features/tableau-de-bord/data";

/** Les quatre indicateurs clés du tableau de bord. */
export function DashboardSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Recette du jour"
        value={formatAmount(dashboardSummary.todayRevenue)}
      />
      <StatCard
        label="Rendez-vous aujourd'hui"
        value={String(dashboardSummary.todayAppointments)}
      />
      <StatCard
        label="Nouvelles clientes (semaine)"
        value={String(dashboardSummary.newClientsThisWeek)}
      />
      <StatCard
        label="Alertes stock"
        value={String(dashboardSummary.lowStockAlerts)}
        hint="Produits sous le seuil de réapprovisionnement"
      />
    </div>
  );
}
