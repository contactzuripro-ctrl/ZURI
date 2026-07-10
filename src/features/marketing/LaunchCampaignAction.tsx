"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { SelectField } from "@/components/ui/SelectField";

interface LaunchCampaignActionProps {
  campaignName: string;
}

/**
 * Bouton « Lancer » d'une carte de campagne + sa modale de confirmation
 * d'envoi (UI seule pour l'instant, rien n'est envoyé).
 */
export function LaunchCampaignAction({ campaignName }: LaunchCampaignActionProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex shrink-0 items-center gap-2 rounded-[1.4rem_1rem_1.5rem_0.9rem/1rem_1.5rem_0.9rem_1.4rem] bg-plum-900 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
      >
        <Send size={15} strokeWidth={1.8} />
        Lancer
      </button>
      <Modal
        open={open}
        onClose={close}
        title="Lancer la campagne"
        subtitle={`« ${campaignName} » sera envoyée aux clientes ciblées.`}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <SelectField
              label="Envoyer à"
              name="audience"
              options={[
                "Toutes les clientes",
                "Clientes fidèles",
                "Inactives depuis 3 mois",
              ]}
            />
          </div>
          <ModalFooter submitLabel="Lancer maintenant" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
