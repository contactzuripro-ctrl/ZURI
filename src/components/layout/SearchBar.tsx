"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

/** Invites tapées à la machine dans le champ tant qu'il est vide. */
const PLACEHOLDER_HINTS = [
  "Rechercher une cliente…",
  "Rechercher une prestation…",
  "Rechercher un paiement…",
  "Rechercher un produit…",
];

/** Vitesses de l'effet machine à écrire (en ms). */
const TYPING_MS = 65;
const DELETING_MS = 30;
const PAUSE_FULL_TEXT_MS = 1800;
const PAUSE_BEFORE_NEXT_MS = 450;

/**
 * Fait défiler les invites avec un effet machine à écrire :
 * tape lettre par lettre, marque une pause, efface, passe à la suivante.
 */
function useTypewriter(hints: string[]): string {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let hintIndex = 0;
    let charCount = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const hint = hints[hintIndex];
      charCount += isDeleting ? -1 : 1;
      setTypedText(hint.slice(0, charCount));

      if (!isDeleting && charCount === hint.length) {
        isDeleting = true;
        timer = setTimeout(tick, PAUSE_FULL_TEXT_MS);
      } else if (isDeleting && charCount === 0) {
        isDeleting = false;
        hintIndex = (hintIndex + 1) % hints.length;
        timer = setTimeout(tick, PAUSE_BEFORE_NEXT_MS);
      } else {
        timer = setTimeout(tick, isDeleting ? DELETING_MS : TYPING_MS);
      }
    };

    timer = setTimeout(tick, TYPING_MS);
    return () => clearTimeout(timer);
  }, [hints]);

  return typedText;
}

/**
 * Barre de recherche : fin anneau en dégradé prune→or, icône en pastille
 * dorée, halo doré et élargissement au focus, invite tapée à la machine
 * avec curseur clignotant tant que le champ est vide.
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const typedHint = useTypewriter(PLACEHOLDER_HINTS);

  return (
    <div className="search-ring rounded-full p-[2px] transition-shadow duration-300 focus-within:shadow-[0_0_18px_rgba(185,138,68,0.4)]">
      <label className="group relative flex w-64 items-center gap-3 rounded-full bg-white px-1.5 py-1.5 transition-all duration-300 ease-out focus-within:w-96">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-500 text-white">
          <Search size={16} strokeWidth={2.2} />
        </span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Rechercher"
          className="w-full bg-transparent pr-4 text-sm text-ink-900 outline-none"
        />
        {query === "" && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-12 text-sm text-ink-400"
          >
            {typedHint}
            <span className="animate-cursor-blink ml-0.5 font-medium text-gold-500">
              |
            </span>
          </span>
        )}
      </label>
    </div>
  );
}
