import Image from "next/image";
import { LandingHeader } from "./LandingHeader";

/**
 * Hero de la page d'accueil, style Brutalism sobre : l'image occupe tout
 * l'écran (plein cadre, voile sombre pour la lisibilité), typo écrasante
 * en capitales blanches, aucun arrondi, bordures épaisses, noir et blanc
 * uniquement — pas de couleurs vives.
 */
export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-dvh flex-col">
      {/* Image plein écran, sans voile */}
      <Image
        src="/accueil/ZURI-coiffure.webp"
        alt="Coiffeuse réalisant une coiffure dans un salon"
        fill
        priority
        className="object-cover"
      />

      <LandingHeader />

      {/* Bloc texte posé sur l'image (pt-20 : espace sous le header fixé) */}
      <div className="relative flex flex-1 flex-col justify-center px-5 pt-20 pb-16 sm:px-10">
        <h1 className="max-w-5xl text-5xl leading-[0.95] font-black tracking-tight text-white uppercase sm:text-7xl lg:text-8xl">
          Trouvez le salon
          <br />
          parfait,
          <br />
          {/* mix-blend-screen sur bloc blanc + texte noir : les lettres
              deviennent des découpes qui laissent voir l'image derrière. */}
          <span className="bg-white px-3 text-black mix-blend-screen">
            près de chez vous.
          </span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-snug font-semibold text-white">
          Coiffure, onglerie, spa et barbiers en Afrique francophone.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#categories"
            className="border-4 border-accent-500 bg-accent-500 px-7 py-4 text-lg font-black text-plum-950 uppercase transition-colors hover:bg-plum-950 hover:text-white"
          >
            Trouver un salon
          </a>
          <a
            href="#categories"
            className="border-4 border-white px-7 py-4 text-lg font-black text-white uppercase transition-colors hover:bg-white hover:text-black"
          >
            Voir la suite ↓
          </a>
        </div>
      </div>

    </section>
  );
}
