import { StatusBadge } from "@/components/ui/StatusBadge";
import type { StockItem } from "@/types";

interface StockLevelBadgeProps {
  item: StockItem;
}

/** Statut du niveau de stock : En stock / À commander / Rupture. */
export function StockLevelBadge({ item }: StockLevelBadgeProps) {
  if (item.quantity === 0) {
    return <StatusBadge label="Rupture" tone="danger" />;
  }
  if (item.quantity <= item.alertThreshold) {
    return <StatusBadge label="À commander" tone="warning" />;
  }
  return <StatusBadge label="En stock" tone="success" />;
}
