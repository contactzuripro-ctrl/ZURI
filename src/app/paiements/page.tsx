import { Link2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PaymentsSummaryCards } from "@/features/paiements/PaymentsSummaryCards";
import { PaymentsTable } from "@/features/paiements/PaymentsTable";

/** Paiements — suivi des transactions Orange Money, Wave et espèces. */
export default function PaiementsPage() {
  return (
    <>
      <PageHeader
        title="Paiements"
        action={
          <PrimaryButton icon={<Link2 size={18} />}>
            Envoyer un lien de paiement
          </PrimaryButton>
        }
      />
      <div className="space-y-8 p-8">
        <PaymentsSummaryCards />
        <PaymentsTable />
      </div>
    </>
  );
}
