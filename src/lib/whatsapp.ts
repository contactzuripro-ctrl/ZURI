/**
 * Envoi de messages via l'API WhatsApp Cloud (Meta).
 * Identifiants dans .env.local — en dev c'est le numéro de TEST Meta :
 * il ne peut écrire qu'aux destinataires enregistrés comme testeurs.
 */

const graphApiBase = "https://graph.facebook.com/v25.0";

export interface ResultatEnvoi {
  envoye: boolean;
  /** Détail technique en cas d'échec (journalisé, pas montré aux clientes). */
  erreur?: string;
}

/**
 * Envoie le code de vérification par WhatsApp via le modèle « Authentication »
 * (`WHATSAPP_TEMPLATE_OTP`). Si le modèle n'est pas configuré — cas du compte
 * de test Meta, qui n'autorise pas sa création — l'appelant bascule sur le
 * repli de développement (code affiché à l'écran).
 */
export async function envoyerCodeParWhatsapp(
  numero: string,
  code: string,
): Promise<ResultatEnvoi> {
  const idNumero = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const modele = process.env.WHATSAPP_TEMPLATE_OTP;

  if (!idNumero || !token) {
    return { envoye: false, erreur: "Identifiants WhatsApp absents de .env.local" };
  }
  if (!modele) {
    return { envoye: false, erreur: "WHATSAPP_TEMPLATE_OTP non configuré" };
  }

  try {
    const reponse = await fetch(`${graphApiBase}/${idNumero}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: numero,
        type: "template",
        template: {
          name: modele,
          language: { code: "fr" },
          components: [
            { type: "body", parameters: [{ type: "text", text: code }] },
            {
              type: "button",
              sub_type: "url",
              index: "0",
              parameters: [{ type: "text", text: code }],
            },
          ],
        },
      }),
    });

    if (!reponse.ok) {
      const corps = await reponse.json().catch(() => null);
      return {
        envoye: false,
        erreur: corps?.error?.message ?? `HTTP ${reponse.status}`,
      };
    }
    return { envoye: true };
  } catch (erreur) {
    return { envoye: false, erreur: (erreur as Error).message };
  }
}
