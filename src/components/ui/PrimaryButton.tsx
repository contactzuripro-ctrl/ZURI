import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  /** Icône affichée avant le libellé (optionnelle). */
  icon?: ReactNode;
  /** "submit" pour valider le formulaire d'une modale (défaut "button"). */
  type?: "button" | "submit";
  onClick?: () => void;
}

/**
 * Bouton d'action principal minimaliste à la forme organique (galet) :
 * pilule pleine aux coins asymétriques, couleur d'accent unique.
 */
export function PrimaryButton({
  children,
  icon,
  type = "button",
  onClick,
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] bg-plum-900 px-6 py-3 text-[15px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-85"
    >
      {icon}
      {children}
    </button>
  );
}
