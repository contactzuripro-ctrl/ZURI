"use client";

import { AuthField } from "@/features/connexion/AuthField";
import { AuthSubmitButton } from "@/features/connexion/AuthSubmitButton";
import { PhoneField } from "@/features/connexion/PhoneField";

interface ClientLoginFormProps {
  /** Appelé à la validation (UI seule : referme la modale). */
  onSubmitted: () => void;
}

/** Formulaire de connexion d'une cliente : numéro WhatsApp + mot de passe. */
export function ClientLoginForm({ onSubmitted }: ClientLoginFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmitted();
      }}
      className="flex flex-col gap-4"
    >
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
      <AuthSubmitButton label="Se connecter" />
    </form>
  );
}
