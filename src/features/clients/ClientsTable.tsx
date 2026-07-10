import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatAmount, formatDate } from "@/lib/format";
import type { Client } from "@/types";
import { clients } from "@/features/clients/data";

const columns: DataTableColumn<Client>[] = [
  {
    header: "Cliente",
    cell: (client) => <span className="font-semibold">{client.fullName}</span>,
  },
  { header: "Téléphone", cell: (client) => client.phone },
  { header: "Prestation favorite", cell: (client) => client.favoriteService },
  {
    header: "Visites",
    cell: (client) => String(client.visitCount),
    align: "right",
  },
  {
    header: "Total dépensé",
    cell: (client) => (
      <span className="font-semibold">{formatAmount(client.totalSpent)}</span>
    ),
    align: "right",
  },
  {
    header: "Dernière visite",
    cell: (client) => formatDate(client.lastVisit),
    align: "right",
  },
];

/** Liste des clientes avec leur historique résumé. */
export function ClientsTable() {
  return (
    <DataTable columns={columns} rows={clients} rowKey={(client) => client.id} />
  );
}
