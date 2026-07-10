import type { Appointment } from "@/types";

interface AppointmentCardProps {
  appointment: Appointment;
}

/** Carte d'un rendez-vous : creusée dans la colonne (inset), liseré or. */
export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] border-l-4 border-gold-500 bg-cream-100 p-4 shadow-neu-inset-sm">
      <p className="text-sm font-medium text-plum-800">
        {appointment.startTime} – {appointment.endTime}
      </p>
      <p className="mt-1 font-semibold">{appointment.clientName}</p>
      <p className="text-sm text-ink-600">{appointment.serviceName}</p>
    </div>
  );
}
