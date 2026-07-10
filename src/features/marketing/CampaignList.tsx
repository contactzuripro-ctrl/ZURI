import { CampaignCard } from "@/features/marketing/CampaignCard";
import { campaigns } from "@/features/marketing/data";

/** Liste verticale des campagnes marketing. */
export function CampaignList() {
  return (
    <div className="space-y-5">
      {campaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
