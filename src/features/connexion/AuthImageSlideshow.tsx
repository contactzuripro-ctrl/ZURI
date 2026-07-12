"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Les visuels de l'espace prestataire, dans l'ordre d'affichage. */
const slides = [
  {
    src: "/accueil/espacepresta.webp",
    alt: "",
    title: "Votre salon, piloté depuis un seul écran",
    subtitle: "Agenda, clientes, paiements et stock réunis dans Zuri.",
  },
  {
    src: "/accueil/pexels-jonathanborba-19666186.webp",
    alt: "",
    title: "Des rendez-vous qui se confirment tout seuls",
    subtitle: "Vos clientes réservent, Zuri s'occupe du reste.",
  },
  {
    src: "/accueil/pexels-alameenng-19746421.webp",
    alt: "",
    title: "Rejoignez plus de 500 salons",
    subtitle: "Les professionnels de la beauté grandissent avec Zuri.",
  },
];

/** Durée d'affichage de chaque image avant le fondu vers la suivante. */
const slideDurationMs = 3500;

/**
 * Diaporama automatique de la page de connexion : les images sont empilées
 * plein cadre et se succèdent en fondu croisé toutes les 3,5 s. Les points
 * en bas permettent aussi de choisir une image à la main.
 */
export function AuthImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentIndex((index) => (index + 1) % slides.length),
      slideDurationMs,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative size-full overflow-hidden">
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Voile discret pour garder les textes lisibles sur les photos claires */}
      <div className="absolute inset-0 bg-plum-950/30" aria-hidden />

      {/* Texte du slide courant : fondu + légère montée, synchronisé avec l'image */}
      <div className="absolute inset-0 flex items-center justify-center px-10">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute max-w-md text-center text-white transition-all duration-1000 ${
              index === currentIndex
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-3xl font-semibold leading-snug drop-shadow-md">
              {slide.title} <span className="text-[0.6em] text-white">@</span>
            </p>
            <p className="mt-3 text-base text-white/85 drop-shadow">
              {slide.subtitle} <span className="text-[0.6em] text-white">@</span>
            </p>
          </div>
        ))}
      </div>

      {/* Points de navigation : l'actif en rose, les autres cliquables */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Afficher l'image ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-accent-500"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
