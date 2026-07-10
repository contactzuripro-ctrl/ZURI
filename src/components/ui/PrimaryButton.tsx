import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  /** Icône affichée avant le libellé (optionnelle). */
  icon?: ReactNode;
}

/** Bouton d'action principal, fond prune (ex. « Envoyer un lien de paiement »). */
export function PrimaryButton({ children, icon }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-xl bg-plum-800 px-5 py-3 font-semibold text-white transition-colors hover:bg-plum-700"
    >
      {icon}
      {children}
    </button>
  );
}
