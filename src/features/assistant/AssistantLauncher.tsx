"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { X } from "lucide-react";
import { AssistantChat } from "./AssistantChat";
import launcherAnimation from "./animation.json";

/**
 * Assistant Zuri : cercle blanc flottant en bas à droite + volet latéral
 * intégré à l'écran. Sur desktop le volet est une colonne du layout — le
 * contenu de la page se compresse pour lui laisser la place (même principe
 * que la sidebar) ; sur mobile (< lg) il devient un tiroir en superposition
 * avec voile, comme le menu. UI seule : le chat répond un message de démo.
 */
export function AssistantLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  // Largeur/opacité animées : fermé = 0, ouvert = colonne de 22 rem
  // (pleine largeur plafonnée sur mobile).
  const panelWidth = isOpen
    ? "w-[22rem] max-lg:w-[min(22rem,85vw)] opacity-100"
    : "pointer-events-none w-0 opacity-0";

  return (
    <>
      {/* Le cercle s'efface quand le volet est ouvert (le ✕ du volet ferme) */}
      <button
        type="button"
        aria-label="Ouvrir l'assistant Zuri"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className={`fixed right-6 bottom-6 z-[44] flex size-18 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(43,20,38,0.30)] transition-all duration-200 hover:scale-105 active:scale-95 ${
          isOpen ? "pointer-events-none scale-0 opacity-0" : ""
        }`}
      >
        <Lottie animationData={launcherAnimation} loop className="size-16" />
      </button>

      {/* Voile mobile : sur petit écran le volet passe en superposition */}
      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[45] bg-plum-950/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Halos colorés derrière la vitre du volet : c'est eux que le
          backdrop-blur floute (même principe que la sidebar — sans eux,
          le verre n'a que le fond blanc de la page à flouter). */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-y-0 right-0 overflow-hidden rounded-l-[2.5rem] transition-all duration-300 max-lg:z-[45] lg:-z-10 ${panelWidth}`}
      >
        <div className="absolute -top-16 -right-14 size-72 rounded-full bg-accent-400/50 blur-3xl" />
        <div className="absolute top-1/3 -left-10 size-64 rounded-full bg-plum-600/30 blur-3xl" />
        <div className="absolute -right-10 -bottom-16 size-72 rounded-full bg-accent-500/40 blur-3xl" />
      </div>

      {/* Volet : colonne du layout sur desktop (compresse le contenu),
          tiroir fixé à droite sur mobile. */}
      <aside
        aria-label="Assistant Zuri"
        className={`glass flex shrink-0 flex-col overflow-hidden rounded-l-[2.5rem] transition-all duration-300 max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-50 lg:sticky lg:top-0 lg:h-screen ${panelWidth}`}
      >
        {/* Largeur intérieure fixe : le texte ne se recompose pas pendant
            l'animation d'ouverture, il est simplement révélé. */}
        <div className="flex h-full w-[22rem] max-w-full shrink-0 flex-col p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Lottie animationData={launcherAnimation} loop className="size-12" />
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  Assistant Zuri
                </h2>
                <p className="text-xs text-ink-600">Votre aide au quotidien</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer l'assistant"
              className="rounded-full p-2 text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <AssistantChat />
        </div>
      </aside>
    </>
  );
}
