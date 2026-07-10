import { Plus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ServicesCatalog } from "@/features/prestations/ServicesCatalog";

/** Prestations — catalogue avec prix, durée et promotions. */
export default function PrestationsPage() {
  return (
    <>
      <PageHeader
        title="Prestations"
        action={
          <PrimaryButton icon={<Plus size={18} />}>
            Nouvelle prestation
          </PrimaryButton>
        }
      />
      <div className="px-10 py-8">
        <ServicesCatalog />
      </div>
    </>
  );
}
