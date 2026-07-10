import type { StockItem } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const stockItems: StockItem[] = [
  {
    id: "stk-1",
    productName: "Mèches X-Pression",
    category: "Extensions",
    quantity: 4,
    alertThreshold: 10,
    unitPrice: 3500,
  },
  {
    id: "stk-2",
    productName: "Crème défrisante Dark & Lovely",
    category: "Soins",
    quantity: 2,
    alertThreshold: 5,
    unitPrice: 6000,
  },
  {
    id: "stk-3",
    productName: "Coloration châtain cuivré",
    category: "Coloration",
    quantity: 8,
    alertThreshold: 5,
    unitPrice: 8500,
  },
  {
    id: "stk-4",
    productName: "Vernis semi-permanent (rouge)",
    category: "Onglerie",
    quantity: 0,
    alertThreshold: 3,
    unitPrice: 4500,
  },
  {
    id: "stk-5",
    productName: "Shampoing hydratant 1 L",
    category: "Soins",
    quantity: 15,
    alertThreshold: 6,
    unitPrice: 7000,
  },
];
