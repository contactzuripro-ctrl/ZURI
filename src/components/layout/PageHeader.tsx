import type { ReactNode } from "react";
import { SidebarToggle } from "@/components/layout/SidebarToggle";

interface PageHeaderProps {
  title: string;
  /** Bouton d'action affiché à droite du titre (optionnel). */
  action?: ReactNode;
}

/**
 * En-tête de page : bouton d'ouverture/fermeture du menu, titre,
 * et action principale à droite.
 */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="flex items-center justify-between px-8 pt-8 pb-2">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      {action}
    </header>
  );
}
