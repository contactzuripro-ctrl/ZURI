"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/navigation";

interface SidebarLinkProps {
  item: NavItem;
}

/**
 * Lien de navigation glassmorphique : la route active est une pastille
 * de verre (fond blanc translucide + liseré), les autres s'éclaircissent au survol.
 */
export function SidebarLink({ item }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] transition-all ${
        isActive
          ? "border border-white/25 bg-white/15 font-semibold text-gold-400 shadow-lg shadow-plum-950/30 backdrop-blur"
          : "border border-transparent text-cream-200 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
      {item.label}
    </Link>
  );
}
