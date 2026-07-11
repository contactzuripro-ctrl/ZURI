"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import { Modal } from "@/components/ui/Modal";
import launcherAnimation from "./animation.json";
import modalAnimation from "./modal-animation.json";

/**
 * Cercle blanc flottant en bas à droite de toutes les pages : l'animation
 * Lottie tourne en boucle à l'intérieur, le clic ouvre la modale de
 * l'assistant Zuri (UI seule — le vrai contenu d'aide viendra plus tard).
 */
export function AssistantLauncher() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* z-[44] : au-dessus du contenu et des en-têtes (z-40), sous le
          tiroir mobile (z-[45]) et le voile de modale (z-50) */}
      <button
        type="button"
        aria-label="Ouvrir l'assistant Zuri"
        onClick={() => setIsModalOpen(true)}
        className="fixed right-6 bottom-6 z-[44] flex size-18 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(43,20,38,0.30)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Lottie animationData={launcherAnimation} loop className="size-16" />
      </button>

      <Modal
        open={isModalOpen}
        title="Assistant Zuri"
        subtitle="Votre aide au quotidien"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <Lottie animationData={modalAnimation} loop className="size-44" />
          <p className="max-w-sm text-sm leading-relaxed text-ink-600">
            Bonjour ! Je suis l&apos;assistant du salon Zuri. Bientôt, je
            pourrai répondre à vos questions sur l&apos;agenda, les clientes,
            les paiements et le stock.
          </p>
        </div>
      </Modal>
    </>
  );
}
