import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  CalendarDays,
  Users,
  CreditCard,
  BarChart3,
  Tag,
  IdCard,
  Package,
  Megaphone,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Les 9 écrans du back-office, dans l'ordre du business plan. */
export const mainNavItems: NavItem[] = [
  { label: "Tableau de bord", href: "/tableau-de-bord", icon: LayoutGrid },
  { label: "Agenda", href: "/agenda", icon: CalendarDays },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Paiements", href: "/paiements", icon: CreditCard },
  { label: "Comptabilité", href: "/comptabilite", icon: BarChart3 },
  { label: "Prestations", href: "/prestations", icon: Tag },
  { label: "Employés", href: "/employes", icon: IdCard },
  { label: "Stock", href: "/stock", icon: Package },
  { label: "Marketing", href: "/marketing", icon: Megaphone },
];

export const settingsNavItem: NavItem = {
  label: "Paramètres",
  href: "/parametres",
  icon: Settings,
};
