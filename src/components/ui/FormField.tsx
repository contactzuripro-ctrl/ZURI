/** Style commun des champs des modales — repris par SelectField et TextareaField. */
export const fieldInputClass =
  "w-full rounded-2xl border border-hairline bg-elevated/70 px-4 py-2.5 text-[15px] text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-400/35";

/** Style commun des libellés des champs des modales. */
export const fieldLabelClass = "mb-1.5 block text-[13px] font-medium text-ink-600";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "tel" | "number" | "date" | "time" | "month";
  placeholder?: string;
  defaultValue?: string;
  /** Suffixe affiché à droite dans le champ, ex. "F CFA" ou "min" (optionnel). */
  suffix?: string;
}

/** Champ de saisie minimaliste d'une modale : libellé discret + input à fine bordure. */
export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  defaultValue,
  suffix,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <span className="relative block">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`${fieldInputClass} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-ink-400">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
