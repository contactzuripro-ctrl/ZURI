import { UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { EmployeesPerformanceGrid } from "@/features/employes/EmployeesPerformanceGrid";

/** Employés — objectifs mensuels, suivi de performance et commissions. */
export default function EmployesPage() {
  return (
    <>
      <PageHeader
        title="Employés"
        action={
          <PrimaryButton icon={<UserPlus size={18} />}>
            Nouvelle employée
          </PrimaryButton>
        }
      />
      <div className="px-10 py-8">
        <EmployeesPerformanceGrid />
      </div>
    </>
  );
}
