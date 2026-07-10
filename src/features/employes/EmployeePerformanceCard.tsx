import { Card } from "@/components/ui/Card";
import { formatAmount, formatPercent } from "@/lib/format";
import type { Employee } from "@/types";

interface EmployeePerformanceCardProps {
  employee: Employee;
}

/** Carte d'une employée : objectif mensuel, progression et commission. */
export function EmployeePerformanceCard({
  employee,
}: EmployeePerformanceCardProps) {
  const progress = Math.min(
    employee.monthlyRevenue / employee.monthlyTarget,
    1,
  );
  const commission = Math.round(
    employee.monthlyRevenue * employee.commissionRate,
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-[55%_45%_62%_38%/48%_60%_40%_52%] bg-plum-800 font-semibold text-white shadow-neu-sm">
          {employee.fullName.charAt(0)}
        </span>
        <div>
          <h2 className="font-bold">{employee.fullName}</h2>
          <p className="text-sm text-ink-600">{employee.role}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm">
          <span className="text-ink-600">Objectif mensuel</span>
          <span className="font-semibold">
            {formatAmount(employee.monthlyRevenue)} /{" "}
            {formatAmount(employee.monthlyTarget)}
          </span>
        </div>
        <div className="mt-2 h-3 rounded-full bg-cream-100 shadow-neu-inset-sm">
          <div
            className={`h-full rounded-full ${progress >= 1 ? "bg-success-700" : "bg-gold-500"}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-ink-400">
          {formatPercent(progress)} de l&apos;objectif
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-cream-100 px-4 py-3 shadow-neu-inset-sm">
        <span className="text-sm text-ink-600">
          Commission ({formatPercent(employee.commissionRate)})
        </span>
        <span className="font-bold">{formatAmount(commission)}</span>
      </div>
    </Card>
  );
}
