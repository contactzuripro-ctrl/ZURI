import type { Appointment } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const employees = ["Awa", "Binta", "Chantal"] as const;

/** Couleur attribuée à chaque employée dans les vues du calendrier. */
export const employeeColors: Record<string, string> = {
  Awa: "bg-accent-500 text-plum-950",
  Binta: "bg-plum-700 text-white",
  Chantal: "bg-success-700 text-white",
};

/** Photo de profil de chaque employée (dans /public). */
export const employeePhotos: Record<string, string> = {
  Awa: "/avatars/awa.jpg",
  Binta: "/avatars/binta.jpg",
  Chantal: "/avatars/chantal.jpg",
};

export const appointments: Appointment[] = [
  // Vendredi 10 juillet 2026 (journée chargée)
  {
    id: "agd-1",
    clientName: "Aya Kouassi",
    serviceName: "Tresses box braids",
    employeeName: "Awa",
    date: "2026-07-10",
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    id: "agd-2",
    clientName: "Aminata Koné",
    serviceName: "Tresses collées",
    employeeName: "Awa",
    date: "2026-07-10",
    startTime: "14:00",
    endTime: "16:30",
  },
  {
    id: "agd-3",
    clientName: "Marie Diallo",
    serviceName: "Coupe et brushing",
    employeeName: "Binta",
    date: "2026-07-10",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "agd-4",
    clientName: "Grace N'Guessan",
    serviceName: "Défrisage + soin",
    employeeName: "Binta",
    date: "2026-07-10",
    startTime: "14:30",
    endTime: "16:00",
  },
  {
    id: "agd-5",
    clientName: "Fatou Bamba",
    serviceName: "Coloration",
    employeeName: "Chantal",
    date: "2026-07-10",
    startTime: "09:30",
    endTime: "11:30",
  },
  {
    id: "agd-6",
    clientName: "Rokia Cissé",
    serviceName: "Pose vernis semi-permanent",
    employeeName: "Chantal",
    date: "2026-07-10",
    startTime: "15:00",
    endTime: "15:45",
  },
  // Samedi 11 juillet 2026
  {
    id: "agd-7",
    clientName: "Djeneba Sylla",
    serviceName: "Coupe et brushing",
    employeeName: "Awa",
    date: "2026-07-11",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "agd-8",
    clientName: "Salimata Ouattara",
    serviceName: "Manucure",
    employeeName: "Chantal",
    date: "2026-07-11",
    startTime: "11:30",
    endTime: "12:15",
  },
  {
    id: "agd-9",
    clientName: "Nadia Bakayoko",
    serviceName: "Tresses box braids",
    employeeName: "Binta",
    date: "2026-07-11",
    startTime: "13:00",
    endTime: "16:00",
  },
  // Mardi 14 juillet 2026
  {
    id: "agd-10",
    clientName: "Awa Doumbia",
    serviceName: "Coloration",
    employeeName: "Chantal",
    date: "2026-07-14",
    startTime: "09:00",
    endTime: "11:00",
  },
  {
    id: "agd-11",
    clientName: "Clarisse Yao",
    serviceName: "Tresses collées",
    employeeName: "Awa",
    date: "2026-07-14",
    startTime: "10:00",
    endTime: "12:30",
  },
  // Vendredi 17 juillet 2026
  {
    id: "agd-12",
    clientName: "Mariam Sanogo",
    serviceName: "Défrisage + soin",
    employeeName: "Binta",
    date: "2026-07-17",
    startTime: "15:00",
    endTime: "16:30",
  },
  // Samedi 18 juillet 2026
  {
    id: "agd-13",
    clientName: "Aïcha Traoré",
    serviceName: "Tresses box braids",
    employeeName: "Awa",
    date: "2026-07-18",
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    id: "agd-14",
    clientName: "Bintou Keita",
    serviceName: "Manucure",
    employeeName: "Chantal",
    date: "2026-07-18",
    startTime: "14:00",
    endTime: "14:45",
  },
  // Mercredi 22 juillet 2026
  {
    id: "agd-15",
    clientName: "Oumou Diabaté",
    serviceName: "Coupe et brushing",
    employeeName: "Binta",
    date: "2026-07-22",
    startTime: "11:00",
    endTime: "12:00",
  },
  // Samedi 25 juillet 2026
  {
    id: "agd-16",
    clientName: "Kadiatou Fofana",
    serviceName: "Coloration",
    employeeName: "Chantal",
    date: "2026-07-25",
    startTime: "10:00",
    endTime: "12:00",
  },
  {
    id: "agd-17",
    clientName: "Adjoua Kouamé",
    serviceName: "Tresses collées",
    employeeName: "Awa",
    date: "2026-07-25",
    startTime: "14:00",
    endTime: "16:30",
  },
];
