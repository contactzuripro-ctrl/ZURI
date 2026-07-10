import type { Payment } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const todayPayments: Payment[] = [
  {
    id: "pay-1",
    clientName: "Aya Kouassi",
    clientPhotoUrl: "/avatars/aya.jpg",
    serviceName: "Tresses box braids",
    method: "orange-money",
    amount: 15000,
    status: "paye",
  },
  {
    id: "pay-2",
    clientName: "Marie Diallo",
    clientPhotoUrl: "/avatars/marie.jpg",
    serviceName: "Coupe et brushing",
    method: "wave",
    amount: 5000,
    status: "paye",
  },
  {
    id: "pay-3",
    clientName: "Fatou Bamba",
    clientPhotoUrl: "/avatars/fatou.jpg",
    serviceName: "Coloration",
    method: "especes",
    amount: 18000,
    status: "paye",
  },
  {
    id: "pay-4",
    clientName: "Ines Touré",
    clientPhotoUrl: "/avatars/ines.jpg",
    serviceName: "Manucure – acompte",
    method: "orange-money",
    amount: 2000,
    status: "en-attente",
  },
];

export const paymentsSummary = {
  collectedToday: 62000,
  pendingDeposits: 8000,
  transactionsToday: 9,
};
