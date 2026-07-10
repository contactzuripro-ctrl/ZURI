"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarView = "mois" | "jour";

interface CalendarHeaderProps {
  title: string;
  view: CalendarView;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarView) => void;
  /** Contrôles additionnels (ex. filtre par employée), affichés avant la bascule Jour/Mois. */
  children?: React.ReactNode;
}

/** Bouton rond discret de navigation (mois/jour précédent ou suivant). */
function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
    >
      {children}
    </button>
  );
}

/**
 * Barre de contrôle minimaliste du calendrier : navigation, bouton
 * « Aujourd'hui », titre courant et bascule Jour/Mois façon segmented control.
 */
export function CalendarHeader({
  title,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
  children,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        <NavButton onClick={onPrevious} label="Précédent">
          <ChevronLeft size={20} />
        </NavButton>
        <NavButton onClick={onNext} label="Suivant">
          <ChevronRight size={20} />
        </NavButton>
        <button
          type="button"
          onClick={onToday}
          className="ml-1 rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
        >
          Aujourd&apos;hui
        </button>
        <h2 className="ml-3 text-lg font-semibold capitalize tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {children}

        {/* Bascule cachée sur mobile : seule la vue Jour y est disponible */}
        <div className="hidden gap-0.5 rounded-full bg-surface p-1 sm:flex">
          {(["jour", "mois"] as const).map((viewOption) => (
            <button
              key={viewOption}
              type="button"
              onClick={() => onViewChange(viewOption)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                view === viewOption
                  ? "bg-elevated text-ink-900 shadow-sm"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {viewOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
