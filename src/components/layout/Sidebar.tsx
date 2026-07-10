"use client";

import { SidebarLink } from "@/components/layout/SidebarLink";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

/**
 * Sidebar Material + Organic Design : surface prune unie avec élévation,
 * bord droit très arrondi, logo en forme de blob irrégulier et formes
 * organiques discrètes en fond pour l'aspect naturel.
 */
export function Sidebar() {
  return (
    <aside className="relative flex w-64 shrink-0 flex-col overflow-hidden rounded-r-[2.5rem] bg-plum-900 px-3 py-6 shadow-[4px_0_16px_rgba(46,19,39,0.35)]">
      {/* Blobs organiques décoratifs, sous le contenu */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-20 size-56 rounded-[58%_42%_65%_35%/45%_60%_40%_55%] bg-plum-700/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-[45%_55%_38%_62%/60%_42%_58%_40%] bg-plum-800/60"
      />

      <div className="relative mb-8 flex items-center gap-3 px-3">
        <span className="flex size-12 items-center justify-center rounded-[55%_45%_62%_38%/48%_60%_40%_52%] bg-gold-500 text-lg font-bold text-plum-950 shadow-md">
          Z
        </span>
        <span className="text-xl font-semibold text-white">Zuri</span>
      </div>

      <nav className="relative flex flex-1 flex-col gap-1.5">
        {mainNavItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="relative border-t border-white/10 pt-3">
        <SidebarLink item={settingsNavItem} />
      </div>
    </aside>
  );
}
