import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  /** Icône affichée avant le libellé (optionnelle). */
  icon?: ReactNode;
}

/**
 * Bouton d'action principal neumorphique : en relief au repos,
 * « enfoncé » (ombre interne) au clic.
 */
export function PrimaryButton({ children, icon }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-2xl bg-cream-100 px-5 py-3 font-semibold text-plum-800 shadow-neu transition-shadow hover:shadow-neu-sm active:shadow-neu-inset"
    >
      {icon}
      {children}
    </button>
  );
}
