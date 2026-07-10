"use client";

import { useSyncExternalStore } from "react";

/** Breakpoint `sm` de Tailwind : en dessous, on considère l'écran comme mobile. */
const DESKTOP_MEDIA_QUERY = "(min-width: 40rem)";

function subscribe(onChange: () => void) {
  const mediaQueryList = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQueryList.addEventListener("change", onChange);
  return () => mediaQueryList.removeEventListener("change", onChange);
}

/**
 * Vrai sous le breakpoint `sm` (écran mobile). Rend `false` côté serveur :
 * le premier rendu client corrige immédiatement si besoin.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
    () => false,
  );
}
