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
    <header className="flex flex-wrap items-center justify-between gap-4 px-5 pt-8 pb-4 sm:px-10 sm:pt-12">
      <div className="flex items-center gap-4">
        <SidebarToggle />
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
      </div>
      <div className="flex w-full items-center gap-4 sm:w-auto">
        <SearchBar />
        {action}
      </div>
    </header>
  );
}
