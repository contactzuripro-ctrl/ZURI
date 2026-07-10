type BadgeTone = "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  success: "text-success-700",
  warning: "text-warning-700",
  danger: "text-danger-700",
};

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
}

/** Statut minimaliste : simple point coloré suivi du texte, sans fond. */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${toneClasses[tone]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
