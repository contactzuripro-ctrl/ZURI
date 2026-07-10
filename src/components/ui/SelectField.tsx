import { ChevronDown } from "lucide-react";
import { fieldInputClass, fieldLabelClass } from "@/components/ui/FormField";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
}

/** Liste déroulante minimaliste d'une modale : même style que FormField, chevron discret. */
export function SelectField({ label, name, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className={fieldLabelClass}>{label}</span>
      <span className="relative block">
        <select name={name} className={`${fieldInputClass} appearance-none pr-10`}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-400"
        />
      </span>
    </label>
  );
}
