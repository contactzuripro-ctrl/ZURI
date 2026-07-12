"use client";

import { useEffect, type RefObject } from "react";

/** Appelle `onClose` dès qu'un clic/tap a lieu hors de l'élément référencé. */
export function useCloseOnOutsideClick(
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, onClose]);
}
