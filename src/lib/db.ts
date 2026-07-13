import postgres from "postgres";

/**
 * Client Postgres (Supabase) partagé par les routes API.
 * `prepare: false` est requis par le Transaction pooler de Supabase
 * (PgBouncer en mode transaction ne supporte pas les requêtes préparées).
 * En dev, le client est mémorisé sur `globalThis` pour survivre au
 * rechargement à chaud sans ouvrir une connexion par modification.
 */
const globalPourDb = globalThis as unknown as { sqlClient?: ReturnType<typeof postgres> };

function creerClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL manquante : renseignez-la dans .env.local");
  }
  return postgres(url, { prepare: false, max: 5 });
}

export const sql = globalPourDb.sqlClient ?? creerClient();

if (process.env.NODE_ENV !== "production") {
  globalPourDb.sqlClient = sql;
}
