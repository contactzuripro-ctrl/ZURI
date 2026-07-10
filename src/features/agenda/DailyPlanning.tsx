import { Card } from "@/components/ui/Card";
import { AppointmentCard } from "@/features/agenda/AppointmentCard";
import { dayAppointments, employees } from "@/features/agenda/data";

/** Planning du jour : une colonne par employée, rendez-vous triés par heure. */
export function DailyPlanning() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {employees.map((employeeName) => {
        const appointments = dayAppointments
          .filter((appointment) => appointment.employeeName === employeeName)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return (
          <Card key={employeeName} className="p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <span className="flex size-8 items-center justify-center rounded-[55%_45%_62%_38%/48%_60%_40%_52%] bg-plum-800 text-sm font-semibold text-white shadow-neu-sm">
                {employeeName.charAt(0)}
              </span>
              {employeeName}
            </h2>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
              {appointments.length === 0 && (
                <p className="text-sm text-ink-400">Aucun rendez-vous</p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
