import type { Appointment } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const employees = ["Awa", "Binta", "Chantal"] as const;

export const dayAppointments: Appointment[] = [
  {
    id: "agd-1",
    clientName: "Aya Kouassi",
    serviceName: "Tresses box braids",
    employeeName: "Awa",
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    id: "agd-2",
    clientName: "Aminata Koné",
    serviceName: "Tresses collées",
    employeeName: "Awa",
    startTime: "14:00",
    endTime: "16:30",
  },
  {
    id: "agd-3",
    clientName: "Marie Diallo",
    serviceName: "Coupe et brushing",
    employeeName: "Binta",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "agd-4",
    clientName: "Grace N'Guessan",
    serviceName: "Défrisage + soin",
    employeeName: "Binta",
    startTime: "14:30",
    endTime: "16:00",
  },
  {
    id: "agd-5",
    clientName: "Fatou Bamba",
    serviceName: "Coloration",
    employeeName: "Chantal",
    startTime: "09:30",
    endTime: "11:30",
  },
  {
    id: "agd-6",
    clientName: "Rokia Cissé",
    serviceName: "Pose vernis semi-permanent",
    employeeName: "Chantal",
    startTime: "15:00",
    endTime: "15:45",
  },
];
