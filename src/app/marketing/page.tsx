import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { LoyaltySummaryCards } from "@/features/marketing/LoyaltySummaryCards";
import { CampaignsTable } from "@/features/marketing/CampaignsTable";

/** Marketing — campagnes SMS/WhatsApp, cartes de fidélité et taux de retour. */
export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        action={
          <PrimaryButton icon={<Send size={18} />}>
            Nouvelle campagne
          </PrimaryButton>
        }
      />
      <div className="space-y-10 px-10 py-8">
        <LoyaltySummaryCards />
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Campagnes</h2>
          <CampaignsTable />
        </section>
      </div>
    </>
  );
}
