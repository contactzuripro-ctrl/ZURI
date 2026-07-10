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
  /** Colonnes affichées (filtre par employée) ; toutes par défaut. */
  visibleEmployees?: readonly string[];
}

/**
 * Vue Jour : grille horaire (08:00–19:00) avec une colonne par employée
 * affichée, les rendez-vous sont positionnés et dimensionnés selon leur
 * horaire. Sur mobile, la grille laisse place à une simple liste de
 * rendez-vous triés par heure.
 */
export function DayView({
  date,
  appointments,
  visibleEmployees = employees,
}: DayViewProps) {
  const dayAppointments = appointments.filter(
    (appointment) => appointment.date === toIsoDate(date),
  );
  const gridHeight = `${(hourLabels.length - 1) * HOUR_HEIGHT_REM}rem`;
  const gridTemplateColumns = `4rem repeat(${visibleEmployees.length}, minmax(0, 1fr))`;

  const sortedAppointments = [...dayAppointments].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  return (
    <Card className="overflow-x-auto p-4 sm:p-6">
      {/* Liste mobile : un rendez-vous par carte, triés par heure */}
      <div className="space-y-3 sm:hidden">
        {sortedAppointments.length === 0 && (
          <p className="py-8 text-center text-sm text-ink-400">
            Aucun rendez-vous ce jour
          </p>
        )}
        {sortedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`flex items-center gap-3 rounded-[1.2rem_0.8rem_1.2rem_0.8rem/0.8rem_1.2rem_0.8rem_1.2rem] p-3 shadow-md ${employeeColors[appointment.employeeName]}`}
          >
            <Avatar
              fullName={appointment.employeeName}
              photoUrl={employeePhotos[appointment.employeeName]}
              color={employeeColors[appointment.employeeName]}
              sizeClass="size-10 text-sm"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold">
                {appointment.startTime} – {appointment.endTime} ·{" "}
                {appointment.employeeName}
              </p>
              <p className="truncate text-sm font-bold">
                {appointment.clientName}
              </p>
              <p className="truncate text-xs opacity-80">
                {appointment.serviceName}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* En-têtes des colonnes employées */}
      <div
        className="hidden min-w-160 gap-3 sm:grid"
        style={{ gridTemplateColumns }}
      >
        <div />
        {visibleEmployees.map((employeeName) => (
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
        className="relative hidden min-w-160 gap-3 sm:grid"
        style={{ height: gridHeight, gridTemplateColumns }}
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

        {visibleEmployees.map((employeeName) => (
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
