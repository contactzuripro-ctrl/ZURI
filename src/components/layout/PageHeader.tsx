import type { ReactNode } from "react";
import { SidebarToggle } from "@/components/layout/SidebarToggle";
import { SearchBar } from "@/components/layout/SearchBar";

interface PageHeaderProps {
  title: string;
  /** Bouton d'action affiché à droite du titre (optionnel). */
  action?: ReactNode;
}

/**
 * En-tête de page minimaliste : bouton de menu, grand titre,
 * barre de recherche animée et action principale à droite.
 */
export function PageHeader({ title, action }: PageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-10 pt-12 pb-4">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <SearchBar />
        {action}
      </div>
    </header>
  );
}
