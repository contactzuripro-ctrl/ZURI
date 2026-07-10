import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { formatAmount } from "@/lib/format";
import type { Payment } from "@/types";
import { PaymentMethodLabel } from "@/features/paiements/PaymentMethodLabel";
import { todayPayments } from "@/features/paiements/data";

const columns: DataTableColumn<Payment>[] = [
  {
    header: "Cliente",
    cell: (payment) => (
      <span className="flex items-center gap-3">
        <Avatar
          fullName={payment.clientName}
          photoUrl={payment.clientPhotoUrl}
          sizeClass="size-9 text-sm"
        />
        <span className="font-semibold">{payment.clientName}</span>
      </span>
    ),
  },
  { header: "Prestation", cell: (payment) => payment.serviceName },
  {
    header: "Méthode",
    cell: (payment) => <PaymentMethodLabel method={payment.method} />,
  },
  {
    header: "Montant",
    cell: (payment) => (
      <span className="font-semibold whitespace-nowrap">
        {formatAmount(payment.amount)}
      </span>
    ),
  },
  {
    header: "Statut",
    cell: (payment) =>
      payment.status === "paye" ? (
        <StatusBadge label="Payé" tone="success" />
      ) : (
        <StatusBadge label="En attente" tone="warning" />
      ),
  },
];

/** Tableau des transactions du jour. */
export function PaymentsTable() {
  return (
    <DataTable
      columns={columns}
      rows={todayPayments}
      rowKey={(payment) => payment.id}
    />
  );
}
