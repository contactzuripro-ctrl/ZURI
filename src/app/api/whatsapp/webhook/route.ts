/**
 * Webhook WhatsApp Cloud (Meta) — à déclarer dans la console Meta
 * (Étape 2 « Configuration de la production ») :
 *   URL de rappel : https://zuri-asp.com/api/whatsapp/webhook
 *   Vérifier le token : la valeur de WHATSAPP_WEBHOOK_VERIFY_TOKEN
 */

/** Vérification de l'abonnement : Meta appelle en GET et attend le challenge en clair. */
export async function GET(request: Request) {
  const parametres = new URL(request.url).searchParams;
  const mode = parametres.get("hub.mode");
  const token = parametres.get("hub.verify_token");
  const challenge = parametres.get("hub.challenge");

  const tokenAttendu = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
  if (mode === "subscribe" && tokenAttendu && token === tokenAttendu && challenge) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Token de vérification invalide", { status: 403 });
}

/**
 * Notifications entrantes (messages reçus, statuts délivré/lu…).
 * Pour l'instant : journalisées et acquittées — le traitement métier
 * (statuts de campagnes, réponses clientes) viendra plus tard.
 * Meta réessaie en cas de non-200, d'où l'acquittement systématique.
 */
export async function POST(request: Request) {
  try {
    const notification = await request.json();
    console.log("Webhook WhatsApp :", JSON.stringify(notification));
  } catch {
    // Corps illisible : on acquitte quand même pour éviter les réessais en boucle.
  }
  return Response.json({ recu: true });
}
