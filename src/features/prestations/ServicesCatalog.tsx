import { ServiceCard } from "@/features/prestations/ServiceCard";
import { services } from "@/features/prestations/data";

/** Grille du catalogue des prestations. */
export function ServicesCatalog() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
