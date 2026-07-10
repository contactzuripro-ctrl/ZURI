import { MessageCircle, MessageSquareText, Gift, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LaunchCampaignAction } from "@/features/marketing/LaunchCampaignAction";
import type { Campaign } from "@/types";

/** Pastille d'icône selon le type de campagne (statut programmé prioritaire). */
function CampaignIcon({ campaign }: { campaign: Campaign }) {
  if (campaign.status === "programmee") {
    return (
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-plum-700/10 text-plum-700 dark:bg-plum-600/25 dark:text-accent-400">
        <CalendarDays size={26} strokeWidth={1.8} />
      </span>
    );
  }
  if (campaign.channel === "whatsapp") {
    return (
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-success-700/10 text-success-700">
        <MessageCircle size={26} strokeWidth={1.8} />
      </span>
    );
  }
  if (campaign.channel === "fidelite") {
    return (
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-warning-700/10 text-warning-700">
        <Gift size={26} strokeWidth={1.8} />
      </span>
    );
  }
  return (
    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-plum-700/10 text-plum-700 dark:bg-plum-600/25 dark:text-accent-400">
      <MessageSquareText size={26} strokeWidth={1.8} />
    </span>
  );
}

const statusPills: Record<Campaign["status"], { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success-700/12 text-success-700" },
  permanente: { label: "Permanente", className: "bg-ink-400/15 text-ink-600" },
  programmee: { label: "Programmée", className: "bg-warning-700/12 text-warning-700" },
};

/** Ligne de campagne : icône du canal, nom, description, statut et bouton « Lancer ». */
export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const pill = statusPills[campaign.status];
  return (
    <Card className="flex flex-wrap items-center gap-x-5 gap-y-4 px-6 py-6 sm:px-8">
      <CampaignIcon campaign={campaign} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-semibold tracking-tight">
          {campaign.name}
        </p>
        <p className="mt-0.5 truncate text-sm text-ink-600">
          {campaign.description}
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-3">
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${pill.className}`}
        >
          {pill.label}
        </span>
        <LaunchCampaignAction campaignName={campaign.name} />
      </div>
    </Card>
  );
}
