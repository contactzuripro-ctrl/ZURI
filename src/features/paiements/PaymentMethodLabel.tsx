import Image from "next/image";
import { Banknote } from "lucide-react";
import type { PaymentMethod } from "@/types";

const methodDisplay: Record<
  PaymentMethod,
  { label: string; logoUrl?: string }
> = {
  "orange-money": { label: "Orange Money", logoUrl: "/logos/orange-money.svg" },
  wave: { label: "Wave", logoUrl: "/logos/wave.png" },
  especes: { label: "Espèces" },
};

interface PaymentMethodLabelProps {
  method: PaymentMethod;
}

/** Méthode de paiement : logo de l'opérateur (billet stylisé pour les espèces) + libellé. */
export function PaymentMethodLabel({ method }: PaymentMethodLabelProps) {
  const { label, logoUrl } = methodDisplay[method];

  return (
    <span className="flex items-center gap-2.5 font-medium text-ink-600">
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={`Logo ${label}`}
          width={24}
          height={24}
          className="size-6 shrink-0 rounded-md object-contain"
        />
      ) : (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-white">
          <Banknote size={15} strokeWidth={2} />
        </span>
      )}
      {label}
    </span>
  );
}
