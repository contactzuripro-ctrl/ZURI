"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title: string;
  /** Sous-titre discret sous le titre (optionnel). */
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Fenêtre modale au design du contenu : voile prune flouté, panneau en
 * verre renforcé (`glass-strong`) aux coins galet, animation fondu + montée.
 * Se ferme par Échap, clic sur le voile ou le bouton ✕.
 */
export function Modal({ open, title, subtitle, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    // Bloque le défilement de la page tant que la modale est ouverte
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  /* Portail vers <body> : l'en-tête de page est animé (transform), ce qui en
     ferait le containing block du `position: fixed` — la modale se centrerait
     sur l'en-tête au lieu de l'écran. */
  return createPortal(
    <div
      className="animate-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-plum-950/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="glass-strong animate-modal-in max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[2.2rem_1.5rem_2.2rem_1.5rem/1.5rem_2.2rem_1.5rem_2.2rem] p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-ink-900">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-ink-600">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-2 text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
