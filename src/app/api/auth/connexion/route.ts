import { cookies } from "next/headers";
import { verifierIdentifiants } from "@/lib/salons";

/** Durée de la session (cookie) : 7 jours. */
const dureeSessionSecondes = 60 * 60 * 24 * 7;

/**
 * Connexion d'un salon : vérifie le couple numéro WhatsApp / mot de passe
 * contre la base puis ouvre la session (cookie httpOnly avec l'id du salon).
 */
export async function POST(request: Request) {
  let corps: Record<string, string>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ erreur: "Requête invalide." }, { status: 400 });
  }

  const whatsapp = corps.whatsapp?.trim();
  const motDePasse = corps.motDePasse ?? "";
  if (!whatsapp || !motDePasse) {
    return Response.json(
      { erreur: "Numéro WhatsApp et mot de passe sont obligatoires." },
      { status: 400 },
    );
  }

  try {
    const salon = await verifierIdentifiants(whatsapp, motDePasse);
    if (!salon) {
      return Response.json(
        { erreur: "Numéro ou mot de passe incorrect." },
        { status: 401 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("zuri-salon", salon.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: dureeSessionSecondes,
    });
    return Response.json({ salon });
  } catch (erreur) {
    console.error("Connexion impossible :", erreur);
    return Response.json(
      { erreur: "Connexion impossible pour le moment. Réessayez." },
      { status: 500 },
    );
  }
}
