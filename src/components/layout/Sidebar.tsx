"use client";

import { SidebarLink } from "@/components/layout/SidebarLink";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

/**
 * Sidebar Material Design : surface prune unie avec élévation (ombre portée
 * sur le bord droit), navigation en pilules, paramètres isolés en bas.
 */
export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-plum-900 px-3 py-6 shadow-[4px_0_16px_rgba(46,19,39,0.35)]">
      <div className="mb-8 flex items-center gap-3 px-3">
        <span className="flex size-11 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-plum-950 shadow-md">
          Z
        </span>
        <span className="text-xl font-semibold text-white">Zuri</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {mainNavItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-white/10 pt-3">
        <SidebarLink item={settingsNavItem} />
      </div>
    </aside>
  );
}
