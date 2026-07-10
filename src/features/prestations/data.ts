import type { Service } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const services: Service[] = [
  {
    id: "srv-1",
    name: "Tresses box braids",
    category: "Coiffure",
    photoUrl: "/prestations/tresses-box-braids-1.jpg",
    price: 15000,
    durationMinutes: 180,
  },
  {
    id: "srv-2",
    name: "Tresses collées",
    category: "Coiffure",
    photoUrl: "/prestations/tresses-collees.jpg",
    price: 10000,
    durationMinutes: 150,
    promotion: "-20 % le mardi",
  },
  {
    id: "srv-3",
    name: "Coupe et brushing",
    category: "Coiffure",
    photoUrl: "/prestations/coupe-brushing.jpg",
    price: 5000,
    durationMinutes: 60,
  },
  {
    id: "srv-4",
    name: "Coloration",
    category: "Coiffure",
    photoUrl: "/prestations/tresses-colorees.jpg",
    price: 18000,
    durationMinutes: 120,
  },
  {
    id: "srv-5",
    name: "Défrisage + soin",
    category: "Soins",
    photoUrl: "/prestations/defrisage-soin.jpg",
    price: 12000,
    durationMinutes: 90,
    promotion: "Soin offert dès 3 visites",
  },
  {
    id: "srv-6",
    name: "Manucure",
    category: "Onglerie",
    photoUrl: "/prestations/manucure.jpg",
    price: 4000,
    durationMinutes: 45,
  },
  {
    id: "srv-7",
    name: "Pose vernis semi-permanent",
    category: "Onglerie",
    photoUrl: "/prestations/vernis-semi-permanent.jpg",
    price: 6000,
    durationMinutes: 45,
  },
];
