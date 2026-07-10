"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

/** Suggestions qui défilent dans le champ tant qu'il est vide. */
const PLACEHOLDER_HINTS = [
  "Rechercher une cliente…",
  "Rechercher une prestation…",
  "Rechercher un paiement…",
  "Rechercher un produit…",
];

const HINT_ROTATION_MS = 2800;

/**
 * Barre de recherche minimaliste animée : s'élargit en douceur au focus,
 * et son texte d'invite défile verticalement tant que le champ est vide.
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setHintIndex((index) => (index + 1) % PLACEHOLDER_HINTS.length),
      HINT_ROTATION_MS,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <label className="group relative flex w-56 items-center gap-2.5 rounded-full bg-surface px-4 py-2.5 transition-all duration-300 ease-out focus-within:w-80 focus-within:bg-white focus-within:shadow-[0_0_0_1.5px_var(--color-plum-800),0_8px_24px_rgba(29,29,31,0.08)]">
      <Search
        size={17}
        strokeWidth={2}
        className="shrink-0 text-ink-400 transition-colors group-focus-within:text-plum-800"
      />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Rechercher"
        className="w-full bg-transparent text-sm text-ink-900 outline-none"
      />
      {query === "" && (
        <span
          key={hintIndex}
          aria-hidden
          className="pointer-events-none absolute left-11 animate-hint-in text-sm text-ink-400"
        >
          {PLACEHOLDER_HINTS[hintIndex]}
        </span>
      )}
    </label>
  );
}
