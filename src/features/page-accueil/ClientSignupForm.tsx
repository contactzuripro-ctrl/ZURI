"use client";

import { PhotoField } from "@/components/ui/PhotoField";
import { AddressField } from "@/features/connexion/AddressField";
import { AuthField } from "@/features/connexion/AuthField";
import { AuthSubmitButton } from "@/features/connexion/AuthSubmitButton";

interface ClientSignupFormProps {
  /** Appelé à la validation (UI seule : referme la modale). */
  onSubmitted: () => void;
}

/**
 * Formulaire d'inscription d'une cliente : photo de profil, nom, numéro
 * WhatsApp, adresse (autocomplétion Côte d'Ivoire) et mot de passe.
 */
export function ClientSignupForm({ onSubmitted }: ClientSignupFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitted();
      }}
      className="flex flex-col gap-4"
    >
      <PhotoField />
      <AuthField
        label="Nom complet"
        name="nomComplet"
        placeholder="Ex. Awa Koné"
      />
      <AuthField
        label="Numéro WhatsApp"
        name="whatsapp"
        type="tel"
        prefix="+225"
        placeholder="07 08 09 10 11"
      />
      <AddressField
        label="Adresse"
        name="adresse"
        placeholder="Quartier, rue, ville"
      />
      <AuthField
        label="Mot de passe"
        name="motDePasse"
        type="password"
        placeholder="Choisissez un mot de passe"
      />
      <AuthSubmitButton label="Créer mon compte" />
    </form>
  );
}
