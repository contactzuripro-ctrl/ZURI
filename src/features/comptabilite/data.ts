import type { ExpenseEntry } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const monthlyFinance = {
  revenue: 1240000,
  expenses: 480000,
  netProfit: 760000,
};

export const recentExpenses: ExpenseEntry[] = [
  {
    id: "exp-1",
    label: "Commande mèches et extensions",
    category: "Fournitures",
    amount: 120000,
    date: "2026-07-08",
  },
  {
    id: "exp-2",
    label: "Loyer du salon – juillet",
    category: "Loyer",
    amount: 200000,
    date: "2026-07-05",
  },
  {
    id: "exp-3",
    label: "Facture électricité",
    category: "Charges",
    amount: 45000,
    date: "2026-07-03",
  },
  {
    id: "exp-4",
    label: "Produits de coloration",
    category: "Fournitures",
    amount: 68000,
    date: "2026-07-02",
  },
];
