import type { ReactNode } from "react";

/**
 * Template racine : remonté par Next.js à chaque changement de page,
 * il rejoue l'animation d'entrée (fondu + glissement) sur le contenu.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
