"use client";

import { Avatar } from "@/components/ui/Avatar";
import {
  employees,
  employeePhotos,
  employeeRingColors,
} from "@/features/agenda/data";

interface EmployeeFilterProps {
  /** Employée dont on affiche les RDV, ou `null` pour toutes. */
  selected: string | null;
  onChange: (employeeName: string | null) => void;
}

/**
 * Filtre du calendrier par employée : pilule « Toutes » + pastille photo par
 * employée. Cliquer une photo n'affiche que ses RDV (anneau à sa couleur),
 * re-cliquer la même photo — ou « Toutes » — réaffiche tout.
 */
export function EmployeeFilter({ selected, onChange }: EmployeeFilterProps) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          selected === null
            ? "bg-plum-900 text-white"
            : "text-ink-600 hover:bg-surface hover:text-ink-900"
        }`}
      >
        Toutes
      </button>

      {employees.map((employeeName) => {
        const isSelected = selected === employeeName;
        return (
          <button
            key={employeeName}
            type="button"
            onClick={() => onChange(isSelected ? null : employeeName)}
            aria-label={`Voir les rendez-vous de ${employeeName}`}
            aria-pressed={isSelected}
            title={employeeName}
            className={`flex rounded-full transition-all duration-200 ${
              isSelected
                ? `ring-2 ring-offset-2 ring-offset-page ${employeeRingColors[employeeName]}`
                : selected !== null
                  ? "opacity-40 hover:opacity-100"
                  : "hover:scale-105"
            }`}
          >
            <Avatar
              fullName={employeeName}
              photoUrl={employeePhotos[employeeName]}
              sizeClass="size-9"
            />
          </button>
        );
      })}
    </div>
  );
}
