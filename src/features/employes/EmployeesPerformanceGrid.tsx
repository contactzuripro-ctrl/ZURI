import { EmployeePerformanceCard } from "@/features/employes/EmployeePerformanceCard";
import { employees } from "@/features/employes/data";

/** Grille des performances mensuelles de l'équipe. */
export function EmployeesPerformanceGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {employees.map((employee) => (
        <EmployeePerformanceCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
