import type { Campaign } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const campaigns: Campaign[] = [
  {
    id: "cmp-1",
    name: "Promo tresses du mardi",
    channel: "whatsapp",
    sentCount: 240,
    responseRate: 0.32,
    status: "envoyee",
    date: "2026-07-07",
  },
  {
    id: "cmp-2",
    name: "Relance clientes inactives",
    channel: "sms",
    sentCount: 85,
    responseRate: 0.18,
    status: "envoyee",
    date: "2026-07-01",
  },
  {
    id: "cmp-3",
    name: "Offre fête nationale",
    channel: "whatsapp",
    sentCount: 0,
    responseRate: 0,
    status: "programmee",
    date: "2026-08-07",
  },
];

export const loyaltySummary = {
  activeCards: 132,
  rewardsRedeemedThisMonth: 17,
  returnRate: 0.64,
};
