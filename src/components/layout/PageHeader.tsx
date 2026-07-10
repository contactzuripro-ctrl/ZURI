import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  /** Bouton d'action affiché à droite du titre (optionnel). */
  action?: ReactNode;
}

/**
 * En-tête de page neumorphique : fond identique au contenu,
 * simplement le titre et l'action principale.
 */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 pt-8 pb-2">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {action}
    </header>
  );
}
