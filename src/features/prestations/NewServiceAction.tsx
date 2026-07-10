"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";

/** Bouton « Nouvelle prestation » + sa modale (UI seule pour l'instant). */
export function NewServiceAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Nouvelle prestation
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Nouvelle prestation"
        subtitle="Ajouter une prestation au catalogue du salon."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <FormField
              label="Nom de la prestation"
              name="serviceName"
              placeholder="Tresses box braids"
            />
            <SelectField
              label="Catégorie"
              name="category"
              options={["Coiffure", "Extensions", "Soins", "Coloration", "Onglerie"]}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Prix"
                name="price"
                type="number"
                placeholder="15 000"
                suffix="F CFA"
              />
              <FormField
                label="Durée"
                name="duration"
                type="number"
                placeholder="120"
                suffix="min"
              />
            </div>
          </div>
          <ModalFooter submitLabel="Ajouter au catalogue" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
