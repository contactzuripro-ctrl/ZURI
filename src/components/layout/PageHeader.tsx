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
        {/* Titre en dégradé aux couleurs Zuri (prune → rose) ; en mode nuit
            il part du crème pour rester lisible sur fond sombre. */}
        <h1 className="bg-gradient-to-r from-plum-900 via-plum-600 to-accent-500 bg-clip-text text-2xl font-semibold tracking-wide text-transparent uppercase sm:text-3xl dark:from-cream-200 dark:via-accent-400 dark:to-accent-500">
          {title}
        </h1>
      </div>
      {/* Mobile : recherche puis bouton empilés pleine largeur ;
          dès sm ils reviennent côte à côte. */}
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        <SearchBar />
        {action}
      </div>
    </header>
  );
}
