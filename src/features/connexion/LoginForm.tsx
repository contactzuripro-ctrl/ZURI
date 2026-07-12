"use client";

import { useRouter } from "next/navigation";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";

/**
 * Formulaire de connexion : numéro WhatsApp + mot de passe.
 * UI seule : valider redirige vers le back-office sans vérification —
 * la vraie authentification sera branchée plus tard.
 */
export function LoginForm() {
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
        label="Numéro WhatsApp"
        name="whatsapp"
        type="tel"
        prefix="+225"
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
