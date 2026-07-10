import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
}

/** Statistique minimaliste : petit libellé gris, très grande valeur. */
export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card className="p-8">
      <p className="text-sm font-medium text-ink-600">{label}</p>
      <p className="mt-3 text-4xl font-semibold tracking-tight">{value}</p>
      {hint && <p className="mt-2 text-sm text-ink-400">{hint}</p>}
    </Card>
  );
}
