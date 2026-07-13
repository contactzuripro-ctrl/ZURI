import { NextResponse, type NextRequest } from "next/server";

/**
 * Garde d'accès du back-office : sans cookie de session `zuri-salon`
 * (posé par /api/auth/connexion ou /api/auth/inscription), toute page
 * de gestion redirige vers la page de connexion. Contrôle de présence
 * seulement pour l'instant — cookie à signer quand l'authentification
 * sera durcie.
 */
export function proxy(request: NextRequest) {
  const session = request.cookies.get("zuri-salon");
  if (!session?.value) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/tableau-de-bord/:path*",
    "/agenda/:path*",
    "/clients/:path*",
    "/paiements/:path*",
    "/comptabilite/:path*",
    "/prestations/:path*",
    "/employes/:path*",
    "/stock/:path*",
    "/marketing/:path*",
    "/parametres/:path*",
  ],
};
