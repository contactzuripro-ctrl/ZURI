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

/** Pastille de statut neumorphique : creusée (inset), texte coloré selon le ton. */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full bg-cream-100 px-3.5 py-1.5 text-sm font-semibold shadow-neu-inset-sm ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
