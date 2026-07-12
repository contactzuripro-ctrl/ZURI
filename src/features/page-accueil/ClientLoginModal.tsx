"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { AuthTabs, type AuthTab } from "@/features/connexion/AuthTabs";
import { ClientLoginForm } from "./ClientLoginForm";
import { ClientSignupForm } from "./ClientSignupForm";

interface ClientLoginModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modale de connexion / inscription côté client (bouton « Se connecter »
 * du header vitrine) : panneau rectangulaire au style vitrine (blanc,
 * aucun arrondi), carte photo à gauche, onglets Connexion / Inscription
 * à droite. UI seule : valider referme la modale, la vraie authentification
 * client sera branchée plus tard. Se ferme par Échap, clic sur le voile ou ✕.
 * Portail vers <body> comme la `Modal` du back-office (en-têtes animés).
 */
export function ClientLoginModal({ open, onClose }: ClientLoginModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("connexion");

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    // Bloque le défilement de la vitrine tant que la modale est ouverte
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="animate-modal-overlay fixed inset-0 z-[60] flex items-center justify-center bg-plum-950/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Connexion"
        className="animate-modal-in grid max-h-[90vh] w-full max-w-5xl overflow-y-auto bg-white shadow-[0_24px_70px_rgba(46,19,39,0.4)] sm:grid-cols-2"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Carte photo : à gauche sur desktop, bandeau au-dessus sur mobile */}
        <div className="relative h-44 sm:h-auto">
          {/* `priority` : la modale n'est montée qu'ouverte, et le lazy-loading
              ne se déclenche pas de façon fiable dans l'overlay fixe */}
          <Image
            src="/accueil/pexels-alameenng-19746421.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 32rem, 100vw"
            className="object-cover"
          />
        </div>

        {/* Connexion / inscription à droite */}
        <div className="relative px-6 py-10 sm:px-9">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 p-2 text-ink-600 transition-colors hover:text-plum-900"
          >
            <X size={18} strokeWidth={2} />
          </button>

          <h2 className="text-2xl font-semibold tracking-tight text-plum-900">
            {activeTab === "connexion"
              ? "Connexion cliente"
              : "Inscription cliente"}
          </h2>
          <p className="mt-2 text-[15px] text-ink-600">
            {activeTab === "connexion"
              ? "Connectez-vous pour réserver vos rendez-vous beauté."
              : "Créez votre compte pour réserver en quelques secondes."}
          </p>

          <div className="mt-6">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="mt-6">
            {activeTab === "connexion" ? (
              <ClientLoginForm onSubmitted={onClose} />
            ) : (
              <ClientSignupForm onSubmitted={onClose} />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
