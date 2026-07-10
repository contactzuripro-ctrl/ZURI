"use client";

import { useState } from "react";
import { CategoryFilter } from "@/features/prestations/CategoryFilter";
import { ServicesTable } from "@/features/prestations/ServicesTable";
import { services } from "@/features/prestations/data";

/**
 * Catalogue des prestations : pilules de filtre par catégorie au-dessus
 * du tableau (Prestation, Catégorie, Durée, Prix, Promotion).
 */
export function ServicesCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(services.map((service) => service.category))];
  const visibleServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />
      <ServicesTable services={visibleServices} />
    </div>
  );
}
