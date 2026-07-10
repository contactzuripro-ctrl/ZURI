import { Smartphone, Wallet, Banknote } from "lucide-react";
import type { PaymentMethod } from "@/types";

const methodDisplay: Record<
  PaymentMethod,
  { label: string; className: string; Icon: typeof Smartphone }
> = {
  "orange-money": {
    label: "Orange Money",
    className: "text-gold-600",
    Icon: Smartphone,
  },
  wave: { label: "Wave", className: "text-plum-700", Icon: Wallet },
  especes: { label: "Espèces", className: "text-ink-600", Icon: Banknote },
};

interface PaymentMethodLabelProps {
  method: PaymentMethod;
}

/** Affiche la méthode de paiement avec son icône et sa couleur. */
export function PaymentMethodLabel({ method }: PaymentMethodLabelProps) {
  const { label, className, Icon } = methodDisplay[method];
  return (
    <span className={`flex items-center gap-2 font-medium ${className}`}>
      <Icon size={18} strokeWidth={1.8} />
      {label}
    </span>
  );
}
