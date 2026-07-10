import type { Client } from "@/types";

/** Fiche complète d'une cliente : profil + historique + notes + photos. */
export interface ClientProfile extends Client {
  /** Mois d'arrivée au salon, format ISO "YYYY-MM". */
  memberSince: string;
  /** Photo de profil dans /public (optionnelle). */
  photoUrl?: string;
  isLoyal: boolean;
  /** Couleur Tailwind de l'avatar (pastille initiales). */
  avatarColor: string;
  serviceHistory: { serviceName: string; date: string }[];
  privateNotes: string;
  /** Couleurs des vignettes photos avant/après (démo, en attendant l'upload). */
  photoColors: string[];
}

/** Données de démonstration — à remplacer par l'API réelle. */
export const clientProfiles: ClientProfile[] = [
  {
    id: "cli-1",
    fullName: "Aya Kouassi",
    photoUrl: "/avatars/aya.jpg",
    phone: "+225 07 08 12 34 56",
    visitCount: 12,
    totalSpent: 210000,
    lastVisit: "2026-07-03",
    favoriteService: "Tresses box braids",
    memberSince: "2026-01",
    isLoyal: true,
    avatarColor: "bg-plum-800",
    serviceHistory: [
      { serviceName: "Tresses box braids", date: "2026-07-03" },
      { serviceName: "Soin profond", date: "2026-05-15" },
      { serviceName: "Coupe et brushing", date: "2026-04-02" },
    ],
    privateNotes:
      "Préfère les rendez-vous en matinée. Allergie aux produits ammoniaqués – utiliser la gamme sans ammoniaque.",
    photoColors: ["bg-accent-400/30", "bg-cream-200/60", "bg-accent-500/35"],
  },
  {
    id: "cli-2",
    fullName: "Marie Diallo",
    photoUrl: "/avatars/marie.jpg",
    phone: "+225 05 44 22 11 09",
    visitCount: 8,
    totalSpent: 64000,
    lastVisit: "2026-06-28",
    favoriteService: "Coupe et brushing",
    memberSince: "2026-02",
    isLoyal: false,
    avatarColor: "bg-plum-700",
    serviceHistory: [
      { serviceName: "Coupe et brushing", date: "2026-06-28" },
      { serviceName: "Coloration", date: "2026-05-30" },
    ],
    privateNotes: "Aime discuter des nouvelles tendances. Café sans sucre.",
    photoColors: ["bg-accent-500/25", "bg-plum-600/15"],
  },
  {
    id: "cli-3",
    fullName: "Fatou Bamba",
    photoUrl: "/avatars/fatou.jpg",
    phone: "+225 01 23 98 76 54",
    visitCount: 11,
    totalSpent: 176000,
    lastVisit: "2026-06-20",
    favoriteService: "Coloration",
    memberSince: "2025-11",
    isLoyal: true,
    avatarColor: "bg-accent-500",
    serviceHistory: [
      { serviceName: "Coloration", date: "2026-06-20" },
      { serviceName: "Soin profond", date: "2026-05-22" },
      { serviceName: "Tresses collées", date: "2026-04-18" },
    ],
    privateNotes:
      "Cuir chevelu sensible : espacer les colorations d'au moins 6 semaines.",
    photoColors: ["bg-accent-400/40", "bg-cream-200/70", "bg-plum-600/20"],
  },
  {
    id: "cli-4",
    fullName: "Ines Touré",
    photoUrl: "/avatars/ines.jpg",
    phone: "+225 07 55 66 77 88",
    visitCount: 3,
    totalSpent: 18000,
    lastVisit: "2026-06-12",
    favoriteService: "Manucure",
    memberSince: "2026-05",
    isLoyal: false,
    avatarColor: "bg-plum-600",
    serviceHistory: [
      { serviceName: "Manucure", date: "2026-06-12" },
      { serviceName: "Pose vernis semi-permanent", date: "2026-05-28" },
    ],
    privateNotes: "Nouvelle cliente venue via la campagne WhatsApp de mai.",
    photoColors: ["bg-accent-500/30"],
  },
];
