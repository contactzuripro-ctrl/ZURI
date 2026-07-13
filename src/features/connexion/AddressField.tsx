"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";

/** Cadre approximatif de la Côte d'Ivoire pour ne suggérer que des lieux du pays. */
const coteDIvoireBbox = "-8.6,4.34,-2.49,10.74";

interface AddressSuggestion {
  id: string;
  /** Nom principal du lieu (quartier, rue, ville…). */
  name: string;
  /** Complément affiché en dessous : quartier, ville. */
  context: string;
}

interface AddressFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

/**
 * Champ d'adresse avec autocomplétion limitée à la Côte d'Ivoire :
 * la saisie interroge l'API Photon (OpenStreetMap, gratuite et sans clé,
 * pensée pour la recherche à la frappe) après 300 ms de pause, et les
 * suggestions s'affichent dans un panneau sous le champ. Sélectionner une
 * suggestion remplit le champ ; le panneau se ferme au clic extérieur et à Échap.
 */
export function AddressField({
  label,
  name,
  placeholder,
  defaultValue = "",
}: AddressFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  /** Coupe la recherche juste après une sélection (le champ change sans nouvelle saisie). */
  const skipNextSearch = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClick(containerRef, () => setIsOpen(false));

  useEffect(() => {
    if (skipNextSearch.current) {
      skipNextSearch.current = false;
      return;
    }
    const query = value.trim();
    if (query.length < 3) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lang=fr&limit=5&bbox=${coteDIvoireBbox}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) return;
        const data = await response.json();
        const results = parseSuggestions(data);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch {
        // Requête annulée ou réseau indisponible : on laisse la saisie libre.
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [value]);

  const selectSuggestion = (suggestion: AddressSuggestion) => {
    skipNextSearch.current = true;
    setValue(
      suggestion.context
        ? `${suggestion.name}, ${suggestion.context}`
        : suggestion.name,
    );
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-medium text-ink-600">
          {label}
        </span>
        <input
          name={name}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => {
            const nextValue = event.target.value;
            setValue(nextValue);
            if (nextValue.trim().length < 3) {
              setSuggestions([]);
              setIsOpen(false);
            }
          }}
          onFocus={() => setIsOpen(suggestions.length > 0)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setIsOpen(false);
          }}
          className="w-full rounded-2xl border border-plum-900/15 bg-white px-4 py-2.5 text-[15px] text-plum-900 outline-none transition placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/35"
        />
      </label>

      {isOpen && (
        <ul className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-plum-900/10 bg-white py-1.5 shadow-[0_16px_40px_rgba(58,24,50,0.16)]">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className="flex w-full items-start gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-accent-500/10"
              >
                <MapPin
                  size={16}
                  strokeWidth={2}
                  className="mt-0.5 shrink-0 text-accent-500"
                />
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-medium text-plum-900">
                    {suggestion.name}
                  </span>
                  {suggestion.context && (
                    <span className="block truncate text-[13px] text-ink-600">
                      {suggestion.context}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Transforme la réponse GeoJSON de Photon en suggestions lisibles, limitées à la Côte d'Ivoire. */
function parseSuggestions(data: {
  features?: {
    properties?: Record<string, string>;
  }[];
}): AddressSuggestion[] {
  const seen = new Set<string>();
  const results: AddressSuggestion[] = [];

  for (const feature of data.features ?? []) {
    const props = feature.properties ?? {};
    if (props.countrycode?.toUpperCase() !== "CI") continue;

    const name = props.name ?? props.street;
    if (!name) continue;

    const context = [props.street, props.district, props.city, props.state]
      .filter((part) => part && part !== name)
      .filter((part, index, parts) => parts.indexOf(part) === index)
      .join(", ");

    const id = `${name}|${context}`;
    if (seen.has(id)) continue;
    seen.add(id);
    results.push({ id, name, context });
  }

  return results;
}
