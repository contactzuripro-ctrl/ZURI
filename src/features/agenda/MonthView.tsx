"use client";

import { Card } from "@/components/ui/Card";
import {
  WEEKDAY_LABELS,
  getMonthGrid,
  isSameDay,
  toIsoDate,
} from "@/lib/calendar";
import type { Appointment } from "@/types";
import { employeeColors } from "@/features/agenda/data";

const MAX_VISIBLE_APPOINTMENTS = 2;

interface MonthViewProps {
  /** N'importe quel jour du mois à afficher. */
  monthDate: Date;
  appointments: Appointment[];
  /** Appelé au clic sur un jour : ouvre la vue Jour à cette date. */
  onSelectDay: (day: Date) => void;
}

/** Grille mensuelle : semaines lundi → dimanche, rendez-vous en pastilles. */
export function MonthView({
  monthDate,
  appointments,
  onSelectDay,
}: MonthViewProps) {
  const today = new Date();
  const weeks = getMonthGrid(monthDate.getFullYear(), monthDate.getMonth());

  return (
    <Card className="overflow-x-auto p-4">
      <div className="grid min-w-140 grid-cols-7">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="px-2 py-3 text-center text-sm font-semibold text-ink-600"
          >
            {label}
          </div>
        ))}
      </div>

      {weeks.map((week) => (
        <div
          key={toIsoDate(week[0])}
          className="grid min-w-140 grid-cols-7 border-t border-hairline"
        >
          {week.map((day) => {
            const isCurrentMonth = day.getMonth() === monthDate.getMonth();
            const isToday = isSameDay(day, today);
            const dayAppointments = appointments
              .filter((appointment) => appointment.date === toIsoDate(day))
              .sort((a, b) => a.startTime.localeCompare(b.startTime));
            const hiddenCount =
              dayAppointments.length - MAX_VISIBLE_APPOINTMENTS;

            return (
              <button
                key={toIsoDate(day)}
                type="button"
                onClick={() => onSelectDay(day)}
                className={`flex min-h-24 flex-col items-stretch gap-1 p-1.5 text-left transition-colors hover:bg-elevated ${
                  isCurrentMonth ? "" : "opacity-40"
                }`}
              >
                <span
                  className={`self-end text-sm ${
                    isToday
                      ? "flex size-7 items-center justify-center rounded-full bg-plum-900 font-semibold text-white"
                      : "px-1.5 font-medium text-ink-600"
                  }`}
                >
                  {day.getDate()}
                </span>

                {dayAppointments
                  .slice(0, MAX_VISIBLE_APPOINTMENTS)
                  .map((appointment) => (
                    <span
                      key={appointment.id}
                      className={`truncate rounded-lg px-1.5 py-0.5 text-xs font-medium ${
                        employeeColors[appointment.employeeName] ??
                        "bg-plum-800 text-white"
                      }`}
                    >
                      {appointment.startTime} {appointment.clientName}
                    </span>
                  ))}
                {hiddenCount > 0 && (
                  <span className="px-1.5 text-xs font-semibold text-ink-400">
                    +{hiddenCount} autre{hiddenCount > 1 ? "s" : ""}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </Card>
  );
}
