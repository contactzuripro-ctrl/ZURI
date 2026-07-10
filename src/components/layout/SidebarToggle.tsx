"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";

/**
 * Bouton discret de l'en-tête qui ouvre/ferme le menu latéral.
 * L'icône reflète l'état desktop sur grand écran (`isOpen`) et
 * l'état du tiroir en superposition sur mobile (`isMobileOpen`).
 */
export function SidebarToggle() {
  const { isOpen, isMobileOpen, toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ouvrir ou fermer le menu"
      className="flex size-10 items-center justify-center rounded-[55%_45%_62%_38%/48%_60%_40%_52%] text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
    >
      <span className="max-lg:hidden">
        {isOpen ? (
          <PanelLeftClose size={20} strokeWidth={1.8} />
        ) : (
          <PanelLeftOpen size={20} strokeWidth={1.8} />
        )}
      </span>
      <span className="lg:hidden">
        {isMobileOpen ? (
          <PanelLeftClose size={20} strokeWidth={1.8} />
        ) : (
          <PanelLeftOpen size={20} strokeWidth={1.8} />
        )}
      </span>
    </button>
  );
}
