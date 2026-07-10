import { PrimaryButton } from "@/components/ui/PrimaryButton";

interface ModalFooterProps {
  submitLabel: string;
  onCancel: () => void;
}

/** Pied de modale : « Annuler » discret + bouton principal qui soumet le formulaire. */
export function ModalFooter({ submitLabel, onCancel }: ModalFooterProps) {
  return (
    <div className="mt-8 flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full px-5 py-2.5 text-[15px] font-medium text-ink-600 transition-colors hover:bg-surface hover:text-ink-900"
      >
        Annuler
      </button>
      <PrimaryButton type="submit">{submitLabel}</PrimaryButton>
    </div>
  );
}
