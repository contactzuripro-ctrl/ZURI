import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { formatAmount, formatDuration } from "@/lib/format";
import type { Service } from "@/types";

const columns: DataTableColumn<Service>[] = [
  {
    header: "Prestation",
    cell: (service) => (
      <span className="flex items-center gap-3">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={service.photoUrl}
            alt={`Photo de la prestation ${service.name}`}
            fill
            sizes="44px"
            className="object-cover"
          />
        </span>
        <span className="font-semibold">{service.name}</span>
      </span>
    ),
  },
  {
    header: "Catégorie",
    cell: (service) => <span className="text-ink-600">{service.category}</span>,
  },
  {
    header: "Durée",
    cell: (service) => (
      <span className="text-ink-600">
        {formatDuration(service.durationMinutes)}
      </span>
    ),
  },
  {
    header: "Prix",
    cell: (service) => (
      <span className="font-semibold">{formatAmount(service.price)}</span>
    ),
  },
  {
    header: "Promotion",
    cell: (service) =>
      service.promotion ? (
        <span className="inline-flex rounded-full bg-success-700/10 px-3 py-1 text-sm font-medium text-success-700">
          {service.promotion}
        </span>
      ) : (
        <span className="text-ink-400">–</span>
      ),
  },
];

interface ServicesTableProps {
  services: Service[];
}

/** Tableau du catalogue des prestations, dans une carte de verre. */
export function ServicesTable({ services }: ServicesTableProps) {
  return (
    <Card className="px-3 py-2 sm:px-5 sm:py-3">
      <DataTable
        columns={columns}
        rows={services}
        rowKey={(service) => service.id}
      />
    </Card>
  );
}
