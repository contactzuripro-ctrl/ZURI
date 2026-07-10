"use client";

import { SidebarLink } from "@/components/layout/SidebarLink";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

/**
 * Sidebar glassmorphique : verre dépoli translucide (backdrop-blur) posé
 * sur des halos de couleur (voir GlassBackdrop), liseré blanc subtil.
 */
export function Sidebar() {
  return (
    <aside className="relative flex w-64 shrink-0 flex-col border-r border-white/15 bg-plum-900/60 px-4 py-6 backdrop-blur-2xl">
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg font-bold text-gold-400 backdrop-blur">
          Z
        </span>
        <span className="text-xl font-semibold text-white">Zuri</span>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {mainNavItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <SidebarLink item={settingsNavItem} />
      </div>
    </aside>
  );
}
