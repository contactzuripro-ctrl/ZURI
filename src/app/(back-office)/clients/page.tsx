import { PageHeader } from "@/components/layout/PageHeader";
import { NewClientAction } from "@/features/clients/NewClientAction";
import { ClientsDirectory } from "@/features/clients/ClientsDirectory";

/** Clients — liste à gauche, fiche détaillée de la cliente à droite. */
export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        action={<NewClientAction />}
      />
      <div className="px-5 py-8 sm:px-10">
        <ClientsDirectory />
      </div>
    </>
  );
}
