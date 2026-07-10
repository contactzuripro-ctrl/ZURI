/** Formate un montant en francs CFA : 15000 -> "15 000 F". */
export function formatAmount(amount: number): string {
  return `${amount.toLocaleString("fr-FR").replace(/ /g, " ")} F`;
}

/** Formate une durée en minutes : 150 -> "2h30", 45 -> "45 min". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}h` : `${hours}h${String(rest).padStart(2, "0")}`;
}

/** Formate un pourcentage : 0.32 -> "32 %". */
export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)} %`;
}

/** Formate une date ISO "2026-07-03" -> "3 juil." (jour et mois courts). */
export function formatDayMonth(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

/** Formate un mois ISO "2026-01" -> "janvier 2026". */
export function formatMonthYear(isoMonth: string): string {
  return new Date(`${isoMonth}-01`).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

/** Formate une date ISO "2026-07-10" -> "10 juil. 2026". */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
