"use client";

import Link from "next/link";
import type { NavItem } from "@/components/layout/navigation";

interface SidebarLinkProps {
  item: NavItem;
  /** Le lien est-il la page sélectionnée (pilule rose pleine) ? */
  isActive: boolean;
  /** Signale le clic au parent pour passer en rose immédiatement. */
  onSelect: (href: string) => void;
  /** Menu replié en rail (desktop) : icône seule, centrée, sans libellé. */
  collapsed?: boolean;
}

/**
 * Lien de navigation Material + Organic : l'item sélectionné est une pilule
 * rose pleine (appliquée dès le clic, sans attendre la navigation), les
 * autres réagissent au survol par un voile rose.
 */
export function SidebarLink({
  item,
  isActive,
  onSelect,
  collapsed = false,
}: SidebarLinkProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={() => onSelect(item.href)}
      title={collapsed ? item.label : undefined}
      className={`flex items-center gap-3 rounded-[1.6rem_1.1rem_1.7rem_1rem/1.1rem_1.7rem_1rem_1.6rem] px-4 py-3 text-[15px] transition-all ${
        collapsed ? "lg:justify-center lg:px-0" : ""
      } ${
        isActive
          ? "bg-accent-500 font-semibold text-plum-950 shadow-md"
          : "text-cream-200 hover:bg-accent-500/25 hover:text-accent-400 active:bg-accent-500/50"
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
      <span className={collapsed ? "lg:hidden" : ""}>{item.label}</span>
    </Link>
  );
}
