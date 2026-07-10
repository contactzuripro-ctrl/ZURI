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
}

/** Bouton rond neumorphique de navigation (mois/jour précédent ou suivant). */
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
      className="flex size-10 items-center justify-center rounded-full bg-cream-100 text-plum-800 shadow-neu-sm transition-shadow active:shadow-neu-inset"
    >
      {children}
    </button>
  );
}

/**
 * Barre de contrôle du calendrier : navigation précédent/suivant,
 * bouton « Aujourd'hui », titre courant et bascule de vue Mois/Jour.
 */
export function CalendarHeader({
  title,
  view,
  onPrevious,
  onNext,
  onToday,
  onViewChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <NavButton onClick={onPrevious} label="Précédent">
          <ChevronLeft size={20} />
        </NavButton>
        <NavButton onClick={onNext} label="Suivant">
          <ChevronRight size={20} />
        </NavButton>
        <button
          type="button"
          onClick={onToday}
          className="rounded-full bg-cream-100 px-4 py-2 text-sm font-semibold text-plum-800 shadow-neu-sm transition-shadow active:shadow-neu-inset"
        >
          Aujourd&apos;hui
        </button>
        <h2 className="ml-2 text-lg font-bold capitalize">{title}</h2>
      </div>

      <div className="flex gap-1 rounded-full bg-cream-100 p-1.5 shadow-neu-inset-sm">
        {(["jour", "mois"] as const).map((viewOption) => (
          <button
            key={viewOption}
            type="button"
            onClick={() => onViewChange(viewOption)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition-all ${
              view === viewOption
                ? "bg-plum-800 text-white shadow-md"
                : "text-ink-600 hover:text-plum-800"
            }`}
          >
            {viewOption}
          </button>
        ))}
      </div>
    </div>
  );
}
