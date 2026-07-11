import { PageHeader } from "@/components/layout/PageHeader";
import { NewEmployeeAction } from "@/features/employes/NewEmployeeAction";
import { EmployeesPerformanceGrid } from "@/features/employes/EmployeesPerformanceGrid";

/** Employés — objectifs mensuels, suivi de performance et commissions. */
export default function EmployesPage() {
  return (
    <>
      <PageHeader
        title="Employés"
        action={<NewEmployeeAction />}
      />
      <div className="px-5 py-8 sm:px-10">
        <EmployeesPerformanceGrid />
      </div>
    </>
  );
}
