"use client";

import { useState } from "react";
import { Link2 } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";

/** Bouton « Envoyer un lien de paiement » + sa modale (UI seule pour l'instant). */
export function PaymentLinkAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<Link2 size={18} />} onClick={() => setOpen(true)}>
        Envoyer un lien de paiement
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Envoyer un lien de paiement"
        subtitle="La cliente recevra le lien par SMS ou WhatsApp."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField label="Cliente" name="clientName" placeholder="Aya Kouassi" />
            <FormField
              label="Montant"
              name="amount"
              type="number"
              placeholder="15 000"
              suffix="F CFA"
            />
            <SelectField
              label="Méthode de paiement"
              name="method"
              options={["Orange Money", "Wave"]}
            />
            <TextareaField
              label="Message (optionnel)"
              name="message"
              placeholder="Bonjour ! Voici le lien pour régler votre acompte…"
            />
          </div>
          <ModalFooter submitLabel="Envoyer le lien" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
