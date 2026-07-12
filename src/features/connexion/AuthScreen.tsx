"use client";

import { useState } from "react";
import { AuthImageSlideshow } from "./AuthImageSlideshow";
import { AuthTabs, type AuthTab } from "./AuthTabs";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

/**
 * Écran de connexion de l'espace prestataire, sous le header vitrine
 * (fixe, 76 px) et coupé en deux : contenu de connexion sur fond blanc à
 * gauche, image plein cadre fixe à droite (image masquée sous `lg`,
 * le formulaire prend tout l'écran).
 * Page publique aux couleurs fixes : elle ne suit pas le mode nuit du
 * back-office, d'où des blancs/prunes en dur plutôt que les tokens du thème.
 */
export function AuthScreen() {
  const [activeTab, setActiveTab] = useState<AuthTab>("connexion");

  return (
    <div className="flex h-dvh overflow-hidden bg-white pt-19">
      {/* Moitié gauche : le contenu de connexion sur fond blanc */}
      <div className="flex w-full items-center justify-center overflow-y-auto px-5 py-16 lg:w-1/2 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-plum-900">
            Espace prestataire
          </h1>
          <p className="mt-2 text-[15px] text-ink-600">
            {activeTab === "connexion"
              ? "Heureuse de vous revoir ! Connectez-vous à votre salon."
              : "Créez le compte de votre salon en quelques secondes."}
          </p>

          <div className="mt-8">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="mt-8">
            {activeTab === "connexion" ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>

      {/* Moitié droite : diaporama automatique, masqué sur mobile/tablette */}
      <div className="relative hidden w-1/2 lg:block">
        <AuthImageSlideshow />
      </div>
    </div>
  );
}
