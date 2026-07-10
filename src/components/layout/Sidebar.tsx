"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarLink } from "@/components/layout/SidebarLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useSidebar } from "@/components/layout/SidebarContext";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

/**
 * Sidebar Material + Organic en verre : vitre prune translucide
 * (backdrop-blur) posée sur des halos colorés, bords lumineux,
 * bord droit très arrondi, logo blob. Le lien cliqué passe en rose
 * immédiatement (sélection optimiste), puis l'URL confirme.
 *
 * Desktop (lg+) : colonne dans le flux, repliée/dépliée par `isOpen`.
 * Mobile (<lg) : tiroir en superposition piloté par `isMobileOpen`,
 * avec un voile cliquable derrière ; il se referme à la navigation.
 */
export function Sidebar() {
  const { isOpen, isMobileOpen, closeMobile } = useSidebar();
  const pathname = usePathname();
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  // La navigation a rejoint le clic : l'URL redevient la source de vérité.
  if (clickedHref !== null && clickedHref === pathname) {
    setClickedHref(null);
  }

  const selectedHref = clickedHref ?? pathname;

  const handleSelect = (href: string) => {
    setClickedHref(href);
    closeMobile();
  };

  // Largeur/opacité par breakpoint : le desktop suit isOpen, le mobile isMobileOpen.
  const desktopWidth = isOpen
    ? "lg:w-64 lg:opacity-100"
    : "lg:w-0 lg:opacity-0";
  const mobileWidth = isMobileOpen
    ? "max-lg:w-64 max-lg:opacity-100"
    : "max-lg:w-0 max-lg:opacity-0";

  return (
    <>
      {/* Voile mobile : assombrit le contenu derrière le tiroir, clic = fermeture.
          z-[45] pour passer au-dessus des en-têtes de page (z-40). */}
      <div
        aria-hidden
        onClick={closeMobile}
        className={`fixed inset-0 z-[45] bg-plum-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Halos colorés derrière la vitre du menu : c'est eux que le
          backdrop-blur floute. Ils suivent l'ouverture/fermeture. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-y-0 left-0 overflow-hidden rounded-r-[2.5rem] transition-all duration-300 max-lg:z-[45] lg:-z-10 ${desktopWidth} ${mobileWidth}`}
      >
        <div className="absolute inset-0 bg-plum-950" />
        <div className="absolute -top-20 -left-16 size-72 rounded-full bg-accent-500/45 blur-3xl" />
        <div className="absolute top-1/2 -right-10 size-64 rounded-full bg-plum-600/80 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 size-72 rounded-full bg-accent-400/30 blur-3xl" />
      </div>

      <aside
        className={`flex shrink-0 flex-col overflow-hidden rounded-r-[2.5rem] border-r border-white/25 bg-plum-900/45 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_-1px_0_0_rgba(255,255,255,0.12),4px_0_24px_rgba(46,19,39,0.35)] backdrop-blur-2xl transition-all duration-300 max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 lg:relative ${desktopWidth} ${mobileWidth} ${
          isOpen ? "lg:px-3" : "lg:border-r-0 lg:px-0"
        } ${isMobileOpen ? "max-lg:px-3" : "max-lg:border-r-0 max-lg:px-0"}`}
      >

      <div className="relative mb-8 flex items-center gap-3 px-3">
        <span className="flex size-12 items-center justify-center rounded-[55%_45%_62%_38%/48%_60%_40%_52%] bg-accent-500 text-lg font-bold text-plum-950 shadow-md">
          Z
        </span>
        <span className="text-xl font-semibold text-white">Zuri</span>
      </div>

      <nav className="relative flex flex-1 flex-col gap-1.5">
        {mainNavItems.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            isActive={selectedHref === item.href}
            onSelect={handleSelect}
          />
        ))}
      </nav>

        <div className="relative flex flex-col gap-1.5 border-t border-white/10 pt-3">
          <ThemeToggle />
          <SidebarLink
            item={settingsNavItem}
            isActive={selectedHref === settingsNavItem.href}
            onSelect={handleSelect}
          />
        </div>
      </aside>
    </>
  );
}
