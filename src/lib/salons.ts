import bcrypt from "bcryptjs";
import { obtenirSql } from "./db";

export interface SalonEnregistre {
  id: string;
  nom: string;
  whatsapp: string;
  adresse: string;
}

/**
 * Normalise un numéro WhatsApp vers le format international sans « + »
 * (ex. « +225 07 08 09 10 11 » → « 2250708091011 »). Les formulaires
 * envoient déjà indicatif + numéro via `PhoneField` ; par sécurité, une
 * saisie locale ivoirienne (10 chiffres commençant par 0, format en
 * vigueur depuis 2021) reçoit l'indicatif 225.
 */
export function normaliserNumeroWhatsapp(saisie: string): string {
  const chiffres = saisie.replace(/\D/g, "").replace(/^00/, "");
  if (chiffres.length === 10 && chiffres.startsWith("0")) {
    return `225${chiffres}`;
  }
  return chiffres;
}

/** Crée le compte d'un salon ; échoue si le numéro WhatsApp est déjà inscrit. */
export async function creerSalon(donnees: {
  nom: string;
  whatsapp: string;
  adresse: string;
  motDePasse: string;
}): Promise<SalonEnregistre> {
  const sql = obtenirSql();
  const whatsapp = normaliserNumeroWhatsapp(donnees.whatsapp);
  const hash = await bcrypt.hash(donnees.motDePasse, 10);

  const [salon] = await sql<SalonEnregistre[]>`
    INSERT INTO salons (nom, whatsapp, adresse, mot_de_passe_hash)
    VALUES (${donnees.nom}, ${whatsapp}, ${donnees.adresse}, ${hash})
    RETURNING id, nom, whatsapp, adresse
  `;
  return salon;
}

/** Vérifie un couple numéro WhatsApp / mot de passe. Renvoie le salon ou null. */
export async function verifierIdentifiants(
  whatsappSaisi: string,
  motDePasse: string,
): Promise<SalonEnregistre | null> {
  const sql = obtenirSql();
  const whatsapp = normaliserNumeroWhatsapp(whatsappSaisi);
  const [salon] = await sql<
    (SalonEnregistre & { mot_de_passe_hash: string })[]
  >`
    SELECT id, nom, whatsapp, adresse, mot_de_passe_hash
    FROM salons
    WHERE whatsapp = ${whatsapp}
  `;
  if (!salon) return null;

  const valide = await bcrypt.compare(motDePasse, salon.mot_de_passe_hash);
  if (!valide) return null;

  return {
    id: salon.id,
    nom: salon.nom,
    whatsapp: salon.whatsapp,
    adresse: salon.adresse,
  };
}
