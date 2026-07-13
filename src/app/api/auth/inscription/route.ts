import { cookies } from "next/headers";
import { verifierCodeVerification } from "@/lib/codes-verification";
import { creerSalon, normaliserNumeroWhatsapp } from "@/lib/salons";

/** Durée de la session (cookie) : 7 jours. */
const dureeSessionSecondes = 60 * 60 * 24 * 7;

/** Messages d'erreur par résultat de vérification du code WhatsApp. */
const erreursCode = {
  invalide: "Code incorrect. Vérifiez le message reçu sur WhatsApp.",
  expire: "Ce code a expiré. Demandez-en un nouveau.",
  epuise: "Trop d'essais. Demandez un nouveau code.",
} as const;

/**
 * Inscription d'un salon : exige un code de vérification WhatsApp valide
 * (envoyé par /api/auth/otp), crée le compte (mot de passe haché en bcrypt)
 * puis ouvre la session. Session minimaliste pour l'instant : cookie
 * httpOnly portant l'id du salon — à remplacer par une session signée
 * quand l'authentification sera durcie.
 */
export async function POST(request: Request) {
  let corps: Record<string, string>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const nom = corps.nom?.trim();
  const whatsapp = corps.whatsapp?.trim();
  const adresse = corps.adresse?.trim();
  const motDePasse = corps.motDePasse ?? "";

  if (!nom || !whatsapp || !adresse || !motDePasse) {
    return Response.json(
      { erreur: "Tous les champs sont obligatoires." },
      { status: 400 },
    );
  }
  if (normaliserNumeroWhatsapp(whatsapp).length < 11) {
    return Response.json(
      { erreur: "Le numéro WhatsApp semble incomplet." },
      { status: 400 },
    );
  }
  if (motDePasse.length < 6) {
    return Response.json(
      { erreur: "Le mot de passe doit faire au moins 6 caractères." },
      { status: 400 },
    );
  }

  const code = corps.code?.trim();
  if (!code) {
    return Response.json(
      { erreur: "Le code de vérification WhatsApp est obligatoire." },
      { status: 400 },
    );
  }

  try {
    const resultatCode = await verifierCodeVerification(
      normaliserNumeroWhatsapp(whatsapp),
      code,
    );
    if (resultatCode !== "valide") {
      return Response.json(
        { erreur: erreursCode[resultatCode] },
        { status: 401 },
      );
    }
    const salon = await creerSalon({ nom, whatsapp, adresse, motDePasse });
    const cookieStore = await cookies();
    cookieStore.set("zuri-salon", salon.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: dureeSessionSecondes,
    });
    return Response.json({ salon });
  } catch (erreur) {
    // 23505 = violation d'unicité Postgres (numéro déjà inscrit)
    if ((erreur as { code?: string }).code === "23505") {
      return Response.json(
        { erreur: "Ce numéro WhatsApp a déjà un compte. Connectez-vous." },
        { status: 409 },
      );
    }
    console.error("Inscription impossible :", erreur);
    return Response.json(
      { erreur: "Inscription impossible pour le moment. Réessayez." },
      { status: 500 },
    );
  }
}
