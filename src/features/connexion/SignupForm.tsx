"use client";

import { useRouter } from "next/navigation";
import { AddressField } from "./AddressField";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";

/**
 * Formulaire d'inscription d'un salon : nom, numéro WhatsApp, adresse,
 * mot de passe. UI seule : valider redirige vers le back-office sans
 * rien enregistrer — la vraie création de compte sera branchée plus tard.
 */
export function SignupForm() {
  const router = useRouter();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/tableau-de-bord");
      }}
      className="flex flex-col gap-4"
    >
      <AuthField
        label="Nom du salon"
        name="nomDuSalon"
        placeholder="Ex. Zuri Beauté Cocody"
      />
      <AuthField
        label="Numéro WhatsApp"
        name="whatsapp"
        type="tel"
        prefix="+225"
        placeholder="07 08 09 10 11"
      />
      <AddressField
        label="Localisation de la structure"
        name="adresse"
        placeholder="Quartier, rue, ville"
      />
      <AuthField
        label="Mot de passe"
        name="motDePasse"
        type="password"
        placeholder="Choisissez un mot de passe"
      />
      <AuthSubmitButton label="Créer mon salon" />
    </form>
  );
}
