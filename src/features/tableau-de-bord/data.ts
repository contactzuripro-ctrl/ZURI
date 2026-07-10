import type { Appointment } from "@/types";

/** Données de démonstration — à remplacer par l'API réelle. */
export const dashboardSummary = {
  todayRevenue: 62000,
  todayAppointments: 12,
  newClientsThisWeek: 5,
  lowStockAlerts: 3,
};

export const upcomingAppointments: Appointment[] = [
  {
    id: "apt-1",
    clientName: "Aminata Koné",
    serviceName: "Tresses collées",
    employeeName: "Awa",
    startTime: "14:00",
    endTime: "16:30",
  },
  {
    id: "apt-2",
    clientName: "Grace N'Guessan",
    serviceName: "Défrisage + soin",
    employeeName: "Binta",
    startTime: "14:30",
    endTime: "16:00",
  },
  {
    id: "apt-3",
    clientName: "Rokia Cissé",
    serviceName: "Pose vernis semi-permanent",
    employeeName: "Chantal",
    startTime: "15:00",
    endTime: "15:45",
  },
  {
    id: "apt-4",
    clientName: "Djeneba Sylla",
    serviceName: "Coupe et brushing",
    employeeName: "Awa",
    startTime: "17:00",
    endTime: "18:00",
  },
];
