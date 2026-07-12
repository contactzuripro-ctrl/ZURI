import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

interface ProStat {
  value: string;
  description: string;
}

const proStats: ProStat[] = [
  { value: "+50%", description: "de fréquence sur les RDV pris en ligne" },
  {
    value: "4x",
    description: "moins d'oublis grâce aux rappels WhatsApp des rendez-vous",
  },
  {
    value: "50%",
    description: "des RDV en ligne pris en dehors des horaires d'ouverture",
  },
  { value: "+500", description: "Salons & instituts en Afrique francophone" },
  // La 5ᵉ cellule (mise en avant + bouton) est insérée à la main dans la grille
  { value: "+80 millions F", description: "De rendez-vous vendus" },
];

/**
 * Section « professionnels » de l'accueil : grille de chiffres clés à
 * fines lignes (3×2), cellule centrale mise en avant (filet rose épais,
 * ombre) avec l'appel à l'action vers l'espace prestataire — minimalisme
 * blanc/prune/rose, aucun arrondi.
 */
export function ProSection() {
  return (
    <section id="professionnels" className="bg-white px-5 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.3em] text-accent-500 uppercase">
            Une forte croissance
          </p>
          <span className="mt-3 block h-0.5 w-10 bg-accent-500" />
          <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-plum-900 sm:text-4xl xl:text-5xl">
            Vous êtes un professionnel de la beauté&nbsp;? Découvrez la prise
            de RDV en ligne&nbsp;!
          </h2>
        </Reveal>

        {/* Grille : lignes fines via gap-px sur fond hairline */}
        <Reveal delay={150} className="mt-14">
          <div className="grid grid-cols-1 gap-px border border-plum-900/10 bg-plum-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {proStats.slice(0, 4).map((stat) => (
              <StatCell key={stat.value} stat={stat} />
            ))}

            {/* Cellule mise en avant : filet rose, ombre, appel à l'action */}
            <div className="relative z-10 order-last flex flex-col items-start gap-4 border-t-4 border-accent-500 bg-white px-8 py-12 shadow-[0_18px_50px_rgba(58,24,50,0.14)] sm:order-none">
              <p className="text-4xl font-semibold tracking-tight text-plum-900 sm:text-5xl">
                5 RDV
              </p>
              <p className="text-lg text-ink-600">pris toutes les secondes</p>
              <Link
                href="/connexion"
                className="mt-4 bg-plum-900 px-6 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-85"
              >
                Je suis un professionnel de beauté
              </Link>
            </div>

            <StatCell stat={proStats[4]} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({ stat }: { stat: ProStat }) {
  return (
    <div className="flex flex-col justify-center gap-3 bg-white px-8 py-12">
      <p className="text-4xl font-semibold tracking-tight text-plum-900 sm:text-5xl">
        {stat.value}
      </p>
      <p className="max-w-xs text-lg leading-snug text-ink-600">
        {stat.description}
      </p>
    </div>
  );
}
