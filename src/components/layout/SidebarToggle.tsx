"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";

/** Bouton discret de l'en-tête qui ouvre/ferme le menu latéral. */
export function SidebarToggle() {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      className="flex size-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
    >
      {isOpen ? (
        <PanelLeftClose size={20} strokeWidth={1.8} />
      ) : (
        <PanelLeftOpen size={20} strokeWidth={1.8} />
      )}
    </button>
  );
}
