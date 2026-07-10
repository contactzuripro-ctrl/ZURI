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
import { MonthView } from "@/features/agenda/MonthView";
import { DayView } from "@/features/agenda/DayView";
import { appointments } from "@/features/agenda/data";

/**
 * Calendrier de l'agenda : bascule entre la vue Mois (grille complète)
 * et la vue Jour (grille horaire par employée). Cliquer un jour du mois
 * ouvre sa journée.
 */
export function Calendar() {
  const [view, setView] = useState<CalendarView>("mois");
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const step = view === "mois" ? addMonths : addDays;
  const title =
    view === "mois" ? formatMonthTitle(currentDate) : formatDayTitle(currentDate);

  const openDay = (day: Date) => {
    setCurrentDate(day);
    setView("jour");
  };

  return (
    <div className="space-y-6">
      <CalendarHeader
        title={title}
        view={view}
        onPrevious={() => setCurrentDate(step(currentDate, -1))}
        onNext={() => setCurrentDate(step(currentDate, 1))}
        onToday={() => setCurrentDate(new Date())}
        onViewChange={setView}
      />

      {view === "mois" ? (
        <MonthView
          monthDate={currentDate}
          appointments={appointments}
          onSelectDay={openDay}
        />
      ) : (
        <DayView date={currentDate} appointments={appointments} />
      )}
    </div>
  );
}
