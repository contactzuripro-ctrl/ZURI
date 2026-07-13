import { sql } from "@/lib/db";
import { genererCodeVerification } from "@/lib/codes-verification";
import { normaliserNumeroWhatsapp } from "@/lib/salons";
import { envoyerCodeParWhatsapp } from "@/lib/whatsapp";

/**
 * Envoie un code de vérification WhatsApp avant l'inscription.
 * Si l'envoi WhatsApp est impossible (compte de test Meta sans modèle
 * d'authentification), en développement uniquement le code est renvoyé
 * dans la réponse (`codeDev`) pour que le flux reste testable de bout
 * en bout — jamais en production.
 */
export async function POST(request: Request) {
  let corps: Record<string, string>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const saisie = corps.whatsapp?.trim();
  if (!saisie) {
    return Response.json(
      { erreur: "Le numéro WhatsApp est obligatoire." },
      { status: 400 },
    );
  }
  const whatsapp = normaliserNumeroWhatsapp(saisie);
  if (whatsapp.length < 11) {
    return Response.json(
      { erreur: "Le numéro WhatsApp semble incomplet." },
      { status: 400 },
    );
  }

  try {
    const [dejaInscrit] = await sql`SELECT 1 FROM salons WHERE whatsapp = ${whatsapp}`;
    if (dejaInscrit) {
      return Response.json(
        { erreur: "Ce numéro WhatsApp a déjà un compte. Connectez-vous." },
        { status: 409 },
      );
    }

    const code = await genererCodeVerification(whatsapp);
    const envoi = await envoyerCodeParWhatsapp(whatsapp, code);

    if (envoi.envoye) {
      return Response.json({ envoye: true });
    }

    if (process.env.NODE_ENV === "development") {
      console.warn(`OTP non envoyé (${envoi.erreur}) — code de dev pour ${whatsapp} : ${code}`);
      return Response.json({ envoye: false, codeDev: code });
    }

    console.error("Envoi du code WhatsApp impossible :", envoi.erreur);
    return Response.json(
      { erreur: "Impossible d'envoyer le code WhatsApp. Réessayez dans un instant." },
      { status: 502 },
    );
  } catch (erreur) {
    console.error("Génération du code impossible :", erreur);
    return Response.json(
      { erreur: "Impossible d'envoyer le code pour le moment. Réessayez." },
      { status: 500 },
    );
  }
}
