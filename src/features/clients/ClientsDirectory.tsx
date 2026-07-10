"use client";

import { useState } from "react";
import { ClientListPanel } from "@/features/clients/ClientListPanel";
import { ClientDetailPanel } from "@/features/clients/ClientDetailPanel";
import { clientProfiles } from "@/features/clients/data";

/**
 * Annuaire des clientes en deux panneaux : liste + recherche à gauche,
 * fiche détaillée de la cliente sélectionnée à droite.
 */
export function ClientsDirectory() {
  const [selectedId, setSelectedId] = useState(clientProfiles[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredClients = clientProfiles.filter((client) =>
    client.fullName.toLowerCase().includes(normalizedQuery),
  );

  const selectedClient =
    clientProfiles.find((client) => client.id === selectedId) ??
    clientProfiles[0];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[20rem_1fr]">
      <ClientListPanel
        clients={filteredClients}
        selectedId={selectedClient.id}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelect={setSelectedId}
      />
      <ClientDetailPanel client={selectedClient} />
    </div>
  );
}
