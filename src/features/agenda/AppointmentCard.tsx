import type { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
}

/** Carte d'un rendez-vous dans la colonne d'une employée. */
export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="rounded-xl border-l-4 border-gold-500 bg-cream-50 p-4">
      <p className="text-sm font-medium text-plum-800">
        {appointment.startTime} – {appointment.endTime}
      </p>
      <p className="mt-1 font-semibold">{appointment.clientName}</p>
      <p className="text-sm text-ink-600">{appointment.serviceName}</p>
    </div>
  );
}
