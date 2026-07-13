import { createHash, randomInt } from "crypto";
import { obtenirSql } from "./db";

/** Durée de validité d'un code : 10 minutes. */
const validiteMinutes = 10;
/** Nombre d'essais autorisés par code avant d'en exiger un nouveau. */
const tentativesMax = 5;

/** Le code n'est jamais stocké en clair : seulement son empreinte SHA-256. */
function hacherCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

/**
 * Génère un code à 6 chiffres pour ce numéro et l'enregistre (un seul code
 * actif par numéro : un renvoi remplace le précédent).
 */
export async function genererCodeVerification(whatsapp: string): Promise<string> {
  const sql = obtenirSql();
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await sql`
    INSERT INTO codes_verification (whatsapp, code_hash, expire_le, tentatives)
    VALUES (${whatsapp}, ${hacherCode(code)}, now() + ${`${validiteMinutes} minutes`}::interval, 0)
    ON CONFLICT (whatsapp) DO UPDATE
      SET code_hash = EXCLUDED.code_hash,
          expire_le = EXCLUDED.expire_le,
          tentatives = 0,
          envoye_le = now()
  `;
  return code;
}

export type ResultatVerification = "valide" | "invalide" | "expire" | "epuise";

/**
 * Vérifie le code saisi pour ce numéro. Chaque échec compte ; au-delà de
 * 5 essais le code est brûlé. Un code valide est consommé (usage unique).
 */
export async function verifierCodeVerification(
  whatsapp: string,
  code: string,
): Promise<ResultatVerification> {
  const sql = obtenirSql();
  const [enregistrement] = await sql<
    { code_hash: string; expire_le: Date; tentatives: number }[]
  >`
    UPDATE codes_verification
    SET tentatives = tentatives + 1
    WHERE whatsapp = ${whatsapp}
    RETURNING code_hash, expire_le, tentatives
  `;

  if (!enregistrement) return "invalide";
  if (enregistrement.tentatives > tentativesMax) return "epuise";
  if (new Date(enregistrement.expire_le) < new Date()) return "expire";
  if (enregistrement.code_hash !== hacherCode(code)) return "invalide";

  await sql`DELETE FROM codes_verification WHERE whatsapp = ${whatsapp}`;
  return "valide";
}
