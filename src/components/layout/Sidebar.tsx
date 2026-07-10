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
 */
export function Sidebar() {
  const { isOpen } = useSidebar();
  const pathname = usePathname();
  const [clickedHref, setClickedHref] = useState<string | null>(null);

  // La navigation a rejoint le clic : l'URL redevient la source de vérité.
  if (clickedHref !== null && clickedHref === pathname) {
    setClickedHref(null);
  }

  const selectedHref = clickedHref ?? pathname;

  return (
    <>
      {/* Halos colorés derrière la vitre du menu : c'est eux que le
          backdrop-blur floute. Ils suivent l'ouverture/fermeture. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-y-0 left-0 -z-10 overflow-hidden rounded-r-[2.5rem] transition-all duration-300 ${
          isOpen ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-plum-950" />
        <div className="absolute -top-20 -left-16 size-72 rounded-full bg-accent-500/45 blur-3xl" />
        <div className="absolute top-1/2 -right-10 size-64 rounded-full bg-plum-600/80 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 size-72 rounded-full bg-accent-400/30 blur-3xl" />
      </div>

      <aside
        className={`relative flex shrink-0 flex-col overflow-hidden rounded-r-[2.5rem] border-r border-white/25 bg-plum-900/45 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_-1px_0_0_rgba(255,255,255,0.12),4px_0_24px_rgba(46,19,39,0.35)] backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? "w-64 px-3" : "w-0 border-r-0 px-0 opacity-0"
        }`}
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
            onSelect={setClickedHref}
          />
        ))}
      </nav>

        <div className="relative flex flex-col gap-1.5 border-t border-white/10 pt-3">
          <ThemeToggle />
          <SidebarLink
            item={settingsNavItem}
            isActive={selectedHref === settingsNavItem.href}
            onSelect={setClickedHref}
          />
        </div>
      </aside>
    </>
  );
}
