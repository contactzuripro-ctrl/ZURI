import { PageHeader } from "@/components/layout/PageHeader";
import { NewProductAction } from "@/features/stock/NewProductAction";
import { StockTable } from "@/features/stock/StockTable";

/** Stock — suivi des produits avec alertes de réapprovisionnement. */
export default function StockPage() {
  return (
    <>
      <PageHeader
        title="Stock"
        action={<NewProductAction />}
      />
      <div className="px-5 py-8 sm:px-10">
        <StockTable />
      </div>
    </>
  );
}
