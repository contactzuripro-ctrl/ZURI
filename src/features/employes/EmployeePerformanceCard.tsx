import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { formatAmount, formatPercent } from "@/lib/format";
import type { Employee } from "@/types";

interface EmployeePerformanceCardProps {
  employee: Employee;
}

/** Carte minimaliste d'une employée : objectif, progression et commission. */
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
    <Card className="p-8">
      <div className="flex items-center gap-4">
        <Avatar
          fullName={employee.fullName}
          photoUrl={employee.photoUrl}
          sizeClass="size-14"
        />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            {employee.fullName}
          </h2>
          <p className="text-sm text-ink-600">{employee.role}</p>
        </div>
      </div>

      <p className="mt-6 text-3xl font-semibold tracking-tight">
        {formatAmount(employee.monthlyRevenue)}
      </p>
      <p className="mt-1 text-sm text-ink-600">
        sur un objectif de {formatAmount(employee.monthlyTarget)} —{" "}
        {formatPercent(progress)}
      </p>
      <div className="mt-3 h-1 rounded-full bg-hairline">
        <div
          className="h-full rounded-full bg-plum-800"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-sm">
        <span className="text-ink-600">
          Commission ({formatPercent(employee.commissionRate)})
        </span>
        <span className="font-semibold whitespace-nowrap">
          {formatAmount(commission)}
        </span>
      </div>
    </Card>
  );
}
