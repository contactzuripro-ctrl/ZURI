import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  /** Bouton d'action affiché à droite du titre (optionnel). */
  action?: ReactNode;
}

/** Bandeau blanc en haut de chaque page : titre + action principale. */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-cream-200 bg-white px-8 py-5">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {action}
    </header>
  );
}
