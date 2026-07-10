type BadgeTone = "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-success-100 text-success-700",
  warning: "bg-warning-100 text-warning-700",
  danger: "bg-danger-100 text-danger-700",
};

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
}

/** Pastille de statut colorée (ex. « Payé », « En attente », « Rupture »). */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
