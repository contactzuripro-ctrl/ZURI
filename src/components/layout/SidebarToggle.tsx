"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/layout/SidebarContext";

/** Bouton neumorphique de l'en-tête qui ouvre/ferme le menu latéral. */
export function SidebarToggle() {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      className="flex size-11 items-center justify-center rounded-2xl bg-cream-100 text-plum-800 shadow-neu transition-shadow hover:shadow-neu-sm active:shadow-neu-inset"
    >
      {isOpen ? (
        <PanelLeftClose size={20} strokeWidth={1.8} />
      ) : (
        <PanelLeftOpen size={20} strokeWidth={1.8} />
      )}
    </button>
  );
}
