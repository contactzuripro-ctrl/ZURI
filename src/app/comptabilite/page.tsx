import { Download } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { FinanceSummaryCards } from "@/features/comptabilite/FinanceSummaryCards";
import { ExpensesTable } from "@/features/comptabilite/ExpensesTable";

/** Comptabilité — chiffre d'affaires, dépenses, bénéfice net et export. */
export default function ComptabilitePage() {
  return (
    <>
      <PageHeader
        title="Comptabilité"
        action={
          <PrimaryButton icon={<Download size={18} />}>
            Exporter le mois
          </PrimaryButton>
        }
      />
      <div className="space-y-8 p-8">
        <FinanceSummaryCards />
        <section>
          <h2 className="mb-4 text-lg font-bold">Dernières dépenses</h2>
          <ExpensesTable />
        </section>
      </div>
    </>
  );
}
