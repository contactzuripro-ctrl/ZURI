"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { PhoneField } from "./PhoneField";

/**
 * Formulaire de connexion : numéro WhatsApp + mot de passe, vérifiés
 * contre la base via /api/auth/connexion. Succès → tableau de bord.
 */
export function LoginForm() {
  const router = useRouter();
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const soumettre = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const champs = new FormData(event.currentTarget);
    setErreur(null);
    setEnCours(true);

    try {
      const reponse = await fetch("/api/auth/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp: champs.get("whatsapp"),
          motDePasse: champs.get("motDePasse"),
        }),
      });
      const donnees = await reponse.json();
      if (!reponse.ok) {
        setErreur(donnees.erreur ?? "Connexion impossible. Réessayez.");
        setEnCours(false);
        return;
      }
      router.push("/tableau-de-bord");
    } catch {
      setErreur("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setEnCours(false);
    }
  };

  return (
    <form onSubmit={soumettre} className="flex flex-col gap-4">
      <PhoneField
        label="Numéro WhatsApp"
        name="whatsapp"
        placeholder="07 08 09 10 11"
      />
      <AuthField
        label="Mot de passe"
        name="motDePasse"
        type="password"
        placeholder="Votre mot de passe"
      />
      {erreur && (
        <p role="alert" className="text-sm font-medium text-danger-700">
          {erreur}
        </p>
      )}
      <AuthSubmitButton label="Se connecter" pending={enCours} />
    </form>
  );
}
