"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Modal } from "@/components/ui/Modal";
import { ModalFooter } from "@/components/ui/ModalFooter";
import { FormField } from "@/components/ui/FormField";
import { PhotoField } from "@/components/ui/PhotoField";

/** Bouton « Nouvelle employée » + sa modale (UI seule pour l'instant). */
export function NewEmployeeAction() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <PrimaryButton icon={<UserPlus size={18} />} onClick={() => setOpen(true)}>
        Nouvelle employée
      </PrimaryButton>
      <Modal
        open={open}
        onClose={close}
        title="Nouvelle employée"
        subtitle="Ajouter une employée à l'équipe du salon."
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <div className="space-y-4">
            <PhotoField />
            <FormField label="Nom complet" name="fullName" placeholder="Awa Traoré" />
            <FormField
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="+225 07 08 09 10 11"
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Objectif mensuel"
                name="monthlyTarget"
                type="number"
                placeholder="400 000"
                suffix="F CFA"
              />
              <FormField
                label="Commission"
                name="commissionRate"
                type="number"
                placeholder="10"
                suffix="%"
              />
            </div>
          </div>
          <ModalFooter submitLabel="Ajouter l'employée" onCancel={close} />
        </form>
      </Modal>
    </>
  );
}
