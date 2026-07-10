"use client";

import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDayMonth } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import type { ClientProfile } from "@/features/clients/data";

interface ClientListPanelProps {
  clients: ClientProfile[];
  selectedId: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelect: (clientId: string) => void;
}

/** Panneau gauche : recherche + liste des clientes, sélection surlignée. */
export function ClientListPanel({
  clients,
  selectedId,
  searchQuery,
  onSearchChange,
  onSelect,
}: ClientListPanelProps) {
  return (
    <Card className="self-start overflow-hidden">
      <label className="mx-4 mt-4 flex items-center gap-2.5 rounded-2xl bg-surface px-4 py-2.5">
        <Search size={17} strokeWidth={2} className="shrink-0 text-ink-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Rechercher…"
          aria-label="Rechercher une cliente"
          className="w-full bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-400"
        />
      </label>

      <ul className="mt-3 pb-2">
        {clients.map((client) => {
          const isSelected = client.id === selectedId;
          return (
            <li key={client.id}>
              <button
                type="button"
                onClick={() => onSelect(client.id)}
                className={`flex w-full items-center gap-3 border-t border-hairline px-4 py-4 text-left transition-colors ${
                  isSelected ? "bg-accent-500/15" : "hover:bg-accent-500/5"
                }`}
              >
                <Avatar
                  fullName={client.fullName}
                  color={client.avatarColor}
                  photoUrl={client.photoUrl}
                />
                <span>
                  <span className="block font-semibold">{client.fullName}</span>
                  <span className="block text-sm text-ink-600">
                    Dernière visite – {formatDayMonth(client.lastVisit)}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        {clients.length === 0 && (
          <li className="border-t border-hairline px-4 py-4 text-sm text-ink-400">
            Aucune cliente ne correspond à « {searchQuery} »
          </li>
        )}
      </ul>
    </Card>
  );
}
