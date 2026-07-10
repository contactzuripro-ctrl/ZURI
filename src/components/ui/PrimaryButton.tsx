import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  /** Icône affichée avant le libellé (optionnelle). */
  icon?: ReactNode;
}

/**
 * Bouton d'action principal neumorphique à la forme organique (galet) :
 * en relief au repos, « enfoncé » (ombre interne) au clic.
 */
export function PrimaryButton({ children, icon }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] bg-cream-100 px-5 py-3 font-semibold text-plum-800 shadow-neu transition-shadow hover:shadow-neu-sm active:shadow-neu-inset"
    >
      {icon}
      {children}
    </button>
  );
}
