interface AuthFieldProps {
  label: string;
  name: string;
  type?: "text" | "tel" | "password";
  placeholder?: string;
  /** Préfixe affiché à gauche dans le champ, ex. l'indicatif "+225" (optionnel). */
  prefix?: string;
}

/**
 * Champ de saisie des formulaires de connexion, posé sur le fond blanc de
 * la page (publique, couleurs fixes) : libellé discret + input à fine
 * bordure prune, focus rose comme les champs des modales.
 */
export function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  prefix,
}: AuthFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-600">
        {label}
      </span>
      <span className="relative block">
        {prefix && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[15px] font-medium text-plum-900/55">
            {prefix}
          </span>
        )}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-plum-900/15 bg-white px-4 py-2.5 text-[15px] text-plum-900 outline-none transition placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/35 ${
            prefix ? "pl-14" : ""
          }`}
        />
      </span>
    </label>
  );
}
