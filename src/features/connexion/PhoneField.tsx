"use client";

import { useState } from "react";

interface Pays {
  nom: string;
  /** Indicatif téléphonique international, sans le « + ». */
  indicatif: string;
  drapeau: string;
}

/** Pays proposés — Afrique francophone d'abord, Côte d'Ivoire par défaut. */
const paysDisponibles: Pays[] = [
  { nom: "Côte d'Ivoire", indicatif: "225", drapeau: "🇨🇮" },
  { nom: "Bénin", indicatif: "229", drapeau: "🇧🇯" },
  { nom: "Burkina Faso", indicatif: "226", drapeau: "🇧🇫" },
  { nom: "Cameroun", indicatif: "237", drapeau: "🇨🇲" },
  { nom: "Congo", indicatif: "242", drapeau: "🇨🇬" },
  { nom: "RD Congo", indicatif: "243", drapeau: "🇨🇩" },
  { nom: "France", indicatif: "33", drapeau: "🇫🇷" },
  { nom: "Gabon", indicatif: "241", drapeau: "🇬🇦" },
  { nom: "Ghana", indicatif: "233", drapeau: "🇬🇭" },
  { nom: "Guinée", indicatif: "224", drapeau: "🇬🇳" },
  { nom: "Mali", indicatif: "223", drapeau: "🇲🇱" },
  { nom: "Maroc", indicatif: "212", drapeau: "🇲🇦" },
  { nom: "Niger", indicatif: "227", drapeau: "🇳🇪" },
  { nom: "Nigeria", indicatif: "234", drapeau: "🇳🇬" },
  { nom: "Sénégal", indicatif: "221", drapeau: "🇸🇳" },
  { nom: "Togo", indicatif: "228", drapeau: "🇹🇬" },
];

interface PhoneFieldProps {
  label: string;
  /** Nom du champ soumis : contient le numéro complet, ex. "2250708091011". */
  name: string;
  placeholder?: string;
  /** Numéro international complet (chiffres) pour pré-remplir, ex. "2250708091011". */
  defaultValue?: string;
}

/** Sépare un numéro international en (indicatif connu, numéro local). */
function separerNumero(complet: string): { indicatif: string; local: string } {
  const pays = paysDisponibles.find((p) => complet.startsWith(p.indicatif));
  if (pays) {
    return { indicatif: pays.indicatif, local: complet.slice(pays.indicatif.length) };
  }
  return { indicatif: "225", local: complet };
}

/**
 * Champ de numéro WhatsApp avec choix du pays : sélecteur drapeau + indicatif
 * à gauche (Côte d'Ivoire par défaut), numéro local à droite. Le formulaire
 * reçoit le numéro complet (indicatif + numéro, chiffres uniquement) via un
 * champ caché `name`.
 */
export function PhoneField({
  label,
  name,
  placeholder,
  defaultValue = "",
}: PhoneFieldProps) {
  const initial = separerNumero(defaultValue.replace(/\D/g, ""));
  const [indicatif, setIndicatif] = useState(initial.indicatif);
  const [numeroLocal, setNumeroLocal] = useState(initial.local);

  const chiffresLocaux = numeroLocal.replace(/\D/g, "");
  const numeroComplet = chiffresLocaux ? `${indicatif}${chiffresLocaux}` : "";

  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-600">
        {label}
      </span>
      <span className="flex items-stretch rounded-2xl border border-plum-900/15 bg-white transition focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-400/35">
        <select
          value={indicatif}
          onChange={(event) => setIndicatif(event.target.value)}
          aria-label="Pays du numéro"
          className="cursor-pointer rounded-l-2xl bg-transparent py-2.5 pl-3 text-[15px] text-plum-900 outline-none"
        >
          {paysDisponibles.map((pays) => (
            <option key={pays.indicatif} value={pays.indicatif} title={pays.nom}>
              {pays.drapeau} +{pays.indicatif}
            </option>
          ))}
        </select>
        <span aria-hidden className="my-2 w-px bg-plum-900/15" />
        <input
          name="numeroLocal"
          type="tel"
          value={numeroLocal}
          placeholder={placeholder}
          onChange={(event) => setNumeroLocal(event.target.value)}
          className="w-full min-w-0 rounded-r-2xl bg-transparent px-3.5 py-2.5 text-[15px] text-plum-900 outline-none placeholder:text-ink-400"
        />
        <input type="hidden" name={name} value={numeroComplet} readOnly />
      </span>
    </label>
  );
}
