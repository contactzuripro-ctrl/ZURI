import type { Metadata } from "next";
import { LandingHeader } from "@/features/page-accueil/LandingHeader";
import { AuthScreen } from "@/features/connexion/AuthScreen";

export const metadata: Metadata = {
  title: "Connexion — Zuri",
  description:
    "Connectez-vous à l'espace prestataire Zuri ou inscrivez votre salon.",
};

/** Page de connexion / inscription de l'espace prestataire, sous le header vitrine. */
export default function PageConnexion() {
  return (
    <>
      <LandingHeader />
      <AuthScreen />
    </>
  );
}
