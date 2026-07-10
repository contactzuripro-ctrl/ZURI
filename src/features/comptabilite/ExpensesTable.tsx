import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatAmount, formatDate } from "@/lib/format";
import type { ExpenseEntry } from "@/types";
import { recentExpenses } from "@/features/comptabilite/data";

const columns: DataTableColumn<ExpenseEntry>[] = [
  {
    header: "Dépense",
    cell: (expense) => <span className="font-semibold">{expense.label}</span>,
  },
  { header: "Catégorie", cell: (expense) => expense.category },
  {
    header: "Date",
    cell: (expense) => formatDate(expense.date),
  },
  {
    header: "Montant",
    cell: (expense) => (
      <span className="font-semibold whitespace-nowrap">
        {formatAmount(expense.amount)}
      </span>
    ),
    align: "right",
  },
];

/** Dernières dépenses enregistrées. */
export function ExpensesTable() {
  return (
    <DataTable
      columns={columns}
      rows={recentExpenses}
      rowKey={(expense) => expense.id}
    />
  );
}
