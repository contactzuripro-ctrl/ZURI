import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatAmount } from "@/lib/format";
import type { StockItem } from "@/types";
import { StockLevelBadge } from "@/features/stock/StockLevelBadge";
import { stockItems } from "@/features/stock/data";

const columns: DataTableColumn<StockItem>[] = [
  {
    header: "Produit",
    cell: (item) => <span className="font-semibold">{item.productName}</span>,
  },
  { header: "Catégorie", cell: (item) => item.category },
  {
    header: "Quantité",
    cell: (item) => (
      <span className={item.quantity <= item.alertThreshold ? "font-bold" : ""}>
        {item.quantity}
      </span>
    ),
    align: "right",
  },
  {
    header: "Seuil d'alerte",
    cell: (item) => String(item.alertThreshold),
    align: "right",
  },
  {
    header: "Prix unitaire",
    cell: (item) => (
      <span className="whitespace-nowrap">{formatAmount(item.unitPrice)}</span>
    ),
    align: "right",
  },
  {
    header: "Statut",
    cell: (item) => <StockLevelBadge item={item} />,
  },
];

/** Inventaire des produits avec alertes de réapprovisionnement. */
export function StockTable() {
  return (
    <DataTable columns={columns} rows={stockItems} rowKey={(item) => item.id} />
  );
}
