import { UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ClientsDirectory } from "@/features/clients/ClientsDirectory";

/** Clients — liste à gauche, fiche détaillée de la cliente à droite. */
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
        <ClientsDirectory />
      </div>
    </>
  );
}
