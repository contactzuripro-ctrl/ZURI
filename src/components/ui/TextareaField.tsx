import { fieldInputClass, fieldLabelClass } from "@/components/ui/FormField";

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
}

/** Zone de texte minimaliste d'une modale : même style que FormField. */
export function TextareaField({
  label,
  name,
  placeholder,
  rows = 3,
}: TextareaFieldProps) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={`${fieldInputClass} resize-none`}
      />
    </label>
  );
}
