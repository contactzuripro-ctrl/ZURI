"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/navigation";

interface SidebarLinkProps {
  item: NavItem;
}

/**
 * Lien de navigation Material + Organic : l'item actif est une pilule
 * pleine or à la forme légèrement irrégulière (coins asymétriques très
 * arrondis, comme un galet) ; les autres réagissent au survol par un
 * voile clair (state layer) aux mêmes courbes.
 */
export function SidebarLink({ item }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] px-4 py-3 text-[15px] transition-all ${
        isActive
          ? "bg-accent-500 font-semibold text-plum-950 shadow-md"
          : "text-cream-200 hover:bg-white/10 hover:text-white active:bg-white/20"
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
      {item.label}
    </Link>
  );
}
