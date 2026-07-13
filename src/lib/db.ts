import postgres from "postgres";

/**
 * Client Postgres (Supabase) partagé par les routes API.
 * `prepare: false` est requis par le Transaction pooler de Supabase
 * (PgBouncer en mode transaction ne supporte pas les requêtes préparées).
 * Initialisation **paresseuse** : le client n'est créé qu'au premier appel,
 * jamais à l'import — sinon le build (qui évalue les modules sans les
 * variables d'exécution) échoue. En dev, il est mémorisé sur `globalThis`
 * pour survivre au rechargement à chaud.
 */
const globalPourDb = globalThis as unknown as {
  sqlClient?: ReturnType<typeof postgres>;
};

export function obtenirSql(): ReturnType<typeof postgres> {
  if (globalPourDb.sqlClient) return globalPourDb.sqlClient;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL manquante : .env.local en local, variables d'environnement sur Vercel",
    );
  }
  globalPourDb.sqlClient = postgres(url, { prepare: false, max: 5 });
  return globalPourDb.sqlClient;
}
