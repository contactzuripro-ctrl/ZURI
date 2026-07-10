/** Utilitaires de calendrier (semaine commençant le lundi, libellés français). */

export const WEEKDAY_LABELS = [
  "Lun",
  "Mar",
  "Mer",
  "Jeu",
  "Ven",
  "Sam",
  "Dim",
] as const;

/** Date locale au format ISO "YYYY-MM-DD" (sans décalage UTC). */
export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Grille du mois : tableau de semaines (lundi → dimanche) couvrant tout
 * le mois, complétées par les jours des mois voisins.
 */
export function getMonthGrid(year: number, month: number): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  // getDay() : 0 = dimanche ; on ramène à un index lundi = 0
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const gridStart = addDays(firstOfMonth, -mondayOffset);

  const weeks: Date[][] = [];
  let cursor = gridStart;
  do {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(cursor);
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  } while (cursor.getMonth() === month);

  return weeks;
}

/** Convertit "HH:mm" en minutes depuis minuit (ex. "09:30" -> 570). */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Titre de la vue mois : "juillet 2026". */
export function formatMonthTitle(date: Date): string {
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

/** Titre de la vue jour : "vendredi 10 juillet 2026". */
export function formatDayTitle(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
