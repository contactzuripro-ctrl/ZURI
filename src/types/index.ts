/** Types métier partagés du back-office Zuri. */

export type PaymentMethod = "orange-money" | "wave" | "especes";

export type PaymentStatus = "paye" | "en-attente";

export interface Payment {
  id: string;
  clientName: string;
  serviceName: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
}

export interface Appointment {
  id: string;
  clientName: string;
  /** Photo de profil de la cliente dans /public (optionnelle). */
  clientPhotoUrl?: string;
  serviceName: string;
  employeeName: string;
  date: string; // date ISO "YYYY-MM-DD"
  startTime: string; // format "HH:mm"
  endTime: string; // format "HH:mm"
}

export interface Client {
  id: string;
  fullName: string;
  phone: string;
  visitCount: number;
  totalSpent: number;
  lastVisit: string; // date ISO "YYYY-MM-DD"
  favoriteService: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
  promotion?: string;
}

export interface Employee {
  id: string;
  fullName: string;
  /** Photo de profil dans /public (optionnelle). */
  photoUrl?: string;
  role: string;
  monthlyTarget: number;
  monthlyRevenue: number;
  commissionRate: number; // ex. 0.1 pour 10 %
}

export interface StockItem {
  id: string;
  productName: string;
  category: string;
  quantity: number;
  alertThreshold: number;
  unitPrice: number;
}

export interface Campaign {
  id: string;
  name: string;
  channel: "sms" | "whatsapp";
  sentCount: number;
  responseRate: number; // ex. 0.32 pour 32 %
  status: "envoyee" | "programmee";
  date: string; // date ISO "YYYY-MM-DD"
}

export interface ExpenseEntry {
  id: string;
  label: string;
  category: string;
  amount: number;
  date: string; // date ISO "YYYY-MM-DD"
}
