import { MessageSquare, MessageCircle } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatPercent } from "@/lib/format";
import type { Campaign } from "@/types";
import { campaigns } from "@/features/marketing/data";

function ChannelLabel({ channel }: { channel: Campaign["channel"] }) {
  if (channel === "whatsapp") {
    return (
      <span className="flex items-center gap-2 font-medium text-success-700">
        <MessageCircle size={18} strokeWidth={1.8} />
        WhatsApp
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2 font-medium text-plum-700">
      <MessageSquare size={18} strokeWidth={1.8} />
      SMS
    </span>
  );
}

const columns: DataTableColumn<Campaign>[] = [
  {
    header: "Campagne",
    cell: (campaign) => <span className="font-semibold">{campaign.name}</span>,
  },
  {
    header: "Canal",
    cell: (campaign) => <ChannelLabel channel={campaign.channel} />,
  },
  { header: "Date", cell: (campaign) => formatDate(campaign.date) },
  {
    header: "Envois",
    cell: (campaign) => String(campaign.sentCount),
    align: "right",
  },
  {
    header: "Taux de réponse",
    cell: (campaign) =>
      campaign.status === "envoyee"
        ? formatPercent(campaign.responseRate)
        : "—",
    align: "right",
  },
  {
    header: "Statut",
    cell: (campaign) =>
      campaign.status === "envoyee" ? (
        <StatusBadge label="Envoyée" tone="success" />
      ) : (
        <StatusBadge label="Programmée" tone="warning" />
      ),
  },
];

/** Historique des campagnes SMS et WhatsApp. */
export function CampaignsTable() {
  return (
    <DataTable
      columns={columns}
      rows={campaigns}
      rowKey={(campaign) => campaign.id}
    />
  );
}
