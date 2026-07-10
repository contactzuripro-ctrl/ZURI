import { Card } from "@/components/ui/Card";
import type { Appointment } from "@/types";
import { upcomingAppointments } from "@/features/tableau-de-bord/data";

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <li className="flex items-center justify-between border-t border-cream-200 px-6 py-4 first:border-t-0">
      <div>
        <p className="font-semibold">{appointment.clientName}</p>
        <p className="text-sm text-ink-600">
          {appointment.serviceName} · avec {appointment.employeeName}
        </p>
      </div>
      <span className="rounded-full bg-cream-100 px-3 py-1 text-sm font-medium text-plum-800">
        {appointment.startTime} – {appointment.endTime}
      </span>
    </li>
  );
}

/** Liste des prochains rendez-vous de la journée. */
export function UpcomingAppointments() {
  return (
    <Card>
      <h2 className="px-6 pt-5 pb-3 text-lg font-bold">Rendez-vous à venir</h2>
      <ul>
        {upcomingAppointments.map((appointment) => (
          <AppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </Card>
  );
}
