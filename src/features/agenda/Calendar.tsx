"use client";

import { useState } from "react";
import {
  addDays,
  addMonths,
  formatDayTitle,
  formatMonthTitle,
} from "@/lib/calendar";
import {
  CalendarHeader,
  type CalendarView,
} from "@/features/agenda/CalendarHeader";
import { EmployeeFilter } from "@/features/agenda/EmployeeFilter";
import { MonthView } from "@/features/agenda/MonthView";
import { DayView } from "@/features/agenda/DayView";
import { appointments, employees } from "@/features/agenda/data";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
 * Calendrier de l'agenda : bascule entre la vue Mois (grille complète)
 * et la vue Jour (grille horaire par employée). Cliquer un jour du mois
 * ouvre sa journée. Le filtre par employée s'applique aux deux vues.
 * Sur mobile, seule la vue Jour existe (la grille du mois est inutilisable).
 */
export function Calendar() {
  const [view, setView] = useState<CalendarView>("mois");
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const isMobile = useIsMobile();
  const effectiveView: CalendarView = isMobile ? "jour" : view;

  const step = effectiveView === "mois" ? addMonths : addDays;
  const title =
    effectiveView === "mois"
      ? formatMonthTitle(currentDate)
      : formatDayTitle(currentDate);

  const visibleAppointments = selectedEmployee
    ? appointments.filter(
        (appointment) => appointment.employeeName === selectedEmployee,
      )
    : appointments;
  const visibleEmployees = selectedEmployee
    ? employees.filter((employeeName) => employeeName === selectedEmployee)
    : employees;

  const openDay = (day: Date) => {
    setCurrentDate(day);
    setView("jour");
  };

  return (
    <div className="space-y-6">
      <CalendarHeader
        title={title}
        view={effectiveView}
        onPrevious={() => setCurrentDate(step(currentDate, -1))}
        onNext={() => setCurrentDate(step(currentDate, 1))}
        onToday={() => setCurrentDate(new Date())}
        onViewChange={setView}
      >
        <EmployeeFilter
          selected={selectedEmployee}
          onChange={setSelectedEmployee}
        />
      </CalendarHeader>

      {effectiveView === "mois" ? (
        <MonthView
          monthDate={currentDate}
          appointments={visibleAppointments}
          onSelectDay={openDay}
        />
      ) : (
        <DayView
          date={currentDate}
          appointments={visibleAppointments}
          visibleEmployees={visibleEmployees}
        />
      )}
    </div>
  );
}
