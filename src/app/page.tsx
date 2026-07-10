import { PageHeader } from "@/components/layout/PageHeader";
import { DashboardSummaryCards } from "@/features/tableau-de-bord/DashboardSummaryCards";
import { UpcomingAppointments } from "@/features/tableau-de-bord/UpcomingAppointments";

/** Tableau de bord — vue d'ensemble : recette du jour, rendez-vous à venir. */
export default function TableauDeBordPage() {
  return (
    <>
      <PageHeader title="Tableau de bord" />
      <div className="space-y-10 px-10 py-8">
        <DashboardSummaryCards />
        <UpcomingAppointments />
      </div>
    </>
  );
}
