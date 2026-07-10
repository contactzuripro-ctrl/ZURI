"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { TextareaField } from "@/components/ui/TextareaField";

/** Bouton « Nouvelle campagne » du Marketing + sa modale (UI seule pour l'instant). */
export function NewCampaignAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<Send size={18} />} onClick={() => setOpen(true)}>
        Nouvelle campagne
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Nouvelle campagne"
        subtitle="Envoyer une campagne SMS ou WhatsApp aux clientes."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField
              label="Nom de la campagne"
              name="campaignName"
              placeholder="Promo tresses du mardi"
            />
            <div className="grid grid-cols-2 gap-4">
              <SelectField label="Canal" name="channel" options={["WhatsApp", "SMS"]} />
              <SelectField
                label="Cible"
                name="audience"
                options={[
                  "Toutes les clientes",
                  "Clientes fidèles",
                  "Inactives depuis 3 mois",
                ]}
              />
            </div>
            <TextareaField
              label="Message"
              name="message"
              placeholder="-20 % sur toutes les tresses ce mardi ! Répondez OUI pour réserver."
              rows={4}
            />
          </div>
          <ModalFooter submitLabel="Envoyer la campagne" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
