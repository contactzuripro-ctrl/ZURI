"use client";

import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDayMonth, formatMonthYear } from "@/lib/format";
import { ClientAvatar } from "@/features/clients/ClientAvatar";
import type { ClientProfile } from "@/features/clients/data";

/** Sous-carte blanche de la fiche (historique, notes, photos). */
function DetailCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.8rem_1.2rem_1.8rem_1.2rem/1.2rem_1.8rem_1.2rem_1.8rem] border border-hairline bg-elevated p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  );
}

interface ClientDetailPanelProps {
  client: ClientProfile;
}

/**
 * Panneau droit : fiche de la cliente sélectionnée — en-tête (avatar, nom,
 * ancienneté, badge fidèle), historique des prestations, notes privées
 * et photos avant/après.
 */
export function ClientDetailPanel({ client }: ClientDetailPanelProps) {
  return (
    <Card className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-5">
          <ClientAvatar
            fullName={client.fullName}
            color={client.avatarColor}
            photoUrl={client.photoUrl}
            sizeClass="size-16 text-xl"
          />
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {client.fullName}
            </h2>
            <p className="mt-1 text-ink-600">
              Cliente depuis {formatMonthYear(client.memberSince)} –{" "}
              {client.visitCount} visites
            </p>
          </div>
        </div>
        {client.isLoyal && (
          <span className="rounded-2xl bg-accent-500/20 px-4 py-2 text-sm font-semibold text-plum-800">
            Cliente fidèle
          </span>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <DetailCard title="Historique des prestations">
          <ul className="mt-4 space-y-3">
            {client.serviceHistory.map((entry) => (
              <li
                key={`${entry.serviceName}-${entry.date}`}
                className="flex items-baseline justify-between gap-4"
              >
                <span className="font-medium">{entry.serviceName}</span>
                <span className="shrink-0 text-sm text-ink-600">
                  {formatDayMonth(entry.date)}
                </span>
              </li>
            ))}
          </ul>
        </DetailCard>

        <DetailCard title="Notes privées">
          <p className="mt-4 leading-relaxed text-ink-600">
            {client.privateNotes}
          </p>
        </DetailCard>
      </div>

      <DetailCard title="Photos avant / après" className="mt-6">
        <div className="mt-4 flex flex-wrap gap-4">
          {client.photoColors.map((color, index) => (
            <div
              key={index}
              className={`size-28 rounded-2xl ${color}`}
              aria-label={`Photo ${index + 1}`}
            />
          ))}
          <button
            type="button"
            aria-label="Ajouter une photo"
            className="flex size-28 items-center justify-center rounded-2xl bg-surface text-ink-600 transition-colors hover:bg-accent-500/15 hover:text-plum-800"
          >
            <Plus size={26} strokeWidth={2} />
          </button>
        </div>
      </DetailCard>
    </Card>
  );
}
