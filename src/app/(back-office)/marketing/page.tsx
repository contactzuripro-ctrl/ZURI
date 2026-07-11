import { PageHeader } from "@/components/layout/PageHeader";
import { NewCampaignAction } from "@/features/marketing/NewCampaignAction";
import { MarketingSummaryCards } from "@/features/marketing/MarketingSummaryCards";
import { CampaignList } from "@/features/marketing/CampaignList";

/** Marketing — indicateurs d'envois et liste des campagnes SMS/WhatsApp/fidélité. */
export default function MarketingPage() {
  return (
    <>
      <PageHeader
        title="Marketing"
        action={<NewCampaignAction />}
      />
      <div className="space-y-8 px-5 py-8 sm:px-10">
        <MarketingSummaryCards />
        <CampaignList />
      </div>
    </>
  );
}
