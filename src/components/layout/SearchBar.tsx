"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  mainNavItems,
  settingsNavItem,
} from "@/components/layout/navigation";

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

/** Pages proposées dans le menu déroulant de la recherche. */
const searchableNavItems = [...mainNavItems, settingsNavItem];

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

/** Ferme le menu déroulant quand on clique en dehors de `ref`. */
function useCloseOnOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [ref, onClose]);
}

/**
 * Barre de recherche : fin anneau en dégradé prune→rose, invite tapée à la
 * machine, et menu déroulant au focus listant les pages du menu (filtrées
 * par la saisie) pour y accéder directement.
 */
export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const typedHint = useTypewriter(PLACEHOLDER_HINTS);

  useCloseOnOutsideClick(containerRef, () => setIsOpen(false));

  const normalizedQuery = query.trim().toLowerCase();
  const matchingItems = searchableNavItems.filter((item) =>
    item.label.toLowerCase().includes(normalizedQuery),
  );

  const closeDropdown = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="search-ring rounded-full p-[2px] transition-shadow duration-300 focus-within:shadow-[0_0_18px_rgba(227,155,177,0.55)]">
        <label className="group relative flex w-64 items-center gap-3 rounded-full bg-elevated px-1.5 py-1.5 transition-all duration-300 ease-out focus-within:w-96">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-500 text-plum-950">
            <Search size={16} strokeWidth={2.2} />
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
            aria-label="Rechercher"
            className="w-full bg-transparent pr-4 text-sm text-ink-900 outline-none"
          />
          {query === "" && (
            <span
              aria-hidden
              className="pointer-events-none absolute left-12 text-sm text-ink-400"
            >
              {typedHint}
              <span className="animate-cursor-blink ml-0.5 font-medium text-accent-500">
                |
              </span>
            </span>
          )}
        </label>
      </div>

      {isOpen && (
        <div className="animate-dropdown-in absolute top-full right-0 z-50 mt-3 w-72 rounded-[1.8rem_1.2rem_1.8rem_1.2rem/1.2rem_1.8rem_1.2rem_1.8rem] border border-hairline bg-elevated p-2 shadow-xl">
          <p className="px-3 pt-2 pb-1 text-xs font-medium uppercase tracking-wider text-ink-400">
            Pages
          </p>
          {matchingItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeDropdown}
                style={{ animationDelay: `${index * 35}ms` }}
                className="animate-dropdown-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-900 transition-colors hover:bg-accent-500/15"
              >
                <span className="flex size-7 items-center justify-center rounded-lg bg-surface text-plum-800">
                  <Icon size={15} strokeWidth={2} />
                </span>
                {item.label}
              </Link>
            );
          })}
          {matchingItems.length === 0 && (
            <p className="px-3 py-2.5 text-sm text-ink-400">
              Aucune page ne correspond à « {query} »
            </p>
          )}
        </div>
      )}
    </div>
  );
}
