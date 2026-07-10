"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

/** Breakpoint `lg` de Tailwind : au-dessus, le menu est une colonne dans le flux. */
const DESKTOP_MEDIA_QUERY = "(min-width: 64rem)";

interface SidebarContextValue {
  /** Menu desktop replié/déplié (colonne dans le flux de la page). */
  isOpen: boolean;
  /** Tiroir mobile ouvert (menu en superposition sur le contenu). */
  isMobileOpen: boolean;
  /** Bascule le bon état (desktop ou mobile) selon la taille d'écran au clic. */
  toggle: () => void;
  /** Referme le tiroir mobile (navigation, clic sur le voile…). */
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

/** Fournit l'état ouvert/fermé du menu à la sidebar et au bouton de bascule. */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = () => {
    if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      setIsOpen((open) => !open);
    } else {
      setIsMobileOpen((open) => !open);
    }
  };

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, isMobileOpen, toggle, closeMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

/** Accès à l'état du menu. À utiliser sous <SidebarProvider>. */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar doit être utilisé sous <SidebarProvider>");
  }
  return context;
}
