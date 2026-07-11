import { PageHeader } from "@/components/layout/PageHeader";
import { ExportMonthAction } from "@/features/comptabilite/ExportMonthAction";
import { FinanceSummaryCards } from "@/features/comptabilite/FinanceSummaryCards";
import { ExpensesTable } from "@/features/comptabilite/ExpensesTable";

/** Comptabilité — chiffre d'affaires, dépenses, bénéfice net et export. */
export default function ComptabilitePage() {
  return (
    <>
      <PageHeader
        title="Comptabilité"
        action={<ExportMonthAction />}
      />
      <div className="space-y-10 px-5 py-8 sm:px-10">
        <FinanceSummaryCards />
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Dernières dépenses</h2>
          <ExpensesTable />
        </section>
      </div>
    </>
  );
}
