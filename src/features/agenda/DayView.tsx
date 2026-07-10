"use client";

import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { timeToMinutes, toIsoDate } from "@/lib/calendar";
import type { Appointment } from "@/types";
import {
  employees,
  employeeColors,
  employeePhotos,
} from "@/features/agenda/data";

/** Plage horaire affichée : 08:00 → 19:00. */
const DAY_START_MINUTES = 8 * 60;
const DAY_END_MINUTES = 19 * 60;
const HOUR_HEIGHT_REM = 4;

const hourLabels = Array.from(
  { length: (DAY_END_MINUTES - DAY_START_MINUTES) / 60 + 1 },
  (_, i) => `${String(8 + i).padStart(2, "0")}:00`,
);

/** Position et hauteur (en rem) d'un rendez-vous dans la grille horaire. */
function appointmentPosition(appointment: Appointment) {
  const start = Math.max(timeToMinutes(appointment.startTime), DAY_START_MINUTES);
  const end = Math.min(timeToMinutes(appointment.endTime), DAY_END_MINUTES);
  return {
    top: `${((start - DAY_START_MINUTES) / 60) * HOUR_HEIGHT_REM}rem`,
    height: `${((end - start) / 60) * HOUR_HEIGHT_REM}rem`,
  };
}

interface DayViewProps {
  date: Date;
  appointments: Appointment[];
}

/**
 * Vue Jour : grille horaire (08:00–19:00) avec une colonne par employée,
 * les rendez-vous sont positionnés et dimensionnés selon leur horaire.
 */
export function DayView({ date, appointments }: DayViewProps) {
  const dayAppointments = appointments.filter(
    (appointment) => appointment.date === toIsoDate(date),
  );
  const gridHeight = `${(hourLabels.length - 1) * HOUR_HEIGHT_REM}rem`;

  return (
    <Card className="overflow-x-auto p-6">
      {/* En-têtes des colonnes employées */}
      <div className="grid min-w-160 grid-cols-[4rem_repeat(3,1fr)] gap-3">
        <div />
        {employees.map((employeeName) => (
          <div
            key={employeeName}
            className="flex items-center justify-center gap-2 pb-4 font-bold"
          >
            <Avatar
              fullName={employeeName}
              photoUrl={employeePhotos[employeeName]}
              color={employeeColors[employeeName]}
              sizeClass="size-8 text-sm"
            />
            {employeeName}
          </div>
        ))}
      </div>

      <div
        className="relative grid min-w-160 grid-cols-[4rem_repeat(3,1fr)] gap-3"
        style={{ height: gridHeight }}
      >
        {/* Colonne des heures + lignes horizontales */}
        <div className="relative">
          {hourLabels.map((hour, index) => (
            <span
              key={hour}
              className="absolute -translate-y-1/2 text-xs font-medium text-ink-400"
              style={{ top: `${index * HOUR_HEIGHT_REM}rem` }}
            >
              {hour}
            </span>
          ))}
        </div>

        {employees.map((employeeName) => (
          <div
            key={employeeName}
            className="relative rounded-xl bg-elevated"
          >
            {/* Lignes d'heures */}
            {hourLabels.slice(1, -1).map((hour, index) => (
              <div
                key={hour}
                className="absolute inset-x-0 border-t border-hairline"
                style={{ top: `${(index + 1) * HOUR_HEIGHT_REM}rem` }}
              />
            ))}

            {/* Blocs de rendez-vous */}
            {dayAppointments
              .filter(
                (appointment) => appointment.employeeName === employeeName,
              )
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className={`absolute inset-x-1.5 overflow-hidden rounded-[1.2rem_0.8rem_1.2rem_0.8rem/0.8rem_1.2rem_0.8rem_1.2rem] p-2.5 shadow-md ${employeeColors[employeeName]}`}
                  style={appointmentPosition(appointment)}
                >
                  <p className="text-xs font-semibold">
                    {appointment.startTime} – {appointment.endTime}
                  </p>
                  <p className="truncate text-sm font-bold">
                    {appointment.clientName}
                  </p>
                  <p className="truncate text-xs opacity-80">
                    {appointment.serviceName}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
