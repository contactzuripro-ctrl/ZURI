import Image from "next/image";
import Link from "next/link";

/**
 * Hero de la page d'accueil, style Brutalism : typo écrasante en capitales,
 * couleurs vives (rose choc / jaune), aucun arrondi, bordures noires
 * épaisses et ombres portées pleines (décalées, sans flou).
 */
export function HeroSection() {
  return (
    <section id="hero" className="border-b-4 border-black bg-[#FAF3EA]">
      {/* Barre du haut : logo bloc + accès au back-office */}
      <div className="flex items-center justify-between border-b-4 border-black px-5 py-4 sm:px-10">
        <span className="inline-block border-4 border-black bg-[#FFE31A] px-4 py-1 text-2xl font-black tracking-tight text-black uppercase shadow-[6px_6px_0_0_#000]">
          Zuri
        </span>
        <Link
          href="/"
          className="border-4 border-black bg-black px-4 py-2 text-sm font-bold text-white uppercase transition-transform hover:-translate-y-0.5 sm:px-6"
        >
          Ouvrir le back-office →
        </Link>
      </div>

      <div className="grid items-center gap-10 px-5 py-14 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Colonne texte : gros titre, promesse, boutons d'action */}
        <div>
          <p className="mb-5 inline-block border-2 border-black bg-[#FF3D8F] px-3 py-1 text-sm font-bold text-black uppercase">
            Fait pour les salons de coiffure
          </p>
          <h1 className="text-5xl leading-[0.95] font-black tracking-tight text-black uppercase sm:text-7xl">
            Votre salon.
            <br />
            Vos règles.
            <br />
            <span className="bg-[#FFE31A] px-2">Zéro papier.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-snug font-semibold text-black">
            Agenda, clientes, paiements Orange Money &amp; Wave, stock,
            marketing : tout votre salon dans une seule app. Brut. Simple.
            Efficace.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="border-4 border-black bg-[#FF3D8F] px-7 py-4 text-lg font-black text-black uppercase shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-x-2 active:translate-y-2 active:shadow-none"
            >
              Essayer Zuri
            </Link>
            <a
              href="#fonctionnalites"
              className="border-4 border-black bg-white px-7 py-4 text-lg font-black text-black uppercase shadow-[8px_8px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] active:translate-x-2 active:translate-y-2 active:shadow-none"
            >
              Voir la suite ↓
            </a>
          </div>
        </div>

        {/* Colonne image : cadre noir épais, ombre pleine rose, badge collé */}
        <div className="relative">
          <Image
            src="/accueil/zuri-coiffure.webp"
            alt="Coiffeuse réalisant des tresses dans un salon"
            width={976}
            height={692}
            priority
            className="w-full border-4 border-black shadow-[12px_12px_0_0_#FF3D8F]"
          />
          <span className="absolute -top-5 -right-3 rotate-6 border-4 border-black bg-[#FFE31A] px-4 py-2 text-sm font-black text-black uppercase shadow-[6px_6px_0_0_#000] sm:-right-5">
            100% salon
          </span>
        </div>
      </div>

      {/* Bandeau bas façon enseigne : les 5 piliers de l'app */}
      <div className="overflow-hidden border-t-4 border-black bg-black px-5 py-3">
        <p className="text-center text-sm font-black tracking-[0.2em] whitespace-nowrap text-[#FFE31A] uppercase sm:text-base">
          Agenda ✦ Clientes ✦ Paiements ✦ Stock ✦ Marketing
        </p>
      </div>
    </section>
  );
}
