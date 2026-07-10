import { UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ClientsTable } from "@/features/clients/ClientsTable";

/** Clients — liste des clientes : historique, visites, total dépensé. */
export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        action={
          <PrimaryButton icon={<UserPlus size={18} />}>
            Nouvelle cliente
          </PrimaryButton>
        }
      />
      <div className="px-10 py-8">
        <ClientsTable />
      </div>
    </>
  );
}
