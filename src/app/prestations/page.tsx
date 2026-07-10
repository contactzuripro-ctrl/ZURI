import { PageHeader } from "@/components/layout/PageHeader";
import { NewServiceAction } from "@/features/prestations/NewServiceAction";
import { ServicesCatalog } from "@/features/prestations/ServicesCatalog";

/** Prestations — catalogue avec prix, durée et promotions. */
export default function PrestationsPage() {
  return (
    <>
      <PageHeader
        title="Prestations"
        action={<NewServiceAction />}
      />
      <div className="px-5 py-8 sm:px-10">
        <ServicesCatalog />
      </div>
    </>
  );
}
