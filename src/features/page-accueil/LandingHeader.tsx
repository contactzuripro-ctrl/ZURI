"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";

interface MenuEntry {
  title: string;
  description?: string;
}

interface HeaderMenu {
  label: string;
  entries: MenuEntry[];
}

const headerMenus: HeaderMenu[] = [
  {
    label: "Métier",
    entries: [
      { title: "Coiffure" },
      { title: "Barbershop" },
      { title: "Onglerie" },
      { title: "Spa & institut" },
    ],
  },
  {
    label: "Solutions",
    entries: [
      {
        title: "Réservation en ligne 24h/24",
        description: "Avec une page d'établissement dédiée.",
      },
      {
        title: "Gestion de votre agenda",
        description: "Votre quotidien professionnel sous contrôle.",
      },
      {
        title: "Encaissement Orange Money & Wave",
        description: "Encaissez vos clientes. Sans terminal.",
      },
      {
        title: "Solutions marketing",
        description: "Promouvoir son activité. Sans publicité.",
      },
      {
        title: "Pilotage de l'établissement",
        description: "Stocks, ventes, résultats. Centralisés.",
      },
      {
        title: "Fiches clientes",
        description: "Historique, photos, notes privées.",
      },
    ],
  },
  {
    label: "Ressources",
    entries: [
      { title: "Blog" },
      { title: "Centre d'aide" },
      { title: "Contact" },
    ],
  },
];

/**
 * Header minimaliste de la page d'accueil (le reste de la page garde son
 * propre style) : barre blanche sobre, logo texte, menus déroulants
 * discrets (Métier, Solutions, Ressources) + lien Tarifs, connexion et
 * bouton « Demander une démo ». Un seul menu ouvert à la fois ;
 * fermeture au clic extérieur et à Échap.
 */
export function LandingHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useCloseOnOutsideClick(containerRef, () => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
  });

  const toggleMenu = (label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  };

  return (
    <header
      ref={containerRef}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpenMenu(null);
          setIsMobileMenuOpen(false);
        }
      }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 border-b border-plum-900/10 bg-white px-5 py-4 sm:px-10"
    >
      {/* Logo en texte simple */}
      <Link
        href="/"
        className="text-2xl font-black tracking-[0.12em] text-plum-900 uppercase"
      >
        Zuri
      </Link>

      {/* Menus centraux (desktop) */}
      <nav className="hidden items-center gap-1 lg:flex">
        {headerMenus.map((menu) => (
          <div key={menu.label} className="relative">
            <button
              type="button"
              onClick={() => toggleMenu(menu.label)}
              aria-expanded={openMenu === menu.label}
              className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium transition-colors ${
                openMenu === menu.label
                  ? "bg-accent-500/20 text-plum-900"
                  : "text-plum-900/75 hover:bg-accent-500/10 hover:text-plum-900"
              }`}
            >
              {menu.label}
              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`text-accent-500 transition-transform ${
                  openMenu === menu.label ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === menu.label && (
              <div
                className={`absolute top-full left-0 mt-2 border border-plum-900/10 bg-white p-6 shadow-[0_16px_40px_rgba(58,24,50,0.12)] ${
                  menu.entries[0]?.description
                    ? "grid w-[36rem] grid-cols-2 gap-x-10 gap-y-6"
                    : "flex w-52 flex-col gap-4"
                }`}
              >
                {menu.entries.map((entry) => (
                  <a
                    key={entry.title}
                    href="#"
                    onClick={() => setOpenMenu(null)}
                    className="group block"
                  >
                    <p className="font-medium text-plum-900 group-hover:underline">
                      {entry.title}
                    </p>
                    {entry.description && (
                      <p className="mt-1 text-sm leading-snug text-ink-600">
                        {entry.description}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <a
          href="#tarifs"
          className="px-4 py-2 text-[15px] font-medium text-plum-900/75 transition-colors hover:bg-accent-500/10 hover:text-plum-900"
        >
          Tarifs
        </a>
      </nav>

      {/* Actions à droite (desktop) */}
      <div className="hidden items-center gap-6 lg:flex">
        <Link
          href="/tableau-de-bord"
          className="text-[15px] font-medium text-plum-900 hover:underline"
        >
          Se connecter
        </Link>
        <Link
          href="/tableau-de-bord"
          className="bg-plum-900 px-5 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-85"
        >
          Espace prestataire
        </Link>
      </div>

      {/* Burger (mobile / tablette) */}
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMobileMenuOpen}
        className="p-2 text-plum-900 lg:hidden"
      >
        {isMobileMenuOpen ? (
          <X size={24} strokeWidth={2} />
        ) : (
          <Menu size={24} strokeWidth={2} />
        )}
      </button>

      {/* Panneau mobile : tout le contenu du header, à plat */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-plum-900/10 bg-white px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-7">
            {headerMenus.map((menu) => (
              <div key={menu.label}>
                <p className="mb-3 text-xs font-semibold tracking-wider text-accent-500 uppercase">
                  {menu.label}
                </p>
                <div className="flex flex-col gap-3">
                  {menu.entries.map((entry) => (
                    <a
                      key={entry.title}
                      href="#"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <p className="font-medium text-plum-900">{entry.title}</p>
                      {entry.description && (
                        <p className="mt-0.5 text-sm leading-snug text-ink-600">
                          {entry.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="#tarifs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-medium text-plum-900"
            >
              Tarifs
            </a>

            <div className="flex flex-col gap-3 border-t border-plum-900/10 pt-5">
              <Link
                href="/tableau-de-bord"
                className="py-2 text-center text-[15px] font-medium text-plum-900 ring-1 ring-plum-900/25"
              >
                Se connecter
              </Link>
              <Link
                href="/tableau-de-bord"
                className="bg-plum-900 py-2.5 text-center text-[15px] font-medium text-white"
              >
                Espace prestataire
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
