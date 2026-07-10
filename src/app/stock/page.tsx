import { PackagePlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { StockTable } from "@/features/stock/StockTable";

/** Stock — suivi des produits avec alertes de réapprovisionnement. */
export default function StockPage() {
  return (
    <>
      <PageHeader
        title="Stock"
        action={
          <PrimaryButton icon={<PackagePlus size={18} />}>
            Ajouter un produit
          </PrimaryButton>
        }
      />
      <div className="px-10 py-8">
        <StockTable />
      </div>
    </>
  );
}
