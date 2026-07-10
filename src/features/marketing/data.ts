import type { Campaign } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const campaigns: Campaign[] = [
  {
    id: "cmp-1",
    name: "Promo tresses de rentrée",
    channel: "whatsapp",
    description: "WhatsApp - envoyée à 320 clientes",
    status: "active",
  },
  {
    id: "cmp-2",
    name: "Rappel rendez-vous 24h",
    channel: "sms",
    description: "SMS automatique - récurrente",
    status: "active",
  },
  {
    id: "cmp-3",
    name: "Carte de fidélité - 10e visite offerte",
    channel: "fidelite",
    description: "Automatique - 89 clientes inscrites",
    status: "permanente",
  },
  {
    id: "cmp-4",
    name: "Offre fête des mères",
    channel: "whatsapp",
    description: "WhatsApp - programmée pour le 12 mai",
    status: "programmee",
  },
];

export const marketingSummary = {
  messagesSentThisMonth: 1840,
  monthLabel: "juillet",
  openRate: 0.64,
  couponsUsed: 57,
};
