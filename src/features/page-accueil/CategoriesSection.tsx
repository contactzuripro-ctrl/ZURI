import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

interface Category {
  label: string;
  imageUrl: string;
}

const categories: Category[] = [
  { label: "Coiffure", imageUrl: "/accueil/coiffure.png" },
  { label: "Onglerie", imageUrl: "/accueil/ongle.png" },
  { label: "Spa", imageUrl: "/accueil/spa.jpg" },
  { label: "Soins", imageUrl: "/accueil/soins.png" },
];

/**
 * Deuxième section de l'accueil : les 4 catégories d'établissements en
 * grandes box carrées, nom centré sur la photo (voile sombre pour la
 * lisibilité, accentué au survol) — aucun arrondi. Chaque bloc monte en
 * fondu au défilement (rejoué à chaque passage) via `Reveal`.
 */
export function CategoriesSection() {
  return (
    <section id="categories" className="bg-white px-5 py-24 sm:px-10">
      {/* En-tête de section : surtitre discret, question en grand, sous-titre */}
      <Reveal className="mx-auto mb-16 max-w-3xl text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-accent-500 uppercase">
          Catégories
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-plum-900 sm:text-5xl">
          Que recherchez-vous&nbsp;?
        </h2>
        <p className="mt-4 text-lg text-ink-600 sm:text-xl">
          Des établissements de beauté vérifiés, près de chez vous.
        </p>
      </Reveal>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.label} delay={index * 120}>
            <a
              href="#"
              className="group relative block aspect-square overflow-hidden"
            >
              <Image
                src={category.imageUrl}
                alt={category.label}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Voile pour la lisibilité du titre, renforcé au survol */}
              <div className="absolute inset-0 bg-plum-950/35 transition-colors duration-300 group-hover:bg-plum-950/50" />
              {/* Titre centré au milieu de la box, souligné d'un trait blanc */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <h3 className="text-xl font-semibold tracking-[0.18em] text-white uppercase">
                  {category.label}
                </h3>
                <span className="h-0.5 w-12 bg-accent-400 transition-all duration-300 group-hover:w-20" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Accès au catalogue complet des établissements */}
      <Reveal delay={200} className="mt-14 text-center">
        <a
          href="#"
          className="inline-block border border-plum-900 px-8 py-3.5 font-medium text-plum-900 transition-colors hover:bg-plum-900 hover:text-white"
        >
          Voir tous les établissements
        </a>
      </Reveal>
    </section>
  );
}
