import type { Employee } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const employees: Employee[] = [
  {
    id: "emp-1",
    fullName: "Awa Traoré",
    photoUrl: "/avatars/awa.jpg",
    role: "Coiffeuse senior",
    monthlyTarget: 500000,
    monthlyRevenue: 420000,
    commissionRate: 0.12,
  },
  {
    id: "emp-2",
    fullName: "Binta Camara",
    photoUrl: "/avatars/binta.jpg",
    role: "Coiffeuse",
    monthlyTarget: 400000,
    monthlyRevenue: 385000,
    commissionRate: 0.1,
  },
  {
    id: "emp-3",
    fullName: "Chantal Aka",
    photoUrl: "/avatars/chantal.jpg",
    role: "Onglerie & soins",
    monthlyTarget: 300000,
    monthlyRevenue: 310000,
    commissionRate: 0.1,
  },
];
