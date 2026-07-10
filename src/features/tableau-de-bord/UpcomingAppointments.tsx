import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import type { Appointment } from "@/types";
import { upcomingAppointments } from "@/features/tableau-de-bord/data";

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <li className="flex items-center justify-between border-t border-hairline px-8 py-5 first:border-t-0">
      <div className="flex items-center gap-4">
        <Avatar
          fullName={appointment.clientName}
          photoUrl={appointment.clientPhotoUrl}
          sizeClass="size-11"
        />
        <div>
          <p className="font-medium">{appointment.clientName}</p>
          <p className="mt-0.5 text-sm text-ink-600">
            {appointment.serviceName} · avec {appointment.employeeName}
          </p>
        </div>
      </div>
      <span className="text-sm font-medium text-ink-600">
        {appointment.startTime} – {appointment.endTime}
      </span>
    </li>
  );
}

/** Liste minimaliste des prochains rendez-vous de la journée. */
export function UpcomingAppointments() {
  return (
    <Card>
      <h2 className="px-8 pt-7 pb-2 text-lg font-semibold tracking-tight">
        Rendez-vous à venir
      </h2>
      <ul>
        {upcomingAppointments.map((appointment) => (
          <AppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </Card>
  );
}
