import { Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatAmount } from "@/lib/format";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

/** Carte d'une prestation : nom, catégorie, prix, durée et promotion. */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col gap-3 p-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
            {service.category}
          </p>
          <h2 className="mt-1 text-lg font-bold">{service.name}</h2>
        </div>
        {service.promotion && (
          <StatusBadge label="Promo" tone="warning" />
        )}
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-2xl font-bold">{formatAmount(service.price)}</span>
        <span className="flex items-center gap-1.5 text-sm text-ink-600">
          <Clock size={16} />
          {service.durationMinutes} min
        </span>
      </div>
      {service.promotion && (
        <p className="text-sm font-medium text-warning-700">
          {service.promotion}
        </p>
      )}
    </Card>
  );
}
