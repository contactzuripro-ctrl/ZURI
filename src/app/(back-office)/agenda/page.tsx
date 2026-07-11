import { PageHeader } from "@/components/layout/PageHeader";
import { NewAppointmentAction } from "@/features/agenda/NewAppointmentAction";
import { Calendar } from "@/features/agenda/Calendar";

/** Agenda — vrai calendrier : vue Mois et vue Jour par employée. */
export default function AgendaPage() {
  return (
    <>
      <PageHeader
        title="Agenda"
        action={<NewAppointmentAction />}
      />
      <div className="px-5 py-8 sm:px-10">
        <Calendar />
      </div>
    </>
  );
}
