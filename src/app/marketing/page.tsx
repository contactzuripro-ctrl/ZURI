import { PageHeader } from "@/components/layout/PageHeader";
import { NewCampaignAction } from "@/features/marketing/NewCampaignAction";
import { LoyaltySummaryCards } from "@/features/marketing/LoyaltySummaryCards";
import { CampaignsTable } from "@/features/marketing/CampaignsTable";

/** Marketing — campagnes SMS/WhatsApp, cartes de fidélité et taux de retour. */
export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        action={<NewCampaignAction />}
      />
      <div className="space-y-10 px-5 py-8 sm:px-10">
        <LoyaltySummaryCards />
        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Campagnes</h2>
          <CampaignsTable />
        </section>
      </div>
    </>
  );
}
