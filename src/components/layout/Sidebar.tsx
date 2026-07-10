"use client";

import { SidebarLink } from "@/components/layout/SidebarLink";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

/** Sidebar prune fixe : logo Zuri, navigation principale, paramètres en bas. */
export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col bg-plum-800 px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <span className="flex size-10 items-center justify-center rounded-full bg-gold-500 text-lg font-bold text-white">
          Z
        </span>
        <span className="text-xl font-semibold text-white">Zuri</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {mainNavItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="border-t border-plum-700 pt-4">
        <SidebarLink item={settingsNavItem} />
      </div>
    </aside>
  );
}
