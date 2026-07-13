"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressField } from "./AddressField";
import { AuthField } from "./AuthField";
import { AuthSubmitButton } from "./AuthSubmitButton";
import { PhoneField } from "./PhoneField";

interface DonneesSalon {
  nom: string;
  whatsapp: string;
  adresse: string;
  motDePasse: string;
}

/**
 * Inscription d'un salon en 2 étapes : 1) le formulaire envoie un code de
 * vérification sur le WhatsApp saisi (/api/auth/otp) ; 2) la saisie du code
 * crée le compte (/api/auth/inscription) puis direction le tableau de bord.
 * En développement, si l'envoi WhatsApp n'est pas possible (compte de test
 * Meta), le code est affiché sous le champ (`codeDev`).
 */
export function SignupForm() {
  const router = useRouter();
  const [etape, setEtape] = useState<"formulaire" | "code">("formulaire");
  const [donnees, setDonnees] = useState<DonneesSalon | null>(null);
  const [codeDev, setCodeDev] = useState<string | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  const demanderCode = async (salon: DonneesSalon): Promise<boolean> => {
    const reponse = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp: salon.whatsapp }),
    });
    const retour = await reponse.json();
    if (!reponse.ok) {
      setErreur(retour.erreur ?? "Envoi du code impossible. Réessayez.");
      return false;
    }
    setCodeDev(retour.codeDev ?? null);
    return true;
  };

  const soumettreFormulaire = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const champs = new FormData(event.currentTarget);
    const salon: DonneesSalon = {
      nom: String(champs.get("nomDuSalon") ?? ""),
      whatsapp: String(champs.get("whatsapp") ?? ""),
      adresse: String(champs.get("adresse") ?? ""),
      motDePasse: String(champs.get("motDePasse") ?? ""),
    };
    setErreur(null);
    setEnCours(true);
    try {
      if (await demanderCode(salon)) {
        setDonnees(salon);
        setEtape("code");
      }
    } catch {
      setErreur("Envoi du code impossible. Vérifiez votre réseau et réessayez.");
    }
    setEnCours(false);
  };

  const soumettreCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!donnees) return;
    const code = String(new FormData(event.currentTarget).get("code") ?? "");
    setErreur(null);
    setEnCours(true);
    try {
      const reponse = await fetch("/api/auth/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...donnees, code }),
      });
      const retour = await reponse.json();
      if (!reponse.ok) {
        setErreur(retour.erreur ?? "Inscription impossible. Réessayez.");
        setEnCours(false);
        return;
      }
      router.push("/tableau-de-bord");
    } catch {
      setErreur("Inscription impossible. Vérifiez votre réseau et réessayez.");
      setEnCours(false);
    }
  };

  const renvoyerCode = async () => {
    if (!donnees || enCours) return;
    setErreur(null);
    setEnCours(true);
    try {
      await demanderCode(donnees);
    } catch {
      setErreur("Envoi du code impossible. Vérifiez votre réseau et réessayez.");
    }
    setEnCours(false);
  };

  if (etape === "code" && donnees) {
    return (
      <form onSubmit={soumettreCode} className="flex flex-col gap-4">
        <p className="text-[15px] leading-relaxed text-ink-600">
          Un code de vérification à 6 chiffres a été envoyé sur le WhatsApp du{" "}
          <span className="font-semibold text-plum-900">+{donnees.whatsapp}</span>.
        </p>
        <AuthField
          label="Code reçu sur WhatsApp"
          name="code"
          placeholder="123456"
        />
        {codeDev && (
          <p className="text-sm text-ink-600">
            Mode développement : votre code est{" "}
            <span className="font-semibold text-plum-900">{codeDev}</span> (le
            compte WhatsApp de test ne peut pas encore envoyer le message).
          </p>
        )}
        {erreur && (
          <p role="alert" className="text-sm font-medium text-danger-700">
            {erreur}
          </p>
        )}
        <AuthSubmitButton label="Vérifier et créer mon salon" pending={enCours} />
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => {
              setEtape("formulaire");
              setErreur(null);
            }}
            className="font-medium text-ink-600 hover:text-plum-900 hover:underline"
          >
            Modifier le numéro
          </button>
          <button
            type="button"
            onClick={renvoyerCode}
            disabled={enCours}
            className="font-medium text-plum-900 hover:underline disabled:opacity-50"
          >
            Renvoyer le code
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={soumettreFormulaire} className="flex flex-col gap-4">
      <AuthField
        label="Nom du salon"
        name="nomDuSalon"
        placeholder="Ex. Zuri Beauté Cocody"
        defaultValue={donnees?.nom}
      />
      <PhoneField
        label="Numéro WhatsApp"
        name="whatsapp"
        placeholder="07 08 09 10 11"
        defaultValue={donnees?.whatsapp}
      />
      <AddressField
        label="Localisation de la structure"
        name="adresse"
        placeholder="Quartier, rue, ville"
        defaultValue={donnees?.adresse}
      />
      <AuthField
        label="Mot de passe"
        name="motDePasse"
        type="password"
        placeholder="Choisissez un mot de passe"
        defaultValue={donnees?.motDePasse}
      />
      {erreur && (
        <p role="alert" className="text-sm font-medium text-danger-700">
          {erreur}
        </p>
      )}
      <AuthSubmitButton label="Recevoir mon code WhatsApp" pending={enCours} />
    </form>
  );
}
