"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/components/layout/navigation";

interface SidebarLinkProps {
  item: NavItem;
}

/** Lien de navigation de la sidebar, surligné quand la route est active. */
export function SidebarLink({ item }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition-colors ${
        isActive
          ? "bg-plum-700 font-semibold text-white"
          : "text-cream-200 hover:bg-plum-700/50 hover:text-white"
      }`}
    >
      <Icon size={20} strokeWidth={1.8} />
      {item.label}
    </Link>
  );
}
