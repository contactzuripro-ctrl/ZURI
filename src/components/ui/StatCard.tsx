import { Card } from "@/components/ui/Card";

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
}

/** Carte de statistique : libellé au-dessus, grande valeur en dessous. */
export function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <Card className="p-6">
      <p className="text-sm text-ink-600">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-400">{hint}</p>}
    </Card>
  );
}
